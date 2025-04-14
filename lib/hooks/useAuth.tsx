// File: lib/hooks/useAuth.tsx
// Purpose: Provides authentication state and actions using React Context and JWT (API Gateway).
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
import { User as AppUser } from '@/lib/auth/helpers';
import { toast } from "sonner";
import { AUTH_TOKEN_KEY } from '@/lib/constants';

interface AuthContextType {
    user: AppUser | null;
    token: string | null;
    isLoading: boolean;
    signIn: (email: string, password: string) => Promise<void>;
    signOut: () => void;
}

const defaultAuthContextValue: AuthContextType = {
    user: null,
    token: null,
    isLoading: true,
    signIn: async () => { throw new Error("AuthProvider not initialized"); },
    signOut: () => { throw new Error("AuthProvider not initialized"); },
};

const AuthContext = createContext<AuthContextType>(defaultAuthContextValue);

interface AuthProviderProps { children: ReactNode; }

function decodeJwt(token: string): any {
    try {
        const payload = token.split('.')[1];
        return JSON.parse(atob(payload.replace(/-/g, '+').replace(/_/g, '/')));
    } catch {
        return null;
    }
}

function getUserFromToken(token: string | null): AppUser | null {
    if (!token) return null;
    const payload = decodeJwt(token);
    if (!payload) return null;
    return {
        userId: payload.sub,
        email: payload.email,
        name: payload.name || null,
        companyId: payload.company_id,
        roles: payload.roles,
    };
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [token, setToken] = useState<string | null>(null);
    const [user, setUser] = useState<AppUser | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();

    // Load token from localStorage on mount
    useEffect(() => {
        const stored = typeof window !== 'undefined' ? localStorage.getItem(AUTH_TOKEN_KEY) : null;
        setToken(stored);
        setUser(getUserFromToken(stored));
        setIsLoading(false);
    }, []);

    // Login function
    const signIn = useCallback(async (email: string, password: string) => {
        setIsLoading(true);
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_GATEWAY_URL}/api/v1/users/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });
            if (!res.ok) {
                const data = await res.json().catch(() => ({}));
                throw new Error(data.message || 'Invalid credentials');
            }
            const data = await res.json();
            const jwt = data.token || data.access_token;
            if (!jwt) throw new Error('No token received');
            localStorage.setItem(AUTH_TOKEN_KEY, jwt);
            setToken(jwt);
            setUser(getUserFromToken(jwt));
            toast.success('Login successful');
            router.replace('/chat');
        } catch (err: any) {
            toast.error('Login failed', { description: err.message });
            throw err;
        } finally {
            setIsLoading(false);
        }
    }, [router]);

    // Logout function
    const signOut = useCallback(() => {
        localStorage.removeItem(AUTH_TOKEN_KEY);
        setToken(null);
        setUser(null);
        toast.success('Logged out');
        router.replace('/login');
    }, [router]);

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

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (!context) throw new Error('useAuth must be used within an AuthProvider');
    return context;
};
