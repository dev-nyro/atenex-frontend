// File: lib/api.ts (REVISADO Y ASEGURADO - Coincide con READMEs)
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
    if (!cleanEndpoint.startsWith('/api/v1/')) {
        console.error(`Invalid API endpoint format: ${cleanEndpoint}. Must start with /api/v1/`);
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
        console.warn(`API Request: localStorage not available for ${cleanEndpoint} (SSR/Server Context?). Cannot get auth token.`);
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
    } else if (!cleanEndpoint.includes('/api/v1/users/login')) {
        // Advertir si se llama a endpoint protegido sin token (excepto login)
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

// --- Tipos Específicos de Servicio ---

// --- Ingest Service ---
export interface IngestResponse {
    document_id: string;
    task_id: string; // ID de la tarea Celery
    status: string; // Estado inicial ('uploaded' o 'processing' si reintenta)
    message: string; // Mensaje de confirmación
}

export interface AuthHeaders {
  'X-Company-ID': string;
  'X-User-ID': string;
}

// Interfaz para la respuesta de la lista de estados (GET /status)
export interface DocumentStatusResponse {
    document_id: string;
    status: 'uploaded' | 'processing' | 'processed' | 'error' | string; // Tipos conocidos + fallback string
    file_name?: string | null;
    file_type?: string | null;
    chunk_count?: number | null; // Desde DB
    error_message?: string | null; // Mensaje de error si status='error'
    created_at?: string; // Fecha creación registro
    last_updated: string; // Fecha última actualización registro
    // Campos adicionales que el backend añade al verificar en GET /status
    minio_exists?: boolean; // Si el archivo existe en MinIO (verificado por el backend)
    milvus_chunk_count?: number; // Conteo real de chunks en Milvus (verificado por el backend)
}

// Interfaz para la respuesta detallada (GET /status/{id}) - campos de verificación garantizados
export interface DetailedDocumentStatusResponse extends DocumentStatusResponse {
    minio_exists: boolean; // Garantizado
    milvus_chunk_count: number; // Garantizado
    message?: string; // Mensaje descriptivo adicional del backend
}


// --- Query Service ---
export interface RetrievedDocApi {
    id: string; // ID del chunk en Milvus
    document_id: string; // ID del documento padre
    file_name: string | null; // Nombre del archivo original
    content: string; // Contenido completo del chunk (puede ser largo)
    content_preview: string; // Versión corta/preview del contenido
    metadata: Record<string, any> | null; // Metadatos asociados al chunk
    score: number; // Puntuación de relevancia del retriever
}
// Usamos el mismo tipo para frontend por ahora
export type RetrievedDoc = RetrievedDocApi;

export interface ChatSummary {
    id: string; // ID del chat
    title: string | null; // Título del chat (puede ser null)
    created_at: string; // Fecha creación
    updated_at: string; // Fecha última actualización
    message_count: number; // Número de mensajes en el chat
}

export interface ChatMessageApi {
    id: string; // ID del mensaje
    chat_id: string; // ID del chat al que pertenece
    role: 'user' | 'assistant'; // Quién envió el mensaje
    content: string; // Contenido del mensaje
    // Fuentes usadas por el asistente (si aplica)
    sources: Array<{
        chunk_id: string;
        document_id: string;
        file_name: string | null;
        score: number;
        preview: string; // Vista previa del chunk fuente
    }> | null;
    created_at: string; // Fecha creación del mensaje
}

export interface QueryPayload {
    query: string; // La pregunta del usuario
    retriever_top_k?: number; // Opcional: cuántos documentos recuperar
    chat_id?: string | null; // Opcional: ID del chat existente o null para uno nuevo
}

export interface QueryApiResponse {
    answer: string; // La respuesta del LLM
    retrieved_documents: RetrievedDocApi[]; // Documentos/chunks usados
    query_log_id: string | null; // ID del registro en query_logs
    chat_id: string; // ID del chat (nuevo o existente)
}


// --- Auth Service (API Gateway) ---
// No necesitamos definir LoginPayload aquí, se pasa directamente en useAuth
export interface LoginResponse {
    access_token: string; // El token JWT
    token_type: string; // "bearer"
    // Información del usuario devuelta para conveniencia (puede variar)
    user_id: string;
    email: string;
    full_name: string | null;
    role: string; // O roles: string[]
    company_id: string | null; // Puede ser null si aún no está asociado
}


// --- Funciones API Específicas ---

// ** INGEST SERVICE **

/**
 * POST /api/v1/ingest/upload
 * Sube un archivo para ser procesado. Requiere X-Company-ID y X-User-ID (implícito en auth).
 */
export async function uploadDocument(file: File, auth: AuthHeaders): Promise<IngestResponse> {
  const formData = new FormData();
  formData.append('file', file);
  // Metadata JSON opcional - no implementado en UI actual
  // formData.append('metadata_json', JSON.stringify({ custom_key: 'value' }));
  return request<IngestResponse>('/api/v1/ingest/upload', {
    method: 'POST',
    headers: { ...auth } as Record<string, string>, // Pasar headers de autenticación/compañía
    body: formData,
  });
}

/**
 * GET /api/v1/ingest/status
 * Obtiene la lista paginada de estados de documentos para la compañía. Requiere X-Company-ID.
 */
export async function getDocumentStatusList(auth: AuthHeaders, limit: number = 50, offset: number = 0): Promise<DocumentStatusResponse[]> {
  const endpoint = `/api/v1/ingest/status?limit=${limit}&offset=${offset}`;
  const response = await request<DocumentStatusResponse[]>(endpoint, {
    method: 'GET',
    headers: { ...auth } as Record<string, string>,
  });
  return response || []; // Devolver array vacío si la respuesta es null/undefined
}

/**
 * GET /api/v1/ingest/status/{document_id}
 * Obtiene el estado detallado de un documento específico. Requiere X-Company-ID.
 */
export const getDocumentStatus = async (documentId: string, auth: AuthHeaders): Promise<DetailedDocumentStatusResponse> => {
    return request<DetailedDocumentStatusResponse>(`/api/v1/ingest/status/${documentId}`, {
        method: 'GET',
        headers: { ...auth } as Record<string, string>
    });
};

/**
 * POST /api/v1/ingest/retry/{document_id}
 * Reintenta la ingesta de un documento que falló. Requiere X-Company-ID y X-User-ID.
 */
export async function retryIngestDocument(documentId: string, auth: AuthHeaders): Promise<IngestResponse> {
  const endpoint = `/api/v1/ingest/retry/${documentId}`;
  // Este endpoint espera 202 Accepted con un cuerpo IngestResponse
  return request<IngestResponse>(endpoint, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json', // Aunque no haya body, especificar
        ...auth
    } as Record<string, string>,
  });
}

/**
 * DELETE /api/v1/ingest/{document_id}
 * Elimina un documento (registro DB, archivo MinIO, chunks Milvus). Requiere X-Company-ID.
 */
export async function deleteIngestDocument(documentId: string, auth: AuthHeaders): Promise<void> {
  // Espera 204 No Content, que request<T> manejará devolviendo null.
  // El tipo de retorno void es correcto para el consumidor.
  await request<null>(`/api/v1/ingest/${documentId}`, {
    method: 'DELETE',
    headers: { ...auth } as Record<string, string>,
  });
}


// ** QUERY SERVICE **

/**
 * GET /api/v1/query/chats
 * Obtiene la lista de chats del usuario/compañía. Requiere X-Company-ID y X-User-ID (implícitos en el token).
 */
export const getChats = async (limit: number = 100, offset: number = 0): Promise<ChatSummary[]> => {
     const endpoint = `/api/v1/query/chats?limit=${limit}&offset=${offset}`;
     const response = await request<ChatSummary[]>(endpoint); // No necesita pasar auth explícito, va en token
     return response || [];
};

/**
 * GET /api/v1/query/chats/{chat_id}/messages
 * Obtiene los mensajes de un chat específico. Requiere X-Company-ID y X-User-ID.
 */
export const getChatMessages = async (chatId: string, limit: number = 100, offset: number = 0): Promise<ChatMessageApi[]> => {
     const endpoint = `/api/v1/query/chats/${chatId}/messages?limit=${limit}&offset=${offset}`;
     const response = await request<ChatMessageApi[]>(endpoint);
     return response || [];
};

/**
 * POST /api/v1/query/ask
 * Envía una consulta para obtener una respuesta (RAG o saludo). Requiere X-Company-ID y X-User-ID.
 */
export const postQuery = async (payload: QueryPayload): Promise<QueryApiResponse> => {
     // Asegurar que chat_id sea null si no se proporciona, como espera el backend
     const body = { ...payload, chat_id: payload.chat_id || null };
     return request<QueryApiResponse>('/api/v1/query/ask', {
        method: 'POST',
        body: JSON.stringify(body),
        // Content-Type es añadido por defecto en request()
     });
};

/**
 * DELETE /api/v1/query/chats/{chat_id}
 * Elimina un chat y sus mensajes/logs asociados. Requiere X-Company-ID y X-User-ID.
 */
export const deleteChat = async (chatId: string): Promise<void> => {
    // Espera 204 No Content
    await request<null>(`/api/v1/query/chats/${chatId}`, { method: 'DELETE' });
};


// --- Helpers de Mapeo de Tipos (API -> Frontend) ---

export const mapApiSourcesToFrontend = (apiSources: ChatMessageApi['sources']): RetrievedDoc[] | undefined => {
    if (!apiSources || apiSources.length === 0) return undefined;
    return apiSources.map(source => ({
        // Mapeo cuidadoso según las definiciones de tipos
        id: source.chunk_id,
        document_id: source.document_id,
        file_name: source.file_name || null, // Asegurar null si no viene
        content: source.preview, // Usar preview como content principal por ahora
        content_preview: source.preview,
        metadata: null, // Metadata no viene en este nivel según ChatMessageApi
        score: source.score,
    }));
};

export const mapApiMessageToFrontend = (apiMessage: ChatMessageApi): Message => {
    const mappedSources = mapApiSourcesToFrontend(apiMessage.sources);
    return {
        id: apiMessage.id,
        role: apiMessage.role,
        content: apiMessage.content,
        sources: mappedSources, // Puede ser undefined
        isError: false, // Asumir no error al mapear desde API normal
        created_at: apiMessage.created_at,
    };
};