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
import { useRouter, usePathname } from 'next/navigation'; // Import usePathname
import { User as AppUser } from '@/lib/auth/helpers'; // Importa la interfaz actualizada
import { toast } from "sonner";
import { AUTH_TOKEN_KEY } from '@/lib/constants';
import { getApiGatewayUrl } from '@/lib/utils'; // cn no se usa aquí

// Definir el email del admin globalmente o importarlo
const ADMIN_EMAIL = "atenex@gmail.com";

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
    signIn: async () => { throw new Error("AuthProvider no inicializado"); },
    signOut: async () => { throw new Error("AuthProvider no inicializado"); },
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
        console.error("Fallo al decodificar JWT:", error);
        return null;
    }
}

function getUserFromDecodedToken(payload: any): AppUser | null {
    if (!payload || !payload.sub) {
        return null;
    }
    // Añadir la lógica isAdmin
    const isAdmin = payload.email === ADMIN_EMAIL;
    console.log(`getUserFromDecodedToken: Email=${payload.email}, IsAdmin=${isAdmin}`);
    return {
        userId: payload.sub,
        email: payload.email,
        name: payload.name || null,
        companyId: payload.company_id || null, // Asegurar que puede ser null
        roles: payload.roles || [],
        isAdmin: isAdmin, // Establecer el flag isAdmin
    };
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [token, setToken] = useState<string | null>(null);
    const [user, setUser] = useState<AppUser | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();
    const pathname = usePathname(); // Obtener pathname actual

    useEffect(() => {
        console.log("AuthProvider: Inicializando...");
        if (typeof window !== 'undefined') {
            try {
                const storedToken = localStorage.getItem(AUTH_TOKEN_KEY);
                if (storedToken) {
                    const decodedPayload = decodeJwtPayload(storedToken);
                    const currentUser = getUserFromDecodedToken(decodedPayload);

                    if (currentUser) {
                        const isExpired = decodedPayload.exp && (decodedPayload.exp * 1000 < Date.now());
                        if (isExpired) {
                            console.warn("AuthProvider: Token expirado. Limpiando.");
                            localStorage.removeItem(AUTH_TOKEN_KEY);
                            setToken(null);
                            setUser(null);
                        } else {
                            console.log("AuthProvider: Token válido encontrado.", currentUser);
                            setToken(storedToken);
                            setUser(currentUser);

                             // --- Redirección inicial si es Admin ---
                             if (currentUser.isAdmin && !pathname?.startsWith('/admin')) {
                                 console.log("AuthProvider: Admin detectado en inicialización, redirigiendo a /admin");
                                 router.replace('/admin');
                             }
                             // --- Fin Redirección inicial ---

                        }
                    } else {
                        console.warn("AuthProvider: Token inválido encontrado. Limpiando.");
                        localStorage.removeItem(AUTH_TOKEN_KEY);
                        setToken(null);
                        setUser(null);
                    }
                } else {
                    console.log("AuthProvider: No se encontró token.");
                    setToken(null);
                    setUser(null);
                }
            } catch (error) {
                console.error("AuthProvider: Error en inicialización:", error);
                try { localStorage.removeItem(AUTH_TOKEN_KEY); } catch {}
                setToken(null);
                setUser(null);
            } finally {
                setIsLoading(false);
                console.log("AuthProvider: Carga inicial completa.");
            }
        } else {
             setIsLoading(false); // No estamos en el navegador
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []); // Ejecutar solo una vez al montar

    const signIn = useCallback(async (email: string, password: string): Promise<void> => {
        console.log("AuthProvider: Intentando iniciar sesión...");
        setIsLoading(true);
        let gatewayUrl = '';
        try {
            gatewayUrl = getApiGatewayUrl();
            const loginEndpoint = `${gatewayUrl}/api/v1/users/login`;
            console.log(`AuthProvider: Llamando a: ${loginEndpoint}`);

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
                const errorMessage = responseBody?.message || responseBody?.detail || `Fallo en login (${response.status})`;
                console.error("AuthProvider: Fallo API login.", { status: response.status, body: responseBody });
                throw new Error(errorMessage);
            }

            const receivedToken = responseBody?.access_token || responseBody?.token;
            if (!receivedToken || typeof receivedToken !== 'string') {
                console.error("AuthProvider: Token no válido en respuesta.", responseBody);
                throw new Error("Login OK, pero no se recibió token.");
            }

            const decodedPayload = decodeJwtPayload(receivedToken);
            const loggedInUser = getUserFromDecodedToken(decodedPayload);

            if (!loggedInUser) {
                console.error("AuthProvider: Token recibido inválido.", receivedToken);
                throw new Error("Login OK, pero token inválido.");
            }

            localStorage.setItem(AUTH_TOKEN_KEY, receivedToken);
            setToken(receivedToken);
            setUser(loggedInUser);
            console.log("AuthProvider: Inicio de sesión exitoso.", loggedInUser);
            toast.success("Inicio de Sesión Exitoso", { description: `¡Bienvenido de nuevo, ${loggedInUser.name || loggedInUser.email}!` });

            // Redirigir al dashboard si es admin, si no al chat
            if (loggedInUser.isAdmin) {
                router.replace('/admin'); // Redirigir a la nueva página admin
            } else {
                router.replace('/chat');
            }

        } catch (err: any) {
            console.error("AuthProvider: Error en inicio de sesión:", err);
            localStorage.removeItem(AUTH_TOKEN_KEY);
            setToken(null);
            setUser(null);
            toast.error("Inicio de Sesión Fallido", { description: err.message || "Ocurrió un error inesperado." });
            throw err;
        } finally {
            setIsLoading(false);
        }
    }, [router]);

    const signOut = useCallback(async (): Promise<void> => {
        console.log("AuthProvider: Cerrando sesión...");
        setIsLoading(true);
        try {
            localStorage.removeItem(AUTH_TOKEN_KEY);
            setToken(null);
            setUser(null);
            console.log("AuthProvider: Estado limpiado.");
            toast.success("Sesión Cerrada", { description: "Has cerrado sesión correctamente." });

            router.replace('/login'); // Siempre redirigir a login al cerrar sesión

        } catch (error) {
             console.error("AuthProvider: Error durante cierre de sesión:", error);
             localStorage.removeItem(AUTH_TOKEN_KEY); // Asegurar limpieza
             setToken(null);
             setUser(null);
             toast.error("Problema al Cerrar Sesión", { description: "Ocurrió un error." });
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
        throw new Error('useAuth debe ser usado dentro de un AuthProvider');
    }
    return context;
};