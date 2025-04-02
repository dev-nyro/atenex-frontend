// File: lib/supabaseClient.ts
// Purpose: Initialize and export the Supabase client instance.
import { createClient, SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl) {
  console.error("CRITICAL: Missing environment variable NEXT_PUBLIC_SUPABASE_URL");
  throw new Error("Missing environment variable NEXT_PUBLIC_SUPABASE_URL");
}
if (!supabaseAnonKey) {
  console.error("CRITICAL: Missing environment variable NEXT_PUBLIC_SUPABASE_ANON_KEY");
  throw new Error("Missing environment variable NEXT_PUBLIC_SUPABASE_ANON_KEY");
}

// Create a single Supabase client instance to be used throughout the app.
// The Supabase JS client handles session management (storage, refresh) internally.
export const supabase: SupabaseClient = createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
        // Supabase JS client handles token storage automatically (localStorage by default)
        autoRefreshToken: true, // Default: true
        persistSession: true, // Default: true
        detectSessionInUrl: true, // Default: true (handles OAuth, Magic Links, Email Confirm)
    },
    // Optional: Add global fetch options if needed, e.g., for specific headers
    // global: {
    //   fetch: (input, init) => {
    //     // Add custom logic if needed before fetch executes
    //     return fetch(input, init);
    //   },
    // },
});

console.log("Supabase client initialized successfully.");