// File: lib/api.ts
import { getToken, getUserFromToken, User } from './auth/helpers';
import { getApiGatewayUrl } from './utils';
// Import Message type from chat-message to align response mapping
import type { Message } from '@/components/chat/chat-message';

// --- ApiError Class ---
interface ApiErrorData {
    detail?: string | { msg: string; type: string }[] | any;
    message?: string;
}

export class ApiError extends Error {
  status: number;
  data?: ApiErrorData;

  constructor(message: string, status: number, data?: ApiErrorData) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.data = data;
    Object.setPrototypeOf(this, ApiError.prototype);
  }
}

// --- Core Request Function ---
async function request<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {

  let url: string;
  const cleanEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
  const isInternalApiRoute = cleanEndpoint.startsWith('/api/') && !cleanEndpoint.startsWith('/api/v1/');

  if (isInternalApiRoute) {
    url = cleanEndpoint;
  } else {
    const gatewayUrl = getApiGatewayUrl();
    url = `${gatewayUrl}${cleanEndpoint}`;
  }

  const token = getToken();
  const headers = new Headers(options.headers || {});
  let companyId: string | null = null;

  headers.set('Accept', 'application/json');
  if (!(options.body instanceof FormData)) {
     headers.set('Content-Type', 'application/json');
  }

  if (token) {
    headers.set('Authorization', `Bearer ${token}`);
    // Attempt to get companyId from token for external API calls
    if (!isInternalApiRoute) {
        const user = getUserFromToken(token);
        if (user?.companyId) {
            companyId = user.companyId;
            headers.set('X-Company-ID', companyId); // Add Company ID header
        } else {
             console.warn(`Could not extract companyId from token for request to ${url}. Backend might reject.`);
             // Optionally throw an error if companyId is strictly required
             // throw new Error("Company ID could not be determined from token.");
        }
    }
  } else if (!isInternalApiRoute) {
      console.warn(`No auth token found for request to ${url}. Backend might reject.`);
      // Optionally throw an error if auth is strictly required
      // throw new ApiError("Authentication required.", 401);
  }


  const config: RequestInit = {
    ...options,
    headers,
  };

  console.log(`API Request: ${config.method || 'GET'} ${url}`);
  if (companyId) console.log(` > With Company ID: ${companyId}`);


  try {
    const response = await fetch(url, config);

    if (!response.ok) {
      let errorData: ApiErrorData | null = null;
      let errorText = '';
      try {
        errorData = await response.json();
      } catch (e) {
        try {
           errorText = await response.text();
           console.warn("API error response was not valid JSON:", errorText);
        } catch (textErr) {
             console.warn("Could not read API error response body.");
        }
      }

      let errorMessage = `HTTP error ${response.status}`;
       if (errorData?.detail && typeof errorData.detail === 'string') {
           errorMessage = errorData.detail;
       } else if (errorData?.detail && Array.isArray(errorData.detail)) {
           errorMessage = errorData.detail.map(e => (typeof e === 'object' && e !== null && 'msg' in e) ? e.msg : String(e)).join(', ');
       } else if (errorData?.message) {
           errorMessage = errorData.message;
       } else if (errorText) {
           errorMessage = errorText.substring(0, 200);
       } else if (response.status === 401) {
           errorMessage = "Unauthorized. Please log in again.";
       } else if (response.status === 403) {
           errorMessage = "Forbidden. You don't have permission to access this resource.";
       } else if (response.status === 404) {
            errorMessage = "Resource not found.";
       }

      console.error(`API Error: ${response.status} ${errorMessage}`, { url, data: errorData, text: errorText });
      // Special handling for 401 to trigger logout?
      // if (response.status === 401 && typeof window !== 'undefined') {
      //    removeToken(); // Example: force logout on 401
      //    window.location.href = '/login';
      // }
      throw new ApiError(errorMessage, response.status, errorData || undefined);
    }

    if (response.status === 204 || response.headers.get('content-length') === '0') {
        console.log(`API Success: ${response.status} No Content`);
        return null as T; // Return null for No Content
    }

    try {
        const data: T = await response.json();
        // console.debug(`API Success: ${response.status}`, { url, data });
        return data;
    } catch (jsonError) {
         console.error(`API Error: Failed to parse JSON response for ${response.status}`, { url, error: jsonError });
         throw new ApiError(`Invalid JSON response from server`, response.status);
    }

  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    } else if (error instanceof TypeError && error.message.includes('fetch')) { // More robust check
        console.error('Network Error:', { url, error });
        throw new ApiError('Network error: Could not connect to the server.', 0);
    }
    else {
      console.error('Unexpected error during API request:', { url, error });
      throw new ApiError(error instanceof Error ? error.message : 'An unexpected error occurred', 500);
    }
  }
}

// --- Auth Service (Internal API Routes) ---
export const loginUser = async (credentials: { email: string; password: string }) => {
  const response = await request<{ access_token: string }>('/api/auth/login', {
    method: 'POST',
    body: JSON.stringify(credentials),
  });
  return response.access_token;
};

export const registerUser = async (details: { email: string; password: string; name?: string }) => {
    const response = await request<{ access_token: string; user: User }>('/api/auth/register', {
        method: 'POST',
        body: JSON.stringify(details),
    });
    return response;
};

// --- Ingest Service (External API Routes - /api/v1/ingest) ---
export interface IngestResponse {
    document_id: string;
    task_id: string;
    status: string;
    message: string;
}

export const uploadDocument = async (formData: FormData, metadata: Record<string, any> = {}) => {
    formData.append('metadata_json', JSON.stringify(metadata));
    return request<IngestResponse>('/api/v1/ingest', {
        method: 'POST',
        body: formData,
    });
};

export interface DocumentStatusResponse {
    document_id: string;
    status: 'uploaded' | 'processing' | 'processed' | 'indexed' | 'error' | string;
    file_name?: string | null;
    file_type?: string | null;
    chunk_count?: number | null;
    error_message?: string | null;
    last_updated?: string;
    message?: string | null;
}

export const getDocumentStatus = async (documentId: string): Promise<DocumentStatusResponse> => {
  return request<DocumentStatusResponse>(`/api/v1/ingest/status/${documentId}`, {
    method: 'GET',
  });
};

export const listDocumentStatuses = async (): Promise<DocumentStatusResponse[]> => {
    return request<DocumentStatusResponse[]>('/api/v1/ingest/status', {
         method: 'GET',
    });
};


// --- Query & Chat Service (External API Routes - /api/v1/*) ---

// Types for Chat History API
export interface ChatSummary {
    id: string;          // Chat UUID
    title: string | null; // Chat title
    updated_at: string;  // ISO 8601 timestamp
}

// Type for individual message from API
export interface ChatMessageApi {
    id: string;          // Message UUID
    role: 'user' | 'assistant';
    content: string;
    sources: RetrievedDocApi[] | null; // Use specific API type for sources
    created_at: string;  // ISO 8601 timestamp
}

// Type for retrieved documents within API responses
export interface RetrievedDocApi {
    id: string;             // Chunk ID
    score?: number | null;
    content_preview?: string | null; // Assuming backend sends preview
    metadata?: Record<string, any> | null;
    document_id?: string | null; // Original document ID
    file_name?: string | null;   // Original filename
    // Add other fields if the backend sends them (e.g., full content)
}


// Payload for POST /query
export interface QueryPayload {
    query: string;
    retriever_top_k?: number;
    chat_id?: string | null; // Send null for new chat
}

// Response from POST /query
export interface QueryApiResponse {
    answer: string;
    retrieved_documents: RetrievedDocApi[]; // Use API type
    query_log_id?: string | null;
    chat_id: string; // Backend MUST return the chat_id (new or existing)
}

// Function to list chats
export const getChats = async (): Promise<ChatSummary[]> => {
    return request<ChatSummary[]>('/api/v1/chats', {
        method: 'GET',
    });
};

// Function to get messages for a chat
export const getChatMessages = async (chatId: string): Promise<ChatMessageApi[]> => {
    if (!chatId) {
        console.warn("getChatMessages called with empty chatId");
        return [];
    }
    return request<ChatMessageApi[]>(`/api/v1/chats/${chatId}/messages`, {
        method: 'GET',
    });
};

// Function to send a query/message
export const postQuery = async (payload: QueryPayload): Promise<QueryApiResponse> => {
  // Ensure chat_id is explicitly null if undefined/empty string for backend
  const body = { ...payload, chat_id: payload.chat_id || null };
  return request<QueryApiResponse>('/api/v1/query', {
    method: 'POST',
    body: JSON.stringify(body),
  });
};

// Function to delete a chat
export const deleteChat = async (chatId: string): Promise<void> => {
    if (!chatId) {
        throw new Error("Cannot delete chat with empty ID");
    }
    // Expecting 204 No Content on success, request returns null
    await request<null>(`/api/v1/chats/${chatId}`, {
        method: 'DELETE',
    });
};

// --- Type Mapping Helper (Optional but recommended) ---
// Map API source type to frontend source type if they differ
export const mapApiSourcesToFrontend = (apiSources: RetrievedDocApi[] | null): RetrievedDoc[] | undefined => {
    if (!apiSources) return undefined;
    return apiSources.map(source => ({
        id: source.id,
        score: source.score,
        content_preview: source.content_preview,
        metadata: source.metadata,
        document_id: source.document_id,
        file_name: source.file_name,
        // Map other fields if necessary
    }));
};

// Map API message type to frontend message type
export const mapApiMessageToFrontend = (apiMessage: ChatMessageApi): Message => ({
    id: apiMessage.id,
    role: apiMessage.role,
    content: apiMessage.content,
    sources: mapApiSourcesToFrontend(apiMessage.sources), // Use the source mapping function
    created_at: apiMessage.created_at, // Keep the timestamp string or parse if needed
    isError: false, // Assume not an error unless handled elsewhere
});

// Frontend type for RetrievedDoc (used in UI components)
// Ensure this matches the structure expected by RetrievedDocumentsPanel etc.
export interface RetrievedDoc {
    id: string; // Chunk ID
    score?: number | null;
    content_preview?: string | null;
    metadata?: Record<string, any> | null;
    document_id?: string | null;
    file_name?: string | null;
}