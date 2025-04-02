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
import { useAuth } from '@/lib/hooks/useAuth'; // Importar hook actualizado
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
  // --- CORRECCIÓN: Usar session, isLoading, signOut del hook useAuth ---
  const { session, isLoading: isAuthLoading, signOut } = useAuth();
  // ------------------------------------------------------------------
  const bypassAuth = process.env.NEXT_PUBLIC_BYPASS_AUTH === 'true';

  const [chats, setChats] = useState<ChatSummary[]>([]);
  const [isLoading, setIsLoading] = useState(false); // Carga específica de esta lista
  const [error, setError] = useState<string | null>(null);
  const [chatToDelete, setChatToDelete] = useState<ChatSummary | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isAlertOpen, setIsAlertOpen] = useState(false);

  // --- Función para buscar el historial ---
  const fetchChatHistory = useCallback(async (showToast = false) => {
    const isAuthenticated = !!session || bypassAuth;

    // Esperar a que auth cargue si es necesario (y no bypass)
    if (!bypassAuth && isAuthLoading) {
        console.log("ChatHistory: Waiting for auth state...");
        // No establecer isLoading aquí, dejar que el renderContent lo maneje
        return; // Salir temprano si auth está cargando
    }

    // Si no está autenticado (y auth ya cargó), no hacer nada
    if (!isAuthenticated) {
        console.log("ChatHistory: Not authenticated, skipping fetch.");
        setChats([]);
        setError(null); // Limpiar errores previos
        // No mostrar error de login aquí, renderContent lo hará
        return;
    }

    // Si está autenticado, proceder a buscar
    console.log("ChatHistory: Auth ready or bypassed. Fetching chat list...");
    setIsLoading(true); // Iniciar carga de la lista
    setError(null);
    try {
      const fetchedChats = await getChats();
      // Ordenar por fecha de actualización descendente
      fetchedChats.sort((a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime());
      setChats(fetchedChats);
      console.log(`ChatHistory: Fetched ${fetchedChats.length} chats.`);
      if (showToast) toast.success("Chat History Refreshed");
    } catch (err) {
      console.error("ChatHistory: Failed to fetch chat history:", err);
      let message = "Could not load chat history.";
      if (err instanceof ApiError) {
        message = err.message || message;
        // Si es error de auth/forbidden, desloguear
        if (err.status === 401 || err.status === 403) {
          message = "Session expired or invalid. Please log in again.";
          signOut(); // Usar signOut del contexto
        }
      } else if (err instanceof Error) { message = err.message; }
      setError(message);
      setChats([]); // Limpiar chats en caso de error
      toast.error("Error Loading Chats", { description: message });
    } finally {
      setIsLoading(false); // Terminar carga de la lista
    }
  // --- CORRECCIÓN: Dependencias del useCallback ---
  }, [session, isAuthLoading, bypassAuth, signOut]); // Depender del estado de auth
  // -------------------------------------------

  // --- Efecto para buscar al montar o cuando cambie el estado de auth ---
  useEffect(() => {
    // Solo buscar si no estamos en bypass O si la carga de auth ha terminado
    if (bypassAuth || !isAuthLoading) {
        fetchChatHistory(false); // Buscar sin toast al inicio
    }
    // El efecto se re-ejecutará si isAuthLoading o session cambian gracias a las dependencias de fetchChatHistory
  }, [fetchChatHistory, isAuthLoading, bypassAuth]); // Depender de la función y estado de carga

  // --- Funciones de Manejo de Borrado ---
  const openDeleteConfirmation = (chat: ChatSummary, event: React.MouseEvent) => {
     event.stopPropagation(); // Evitar navegar al chat
     event.preventDefault();
     setChatToDelete(chat);
     setIsAlertOpen(true);
  };

  const handleDeleteConfirmed = async () => {
    if (!chatToDelete) return;
    setIsDeleting(true);
    try {
        await deleteChat(chatToDelete.id);
        // Actualizar estado local para reflejar el borrado
        setChats(prev => prev.filter(chat => chat.id !== chatToDelete.id));
        toast.success("Chat Deleted", { description: `Chat "${chatToDelete.title || chatToDelete.id.substring(0,8)}" removed.`});
        // Si el chat borrado era el activo, navegar a /chat (nuevo chat)
        const currentChatId = pathname.split('/').pop();
        if (currentChatId === chatToDelete.id) {
            router.push('/chat');
        }
    } catch (err) {
        console.error("ChatHistory: Failed to delete chat:", err);
        let message = "Could not delete chat.";
        if (err instanceof ApiError) {
            message = err.message || message;
            if (err.status === 401 || err.status === 403) signOut(); // Desloguear si falla por auth
        } else if (err instanceof Error) { message = err.message; }
        toast.error("Deletion Failed", { description: message });
    } finally {
        setIsDeleting(false);
        setIsAlertOpen(false);
        setChatToDelete(null);
    }
  };
  // --- Fin Funciones de Borrado ---

  // --- Lógica de Renderizado ---
  const renderContent = () => {
    const isAuthenticated = !!session || bypassAuth;

    // 1. Estado de Carga de Autenticación (si no bypass)
    if (!bypassAuth && isAuthLoading) {
        return <div className="flex justify-center items-center h-20"><Loader2 className="h-6 w-6 animate-spin text-muted-foreground" /></div>;
    }

    // 2. No Autenticado (y auth ya cargó)
    if (!isAuthenticated) {
         return (
             <div className="px-2 py-4 text-center text-muted-foreground">
                 <p className="text-sm mb-2">Log in to see your chat history.</p>
                 <Button size="sm" onClick={() => router.push('/login')}>Login</Button>
             </div>
         );
     }

    // 3. Cargando Historial (ya autenticado)
    if (isLoading) {
        return <div className="flex justify-center items-center h-20"><Loader2 className="h-6 w-6 animate-spin text-muted-foreground" /></div>;
    }

    // 4. Error al Cargar Historial
    if (error) {
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

    // 5. Historial Vacío
    if (chats.length === 0) {
        return <p className="text-sm text-muted-foreground px-2 py-4 text-center">No chat history yet.</p>;
    }

    // 6. Renderizar Lista de Chats
    return chats.map((chat) => {
        const isActive = pathname === `/chat/${chat.id}`;
        // Usar título o ID corto como fallback
        const displayTitle = chat.title || `Chat ${chat.id.substring(0, 8)}...`;
        const displayDate = new Date(chat.updated_at).toLocaleDateString(undefined, { month: 'short', day: 'numeric' });

        return (
            <div key={chat.id} className="relative group w-full pr-8"> {/* Añadir padding para botón */}
                <Link href={`/chat/${chat.id}`} passHref legacyBehavior>
                    <a
                        className={cn(
                            buttonVariants({ variant: isActive ? "secondary" : "ghost", size: "sm" }), // Usar size="sm"
                            "w-full justify-start h-auto py-1.5 px-2 overflow-hidden text-left", // Ajustar padding/altura
                            isActive ? "bg-muted hover:bg-muted font-medium" : "hover:bg-muted/50"
                        )}
                        title={displayTitle}
                    >
                        <MessageSquareText className="h-4 w-4 mr-2 flex-shrink-0" />
                        <span className="truncate flex-1 text-sm">{displayTitle}</span>
                        <span className="text-xs text-muted-foreground/70 ml-2 flex-shrink-0">{displayDate}</span>
                    </a>
                </Link>
                {/* Botón de borrado (aparece al hacer hover) */}
                <AlertDialogTrigger asChild>
                    <Button
                        variant="ghost" size="icon"
                        className={cn(
                            "absolute right-0 top-1/2 -translate-y-1/2 h-7 w-7 p-0 opacity-0 group-hover:opacity-100 transition-opacity duration-150 flex-shrink-0 focus-visible:opacity-100",
                            isDeleting && chatToDelete?.id === chat.id ? "opacity-50" : "" // Atenuar si se está borrando este
                        )}
                        onClick={(e) => openDeleteConfirmation(chat, e)}
                        aria-label={`Delete chat: ${displayTitle}`}
                        disabled={isDeleting && chatToDelete?.id === chat.id} // Deshabilitar mientras borra
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
  // --- Fin Lógica de Renderizado ---

  return (
     <AlertDialog open={isAlertOpen} onOpenChange={setIsAlertOpen}>
        {/* Contenedor principal con botón de refrescar arriba */}
        <div className="flex flex-col h-full">
            <div className="flex justify-between items-center p-2 border-b">
                 <h3 className="px-1 text-xs font-semibold uppercase text-muted-foreground tracking-wider">
                     Chat History
                 </h3>
                 <Button variant="ghost" size="sm" onClick={() => fetchChatHistory(true)} disabled={isLoading || (!bypassAuth && isAuthLoading)}>
                     <RefreshCw className={cn("h-3.5 w-3.5", (isLoading || (!bypassAuth && isAuthLoading)) && "animate-spin")} />
                     <span className="sr-only">Refresh History</span>
                 </Button>
            </div>
            <ScrollArea className="flex-1">
                <div className="flex flex-col gap-0.5 p-2"> {/* Reducir gap */}
                    {renderContent()}
                </div>
            </ScrollArea>
        </div>

        {/* Contenido del Diálogo de Confirmación (se renderiza en portal) */}
        <AlertDialogContent>
            <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
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
                    className={buttonVariants({ variant: "destructive" })} // Aplicar variante destructiva
                >
                    {isDeleting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                    Delete
                </AlertDialogAction>
            </AlertDialogFooter>
        </AlertDialogContent>
    </AlertDialog>
  );
}