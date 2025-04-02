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
    RetrievedDoc, // Usar tipo frontend
    ApiError,
    mapApiMessageToFrontend,
    mapApiSourcesToFrontend
} from '@/lib/api';
import { toast } from "sonner";
import { PanelRightClose, PanelRightOpen, BrainCircuit, Loader2, AlertCircle } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { useAuth } from '@/lib/hooks/useAuth'; // Importar hook useAuth refactorizado

// Mensaje inicial de bienvenida
const welcomeMessage: Message = {
    id: 'initial-welcome',
    role: 'assistant',
    content: 'Hello! How can I help you query your knowledge base today?',
    created_at: new Date().toISOString(), // Usar fecha actual
};

export default function ChatPage() {
  const params = useParams();
  const router = useRouter();
  // --- CORRECCIÓN: Usar session, user, isLoading, signOut del hook useAuth ---
  const { session, user, isLoading: isAuthLoading, signOut } = useAuth();
  // ---------------------------------------------------------------------
  const bypassAuth = process.env.NEXT_PUBLIC_BYPASS_AUTH === 'true';

  // Obtener chatId de los parámetros de la ruta
  const chatIdParam = params.chatId ? (Array.isArray(params.chatId) ? params.chatId[0] : params.chatId) : undefined;
  const [chatId, setChatId] = useState<string | undefined>(chatIdParam);

  // Estados del componente
  const [messages, setMessages] = useState<Message[]>([welcomeMessage]);
  const [retrievedDocs, setRetrievedDocs] = useState<RetrievedDoc[]>([]);
  const [isSending, setIsSending] = useState(false); // Enviando un nuevo mensaje
  const [isLoadingHistory, setIsLoadingHistory] = useState(false); // Cargando historial
  const [historyError, setHistoryError] = useState<string | null>(null);
  const [isPanelOpen, setIsPanelOpen] = useState(true); // Panel derecho de fuentes

  // Refs
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const fetchedChatIdRef = useRef<string | undefined>(undefined); // Para evitar fetches duplicados

  // Sincronizar chatId del estado con el parámetro de la ruta
  useEffect(() => {
    setChatId(chatIdParam);
  }, [chatIdParam]);

  // --- Efecto para Cargar Historial de Chat ---
  useEffect(() => {
    const isAuthenticated = !!session || bypassAuth; // Determinar si está autenticado

    // Si estamos esperando que la autenticación termine (y no estamos en bypass), mostrar carga
    if (!bypassAuth && isAuthLoading) {
        console.log("ChatPage: Waiting for auth state...");
        setIsLoadingHistory(true); // Reutilizar estado de carga de historial
        setMessages([welcomeMessage]); // Mostrar bienvenida mientras carga auth
        setHistoryError(null);
        fetchedChatIdRef.current = undefined; // Resetear ref
        return;
    }

    // Si está autenticado, hay un chatId, y es diferente al último que buscamos...
    if (isAuthenticated && chatId && fetchedChatIdRef.current !== chatId) {
      console.log(`ChatPage: Auth ready. Fetching history for chat ${chatId}...`);
      setIsLoadingHistory(true);
      setHistoryError(null);
      fetchedChatIdRef.current = chatId; // Marcar como buscado

      getChatMessages(chatId)
        .then(apiMessages => {
           // Ordenar mensajes por fecha (por si acaso la API no los devuelve ordenados)
           apiMessages.sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime());
           // Mapear mensajes de la API al formato del frontend
           const mappedMessages = apiMessages.map(mapApiMessageToFrontend);
           // Establecer mensajes (o bienvenida si el historial está vacío)
           setMessages(mappedMessages.length > 0 ? mappedMessages : [welcomeMessage]);
           console.log(`ChatPage: History loaded for ${chatId}, ${mappedMessages.length} messages.`);
        })
        .catch(error => {
          // Manejo de errores al cargar historial
          let message = "Error loading chat history.";
          console.error(`ChatPage: Error loading history for ${chatId}:`, error);
          if (error instanceof ApiError) {
              message = error.message || message;
              // Si no se encuentra el chat, redirigir a /chat (nuevo chat)
              if (error.status === 404) {
                  toast.error("Chat Not Found", { description: `The chat with ID ${chatId} could not be found.` });
                  router.replace('/chat');
                  return; // Detener ejecución
              }
              // Si hay error de autenticación (401) o autorización (403), desloguear
              if (error.status === 401 || error.status === 403) {
                  toast.error("Authentication Error", { description: "Your session may have expired. Please log in again." });
                  signOut(); // Usar signOut del contexto
              }
          } else if (error instanceof Error) {
              message = error.message;
          }
          setHistoryError(message);
          setMessages([welcomeMessage]); // Mostrar bienvenida en caso de error
          toast.error("Failed to Load Chat", { description: message });
        })
        .finally(() => {
          setIsLoadingHistory(false); // Terminar carga de historial
        });

    } else if (!chatId) {
      // Si no hay chatId (estamos en /chat), resetear a estado inicial
      console.log("ChatPage: No chat ID provided, showing welcome message.");
      setMessages([welcomeMessage]);
      setRetrievedDocs([]);
      setIsLoadingHistory(false);
      setHistoryError(null);
      fetchedChatIdRef.current = undefined; // Resetear ref
    } else if (!isAuthenticated && !isAuthLoading) {
         // Si no está autenticado (y auth ya cargó), mostrar mensaje de login
         console.log("ChatPage: Not authenticated, showing login prompt.");
         setIsLoadingHistory(false);
         setHistoryError("Please log in to view chat history.");
         setMessages([welcomeMessage]);
         fetchedChatIdRef.current = undefined; // Resetear ref
    } else {
        // Caso residual: ya se cargó este chat o no se cumplen condiciones. Asegurar que no quede cargando.
        if (isLoadingHistory) setIsLoadingHistory(false);
    }
  // --- CORRECCIÓN: Dependencias del useEffect ---
  }, [chatId, session, isAuthLoading, bypassAuth, router, signOut, isLoadingHistory]); // Incluir isLoadingHistory para evitar bucles si cambia rápido
  // -------------------------------------------

  // --- Efecto para Scroll al Final ---
  useEffect(() => {
    if (scrollAreaRef.current) {
        // Usar un pequeño timeout para asegurar que el DOM se actualice antes de hacer scroll
        const timer = setTimeout(() => {
             if (scrollAreaRef.current) {
                 scrollAreaRef.current.scrollTo({ top: scrollAreaRef.current.scrollHeight, behavior: 'smooth' });
             }
        }, 100); // 100ms suele ser suficiente
        return () => clearTimeout(timer); // Limpiar timeout al desmontar o si las dependencias cambian
    }
  }, [messages, isSending, isLoadingHistory]); // Depender de mensajes, envío y carga de historial

  // --- Función para Enviar Mensaje ---
  const handleSendMessage = useCallback(async (query: string) => {
    const isAuthenticated = !!session || bypassAuth;
    if (!query.trim() || isSending || !isAuthenticated) {
        if (!isAuthenticated) {
             toast.error("Authentication Error", { description: "Please log in to send messages." });
        } else if (isSending) {
             console.warn("ChatPage: Message sending already in progress.");
        } else {
             console.warn("ChatPage: Cannot send empty message.");
        }
        return;
    }

    // Crear mensaje del usuario y añadirlo al estado
    const userMessage: Message = {
        id: `client-user-${Date.now()}`, // ID temporal del cliente
        role: 'user',
        content: query,
        created_at: new Date().toISOString()
    };
    // Usar callback de setState para asegurar que usamos el estado más reciente
    setMessages(prev => [...prev, userMessage]);
    setIsSending(true);
    setRetrievedDocs([]); // Limpiar documentos anteriores
    const currentChatIdForApi = chatId || null; // Enviar null si es un chat nuevo

    console.log(`ChatPage: Sending query to API (Chat ID: ${currentChatIdForApi || 'New'})...`);

    try {
      // Llamar a la API para obtener la respuesta
      const response = await postQuery({ query, chat_id: currentChatIdForApi });
      const returnedChatId = response.chat_id; // La API debe devolver el ID del chat

      // Mapear fuentes/documentos recuperados
      const mappedSources = mapApiSourcesToFrontend(response.retrieved_documents);

      // Crear mensaje del asistente
      const assistantMessage: Message = {
        id: `client-assistant-${Date.now()}`, // ID temporal del cliente
        role: 'assistant',
        content: response.answer,
        sources: mappedSources, // Adjuntar fuentes mapeadas
        created_at: new Date().toISOString() // Usar fecha actual
      };

      // Añadir mensaje del asistente al estado
      setMessages(prev => [...prev, assistantMessage]);
      setRetrievedDocs(mappedSources || []); // Actualizar panel de documentos

      // Si era un chat nuevo y la API devolvió un ID, actualizar la URL y el estado
      if (!currentChatIdForApi && returnedChatId) {
        console.log(`ChatPage: New chat created with ID: ${returnedChatId}. Updating URL.`);
        setChatId(returnedChatId);
        fetchedChatIdRef.current = returnedChatId; // Actualizar ref para evitar recarga
        // Usar replace para no añadir al historial del navegador, scroll: false para evitar saltos
        router.replace(`/chat/${returnedChatId}`, { scroll: false });
      }

      // Si se recuperaron documentos y el panel estaba cerrado, abrirlo
      if (mappedSources && mappedSources.length > 0 && !isPanelOpen) {
          setIsPanelOpen(true);
      }
      console.log(`ChatPage: Query successful. Answer received.`);

    } catch (error) {
      // Manejo de errores al enviar query
      let errorMessage = "Sorry, I encountered an error trying to answer.";
      console.error("ChatPage: Query failed:", error);
      if (error instanceof ApiError) {
           errorMessage = error.message || `API Error (${error.status})`;
           // Si es error de autenticación/autorización, desloguear
           if (error.status === 401 || error.status === 403) {
               errorMessage = "Authentication error. Please log in again.";
               signOut(); // Usar signOut del contexto
           }
       } else if (error instanceof Error) {
           errorMessage = `Error: ${error.message}`;
       }

      // Crear y añadir mensaje de error al chat
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
      setIsSending(false); // Terminar estado de envío
    }
  // --- CORRECCIÓN: Dependencias del useCallback ---
  }, [isSending, chatId, router, session, bypassAuth, isPanelOpen, signOut]);
  // -------------------------------------------

  // Toggle para el panel derecho
  const handlePanelToggle = () => { setIsPanelOpen(!isPanelOpen); };

  // --- Componentes de Renderizado Internos ---
  const renderHistoryLoading = () => (
       <div className="flex flex-col items-center justify-center h-full p-8 text-center">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground mb-4" />
            <p className="text-muted-foreground">Loading chat history...</p>
            {isAuthLoading && <p className="text-xs text-muted-foreground/70 mt-1">(Waiting for authentication...)</p>}
        </div>
  );

  const renderHistoryError = () => (
      <div className="flex flex-col items-center justify-center h-full p-8 text-center">
          <AlertCircle className="h-8 w-8 text-destructive mb-4" />
          <p className="text-destructive font-medium mb-2">Error Loading History</p>
          <p className="text-sm text-muted-foreground mb-4">{historyError}</p>
          {/* Podrías añadir un botón de reintento si historyError no es por auth */}
          {/* <Button variant="outline" size="sm" onClick={retryFetchHistory}>Retry</Button> */}
      </div>
  );

  const renderMessages = () => {
      // Filtrar el mensaje de bienvenida inicial si ya hay otros mensajes cargados
      const messagesToRender = messages.filter(m => !(m.id === 'initial-welcome' && messages.length > 1));

      return messagesToRender.map((message) => (
          <ChatMessage key={message.id} message={message} />
      ));
  };
  // --- Fin Componentes de Renderizado ---

  // Determinar si mostrar el estado de carga principal
  const showLoading = (isLoadingHistory || (isAuthLoading && !bypassAuth && !chatId)); // Mostrar carga si historial carga, o si auth carga y no estamos en bypass y no hay chat ID aún

  return (
     <ResizablePanelGroup direction="horizontal" className="h-full max-h-[calc(100vh-theme(space.16))]"> {/* Ajustar altura */}
            <ResizablePanel defaultSize={isPanelOpen ? 70 : 100} minSize={50}>
                <div className="flex h-full flex-col relative">
                    {/* Botón para ocultar/mostrar panel derecho */}
                    <div className="absolute top-2 right-2 z-10">
                        <Button onClick={handlePanelToggle} variant="ghost" size="icon" aria-label={isPanelOpen ? 'Close Sources Panel' : 'Open Sources Panel'}>
                            {isPanelOpen ? <PanelRightClose className="h-5 w-5" /> : <PanelRightOpen className="h-5 w-5" />}
                        </Button>
                    </div>

                    {/* Área de Mensajes del Chat */}
                    <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
                         {showLoading ? (
                            renderHistoryLoading() // Mostrar spinner de carga
                         ) : historyError ? (
                             renderHistoryError() // Mostrar mensaje de error
                         ) : (
                            <div className="space-y-4 pr-4"> {/* Añadir padding para que no se pegue al borde */}
                                {renderMessages()} {/* Mostrar mensajes */}
                                {/* Skeleton de "pensando" mientras se envía */}
                                {isSending && (
                                    <div className="flex items-start space-x-3">
                                        <Skeleton className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0"><BrainCircuit className="h-5 w-5 text-primary"/></Skeleton>
                                        <div className="space-y-2 flex-1 pt-1"><Skeleton className="h-4 w-16" /></div>
                                    </div>
                                )}
                            </div>
                         )}
                    </ScrollArea>

                    {/* Área de Input */}
                    <div className="border-t p-4 bg-muted/30">
                        <ChatInput
                            onSendMessage={handleSendMessage}
                            // Deshabilitar input si está cargando historial, enviando, o si auth está cargando y no bypass
                            isLoading={isSending || showLoading}
                        />
                    </div>
                </div>
            </ResizablePanel>

            {/* Panel de Documentos Recuperados (condicional) */}
            {isPanelOpen && (
                <>
                    <ResizableHandle withHandle />
                    <ResizablePanel defaultSize={30} minSize={20} maxSize={40}>
                        <RetrievedDocumentsPanel
                            documents={retrievedDocs}
                            // Mostrar carga en el panel solo mientras se está enviando la respuesta
                            isLoading={isSending}
                        />
                    </ResizablePanel>
                </>
            )}
        </ResizablePanelGroup>
  );
}