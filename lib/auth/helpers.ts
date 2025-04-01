// File: lib/auth/helpers.ts
import { AUTH_TOKEN_KEY } from "@/lib/constants";
import { jwtDecode } from 'jwt-decode'; // Import jwtDecode

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
    id: string;
    email: string;
    name?: string;
    companyId?: string;
    // Add other relevant user properties, matching what your backend JWT provides
}

interface JWTPayload {
    sub: string; // id de supabase
    email: string;
    // name?: string; <---Quitar
    // companyId?: string; <---Quitar
    exp: number; // Expiration timestamp
    [key: string]: any; // Allow other properties
}

export const getUserFromToken = (token: string | null): User | null => {
    if (!token) return null;
    try {
        const decoded: JWTPayload = jwtDecode(token);

        if (!decoded.sub || !decoded.email) { // Cambiar decoded.userID por decoded.sub
            console.warn("getUserFromToken: JWT is missing required claims (sub, email).");
            return null;
        }

        const user: User = {
            id: decoded.sub, // Cambiar decoded.userID por decoded.sub
            email: decoded.email,
            // name: decoded.name || undefined, <---Quitar
            // companyId: decoded.companyId || undefined, <---Quitar
            // Add other properties as needed, based on your JWT payload
        };
        // console.log("getUserFromToken: Decoded user:", user);
        return user;
    } catch (error) {
        console.error("getUserFromToken: Failed to decode token:", error);
        removeToken(); // Clear invalid token
        return null;
    }
};