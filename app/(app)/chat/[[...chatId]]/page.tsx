// File: app/(app)/chat/[[...chatId]]/page.tsx
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
import { PanelRightClose, PanelRightOpen, AlertCircle, RefreshCw } from 'lucide-react'; 
import { Skeleton } from '@/components/ui/skeleton';
import SnakeAnimation from '@/components/animations/snakeanimation';
import { useAuth } from '@/lib/hooks/useAuth';
import { cn, isGreeting, isMetaQuery, getMetaResponse } from '@/lib/utils';

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
    const lastDocsRef = useRef<RetrievedDoc[]>([]);
    const [isSending, setIsSending] = useState(false);
    const [isLoadingHistory, setIsLoadingHistory] = useState(false);
    const [historyError, setHistoryError] = useState<string | null>(null);
    const [isSourcesPanelVisible, setIsSourcesPanelVisible] = useState(false);

    const scrollAreaRef = useRef<any>(null); 
    const fetchedChatIdRef = useRef<string | 'welcome' | undefined>(undefined);

    useEffect(() => { if (chatIdParam !== chatId) { setChatId(chatIdParam); fetchedChatIdRef.current = undefined; } }, [chatIdParam, chatId]);
    
    useEffect(() => {
        const bypassAuth = process.env.NEXT_PUBLIC_BYPASS_AUTH === 'true';
        const currentFetchTarget = chatId || 'welcome';

        if (!bypassAuth && isAuthLoading) { setIsLoadingHistory(true); setMessages([]); return; }
        if (!bypassAuth && !user) { setMessages([welcomeMessage]); setIsLoadingHistory(false); fetchedChatIdRef.current = 'welcome'; return; }
        if (fetchedChatIdRef.current === currentFetchTarget && !isLoadingHistory) return;
        
        setIsLoadingHistory(true); setHistoryError(null); setMessages([]);
        fetchedChatIdRef.current = currentFetchTarget;

        if (chatId) {
            getChatMessages(chatId)
                .then((apiMessages: ChatMessageApi[]) => {
                    const sortedMessages = [...apiMessages].sort((a, b) => (new Date(a.created_at || 0)).getTime() - (new Date(b.created_at || 0)).getTime());
                    const mappedMessages = sortedMessages.map(mapApiMessageToFrontend);
                    let lastWithDocs: RetrievedDoc[] = [];
                    for (let i = sortedMessages.length - 1; i >= 0; i--) { if (sortedMessages[i].sources?.length) { lastWithDocs = mapApiSourcesToFrontend(sortedMessages[i].sources) || []; break; } }
                    setRetrievedDocs(lastWithDocs); lastDocsRef.current = lastWithDocs;
                    setMessages(mappedMessages.length > 0 ? mappedMessages : [welcomeMessage]);
                    if (lastWithDocs.length > 0 && !isSourcesPanelVisible) { setIsSourcesPanelVisible(true); }
                })
                .catch(error => { setHistoryError("Fallo al cargar el historial."); setMessages([welcomeMessage]); fetchedChatIdRef.current = undefined; })
                .finally(() => setIsLoadingHistory(false));
        } else { 
            setMessages([welcomeMessage]); setRetrievedDocs([]); setIsLoadingHistory(false); 
            setIsSourcesPanelVisible(false); 
            fetchedChatIdRef.current = 'welcome'; 
        }
    }, [chatId, user, isAuthLoading, isSourcesPanelVisible]); 
    
    // Scroll to bottom on send and receive
    useEffect(() => {
        if (!isLoadingHistory && messages.length > 0) {
            let scrollTarget = null;
            // Try to get the Radix ScrollArea viewport
            if (scrollAreaRef.current) {
                // Radix exposes the viewport as a child node with data-slot="scroll-area-viewport"
                if (scrollAreaRef.current.querySelector) {
                    scrollTarget = scrollAreaRef.current.querySelector('[data-slot="scroll-area-viewport"]');
                }
                // fallback: try ref itself
                if (!scrollTarget && scrollAreaRef.current.scrollTo) {
                    scrollTarget = scrollAreaRef.current;
                }
            }
            if (scrollTarget && scrollTarget.scrollTo) {
                const timeoutId = setTimeout(() => {
                    scrollTarget.scrollTo({ top: scrollTarget.scrollHeight, behavior: 'smooth' });
                }, 100);
                return () => clearTimeout(timeoutId);
            }
        }
    }, [messages, isSending, isLoadingHistory]);

    const handleSendMessage = useCallback(async (query: string) => {
        const text = query.trim();
        if (!text) { toast.warning("No se puede enviar un mensaje vacío."); return; }
        const userMessage: Message = { id: `client-user-${Date.now()}`, role: 'user', content: text, created_at: new Date().toISOString() };
        setMessages(prev => prev.length === 1 && prev[0].id === 'initial-welcome' ? [userMessage] : [...prev.filter(m => m.id !== 'initial-welcome'), userMessage]);
        if (isGreeting(text)) { setMessages(prev => [...prev, { id: `assistant-greet-${Date.now()}`, role: 'assistant', content: '¡Hola! ¿En qué puedo ayudarte hoy?', created_at: new Date().toISOString() }]); return; }
        if (isMetaQuery(text)) { setMessages(prev => [...prev, { id: `assistant-meta-${Date.now()}`, role: 'assistant', content: getMetaResponse(), created_at: new Date().toISOString() }]); return; }
        
        const bypassAuth = process.env.NEXT_PUBLIC_BYPASS_AUTH === 'true'; const isAuthenticated = !!user || bypassAuth;
        if (!isAuthenticated) { toast.error("No Autenticado", { description: "Por favor, inicia sesión para enviar mensajes."}); signOut(); return; }
        if (isSending) return;

        setIsSending(true); const currentChatIdForApi = chatId || null;
        try {
            const response: QueryApiResponse = await postQuery({ query: text, chat_id: currentChatIdForApi });
            const mappedSources = mapApiSourcesToFrontend(response.retrieved_documents as any);
            const assistantMessage: Message = { id: `client-assistant-${Date.now()}`, role: 'assistant', content: response.answer, sources: mappedSources, created_at: new Date().toISOString() };
            setMessages(prev => [...prev, assistantMessage]);
            setRetrievedDocs(mappedSources || []); lastDocsRef.current = mappedSources || [];
            if (!currentChatIdForApi && response.chat_id) { setChatId(response.chat_id); fetchedChatIdRef.current = response.chat_id; router.replace(`/chat/${response.chat_id}`, { scroll: false }); }
            if (mappedSources && mappedSources.length > 0 && !isSourcesPanelVisible) { setIsSourcesPanelVisible(true); }
        } catch (error) { 
            const errorMsgObj: Message = { id: `error-${Date.now()}`, role: 'assistant', content: "Error al procesar tu solicitud.", isError: true, created_at: new Date().toISOString() }; 
            setMessages(prev => [...prev, errorMsgObj]); 
            toast.error("Error", { description: error instanceof Error ? error.message : "Ocurrió un error inesperado." });
        } finally { 
            setIsSending(false); 
        }
    }, [chatId, isSending, user, router, signOut, isSourcesPanelVisible]);

    const handlePanelToggle = () => setIsSourcesPanelVisible(!isSourcesPanelVisible);
    
    const renderChatContent = (): React.ReactNode => {
        if (isLoadingHistory && messages.length <= 1) {
             return ( <div className="space-y-6 p-4"> <div className="flex items-start space-x-3"> <Skeleton className="h-8 w-8 rounded-full flex-shrink-0" /> <div className="flex-1 space-y-2"><Skeleton className="h-4 w-3/4 rounded" /><Skeleton className="h-4 w-1/2 rounded" /></div> </div> <div className="flex items-start space-x-3 justify-end"> <div className="flex-1 space-y-2 items-end flex flex-col"><Skeleton className="h-4 w-3/4 rounded" /><Skeleton className="h-4 w-1/2 rounded" /></div> <Skeleton className="h-8 w-8 rounded-full flex-shrink-0" /> </div> </div> );
        }
        if (historyError) {
            return ( <div className="flex flex-col items-center justify-center h-full text-center p-6"> <AlertCircle className="h-12 w-12 text-destructive mb-4" /> <p>{historyError}</p> <Button variant="outline" size="sm" onClick={() => window.location.reload()} className="mt-4"><RefreshCw className="mr-2 h-4 w-4" /> Reintentar</Button> </div> );
        }
        return (
          <div className="space-y-6">
            {messages.map((message) => (
              <ChatMessage key={message.id} message={message} />
            ))}
            {isSending && (
              <div className="flex w-full items-start gap-3 pr-10 sm:pr-16">
                <div className="skeleton-thinking-avatar skeleton animate-pulse flex items-center justify-center">
                  <span className="sr-only">Assistant typing</span>
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="8" fill="currentColor" className="text-primary/60" /></svg>
                </div>
                <div className="skeleton-thinking-text flex-1 pt-1.5">
                  <div className="skeleton-thinking-line skeleton animate-pulse w-32 mb-1" />
                  <div className="skeleton-thinking-line skeleton animate-pulse w-24" />
                  <div className="flex gap-1 mt-2">
                    <span className="inline-block h-2 w-2 rounded-full bg-muted-foreground/60 animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="inline-block h-2 w-2 rounded-full bg-muted-foreground/60 animate-bounce" style={{ animationDelay: '120ms' }} />
                    <span className="inline-block h-2 w-2 rounded-full bg-muted-foreground/60 animate-bounce" style={{ animationDelay: '240ms' }} />
                  </div>
                </div>
              </div>
            )}
          </div>
        );
    };

    return (
        // El chat y el panel de fuentes ocupan toda la pantalla, cada uno con su propio scroll
        <div className="flex flex-col h-screen w-full bg-background min-h-0">
            <ResizablePanelGroup direction="horizontal" className="flex-1 h-full w-full overflow-hidden min-h-0">
                <ResizablePanel defaultSize={isSourcesPanelVisible ? 65 : 100} minSize={30} maxSize={100} className="h-full min-h-0">
                    <div className="flex h-full flex-col relative overflow-hidden min-h-0">
                        <div className="absolute top-1 right-1 z-20">
                            <Button onClick={handlePanelToggle} variant="ghost" size="icon" className="h-8 w-8 rounded-full text-muted-foreground hover:text-foreground hover:bg-accent/50 data-[state=open]:bg-accent data-[state=open]:text-accent-foreground" data-state={isSourcesPanelVisible ? "open" : "closed"} aria-label={isSourcesPanelVisible ? 'Cerrar Panel de Fuentes' : 'Abrir Panel de Fuentes'}>
                                {isSourcesPanelVisible ? <PanelRightClose className="h-5 w-5" /> : <PanelRightOpen className="h-5 w-5" />}
                            </Button>
                        </div>
                        {/* Chat window con su propio scroll */}
                        <div className="flex flex-col flex-1 min-h-0 h-0 relative">
                            <ScrollArea className="flex-1 min-h-0 h-0 w-full" ref={scrollAreaRef}>
                                <div className="px-3 py-4 sm:px-4 sm:py-5 min-h-full">{/* Padding interno para mensajes */}
                                    {renderChatContent()}
                                </div>
                            </ScrollArea>
                            <div className="border-t border-border/60 px-3 py-3 sm:px-4 sm:py-4 bg-background/95 backdrop-blur-sm shadow-sm shrink-0 z-10 relative">
                                <ChatInput onSendMessage={handleSendMessage} isLoading={isSending || isAuthLoading || isLoadingHistory} />
                            </div>
                        </div>
                    </div>
                </ResizablePanel>
                {isSourcesPanelVisible && (
                    <>
                        <ResizableHandle withHandle />
                        {/* Panel de fuentes relevante con scroll propio */}
                        <ResizablePanel defaultSize={35} minSize={20} maxSize={45} className="h-full overflow-hidden">
                            <div className="flex flex-col h-full">
                                <ScrollArea className="flex-1 h-full w-full">
                                    <RetrievedDocumentsPanel documents={retrievedDocs.length > 0 ? retrievedDocs : lastDocsRef.current} isLoading={isSending} />
                                </ScrollArea>
                            </div>
                        </ResizablePanel>
                    </>
                )}
            </ResizablePanelGroup>
        </div>
    );
}