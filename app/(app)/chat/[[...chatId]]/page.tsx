// File: app/(app)/chat/[[...chatId]]/page.tsx
"use client";

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ChatInput } from '@/components/chat/chat-input';
import { ChatMessage, Message } from '@/components/chat/chat-message';
import { RetrievedDocumentsPanel } from '@/components/chat/retrieved-documents-panel';
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import { postQuery, RetrievedDoc, ApiError } from '@/lib/api';
// (-) QUITAR ESTA LÍNEA (si existía): import { useToast } from "@/components/ui/use-toast";
// (+) AÑADIR ESTA LÍNEA (si no existe):
import { toast } from "sonner";
import { PanelRightClose, PanelRightOpen, BrainCircuit } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

const initialMessages: Message[] = [
    { id: 'initial-1', role: 'assistant', content: 'Hello! How can I help you query your knowledge base today?' }
];

export default function ChatPage() {
  const params = useParams();
  const chatId = params.chatId ? (Array.isArray(params.chatId) ? params.chatId.join('/') : params.chatId) : undefined;

  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [retrievedDocs, setRetrievedDocs] = useState<RetrievedDoc[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isPanelOpen, setIsPanelOpen] = useState(true);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  // (-) QUITAR ESTA LÍNEA (si existía): const { toast } = useToast(); // No necesitas esto con sonner

  // Load chat history based on chatId
  useEffect(() => {
    // Reset state for new/different chat
    setMessages(initialMessages);
    setRetrievedDocs([]);
    setIsLoading(false); // Ensure loading is reset

    if (chatId) {
      console.log(`Loading history for chat: ${chatId}`);
      // --- TODO: Fetch actual messages ---
      // .catch(err => {
      //     // Adaptar toast si se usa aquí
      //     toast.error("Failed to load chat history", { description: err.message });
      //  })
      setMessages([
           { id: 'initial-1', role: 'assistant', content: `Welcome back to chat ${chatId}. Ask me anything!` }
      ]);
    } else {
      setMessages(initialMessages);
    }
  }, [chatId]);

  // Scroll to bottom when messages change
  useEffect(() => {
    if (scrollAreaRef.current) {
        setTimeout(() => {
             if (scrollAreaRef.current) {
                 scrollAreaRef.current.scrollTo({ top: scrollAreaRef.current.scrollHeight, behavior: 'smooth' });
             }
        }, 100);
    }
  }, [messages]);

  const handleSendMessage = useCallback(async (query: string) => {
    if (!query.trim() || isLoading) return;

    const userMessage: Message = { id: `user-${Date.now()}`, role: 'user', content: query };
    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);
    setRetrievedDocs([]);

    try {
      const response = await postQuery({ query });
      const assistantMessage: Message = {
        id: `assistant-${Date.now()}`,
        role: 'assistant',
        content: response.answer,
        sources: response.retrieved_documents
      };
      setMessages(prev => [...prev, assistantMessage]);
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
      setMessages(prev => [...prev, errorMessageObj]);

      // (-) QUITAR ESTO (si existía):
      // toast({
      //   variant: "destructive",
      //   title: "Query Failed",
      //   description: errorMessage,
      // });
      // (+) AÑADIR/USAR ESTO:
      toast.error("Query Failed", {
        description: errorMessage,
      });

    } finally {
      setIsLoading(false);
    }
  // Dependencias de useCallback: no se necesita 'toast' para sonner
  }, [isLoading, isPanelOpen]);

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
                            {messages.map((message) => (
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