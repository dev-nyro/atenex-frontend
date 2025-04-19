// File: lib/api.ts (CORREGIDO - Ruta Delete y validaciones ID)
// Purpose: Centralized API request function and specific API call definitions.
import { getApiGatewayUrl } from './utils';
import type { Message } from '@/components/chat/chat-message';
import { AUTH_TOKEN_KEY } from './constants';

// --- Tipos de Error ---
interface ApiErrorDataDetail {
    msg: string;
    type: string;
    loc?: (string | number)[];
}
interface ApiErrorData {
    detail?: string | ApiErrorDataDetail[] | any;
    message?: string; // Campo alternativo común para mensajes de error
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

// --- Función Genérica de Request ---
/**
 * Realiza una solicitud a la API Gateway.
 * Maneja la URL base, token de autenticación, headers y errores comunes.
 * @param endpoint Ruta del endpoint (ej. '/api/v1/ingest/status')
 * @param options Opciones de Fetch API (method, body, etc.)
 * @returns Promise<T> La respuesta parseada como JSON o null si es 204.
 * @throws {ApiError} Si la respuesta no es OK (status >= 400) o hay otros errores.
 */
export async function request<T>(
    endpoint: string,
    options: RequestInit = {}
): Promise<T> {
    const cleanEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;

    // Validar formato del endpoint (debe empezar con /api/v1/)
    // FLAG_LLM: Permitir /api/v1/docs y /openapi.json para documentación autogenerada
    if (!cleanEndpoint.startsWith('/api/v1/') && cleanEndpoint !== '/api/v1/docs' && cleanEndpoint !== '/openapi.json') {
        console.error(`Invalid API endpoint format: ${cleanEndpoint}. Must start with /api/v1/ (or be /api/v1/docs, /openapi.json)`);
        throw new ApiError(`Invalid API endpoint format: ${cleanEndpoint}.`, 400);
    }

    // Obtener URL del API Gateway
    let apiUrl: string;
    try {
        apiUrl = `${getApiGatewayUrl()}${cleanEndpoint}`;
    } catch (err) {
        console.error("API Request failed: Could not get API Gateway URL.", err);
        const message = err instanceof Error ? err.message : "API Gateway URL configuration error.";
        throw new ApiError(message, 500);
    }

    // Obtener token de autenticación si está disponible
    let token: string | null = null;
    if (typeof window !== 'undefined') {
        token = localStorage.getItem(AUTH_TOKEN_KEY);
    } else {
        // Advertir si se ejecuta en contexto de servidor (no debería para llamadas protegidas)
        // console.warn(`API Request: localStorage not available for ${cleanEndpoint} (SSR/Server Context?). Cannot get auth token.`);
    }

    // Configurar Headers
    const headers = new Headers(options.headers || {});
    headers.set('Accept', 'application/json');
    // Header especial para evitar advertencia de Ngrok (si se usa)
    if (apiUrl.includes("ngrok-free.app")) {
        headers.set('ngrok-skip-browser-warning', 'true');
    }
    // Establecer Content-Type a JSON por defecto, excepto para FormData
    if (!(options.body instanceof FormData)) {
        if (!headers.has('Content-Type')) {
             headers.set('Content-Type', 'application/json');
        }
    } else {
        // Dejar que el navegador establezca Content-Type para FormData (incluye boundary)
        headers.delete('Content-Type');
    }
    // Añadir token de autorización si existe
    if (token) {
        headers.set('Authorization', `Bearer ${token}`);
    } else if (!cleanEndpoint.includes('/api/v1/users/login') && cleanEndpoint !== '/api/v1/docs' && cleanEndpoint !== '/openapi.json') {
        // Advertir si se llama a endpoint protegido sin token (excepto login y docs)
        console.warn(`API Request: Making request to protected endpoint ${cleanEndpoint} without Authorization header.`);
    }

    // Configuración final de la solicitud
    const config: RequestInit = {
        ...options,
        headers,
    };

    // Loggear la solicitud (útil para depuración)
    // console.log(`API Request: ${config.method || 'GET'} ${apiUrl}`);

    try {
        // Realizar la solicitud Fetch
        const response = await fetch(apiUrl, config);

        // --- Manejo de Respuestas ---

        // Si la respuesta NO es OK (status >= 400)
        if (!response.ok) {
            let errorData: ApiErrorData | null = null;
            let errorText = '';
            const contentType = response.headers.get('content-type');

            // Intentar parsear el cuerpo del error (JSON o Texto)
            try {
                if (contentType && contentType.includes('application/json')) {
                    errorData = await response.json();
                } else { errorText = await response.text(); }
            } catch (parseError) {
                 console.warn(`API Request: Could not parse error response body for ${response.status} ${response.statusText} from ${apiUrl}`, parseError);
                 try { errorText = await response.text(); } catch {} // Intenta leer como texto si falla JSON
            }

            // Construir mensaje de error significativo
            let errorMessage = `API Error (${response.status})`;
            if (errorData) {
                if (typeof errorData.detail === 'string') { // FastAPI a veces usa string
                    errorMessage = errorData.detail;
                } else if (Array.isArray(errorData.detail) && errorData.detail.length > 0 && typeof errorData.detail[0].msg === 'string') { // FastAPI validation errors
                    errorMessage = errorData.detail.map(d => `${d.loc ? d.loc.join('.')+': ' : ''}${d.msg}`).join('; ');
                } else if (typeof errorData.message === 'string') { // Otros formatos
                    errorMessage = errorData.message;
                } else {
                   // Si el detail es un objeto pero no con 'msg' (ej. error genérico de Starlette/FastAPI)
                   errorMessage = JSON.stringify(errorData.detail).substring(0, 200);
                }
            } else if (errorText) { // Si no hubo JSON o falló, usar texto
                errorMessage = errorText.substring(0, 200); // Limitar longitud
            } else { // Fallback
                errorMessage = response.statusText || `Request failed with status ${response.status}`;
            }

            console.error(`API Error Response: ${response.status} ${response.statusText} from ${apiUrl}`, { data: errorData, text: errorText });
            // Lanzar ApiError personalizado
            throw new ApiError(errorMessage, response.status, errorData || undefined);
        }

        // Manejo específico de respuestas 204 No Content
        if (response.status === 204 || response.headers.get('content-length') === '0') {
            return null as T; // Devuelve null explícito para concordar con Promise<void>
        }

        // Intentar parsear la respuesta JSON para respuestas OK con contenido
        try {
            const data: T = await response.json();
            return data;
        } catch (jsonError) {
             // Si falla el parseo JSON de una respuesta OK
             const responseText = await response.text().catch(() => "Could not read response text."); // Leer como texto para depurar
             console.error(`API Request: Invalid JSON response from ${apiUrl}. Status: ${response.status}. Response Text: ${responseText}`, jsonError);
             throw new ApiError(`Invalid JSON response received from server.`, response.status);
        }

    } catch (error) {
        // Re-lanzar ApiError si ya fue capturado
        if (error instanceof ApiError) { throw error; }
        // Manejar errores de red (TypeError: Failed to fetch)
        else if (error instanceof TypeError && error.message.toLowerCase().includes('failed to fetch')) {
             const networkErrorMsg = 'Network error or API Gateway unreachable. Check connection and API URL.';
             console.error(`API Request Network Error: ${networkErrorMsg} (URL: ${apiUrl})`, error);
             throw new ApiError(networkErrorMsg, 0); // Status 0 para errores de red
        } else {
             // Otros errores inesperados
             console.error(`API Request: Unexpected error during fetch to ${apiUrl}`, error);
             const message = error instanceof Error ? error.message : 'An unknown fetch error occurred.';
             throw new ApiError(`Unexpected fetch error: ${message}`, 500);
        }
    }
}

// --- Tipos Específicos de Servicio (Sin cambios estructurales) ---
export interface IngestResponse { document_id: string; task_id: string; status: string; message: string; }
export interface AuthHeaders { 'X-Company-ID': string; 'X-User-ID': string; }
export interface DocumentStatusResponse { document_id: string; status: 'uploaded' | 'processing' | 'processed' | 'error' | string; file_name?: string | null; file_type?: string | null; chunk_count?: number | null; error_message?: string | null; created_at?: string; last_updated: string; minio_exists?: boolean; milvus_chunk_count?: number; }
export interface DetailedDocumentStatusResponse extends DocumentStatusResponse { minio_exists: boolean; milvus_chunk_count: number; message?: string; }
export interface RetrievedDocApi { id: string; document_id: string; file_name: string | null; content: string; content_preview: string; metadata: Record<string, any> | null; score: number; }
export type RetrievedDoc = RetrievedDocApi;
export interface ChatSummary { id: string; title: string | null; created_at: string; updated_at: string; message_count: number; }
export interface ChatMessageApi { id: string; chat_id: string; role: 'user' | 'assistant'; content: string; sources: Array<{ chunk_id: string; document_id: string; file_name: string | null; score: number; preview: string; }> | null; created_at: string; }
export interface QueryPayload { query: string; retriever_top_k?: number; chat_id?: string | null; }
export interface QueryApiResponse { answer: string; retrieved_documents: RetrievedDocApi[]; query_log_id: string | null; chat_id: string; }
export interface LoginResponse { access_token: string; token_type: string; user_id: string; email: string; full_name: string | null; role: string; company_id: string | null; }

// --- Funciones API Específicas ---

// ** INGEST SERVICE **

export async function uploadDocument(file: File, auth: AuthHeaders): Promise<IngestResponse> {
  const formData = new FormData();
  formData.append('file', file);
  return request<IngestResponse>('/api/v1/ingest/upload', { method: 'POST', headers: { ...auth } as Record<string, string>, body: formData });
}

export async function getDocumentStatusList(auth: AuthHeaders, limit: number = 50, offset: number = 0): Promise<DocumentStatusResponse[]> {
  const endpoint = `/api/v1/ingest/status?limit=${limit}&offset=${offset}`;
  const response = await request<DocumentStatusResponse[]>(endpoint, { method: 'GET', headers: { ...auth } as Record<string, string> });
  return response || [];
}

export const getDocumentStatus = async (documentId: string, auth: AuthHeaders): Promise<DetailedDocumentStatusResponse> => {
    // FLAG_LLM: Añadir validación de documentId
    if (!documentId || typeof documentId !== 'string') {
        throw new ApiError("Se requiere un ID de documento válido.", 400); // 400 Bad Request
    }
    return request<DetailedDocumentStatusResponse>(`/api/v1/ingest/status/${documentId}`, { method: 'GET', headers: { ...auth } as Record<string, string> });
};

export async function retryIngestDocument(documentId: string, auth: AuthHeaders): Promise<IngestResponse> {
  // FLAG_LLM: Añadir validación de documentId
  if (!documentId || typeof documentId !== 'string') {
        throw new ApiError("Se requiere un ID de documento válido para reintentar.", 400);
  }
  const endpoint = `/api/v1/ingest/retry/${documentId}`;
  return request<IngestResponse>(endpoint, { method: 'POST', headers: { 'Content-Type': 'application/json', ...auth } as Record<string, string> });
}

/**
 * DELETE /api/v1/ingest/{document_id}
 * Elimina un documento (registro DB, archivo MinIO, chunks Milvus). Requiere X-Company-ID.
 */
export async function deleteIngestDocument(documentId: string, auth: AuthHeaders): Promise<void> {
  // FLAG_LLM: Validar ID antes de la llamada
  if (!documentId || typeof documentId !== 'string') {
        throw new ApiError("Se requiere un ID de documento válido para eliminar.", 400);
  }
  // FLAG_LLM: Corregir endpoint según la documentación proporcionada
  await request<null>(`/api/v1/ingest/${documentId}`, {
    method: 'DELETE',
    headers: { ...auth } as Record<string, string>,
  });
}

// ** QUERY SERVICE ** (Sin cambios en las funciones)

export const getChats = async (limit: number = 100, offset: number = 0): Promise<ChatSummary[]> => {
     const endpoint = `/api/v1/query/chats?limit=${limit}&offset=${offset}`;
     const response = await request<ChatSummary[]>(endpoint);
     return response || [];
};

export const getChatMessages = async (chatId: string, limit: number = 100, offset: number = 0): Promise<ChatMessageApi[]> => {
     // FLAG_LLM: Validar chatId
     if (!chatId || typeof chatId !== 'string') {
         throw new ApiError("Se requiere un ID de chat válido.", 400);
     }
     const endpoint = `/api/v1/query/chats/${chatId}/messages?limit=${limit}&offset=${offset}`;
     const response = await request<ChatMessageApi[]>(endpoint);
     return response || [];
};

export const postQuery = async (payload: QueryPayload): Promise<QueryApiResponse> => {
     const body = { ...payload, chat_id: payload.chat_id || null };
     return request<QueryApiResponse>('/api/v1/query/ask', { method: 'POST', body: JSON.stringify(body) });
};

export const deleteChat = async (chatId: string): Promise<void> => {
    // FLAG_LLM: Validar chatId
    if (!chatId || typeof chatId !== 'string') {
        throw new ApiError("Se requiere un ID de chat válido para eliminar.", 400);
    }
    await request<null>(`/api/v1/query/chats/${chatId}`, { method: 'DELETE' });
};


// --- Helpers de Mapeo de Tipos (API -> Frontend) (Sin cambios) ---
// export const mapApiSourcesToFrontend = (apiSources: ChatMessageApi['sources']): RetrievedDoc[] | undefined => { /* ... */ }; // Removed duplicate declaration
// export const mapApiMessageToFrontend = (apiMessage: ChatMessageApi): Message => { /* ... */ }; // Removed duplicate declaration

// Reimplementar el contenido omitido de mapApiSourcesToFrontend y mapApiMessageToFrontend
export const mapApiSourcesToFrontend = (apiSources: ChatMessageApi['sources']): RetrievedDoc[] | undefined => {
    if (!apiSources || apiSources.length === 0) return undefined;
    return apiSources.map(source => ({
        id: source.chunk_id,
        document_id: source.document_id,
        file_name: source.file_name || null,
        content: source.preview, // Asumiendo preview es suficiente para frontend 'content'
        content_preview: source.preview,
        metadata: null, // No disponible en este punto según API
        score: source.score,
    }));
};

export const mapApiMessageToFrontend = (apiMessage: ChatMessageApi): Message => {
    const mappedSources = mapApiSourcesToFrontend(apiMessage.sources);
    return {
        id: apiMessage.id,
        role: apiMessage.role,
        content: apiMessage.content,
        sources: mappedSources,
        isError: false,
        created_at: apiMessage.created_at,
    };
};