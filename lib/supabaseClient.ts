// lib/supabaseClient.ts
import { createClient, SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl) {
  throw new Error("Missing environment variable NEXT_PUBLIC_SUPABASE_URL");
}
if (!supabaseAnonKey) {
  throw new Error("Missing environment variable NEXT_PUBLIC_SUPABASE_ANON_KEY");
}

// Crear una única instancia del cliente Supabase para ser usada en toda la app
// Nota: El cliente Supabase maneja la sesión internamente.
export const supabase: SupabaseClient = createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
        // Supabase JS client maneja el almacenamiento del token automáticamente (localStorage por defecto)
        // autoRefreshToken: true, // Habilitado por defecto
        // persistSession: true, // Habilitado por defecto
        // detectSessionInUrl: true, // Habilitado por defecto (para OAuth y Magic Links/Confirmación)
    }
});

console.log("Supabase client initialized.");