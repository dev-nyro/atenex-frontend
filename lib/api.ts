import { getToken } from './auth/helpers';
import { getApiGatewayUrl } from './utils';

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

  // Add X-Company-ID if needed DIRECTLY by a service (Gateway should handle it based on JWT)
  // const { user } = useAuth(); // Cannot use hooks here
  // const companyId = getCompanyIdFromSomewhere(); // Get company ID if needed
  // if (companyId) {
  //   headers.set('X-Company-ID', companyId);
  // }

  const config: RequestInit = {
    ...options,
    headers,
  };

  // Log the request details (optional)
  console.log(`API Request: ${config.method || 'GET'} ${url}`);
  // if (config.body && !(config.body instanceof FormData)) {
  //    console.log('Request Body:', config.body);
  // }

  try {
    const response = await fetch(url, config);

    if (!response.ok) {
      let errorData: ApiErrorData | null = null;
      try {
        // Try to parse error response body
        errorData = await response.json();
      } catch (e) {
        // Ignore if response is not JSON
        console.warn("API error response was not valid JSON:", await response.text());
      }
      const errorMessage = errorData?.detail
        ? (typeof errorData.detail === 'string' ? errorData.detail : JSON.stringify(errorData.detail))
        : errorData?.message || `HTTP error ${response.status}`;

      console.error(`API Error: ${response.status} ${errorMessage}`, errorData);
      throw new ApiError(errorMessage, response.status, errorData || undefined);
    }

    // Handle successful response with no content
    if (response.status === 204 || response.headers.get('content-length') === '0') {
        console.log(`API Success: ${response.status} No Content`);
        return {} as T; // Or return null/undefined based on expected type
    }

    const data: T = await response.json();
    console.log(`API Success: ${response.status}`, data);
    return data;
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

// --- Auth Service (Example Proxied through API Gateway or Direct) ---
// Note: Adjust endpoint if auth is handled by a separate service proxied via gateway

export const loginUser = async (credentials: { email: string; password: string }) => {
  // Assuming backend provides { access_token: string } on successful login
  // The Gateway might proxy this to an /auth service endpoint
  // Adjust the endpoint based on your Gateway/Auth service routing
  const response = await request<{ access_token: string }>('/api/auth/login', { // Example endpoint
    method: 'POST',
    body: JSON.stringify(credentials),
  });
  return response.access_token;
};

export const registerUser = async (details: { email: string; password: string; name?: string }) => {
  // Assuming backend provides user details or just success/token
  // Adjust endpoint and response type as needed
  const response = await request<{ access_token: string; user: User }>('/api/auth/register', { // Example endpoint
    method: 'POST',
    body: JSON.stringify(details),
  });
  return response;
};

// --- Ingest Service Endpoints (via API Gateway) ---

export const uploadDocument = async (formData: FormData, metadata: Record<string, any> = {}) => {
    // Append metadata as a JSON string field if needed by backend
    formData.append('metadata_json', JSON.stringify(metadata));

    // NOTE: Let the browser set the Content-Type header for FormData
    const headers = new Headers();
    const token = getToken();
    if (token) {
        headers.set('Authorization', `Bearer ${token}`);
    }
    // Remove manual Content-Type setting for FormData
    // headers.delete('Content-Type');

    return request<{ document_id: string; task_id: string; status: string; message: string }>('/api/v1/ingest', {
        method: 'POST',
        body: formData,
        headers: headers, // Pass only necessary headers (Auth)
    });
};

export const getDocumentStatus = async (documentId: string) => {
  return request<any>(`/api/v1/ingest/status/${documentId}`, { // Replace 'any' with specific StatusResponse type
    method: 'GET',
  });
};

// --- Query Service Endpoints (via API Gateway) ---

interface QueryPayload {
    query: string;
    retriever_top_k?: number;
    // chat_history?: Array<{ role: string; content: string }>; // Add if using history
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

export const postQuery = async (payload: QueryPayload) => {
  return request<QueryApiResponse>('/api/v1/query', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
};