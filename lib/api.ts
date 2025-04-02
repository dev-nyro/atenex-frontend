// File: lib/api.ts
import { getApiGatewayUrl } from './utils';
import type { Message } from '@/components/chat/chat-message';
import { supabase } from './supabaseClient'; // Importar el cliente Supabase

// --- ApiError Class (sin cambios) ---
interface ApiErrorData {
    detail?: string | { msg: string; type: string; loc?: string[] }[] | any;
    message?: string;
}
export class ApiError extends Error {
  status: number; data?: ApiErrorData;
  constructor(message: string, status: number, data?: ApiErrorData) {
    super(message); this.name = 'ApiError'; this.status = status; this.data = data;
    Object.setPrototypeOf(this, ApiError.prototype);
  }
}

// --- Core Request Function (Catch block corregido) ---
async function request<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  let url: string;
  const cleanEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;

  if (cleanEndpoint.startsWith('/api/v1/')) {
    const gatewayUrl = getApiGatewayUrl();
    url = `${gatewayUrl}${cleanEndpoint}`;
  } else {
    throw new Error(`Invalid API endpoint: ${cleanEndpoint}. Must start with /api/v1/`);
  }

  const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
  if (sessionError) console.error("Error getting Supabase session:", sessionError);
  const token = sessionData?.session?.access_token || null;

  const headers = new Headers(options.headers || {});
  headers.set('Accept', 'application/json');
  if (!(options.body instanceof FormData)) headers.set('Content-Type', 'application/json');
  if (token) headers.set('Authorization', `Bearer ${token}`);

  const config: RequestInit = { ...options, headers };
  console.log(`API Request: ${config.method || 'GET'} ${url} (Token ${token ? 'Present' : 'Absent'})`);

  try {
    const response = await fetch(url, config);

    if (!response.ok) {
      let errorData: ApiErrorData | null = null; let errorText = '';
      try { errorData = await response.json(); } catch { try { errorText = await response.text(); } catch {} }
      let errorMessage = `HTTP error ${response.status}`;
      // ... (extracción de mensaje de error detallado - sin cambios) ...
      if (errorData?.detail && typeof errorData.detail === 'string') { errorMessage = errorData.detail; }
      else if (errorData?.detail && Array.isArray(errorData.detail)) { errorMessage = errorData.detail.map(e => `${e.loc?.join('.')} - ${e.msg}`).join('; ') || 'Validation Error'; }
      else if (errorData?.message) { errorMessage = errorData.message; }
      else if (errorText) { errorMessage = errorText.substring(0, 200); }
      else { switch (response.status) { /* ... cases ... */ } }
      console.error(`API Error: ${response.status} ${errorMessage}`, { url, data: errorData, text: errorText });
      throw new ApiError(errorMessage, response.status, errorData || undefined);
    }

    if (response.status === 204 || response.headers.get('content-length') === '0') return null as T;

    try { const data: T = await response.json(); return data; }
    catch (jsonError) { throw new ApiError(`Invalid JSON response`, response.status); }

  // --- BLOQUE CATCH CORREGIDO ---
  } catch (error) {
    // Primero, manejar ApiError conocido (ya lanzado desde el bloque try)
    if (error instanceof ApiError) {
      throw error;
    }
    // Luego, manejar errores de red específicos (TypeError de fetch)
    // Usamos una comprobación más genérica para cubrir diferentes mensajes de error de red
    else if (error instanceof TypeError && (error.message.includes('fetch') || error.message.includes('NetworkError') || error.message.includes('Load failed'))) {
      console.error('Network Error:', { url, error: error.message });
      throw new ApiError(`Network error connecting to API Gateway at ${url}. Please check connection and gateway status.`, 0); // Status 0 para errores de red
    }
    // Finalmente, otros errores inesperados
    else {
      console.error('Unexpected error during API request:', { url, error });
      const message = error instanceof Error ? error.message : 'An unexpected error occurred during the request.';
      throw new ApiError(message, 500); // Status 500 genérico
    }
  }
  // --- FIN BLOQUE CATCH CORREGIDO ---
}

// --- Funciones de API (Ingest, Query, Chat - sin cambios) ---
export interface IngestResponse { document_id: string; task_id: string; status: string; message: string; }
export const uploadDocument = async (formData: FormData, metadata: Record<string, any> = {}) => { /* ... */ };
export interface DocumentStatusResponse { document_id: string; status: string; file_name?: string | null; file_type?: string | null; chunk_count?: number | null; error_message?: string | null; last_updated?: string; message?: string | null; }
export const getDocumentStatus = async (documentId: string): Promise<DocumentStatusResponse> => { /* ... */ };
export const listDocumentStatuses = async (): Promise<DocumentStatusResponse[]> => { /* ... */ };

export interface RetrievedDocApi { id: string; score?: number | null; content_preview?: string | null; metadata?: Record<string, any> | null; document_id?: string | null; file_name?: string | null; }
export interface RetrievedDoc { id: string; score?: number | null; content_preview?: string | null; metadata?: Record<string, any> | null; document_id?: string | null; file_name?: string | null; }
export interface ChatSummary { id: string; title: string | null; updated_at: string; }
export interface ChatMessageApi { id: string; role: 'user' | 'assistant'; content: string; sources: RetrievedDocApi[] | null; created_at: string; }
export interface QueryPayload { query: string; retriever_top_k?: number; chat_id?: string | null; }
export interface QueryApiResponse { answer: string; retrieved_documents: RetrievedDocApi[]; query_log_id?: string | null; chat_id: string; }

export const getChats = async (): Promise<ChatSummary[]> => request<ChatSummary[]>('/api/v1/chats');
export const getChatMessages = async (chatId: string): Promise<ChatMessageApi[]> => request<ChatMessageApi[]>(`/api/v1/chats/${chatId}/messages`);
export const postQuery = async (payload: QueryPayload): Promise<QueryApiResponse> => request<QueryApiResponse>('/api/v1/query', { method: 'POST', body: JSON.stringify({...payload, chat_id: payload.chat_id || null}) });
export const deleteChat = async (chatId: string): Promise<void> => { await request<null>(`/api/v1/chats/${chatId}`, { method: 'DELETE' }); };

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