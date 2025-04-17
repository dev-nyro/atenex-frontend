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
import { PanelRightClose, PanelRightOpen, BrainCircuit, Loader2, AlertCircle, PlusCircle, RefreshCw } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { useAuth } from '@/lib/hooks/useAuth';
import { cn } from '@/lib/utils';

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
    const [retrievedDocs, setRetrievedDocs] = useState<RetrievedDoc[]>([]);
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
            console.log("ChatPage: Waiting for authentication...");
            setIsLoadingHistory(true);
            setMessages([]);
            return;
        }

        if (!bypassAuth && !user) {
            console.log("ChatPage: User not authenticated. Cannot fetch history.");
            setMessages([welcomeMessage]);
            setIsLoadingHistory(false);
            fetchedChatIdRef.current = 'welcome';
            return;
        }

        if (fetchedChatIdRef.current === currentFetchTarget) {
            if (isLoadingHistory) setIsLoadingHistory(false);
            return;
        }

        console.log(`ChatPage: Fetching history for target: ${currentFetchTarget}`);
        setIsLoadingHistory(true);
        setHistoryError(null);
        setMessages([]);
        setRetrievedDocs([]);
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
                    setMessages(mappedMessages.length > 0 ? mappedMessages : [welcomeMessage]);
                    console.log(`ChatPage: History loaded successfully for ${chatId}. ${mappedMessages.length} messages.`);
                })
                .catch(error => {
                    console.error(`ChatPage: Error loading history for chat ${chatId}:`, error);
                    let message = "Fallo al cargar el historial del chat.";
                    if (error instanceof ApiError) {
                        message = error.message || `Error API (${error.status})`;
                        if (error.status === 401 || error.status === 403) {
                            message = "Sesión expirada o inválida. Por favor, inicia sesión de nuevo.";
                            toast.error("Error de Autenticación", { description: message });
                            signOut();
                        } else if (error.status === 404) {
                            message = "Chat no encontrado o no tienes permiso para acceder a él.";
                            router.replace('/chat');
                        } else {
                            toast.error("Fallo al cargar historial", { description: message });
                        }
                    } else {
                        toast.error("Fallo al cargar historial", { description: "Ocurrió un error inesperado." });
                    }
                    setHistoryError(message);
                    setMessages([welcomeMessage]);
                    fetchedChatIdRef.current = undefined;
                })
                .finally(() => {
                    setIsLoadingHistory(false);
                    console.log(`ChatPage: Finished loading attempt for ${chatId}`);
                });
        } else {
            console.log("ChatPage: No chatId provided, showing welcome message.");
            setMessages([welcomeMessage]);
            setRetrievedDocs([]);
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
        const bypassAuth = process.env.NEXT_PUBLIC_BYPASS_AUTH === 'true';
        const isAuthenticated = !!user || bypassAuth;

        if (!query.trim()) {
            toast.warning("No se puede enviar un mensaje vacío.");
            return;
        }
        if (!isAuthenticated) {
            toast.error("No Autenticado", { description: "Por favor, inicia sesión para enviar mensajes."});
            signOut();
            return;
        }
        if (isSending) {
            console.warn("ChatPage: Envío de mensaje ya en progreso.");
            return;
        }

        const userMessage: Message = {
            id: `client-user-${Date.now()}`,
            role: 'user',
            content: query,
            created_at: new Date().toISOString()
        };
        setMessages(prev => [...prev.filter(m => m.id !== 'initial-welcome'), userMessage]);
        setIsSending(true);
        setRetrievedDocs([]);

        const currentChatIdForApi = chatId || null;
        console.log(`ChatPage: Sending query to API (Chat ID: ${currentChatIdForApi || 'New'})...`);

        try {
            const response: QueryApiResponse = await postQuery({
                query,
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

            if (!currentChatIdForApi && returnedChatId) {
                console.log(`ChatPage: New chat created with ID: ${returnedChatId}. Updating URL and state.`);
                setChatId(returnedChatId);
                fetchedChatIdRef.current = returnedChatId;
                router.replace(`/chat/${returnedChatId}`, { scroll: false });
            } else if (currentChatIdForApi && currentChatIdForApi !== returnedChatId) {
                 console.warn(`ChatPage: API returned a different chat ID (${returnedChatId}) than expected (${currentChatIdForApi}) for an existing chat.`);
            }

            if (mappedSources && mappedSources.length > 0) {
                setIsSourcesPanelVisible(true);
            }
             console.log(`ChatPage: Query successful. Answer received for chat ${returnedChatId}.`);

        } catch (error) {
            console.error("ChatPage: Query failed:", error);
            let errorMessage = "Lo siento, ocurrió un error al procesar tu solicitud.";
             if (error instanceof ApiError) {
                 errorMessage = error.message || `Error API (${error.status})`;
                 if (error.status === 401 || error.status === 403) {
                     errorMessage = "Error de autenticación. Por favor, inicia sesión de nuevo.";
                     signOut();
                 } else {
                      toast.error("Consulta Fallida", { description: errorMessage });
                 }
             } else if (error instanceof Error) {
                 errorMessage = `Error: ${error.message}`;
                 toast.error("Consulta Fallida", { description: errorMessage });
             } else {
                  toast.error("Consulta Fallida", { description: "Ocurrió un error desconocido." });
             }

            const errorMsgObj: Message = {
                id: `error-${Date.now()}`,
                role: 'assistant',
                content: errorMessage,
                isError: true,
                created_at: new Date().toISOString()
            };
            setMessages(prev => [...prev, errorMsgObj]);

        } finally {
            setIsSending(false);
        }
    }, [chatId, isSending, user, router, signOut]);

    const handlePanelToggle = () => { setIsSourcesPanelVisible(!isSourcesPanelVisible); };

    const handleNewChat = () => {
        if (pathname !== '/chat') {
             console.log("ChatPage: Starting new chat.");
             router.push('/chat');
        } else {
             setMessages([welcomeMessage]);
             setRetrievedDocs([]);
             setChatId(undefined);
             setIsSourcesPanelVisible(false);
             fetchedChatIdRef.current = 'welcome';
             console.log("ChatPage: Already on new chat page, reset state.");
        }
    };

    const renderChatContent = (): React.ReactNode => {
        if (isLoadingHistory) {
            return (
                <div className="space-y-4 p-4">
                    <Skeleton className="h-16 w-3/4 rounded-lg" />
                    <Skeleton className="h-16 w-1/2 ml-auto rounded-lg" />
                    <Skeleton className="h-16 w-3/4 rounded-lg" />
                </div>
            );
        }

        if (historyError) {
            return (
                <div className="flex flex-col items-center justify-center h-full text-destructive p-4 text-center">
                    <AlertCircle className="h-10 w-10 mb-3" />
                    <p className="text-lg font-semibold mb-1">Error al Cargar el Chat</p>
                    <p className="text-sm mb-4">{historyError}</p>
                    <Button variant="outline" size="sm" onClick={() => window.location.reload()} className="mt-4">
                         <RefreshCw className="mr-2 h-4 w-4" />
                        Reintentar Carga
                    </Button>
                </div>
            );
        }

        return (
            // MODIFICADO: Aumentado espaciado vertical entre mensajes
            <div className="space-y-6 pb-4">
                {messages.map((message) => (
                     <ChatMessage key={message.id} message={message} />
                ))}
                {isSending && (
                    // MODIFICADO: Estilo "pensando" más sutil
                    <div className="flex items-center justify-center pt-4">
                        <div className="flex items-center space-x-1.5 text-xs text-muted-foreground">
                            <BrainCircuit className="h-4 w-4 animate-pulse" />
                            <span>Atenex está pensando...</span>
                         </div>
                    </div>
                )}
            </div>
        );
    };

    return (
        <div className="flex flex-col h-full bg-muted/20 dark:bg-background">
             <ResizablePanelGroup direction="horizontal" className="flex-1 overflow-hidden">
                 <ResizablePanel defaultSize={isSourcesPanelVisible ? 70 : 100} minSize={30}>
                     <div className="flex h-full flex-col relative">
                         <div className="absolute top-3 right-3 z-20">
                             <Button
                                onClick={handlePanelToggle}
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 bg-background/50 hover:bg-muted rounded-full"
                                aria-label={isSourcesPanelVisible ? 'Cerrar Panel de Fuentes' : 'Abrir Panel de Fuentes'}
                             >
                                 {isSourcesPanelVisible ? <PanelRightClose className="h-5 w-5" /> : <PanelRightOpen className="h-5 w-5" />}
                             </Button>
                         </div>

                         {/* MODIFICADO: Padding superior e inferior ajustados */}
                         <ScrollArea className="flex-1 px-4 pt-6 pb-6" ref={scrollAreaRef}>
                             {renderChatContent()}
                         </ScrollArea>

                         <div className="border-t p-4 bg-background shadow-inner shrink-0">
                             <ChatInput
                                 onSendMessage={handleSendMessage}
                                 isLoading={isSending || isLoadingHistory || isAuthLoading}
                             />
                         </div>
                     </div>
                 </ResizablePanel>

                 {isSourcesPanelVisible && (
                     <>
                         <ResizableHandle withHandle className="bg-border" />
                         <ResizablePanel defaultSize={30} minSize={20} maxSize={50}>
                             <RetrievedDocumentsPanel
                                 documents={retrievedDocs}
                                 isLoading={isSending}
                             />
                         </ResizablePanel>
                     </>
                 )}
             </ResizablePanelGroup>
        </div>
    );
}