// File: components/chat/chat-history.tsx (MODIFICADO - Iteración 2)
"use client";

import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Button, buttonVariants } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { MessageSquareText, Trash2, Loader2, AlertCircle, RefreshCw, History } from 'lucide-react'; // Añadido History icon
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
            setChats([]);
            setError(null);
            setIsLoading(false);
            return;
        }

        if (!bypassAuth && isAuthLoading) {
            setIsLoading(true);
            return;
        }

        setIsLoading(true);
        setError(null);

        try {
            const fetchedChats = await getChats();
            fetchedChats.sort((a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime());
            setChats(fetchedChats);
            if (showToast) toast.success("Historial de chats actualizado");
        } catch (err) {
            let message = "No se pudo cargar el historial de chats.";
            if (err instanceof ApiError) {
                message = err.message || message;
                if (err.status === 401 || err.status === 403) { message = "Sesión expirada o inválida. Por favor, inicia sesión de nuevo."; signOut(); }
                else if (err.status === 422) { message = `Fallo al procesar la solicitud: ${err.message}`; }
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
            toast.success("Chat Eliminado", { description: `Chat "${chatToDelete.title || chatToDelete.id.substring(0, 8)}" eliminado.` });
            const currentChatId = pathname.split('/').pop();
            if (currentChatId === chatToDelete.id) {
                router.push('/chat');
            }
        } catch (err) {
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
            // Skeleton más representativo
            return (
                <div className="space-y-2 p-2">
                    <Skeleton className="h-10 w-full rounded-md" />
                    <Skeleton className="h-10 w-full rounded-md" />
                    <Skeleton className="h-10 w-full rounded-md" />
                </div>
            );
        }

        if (!isAuthenticated) {
            return (
                <div className="px-2 py-6 text-center text-muted-foreground">
                    <p className="text-xs mb-2">Inicia sesión para ver el historial.</p>
                </div>
            );
        }

        if (error) {
            return (
                <div className="px-3 py-6 text-center text-destructive-foreground bg-destructive/10 rounded-md m-2">
                    <AlertCircle className="mx-auto h-6 w-6 mb-2 text-destructive" />
                    <p className="text-sm font-medium mb-1">Error al Cargar</p>
                    <p className="text-xs mb-3">{error}</p>
                    <Button variant="destructive" size="sm" onClick={() => fetchChatHistory(true)} className="bg-destructive/80 hover:bg-destructive">
                        <RefreshCw className="mr-1.5 h-3.5 w-3.5"/> Reintentar
                    </Button>
                </div>
            );
        }

        if (chats.length === 0) {
            return (
                <div className="flex flex-col items-center justify-center text-center text-muted-foreground p-6">
                    <History className="h-8 w-8 mb-3 opacity-50"/>
                    <p className="text-sm font-medium mb-1">Sin chats anteriores</p>
                    <p className="text-xs">Inicia una nueva conversación para verla aquí.</p>
                </div>
            );
        }

        return chats.map((chat) => {
            const isActive = pathname === `/chat/${chat.id}`;
            const displayTitle = chat.title || `Chat ${chat.id.substring(0, 8)}...`;
            const displayDate = new Date(chat.updated_at).toLocaleDateString('es-ES', { month: 'short', day: 'numeric' }); // Formato español

            return (
                <div key={chat.id} className="relative group w-full"> {/* Quitamos pr-8 */}
                    <Link href={`/chat/${chat.id}`} passHref legacyBehavior>
                        <a
                            className={cn(
                                buttonVariants({ variant: "ghost", size: "default" }), // Usamos ghost
                                "w-full justify-start h-auto py-2.5 px-3 overflow-hidden text-left rounded-md text-sm", // Padding y altura ajustados
                                isActive
                                ? "bg-primary/10 dark:bg-primary/20 text-primary font-medium" // Estado activo mejorado
                                : "text-foreground/70 hover:text-foreground hover:bg-accent/50 dark:hover:bg-accent/30" // Estado inactivo
                            )}
                            title={displayTitle}
                        >
                            {/* Icono principal */}
                            <MessageSquareText className="h-4 w-4 mr-2.5 flex-shrink-0 opacity-80" />
                            {/* Contenedor para título y fecha */}
                            <div className="flex flex-col flex-1 min-w-0">
                                <span className="truncate font-medium text-foreground group-hover:text-foreground">{displayTitle}</span>
                                <span className="text-xs text-muted-foreground/80">{displayDate}</span>
                            </div>
                        </a>
                    </Link>
                    {/* Botón Eliminar aparece en hover */}
                    <AlertDialogTrigger asChild>
                        <Button
                            variant="ghost" size="icon"
                            className={cn(
                                "absolute right-1.5 top-1/2 -translate-y-1/2 h-7 w-7 p-0 rounded-md",
                                "opacity-0 group-hover:opacity-60 focus-visible:opacity-100 hover:!opacity-100", // Control de opacidad
                                "transition-opacity duration-150 flex-shrink-0",
                                "hover:bg-destructive/10 hover:text-destructive", // Estilo hover
                                isDeleting && chatToDelete?.id === chat.id ? "opacity-50 cursor-not-allowed" : ""
                            )}
                            onClick={(e) => openDeleteConfirmation(chat, e)}
                            aria-label={`Eliminar chat: ${displayTitle}`}
                            disabled={isDeleting && chatToDelete?.id === chat.id}
                        >
                            {isDeleting && chatToDelete?.id === chat.id ? (
                                <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
                            ) : (
                                <Trash2 className="h-4 w-4" />
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
                 {/* Header del historial */}
                 <div className="flex justify-between items-center px-2 pt-1 pb-2 border-b shrink-0 mb-1">
                     <h3 className="text-xs font-semibold uppercase text-muted-foreground tracking-wide">
                         Historial
                     </h3>
                     <Button
                         variant="ghost"
                         size="icon" // Cambiado a icon
                         className="h-7 w-7 text-muted-foreground hover:text-foreground" // Tamaño y color ajustados
                         onClick={() => fetchChatHistory(true)}
                         disabled={isLoading || isAuthLoading}
                         title="Actualizar historial"
                     >
                         <RefreshCw className={cn("h-4 w-4", (isLoading || isAuthLoading) && "animate-spin")} />
                         <span className="sr-only">Actualizar Historial</span>
                     </Button>
                 </div>
                 {/* ScrollArea para el contenido */}
                 <ScrollArea className="flex-1 -mx-2"> {/* Padding negativo para compensar el padding del contenedor padre */}
                     <div className="flex flex-col gap-1 p-2"> {/* Padding interno y gap */}
                         {renderContent()}
                     </div>
                 </ScrollArea>
            </div>

            {/* AlertDialog se mantiene igual */}
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>¿Estás absolutamente seguro?</AlertDialogTitle>
                    <AlertDialogDescription>
                        Esta acción no se puede deshacer. Esto eliminará permanentemente el chat
                        <span className="font-medium"> "{chatToDelete?.title || chatToDelete?.id?.substring(0, 8)}"</span> y todos sus mensajes.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
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