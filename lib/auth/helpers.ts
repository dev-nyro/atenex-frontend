// lib/auth/helpers.ts
import { AUTH_TOKEN_KEY } from "@/lib/constants";
import { jwtDecode, InvalidTokenError } from 'jwt-decode'; // Importar error específico

// ... (getToken, setToken, removeToken - sin cambios) ...
export const getToken = (): string | null => { /* ... */ };
export const setToken = (token: string): void => { /* ... */ };
export const removeToken = (): void => { /* ... */ };

// Frontend User interface
export interface User {
    userId: string;    // Mapeado desde 'sub' del JWT
    email: string;     // Mapeado desde 'email'
    name?: string;     // Mapeado desde 'user_metadata.full_name' o similar (opcional)
    companyId: string; // Mapeado desde 'app_metadata.company_id' (o donde esté)
    roles?: string[];  // Mapeado desde 'app_metadata.roles' (opcional)
    // Añade otros campos necesarios
}

// Interface for the ACTUAL Supabase JWT payload structure
// ¡¡¡ VERIFICA ESTO CON UN TOKEN REAL DE TU PROYECTO !!!
interface SupabaseJwtPayload {
    sub: string;       // User ID (Subject) - ¡MUY PROBABLE!
    aud: string;       // Audience (e.g., 'authenticated') - ¡MUY PROBABLE!
    exp: number;       // Expiration time (seconds since epoch) - ¡SEGURO!
    iat?: number;      // Issued at time (optional)
    email?: string;     // Email - ¡MUY PROBABLE!
    phone?: string;    // Phone (optional)
    role?: string;     // Rol asignado por Supabase Auth (e.g., 'authenticated') - ¡PROBABLE!

    // --- Metadatos ---
    app_metadata?: {
        provider?: string;
        providers?: string[];
        // --- ¡POSIBLE UBICACIÓN DE COMPANY_ID Y ROLES! ---
        company_id?: string | number; // Verifica el tipo real
        roles?: string[];
        // Otros datos específicos de la aplicación
        [key: string]: any;
    };
    user_metadata?: {
        // Datos que el usuario puede gestionar (o tú vía admin)
        full_name?: string;
        avatar_url?: string;
        // Otros datos específicos del usuario
         [key: string]: any;
    };
    // Otros claims posibles: session_id (sid), amr, etc.
}

// Function to get user details from the JWT token
export const getUserFromToken = (token: string | null): User | null => {
  if (!token) return null;
  try {
    // Decode the JWT
    const decoded = jwtDecode<SupabaseJwtPayload>(token);
    // console.debug("getUserFromToken - Raw Decoded JWT:", decoded); // Log para depuración intensa

    // --- Validation ---
    const now = Date.now() / 1000;
    if (decoded.exp < now) {
      console.warn(`Token expired at ${new Date(decoded.exp * 1000)}. Removing.`);
      removeToken();
      return null;
    }

    // --- Claim Extraction and Mapping ---
    const userId = decoded.sub; // Usar 'sub' como User ID
    const email = decoded.email;
    // Extraer company_id de app_metadata (¡AJUSTA SI ES NECESARIO!)
    const companyIdRaw = decoded.app_metadata?.company_id;
    const companyId = companyIdRaw ? String(companyIdRaw) : undefined; // Convertir a string si existe

    // Validar claims esenciales para el frontend
    if (!userId || !email || !companyId) {
        console.error("Decoded token missing essential claims:", {
            hasUserId: !!userId,
            hasEmail: !!email,
            hasCompanyId: !!companyId,
            appMetadata: decoded.app_metadata // Log para ver qué hay
        });
        removeToken();
        return null;
    }

    // Mapear a la interfaz User del frontend
    const user: User = {
      userId: userId,
      email: email,
      companyId: companyId, // Ya es string o undefined (y validamos que no sea undefined)
      // Mapear opcionales (ejemplos)
      name: decoded.user_metadata?.full_name,
      roles: decoded.app_metadata?.roles,
    };

    // console.debug("getUserFromToken - Mapped User:", user);
    return user;

  } catch (error) {
     // Manejar errores específicos de jwt-decode
     if (error instanceof InvalidTokenError) {
         console.error("Failed to decode token (Invalid):", error.message);
     } else {
         console.error("Failed to decode or validate token (Unknown Error):", error);
     }
    removeToken();
    return null;
  }
};
