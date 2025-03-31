// File: lib/api.ts
import { getToken } from './auth/helpers';
import { getApiGatewayUrl } from './utils';
import type { User } from './auth/helpers'; // Import User type

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
  const gatewayUrl = getApiGatewayUrl();
  // Ensure endpoint starts with a slash and gatewayUrl does not end with one
  const cleanEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
  const url = `${gatewayUrl}${cleanEndpoint}`;

  const token = getToken();
  const headers = new Headers(options.headers || {});

  headers.set('Accept', 'application/json');
  if (!(options.body instanceof FormData)) {
     // Don't set Content-Type for FormData, browser does it with boundary
     headers.set('Content-Type', 'application/json');
  }

  if (token) {
    headers.set('Authorization', `Bearer ${token}`);
  }

  // The API Gateway is responsible for adding X-Company-ID based on the JWT.
  // Frontend usually doesn't need to send it directly when talking to the Gateway.

  const config: RequestInit = {
    ...options,
    headers,
  };

  console.log(`API Request: ${config.method || 'GET'} ${url}`);

  try {
    const response = await fetch(url, config);

    if (!response.ok) {
      let errorData: ApiErrorData | null = null;
      let errorText = ''; // Store raw text fallback
      try {
        // Try to parse error response body as JSON first
        errorData = await response.json();
      } catch (e) {
        try {
           // If JSON parsing fails, try to get text
           errorText = await response.text();
           console.warn("API error response was not valid JSON:", errorText);
        } catch (textErr) {
             console.warn("Could not read API error response body.");
        }
      }

      // Construct a meaningful error message
      const detailMessage = errorData?.detail
        ? (typeof errorData.detail === 'string' ? errorData.detail : JSON.stringify(errorData.detail))
        : null;
      const fallbackMessage = errorData?.message || errorText || `HTTP error ${response.status}`;
      const errorMessage = detailMessage || fallbackMessage;


      console.error(`API Error: ${response.status} ${errorMessage}`, errorData || errorText);
      throw new ApiError(errorMessage, response.status, errorData || undefined);
    }

    // Handle successful response with no content (Status 204)
    // Or responses that might genuinely have a 0 content-length header but are OK (e.g., HEAD request)
    if (response.status === 204 || (response.ok && response.headers.get('content-length') === '0')) {
        console.log(`API Success: ${response.status} No Content`);
        // For 204, it's standard to return nothing (or undefined/null if the type T allows)
        // Returning {} as T assumes T is an object type or 'any'. Be careful if T could be void or primitive.
        return {} as T;
    }

    // Attempt to parse JSON for other successful responses
    try {
        const data: T = await response.json();
        console.log(`API Success: ${response.status}`); // Avoid logging potentially large data object
        return data;
    } catch (jsonError) {
         console.error(`API Error: Failed to parse JSON response for ${response.status}`, jsonError);
         throw new ApiError(`Invalid JSON response from server`, response.status);
    }

  } catch (error) {
    if (error instanceof ApiError) {
      // Re-throw known API errors
      throw error;
    } else {
      // Handle network errors or other exceptions
      console.error('Network or unexpected error:', error);
      throw new ApiError(error instanceof Error ? error.message : 'Network error or unexpected issue', 0, undefined); // status 0 for network errors
    }
  }
}

// --- Auth Service (using internal Next.js API Routes / BFF) ---
// These routes should ideally proxy to your actual backend Auth service via the Gateway
// For now, they hit the dummy routes defined in app/api/auth/*

export const loginUser = async (credentials: { email: string; password: string }) => {
  // Calling the internal Next.js route handler
  const response = await request<{ access_token: string }>('/api/auth/login', {
    method: 'POST',
    body: JSON.stringify(credentials),
  });
  return response.access_token;
};

export const registerUser = async (details: { email: string; password: string; name?: string }) => {
    // Calling the internal Next.js route handler
    const response = await request<{ access_token: string; user: User }>('/api/auth/register', {
        method: 'POST',
        body: JSON.stringify(details),
    });
    return response; // Contains token and potentially user info from the dummy route
};


// --- Ingest Service Endpoints (via API Gateway) ---
export interface IngestResponse {
    document_id: string;
    task_id: string; // Added task_id if the backend provides it
    status: string; // Consider using the DocumentStatus enum type here
    message: string;
}
export const uploadDocument = async (formData: FormData, metadata: Record<string, any> = {}) => {
    // Metadata should be handled based on how the backend expects it.
    // If it expects a separate JSON field:
    formData.append('metadata_json', JSON.stringify(metadata));

    const headers = new Headers(); // Create headers specifically for this request
    const token = getToken();
    if (token) {
        headers.set('Authorization', `Bearer ${token}`);
    }
    // IMPORTANT: Do NOT manually set Content-Type for FormData. The browser handles it.
    // headers.delete('Content-Type'); // Ensure it's not set if added previously

    // This endpoint should point to your API Gateway route for ingestion
    return request<IngestResponse>('/api/v1/ingest', {
        method: 'POST',
        body: formData,
        headers: headers, // Pass only necessary headers (like Auth)
    });
};

// Define the expected status response structure based on backend/schemas
export interface DocumentStatusResponse {
    document_id: string;
    status: 'uploaded' | 'processing' | 'processed' | 'indexed' | 'error';
    file_name?: string;
    file_type?: string;
    chunk_count?: number | null;
    error_message?: string | null;
    last_updated?: string; // ISO 8601 string format expected
    message?: string | null; // Optional message from backend
}

// Fetches status for a SINGLE document via the Gateway
export const getDocumentStatus = async (documentId: string): Promise<DocumentStatusResponse> => {
    // This endpoint should point to your API Gateway route for fetching single status
  return request<DocumentStatusResponse>(`/api/v1/ingest/status/${documentId}`, {
    method: 'GET',
  });
};

// Lists statuses for potentially multiple documents via the Gateway
// Assumes backend endpoint /api/v1/ingest/status exists and returns an array
export const listDocumentStatuses = async (/* Add filters like page, limit if needed */): Promise<DocumentStatusResponse[]> => {
    // This endpoint should point to your API Gateway route for listing statuses
    // Needs implementation in your backend and corresponding route in the Gateway.
    console.log("Attempting to call /api/v1/ingest/status (list)..."); // Log the attempt
    // return request<DocumentStatusResponse[]>('/api/v1/ingest/status?limit=50', { // Example with limit
    return request<DocumentStatusResponse[]>('/api/v1/ingest/status', {
         method: 'GET',
         // Add query parameters here if needed: e.g., new URLSearchParams({ limit: '50', offset: '0' })
    });
    // Note: If the backend endpoint doesn't exist yet, this call will fail.
    // The DocumentStatusList component's error handling will catch this.
};


// --- Query Service Endpoints (via API Gateway) ---
interface QueryPayload {
    query: string;
    retriever_top_k?: number;
    // chat_history?: Array<{ role: string; content: string }>; // Add if using history
}
// Define structure for retrieved documents more precisely
export interface RetrievedDoc {
    id: string; // Chunk ID or unique identifier for the retrieved piece
    score?: number | null; // Relevance score
    content_preview?: string | null; // Text snippet
    metadata?: Record<string, any> | null; // Associated metadata (page, etc.)
    document_id?: string | null; // ID of the source document
    file_name?: string | null; // Original filename from metadata
}
// Define the expected structure of the query response from the backend
interface QueryApiResponse {
    answer: string;
    retrieved_documents: RetrievedDoc[];
    query_log_id?: string | null; // Optional ID for logging/tracing
}
export const postQuery = async (payload: QueryPayload): Promise<QueryApiResponse> => {
    // This endpoint should point to your API Gateway route for querying
  return request<QueryApiResponse>('/api/v1/query', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
};