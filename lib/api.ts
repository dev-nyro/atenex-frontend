// File: lib/api.ts
// Purpose: Centralized API request function and specific API call definitions.
import { getApiGatewayUrl } from './utils';
import type { Message } from '@/components/chat/chat-message'; // Ensure Message interface is exported
import { AUTH_TOKEN_KEY } from './constants'; // Importar la clave para localStorage

// --- ApiError Class (sin cambios) ---
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

// --- Core Request Function (sin cambios en lógica principal, solo logs y manejo de token desde localStorage) ---
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

    // Obtener token desde localStorage
    let token: string | null = null;
    if (typeof window !== 'undefined') { // Asegurarse que se ejecuta en el cliente
        token = localStorage.getItem(AUTH_TOKEN_KEY);
        // console.log(`API Request to ${cleanEndpoint}: Token from localStorage ${token ? 'Present' : 'Absent'}`);
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
        // Browsers usually set the correct Content-Type for FormData automatically, including the boundary.
        // Explicitly setting it can sometimes cause issues. Let's remove it if body is FormData.
        headers.delete('Content-Type');
    }

    // Añadir token al header si existe
    if (token) {
        headers.set('Authorization', `Bearer ${token}`);
    } else if (!cleanEndpoint.includes('/api/v1/users/login')) { // No advertir para login
        console.warn(`API Request: Making request to protected endpoint ${cleanEndpoint} without Authorization header.`);
    }

    const config: RequestInit = {
        ...options,
        headers,
    };

    console.log(`API Request: ${config.method || 'GET'} ${apiUrl}`);

    try {
        const response = await fetch(apiUrl, config);

        // --- Manejo de Errores ---
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
                 try { errorText = await response.text(); } catch {} // Try reading as text as fallback
            }

            let errorMessage = `API Error (${response.status})`;
            // Extraer mensaje significativo de la respuesta de error
            if (errorData) {
                if (typeof errorData.detail === 'string') {
                    errorMessage = errorData.detail;
                } else if (Array.isArray(errorData.detail) && errorData.detail.length > 0 && typeof errorData.detail[0].msg === 'string') {
                    // Handle FastAPI validation errors
                    errorMessage = errorData.detail.map(d => `${d.loc ? d.loc.join('.')+': ' : ''}${d.msg}`).join('; ');
                } else if (typeof errorData.message === 'string') {
                    errorMessage = errorData.message;
                }
            } else if (errorText) {
                errorMessage = errorText.substring(0, 200); // Limit length if it's HTML or long text
            } else {
                errorMessage = response.statusText || `Request failed with status ${response.status}`;
            }

            console.error(`API Error Response: ${response.status} ${response.statusText} from ${apiUrl}`, { data: errorData, text: errorText });
            throw new ApiError(errorMessage, response.status, errorData || undefined);
        }

        // --- Manejo de respuestas exitosas ---
        if (response.status === 204 || response.headers.get('content-length') === '0') {
            return null as T;
        }

        try {
            const data: T = await response.json();
            return data;
        } catch (jsonError) {
             const responseText = await response.text().catch(() => "Could not read response text."); // Try reading text if JSON fails
             console.error(`API Request: Invalid JSON response from ${apiUrl}. Status: ${response.status}. Response Text: ${responseText}`, jsonError);
             throw new ApiError(`Invalid JSON response received from server.`, response.status);
        }

    } catch (error) {
        if (error instanceof ApiError) {
             throw error; // Re-throw known API errors
        } else if (error instanceof TypeError && error.message.toLowerCase().includes('failed to fetch')) {
             const networkErrorMsg = 'Network error or API Gateway unreachable. Check connection and API URL.';
             console.error(`API Request Network Error: ${networkErrorMsg} (URL: ${apiUrl})`, error);
             throw new ApiError(networkErrorMsg, 0); // Use 0 or a specific code for network errors
        } else {
             console.error(`API Request: Unexpected error during fetch to ${apiUrl}`, error);
             const message = error instanceof Error ? error.message : 'An unknown fetch error occurred.';
             throw new ApiError(`Unexpected fetch error: ${message}`, 500);
        }
    }
}

// --- API Function Definitions ---

// --- Ingest Service ---
export interface IngestResponse {
    document_id: string;
    task_id: string;
    status: string;
    message: string;
}

// Define AuthHeaders type for clarity
export interface AuthHeaders {
  'X-Company-ID': string;
  'X-User-ID': string;
}

// --- MODIFICACIÓN: Eliminar fetchWithAuth y usar request directamente ---
// Base fetch function to include auth headers
/* // Eliminado fetchWithAuth
async function fetchWithAuth(path: string, options: RequestInit & { auth: AuthHeaders }) { // Changed first arg to path
    const { auth, ...restOptions } = options;
    const headers = {
        ...restOptions.headers,
        'X-Company-ID': auth['X-Company-ID'],
        'X-User-ID': auth['X-User-ID'],
    };

    // Construct the full URL
    const baseUrl = getApiGatewayUrl(); // Get base URL
    const fullUrl = `${baseUrl}${path}`; // Concatenate base URL and path

    // Need to handle FormData correctly here if used
    let body = restOptions.body;
    if (!(body instanceof FormData)) {
        if (!headers['Content-Type']) {
            headers['Content-Type'] = 'application/json';
        }
    } else {
        // Let the browser set the Content-Type for FormData
        delete headers['Content-Type'];
    }

    return fetch(fullUrl, { ...restOptions, headers, body });
}
*/
// -------------------------------------------------------------------

export async function uploadDocument(file: File, auth: AuthHeaders): Promise<IngestResponse> { // Return type updated
  const formData = new FormData();
  formData.append('file', file);

  // --- MODIFICACIÓN: Usar request --- 
  try {
    // Pass auth headers directly to the request options
    const response = await request<IngestResponse>('/api/v1/ingest/upload', {
      method: 'POST',
      headers: {
        // Content-Type is handled by request for FormData
        ...auth, // Spread the auth headers
      },
      body: formData,
    });
    return response;
  } catch (error) {
    console.error('Error uploading document:', error);
    // Re-throw the error (ApiError or other) for the caller to handle
    // The request function already formats ApiError messages
    throw error;
  }
  // ----------------------------------
}

export interface DocumentStatusResponse {
    document_id: string;
    status: 'uploaded' | 'processing' | 'processed' | 'error';
    file_name: string;
    file_type: string;
    chunk_count: number;
    error_message: string | null;
    minio_exists?: boolean;
    milvus_chunk_count?: number;
    last_updated: string;
}

// --- MODIFICACIÓN: Usar request y añadir params --- 
export async function getDocumentStatusList(auth: AuthHeaders, limit: number = 100, offset: number = 0): Promise<DocumentStatusResponse[]> {
  const endpoint = `/api/v1/ingest/status?limit=${limit}&offset=${offset}`;
  try {
    // Pass auth headers directly to the request options
    const response = await request<DocumentStatusResponse[]>(endpoint, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...auth, // Spread the auth headers
      },
    });
    // Handle potential null response if API could return 204, though unlikely for a list
    return response || [];
  } catch (error) {
    console.error('Error fetching document status list:', error);
    // Re-throw the error (ApiError or other) for the caller to handle
    throw error;
  }
}
// -------------------------------------------------

export const getDocumentStatus = async (documentId: string): Promise<DocumentStatusResponse> => {
    return request<DocumentStatusResponse>(`/api/v1/ingest/status/${documentId}`);
};

export async function retryIngestDocument(documentId: string, auth: AuthHeaders): Promise<IngestResponse> { // Return type updated
  const endpoint = `/api/v1/ingest/retry/${documentId}`;
  try {
    // Pass auth headers directly to the request options
    const response = await request<IngestResponse>(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...auth, // Spread the auth headers
      },
      // No body needed for this request
    });
    // The request function handles 202 correctly if the API returns JSON
    // If the API returns 202 with no body, request returns null. We might need to adjust
    // based on actual API behavior for 202.
    // Assuming the API returns the standard IngestResponse on 202 as per docs:
    if (!response) {
        // This case might happen if the API returns 202 No Content, which contradicts the docs
        // Returning a synthetic response or throwing an error might be needed.
        // For now, let's assume the docs are correct and response is IngestResponse.
        console.warn(`Retry endpoint ${endpoint} returned unexpected null response.`);
        throw new ApiError('Retry initiated but no confirmation received.', 202);
    }
    return response;
  } catch (error) {
    console.error(`Error retrying ingest for document ${documentId}:`, error);
    // Re-throw the error (ApiError or other) for the caller to handle
    throw error;
  }
}
// ----------------------------------

// --- Query Service ---
export interface RetrievedDocApi {
    id: string; // Chunk ID
    document_id: string; // ID del documento original
    file_name: string;
    content: string; // Contenido completo del chunk (puede ser largo)
    content_preview: string; // Vista previa corta del contenido
    metadata: Record<string, any> | null; // Metadata asociada al chunk/documento
    score: number; // Puntuación de relevancia
}
// El tipo frontend puede ser igual al de la API por ahora
export type RetrievedDoc = RetrievedDocApi;

export interface ChatSummary {
    id: string;
    title: string | null;
    created_at: string;
    updated_at: string;
    // --- MODIFICACIÓN: Añadir message_count ---
    message_count: number;
    // --------------------------------------
}

export interface ChatMessageApi {
    id: string;
    chat_id: string;
    role: 'user' | 'assistant';
    content: string;
    // --- MODIFICACIÓN: Aclarar el tipo de sources ---
    // La API devuelve null o un array de objetos con estructura específica
    sources: Array<{
        chunk_id: string;
        document_id: string;
        file_name: string;
        score: number;
        preview: string; // Este campo está en la API de mensajes, usarlo en el mapeo si es necesario
    }> | null;
    // -------------------------------------------
    created_at: string; // La API garantiza este campo para mensajes
}

export interface QueryPayload {
    query: string;
    retriever_top_k?: number;
    chat_id?: string | null;
}

export interface QueryApiResponse {
    answer: string;
    retrieved_documents: RetrievedDocApi[]; // Usa la interfaz definida arriba
    query_log_id: string | null; // Puede ser null
    chat_id: string; // La API de Ask garantiza devolver esto
}

export const getChats = async (limit: number = 50, offset: number = 0): Promise<ChatSummary[]> => {
     const endpoint = `/api/v1/query/chats?limit=${limit}&offset=${offset}`;
     return request<ChatSummary[]>(endpoint);
};

// --- MODIFICACIÓN: Añadir params a la firma ---
export const getChatMessages = async (chatId: string, limit: number = 100, offset: number = 0): Promise<ChatMessageApi[]> => {
     const endpoint = `/api/v1/query/chats/${chatId}/messages?limit=${limit}&offset=${offset}`;
     // -----------------------------------------
     return request<ChatMessageApi[]>(endpoint);
};

export const postQuery = async (payload: QueryPayload): Promise<QueryApiResponse> => {
     // Asegurarse que chat_id es null si no se proporciona, como espera la API
     const body = {
         ...payload,
         chat_id: payload.chat_id || null
     };
     return request<QueryApiResponse>('/api/v1/query/ask', {
        method: 'POST',
        body: JSON.stringify(body),
        headers: { 'Content-Type': 'application/json' } // Explícito aquí
     });
};

export const deleteChat = async (chatId: string): Promise<void> => {
     // El request ya maneja la respuesta 204 devolviendo null
     await request<null>(`/api/v1/query/chats/${chatId}`, { method: 'DELETE' });
};

// --- Auth Service ---
// Definición de LoginPayload explícita
interface LoginPayload {
    email: string;
    password: string;
}
// Definición de LoginResponse explícita basada en la documentación
export interface LoginResponse {
    access_token: string;
    token_type: string; // "bearer"
    user_id: string;
    email: string;
    full_name: string;
    role: string;
    company_id: string;
}
// Login se maneja en useAuth.tsx, no necesita una función aquí

// --- Type Mapping Helpers ---
// Mapea la estructura de sources recibida en ChatMessageApi a RetrievedDoc
export const mapApiSourcesToFrontend = (
    apiSources: ChatMessageApi['sources'] // Usa el tipo correcto definido en ChatMessageApi
): RetrievedDoc[] | undefined => {
    if (!apiSources) {
        return undefined;
    }
    // Mapea cada source de la API de mensaje al formato RetrievedDoc
    return apiSources.map(source => ({
        id: source.chunk_id, // Mapea chunk_id a id
        document_id: source.document_id,
        file_name: source.file_name,
        content: source.preview, // Usa preview como content por defecto (podría ajustarse si hay más data)
        content_preview: source.preview,
        metadata: null, // La API de mensajes no provee metadata detallada en 'sources'
        score: source.score,
    }));
};

export const mapApiMessageToFrontend = (apiMessage: ChatMessageApi): Message => {
    // Mapear las sources usando la función anterior
    const mappedSources = mapApiSourcesToFrontend(apiMessage.sources);

    return {
        id: apiMessage.id,
        role: apiMessage.role,
        content: apiMessage.content,
        sources: mappedSources, // Usa las sources mapeadas
        isError: false,
        created_at: apiMessage.created_at, // Usar siempre el timestamp de la API
    };
};