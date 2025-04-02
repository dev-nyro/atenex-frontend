// File: app/(app)/chat/[[...chatId]]/page.tsx
// Purpose: Main chat interface page, using useAuth for state and API calls via lib/api.
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
    deleteChat, // Import deleteChat
    RetrievedDoc,
    ApiError,
    mapApiMessageToFrontend,
    mapApiSourcesToFrontend,
    ChatSummary, // Import ChatSummary for potential use
} from '@/lib/api'; // Use functions from centralized API module
import { toast } from "sonner"; // Use sonner for notifications
import { PanelRightClose, PanelRightOpen, BrainCircuit, Loader2, AlertCircle, PlusCircle } from 'lucide-react'; // Added PlusCircle
import { Skeleton } from '@/components/ui/skeleton';
import { useAuth } from '@/lib/hooks/useAuth'; // Import the CORRECTED auth hook

// Initial welcome message for new chats
const welcomeMessage: Message = {
    id: 'initial-welcome',
    role: 'assistant',
    content: '¡Hola! Soy Atenex. Pregúntame cualquier cosa sobre tus documentos.',
    created_at: new Date().toISOString(),
};

export default function ChatPage() {
    const params = useParams();
    const router = useRouter();
    const { session, user, isLoading: isAuthLoading, signOut } = useAuth(); // Get auth state

    // Extract chatId from dynamic route parameters
    const chatIdParam = params.chatId ? (Array.isArray(params.chatId) ? params.chatId[0] : params.chatId) : undefined;
    const [chatId, setChatId] = useState<string | undefined>(chatIdParam);

    // Component State
    const [messages, setMessages] = useState<Message[]>([welcomeMessage]);
    const [retrievedDocs, setRetrievedDocs] = useState<RetrievedDoc[]>([]);
    const [isSending, setIsSending] = useState(false); // Is a new message being sent?
    const [isLoadingHistory, setIsLoadingHistory] = useState(false); // Is chat history loading?
    const [historyError, setHistoryError] = useState<string | null>(null);
    const [isPanelOpen, setIsPanelOpen] = useState(true); // Sources panel visibility

    // Refs
    const scrollAreaRef = useRef<HTMLDivElement>(null);
    // Ref to track the last chatId for which history was fetched to prevent redundant fetches
    const fetchedChatIdRef = useRef<string | 'welcome' | undefined>(undefined);

    // Effect to sync state chatId with route param chatId
    useEffect(() => {
        setChatId(chatIdParam);
    }, [chatIdParam]);

    // --- Effect to Load Chat History ---
    useEffect(() => {
        const bypassAuth = process.env.NEXT_PUBLIC_BYPASS_AUTH === 'true';
        const currentFetchTarget = chatId || 'welcome'; // Target 'welcome' if no chatId

        // 1. Skip if auth is still loading (and not bypassing)
        if (!bypassAuth && isAuthLoading) {
            console.log("ChatPage: Waiting for auth state...");
            // Optionally set loading state here, or rely on the main loading display
            // setIsLoadingHistory(true); // Can show loading specifically for history area
            return;
        }

        // 2. Skip if not authenticated (and auth has loaded)
        if (!bypassAuth && !session) {
            console.log("ChatPage: Not authenticated, cannot load history.");
            setMessages([welcomeMessage]);
            setHistoryError("Please log in to view or start chats.");
            fetchedChatIdRef.current = undefined; // Reset fetch ref
            setIsLoadingHistory(false);
            return;
        }

        // 3. Skip if this chatId (or welcome state) has already been fetched
        if (fetchedChatIdRef.current === currentFetchTarget) {
             console.log(`ChatPage: History for ${currentFetchTarget} already loaded or being loaded.`);
             // Ensure loading state is false if we skip
             if (isLoadingHistory) setIsLoadingHistory(false);
             return;
        }

        // 4. Fetch History or Reset for New Chat
        console.log(`ChatPage: Auth ready. Target: ${currentFetchTarget}. Fetching history or resetting...`);
        setIsLoadingHistory(true);
        setHistoryError(null);
        fetchedChatIdRef.current = currentFetchTarget; // Mark as being fetched

        if (chatId) {
            // Fetch history for existing chat
            getChatMessages(chatId)
                .then(apiMessages => {
                    // Sort messages by creation time (belt-and-suspenders)
                    apiMessages.sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime());
                    const mappedMessages = apiMessages.map(mapApiMessageToFrontend);
                    setMessages(mappedMessages.length > 0 ? mappedMessages : [welcomeMessage]); // Show welcome if history is empty
                    console.log(`ChatPage: History loaded for ${chatId}, ${mappedMessages.length} messages.`);
                })
                .catch(error => {
                    console.error(`ChatPage: Error loading history for ${chatId}:`, error);
                    let message = "Error loading chat history.";
                    if (error instanceof ApiError) {
                        message = error.message || message;
                        if (error.status === 404) {
                            toast.error("Chat Not Found", { description: `Chat ${chatId} not found. Starting a new chat.` });
                            router.replace('/chat'); // Redirect to new chat page
                            return; // Stop processing
                        }
                        if (error.status === 401 || error.status === 403) {
                            toast.error("Authentication Error", { description: "Session expired. Please log in again." });
                            signOut(); // Force logout on auth errors
                        }
                    } else if (error instanceof Error) { message = error.message; }
                    setHistoryError(message);
                    setMessages([welcomeMessage]); // Show welcome on error
                    toast.error("Failed to Load Chat", { description: message });
                })
                .finally(() => {
                    setIsLoadingHistory(false);
                });
        } else {
            // No chatId, reset to welcome state for a new chat
            console.log("ChatPage: No chat ID, setting welcome message.");
            setMessages([welcomeMessage]);
            setRetrievedDocs([]);
            setIsLoadingHistory(false); // Finished "loading" the welcome state
        }

    // Dependencies: Re-run when chatId, session, or auth loading state changes.
    }, [chatId, session, isAuthLoading, router, signOut, isLoadingHistory]); // Added isLoadingHistory to deps

    // --- Effect for Scrolling to Bottom ---
    useEffect(() => {
        if (scrollAreaRef.current) {
            const scrollElement = scrollAreaRef.current;
            // Use requestAnimationFrame for smoother scrolling after render
            requestAnimationFrame(() => {
                 // Scroll only if the user isn't manually scrolled up significantly
                 // (e.g., allow scrolling up by more than 100px without forcing down)
                 const isScrolledUp = scrollElement.scrollHeight - scrollElement.scrollTop - scrollElement.clientHeight > 100;
                 if (!isScrolledUp) {
                    scrollElement.scrollTo({ top: scrollElement.scrollHeight, behavior: 'smooth' });
                 }
            });
        }
    // Dependency: Run whenever messages array changes length or content, or when sending state changes.
    }, [messages, isSending]);

    // --- Function to Send a Message ---
    const handleSendMessage = useCallback(async (query: string) => {
        const bypassAuth = process.env.NEXT_PUBLIC_BYPASS_AUTH === 'true';
        const isAuthenticated = !!session || bypassAuth;

        // Basic validation
        if (!query.trim()) {
            toast.warning("Cannot send empty message.");
            return;
        }
        if (isSending) {
            toast.warning("Please wait for the previous response.", { id: 'sending-throttle'});
            return;
        }
         if (!isAuthenticated) {
             toast.error("Authentication Error", { description: "Please log in to send messages." });
             return;
         }

        // Add user message immediately to UI
        const userMessage: Message = {
            id: `client-user-${Date.now()}`, // Temporary client-side ID
            role: 'user',
            content: query,
            created_at: new Date().toISOString()
        };
        // Use functional update to ensure we're working with the latest state
        setMessages(prev => [...prev, userMessage]);
        setIsSending(true);
        setRetrievedDocs([]); // Clear previous documents

        const currentChatIdForApi = chatId || null; // Send null for new chats

        console.log(`ChatPage: Sending query to API (Chat ID: ${currentChatIdForApi || 'New'})...`);

        try {
            // Call the API
            const response = await postQuery({ query, chat_id: currentChatIdForApi });
            const returnedChatId = response.chat_id; // API MUST return the chat_id

            // Map sources and create assistant message
            const mappedSources = mapApiSourcesToFrontend(response.retrieved_documents);
            const assistantMessage: Message = {
                id: `client-assistant-${Date.now()}`, // Temporary client-side ID
                role: 'assistant',
                content: response.answer,
                sources: mappedSources,
                created_at: new Date().toISOString() // Use current time for assistant msg
            };

            // Add assistant message to state
            setMessages(prev => [...prev, assistantMessage]);
            setRetrievedDocs(mappedSources || []);

            // If it was a new chat, update URL and state without full page reload
            if (!currentChatIdForApi && returnedChatId) {
                console.log(`ChatPage: New chat created with ID: ${returnedChatId}. Updating URL.`);
                setChatId(returnedChatId); // Update state
                fetchedChatIdRef.current = returnedChatId; // Update fetch ref to prevent immediate reload
                // Use router.replace to update URL without adding to history
                router.replace(`/chat/${returnedChatId}`, { scroll: false });
            }

            // Auto-open sources panel if closed and sources were found
            if (mappedSources && mappedSources.length > 0 && !isPanelOpen) {
                setIsPanelOpen(true);
            }
             console.log(`ChatPage: Query successful. Answer received for chat ${returnedChatId}.`);

        } catch (error) {
            console.error("ChatPage: Query failed:", error);
            let errorMessage = "Sorry, an error occurred while processing your request.";
            if (error instanceof ApiError) {
                 errorMessage = error.message || `API Error (${error.status})`;
                 if (error.status === 401 || error.status === 403) {
                     errorMessage = "Authentication error. Please log in again.";
                     signOut(); // Force logout
                 }
             } else if (error instanceof Error) {
                 errorMessage = `Error: ${error.message}`;
             }

            // Add error message to chat
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
            setIsSending(false); // Reset sending state
        }
    // Dependencies: Include all state and functions used
    }, [chatId, isSending, session, router, isPanelOpen, signOut]);

    // Toggle for the sources panel
    const handlePanelToggle = () => { setIsPanelOpen(!isPanelOpen); };

    // Navigate to start a new chat
    const handleNewChat = () => {
        console.log("ChatPage: Starting new chat.");
        // Check if already on the new chat page to avoid redundant navigation
        if (pathname !== '/chat') {
             router.push('/chat');
        } else {
            // If already on /chat, just reset the state manually
            setChatId(undefined);
            setMessages([welcomeMessage]);
            setRetrievedDocs([]);
            setHistoryError(null);
            fetchedChatIdRef.current = 'welcome'; // Mark welcome state as "loaded"
            setIsLoadingHistory(false);
            console.log("ChatPage: Already on /chat, resetting state.");
        }
    };


    // --- Rendering Logic ---
    const renderChatContent = () => {
        // 1. Show loading indicator if auth is loading OR history is loading
        if (isAuthLoading || isLoadingHistory) {
            return (
                <div className="flex flex-col items-center justify-center h-full p-8 text-center">
                    <Loader2 className="h-8 w-8 animate-spin text-muted-foreground mb-4" />
                    <p className="text-muted-foreground">
                         {isAuthLoading ? "Authenticating..." : "Loading chat history..."}
                    </p>
                </div>
            );
        }

        // 2. Show error message if history loading failed
        if (historyError) {
             return (
                 <div className="flex flex-col items-center justify-center h-full p-8 text-center">
                     <AlertCircle className="h-8 w-8 text-destructive mb-4" />
                     <p className="text-destructive font-medium mb-2">Error Loading Chat</p>
                     <p className="text-sm text-muted-foreground mb-4">{historyError}</p>
                     {/* Optionally add a retry button if error is not auth-related */}
                     {/* <Button variant="outline" size="sm" onClick={retryFetch}>Retry</Button> */}
                 </div>
             );
         }

        // 3. Render messages
        // Filter out the initial welcome message if other messages exist
        const messagesToRender = messages.filter(m => !(m.id === 'initial-welcome' && messages.length > 1));
        return (
             <div className="space-y-4 pr-4 pb-4"> {/* Padding for scrollbar and input area */}
                 {messagesToRender.map((message) => (
                     <ChatMessage key={message.id} message={message} />
                 ))}
                 {/* Skeleton "thinking" indicator while waiting for response */}
                 {isSending && (
                     <div className="flex items-start space-x-3">
                         <Skeleton className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                             <BrainCircuit className="h-5 w-5 text-primary"/>
                         </Skeleton>
                         <div className="space-y-2 flex-1 pt-1">
                              <Skeleton className="h-4 w-16" />
                         </div>
                     </div>
                 )}
             </div>
        );
    };

    return (
        <div className="flex flex-col h-full"> {/* Ensure outer div takes full height */}
            {/* Button to start a new chat */}
            <div className="absolute top-2 left-2 z-10">
                 <Button
                    variant="outline"
                    size="sm"
                    onClick={handleNewChat}
                    disabled={isSending || isLoadingHistory || isAuthLoading} // Disable during critical operations
                    title="Start a new chat"
                 >
                     <PlusCircle className="h-4 w-4 mr-2" />
                     New Chat
                 </Button>
             </div>

            <ResizablePanelGroup direction="horizontal" className="flex-1"> {/* Panel group takes remaining height */}
                <ResizablePanel defaultSize={isPanelOpen ? 70 : 100} minSize={30}>
                    <div className="flex h-full flex-col relative">
                        {/* Button to toggle sources panel */}
                        <div className="absolute top-2 right-2 z-10">
                            <Button onClick={handlePanelToggle} variant="ghost" size="icon" aria-label={isPanelOpen ? 'Close Sources Panel' : 'Open Sources Panel'}>
                                {isPanelOpen ? <PanelRightClose className="h-5 w-5" /> : <PanelRightOpen className="h-5 w-5" />}
                            </Button>
                        </div>

                        {/* Chat Messages Area */}
                        <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
                            {renderChatContent()}
                        </ScrollArea>

                        {/* Chat Input Area */}
                        <div className="border-t p-4 bg-muted/30 shrink-0">
                            <ChatInput
                                onSendMessage={handleSendMessage}
                                isLoading={isSending || isLoadingHistory || isAuthLoading} // Disable input comprehensively
                            />
                        </div>
                    </div>
                </ResizablePanel>

                {/* Sources Panel (Conditional) */}
                {isPanelOpen && (
                    <>
                        <ResizableHandle withHandle />
                        <ResizablePanel defaultSize={30} minSize={20} maxSize={50}>
                            <RetrievedDocumentsPanel
                                documents={retrievedDocs}
                                isLoading={isSending} // Show loading in panel only when actively waiting for response
                            />
                        </ResizablePanel>
                    </>
                )}
            </ResizablePanelGroup>
        </div>
    );
}