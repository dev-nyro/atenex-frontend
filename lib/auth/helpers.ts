import { AUTH_TOKEN_KEY } from "@/lib/constants";

// Basic token handling for client-side (use HttpOnly cookies in production)
export const getToken = (): string | null => {
  if (typeof window !== "undefined") {
    return localStorage.getItem(AUTH_TOKEN_KEY);
  }
  return null;
};

export const setToken = (token: string): void => {
  if (typeof window !== "undefined") {
    localStorage.setItem(AUTH_TOKEN_KEY, token);
  }
};

export const removeToken = (): void => {
  if (typeof window !== "undefined") {
    localStorage.removeItem(AUTH_TOKEN_KEY);
  }
};

// You would expand this with functions to parse JWT, check expiry, etc.
// For now, we just store/retrieve the raw token string.

export interface User {
    id: string;
    email: string;
    name?: string;
    // Add other relevant user properties like companyId, roles etc.
    companyId?: string; // Example: Add company ID if available in JWT payload
}

// Dummy function to simulate getting user from token (replace with actual JWT parsing)
export const getUserFromToken = (token: string | null): User | null => {
  if (!token) return null;
  try {
    // In a real app, decode the JWT here (e.g., using jwt-decode library)
    // const decoded = jwt_decode(token);
    // For demo, create a dummy user based on token presence
    return {
      id: "dummy-user-id", // Replace with actual ID from decoded token
      email: "user@example.com", // Replace with actual email
      name: "Demo User",
      companyId: "dummy-company-id" // Example, extract from token if available
    };
  } catch (error) {
    console.error("Failed to decode token:", error);
    removeToken(); // Clear invalid token
    return null;
  }
};