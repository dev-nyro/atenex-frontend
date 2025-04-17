// File: lib/hooks/useAuth.tsx
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
import { getApiGatewayUrl, cn } from '@/lib/utils';

interface AuthContextType {
    user: AppUser | null;
    token: string | null;
    isLoading: boolean;
    signIn: (email: string, password: string) => Promise<void>;
    signOut: () => Promise<void>;
}

const defaultAuthContextValue: AuthContextType = {
    user: null,
    token: null,
    isLoading: true,
    signIn: async () => { throw new Error("AuthProvider no inicializado"); }, // Traducido
    signOut: async () => { throw new Error("AuthProvider no inicializado"); }, // Traducido
};

const AuthContext = createContext<AuthContextType>(defaultAuthContextValue);

interface AuthProviderProps { children: ReactNode; }

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
        console.error("Fallo al decodificar JWT:", error); // Traducido
        return null;
    }
}

function getUserFromDecodedToken(payload: any): AppUser | null {
    if (!payload || !payload.sub) {
        return null;
    }
    return {
        userId: payload.sub,
        email: payload.email,
        name: payload.name || null,
        companyId: payload.company_id,
        roles: payload.roles || [],
    };
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [token, setToken] = useState<string | null>(null);
    const [user, setUser] = useState<AppUser | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        console.log("AuthProvider: Inicializando y buscando token en localStorage...");
        if (typeof window !== 'undefined') {
            try {
                const storedToken = localStorage.getItem(AUTH_TOKEN_KEY);
                if (storedToken) {
                    const decodedPayload = decodeJwtPayload(storedToken);
                    const currentUser = getUserFromDecodedToken(decodedPayload);

                    if (currentUser) {
                        const isExpired = decodedPayload.exp && (decodedPayload.exp * 1000 < Date.now());
                        if (isExpired) {
                            console.warn("AuthProvider: Token almacenado está expirado. Limpiando."); // Traducido
                            localStorage.removeItem(AUTH_TOKEN_KEY);
                            setToken(null);
                            setUser(null);
                        } else {
                            console.log("AuthProvider: Token válido encontrado en almacenamiento.", currentUser);
                            setToken(storedToken);
                            setUser(currentUser);
                        }
                    } else {
                        console.warn("AuthProvider: Token inválido encontrado en almacenamiento. Limpiando."); // Traducido
                        localStorage.removeItem(AUTH_TOKEN_KEY);
                        setToken(null);
                        setUser(null);
                    }
                } else {
                    console.log("AuthProvider: No se encontró token en almacenamiento."); // Traducido
                    setToken(null);
                    setUser(null);
                }
            } catch (error) {
                console.error("AuthProvider: Error accediendo a localStorage o decodificando token:", error); // Traducido
                try { localStorage.removeItem(AUTH_TOKEN_KEY); } catch {}
                setToken(null);
                setUser(null);
            } finally {
                setIsLoading(false);
                console.log("AuthProvider: Carga inicial completa."); // Traducido
            }
        } else {
             setIsLoading(false);
        }
    }, []);

    const signIn = useCallback(async (email: string, password: string): Promise<void> => {
        console.log("AuthProvider: Intentando iniciar sesión..."); // Traducido
        setIsLoading(true);
        let gatewayUrl = '';
        try {
            gatewayUrl = getApiGatewayUrl();
            const loginEndpoint = `${gatewayUrl}/api/v1/users/login`;
            console.log(`AuthProvider: Llamando al endpoint de login: ${loginEndpoint}`);

            const response = await fetch(loginEndpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    ...(gatewayUrl.includes("ngrok-free.app") && { 'ngrok-skip-browser-warning': 'true' }),
                },
                body: JSON.stringify({ email, password }),
            });

            const responseBody = await response.json();

            if (!response.ok) {
                const errorMessage = responseBody?.message || responseBody?.detail || `Fallo en login (${response.status})`; // Traducido
                console.error("AuthProvider: Llamada a API de login fallida.", { status: response.status, body: responseBody }); // Traducido
                throw new Error(errorMessage);
            }

            const receivedToken = responseBody?.access_token || responseBody?.token;
            if (!receivedToken || typeof receivedToken !== 'string') {
                console.error("AuthProvider: No se recibió un token válido en la respuesta de login.", responseBody); // Traducido
                throw new Error("Login exitoso, pero no se recibió token."); // Traducido
            }

            const decodedPayload = decodeJwtPayload(receivedToken);
            const loggedInUser = getUserFromDecodedToken(decodedPayload);

            if (!loggedInUser) {
                console.error("AuthProvider: Token recibido es inválido o no se puede decodificar.", receivedToken); // Traducido
                throw new Error("Login exitoso, pero se recibió un token inválido."); // Traducido
            }

            localStorage.setItem(AUTH_TOKEN_KEY, receivedToken);
            setToken(receivedToken);
            setUser(loggedInUser);
            console.log("AuthProvider: Inicio de sesión exitoso.", loggedInUser); // Traducido
            // Toast traducido
            toast.success("Inicio de Sesión Exitoso", { description: `¡Bienvenido de nuevo, ${loggedInUser.name || loggedInUser.email}!` });

            router.replace('/chat');

        } catch (err: any) {
            console.error("AuthProvider: Error en inicio de sesión:", err); // Traducido
            localStorage.removeItem(AUTH_TOKEN_KEY);
            setToken(null);
            setUser(null);
            // Toast traducido
            toast.error("Inicio de Sesión Fallido", { description: err.message || "Ocurrió un error inesperado." });
            throw err;
        } finally {
            setIsLoading(false);
        }
    }, [router]);

    const signOut = useCallback(async (): Promise<void> => {
        console.log("AuthProvider: Cerrando sesión..."); // Traducido
        setIsLoading(true);
        try {
            localStorage.removeItem(AUTH_TOKEN_KEY);
            setToken(null);
            setUser(null);
            console.log("AuthProvider: Token eliminado y estado limpiado."); // Traducido
            // Toast traducido
            toast.success("Sesión Cerrada", { description: "Has cerrado sesión correctamente." });

            router.replace('/login');

        } catch (error) {
             console.error("AuthProvider: Error durante el proceso de cierre de sesión:", error); // Traducido
             localStorage.removeItem(AUTH_TOKEN_KEY);
             setToken(null);
             setUser(null);
             // Toast traducido
             toast.error("Problema al Cerrar Sesión", { description: "Ocurrió un error durante el cierre de sesión." });
        } finally {
             setIsLoading(false);
        }
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
    if (context === undefined) {
        throw new Error('useAuth debe ser usado dentro de un AuthProvider'); // Traducido
    }
    return context;
};