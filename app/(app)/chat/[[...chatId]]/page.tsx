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

const welcomeMessage: Message = { /* ... */ };

export default function ChatPage() {
  const params = useParams();
  const router = useRouter();
  // --- CORRECCIÓN: Usar session o user en lugar de token ---
  const { session, user, isLoading: isAuthLoading, signOut } = useAuth(); // Obtener sesión, usuario y estado de carga de auth
  // -----------------------------------------------------
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

  // Load chat history
  useEffect(() => {
    const isAuthenticated = session || bypassAuth; // Usuario autenticado si hay sesión o si estamos en bypass

    // Esperar a que la autenticación termine de cargar si no estamos en bypass
    if (!bypassAuth && isAuthLoading) {
        console.log("ChatPage: Waiting for auth to load...");
        setIsLoadingHistory(true); // Mostrar carga mientras auth verifica
        return;
    }

    if (isAuthenticated && chatId && fetchedChatIdRef.current !== chatId) {
      console.log(`ChatPage: Auth loaded. Fetching history for chat ID: ${chatId}`);
      setIsLoadingHistory(true);
      setHistoryError(null);
      fetchedChatIdRef.current = chatId;

      getChatMessages(chatId)
        .then(apiMessages => {
           apiMessages.sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime());
           const mappedMessages = apiMessages.map(mapApiMessageToFrontend);
           setMessages(mappedMessages.length > 0 ? mappedMessages : [welcomeMessage]);
           console.log(`ChatPage: Loaded ${mappedMessages.length} messages for chat ${chatId}.`);
        })
        .catch(error => {
          console.error(`ChatPage: Failed to load chat history for ${chatId}:`, error);
          let message = "Error loading chat history.";
          if (error instanceof ApiError) {
              message = error.message || message;
              if (error.status === 404) {
                  message = "Chat not found or you don't have access.";
                  toast.error("Chat Not Found", { description: message });
                  router.replace('/chat'); return;
              } else if (error.status === 401) {
                   message = "Authentication error. Please log in again.";
                   signOut(); // Forzar logout si la API devuelve 401
                   // La redirección ocurrirá en el layout
              }
          } else if (error instanceof Error) { message = error.message; }
          setHistoryError(message);
          setMessages([welcomeMessage]);
          toast.error("Failed to Load Chat", { description: message });
        })
        .finally(() => { setIsLoadingHistory(false); });

    } else if (!chatId) {
      // Nueva página de chat
      console.log("ChatPage: No chatId, preparing for new chat.");
      setMessages([welcomeMessage]);
      setRetrievedDocs([]);
      setIsLoadingHistory(false); // No hay historial que cargar
      setHistoryError(null);
      fetchedChatIdRef.current = undefined;
    } else if (!isAuthenticated && !isAuthLoading) {
         // Si terminó de cargar auth y no está autenticado (y no bypass)
         console.log("ChatPage: User not authenticated, cannot load history.");
         setIsLoadingHistory(false);
         setHistoryError("Please log in to view chat history.");
         setMessages([welcomeMessage]);
         fetchedChatIdRef.current = undefined;
         // La redirección a login debería ocurrir en AppLayout
    }

  // --- CORRECCIÓN: Dependencias actualizadas ---
  }, [chatId, session, isAuthLoading, bypassAuth, router, signOut]);
  // -----------------------------------------

  // Scroll to bottom
  useEffect(() => { /* ... (sin cambios) ... */ }, [messages, isSending, isLoadingHistory]);

  // Send message
  const handleSendMessage = useCallback(async (query: string) => {
    const isAuthenticated = session || bypassAuth; // Verificar auth al enviar
    if (!query.trim() || isSending || !isAuthenticated) {
        if (!isAuthenticated) toast.error("Authentication Error", { description: "Please log in to send messages." });
        return;
    }

    const userMessage: Message = { id: `client-user-${Date.now()}`, role: 'user', content: query, created_at: new Date().toISOString() };
    setMessages(prev => [...prev, userMessage]);
    setIsSending(true);
    setRetrievedDocs([]);
    const currentChatIdForApi = chatId || null;

    try {
      console.log(`ChatPage: Sending query to chat ID: ${currentChatIdForApi}`);
      const response = await postQuery({ query, chat_id: currentChatIdForApi });
      console.log("ChatPage: Received response:", response);
      const returnedChatId = response.chat_id;

      const assistantMessage: Message = {
        id: `client-assistant-${Date.now()}`, role: 'assistant', content: response.answer,
        sources: mapApiSourcesToFrontend(response.retrieved_documents),
        created_at: new Date().toISOString()
      };
      setMessages(prev => [...prev, assistantMessage]);
      setRetrievedDocs(mapApiSourcesToFrontend(response.retrieved_documents) || []);

      // Actualizar URL si es chat nuevo
      if (!currentChatIdForApi && returnedChatId) {
        console.log(`ChatPage: New chat created: ${returnedChatId}. Updating URL.`);
        setChatId(returnedChatId);
        fetchedChatIdRef.current = returnedChatId;
        router.replace(`/chat/${returnedChatId}`, { scroll: false });
      } // ... (manejo de cambio inesperado de ID) ...

      if (response.retrieved_documents?.length && !isPanelOpen) setIsPanelOpen(true);

    } catch (error) {
      console.error("ChatPage: Query failed:", error);
      let errorMessage = "Sorry, I encountered an error trying to answer.";
       if (error instanceof ApiError) {
           errorMessage = error.message || `API Error (${error.status})`;
           if (error.status === 401) {
                errorMessage = "Authentication error. Session may be invalid.";
                signOut(); // Forzar logout
           }
       } else if (error instanceof Error) { errorMessage = `Error: ${error.message}`; }

      const errorMessageObj: Message = { id: `error-${Date.now()}`, role: 'assistant', content: errorMessage, isError: true, created_at: new Date().toISOString() };
      setMessages(prev => [...prev, errorMessageObj]);
      toast.error("Query Failed", { description: errorMessage });
    } finally {
      setIsSending(false);
    }
  // --- CORRECCIÓN: Dependencias actualizadas ---
  }, [isSending, chatId, router, session, bypassAuth, isPanelOpen, signOut]);
  // ------------------------------------------

  const handlePanelToggle = () => { setIsPanelOpen(!isPanelOpen); };

  // --- Render Functions (sin cambios internos) ---
  const renderHistoryLoading = () => ( /* ... */ );
  const renderHistoryError = () => ( /* ... */ );
  const renderWelcomeOrMessages = () => { /* ... */ };
  // -------------------------------------------

  // --- Render Principal ---
  // Mostrar carga si la autenticación o el historial están cargando
  const showLoading = (isLoadingHistory || (isAuthLoading && !bypassAuth));

  return (
     <ResizablePanelGroup direction="horizontal" className="h-full max-h-[calc(100vh-theme(space.16))]">
            <ResizablePanel defaultSize={isPanelOpen ? 70 : 100} minSize={50}>
                <div className="flex h-full flex-col relative">
                    <div className="absolute top-2 right-2 z-10">
                        <Button onClick={handlePanelToggle} variant="ghost" size="icon" aria-label={isPanelOpen ? 'Close Sources Panel' : 'Open Sources Panel'}>
                            {isPanelOpen ? <PanelRightClose className="h-5 w-5" /> : <PanelRightOpen className="h-5 w-5" />}
                        </Button>
                    </div>
                    <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
                         {showLoading ? ( // Usar el flag combinado de carga
                            renderHistoryLoading()
                         ) : historyError ? (
                             renderHistoryError()
                         ) : (
                            <div className="space-y-4 pr-4">
                                {renderWelcomeOrMessages()}
                                {isSending && ( /* Skeleton de envío */ )}
                            </div>
                         )}
                    </ScrollArea>
                    <div className="border-t p-4 bg-muted/30">
                        {/* Deshabilitar input si está cargando auth o enviando */}
                        <ChatInput onSendMessage={handleSendMessage} isLoading={isSending || showLoading} />
                    </div>
                </div>
            </ResizablePanel>
            {isPanelOpen && (
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