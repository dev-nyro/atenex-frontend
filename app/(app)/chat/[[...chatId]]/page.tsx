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
    RetrievedDoc, // Use the frontend type defined/exported in api.ts
    ApiError,
    mapApiMessageToFrontend // Import the mapping function
} from '@/lib/api';
import { toast } from "sonner";
import { PanelRightClose, PanelRightOpen, BrainCircuit, Loader2, AlertCircle } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { useAuth } from '@/lib/hooks/useAuth'; // Import useAuth

// Initial message for new chats or when history is empty
const welcomeMessage: Message = {
    id: 'initial-welcome',
    role: 'assistant',
    content: 'Hello! How can I help you query your knowledge base today?',
    created_at: new Date().toISOString(), // Add a timestamp
};

export default function ChatPage() {
  const params = useParams();
  const router = useRouter();
  const { token } = useAuth(); // Check if user is logged in

  // Extract chatId, ensuring it's a string or undefined
  // Take only the first element if it's an array (robustness for [[...chatId]])
  const chatIdParam = params.chatId ? (Array.isArray(params.chatId) ? params.chatId[0] : params.chatId) : undefined;
  const [chatId, setChatId] = useState<string | undefined>(chatIdParam);

  const [messages, setMessages] = useState<Message[]>([welcomeMessage]);
  const [retrievedDocs, setRetrievedDocs] = useState<RetrievedDoc[]>([]);
  const [isSending, setIsSending] = useState(false); // Renamed from isLoading for clarity
  const [isLoadingHistory, setIsLoadingHistory] = useState(false);
  const [historyError, setHistoryError] = useState<string | null>(null);
  const [isPanelOpen, setIsPanelOpen] = useState(true);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  // Ref to track if the current URL's chatId has already been fetched
  const fetchedChatIdRef = useRef<string | undefined>(undefined);

  // Update chatId state if the param changes (e.g., navigation)
  useEffect(() => {
    setChatId(chatIdParam);
  }, [chatIdParam]);

  // Load chat history from API based on chatId
  useEffect(() => {
    // Only fetch if:
    // 1. User is logged in (token exists)
    // 2. A chatId is present in the state
    // 3. We haven't already fetched for this specific chatId
    if (token && chatId && fetchedChatIdRef.current !== chatId) {
      console.log(`ChatPage: Fetching history for chat ID: ${chatId}`);
      setIsLoadingHistory(true);
      setHistoryError(null);
      fetchedChatIdRef.current = chatId; // Mark this ID as being fetched

      getChatMessages(chatId)
        .then(apiMessages => {
            // Sort messages by creation time ascending (oldest first)
           apiMessages.sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime());
           const mappedMessages = apiMessages.map(mapApiMessageToFrontend);

           if (mappedMessages.length > 0) {
                setMessages(mappedMessages);
                console.log(`ChatPage: Loaded ${mappedMessages.length} messages for chat ${chatId}.`);
           } else {
                // Chat exists but has no messages (or API returned empty)
                setMessages([welcomeMessage]); // Start with welcome message
                console.log(`ChatPage: Chat ${chatId} has no messages. Displaying welcome message.`);
           }
        })
        .catch(error => {
          console.error(`ChatPage: Failed to load chat history for ${chatId}:`, error);
          let message = "Error loading chat history.";
          if (error instanceof ApiError) {
              message = error.message || message;
              if (error.status === 404) {
                  message = "Chat not found or you don't have access.";
                  // Redirect to base chat page if not found
                  toast.error("Chat Not Found", { description: message });
                  router.replace('/chat');
                  return; // Stop further processing in this effect
              } else if (error.status === 401) {
                   message = "Authentication error. Please log in again.";
                   // Optionally trigger logout or redirect to login
                   router.push('/login'); // Example redirect
              }
          } else if (error instanceof Error) {
              message = error.message;
          }
          setHistoryError(message);
          setMessages([welcomeMessage]); // Show welcome message on error
          toast.error("Failed to Load Chat", { description: message });
        })
        .finally(() => {
          setIsLoadingHistory(false);
        });

    } else if (!chatId) {
      // Reset for the '/chat' page (new chat state)
      console.log("ChatPage: No chatId, preparing for new chat.");
      setMessages([welcomeMessage]);
      setRetrievedDocs([]);
      setIsLoadingHistory(false);
      setHistoryError(null);
      fetchedChatIdRef.current = undefined; // Reset fetch flag
    } else if (!token) {
         console.log("ChatPage: User not authenticated, cannot load history.");
         setIsLoadingHistory(false);
         setHistoryError("Please log in to view chat history.");
         setMessages([welcomeMessage]); // Show welcome message
         fetchedChatIdRef.current = undefined;
    }

  // Depend on chatId (state) and token
  }, [chatId, token, router]); // Add router to dependencies

  // Scroll to bottom when messages change or loading starts/stops
  useEffect(() => {
    if (scrollAreaRef.current) {
        const timer = setTimeout(() => {
             if (scrollAreaRef.current) {
                 scrollAreaRef.current.scrollTo({ top: scrollAreaRef.current.scrollHeight, behavior: 'smooth' });
             }
        }, 100);
        return () => clearTimeout(timer);
    }
  }, [messages, isSending, isLoadingHistory]); // Scroll on changes

  const handleSendMessage = useCallback(async (query: string) => {
    if (!query.trim() || isSending || !token) {
        if (!token) toast.error("Authentication Error", { description: "Please log in to send messages." });
        return;
    }

    const userMessage: Message = {
        id: `client-user-${Date.now()}`, // Temporary client-side ID
        role: 'user',
        content: query,
        created_at: new Date().toISOString() // Add timestamp
    };
    setMessages(prev => [...prev, userMessage]);
    setIsSending(true);
    setRetrievedDocs([]);

    const currentChatIdForApi = chatId || null; // Send null to API if chatId is undefined

    try {
      console.log(`ChatPage: Sending query to chat ID: ${currentChatIdForApi}`);
      const response = await postQuery({ query, chat_id: currentChatIdForApi });
      console.log("ChatPage: Received response:", response);

      // --- IMPORTANT: Use the chat_id returned by the API ---
      const returnedChatId = response.chat_id;

      // Create assistant message using a temporary ID or potentially one from backend if available
      const assistantMessage: Message = {
        id: `client-assistant-${Date.now()}`, // Temporary ID
        role: 'assistant',
        content: response.answer,
        sources: mapApiSourcesToFrontend(response.retrieved_documents),
        created_at: new Date().toISOString() // Approximate timestamp
      };

      // Update state with assistant message
      setMessages(prev => [...prev, assistantMessage]);
      setRetrievedDocs(mapApiSourcesToFrontend(response.retrieved_documents) || []);

      // If it was a new chat, update the URL *without* triggering a full history reload
      if (!currentChatIdForApi && returnedChatId) {
        console.log(`ChatPage: New chat created with ID: ${returnedChatId}. Updating URL.`);
        // Update the internal state *before* replacing URL to prevent refetch
        setChatId(returnedChatId);
        fetchedChatIdRef.current = returnedChatId; // Mark the new ID as "fetched" (since we just created it)
        router.replace(`/chat/${returnedChatId}`, { scroll: false });
      } else if (currentChatIdForApi && returnedChatId !== currentChatIdForApi) {
           // This case shouldn't normally happen with the current backend logic
           console.warn(`Backend returned a different chat ID (${returnedChatId}) than expected (${currentChatIdForApi}). Updating state.`);
           setChatId(returnedChatId);
           fetchedChatIdRef.current = returnedChatId;
           router.replace(`/chat/${returnedChatId}`, { scroll: false });
      }

      // Auto-open panel if closed and docs were retrieved
      if (response.retrieved_documents && response.retrieved_documents.length > 0 && !isPanelOpen) {
         setIsPanelOpen(true);
      }

    } catch (error) {
      console.error("ChatPage: Query failed:", error);
      let errorMessage = "Sorry, I encountered an error trying to answer your question.";
       if (error instanceof ApiError) {
           errorMessage = error.message || `API Error (${error.status})`;
           if (error.status === 401) {
                errorMessage = "Authentication error. Please log in again.";
                // Optional: Trigger logout or redirect
                router.push('/login');
           }
       } else if (error instanceof Error) {
           errorMessage = `Error: ${error.message}`;
       }

      const errorTimestamp = new Date().toISOString();
      const errorMessageObj: Message = {
          id: `error-${errorTimestamp}`,
          role: 'assistant',
          content: errorMessage,
          isError: true,
          created_at: errorTimestamp
      };
      // Add error message to the chat
      setMessages(prev => [...prev, errorMessageObj]);

      toast.error("Query Failed", { description: errorMessage });

    } finally {
      setIsSending(false);
    }
  }, [isSending, chatId, router, token, isPanelOpen]); // Include dependencies

  const handlePanelToggle = () => {
        setIsPanelOpen(!isPanelOpen);
    };

  // --- Render Functions for Loading/Error ---
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
          {/* Optionally add a retry button - requires refetch logic */}
          {/* <Button variant="outline" size="sm" onClick={retryFetchHistory}>Retry</Button> */}
      </div>
  );

  const renderWelcomeOrMessages = () => {
      if (messages.length === 0 || (messages.length === 1 && messages[0].id === 'initial-welcome' && !chatId)) {
          // Show welcome message only for truly new chats or if history is empty
          return <ChatMessage message={welcomeMessage} />;
      }
      // Otherwise, render the loaded/updated messages
      return messages.map((message) => (
          <ChatMessage key={message.id} message={message} />
      ));
  };

  return (
     <ResizablePanelGroup direction="horizontal" className="h-full max-h-[calc(100vh-theme(space.16))]">
            <ResizablePanel defaultSize={isPanelOpen ? 70 : 100} minSize={50}>
                <div className="flex h-full flex-col relative"> {/* Added relative */}
                    {/* Panel Toggle Button */}
                    <div className="absolute top-2 right-2 z-10">
                        <Button onClick={handlePanelToggle} variant="ghost" size="icon" aria-label={isPanelOpen ? 'Close Sources Panel' : 'Open Sources Panel'}>
                            {isPanelOpen ? <PanelRightClose className="h-5 w-5" /> : <PanelRightOpen className="h-5 w-5" />}
                        </Button>
                    </div>

                    {/* Main Content Area */}
                    <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
                         {isLoadingHistory ? (
                            renderHistoryLoading()
                         ) : historyError ? (
                             renderHistoryError()
                         ) : (
                            <div className="space-y-4 pr-4">
                                {renderWelcomeOrMessages()}
                                {/* Show assistant thinking skeleton only when sending */}
                                {isSending && (
                                    <div className="flex items-start space-x-3">
                                        <Skeleton className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center">
                                            <BrainCircuit className="h-5 w-5 text-primary"/>
                                        </Skeleton>
                                        <div className="space-y-2 flex-1 pt-1">
                                            <Skeleton className="h-4 w-16" />
                                        </div>
                                    </div>
                                )}
                            </div>
                         )}
                    </ScrollArea>

                    {/* Input Area */}
                    <div className="border-t p-4 bg-muted/30">
                        <ChatInput onSendMessage={handleSendMessage} isLoading={isSending} />
                    </div>
                </div>
            </ResizablePanel>

            {/* Retrieved Documents Panel */}
            {isPanelOpen && (
                <>
                    <ResizableHandle withHandle />
                    <ResizablePanel defaultSize={30} minSize={20} maxSize={40}>
                        {/* Show loading state in panel only when actively sending/waiting for response */}
                        <RetrievedDocumentsPanel documents={retrievedDocs} isLoading={isSending} />
                    </ResizablePanel>
                </>
            )}
        </ResizablePanelGroup>
  );
}