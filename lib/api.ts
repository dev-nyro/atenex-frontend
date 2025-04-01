// File: lib/api.ts
import { getToken } from './auth/helpers';
import { getApiGatewayUrl } from './utils';
import type { User } from './auth/helpers';

// --- ApiError Class ---
interface ApiErrorData {
    detail?: string | { msg: string; type: string }[] | any;
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
    // Set the prototype explicitly.
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

  // Determine if internal Next.js API route or external gateway route
  const isInternalApiRoute = cleanEndpoint.startsWith('/api/') && !cleanEndpoint.startsWith('/api/v1/');

  if (isInternalApiRoute) {
    // Use relative URL for internal routes
    url = cleanEndpoint;
    // console.debug(`Internal API Request Target: ${url}`);
  } else {
    // Use absolute API Gateway URL for external routes
    const gatewayUrl = getApiGatewayUrl();
    url = `${gatewayUrl}${cleanEndpoint}`;
    // console.debug(`External API Request Target: ${url}`);
  }

  const token = getToken();
  const headers = new Headers(options.headers || {});

  headers.set('Accept', 'application/json');
  // Don't set Content-Type for FormData, browser handles it with boundary
  if (!(options.body instanceof FormData)) {
     headers.set('Content-Type', 'application/json');
  }

  // Add Authorization header if token exists
  if (token) {
    headers.set('Authorization', `Bearer ${token}`);
  }

  // Add Company ID if available (assuming it's needed by backend - check READMEs)
  // This might be better handled in a dedicated function or middleware if complex
  // For now, let's assume the gateway extracts it from JWT or it's not needed here explicitly
  // Example:
  // const user = getUserFromToken(token); // You'd need this function
  // if (user?.companyId) {
  //    headers.set('X-Company-ID', user.companyId); // Header name from READMEs
  // }

  const config: RequestInit = {
    ...options,
    headers,
    // Add timeout? Fetch doesn't support it directly, need AbortController
  };

  console.log(`API Request: ${config.method || 'GET'} ${url}`);

  try {
    const response = await fetch(url, config);

    if (!response.ok) {
      let errorData: ApiErrorData | null = null;
      let errorText = '';
      try {
        // Try to parse JSON error body first
        errorData = await response.json();
      } catch (e) {
        // If JSON parsing fails, try to get text body
        try {
           errorText = await response.text();
           console.warn("API error response was not valid JSON:", errorText);
        } catch (textErr) {
             console.warn("Could not read API error response body.");
        }
      }

      // Extract a meaningful error message
      let errorMessage = `HTTP error ${response.status}`;
      if (errorData?.detail && typeof errorData.detail === 'string') {
          errorMessage = errorData.detail;
      } else if (errorData?.detail && Array.isArray(errorData.detail)) {
          errorMessage = errorData.detail.map(e => (typeof e === 'object' && e !== null && 'msg' in e) ? e.msg : String(e)).join(', ');
      } else if (errorData?.message) {
          errorMessage = errorData.message;
      } else if (errorText) {
          errorMessage = errorText.substring(0, 200); // Limit length
      }

      console.error(`API Error: ${response.status} ${errorMessage}`, { url, data: errorData, text: errorText });
      throw new ApiError(errorMessage, response.status, errorData || undefined);
    }

    // Handle No Content response
    if (response.status === 204 || response.headers.get('content-length') === '0') {
        console.log(`API Success: ${response.status} No Content`);
        // Return an empty object or null based on expected type T
        // Using {} as T might be problematic if T expects specific fields.
        // Consider returning null or making T potentially null. For now, {} as T.
        return {} as T;
    }

    // Parse successful JSON response
    try {
        const data: T = await response.json();
        // console.debug(`API Success: ${response.status}`, { url, data });
        return data;
    } catch (jsonError) {
         console.error(`API Error: Failed to parse JSON response for ${response.status}`, { url, error: jsonError });
         throw new ApiError(`Invalid JSON response from server`, response.status);
    }

  } catch (error) {
    if (error instanceof ApiError) {
      // Re-throw known API errors
      throw error;
    } else if (error instanceof TypeError && error.message === 'Failed to fetch') {
        // Handle Network errors specifically
        console.error('Network Error:', { url, error });
        throw new ApiError('Network error: Could not connect to the server.', 0); // Use status 0 for network errors
    }
    else {
      // Handle other unexpected errors (e.g., programming errors in this function)
      console.error('Unexpected error during API request:', { url, error });
      throw new ApiError(error instanceof Error ? error.message : 'An unexpected error occurred', 500);
    }
  }
}

// --- Auth Service (Internal API Routes) ---
export const loginUser = async (credentials: { email: string; password: string }) => {
  const response = await request<{ access_token: string }>('/api/auth/login', {
    method: 'POST',
    body: JSON.stringify(credentials),
  });
  return response.access_token;
};

export const registerUser = async (details: { email: string; password: string; name?: string }) => {
    const response = await request<{ access_token: string; user: User }>('/api/auth/register', {
        method: 'POST',
        body: JSON.stringify(details),
    });
    return response;
};

// --- Ingest Service (External API Routes - /api/v1/ingest) ---
export interface IngestResponse {
    document_id: string;
    task_id: string;
    status: string; // Should match DocumentStatus values
    message: string;
}

export const uploadDocument = async (formData: FormData, metadata: Record<string, any> = {}) => {
    // Metadata is now expected as JSON string in the form data by backend
    formData.append('metadata_json', JSON.stringify(metadata));
    // Headers are set within the `request` function, including Authorization
    // Content-Type for FormData is handled automatically by the browser/fetch
    return request<IngestResponse>('/api/v1/ingest', {
        method: 'POST',
        body: formData,
        // No need to set Content-Type header here for FormData
    });
};

export interface DocumentStatusResponse {
    document_id: string;
    // Use specific statuses based on backend enum/definition
    status: 'uploaded' | 'processing' | 'processed' | 'indexed' | 'error' | string; // Allow string for potential future statuses
    file_name?: string | null; // Make optional as per backend schema
    file_type?: string | null; // Make optional
    chunk_count?: number | null;
    error_message?: string | null;
    last_updated?: string; // ISO 8601 date string
    message?: string | null; // Optional message field from backend
}

export const getDocumentStatus = async (documentId: string): Promise<DocumentStatusResponse> => {
  return request<DocumentStatusResponse>(`/api/v1/ingest/status/${documentId}`, {
    method: 'GET',
  });
};

// Function to list all document statuses for the company (uses X-Company-ID from token via gateway)
export const listDocumentStatuses = async (): Promise<DocumentStatusResponse[]> => {
    console.log("Calling listDocumentStatuses API function...");
    return request<DocumentStatusResponse[]>('/api/v1/ingest/status', {
         method: 'GET',
    });
};


// --- Query Service (External API Routes - /api/v1/query) ---
export interface QueryPayload {
    query: string;
    retriever_top_k?: number; // Optional based on backend schema
    // Add chat_history if needed by backend in future
    // chat_history?: { role: 'user' | 'assistant', content: string }[];
}

export interface RetrievedDoc {
    id: string; // Chunk ID from Milvus/vector store
    score?: number | null;
    content_preview?: string | null; // Or full content if backend provides it
    metadata?: Record<string, any> | null;
    document_id?: string | null; // Original document ID from Supabase
    file_name?: string | null; // Original filename
}

export interface QueryApiResponse {
    answer: string;
    retrieved_documents: RetrievedDoc[];
    query_log_id?: string | null; // Optional based on backend schema
}

export const postQuery = async (payload: QueryPayload): Promise<QueryApiResponse> => {
  return request<QueryApiResponse>('/api/v1/query', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
};