// File: lib/api.ts
import { getApiGatewayUrl } from './utils';
import type { Message } from '@/components/chat/chat-message'; // Asegúrate que la interfaz Message se exporte desde aquí
import { supabase } from './supabaseClient';

// --- ApiError Class (sin cambios) ---
interface ApiErrorData {
    detail?: string | { msg: string; type: string; loc?: string[] }[] | any;
    message?: string;
}
export class ApiError extends Error {
  status: number;
  data?: ApiErrorData;
  constructor(message: string, status: number, data?: ApiErrorData) {
    super(message); this.name = 'ApiError'; this.status = status; this.data = data;
    Object.setPrototypeOf(this, ApiError.prototype);
  }
}

// --- Core Request Function (exportada, sin cambios internos) ---
export async function request<T>(
    endpoint: string,
    options: RequestInit = {}
): Promise<T> {
    let url: string;
    const cleanEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
    if (!cleanEndpoint.startsWith('/api/v1/')) {
      throw new Error(`Invalid API endpoint: ${cleanEndpoint}. Must start with /api/v1/`);
    }
    const gatewayUrl = getApiGatewayUrl();
    url = `${gatewayUrl}${cleanEndpoint}`;
    let token: string | null = null;
    try {
      const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
      if (sessionError) { console.error("API Request: Error getting Supabase session:", sessionError); }
      token = sessionData?.session?.access_token || null;
      if (!token) { console.warn(`API Request: No Supabase access token found for ${cleanEndpoint}.`); }
    } catch (e) { console.error("API Request: Unexpected error fetching Supabase session:", e); }
    const headers = new Headers(options.headers || {});
    headers.set('Accept', 'application/json');
    if (!(options.body instanceof FormData)) { headers.set('Content-Type', 'application/json'); }
    if (token) { headers.set('Authorization', `Bearer ${token}`); }
    const config: RequestInit = { ...options, headers };
    console.log(`API Request: ${config.method || 'GET'} ${url} (Token ${token ? 'Present' : 'Absent'})`);
    try {
      const response = await fetch(url, config);
      if (!response.ok) {
        let errorData: ApiErrorData | null = null; let errorText = ''; const contentType = response.headers.get('content-type');
        try { if (contentType && contentType.includes('application/json')) { errorData = await response.json(); } else { errorText = await response.text(); } } catch (e) { console.warn(`API Request: Could not parse error response body for ${response.status} from ${url}`, e); try { errorText = await response.text(); } catch {} }
        let errorMessage = `API Error (${response.status})`;
        if (errorData?.detail && typeof errorData.detail === 'string') { errorMessage = errorData.detail; } else if (errorData?.detail && Array.isArray(errorData.detail) && errorData.detail.length > 0) { errorMessage = errorData.detail.map(e => `${e.loc?.join('.')} - ${e.msg}`).join('; ') || 'Validation Error'; } else if (errorData?.message && typeof errorData.message === 'string') { errorMessage = errorData.message; } else if (errorText) { errorMessage = errorText.substring(0, 200); } else { switch (response.status) { case 400: errorMessage = 'Bad Request'; break; case 401: errorMessage = 'Authentication required or token invalid.'; break; case 403: errorMessage = 'Forbidden. Missing permissions or required data (like Company ID).'; break; case 404: errorMessage = 'Resource not found.'; break; case 500: errorMessage = 'Internal Server Error'; break; default: errorMessage = `HTTP error ${response.status}`; } }
        console.error(`API Error Response: ${response.status} ${errorMessage}`, { url, status: response.status, errorData, errorText });
        throw new ApiError(errorMessage, response.status, errorData || undefined);
      }
      if (response.status === 204 || response.headers.get('content-length') === '0') { return null as T; }
      try { const data: T = await response.json(); return data; } catch (jsonError) { console.error(`API Request: Invalid JSON response for successful request from ${url}`, jsonError); throw new ApiError(`Invalid JSON response received from server.`, response.status); }
    } catch (error) {
      if (error instanceof ApiError) { throw error; } else if (error instanceof TypeError && (error.message.includes('fetch') || error.message.includes('NetworkError') || error.message.includes('Failed to fetch'))) { const networkErrorMessage = `Network error connecting to API Gateway at ${gatewayUrl}. Check connection/gateway status.`; console.error('API Request Network Error:', { url, gatewayUrl, error: error.message }); throw new ApiError(networkErrorMessage, 0); } else { console.error('API Request Unexpected Error:', { url, error }); const message = error instanceof Error ? error.message : 'An unexpected error occurred during the API request.'; throw new ApiError(message, 500); }
    }
}

// --- Funciones Específicas de API ---
export interface IngestResponse { document_id: string; task_id: string; status: string; message: string; }
export const uploadDocument = async (formData: FormData, metadata: Record<string, any> = {}) => request<IngestResponse>('/api/v1/ingest/documents', { method: 'POST', body: formData });
export interface DocumentStatusResponse { document_id: string; status: string; file_name?: string | null; file_type?: string | null; chunk_count?: number | null; error_message?: string | null; last_updated?: string; message?: string | null; }
export const listDocumentStatuses = async (): Promise<DocumentStatusResponse[]> => request<DocumentStatusResponse[]>('/api/v1/ingest/documents/status');
export interface RetrievedDocApi { id: string; score?: number | null; content_preview?: string | null; metadata?: Record<string, any> | null; document_id?: string | null; file_name?: string | null; }
export type RetrievedDoc = RetrievedDocApi;
export interface ChatSummary { id: string; title: string | null; updated_at: string; created_at: string;}
export interface ChatMessageApi { id: string; chat_id: string; role: 'user' | 'assistant'; content: string; sources: RetrievedDocApi[] | null; created_at: string; }
export interface QueryPayload { query: string; retriever_top_k?: number; chat_id?: string | null; }
export interface QueryApiResponse { answer: string; retrieved_documents: RetrievedDocApi[]; query_log_id?: string | null; chat_id: string; }
export const getChats = async (): Promise<ChatSummary[]> => request<ChatSummary[]>('/api/v1/query/chats');
export const getChatMessages = async (chatId: string): Promise<ChatMessageApi[]> => request<ChatMessageApi[]>(`/api/v1/query/chats/${chatId}/messages`);
export const postQuery = async (payload: QueryPayload): Promise<QueryApiResponse> => request<QueryApiResponse>('/api/v1/query/ask', { method: 'POST', body: JSON.stringify({...payload, chat_id: payload.chat_id || null}) });
export const deleteChat = async (chatId: string): Promise<void> => { await request<null>(`/api/v1/query/chats/${chatId}`, { method: 'DELETE' }); };
interface EnsureCompanyResponse { message: string; company_id?: string; }
export const ensureCompanyAssociation = async (): Promise<EnsureCompanyResponse> => request<EnsureCompanyResponse>('/api/v1/users/me/ensure-company', { method: 'POST' });

// --- Type Mapping Helpers (IMPLEMENTACIONES RESTAURADAS) ---
export const mapApiSourcesToFrontend = (apiSources: RetrievedDocApi[] | null): RetrievedDoc[] | undefined => {
    // Si la entrada es null, devuelve undefined (coincide con el tipo de retorno)
    if (!apiSources) {
        return undefined;
    }
    // Si es un array (incluso vacío), mapea cada elemento
    return apiSources.map(source => ({
        // Copia todas las propiedades esperadas
        id: source.id,
        score: source.score,
        content_preview: source.content_preview,
        metadata: source.metadata,
        document_id: source.document_id,
        file_name: source.file_name,
    })); // Esta función ahora siempre devuelve RetrievedDoc[] o undefined
};

export const mapApiMessageToFrontend = (apiMessage: ChatMessageApi): Message => {
    // Llama a la función de mapeo de fuentes
    const mappedSources = mapApiSourcesToFrontend(apiMessage.sources);

    // Construye y devuelve el objeto Message del frontend
    return {
        id: apiMessage.id,
        role: apiMessage.role,
        content: apiMessage.content,
        sources: mappedSources, // Usa las fuentes mapeadas
        isError: false, // Asume que no hay error al mapear una respuesta exitosa de la API
        created_at: apiMessage.created_at, // Conserva el timestamp
    }; // Esta función ahora siempre devuelve un objeto Message
};