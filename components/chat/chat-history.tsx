// File: components/chat/chat-history.tsx
// File: components/chat/chat-history.tsx
"use client";

import React, { useState, useEffect, useCallback } from 'react';
import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { MessageSquareText, Trash2, Loader2, AlertCircle, RefreshCw } from 'lucide-react';
import { MessageSquareText, Trash2, Loader2, AlertCircle, RefreshCw } from 'lucide-react';
import { cn } from '@/lib/utils';
import { getChats, deleteChat, ChatSummary, ApiError } from '@/lib/api';
import { useAuth } from '@/lib/hooks/useAuth'; // To ensure user is logged in
import { toast } from "sonner";
// Correct import path for AlertDialog
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
} from "@/components/ui/alert-dialog"; // Corrected import path


export function ChatHistory() {
  const pathname = usePathname();
  const router = useRouter(); // Initialize router
  const { token } = useAuth(); // Get token to know if user is authenticated
  const [chats, setChats] = useState<ChatSummary[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [chatToDelete, setChatToDelete] = useState<ChatSummary | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isAlertOpen, setIsAlertOpen] = useState(false); // Control alert dialog visibility

  const fetchChatHistory = useCallback(async (showToast = false) => {
    if (!token) {
        console.log("ChatHistory: No token, skipping fetch.");
        setChats([]); // Clear chats if not logged in
        setIsLoading(false);
        setError("Please log in to view chat history."); // Inform user
        return;
    }
    console.log("ChatHistory: Fetching chat list...");
    setIsLoading(true);
    setError(null); // Clear previous errors
    try {
      const fetchedChats = await getChats();
      // Sort chats by updated_at descending (newest first)
      fetchedChats.sort((a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime());
      setChats(fetchedChats);
       if (showToast) {
           toast.success("Chat History Refreshed");
       }
    } catch (err) {
      console.error("Failed to fetch chat history:", err);
      let message = "Could not load chat history.";
       if (err instanceof ApiError) {
         message = err.message || message;
         if (err.status === 401) { // Handle unauthorized specifically
             message = "Session expired or invalid. Please log in again.";
             // Optionally trigger logout here
         }
       } else if (err instanceof Error) {
         message = err.message;
       }
      setError(message);
      toast.error("Error Loading Chats", { description: message });
    } finally {
      setIsLoading(false);
    }
  }, [token]); // Depend only on token

  useEffect(() => {
    fetchChatHistory(false);
  }, [fetchChatHistory]); // Fetch when component mounts or token changes

  const openDeleteConfirmation = (chat: ChatSummary, event: React.MouseEvent) => {
     event.stopPropagation();
  const router = useRouter(); // Initialize router
  const { token } = useAuth(); // Get token to know if user is authenticated
  const [chats, setChats] = useState<ChatSummary[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [chatToDelete, setChatToDelete] = useState<ChatSummary | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isAlertOpen, setIsAlertOpen] = useState(false); // Control alert dialog visibility

  const fetchChatHistory = useCallback(async (showToast = false) => {
    if (!token) {
        console.log("ChatHistory: No token, skipping fetch.");
        setChats([]); // Clear chats if not logged in
        setIsLoading(false);
        setError("Please log in to view chat history."); // Inform user
        return;
    }
    console.log("ChatHistory: Fetching chat list...");
    setIsLoading(true);
    setError(null); // Clear previous errors
    try {
      const fetchedChats = await getChats();
      // Sort chats by updated_at descending (newest first)
      fetchedChats.sort((a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime());
      setChats(fetchedChats);
       if (showToast) {
           toast.success("Chat History Refreshed");
       }
    } catch (err) {
      console.error("Failed to fetch chat history:", err);
      let message = "Could not load chat history.";
       if (err instanceof ApiError) {
         message = err.message || message;
         if (err.status === 401) { // Handle unauthorized specifically
             message = "Session expired or invalid. Please log in again.";
             // Optionally trigger logout here
         }
       } else if (err instanceof Error) {
         message = err.message;
       }
      setError(message);
      toast.error("Error Loading Chats", { description: message });
    } finally {
      setIsLoading(false);
    }
  }, [token]); // Depend only on token

  useEffect(() => {
    fetchChatHistory(false);
  }, [fetchChatHistory]); // Fetch when component mounts or token changes

  const openDeleteConfirmation = (chat: ChatSummary, event: React.MouseEvent) => {
     event.stopPropagation();
     event.preventDefault();
     setChatToDelete(chat);
     setIsAlertOpen(true); // Open the dialog
  };

  const handleDeleteConfirmed = async () => {
    if (!chatToDelete) return;

    console.log("Deleting chat:", chatToDelete.id);
    setIsDeleting(true);
    try {
        await deleteChat(chatToDelete.id);
        // Optimistically update UI or refetch
        setChats(prev => prev.filter(chat => chat.id !== chatToDelete.id));
        toast.success("Chat Deleted", { description: `Chat "${chatToDelete.title || chatToDelete.id.substring(0,8)}" removed.`});

        // If the currently active chat is deleted, navigate to the base chat page
        const currentChatId = pathname.split('/').pop();
        if (currentChatId === chatToDelete.id) {
             console.log("Active chat deleted, navigating to /chat");
             router.push('/chat'); // Use Next.js router for navigation
        }
    } catch (err) {
        console.error("Failed to delete chat:", err);
        let message = "Could not delete chat.";
        if (err instanceof ApiError) {
            message = err.message || message;
        } else if (err instanceof Error) {
            message = err.message;
        }
        toast.error("Deletion Failed", { description: message });
    } finally {
        setIsDeleting(false);
        setIsAlertOpen(false); // Close the dialog
        setChatToDelete(null); // Clear the chat to delete
    }
  };

  const renderContent = () => {
    if (!token && !isLoading) { // Show login prompt if not logged in and not loading
         return (
             <div className="px-2 py-4 text-center text-muted-foreground">
                 <p className="text-sm mb-2">Please log in to view or start chats.</p>
                 <Button size="sm" onClick={() => router.push('/login')}>Login</Button>
             </div>
         );
     }

    if (isLoading) {
        return <div className="flex justify-center items-center h-20"><Loader2 className="h-6 w-6 animate-spin text-muted-foreground" /></div>;
    }
    if (error && !isLoading) { // Show error only if not loading
        return (
            <div className="px-2 py-4 text-center text-destructive">
                <AlertCircle className="mx-auto h-6 w-6 mb-1" />
                <p className="text-sm mb-2">{error}</p>
                <Button variant="outline" size="sm" onClick={() => fetchChatHistory(true)}>
                    <RefreshCw className="mr-1 h-3 w-3"/> Retry
                </Button>
            </div>
        );
    }
    if (chats.length === 0 && !isLoading) { // Show empty state only if not loading
        return <p className="text-sm text-muted-foreground px-2 py-4 text-center">No chat history yet.</p>;
    }

    // Render chat list
    return chats.map((chat) => {
        const isActive = pathname === `/chat/${chat.id}`;
        const displayTitle = chat.title || `Chat ${chat.id.substring(0, 8)}...`;
        return (
            // Use AlertDialogTrigger on the delete button, not the whole Link
            <div key={chat.id} className="flex items-center group">
                <Link href={`/chat/${chat.id}`} passHref legacyBehavior>
                    <a
                        className={cn(
                            // *** CORREGIDO: Ahora buttonVariants está importado y se puede usar ***
                            buttonVariants({ variant: isActive ? "secondary" : "ghost", size: "default" }),
                            "w-full justify-start h-10 flex-1 overflow-hidden mr-1", // Adjust styling
                            isActive ? "bg-muted hover:bg-muted" : ""
                        )}
                        title={displayTitle}
                    >
     setChatToDelete(chat);
     setIsAlertOpen(true); // Open the dialog
  };

  const handleDeleteConfirmed = async () => {
    if (!chatToDelete) return;

    console.log("Deleting chat:", chatToDelete.id);
    setIsDeleting(true);
    try {
        await deleteChat(chatToDelete.id);
        // Optimistically update UI or refetch
        setChats(prev => prev.filter(chat => chat.id !== chatToDelete.id));
        toast.success("Chat Deleted", { description: `Chat "${chatToDelete.title || chatToDelete.id.substring(0,8)}" removed.`});

        // If the currently active chat is deleted, navigate to the base chat page
        const currentChatId = pathname.split('/').pop();
        if (currentChatId === chatToDelete.id) {
             console.log("Active chat deleted, navigating to /chat");
             router.push('/chat'); // Use Next.js router for navigation
        }
    } catch (err) {
        console.error("Failed to delete chat:", err);
        let message = "Could not delete chat.";
        if (err instanceof ApiError) {
            message = err.message || message;
        } else if (err instanceof Error) {
            message = err.message;
        }
        toast.error("Deletion Failed", { description: message });
    } finally {
        setIsDeleting(false);
        setIsAlertOpen(false); // Close the dialog
        setChatToDelete(null); // Clear the chat to delete
    }
  };

  const renderContent = () => {
    if (!token && !isLoading) { // Show login prompt if not logged in and not loading
         return (
             <div className="px-2 py-4 text-center text-muted-foreground">
                 <p className="text-sm mb-2">Please log in to view or start chats.</p>
                 <Button size="sm" onClick={() => router.push('/login')}>Login</Button>
             </div>
         );
     }

    if (isLoading) {
        return <div className="flex justify-center items-center h-20"><Loader2 className="h-6 w-6 animate-spin text-muted-foreground" /></div>;
    }
    if (error && !isLoading) { // Show error only if not loading
        return (
            <div className="px-2 py-4 text-center text-destructive">
                <AlertCircle className="mx-auto h-6 w-6 mb-1" />
                <p className="text-sm mb-2">{error}</p>
                <Button variant="outline" size="sm" onClick={() => fetchChatHistory(true)}>
                    <RefreshCw className="mr-1 h-3 w-3"/> Retry
                </Button>
            </div>
        );
    }
    if (chats.length === 0 && !isLoading) { // Show empty state only if not loading
        return <p className="text-sm text-muted-foreground px-2 py-4 text-center">No chat history yet.</p>;
    }

    // Render chat list
    return chats.map((chat) => {
        const isActive = pathname === `/chat/${chat.id}`;
        const displayTitle = chat.title || `Chat ${chat.id.substring(0, 8)}...`;
        return (
            // Use AlertDialogTrigger on the delete button, not the whole Link
            <div key={chat.id} className="flex items-center group">
                <Link href={`/chat/${chat.id}`} passHref legacyBehavior>
                    <a
                        className={cn(
                            // *** CORREGIDO: Ahora buttonVariants está importado y se puede usar ***
                            buttonVariants({ variant: isActive ? "secondary" : "ghost", size: "default" }),
                            "w-full justify-start h-10 flex-1 overflow-hidden mr-1", // Adjust styling
                            isActive ? "bg-muted hover:bg-muted" : ""
                        )}
                        title={displayTitle}
                    >
                        <MessageSquareText className="h-4 w-4 mr-2 flex-shrink-0" />
                        <span className="truncate flex-1 text-sm">{displayTitle}</span>
                    </a>
                </Link>
                <AlertDialogTrigger asChild>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity duration-150 flex-shrink-0 focus-visible:opacity-100"
                        onClick={(e) => openDeleteConfirmation(chat, e)}
                        aria-label={`Delete chat: ${displayTitle}`}
                    >
                        <Trash2 className="h-4 w-4 text-muted-foreground hover:text-destructive" />
                    </Button>
                </AlertDialogTrigger>
            </div>
        );
    });
  };

  return (
     // Wrap with AlertDialog component, controlled by isAlertOpen state
     <AlertDialog open={isAlertOpen} onOpenChange={setIsAlertOpen}>
        <ScrollArea className="h-full flex-1"> {/* Let parent control height */}
            <div className="flex flex-col gap-1 p-2">
                {renderContent()}
            </div>
        </ScrollArea>

        {/* Dialog Content - Placed outside the loop */}
        <AlertDialogContent>
            <AlertDialogHeader>
                <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete the chat
                    <span className="font-medium"> "{chatToDelete?.title || chatToDelete?.id?.substring(0,8)}"</span> and all its messages.
                </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
                {/* Cancel button now correctly uses onOpenChange via AlertDialogCancel */}
                <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
                <AlertDialogAction
                    onClick={handleDeleteConfirmed} // Changed to trigger confirmed delete
                    disabled={isDeleting}
                    className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                >
                    {isDeleting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Delete"}
                </AlertDialogAction>
            </AlertDialogFooter>
        </AlertDialogContent>
    </AlertDialog>
                        <span className="truncate flex-1 text-sm">{displayTitle}</span>
                    </a>
                </Link>
                <AlertDialogTrigger asChild>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity duration-150 flex-shrink-0 focus-visible:opacity-100"
                        onClick={(e) => openDeleteConfirmation(chat, e)}
                        aria-label={`Delete chat: ${displayTitle}`}
                    >
                        <Trash2 className="h-4 w-4 text-muted-foreground hover:text-destructive" />
                    </Button>
                </AlertDialogTrigger>
            </div>
        );
    });
  };

  return (
     // Wrap with AlertDialog component, controlled by isAlertOpen state
     <AlertDialog open={isAlertOpen} onOpenChange={setIsAlertOpen}>
        <ScrollArea className="h-full flex-1"> {/* Let parent control height */}
            <div className="flex flex-col gap-1 p-2">
                {renderContent()}
            </div>
        </ScrollArea>

        {/* Dialog Content - Placed outside the loop */}
        <AlertDialogContent>
            <AlertDialogHeader>
                <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete the chat
                    <span className="font-medium"> "{chatToDelete?.title || chatToDelete?.id?.substring(0,8)}"</span> and all its messages.
                </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
                {/* Cancel button now correctly uses onOpenChange via AlertDialogCancel */}
                <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
                <AlertDialogAction
                    onClick={handleDeleteConfirmed} // Changed to trigger confirmed delete
                    disabled={isDeleting}
                    className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                >
                    {isDeleting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Delete"}
                </AlertDialogAction>
            </AlertDialogFooter>
        </AlertDialogContent>
    </AlertDialog>
  );
}