// File: components/chat/chat-message.tsx
import React from 'react';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { User, AlertTriangle, FileText } from 'lucide-react';
import AtenexLogo from '@/components/icons/atenex-logo';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import type { Components } from 'react-markdown';
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
      >         {/* Renderizado optimizado del contenido Markdown */}
         <div className={cn(
           "markdown-content prose max-w-none break-words",
           isUser 
             ? "user-message prose-sm prose-invert prose-p:leading-relaxed prose-headings:text-primary-foreground prose-strong:text-primary-foreground"
             : "prose-sm dark:prose-invert prose-p:leading-relaxed prose-headings:text-foreground prose-strong:text-foreground"
         )}>
            <Markdown 
              remarkPlugins={[remarkGfm]}
              components={{
                // Personalizar el renderizado de elementos específicos
                p: ({ children }) => <p className="mb-3 last:mb-0 leading-relaxed">{children}</p>,
                ul: ({ children }) => <ul className="my-3 space-y-1 pl-6">{children}</ul>,
                ol: ({ children }) => <ol className="my-3 space-y-1 pl-6">{children}</ol>,
                li: ({ children }) => <li className="leading-relaxed">{children}</li>,
                blockquote: ({ children }) => (
                  <blockquote className={cn(
                    "border-l-4 pl-4 py-2 my-4 italic rounded-r",
                    isUser 
                      ? "border-primary-foreground/30 text-primary-foreground/90 bg-primary-foreground/5"
                      : "border-border/50 text-muted-foreground bg-muted/30"
                  )}>
                    {children}
                  </blockquote>
                ),
                code: ({ children, className, ...props }) => {
                  const isInlineCode = !className?.includes('language-');
                  if (isInlineCode) {
                    return (
                      <code 
                        className={cn(
                          "px-1.5 py-0.5 text-sm font-mono rounded font-medium",
                          isUser 
                            ? "bg-primary-foreground/10 text-primary-foreground"
                            : "bg-muted text-foreground"
                        )}
                        {...props}
                      >
                        {children}
                      </code>
                    );
                  }
                  return (
                    <code 
                      className={cn(
                        "block p-4 text-sm font-mono rounded-lg overflow-x-auto my-4 font-normal",
                        isUser 
                          ? "bg-primary-foreground/10 text-primary-foreground"
                          : "bg-muted text-foreground",
                        className
                      )}
                      {...props}
                    >
                      {children}
                    </code>
                  );
                },
                pre: ({ children }) => (
                  <pre className="p-0 bg-transparent overflow-visible my-0">
                    {children}
                  </pre>
                ),
                table: ({ children }) => (
                  <div className="overflow-x-auto my-4">
                    <table className={cn(
                      "min-w-full border-collapse rounded-lg overflow-hidden",
                      isUser 
                        ? "border border-primary-foreground/30"
                        : "border border-border"
                    )}>
                      {children}
                    </table>
                  </div>
                ),
                th: ({ children }) => (
                  <th className={cn(
                    "px-3 py-2 font-semibold text-left",
                    isUser 
                      ? "border border-primary-foreground/30 bg-primary-foreground/10"
                      : "border border-border bg-muted"
                  )}>
                    {children}
                  </th>
                ),
                td: ({ children }) => (
                  <td className={cn(
                    "px-3 py-2",
                    isUser 
                      ? "border border-primary-foreground/30"
                      : "border border-border"
                  )}>
                    {children}
                  </td>
                ),
                h1: ({ children }) => (
                  <h1 className="text-xl font-bold mb-3 mt-4 first:mt-0 leading-tight">{children}</h1>
                ),
                h2: ({ children }) => (
                  <h2 className="text-lg font-semibold mb-2 mt-4 first:mt-0 leading-tight">{children}</h2>
                ),
                h3: ({ children }) => (
                  <h3 className="text-base font-medium mb-2 mt-3 first:mt-0 leading-tight">{children}</h3>
                ),
                h4: ({ children }) => (
                  <h4 className="text-sm font-medium mb-2 mt-3 first:mt-0 leading-tight">{children}</h4>
                ),
                strong: ({ children }) => (
                  <strong className="font-semibold">{children}</strong>
                ),
                em: ({ children }) => (
                  <em className="italic">{children}</em>
                ),
                a: ({ children, href, ...props }) => (
                  <a 
                    href={href} 
                    className={cn(
                      "underline underline-offset-2 transition-colors",
                      isUser 
                        ? "text-primary-foreground hover:text-primary-foreground/80"
                        : "text-primary hover:text-primary/80"
                    )}
                    target="_blank" 
                    rel="noopener noreferrer"
                    {...props}
                  >
                    {children}
                  </a>
                ),
                hr: () => (
                  <hr className={cn(
                    "my-4 border-0 h-px",
                    isUser 
                      ? "bg-primary-foreground/30"
                      : "bg-border"
                  )} />
                ),
              } as Components}
            >
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
                            // El panel de fuentes principal se encarga de abrir el modal, este solo muestra tooltip.
                            // Si se quisiera que estos botones también abran el modal, se necesitaría pasar
                            // la función para abrir el modal y el documento seleccionado a este componente.
                            onClick={e => e.preventDefault()} 
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