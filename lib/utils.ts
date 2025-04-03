// File: lib/utils.ts
// Purpose: General utility functions, including CN for classnames and API URL retrieval.
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Retrieves the API Gateway URL from environment variables.
 * Throws an error if the environment variable is not set during runtime in production/staging.
 * Provides a default and warning in development.
 * @returns {string} The API Gateway URL without a trailing slash.
 */
export function getApiGatewayUrl(): string {
    const apiUrl = process.env.NEXT_PUBLIC_API_GATEWAY_URL;

    // Log para depuración: muestra la URL que está obteniendo del entorno
    console.log(`getApiGatewayUrl: NEXT_PUBLIC_API_GATEWAY_URL = ${apiUrl}`);

    if (!apiUrl) {
        const errorMessage = "CRITICAL: NEXT_PUBLIC_API_GATEWAY_URL environment variable is not set.";
        console.error(errorMessage);

        // Throw error in production/staging environments
        // process.env.NODE_ENV is reliable for this check in Next.js
        if (process.env.NODE_ENV === 'production') {
             // En Vercel, usa VERCEL_ENV para distinguir preview de production si es necesario
             // if (process.env.VERCEL_ENV === 'production' || process.env.VERCEL_ENV === 'preview') {
             console.error("API Gateway URL must be set in production environment variables.");
             throw new Error("API Gateway URL is not configured for production.");
             // }
        }

        // Provide a default for local development ONLY, with a clear warning.
        // Usa la URL de Ngrok que SÍ funciona según los logs del frontend.
        const defaultDevUrl = "https://1942-2001-1388-53a1-a7c9-241c-4a44-2b12-938f.ngrok-free.app";
        console.warn(`⚠️ ${errorMessage} Using default development Ngrok URL: ${defaultDevUrl}. Make sure this matches your current ngrok tunnel!`);
        return defaultDevUrl; // Return default for local dev only
    }

    // Ensure URL format is valid (basic check)
    if (!apiUrl.startsWith('http://') && !apiUrl.startsWith('https://')) {
        console.error(`Invalid API Gateway URL format: ${apiUrl}. Must start with http:// or https://`);
        throw new Error(`Invalid API Gateway URL format: ${apiUrl}`);
    }

     // Remove trailing slash if exists to prevent double slashes in requests
    return apiUrl.endsWith('/') ? apiUrl.slice(0, -1) : apiUrl;
}