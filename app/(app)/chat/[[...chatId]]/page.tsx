// File: app/(app)/chat/[[...chatId]]/page.tsx
// Purpose: Main chat interface page, using useAuth for state and API calls via lib/api.
"use client";

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useParams, useRouter, usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ChatInput } from '@/components/chat/chat-input';
import { ChatMessage, Message } from '@/components/chat/chat-message';
import { RetrievedDocumentsPanel } from '@/components/chat/retrieved-documents-panel';
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import {
    postQuery,
    getChatMessages,
    deleteChat, // Asegúrate de que esta importación esté presente si necesitas la función
    RetrievedDoc,
    ApiError,
    mapApiMessageToFrontend,
    mapApiSourcesToFrontend,
    ChatSummary, // Importar si se usa (ej. en sidebar)
    ChatMessageApi, // Interfaz de la API para mensajes
    QueryApiResponse // Interfaz de la respuesta 'ask'
} from '@/lib/api';
import { toast } from "sonner";
import { PanelRightClose, PanelRightOpen, BrainCircuit, Loader2, AlertCircle, PlusCircle, RefreshCw } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { useAuth } from '@/lib/hooks/useAuth';
import { cn } from '@/lib/utils'; // Asegúrate de importar cn

// Mensaje inicial estándar
const welcomeMessage: Message = {
    id: 'initial-welcome',
    role: 'assistant',
    content: '¡Hola! Soy Atenex. Pregúntame cualquier cosa sobre tus documentos.',
    created_at: new Date().toISOString(), // Timestamp para el mensaje de bienvenida
};

export default function ChatPage() {
    const params = useParams();
    const router = useRouter();
    const pathname = usePathname();
    const { user, isLoading: isAuthLoading, signOut } = useAuth(); // Usar el hook de autenticación

    // Obtener chatId de los parámetros de ruta
    const chatIdParam = params.chatId ? (Array.isArray(params.chatId) ? params.chatId[0] : params.chatId) : undefined;
    const [chatId, setChatId] = useState<string | undefined>(chatIdParam);

    // Estado del chat
    const [messages, setMessages] = useState<Message[]>([welcomeMessage]); // Inicia con bienvenida
    const [retrievedDocs, setRetrievedDocs] = useState<RetrievedDoc[]>([]); // Documentos recuperados
    const [isSending, setIsSending] = useState(false); // Enviando mensaje
    const [isLoadingHistory, setIsLoadingHistory] = useState(false); // Cargando historial
    const [historyError, setHistoryError] = useState<string | null>(null); // Error al cargar historial
    const [isPanelOpen, setIsPanelOpen] = useState(true); // Panel derecho abierto/cerrado

    // Refs
    const scrollAreaRef = useRef<HTMLDivElement>(null);
    // Ref para evitar múltiples fetches para el mismo chat ID durante la carga inicial
    const fetchedChatIdRef = useRef<string | 'welcome' | undefined>(undefined);

    // Sincronizar chatId del estado con el parámetro de la URL
    useEffect(() => {
        // Solo actualiza si el parámetro cambia realmente
        if (chatIdParam !== chatId) {
            console.log(`ChatPage: URL parameter changed. Setting chatId state to: ${chatIdParam}`);
            setChatId(chatIdParam);
            fetchedChatIdRef.current = undefined; // Reset fetch ref cuando el param cambia
        }
    }, [chatIdParam, chatId]); // Depende de ambos para detectar cambio

    // Efecto para cargar el historial del chat
    useEffect(() => {
        const bypassAuth = process.env.NEXT_PUBLIC_BYPASS_AUTH === 'true';
        const currentFetchTarget = chatId || 'welcome'; // 'welcome' si no hay chatId

        // 1. Esperar a que la autenticación termine (si no se bypass)
        if (!bypassAuth && isAuthLoading) {
            console.log("ChatPage: Waiting for authentication...");
             setIsLoadingHistory(true); // Mostrar carga mientras espera auth
             setMessages([]); // Limpiar mensajes mientras carga auth
            return;
        }

        // 2. Verificar si el usuario está autenticado (si no se bypass)
        if (!bypassAuth && !user) {
             console.log("ChatPage: User not authenticated. Cannot fetch history.");
             setMessages([welcomeMessage]); // Mostrar bienvenida si no está logueado
             setIsLoadingHistory(false); // Terminar carga
             fetchedChatIdRef.current = 'welcome'; // Marcar como 'cargado' (el estado no logueado)
            // No redirigir aquí, AppLayout maneja la redirección
            return;
        }

        // 3. Evitar fetches redundantes si ya se cargó este chat/estado
        if (fetchedChatIdRef.current === currentFetchTarget) {
            console.log(`ChatPage: History for ${currentFetchTarget} already fetched or fetch in progress. Skipping.`);
            // Si ya se cargó y el estado de carga aún es true, ponerlo a false
            if (isLoadingHistory) setIsLoadingHistory(false);
            return;
        }

        // 4. Iniciar la carga del historial
        console.log(`ChatPage: Fetching history for target: ${currentFetchTarget}`);
        setIsLoadingHistory(true);
        setHistoryError(null);
        setMessages([]); // Limpiar mensajes existentes antes de cargar nuevos
        setRetrievedDocs([]); // Limpiar documentos también
        fetchedChatIdRef.current = currentFetchTarget; // Marcar que se está intentando cargar este target

        // 5. Ejecutar la llamada a la API si hay un chatId
        if (chatId) {
            getChatMessages(chatId)
                .then((apiMessages: ChatMessageApi[]) => { // Especificar tipo aquí
                    // --- MODIFICACIÓN: Lógica de ordenación robusta ---
                    // Ordena por fecha de creación (asume que siempre existe)
                    // Maneja posibles strings inválidos o nulos por si acaso
                    const sortedMessages = [...apiMessages].sort((a, b) => {
                        const timeA = a.created_at ? new Date(a.created_at).getTime() : 0;
                        const timeB = b.created_at ? new Date(b.created_at).getTime() : 0;

                        // Tratar fechas inválidas (NaN) como 0 para ponerlas al principio o final
                        const validTimeA = !isNaN(timeA) ? timeA : 0;
                        const validTimeB = !isNaN(timeB) ? timeB : 0;

                        // Si ambas son inválidas, mantener orden relativo
                        if (validTimeA === 0 && validTimeB === 0) return 0;
                        // Poner fechas inválidas consistentemente (ej. al principio)
                        if (validTimeA === 0) return -1;
                        if (validTimeB === 0) return 1;

                        return validTimeA - validTimeB; // Orden ascendente (más antiguo primero)
                    });
                    // ---------------------------------------------

                    const mappedMessages = sortedMessages.map(mapApiMessageToFrontend);
                    setMessages(mappedMessages.length > 0 ? mappedMessages : [welcomeMessage]); // Mostrar bienvenida si el historial está vacío
                    console.log(`ChatPage: History loaded successfully for ${chatId}. ${mappedMessages.length} messages.`);
                })
                .catch(error => {
                    console.error(`ChatPage: Error loading history for chat ${chatId}:`, error);
                    let message = "Failed to load chat history.";
                     if (error instanceof ApiError) {
                         message = error.message || `API Error (${error.status})`;
                         if (error.status === 401 || error.status === 403) {
                            message = "Session expired or invalid. Please log in again.";
                            toast.error("Authentication Error", { description: message });
                            signOut(); // Desloguear si hay error de autenticación
                         } else if (error.status === 404) {
                             message = "Chat not found or you don't have permission to access it.";
                             // Podrías redirigir a /chat si el chat no existe
                             router.replace('/chat');
                         } else {
                             toast.error("Failed to load history", { description: message });
                         }
                    } else {
                        toast.error("Failed to load history", { description: "An unexpected error occurred." });
                    }
                    setHistoryError(message);
                    setMessages([welcomeMessage]); // Mostrar bienvenida en caso de error
                    fetchedChatIdRef.current = undefined; // Permitir reintentar si falla
                })
                .finally(() => {
                    setIsLoadingHistory(false);
                    console.log(`ChatPage: Finished loading attempt for ${chatId}`);
                });
        } else {
            // Si no hay chatId (página /chat), mostrar bienvenida
            console.log("ChatPage: No chatId provided, showing welcome message.");
            setMessages([welcomeMessage]);
            setRetrievedDocs([]);
            setIsLoadingHistory(false);
            fetchedChatIdRef.current = 'welcome'; // Marcar 'welcome' como cargado
        }
    // Dependencias clave: chatId, estado de autenticación (user, isAuthLoading), signOut, router
    }, [chatId, user, isAuthLoading, signOut, router]); // Removido isLoadingHistory de deps para evitar bucles

    // Scroll automático al final
    useEffect(() => {
        if (scrollAreaRef.current) {
            const scrollElement = scrollAreaRef.current;
            // Pequeño delay para asegurar que el DOM se actualizó antes de hacer scroll
            const timeoutId = setTimeout(() => {
                 scrollElement.scrollTo({ top: scrollElement.scrollHeight, behavior: 'smooth' });
            }, 100);
            return () => clearTimeout(timeoutId); // Limpiar timeout si el componente se desmonta
        }
    }, [messages, isSending]); // Depende de los mensajes y del estado de envío

    // Manejador para enviar mensajes
    const handleSendMessage = useCallback(async (query: string) => {
        const bypassAuth = process.env.NEXT_PUBLIC_BYPASS_AUTH === 'true';
        // --- MODIFICACIÓN: Usar 'user' para verificar autenticación ---
        const isAuthenticated = !!user || bypassAuth;
        // -----------------------------------------------------------

        // Validaciones previas
        if (!query.trim()) {
             toast.warning("Cannot send empty message.");
             return;
        }
        if (!isAuthenticated) {
             toast.error("Not Authenticated", { description: "Please log in to send messages."});
             signOut(); // O redirigir a login
             return;
        }
        if (isSending) {
            console.warn("ChatPage: Message sending already in progress.");
            return;
        }

        // Añadir mensaje del usuario a la UI inmediatamente
        const userMessage: Message = {
            id: `client-user-${Date.now()}`,
            role: 'user',
            content: query,
            created_at: new Date().toISOString() // Timestamp del cliente para el mensaje del usuario
        };
        // Usar una función de actualización para asegurar el estado más reciente
        setMessages(prev => [...prev.filter(m => m.id !== 'initial-welcome'), userMessage]);
        setIsSending(true); // Marcar como enviando
        setRetrievedDocs([]); // Limpiar documentos previos

        // Usar el chatId actual para la llamada a la API (puede ser undefined -> null)
        const currentChatIdForApi = chatId || null;
        console.log(`ChatPage: Sending query to API (Chat ID: ${currentChatIdForApi || 'New'})...`);

        try {
            // Llamada a la API con el payload correcto
            const response: QueryApiResponse = await postQuery({
                query,
                chat_id: currentChatIdForApi,
                // retriever_top_k: 5 // Opcional: Podrías añadirlo aquí si quieres controlarlo desde el front
            });

            // --- MODIFICACIÓN: Acceso directo a chat_id garantizado por QueryApiResponse ---
            const returnedChatId = response.chat_id;
            // ------------------------------------------------------------------------------

            // Mapear documentos recuperados al formato del frontend
            // Cast to 'any' to bypass the type mismatch, assuming the function handles the actual structure.
            // Ideally, the types in lib/api.ts should be consistent.
            const mappedSources = mapApiSourcesToFrontend(response.retrieved_documents as any);

            // Crear mensaje del asistente
            const assistantMessage: Message = {
                id: `client-assistant-${Date.now()}`, // ID temporal del cliente
                role: 'assistant',
                content: response.answer,
                sources: mappedSources, // Fuentes mapeadas
                created_at: new Date().toISOString() // Timestamp del cliente para respuesta del asistente
            };

            // Actualizar mensajes con la respuesta del asistente
            setMessages(prev => [...prev, assistantMessage]);
            setRetrievedDocs(mappedSources || []); // Actualizar panel de documentos

            // Si era un chat nuevo y la API devolvió un ID, actualizar URL y estado
            if (!currentChatIdForApi && returnedChatId) {
                console.log(`ChatPage: New chat created with ID: ${returnedChatId}. Updating URL and state.`);
                setChatId(returnedChatId); // Actualizar estado interno
                fetchedChatIdRef.current = returnedChatId; // Marcar como 'cargado'
                router.replace(`/chat/${returnedChatId}`, { scroll: false }); // Actualizar URL sin recargar
            } else if (currentChatIdForApi && currentChatIdForApi !== returnedChatId) {
                 // Esto no debería pasar si la API funciona como se espera (ask en chat existente devuelve el mismo ID)
                 console.warn(`ChatPage: API returned a different chat ID (${returnedChatId}) than expected (${currentChatIdForApi}) for an existing chat.`);
                 // Podrías optar por actualizar la URL si confías en la respuesta de la API
                 // router.replace(`/chat/${returnedChatId}`, { scroll: false });
                 // setChatId(returnedChatId);
            }

            // Abrir panel si hay documentos y estaba cerrado
            if (mappedSources && mappedSources.length > 0 && !isPanelOpen) {
                setIsPanelOpen(true);
            }
             console.log(`ChatPage: Query successful. Answer received for chat ${returnedChatId}.`);

        } catch (error) {
            console.error("ChatPage: Query failed:", error);
            let errorMessage = "Sorry, an error occurred while processing your request.";
             if (error instanceof ApiError) {
                 errorMessage = error.message || `API Error (${error.status})`;
                 if (error.status === 401 || error.status === 403) {
                     errorMessage = "Authentication error. Please log in again.";
                     signOut(); // Desloguear
                 } else {
                      toast.error("Query Failed", { description: errorMessage });
                 }
             } else if (error instanceof Error) {
                 errorMessage = `Error: ${error.message}`;
                 toast.error("Query Failed", { description: errorMessage });
             } else {
                  toast.error("Query Failed", { description: "An unknown error occurred." });
             }

            // Crear un mensaje de error para mostrar en el chat
            const errorMsgObj: Message = {
                id: `error-${Date.now()}`,
                role: 'assistant',
                content: errorMessage,
                isError: true,
                created_at: new Date().toISOString()
            };
            setMessages(prev => [...prev, errorMsgObj]); // Añadir mensaje de error

        } finally {
            setIsSending(false); // Terminar estado de envío
        }
    // Dependencias: chatId (para enviar), isSending (para evitar doble envío), user (para auth check), router, isPanelOpen, signOut
    }, [chatId, isSending, user, router, isPanelOpen, signOut]);

    // Toggle panel derecho
    const handlePanelToggle = () => { setIsPanelOpen(!isPanelOpen); };

    // Navegar a un chat nuevo
    const handleNewChat = () => {
        // Solo navegar si no estamos ya en /chat sin ID
        if (pathname !== '/chat') {
             console.log("ChatPage: Starting new chat.");
             router.push('/chat');
        } else {
             // Si ya estamos en /chat, reseteamos el estado local por si acaso
             setMessages([welcomeMessage]);
             setRetrievedDocs([]);
             setChatId(undefined);
             fetchedChatIdRef.current = 'welcome';
             console.log("ChatPage: Already on new chat page, reset state.");
        }
    };

    // Renderiza el contenido del chat (mensajes o estados de carga/error)
    const renderChatContent = (): React.ReactNode => {
        // Estado de carga del historial
        if (isLoadingHistory) {
            return (
                <div className="space-y-4 p-4">
                    <Skeleton className="h-16 w-3/4 rounded-lg" />
                    <Skeleton className="h-16 w-1/2 ml-auto rounded-lg" />
                    <Skeleton className="h-16 w-3/4 rounded-lg" />
                </div>
            );
        }

        // Estado de error al cargar historial
        if (historyError) {
            return (
                <div className="flex flex-col items-center justify-center h-full text-destructive p-4 text-center">
                    <AlertCircle className="h-10 w-10 mb-3" />
                    <p className="text-lg font-semibold mb-1">Error Loading Chat</p>
                    <p className="text-sm mb-4">{historyError}</p>
                    <Button variant="outline" size="sm" onClick={() => window.location.reload()} className="mt-4">
                         <RefreshCw className="mr-2 h-4 w-4" />
                        Retry Page Load
                    </Button>
                </div>
            );
        }

        // Renderizar mensajes
        return (
            <div className="space-y-4 pb-4"> {/* Padding bottom para espacio */}
                {messages.map((message) => (
                     <ChatMessage key={message.id} message={message} />
                ))}
                {/* Indicador "Thinking..." solo si se está enviando */}
                {isSending && (
                    <div className="flex items-start space-x-3 pl-11"> {/* Alineado con avatar del asistente */}
                         <div className="flex items-center space-x-2 text-muted-foreground p-3 bg-muted rounded-lg shadow-sm">
                            <BrainCircuit className="h-5 w-5 animate-pulse text-primary" />
                            <span className="text-sm">Atenex is thinking...</span>
                         </div>
                    </div>
                )}
            </div>
        );
    };

    // --- Renderizado Principal ---
    return (
        <div className="flex flex-col h-full bg-muted/20 dark:bg-background">
            {/* Botón "New Chat" siempre visible arriba a la izquierda */}
            <div className="absolute top-3 left-3 z-20">
                 <Button
                    variant="outline"
                    size="sm"
                    onClick={handleNewChat}
                    // Deshabilitar si se está enviando, cargando historial o auth, o si ya estamos en new chat
                    disabled={isSending || isLoadingHistory || isAuthLoading || (!chatId && pathname === '/chat')}
                    title="Start a new chat"
                    className="bg-background/80 hover:bg-muted" // Estilo para destacar sobre fondo
                 >
                     <PlusCircle className="h-4 w-4 mr-2" />
                     New Chat
                 </Button>
             </div>

             {/* Layout Resizable */}
             <ResizablePanelGroup direction="horizontal" className="flex-1 overflow-hidden"> {/* overflow-hidden aquí */}
                 <ResizablePanel defaultSize={isPanelOpen ? 70 : 100} minSize={30}>
                     <div className="flex h-full flex-col relative">
                         {/* Botón toggle panel derecho */}
                         <div className="absolute top-3 right-3 z-20">
                             <Button
                                onClick={handlePanelToggle}
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 bg-background/50 hover:bg-muted rounded-full"
                                aria-label={isPanelOpen ? 'Close Sources Panel' : 'Open Sources Panel'}
                             >
                                 {isPanelOpen ? <PanelRightClose className="h-5 w-5" /> : <PanelRightOpen className="h-5 w-5" />}
                             </Button>
                         </div>

                         {/* Área de scroll para mensajes */}
                         {/* Añadir padding top para no solaparse con botones */}
                         <ScrollArea className="flex-1 px-4 pt-14" ref={scrollAreaRef}>
                             {renderChatContent()}
                         </ScrollArea>

                         {/* Input de chat fijo abajo */}
                         <div className="border-t p-4 bg-background shadow-inner shrink-0">
                             <ChatInput
                                 onSendMessage={handleSendMessage}
                                 // Deshabilitar input si se está cargando auth o historial
                                 isLoading={isSending || isLoadingHistory || isAuthLoading}
                             />
                         </div>
                     </div>
                 </ResizablePanel>

                 {/* Panel de fuentes (condicional) */}
                 {isPanelOpen && (
                     <>
                         <ResizableHandle withHandle className="bg-border" />
                         <ResizablePanel defaultSize={30} minSize={20} maxSize={50}>
                             <RetrievedDocumentsPanel
                                 documents={retrievedDocs}
                                 isLoading={isSending} // Solo muestra carga en el panel mientras se 'piensa'
                             />
                         </ResizablePanel>
                     </>
                 )}
             </ResizablePanelGroup>
        </div>
    );
}