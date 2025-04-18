// File: lib/api.ts (MODIFICADO - Añadida deleteIngestDocument)
// Purpose: Centralized API request function and specific API call definitions.
import { getApiGatewayUrl } from './utils';
import type { Message } from '@/components/chat/chat-message';
import { AUTH_TOKEN_KEY } from './constants';

interface ApiErrorDataDetail {
    msg: string;
    type: string;
    loc?: (string | number)[];
}
interface ApiErrorData {
    detail?: string | ApiErrorDataDetail[] | any;
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

export async function request<T>(
    endpoint: string,
    options: RequestInit = {}
): Promise<T> {
    const cleanEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;

    if (!cleanEndpoint.startsWith('/api/v1/')) {
        console.error(`Invalid API endpoint format: ${cleanEndpoint}. Must start with /api/v1/`);
        throw new ApiError(`Invalid API endpoint format: ${cleanEndpoint}.`, 400);
    }

    let apiUrl: string;
    let cachedGatewayUrl: string | null = null;
    try {
        if (!cachedGatewayUrl) {
            cachedGatewayUrl = getApiGatewayUrl();
        }
        apiUrl = `${cachedGatewayUrl}${cleanEndpoint}`;
    } catch (err) {
        console.error("API Request failed: Could not get API Gateway URL.", err);
        const message = err instanceof Error ? err.message : "API Gateway URL configuration error.";
        throw new ApiError(message, 500);
    }

    let token: string | null = null;
    if (typeof window !== 'undefined') {
        token = localStorage.getItem(AUTH_TOKEN_KEY);
    } else {
        console.warn(`API Request: localStorage not available for ${cleanEndpoint} (SSR/Server Context?). Cannot get auth token.`);
    }

    const headers = new Headers(options.headers || {});
    headers.set('Accept', 'application/json');
    if (apiUrl.includes("ngrok-free.app")) {
        headers.set('ngrok-skip-browser-warning', 'true');
    }
    if (!(options.body instanceof FormData)) {
        if (!headers.has('Content-Type')) {
             headers.set('Content-Type', 'application/json');
        }
    } else {
        headers.delete('Content-Type');
    }

    if (token) {
        headers.set('Authorization', `Bearer ${token}`);
    } else if (!cleanEndpoint.includes('/api/v1/users/login')) {
        console.warn(`API Request: Making request to protected endpoint ${cleanEndpoint} without Authorization header.`);
    }

    const config: RequestInit = {
        ...options,
        headers,
    };

    console.log(`API Request: ${config.method || 'GET'} ${apiUrl}`);

    try {
        const response = await fetch(apiUrl, config);

        if (!response.ok) {
            let errorData: ApiErrorData | null = null;
            let errorText = '';
            const contentType = response.headers.get('content-type');
            try {
                if (contentType && contentType.includes('application/json')) {
                    errorData = await response.json();
                } else { errorText = await response.text(); }
            } catch (parseError) {
                 console.warn(`API Request: Could not parse error response body for ${response.status} ${response.statusText} from ${apiUrl}`, parseError);
                 try { errorText = await response.text(); } catch {}
            }

            let errorMessage = `API Error (${response.status})`;
            if (errorData) {
                if (typeof errorData.detail === 'string') {
                    errorMessage = errorData.detail;
                } else if (Array.isArray(errorData.detail) && errorData.detail.length > 0 && typeof errorData.detail[0].msg === 'string') {
                    errorMessage = errorData.detail.map(d => `${d.loc ? d.loc.join('.')+': ' : ''}${d.msg}`).join('; ');
                } else if (typeof errorData.message === 'string') {
                    errorMessage = errorData.message;
                }
            } else if (errorText) {
                errorMessage = errorText.substring(0, 200);
            } else {
                errorMessage = response.statusText || `Request failed with status ${response.status}`;
            }

            console.error(`API Error Response: ${response.status} ${response.statusText} from ${apiUrl}`, { data: errorData, text: errorText });
            throw new ApiError(errorMessage, response.status, errorData || undefined);
        }

        // Manejo correcto de 204 No Content
        if (response.status === 204 || response.headers.get('content-length') === '0') {
            return null as T; // Devuelve null explícitamente para respuestas sin contenido
        }

        try {
            const data: T = await response.json();
            return data;
        } catch (jsonError) {
             const responseText = await response.text().catch(() => "Could not read response text.");
             console.error(`API Request: Invalid JSON response from ${apiUrl}. Status: ${response.status}. Response Text: ${responseText}`, jsonError);
             throw new ApiError(`Invalid JSON response received from server.`, response.status);
        }

    } catch (error) {
        if (error instanceof ApiError) { throw error; }
        else if (error instanceof TypeError && error.message.toLowerCase().includes('failed to fetch')) {
             const networkErrorMsg = 'Network error or API Gateway unreachable. Check connection and API URL.';
             console.error(`API Request Network Error: ${networkErrorMsg} (URL: ${apiUrl})`, error);
             throw new ApiError(networkErrorMsg, 0);
        } else {
             console.error(`API Request: Unexpected error during fetch to ${apiUrl}`, error);
             const message = error instanceof Error ? error.message : 'An unknown fetch error occurred.';
             throw new ApiError(`Unexpected fetch error: ${message}`, 500);
        }
    }
}

// --- Ingest Service ---
export interface IngestResponse {
    document_id: string;
    task_id: string;
    status: string;
    message: string;
}

export interface AuthHeaders {
  'X-Company-ID': string;
  'X-User-ID': string;
}

export async function uploadDocument(file: File, auth: AuthHeaders): Promise<IngestResponse> {
  const formData = new FormData();
  formData.append('file', file);
  try {
    const response = await request<IngestResponse>('/api/v1/ingest/upload', {
      method: 'POST',
      headers: { ...auth },
      body: formData,
    });
    return response;
  } catch (error) {
    console.error('Error uploading document:', error);
    throw error;
  }
}

// Interfaz para la respuesta de la lista de estados
export interface DocumentStatusResponse {
    document_id: string;
    status: string; // 'uploaded', 'processing', 'processed', 'error'
    file_name?: string | null;
    file_type?: string | null;
    chunk_count?: number | null; // Desde DB, puede ser actualizado por /status individual
    error_message?: string | null;
    created_at?: string;
    last_updated: string; // Timestamp de última actualización (más útil)
    // Campos adicionales que pueden venir de la verificación en GET /status
    minio_exists?: boolean;
    milvus_chunk_count?: number;
}

// Interfaz para la respuesta detallada de un documento individual
export interface DetailedDocumentStatusResponse extends DocumentStatusResponse {
    minio_exists: boolean; // Garantizado por el endpoint individual
    milvus_chunk_count: number; // Garantizado por el endpoint individual
    message?: string; // Mensaje detallado del backend
}


export async function getDocumentStatusList(auth: AuthHeaders, limit: number = 100, offset: number = 0): Promise<DocumentStatusResponse[]> {
  const endpoint = `/api/v1/ingest/status?limit=${limit}&offset=${offset}`;
  try {
    const response = await request<DocumentStatusResponse[]>(endpoint, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...auth,
      },
    });
    return response || [];
  } catch (error) {
    console.error('Error fetching document status list:', error);
    throw error;
  }
}


export const getDocumentStatus = async (documentId: string, auth: AuthHeaders): Promise<DetailedDocumentStatusResponse> => {
    return request<DetailedDocumentStatusResponse>(`/api/v1/ingest/status/${documentId}`, {
        method: 'GET',
        headers: { ...auth } as Record<string, string>
    });
};


export async function retryIngestDocument(documentId: string, auth: AuthHeaders): Promise<IngestResponse> {
  const endpoint = `/api/v1/ingest/retry/${documentId}`;
  try {
    const response = await request<IngestResponse>(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...auth,
      },
    });
    if (!response) {
        console.warn(`Retry endpoint ${endpoint} returned unexpected null response.`);
        throw new ApiError('Retry initiated but no confirmation received.', 202);
    }
    return response;
  } catch (error) {
    console.error(`Error retrying ingest for document ${documentId}:`, error);
    throw error;
  }
}


/**
 * Elimina un documento de la base de conocimiento (Milvus, MinIO y registro).
 * Endpoint: DELETE /api/v1/ingest/{document_id}
 */
export async function deleteIngestDocument(documentId: string, auth: AuthHeaders): Promise<void> {
  // request devuelve null para 204, que es el tipo esperado para void
  await request<null>(`/api/v1/ingest/${documentId}`, {
    method: 'DELETE',
    headers: { ...auth } as Record<string, string>,
  });
}


// --- Query Service ---
export interface RetrievedDocApi {
    id: string;
    document_id: string;
    file_name: string;
    content: string;
    content_preview: string;
    metadata: Record<string, any> | null;
    score: number;
}
export type RetrievedDoc = RetrievedDocApi;

export interface ChatSummary {
    id: string;
    title: string | null;
    created_at: string;
    updated_at: string;
    message_count: number;
}

export interface ChatMessageApi {
    id: string;
    chat_id: string;
    role: 'user' | 'assistant';
    content: string;
    sources: Array<{
        chunk_id: string;
        document_id: string;
        file_name: string;
        score: number;
        preview: string;
    }> | null;
    created_at: string;
}

export interface QueryPayload {
    query: string;
    retriever_top_k?: number;
    chat_id?: string | null;
}

export interface QueryApiResponse {
    answer: string;
    retrieved_documents: RetrievedDocApi[];
    query_log_id: string | null;
    chat_id: string;
}

export const getChats = async (limit: number = 50, offset: number = 0): Promise<ChatSummary[]> => {
     const endpoint = `/api/v1/query/chats?limit=${limit}&offset=${offset}`;
     try { return await request<ChatSummary[]>(endpoint); }
     catch (error) { console.error("Error fetching chats:", error); throw error; }
};

export const getChatMessages = async (chatId: string, limit: number = 100, offset: number = 0): Promise<ChatMessageApi[]> => {
     const endpoint = `/api/v1/query/chats/${chatId}/messages?limit=${limit}&offset=${offset}`;
     try { return await request<ChatMessageApi[]>(endpoint); }
     catch (error) { console.error(`Error fetching messages for chat ${chatId}:`, error); throw error; }
};

export const postQuery = async (payload: QueryPayload): Promise<QueryApiResponse> => {
     const body = { ...payload, chat_id: payload.chat_id || null };
     return request<QueryApiResponse>('/api/v1/query/ask', {
        method: 'POST', body: JSON.stringify(body), headers: { 'Content-Type': 'application/json' }
     });
};

export const deleteChat = async (chatId: string): Promise<void> => {
    await request<null>(`/api/v1/query/chats/${chatId}`, { method: 'DELETE' });
};

// --- Auth Service ---
interface LoginPayload {
    email: string;
    password: string;
}
export interface LoginResponse {
    access_token: string;
    token_type: string;
    user_id: string;
    email: string;
    full_name: string;
    role: string;
    company_id: string;
}

// --- Type Mapping Helpers ---
export const mapApiSourcesToFrontend = (apiSources: ChatMessageApi['sources']): RetrievedDoc[] | undefined => {
    if (!apiSources) return undefined;
    return apiSources.map(source => ({
        id: source.chunk_id, document_id: source.document_id, file_name: source.file_name,
        content: source.preview, content_preview: source.preview, metadata: null, score: source.score,
    }));
};

export const mapApiMessageToFrontend = (apiMessage: ChatMessageApi): Message => {
    const mappedSources = mapApiSourcesToFrontend(apiMessage.sources);
    return {
        id: apiMessage.id, role: apiMessage.role, content: apiMessage.content,
        sources: mappedSources, isError: false, created_at: apiMessage.created_at,
    };
};