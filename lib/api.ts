// File: lib/api.ts
import { getToken, getUserFromToken, User } from './auth/helpers';
import { getApiGatewayUrl } from './utils';
// Import Message type from chat-message to align response mapping
import type { Message } from '@/components/chat/chat-message'; // <-- Import Frontend Message type

// --- ApiError Class ---
interface ApiErrorData {
    detail?: string | { msg: string; type: string; loc?: string[] }[] | any; // Added loc for FastAPI errors
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
export async function request<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {

  let url: string;
  const cleanEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
  // *** Identificar rutas de gateway (v1) vs. internas (simuladas) ***
  const isGatewayRoute = cleanEndpoint.startsWith('/api/v1/');
  const isInternalAuthRoute = cleanEndpoint.startsWith('/api/auth/'); // Rutas simuladas

  if (isGatewayRoute) {
    // Use absolute API Gateway URL for external routes
    const gatewayUrl = getApiGatewayUrl(); // Get URL from env var or default
    url = `${gatewayUrl}${cleanEndpoint}`;
    console.debug(`External API Request Target: ${url}`);
  } else if (isInternalAuthRoute) {
     // Use relative URL for internal simulated routes (IF USED FOR TESTING)
     url = cleanEndpoint;
     console.warn(`Using SIMULATED internal API route: ${url}`);
     console.debug(`Internal API Request Target: ${url}`);
  } else {
     // Handle other potential internal routes if needed
     url = cleanEndpoint;
     console.debug(`Other Internal API Request Target: ${url}`);
  }


  const token = getToken();
  const headers = new Headers(options.headers || {});
  let companyId: string | null = null;

  headers.set('Accept', 'application/json');
  if (!(options.body instanceof FormData)) {
     headers.set('Content-Type', 'application/json');
  }

  // Add Authorization and X-Company-ID (if applicable and available) only for Gateway routes
  if (isGatewayRoute && token) {
    headers.set('Authorization', `Bearer ${token}`);
    const user = getUserFromToken(token); // Decode token to get user info
    if (user?.companyId) {
        companyId = user.companyId;
        headers.set('X-Company-ID', companyId); // Add Company ID header
    } else {
         console.warn(`Could not extract companyId from token for Gateway request to ${url}. Backend might reject.`);
         // Depending on backend requirements, you might need to throw an error here
         // if companyId is mandatory for all gateway requests.
         // throw new ApiError("Company ID could not be determined from token.", 400);
    }
  } else if (isGatewayRoute && !token && !cleanEndpoint.includes('/auth/')) {
      // Handle missing token for required gateway routes (excluding auth endpoints)
      console.error(`Authentication token missing for Gateway request to ${url}.`);
      // Throw an error to prevent the request if auth is mandatory
      throw new ApiError("Authentication required. Please log in.", 401);
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
           console.warn(`API error response (${response.status}) was not valid JSON:`, errorText);
        } catch (textErr) {
             console.warn(`Could not read API error response body (${response.status}).`);
        }
      }

      // Extract a meaningful error message
      let errorMessage = `HTTP error ${response.status}`;
       if (errorData?.detail && typeof errorData.detail === 'string') {
           errorMessage = errorData.detail;
       } else if (errorData?.detail && Array.isArray(errorData.detail)) {
           // Handle FastAPI validation errors specifically
           errorMessage = errorData.detail.map(e => `${e.loc?.join('.')} - ${e.msg}`).join('; ') || 'Validation Error';
       } else if (errorData?.message) { // Handle generic 'message' field
           errorMessage = errorData.message;
       } else if (errorText) {
           errorMessage = errorText.substring(0, 200); // Limit length
       } else {
           // Fallback messages based on status code
           switch (response.status) {
                case 400: errorMessage = "Bad Request. Please check your input."; break;
                case 401: errorMessage = "Unauthorized. Please check credentials or login again."; break;
                case 403: errorMessage = "Forbidden. You don't have permission."; break;
                case 404: errorMessage = "Resource not found."; break;
                case 422: errorMessage = "Validation Error. Please check your input."; break;
                case 500: errorMessage = "Internal Server Error. Please try again later."; break;
                case 502: errorMessage = "Bad Gateway. Error communicating with upstream service."; break;
                case 503: errorMessage = "Service Unavailable. Please try again later."; break;
                case 504: errorMessage = "Gateway Timeout. The server took too long to respond."; break;
           }
       }


      console.error(`API Error: ${response.status} ${errorMessage}`, { url, data: errorData, text: errorText });
      throw new ApiError(errorMessage, response.status, errorData || undefined);
    }

    // Handle No Content response (e.g., for DELETE)
    if (response.status === 204 || response.headers.get('content-length') === '0') {
        console.log(`API Success: ${response.status} No Content`);
        return null as T; // Return null for No Content
    }

    // Parse successful JSON response
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
      // Re-throw known API errors
      throw error;
    } else if (error instanceof TypeError && error.message.includes('fetch')) { // More robust check for network errors
        // Handle Network errors specifically
        console.error('Network Error:', { url, error });
        throw new ApiError('Network error: Could not connect to the server. Is the API Gateway running and accessible?', 0); // Use status 0 for network errors
    }
    else {
      // Handle other unexpected errors (e.g., programming errors in this function)
      console.error('Unexpected error during API request:', { url, error });
      throw new ApiError(error instanceof Error ? error.message : 'An unexpected error occurred', 500);
    }
  }
}

// --- Auth Service ---
// *** CORREGIDO: Apuntar al endpoint REAL del API Gateway ***
// Asume que tu gateway enruta /api/v1/auth/login al servicio de autenticación real
export const loginUser = async (credentials: { email: string; password: string }) => {
  console.log("Calling REAL login API via Gateway (/api/v1/auth/login)...");
  // El backend real debe devolver una estructura como { "access_token": "..." }
  const response = await request<{ access_token: string }>('/api/v1/auth/login', { // <-- RUTA GATEWAY REAL
    method: 'POST',
    body: JSON.stringify(credentials),
  });
  return response.access_token;
};

// *** CORREGIDO: Apuntar al endpoint REAL del API Gateway ***
// Asume que tu gateway enruta /api/v1/auth/register al servicio de autenticación real
export const registerUser = async (details: { email: string; password: string; name?: string }) => {
    console.log("Calling REAL register API via Gateway (/api/v1/auth/register)...");
    // Ajusta el tipo de respuesta esperado <{...}> según lo que devuelve tu backend real.
    // Podría ser solo un mensaje de éxito, info del usuario, o un token si hay auto-login.
    const response = await request<{ access_token?: string; user?: Partial<User>; message?: string }>('/api/v1/auth/register', { // <-- RUTA GATEWAY REAL
        method: 'POST',
        body: JSON.stringify(details),
    });
    return response; // Devuelve la respuesta completa del backend
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
    last_updated?: string; // ISO 8601 date string
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

// Type for retrieved documents within API responses (sent by Backend)
export interface RetrievedDocApi {
    id: string;             // Chunk ID from vector store (Milvus)
    score?: number | null;
    content_preview?: string | null; // Backend should provide this preview
    metadata?: Record<string, any> | null;
    document_id?: string | null; // Original document ID (from Supabase DOCUMENTS table)
    file_name?: string | null;   // Original filename (from Supabase DOCUMENTS table)
}

// Frontend type for RetrievedDoc (used in UI components like RetrievedDocumentsPanel)
export interface RetrievedDoc {
    id: string; // Chunk ID
    score?: number | null;
    content_preview?: string | null;
    metadata?: Record<string, any> | null;
    document_id?: string | null;
    file_name?: string | null;
}

// Types for Chat History API (Backend Responses)
export interface ChatSummary {
    id: string;          // Chat UUID
    title: string | null; // Chat title
    updated_at: string;  // ISO 8601 timestamp
}

export interface ChatMessageApi {
    id: string;          // Message UUID
    role: 'user' | 'assistant';
    content: string;
    sources: RetrievedDocApi[] | null; // Sources associated with assistant message
    created_at: string;  // ISO 8601 timestamp
}

// Payload for POST /query
export interface QueryPayload {
    query: string;
    retriever_top_k?: number;
    chat_id?: string | null; // Send null or omit for a new chat
}

// Response from POST /query
export interface QueryApiResponse {
    answer: string;
    retrieved_documents: RetrievedDocApi[]; // Docs used for this specific answer
    query_log_id?: string | null;
    chat_id: string; // Backend MUST return the chat_id (new or existing)
}


// --- API Functions for Chat History ---

// Function to list chats for the authenticated user
export const getChats = async (): Promise<ChatSummary[]> => {
    return request<ChatSummary[]>('/api/v1/chats', {
        method: 'GET',
    });
};

// Function to get messages for a specific chat
export const getChatMessages = async (chatId: string): Promise<ChatMessageApi[]> => {
    if (!chatId) {
        console.warn("getChatMessages called with empty chatId");
        return []; // Return empty array if no chatId provided
    }
    return request<ChatMessageApi[]>(`/api/v1/chats/${chatId}/messages`, {
        method: 'GET',
    });
};

// Function to send a query (which handles message saving and chat creation/continuation)
export const postQuery = async (payload: QueryPayload): Promise<QueryApiResponse> => {
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
    await request<null>(`/api/v1/chats/${chatId}`, {
        method: 'DELETE',
    });
};


// --- Type Mapping Helpers ---

export const mapApiSourcesToFrontend = (apiSources: RetrievedDocApi[] | null): RetrievedDoc[] | undefined => {
    if (!apiSources) return undefined;
    return apiSources.map(source => ({
        id: source.id,
        score: source.score,
        content_preview: source.content_preview,
        metadata: source.metadata,
        document_id: source.document_id,
        file_name: source.file_name,
    }));
};

export const mapApiMessageToFrontend = (apiMessage: ChatMessageApi): Message => ({
    id: apiMessage.id,
    role: apiMessage.role,
    content: apiMessage.content,
    sources: mapApiSourcesToFrontend(apiMessage.sources),
    isError: false,
});