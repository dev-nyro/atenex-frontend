// File: app/(app)/chat/[[...chatId]]/page.tsx (MODIFICADO - Iteración 3.1)
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
    deleteChat,
    RetrievedDoc,
    ApiError,
    mapApiMessageToFrontend,
    mapApiSourcesToFrontend,
    ChatSummary,
    ChatMessageApi,
    QueryApiResponse
} from '@/lib/api';
import { toast } from "sonner";
import { PanelRightClose, PanelRightOpen, BrainCircuit, Loader2, AlertCircle, RefreshCw } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { useAuth } from '@/lib/hooks/useAuth';
import { cn, isGreeting, isMetaQuery, getMetaResponse } from '@/lib/utils'; // Importar helpers

const welcomeMessage: Message = {
    id: 'initial-welcome',
    role: 'assistant',
    content: '¡Hola! Soy Atenex. Pregúntame cualquier cosa sobre tus documentos.',
    created_at: new Date().toISOString(),
};

export default function ChatPage() {
    const params = useParams();
    const router = useRouter();
    const pathname = usePathname();
    const { user, isLoading: isAuthLoading, signOut } = useAuth();

    const chatIdParam = params.chatId ? (Array.isArray(params.chatId) ? params.chatId[0] : params.chatId) : undefined;
    const [chatId, setChatId] = useState<string | undefined>(chatIdParam);

    const [messages, setMessages] = useState<Message[]>([welcomeMessage]);
    // Mantener los documentos de la última consulta aunque cambie el chat
    const [retrievedDocs, setRetrievedDocs] = useState<RetrievedDoc[]>([]);
    const lastDocsRef = useRef<RetrievedDoc[]>([]);
    const [isSending, setIsSending] = useState(false);
    const [isLoadingHistory, setIsLoadingHistory] = useState(false);
    const [historyError, setHistoryError] = useState<string | null>(null);
    const [isSourcesPanelVisible, setIsSourcesPanelVisible] = useState(false);

    const scrollAreaRef = useRef<HTMLDivElement>(null);
    const fetchedChatIdRef = useRef<string | 'welcome' | undefined>(undefined);

    useEffect(() => {
        if (chatIdParam !== chatId) {
            console.log(`ChatPage: URL parameter changed. Setting chatId state to: ${chatIdParam}`);
            setChatId(chatIdParam);
            fetchedChatIdRef.current = undefined;
            setIsSourcesPanelVisible(false);
        }
    }, [chatIdParam, chatId]);

    useEffect(() => {
        const bypassAuth = process.env.NEXT_PUBLIC_BYPASS_AUTH === 'true';
        const currentFetchTarget = chatId || 'welcome';

        if (!bypassAuth && isAuthLoading) {
            setIsLoadingHistory(true);
            setMessages([]);
            return;
        }

        if (!bypassAuth && !user) {
            setMessages([welcomeMessage]);
            setIsLoadingHistory(false);
            fetchedChatIdRef.current = 'welcome';
            return;
        }

        if (fetchedChatIdRef.current === currentFetchTarget) {
            if (isLoadingHistory) setIsLoadingHistory(false);
            return;
        }

        setIsLoadingHistory(true);
        setHistoryError(null);
        setMessages([]);
        // NO limpiar retrievedDocs aquí, así se mantienen los docs de la última consulta
        setIsSourcesPanelVisible(false);
        fetchedChatIdRef.current = currentFetchTarget;

        if (chatId) {
            getChatMessages(chatId)
                .then((apiMessages: ChatMessageApi[]) => {
                    const sortedMessages = [...apiMessages].sort((a, b) => {
                        const timeA = a.created_at ? new Date(a.created_at).getTime() : 0;
                        const timeB = b.created_at ? new Date(b.created_at).getTime() : 0;
                        const validTimeA = !isNaN(timeA) ? timeA : 0;
                        const validTimeB = !isNaN(timeB) ? timeB : 0;
                        if (validTimeA === 0 && validTimeB === 0) return 0;
                        if (validTimeA === 0) return -1;
                        if (validTimeB === 0) return 1;
                        return validTimeA - validTimeB;
                    });
                    const mappedMessages = sortedMessages.map(mapApiMessageToFrontend);
                    // Buscar el último mensaje con fuentes
                    let lastWithDocs: RetrievedDoc[] = [];
                    for (let i = sortedMessages.length - 1; i >= 0; i--) {
                        const sources = sortedMessages[i].sources;
                        if (Array.isArray(sources) && sources.length > 0) {
                            lastWithDocs = mapApiSourcesToFrontend(sources) || [];
                            break;
                        }
                    }
                    setRetrievedDocs(lastWithDocs);
                    lastDocsRef.current = lastWithDocs;
                    setMessages(mappedMessages.length > 0 ? mappedMessages : [welcomeMessage]);
                })
                .catch(error => {
                    let message = "Fallo al cargar el historial del chat.";
                    if (error instanceof ApiError) {
                        message = error.message || `Error API (${error.status})`;
                        if (error.status === 401 || error.status === 403) { message = "Sesión expirada o inválida. Por favor, inicia sesión de nuevo."; toast.error("Error de Autenticación", { description: message }); signOut(); }
                        else if (error.status === 404) { message = "Chat no encontrado o no tienes permiso para acceder a él."; router.replace('/chat'); }
                        else { toast.error("Fallo al cargar historial", { description: message }); }
                    } else { toast.error("Fallo al cargar historial", { description: "Ocurrió un error inesperado." }); }
                    setHistoryError(message);
                    setMessages([welcomeMessage]); // Mostrar bienvenida en caso de error
                    fetchedChatIdRef.current = undefined;
                })
                .finally(() => setIsLoadingHistory(false));
        } else {
            // Página de nuevo chat, mostrar bienvenida
            setMessages([welcomeMessage]);
            // NO limpiar retrievedDocs aquí
            setIsLoadingHistory(false);
            setIsSourcesPanelVisible(false);
            fetchedChatIdRef.current = 'welcome';
        }
    }, [chatId, user, isAuthLoading, signOut, router]);

    useEffect(() => {
        if (scrollAreaRef.current) {
            const scrollElement = scrollAreaRef.current;
            const timeoutId = setTimeout(() => {
                scrollElement.scrollTo({ top: scrollElement.scrollHeight, behavior: 'smooth' });
            }, 100);
            return () => clearTimeout(timeoutId);
        }
    }, [messages, isSending]);

    const handleSendMessage = useCallback(async (query: string) => {
        const text = query.trim();
        if (!text) {
            toast.warning("No se puede enviar un mensaje vacío.");
            return;
        }

        // Añadir mensaje del usuario inmediatamente
        const userMessage: Message = {
            id: `client-user-${Date.now()}`,
            role: 'user',
            content: text,
            created_at: new Date().toISOString()
        };
        // Asegurarse de quitar el mensaje de bienvenida si existe y no es el único mensaje
        setMessages(prev => prev.length === 1 && prev[0].id === 'initial-welcome' ? [userMessage] : [...prev.filter(m => m.id !== 'initial-welcome'), userMessage]);


        // --- NUEVO: Manejo local de saludos y consultas meta ---
        if (isGreeting(text)) {
            const greetingResponse: Message = {
                id: `assistant-greet-${Date.now()}`,
                role: 'assistant',
                content: '¡Hola! ¿En qué puedo ayudarte hoy?',
                created_at: new Date().toISOString()
            };
            setMessages(prev => [...prev, greetingResponse]);
            return; // No llamar a la API
        }
        if (isMetaQuery(text)) {
             const metaResponse: Message = {
                 id: `assistant-meta-${Date.now()}`,
                 role: 'assistant',
                 content: getMetaResponse(),
                 created_at: new Date().toISOString()
             };
             setMessages(prev => [...prev, metaResponse]);
             return; // No llamar a la API
        }
        // --- FIN Manejo local ---

        const bypassAuth = process.env.NEXT_PUBLIC_BYPASS_AUTH === 'true';
        const isAuthenticated = !!user || bypassAuth;

        if (!isAuthenticated) {
            toast.error("No Autenticado", { description: "Por favor, inicia sesión para enviar mensajes."});
            signOut();
            return;
        }
        if (isSending) {
            console.warn("ChatPage: Envío de mensaje ya en progreso.");
            return;
        }

        setIsSending(true);
        // No limpiar retrievedDocs aquí, así se mantienen los docs de la última consulta

        const currentChatIdForApi = chatId || null;
        console.log(`ChatPage: Sending query to API (Chat ID: ${currentChatIdForApi || 'New'})...`);

        try {
            const response: QueryApiResponse = await postQuery({
                query: text, // Usar texto limpio
                chat_id: currentChatIdForApi,
            });

            const returnedChatId = response.chat_id;
            const mappedSources = mapApiSourcesToFrontend(response.retrieved_documents as any);

            const assistantMessage: Message = {
                id: `client-assistant-${Date.now()}`,
                role: 'assistant',
                content: response.answer,
                sources: mappedSources,
                created_at: new Date().toISOString()
            };

            setMessages(prev => [...prev, assistantMessage]);
            setRetrievedDocs(mappedSources || []);
            lastDocsRef.current = mappedSources || [];

            if (!currentChatIdForApi && returnedChatId) {
                setChatId(returnedChatId);
                fetchedChatIdRef.current = returnedChatId;
                router.replace(`/chat/${returnedChatId}`, { scroll: false });
            } else if (currentChatIdForApi && currentChatIdForApi !== returnedChatId) {
                 console.warn(`ChatPage: API returned different chat ID (${returnedChatId}) than expected (${currentChatIdForApi}).`);
            }

            if (mappedSources && mappedSources.length > 0) {
                setIsSourcesPanelVisible(true); // Abrir panel si hay fuentes
            }
             console.log(`ChatPage: Query successful. Answer received for chat ${returnedChatId}.`);

        } catch (error) {
            let errorMessage = "Lo siento, ocurrió un error al procesar tu solicitud.";
             if (error instanceof ApiError) {
                 errorMessage = error.message || `Error API (${error.status})`;
                 if (error.status === 401 || error.status === 403) { errorMessage = "Error de autenticación. Por favor, inicia sesión de nuevo."; signOut(); }
                 else { toast.error("Consulta Fallida", { description: errorMessage }); }
             } else if (error instanceof Error) { errorMessage = `Error: ${error.message}`; toast.error("Consulta Fallida", { description: errorMessage }); }
             else { toast.error("Consulta Fallida", { description: "Ocurrió un error desconocido." }); }

            const errorMsgObj: Message = { id: `error-${Date.now()}`, role: 'assistant', content: errorMessage, isError: true, created_at: new Date().toISOString() };
            setMessages(prev => [...prev, errorMsgObj]);

        } finally {
            setIsSending(false);
        }
    }, [chatId, isSending, user, router, signOut]);

    const handlePanelToggle = () => { setIsSourcesPanelVisible(!isSourcesPanelVisible); };

    const handleNewChat = () => {
        if (pathname !== '/chat') { router.push('/chat'); }
        else {
             // Resetear estado local para un nuevo chat
             setMessages([welcomeMessage]);
             setRetrievedDocs([]);
             setChatId(undefined);
             setIsSourcesPanelVisible(false);
             fetchedChatIdRef.current = 'welcome';
             console.log("ChatPage: Already on new chat page, reset state.");
        }
    };

    // Renderizado del contenido del chat
    const renderChatContent = (): React.ReactNode => {
        if (isLoadingHistory) {
            return (
                // Skeleton mejorado
                <div className="space-y-6 p-4">
                    <div className="flex items-start space-x-3 pr-10">
                        <Skeleton className="h-8 w-8 rounded-full flex-shrink-0" />
                        <div className="flex-1 space-y-2">
                            <Skeleton className="h-4 w-3/4 rounded" />
                            <Skeleton className="h-4 w-1/2 rounded" />
                        </div>
                    </div>
                    <div className="flex items-start space-x-3 justify-end pl-10">
                         <div className="flex-1 space-y-2 items-end flex flex-col">
                            <Skeleton className="h-4 w-3/4 rounded" />
                        </div>
                        <Skeleton className="h-8 w-8 rounded-full flex-shrink-0" />
                    </div>
                     <div className="flex items-start space-x-3 pr-10">
                        <Skeleton className="h-8 w-8 rounded-full flex-shrink-0" />
                        <div className="flex-1 space-y-2">
                            <Skeleton className="h-4 w-1/2 rounded" />
                        </div>
                    </div>
                </div>
            );
        }
        if (historyError) {
            // Mensaje de error mejorado
            return (
                <div className="flex flex-col items-center justify-center h-full text-center p-6">
                    <AlertCircle className="h-12 w-12 text-destructive mb-4" />
                    <p className="text-xl font-semibold text-foreground mb-2">Error al Cargar el Chat</p>
                    <p className="text-sm text-muted-foreground mb-5 max-w-sm">{historyError}</p>
                    <Button variant="outline" size="sm" onClick={() => window.location.reload()} className="mt-4">
                        <RefreshCw className="mr-2 h-4 w-4" />
                        Reintentar Carga
                    </Button>
                </div>
            );
        }
        // Mostrar mensajes o estado vacío si no hay error ni carga
        return (
            <div className="space-y-6 pb-6"> {/* Espaciado y padding inferior */}
                {messages.map((message) => ( <ChatMessage key={message.id} message={message} /> ))}
                {/* Indicador de carga "pensando" */}
                {isSending && (
                    <div className="flex items-start space-x-3 pr-10 pt-4">
                        <Skeleton className="h-8 w-8 rounded-full flex-shrink-0 bg-primary/10" />
                        <div className="flex-1 space-y-2 pt-1.5">
                            <Skeleton className="h-3.5 w-16 rounded" />
                        </div>
                    </div>
                )}
            </div>
        );
    };

    return (
        // Fondo ligeramente diferente para el área de chat
        <div className="flex flex-col h-full bg-background">
             <ResizablePanelGroup direction="horizontal" className="flex-1 overflow-hidden">
                 <ResizablePanel defaultSize={isSourcesPanelVisible ? 65 : 100} minSize={40}>
                     <div className="flex h-full flex-col relative">
                         {/* Botón toggle más discreto */}
                         <div className="absolute top-3 right-3 z-20">
                             <Button
                                onClick={handlePanelToggle}
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 rounded-full text-muted-foreground hover:text-foreground hover:bg-accent/50 data-[state=open]:bg-accent data-[state=open]:text-accent-foreground"
                                data-state={isSourcesPanelVisible ? "open" : "closed"} // Para posible estilo futuro
                                aria-label={isSourcesPanelVisible ? 'Cerrar Panel de Fuentes' : 'Abrir Panel de Fuentes'}
                             >
                                 {isSourcesPanelVisible ? <PanelRightClose className="h-5 w-5" /> : <PanelRightOpen className="h-5 w-5" />}
                             </Button>
                         </div>
                         {/* Ajuste de padding en ScrollArea */}
                         <ScrollArea className="flex-1 px-6 pt-6 pb-2" ref={scrollAreaRef}>
                             {renderChatContent()}
                         </ScrollArea>
                         {/* Borde superior más sutil y padding ajustado */}
                         <div className="border-t border-border/60 p-4 bg-background/95 backdrop-blur-sm shadow-sm shrink-0">
                             <ChatInput onSendMessage={handleSendMessage} isLoading={isSending || isLoadingHistory || isAuthLoading} />
                         </div>
                     </div>
                 </ResizablePanel>
                 {/* Panel de fuentes siempre visible con los docs de la última consulta */}
                 <>
                     <ResizableHandle withHandle />
                     <ResizablePanel defaultSize={35} minSize={25} maxSize={50}>
                         <RetrievedDocumentsPanel documents={retrievedDocs.length > 0 ? retrievedDocs : lastDocsRef.current} isLoading={isSending} />
                     </ResizablePanel>
                 </>
             </ResizablePanelGroup>
        </div>
    );
}