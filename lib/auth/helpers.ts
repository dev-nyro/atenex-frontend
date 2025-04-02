// lib/auth/helpers.ts
// import { AUTH_TOKEN_KEY } from "@/lib/constants"; // Ya no es necesario para el token principal

// --- Funciones manuales de localStorage (OBSOLETAS para el token de sesión) ---
// Estas funciones ya no deben usarse para gestionar el token de sesión de Supabase.
// El cliente Supabase JS maneja esto internamente. Se dejan aquí comentadas
// o con advertencias por si se usan para otros fines, pero idealmente deberían eliminarse.

/*
export const getToken = (): string | null => {
  if (typeof window !== "undefined") {
    console.warn("getToken() manual llamado. Supabase maneja la sesión. Considera eliminar esta función.");
    // return localStorage.getItem(AUTH_TOKEN_KEY); // Evitar leer directamente
    return null; // Devolver null para evitar conflictos
  }
  return null;
};

export const setToken = (token: string): void => {
   if (typeof window !== "undefined") {
     console.warn("setToken() manual llamado. Supabase maneja la sesión. Considera eliminar esta función.");
     // localStorage.setItem(AUTH_TOKEN_KEY, token); // Evitar escribir directamente
   }
};

export const removeToken = (): void => {
   if (typeof window !== "undefined") {
     console.warn("removeToken() manual llamado. Usa supabase.auth.signOut(). Considera eliminar esta función.");
     // localStorage.removeItem(AUTH_TOKEN_KEY); // Evitar eliminar directamente
   }
};
*/
// --- FIN Funciones localStorage obsoletas ---


// --- Interfaz User del Frontend (sin cambios) ---
// Define la estructura del usuario que usaremos en el frontend.
// Esta interfaz se poblará con datos de la sesión de Supabase via useAuth.
export interface User {
  userId: string;    // Mapeado desde Supabase User ID (user.id)
  email?: string;    // Mapeado desde Supabase User Email (user.email)
  name?: string;     // Mapeado desde Supabase User Metadata (user.user_metadata.full_name o name)
  companyId?: string; // Mapeado desde Supabase App Metadata (user.app_metadata.company_id)
  roles?: string[];  // Mapeado desde Supabase App Metadata (user.app_metadata.roles)
  // Añade otros campos necesarios del objeto User de Supabase si los necesitas en el frontend
}

// --- getUserFromToken ELIMINADO ---
// Ya no necesitamos decodificar el token manualmente en el frontend.
// La información del usuario vendrá directamente del objeto User/Session de Supabase
// gestionado por el hook useAuth.