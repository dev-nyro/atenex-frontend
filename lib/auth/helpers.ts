// lib/auth/helpers.ts
import { AUTH_TOKEN_KEY } from "@/lib/constants";
// jwt-decode ya no es estrictamente necesario aquí si confiamos en Supabase
// import { jwtDecode, InvalidTokenError } from 'jwt-decode';

// --- Funciones básicas de localStorage (pueden eliminarse si no se usan en otro lugar) ---
// Supabase JS client maneja su propio almacenamiento de sesión, por lo que estas
// funciones manuales para *el token de autenticación* ya no son la fuente principal.
// Podrían mantenerse si necesitas almacenar OTROS tokens o datos relacionados con auth.
export const getToken = (): string | null => {
  if (typeof window !== "undefined") {
    // Podrías intentar obtener el token de Supabase aquí, pero es mejor usar getSession()
    // return localStorage.getItem(AUTH_TOKEN_KEY); // <-- Evitar esto para el token de auth
    console.warn("getToken() manual llamado, considera usar supabase.auth.getSession()");
    return localStorage.getItem(AUTH_TOKEN_KEY); // Mantener por si acaso, pero advertir
  }
  return null;
};

export const setToken = (token: string): void => {
   if (typeof window !== "undefined") {
     // Evitar sobrescribir el manejo de sesión de Supabase
     // localStorage.setItem(AUTH_TOKEN_KEY, token); // <-- Evitar esto
     console.warn("setToken() manual llamado, Supabase maneja la sesión.");
     localStorage.setItem(AUTH_TOKEN_KEY, token); // Mantener por si acaso, pero advertir
   }
};

export const removeToken = (): void => {
   if (typeof window !== "undefined") {
     // Podría interferir con Supabase si borra su clave, es mejor usar supabase.auth.signOut()
     // localStorage.removeItem(AUTH_TOKEN_KEY); // <-- Evitar esto
     console.warn("removeToken() manual llamado, considera usar supabase.auth.signOut()");
     localStorage.removeItem(AUTH_TOKEN_KEY); // Mantener por si acaso, pero advertir
   }
};
// --- FIN Funciones localStorage ---


// Frontend User interface - Definición de cómo queremos que luzca el usuario en el frontend
// Esta interfaz se poblará con datos de la sesión de Supabase.
export interface User {
    userId: string;    // Mapeado desde Supabase User ID (user.id)
    email?: string;    // Mapeado desde Supabase User Email (user.email)
    name?: string;     // Mapeado desde Supabase User Metadata (user.user_metadata.full_name)
    companyId?: string; // Mapeado desde Supabase App Metadata (user.app_metadata.company_id)
    roles?: string[];  // Mapeado desde Supabase App Metadata (user.app_metadata.roles)
    // Añade otros campos necesarios del objeto User de Supabase
}

// --- getUserFromToken ELIMINADO ---
// Ya no decodificaremos manualmente el token. Usaremos los datos del usuario
// proporcionados por el cliente Supabase (supabase.auth.getUser() o de la sesión).