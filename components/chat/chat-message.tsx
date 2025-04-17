// File: components/chat/chat-message.tsx
import React from 'react';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button'; // Importar Button
import { User, BrainCircuit, AlertTriangle, FileText } from 'lucide-react'; // Importar FileText
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import type { RetrievedDoc } from '@/lib/api';
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"

export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  sources?: RetrievedDoc[];
  isError?: boolean;
  created_at?: string;
}

interface ChatMessageProps {
  message: Message;
}

export function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.role === 'user';
  const isError = message.isError ?? false;

  return (
    <div className={cn('flex items-start space-x-3', isUser ? 'justify-end' : '')}>
      {!isUser && (
        <Avatar className="h-8 w-8 border flex-shrink-0 bg-primary/10 text-primary">
           <AvatarFallback className="bg-transparent">
                {isError ? <AlertTriangle className="h-5 w-5 text-destructive" /> : <BrainCircuit className="h-5 w-5" /> }
           </AvatarFallback>
        </Avatar>
      )}
      <div
        className={cn(
          'max-w-[75%] rounded-xl p-3.5 text-sm shadow-sm', // MODIFICADO: Más redondeado y padding
          isUser
            ? 'bg-primary/90 text-primary-foreground' // MODIFICADO: Ligeramente más suave
            : isError
              ? 'bg-destructive/10 text-destructive-foreground border border-destructive/20'
              : 'bg-muted border border-border/50' // MODIFICADO: Añadido borde sutil
        )}
      >
         {/* El contenedor prose maneja bien el estilo del markdown */}
         <div className="prose prose-sm dark:prose-invert max-w-none break-words">
            <Markdown remarkPlugins={[remarkGfm]}>
                {message.content}
            </Markdown>
         </div>

         {/* MODIFICADO: Sección de fuentes rediseñada */}
         {!isUser && !isError && message.sources && message.sources.length > 0 && (
            <div className="mt-3 pt-2.5 border-t border-border/50"> {/* Añadido margen superior */}
                <p className="text-xs font-medium text-muted-foreground mb-1.5">Fuentes:</p>
                <div className="flex flex-wrap gap-1.5"> {/* Usar flex-wrap para badges */}
                 {message.sources.map((doc, index) => (
                    <TooltipProvider key={doc.id || `source-${index}`} delayDuration={100}>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                {/* Usar un Button pequeño como fuente clickable */}
                                <Button
                                    variant="secondary"
                                    size="sm" // Tamaño más pequeño
                                    className="h-auto px-2 py-0.5 text-xs" // Ajustar padding y altura
                                    onClick={(e) => {e.preventDefault(); console.log("View source:", doc)}}
                                >
                                    <FileText className="h-3 w-3 mr-1" /> {/* Icono más pequeño */}
                                    {doc.file_name || doc.document_id?.substring(0, 8) || `Fuente ${index+1}`}
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent side="bottom" className="max-w-xs text-xs">
                                {/* MODIFICADO: Contenido del tooltip traducido y más informativo */}
                                <p><b>Archivo:</b> {doc.file_name || 'N/D'}</p>
                                <p><b>ID Fragmento:</b> {doc.id}</p>
                                {doc.document_id && <p><b>ID Doc:</b> {doc.document_id}</p>}
                                {doc.score != null && <p><b>Score:</b> {doc.score.toFixed(4)}</p>}
                                {doc.content_preview && <p className="mt-1 pt-1 border-t border-border/50 line-clamp-3"><b>Vista previa:</b> {doc.content_preview}</p>}
                            </TooltipContent>
                        </Tooltip>
                   </TooltipProvider>
                 ))}
                </div>
            </div>
         )}
         {/* FIN MODIFICACIÓN SECCIÓN FUENTES */}

      </div>
      {isUser && (
         <Avatar className="h-8 w-8 border flex-shrink-0 bg-secondary text-secondary-foreground">
           <AvatarFallback><User className="h-5 w-5" /></AvatarFallback>
         </Avatar>
      )}
    </div>
  );
}