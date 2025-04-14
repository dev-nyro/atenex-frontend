// File: components/chat/chat-history.tsx
// Purpose: Displays the list of past chats in the sidebar.
"use client";

import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Button, buttonVariants } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { MessageSquareText, Trash2, Loader2, AlertCircle, RefreshCw } from 'lucide-react';
import { cn } from '@/lib/utils';
import { getChats, deleteChat, ChatSummary, ApiError } from '@/lib/api'; // Use API functions
import { useAuth } from '@/lib/hooks/useAuth'; // Import the CORRECTED auth hook
import { toast } from "sonner"; // Use sonner
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Skeleton } from '@/components/ui/skeleton'; // Import Skeleton

export function ChatHistory() {
    const pathname = usePathname();
    const router = useRouter();
    // --- CORRECTION: Destructure 'user' instead of 'session' ---
    const { user, isLoading: isAuthLoading, signOut } = useAuth();
    // ----------------------------------------------------------

    // Component State
    const [chats, setChats] = useState<ChatSummary[]>([]);
    const [isLoading, setIsLoading] = useState(false); // Loading state specific to this component
    const [error, setError] = useState<string | null>(null);
    const [chatToDelete, setChatToDelete] = useState<ChatSummary | null>(null);
    const [isDeleting, setIsDeleting] = useState(false);
    const [isAlertOpen, setIsAlertOpen] = useState(false);

    // --- Function to Fetch Chat History ---
    const fetchChatHistory = useCallback(async (showToast = false) => {
         const bypassAuth = process.env.NEXT_PUBLIC_BYPASS_AUTH === 'true';
         // --- CORRECTION: Check 'user' for authentication ---
         const isAuthenticated = !!user || bypassAuth;
         // ---------------------------------------------------

        // Skip if not authenticated (and auth check is complete)
        if (!isAuthLoading && !isAuthenticated) {
            console.log("ChatHistory: Not authenticated, clearing history.");
            setChats([]);
            setError(null); // Clear previous errors
            setIsLoading(false); // Ensure loading is false
            return;
        }

        // Skip if auth is still loading (and not bypassing)
        if (!bypassAuth && isAuthLoading) {
             console.log("ChatHistory: Waiting for auth state...");
             // Set loading true here to show skeleton while waiting for auth
             setIsLoading(true);
             return;
        }

        console.log("ChatHistory: Auth ready. Fetching chat list...");
        setIsLoading(true); // Start loading history list
        setError(null);

        try {
            const fetchedChats = await getChats();
            // Sort by most recently updated
            fetchedChats.sort((a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime());
            setChats(fetchedChats);
            console.log(`ChatHistory: Fetched ${fetchedChats.length} chats.`);
            if (showToast) toast.success("Chat History Refreshed");
        } catch (err) {
            console.error("ChatHistory: Failed to fetch chat history:", err);
            let message = "Could not load chat history.";
            if (err instanceof ApiError) {
                message = err.message || message;
                if (err.status === 401 || err.status === 403) {
                    message = "Session expired or invalid. Please log in again.";
                    signOut(); // Force logout on auth error
                }
                 // (+) Añadir manejo específico para 422 si aún ocurre
                 else if (err.status === 422) {
                     message = `Failed to process request: ${err.message}`;
                 }
            } else if (err instanceof Error) { message = err.message; }
            setError(message);
            setChats([]); // Clear chats on error
            if (showToast) toast.error("Error Loading Chats", { description: message });
        } finally {
            setIsLoading(false); // Finish loading history list
        }
    // --- CORRECTION: Depend on 'user' instead of 'session' ---
    // Dependencies: Re-run if user or auth loading state changes. Include signOut.
    }, [user, isAuthLoading, signOut]);
    // ---------------------------------------------------------

    // --- Effect to Fetch on Mount and Auth Change ---
    useEffect(() => {
        // Fetch history immediately if auth is ready or bypassed,
        // or wait for auth loading to finish.
        fetchChatHistory(false); // Fetch without toast on initial load/auth change
    }, [fetchChatHistory]); // Depend only on the memoized fetch function

    // --- Delete Confirmation Handlers ---
    const openDeleteConfirmation = (chat: ChatSummary, event: React.MouseEvent) => {
        event.stopPropagation(); // Prevent link navigation
        event.preventDefault();
        setChatToDelete(chat);
        setIsAlertOpen(true);
    };

    const handleDeleteConfirmed = async () => {
        if (!chatToDelete) return;
        setIsDeleting(true);
        try {
            await deleteChat(chatToDelete.id);
            // Optimistically update UI
            setChats(prev => prev.filter(chat => chat.id !== chatToDelete.id));
            toast.success("Chat Deleted", { description: `Chat "${chatToDelete.title || chatToDelete.id.substring(0, 8)}" removed.` });

            // If the currently viewed chat was deleted, navigate to new chat page
            const currentChatId = pathname.split('/').pop();
            if (currentChatId === chatToDelete.id) {
                router.push('/chat');
            }
        } catch (err) {
            console.error("ChatHistory: Failed to delete chat:", err);
            let message = "Could not delete chat.";
            if (err instanceof ApiError) {
                message = err.message || message;
                if (err.status === 401 || err.status === 403) signOut(); // Logout on auth error
            } else if (err instanceof Error) { message = err.message; }
            toast.error("Deletion Failed", { description: message });
            // Optional: Re-fetch history on error to ensure consistency, or rely on user refresh
            // fetchChatHistory(false);
        } finally {
            setIsDeleting(false);
            setIsAlertOpen(false);
            setChatToDelete(null);
        }
    };
    // --- End Delete Handlers ---

    // --- Render Logic Helper ---
    const renderContent = () => {
        const bypassAuth = process.env.NEXT_PUBLIC_BYPASS_AUTH === 'true';
        // --- CORRECTION: Check 'user' for authentication ---
        const isAuthenticated = !!user || bypassAuth;
        // ---------------------------------------------------

        // 1. Loading State (Auth or History)
        if (isLoading || (!bypassAuth && isAuthLoading)) {
            return (
                <div className="space-y-1 p-2">
                    {Array.from({ length: 4 }).map((_, i) => (
                         <Skeleton key={i} className="h-8 w-full rounded" />
                    ))}
                 </div>
            );
        }

        // 2. Not Authenticated
        if (!isAuthenticated) {
            return (
                <div className="px-2 py-4 text-center text-muted-foreground">
                    <p className="text-xs mb-2">Log in to view chat history.</p>
                    {/* <Button size="xs" variant="outline" onClick={() => router.push('/login')}>Login</Button> */}
                </div>
            );
        }

        // 3. Error State
        if (error) {
            return (
                <div className="px-2 py-4 text-center text-destructive">
                    <AlertCircle className="mx-auto h-5 w-5 mb-1" />
                    <p className="text-xs mb-2">{error}</p>
                    <Button variant="outline" size="sm" onClick={() => fetchChatHistory(true)}>
                        <RefreshCw className="mr-1 h-3 w-3"/> Retry
                    </Button>
                </div>
            );
        }

        // 4. Empty State
        if (chats.length === 0) {
            return <p className="text-xs text-muted-foreground px-2 py-4 text-center">No previous chats found.</p>;
        }

        // 5. Chat List
        return chats.map((chat) => {
            const isActive = pathname === `/chat/${chat.id}`;
            const displayTitle = chat.title || `Chat ${chat.id.substring(0, 8)}...`;
            const displayDate = new Date(chat.updated_at).toLocaleDateString(undefined, { month: 'short', day: 'numeric' });

            return (
                <div key={chat.id} className="relative group w-full pr-8"> {/* Space for delete button */}
                    <Link href={`/chat/${chat.id}`} passHref legacyBehavior>
                        <a
                            className={cn(
                                buttonVariants({ variant: isActive ? "secondary" : "ghost", size: "sm" }),
                                "w-full justify-start h-auto py-1.5 px-2 overflow-hidden text-left rounded", // Ensure rounded corners
                                isActive ? "bg-muted hover:bg-muted font-medium" : "hover:bg-muted/50"
                            )}
                            title={displayTitle}
                        >
                            <MessageSquareText className="h-4 w-4 mr-2 flex-shrink-0" />
                            <span className="truncate flex-1 text-sm">{displayTitle}</span>
                            <span className="text-xs text-muted-foreground/70 ml-2 flex-shrink-0">{displayDate}</span>
                        </a>
                    </Link>
                    {/* Delete Button Trigger */}
                    <AlertDialogTrigger asChild>
                        <Button
                            variant="ghost" size="icon"
                            className={cn(
                                "absolute right-0 top-1/2 -translate-y-1/2 h-7 w-7 p-0 opacity-0 group-hover:opacity-100 transition-opacity duration-150 flex-shrink-0 focus-visible:opacity-100",
                                isDeleting && chatToDelete?.id === chat.id ? "opacity-50 cursor-not-allowed" : ""
                            )}
                            onClick={(e) => openDeleteConfirmation(chat, e)}
                            aria-label={`Delete chat: ${displayTitle}`}
                            disabled={isDeleting && chatToDelete?.id === chat.id}
                        >
                            {isDeleting && chatToDelete?.id === chat.id ? (
                                <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
                            ) : (
                                <Trash2 className="h-4 w-4 text-muted-foreground hover:text-destructive" />
                            )}
                        </Button>
                    </AlertDialogTrigger>
                </div>
            );
        });
    };
    // --- End Render Logic Helper ---

    return (
        <AlertDialog open={isAlertOpen} onOpenChange={setIsAlertOpen}>
            {/* Main container for history list */}
            <div className="flex flex-col h-full">
                 {/* Header with Title and Refresh Button */}
                 <div className="flex justify-between items-center p-2 border-b shrink-0">
                     <h3 className="px-1 text-xs font-semibold uppercase text-muted-foreground tracking-wider">
                         Chat History
                     </h3>
                     <Button
                         variant="ghost"
                         size="sm" // Make button smaller
                         className="p-1 h-6 w-6" // Adjust padding and size
                         onClick={() => fetchChatHistory(true)}
                         disabled={isLoading || isAuthLoading}
                         title="Refresh chat history"
                     >
                         <RefreshCw className={cn("h-3.5 w-3.5", (isLoading || isAuthLoading) && "animate-spin")} />
                         <span className="sr-only">Refresh History</span>
                     </Button>
                 </div>
                 {/* Scrollable Area for Chat List */}
                 <ScrollArea className="flex-1">
                     <div className="flex flex-col gap-0.5 p-2">
                         {renderContent()}
                     </div>
                 </ScrollArea>
            </div>

            {/* Alert Dialog Content (Rendered in a portal) */}
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete the chat
                        <span className="font-medium"> "{chatToDelete?.title || chatToDelete?.id?.substring(0, 8)}"</span> and all its messages.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                        onClick={handleDeleteConfirmed}
                        disabled={isDeleting}
                        className={buttonVariants({ variant: "destructive" })} // Use destructive variant
                    >
                        {isDeleting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                        Delete Permanently
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}