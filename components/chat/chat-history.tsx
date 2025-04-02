// File: components/chat/chat-history.tsx
"use client";

import React, { useState, useEffect, useCallback } from 'react'; // Importar React solo una vez
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
// Importar Button Y buttonVariants correctamente
import { Button, buttonVariants } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
// Importar iconos solo una vez
import { MessageSquareText, Trash2, Loader2, AlertCircle, RefreshCw } from 'lucide-react';
import { cn } from '@/lib/utils';
import { getChats, deleteChat, ChatSummary, ApiError } from '@/lib/api';
import { useAuth } from '@/lib/hooks/useAuth';
import { toast } from "sonner";
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

export function ChatHistory() {
  const pathname = usePathname();
  const router = useRouter();
  const { token } = useAuth(); // O session del useAuth refactorizado
  const [chats, setChats] = useState<ChatSummary[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [chatToDelete, setChatToDelete] = useState<ChatSummary | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isAlertOpen, setIsAlertOpen] = useState(false);

  const fetchChatHistory = useCallback(async (showToast = false) => {
    // Usar 'token' o 'session' dependiendo de cómo quede useAuth
    const bypassAuth = process.env.NEXT_PUBLIC_BYPASS_AUTH === 'true';
    const isAuthenticated = token || bypassAuth; // Considerar bypass

    if (!isAuthenticated) {
        console.log("ChatHistory: Not authenticated or bypassed, skipping fetch.");
        setChats([]);
        setIsLoading(false);
        if (!bypassAuth) setError("Please log in to view chat history.");
        return;
    }

    console.log("ChatHistory: Fetching chat list...");
    setIsLoading(true);
    setError(null);
    try {
      const fetchedChats = await getChats();
      fetchedChats.sort((a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime());
      setChats(fetchedChats);
       if (showToast) toast.success("Chat History Refreshed");
    } catch (err) {
      console.error("Failed to fetch chat history:", err);
      let message = "Could not load chat history.";
       if (err instanceof ApiError) {
         message = err.message || message;
         // if (err.status === 401 && !bypassAuth) { // Solo si no estamos en bypass
         if (err.status === 401) { // Manejar 401 incluso en bypass? Podría ser un token inválido real
             message = "Session expired or invalid. Please log in again.";
             // Considerar llamar a signOut() aquí si se detecta 401
         }
       } else if (err instanceof Error) { message = err.message; }
      setError(message);
      toast.error("Error Loading Chats", { description: message });
    } finally {
      setIsLoading(false);
    }
  }, [token]); // Depender de token (o session)

  useEffect(() => {
    fetchChatHistory(false);
  }, [fetchChatHistory]);

  const openDeleteConfirmation = (chat: ChatSummary, event: React.MouseEvent) => {
     event.stopPropagation();
     event.preventDefault();
     setChatToDelete(chat);
     setIsAlertOpen(true);
  };

  const handleDeleteConfirmed = async () => {
    if (!chatToDelete) return;
    console.log("Deleting chat:", chatToDelete.id);
    setIsDeleting(true);
    try {
        await deleteChat(chatToDelete.id);
        setChats(prev => prev.filter(chat => chat.id !== chatToDelete.id));
        toast.success("Chat Deleted", { description: `Chat "${chatToDelete.title || chatToDelete.id.substring(0,8)}" removed.`});
        const currentChatId = pathname.split('/').pop();
        if (currentChatId === chatToDelete.id) {
             router.push('/chat');
        }
    } catch (err) {
        console.error("Failed to delete chat:", err);
        let message = "Could not delete chat.";
        if (err instanceof ApiError) message = err.message || message;
        else if (err instanceof Error) message = err.message;
        toast.error("Deletion Failed", { description: message });
    } finally {
        setIsDeleting(false);
        setIsAlertOpen(false);
        setChatToDelete(null);
    }
  };

  // --- RENDER CONTENT ---
  const renderContent = () => {
    const bypassAuth = process.env.NEXT_PUBLIC_BYPASS_AUTH === 'true';
    const isAuthenticated = token || bypassAuth;

    if (!isAuthenticated && !isLoading && !bypassAuth) {
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
    if (error && !isLoading) {
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
    if (chats.length === 0 && !isLoading) {
        return <p className="text-sm text-muted-foreground px-2 py-4 text-center">No chat history yet.</p>;
    }

    // Render chat list
    return chats.map((chat) => {
        const isActive = pathname === `/chat/${chat.id}`;
        const displayTitle = chat.title || `Chat ${chat.id.substring(0, 8)}...`;
        return (
            // Contenedor principal para cada fila de chat
            <div key={chat.id} className="flex items-center group w-full">
                {/* Enlace que ocupa la mayor parte del espacio */}
                <Link href={`/chat/${chat.id}`} passHref legacyBehavior>
                    <a
                        className={cn(
                            buttonVariants({ variant: isActive ? "secondary" : "ghost", size: "default" }),
                            "flex-1 justify-start h-10 overflow-hidden mr-1", // Ocupa espacio, justifica a la izquierda
                            isActive ? "bg-muted hover:bg-muted" : ""
                        )}
                        title={displayTitle}
                    >
                        <MessageSquareText className="h-4 w-4 mr-2 flex-shrink-0" />
                        <span className="truncate flex-1 text-sm">{displayTitle}</span>
                    </a>
                </Link>
                {/* Botón de eliminar (Trigger del AlertDialog) */}
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
            </div> // Cierre del div contenedor de la fila
        );
    });
  };
  // --- FIN RENDER CONTENT ---

  return (
     <AlertDialog open={isAlertOpen} onOpenChange={setIsAlertOpen}>
        <ScrollArea className="h-full flex-1">
            <div className="flex flex-col gap-1 p-2">
                {renderContent()}
            </div>
        </ScrollArea>

        <AlertDialogContent>
            <AlertDialogHeader>
                <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete the chat
                    <span className="font-medium"> "{chatToDelete?.title || chatToDelete?.id?.substring(0,8)}"</span> and all its messages.
                </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
                <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
                <AlertDialogAction
                    onClick={handleDeleteConfirmed}
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