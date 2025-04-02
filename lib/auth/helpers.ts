// File: lib/auth/helpers.ts
import { AUTH_TOKEN_KEY } from "@/lib/constants";
import { jwtDecode } from 'jwt-decode';

// Basic token handling for client-side
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

// Frontend User interface - needs to align with JWT claims
export interface User {
    userId: string;    // Expecting 'user_id' claim in JWT
    email: string;     // Expecting 'email' claim in JWT
    name?: string;     // Expecting optional 'name' claim in JWT
    companyId: string; // Expecting 'company_id' claim in JWT
    // Add other fields if needed, e.g., roles
}

// Interface for the expected JWT payload structure from your REAL Auth Service
interface JwtPayload {
    // *** AJUSTA ESTOS NOMBRES DE CLAIMS para que coincidan EXACTAMENTE ***
    // *** con lo que tu backend (Auth Service / Supabase) pone en el token ***
    user_id: string;    // Ejemplo: claim para User ID (o podría ser 'sub')
    company_id: string; // Ejemplo: claim para Company ID
    email: string;      // Claim para Email
    name?: string;     // Claim opcional para Name
    role?: string;     // Claim opcional para Role
    exp: number;       // Standard expiry timestamp (seconds since epoch) REQUIRED
    iat?: number;      // Standard issued at timestamp (optional)
    // 'sub' (subject) es un claim estándar, a menudo contiene el user ID.
    // Si tu backend usa 'sub' para el ID de usuario, usa 'sub' aquí en lugar de 'user_id'.
    sub?: string;      // Ejemplo: Si el backend usa 'sub' para user ID
    // Agrega cualquier otro claim que tu backend incluya y necesites en el frontend
}

// Function to get user details from the JWT token
export const getUserFromToken = (token: string | null): User | null => {
  if (!token) return null;
  try {
    // Decode the JWT
    const decoded = jwtDecode<JwtPayload>(token);
    console.log("getUserFromToken - Decoded JWT Payload:", decoded); // <-- Log para depuración

    // --- Validation ---
    // 1. Check expiry
    const now = Date.now() / 1000; // Current time in seconds
    if (decoded.exp < now) {
      console.warn(`Token expired at ${new Date(decoded.exp * 1000)}. Current time: ${new Date()}.`);
      removeToken(); // Clear expired token
      return null;
    }

    // 2. Check for essential claims required by the frontend
    // *** VERIFICA que estos claims existen en tu payload decodificado ***
    //    Ajusta los nombres ('user_id', 'company_id') si tu backend usa otros (ej. 'sub')
    const userId = decoded.user_id || decoded.sub; // Usa user_id o sub como fallback
    const companyId = decoded.company_id;
    const email = decoded.email;

    if (!userId || !companyId || !email) {
        console.error("Decoded token is missing essential claims (userId/sub, companyId, email). Actual Payload:", decoded);
        removeToken(); // Clear invalid token
        return null;
    }

    // --- Map decoded payload to User interface ---
    const user: User = {
      userId: userId,                 // Map from 'user_id' or 'sub' claim
      email: email,
      companyId: companyId,           // Map from 'company_id' claim
      name: decoded.name,             // Map optional 'name' claim
      // Add other mappings if needed, e.g., role: decoded.role
    };

    console.log("getUserFromToken - Mapped User object:", user); // <-- Log para depuración
    return user;

  } catch (error) {
    // Handle various decoding errors (invalid token format, etc.)
    console.error("Failed to decode or validate token:", error);
    removeToken(); // Clear invalid token
    return null;
  }
};