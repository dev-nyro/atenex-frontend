// File: lib/api.ts
// Purpose: Centralized API request function and specific API call definitions.
import { getApiGatewayUrl } from './utils';
import type { Message } from '@/components/chat/chat-message'; // Ensure Message interface is exported
// --- ELIMINADO: Importación de Supabase ---
// import { supabase } from './supabaseClient'; // <= ¡Eliminar esta línea!
// -----------------------------------------
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

    // --- >>> RESTAURADO: Obtener token desde localStorage ---
    let token: string | null = null;
    if (typeof window !== 'undefined') { // Asegurarse que se ejecuta en el cliente
        token = localStorage.getItem(AUTH_TOKEN_KEY);
        // console.log(`API Request to ${cleanEndpoint}: Token from localStorage ${token ? 'Present' : 'Absent'}`);
    } else {
        console.warn(`API Request: localStorage not available for ${cleanEndpoint} (SSR/Server Context?). Cannot get auth token.`);
    }
     // --- <<< FIN RESTAURADO ---

    // --- ELIMINADO: Bloque try/catch para supabase.auth.getSession() ---
    // try {
    //    const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
    //     // ... resto del código Supabase eliminado ...
    // } catch (e) {
    //     // ... código Supabase eliminado ...
    // }
    // --------------------------------------------------------------------

    const headers = new Headers(options.headers || {});
    headers.set('Accept', 'application/json');
    if (apiUrl.includes("ngrok-free.app")) {
        headers.set('ngrok-skip-browser-warning', 'true');
    }
    if (!(options.body instanceof FormData)) {
        if (!headers.has('Content-Type')) {
             headers.set('Content-Type', 'application/json');
        }
    }

    // --- Añadir token al header si existe (lógica sin cambios) ---
    if (token) {
        headers.set('Authorization', `Bearer ${token}`);
    } else if (!cleanEndpoint.includes('/api/v1/users/login')) { // No advertir para login
        console.warn(`API Request: Making request to protected endpoint ${cleanEndpoint} without Authorization header.`);
    }
    // -----------------------------------------------------------

    const config: RequestInit = {
        ...options,
        headers,
    };

    console.log(`API Request: ${config.method || 'GET'} ${apiUrl}`);

    try {
        const response = await fetch(apiUrl, config);

        // --- Manejo de Errores (sin cambios) ---
        if (!response.ok) {
            let errorData: ApiErrorData | null = null;
            let errorText = '';
            const contentType = response.headers.get('content-type');
            try {
                if (contentType && contentType.includes('application/json')) {
                    errorData = await response.json();
                } else { errorText = await response.text(); }
            } catch (parseError) {
                 console.warn(`API Request: Could not parse error response body...`, parseError);
                 try { errorText = await response.text(); } catch {}
            }
            let errorMessage = `API Error (${response.status})`;
            // Extraer mensaje (sin cambios) ...
            if (errorData?.detail) { /* ... */ }
            else if (errorData?.message) { /* ... */ }
            else if (errorText) { /* ... */ }
            else { errorMessage = response.statusText || `Request failed...`; }

            console.error(`API Error Response: ${response.status} ${response.statusText} from ${apiUrl}`, { /*...*/ });
            throw new ApiError(errorMessage, response.status, errorData || undefined);
        }

        // --- Manejo de respuestas exitosas (sin cambios) ---
        if (response.status === 204 || response.headers.get('content-length') === '0') { return null as T; }
        try {
            const data: T = await response.json();
            return data;
        } catch (jsonError) {
            console.error(`API Request: Invalid JSON...`, jsonError);
            throw new ApiError(`Invalid JSON response...`, response.status);
        }

    } catch (error) {
        // --- Manejo de errores de red y otros (sin cambios) ---
        if (error instanceof TypeError && error.message.toLowerCase().includes('failed to fetch')) { /*...*/ }
        else if (error instanceof ApiError) { throw error; }
        else {
             console.error(`API Request: Unexpected error during fetch to ${apiUrl}`, error);
             const message = error instanceof Error ? error.message : 'An unknown error occurred.';
             throw new ApiError(`Unexpected error: ${message}`, 500);
        }
    }
    // Should be unreachable, but satisfies TS control flow analysis
    throw new Error("request function reached end unexpectedly");
}

// --- API Function Definitions ---

// --- Ingest Service ---
export interface IngestResponse {
    document_id: string;
    task_id: string;
    status: string;
    message: string;
}
export const uploadDocument = async (formData: FormData): Promise<IngestResponse> => {
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
    last_updated?: string; // << Debería ser `updated_at` o `last_updated` consistentemente
    message?: string | null;
    metadata?: Record<string, any> | null;
}
export const listDocumentStatuses = async (): Promise<DocumentStatusResponse[]> => {
    return request<DocumentStatusResponse[]>('/api/v1/ingest/status');
};

// --- Query Service ---
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
    created_at: string; // Definición clave para el error
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
    chat_id: string; // Definición clave para el segundo error
}

export const getChats = async (limit: number = 100, offset: number = 0): Promise<ChatSummary[]> => {
     const endpoint = `/api/v1/query/chats?limit=${limit}&offset=${offset}`;
     return request<ChatSummary[]>(endpoint);
};

export const getChatMessages = async (chatId: string): Promise<ChatMessageApi[]> => {
     return request<ChatMessageApi[]>(`/api/v1/query/chats/${chatId}/messages`);
};

export const postQuery = async (payload: QueryPayload): Promise<QueryApiResponse> => {
     const body = { ...payload, chat_id: payload.chat_id || null };
     return request<QueryApiResponse>('/api/v1/query/ask', {
        method: 'POST',
        body: JSON.stringify(body),
     });
};

export const deleteChat = async (chatId: string): Promise<void> => {
     await request<null>(`/api/v1/query/chats/${chatId}`, { method: 'DELETE' });
};

// --- Auth Service ---
// La definición de registerUser puede permanecer si se usa en otro lugar,
// pero no es parte del flujo de login normal con JWT.
interface RegisterUserPayload { email: string; password: string; name: string | null; }
interface RegisterUserResponse { message: string; user_id?: string; }
export const registerUser = async (payload: RegisterUserPayload): Promise<RegisterUserResponse> => {
    return request<RegisterUserResponse>('/api/v1/users/register', {
        method: 'POST',
        body: JSON.stringify(payload),
    });
};

// --- Type Mapping Helpers ---
export const mapApiSourcesToFrontend = (apiSources: RetrievedDocApi[] | null | undefined): RetrievedDoc[] | undefined => {
    if (!apiSources) { return undefined; }
    return apiSources.map(source => ({ ...source }));
};

export const mapApiMessageToFrontend = (apiMessage: ChatMessageApi): Message => {
    const mappedSources = mapApiSourcesToFrontend(apiMessage.sources);
    return {
        id: apiMessage.id,
        role: apiMessage.role,
        content: apiMessage.content,
        sources: mappedSources,
        isError: false,
        // Usar created_at del objeto apiMessage si existe
        created_at: apiMessage.created_at ?? new Date().toISOString(), // Fallback por si acaso
    };
};