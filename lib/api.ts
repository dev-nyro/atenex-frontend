// File: lib/api.ts
// Purpose: Centralized API request function and specific API call definitions.
import { getApiGatewayUrl } from './utils';
import type { Message } from '@/components/chat/chat-message'; // Ensure Message interface is exported
import { supabase } from './supabaseClient'; // Import the initialized Supabase client

// --- ApiError Class ---
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

// --- Core Request Function ---
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
    try {
        // *** OBTENER TOKEN DE SUPABASE JUSTO ANTES DE LA LLAMADA ***
        const { data: sessionData, error: sessionError } = await supabase.auth.getSession();

        if (sessionError) {
            console.warn(`API Request: Error getting Supabase session for ${cleanEndpoint}:`, sessionError.message);
        }
        token = sessionData?.session?.access_token || null;
        // console.log(`API Request to ${cleanEndpoint}: Token ${token ? 'Present' : 'Absent'}`);

    } catch (e) {
        console.error(`API Request: Unexpected error fetching Supabase session for ${cleanEndpoint}:`, e);
        // Proceder sin token pero advertir
    }

    const headers = new Headers(options.headers || {});
    headers.set('Accept', 'application/json');
    // Añadir header para Ngrok si la URL es de Ngrok
    if (apiUrl.includes("ngrok-free.app")) {
        headers.set('ngrok-skip-browser-warning', 'true');
    }


    if (!(options.body instanceof FormData)) {
        if (!headers.has('Content-Type')) {
             headers.set('Content-Type', 'application/json');
        }
    }

    if (token) {
        headers.set('Authorization', `Bearer ${token}`);
    } else {
        // No lanzar error aquí, el gateway manejará la autenticación requerida
        console.warn(`API Request: Making request to ${cleanEndpoint} without Authorization header.`);
    }

    const config: RequestInit = {
        ...options,
        headers,
        // mode: 'cors', // 'cors' es el default para fetch, no es necesario explícitamente
    };

    console.log(`API Request: ${config.method || 'GET'} ${apiUrl}`);

    try {
        const response = await fetch(apiUrl, config);

        // --- Improved Error Handling ---
        if (!response.ok) {
            let errorData: ApiErrorData | null = null;
            let errorText = '';
            const contentType = response.headers.get('content-type');

            try {
                if (contentType && contentType.includes('application/json')) {
                    errorData = await response.json();
                } else {
                    errorText = await response.text();
                }
            } catch (parseError) {
                console.warn(`API Request: Could not parse error response body (status ${response.status}) from ${apiUrl}. Content-Type: ${contentType}`, parseError);
                try { errorText = await response.text(); } catch {}
            }

            let errorMessage = `API Error (${response.status})`;

            // Intenta extraer el detalle de FastAPI/errorData
            if (errorData?.detail) {
                 if (typeof errorData.detail === 'string') {
                     errorMessage = errorData.detail;
                 } else if (Array.isArray(errorData.detail) && errorData.detail.length > 0 && typeof errorData.detail[0] === 'object' && errorData.detail[0].msg) {
                     errorMessage = errorData.detail.map((e: ApiErrorDataDetail) => `${e.loc?.join('.') || 'field'} - ${e.msg}`).join('; ');
                 } else {
                     try { errorMessage = JSON.stringify(errorData.detail).substring(0, 200); } catch {}
                 }
            } else if (errorData?.message && typeof errorData.message === 'string') {
                errorMessage = errorData.message;
            } else if (errorText) {
                errorMessage = errorText.substring(0, 200);
            } else {
                errorMessage = response.statusText || `Request failed with status ${response.status}`;
            }

            console.error(`API Error Response: ${response.status} ${response.statusText} from ${apiUrl}`, {
                status: response.status,
                message: errorMessage,
                responseData: errorData,
                responseText: errorText || null, // Ensure it's null if empty
            });

            throw new ApiError(errorMessage, response.status, errorData || undefined);
        }

        // Handle successful responses
        if (response.status === 204 || response.headers.get('content-length') === '0') {
            return null as T;
        }

        try {
            const data: T = await response.json();
            return data;
        } catch (jsonError) {
            console.error(`API Request: Invalid JSON in successful response (status ${response.status}) from ${apiUrl}`, jsonError);
            throw new ApiError(`Invalid JSON response received from the server.`, response.status);
        }

    } catch (error) {
        // Handle specific Network Error cases more reliably
        if (error instanceof TypeError && error.message.toLowerCase().includes('failed to fetch')) {
            const networkErrorMessage = `Network Error: Could not connect to the API Gateway at ${cachedGatewayUrl}. Please check your network connection and the gateway status.`;
            console.error('API Request Network Error:', { url: apiUrl, error: error.message });
            throw new ApiError(networkErrorMessage, 0); // Use status 0 for network errors
        } else if (error instanceof ApiError) {
            throw error; // Re-throw known API errors
        } else {
            console.error('API Request Unexpected Error:', { url: apiUrl, error });
            const message = error instanceof Error ? error.message : 'An unexpected error occurred during the API request.';
            throw new ApiError(message, 500);
        }
    }
}

// --- Definiciones de Tipos ---
// (Tipos IngestResponse, DocumentStatusResponse, RetrievedDocApi, RetrievedDoc, ChatSummary, ChatMessageApi, QueryPayload, QueryApiResponse permanecen igual)

// (+) NUEVO: Tipos para el endpoint de registro del backend
interface RegisterUserPayload {
    email: string;
    password: string;
    name: string | null;
    // company_name es manejado por el backend ahora
}

interface RegisterUserResponse {
    message: string; // Ej: "Registration successful, please check your email."
    user_id?: string; // Opcional: el ID del usuario creado en Supabase
}

interface EnsureCompanyResponse { // Mantener por si se usa en otro lado
    message: string;
    company_id?: string;
}


// --- API Function Definitions ---

// Ingest Service (Sin cambios)
export interface IngestResponse {
    document_id: string;
    task_id: string;
    status: string;
    message: string;
}
export const uploadDocument = async (
    formData: FormData,
    metadata: Record<string, any> = {}
): Promise<IngestResponse> => {
    console.log("Uploading document via API...");
    return request<IngestResponse>('/api/v1/ingest/upload', {
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
    last_updated?: string;
    message?: string | null;
    metadata?: Record<string, any> | null;
}
export const listDocumentStatuses = async (): Promise<DocumentStatusResponse[]> => {
    console.log("Fetching document statuses via API...");
    return request<DocumentStatusResponse[]>('/api/v1/ingest/status');
};


// Query Service (Sin cambios)
export interface RetrievedDocApi {
    id: string;
    score?: number | null;
    content_preview?: string | null;
    metadata?: Record<string, any> | null;
    document_id?: string | null;
    file_name?: string | null;
}
export type RetrievedDoc = RetrievedDocApi;

export interface ChatSummary {
    id: string;
    title: string | null;
    updated_at: string;
    created_at: string;
}

export interface ChatMessageApi {
    id: string;
    chat_id: string;
    role: 'user' | 'assistant';
    content: string;
    sources: RetrievedDocApi[] | null;
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
    query_log_id?: string | null;
    chat_id: string;
}

export const getChats = async (limit: number = 100, offset: number = 0): Promise<ChatSummary[]> => {
    console.log(`Fetching chat list via API (limit=${limit}, offset=${offset})...`);
    // Añadir query parameters a la URL
    const endpoint = `/api/v1/query/chats?limit=${limit}&offset=${offset}`;
    return request<ChatSummary[]>(endpoint); // GET es el método por defecto
};

export const getChatMessages = async (chatId: string): Promise<ChatMessageApi[]> => {
     console.log(`Fetching messages for chat ${chatId} via API...`);
     return request<ChatMessageApi[]>(`/api/v1/query/chats/${chatId}/messages`);
};

export const postQuery = async (payload: QueryPayload): Promise<QueryApiResponse> => {
     console.log(`Sending query to API (Chat ID: ${payload.chat_id || 'New'})...`);
     const body = { ...payload, chat_id: payload.chat_id || null };
     return request<QueryApiResponse>('/api/v1/query/ask', {
        method: 'POST',
        body: JSON.stringify(body),
     });
};

export const deleteChat = async (chatId: string): Promise<void> => {
     console.log(`Deleting chat ${chatId} via API...`);
     await request<null>(`/api/v1/query/chats/${chatId}`, { method: 'DELETE' });
};

// --- Auth Service ---

// (+) NUEVA FUNCIÓN: Registro vía Backend
export const registerUser = async (payload: RegisterUserPayload): Promise<RegisterUserResponse> => {
    console.log(`Calling backend registration endpoint for ${payload.email}...`);
    // La compañía 'nyrouwu' se determina en el backend
    return request<RegisterUserResponse>('/api/v1/auth/register', {
        method: 'POST',
        body: JSON.stringify(payload),
    });
};

// (-) QUITAR O COMENTAR SI YA NO SE USA:
// export const ensureCompanyAssociation = async (): Promise<EnsureCompanyResponse> => {
//      console.log("Calling ensure-company association endpoint...");
//      return request<EnsureCompanyResponse>('/api/v1/users/me/ensure-company', { method: 'POST' });
// };


// --- Type Mapping Helpers (Sin cambios) ---
export const mapApiSourcesToFrontend = (apiSources: RetrievedDocApi[] | null | undefined): RetrievedDoc[] | undefined => {
    if (!apiSources) { return undefined; }
    return apiSources.map(source => ({ ...source })); // Simple copy for now
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
