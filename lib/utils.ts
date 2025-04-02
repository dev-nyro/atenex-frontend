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

    if (!apiUrl) {
        const errorMessage = "CRITICAL: NEXT_PUBLIC_API_GATEWAY_URL environment variable is not set.";
        console.error(errorMessage);

        // Throw error in production/staging environments
        if (process.env.NODE_ENV === 'production' || process.env.VERCEL_ENV === 'production' || process.env.VERCEL_ENV === 'preview') {
             throw new Error("API Gateway URL is not configured. Please set NEXT_PUBLIC_API_GATEWAY_URL in Vercel environment variables.");
        } else {
            // Provide a default for local development ONLY, with a clear warning.
            // Adjust the default URL if your local gateway runs elsewhere.
            const defaultDevUrl = "http://localhost:8080"; // Default for local FastAPI gateway
            console.warn(`⚠️ ${errorMessage} Using default development URL: ${defaultDevUrl}`);
            return defaultDevUrl;
        }
    }
     // Remove trailing slash if exists to prevent double slashes in requests
    return apiUrl.endsWith('/') ? apiUrl.slice(0, -1) : apiUrl;
}