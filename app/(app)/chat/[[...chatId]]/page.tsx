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
};

export default function ChatPage() {
  const params = useParams();
  const router = useRouter();
  const { token } = useAuth(); // Check if user is logged in

  // Extract chatId, ensuring it's a string or undefined
  const chatId = params.chatId ? (Array.isArray(params.chatId) ? params.chatId[0] : params.chatId) : undefined;

  const [messages, setMessages] = useState<Message[]>([welcomeMessage]);
  const [retrievedDocs, setRetrievedDocs] = useState<RetrievedDoc[]>([]);
  const [isSending, setIsSending] = useState(false); // Renamed from isLoading for clarity
  const [isLoadingHistory, setIsLoadingHistory] = useState(false);
  const [historyError, setHistoryError] = useState<string | null>(null);
  const [isPanelOpen, setIsPanelOpen] = useState(true);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const hasFetchedHistory = useRef(false); // Prevent refetching on navigation replacement

  // Load chat history from API based on chatId
  useEffect(() => {
    // Only fetch if chatId exists and we haven't fetched for this ID yet
    if (chatId && !hasFetchedHistory.current && token) {
      console.log(`ChatPage: Fetching history for chat ID: ${chatId}`);
      setIsLoadingHistory(true);
      setHistoryError(null);
      hasFetchedHistory.current = true; // Mark as attempting fetch

      getChatMessages(chatId)
        .then(apiMessages => {
          if (apiMessages.length > 0) {
             // Map API messages to frontend message type
             const mappedMessages = apiMessages.map(mapApiMessageToFrontend);
             setMessages(mappedMessages);
             console.log(`ChatPage: Loaded ${mappedMessages.length} messages for chat ${chatId}.`);
          } else {
              // Chat exists but has no messages (shouldn't happen if created via query)
              setMessages([welcomeMessage]); // Start with welcome message
              console.log(`ChatPage: Chat ${chatId} found but has no messages. Displaying welcome message.`);
          }
        })
        .catch(error => {
          console.error(`ChatPage: Failed to load chat history for ${chatId}:`, error);
          let message = "Error loading chat history.";
          if (error instanceof ApiError) {
              message = error.message || message;
              if (error.status === 404) {
                  message = "Chat not found. It might have been deleted.";
                  // Optionally redirect if chat not found
                  // router.replace('/chat');
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
      hasFetchedHistory.current = false; // Reset fetch flag for when a new chat ID is created
    } else if (!token) {
         console.log("ChatPage: User not authenticated, cannot load history.");
         setIsLoadingHistory(false);
         setHistoryError("Please log in to view chat history.");
         hasFetchedHistory.current = false;
    }

  // Reset fetch flag if chatId changes
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chatId, token]); // Depend on chatId and token

  // Effect to reset fetch flag when navigating away or chatId changes significantly
  useEffect(() => {
      hasFetchedHistory.current = false;
  }, [chatId]);


  // Scroll to bottom when messages change or loading starts/stops
  useEffect(() => {
    if (scrollAreaRef.current) {
        // Delay slightly to allow DOM updates
        const timer = setTimeout(() => {
             if (scrollAreaRef.current) {
                 scrollAreaRef.current.scrollTo({ top: scrollAreaRef.current.scrollHeight, behavior: 'smooth' });
             }
        }, 100);
        return () => clearTimeout(timer); // Cleanup timer on unmount or change
    }
  }, [messages, isSending, isLoadingHistory]); // Scroll on message changes and loading state changes

  const handleSendMessage = useCallback(async (query: string) => {
    if (!query.trim() || isSending || !token) {
        if (!token) toast.error("Authentication Error", { description: "Please log in to send messages." });
        return;
    }

    const userMessage: Message = { id: `user-${Date.now()}`, role: 'user', content: query };
    // Add user message immediately for better UX
    setMessages(prev => [...prev, userMessage]);
    setIsSending(true);
    setRetrievedDocs([]); // Clear previous docs

    const currentChatId = chatId || null; // Send null if chatId is undefined

    try {
      console.log(`ChatPage: Sending query to chat ID: ${currentChatId}`);
      const response = await postQuery({ query, chat_id: currentChatId });
      console.log("ChatPage: Received response:", response);

      const assistantMessage: Message = {
        id: `assistant-${Date.now()}`, // Use a temporary client-side ID or wait for backend ID if needed
        role: 'assistant',
        content: response.answer,
        // Map sources from API response to frontend type
        sources: mapApiMessageToFrontend({ // Use mapping helper structure
             id: '', role: 'assistant', content: '', // Dummy values not used
             sources: response.retrieved_documents,
             created_at: ''
         }).sources
      };

      // Update state with assistant message
      setMessages(prev => [...prev, assistantMessage]);
      setRetrievedDocs(mapApiMessageToFrontend({ id: '', role: 'assistant', content: '', sources: response.retrieved_documents, created_at: '' }).sources || []);

      // If it was a new chat, update the URL
      if (!chatId && response.chat_id) {
        console.log(`ChatPage: New chat created with ID: ${response.chat_id}. Updating URL.`);
        router.replace(`/chat/${response.chat_id}`, { scroll: false });
        // No need to set hasFetchedHistory.current = true here, useEffect will handle it on next render
      }

      // Auto-open panel if closed and docs were retrieved
      if (response.retrieved_documents && response.retrieved_documents.length > 0 && !isPanelOpen) {
         setIsPanelOpen(true);
      }

    } catch (error) {
      console.error("ChatPage: Query failed:", error);
      let errorMessage = "Sorry, I encountered an error trying to answer your question.";
       if (error instanceof ApiError) {
           errorMessage = `Error: ${error.message}`;
       } else if (error instanceof Error) {
           errorMessage = `Error: ${error.message}`;
       }

      const errorMessageObj: Message = { id: `error-${Date.now()}`, role: 'assistant', content: errorMessage, isError: true };
      setMessages(prev => [...prev, errorMessageObj]);

      toast.error("Query Failed", { description: errorMessage });

    } finally {
      setIsSending(false);
    }
  }, [isSending, chatId, router, token, isPanelOpen]); // Add token and isPanelOpen

  const handlePanelToggle = () => {
        setIsPanelOpen(!isPanelOpen);
    };

  // Render loading state for history
  const renderHistoryLoading = () => (
       <div className="flex flex-col items-center justify-center h-full p-8 text-center">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground mb-4" />
            <p className="text-muted-foreground">Loading chat history...</p>
        </div>
  );

  // Render error state for history
  const renderHistoryError = () => (
      <div className="flex flex-col items-center justify-center h-full p-8 text-center">
          <AlertCircle className="h-8 w-8 text-destructive mb-4" />
          <p className="text-destructive font-medium mb-2">Error Loading History</p>
          <p className="text-sm text-muted-foreground mb-4">{historyError}</p>
          {/* Optionally add a retry button */}
      </div>
  );

  return (
     <ResizablePanelGroup direction="horizontal" className="h-full max-h-[calc(100vh-theme(space.16))]">
            <ResizablePanel defaultSize={isPanelOpen ? 70 : 100} minSize={50}>
                <div className="flex h-full flex-col relative"> {/* Added relative */}
                    {/* Panel Toggle Button */}
                    <div className="absolute top-2 right-2 z-10">
                        <Button onClick={handlePanelToggle} variant="ghost" size="icon">
                            {isPanelOpen ? <PanelRightClose className="h-5 w-5" /> : <PanelRightOpen className="h-5 w-5" />}
                            <span className="sr-only">{isPanelOpen ? 'Close Sources Panel' : 'Open Sources Panel'}</span>
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
                                {messages.map((message) => (
                                    <ChatMessage key={message.id} message={message} />
                                ))}
                                {/* Show assistant thinking skeleton only when sending */}
                                {isSending && (
                                    <div className="flex items-start space-x-3">
                                        <Skeleton className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center">
                                            <BrainCircuit className="h-5 w-5 text-primary"/>
                                        </Skeleton>
                                        <div className="space-y-2 flex-1">
                                            <Skeleton className="h-4 w-16" /> {/* Short thinking text */}
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