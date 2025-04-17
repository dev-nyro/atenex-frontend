// File: components/chat/chat-history.tsx
"use client";

import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Button, buttonVariants } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
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
import { Skeleton } from '@/components/ui/skeleton';

export function ChatHistory() {
    const pathname = usePathname();
    const router = useRouter();
    const { user, isLoading: isAuthLoading, signOut } = useAuth();

    const [chats, setChats] = useState<ChatSummary[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [chatToDelete, setChatToDelete] = useState<ChatSummary | null>(null);
    const [isDeleting, setIsDeleting] = useState(false);
    const [isAlertOpen, setIsAlertOpen] = useState(false);

    const fetchChatHistory = useCallback(async (showToast = false) => {
        const bypassAuth = process.env.NEXT_PUBLIC_BYPASS_AUTH === 'true';
        const isAuthenticated = !!user || bypassAuth;

        if (!isAuthLoading && !isAuthenticated) {
            console.log("ChatHistory: Not authenticated, clearing history.");
            setChats([]);
            setError(null);
            setIsLoading(false);
            return;
        }

        if (!bypassAuth && isAuthLoading) {
            console.log("ChatHistory: Waiting for auth state...");
            setIsLoading(true);
            return;
        }

        console.log("ChatHistory: Auth ready. Fetching chat list...");
        setIsLoading(true);
        setError(null);

        try {
            const fetchedChats = await getChats();
            fetchedChats.sort((a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime());
            setChats(fetchedChats);
            console.log(`ChatHistory: Fetched ${fetchedChats.length} chats.`);
            // MODIFICADO: Toast traducido
            if (showToast) toast.success("Historial de chats actualizado");
        } catch (err) {
            console.error("ChatHistory: Failed to fetch chat history:", err);
            // MODIFICADO: Mensajes de error traducidos
            let message = "No se pudo cargar el historial de chats.";
            if (err instanceof ApiError) {
                message = err.message || message;
                if (err.status === 401 || err.status === 403) {
                    message = "Sesión expirada o inválida. Por favor, inicia sesión de nuevo.";
                    signOut();
                } else if (err.status === 422) {
                    message = `Fallo al procesar la solicitud: ${err.message}`;
                }
            } else if (err instanceof Error) { message = err.message; }
            setError(message);
            setChats([]);
            if (showToast) toast.error("Error al Cargar Chats", { description: message });
        } finally {
            setIsLoading(false);
        }
    }, [user, isAuthLoading, signOut]);

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
        setIsDeleting(true);
        try {
            await deleteChat(chatToDelete.id);
            setChats(prev => prev.filter(chat => chat.id !== chatToDelete.id));
            // MODIFICADO: Toast traducido
            toast.success("Chat Eliminado", { description: `Chat "${chatToDelete.title || chatToDelete.id.substring(0, 8)}" eliminado.` });

            const currentChatId = pathname.split('/').pop();
            if (currentChatId === chatToDelete.id) {
                router.push('/chat');
            }
        } catch (err) {
            console.error("ChatHistory: Failed to delete chat:", err);
            // MODIFICADO: Mensajes de error traducidos
            let message = "No se pudo eliminar el chat.";
            if (err instanceof ApiError) {
                message = err.message || message;
                if (err.status === 401 || err.status === 403) signOut();
            } else if (err instanceof Error) { message = err.message; }
            toast.error("Fallo al Eliminar", { description: message });
        } finally {
            setIsDeleting(false);
            setIsAlertOpen(false);
            setChatToDelete(null);
        }
    };

    const renderContent = () => {
        const bypassAuth = process.env.NEXT_PUBLIC_BYPASS_AUTH === 'true';
        const isAuthenticated = !!user || bypassAuth;

        if (isLoading || (!bypassAuth && isAuthLoading)) {
            return (
                <div className="space-y-1 p-2">
                    {Array.from({ length: 4 }).map((_, i) => (
                         <Skeleton key={i} className="h-8 w-full rounded" />
                    ))}
                 </div>
            );
        }

        if (!isAuthenticated) {
            return (
                <div className="px-2 py-4 text-center text-muted-foreground">
                    {/* MODIFICADO: Texto traducido */}
                    <p className="text-xs mb-2">Inicia sesión para ver el historial.</p>
                </div>
            );
        }

        if (error) {
            return (
                <div className="px-2 py-4 text-center text-destructive">
                    <AlertCircle className="mx-auto h-5 w-5 mb-1" />
                    <p className="text-xs mb-2">{error}</p>
                    {/* MODIFICADO: Texto traducido */}
                    <Button variant="outline" size="sm" onClick={() => fetchChatHistory(true)}>
                        <RefreshCw className="mr-1 h-3 w-3"/> Reintentar
                    </Button>
                </div>
            );
        }

        if (chats.length === 0) {
            // MODIFICADO: Texto traducido
            return <p className="text-xs text-muted-foreground px-2 py-4 text-center">No se encontraron chats anteriores.</p>;
        }

        return chats.map((chat) => {
            const isActive = pathname === `/chat/${chat.id}`;
            const displayTitle = chat.title || `Chat ${chat.id.substring(0, 8)}...`;
            const displayDate = new Date(chat.updated_at).toLocaleDateString(undefined, { month: 'short', day: 'numeric' });

            return (
                <div key={chat.id} className="relative group w-full pr-8">
                    <Link href={`/chat/${chat.id}`} passHref legacyBehavior>
                        <a
                            className={cn(
                                buttonVariants({ variant: isActive ? "secondary" : "ghost", size: "sm" }),
                                "w-full justify-start h-auto py-1.5 px-2 overflow-hidden text-left rounded",
                                isActive ? "bg-muted hover:bg-muted font-medium" : "hover:bg-muted/50"
                            )}
                            title={displayTitle}
                        >
                            <MessageSquareText className="h-4 w-4 mr-2 flex-shrink-0" />
                            <span className="truncate flex-1 text-sm">{displayTitle}</span>
                            <span className="text-xs text-muted-foreground/70 ml-2 flex-shrink-0">{displayDate}</span>
                        </a>
                    </Link>
                    <AlertDialogTrigger asChild>
                        <Button
                            variant="ghost" size="icon"
                            className={cn(
                                "absolute right-0 top-1/2 -translate-y-1/2 h-7 w-7 p-0 opacity-0 group-hover:opacity-100 transition-opacity duration-150 flex-shrink-0 focus-visible:opacity-100",
                                isDeleting && chatToDelete?.id === chat.id ? "opacity-50 cursor-not-allowed" : ""
                            )}
                            onClick={(e) => openDeleteConfirmation(chat, e)}
                            // MODIFICADO: aria-label traducido
                            aria-label={`Eliminar chat: ${displayTitle}`}
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

    return (
        <AlertDialog open={isAlertOpen} onOpenChange={setIsAlertOpen}>
            <div className="flex flex-col h-full">
                 <div className="flex justify-between items-center p-2 border-b shrink-0">
                     {/* MODIFICADO: Texto traducido */}
                     <h3 className="px-1 text-xs font-semibold uppercase text-muted-foreground tracking-wider">
                         Historial de Chats
                     </h3>
                     <Button
                         variant="ghost"
                         size="sm"
                         className="p-1 h-6 w-6"
                         onClick={() => fetchChatHistory(true)}
                         disabled={isLoading || isAuthLoading}
                         // MODIFICADO: Texto traducido
                         title="Actualizar historial de chats"
                     >
                         <RefreshCw className={cn("h-3.5 w-3.5", (isLoading || isAuthLoading) && "animate-spin")} />
                         {/* MODIFICADO: Texto traducido */}
                         <span className="sr-only">Actualizar Historial</span>
                     </Button>
                 </div>
                 <ScrollArea className="flex-1">
                     <div className="flex flex-col gap-0.5 p-2">
                         {renderContent()}
                     </div>
                 </ScrollArea>
            </div>

            <AlertDialogContent>
                <AlertDialogHeader>
                    {/* MODIFICADO: Textos traducidos */}
                    <AlertDialogTitle>¿Estás absolutamente seguro?</AlertDialogTitle>
                    <AlertDialogDescription>
                        Esta acción no se puede deshacer. Esto eliminará permanentemente el chat
                        <span className="font-medium"> "{chatToDelete?.title || chatToDelete?.id?.substring(0, 8)}"</span> y todos sus mensajes.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    {/* MODIFICADO: Textos traducidos */}
                    <AlertDialogCancel disabled={isDeleting}>Cancelar</AlertDialogCancel>
                    <AlertDialogAction
                        onClick={handleDeleteConfirmed}
                        disabled={isDeleting}
                        className={buttonVariants({ variant: "destructive" })}
                    >
                        {isDeleting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                        Eliminar Permanentemente
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}