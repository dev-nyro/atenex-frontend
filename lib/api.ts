// File: lib/api.ts
// Purpose: Centralized API request function and specific API call definitions.
import { getApiGatewayUrl } from './utils';
import type { Message } from '@/components/chat/chat-message'; // Ensure Message interface is exported
// --- ELIMINADO: Importación de Supabase ---
// import { supabase } from './supabaseClient';
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

    // Validar que el endpoint comience con /api/v1/ (sin cambios)
    if (!cleanEndpoint.startsWith('/api/v1/')) {
        console.error(`Invalid API endpoint format: ${cleanEndpoint}. Must start with /api/v1/`);
        throw new ApiError(`Invalid API endpoint format: ${cleanEndpoint}.`, 400);
    }

    // Obtener la URL del API Gateway (sin cambios)
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

    // --- MODIFICADO: Obtener token desde localStorage ---
    let token: string | null = null;
    if (typeof window !== 'undefined') { // Asegurarse que se ejecuta en el cliente
        token = localStorage.getItem(AUTH_TOKEN_KEY);
        // console.log(`API Request to ${cleanEndpoint}: Token from localStorage ${token ? 'Present' : 'Absent'}`);
    }
    // --------------------------------------------------

    // Configurar Headers (sin cambios en su mayoría)
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

    // --- Añadir token al header si existe ---
    if (token) {
        headers.set('Authorization', `Bearer ${token}`);
    } else if (!cleanEndpoint.includes('/api/v1/users/login')) { // No advertir para el endpoint de login
        // Advertir si no hay token para otros endpoints protegidos
        console.warn(`API Request: Making request to protected endpoint ${cleanEndpoint} without Authorization header.`);
    }
    // ---------------------------------------

    const config: RequestInit = {
        ...options,
        headers,
    };

    console.log(`API Request: ${config.method || 'GET'} ${apiUrl}`);

    try {
        const response = await fetch(apiUrl, config);

        // --- Manejo de Errores (sin cambios significativos, ya era robusto) ---
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
                responseText: errorText || null,
            });
            throw new ApiError(errorMessage, response.status, errorData || undefined);
        }

        // Manejo de respuestas exitosas (sin cambios)
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
        // Manejo de errores de red y otros (sin cambios)
        if (error instanceof TypeError && error.message.toLowerCase().includes('failed to fetch')) {
            const networkErrorMessage = `Network Error: Could not connect to the API Gateway at ${cachedGatewayUrl}. Please check your network connection and the gateway status.`;
            console.error('API Request Network Error:', { url: apiUrl, error: error.message });
            throw new ApiError(networkErrorMessage, 0);
        } else if (error instanceof ApiError) {
            throw error;
        } else {
            console.error('API Request Unexpected Error:', { url: apiUrl, error });
            const message = error instanceof Error ? error.message : 'An unexpected error occurred during the API request.';
            throw new ApiError(message, 500);
        }
    }
}

// --- API Function Definitions (sin cambios en las firmas, la lógica interna de `request` cambió) ---

// Ingest Service
export interface IngestResponse { /*...*/ }
export const uploadDocument = async (formData: FormData): Promise<IngestResponse> => {
    return request<IngestResponse>('/api/v1/ingest/upload', {
        method: 'POST',
        body: formData,
    });
};
export interface DocumentStatusResponse { /*...*/ }
export const listDocumentStatuses = async (): Promise<DocumentStatusResponse[]> => {
    return request<DocumentStatusResponse[]>('/api/v1/ingest/status');
};

// Query Service
export interface RetrievedDocApi { /*...*/ }
export type RetrievedDoc = RetrievedDocApi;
export interface ChatSummary { /*...*/ }
export interface ChatMessageApi { /*...*/ }
export interface QueryPayload { /*...*/ }
export interface QueryApiResponse { /*...*/ }
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

// Auth Service (Endpoint /register no se usa directamente en login, pero se deja la definición si existe)
interface RegisterUserPayload { /*...*/ }
interface RegisterUserResponse { /*...*/ }
export const registerUser = async (payload: RegisterUserPayload): Promise<RegisterUserResponse> => {
    return request<RegisterUserResponse>('/api/v1/users/register', { // Ajustado endpoint si es necesario
        method: 'POST',
        body: JSON.stringify(payload),
    });
};

// --- Type Mapping Helpers (sin cambios) ---
export const mapApiSourcesToFrontend = (apiSources: RetrievedDocApi[] | null | undefined): RetrievedDoc[] | undefined => { /*...*/ };
export const mapApiMessageToFrontend = (apiMessage: ChatMessageApi): Message => { /*...*/ };