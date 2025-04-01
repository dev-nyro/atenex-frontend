// File: app/(app)/chat/[[...chatId]]/page.tsx
"use client";

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useParams, useRouter } from 'next/navigation'; // (+) Import useRouter
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ChatInput } from '@/components/chat/chat-input';
import { ChatMessage, Message } from '@/components/chat/chat-message';
import { RetrievedDocumentsPanel } from '@/components/chat/retrieved-documents-panel';
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import { postQuery, RetrievedDoc, ApiError } from '@/lib/api';
import { toast } from "sonner";
import { PanelRightClose, PanelRightOpen, BrainCircuit } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

const initialMessageContent = 'Hello! How can I help you query your knowledge base today?';
const initialMessages: Message[] = [
    { id: 'initial-1', role: 'assistant', content: initialMessageContent }
];

// (+) Helper function to get localStorage key
const getChatHistoryKey = (id: string | undefined): string | null => {
    return id ? `chatHistory_${id}` : null;
}

export default function ChatPage() {
  const params = useParams();
  const router = useRouter(); // (+) Get router instance
  const chatId = params.chatId ? (Array.isArray(params.chatId) ? params.chatId.join('/') : params.chatId) : undefined;

  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [retrievedDocs, setRetrievedDocs] = useState<RetrievedDoc[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isPanelOpen, setIsPanelOpen] = useState(true);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const [isHistoryLoaded, setIsHistoryLoaded] = useState(false); // (+) Track history loading

  // (*) MODIFIED: Load chat history from localStorage based on chatId
  useEffect(() => {
    setIsHistoryLoaded(false); // Start loading state
    const storageKey = getChatHistoryKey(chatId);
    let loadedMessages = initialMessages; // Default to initial

    if (storageKey && typeof window !== 'undefined') {
        console.log(`Attempting to load history for chat: ${chatId} from key: ${storageKey}`);
        try {
            const storedHistory = localStorage.getItem(storageKey);
            if (storedHistory) {
                const parsedMessages = JSON.parse(storedHistory) as Message[];
                // Basic validation: check if it's an array and has items
                if (Array.isArray(parsedMessages) && parsedMessages.length > 0) {
                    loadedMessages = parsedMessages;
                    console.log(`Successfully loaded ${parsedMessages.length} messages for chat ${chatId}.`);
                } else {
                     console.log(`Stored history for ${chatId} was empty or invalid format. Using initial message.`);
                     // Ensure initial message is set if storage is invalid/empty
                     localStorage.setItem(storageKey, JSON.stringify(initialMessages));
                }
            } else {
                console.log(`No history found for chat ${chatId}. Initializing with default message.`);
                // Store the initial message if none exists
                localStorage.setItem(storageKey, JSON.stringify(initialMessages));
            }
        } catch (error) {
            console.error(`Failed to load or parse chat history for ${chatId}:`, error);
            toast.error("Error loading chat history", { description: "Could not retrieve previous messages. Resetting chat." });
            // Optionally clear corrupted storage
            // localStorage.removeItem(storageKey);
        }
    } else if (!chatId) {
        console.log("No chatId provided, using ephemeral chat state.");
        // For new chats (no ID), just use initial messages without storage interaction yet
    }

    setMessages(loadedMessages);
    setRetrievedDocs([]); // Reset retrieved docs when chat changes
    setIsLoading(false); // Ensure loading indicator is off
    setIsHistoryLoaded(true); // Mark history as loaded

  }, [chatId]); // Depend only on chatId

  // (*) ADDED: Save chat history to localStorage when messages change
  useEffect(() => {
    // Only save if history has been loaded and chatId exists
    if (isHistoryLoaded && chatId && typeof window !== 'undefined') {
        const storageKey = getChatHistoryKey(chatId);
        if (storageKey && messages.length > 0) { // Don't save empty array
            // Avoid saving only the initial default message if no interaction happened yet
            // This check prevents overwriting potentially loaded history with the default
            // if the load effect hasn't finished before this effect runs initially.
            // Or, more simply, just save whatever is in state. Let's go with simpler for MVP.
            try {
                console.log(`Saving ${messages.length} messages for chat ${chatId} to key ${storageKey}`);
                localStorage.setItem(storageKey, JSON.stringify(messages));
            } catch (error) {
                 console.error(`Failed to save chat history for ${chatId}:`, error);
                 toast.error("Error saving chat history", { description: "Could not save the latest messages." });
            }
        }
    }
  }, [messages, chatId, isHistoryLoaded]); // Depend on messages, chatId, and load status

  // Scroll to bottom when messages change
  useEffect(() => {
    if (scrollAreaRef.current) {
        setTimeout(() => {
             if (scrollAreaRef.current) {
                 scrollAreaRef.current.scrollTo({ top: scrollAreaRef.current.scrollHeight, behavior: 'smooth' });
             }
        }, 100); // Small delay to allow render
    }
  }, [messages]); // Depend only on messages

  const handleSendMessage = useCallback(async (query: string) => {
    if (!query.trim() || isLoading) return;

    // (+) If this is the first message in a new chat (no chatId), create one
    let currentChatId = chatId;
    if (!currentChatId) {
        currentChatId = `chat-${Date.now()}`; // Simple unique ID generation
        console.log(`Starting new chat with ID: ${currentChatId}`);
        // Redirect to the new chat URL to persist the ID
        router.replace(`/chat/${currentChatId}`, { scroll: false });
        // Note: The useEffects depending on chatId will re-run after redirect
        // We proceed optimistically with the currentChatId for this message send
    }

    const userMessage: Message = { id: `user-${Date.now()}`, role: 'user', content: query };
    // Update state immediately for responsiveness
    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);
    setRetrievedDocs([]);

    try {
      // Use currentChatId (which might be newly generated)
      const response = await postQuery({ query }); // Assuming postQuery doesn't need chatId yet
      const assistantMessage: Message = {
        id: `assistant-${Date.now()}`,
        role: 'assistant',
        content: response.answer,
        sources: response.retrieved_documents
      };
      setMessages(prev => [...prev, assistantMessage]); // State update triggers save useEffect
      setRetrievedDocs(response.retrieved_documents || []);
      if (response.retrieved_documents && response.retrieved_documents.length > 0 && !isPanelOpen) {
         setIsPanelOpen(true);
      }
    } catch (error) {
      console.error("Query failed:", error);
      let errorMessage = "Sorry, I encountered an error trying to answer your question.";
       if (error instanceof ApiError && error.message) {
           errorMessage = `Error: ${error.message}`;
       } else if (error instanceof Error && error.message) {
           errorMessage = `Error: ${error.message}`;
       }

      const errorMessageObj: Message = { id: `error-${Date.now()}`, role: 'assistant', content: errorMessage, isError: true };
      setMessages(prev => [...prev, errorMessageObj]); // State update triggers save useEffect

      toast.error("Query Failed", {
        description: errorMessage,
      });

    } finally {
      setIsLoading(false);
    }
  // (+) Added router to dependencies
  }, [isLoading, isPanelOpen, chatId, router]);

  const handlePanelToggle = () => {
        setIsPanelOpen(!isPanelOpen);
    };

  return (
     <ResizablePanelGroup direction="horizontal" className="h-full max-h-[calc(100vh-theme(space.16))]">
            <ResizablePanel defaultSize={isPanelOpen ? 70 : 100} minSize={50}>
                <div className="flex h-full flex-col">
                    <div className="absolute top-2 right-2 z-10">
                        <Button onClick={handlePanelToggle} variant="ghost" size="icon">
                            {isPanelOpen ? <PanelRightClose className="h-5 w-5" /> : <PanelRightOpen className="h-5 w-5" />}
                            <span className="sr-only">{isPanelOpen ? 'Close Sources Panel' : 'Open Sources Panel'}</span>
                        </Button>
                    </div>

                    <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
                        <div className="space-y-4 pr-4">
                            {/* Conditional rendering while history loads */}
                            {!isHistoryLoaded && chatId && (
                                <div className="flex justify-center items-center h-full">
                                    <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
                                    <span className="ml-2 text-muted-foreground">Loading chat history...</span>
                                </div>
                            )}
                            {/* Render messages once loaded */}
                            {isHistoryLoaded && messages.map((message) => (
                                <ChatMessage key={message.id} message={message} />
                            ))}
                            {isLoading && messages[messages.length - 1]?.role === 'user' && (
                                <div className="flex items-start space-x-3">
                                     <Skeleton className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center">
                                          <BrainCircuit className="h-5 w-5 text-primary"/>
                                     </Skeleton>
                                    <div className="space-y-2 flex-1">
                                        <Skeleton className="h-4 w-3/4" />
                                        <Skeleton className="h-4 w-1/2" />
                                    </div>
                                </div>
                            )}
                        </div>
                    </ScrollArea>

                    <div className="border-t p-4 bg-muted/30">
                        <ChatInput onSendMessage={handleSendMessage} isLoading={isLoading} />
                    </div>
                </div>
            </ResizablePanel>

            {isPanelOpen && (
                <>
                    <ResizableHandle withHandle />
                    <ResizablePanel defaultSize={30} minSize={20} maxSize={40}>
                        <RetrievedDocumentsPanel documents={retrievedDocs} isLoading={isLoading && messages[messages.length - 1]?.role === 'user'} />
                    </ResizablePanel>
                </>
            )}
        </ResizablePanelGroup>
  );
}