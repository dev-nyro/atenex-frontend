// File: lib/hooks/useAuth.tsx
// Purpose: Provides authentication state and actions using React Context and API Gateway JWT.
"use client";

import React, {
    createContext,
    useContext,
    useState,
    useEffect,
    useCallback,
    ReactNode,
} from 'react';
import { useRouter } from 'next/navigation';
import { User as AppUser } from '@/lib/auth/helpers'; // User interface based on JWT payload
import { toast } from "sonner";
import { AUTH_TOKEN_KEY } from '@/lib/constants'; // Key for localStorage
import { getApiGatewayUrl, cn } from '@/lib/utils'; // Import cn if needed elsewhere, getApiGatewayUrl for login endpoint

// Define the shape of the authentication context
interface AuthContextType {
    user: AppUser | null;      // Decoded user info from JWT
    token: string | null;     // The raw JWT token
    isLoading: boolean;       // True while checking auth status on initial load or during login/logout
    signIn: (email: string, password: string) => Promise<void>; // Function to log in via API Gateway
    signOut: () => Promise<void>; // Function to log out (clears local token)
}

// Default context value
const defaultAuthContextValue: AuthContextType = {
    user: null,
    token: null,
    isLoading: true, // Start as true until initial check is done
    signIn: async () => { throw new Error("AuthProvider not yet initialized"); },
    signOut: async () => { throw new Error("AuthProvider not yet initialized"); },
};

// Create the context
const AuthContext = createContext<AuthContextType>(defaultAuthContextValue);

interface AuthProviderProps { children: ReactNode; }

// Helper function to decode JWT payload (basic, no verification needed here)
// Verification happens at the API Gateway
function decodeJwtPayload(token: string): any | null {
    try {
        const base64Url = token.split('.')[1];
        if (!base64Url) return null;
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(
            atob(base64)
                .split('')
                .map(function (c) {
                    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
                })
                .join('')
        );
        return JSON.parse(jsonPayload);
    } catch (error) {
        console.error("Failed to decode JWT:", error);
        return null;
    }
}

// Helper function to create User object from decoded JWT payload
function getUserFromDecodedToken(payload: any): AppUser | null {
    if (!payload || !payload.sub) { // 'sub' (subject) is typically the user ID and is essential
        return null;
    }
    // Map claims from the JWT payload (as defined in your API Gateway's README)
    // to the AppUser interface
    return {
        userId: payload.sub,
        email: payload.email, // From 'email' claim
        name: payload.name || null, // From 'name' claim (optional)
        companyId: payload.company_id, // From 'company_id' claim
        roles: payload.roles || [], // From 'roles' claim (optional, default to empty array)
    };
}

// AuthProvider Component
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [token, setToken] = useState<string | null>(null);
    const [user, setUser] = useState<AppUser | null>(null);
    const [isLoading, setIsLoading] = useState(true); // Start loading until token is checked
    const router = useRouter();

    // --- Effect to load token from localStorage on initial mount ---
    useEffect(() => {
        console.log("AuthProvider: Initializing and checking localStorage for token...");
        // Ensure this runs only on the client
        if (typeof window !== 'undefined') {
            try {
                const storedToken = localStorage.getItem(AUTH_TOKEN_KEY);
                if (storedToken) {
                    const decodedPayload = decodeJwtPayload(storedToken);
                    const currentUser = getUserFromDecodedToken(decodedPayload);

                    if (currentUser) {
                        // Optional: Check token expiry client-side for immediate feedback,
                        // though the API Gateway is the ultimate authority.
                        const isExpired = decodedPayload.exp && (decodedPayload.exp * 1000 < Date.now());
                        if (isExpired) {
                            console.warn("AuthProvider: Stored token is expired. Clearing.");
                            localStorage.removeItem(AUTH_TOKEN_KEY);
                            setToken(null);
                            setUser(null);
                        } else {
                            console.log("AuthProvider: Valid token found in storage.", currentUser);
                            setToken(storedToken);
                            setUser(currentUser);
                        }
                    } else {
                        console.warn("AuthProvider: Invalid token found in storage. Clearing.");
                        localStorage.removeItem(AUTH_TOKEN_KEY); // Clear invalid token
                        setToken(null);
                        setUser(null);
                    }
                } else {
                    console.log("AuthProvider: No token found in storage.");
                    setToken(null);
                    setUser(null);
                }
            } catch (error) {
                console.error("AuthProvider: Error accessing localStorage or decoding token:", error);
                // Clear potentially corrupted state
                try { localStorage.removeItem(AUTH_TOKEN_KEY); } catch {}
                setToken(null);
                setUser(null);
            } finally {
                setIsLoading(false); // Finished initial check
                console.log("AuthProvider: Initial loading complete.");
            }
        } else {
             // Should not happen in client component, but good practice
             setIsLoading(false);
        }
    }, []); // Empty dependency array ensures this runs only once on mount

    // --- Sign In Function ---
    const signIn = useCallback(async (email: string, password: string): Promise<void> => {
        console.log("AuthProvider: Attempting sign in...");
        setIsLoading(true);
        // Reset previous errors if you track them in state
        let gatewayUrl = '';
        try {
            gatewayUrl = getApiGatewayUrl(); // Get URL just before the fetch
            const loginEndpoint = `${gatewayUrl}/api/v1/users/login`;
            console.log(`AuthProvider: Calling login endpoint: ${loginEndpoint}`);

            const response = await fetch(loginEndpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    // Add ngrok header if needed
                    ...(gatewayUrl.includes("ngrok-free.app") && { 'ngrok-skip-browser-warning': 'true' }),
                },
                body: JSON.stringify({ email, password }),
            });

            const responseBody = await response.json(); // Try to parse JSON regardless of status

            if (!response.ok) {
                // Use error message from API response if available
                const errorMessage = responseBody?.message || responseBody?.detail || `Login failed (${response.status})`;
                console.error("AuthProvider: Login API call failed.", { status: response.status, body: responseBody });
                throw new Error(errorMessage);
            }

            // --- Successful Login ---
            const receivedToken = responseBody?.access_token || responseBody?.token; // Check for common token names
            if (!receivedToken || typeof receivedToken !== 'string') {
                console.error("AuthProvider: No valid token received in login response.", responseBody);
                throw new Error("Login successful, but no token was received.");
            }

            const decodedPayload = decodeJwtPayload(receivedToken);
            const loggedInUser = getUserFromDecodedToken(decodedPayload);

            if (!loggedInUser) {
                console.error("AuthProvider: Received token is invalid or cannot be decoded.", receivedToken);
                throw new Error("Login successful, but received an invalid token.");
            }

            // Store token and update state
            localStorage.setItem(AUTH_TOKEN_KEY, receivedToken);
            setToken(receivedToken);
            setUser(loggedInUser);
            console.log("AuthProvider: Sign in successful.", loggedInUser);
            toast.success("Login Successful", { description: `Welcome back, ${loggedInUser.name || loggedInUser.email}!` });

            // Redirect to the chat page (or intended destination)
            router.replace('/chat'); // Use replace to avoid login page in history

        } catch (err: any) {
            console.error("AuthProvider: Sign in error:", err);
            // Clear any potentially partially set state
            localStorage.removeItem(AUTH_TOKEN_KEY);
            setToken(null);
            setUser(null);
            toast.error("Login Failed", { description: err.message || "An unexpected error occurred." });
            throw err; // Re-throw error so the form can catch it if needed
        } finally {
            setIsLoading(false);
        }
    // Include router in dependencies
    }, [router]);

    // --- Sign Out Function ---
    const signOut = useCallback(async (): Promise<void> => {
        console.log("AuthProvider: Signing out...");
        setIsLoading(true); // Optional: show loading state during sign out
        try {
            // Clear local token and state immediately
            localStorage.removeItem(AUTH_TOKEN_KEY);
            setToken(null);
            setUser(null);
            console.log("AuthProvider: Token removed and state cleared.");
            toast.success("Logged Out", { description: "You have been successfully logged out." });

            // Redirect to login page
            router.replace('/login'); // Use replace

            // Note: There's usually no backend API call needed for simple JWT logout,
            // unless you implement token blacklisting on the gateway (more complex).
        } catch (error) {
             console.error("AuthProvider: Error during sign out process:", error);
             // Even if redirect fails, ensure state is cleared
             localStorage.removeItem(AUTH_TOKEN_KEY);
             setToken(null);
             setUser(null);
             toast.error("Logout Issue", { description: "An error occurred during logout." });
        } finally {
             setIsLoading(false);
        }

    // Include router in dependencies
    }, [router]);

    // Context value provided to consumers
    const value: AuthContextType = {
        user,
        token,
        isLoading,
        signIn,
        signOut,
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

// Custom hook to use the AuthContext
export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (context === undefined) { // Check for undefined, not just falsy
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};