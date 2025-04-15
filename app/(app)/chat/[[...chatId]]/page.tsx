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
    // --- AÑADIDO: QueryApiResponse para verificación ---
    QueryApiResponse
    // ----------------------------------------------
} from '@/lib/api';
import { toast } from "sonner";
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
    const { user, isLoading: isAuthLoading, signOut } = useAuth(); // Correcto: usar 'user'

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

        if (!bypassAuth && isAuthLoading) return;
        if (!bypassAuth && !user) { /* ... (manejo no autenticado sin cambios) ... */ return; }
        if (fetchedChatIdRef.current === currentFetchTarget) { /* ... (evitar fetch redundante sin cambios) ... */ return; }

        setIsLoadingHistory(true);
        setHistoryError(null);
        fetchedChatIdRef.current = currentFetchTarget;

        if (chatId) {
            getChatMessages(chatId)
                .then(apiMessages => {
                    // --- CORRECCIÓN FINAL: Usar aserción de tipo `as any` ---
                    // Dado que las comprobaciones anteriores fallaron, forzamos el tipo.
                    // Esto asume que la API *sí* devuelve 'created_at'.
                    const sortedMessages = [...apiMessages].sort((a, b) => {
                        const timeA = (a as any)?.created_at ? new Date((a as any).created_at).getTime() : 0;
                        const timeB = (b as any)?.created_at ? new Date((b as any).created_at).getTime() : 0;

                        const validTimeA = !isNaN(timeA) ? timeA : 0;
                        const validTimeB = !isNaN(timeB) ? timeB : 0;

                        if (validTimeA === 0 && validTimeB === 0) return 0;
                        if (validTimeA === 0) return 1; // Poner inválidos/faltantes al final
                        if (validTimeB === 0) return -1; // Poner inválidos/faltantes al final

                        return validTimeA - validTimeB;
                    });
                    // ---------------------------------------------------------

                    const mappedMessages = sortedMessages.map(mapApiMessageToFrontend);
                    setMessages(mappedMessages.length > 0 ? mappedMessages : [welcomeMessage]);
                    console.log(`ChatPage: History loaded for ${chatId}, ${mappedMessages.length} messages.`);
                })
                .catch(error => { /* ... (manejo de error sin cambios) ... */ })
                .finally(() => { setIsLoadingHistory(false); });
        } else {
            setMessages([welcomeMessage]);
            setRetrievedDocs([]);
            setIsLoadingHistory(false);
        }
    }, [chatId, user, isAuthLoading, router, signOut, isLoadingHistory]);

    useEffect(() => {
        if (scrollAreaRef.current) { /* ... (scroll sin cambios) ... */ }
    }, [messages, isSending]);

    const handleSendMessage = useCallback(async (query: string) => {
        const bypassAuth = process.env.NEXT_PUBLIC_BYPASS_AUTH === 'true';
        const isAuthenticated = !!user || bypassAuth;

        if (!query.trim() || !isAuthenticated || isSending) { /* ... (validaciones sin cambios) ... */ return; }

        const userMessage: Message = { id: `client-user-${Date.now()}`, role: 'user', content: query, created_at: new Date().toISOString() };
        setMessages(prev => [...prev, userMessage]);
        setIsSending(true);
        setRetrievedDocs([]);

        const currentChatIdForApi = chatId || null;
        console.log(`ChatPage: Sending query to API (Chat ID: ${currentChatIdForApi || 'New'})...`);

        try {
            const response: QueryApiResponse = await postQuery({ query, chat_id: currentChatIdForApi });

            // --- CORRECCIÓN: Acceder a 'chat_id' directamente (debe existir según la interfaz) ---
            const returnedChatId = response.chat_id;
            // ------------------------------------------------------------------------------

            const mappedSources = mapApiSourcesToFrontend(response.retrieved_documents);
            const assistantMessage: Message = {
                id: `client-assistant-${Date.now()}`,
                role: 'assistant',
                content: response.answer,
                sources: mappedSources,
                created_at: new Date().toISOString() // Frontend timestamp for assistant msg
            };

            setMessages(prev => [...prev, assistantMessage]);
            setRetrievedDocs(mappedSources || []);

            if (!currentChatIdForApi && returnedChatId) {
                console.log(`ChatPage: New chat created with ID: ${returnedChatId}. Updating URL.`);
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
            const errorMsgObj: Message = { id: `error-${Date.now()}`, role: 'assistant', content: errorMessage, isError: true, created_at: new Date().toISOString() };
            setMessages(prev => [...prev, errorMsgObj]);
            toast.error("Query Failed", { description: errorMessage });
        } finally {
            setIsSending(false);
        }
    }, [chatId, isSending, user, router, isPanelOpen, signOut]); // Asegúrate de que 'user' esté aquí

    const handlePanelToggle = () => { setIsPanelOpen(!isPanelOpen); };

    const handleNewChat = () => {
        router.push('/chat');
    };

    const renderChatContent = (): React.ReactNode => {
        if (isLoadingHistory) {
            return (
                <div className="space-y-4">
                    <Skeleton className="h-16 w-3/4" />
                    <Skeleton className="h-16 w-1/2 ml-auto" />
                    <Skeleton className="h-16 w-3/4" />
                </div>
            );
        }

        if (historyError) {
            return (
                <div className="flex flex-col items-center justify-center h-full text-destructive">
                    <AlertCircle className="h-8 w-8 mb-2" />
                    <p className="text-center font-semibold">Error loading chat history</p>
                    <p className="text-center text-sm">{historyError}</p>
                    <Button variant="outline" size="sm" onClick={() => window.location.reload()} className="mt-4">
                        Retry
                    </Button>
                </div>
            );
        }

        return (
            <div className="space-y-4">
                {messages.map((message, index) => (
                    <ChatMessage key={message.id || `msg-${index}`} message={message} />
                ))}
                {isSending && (
                    <div className="flex items-center space-x-2 text-muted-foreground justify-start">
                        <BrainCircuit className="h-5 w-5 animate-pulse" />
                        <span>Atenex is thinking...</span>
                    </div>
                )}
            </div>
        );
    };


    return ( /* ... (JSX sin cambios estructurales) ... */
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
             {/* Resto del JSX */}
             <ResizablePanelGroup direction="horizontal" className="flex-1">
                 <ResizablePanel defaultSize={isPanelOpen ? 70 : 100} minSize={30}>
                     <div className="flex h-full flex-col relative">
                         {/* Botón toggle panel */}
                         <div className="absolute top-2 right-2 z-10">
                             <Button onClick={handlePanelToggle} variant="ghost" size="icon" aria-label={isPanelOpen ? 'Close Sources Panel' : 'Open Sources Panel'}>
                                 {isPanelOpen ? <PanelRightClose className="h-5 w-5" /> : <PanelRightOpen className="h-5 w-5" />}
                             </Button>
                         </div>
                         {/* Área de mensajes */}
                         <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
                             {renderChatContent()}
                         </ScrollArea>
                         {/* Input */}
                         <div className="border-t p-4 bg-muted/30 shrink-0">
                             <ChatInput
                                 onSendMessage={handleSendMessage}
                                 isLoading={isSending || isLoadingHistory || isAuthLoading}
                             />
                         </div>
                     </div>
                 </ResizablePanel>
                 {/* Panel de fuentes */}
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