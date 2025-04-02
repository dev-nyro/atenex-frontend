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
  status: number;
  data?: ApiErrorData;

  constructor(message: string, status: number, data?: ApiErrorData) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.data = data;
    // Mantener la cadena de prototipos para instanceof
    Object.setPrototypeOf(this, ApiError.prototype);
  }
}

// --- Core Request Function (Modificada para obtener token de Supabase) ---
async function request<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  let url: string;
  const cleanEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;

  // Validar que el endpoint sea para el API Gateway
  if (!cleanEndpoint.startsWith('/api/v1/')) {
    throw new Error(`Invalid API endpoint: ${cleanEndpoint}. Must start with /api/v1/`);
  }

  const gatewayUrl = getApiGatewayUrl();
  url = `${gatewayUrl}${cleanEndpoint}`;

  // --- CORRECCIÓN: Obtener token de la sesión de Supabase ---
  let token: string | null = null;
  try {
    // Obtener la sesión actual. Esto podría devolver una sesión expirada que se refrescará.
    const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
    if (sessionError) {
      console.error("API Request: Error getting Supabase session:", sessionError);
      // Decide cómo manejar esto: ¿continuar sin token o lanzar error?
      // Por ahora, continuamos sin token, el backend lo rechazará si es necesario.
    }
    token = sessionData?.session?.access_token || null;
    if (!token) {
        console.warn(`API Request: No Supabase access token found for ${cleanEndpoint}. Request might fail if endpoint is protected.`);
    }
  } catch (e) {
      console.error("API Request: Unexpected error fetching Supabase session:", e);
  }
  // --------------------------------------------------------

  const headers = new Headers(options.headers || {});
  headers.set('Accept', 'application/json');

  // No establecer Content-Type si el body es FormData
  if (!(options.body instanceof FormData)) {
    headers.set('Content-Type', 'application/json');
  }

  // Añadir token de autorización si existe
  if (token) {
    headers.set('Authorization', `Bearer ${token}`);
  }

  const config: RequestInit = { ...options, headers };

  // Loguear la solicitud (sin el cuerpo para evitar data sensible en logs)
  console.log(`API Request: ${config.method || 'GET'} ${url} (Token ${token ? 'Present' : 'Absent'})`);

  try {
    const response = await fetch(url, config);

    // --- Manejo de Respuesta (Mejorado) ---
    if (!response.ok) {
      let errorData: ApiErrorData | null = null;
      let errorText = '';
      const contentType = response.headers.get('content-type');

      try {
        if (contentType && contentType.includes('application/json')) {
          errorData = await response.json();
        } else {
          errorText = await response.text(); // Leer como texto si no es JSON
        }
      } catch (e) {
        // Ignorar errores al parsear el cuerpo del error, puede estar vacío o no ser parseable
        console.warn(`API Request: Could not parse error response body for ${response.status} from ${url}`, e);
        try { errorText = await response.text(); } catch {} // Intentar leer como texto como fallback
      }

      let errorMessage = `API Error (${response.status})`;

      // Extraer mensaje de error detallado (priorizando 'detail', luego 'message')
      if (errorData?.detail && typeof errorData.detail === 'string') {
        errorMessage = errorData.detail;
      } else if (errorData?.detail && Array.isArray(errorData.detail) && errorData.detail.length > 0) {
        // Manejar errores de validación de FastAPI
        errorMessage = errorData.detail.map(e => `${e.loc?.join('.')} - ${e.msg}`).join('; ') || 'Validation Error';
      } else if (errorData?.message && typeof errorData.message === 'string') {
        errorMessage = errorData.message;
      } else if (errorText) {
        // Usar texto si no hay JSON o datos útiles
        errorMessage = errorText.substring(0, 200); // Limitar longitud
      } else {
        // Mensajes genéricos por código de estado
        switch (response.status) {
          case 400: errorMessage = 'Bad Request'; break;
          case 401: errorMessage = 'Authentication required or token invalid.'; break; // Más específico
          case 403: errorMessage = 'Forbidden. You might be missing permissions or required data (like Company ID).'; break; // Más específico
          case 404: errorMessage = 'Resource not found.'; break;
          case 500: errorMessage = 'Internal Server Error'; break;
          default: errorMessage = `HTTP error ${response.status}`;
        }
      }

      console.error(`API Error Response: ${response.status} ${errorMessage}`, { url, status: response.status, errorData, errorText });
      throw new ApiError(errorMessage, response.status, errorData || undefined);
    }

    // Manejar respuestas sin contenido (ej. 204 No Content)
    if (response.status === 204 || response.headers.get('content-length') === '0') {
      return null as T; // Devolver null explícitamente
    }

    // Parsear JSON para respuestas exitosas con contenido
    try {
      const data: T = await response.json();
      return data;
    } catch (jsonError) {
      console.error(`API Request: Invalid JSON response for successful request from ${url}`, jsonError);
      throw new ApiError(`Invalid JSON response received from server.`, response.status);
    }
    // --- Fin Manejo de Respuesta ---

  } catch (error) {
    // --- Manejo de Errores de Red y Otros (Mejorado) ---
    if (error instanceof ApiError) {
      // Si ya es un ApiError (lanzado arriba), simplemente re-lanzarlo.
      throw error;
    } else if (error instanceof TypeError && (error.message.includes('fetch') || error.message.includes('NetworkError') || error.message.includes('Failed to fetch'))) {
      // Error de red (no se pudo conectar al servidor)
      const networkErrorMessage = `Network error connecting to API Gateway at ${gatewayUrl}. Please check your connection and the gateway status.`;
      console.error('API Request Network Error:', { url, gatewayUrl, error: error.message });
      throw new ApiError(networkErrorMessage, 0); // Usar status 0 o un código específico para red
    } else {
      // Otros errores inesperados durante la solicitud
      console.error('API Request Unexpected Error:', { url, error });
      const message = error instanceof Error ? error.message : 'An unexpected error occurred during the API request.';
      throw new ApiError(message, 500); // Asumir 500 para errores genéricos
    }
    // --- Fin Manejo de Errores ---
  }
}

// --- Funciones Específicas de API (Usando la función `request` refactorizada) ---

// Ingest Service Types
export interface IngestResponse {
    document_id: string;
    task_id: string; // ID de la tarea de Celery (o similar) para seguimiento
    status: string; // Estado inicial (e.g., 'queued')
    message: string;
}

// Ingest Service Endpoints
export const uploadDocument = async (formData: FormData, metadata: Record<string, any> = {}): Promise<IngestResponse> => {
    // Metadata podría necesitar ser enviada como un campo separado o stringified si el endpoint lo espera así.
    // Por ahora, asumimos que se puede añadir al FormData si el backend lo soporta, o se ignora si no.
    // formData.append('metadata', JSON.stringify(metadata)); // Descomentar si el backend espera 'metadata' en el form
    console.log("Uploading document via API Gateway...");
    return request<IngestResponse>('/api/v1/ingest/documents', {
        method: 'POST',
        body: formData,
        // No establecer 'Content-Type': 'multipart/form-data', fetch lo hace automáticamente con FormData
    });
};

// Query/Chat Service Types
export interface DocumentStatusResponse {
    document_id: string;
    status: 'uploaded' | 'processing' | 'processed' | 'indexed' | 'error' | string; // Añadir string para estados desconocidos
    file_name?: string | null;
    file_type?: string | null;
    chunk_count?: number | null;
    error_message?: string | null;
    last_updated?: string; // ISO 8601 string
    message?: string | null; // Mensaje adicional del backend
}

export interface RetrievedDocApi {
    id: string; // ID del chunk/documento recuperado
    score?: number | null;
    content_preview?: string | null;
    metadata?: Record<string, any> | null;
    document_id?: string | null; // ID del documento original
    file_name?: string | null; // Nombre del archivo original
}
// Interfaz Frontend (puede ser la misma si no hay transformación necesaria)
export type RetrievedDoc = RetrievedDocApi;

export interface ChatSummary {
    id: string; // Chat ID
    title: string | null; // Título del chat (puede ser generado o el primer mensaje)
    created_at: string; // ISO 8601 string
    updated_at: string; // ISO 8601 string
}

export interface ChatMessageApi {
    id: string; // Message ID
    chat_id: string;
    role: 'user' | 'assistant';
    content: string;
    sources: RetrievedDocApi[] | null; // Documentos usados para generar la respuesta del asistente
    created_at: string; // ISO 8601 string
}

export interface QueryPayload {
    query: string;
    retriever_top_k?: number; // Opcional: cuántos documentos recuperar
    chat_id?: string | null; // ID del chat existente o null/undefined para uno nuevo
}

export interface QueryApiResponse {
    answer: string;
    retrieved_documents: RetrievedDocApi[];
    query_log_id?: string | null; // ID para seguimiento/logs
    chat_id: string; // ID del chat (nuevo o existente)
}

// Query/Chat Service Endpoints
export const getChats = async (): Promise<ChatSummary[]> => {
    console.log("Fetching chat list...");
    return request<ChatSummary[]>('/api/v1/query/chats'); // Asumiendo endpoint /chats en query-service
};

export const getChatMessages = async (chatId: string): Promise<ChatMessageApi[]> => {
    console.log(`Fetching messages for chat ${chatId}...`);
    return request<ChatMessageApi[]>(`/api/v1/query/chats/${chatId}/messages`); // Asumiendo endpoint anidado
};

export const postQuery = async (payload: QueryPayload): Promise<QueryApiResponse> => {
    console.log(`Posting query (Chat ID: ${payload.chat_id || 'New'})...`);
    return request<QueryApiResponse>('/api/v1/query/ask', { // Asumiendo endpoint /ask en query-service
        method: 'POST',
        body: JSON.stringify({
            ...payload,
            chat_id: payload.chat_id || null // Asegurar que se envía null si es undefined
        }),
    });
};

export const deleteChat = async (chatId: string): Promise<void> => {
    console.log(`Deleting chat ${chatId}...`);
    // Esperamos una respuesta 204 No Content o similar
    await request<null>(`/api/v1/query/chats/${chatId}`, { method: 'DELETE' });
};

// Status Endpoint (asumiendo que está en Ingest Service)
export const listDocumentStatuses = async (): Promise<DocumentStatusResponse[]> => {
    console.log("Fetching all document statuses...");
    // Asumiendo que el endpoint para listar todos los estados está en /api/v1/ingest/documents/status
    // O podría ser /api/v1/ingest/statuses - Ajusta según tu backend real
    return request<DocumentStatusResponse[]>('/api/v1/ingest/documents/status');
};

// --- NUEVA FUNCIÓN: Ensure Company Association ---
interface EnsureCompanyResponse {
  message: string;
  company_id?: string; // El ID que se asoció (opcional, pero útil)
}
/**
 * Llama al endpoint del gateway para asegurar que el usuario autenticado
 * tenga una compañía asociada en sus metadatos.
 * Esta función DEBE llamarse con el token JWT del usuario.
 */
export const ensureCompanyAssociation = async (): Promise<EnsureCompanyResponse> => {
  console.log("Calling API to ensure company association for the current user...");
  // No se envía body, el backend determina el company ID
  return request<EnsureCompanyResponse>('/api/v1/users/me/ensure-company', {
      method: 'POST',
      // No body needed if backend uses default or derives companyId
  });
};
// --- FIN NUEVA FUNCIÓN ---

// --- Type Mapping Helpers (sin cambios, ya parecen correctos) ---
export const mapApiSourcesToFrontend = (apiSources: RetrievedDocApi[] | null): RetrievedDoc[] | undefined => { /* ... */ };
export const mapApiMessageToFrontend = (apiMessage: ChatMessageApi): Message => { /* ... */ };