// File: components/chat/chat-interface.tsx
"use client";

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ChatInput } from './chat-input';
import { ChatMessage, Message } from './chat-message';
import { RetrievedDocumentsPanel } from './retrieved-documents-panel';
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import { postQuery, RetrievedDoc, ApiError } from '@/lib/api';
import { toast } from "sonner";
import { PanelRightClose, PanelRightOpen, BrainCircuit, FileText } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { isGreeting, isMetaQuery, getMetaResponse } from '@/lib/utils';

interface ChatInterfaceProps {
  chatId?: string; // Receive chatId from the page
}

const initialMessages: Message[] = [
  { id: 'initial-1', role: 'assistant', content: 'Hello! How can I help you query your knowledge base today?' },
];

export function ChatInterface({ chatId }: ChatInterfaceProps) {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [retrievedDocs, setRetrievedDocs] = useState<RetrievedDoc[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isPanelOpen, setIsPanelOpen] = useState(false); // Oculta panel por defecto
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  // Load chat history based on chatId (placeholder)
  useEffect(() => {
    // Reset state for new/different chat
    setMessages(initialMessages);
    setRetrievedDocs([]);
    setIsLoading(false);

    if (chatId) {
      console.log(`Loading history for chat: ${chatId}`);
      // Load messages from local storage
      const storedMessages = localStorage.getItem(`chat-${chatId}`);
      if (storedMessages) {
        try {
          const parsedMessages = JSON.parse(storedMessages);
          setMessages(parsedMessages);
        } catch (error) {
          console.error("Error parsing chat history from local storage:", error);
          // Handle error (e.g., clear local storage or show an error message)
        }
      } else {
          setMessages([ // Dummy loading
            { id: 'initial-1', role: 'assistant', content: `Welcome back to chat ${chatId}. Ask me anything!` }
          ]);
      }
    } else {
      // New chat
      setMessages(initialMessages);
    }
  }, [chatId]);

  // Save chat history to localStorage
  useEffect(() => {
    if (chatId) {
      try {
        localStorage.setItem(`chat-${chatId}`, JSON.stringify(messages));
      } catch (error) {
        console.error("Error saving chat history to local storage:", error);
        // Handle error (e.g., show an error message)
      }
    }
  }, [chatId, messages]);

  // Scroll to bottom when messages change
  useEffect(() => {
    if (scrollAreaRef.current) {
        // Added timeout to ensure DOM updates are flushed before scrolling
        setTimeout(() => {
            if (scrollAreaRef.current) {
                scrollAreaRef.current.scrollTo({ top: scrollAreaRef.current.scrollHeight, behavior: 'smooth' });
            }
        }, 100);
    }
  }, [messages]);

  const handleSendMessage = useCallback(async (query: string) => {
    const text = query.trim();
    if (!text || isLoading) return;

    // Local greeting
    if (isGreeting(text)) {
      setMessages(prev => [...prev, { id: `assistant-${Date.now()}`, role: 'assistant', content: '¡Hola! ¿En qué puedo ayudarte hoy?' } as Message]);
      return;
    }

    // Local meta query
    if (isMetaQuery(text)) {
      setMessages(prev => [...prev, { id: `assistant-meta-${Date.now()}`, role: 'assistant', content: getMetaResponse() } as Message]);
      return;
    }

    const userMessage: Message = { id: `user-${Date.now()}`, role: 'user', content: text };
    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);
    setRetrievedDocs([]); // Clear previous docs

    try {
      const response = await postQuery({ query: text });
      const assistantMessage: Message = {
        id: `assistant-${Date.now()}`,
        role: 'assistant',
        content: response.answer,
        sources: response.retrieved_documents, // Attach sources to the message
      };
      setMessages(prev => [...prev, assistantMessage]);
      setRetrievedDocs(response.retrieved_documents || []);
      if (response.retrieved_documents && response.retrieved_documents.length > 0 && !isPanelOpen) {
         setIsPanelOpen(true); // Auto-open panel if closed and docs were retrieved
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
      setMessages(prev => [...prev, errorMessageObj]);

      toast.error("Query Failed", {
        description: errorMessage,
      });

    } finally {
      setIsLoading(false);
    }
  }, [isLoading, isPanelOpen]); // Add isPanelOpen dependency

  const handlePanelToggle = () => {
        setIsPanelOpen(!isPanelOpen);
    };

  return (
     <ResizablePanelGroup direction="horizontal" className="h-full max-h-[calc(100vh-theme(space.16))] transition-all duration-300 ease-in-out"> {/* Adjust height based on header */}
            <ResizablePanel defaultSize={isPanelOpen ? 70 : 100} minSize={50} className="transition-all duration-300 ease-in-out">
                <div className="flex h-full flex-col">
                    {/* Button to toggle panel */}
                    <div className="absolute top-2 right-2 z-10">
                        <Button onClick={handlePanelToggle} variant="ghost" size="icon">
                            {isPanelOpen ? <PanelRightClose className="h-5 w-5" /> : <PanelRightOpen className="h-5 w-5" />}
                            <span className="sr-only">{isPanelOpen ? 'Close Sources Panel' : 'Open Sources Panel'}</span>
                        </Button>
                    </div>

                    <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
                        <div className="space-y-4 pr-4"> {/* Add padding right */}
                            {messages.map(message => (
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
                    <ResizablePanel defaultSize={30} minSize={20} maxSize={40} className="transition-all duration-300 ease-in-out">
                        <RetrievedDocumentsPanel documents={retrievedDocs} isLoading={isLoading && messages[messages.length - 1]?.role === 'user'} />
                    </ResizablePanel>
                </>
            )}
        </ResizablePanelGroup>
  );
}