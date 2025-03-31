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
  const url = `${gatewayUrl}${endpoint}`; // Construct full URL
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
      try {
        errorData = await response.json();
      } catch (e) {
        console.warn("API error response was not valid JSON:", await response.text());
      }
      const errorMessage = errorData?.detail
        ? (typeof errorData.detail === 'string' ? errorData.detail : JSON.stringify(errorData.detail))
        : errorData?.message || `HTTP error ${response.status}`;

      console.error(`API Error: ${response.status} ${errorMessage}`, errorData);
      throw new ApiError(errorMessage, response.status, errorData || undefined);
    }

    if (response.status === 204 || response.headers.get('content-length') === '0') {
        console.log(`API Success: ${response.status} No Content`);
        // Ensure the return type matches T, even if empty. Use 'any' or specific empty object type.
        // If T can be void or undefined, handle accordingly.
        return {} as T;
    }

    const data: T = await response.json();
    console.log(`API Success: ${response.status}`); // Avoid logging potentially large data object
    return data;
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    } else {
      console.error('Network or unexpected error:', error);
      throw new ApiError(error instanceof Error ? error.message : 'Network error or unexpected issue', 0, undefined);
    }
  }
}

// --- Auth Service ---
export const loginUser = async (credentials: { email: string; password: string }) => {
  const response = await request<{ access_token: string }>('/api/auth/login', { // Using internal BFF route
    method: 'POST',
    body: JSON.stringify(credentials),
  });
  return response.access_token;
};

export const registerUser = async (details: { email: string; password: string; name?: string }) => {
  const response = await request<{ access_token: string; user: User }>('/api/auth/register', { // Using internal BFF route
    method: 'POST',
    body: JSON.stringify(details),
  });
  return response;
};

// --- Ingest Service Endpoints (via API Gateway) ---
export interface IngestResponse {
    document_id: string;
    task_id: string;
    status: string; // Consider using the DocumentStatus enum type here
    message: string;
}
export const uploadDocument = async (formData: FormData, metadata: Record<string, any> = {}) => {
    formData.append('metadata_json', JSON.stringify(metadata));
    const headers = new Headers(); // Create headers specifically for this request
    const token = getToken();
    if (token) {
        headers.set('Authorization', `Bearer ${token}`);
    }
    // Don't set Content-Type for FormData manually

    return request<IngestResponse>('/api/v1/ingest', { // Endpoint proxied by Gateway
        method: 'POST',
        body: formData,
        headers: headers,
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
    last_updated?: string; // ISO 8601 string
    message?: string;
}

export const getDocumentStatus = async (documentId: string): Promise<DocumentStatusResponse> => {
  // Fetches status for a SINGLE document
  return request<DocumentStatusResponse>(`/api/v1/ingest/status/${documentId}`, { // Endpoint proxied by Gateway
    method: 'GET',
  });
};

// Placeholder function to list statuses (Needs corresponding Backend Endpoint)
export const listDocumentStatuses = async (/* Add filters like page, limit if needed */): Promise<DocumentStatusResponse[]> => {
    console.warn("listDocumentStatuses API call is not implemented yet.");
    // Replace with actual API call when backend endpoint exists
    // Example: return request<DocumentStatusResponse[]>('/api/v1/ingest/status', { method: 'GET' });

    // Returning dummy data for now
    await new Promise(resolve => setTimeout(resolve, 500)); // Simulate delay
    return [
        // Add some dummy data matching DocumentStatusResponse structure if needed for testing
        // { document_id: 'uuid-doc-1', status: 'processed', file_name: 'Q3_Report.pdf', last_updated: new Date(Date.now() - 3600000).toISOString(), chunk_count: 153, message: 'Processed successfully' },
        // { document_id: 'uuid-doc-2', status: 'processing', file_name: 'Competitor_Analysis.docx', last_updated: new Date(Date.now() - 60000).toISOString(), message: 'Processing document...' },
    ];
};


// --- Query Service Endpoints (via API Gateway) ---
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
    query_log_id?: string | null; // Assuming UUID is stringified
}
export const postQuery = async (payload: QueryPayload): Promise<QueryApiResponse> => {
  return request<QueryApiResponse>('/api/v1/query', { // Endpoint proxied by Gateway
    method: 'POST',
    body: JSON.stringify(payload),
  });
};