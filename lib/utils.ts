import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Helper to get base URL for API calls
export function getBaseUrl() {
  if (typeof window !== "undefined") {
    // Client-side
    return ""; // Relative path for client-side calls
  }
  // Server-side
  if (process.env.VERCEL_URL) {
    // Vercel deployment
    return `https://${process.env.VERCEL_URL}`;
  }
  // Local development
  return `http://localhost:${process.env.PORT ?? 3000}`;
}

// Helper to get API Gateway URL (assuming it's exposed publicly or via env var)
export function getApiGatewayUrl() {
    // Prioritize environment variable if set
    const gatewayUrl = process.env.NEXT_PUBLIC_API_GATEWAY_URL;
    if (gatewayUrl) {
        return gatewayUrl.replace(/\/$/, ""); // Remove trailing slash if exists
    }
    // Fallback for local development (replace with your actual gateway URL)
    console.warn("NEXT_PUBLIC_API_GATEWAY_URL not set, using fallback http://localhost:8080");
    return "http://localhost:8080";
}