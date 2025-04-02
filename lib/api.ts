// File: lib/api.ts
// import { getToken, getUserFromToken, User } from './auth/helpers'; // Ya no se usa getToken/getUserFromToken directamente aquí
import { getApiGatewayUrl } from './utils';
import type { Message } from '@/components/chat/chat-message';
import { supabase } from './supabaseClient'; // Importar el cliente Supabase

// --- ApiError Class ---
interface ApiErrorData {
    detail?: string | { msg: string; type: string; loc?: string[] }[] | any;
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

  // Asumimos que TODAS las llamadas al backend pasan por el gateway bajo /api/v1/
  if (cleanEndpoint.startsWith('/api/v1/')) {
    const gatewayUrl = getApiGatewayUrl();
    url = `${gatewayUrl}${cleanEndpoint}`;
    console.debug(`Gateway API Request Target: ${url}`);
  } else {
    console.error(`Attempting request to non-gateway endpoint: ${cleanEndpoint}. This is likely an error.`);
    throw new Error(`Invalid API endpoint: ${cleanEndpoint}. Must start with /api/v1/`);
  }

  // --- Obtener token de la sesión actual de Supabase ---
  const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
  if (sessionError) {
    console.error("Error getting Supabase session:", sessionError);
    // Podrías lanzar un error o permitir continuar sin token dependiendo del endpoint
    // throw new ApiError("Could not retrieve authentication session.", 500);
  }
  const token = sessionData?.session?.access_token || null;
  // -------------------------------------------------------

  const headers = new Headers(options.headers || {});

  headers.set('Accept', 'application/json');
  if (!(options.body instanceof FormData)) {
    headers.set('Content-Type', 'application/json');
  }

  // Añadir token de autorización si existe
  // El Gateway se encargará de validar y extraer la info necesaria (como company_id)
  if (token) {
    headers.set('Authorization', `Bearer ${token}`);
  } else if (!cleanEndpoint.includes('/api/v1/auth/')) { // No advertir si es una ruta de auth que no requiere token
     console.warn(`Calling potentially protected gateway route ${cleanEndpoint} without a token.`);
     // El gateway devolverá 401 si es necesario
  }

  const config: RequestInit = { ...options, headers };

  console.log(`API Request: ${config.method || 'GET'} ${url} (Token ${token ? 'Present' : 'Absent'})`);

  try {
    const response = await fetch(url, config);

    if (!response.ok) {
      let errorData: ApiErrorData | null = null;
      let errorText = '';
      try { errorData = await response.json(); } catch { try { errorText = await response.text(); } catch {} }

      let errorMessage = `HTTP error ${response.status}`;
      if (errorData?.detail && typeof errorData.detail === 'string') {
          errorMessage = errorData.detail;
      } else if (errorData?.detail && Array.isArray(errorData.detail)) {
          errorMessage = errorData.detail.map(e => `${e.loc?.join('.')} - ${e.msg}`).join('; ') || 'Validation Error';
      } else if (errorData?.message) {
          errorMessage = errorData.message;
      } else if (errorText) {
          errorMessage = errorText.substring(0, 200);
      } else {
          // Fallbacks
          switch (response.status) {
               case 401: errorMessage = "Unauthorized. Please check credentials or login again."; break;
               case 403: errorMessage = "Forbidden. You don't have permission."; break;
               // ... otros códigos de estado ...
               default: break; // Mantener el mensaje genérico
          }
      }
      console.error(`API Error: ${response.status} ${errorMessage}`, { url, data: errorData, text: errorText });
      throw new ApiError(errorMessage, response.status, errorData || undefined);
    }

    if (response.status === 204 || response.headers.get('content-length') === '0') {
      return null as T;
    }

    try {
      const data: T = await response.json();
      return data;
    } catch (jsonError) {
      console.error(`API Error: Failed to parse JSON response for ${response.status}`, { url, error: jsonError });
      throw new ApiError(`Invalid JSON response from server`, response.status);
    }

  // --- CORRECCIÓN DEL BLOQUE CATCH ---
  } catch (error) {
    // Primero, manejar ApiError conocido
    if (error instanceof ApiError) {
      throw error;
    }
    // Luego, manejar errores de red específicos
    else if (error instanceof TypeError && (error.message.includes('fetch') || error.message.includes('NetworkError') || error.message.includes('Failed to fetch'))) {
      console.error('Network Error:', { url, error });
      throw new ApiError(`Network error connecting to API Gateway at ${url}. Please check connection and gateway status.`, 0); // Status 0 para errores de red
    }
    // Finalmente, otros errores inesperados
    else {
      console.error('Unexpected error during API request:', { url, error });
      throw new ApiError(error instanceof Error ? error.message : 'An unexpected error occurred during the request.', 500);
    }
  }
  // --- FIN CORRECCIÓN BLOQUE CATCH ---
}


// --- Funciones loginUser y registerUser ELIMINADAS ---
// La autenticación se manejará directamente con el cliente Supabase en los componentes/hooks.


// --- Ingest Service Calls (sin cambios, ya usan /api/v1/) ---
export interface IngestResponse { /* ... */ document_id: string; task_id: string; status: string; message: string; }
export const uploadDocument = async (formData: FormData, metadata: Record<string, any> = {}) => {
    formData.append('metadata_json', JSON.stringify(metadata));
    return request<IngestResponse>('/api/v1/ingest', { method: 'POST', body: formData });
};
export interface DocumentStatusResponse { /* ... */ document_id: string; status: string; file_name?: string | null; file_type?: string | null; chunk_count?: number | null; error_message?: string | null; last_updated?: string; message?: string | null; }
export const getDocumentStatus = async (documentId: string): Promise<DocumentStatusResponse> => {
    return request<DocumentStatusResponse>(`/api/v1/ingest/status/${documentId}`, { method: 'GET' });
};
export const listDocumentStatuses = async (): Promise<DocumentStatusResponse[]> => {
    return request<DocumentStatusResponse[]>('/api/v1/ingest/status', { method: 'GET' });
};


// --- Query & Chat Service Calls (sin cambios, ya usan /api/v1/) ---
export interface RetrievedDocApi { /* ... */ id: string; score?: number | null; content_preview?: string | null; metadata?: Record<string, any> | null; document_id?: string | null; file_name?: string | null; }
export interface RetrievedDoc { /* ... */ id: string; score?: number | null; content_preview?: string | null; metadata?: Record<string, any> | null; document_id?: string | null; file_name?: string | null; }
export interface ChatSummary { /* ... */ id: string; title: string | null; updated_at: string; }
export interface ChatMessageApi { /* ... */ id: string; role: 'user' | 'assistant'; content: string; sources: RetrievedDocApi[] | null; created_at: string; }
export interface QueryPayload { /* ... */ query: string; retriever_top_k?: number; chat_id?: string | null; }
export interface QueryApiResponse { /* ... */ answer: string; retrieved_documents: RetrievedDocApi[]; query_log_id?: string | null; chat_id: string; }

export const getChats = async (): Promise<ChatSummary[]> => { /* ... */ return request<ChatSummary[]>('/api/v1/chats'); };
export const getChatMessages = async (chatId: string): Promise<ChatMessageApi[]> => { /* ... */ return request<ChatMessageApi[]>(`/api/v1/chats/${chatId}/messages`); };
export const postQuery = async (payload: QueryPayload): Promise<QueryApiResponse> => { /* ... */ return request<QueryApiResponse>('/api/v1/query', { method: 'POST', body: JSON.stringify({...payload, chat_id: payload.chat_id || null}) }); };
export const deleteChat = async (chatId: string): Promise<void> => { /* ... */ await request<null>(`/api/v1/chats/${chatId}`, { method: 'DELETE' }); };


// --- Type Mapping Helpers (sin cambios) ---
export const mapApiSourcesToFrontend = (apiSources: RetrievedDocApi[] | null): RetrievedDoc[] | undefined => { /* ... */ };
export const mapApiMessageToFrontend = (apiMessage: ChatMessageApi): Message => { /* ... */ };