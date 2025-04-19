// File: lib/api.ts (CORREGIDO - Mapeo ID en getDocumentStatusList, validaciones)
// Purpose: Centralized API request function and specific API call definitions.
import { getApiGatewayUrl } from './utils';
import type { Message } from '@/components/chat/chat-message';
import { AUTH_TOKEN_KEY } from './constants';

// --- Tipos de Error (sin cambios) ---
interface ApiErrorDataDetail { msg: string; type: string; loc?: (string | number)[]; }
interface ApiErrorData { detail?: string | ApiErrorDataDetail[] | any; message?: string; }
export class ApiError extends Error {
    status: number; data?: ApiErrorData;
    constructor(message: string, status: number, data?: ApiErrorData) {
        super(message); this.name = 'ApiError'; this.status = status; this.data = data;
        Object.setPrototypeOf(this, ApiError.prototype);
    }
}

// --- Función Genérica de Request (sin cambios estructurales) ---
export async function request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const cleanEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
    if (!cleanEndpoint.startsWith('/api/v1/') && cleanEndpoint !== '/api/v1/docs' && cleanEndpoint !== '/openapi.json') {
        console.error(`Invalid API endpoint format: ${cleanEndpoint}. Must start with /api/v1/ (or be /api/v1/docs, /openapi.json)`);
        throw new ApiError(`Invalid API endpoint format: ${cleanEndpoint}.`, 400);
    }
    let apiUrl: string;
    try { apiUrl = `${getApiGatewayUrl()}${cleanEndpoint}`; } catch (err) {
        const message = err instanceof Error ? err.message : "API Gateway URL configuration error.";
        console.error("API Request failed: Could not get API Gateway URL.", err); throw new ApiError(message, 500);
    }
    let token: string | null = null; if (typeof window !== 'undefined') { token = localStorage.getItem(AUTH_TOKEN_KEY); }
    const headers = new Headers(options.headers || {}); headers.set('Accept', 'application/json');
    if (apiUrl.includes("ngrok-free.app")) { headers.set('ngrok-skip-browser-warning', 'true'); }
    if (!(options.body instanceof FormData)) { if (!headers.has('Content-Type')) { headers.set('Content-Type', 'application/json'); } } else { headers.delete('Content-Type'); }
    if (token) { headers.set('Authorization', `Bearer ${token}`); }
    else if (!cleanEndpoint.includes('/api/v1/users/login') && cleanEndpoint !== '/api/v1/docs' && cleanEndpoint !== '/openapi.json') { console.warn(`API Request: Making request to protected endpoint ${cleanEndpoint} without Authorization header.`); }
    const config: RequestInit = { ...options, headers };
    try {
        const response = await fetch(apiUrl, config);
        if (!response.ok) {
            let errorData: ApiErrorData | null = null; let errorText = ''; const contentType = response.headers.get('content-type');
            try { if (contentType && contentType.includes('application/json')) { errorData = await response.json(); } else { errorText = await response.text(); } }
            catch (parseError) { console.warn(`API Request: Could not parse error response body for ${response.status} ${response.statusText} from ${apiUrl}`, parseError); try { errorText = await response.text(); } catch {}}
            let errorMessage = `API Error (${response.status})`;
            if (errorData) {
                if (typeof errorData.detail === 'string') { errorMessage = errorData.detail; }
                else if (Array.isArray(errorData.detail) && errorData.detail.length > 0 && typeof errorData.detail[0].msg === 'string') { errorMessage = errorData.detail.map(d => `${d.loc ? d.loc.join('.')+': ' : ''}${d.msg}`).join('; '); }
                else if (typeof errorData.message === 'string') { errorMessage = errorData.message; }
                else { errorMessage = JSON.stringify(errorData.detail).substring(0, 200); }
            } else if (errorText) { errorMessage = errorText.substring(0, 200); }
            else { errorMessage = response.statusText || `Request failed with status ${response.status}`; }
            console.error(`API Error Response: ${response.status} ${response.statusText} from ${apiUrl}`, { data: errorData, text: errorText });
            throw new ApiError(errorMessage, response.status, errorData || undefined);
        }
        if (response.status === 204 || response.headers.get('content-length') === '0') { return null as T; }
        try { const data: T = await response.json(); return data; }
        catch (jsonError) {
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

// --- Tipos Específicos de Servicio ---
export interface IngestResponse { document_id: string; task_id: string; status: string; message: string; }
export interface AuthHeaders { 'X-Company-ID': string; 'X-User-ID': string; }
// FLAG_LLM: Interfaz actualizada para coincidir con los logs (usa 'id' en lugar de 'document_id')
export interface DocumentStatusApiResponse {
    id: string; // ID Principal del documento (UUID)
    status: 'uploaded' | 'processing' | 'processed' | 'error' | string; // Tipos conocidos + fallback string
    file_name?: string | null;
    file_type?: string | null;
    file_path?: string | null; // Añadido según logs
    company_id?: string; // Añadido según logs
    chunk_count?: number | null;
    error_message?: string | null;
    created_at?: string; // Fecha creación DB record
    uploaded_at?: string; // Fecha subida original
    last_updated?: string; // Fecha última actualización DB record
    minio_exists?: boolean; // Existe en MinIO?
    milvus_chunk_count?: number; // Conteo real en Milvus
    message?: string; // Mensaje adicional del backend
    // Añadir cualquier otro campo que devuelva la API si es necesario
}
// Interfaz Frontend (mantenemos document_id como clave principal para consistencia interna)
export interface DocumentStatusResponse {
    document_id: string; // Usaremos este como identificador principal en el frontend
    status: 'uploaded' | 'processing' | 'processed' | 'error' | string;
    file_name?: string | null;
    file_type?: string | null;
    chunk_count?: number | null;
    error_message?: string | null;
    created_at?: string;
    last_updated?: string; // Cambiado de last_updated a string opcional
    minio_exists?: boolean;
    milvus_chunk_count?: number;
}
// Interfaz detallada (hereda de la de frontend)
export interface DetailedDocumentStatusResponse extends DocumentStatusResponse {
    minio_exists: boolean;
    milvus_chunk_count: number;
    message?: string;
}
// --- Resto de interfaces (sin cambios) ---
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
  const formData = new FormData(); formData.append('file', file);
  return request<IngestResponse>('/api/v1/ingest/upload', { method: 'POST', headers: { ...auth } as Record<string, string>, body: formData });
}

// FLAG_LLM: Mapeo de la respuesta API a la interfaz del frontend
const mapApiResponseToFrontend = (apiDoc: DocumentStatusApiResponse): DocumentStatusResponse => {
    return {
        document_id: apiDoc.id, // Mapear id a document_id
        status: apiDoc.status,
        file_name: apiDoc.file_name,
        file_type: apiDoc.file_type,
        chunk_count: apiDoc.chunk_count,
        error_message: apiDoc.error_message,
        created_at: apiDoc.created_at || apiDoc.uploaded_at, // Usar created_at o uploaded_at
        last_updated: apiDoc.last_updated, // Usar el campo que venga
        minio_exists: apiDoc.minio_exists,
        milvus_chunk_count: apiDoc.milvus_chunk_count,
    };
};

export async function getDocumentStatusList(auth: AuthHeaders, limit: number = 50, offset: number = 0): Promise<DocumentStatusResponse[]> {
  const endpoint = `/api/v1/ingest/status?limit=${limit}&offset=${offset}`;
  // Pedimos la respuesta como array de DocumentStatusApiResponse
  const apiResponse = await request<DocumentStatusApiResponse[]>(endpoint, { method: 'GET', headers: { ...auth } as Record<string, string> });
  // Mapeamos cada objeto al formato esperado por el frontend
  return (apiResponse || []).map(mapApiResponseToFrontend);
}

export const getDocumentStatus = async (documentId: string, auth: AuthHeaders): Promise<DetailedDocumentStatusResponse> => {
    if (!documentId || typeof documentId !== 'string') { throw new ApiError("Se requiere un ID de documento válido.", 400); }
    // La respuesta detallada también necesita mapeo si usa 'id'
    const apiDoc = await request<DocumentStatusApiResponse>(`/api/v1/ingest/status/${documentId}`, { method: 'GET', headers: { ...auth } as Record<string, string> });
    // Mapear y asegurar campos detallados
    const frontendDoc = mapApiResponseToFrontend(apiDoc) as DetailedDocumentStatusResponse;
    frontendDoc.minio_exists = apiDoc.minio_exists ?? false; // Asegurar valor booleano
    frontendDoc.milvus_chunk_count = apiDoc.milvus_chunk_count ?? -1; // Asegurar valor numérico o -1
    frontendDoc.message = apiDoc.message;
    return frontendDoc;
};

export async function retryIngestDocument(documentId: string, auth: AuthHeaders): Promise<IngestResponse> {
  if (!documentId || typeof documentId !== 'string') { throw new ApiError("Se requiere un ID de documento válido para reintentar.", 400); }
  const endpoint = `/api/v1/ingest/retry/${documentId}`;
  return request<IngestResponse>(endpoint, { method: 'POST', headers: { 'Content-Type': 'application/json', ...auth } as Record<string, string> });
}

export async function deleteIngestDocument(documentId: string, auth: AuthHeaders): Promise<void> {
  if (!documentId || typeof documentId !== 'string') { throw new ApiError("Se requiere un ID de documento válido para eliminar.", 400); }
  // Usar la ruta correcta /api/v1/ingest/{document_id}
  await request<null>(`/api/v1/ingest/${documentId}`, { method: 'DELETE', headers: { ...auth } as Record<string, string> });
}

// ** QUERY SERVICE ** (Funciones sin cambios estructurales, solo validaciones añadidas)
export const getChats = async (limit: number = 100, offset: number = 0): Promise<ChatSummary[]> => {
     const endpoint = `/api/v1/query/chats?limit=${limit}&offset=${offset}`;
     const response = await request<ChatSummary[]>(endpoint); return response || [];
};
export const getChatMessages = async (chatId: string, limit: number = 100, offset: number = 0): Promise<ChatMessageApi[]> => {
     if (!chatId || typeof chatId !== 'string') { throw new ApiError("Se requiere un ID de chat válido.", 400); }
     const endpoint = `/api/v1/query/chats/${chatId}/messages?limit=${limit}&offset=${offset}`;
     const response = await request<ChatMessageApi[]>(endpoint); return response || [];
};
export const postQuery = async (payload: QueryPayload): Promise<QueryApiResponse> => {
     const body = { ...payload, chat_id: payload.chat_id || null };
     return request<QueryApiResponse>('/api/v1/query/ask', { method: 'POST', body: JSON.stringify(body) });
};
export const deleteChat = async (chatId: string): Promise<void> => {
    if (!chatId || typeof chatId !== 'string') { throw new ApiError("Se requiere un ID de chat válido para eliminar.", 400); }
    await request<null>(`/api/v1/query/chats/${chatId}`, { method: 'DELETE' });
};

// --- Helpers de Mapeo (sin cambios, ya presentes y correctos) ---
export const mapApiSourcesToFrontend = (apiSources: ChatMessageApi['sources']): RetrievedDoc[] | undefined => {
    if (!apiSources || apiSources.length === 0) return undefined;
    return apiSources.map(source => ({
        id: source.chunk_id, document_id: source.document_id, file_name: source.file_name || null,
        content: source.preview, content_preview: source.preview, metadata: null, score: source.score,
    }));
};
export const mapApiMessageToFrontend = (apiMessage: ChatMessageApi): Message => {
    const mappedSources = mapApiSourcesToFrontend(apiMessage.sources);
    return { id: apiMessage.id, role: apiMessage.role, content: apiMessage.content, sources: mappedSources, isError: false, created_at: apiMessage.created_at, };
};