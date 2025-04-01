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
    userId: string; // Renamed from id for clarity if needed, or keep as id
    email: string;
    name?: string;
    companyId: string; // Ensure this is present
    // Add other relevant claims like roles if available
    // exp?: number; // Expiry time
}

// Interface for the expected JWT payload structure
interface JwtPayload {
    user_id: string; // Match the claim name from your backend JWT
    company_id: string; // Match the claim name
    email: string;
    name?: string;
    exp: number; // Standard expiry claim
    // Add other claims as needed
}

// Function to get user details from the JWT token
export const getUserFromToken = (token: string | null): User | null => {
  if (!token) return null;
  try {
    // Decode the JWT
    const decoded = jwtDecode<JwtPayload>(token);

    // Check expiry (optional but recommended)
    const now = Date.now() / 1000;
    if (decoded.exp < now) {
      console.warn("Token has expired.");
      removeToken(); // Clear expired token
      return null;
    }

    // Map decoded payload to User interface
    const user: User = {
      userId: decoded.user_id, // Map from payload claim
      email: decoded.email,
      companyId: decoded.company_id, // Map from payload claim
      name: decoded.name, // Optional name claim
    };

    // Basic validation
    if (!user.userId || !user.companyId || !user.email) {
        console.error("Decoded token is missing essential claims (userId, companyId, email).", decoded);
        removeToken();
        return null;
    }

    return user;

  } catch (error) {
    console.error("Failed to decode or validate token:", error);
    removeToken(); // Clear invalid token
    return null;
  }
};