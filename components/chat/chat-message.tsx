import React from 'react';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { User, Bot, BrainCircuit, AlertTriangle } from 'lucide-react'; // Use Bot or BrainCircuit for AI
import Markdown from 'react-markdown'; // Use react-markdown for rendering
import remarkGfm from 'remark-gfm'; // GitHub Flavored Markdown
import { RetrievedDoc } from '@/lib/api'; // Import type for sources

export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  sources?: RetrievedDoc[]; // Optional sources for assistant messages
  isError?: boolean; // Flag for error messages
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
           {/* <AvatarImage src="/path/to/ai-avatar.png" /> */}
           <AvatarFallback className="bg-transparent">
                {isError ? <AlertTriangle className="h-5 w-5 text-destructive" /> : <BrainCircuit className="h-5 w-5" /> }
           </AvatarFallback>
        </Avatar>
      )}
      <div
        className={cn(
          'max-w-[75%] rounded-lg p-3 text-sm shadow-sm',
          isUser
            ? 'bg-primary text-primary-foreground'
            : isError
              ? 'bg-destructive/10 text-destructive-foreground border border-destructive/20'
              : 'bg-muted'
        )}
      >
        {/* Render content using react-markdown */}
         <div className="prose prose-sm dark:prose-invert max-w-none break-words">
            <Markdown remarkPlugins={[remarkGfm]}>
                {message.content}
            </Markdown>
         </div>

         {/* Display sources if available for assistant messages */}
         {!isUser && !isError && message.sources && message.sources.length > 0 && (
            <div className="mt-2 pt-2 border-t border-border/50">
                <p className="text-xs font-medium text-muted-foreground mb-1">Sources:</p>
                <ul className="space-y-1">
                 {message.sources.map((doc, index) => (
                    <li key={doc.id || `source-${index}`} className="text-xs text-muted-foreground hover:text-foreground transition-colors">
                       {/* Make sources clickable if you have a way to view the doc */}
                       <a
                         href="#" // Replace with actual link/action to view document
                         onClick={(e) => {e.preventDefault(); console.log("View source:", doc.document_id || doc.id)}}
                         className="underline decoration-dotted underline-offset-2"
                         title={`Score: ${doc.score?.toFixed(4) ?? 'N/A'}\nID: ${doc.id}`}
                        >
                         {index + 1}. {doc.file_name || doc.document_id || `Source ${index+1}`}
                       </a>
                    </li>
                 ))}
                </ul>
            </div>
         )}

      </div>
      {isUser && (
         <Avatar className="h-8 w-8 border flex-shrink-0 bg-secondary text-secondary-foreground">
           {/* <AvatarImage src="/path/to/user-avatar.png" /> */}
           <AvatarFallback><User className="h-5 w-5" /></AvatarFallback>
         </Avatar>
      )}
    </div>
  );
}