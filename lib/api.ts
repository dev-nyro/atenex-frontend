// File: lib/api.ts
// Purpose: Centralized API request function and specific API call definitions.
import { getApiGatewayUrl } from './utils';
import type { Message } from '@/components/chat/chat-message'; // Ensure Message interface is exported
import { supabase } from './supabaseClient'; // Import the initialized Supabase client

// --- ApiError Class ---
interface ApiErrorDataDetail {
    msg: string;
    type: string;
    loc?: (string | number)[]; // Location can be string or number indices
}
interface ApiErrorData {
    detail?: string | ApiErrorDataDetail[] | any; // FastAPI often uses 'detail'
    message?: string; // General message fallback
}
export class ApiError extends Error {
    status: number;
    data?: ApiErrorData;

    constructor(message: string, status: number, data?: ApiErrorData) {
        super(message);
        this.name = 'ApiError';
        this.status = status;
        this.data = data;
        // Ensure the prototype chain is correct for instanceof checks
        Object.setPrototypeOf(this, ApiError.prototype);
    }
}

// --- Core Request Function ---
export async function request<T>(
    endpoint: string,
    options: RequestInit = {}
): Promise<T> {
    const cleanEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;

    // Validate endpoint structure (optional but good practice)
    if (!cleanEndpoint.startsWith('/api/v1/')) {
        console.error(`Invalid API endpoint format: ${cleanEndpoint}. Must start with /api/v1/`);
        throw new ApiError(`Invalid API endpoint format: ${cleanEndpoint}.`, 400);
    }

    let apiUrl: string;
    try {
        const gatewayUrl = getApiGatewayUrl(); // Fetch base URL using the utility
        apiUrl = `${gatewayUrl}${cleanEndpoint}`;
    } catch (err) {
        // If getApiGatewayUrl throws (e.g., in production missing env var)
        console.error("API Request failed: Could not get API Gateway URL.", err);
        throw new ApiError("API Gateway URL configuration error.", 500);
    }


    let token: string | null = null;
    try {
        // Get the current session token from Supabase *before* making the request
        const { data: sessionData, error: sessionError } = await supabase.auth.getSession();

        if (sessionError) {
            // Log the error but proceed, maybe it's a public endpoint
            console.warn(`API Request: Error getting Supabase session for ${cleanEndpoint}:`, sessionError.message);
        }
        token = sessionData?.session?.access_token || null;
        // Log token presence for debugging (optional: remove in production)
        // console.log(`API Request to ${cleanEndpoint}: Token ${token ? 'Present' : 'Absent'}`);

    } catch (e) {
        console.error(`API Request: Unexpected error fetching Supabase session for ${cleanEndpoint}:`, e);
        // Decide if you want to proceed without a token or throw an error
        // throw new ApiError("Failed to retrieve authentication token.", 500);
    }

    const headers = new Headers(options.headers || {});
    headers.set('Accept', 'application/json');

    // Set Content-Type unless it's FormData
    if (!(options.body instanceof FormData)) {
        // Default to JSON if not set and not FormData
        if (!headers.has('Content-Type')) {
             headers.set('Content-Type', 'application/json');
        }
    }

    // Add Authorization header if token exists
    if (token) {
        headers.set('Authorization', `Bearer ${token}`);
    } else {
        // Optional: Decide if you want to disallow requests without tokens for protected routes
        // This check might be better handled by the API Gateway itself, but you could add a frontend check
        // if (!isPublicEndpoint(cleanEndpoint)) { // You'd need a helper function isPublicEndpoint
        //    console.error(`API Request Error: Attempted to call protected endpoint ${cleanEndpoint} without a token.`);
        //    throw new ApiError("Authentication token is missing.", 401);
        // }
        console.warn(`API Request: Making request to ${cleanEndpoint} without Authorization header.`);
    }


    const config: RequestInit = {
        ...options,
        headers,
    };

    console.log(`API Request: ${config.method || 'GET'} ${apiUrl}`);

    try {
        const response = await fetch(apiUrl, config);

        // --- Improved Error Handling ---
        if (!response.ok) {
            let errorData: ApiErrorData | null = null;
            let errorText = '';
            const contentType = response.headers.get('content-type');

            try {
                if (contentType && contentType.includes('application/json')) {
                    errorData = await response.json();
                } else {
                    // Read as text if not JSON or if JSON parsing fails
                    errorText = await response.text();
                }
            } catch (parseError) {
                console.warn(`API Request: Could not parse error response body (status ${response.status}) from ${apiUrl}. Content-Type: ${contentType}`, parseError);
                // Attempt to read as text as a fallback if JSON parsing failed
                if (!errorText) {
                    try { errorText = await response.text(); } catch {}
                }
            }

            // Construct a meaningful error message
            let errorMessage = `API Error (${response.status})`; // Default message

            if (errorData?.detail) {
                if (typeof errorData.detail === 'string') {
                    errorMessage = errorData.detail;
                } else if (Array.isArray(errorData.detail) && errorData.detail.length > 0 && typeof errorData.detail[0] === 'object') {
                    // Handle FastAPI validation errors {loc: [...], msg: ..., type: ...}
                    errorMessage = errorData.detail
                        .map((e: ApiErrorDataDetail) => `${e.loc?.join('.')} - ${e.msg}`)
                        .join('; ') || 'Validation Error';
                } else {
                     // Handle other shapes of 'detail' if necessary
                     try { errorMessage = JSON.stringify(errorData.detail).substring(0, 200); } catch {}
                }
            } else if (errorData?.message && typeof errorData.message === 'string') {
                errorMessage = errorData.message; // Use 'message' field if available
            } else if (errorText) {
                errorMessage = errorText.substring(0, 200); // Use text content if no structured error
            } else {
                // Fallback messages based on status code
                switch (response.status) {
                    case 400: errorMessage = 'Bad Request. Please check your input.'; break;
                    case 401: errorMessage = 'Authentication failed. Please log in again.'; break;
                    case 403: errorMessage = 'Permission denied. You might lack necessary roles or company association.'; break;
                    case 404: errorMessage = 'The requested resource was not found.'; break;
                    case 429: errorMessage = 'Too many requests. Please try again later.'; break;
                    case 500: errorMessage = 'Internal Server Error. Please try again later or contact support.'; break;
                    case 502: errorMessage = 'Bad Gateway. The server received an invalid response.'; break;
                    case 503: errorMessage = 'Service Unavailable. The server is temporarily down.'; break;
                    case 504: errorMessage = 'Gateway Timeout. The request took too long.'; break;
                    default: errorMessage = `Request failed with status code ${response.status}.`;
                }
            }

            console.error(`API Error Response: ${response.status} ${response.statusText} from ${apiUrl}`, {
                status: response.status,
                message: errorMessage, // Log the derived message
                responseData: errorData, // Log parsed data if available
                responseText: errorText, // Log text if available or parsing failed
            });

            // Throw the custom ApiError
            throw new ApiError(errorMessage, response.status, errorData || undefined);
        }

        // Handle successful responses
        // Check for No Content response
        if (response.status === 204 || response.headers.get('content-length') === '0') {
            return null as T; // Return null for 204 No Content
        }

        // Try to parse JSON for other successful responses
        try {
            const data: T = await response.json();
            return data;
        } catch (jsonError) {
            console.error(`API Request: Invalid JSON in successful response (status ${response.status}) from ${apiUrl}`, jsonError);
            throw new ApiError(`Invalid JSON response received from the server.`, response.status);
        }

    } catch (error) {
        // Handle different types of errors (ApiError, Network errors, others)
        if (error instanceof ApiError) {
            // Re-throw known API errors
            throw error;
        } else if (error instanceof TypeError && (
            error.message.includes('fetch') || // Generic fetch error
            error.message.includes('NetworkError') || // Firefox network error
            error.message.includes('Failed to fetch') // Common browser network error
        )) {
            const networkErrorMessage = `Network Error: Could not connect to the API Gateway at ${getApiGatewayUrl()}. Please check your network connection and the gateway status.`;
            console.error('API Request Network Error:', { url: apiUrl, gatewayUrl: getApiGatewayUrl(), error: error.message });
            throw new ApiError(networkErrorMessage, 0); // Use status 0 for network errors
        } else {
            // Handle other unexpected errors
            console.error('API Request Unexpected Error:', { url: apiUrl, error });
            const message = error instanceof Error ? error.message : 'An unexpected error occurred during the API request.';
            throw new ApiError(message, 500); // Assume 500 for unexpected errors
        }
    }
}

// --- API Function Definitions ---

// Ingest Service
export interface IngestResponse {
    document_id: string;
    task_id: string; // Celery task ID maybe?
    status: string;
    message: string;
}
export const uploadDocument = async (
    formData: FormData,
    metadata: Record<string, any> = {} // Metadata might not be used if embedded in FormData logic server-side
): Promise<IngestResponse> => {
    // Note: Sending metadata alongside FormData might require specific backend handling
    // or embedding metadata within the FormData itself if the backend expects it.
    // Adjust if your backend expects metadata differently (e.g., query params, separate JSON part).
    console.log("Uploading document via API..."); // Added log
    return request<IngestResponse>('/api/v1/ingest/upload', { // Adjusted endpoint based on typical naming
        method: 'POST',
        body: formData,
        // If metadata needs to be sent separately (less common with FormData):
        // headers: { 'X-Upload-Metadata': JSON.stringify(metadata) }
    });
};

export interface DocumentStatusResponse {
    document_id: string;
    status: 'uploaded' | 'processing' | 'processed' | 'indexed' | 'error' | string; // Allow other strings for flexibility
    file_name?: string | null;
    file_type?: string | null;
    chunk_count?: number | null; // How many chunks were created
    error_message?: string | null; // Details if status is 'error'
    last_updated?: string; // ISO timestamp string
    message?: string | null; // General status message
    metadata?: Record<string, any> | null; // Original metadata if stored
}
export const listDocumentStatuses = async (): Promise<DocumentStatusResponse[]> => {
    console.log("Fetching document statuses via API..."); // Added log
    return request<DocumentStatusResponse[]>('/api/v1/ingest/status'); // Adjusted endpoint
};


// Query Service
export interface RetrievedDocApi {
    id: string; // Often the chunk ID
    score?: number | null;
    content_preview?: string | null;
    metadata?: Record<string, any> | null;
    document_id?: string | null; // ID of the parent document
    file_name?: string | null; // Filename of the parent document
}
// Frontend type can be the same if no transformation is needed initially
export type RetrievedDoc = RetrievedDocApi;

export interface ChatSummary {
    id: string; // Chat ID (UUID)
    title: string | null; // Optional title, might be first user message or generated
    updated_at: string; // ISO timestamp
    created_at: string; // ISO timestamp
}

export interface ChatMessageApi {
    id: string; // Message ID
    chat_id: string;
    role: 'user' | 'assistant';
    content: string;
    sources: RetrievedDocApi[] | null; // Sources used for assistant message
    created_at: string; // ISO timestamp
    // Potentially add other fields like model used, latency, etc.
}

export interface QueryPayload {
    query: string;
    retriever_top_k?: number; // Optional: How many docs to retrieve
    chat_id?: string | null; // Provide if continuing a conversation
    // Potentially add other params: filters, generation config, etc.
}

export interface QueryApiResponse {
    answer: string; // The generated answer
    retrieved_documents: RetrievedDocApi[]; // The documents used
    query_log_id?: string | null; // ID for logging/tracing
    chat_id: string; // ID of the chat (new or existing)
}

export const getChats = async (): Promise<ChatSummary[]> => {
     console.log("Fetching chat list via API..."); // Added log
     return request<ChatSummary[]>('/api/v1/query/chats');
};

export const getChatMessages = async (chatId: string): Promise<ChatMessageApi[]> => {
     console.log(`Fetching messages for chat ${chatId} via API...`); // Added log
     return request<ChatMessageApi[]>(`/api/v1/query/chats/${chatId}/messages`);
};

export const postQuery = async (payload: QueryPayload): Promise<QueryApiResponse> => {
     console.log(`Sending query to API (Chat ID: ${payload.chat_id || 'New'})...`); // Added log
     // Ensure chat_id is explicitly null if undefined/empty, as backend might expect null for new chat
     const body = { ...payload, chat_id: payload.chat_id || null };
     return request<QueryApiResponse>('/api/v1/query/ask', {
        method: 'POST',
        body: JSON.stringify(body),
     });
};

export const deleteChat = async (chatId: string): Promise<void> => {
     console.log(`Deleting chat ${chatId} via API...`); // Added log
     // Expecting 204 No Content on successful deletion
     await request<null>(`/api/v1/query/chats/${chatId}`, { method: 'DELETE' });
};


// User/Company Association (API Gateway Endpoint)
interface EnsureCompanyResponse {
    message: string; // e.g., "Company association successful." or "Company association already exists."
    company_id?: string; // The company ID that was ensured/found
}
export const ensureCompanyAssociation = async (): Promise<EnsureCompanyResponse> => {
     console.log("Calling ensure-company association endpoint..."); // Added log
     return request<EnsureCompanyResponse>('/api/v1/users/me/ensure-company', { method: 'POST' });
};


// --- Type Mapping Helpers ---

// Maps sources from the API structure to the structure needed by the frontend Message component.
export const mapApiSourcesToFrontend = (apiSources: RetrievedDocApi[] | null | undefined): RetrievedDoc[] | undefined => {
    if (!apiSources) {
        return undefined; // Return undefined if sources are null/undefined
    }
    // If it's an array (even empty), map each source.
    // Currently, API and Frontend types are the same (RetrievedDoc = RetrievedDocApi),
    // so this is mostly a pass-through, but good practice for future changes.
    return apiSources.map(source => ({
        id: source.id,
        score: source.score,
        content_preview: source.content_preview,
        metadata: source.metadata,
        document_id: source.document_id,
        file_name: source.file_name,
    }));
};

// Maps a full message object from the API to the frontend Message interface.
export const mapApiMessageToFrontend = (apiMessage: ChatMessageApi): Message => {
    // Use the helper to map the sources array within the message
    const mappedSources = mapApiSourcesToFrontend(apiMessage.sources);

    // Construct the frontend Message object
    return {
        id: apiMessage.id,
        role: apiMessage.role,
        content: apiMessage.content,
        sources: mappedSources, // Use the potentially transformed sources
        isError: false, // Assume success when mapping API response
        created_at: apiMessage.created_at, // Preserve timestamp
    };
};