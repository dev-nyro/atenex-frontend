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
    // --- AÑADIDO: Importar ChatMessageApi explícitamente ---
    ChatMessageApi,
    // ------------------------------------------------------
} from '@/lib/api'; // Use functions from centralized API module
import { toast } from "sonner"; // Use sonner for notifications
import { PanelRightClose, PanelRightOpen, BrainCircuit, Loader2, AlertCircle, PlusCircle } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { useAuth } from '@/lib/hooks/useAuth';

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
    const [isPanelOpen, setIsPanelOpen] = useState(true);

    const scrollAreaRef = useRef<HTMLDivElement>(null);
    const fetchedChatIdRef = useRef<string | 'welcome' | undefined>(undefined);

    useEffect(() => {
        setChatId(chatIdParam);
    }, [chatIdParam]);

    useEffect(() => {
        const bypassAuth = process.env.NEXT_PUBLIC_BYPASS_AUTH === 'true';
        const currentFetchTarget = chatId || 'welcome';

        if (!bypassAuth && isAuthLoading) {
            return;
        }
        if (!bypassAuth && !user) {
            setMessages([welcomeMessage]);
            setHistoryError("Please log in to view or start chats.");
            fetchedChatIdRef.current = undefined;
            setIsLoadingHistory(false);
            return;
        }
        if (fetchedChatIdRef.current === currentFetchTarget) {
             if (isLoadingHistory) setIsLoadingHistory(false);
             return;
        }

        setIsLoadingHistory(true);
        setHistoryError(null);
        fetchedChatIdRef.current = currentFetchTarget;

        if (chatId) {
            getChatMessages(chatId)
                .then(apiMessages => {
                    // --- CORRECCIÓN: Ordenación más segura y con tipo explícito ---
                    // TypeScript parece tener problemas infiriendo el tipo aquí,
                    // así que lo especificamos y añadimos fallbacks.
                    const sortedMessages = [...apiMessages].sort((a: ChatMessageApi, b: ChatMessageApi) => {
                        // Usar 0 como fallback si created_at falta o es inválido
                        const timeA = a.created_at ? new Date(a.created_at).getTime() : 0;
                        const timeB = b.created_at ? new Date(b.created_at).getTime() : 0;

                        // Validar que getTime() no devuelva NaN
                        const validTimeA = !isNaN(timeA) ? timeA : 0;
                        const validTimeB = !isNaN(timeB) ? timeB : 0;

                        // Si ambos tiempos son inválidos (0), mantener orden original relativo
                        if (validTimeA === 0 && validTimeB === 0) return 0;
                        // Si solo A es inválido, ponerlo después
                        if (validTimeA === 0) return 1;
                        // Si solo B es inválido, ponerlo después
                        if (validTimeB === 0) return -1;

                        return validTimeA - validTimeB;
                    });
                    // -----------------------------------------------------------

                    const mappedMessages = sortedMessages.map(mapApiMessageToFrontend);
                    setMessages(mappedMessages.length > 0 ? mappedMessages : [welcomeMessage]);
                    console.log(`ChatPage: History loaded for ${chatId}, ${mappedMessages.length} messages.`);
                })
                .catch(error => {
                    console.error(`ChatPage: Error loading history for ${chatId}:`, error);
                    let message = "Error loading chat history.";
                    if (error instanceof ApiError) {
                        message = error.message || message;
                        if (error.status === 404) {
                            toast.error("Chat Not Found", { description: `Chat ${chatId} not found. Starting a new chat.` });
                            router.replace('/chat');
                            return;
                        }
                        if (error.status === 401 || error.status === 403) {
                            toast.error("Authentication Error", { description: "Session expired. Please log in again." });
                            signOut();
                        }
                    } else if (error instanceof Error) { message = error.message; }
                    setHistoryError(message);
                    setMessages([welcomeMessage]);
                    toast.error("Failed to Load Chat", { description: message });
                })
                .finally(() => {
                    setIsLoadingHistory(false);
                });
        } else {
            setMessages([welcomeMessage]);
            setRetrievedDocs([]);
            setIsLoadingHistory(false);
        }
    }, [chatId, user, isAuthLoading, router, signOut, isLoadingHistory]);

    useEffect(() => {
        if (scrollAreaRef.current) {
            const scrollElement = scrollAreaRef.current;
            requestAnimationFrame(() => {
                 const isScrolledUp = scrollElement.scrollHeight - scrollElement.scrollTop - scrollElement.clientHeight > 100;
                 if (!isScrolledUp) {
                    scrollElement.scrollTo({ top: scrollElement.scrollHeight, behavior: 'smooth' });
                 }
            });
        }
    }, [messages, isSending]);

    const handleSendMessage = useCallback(async (query: string) => {
        const bypassAuth = process.env.NEXT_PUBLIC_BYPASS_AUTH === 'true';
        const isAuthenticated = !!user || bypassAuth;

        if (!query.trim()) {
            toast.warning("Cannot send empty message.");
            return;
        }
        if (isSending) {
            toast.warning("Please wait for the previous response.", { id: 'sending-throttle'});
            return;
        }
         if (!isAuthenticated) {
             toast.error("Authentication Error", { description: "Please log in to send messages." });
             return;
         }

        const userMessage: Message = {
            id: `client-user-${Date.now()}`,
            role: 'user',
            content: query,
            created_at: new Date().toISOString()
        };
        setMessages(prev => [...prev, userMessage]);
        setIsSending(true);
        setRetrievedDocs([]);

        const currentChatIdForApi = chatId || null;

        console.log(`ChatPage: Sending query to API (Chat ID: ${currentChatIdForApi || 'New'})...`);

        try {
            const response = await postQuery({ query, chat_id: currentChatIdForApi });
            const returnedChatId = response.chat_id;

            const mappedSources = mapApiSourcesToFrontend(response.retrieved_documents);
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
                setChatId(returnedChatId);
                fetchedChatIdRef.current = returnedChatId;
                router.replace(`/chat/${returnedChatId}`, { scroll: false });
            }

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
                     signOut();
                 }
             } else if (error instanceof Error) {
                 errorMessage = `Error: ${error.message}`;
             }

            const errorMsgObj: Message = {
                id: `error-${Date.now()}`,
                role: 'assistant',
                content: errorMessage,
                isError: true,
                created_at: new Date().toISOString()
            };
            setMessages(prev => [...prev, errorMsgObj]);
            toast.error("Query Failed", { description: errorMessage });

        } finally {
            setIsSending(false);
        }
    }, [chatId, isSending, user, router, isPanelOpen, signOut]);

    const handlePanelToggle = () => { setIsPanelOpen(!isPanelOpen); };

    const handleNewChat = () => {
        if (pathname !== '/chat') {
             router.push('/chat');
        } else {
            setChatId(undefined);
            setMessages([welcomeMessage]);
            setRetrievedDocs([]);
            setHistoryError(null);
            fetchedChatIdRef.current = 'welcome';
            setIsLoadingHistory(false);
        }
    };

    const renderChatContent = () => {
        if (isAuthLoading || isLoadingHistory) {
            return (
                <div className="flex flex-col items-center justify-center h-full p-8 text-center">
                    <Loader2 className="h-8 w-8 animate-spin text-muted-foreground mb-4" />
                    <p className="text-muted-foreground">
                         {isAuthLoading ? "Authenticating..." : "Loading chat history..."}
                    </p>
                </div>
            );
        }

        if (historyError) {
             return (
                 <div className="flex flex-col items-center justify-center h-full p-8 text-center">
                     <AlertCircle className="h-8 w-8 text-destructive mb-4" />
                     <p className="text-destructive font-medium mb-2">Error Loading Chat</p>
                     <p className="text-sm text-muted-foreground mb-4">{historyError}</p>
                 </div>
             );
         }

        const messagesToRender = messages.filter(m => !(m.id === 'initial-welcome' && messages.length > 1));
        return (
             <div className="space-y-4 pr-4 pb-4">
                 {messagesToRender.map((message) => (
                     <ChatMessage key={message.id} message={message} />
                 ))}
                 {isSending && (
                     <div className="flex items-start space-x-3">
                         <Skeleton className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                             <BrainCircuit className="h-5 w-5 text-primary"/>
                         </Skeleton>
                         <div className="space-y-2 flex-1 pt-1">
                              <Skeleton className="h-4 w-16" />
                         </div>
                     </div>
                 )}
             </div>
        );
    };

    return (
        <div className="flex flex-col h-full">
            <div className="absolute top-2 left-2 z-10">
                 <Button
                    variant="outline"
                    size="sm"
                    onClick={handleNewChat}
                    disabled={isSending || isLoadingHistory || isAuthLoading}
                    title="Start a new chat"
                 >
                     <PlusCircle className="h-4 w-4 mr-2" />
                     New Chat
                 </Button>
             </div>

            <ResizablePanelGroup direction="horizontal" className="flex-1">
                <ResizablePanel defaultSize={isPanelOpen ? 70 : 100} minSize={30}>
                    <div className="flex h-full flex-col relative">
                        <div className="absolute top-2 right-2 z-10">
                            <Button onClick={handlePanelToggle} variant="ghost" size="icon" aria-label={isPanelOpen ? 'Close Sources Panel' : 'Open Sources Panel'}>
                                {isPanelOpen ? <PanelRightClose className="h-5 w-5" /> : <PanelRightOpen className="h-5 w-5" />}
                            </Button>
                        </div>
                        <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
                            {renderChatContent()}
                        </ScrollArea>
                        <div className="border-t p-4 bg-muted/30 shrink-0">
                            <ChatInput
                                onSendMessage={handleSendMessage}
                                isLoading={isSending || isLoadingHistory || isAuthLoading}
                            />
                        </div>
                    </div>
                </ResizablePanel>
                {isPanelOpen && (
                    <>
                        <ResizableHandle withHandle />
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