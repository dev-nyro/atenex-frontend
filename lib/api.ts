// File: lib/api.ts
import { getToken } from './auth/helpers';
import { getApiGatewayUrl } from './utils';
import type { User } from './auth/helpers'; // Import User type

// ... (ApiError class y otras interfaces permanecen igual) ...
interface ApiErrorData {
    detail?: string | { msg: string; type: string }[] | any; // FastAPI often uses 'detail'
    message?: string; // General fallback
}

export class ApiError extends Error {
  status: number;
  data?: ApiErrorData;

  constructor(message: string, status: number, data?: ApiErrorData) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.data = data;
  }
}


async function request<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {

  let url: string;
  const cleanEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;

  // --- Inicio de la Lógica Modificada ---
  // Determina si es una ruta interna de Next.js API (ej: /api/auth/...)
  // o una ruta del gateway externo (ej: /api/v1/...)
  const isInternalApiRoute = cleanEndpoint.startsWith('/api/') && !cleanEndpoint.startsWith('/api/v1/');

  if (isInternalApiRoute) {
    // Para rutas internas, usar una URL relativa (el navegador la completará)
    url = cleanEndpoint;
    console.log(`Internal API Request Target: ${url}`);
  } else {
    // Para rutas externas, usar el API Gateway URL
    const gatewayUrl = getApiGatewayUrl();
    url = `${gatewayUrl}${cleanEndpoint}`;
    console.log(`External API Request Target: ${url}`);
  }
  // --- Fin de la Lógica Modificada ---


  const token = getToken();
  const headers = new Headers(options.headers || {});

  headers.set('Accept', 'application/json');
  if (!(options.body instanceof FormData)) {
     headers.set('Content-Type', 'application/json');
  }

  if (token) {
    headers.set('Authorization', `Bearer ${token}`);
  }

  const config: RequestInit = {
    ...options,
    headers,
  };

  console.log(`API Request: ${config.method || 'GET'} ${url}`); // Loguea la URL final que se usará

  try {
    // Fetch usa la URL determinada (relativa o absoluta)
    const response = await fetch(url, config);

    // ... (el resto del manejo de errores y respuesta permanece igual) ...
    if (!response.ok) {
      let errorData: ApiErrorData | null = null;
      let errorText = '';
      try {
        errorData = await response.json();
      } catch (e) {
        try {
           errorText = await response.text();
           console.warn("API error response was not valid JSON:", errorText);
        } catch (textErr) {
             console.warn("Could not read API error response body.");
        }
      }
    
      let errorMessage = `HTTP error ${response.status}`; // Provide a default
      if (errorData && typeof errorData.detail === 'string') {
          errorMessage = errorData.detail;
      } else if (errorData && Array.isArray(errorData.detail)) {
          // Handle array of errors (e.g., from Zod validation)
          errorMessage = errorData.detail.map(e => (typeof e === 'object' && e !== null && 'msg' in e) ? e.msg : String(e)).join(', ');
      } else if (errorData && errorData.message) {
          errorMessage = errorData.message;
      } else if (errorText) {
          errorMessage = errorText;
      }
    
      console.error(`API Error: ${response.status} ${errorMessage}`, errorData || errorText);
      throw new ApiError(errorMessage, response.status, errorData || undefined);
    }

    if (response.status === 204 || (response.ok && response.headers.get('content-length') === '0')) {
        console.log(`API Success: ${response.status} No Content`);
        return {} as T;
    }

    try {
        const data: T = await response.json();
        console.log(`API Success: ${response.status}`);
        return data;
    } catch (jsonError) {
         console.error(`API Error: Failed to parse JSON response for ${response.status}`, jsonError);
         throw new ApiError(`Invalid JSON response from server`, response.status);
    }

  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    } else {
      // Aquí es donde probablemente cae el NetworkError original
      console.error('Network or unexpected error during fetch:', error);
      // Devolvemos un ApiError con status 0 para identificarlo
      throw new ApiError(error instanceof Error ? error.message : 'Network error or unexpected issue', 0, undefined);
    }
  }
}

// --- Auth Service (REMOVE THESE, they are not needed anymore)---
// export const loginUser = async (credentials: { email: string; password: string }) => {
//   const response = await request<{ access_token: string }>('/api/auth/login', {
//     method: 'POST',
//     body: JSON.stringify(credentials),
//   });
//   return response.access_token;
// };

// export const registerUser = async (details: { email: string; password: string; name?: string }) => {
//     const response = await request<{ access_token: string; user: User }>('/api/auth/register', {
//         method: 'POST',
//         body: JSON.stringify(details),
//     });
//     return response;
// };


// --- Ingest Service Endpoints (SIN CAMBIOS, usan la función 'request' modificada) ---
// ... (uploadDocument, getDocumentStatus, listDocumentStatuses permanecen igual) ...
export interface IngestResponse {
    document_id: string;
    task_id: string;
    status: string;
    message: string;
}
export const uploadDocument = async (formData: FormData, metadata: Record<string, any> = {}) => {
    formData.append('metadata_json', JSON.stringify(metadata));
    const headers = new Headers();
    const token = getToken();
    if (token) {
        headers.set('Authorization', `Bearer ${token}`);
    }
    // Endpoint externo, `request` usará el gatewayUrl
    return request<IngestResponse>('/api/v1/ingest', {
        method: 'POST',
        body: formData,
        headers: headers,
    });
};
export interface DocumentStatusResponse {
    document_id: string;
    status: 'uploaded' | 'processing' | 'processed' | 'indexed' | 'error';
    file_name?: string;
    file_type?: string;
    chunk_count?: number | null;
    error_message?: string | null;
    last_updated?: string;
    message?: string | null;
}
export const getDocumentStatus = async (documentId: string): Promise<DocumentStatusResponse> => {
    // Endpoint externo, `request` usará el gatewayUrl
  return request<DocumentStatusResponse>(`/api/v1/ingest/status/${documentId}`, {
    method: 'GET',
  });
};
export const listDocumentStatuses = async (): Promise<DocumentStatusResponse[]> => {
    console.log("Attempting to call /api/v1/ingest/status (list)...");
    // Endpoint externo, `request` usará el gatewayUrl
    return request<DocumentStatusResponse[]>('/api/v1/ingest/status', {
         method: 'GET',
    });
};


// --- Query Service Endpoints (SIN CAMBIOS, usan la función 'request' modificada) ---
// ... (QueryPayload, RetrievedDoc, QueryApiResponse interfaces permanecen igual) ...
interface QueryPayload {
    query: string;
    retriever_top_k?: number;
}
export interface RetrievedDoc {
    id: string;
    score?: number | null;
    content_preview?: string | null;
    metadata?: Record<string, any> | null;
    document_id?: string | null;
    file_name?: string | null;
}
interface QueryApiResponse {
    answer: string;
    retrieved_documents: RetrievedDoc[];
    query_log_id?: string | null;
}
export const postQuery = async (payload: QueryPayload): Promise<QueryApiResponse> => {
    // Endpoint externo, `request` usará el gatewayUrl
  return request<QueryApiResponse>('/api/v1/query', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
};