// File: app/(app)/chat/[[...chatId]]/page.tsx
"use client";

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ChatInput } from '@/components/chat/chat-input';
import { ChatMessage, Message } from '@/components/chat/chat-message';
import { RetrievedDocumentsPanel } from '@/components/chat/retrieved-documents-panel';
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import {
    postQuery,
    getChatMessages,
    RetrievedDoc,
    ApiError,
    mapApiMessageToFrontend,
    mapApiSourcesToFrontend
} from '@/lib/api';
import { toast } from "sonner";
import { PanelRightClose, PanelRightOpen, BrainCircuit, Loader2, AlertCircle } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { useAuth } from '@/lib/hooks/useAuth'; // Import useAuth

// Mensaje inicial
const welcomeMessage: Message = {
    id: 'initial-welcome',
    role: 'assistant',
    content: 'Hello! How can I help you query your knowledge base today?',
    created_at: new Date().toISOString(),
};

export default function ChatPage() {
  const params = useParams();
  const router = useRouter();
  // --- CORRECCIÓN: Usar session y user en lugar de token ---
  const { session, user, isLoading: isAuthLoading, signOut } = useAuth();
  // -------------------------------------------------------
  const bypassAuth = process.env.NEXT_PUBLIC_BYPASS_AUTH === 'true';

  const chatIdParam = params.chatId ? (Array.isArray(params.chatId) ? params.chatId[0] : params.chatId) : undefined;
  const [chatId, setChatId] = useState<string | undefined>(chatIdParam);
  const [messages, setMessages] = useState<Message[]>([welcomeMessage]);
  const [retrievedDocs, setRetrievedDocs] = useState<RetrievedDoc[]>([]);
  const [isSending, setIsSending] = useState(false);
  const [isLoadingHistory, setIsLoadingHistory] = useState(false);
  const [historyError, setHistoryError] = useState<string | null>(null);
  const [isPanelOpen, setIsPanelOpen] = useState(true);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const fetchedChatIdRef = useRef<string | undefined>(undefined);

  useEffect(() => { setChatId(chatIdParam); }, [chatIdParam]);

  // Cargar historial de chat
  useEffect(() => {
    const isAuthenticated = session || bypassAuth;

    if (!bypassAuth && isAuthLoading) {
        setIsLoadingHistory(true); // Mostrar carga mientras auth verifica
        return;
    }

    if (isAuthenticated && chatId && fetchedChatIdRef.current !== chatId) {
      setIsLoadingHistory(true);
      setHistoryError(null);
      fetchedChatIdRef.current = chatId;

      getChatMessages(chatId)
        .then(apiMessages => {
           apiMessages.sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime());
           const mappedMessages = apiMessages.map(mapApiMessageToFrontend);
           setMessages(mappedMessages.length > 0 ? mappedMessages : [welcomeMessage]);
        })
        .catch(error => {
          let message = "Error loading chat history.";
          if (error instanceof ApiError) {
              message = error.message || message;
              if (error.status === 404) { router.replace('/chat'); return; }
              if (error.status === 401) { signOut(); } // Forzar logout en 401
          } else if (error instanceof Error) { message = error.message; }
          setHistoryError(message); setMessages([welcomeMessage]);
          toast.error("Failed to Load Chat", { description: message });
        })
        .finally(() => { setIsLoadingHistory(false); });

    } else if (!chatId) {
      setMessages([welcomeMessage]); setRetrievedDocs([]);
      setIsLoadingHistory(false); setHistoryError(null);
      fetchedChatIdRef.current = undefined;
    } else if (!isAuthenticated && !isAuthLoading) {
         setIsLoadingHistory(false); setHistoryError("Please log in to view chat history.");
         setMessages([welcomeMessage]); fetchedChatIdRef.current = undefined;
    }
  }, [chatId, session, isAuthLoading, bypassAuth, router, signOut]);

  // Scroll al final
  useEffect(() => {
    if (scrollAreaRef.current) {
        const timer = setTimeout(() => {
             if (scrollAreaRef.current) {
                 scrollAreaRef.current.scrollTo({ top: scrollAreaRef.current.scrollHeight, behavior: 'smooth' });
             }
        }, 100);
        return () => clearTimeout(timer);
    }
  }, [messages, isSending, isLoadingHistory]);

  // Enviar mensaje
  const handleSendMessage = useCallback(async (query: string) => {
    const isAuthenticated = session || bypassAuth;
    if (!query.trim() || isSending || !isAuthenticated) {
        if (!isAuthenticated) toast.error("Authentication Error", { description: "Please log in to send messages." });
        return;
    }

    const userMessage: Message = { id: `client-user-${Date.now()}`, role: 'user', content: query, created_at: new Date().toISOString() };
    setMessages(prev => [...prev, userMessage]);
    setIsSending(true); setRetrievedDocs([]);
    const currentChatIdForApi = chatId || null;

    try {
      const response = await postQuery({ query, chat_id: currentChatIdForApi });
      const returnedChatId = response.chat_id;
      const assistantMessage: Message = {
        id: `client-assistant-${Date.now()}`, role: 'assistant', content: response.answer,
        sources: mapApiSourcesToFrontend(response.retrieved_documents),
        created_at: new Date().toISOString()
      };
      setMessages(prev => [...prev, assistantMessage]);
      setRetrievedDocs(mapApiSourcesToFrontend(response.retrieved_documents) || []);

      if (!currentChatIdForApi && returnedChatId) {
        setChatId(returnedChatId); fetchedChatIdRef.current = returnedChatId;
        router.replace(`/chat/${returnedChatId}`, { scroll: false });
      }
      if (response.retrieved_documents?.length && !isPanelOpen) setIsPanelOpen(true);

    } catch (error) {
      let errorMessage = "Sorry, I encountered an error trying to answer.";
       if (error instanceof ApiError) {
           errorMessage = error.message || `API Error (${error.status})`;
           if (error.status === 401) { errorMessage = "Authentication error."; signOut(); }
       } else if (error instanceof Error) { errorMessage = `Error: ${error.message}`; }
      const errorMsgObj: Message = { id: `error-${Date.now()}`, role: 'assistant', content: errorMessage, isError: true, created_at: new Date().toISOString() };
      setMessages(prev => [...prev, errorMsgObj]);
      toast.error("Query Failed", { description: errorMessage });
    } finally {
      setIsSending(false);
    }
  }, [isSending, chatId, router, session, bypassAuth, isPanelOpen, signOut]);

  const handlePanelToggle = () => { setIsPanelOpen(!isPanelOpen); };

  // --- CORRECCIÓN: Restaurar implementación de funciones de renderizado ---
  const renderHistoryLoading = () => (
       <div className="flex flex-col items-center justify-center h-full p-8 text-center">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground mb-4" />
            <p className="text-muted-foreground">Loading chat history...</p>
        </div>
  );

  const renderHistoryError = () => (
      <div className="flex flex-col items-center justify-center h-full p-8 text-center">
          <AlertCircle className="h-8 w-8 text-destructive mb-4" />
          <p className="text-destructive font-medium mb-2">Error Loading History</p>
          <p className="text-sm text-muted-foreground mb-4">{historyError}</p>
          {/* <Button variant="outline" size="sm" onClick={retryFetchHistory}>Retry</Button> */}
      </div>
  );

  const renderWelcomeOrMessages = () => {
      // Renderizar mensajes existentes o el mensaje de bienvenida si es apropiado
      if (messages.length === 0 || (messages.length === 1 && messages[0].id === 'initial-welcome' && !chatId)) {
          return <ChatMessage key={welcomeMessage.id} message={welcomeMessage} />;
      }
      return messages.map((message) => (
          <ChatMessage key={message.id} message={message} />
      ));
  };
  // --- FIN CORRECCIÓN ---

  const showLoading = (isLoadingHistory || (isAuthLoading && !bypassAuth));

  return (
     <ResizablePanelGroup direction="horizontal" className="h-full max-h-[calc(100vh-theme(space.16))]">
            <ResizablePanel defaultSize={isPanelOpen ? 70 : 100} minSize={50}>
                <div className="flex h-full flex-col relative">
                    <div className="absolute top-2 right-2 z-10"> {/* Panel Toggle Button */}
                        <Button onClick={handlePanelToggle} variant="ghost" size="icon" aria-label={isPanelOpen ? 'Close Sources Panel' : 'Open Sources Panel'}>
                            {isPanelOpen ? <PanelRightClose className="h-5 w-5" /> : <PanelRightOpen className="h-5 w-5" />}
                        </Button>
                    </div>
                    <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}> {/* Chat Messages Area */}
                         {showLoading ? (
                            renderHistoryLoading() // Mostrar carga
                         ) : historyError ? (
                             renderHistoryError() // Mostrar error
                         ) : (
                            <div className="space-y-4 pr-4">
                                {renderWelcomeOrMessages()} {/* Mostrar mensajes */}
                                {isSending && ( // Skeleton de envío
                                    <div className="flex items-start space-x-3">
                                        <Skeleton className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center"><BrainCircuit className="h-5 w-5 text-primary"/></Skeleton>
                                        <div className="space-y-2 flex-1 pt-1"><Skeleton className="h-4 w-16" /></div>
                                    </div>
                                )}
                            </div>
                         )}
                    </ScrollArea>
                    <div className="border-t p-4 bg-muted/30"> {/* Input Area */}
                        <ChatInput onSendMessage={handleSendMessage} isLoading={isSending || showLoading} />
                    </div>
                </div>
            </ResizablePanel>
            {isPanelOpen && ( /* Retrieved Documents Panel */
                <>
                    <ResizableHandle withHandle />
                    <ResizablePanel defaultSize={30} minSize={20} maxSize={40}>
                        <RetrievedDocumentsPanel documents={retrievedDocs} isLoading={isSending} />
                    </ResizablePanel>
                </>
            )}
        </ResizablePanelGroup>
  );
}