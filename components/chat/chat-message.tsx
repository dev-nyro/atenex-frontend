// File: components/chat/chat-message.tsx (REFACTORIZADO - Fuentes mejoradas)
import React from 'react';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { User, BrainCircuit, AlertTriangle, FileText, CircleDot } from 'lucide-react'; // Añadido CircleDot
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import type { RetrievedDoc } from '@/lib/api';
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
// import { Badge } from '@/components/ui/badge'; // Badge ya no se usa para fuentes

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
    <div className={cn(
        'flex w-full items-start gap-3',
        isUser ? 'justify-end pl-10 sm:pl-16' : 'pr-10 sm:pr-16'
    )}>
      {!isUser && (
        <Avatar className="h-8 w-8 border flex-shrink-0 bg-card text-foreground">
           <AvatarFallback className="bg-transparent text-muted-foreground">
                {isError ? <AlertTriangle className="h-5 w-5 text-destructive" /> : <BrainCircuit className="h-5 w-5" /> }
           </AvatarFallback>
        </Avatar>
      )}

      <div
        className={cn(
          'max-w-[85%] rounded-2xl px-4 py-3 text-sm shadow-sm',
          isUser
            ? 'bg-primary text-primary-foreground rounded-br-lg'
            : isError
              ? 'bg-destructive/10 text-destructive-foreground border border-destructive/30 rounded-bl-lg'
              : 'bg-muted text-foreground rounded-bl-lg'
        )}
      >
         {/* Contenido Markdown */}
         {/* Asegurar que prose tenga los estilos correctos definidos en tailwind.config y globals.css */}
         {/* FLAG_LLM: Aplicar prose al div exterior, no al componente Markdown */}
         <div className="prose prose-sm dark:prose-invert max-w-none break-words prose-p:leading-relaxed prose-ul:my-2 prose-ol:my-2 prose-pre:my-2 prose-blockquote:my-2">
            <Markdown remarkPlugins={[remarkGfm]}>
                {message.content}
            </Markdown>
         </div>

         {/* Sección de Fuentes (REDISEÑADA) */}
         {!isUser && !isError && message.sources && message.sources.length > 0 && (
            <div className="mt-3 pt-2.5 border-t border-border/40">
                <p className="text-xs font-medium text-muted-foreground mb-2">Fuentes:</p>
                {/* Usar flex-wrap para las fuentes */}
                <div className="flex flex-wrap items-center gap-x-2 gap-y-1.5"> {/* Ajuste de gap */}
                 {message.sources.map((doc, index) => (
                    <TooltipProvider key={doc.id || `source-${index}`} delayDuration={150}>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                {/* Botón pequeño con número */}
                                <Button
                                    variant="outline"
                                    size="sm" // Botón más pequeño
                                    className="h-6 w-6 px-1 py-0 rounded-full border-dashed hover:border-solid hover:bg-accent/50 cursor-default flex items-center justify-center focus-visible:ring-1 focus-visible:ring-ring focus-visible:border-primary/40"
                                    onClick={(e) => {e.preventDefault();}} // No hacer nada en click, solo tooltip
                                    tabIndex={0} // Make it focusable
                                    aria-label={`Fuente ${index + 1}: ${doc.file_name || 'Detalles'}`}
                                >
                                    {/* Número de fuente */}
                                    <span className="text-xs font-mono text-muted-foreground">{index + 1}</span>
                                </Button>
                            </TooltipTrigger>
                            {/* Tooltip mejorado con fondo popover */}
                            <TooltipContent
                                side="bottom"
                                className="max-w-xs text-xs p-2 shadow-lg bg-popover text-popover-foreground" // Asegura fondo popover
                                sideOffset={4}
                            >
                                <p className="font-medium mb-0.5 break-words">
                                    <FileText className="inline-block h-3 w-3 mr-1 align-text-top" />
                                    {doc.file_name || 'Nombre no disponible'}
                                </p>
                                <p className="text-muted-foreground text-[11px] mb-1.5 break-all">
                                   ID Doc: {doc.document_id ? `${doc.document_id.substring(0, 8)}...` : 'N/D'} / Frag: {doc.id.substring(0, 8)}...
                                </p>
                                {doc.score != null && (
                                    <p className="font-medium text-muted-foreground text-[11px]">
                                        Score: <span className="font-normal">{doc.score.toFixed(4)}</span>
                                    </p>
                                )}
                                {doc.content_preview && (
                                    <p className="mt-1.5 pt-1.5 border-t border-border/50 font-medium text-[11px]">
                                        Vista previa:
                                        <span className="block font-normal text-muted-foreground line-clamp-3">{doc.content_preview}</span>
                                    </p>
                                )}
                            </TooltipContent>
                        </Tooltip>
                   </TooltipProvider>
                 ))}
                </div>
            </div>
         )}
      </div>

      {isUser && (
         <Avatar className="h-8 w-8 border flex-shrink-0 bg-card text-foreground">
           <AvatarFallback className="bg-transparent text-muted-foreground"><User className="h-5 w-5" /></AvatarFallback>
         </Avatar>
      )}
    </div>
  );
}