// File: components/chat/chat-message.tsx
import React from 'react';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { User, AlertTriangle, FileText } from 'lucide-react';
import AtenexLogo from '@/components/icons/atenex-logo';
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
    <div className={cn(
        'flex w-full items-start gap-3',
        isUser ? 'justify-end pl-10 sm:pl-16' : 'pr-10 sm:pr-16'
    )}>
      {!isUser && (
        <Avatar className="h-8 w-8 border flex-shrink-0 bg-card text-foreground">
           <AvatarFallback className="bg-transparent text-muted-foreground">
                {isError ? <AlertTriangle className="h-5 w-5 text-destructive" /> : <AtenexLogo className="h-5 w-5 text-primary" /> }
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
         <div className="prose prose-sm dark:prose-invert max-w-none break-words prose-p:leading-relaxed prose-ul:my-2 prose-ol:my-2 prose-pre:my-2 prose-blockquote:my-2">
            <Markdown remarkPlugins={[remarkGfm]}>
                {message.content}
            </Markdown>
         </div>

         {!isUser && !isError && message.sources && message.sources.length > 0 && (
            <div className="mt-3 pt-2.5 border-t border-border/40 animate-fade-in">
                <p className="text-xs font-semibold text-muted-foreground mb-2 tracking-wide uppercase">Fuentes utilizadas:</p>
                <div className="flex flex-wrap items-center gap-x-2 gap-y-1.5">
                  {message.sources.map((doc, index) => (
                    <TooltipProvider key={doc.id || `source-${index}` } delayDuration={150}>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            variant="outline"
                            size="icon"
                            className="rounded-full px-0 py-0 text-xs font-mono font-semibold h-7 w-7 flex items-center justify-center border-primary/60 hover:border-primary"
                            tabIndex={0}
                            aria-label={`Ver fuente ${index + 1}: ${doc.cita_tag || doc.file_name || 'Detalles'}`}
                            onClick={e => e.preventDefault()} // Prevenir cualquier acción de navegación por defecto
                          >
                            {index + 1}
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent side="top" align="center" className="max-w-xs text-xs">
                          <div className="font-semibold mb-1 truncate flex items-center gap-1">
                            <FileText className="inline-block h-3 w-3 mr-1 align-text-top" />
                            {doc.file_name || doc.cita_tag || `Fragmento ${doc.id?.substring(0, 8)}`}
                          </div>
                          <div className="text-muted-foreground text-[11px] mb-1.5 break-all">
                            ID Doc: {doc.document_id ? `${doc.document_id.substring(0, 8)}...` : 'N/D'} / Frag: {doc.id.substring(0, 8)}...
                          </div>
                          {doc.score != null && (
                            <div className="font-medium text-muted-foreground text-[11px]">
                              Score: <span className="font-normal">{doc.score.toFixed(4)}</span>
                            </div>
                          )}
                          <div className="mt-1.5 pt-1.5 border-t border-border/50 font-medium text-[11px]">
                            Vista previa:
                            <span className="block font-normal text-muted-foreground line-clamp-3">{doc.content_preview || <span className="italic opacity-70">Vista previa no disponible.</span>}</span>
                          </div>
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