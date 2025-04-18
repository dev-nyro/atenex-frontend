// File: components/chat/chat-message.tsx (MODIFICADO - Iteración 3.2)
import React from 'react';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { User, BrainCircuit, AlertTriangle, FileText } from 'lucide-react';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import type { RetrievedDoc } from '@/lib/api';
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import { Badge } from '@/components/ui/badge'; // Importar Badge

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
    // Aumentar espaciado vertical entre mensajes (controlado en page.tsx con space-y-6)
    <div className={cn(
        'flex w-full items-start gap-3', // Usar gap en lugar de space-x
        isUser ? 'justify-end pl-10 sm:pl-16' : 'pr-10 sm:pr-16' // Más padding en pantallas pequeñas
    )}>
      {/* Avatar Asistente */}
      {!isUser && (
        <Avatar className="h-8 w-8 border flex-shrink-0 bg-card text-foreground"> {/* Fondo card */}
           <AvatarFallback className="bg-transparent text-muted-foreground"> {/* Color icono muted */}
                {isError ? <AlertTriangle className="h-5 w-5 text-destructive" /> : <BrainCircuit className="h-5 w-5" /> }
           </AvatarFallback>
        </Avatar>
      )}

      {/* Contenedor de la Burbuja */}
      <div
        className={cn(
          'max-w-[85%] rounded-2xl px-4 py-3 text-sm shadow-sm', // Padding y shadow ajustados
          isUser
            ? 'bg-primary text-primary-foreground rounded-br-lg' // Estilo usuario, esquina redondeada diferente
            : isError
              ? 'bg-destructive/10 text-destructive-foreground border border-destructive/30 rounded-bl-lg' // Estilo error con borde y esquina
              // Estilo asistente, esquina redondeada diferente
              : 'bg-muted text-foreground rounded-bl-lg'
        )}
      >
         {/* Contenido Markdown */}
         <div className="prose prose-sm dark:prose-invert max-w-none break-words prose-p:leading-relaxed prose-ul:my-2 prose-ol:my-2 prose-pre:my-2 prose-blockquote:my-2">
            <Markdown remarkPlugins={[remarkGfm]}>
                {message.content}
            </Markdown>
         </div>

         {/* Sección de Fuentes */}
         {!isUser && !isError && message.sources && message.sources.length > 0 && (
            // Separador más sutil
            <div className="mt-3 pt-2.5 border-t border-border/40">
                <p className="text-xs font-medium text-muted-foreground mb-2">Fuentes:</p>
                {/* Usar flex-wrap para las fuentes */}
                <div className="flex flex-wrap items-center gap-1.5">
                 {message.sources.map((doc, index) => (
                    <TooltipProvider key={doc.id || `source-${index}`} delayDuration={150}>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                {/* Botón reemplazado por Badge para look más integrado */}
                                <Badge
                                    variant="outline"
                                    className="cursor-pointer border-dashed hover:border-solid hover:bg-accent/50 py-0.5 px-1.5"
                                    onClick={(e) => {e.preventDefault(); console.log("View source:", doc)}}
                                    tabIndex={0} // Make it focusable
                                >
                                    <FileText className="h-3 w-3 mr-1 flex-shrink-0 text-muted-foreground" />
                                    <span className='truncate max-w-[120px] sm:max-w-[150px] text-xs font-normal text-foreground/80'>
                                     {doc.file_name || doc.document_id?.substring(0, 8) || `Fuente ${index+1}`}
                                    </span>
                                </Badge>
                            </TooltipTrigger>
                            {/* Tooltip mejorado */}
                            <TooltipContent side="bottom" className="max-w-xs text-xs p-2 shadow-lg" sideOffset={4}>
                                <p className="font-medium mb-0.5">Archivo: <span className="font-normal text-muted-foreground">{doc.file_name || 'N/D'}</span></p>
                                {doc.document_id && <p className="font-medium">ID Doc: <span className="font-normal text-muted-foreground font-mono text-[11px]">{doc.document_id}</span></p>}
                                <p className="font-medium">ID Frag: <span className="font-normal text-muted-foreground font-mono text-[11px]">{doc.id}</span></p>
                                {doc.score != null && <p className="font-medium">Score: <span className="font-normal text-muted-foreground">{doc.score.toFixed(4)}</span></p>}
                                {doc.content_preview && <p className="mt-1.5 pt-1.5 border-t border-border/50 font-medium">Vista previa: <span className="block font-normal text-muted-foreground line-clamp-3">{doc.content_preview}</span></p>}
                            </TooltipContent>
                        </Tooltip>
                   </TooltipProvider>
                 ))}
                </div>
            </div>
         )}
      </div>

       {/* Avatar Usuario */}
      {isUser && (
         <Avatar className="h-8 w-8 border flex-shrink-0 bg-card text-foreground"> {/* Fondo card */}
           <AvatarFallback className="bg-transparent text-muted-foreground"><User className="h-5 w-5" /></AvatarFallback>
         </Avatar>
      )}
    </div>
  );
}