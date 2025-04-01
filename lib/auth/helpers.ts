// File: lib/auth/helpers.ts
import { AUTH_TOKEN_KEY } from "@/lib/constants";
// Install jwt-decode: npm install jwt-decode
import { jwtDecode } from 'jwt-decode'; // Use a proper JWT decoding library

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

export interface User {
    // Align with JWT claims expected/needed by frontend
    userId: string; // Matches 'user_id' claim from backend JWT
    email: string;
    name?: string; // Optional name claim
    companyId: string; // Matches 'company_id' claim from backend JWT
    // Add other relevant claims like roles if available in token
    // exp?: number; // Expiry time (managed internally by getUserFromToken)
}

// Interface for the expected JWT payload structure from your Auth Service
interface JwtPayload {
    user_id: string; // Claim name for User ID (as defined in your Auth Service)
    company_id: string; // Claim name for Company ID (as defined in your Auth Service)
    email: string;
    name?: string; // Optional name claim
    role?: string; // Example: Optional role claim
    exp: number; // Standard expiry timestamp (seconds since epoch)
    iat?: number; // Standard issued at timestamp
    // Add any other claims your backend includes
}

// Function to get user details from the JWT token
export const getUserFromToken = (token: string | null): User | null => {
  if (!token) return null;
  try {
    // Decode the JWT
    const decoded = jwtDecode<JwtPayload>(token);

    // --- Validation ---
    // 1. Check expiry
    const now = Date.now() / 1000; // Current time in seconds
    if (decoded.exp < now) {
      console.warn(`Token expired at ${new Date(decoded.exp * 1000)}. Current time: ${new Date()}.`);
      removeToken(); // Clear expired token
      return null;
    }

    // 2. Check for essential claims required by the frontend
    if (!decoded.user_id || !decoded.company_id || !decoded.email) {
        console.error("Decoded token is missing essential claims (user_id, company_id, email). Payload:", decoded);
        removeToken(); // Clear invalid token
        return null;
    }

    // --- Map decoded payload to User interface ---
    const user: User = {
      userId: decoded.user_id, // Map from 'user_id' claim
      email: decoded.email,
      companyId: decoded.company_id, // Map from 'company_id' claim
      name: decoded.name, // Map optional 'name' claim
      // Add other mappings if needed, e.g., role: decoded.role
    };

    return user;

  } catch (error) {
    // Handle various decoding errors (invalid token format, etc.)
    console.error("Failed to decode or validate token:", error);
    removeToken(); // Clear invalid token
    return null;
  }
};