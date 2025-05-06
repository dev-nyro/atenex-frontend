// File: app/(app)/chat/[[...chatId]]/page.tsx (CORREGIDO - Layout, Scroll, Loading Skeleton)
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
// FLAG_LLM: Cambiados los iconos por Loader2 y Skeleton para el estado "pensando"
import { PanelRightClose, PanelRightOpen, AlertCircle, RefreshCw, BrainCircuit } from 'lucide-react'; // Loader2 ya está en ChatInput
import { Skeleton } from '@/components/ui/skeleton'; // Importar Skeleton
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
    const [retrievedDocs, setRetrievedDocs] = useState<RetrievedDoc[]>([]);
    const lastDocsRef = useRef<RetrievedDoc[]>([]);
    const [isSending, setIsSending] = useState(false);
    const [isLoadingHistory, setIsLoadingHistory] = useState(false);
    const [historyError, setHistoryError] = useState<string | null>(null);
    const [isSourcesPanelVisible, setIsSourcesPanelVisible] = useState(false);

    // FLAG_LLM: Cambiado a any para evitar problemas con el tipo exacto de ScrollArea ref. Mejor sería definir un tipo adecuado.
    const scrollAreaRef = useRef<any>(null);
    const fetchedChatIdRef = useRef<string | 'welcome' | undefined>(undefined);

    // Efectos para manejar chatId y carga de historial (sin cambios funcionales relevantes a este fix)
     useEffect(() => {
        if (chatIdParam !== chatId) {
            console.log(`ChatPage: URL parameter changed. Setting chatId state to: ${chatIdParam}`);
            setChatId(chatIdParam);
            fetchedChatIdRef.current = undefined;
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
            setMessages([welcomeMessage]); setIsLoadingHistory(false);
            fetchedChatIdRef.current = 'welcome'; return;
        }
        if (fetchedChatIdRef.current === currentFetchTarget) {
            if (isLoadingHistory) setIsLoadingHistory(false); return;
        }

        setIsLoadingHistory(true); setHistoryError(null); setMessages([]);
        fetchedChatIdRef.current = currentFetchTarget;

        if (chatId) {
            getChatMessages(chatId)
                .then((apiMessages: ChatMessageApi[]) => {
                    const sortedMessages = [...apiMessages].sort((a, b) => { /* ... sort logic ... */ return (new Date(a.created_at || 0)).getTime() - (new Date(b.created_at || 0)).getTime(); });
                    const mappedMessages = sortedMessages.map(mapApiMessageToFrontend);
                    let lastWithDocs: RetrievedDoc[] = [];
                    for (let i = sortedMessages.length - 1; i >= 0; i--) { /* ... find last docs logic ... */ if (sortedMessages[i].sources?.length) { lastWithDocs = mapApiSourcesToFrontend(sortedMessages[i].sources) || []; break; } }
                    setRetrievedDocs(lastWithDocs); lastDocsRef.current = lastWithDocs;
                    setMessages(mappedMessages.length > 0 ? mappedMessages : [welcomeMessage]);
                    if (lastWithDocs.length > 0 && !isSourcesPanelVisible) setIsSourcesPanelVisible(true);
                })
                .catch(error => { /* ... error handling ... */ setHistoryError("Fallo al cargar el historial."); setMessages([welcomeMessage]); fetchedChatIdRef.current = undefined; })
                .finally(() => setIsLoadingHistory(false));
        } else {
            setMessages([welcomeMessage]); setRetrievedDocs([]); setIsLoadingHistory(false);
            setIsSourcesPanelVisible(false); fetchedChatIdRef.current = 'welcome';
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [chatId, user, isAuthLoading, router]); // Quitar isSourcesPanelVisible de dependencias si no afecta la carga

    // FLAG_LLM: Efecto de scroll con setTimeout para asegurar renderizado
    useEffect(() => {
        // Solo hacer scroll si NO se está cargando historial (para evitar saltos al inicio)
        if (scrollAreaRef.current && !isLoadingHistory) {
            const viewport = scrollAreaRef.current?.viewport as HTMLElement | null;
            if (viewport) {
                 const timeoutId = setTimeout(() => {
                    viewport.scrollTo({ top: viewport.scrollHeight, behavior: 'smooth' });
                 }, 100);
                 return () => clearTimeout(timeoutId);
            } else {
                const scrollElement = scrollAreaRef.current as HTMLElement;
                 const timeoutId = setTimeout(() => {
                     scrollElement.scrollTo({ top: scrollElement.scrollHeight, behavior: 'smooth' });
                 }, 100);
                 return () => clearTimeout(timeoutId);
            }
        }
    }, [messages, isSending, isLoadingHistory]); // Scroll depende de messages, isSending, y isLoadingHistory

    // handleSendMessage (sin cambios funcionales relevantes a este fix)
    const handleSendMessage = useCallback(async (query: string) => {
        const text = query.trim();
        if (!text) { toast.warning("No se puede enviar un mensaje vacío."); return; }
        const userMessage: Message = { id: `client-user-${Date.now()}`, role: 'user', content: text, created_at: new Date().toISOString() };
        setMessages(prev => prev.length === 1 && prev[0].id === 'initial-welcome' ? [userMessage] : [...prev.filter(m => m.id !== 'initial-welcome'), userMessage]);

        if (isGreeting(text)) { /* ... local greeting ... */ setMessages(prev => [...prev, { id: `assistant-greet-${Date.now()}`, role: 'assistant', content: '¡Hola! ¿En qué puedo ayudarte hoy?', created_at: new Date().toISOString() }]); return; }
        if (isMetaQuery(text)) { /* ... local meta query ... */ setMessages(prev => [...prev, { id: `assistant-meta-${Date.now()}`, role: 'assistant', content: getMetaResponse(), created_at: new Date().toISOString() }]); return; }

        const bypassAuth = process.env.NEXT_PUBLIC_BYPASS_AUTH === 'true'; const isAuthenticated = !!user || bypassAuth;
        if (!isAuthenticated) { /* ... auth error handling ... */ toast.error("No Autenticado", { description: "Por favor, inicia sesión para enviar mensajes."}); signOut(); return; }
        if (isSending) { console.warn("ChatPage: Envío de mensaje ya en progreso."); return; }

        setIsSending(true); // ¡¡ Inicia estado de envío !!
        const currentChatIdForApi = chatId || null;
        console.log(`ChatPage: Sending query to API (Chat ID: ${currentChatIdForApi || 'New'})...`);

        try {
            const response: QueryApiResponse = await postQuery({ query: text, chat_id: currentChatIdForApi });
            const mappedSources = mapApiSourcesToFrontend(response.retrieved_documents as any);
            const assistantMessage: Message = { id: `client-assistant-${Date.now()}`, role: 'assistant', content: response.answer, sources: mappedSources, created_at: new Date().toISOString() };
            setMessages(prev => [...prev, assistantMessage]);
            setRetrievedDocs(mappedSources || []); lastDocsRef.current = mappedSources || [];
            if (!currentChatIdForApi && response.chat_id) { /* ... handle new chat ID ... */ setChatId(response.chat_id); fetchedChatIdRef.current = response.chat_id; router.replace(`/chat/${response.chat_id}`, { scroll: false }); }
            if (mappedSources && mappedSources.length > 0) { setIsSourcesPanelVisible(true); }
        } catch (error) { /* ... error handling ... */ const errorMsgObj: Message = { id: `error-${Date.now()}`, role: 'assistant', content: "Error al procesar tu solicitud.", isError: true, created_at: new Date().toISOString() }; setMessages(prev => [...prev, errorMsgObj]); }
        finally {
            setIsSending(false); // ¡¡ Termina estado de envío !!
        }
    }, [chatId, isSending, user, router, signOut]);

    // handlePanelToggle y handleNewChat (sin cambios)
    const handlePanelToggle = () => { setIsSourcesPanelVisible(!isSourcesPanelVisible); };
    const handleNewChat = () => { if (pathname !== '/chat') { router.push('/chat'); } else { setMessages([welcomeMessage]); setRetrievedDocs([]); setChatId(undefined); setIsSourcesPanelVisible(false); fetchedChatIdRef.current = 'welcome'; } };

    // --- Renderizado del contenido del chat ---
    const renderChatContent = (): React.ReactNode => {
        // Estado de Carga Inicial
        if (isLoadingHistory && messages.length === 0) {
             return (
                 <div className="space-y-6 p-4">
                     <div className="flex items-start space-x-3"> <Skeleton className="h-8 w-8 rounded-full flex-shrink-0" /> <div className="flex-1 space-y-2"><Skeleton className="h-4 w-3/4 rounded" /><Skeleton className="h-4 w-1/2 rounded" /></div> </div>
                     <div className="flex items-start space-x-3 justify-end"> <div className="flex-1 space-y-2 items-end flex flex-col"><Skeleton className="h-4 w-3/4 rounded" /><Skeleton className="h-4 w-1/2 rounded" /></div> <Skeleton className="h-8 w-8 rounded-full flex-shrink-0" /> </div>
                 </div>
             );
        }
        // Estado de Error
        if (historyError) {
            return ( <div className="flex flex-col items-center justify-center h-full text-center p-6"> {/* ... error display ... */} <AlertCircle className="h-12 w-12 text-destructive mb-4" /> <p>{historyError}</p> <Button variant="outline" size="sm" onClick={() => window.location.reload()} className="mt-4"><RefreshCw className="mr-2 h-4 w-4" /> Reintentar</Button> </div> );
        }

        // Lista de mensajes + Indicador de carga
        return (
            // FLAG_LLM: Añadido padding inferior para que el último mensaje no quede pegado al input
            <div className="space-y-6 pb-4"> {/* Reducido padding inferior ya que el contenedor padre lo tiene */}
                {messages.map((message) => ( <ChatMessage key={message.id} message={message} /> ))}
                {/* Skeleton de "Pensando" */}
                {isSending && (
                     <div className="skeleton-thinking"> {/* Usar clases CSS */}
                         <div className="skeleton-thinking-avatar"></div>
                         <div className="skeleton-thinking-text">
                             <div className="skeleton-thinking-line skeleton-thinking-line-short"></div>
                         </div>
                    </div>
                 )}
            </div>
        );
    };

    return (
        // FLAG_LLM: Layout principal ajustado con flex
        <div className="flex flex-col h-full bg-background">
            <ResizablePanelGroup direction="horizontal" className="flex-1 overflow-hidden"> {/* Permitir que el grupo crezca */}
                {/* --- Panel Principal del Chat (Resizable) --- */}
                <ResizablePanel defaultSize={isSourcesPanelVisible ? 65 : 100} minSize={40}>
                    {/* Contenedor Flex Vertical que ocupa toda la altura del panel */}
                    <div className="flex h-full flex-col relative">
                         {/* Botón toggle para panel de fuentes (posición absoluta) */}
                         <div className="absolute top-3 right-3 z-20">
                             <Button onClick={handlePanelToggle} variant="ghost" size="icon" className="h-8 w-8 rounded-full text-muted-foreground hover:text-foreground hover:bg-accent/50 data-[state=open]:bg-accent data-[state=open]:text-accent-foreground" data-state={isSourcesPanelVisible ? "open" : "closed"} aria-label={isSourcesPanelVisible ? 'Cerrar Panel de Fuentes' : 'Abrir Panel de Fuentes'}>
                                {isSourcesPanelVisible ? <PanelRightClose className="h-5 w-5" /> : <PanelRightOpen className="h-5 w-5" />}
                             </Button>
                        </div>

                        {/* --- ScrollArea Flexible --- */}
                        {/* Ocupa el espacio restante (flex-1) y tiene padding */}
                        {/* ScrollArea necesita tener un padre con altura definida para funcionar correctamente con flex-1 */}
                        <ScrollArea className="flex-1 px-6 pt-6 pb-4" ref={scrollAreaRef}>
                             {renderChatContent()}
                        </ScrollArea>

                        {/* --- Input Fijo Abajo --- */}
                        {/* Fuera del ScrollArea, ocupa su propio espacio abajo */}
                        <div className="border-t border-border/60 p-4 bg-background/95 backdrop-blur-sm shadow-sm shrink-0">
                             <ChatInput onSendMessage={handleSendMessage} isLoading={isSending || isLoadingHistory || isAuthLoading} />
                        </div>
                    </div>
                </ResizablePanel>

                {/* --- Panel de Fuentes (Condicional) --- */}
                {isSourcesPanelVisible && (
                    <>
                        <ResizableHandle withHandle />
                        <ResizablePanel defaultSize={35} minSize={25} maxSize={50}>
                            <RetrievedDocumentsPanel documents={retrievedDocs.length > 0 ? retrievedDocs : lastDocsRef.current} isLoading={isSending} />
                        </ResizablePanel>
                    </>
                )}
            </ResizablePanelGroup>
        </div>
    );
}