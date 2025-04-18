# Project Structure

```
atenex-frontend/
├── .env.local
├── .gitignore
├── app
│   ├── (app)
│   │   ├── chat
│   │   │   └── [[...chatId]]
│   │   │       └── page.tsx
│   │   ├── knowledge
│   │   │   └── page.tsx
│   │   ├── layout.tsx
│   │   └── settings
│   │       └── page.tsx
│   ├── (auth)
│   │   ├── layout.tsx
│   │   └── login
│   │       └── page.tsx
│   ├── about
│   │   └── page.tsx
│   ├── contact
│   │   └── page.tsx
│   ├── globals.css
│   ├── layout.tsx
│   ├── page.tsx
│   ├── privacy
│   │   └── page.tsx
│   └── terms
│       └── page.tsx
├── components
│   ├── auth
│   │   └── login-form.tsx
│   ├── chat
│   │   ├── chat-history.tsx
│   │   ├── chat-input.tsx
│   │   ├── chat-interface.tsx
│   │   ├── chat-message.tsx
│   │   └── retrieved-documents-panel.tsx
│   ├── knowledge
│   │   ├── document-status-list.tsx
│   │   └── file-uploader.tsx
│   ├── layout
│   │   ├── header.tsx
│   │   └── sidebar.tsx
│   ├── theme-palette-button.tsx
│   ├── theme-provider.tsx
│   ├── theme-toggle.tsx
│   └── ui
│       ├── alert-dialog.tsx
│       ├── alert.tsx
│       ├── avatar.tsx
│       ├── badge.tsx
│       ├── button.tsx
│       ├── card.tsx
│       ├── dialog.tsx
│       ├── dropdown-menu.tsx
│       ├── input.tsx
│       ├── label.tsx
│       ├── progress.tsx
│       ├── resizable.tsx
│       ├── scroll-area.tsx
│       ├── separator.tsx
│       ├── skeleton.tsx
│       ├── sonner.tsx
│       ├── table.tsx
│       ├── textarea.tsx
│       └── tooltip.tsx
├── components.json
├── export-codebase.py
├── lib
│   ├── api.ts
│   ├── auth
│   │   └── helpers.ts
│   ├── constants.ts
│   ├── hooks
│   │   ├── useAuth.tsx
│   │   ├── useDocumentStatuses.ts
│   │   └── useUploadDocument.ts
│   └── utils.ts
├── next-env.d.ts
├── next.config.mjs
├── package.json
├── postcss.config.js
├── public
│   └── icons
├── tailwind.config.js
└── tsconfig.json
```

# Full Codebase

## File: `next.config.mjs`
```mjs
// File: next.config.mjs
/** @type {import('next').NextConfig} */
const nextConfig = {
    // reactStrictMode: true is the default in Next.js 14 and generally recommended
    transpilePackages: ['@radix-ui/react-dialog'],
    reactStrictMode: true,
  
  };
  
  export default nextConfig;
```

## File: `package.json`
```json

{
  "name": "atenex-frontend",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  },
  "dependencies": {
    "@hookform/resolvers": "^4.1.3",
    "@radix-ui/react-alert-dialog": "^1.1.6",
    "@radix-ui/react-avatar": "^1.1.3",
    "@radix-ui/react-dialog": "^1.1.6",
    "@radix-ui/react-dropdown-menu": "^2.1.6",
    "@radix-ui/react-label": "^2.1.2",
    "@radix-ui/react-progress": "^1.1.2",
    "@radix-ui/react-scroll-area": "^1.2.3",
    "@radix-ui/react-separator": "^1.1.2",
    "@radix-ui/react-slot": "^1.1.2",
    "@radix-ui/react-toast": "^1.2.6",
    "@radix-ui/react-tooltip": "^1.1.8",
    "class-variance-authority": "^0.7.1",
    "clsx": "^2.1.1",
    "lucide-react": "^0.486.0",
    "next": "^15.2.4",
    "next-themes": "^0.4.6",
    "react": "^19.1.0",
    "react-dom": "^19.1.0",
    "react-dropzone": "^14.3.8",
    "react-hook-form": "^7.55.0",
    "react-icons": "^5.5.0",
    "react-markdown": "^10.1.0",
    "react-resizable-panels": "^2.1.7",
    "remark-gfm": "^4.0.1",
    "sonner": "^2.0.2",
    "tailwind-merge": "^3.1.0",
    "tailwindcss-animate": "^1.0.7",
    "tw-animate-css": "^1.2.5",
    "zod": "^3.24.2"
  },
  "devDependencies": {
    "@tailwindcss/postcss": "^4.0.0",
    "@tailwindcss/typography": "^0.5.16",
    "@types/node": "^22.13.14",
    "@types/react": "^19.0.12",
    "@types/react-dom": "^19.0.4",
    "@types/react-dropzone": "^4.2.2",
    "autoprefixer": "^10.4.21",
    "eslint": "^9.23.0",
    "eslint-config-next": "^15.2.4",
    "postcss": "^8.5.3",
    "tailwindcss": "^4.0.17",
    "typescript": "^5.8.2"
  }
}
```

## File: `tsconfig.json`
```json
{
  "compilerOptions": {
    "target": "es5",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true, 
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [
      {
        "name": "next"
      }
    ],
    "paths": {
      "@/*": ["./*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

## File: `tailwind.config.js`
```js
/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx,mdx}',
    './src/**/*.{ts,tsx,mdx}', // Si usas src/
    './components/theme-palette-button.tsx',
    ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
       fontFamily: {
         sans: ["var(--font-sans)", "system-ui", "sans-serif"],
       },
      
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
       // Add prose styles for markdown rendering
       typography: (theme) => ({
        DEFAULT: {
          css: {
            '--tw-prose-body': 'var(--foreground)',
            '--tw-prose-headings': 'var(--foreground)',
            '--tw-prose-lead': 'var(--muted-foreground)',
            '--tw-prose-links': 'var(--primary)',
            '--tw-prose-bold': 'var(--foreground)',
            '--tw-prose-counters': 'var(--muted-foreground)',
            '--tw-prose-bullets': 'var(--muted-foreground)',
            '--tw-prose-hr': 'var(--border)',
            '--tw-prose-quotes': 'var(--foreground)',
            '--tw-prose-quote-borders': 'var(--border)',
            '--tw-prose-captions': 'var(--muted-foreground)',
            '--tw-prose-code': 'var(--foreground)',
            '--tw-prose-pre-code': 'var(--foreground)',
            '--tw-prose-pre-bg': 'var(--muted)',
            '--tw-prose-th-borders': 'var(--border)',
            '--tw-prose-td-borders': 'var(--border)',
            '--tw-prose-invert-body': 'var(--foreground)', // Assuming foreground is light in dark mode
            '--tw-prose-invert-headings': 'var(--foreground)',
            '--tw-prose-invert-lead': 'var(--muted-foreground)',
            '--tw-prose-invert-links': 'var(--primary)',
            '--tw-prose-invert-bold': 'var(--foreground)',
            '--tw-prose-invert-counters': 'var(--muted-foreground)',
            '--tw-prose-invert-bullets': 'var(--muted-foreground)',
            '--tw-prose-invert-hr': 'var(--border)',
            '--tw-prose-invert-quotes': 'var(--foreground)',
            '--tw-prose-invert-quote-borders': 'var(--border)',
            '--tw-prose-invert-captions': 'var(--muted-foreground)',
            '--tw-prose-invert-code': 'var(--foreground)',
            '--tw-prose-invert-pre-code': 'var(--foreground)',
            '--tw-prose-invert-pre-bg': 'var(--muted)',
            '--tw-prose-invert-th-borders': 'var(--border)',
            '--tw-prose-invert-td-borders': 'var(--border)',
            // Customizations
            code: {
                padding: '0.2em 0.4em',
                margin: '0',
                fontSize: '85%',
                backgroundColor: 'hsl(var(--muted))',
                borderRadius: '0.25rem',
                fontWeight: '400', // Ensure code block text isn't bold by default
                color: 'inherit' // Inherit color
            },
            'code::before': { content: 'none' }, // Remove default quotes around inline code
            'code::after': { content: 'none' },
            pre: {
                 fontWeight: '400', // Ensure pre block text isn't bold
                 color: 'inherit', // Inherit color
                 backgroundColor: 'hsl(var(--muted))', // Match inline code bg
                 padding: theme('padding.4'),
                 borderRadius: theme('borderRadius.sm'),
                 overflowX: 'auto',
            },
            'pre code': { // Style code specifically inside pre blocks
                 backgroundColor: 'transparent', // No background for code inside pre
                 padding: '0',
                 margin: '0',
                 fontSize: 'inherit', // Inherit font size from pre
                 color: 'inherit', // Inherit color from pre
                 fontWeight: 'inherit', // Inherit font weight
             },
            'pre code::before': { content: 'none' }, // Remove quotes for code inside pre
            'pre code::after': { content: 'none' },
          },
        },
      }),
    },
  },
  plugins: [require("tailwindcss-animate"), require('@tailwindcss/typography')],
}
```

## File: `postcss.config.js`
```js
module.exports = {
  plugins: {
    '@tailwindcss/postcss': {},
    autoprefixer: {},
  },
}
```

## File: `.env.local`
```local
# Environment variables for local development

# Base URL of your API Gateway (expuesto con ngrok o similar)
NEXT_PUBLIC_API_GATEWAY_URL=https://1942-2001-1388-53a1-a7c9-241c-4a44-2b12-938f.ngrok-free.app # <-- ¡REEMPLAZA ESTO!

# Supabase Credentials (Required for Supabase JS Client)
NEXT_PUBLIC_SUPABASE_URL=https://ymsilkrhstwxikjiqqog.supabase.co # <-- Tu URL de Supabase
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inltc2lsa3Joc3R3eGlramlxcW9nIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDI5NDAzOTIsImV4cCI6MjA1ODUxNjM5Mn0.s-RgS3tBAHl5UIZqoiPc8bGy2Kz3cktbDpjJkdvz0Jk # <-- Tu Anon Key de Supabase

# Opcional: Para saltar la verificación de autenticación durante el desarrollo
# Poner a 'true' para bypass, cualquier otro valor o ausente para requerir auth.
NEXT_PUBLIC_BYPASS_AUTH=false

# JWT_SECRET=... # <-- YA NO ES NECESARIO AQUÍ
```

## File: `.gitignore`
```
# See https://help.github.com/articles/ignoring-files/ for more about ignoring files.

# Dependencies
/node_modules
/.pnp
.pnp.js

# Testing
/coverage

# Next.js build output
/.next/
/out/

# Production build files
/build

# Static export files
/export

# Miscellaneous
.DS_Store
*.pem

# Nodejs dependency updates
npm-debug.log*
yarn-debug.log*
yarn-error.log*
pnpm-debug.log*

# Local environment variables
.env.local
.env.development.local
.env.test.local
.env.production.local

# Operating System Files
Thumbs.db
ehthumbs.db
ehthumbs_vista.db
*.stackdump

# IDE config files
.idea/
*.suo
*.ntvs*
*.njsproj
*.sln
*.sw?
.vscode/*
!.vscode/settings.json
!.vscode/tasks.json
!.vscode/launch.json
!.vscode/extensions.json
*.code-workspace

# Typescript cache
*.tsbuildinfo

# Optional eslint cache
.eslintcache

# Optional REPL history
.node_repl_history

# Turbo Repo
.turbo

# Drizzle Migration files (optional)
# drizzle/*
# !drizzle/meta/_journal

# Output of sensitive data extraction tool (e.g., git-secrets)
*.secret.*

# Optional VS Code files for debugging etc.
.history/
```

## File: `app\(app)\chat\[[...chatId]]\page.tsx`
```tsx
// File: app/(app)/chat/[[...chatId]]/page.tsx
// Purpose: Main chat interface page, using useAuth for state and API calls via lib/api.
"use client";

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useParams, useRouter, usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ChatInput } from '@/components/chat/chat-input';
import { ChatMessage, Message } from '@/components/chat/chat-message';
import { RetrievedDocumentsPanel } from '@/components/chat/retrieved-documents-panel';
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import {
    postQuery,
    getChatMessages,
    deleteChat,
    RetrievedDoc,
    ApiError,
    mapApiMessageToFrontend,
    mapApiSourcesToFrontend,
    ChatSummary,
    ChatMessageApi,
    QueryApiResponse
} from '@/lib/api';
import { toast } from "sonner";
import { PanelRightClose, PanelRightOpen, BrainCircuit, Loader2, AlertCircle, PlusCircle, RefreshCw } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { useAuth } from '@/lib/hooks/useAuth';
import { cn } from '@/lib/utils';

const welcomeMessage: Message = {
    id: 'initial-welcome',
    role: 'assistant',
    content: '¡Hola! Soy Atenex. Pregúntame cualquier cosa sobre tus documentos.',
    created_at: new Date().toISOString(),
};

export default function ChatPage() {
    const params = useParams();
    const router = useRouter();
    const pathname = usePathname();
    const { user, isLoading: isAuthLoading, signOut } = useAuth();

    const chatIdParam = params.chatId ? (Array.isArray(params.chatId) ? params.chatId[0] : params.chatId) : undefined;
    const [chatId, setChatId] = useState<string | undefined>(chatIdParam);

    const [messages, setMessages] = useState<Message[]>([welcomeMessage]);
    const [retrievedDocs, setRetrievedDocs] = useState<RetrievedDoc[]>([]);
    const [isSending, setIsSending] = useState(false);
    const [isLoadingHistory, setIsLoadingHistory] = useState(false);
    const [historyError, setHistoryError] = useState<string | null>(null);
    const [isSourcesPanelVisible, setIsSourcesPanelVisible] = useState(false);

    const scrollAreaRef = useRef<HTMLDivElement>(null);
    const fetchedChatIdRef = useRef<string | 'welcome' | undefined>(undefined);

    useEffect(() => {
        if (chatIdParam !== chatId) {
            console.log(`ChatPage: URL parameter changed. Setting chatId state to: ${chatIdParam}`);
            setChatId(chatIdParam);
            fetchedChatIdRef.current = undefined;
            setIsSourcesPanelVisible(false);
        }
    }, [chatIdParam, chatId]);

    useEffect(() => {
        const bypassAuth = process.env.NEXT_PUBLIC_BYPASS_AUTH === 'true';
        const currentFetchTarget = chatId || 'welcome';

        if (!bypassAuth && isAuthLoading) {
            console.log("ChatPage: Waiting for authentication...");
            setIsLoadingHistory(true);
            setMessages([]);
            return;
        }

        if (!bypassAuth && !user) {
            console.log("ChatPage: User not authenticated. Cannot fetch history.");
            setMessages([welcomeMessage]);
            setIsLoadingHistory(false);
            fetchedChatIdRef.current = 'welcome';
            return;
        }

        if (fetchedChatIdRef.current === currentFetchTarget) {
            if (isLoadingHistory) setIsLoadingHistory(false);
            return;
        }

        console.log(`ChatPage: Fetching history for target: ${currentFetchTarget}`);
        setIsLoadingHistory(true);
        setHistoryError(null);
        setMessages([]);
        setRetrievedDocs([]);
        setIsSourcesPanelVisible(false);
        fetchedChatIdRef.current = currentFetchTarget;

        if (chatId) {
            getChatMessages(chatId)
                .then((apiMessages: ChatMessageApi[]) => {
                    const sortedMessages = [...apiMessages].sort((a, b) => {
                        const timeA = a.created_at ? new Date(a.created_at).getTime() : 0;
                        const timeB = b.created_at ? new Date(b.created_at).getTime() : 0;
                        const validTimeA = !isNaN(timeA) ? timeA : 0;
                        const validTimeB = !isNaN(timeB) ? timeB : 0;
                        if (validTimeA === 0 && validTimeB === 0) return 0;
                        if (validTimeA === 0) return -1;
                        if (validTimeB === 0) return 1;
                        return validTimeA - validTimeB;
                    });

                    const mappedMessages = sortedMessages.map(mapApiMessageToFrontend);
                    setMessages(mappedMessages.length > 0 ? mappedMessages : [welcomeMessage]);
                    console.log(`ChatPage: History loaded successfully for ${chatId}. ${mappedMessages.length} messages.`);
                })
                .catch(error => {
                    console.error(`ChatPage: Error loading history for chat ${chatId}:`, error);
                    let message = "Fallo al cargar el historial del chat.";
                    if (error instanceof ApiError) {
                        message = error.message || `Error API (${error.status})`;
                        if (error.status === 401 || error.status === 403) {
                            message = "Sesión expirada o inválida. Por favor, inicia sesión de nuevo.";
                            toast.error("Error de Autenticación", { description: message });
                            signOut();
                        } else if (error.status === 404) {
                            message = "Chat no encontrado o no tienes permiso para acceder a él.";
                            router.replace('/chat');
                        } else {
                            toast.error("Fallo al cargar historial", { description: message });
                        }
                    } else {
                        toast.error("Fallo al cargar historial", { description: "Ocurrió un error inesperado." });
                    }
                    setHistoryError(message);
                    setMessages([welcomeMessage]);
                    fetchedChatIdRef.current = undefined;
                })
                .finally(() => {
                    setIsLoadingHistory(false);
                    console.log(`ChatPage: Finished loading attempt for ${chatId}`);
                });
        } else {
            console.log("ChatPage: No chatId provided, showing welcome message.");
            setMessages([welcomeMessage]);
            setRetrievedDocs([]);
            setIsLoadingHistory(false);
            setIsSourcesPanelVisible(false);
            fetchedChatIdRef.current = 'welcome';
        }
    }, [chatId, user, isAuthLoading, signOut, router]);

    useEffect(() => {
        if (scrollAreaRef.current) {
            const scrollElement = scrollAreaRef.current;
            const timeoutId = setTimeout(() => {
                scrollElement.scrollTo({ top: scrollElement.scrollHeight, behavior: 'smooth' });
            }, 100);
            return () => clearTimeout(timeoutId);
        }
    }, [messages, isSending]);

    const handleSendMessage = useCallback(async (query: string) => {
        const bypassAuth = process.env.NEXT_PUBLIC_BYPASS_AUTH === 'true';
        const isAuthenticated = !!user || bypassAuth;

        if (!query.trim()) {
            toast.warning("No se puede enviar un mensaje vacío.");
            return;
        }
        if (!isAuthenticated) {
            toast.error("No Autenticado", { description: "Por favor, inicia sesión para enviar mensajes."});
            signOut();
            return;
        }
        if (isSending) {
            console.warn("ChatPage: Envío de mensaje ya en progreso.");
            return;
        }

        const userMessage: Message = {
            id: `client-user-${Date.now()}`,
            role: 'user',
            content: query,
            created_at: new Date().toISOString()
        };
        setMessages(prev => [...prev.filter(m => m.id !== 'initial-welcome'), userMessage]);
        setIsSending(true);
        setRetrievedDocs([]);

        const currentChatIdForApi = chatId || null;
        console.log(`ChatPage: Sending query to API (Chat ID: ${currentChatIdForApi || 'New'})...`);

        try {
            const response: QueryApiResponse = await postQuery({
                query,
                chat_id: currentChatIdForApi,
            });

            const returnedChatId = response.chat_id;
            const mappedSources = mapApiSourcesToFrontend(response.retrieved_documents as any);

            const assistantMessage: Message = {
                id: `client-assistant-${Date.now()}`,
                role: 'assistant',
                content: response.answer,
                sources: mappedSources,
                created_at: new Date().toISOString()
            };

            setMessages(prev => [...prev, assistantMessage]);
            setRetrievedDocs(mappedSources || []);

            if (!currentChatIdForApi && returnedChatId) {
                console.log(`ChatPage: New chat created with ID: ${returnedChatId}. Updating URL and state.`);
                setChatId(returnedChatId);
                fetchedChatIdRef.current = returnedChatId;
                router.replace(`/chat/${returnedChatId}`, { scroll: false });
            } else if (currentChatIdForApi && currentChatIdForApi !== returnedChatId) {
                 console.warn(`ChatPage: API returned a different chat ID (${returnedChatId}) than expected (${currentChatIdForApi}) for an existing chat.`);
            }

            if (mappedSources && mappedSources.length > 0) {
                setIsSourcesPanelVisible(true);
            }
             console.log(`ChatPage: Query successful. Answer received for chat ${returnedChatId}.`);

        } catch (error) {
            console.error("ChatPage: Query failed:", error);
            let errorMessage = "Lo siento, ocurrió un error al procesar tu solicitud.";
             if (error instanceof ApiError) {
                 errorMessage = error.message || `Error API (${error.status})`;
                 if (error.status === 401 || error.status === 403) {
                     errorMessage = "Error de autenticación. Por favor, inicia sesión de nuevo.";
                     signOut();
                 } else {
                      toast.error("Consulta Fallida", { description: errorMessage });
                 }
             } else if (error instanceof Error) {
                 errorMessage = `Error: ${error.message}`;
                 toast.error("Consulta Fallida", { description: errorMessage });
             } else {
                  toast.error("Consulta Fallida", { description: "Ocurrió un error desconocido." });
             }

            const errorMsgObj: Message = {
                id: `error-${Date.now()}`,
                role: 'assistant',
                content: errorMessage,
                isError: true,
                created_at: new Date().toISOString()
            };
            setMessages(prev => [...prev, errorMsgObj]);

        } finally {
            setIsSending(false);
        }
    }, [chatId, isSending, user, router, signOut]);

    const handlePanelToggle = () => { setIsSourcesPanelVisible(!isSourcesPanelVisible); };

    const handleNewChat = () => {
        if (pathname !== '/chat') {
             console.log("ChatPage: Starting new chat.");
             router.push('/chat');
        } else {
             setMessages([welcomeMessage]);
             setRetrievedDocs([]);
             setChatId(undefined);
             setIsSourcesPanelVisible(false);
             fetchedChatIdRef.current = 'welcome';
             console.log("ChatPage: Already on new chat page, reset state.");
        }
    };

    const renderChatContent = (): React.ReactNode => {
        if (isLoadingHistory) {
            return (
                <div className="space-y-4 p-4">
                    <Skeleton className="h-16 w-3/4 rounded-lg" />
                    <Skeleton className="h-16 w-1/2 ml-auto rounded-lg" />
                    <Skeleton className="h-16 w-3/4 rounded-lg" />
                </div>
            );
        }

        if (historyError) {
            return (
                <div className="flex flex-col items-center justify-center h-full text-destructive p-4 text-center">
                    <AlertCircle className="h-10 w-10 mb-3" />
                    <p className="text-lg font-semibold mb-1">Error al Cargar el Chat</p>
                    <p className="text-sm mb-4">{historyError}</p>
                    <Button variant="outline" size="sm" onClick={() => window.location.reload()} className="mt-4">
                         <RefreshCw className="mr-2 h-4 w-4" />
                        Reintentar Carga
                    </Button>
                </div>
            );
        }

        return (
            // MODIFICADO: Aumentado espaciado vertical entre mensajes
            <div className="space-y-6 pb-4">
                {messages.map((message) => (
                     <ChatMessage key={message.id} message={message} />
                ))}
                {isSending && (
                    // MODIFICADO: Estilo "pensando" más sutil
                    <div className="flex items-center justify-center pt-4">
                        <div className="flex items-center space-x-1.5 text-xs text-muted-foreground">
                            <BrainCircuit className="h-4 w-4 animate-pulse" />
                            <span>Atenex está pensando...</span>
                         </div>
                    </div>
                )}
            </div>
        );
    };

    return (
        <div className="flex flex-col h-full bg-muted/20 dark:bg-background">
             <ResizablePanelGroup direction="horizontal" className="flex-1 overflow-hidden">
                 <ResizablePanel defaultSize={isSourcesPanelVisible ? 70 : 100} minSize={30}>
                     <div className="flex h-full flex-col relative">
                         <div className="absolute top-3 right-3 z-20">
                             <Button
                                onClick={handlePanelToggle}
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 bg-background/50 hover:bg-muted rounded-full"
                                aria-label={isSourcesPanelVisible ? 'Cerrar Panel de Fuentes' : 'Abrir Panel de Fuentes'}
                             >
                                 {isSourcesPanelVisible ? <PanelRightClose className="h-5 w-5" /> : <PanelRightOpen className="h-5 w-5" />}
                             </Button>
                         </div>

                         {/* MODIFICADO: Padding superior e inferior ajustados */}
                         <ScrollArea className="flex-1 px-4 pt-6 pb-6" ref={scrollAreaRef}>
                             {renderChatContent()}
                         </ScrollArea>

                         <div className="border-t p-4 bg-background shadow-inner shrink-0">
                             <ChatInput
                                 onSendMessage={handleSendMessage}
                                 isLoading={isSending || isLoadingHistory || isAuthLoading}
                             />
                         </div>
                     </div>
                 </ResizablePanel>

                 {isSourcesPanelVisible && (
                     <>
                         <ResizableHandle withHandle className="bg-border" />
                         <ResizablePanel defaultSize={30} minSize={20} maxSize={50}>
                             <RetrievedDocumentsPanel
                                 documents={retrievedDocs}
                                 isLoading={isSending}
                             />
                         </ResizablePanel>
                     </>
                 )}
             </ResizablePanelGroup>
        </div>
    );
}
```

## File: `app\(app)\knowledge\page.tsx`
```tsx
// File: app/(app)/knowledge/page.tsx (MODIFICADO)
'use client';
import React from 'react'; // No se necesita useState, useEffect, useCallback aquí
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button'; // Import Button
import { Loader2 } from 'lucide-react';
import { useAuth } from '@/lib/hooks/useAuth';
import { useDocumentStatuses } from '@/lib/hooks/useDocumentStatuses'; // Hook para estados
import { useUploadDocument } from '@/lib/hooks/useUploadDocument'; // Hook para subida
import { DocumentStatusList } from '@/components/knowledge/document-status-list';
import { FileUploader } from '@/components/knowledge/file-uploader';
import { AuthHeaders } from '@/lib/api';

export default function KnowledgePage() {
  const { user, isLoading: isAuthLoading } = useAuth();

  // Hook para manejar la lista de estados de documentos
  const {
    documents,
    isLoading: isLoadingDocuments,
    error: documentsError,
    fetchDocuments, // Función para refrescar la lista
    retryLocalUpdate, // Función para actualizar localmente al reintentar
  } = useDocumentStatuses();

  // Hook para manejar la subida de archivos
  const {
    isUploading,
    uploadError,
    // uploadResponse, // No necesitamos mostrar la respuesta aquí directamente
    uploadFile,
    clearUploadStatus // Para limpiar el error de subida si el usuario interactúa de nuevo
  } = useUploadDocument(
    // Callback onSuccess: Refrescar la lista después de subir
    () => {
        // Pequeño delay para dar tiempo al backend a actualizar el estado
        setTimeout(() => {
            fetchDocuments();
        }, 1500);
    }
  );

  // Handler para el botón de reintentar en la lista
  const handleRetrySuccess = (documentId: string) => {
    retryLocalUpdate(documentId); // Actualiza UI localmente
    // Opcional: refrescar toda la lista después de un tiempo
    // setTimeout(fetchDocuments, 5000);
  };

  // Construir headers solo si el usuario está autenticado
  const authHeadersForChildren: AuthHeaders | null = user?.userId && user?.companyId ? {
    'X-User-ID': user.userId,
    'X-Company-ID': user.companyId,
  } : null;

  // Estado de carga principal (Autenticación)
  if (isAuthLoading) {
    return (
        <div className="container mx-auto p-4 md:p-6 lg:p-8">
          <h1 className="text-2xl font-semibold mb-6">
             <Skeleton className="h-8 w-1/2" />
          </h1>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1 space-y-3">
               <Skeleton className="h-6 w-1/3" />
               <Skeleton className="h-32 w-full" />
               <Skeleton className="h-10 w-full" />
            </div>
            <div className="lg:col-span-2 space-y-3">
               <Skeleton className="h-6 w-1/4" />
               <Skeleton className="h-10 w-full" />
               <Skeleton className="h-10 w-full" />
               <Skeleton className="h-10 w-full" />
            </div>
          </div>
        </div>
    );
  }

  // Renderizado principal
  return (
    <div className="container mx-auto p-4 md:p-6 lg:p-8 space-y-6">
      <h1 className="text-2xl font-semibold">Gestionar Base de Conocimiento</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8"> {/* Aumentado gap */}
        {/* Columna de subida */}
        <div className="lg:col-span-1 space-y-4"> {/* Añadido space-y */}
          <h2 className="text-lg font-medium">Subir Nuevo Documento</h2>
          {authHeadersForChildren ? (
            <FileUploader
              authHeaders={authHeadersForChildren}
              onUploadFile={uploadFile} // Pasar la función de subida del hook
              isUploading={isUploading} // Pasar estado de carga del hook
              uploadError={uploadError} // Pasar error de subida del hook
              clearUploadStatus={clearUploadStatus} // Pasar función para limpiar estado
            />
          ) : (
            <p className="text-muted-foreground text-sm border p-4 rounded-md bg-muted/50">
              Inicia sesión para poder subir nuevos documentos a tu base de conocimiento.
            </p>
          )}
        </div>

        {/* Columna de listado */}
        <div className="lg:col-span-2 space-y-4"> {/* Wrap list column content */}
           <div className='flex justify-between items-center'>
              <h2 className="text-lg font-medium">Documentos Subidos</h2>
              {/* Botón opcional para refrescar manualmente */}
              {authHeadersForChildren && (
                 <Button variant="outline" size="sm" onClick={fetchDocuments} disabled={isLoadingDocuments}>
                    <Loader2 className={`mr-2 h-4 w-4 ${isLoadingDocuments ? 'animate-spin' : 'hidden'}`} /> {/* Use template literal for class */}
                    Refrescar Lista
                 </Button>
             )}
          </div>

          {/* Mostrar error de carga de la lista */}
          {documentsError && (
              <div className="text-destructive border border-destructive/50 bg-destructive/10 p-3 rounded-md text-sm">
                Error al cargar documentos: {documentsError}
              </div>
          )}

          {/* Mostrar estado de carga de la lista */}
          {isLoadingDocuments ? (
             <div className="space-y-2">
                <Skeleton className="h-12 w-full" />
                <Skeleton className="h-12 w-full" />
                <Skeleton className="h-12 w-full" />
             </div>
          ) : (
            // Renderizar la lista solo si hay headers (usuario logueado)
            authHeadersForChildren ? (
                <DocumentStatusList
                  documents={documents}
                  isLoading={false}
                  onRetrySuccess={handleRetrySuccess}
                  authHeaders={authHeadersForChildren} // Pasar headers por si se necesitan dentro
                />
            ) : (
                // Mensaje si no está cargando, no hay error y no hay usuario
                !documentsError && <p className="text-muted-foreground text-center py-6">Inicia sesión para ver tus documentos.</p>
            )
          )}
        </div> {/* Close list column wrapper */}
      </div>
    </div>
  );
}
```

## File: `app\(app)\layout.tsx`
```tsx
// File: app/(app)/layout.tsx
// Purpose: Layout for authenticated sections, handling route protection.
"use client";

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Sidebar } from '@/components/layout/sidebar';
import { Header } from '@/components/layout/header';
import { useAuth } from '@/lib/hooks/useAuth';
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const { user, isLoading, signOut } = useAuth();
  const router = useRouter();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const bypassAuth = process.env.NEXT_PUBLIC_BYPASS_AUTH === 'true';

  // Ref to track if the "incomplete setup" warning has been shown for this session load
  const incompleteSetupWarningShown = useRef(false);

  useEffect(() => {
    // Reset warning flag if user changes significantly (e.g., new login)
    incompleteSetupWarningShown.current = false;
  }, [user?.userId]); // Reset based on user ID change

  useEffect(() => {
    if (bypassAuth) {
      console.warn("AppLayout: Auth check SKIPPED (Bypass).");
      return;
    }

    // Don't redirect or evaluate further if auth state is still loading
    if (isLoading) {
      console.log("AppLayout: Waiting for auth state...");
      return;
    }

    // If loading is finished and there's no user, redirect to home/login
    if (!user) {
      console.log("AppLayout: No user found after loading, redirecting to /");
      router.replace('/');
      return;
    }

    // If user exists, but lacks companyId
    if (user && !user.companyId) {
       // Only show the toast ONCE per session load attempt to avoid repetition
       if (!incompleteSetupWarningShown.current) {
          console.error(`AppLayout: User data is incomplete (CompanyID: ${user?.companyId}). Showing warning.`);
          toast.error("Incomplete Account Setup", {
             description: "Your account setup seems incomplete (missing company association). Attempting to resolve or please log in again.",
             duration: 8000, // Longer duration
             id: "incomplete-setup-warn", // Prevent duplicates
          });
          incompleteSetupWarningShown.current = true; // Mark as shown for this session instance
       }
       // Optionally force logout immediately:
       // signOut();
       // Or let the user stay but potentially face API errors (depends on desired UX)
       return; // Don't proceed to render children if state is known to be invalid
    }

    // If we reach here: Loading is false, user exists, user.companyId exists.
    console.log("AppLayout: Auth check passed.");
    // Reset warning flag if we reach a valid state
    incompleteSetupWarningShown.current = false;

  }, [isLoading, user, bypassAuth, router, signOut]); // Dependencies

  // --- Render Loading State ---
  if (!bypassAuth && isLoading) {
    return (
      <div className="flex h-screen items-center justify-center bg-background">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
        <p className="mt-4 text-muted-foreground">Loading session...</p>
      </div>
    );
  }

  // --- Render Auth Wall / Incomplete State Blocker ---
  // Prevent rendering children if:
  // 1. Auth is NOT bypassed AND
  // 2. EITHER (a) auth is still loading OR (b) loading is done but there's no user OR (c) user data is incomplete
  const shouldBlockRender = !bypassAuth && (isLoading || !user || !user.companyId);

  if (shouldBlockRender) {
      console.log("AppLayout: Auth guard preventing render.");
      // Render a loader or null while waiting for redirect or state resolution
      return (
        <div className="flex h-screen items-center justify-center bg-background">
          <Loader2 className="h-12 w-12 animate-spin text-primary" />
           {/* Optionally show a message if blocked due to incomplete setup */}
           {!isLoading && user && !user.companyId && (
              <p className="mt-4 text-destructive">Resolving account setup...</p>
           )}
        </div>
      );
  }

  // --- Render Protected Layout ---
  console.log("AppLayout: Rendering protected layout...");
  return (
     <div className="flex h-screen bg-secondary/30 dark:bg-muted/30 overflow-hidden">
      <ResizablePanelGroup direction="horizontal" className="h-full items-stretch">
          <ResizablePanel
              collapsible collapsedSize={4} minSize={15} maxSize={25} defaultSize={20}
              onCollapse={() => setIsSidebarCollapsed(true)}
              onExpand={() => setIsSidebarCollapsed(false)}
              className={cn(
                  "transition-all duration-300 ease-in-out bg-background dark:bg-card",
                  isSidebarCollapsed ? "min-w-[50px] max-w-[50px]" : "min-w-[200px]"
              )}
              order={1}
          >
              <Sidebar isCollapsed={isSidebarCollapsed} />
          </ResizablePanel>
          <ResizableHandle withHandle className="bg-border" />
          <ResizablePanel defaultSize={80} minSize={30} order={2}>
              <div className="flex h-full flex-col">
                  <Header />
                  <main className="flex-1 overflow-y-auto bg-background p-4 md:p-6 lg:p-8">
                      {children}
                  </main>
              </div>
          </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}
```

## File: `app\(app)\settings\page.tsx`
```tsx
// File: app/(app)/settings/page.tsx
"use client";

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/lib/hooks/useAuth';
import { useState, useEffect } from 'react';
import { toast } from 'sonner'; // Para notificaciones

export default function SettingsPage() {
    const { user } = useAuth();
    const [name, setName] = useState(user?.name || '');
    const [isSaving, setIsSaving] = useState(false); // Estado para el botón

    useEffect(() => {
        if (user) {
            setName(user.name || '');
        }
    }, [user]);

    const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value);
    };

    const handleSave = async () => {
        setIsSaving(true);
        // TODO: Implementar llamada API real a /users/me/update o similar
        console.log('Guardando cambios (simulado):', { name });
        try {
          // Simular llamada a API
          await new Promise(resolve => setTimeout(resolve, 1000));
          // Aquí iría la llamada real: await updateUserProfile({ name });
          toast.success("Perfil Actualizado", { description: "Tu nombre ha sido guardado." });
          // Opcional: actualizar el estado global del usuario si el nombre cambia
          // (requeriría una función updateUser en useAuth)
        } catch (error) {
          console.error("Error al guardar perfil:", error);
          toast.error("Error al Guardar", { description: "No se pudo actualizar el perfil." });
        } finally {
           setIsSaving(false);
        }
    };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Configuración</h1>

      <Card>
        <CardHeader>
          <CardTitle>Perfil</CardTitle>
          <CardDescription>Administra tu información personal.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
            <div className="space-y-1">
                 <Label htmlFor="name">Nombre</Label>
                 <Input
                    id="name"
                    value={name}
                    onChange={handleNameChange}
                    disabled={isSaving}
                 />
            </div>
             <div className="space-y-1">
                 <Label htmlFor="email">Correo electrónico</Label>
                 <Input id="email" type="email" defaultValue={user?.email} disabled />
                 <p className="text-xs text-muted-foreground">El correo electrónico no se puede cambiar.</p>
            </div>
             <Button onClick={handleSave} disabled={isSaving || name === (user?.name || '')}>
                {isSaving ? "Guardando..." : "Guardar Cambios"}
             </Button>
        </CardContent>
      </Card>

       <Separator />

       <Card>
        <CardHeader>
          <CardTitle>Configuración de la Empresa</CardTitle>
          <CardDescription>Administra la configuración relacionada con tu empresa.</CardDescription>
        </CardHeader>
        <CardContent>
           <p className="text-sm text-muted-foreground">La gestión de la configuración de la empresa aún no está implementada.</p>
           {/* Placeholder para futuras opciones */}
           {/* <div className="space-y-2 mt-4">
                <Label htmlFor="companyName">Nombre de la Empresa</Label>
                <Input id="companyName" defaultValue={user?.companyId} disabled/>
           </div> */}
        </CardContent>
      </Card>

       <Separator />

       <Card>
        <CardHeader>
          <CardTitle>Apariencia</CardTitle>
          <CardDescription>Personaliza la apariencia de la interfaz.</CardDescription>
        </CardHeader>
        <CardContent>
           <p className="text-sm text-muted-foreground">La selección de temas está disponible en el encabezado.</p>
           {/* Aquí podría ir el ThemePaletteButton si se quisiera aquí también */}
        </CardContent>
      </Card>

    </div>
  );
}
```

## File: `app\(auth)\layout.tsx`
```tsx
import React from 'react';
import Image from 'next/image';
import { APP_NAME } from '@/lib/constants';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-secondary via-background to-secondary p-4">
       <div className="mb-8 flex items-center space-x-3">
         {/* Placeholder logo - replace with actual Atenex logo */}
         {/* <Image src="/placeholder.svg?width=40&height=40" alt={`${APP_NAME} Logo`} width={40} height={40} className="text-primary" /> */}
         <span className="text-3xl font-bold text-primary">{APP_NAME}</span>
       </div>
      {children}
    </div>
  );
}
```

## File: `app\(auth)\login\page.tsx`
```tsx
import { LoginForm } from "@/components/auth/login-form";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

export default function LoginPage() {
  return (
    <Card className="w-full max-w-md shadow-lg">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl">Iniciar Sesión</CardTitle>
        <CardDescription>Accede a tu cuenta Atenex</CardDescription>
      </CardHeader>
      <CardContent>
        <LoginForm />
      </CardContent>
    </Card>
  );
}
```

## File: `app\about\page.tsx`
```tsx
"use client";

import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { APP_NAME } from '@/lib/constants';
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

const teamMembers = [
    { name: "Demo User 1", role: "Fundador", imageUrl: null },
    { name: "Demo User 2", role: "Co-Fundador", imageUrl: null },
    { name: "Demo User 3", role: "Ingeniero Líder", imageUrl: null },
    // Add more team members as needed
];

const milestones = [
    { year: 2023, event: "Atenex fundada con una visión de conocimiento accesible." },
    // Add more milestones
];

export default function AboutPage() {
    const router = useRouter();

  return (
      <div className="container mx-auto p-6 space-y-4">
          <Button variant="link" onClick={() => router.push('/')}>Volver al Inicio</Button>
          <h1 className="text-3xl font-semibold">Acerca de {APP_NAME}</h1>

          <Card>
              <CardHeader>
                  <CardTitle>Nuestra Misión</CardTitle>
                  <CardDescription>
                      Empoderar a las organizaciones con acceso fluido a su conocimiento colectivo.
                  </CardDescription>
              </CardHeader>
              <CardContent>
                  <p>
                      Estamos comprometidos a proporcionar soluciones innovadoras que optimicen la gestión del conocimiento,
                      faciliten la toma de decisiones informadas y mejoren la productividad del equipo.
                  </p>
              </CardContent>
          </Card>

          <Separator />

          <Card>
              <CardHeader>
                  <CardTitle>Nuestra Visión</CardTitle>
                  <CardDescription>
                      Ser la plataforma líder de consulta de conocimiento, transformando cómo las empresas aprovechan la información.
                  </CardDescription>
              </CardHeader>
              <CardContent>
                  <p>
                      Visualizamos un futuro donde las organizaciones pueden aprovechar sin esfuerzo su experiencia interna,
                      fomentando una cultura de aprendizaje y crecimiento continuos.
                  </p>
              </CardContent>
          </Card>

          <Separator />

          <Card>
              <CardHeader>
                  <CardTitle>Nuestros Valores</CardTitle>
                  <CardDescription>
                      Integridad, Innovación, Colaboración y Éxito del Cliente.
                  </CardDescription>
              </CardHeader>
              <CardContent>
                  <ul className="list-disc list-inside space-y-1">
                      <li>
                          <strong>Integridad:</strong> Mantenemos los más altos estándares éticos en todas nuestras operaciones.
                      </li>
                      <li>
                          <strong>Innovación:</strong> Buscamos continuamente nuevas formas de mejorar nuestra plataforma y servicios.
                      </li>
                      <li>
                          <strong>Colaboración:</strong> Creemos en trabajar juntos para lograr objetivos compartidos.
                      </li>
                      <li>
                          <strong>Éxito del Cliente:</strong> Estamos dedicados a ayudar a nuestros clientes a tener éxito.
                      </li>
                  </ul>
              </CardContent>
          </Card>
          <Separator />

          <Card>
              <CardHeader>
                  <CardTitle>Conoce a Nuestro Equipo</CardTitle>
                  <CardDescription>
                      Las talentosas personas detrás de {APP_NAME}.
                  </CardDescription>
              </CardHeader>
              <CardContent className="flex justify-center">
                  <div className="grid sm:grid-cols-3 gap-4">
                    {teamMembers.map((member) => (
                        <div key={member.name} className="flex flex-col items-center">
                            <Avatar className="h-16 w-16">
                                {member.imageUrl ? (
                                    <img src={member.imageUrl} alt={member.name} />
                                ) : (
                                    <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                                )}
                            </Avatar>
                            <div className="mt-2 text-center">
                                <p className="font-medium">{member.name}</p>
                                <p className="text-sm text-muted-foreground">{member.role}</p>
                            </div>
                        </div>
                    ))}
                </div>
              </CardContent>
          </Card>
      </div>
  );
}
```

## File: `app\contact\page.tsx`
```tsx
// File: app/contact/page.tsx
"use client";

import React from 'react';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { APP_NAME } from '@/lib/constants';
import { useAuth } from '@/lib/hooks/useAuth';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Mail, Phone, Linkedin, MessageCircle, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

export default function ContactPage() {
  const router = useRouter();
  const { user, isLoading: isAuthLoading } = useAuth();
  const isAuthenticated = !isAuthLoading && !!user;

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-md border-b">
        <div className="container flex items-center justify-between h-16 py-4 px-4 md:px-6">
          <button onClick={() => router.push('/')} className="font-bold text-2xl text-primary focus:outline-none focus:ring-2 focus:ring-ring rounded-sm">
            {APP_NAME}
          </button>
          {/* Botones traducidos */}
          <nav className="flex items-center space-x-2 sm:space-x-4">
            <LinkButton href="/">Inicio</LinkButton>
            <LinkButton href="/about">Nosotros</LinkButton>
            <LinkButton href="/contact" isActive={true}>Contacto</LinkButton>
             <div className="ml-2">
                {isAuthLoading ? (
                    <Button variant="secondary" disabled={true} size="sm">
                        <Loader2 className="h-4 w-4 animate-spin" />
                    </Button>
                ) : isAuthenticated ? (
                    // Botón traducido
                    <Button variant="secondary" onClick={() => router.push('/chat')} size="sm">
                        Ir a la App
                    </Button>
                ) : (
                    // Botón traducido
                    <Button onClick={() => router.push('/login')} size="sm" className="transition-colors duration-150 hover:bg-primary/90 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
                        Acceder
                    </Button>
                )}
            </div>
          </nav>
        </div>
      </header>

      <main className="container mx-auto px-4 py-16 md:py-24 flex-1">
        {/* Textos traducidos */}
        <section className="text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-foreground mb-6">
            Contáctanos
          </h1>
          <p className="text-lg text-muted-foreground mb-12 max-w-2xl mx-auto">
            ¿Tienes preguntas o comentarios? ¡Nos encantaría escucharte! Contáctanos usando el formulario o nuestros canales de contacto.
          </p>
        </section>

        <section className="max-w-lg mx-auto">
          <Card className="shadow-lg">
            <CardHeader>
              {/* Textos traducidos */}
              <CardTitle>Envíanos un Mensaje</CardTitle>
              <CardDescription>
                Normalmente respondemos en 1-2 días hábiles.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ContactForm />
            </CardContent>
          </Card>
        </section>
      </main>

      <footer className="bg-muted/10 border-t py-8 mt-16">
        {/* Texto traducido */}
        <div className="container text-center text-muted-foreground text-sm">
          © {new Date().getFullYear()} {APP_NAME}. Todos los derechos reservados.
        </div>
      </footer>
    </div>
  );
}

// Componente traducido
function LinkButton({ href, children, isActive = false }: { href: string; children: React.ReactNode; isActive?: boolean }) {
  const router = useRouter();
  return (
    <Button
        variant="link"
        onClick={() => router.push(href)}
        className={cn(
            "text-sm sm:text-base hover:text-primary/80 focus:outline-none focus:ring-2 focus:ring-ring rounded-sm px-1 sm:px-2",
            isActive ? "text-primary font-medium underline underline-offset-4" : "text-muted-foreground"
        )}
     >
      {children}
    </Button>
  );
}

// Formulario de contacto traducido
function ContactForm() {
  const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      console.log("Formulario de contacto enviado (implementar lógica de envío)");
      toast.info("Formulario Enviado (Simulado)", { description: "La lógica de envío del formulario de contacto necesita implementación."});
  }

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-foreground mb-1">
            Nombre:
          </label>
          <input
            type="text"
            id="name"
            required
            className="block w-full rounded-md border-input bg-background shadow-sm focus:border-ring focus:ring-ring/50 sm:text-sm p-2"
            placeholder="Tu Nombre"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-foreground mb-1">
            Correo Electrónico:
          </label>
          <input
            type="email"
            id="email"
            required
             className="block w-full rounded-md border-input bg-background shadow-sm focus:border-ring focus:ring-ring/50 sm:text-sm p-2"
            placeholder="tu@ejemplo.com"
          />
        </div>
        <div>
          <label htmlFor="message" className="block text-sm font-medium text-foreground mb-1">
            Mensaje:
          </label>
          <textarea
            id="message"
            rows={4}
            required
            className="block w-full rounded-md border-input bg-background shadow-sm focus:border-ring focus:ring-ring/50 sm:text-sm p-2 min-h-[100px]"
            placeholder="Tu Mensaje"
          />
        </div>
        <Button type="submit" className="w-full">
          Enviar Mensaje
        </Button>
      </form>

      <div className="space-y-3 pt-6 border-t">
         <h3 className="text-sm font-medium text-muted-foreground mb-2">Otras formas de contactarnos:</h3>
        {/* Labels y textos traducidos */}
        <ContactInfoItem Icon={Mail} label="Correo:" href="mailto:info@atenex.ai" text="info@atenex.ai" />
        <ContactInfoItem Icon={Phone} label="Teléfono:" href="tel:+15551234567" text="+1 (555) 123-4567" />
        <ContactInfoItem Icon={Linkedin} label="LinkedIn:" href="https://linkedin.com/company/atenex" text="Atenex en LinkedIn" targetBlank={true} />
        <ContactInfoItem Icon={MessageCircle} label="WhatsApp:" href="https://wa.me/15551234567" text="Chatea por WhatsApp" targetBlank={true}/>
      </div>
    </div>
  );
}

// Componente de item de contacto (sin cambios internos, usa props traducidas)
function ContactInfoItem({ Icon, label, href, text, targetBlank = false }: { Icon: React.ElementType, label: string, href: string, text: string, targetBlank?: boolean }) {
    return (
        <div className="flex items-center space-x-2 text-sm">
          <Icon className="h-4 w-4 text-muted-foreground flex-shrink-0" />
          <span className="text-muted-foreground">{label}</span>
          <a
            href={href}
            className="text-primary hover:underline truncate"
            target={targetBlank ? "_blank" : undefined}
            rel={targetBlank ? "noopener noreferrer" : undefined}
          >
            {text}
          </a>
        </div>
    );
}
```

## File: `app\globals.css`
```css
/* File: atenex-frontend/app/globals.css */

/* 1. Importa Tailwind v4 */
@import "tailwindcss";

/* 2. Define variables base FUERA del @theme */
/* Variables para el tema claro (:root) */
:root {
    --radius: 0.625rem;
    /* Variables OKLCH */
    --background: oklch(1 0 0);
    --foreground: oklch(0.145 0 0);
    --card: oklch(1 0 0);
    --card-foreground: oklch(0.145 0 0);
    --popover: oklch(1 0 0);
    --popover-foreground: oklch(0.145 0 0);
    --primary: oklch(0.205 0 0); /* Negro por defecto */
    --primary-foreground: oklch(0.985 0 0); /* Blanco */
    --secondary: oklch(0.97 0 0);
    --secondary-foreground: oklch(0.205 0 0);
    --muted: oklch(0.97 0 0);
    --muted-foreground: oklch(0.556 0 0);
    --accent: oklch(0.97 0 0);
    --accent-foreground: oklch(0.205 0 0);
    --destructive: oklch(0.577 0.245 27.325);
    --border: oklch(0.922 0 0);
    --input: oklch(0.922 0 0);
    --ring: oklch(0.708 0 0); /* Color de anillo por defecto */
    /* Variables de Chart */
    --chart-1: oklch(0.646 0.222 41.116);
    --chart-2: oklch(0.6 0.118 184.704);
    --chart-3: oklch(0.398 0.07 227.392);
    --chart-4: oklch(0.828 0.189 84.429);
    --chart-5: oklch(0.769 0.188 70.08);
    /* Variables de Sidebar */
    --sidebar: oklch(0.985 0 0);
    --sidebar-foreground: oklch(0.145 0 0);
    --sidebar-primary: oklch(0.205 0 0);
    --sidebar-primary-foreground: oklch(0.985 0 0);
    --sidebar-accent: oklch(0.97 0 0);
    --sidebar-accent-foreground: oklch(0.205 0 0);
    --sidebar-border: oklch(0.922 0 0);
    --sidebar-ring: oklch(0.708 0 0);
}

/* Variables para el tema oscuro (.dark) */
.dark {
    --background: oklch(0.145 0 0);
    --foreground: oklch(0.985 0 0);
    --card: oklch(0.205 0 0);
    --card-foreground: oklch(0.985 0 0);
    --popover: oklch(0.205 0 0);
    --popover-foreground: oklch(0.985 0 0);
    --primary: oklch(0.922 0 0); /* Blanco/Gris claro en modo oscuro */
    --primary-foreground: oklch(0.205 0 0); /* Negro */
    --secondary: oklch(0.269 0 0);
    --secondary-foreground: oklch(0.985 0 0);
    --muted: oklch(0.269 0 0);
    --muted-foreground: oklch(0.708 0 0);
    --accent: oklch(0.269 0 0);
    --accent-foreground: oklch(0.985 0 0);
    --destructive: oklch(0.704 0.191 22.216);
    --border: oklch(1 0 0 / 10%);
    --input: oklch(1 0 0 / 15%);
    --ring: oklch(0.556 0 0); /* Color de anillo por defecto */
    /* Variables de Chart */
    --chart-1: oklch(0.488 0.243 264.376);
    --chart-2: oklch(0.696 0.17 162.48);
    --chart-3: oklch(0.769 0.188 70.08);
    --chart-4: oklch(0.627 0.265 303.9);
    --chart-5: oklch(0.645 0.246 16.439);
    /* Variables de Sidebar */
    --sidebar: oklch(0.205 0 0);
    --sidebar-foreground: oklch(0.985 0 0);
    --sidebar-primary: oklch(0.488 0.243 264.376);
    --sidebar-primary-foreground: oklch(0.985 0 0);
    --sidebar-accent: oklch(0.269 0 0);
    --sidebar-accent-foreground: oklch(0.985 0 0);
    --sidebar-border: oklch(1 0 0 / 10%);
    --sidebar-ring: oklch(0.556 0 0);
}

/* Variables para el tema blue (.blue) */
.blue {
    --background: oklch(0.2 0.05 220); /* Dark Blue */
    --foreground: oklch(0.95 0.02 30);  /* Light Gray */
    --card: oklch(0.25 0.06 220);
    --card-foreground: oklch(0.95 0.02 30);
    --popover: oklch(0.3 0.07 220);
    --popover-foreground: oklch(0.95 0.02 30);
    --primary: oklch(0.8 0.1 240); /* Light Blue */
    --primary-foreground: oklch(0.1 0.03 20); /* Dark Gray */
    --secondary: oklch(0.35 0.08 220);
    --secondary-foreground: oklch(0.9 0.01 30);
    --muted: oklch(0.4 0.09 220);
    --muted-foreground: oklch(0.75 0.03 30);
    --accent: oklch(0.45 0.1 220);
    --accent-foreground: oklch(0.9 0.01 30);
    --destructive: oklch(0.6 0.2 10); /* Dark Red */
    --border: oklch(0.3 0.05 220);
    --input: oklch(0.35 0.06 220);
    --ring: oklch(0.7 0.1 240); /* Light Blue Ring */
}

/* Variables para el tema green (.green) */
.green {
    --background: oklch(0.98 0.01 150); /* Very Light Green/Gray - almost white */
    --foreground: oklch(0.10 0.1 150); /* Dark Green - Slightly brighter than pure black for readability */
    --card: oklch(0.96 0.02 150); /* Lighter Green/Gray for cards */
    --card-foreground: oklch(0.10 0.1 150); /* Dark Green */
    --popover: oklch(0.97 0.03 150); /* Even Lighter - near white */
    --popover-foreground: oklch(0.10 0.1 150); /* Dark Green */
    --primary: oklch(0.10 0.2 120); /* Medium Green */
    --primary-foreground: oklch(0.98 0.01 30); /* White */
    --secondary: oklch(0.95 0.04 150); /* Light Greenish-Gray */
    --secondary-foreground: oklch(0.10 0.1 150); /* Dark Green */
    --muted: oklch(0.94 0.05 150); /* Subtle Light Green */
    --muted-foreground: oklch(0.2 0.03 30); /* Slightly lighter green for text */
    --accent: oklch(0.92 0.06 150); /* Light Green Accent */
    --accent-foreground: oklch(0.10 0.1 150); /* Dark Green */
    --destructive: oklch(0.6 0.2 10); /* Dark Red - for destructive actions */
    --border: oklch(0.90 0.04 150); /* Subtle Light Green Border */
    --input: oklch(0.85 0.03 150); /* Input background - slightly darker */
    --ring: oklch(0.10 0.2 120); /* Medium Green Ring */
}

/* 4. Aplica overrides mínimos en la capa base */
@layer base {
    body {
        /* (-) QUITAR ESTA LÍNEA: */
        /* @apply bg-background text-foreground; */

        /* (+) AÑADIR ESTAS LÍNEAS: */
        background-color: var(--background);
        color: var(--foreground);

        /* Asegúrate que la fuente (inter.variable) se aplique en layout.tsx */
        /* font-feature-settings: "rlig" 1, "calt" 1; /* Mantenlo si es necesario */
    }
}
```

## File: `app\layout.tsx`
```tsx
// File: app/layout.tsx
// Purpose: Root layout, sets up global providers (Theme, Auth) and Toaster.
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css"; // Import global styles
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/theme-provider"; // Theme context
import { AuthProvider } from "@/lib/hooks/useAuth"; // CORRECTED Auth context
import { Toaster } from "@/components/ui/sonner"; // Sonner for notifications

// Setup Inter font
const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

// Metadata for the application
export const metadata: Metadata = {
  title: "Atenex - AI Knowledge Assistant", // Updated title
  description: "Query your enterprise knowledge base using natural language with Atenex.",
  // Add more metadata: icons, open graph tags, etc.
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning> {/* Set language, suppress hydration warning */}
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased", // Base styles
          inter.variable // Apply Inter font variable
        )}
      >
        {/* Wrap entire application in AuthProvider */}
        <AuthProvider>
          {/* ThemeProvider for light/dark/custom themes */}
          <ThemeProvider
            attribute="class" // Use class strategy for theming
            defaultTheme="system" // Default to system preference
            enableSystem // Allow system preference detection
            disableTransitionOnChange // Prevent transitions on theme change
          >
            {/* Render the application content */}
            {children}

            {/* Global Toaster component for notifications */}
            <Toaster richColors position="top-right" closeButton />
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
```

## File: `app\page.tsx`
```tsx
// File: app/page.tsx
// Purpose: Public home page, shows login/register or go to app based on auth state.
"use client";

import React from 'react';
import { Button, buttonVariants } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { APP_NAME } from '@/lib/constants';
import { useAuth } from '@/lib/hooks/useAuth';
import { cn } from '@/lib/utils';
import { Loader2, Home as HomeIcon, Info, Mail, Search, Library, Zap } from 'lucide-react';
import Link from 'next/link';

const iconMap: { [key: string]: React.ElementType } = {
  Search: Search,
  Library: Library,
  Zap: Zap,
};

export default function HomePage() {
  const router = useRouter();
  const { user, isLoading: isAuthLoading } = useAuth();
  const isAuthenticated = !isAuthLoading && !!user;

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-background via-background to-secondary/30 dark:to-muted/30">
      <header className="sticky top-0 z-50 w-full bg-background/80 backdrop-blur-md border-b border-border/50">
        <div className="container flex items-center justify-between h-16 px-4 md:px-6">
          <button
            onClick={() => router.push('/')}
            className="flex items-center gap-2 text-xl font-bold text-primary focus:outline-none focus:ring-2 focus:ring-ring rounded-sm"
          >
             <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                 <path d="M11.25 4.533A9.707 9.707 0 0 0 6 3a9.735 9.735 0 0 0-3.25.555.75.75 0 0 0-.5.707v14.5a.75.75 0 0 0 .5.707A9.716 9.716 0 0 0 6 21a9.707 9.707 0 0 0 5.25-1.533.75.75 0 0 0 .5-.68V5.213a.75.75 0 0 0-.5-.68ZM12.75 4.533A9.707 9.707 0 0 1 18 3a9.735 9.735 0 0 1 3.25.555.75.75 0 0 1 .5.707v14.5a.75.75 0 0 1-.5.707A9.716 9.716 0 0 1 18 21a9.707 9.707 0 0 1-5.25-1.533.75.75 0 0 1-.5-.68V5.213a.75.75 0 0 1-.5-.68Z" />
             </svg>
            <span>{APP_NAME}</span>
          </button>

          {/* Botones de navegación traducidos */}
          <nav className="flex items-center space-x-1 sm:space-x-2">
            <LinkButton href="/" Icon={HomeIcon} isActive={true}>Inicio</LinkButton>
            <LinkButton href="/about" Icon={Info}>Nosotros</LinkButton>
            <LinkButton href="/contact" Icon={Mail}>Contacto</LinkButton>

            <div className="pl-2 sm:pl-4">
                {isAuthLoading ? (
                    <Button variant="secondary" disabled={true} size="sm" className="w-[90px]">
                        <Loader2 className="h-4 w-4 animate-spin" />
                    </Button>
                ) : isAuthenticated ? (
                    // Botón traducido
                    <Button variant="default" onClick={() => router.push('/chat')} size="sm" className="w-[90px]">
                        Ir a la App
                    </Button>
                ) : (
                    // Botón traducido
                    <Button
                        variant="outline"
                        onClick={() => router.push('/login')}
                        size="sm"
                        className="w-[90px] transition-colors duration-150 hover:bg-accent hover:text-accent-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    >
                        Acceder
                    </Button>
                )}
            </div>
          </nav>
        </div>
      </header>

      <main className="container mx-auto px-4 py-16 md:py-24 flex-1 flex flex-col items-center justify-center text-center">
         <section>
            {/* Textos de Hero Section traducidos */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-foreground mb-6 leading-tight">
                Desbloquea el Conocimiento de tu Empresa con <span className="text-primary">{APP_NAME}</span>
            </h1>
            <p className="text-lg sm:text-xl text-muted-foreground mb-10 max-w-3xl mx-auto">
                Haz preguntas en lenguaje natural y obtén respuestas instantáneas y precisas, extraídas directamente de los documentos y datos de tu organización.
            </p>
            {isAuthLoading ? (
                 <Button size="lg" disabled={true} className="w-48">
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" /> Cargando...
                 </Button>
            ) : (
              <Button
                  size="lg"
                  onClick={() => isAuthenticated ? router.push('/chat') : router.push('/login')}
                  className={cn(
                      "w-48 transition-all duration-150 ease-in-out transform hover:scale-105",
                      "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus:outline-none"
                  )}
              >
                  {/* Botones traducidos */}
                  {isAuthenticated ? 'Ir al Chat' : 'Empezar Ahora'}
              </Button>
            )}
            {!isAuthenticated && !isAuthLoading && (
                 // Texto traducido
                 <p className="text-xs text-muted-foreground mt-3">
                     ¿Ya tienes cuenta? <Link href="/login" className="text-primary hover:underline">Inicia Sesión</Link>
                 </p>
            )}
         </section>

         <section className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl w-full">
             {/* Textos de Feature Cards traducidos */}
             <FeatureCard
                 title="Búsqueda Inteligente"
                 description="Encuentra la información exacta que necesitas al instante usando lenguaje natural. Olvídate de adivinar palabras clave."
                 icon="Search"
              />
             <FeatureCard
                 title="Conocimiento Centralizado"
                 description="Rompe los silos de información. Accede al conocimiento colectivo de toda tu organización en un solo lugar seguro."
                 icon="Library"
             />
             <FeatureCard
                 title="Productividad Mejorada"
                 description="Empodera a tu equipo con acceso rápido a información relevante, permitiendo decisiones más rápidas y basadas en datos."
                  icon="Zap"
             />
         </section>
      </main>

      <footer className="bg-muted/10 border-t py-8 mt-16">
        {/* Textos de Footer traducidos */}
        <div className="container text-center text-muted-foreground text-sm">
          © {new Date().getFullYear()} {APP_NAME}. Todos los derechos reservados. | <Link href="/privacy" className="hover:text-primary">Política de Privacidad</Link> | <Link href="/terms" className="hover:text-primary">Términos de Servicio</Link>
        </div>
      </footer>
    </div>
  );
}

// Componente de botón de enlace traducido
function LinkButton({ href, children, Icon, isActive = false }: { href: string; children: React.ReactNode; Icon: React.ElementType; isActive?: boolean }) {
  const router = useRouter();
  return (
    <Button
        variant="ghost"
        onClick={() => router.push(href)}
        className={cn(
            "text-sm px-2 sm:px-3 py-1 h-8",
            "hover:bg-accent/50 focus:outline-none focus:ring-1 focus:ring-ring rounded",
            isActive ? "text-primary font-medium bg-accent/50" : "text-muted-foreground hover:text-foreground"
        )}
     >
       <Icon className="h-4 w-4 mr-1 hidden sm:inline-block" />
      {children}
    </Button>
  );
}

// Componente de tarjeta de característica (sin cambios internos, usa props traducidas)
function FeatureCard({ title, description, icon }: { title: string; description: string; icon: string }) {
   const IconComponent = iconMap[icon] || Zap;
  return (
    <div className="p-6 rounded-lg bg-card/50 hover:bg-card border border-border/50 hover:shadow-lg transition-all duration-200 text-left">
       <IconComponent className="w-8 h-8 mb-3 text-primary" />
      <h3 className="text-lg font-semibold text-foreground mb-2">{title}</h3>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  );
}
```

## File: `app\privacy\page.tsx`
```tsx
// File: app/privacy/page.tsx
"use client"; // Mark as client component to use hooks like useRouter

import React from 'react';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation'; // Import useRouter
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { APP_NAME } from '@/lib/constants';

export default function PrivacyPage() {
    const router = useRouter(); // Initialize router

  return (
    <div className="min-h-screen bg-background text-foreground p-4 md:p-8">
      <Button variant="link" onClick={() => router.push('/')} className="mb-4">← Back to Home</Button>
      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl md:text-3xl">Privacy Policy</CardTitle>
        </CardHeader>
        <CardContent className="prose prose-sm sm:prose lg:prose-lg dark:prose-invert max-w-none space-y-4">
          <p>Last Updated: [Insert Date]</p>

          <p>
            {APP_NAME} ("us", "we", or "our") operates the {APP_NAME} application (the "Service"). This page informs you of our policies regarding the collection, use, and disclosure of personal data when you use our Service and the choices you have associated with that data.
          </p>

          <h2>1. Information Collection and Use</h2>
          <p>
            We collect several different types of information for various purposes to provide and improve our Service to you.
          </p>
          <ul>
            <li><strong>Personal Data:</strong> While using our Service, we may ask you to provide us with certain personally identifiable information that can be used to contact or identify you ("Personal Data"). Personally identifiable information may include, but is not limited to: Email address, Name, Company Information (if applicable).</li>
            <li><strong>Usage Data:</strong> We may also collect information on how the Service is accessed and used ("Usage Data"). This Usage Data may include information such as your computer's Internet Protocol address (e.g., IP address), browser type, browser version, the pages of our Service that you visit, the time and date of your visit, the time spent on those pages, unique device identifiers and other diagnostic data.</li>
            <li><strong>User Content:</strong> We process the documents and data you upload ("User Content") solely for the purpose of providing the Service features, such as indexing and querying. We treat your User Content as confidential.</li>
          </ul>

          <h2>2. Use of Data</h2>
          <p>{APP_NAME} uses the collected data for various purposes:</p>
          <ul>
            <li>To provide and maintain the Service</li>
            <li>To notify you about changes to our Service</li>
            <li>To allow you to participate in interactive features of our Service when you choose to do so</li>
            <li>To provide customer care and support</li>
            <li>To provide analysis or valuable information so that we can improve the Service</li>
            <li>To monitor the usage of the Service</li>
            <li>To detect, prevent and address technical issues</li>
          </ul>

          <h2>3. Data Storage and Security</h2>
          <p>
            User Content is stored securely using industry-standard cloud storage providers [Specify if possible, e.g., AWS S3, Google Cloud Storage, MinIO]. We implement security measures designed to protect your information from unauthorized access, disclosure, alteration, and destruction. However, no internet transmission or electronic storage is 100% secure.
          </p>

          <h2>4. Service Providers</h2>
          <p>
            We may employ third-party companies and individuals to facilitate our Service ("Service Providers"), to provide the Service on our behalf, to perform Service-related services or to assist us in analyzing how our Service is used. These third parties have access to your Personal Data only to perform these tasks on our behalf and are obligated not to disclose or use it for any other purpose. Examples include: [List categories, e.g., Cloud hosting (AWS/GCP/Azure), LLM providers (OpenAI/Google), Authentication (Supabase)].
          </p>

          <h2>5. Your Data Rights</h2>
          <p>
            Depending on your jurisdiction, you may have certain rights regarding your Personal Data, such as the right to access, correct, delete, or restrict its processing. Please contact us to exercise these rights.
          </p>

          <h2>6. Children's Privacy</h2>
          <p>
            Our Service does not address anyone under the age of 18 ("Children"). We do not knowingly collect personally identifiable information from anyone under the age of 18.
          </p>

          <h2>7. Changes to This Privacy Policy</h2>
          <p>
            We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page. You are advised to review this Privacy Policy periodically for any changes.
          </p>

          <h2>8. Contact Us</h2>
          <p>
            If you have any questions about this Privacy Policy, please contact us: [Your Contact Email/Link]
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
```

## File: `app\terms\page.tsx`
```tsx
// File: app/terms/page.tsx
"use client"; // Mark as client component to use hooks like useRouter

import React from 'react';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation'; // Import useRouter
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { APP_NAME } from '@/lib/constants';

export default function TermsPage() {
    const router = useRouter(); // Initialize router

  return (
    <div className="min-h-screen bg-background text-foreground p-4 md:p-8">
        <Button variant="link" onClick={() => router.push('/')} className="mb-4">← Back to Home</Button>
      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl md:text-3xl">Terms of Service</CardTitle>
        </CardHeader>
        <CardContent className="prose prose-sm sm:prose lg:prose-lg dark:prose-invert max-w-none space-y-4">
          <p>Last Updated: [Insert Date]</p>

          <h2>1. Acceptance of Terms</h2>
          <p>
            By accessing or using the {APP_NAME} service ("Service"), you agree to be bound by these Terms of Service ("Terms"). If you disagree with any part of the terms, then you may not access the Service.
          </p>

          <h2>2. Service Description</h2>
          <p>
            {APP_NAME} provides a platform for querying enterprise knowledge bases using natural language processing. Features include document upload, processing, indexing, and natural language querying.
          </p>

          <h2>3. User Accounts</h2>
          <p>
            You are responsible for safeguarding your account credentials and for any activities or actions under your account. You must notify us immediately upon becoming aware of any breach of security or unauthorized use of your account.
          </p>

          <h2>4. User Content</h2>
          <p>
            You retain ownership of any documents or data you upload to the Service ("User Content"). By uploading User Content, you grant {APP_NAME} a worldwide, non-exclusive, royalty-free license to use, process, store, and display your User Content solely for the purpose of providing the Service to you.
          </p>

          <h2>5. Acceptable Use</h2>
          <p>
            You agree not to misuse the Service. Prohibited activities include, but are not limited to: [List prohibited activities, e.g., uploading illegal content, attempting to breach security, overloading the system].
          </p>

          <h2>6. Termination</h2>
          <p>
            We may terminate or suspend your access to the Service immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms.
          </p>

          <h2>7. Disclaimer of Warranties</h2>
          <p>
            The Service is provided on an "AS IS" and "AS AVAILABLE" basis. {APP_NAME} makes no warranties, expressed or implied, and hereby disclaims all other warranties including, without limitation, implied warranties of merchantability, fitness for a particular purpose, or non-infringement.
          </p>

          <h2>8. Limitation of Liability</h2>
          <p>
            In no event shall {APP_NAME}, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use the Service.
          </p>

          <h2>9. Governing Law</h2>
          <p>
            These Terms shall be governed and construed in accordance with the laws of [Your Jurisdiction], without regard to its conflict of law provisions.
          </p>

          <h2>10. Changes to Terms</h2>
          <p>
            We reserve the right, at our sole discretion, to modify or replace these Terms at any time. We will provide notice of any changes by posting the new Terms on this page.
          </p>

          <h2>11. Contact Us</h2>
          <p>
            If you have any questions about these Terms, please contact us at [Your Contact Email/Link].
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
```

## File: `components\auth\login-form.tsx`
```tsx
// File: components/auth/login-form.tsx
"use client";

import React, { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircle, Loader2 } from 'lucide-react';
import { useAuth } from '@/lib/hooks/useAuth';

// Esquema Zod con mensajes en español
const loginSchema = z.object({
  email: z.string().email({ message: 'Por favor, introduce una dirección de correo válida.' }),
  password: z.string().min(6, { message: 'La contraseña debe tener al menos 6 caracteres.' }),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export function LoginForm() {
  const { signIn, isLoading } = useAuth();
  const [error, setError] = useState<string | null>(null);

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '' },
    mode: 'onChange', // Validar al cambiar
  });

  const onSubmit = async (data: LoginFormValues) => {
    setError(null);
    try {
      await signIn(data.email, data.password);
      // Éxito: redirección manejada por AuthProvider
    } catch (err: any) {
      // Usar el mensaje de error de la API si está disponible, si no, uno genérico en español
      setError(err.message || 'Inicio de sesión fallido. Revisa tus credenciales e inténtalo de nuevo.');
    }
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
      {/* Alerta de Error */}
      {error && (
        <Alert variant="destructive" role="alert" aria-live="assertive">
          <AlertCircle className="h-4 w-4" />
          {/* Título de Alerta Traducido */}
          <AlertTitle>Inicio de Sesión Fallido</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      {/* Campo Email */}
      <div className="space-y-1">
        {/* Label Traducido */}
        <Label htmlFor="email">Correo Electrónico</Label>
        <Input
          id="email"
          type="email"
          placeholder="nombre@ejemplo.com"
          autoComplete="email"
          required
          disabled={isLoading}
          aria-required="true"
          {...form.register('email')}
          aria-invalid={form.formState.errors.email ? 'true' : 'false'}
        />
        {/* Mensaje de error de validación (ya en español por el schema) */}
        {form.formState.errors.email && (
          <p className="text-sm text-destructive" role="alert">{form.formState.errors.email.message}</p>
        )}
      </div>
      {/* Campo Contraseña */}
      <div className="space-y-1">
        {/* Label Traducido */}
        <Label htmlFor="password">Contraseña</Label>
        <Input
          id="password"
          type="password"
          autoComplete="current-password"
          required
          disabled={isLoading}
          aria-required="true"
          {...form.register('password')}
          aria-invalid={form.formState.errors.password ? 'true' : 'false'}
        />
        {/* Mensaje de error de validación (ya en español por el schema) */}
        {form.formState.errors.password && (
          <p className="text-sm text-destructive" role="alert">{form.formState.errors.password.message}</p>
        )}
      </div>
      {/* Botón de Envío Traducido */}
      <Button type="submit" className="w-full" disabled={isLoading || !form.formState.isValid}>
        {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : 'Iniciar Sesión'}
      </Button>
    </form>
  );
}
```

## File: `components\chat\chat-history.tsx`
```tsx
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
```

## File: `components\chat\chat-input.tsx`
```tsx
// File: components/chat/chat-input.tsx
"use client";

import React, { useState, useRef, KeyboardEvent } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { SendHorizonal, Loader2 } from 'lucide-react';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  isLoading: boolean;
}

export function ChatInput({ onSendMessage, isLoading }: ChatInputProps) {
  const [inputValue, setInputValue] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(event.target.value);
    // Auto-resize textarea (optional)
    if (textareaRef.current) {
        textareaRef.current.style.height = 'auto'; // Reset height
        textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  };

  const handleSubmit = (event?: React.FormEvent<HTMLFormElement>) => {
    event?.preventDefault();
    if (inputValue.trim() && !isLoading) {
      onSendMessage(inputValue);
      setInputValue('');
      // Reset textarea height after sending
      if (textareaRef.current) {
          textareaRef.current.style.height = 'auto';
      }
    }
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter' && !event.shiftKey && !isLoading) {
      event.preventDefault(); // Prevent newline on Enter
      handleSubmit();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-end space-x-2">
      <Textarea
        ref={textareaRef}
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        // MODIFICADO: Placeholder traducido
        placeholder="Pregúntale a Atenex..."
        className="flex-1 resize-none max-h-40 min-h-[40px] overflow-y-auto rounded-lg border p-2 pr-12 text-sm shadow-sm focus-visible:ring-1 focus-visible:ring-primary" // Added padding right for button
        rows={1}
        disabled={isLoading}
        // MODIFICADO: aria-label traducido
        aria-label="Entrada de chat"
      />
      <Button
        type="submit"
        size="icon"
        className="h-10 w-10 flex-shrink-0" // Ensure button size is consistent
        disabled={isLoading || !inputValue.trim()}
      >
        {isLoading ? (
          <Loader2 className="h-5 w-5 animate-spin" />
        ) : (
          <SendHorizonal className="h-5 w-5" />
        )}
        {/* MODIFICADO: sr-only traducido */}
        <span className="sr-only">Enviar mensaje</span>
      </Button>
    </form>
  );
}
```

## File: `components\chat\chat-interface.tsx`
```tsx
// File: components/chat/chat-interface.tsx
"use client";

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ChatInput } from './chat-input';
import { ChatMessage, Message } from './chat-message';
import { RetrievedDocumentsPanel } from './retrieved-documents-panel';
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import { postQuery, RetrievedDoc, ApiError } from '@/lib/api';
import { toast } from "sonner";
import { PanelRightClose, PanelRightOpen, BrainCircuit, FileText } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

interface ChatInterfaceProps {
  chatId?: string; // Receive chatId from the page
}

const initialMessages: Message[] = [
    { id: 'initial-1', role: 'assistant', content: 'Hello! How can I help you query your knowledge base today?' }
];

export function ChatInterface({ chatId }: ChatInterfaceProps) {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [retrievedDocs, setRetrievedDocs] = useState<RetrievedDoc[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isPanelOpen, setIsPanelOpen] = useState(false); // Oculta panel por defecto
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  // Load chat history based on chatId (placeholder)
  useEffect(() => {
    // Reset state for new/different chat
    setMessages(initialMessages);
    setRetrievedDocs([]);
    setIsLoading(false);

    if (chatId) {
      console.log(`Loading history for chat: ${chatId}`);
      // Load messages from local storage
      const storedMessages = localStorage.getItem(`chat-${chatId}`);
      if (storedMessages) {
        try {
          const parsedMessages: Message[] = JSON.parse(storedMessages);
          setMessages(parsedMessages);
        } catch (error) {
          console.error("Error parsing chat history from local storage:", error);
          // Handle error (e.g., clear local storage or show an error message)
        }
      } else {
          setMessages([ // Dummy loading
            { id: 'initial-1', role: 'assistant', content: `Welcome back to chat ${chatId}. Ask me anything!` }
          ]);
      }
    } else {
      // New chat
      setMessages(initialMessages);
    }
  }, [chatId]);

  // Save chat history to localStorage
  useEffect(() => {
    if (chatId) {
      try {
        localStorage.setItem(`chat-${chatId}`, JSON.stringify(messages));
      } catch (error) {
        console.error("Error saving chat history to local storage:", error);
        // Handle error (e.g., show an error message)
      }
    }
  }, [chatId, messages]);

  // Scroll to bottom when messages change
  useEffect(() => {
    if (scrollAreaRef.current) {
        // Added timeout to ensure DOM updates are flushed before scrolling
        setTimeout(() => {
            if (scrollAreaRef.current) {
                scrollAreaRef.current.scrollTo({ top: scrollAreaRef.current.scrollHeight, behavior: 'smooth' });
            }
        }, 100);
    }
  }, [messages]);

  const handleSendMessage = useCallback(async (query: string) => {
    if (!query.trim() || isLoading) return;

    const userMessage: Message = { id: `user-${Date.now()}`, role: 'user', content: query };
    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);
    setRetrievedDocs([]); // Clear previous docs

    try {
      const response = await postQuery({ query });
      const assistantMessage: Message = {
        id: `assistant-${Date.now()}`,
        role: 'assistant',
        content: response.answer,
        sources: response.retrieved_documents // Attach sources to the message
      };
      setMessages(prev => [...prev, assistantMessage]);
      setRetrievedDocs(response.retrieved_documents || []);
      if (response.retrieved_documents && response.retrieved_documents.length > 0 && !isPanelOpen) {
         setIsPanelOpen(true); // Auto-open panel if closed and docs were retrieved
      }
    } catch (error) {
      console.error("Query failed:", error);
      let errorMessage = "Sorry, I encountered an error trying to answer your question.";
       if (error instanceof ApiError && error.message) {
           errorMessage = `Error: ${error.message}`;
       } else if (error instanceof Error && error.message) {
           errorMessage = `Error: ${error.message}`;
       }

      const errorMessageObj: Message = { id: `error-${Date.now()}`, role: 'assistant', content: errorMessage, isError: true };
      setMessages(prev => [...prev, errorMessageObj]);

      toast.error("Query Failed", {
        description: errorMessage,
      });

    } finally {
      setIsLoading(false);
    }
  }, [isLoading, isPanelOpen]); // Add isPanelOpen dependency

  const handlePanelToggle = () => {
        setIsPanelOpen(!isPanelOpen);
    };

  return (
     <ResizablePanelGroup direction="horizontal" className="h-full max-h-[calc(100vh-theme(space.16))] transition-all duration-300 ease-in-out"> {/* Adjust height based on header */}
            <ResizablePanel defaultSize={isPanelOpen ? 70 : 100} minSize={50} className="transition-all duration-300 ease-in-out">
                <div className="flex h-full flex-col">
                    {/* Button to toggle panel */}
                    <div className="absolute top-2 right-2 z-10">
                        <Button onClick={handlePanelToggle} variant="ghost" size="icon">
                            {isPanelOpen ? <PanelRightClose className="h-5 w-5" /> : <PanelRightOpen className="h-5 w-5" />}
                            <span className="sr-only">{isPanelOpen ? 'Close Sources Panel' : 'Open Sources Panel'}</span>
                        </Button>
                    </div>

                    <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
                        <div className="space-y-4 pr-4"> {/* Add padding right */}
                            {messages.map((message) => (
                                <ChatMessage key={message.id} message={message} />
                            ))}
                            {isLoading && messages[messages.length - 1]?.role === 'user' && (
                                <div className="flex items-start space-x-3">
                                     <Skeleton className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center">
                                          <BrainCircuit className="h-5 w-5 text-primary"/>
                                     </Skeleton>
                                    <div className="space-y-2 flex-1">
                                        <Skeleton className="h-4 w-3/4" />
                                        <Skeleton className="h-4 w-1/2" />
                                    </div>
                                </div>
                            )}
                        </div>
                    </ScrollArea>

                    <div className="border-t p-4 bg-muted/30">
                        <ChatInput onSendMessage={handleSendMessage} isLoading={isLoading} />
                    </div>
                </div>
            </ResizablePanel>

            {isPanelOpen && (
                <>
                    <ResizableHandle withHandle />
                    <ResizablePanel defaultSize={30} minSize={20} maxSize={40} className="transition-all duration-300 ease-in-out">
                        <RetrievedDocumentsPanel documents={retrievedDocs} isLoading={isLoading && messages[messages.length - 1]?.role === 'user'} />
                    </ResizablePanel>
                </>
            )}
        </ResizablePanelGroup>
  );
}
```

## File: `components\chat\chat-message.tsx`
```tsx
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
```

## File: `components\chat\retrieved-documents-panel.tsx`
```tsx
// File: components/chat/retrieved-documents-panel.tsx
import React, { useState } from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { FileText, AlertCircle, Download, Loader2, Eye } from 'lucide-react';
import { ApiError, request, RetrievedDoc } from '@/lib/api';
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter,
    DialogClose
} from "@/components/ui/dialog";
import { toast } from "sonner";

interface RetrievedDocumentsPanelProps {
  documents: RetrievedDoc[];
  isLoading: boolean;
}

export function RetrievedDocumentsPanel({ documents, isLoading }: RetrievedDocumentsPanelProps) {
    const [selectedDoc, setSelectedDoc] = useState<RetrievedDoc | null>(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const handleViewDocument = (doc: RetrievedDoc) => {
        console.log("Viendo detalles del documento:", doc.document_id || doc.id);
        setSelectedDoc(doc);
        setIsDialogOpen(true);
    };

    const handleDownloadDocument = (doc: RetrievedDoc) => {
        const message = `Descarga solicitada para: ${doc.file_name || doc.id}`;
        console.log(message);
        toast.info("Descarga No Implementada", {
             description: `El endpoint de backend para descargar '${doc.file_name || doc.id}' aún no está disponible.`,
             action: { label: "Cerrar", onClick: () => {} },
        });
    };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <div className="flex h-full flex-col border-l bg-muted/30">
            <CardHeader className="sticky top-0 z-10 border-b bg-background p-4">
                {/* MODIFICADO: Título traducido */}
                <CardTitle className="text-lg flex items-center">
                    <FileText className="mr-2 h-5 w-5" /> Fuentes Recuperadas
                </CardTitle>
                {/* MODIFICADO: Descripción traducida */}
                <CardDescription className="text-xs">
                    Documentos usados para generar la respuesta. Haz clic para ver detalles.
                </CardDescription>
            </CardHeader>

            <ScrollArea className="flex-1">
                <div className="p-4 space-y-3">
                    {/* Estado de Carga */}
                    {isLoading && documents.length === 0 && (
                        <>
                            <Skeleton className="h-20 w-full rounded-md" />
                            <Skeleton className="h-20 w-full rounded-md" />
                            <Skeleton className="h-20 w-full rounded-md" />
                        </>
                    )}
                    {/* Estado Vacío */}
                    {!isLoading && documents.length === 0 && (
                        <div className="flex flex-col items-center justify-center h-40 text-center text-muted-foreground">
                            <AlertCircle className="h-8 w-8 mb-2" />
                            {/* MODIFICADO: Texto traducido */}
                            <p className="text-sm">No se encontraron documentos relevantes para la última consulta.</p>
                        </div>
                    )}
                    {/* Lista de Documentos */}
                    {documents.map((doc, index) => (
                        <DialogTrigger asChild key={doc.id || `doc-${index}`}>
                            <Card
                                className="cursor-pointer hover:shadow-md transition-shadow duration-150"
                                onClick={() => handleViewDocument(doc)}
                                // MODIFICADO: Tooltip traducido
                                title={`Haz clic para ver detalles de ${doc.file_name || 'documento'}`}
                            >
                                <CardContent className="p-3 space-y-1 text-sm">
                                    <div className="flex justify-between items-start">
                                        <p className="font-medium text-primary truncate pr-2">
                                            {index + 1}. {doc.file_name || doc.document_id?.substring(0, 8) || `Fragmento ${doc.id.substring(0, 8)}`}
                                        </p>
                                        {doc.score != null && (
                                            // MODIFICADO: Tooltip traducido
                                            <Badge variant="secondary" title={`Puntuación Relevancia: ${doc.score.toFixed(4)}`}>
                                                {doc.score.toFixed(2)}
                                            </Badge>
                                        )}
                                    </div>
                                    <p className="text-xs text-muted-foreground line-clamp-2">
                                        {/* MODIFICADO: Texto traducido */}
                                        {doc.content_preview || 'Vista previa no disponible.'}
                                    </p>
                                    <div className="text-xs text-muted-foreground/80 pt-1 flex justify-between items-center">
                                        <span>ID: {doc.document_id?.substring(0, 8) ?? doc.id.substring(0, 8)}...</span>
                                        <Eye className="h-3 w-3 text-muted-foreground/50" />
                                    </div>
                                </CardContent>
                            </Card>
                        </DialogTrigger>
                    ))}
                </div>
            </ScrollArea>

            {/* Contenido del Dialog */}
            {selectedDoc && (
                <DialogContent className="sm:max-w-lg">
                    <DialogHeader>
                        {/* MODIFICADO: Título traducido */}
                        <DialogTitle className="truncate" title={selectedDoc.file_name || selectedDoc.document_id || 'Detalles del Documento'}>
                            {selectedDoc.file_name || selectedDoc.document_id || 'Detalles del Documento'}
                        </DialogTitle>
                        {/* MODIFICADO: Descripción traducida */}
                        <DialogDescription>
                            Detalles del fragmento recuperado del documento.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="py-4 space-y-3 text-sm">
                        {/* MODIFICADO: Textos traducidos */}
                        <div className="flex justify-between"><span className="font-medium text-muted-foreground">ID Documento:</span><span className="font-mono text-xs bg-muted px-1 rounded">{selectedDoc.document_id || 'N/D'}</span></div>
                        <div className="flex justify-between"><span className="font-medium text-muted-foreground">ID Fragmento:</span><span className="font-mono text-xs bg-muted px-1 rounded">{selectedDoc.id}</span></div>
                        <div className="flex justify-between"><span className="font-medium text-muted-foreground">Puntuación Relevancia:</span><span>{selectedDoc.score?.toFixed(4) ?? 'N/D'}</span></div>
                        <div>
                            <span className="font-medium text-muted-foreground block mb-1">Vista Previa Contenido:</span>
                            <ScrollArea className="max-h-[250px] border rounded p-2 bg-muted/50 text-xs"><pre className="whitespace-pre-wrap break-words">{selectedDoc.content_preview || 'Vista previa no disponible.'}</pre></ScrollArea>
                        </div>
                        {selectedDoc.metadata && Object.keys(selectedDoc.metadata).length > 0 && (
                             <div>
                                <span className="font-medium text-muted-foreground block mb-1">Metadatos:</span>
                                <ScrollArea className="max-h-[100px] border rounded p-2 bg-muted/50 text-xs"><pre className="whitespace-pre-wrap break-words">{JSON.stringify(selectedDoc.metadata, null, 2)}</pre></ScrollArea>
                            </div>
                        )}
                    </div>
                    <DialogFooter>
                        {/* MODIFICADO: Textos traducidos */}
                        <Button variant="outline" onClick={() => handleDownloadDocument(selectedDoc)}>
                            <Download className="mr-2 h-4 w-4" />Descargar Original (N/D)
                        </Button>
                        <DialogClose asChild><Button variant="secondary">Cerrar</Button></DialogClose>
                    </DialogFooter>
                </DialogContent>
            )}
        </div>
    </Dialog>
  );
}
```

## File: `components\knowledge\document-status-list.tsx`
```tsx
// File: components/knowledge/document-status-list.tsx (MODIFICADO)
"use client";

import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { AlertCircle, CheckCircle2, Loader2, RefreshCw, AlertTriangle, HelpCircle } from 'lucide-react'; // Added HelpCircle for chunks
import { retryIngestDocument, DocumentStatusResponse, AuthHeaders } from '@/lib/api'; // Usar interfaz y función API
import { toast } from 'sonner';
import { Skeleton } from '@/components/ui/skeleton'; // Importar Skeleton
import { cn } from '@/lib/utils';

// Interfaz local renombrada para claridad (usa la de la API)
type DocumentStatus = DocumentStatusResponse;

interface DocumentStatusListProps {
  documents: DocumentStatus[]; // Usar la interfaz de la API
  isLoading: boolean;
  authHeaders: AuthHeaders;
  onRetrySuccess: (documentId: string) => void;
}

// Helper con textos y estilos actualizados
const getStatusAttributes = (status: DocumentStatus['status']) => {
    switch (status) {
        case 'uploaded':
          return { icon: Loader2, text: 'En Cola', className: 'text-blue-600 bg-blue-100 border-blue-200 dark:text-blue-300 dark:bg-blue-900/30 dark:border-blue-700', animate: true };
        case 'processing':
          return { icon: Loader2, text: 'Procesando', className: 'text-orange-600 bg-orange-100 border-orange-200 dark:text-orange-300 dark:bg-orange-900/30 dark:border-orange-700', animate: true };
        case 'processed':
          return { icon: CheckCircle2, text: 'Procesado', className: 'text-green-600 bg-green-100 border-green-200 dark:text-green-300 dark:bg-green-900/30 dark:border-green-700', animate: false };
        case 'error':
          return { icon: AlertTriangle, text: 'Error', className: 'text-red-600 bg-red-100 border-red-200 dark:text-red-300 dark:bg-red-900/30 dark:border-red-700', animate: false };
        default:
          // Mapear cualquier otro estado (como 'indexed' si volviera) a Desconocido o similar
          return { icon: AlertCircle, text: status || 'Desconocido', className: 'text-gray-600 bg-gray-100 border-gray-200 dark:text-gray-400 dark:bg-gray-700/30 dark:border-gray-600', animate: false };
      }
};

export function DocumentStatusList({ documents, isLoading, authHeaders, onRetrySuccess }: DocumentStatusListProps) {

  const handleRetry = async (documentId: string, fileName?: string | null) => {
    if (!authHeaders) return;
    const displayId = fileName || documentId.substring(0, 8) + "...";
    const toastId = toast.loading(`Reintentando ingesta para "${displayId}"...`);
    try {
      await retryIngestDocument(documentId, authHeaders);
      // Ya no necesitamos el 'result.status' porque onRetrySuccess hace la actualización local
      toast.success("Reintento Iniciado", {
        id: toastId,
        description: `El documento "${displayId}" se está procesando de nuevo.`,
      });
      onRetrySuccess(documentId); // Llama al callback para actualizar UI localmente
    } catch (error: any) {
      const errorMsg = error instanceof Error ? error.message : 'Error desconocido';
      toast.error("Error al Reintentar", {
        id: toastId,
        description: `No se pudo reintentar la ingesta para "${displayId}": ${errorMsg}`,
      });
    }
  };

  // Ya no se necesita el estado de carga interno, lo maneja el hook padre
  // if (isLoading) { ... }

  if (!documents || documents.length === 0) {
    // Mensaje si no hay documentos (y no está cargando)
    return isLoading ? null : <p className="text-center text-muted-foreground p-5">No hay documentos subidos aún.</p>;
  }

  return (
    <TooltipProvider>
      <div className="border rounded-md overflow-hidden"> {/* overflow-hidden para bordes redondeados */}
        <Table>
          <TableHeader>
            <TableRow>
              {/* Columnas actualizadas */}
              <TableHead>Nombre Archivo</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead className="text-center hidden sm:table-cell">Chunks</TableHead> {/* Oculto en móvil */}
              <TableHead className="hidden md:table-cell">Última Actualización</TableHead> {/* Oculto en pantallas pequeñas */}
              <TableHead className="text-right">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {documents.map((doc) => {
              const { icon: Icon, text: statusText, className: statusClassName, animate } = getStatusAttributes(doc.status);
              // Usar updated_at si existe, si no created_at
              const dateToShow = doc.updated_at || doc.created_at;
              const displayDate = dateToShow ? new Date(dateToShow).toLocaleString() : 'N/D';
              const displayFileName = doc.file_name || `ID: ${doc.document_id.substring(0, 8)}...`;

              return (
                <TableRow key={doc.document_id}>
                  <TableCell className="font-medium max-w-[150px] sm:max-w-xs truncate" title={displayFileName}>
                    {displayFileName}
                  </TableCell>
                  <TableCell>
                    <Badge variant='outline' className={cn("border", statusClassName)}>
                      <Icon className={cn("h-4 w-4 mr-1.5", animate && "animate-spin")} />
                      {statusText}
                      {doc.status === 'error' && doc.error_message && (
                        <Tooltip delayDuration={100}>
                          <TooltipTrigger asChild>
                            {/* Usar AlertCircle para el tooltip de error */}
                            <AlertCircle className="h-4 w-4 ml-1.5 cursor-help opacity-70 hover:opacity-100" />
                          </TooltipTrigger>
                          <TooltipContent side="top" className="max-w-xs break-words bg-destructive text-destructive-foreground">
                            <p>Error: {doc.error_message}</p>
                          </TooltipContent>
                        </Tooltip>
                      )}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-center hidden sm:table-cell">
                    {/* Mostrar chunks si están disponibles, si no 'N/D' */}
                    {doc.chunk_count !== undefined && doc.chunk_count !== null ? doc.chunk_count : (
                         <Tooltip delayDuration={100}>
                             <TooltipTrigger className='cursor-default'>N/D</TooltipTrigger>
                             <TooltipContent>
                                Conteo de chunks no disponible.
                             </TooltipContent>
                         </Tooltip>
                    )}
                  </TableCell>
                  <TableCell className="text-muted-foreground text-xs hidden md:table-cell">{displayDate}</TableCell>
                  <TableCell className="text-right">
                    {doc.status === 'error' && (
                      <Tooltip delayDuration={100}>
                        <TooltipTrigger asChild>
                           <Button
                             variant="ghost"
                             size="icon"
                             className="h-7 w-7" // Botón más pequeño
                             onClick={() => handleRetry(doc.document_id, doc.file_name)}
                             aria-label="Reintentar ingesta"
                           >
                             <RefreshCw className="h-4 w-4" />
                           </Button>
                        </TooltipTrigger>
                         <TooltipContent>
                            {/* Tooltip traducido */}
                            <p>Reintentar Ingesta</p>
                         </TooltipContent>
                      </Tooltip>
                    )}
                    {/* Espacio para futuras acciones como 'Eliminar' */}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </TooltipProvider>
  );
}
```

## File: `components\knowledge\file-uploader.tsx`
```tsx
// File: components/knowledge/file-uploader.tsx
// File: components/knowledge/file-uploader.tsx (MODIFICADO)
"use client";

import React, { useState, useCallback, useEffect } from 'react';
import { useDropzone, FileRejection } from 'react-dropzone'; // Importar FileRejection
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress'; // Progress podría usarse si el hook diera progreso
import { toast } from 'sonner';
import { UploadCloud, File as FileIcon, X, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

// Tipos de archivo aceptados (sin cambios)
const acceptedFileTypes = {
  'application/pdf': ['.pdf'],
  'application/msword': ['.doc'],
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
  'text/plain': ['.txt'],
  'text/markdown': ['.md', '.markdown'],
  'text/html': ['.html', '.htm'],
};

interface FileUploaderProps {
  authHeaders: import('@/lib/api').AuthHeaders; // Necesario para pasarlo a uploadFile
  onUploadFile: (file: File, authHeaders: import('@/lib/api').AuthHeaders) => Promise<boolean>; // Función del hook
  isUploading: boolean; // Estado de carga del hook
  uploadError: string | null; // Error del hook
  clearUploadStatus: () => void; // Función para limpiar estado del hook
}

export function FileUploader({
    authHeaders,
    onUploadFile,
    isUploading,
    uploadError,
    clearUploadStatus
}: FileUploaderProps) {
  const [file, setFile] = useState<File | null>(null);
  const [dropzoneError, setDropzoneError] = useState<string | null>(null); // Error específico del dropzone

  // Limpiar errores cuando el archivo cambia o se quita
  useEffect(() => {
    setDropzoneError(null); // Limpiar error del dropzone si cambia el archivo
    if (uploadError) {
        // Opcional: Limpiar error de subida del hook si el usuario interactúa de nuevo
        // clearUploadStatus();
    }
  }, [file, uploadError, clearUploadStatus]);

  const onDrop = useCallback((acceptedFiles: File[], fileRejections: FileRejection[]) => {
    setDropzoneError(null); // Limpiar error previo del dropzone
    clearUploadStatus(); // Limpiar error previo de subida del hook
    setFile(null); // Limpiar selección previa

    if (fileRejections.length > 0) {
        const firstRejection = fileRejections[0];
        const errorMessages = firstRejection.errors.map((e) => e.message).join(', ');
        let customError = `Error: ${errorMessages}`;
        if (firstRejection.errors.some((e) => e.code === 'file-invalid-type')) {
             customError = `Tipo de archivo no permitido. Permitidos: PDF, DOC, DOCX, TXT, MD, HTML.`;
        } else if (firstRejection.errors.some((e) => e.code === 'file-too-large')) {
            customError = `El archivo es demasiado grande.`;
        }
        setDropzoneError(customError); // Mostrar error del dropzone
        // No usamos toast aquí, el error se muestra en la UI
        return;
    }

    if (acceptedFiles.length > 0) {
      setFile(acceptedFiles[0]);
    }
  }, [clearUploadStatus]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: acceptedFileTypes,
    multiple: false,
    disabled: isUploading, // Deshabilitar dropzone mientras se sube
  });

  const handleUploadClick = async () => {
    if (!file || !authHeaders || isUploading) return;

    const success = await onUploadFile(file, authHeaders);
    if (success) {
        setFile(null); // Limpiar selección solo si la subida fue exitosa (no error 409)
    }
    // El hook `useUploadDocument` se encarga de las notificaciones toast
  };

  const removeFile = () => {
    setFile(null);
    setDropzoneError(null); // Limpiar error del dropzone al quitar archivo
    clearUploadStatus(); // Limpiar error de subida del hook al quitar archivo
  }

  // Combinar error del dropzone y del hook de subida
  const displayError = dropzoneError || uploadError;

  return (
    <div className="space-y-4">
      <div
        {...getRootProps()}
        className={cn(`p-6 border-2 border-dashed rounded-md text-center transition-colors`,
            isUploading ? 'cursor-not-allowed bg-muted/50 border-muted/30' : 'cursor-pointer',
            isDragActive ? 'border-primary bg-primary/10' : 'border-muted-foreground/50 hover:border-primary/70',
            displayError ? 'border-destructive' : ''
        )}
      >
        <input {...getInputProps()} disabled={isUploading} />
        <UploadCloud className={cn("mx-auto h-10 w-10 mb-2", isUploading ? "text-muted-foreground/50" : "text-muted-foreground")} />
        {isDragActive ? (
          // Texto traducido
          <p>Suelta el archivo aquí...</p>
        ) : (
          <p className={cn(isUploading ? "text-muted-foreground/80" : "")}>
            Arrastra y suelta un archivo, o haz clic para seleccionar
            <span className="block text-xs text-muted-foreground mt-1">(PDF, DOC, DOCX, TXT, MD, HTML)</span>
          </p>
        )}
      </div>

      {/* Mostrar error (del dropzone o de la subida) */}
      {displayError && <p className="text-sm text-destructive px-1">{displayError}</p>}

      {file && (
        <div className="p-3 border rounded-md flex items-center justify-between space-x-2">
            <div className="flex items-center space-x-2 overflow-hidden">
                 <FileIcon className="h-5 w-5 flex-shrink-0 text-muted-foreground" />
                 <span className="text-sm truncate" title={file.name}>{file.name}</span>
                 <span className="text-xs text-muted-foreground">({(file.size / 1024).toFixed(1)} KB)</span>
            </div>
          {/* Permitir quitar archivo incluso si está subiendo (cancela la subida implícitamente) */}
          <Button variant="ghost" size="sm" onClick={removeFile} aria-label="Quitar archivo" disabled={isUploading}>
            <X className="h-4 w-4" />
          </Button>
        </div>
      )}

      {/* Ya no se muestra la barra de progreso aquí, el toast de carga lo indica */}
      {/* {isUploading && ( <Progress value={uploadProgress} className="w-full" /> )} */}

      <Button
        onClick={handleUploadClick}
        disabled={!file || isUploading}
        className="w-full"
      >
        {isUploading ? (
            <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Subiendo...
            </>
         ) : 'Subir Archivo'}
      </Button>
    </div>
  );
}
```

## File: `components\layout\header.tsx`
```tsx
// File: components/layout/header.tsx
"use client";

import React from 'react';
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { LogOut, Settings, Home, HelpCircle } from "lucide-react";
import { useAuth } from '@/lib/hooks/useAuth';
import { APP_NAME } from '@/lib/constants';
import { ThemePaletteButton } from '@/components/theme-palette-button';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

export function Header() {
  const { user, signOut } = useAuth();
  const router = useRouter();

  const getInitials = (name?: string | null): string => {
    if (!name) return '?';
    const parts = name.split(' ').filter(Boolean);
    if (parts.length === 0) return '?';
    if (parts.length === 1) return parts[0].charAt(0).toUpperCase();
    return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
  };

  const handleLogout = async () => {
      console.log("Header: Initiating logout...");
      try {
          await signOut();
          // Mensajes de Toast ya traducidos en useAuth
          // toast.success("Sesión Cerrada", { description: "Has cerrado sesión correctamente." });
      } catch (error) {
          console.error("Header: Logout failed unexpectedly.", error);
          // toast.error("Fallo al Cerrar Sesión", { description: "No se pudo cerrar tu sesión." });
      }
  };

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b bg-background/95 backdrop-blur-sm px-4 md:px-6 shrink-0">
       <div className="flex items-center gap-2">
         {/* aria-label traducido */}
         <Button variant="ghost" size="icon" onClick={() => router.push('/chat')} aria-label="Ir al Chat">
             <Home className="h-5 w-5" />
         </Button>
      </div>

      <div className="flex items-center space-x-2 md:space-x-4">
        <ThemePaletteButton />

         {/* aria-label traducido */}
         <Button variant="ghost" size="icon" onClick={() => router.push('/help')} aria-label="Ayuda y Soporte">
             <HelpCircle className="h-5 w-5" />
         </Button>

        {user ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-9 w-9 rounded-full focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
                <Avatar className="h-9 w-9 border">
                  {/* <AvatarImage src={user.avatarUrl || undefined} alt={user.name || 'User Avatar'} /> */}
                  <AvatarFallback className="bg-secondary text-secondary-foreground font-medium text-sm">
                    {getInitials(user.name)}
                  </AvatarFallback>
                </Avatar>
                {/* Texto sr-only traducido */}
                <span className="sr-only">Abrir menú de usuario</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-60" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none truncate" title={user.name || 'Usuario'}>
                    {user.name || 'Usuario'}
                  </p>
                  <p className="text-xs leading-none text-muted-foreground truncate" title={user.email}>
                    {user.email}
                  </p>
                  {user.companyId && (
                    // Tooltip traducido
                    <p className="text-xs leading-none text-muted-foreground/80 mt-1 flex items-center gap-1" title={`ID Empresa: ${user.companyId}`}>
                       <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-3 h-3">
                           <path fillRule="evenodd" d="M4 1.75A2.25 2.25 0 0 0 1.75 4v1.5a.75.75 0 0 0 1.5 0V4c0-.414.336-.75.75-.75h8.5c.414 0 .75.336.75.75v1.5a.75.75 0 0 0 1.5 0V4A2.25 2.25 0 0 0 12 1.75H4ZM1.75 8.5A.75.75 0 0 0 1 9.25v2.25A2.25 2.25 0 0 0 3.25 14h9.5A2.25 2.25 0 0 0 15 11.5V9.25a.75.75 0 0 0-1.5 0v2.25c0 .414-.336.75-.75.75h-9.5c-.414 0-.75-.336-.75-.75V9.25a.75.75 0 0 0-.75-.75Z" clipRule="evenodd" />
                       </svg>
                      {/* Texto traducido */}
                      <span className="truncate">Empresa: {user.companyId.substring(0, 8)}...</span>
                    </p>
                  )}
                   {user.roles && user.roles.length > 0 && (
                     // Tooltip traducido
                     <p className="text-xs leading-none text-muted-foreground/80 mt-1" title={`Roles: ${user.roles.join(', ')}`}>
                       {/* Texto traducido */}
                       Rol(es): {user.roles.join(', ')}
                     </p>
                   )}
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              {/* Item de menú traducido */}
              <DropdownMenuItem onClick={() => router.push('/settings')} className="cursor-pointer">
                <Settings className="mr-2 h-4 w-4" />
                <span>Configuración</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              {/* Item de menú traducido */}
              <DropdownMenuItem onClick={handleLogout} className="cursor-pointer text-destructive focus:text-destructive focus:bg-destructive/10">
                <LogOut className="mr-2 h-4 w-4" />
                <span>Cerrar sesión</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : null}
      </div>
    </header>
  );
}
```

## File: `components\layout\sidebar.tsx`
```tsx
// File: components/layout/sidebar.tsx
"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Button, buttonVariants } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { BotMessageSquare, FileUp, Settings, BarChartHorizontalBig, CircleHelp, PlusCircle } from 'lucide-react'; // Added Help icon and PlusCircle for New Chat button
import { APP_NAME } from '@/lib/constants';
import { ChatHistory } from '@/components/chat/chat-history'; // Import ChatHistory

interface SidebarProps {
  isCollapsed: boolean;
}

const navItems = [
  { href: '/chat', label: 'Chat', icon: BotMessageSquare },
  { href: '/knowledge', label: 'Base de Conocimiento', icon: FileUp }, // Traducido
//   { href: '/analytics', label: 'Analíticas', icon: BarChartHorizontalBig }, // Example extra item (Traducido)
  { href: '/settings', label: 'Configuración', icon: Settings }, // Traducido
//   { href: '/help', label: 'Ayuda y Soporte', icon: CircleHelp }, // Example extra item (Traducido)
];

export function Sidebar({ isCollapsed }: SidebarProps) {
  const pathname = usePathname();
  const router = useRouter ? useRouter() : undefined;

  // Handler para nuevo chat
  const handleNewChat = React.useCallback(() => {
    if (router) router.push('/chat');
    else window.location.href = '/chat';
  }, [router]);

  return (
    <aside className={cn(
        "flex h-full flex-col border-r bg-muted/40 transition-all duration-300 ease-in-out",
        isCollapsed ? "w-[50px] items-center" : "w-full p-4"
      )}
      >
      <div className={cn("flex flex-col gap-2", isCollapsed ? "items-center" : "")}> {/* Logo y botón */}
        <div className={cn("flex items-center", isCollapsed ? "h-16 justify-center" : "h-16 justify-start")}>
          <BotMessageSquare className={cn("h-6 w-6 text-primary", !isCollapsed && "mr-2")} />
          {!isCollapsed && (
            <span className="text-lg font-bold text-primary">{APP_NAME}</span>
          )}
        </div>
        <Button
          onClick={handleNewChat}
          variant="default" // Changed from "accent" to "default" as "accent" is not a valid variant
          size={isCollapsed ? "icon" : "default"}
          className={cn(
            "w-full transition-colors duration-150",
            isCollapsed ? "h-10 w-10 rounded-lg mt-2" : "justify-start mt-2 font-semibold text-base",
            "bg-primary/90 hover:bg-primary text-primary-foreground shadow-sm"
          )}
          // MODIFICADO: aria-label traducido
          aria-label="Nuevo chat"
        >
          <PlusCircle className={cn("h-5 w-5", !isCollapsed && "mr-2")}/>
          {!isCollapsed && <span>Nuevo chat</span>}
        </Button>
      </div>
      {/* Main Navigation */}
      <nav className={cn("flex flex-col gap-2", isCollapsed ? "items-center mt-4" : "flex-1 mt-4")}>
        <TooltipProvider delayDuration={0}>
          {navItems.map((item) => (
            <Tooltip key={item.href}>
              <TooltipTrigger asChild>
                 <Link
                    href={item.href}
                    className={cn(
                        buttonVariants({ variant: pathname.startsWith(item.href) ? 'default' : 'ghost', size: isCollapsed ? "icon" : "default" }),
                        "w-full transition-colors duration-150 ease-in-out",
                        isCollapsed ? "h-10 w-10 rounded-lg" : "justify-start",
                        pathname.startsWith(item.href)
                        ? 'bg-primary text-primary-foreground hover:bg-primary/90'
                        : 'hover:bg-muted'
                    )}
                    aria-label={item.label}
                >
                  <item.icon className={cn("h-5 w-5", !isCollapsed && "mr-3")} />
                  {!isCollapsed && <span className="truncate">{item.label}</span>}
                 </Link>
              </TooltipTrigger>
              {isCollapsed && (
                <TooltipContent side="right" sideOffset={5}>
                  {item.label}
                </TooltipContent>
              )}
            </Tooltip>
          ))}
        </TooltipProvider>
      </nav>
      {/* Chat History Section - Conditionally render based on collapse */}
      {!isCollapsed && (
         <div className="mt-auto flex flex-col gap-2 border-t pt-4">
             {/* ELIMINADO: Título duplicado H3 */}
             <ChatHistory />
         </div>
      )}
    </aside>
  );
}
```

## File: `components\theme-palette-button.tsx`
```tsx
// File: components/theme-palette-button.tsx
"use client";

import * as React from "react";
import { Palette } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const colorPalettes = [
    'system',
    'light',
    'dark',
    'blue',
    'green',
];

const themeToPalette: { [key: string]: string } = {
   'system': 'Default',
   'light': 'Light',
   'dark': 'Dark',
   'blue': 'Blue Oasis',
   'green': 'Emerald Depths'
}

export function ThemePaletteButton() {
  const { setTheme, theme } = useTheme();

  const handleThemeChange = (palette: string) => {
    setTheme(palette);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
           <Button variant="outline" size="icon">
               <Palette className="h-[1.2rem] w-[1.2rem]"/>
                <span className="sr-only">Toggle theme</span>
            </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
           {colorPalettes.map((palette) => (
               <DropdownMenuItem key={palette} onClick={() => handleThemeChange(palette)}>
                   {themeToPalette[palette] || palette}
               </DropdownMenuItem>
           ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
```

## File: `components\theme-provider.tsx`
```tsx
// File: components/theme-provider.tsx
"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider, type ThemeProviderProps } from "next-themes";

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}
```

## File: `components\theme-toggle.tsx`
```tsx

```

## File: `components\ui\alert-dialog.tsx`
```tsx
"use client"

import * as React from "react"
import * as AlertDialogPrimitive from "@radix-ui/react-alert-dialog"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"

function AlertDialog({
  ...props
}: React.ComponentProps<typeof AlertDialogPrimitive.Root>) {
  return <AlertDialogPrimitive.Root data-slot="alert-dialog" {...props} />
}

function AlertDialogTrigger({
  ...props
}: React.ComponentProps<typeof AlertDialogPrimitive.Trigger>) {
  return (
    <AlertDialogPrimitive.Trigger data-slot="alert-dialog-trigger" {...props} />
  )
}

function AlertDialogPortal({
  ...props
}: React.ComponentProps<typeof AlertDialogPrimitive.Portal>) {
  return (
    <AlertDialogPrimitive.Portal data-slot="alert-dialog-portal" {...props} />
  )
}

function AlertDialogOverlay({
  className,
  ...props
}: React.ComponentProps<typeof AlertDialogPrimitive.Overlay>) {
  return (
    <AlertDialogPrimitive.Overlay
      data-slot="alert-dialog-overlay"
      className={cn(
        "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/50",
        className
      )}
      {...props}
    />
  )
}

function AlertDialogContent({
  className,
  ...props
}: React.ComponentProps<typeof AlertDialogPrimitive.Content>) {
  return (
    <AlertDialogPortal>
      <AlertDialogOverlay />
      <AlertDialogPrimitive.Content
        data-slot="alert-dialog-content"
        className={cn(
          "bg-background data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 fixed top-[50%] left-[50%] z-50 grid w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] gap-4 rounded-lg border p-6 shadow-lg duration-200 sm:max-w-lg",
          className
        )}
        {...props}
      />
    </AlertDialogPortal>
  )
}

function AlertDialogHeader({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-dialog-header"
      className={cn("flex flex-col gap-2 text-center sm:text-left", className)}
      {...props}
    />
  )
}

function AlertDialogFooter({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-dialog-footer"
      className={cn(
        "flex flex-col-reverse gap-2 sm:flex-row sm:justify-end",
        className
      )}
      {...props}
    />
  )
}

function AlertDialogTitle({
  className,
  ...props
}: React.ComponentProps<typeof AlertDialogPrimitive.Title>) {
  return (
    <AlertDialogPrimitive.Title
      data-slot="alert-dialog-title"
      className={cn("text-lg font-semibold", className)}
      {...props}
    />
  )
}

function AlertDialogDescription({
  className,
  ...props
}: React.ComponentProps<typeof AlertDialogPrimitive.Description>) {
  return (
    <AlertDialogPrimitive.Description
      data-slot="alert-dialog-description"
      className={cn("text-muted-foreground text-sm", className)}
      {...props}
    />
  )
}

function AlertDialogAction({
  className,
  ...props
}: React.ComponentProps<typeof AlertDialogPrimitive.Action>) {
  return (
    <AlertDialogPrimitive.Action
      className={cn(buttonVariants(), className)}
      {...props}
    />
  )
}

function AlertDialogCancel({
  className,
  ...props
}: React.ComponentProps<typeof AlertDialogPrimitive.Cancel>) {
  return (
    <AlertDialogPrimitive.Cancel
      className={cn(buttonVariants({ variant: "outline" }), className)}
      {...props}
    />
  )
}

export {
  AlertDialog,
  AlertDialogPortal,
  AlertDialogOverlay,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
}

```

## File: `components\ui\alert.tsx`
```tsx
import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const alertVariants = cva(
  "relative w-full rounded-lg border px-4 py-3 text-sm grid has-[>svg]:grid-cols-[calc(var(--spacing)*4)_1fr] grid-cols-[0_1fr] has-[>svg]:gap-x-3 gap-y-0.5 items-start [&>svg]:size-4 [&>svg]:translate-y-0.5 [&>svg]:text-current",
  {
    variants: {
      variant: {
        default: "bg-card text-card-foreground",
        destructive:
          "text-destructive bg-card [&>svg]:text-current *:data-[slot=alert-description]:text-destructive/90",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function Alert({
  className,
  variant,
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof alertVariants>) {
  return (
    <div
      data-slot="alert"
      role="alert"
      className={cn(alertVariants({ variant }), className)}
      {...props}
    />
  )
}

function AlertTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-title"
      className={cn(
        "col-start-2 line-clamp-1 min-h-4 font-medium tracking-tight",
        className
      )}
      {...props}
    />
  )
}

function AlertDescription({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-description"
      className={cn(
        "text-muted-foreground col-start-2 grid justify-items-start gap-1 text-sm [&_p]:leading-relaxed",
        className
      )}
      {...props}
    />
  )
}

export { Alert, AlertTitle, AlertDescription }

```

## File: `components\ui\avatar.tsx`
```tsx
"use client"

import * as React from "react"
import * as AvatarPrimitive from "@radix-ui/react-avatar"

import { cn } from "@/lib/utils"

function Avatar({
  className,
  ...props
}: React.ComponentProps<typeof AvatarPrimitive.Root>) {
  return (
    <AvatarPrimitive.Root
      data-slot="avatar"
      className={cn(
        "relative flex size-8 shrink-0 overflow-hidden rounded-full",
        className
      )}
      {...props}
    />
  )
}

function AvatarImage({
  className,
  ...props
}: React.ComponentProps<typeof AvatarPrimitive.Image>) {
  return (
    <AvatarPrimitive.Image
      data-slot="avatar-image"
      className={cn("aspect-square size-full", className)}
      {...props}
    />
  )
}

function AvatarFallback({
  className,
  ...props
}: React.ComponentProps<typeof AvatarPrimitive.Fallback>) {
  return (
    <AvatarPrimitive.Fallback
      data-slot="avatar-fallback"
      className={cn(
        "bg-muted flex size-full items-center justify-center rounded-full",
        className
      )}
      {...props}
    />
  )
}

export { Avatar, AvatarImage, AvatarFallback }

```

## File: `components\ui\badge.tsx`
```tsx
import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center justify-center rounded-md border px-2 py-0.5 text-xs font-medium w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-[color,box-shadow] overflow-hidden",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground [a&]:hover:bg-primary/90",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground [a&]:hover:bg-secondary/90",
        destructive:
          "border-transparent bg-destructive text-white [a&]:hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline:
          "text-foreground [a&]:hover:bg-accent [a&]:hover:text-accent-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function Badge({
  className,
  variant,
  asChild = false,
  ...props
}: React.ComponentProps<"span"> &
  VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "span"

  return (
    <Comp
      data-slot="badge"
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  )
}

export { Badge, badgeVariants }

```

## File: `components\ui\button.tsx`
```tsx
import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow-xs hover:bg-primary/90",
        destructive:
          "bg-destructive text-white shadow-xs hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline:
          "border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50",
        secondary:
          "bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80",
        ghost:
          "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
        icon: "size-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot : "button"

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }

```

## File: `components\ui\card.tsx`
```tsx
import * as React from "react"

import { cn } from "@/lib/utils"

function Card({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card"
      className={cn(
        "bg-card text-card-foreground flex flex-col gap-6 rounded-xl border py-6 shadow-sm",
        className
      )}
      {...props}
    />
  )
}

function CardHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-header"
      className={cn(
        "@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-1.5 px-6 has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6",
        className
      )}
      {...props}
    />
  )
}

function CardTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-title"
      className={cn("leading-none font-semibold", className)}
      {...props}
    />
  )
}

function CardDescription({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-description"
      className={cn("text-muted-foreground text-sm", className)}
      {...props}
    />
  )
}

function CardAction({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-action"
      className={cn(
        "col-start-2 row-span-2 row-start-1 self-start justify-self-end",
        className
      )}
      {...props}
    />
  )
}

function CardContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-content"
      className={cn("px-6", className)}
      {...props}
    />
  )
}

function CardFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-footer"
      className={cn("flex items-center px-6 [.border-t]:pt-6", className)}
      {...props}
    />
  )
}

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardAction,
  CardDescription,
  CardContent,
}

```

## File: `components\ui\dialog.tsx`
```tsx
"use client"

import * as React from "react"
import * as DialogPrimitive from "@radix-ui/react-dialog"
import { XIcon } from "lucide-react"

import { cn } from "@/lib/utils"

function Dialog({
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Root>) {
  return <DialogPrimitive.Root data-slot="dialog" {...props} />
}

function DialogTrigger({
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Trigger>) {
  return <DialogPrimitive.Trigger data-slot="dialog-trigger" {...props} />
}

function DialogPortal({
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Portal>) {
  return <DialogPrimitive.Portal data-slot="dialog-portal" {...props} />
}

function DialogClose({
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Close>) {
  return <DialogPrimitive.Close data-slot="dialog-close" {...props} />
}

function DialogOverlay({
  className,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Overlay>) {
  return (
    <DialogPrimitive.Overlay
      data-slot="dialog-overlay"
      className={cn(
        "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/50",
        className
      )}
      {...props}
    />
  )
}

function DialogContent({
  className,
  children,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Content>) {
  return (
    <DialogPortal data-slot="dialog-portal">
      <DialogOverlay />
      <DialogPrimitive.Content
        data-slot="dialog-content"
        className={cn(
          "bg-background data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 fixed top-[50%] left-[50%] z-50 grid w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] gap-4 rounded-lg border p-6 shadow-lg duration-200 sm:max-w-lg",
          className
        )}
        {...props}
      >
        {children}
        <DialogPrimitive.Close className="ring-offset-background focus:ring-ring data-[state=open]:bg-accent data-[state=open]:text-muted-foreground absolute top-4 right-4 rounded-xs opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4">
          <XIcon />
          <span className="sr-only">Close</span>
        </DialogPrimitive.Close>
      </DialogPrimitive.Content>
    </DialogPortal>
  )
}

function DialogHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="dialog-header"
      className={cn("flex flex-col gap-2 text-center sm:text-left", className)}
      {...props}
    />
  )
}

function DialogFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="dialog-footer"
      className={cn(
        "flex flex-col-reverse gap-2 sm:flex-row sm:justify-end",
        className
      )}
      {...props}
    />
  )
}

function DialogTitle({
  className,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Title>) {
  return (
    <DialogPrimitive.Title
      data-slot="dialog-title"
      className={cn("text-lg leading-none font-semibold", className)}
      {...props}
    />
  )
}

function DialogDescription({
  className,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Description>) {
  return (
    <DialogPrimitive.Description
      data-slot="dialog-description"
      className={cn("text-muted-foreground text-sm", className)}
      {...props}
    />
  )
}

export {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
}

```

## File: `components\ui\dropdown-menu.tsx`
```tsx
"use client"

import * as React from "react"
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu"
import { CheckIcon, ChevronRightIcon, CircleIcon } from "lucide-react"

import { cn } from "@/lib/utils"

function DropdownMenu({
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Root>) {
  return <DropdownMenuPrimitive.Root data-slot="dropdown-menu" {...props} />
}

function DropdownMenuPortal({
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Portal>) {
  return (
    <DropdownMenuPrimitive.Portal data-slot="dropdown-menu-portal" {...props} />
  )
}

function DropdownMenuTrigger({
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Trigger>) {
  return (
    <DropdownMenuPrimitive.Trigger
      data-slot="dropdown-menu-trigger"
      {...props}
    />
  )
}

function DropdownMenuContent({
  className,
  sideOffset = 4,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Content>) {
  return (
    <DropdownMenuPrimitive.Portal>
      <DropdownMenuPrimitive.Content
        data-slot="dropdown-menu-content"
        sideOffset={sideOffset}
        className={cn(
          "bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 max-h-(--radix-dropdown-menu-content-available-height) min-w-[8rem] origin-(--radix-dropdown-menu-content-transform-origin) overflow-x-hidden overflow-y-auto rounded-md border p-1 shadow-md",
          className
        )}
        {...props}
      />
    </DropdownMenuPrimitive.Portal>
  )
}

function DropdownMenuGroup({
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Group>) {
  return (
    <DropdownMenuPrimitive.Group data-slot="dropdown-menu-group" {...props} />
  )
}

function DropdownMenuItem({
  className,
  inset,
  variant = "default",
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Item> & {
  inset?: boolean
  variant?: "default" | "destructive"
}) {
  return (
    <DropdownMenuPrimitive.Item
      data-slot="dropdown-menu-item"
      data-inset={inset}
      data-variant={variant}
      className={cn(
        "focus:bg-accent focus:text-accent-foreground data-[variant=destructive]:text-destructive data-[variant=destructive]:focus:bg-destructive/10 dark:data-[variant=destructive]:focus:bg-destructive/20 data-[variant=destructive]:focus:text-destructive data-[variant=destructive]:*:[svg]:!text-destructive [&_svg:not([class*='text-'])]:text-muted-foreground relative flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 data-[inset]:pl-8 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className
      )}
      {...props}
    />
  )
}

function DropdownMenuCheckboxItem({
  className,
  children,
  checked,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.CheckboxItem>) {
  return (
    <DropdownMenuPrimitive.CheckboxItem
      data-slot="dropdown-menu-checkbox-item"
      className={cn(
        "focus:bg-accent focus:text-accent-foreground relative flex cursor-default items-center gap-2 rounded-sm py-1.5 pr-2 pl-8 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className
      )}
      checked={checked}
      {...props}
    >
      <span className="pointer-events-none absolute left-2 flex size-3.5 items-center justify-center">
        <DropdownMenuPrimitive.ItemIndicator>
          <CheckIcon className="size-4" />
        </DropdownMenuPrimitive.ItemIndicator>
      </span>
      {children}
    </DropdownMenuPrimitive.CheckboxItem>
  )
}

function DropdownMenuRadioGroup({
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.RadioGroup>) {
  return (
    <DropdownMenuPrimitive.RadioGroup
      data-slot="dropdown-menu-radio-group"
      {...props}
    />
  )
}

function DropdownMenuRadioItem({
  className,
  children,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.RadioItem>) {
  return (
    <DropdownMenuPrimitive.RadioItem
      data-slot="dropdown-menu-radio-item"
      className={cn(
        "focus:bg-accent focus:text-accent-foreground relative flex cursor-default items-center gap-2 rounded-sm py-1.5 pr-2 pl-8 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className
      )}
      {...props}
    >
      <span className="pointer-events-none absolute left-2 flex size-3.5 items-center justify-center">
        <DropdownMenuPrimitive.ItemIndicator>
          <CircleIcon className="size-2 fill-current" />
        </DropdownMenuPrimitive.ItemIndicator>
      </span>
      {children}
    </DropdownMenuPrimitive.RadioItem>
  )
}

function DropdownMenuLabel({
  className,
  inset,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Label> & {
  inset?: boolean
}) {
  return (
    <DropdownMenuPrimitive.Label
      data-slot="dropdown-menu-label"
      data-inset={inset}
      className={cn(
        "px-2 py-1.5 text-sm font-medium data-[inset]:pl-8",
        className
      )}
      {...props}
    />
  )
}

function DropdownMenuSeparator({
  className,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Separator>) {
  return (
    <DropdownMenuPrimitive.Separator
      data-slot="dropdown-menu-separator"
      className={cn("bg-border -mx-1 my-1 h-px", className)}
      {...props}
    />
  )
}

function DropdownMenuShortcut({
  className,
  ...props
}: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="dropdown-menu-shortcut"
      className={cn(
        "text-muted-foreground ml-auto text-xs tracking-widest",
        className
      )}
      {...props}
    />
  )
}

function DropdownMenuSub({
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Sub>) {
  return <DropdownMenuPrimitive.Sub data-slot="dropdown-menu-sub" {...props} />
}

function DropdownMenuSubTrigger({
  className,
  inset,
  children,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.SubTrigger> & {
  inset?: boolean
}) {
  return (
    <DropdownMenuPrimitive.SubTrigger
      data-slot="dropdown-menu-sub-trigger"
      data-inset={inset}
      className={cn(
        "focus:bg-accent focus:text-accent-foreground data-[state=open]:bg-accent data-[state=open]:text-accent-foreground flex cursor-default items-center rounded-sm px-2 py-1.5 text-sm outline-hidden select-none data-[inset]:pl-8",
        className
      )}
      {...props}
    >
      {children}
      <ChevronRightIcon className="ml-auto size-4" />
    </DropdownMenuPrimitive.SubTrigger>
  )
}

function DropdownMenuSubContent({
  className,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.SubContent>) {
  return (
    <DropdownMenuPrimitive.SubContent
      data-slot="dropdown-menu-sub-content"
      className={cn(
        "bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 min-w-[8rem] origin-(--radix-dropdown-menu-content-transform-origin) overflow-hidden rounded-md border p-1 shadow-lg",
        className
      )}
      {...props}
    />
  )
}

export {
  DropdownMenu,
  DropdownMenuPortal,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
}

```

## File: `components\ui\input.tsx`
```tsx
import * as React from "react"

import { cn } from "@/lib/utils"

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
        "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
        className
      )}
      {...props}
    />
  )
}

export { Input }

```

## File: `components\ui\label.tsx`
```tsx
"use client"

import * as React from "react"
import * as LabelPrimitive from "@radix-ui/react-label"

import { cn } from "@/lib/utils"

function Label({
  className,
  ...props
}: React.ComponentProps<typeof LabelPrimitive.Root>) {
  return (
    <LabelPrimitive.Root
      data-slot="label"
      className={cn(
        "flex items-center gap-2 text-sm leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50",
        className
      )}
      {...props}
    />
  )
}

export { Label }

```

## File: `components\ui\progress.tsx`
```tsx
"use client"

import * as React from "react"
import * as ProgressPrimitive from "@radix-ui/react-progress"

import { cn } from "@/lib/utils"

function Progress({
  className,
  value,
  ...props
}: React.ComponentProps<typeof ProgressPrimitive.Root>) {
  return (
    <ProgressPrimitive.Root
      data-slot="progress"
      className={cn(
        "bg-primary/20 relative h-2 w-full overflow-hidden rounded-full",
        className
      )}
      {...props}
    >
      <ProgressPrimitive.Indicator
        data-slot="progress-indicator"
        className="bg-primary h-full w-full flex-1 transition-all"
        style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
      />
    </ProgressPrimitive.Root>
  )
}

export { Progress }

```

## File: `components\ui\resizable.tsx`
```tsx
"use client"

import * as React from "react"
import { GripVerticalIcon } from "lucide-react"
import * as ResizablePrimitive from "react-resizable-panels"

import { cn } from "@/lib/utils"

function ResizablePanelGroup({
  className,
  ...props
}: React.ComponentProps<typeof ResizablePrimitive.PanelGroup>) {
  return (
    <ResizablePrimitive.PanelGroup
      data-slot="resizable-panel-group"
      className={cn(
        "flex h-full w-full data-[panel-group-direction=vertical]:flex-col",
        className
      )}
      {...props}
    />
  )
}

function ResizablePanel({
  ...props
}: React.ComponentProps<typeof ResizablePrimitive.Panel>) {
  return <ResizablePrimitive.Panel data-slot="resizable-panel" {...props} />
}

function ResizableHandle({
  withHandle,
  className,
  ...props
}: React.ComponentProps<typeof ResizablePrimitive.PanelResizeHandle> & {
  withHandle?: boolean
}) {
  return (
    <ResizablePrimitive.PanelResizeHandle
      data-slot="resizable-handle"
      className={cn(
        "bg-border focus-visible:ring-ring relative flex w-px items-center justify-center after:absolute after:inset-y-0 after:left-1/2 after:w-1 after:-translate-x-1/2 focus-visible:ring-1 focus-visible:ring-offset-1 focus-visible:outline-hidden data-[panel-group-direction=vertical]:h-px data-[panel-group-direction=vertical]:w-full data-[panel-group-direction=vertical]:after:left-0 data-[panel-group-direction=vertical]:after:h-1 data-[panel-group-direction=vertical]:after:w-full data-[panel-group-direction=vertical]:after:-translate-y-1/2 data-[panel-group-direction=vertical]:after:translate-x-0 [&[data-panel-group-direction=vertical]>div]:rotate-90",
        className
      )}
      {...props}
    >
      {withHandle && (
        <div className="bg-border z-10 flex h-4 w-3 items-center justify-center rounded-xs border">
          <GripVerticalIcon className="size-2.5" />
        </div>
      )}
    </ResizablePrimitive.PanelResizeHandle>
  )
}

export { ResizablePanelGroup, ResizablePanel, ResizableHandle }

```

## File: `components\ui\scroll-area.tsx`
```tsx
"use client"

import * as React from "react"
import * as ScrollAreaPrimitive from "@radix-ui/react-scroll-area"

import { cn } from "@/lib/utils"

function ScrollArea({
  className,
  children,
  ...props
}: React.ComponentProps<typeof ScrollAreaPrimitive.Root>) {
  return (
    <ScrollAreaPrimitive.Root
      data-slot="scroll-area"
      className={cn("relative", className)}
      {...props}
    >
      <ScrollAreaPrimitive.Viewport
        data-slot="scroll-area-viewport"
        className="focus-visible:ring-ring/50 size-full rounded-[inherit] transition-[color,box-shadow] outline-none focus-visible:ring-[3px] focus-visible:outline-1"
      >
        {children}
      </ScrollAreaPrimitive.Viewport>
      <ScrollBar />
      <ScrollAreaPrimitive.Corner />
    </ScrollAreaPrimitive.Root>
  )
}

function ScrollBar({
  className,
  orientation = "vertical",
  ...props
}: React.ComponentProps<typeof ScrollAreaPrimitive.ScrollAreaScrollbar>) {
  return (
    <ScrollAreaPrimitive.ScrollAreaScrollbar
      data-slot="scroll-area-scrollbar"
      orientation={orientation}
      className={cn(
        "flex touch-none p-px transition-colors select-none",
        orientation === "vertical" &&
          "h-full w-2.5 border-l border-l-transparent",
        orientation === "horizontal" &&
          "h-2.5 flex-col border-t border-t-transparent",
        className
      )}
      {...props}
    >
      <ScrollAreaPrimitive.ScrollAreaThumb
        data-slot="scroll-area-thumb"
        className="bg-border relative flex-1 rounded-full"
      />
    </ScrollAreaPrimitive.ScrollAreaScrollbar>
  )
}

export { ScrollArea, ScrollBar }

```

## File: `components\ui\separator.tsx`
```tsx
"use client"

import * as React from "react"
import * as SeparatorPrimitive from "@radix-ui/react-separator"

import { cn } from "@/lib/utils"

function Separator({
  className,
  orientation = "horizontal",
  decorative = true,
  ...props
}: React.ComponentProps<typeof SeparatorPrimitive.Root>) {
  return (
    <SeparatorPrimitive.Root
      data-slot="separator-root"
      decorative={decorative}
      orientation={orientation}
      className={cn(
        "bg-border shrink-0 data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-px",
        className
      )}
      {...props}
    />
  )
}

export { Separator }

```

## File: `components\ui\skeleton.tsx`
```tsx
import { cn } from "@/lib/utils"

function Skeleton({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="skeleton"
      className={cn("bg-accent animate-pulse rounded-md", className)}
      {...props}
    />
  )
}

export { Skeleton }

```

## File: `components\ui\sonner.tsx`
```tsx
"use client"

import { useTheme } from "next-themes"
import { Toaster as Sonner, ToasterProps } from "sonner"

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme()

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      style={
        {
          "--normal-bg": "var(--popover)",
          "--normal-text": "var(--popover-foreground)",
          "--normal-border": "var(--border)",
        } as React.CSSProperties
      }
      {...props}
    />
  )
}

export { Toaster }

```

## File: `components\ui\table.tsx`
```tsx
"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

function Table({ className, ...props }: React.ComponentProps<"table">) {
  return (
    <div
      data-slot="table-container"
      className="relative w-full overflow-x-auto"
    >
      <table
        data-slot="table"
        className={cn("w-full caption-bottom text-sm", className)}
        {...props}
      />
    </div>
  )
}

function TableHeader({ className, ...props }: React.ComponentProps<"thead">) {
  return (
    <thead
      data-slot="table-header"
      className={cn("[&_tr]:border-b", className)}
      {...props}
    />
  )
}

function TableBody({ className, ...props }: React.ComponentProps<"tbody">) {
  return (
    <tbody
      data-slot="table-body"
      className={cn("[&_tr:last-child]:border-0", className)}
      {...props}
    />
  )
}

function TableFooter({ className, ...props }: React.ComponentProps<"tfoot">) {
  return (
    <tfoot
      data-slot="table-footer"
      className={cn(
        "bg-muted/50 border-t font-medium [&>tr]:last:border-b-0",
        className
      )}
      {...props}
    />
  )
}

function TableRow({ className, ...props }: React.ComponentProps<"tr">) {
  return (
    <tr
      data-slot="table-row"
      className={cn(
        "hover:bg-muted/50 data-[state=selected]:bg-muted border-b transition-colors",
        className
      )}
      {...props}
    />
  )
}

function TableHead({ className, ...props }: React.ComponentProps<"th">) {
  return (
    <th
      data-slot="table-head"
      className={cn(
        "text-foreground h-10 px-2 text-left align-middle font-medium whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
        className
      )}
      {...props}
    />
  )
}

function TableCell({ className, ...props }: React.ComponentProps<"td">) {
  return (
    <td
      data-slot="table-cell"
      className={cn(
        "p-2 align-middle whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
        className
      )}
      {...props}
    />
  )
}

function TableCaption({
  className,
  ...props
}: React.ComponentProps<"caption">) {
  return (
    <caption
      data-slot="table-caption"
      className={cn("text-muted-foreground mt-4 text-sm", className)}
      {...props}
    />
  )
}

export {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
}

```

## File: `components\ui\textarea.tsx`
```tsx
import * as React from "react"

import { cn } from "@/lib/utils"

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "border-input placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 flex field-sizing-content min-h-16 w-full rounded-md border bg-transparent px-3 py-2 text-base shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        className
      )}
      {...props}
    />
  )
}

export { Textarea }

```

## File: `components\ui\tooltip.tsx`
```tsx
"use client"

import * as React from "react"
import * as TooltipPrimitive from "@radix-ui/react-tooltip"

import { cn } from "@/lib/utils"

function TooltipProvider({
  delayDuration = 0,
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Provider>) {
  return (
    <TooltipPrimitive.Provider
      data-slot="tooltip-provider"
      delayDuration={delayDuration}
      {...props}
    />
  )
}

function Tooltip({
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Root>) {
  return (
    <TooltipProvider>
      <TooltipPrimitive.Root data-slot="tooltip" {...props} />
    </TooltipProvider>
  )
}

function TooltipTrigger({
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Trigger>) {
  return <TooltipPrimitive.Trigger data-slot="tooltip-trigger" {...props} />
}

function TooltipContent({
  className,
  sideOffset = 0,
  children,
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Content>) {
  return (
    <TooltipPrimitive.Portal>
      <TooltipPrimitive.Content
        data-slot="tooltip-content"
        sideOffset={sideOffset}
        className={cn(
          "bg-primary text-primary-foreground animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 w-fit origin-(--radix-tooltip-content-transform-origin) rounded-md px-3 py-1.5 text-xs text-balance",
          className
        )}
        {...props}
      >
        {children}
        <TooltipPrimitive.Arrow className="bg-primary fill-primary z-50 size-2.5 translate-y-[calc(-50%_-_2px)] rotate-45 rounded-[2px]" />
      </TooltipPrimitive.Content>
    </TooltipPrimitive.Portal>
  )
}

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider }

```

## File: `components.json`
```json
{
  "$schema": "https://ui.shadcn.com/schema.json",
  "style": "new-york",
  "rsc": true,
  "tsx": true,
  "tailwind": {
    "config": "tailwind.config.js",
    "css": "app/globals.css",
    "baseColor": "neutral",
    "cssVariables": true,
    "prefix": ""
  },
  "aliases": {
    "components": "@/components",
    "utils": "@/lib/utils",
    "ui": "@/components/ui",
    "lib": "@/lib",
    "hooks": "@/hooks"
  },
  "iconLibrary": "lucide"
}
```

## File: `export-codebase.py`
```py
from pathlib import Path

# Directories to exclude from the export
EXCLUDED_DIRS = {'.git', '__pycache__', '.venv', '.idea', '.mypy_cache', '.vscode', '.github', 'node_modules', 
                '.next', 'out', 'dist', 'coverage', 'README.md','package-lock.json'}

# Important files to include even at the root level
IMPORTANT_CONFIG_FILES = [
    'next.config.mjs', 'next.config.js', 'package.json', 'tsconfig.json', 
    'tailwind.config.js', 'postcss.config.js', '.env.example', '.eslintrc.json'#,
    #'README.md'
]

def build_tree(directory: Path, prefix: str = "") -> list:
    """
    Generates a tree representation of directory structure and files,
    excluding the directories specified in EXCLUDED_DIRS.
    """
    # Filter and sort directory entries
    entries = sorted(
        [entry for entry in directory.iterdir() if entry.name not in EXCLUDED_DIRS],
        key=lambda e: e.name
    )
    tree_lines = []
    for index, entry in enumerate(entries):
        connector = "└── " if index == len(entries) - 1 else "├── "
        tree_lines.append(prefix + connector + entry.name)
        if entry.is_dir():
            extension = "    " if index == len(entries) - 1 else "│   "
            tree_lines.extend(build_tree(entry, prefix + extension))
    return tree_lines

def generate_codebase_markdown(base_path: str = ".", output_file: str = "full_codebase.md"):
    base = Path(base_path).resolve()
    
    lines = []

    # Add directory structure to the beginning of the Markdown file
    lines.append("# Project Structure")
    lines.append("")
    lines.append("```")
    # Start with the project root name
    lines.append(f"{base.name}/")
    tree_lines = build_tree(base)
    lines.extend(tree_lines)
    lines.append("```")
    lines.append("")

    # Add the codebase content in Markdown
    lines.append("# Full Codebase")
    lines.append("")

    # Process all important files at the root level first
    for filename in IMPORTANT_CONFIG_FILES:
        file_path = base / filename
        if file_path.exists() and file_path.is_file():
            rel_path = file_path.relative_to(base)
            lines.append(f"## File: `{rel_path}`")
            try:
                content = file_path.read_text(encoding='utf-8')
            except UnicodeDecodeError:
                lines.append("_[Skipped: binary or non-UTF8 file]_")
                continue
            except Exception as e:
                lines.append(f"_[Error reading file: {e}]_")
                continue
            ext = file_path.suffix.lstrip('.')
            lang = ext if ext else ""
            lines.append(f"```{lang}")
            lines.append(content)
            lines.append("```")
            lines.append("")

    # Process all files in project directories (excluding those in EXCLUDED_DIRS)
    for path in sorted(base.glob("**/*")):
        # Skip excluded directories
        if any(excluded in path.parts for excluded in EXCLUDED_DIRS):
            continue
        
        # Skip already processed root config files
        if path.parent == base and path.name in IMPORTANT_CONFIG_FILES:
            continue
            
        if path.is_file():
            rel_path = path.relative_to(base)
            lines.append(f"## File: `{rel_path}`")
            try:
                content = path.read_text(encoding='utf-8')
            except UnicodeDecodeError:
                lines.append("_[Skipped: binary or non-UTF8 file]_")
                continue
            except Exception as e:
                lines.append(f"_[Error reading file: {e}]_")
                continue
            ext = path.suffix.lstrip('.')
            lang = ext if ext else ""
            lines.append(f"```{lang}")
            lines.append(content)
            lines.append("```")
            lines.append("")

    output_path = base / output_file
    try:
        output_path.write_text("\n".join(lines), encoding='utf-8')
        print(f"✅ Code exported to Markdown at: {output_path}")
    except Exception as e:
        print(f"❌ Error writing output file: {e}")

# If the script is run directly 
if __name__ == "__main__":
    generate_codebase_markdown()
```

## File: `lib\api.ts`
```ts
// File: lib/api.ts
// Purpose: Centralized API request function and specific API call definitions.
import { getApiGatewayUrl } from './utils';
import type { Message } from '@/components/chat/chat-message'; // Ensure Message interface is exported
import { AUTH_TOKEN_KEY } from './constants'; // Importar la clave para localStorage

// --- ApiError Class (sin cambios) ---
interface ApiErrorDataDetail {
    msg: string;
    type: string;
    loc?: (string | number)[];
}
interface ApiErrorData {
    detail?: string | ApiErrorDataDetail[] | any;
    message?: string;
}
export class ApiError extends Error {
    status: number;
    data?: ApiErrorData;

    constructor(message: string, status: number, data?: ApiErrorData) {
        super(message);
        this.name = 'ApiError';
        this.status = status;
        this.data = data;
        Object.setPrototypeOf(this, ApiError.prototype);
    }
}

// --- Core Request Function (sin cambios en lógica principal, solo logs y manejo de token desde localStorage) ---
export async function request<T>(
    endpoint: string,
    options: RequestInit = {}
): Promise<T> {
    const cleanEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;

    if (!cleanEndpoint.startsWith('/api/v1/')) {
        console.error(`Invalid API endpoint format: ${cleanEndpoint}. Must start with /api/v1/`);
        throw new ApiError(`Invalid API endpoint format: ${cleanEndpoint}.`, 400);
    }

    let apiUrl: string;
    let cachedGatewayUrl: string | null = null;
    try {
        if (!cachedGatewayUrl) {
            cachedGatewayUrl = getApiGatewayUrl();
        }
        apiUrl = `${cachedGatewayUrl}${cleanEndpoint}`;
    } catch (err) {
        console.error("API Request failed: Could not get API Gateway URL.", err);
        const message = err instanceof Error ? err.message : "API Gateway URL configuration error.";
        throw new ApiError(message, 500);
    }

    // Obtener token desde localStorage
    let token: string | null = null;
    if (typeof window !== 'undefined') { // Asegurarse que se ejecuta en el cliente
        token = localStorage.getItem(AUTH_TOKEN_KEY);
        // console.log(`API Request to ${cleanEndpoint}: Token from localStorage ${token ? 'Present' : 'Absent'}`);
    } else {
        console.warn(`API Request: localStorage not available for ${cleanEndpoint} (SSR/Server Context?). Cannot get auth token.`);
    }

    const headers = new Headers(options.headers || {});
    headers.set('Accept', 'application/json');
    if (apiUrl.includes("ngrok-free.app")) {
        headers.set('ngrok-skip-browser-warning', 'true');
    }
    if (!(options.body instanceof FormData)) {
        if (!headers.has('Content-Type')) {
             headers.set('Content-Type', 'application/json');
        }
    } else {
        // Browsers usually set the correct Content-Type for FormData automatically, including the boundary.
        // Explicitly setting it can sometimes cause issues. Let's remove it if body is FormData.
        headers.delete('Content-Type');
    }

    // Añadir token al header si existe
    if (token) {
        headers.set('Authorization', `Bearer ${token}`);
    } else if (!cleanEndpoint.includes('/api/v1/users/login')) { // No advertir para login
        console.warn(`API Request: Making request to protected endpoint ${cleanEndpoint} without Authorization header.`);
    }

    const config: RequestInit = {
        ...options,
        headers,
    };

    console.log(`API Request: ${config.method || 'GET'} ${apiUrl}`);

    try {
        const response = await fetch(apiUrl, config);

        // --- Manejo de Errores ---
        if (!response.ok) {
            let errorData: ApiErrorData | null = null;
            let errorText = '';
            const contentType = response.headers.get('content-type');
            try {
                if (contentType && contentType.includes('application/json')) {
                    errorData = await response.json();
                } else { errorText = await response.text(); }
            } catch (parseError) {
                 console.warn(`API Request: Could not parse error response body for ${response.status} ${response.statusText} from ${apiUrl}`, parseError);
                 try { errorText = await response.text(); } catch {} // Try reading as text as fallback
            }

            let errorMessage = `API Error (${response.status})`;
            // Extraer mensaje significativo de la respuesta de error
            if (errorData) {
                if (typeof errorData.detail === 'string') {
                    errorMessage = errorData.detail;
                } else if (Array.isArray(errorData.detail) && errorData.detail.length > 0 && typeof errorData.detail[0].msg === 'string') {
                    // Handle FastAPI validation errors
                    errorMessage = errorData.detail.map(d => `${d.loc ? d.loc.join('.')+': ' : ''}${d.msg}`).join('; ');
                } else if (typeof errorData.message === 'string') {
                    errorMessage = errorData.message;
                }
            } else if (errorText) {
                errorMessage = errorText.substring(0, 200); // Limit length if it's HTML or long text
            } else {
                errorMessage = response.statusText || `Request failed with status ${response.status}`;
            }

            console.error(`API Error Response: ${response.status} ${response.statusText} from ${apiUrl}`, { data: errorData, text: errorText });
            throw new ApiError(errorMessage, response.status, errorData || undefined);
        }

        // --- Manejo de respuestas exitosas ---
        if (response.status === 204 || response.headers.get('content-length') === '0') {
            return null as T;
        }

        try {
            const data: T = await response.json();
            return data;
        } catch (jsonError) {
             const responseText = await response.text().catch(() => "Could not read response text."); // Try reading text if JSON fails
             console.error(`API Request: Invalid JSON response from ${apiUrl}. Status: ${response.status}. Response Text: ${responseText}`, jsonError);
             throw new ApiError(`Invalid JSON response received from server.`, response.status);
        }

    } catch (error) {
        if (error instanceof ApiError) {
             throw error; // Re-throw known API errors
        } else if (error instanceof TypeError && error.message.toLowerCase().includes('failed to fetch')) {
             const networkErrorMsg = 'Network error or API Gateway unreachable. Check connection and API URL.';
             console.error(`API Request Network Error: ${networkErrorMsg} (URL: ${apiUrl})`, error);
             throw new ApiError(networkErrorMsg, 0); // Use 0 or a specific code for network errors
        } else {
             console.error(`API Request: Unexpected error during fetch to ${apiUrl}`, error);
             const message = error instanceof Error ? error.message : 'An unknown fetch error occurred.';
             throw new ApiError(`Unexpected fetch error: ${message}`, 500);
        }
    }
}

// --- API Function Definitions ---

// --- Ingest Service ---
export interface IngestResponse {
    document_id: string;
    task_id: string;
    status: string;
    message: string;
}

// Define AuthHeaders type for clarity
export interface AuthHeaders {
  'X-Company-ID': string;
  'X-User-ID': string;
}

// --- MODIFICACIÓN: Eliminar fetchWithAuth y usar request directamente ---
// Base fetch function to include auth headers
/* // Eliminado fetchWithAuth
async function fetchWithAuth(path: string, options: RequestInit & { auth: AuthHeaders }) { // Changed first arg to path
    const { auth, ...restOptions } = options;
    const headers = {
        ...restOptions.headers,
        'X-Company-ID': auth['X-Company-ID'],
        'X-User-ID': auth['X-User-ID'],
    };

    // Construct the full URL
    const baseUrl = getApiGatewayUrl(); // Get base URL
    const fullUrl = `${baseUrl}${path}`; // Concatenate base URL and path

    // Need to handle FormData correctly here if used
    let body = restOptions.body;
    if (!(body instanceof FormData)) {
        if (!headers['Content-Type']) {
            headers['Content-Type'] = 'application/json';
        }
    } else {
        // Let the browser set the Content-Type for FormData
        delete headers['Content-Type'];
    }

    return fetch(fullUrl, { ...restOptions, headers, body });
}
*/
// -------------------------------------------------------------------

export async function uploadDocument(file: File, auth: AuthHeaders): Promise<IngestResponse> { // Return type updated
  const formData = new FormData();
  formData.append('file', file);

  // --- MODIFICACIÓN: Usar request --- 
  try {
    // Pass auth headers directly to the request options
    const response = await request<IngestResponse>('/api/v1/ingest/upload', {
      method: 'POST',
      headers: {
        // Content-Type is handled by request for FormData
        ...auth, // Spread the auth headers
      },
      body: formData,
    });
    return response;
  } catch (error) {
    console.error('Error uploading document:', error);
    // Re-throw the error (ApiError or other) for the caller to handle
    // The request function already formats ApiError messages
    throw error;
  }
  // ----------------------------------
}

export interface DocumentStatusResponse {
    document_id: string;
    status: 'uploaded' | 'processing' | 'processed' | 'error' | string; // string como fallback. 'indexed' eliminado por ahora.
    file_name?: string | null;
    file_type?: string | null;
    chunk_count?: number | null;
    error_message?: string | null;
    created_at?: string; // Timestamp de creación
    updated_at?: string; // Timestamp de última actualización (más útil que last_updated)
    // file_path?: string | null; // Probablemente no necesario en el frontend listado
    // message?: string | null; // Mensaje específico de /status/{id}, no garantizado en la lista
    // metadata?: Record<string, any> | null; // No esencial para la lista de estado
}

// --- MODIFICACIÓN: Usar request y añadir params --- 
export async function getDocumentStatusList(auth: AuthHeaders, limit: number = 100, offset: number = 0): Promise<DocumentStatusResponse[]> {
  const endpoint = `/api/v1/ingest/status?limit=${limit}&offset=${offset}`;
  try {
    // Pass auth headers directly to the request options
    const response = await request<DocumentStatusResponse[]>(endpoint, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...auth, // Spread the auth headers
      },
    });
    // Handle potential null response if API could return 204, though unlikely for a list
    return response || [];
  } catch (error) {
    console.error('Error fetching document status list:', error);
    // Re-throw the error (ApiError or other) for the caller to handle
    throw error;
  }
}
// -------------------------------------------------

export const getDocumentStatus = async (documentId: string): Promise<DocumentStatusResponse> => {
    return request<DocumentStatusResponse>(`/api/v1/ingest/status/${documentId}`);
};

export async function retryIngestDocument(documentId: string, auth: AuthHeaders): Promise<IngestResponse> { // Return type updated
  const endpoint = `/api/v1/ingest/retry/${documentId}`;
  try {
    // Pass auth headers directly to the request options
    const response = await request<IngestResponse>(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...auth, // Spread the auth headers
      },
      // No body needed for this request
    });
    // The request function handles 202 correctly if the API returns JSON
    // If the API returns 202 with no body, request returns null. We might need to adjust
    // based on actual API behavior for 202.
    // Assuming the API returns the standard IngestResponse on 202 as per docs:
    if (!response) {
        // This case might happen if the API returns 202 No Content, which contradicts the docs
        // Returning a synthetic response or throwing an error might be needed.
        // For now, let's assume the docs are correct and response is IngestResponse.
        console.warn(`Retry endpoint ${endpoint} returned unexpected null response.`);
        throw new ApiError('Retry initiated but no confirmation received.', 202);
    }
    return response;
  } catch (error) {
    console.error(`Error retrying ingest for document ${documentId}:`, error);
    // Re-throw the error (ApiError or other) for the caller to handle
    throw error;
  }
}
// ----------------------------------

// --- Query Service ---
export interface RetrievedDocApi {
    id: string; // Chunk ID
    document_id: string; // ID del documento original
    file_name: string;
    content: string; // Contenido completo del chunk (puede ser largo)
    content_preview: string; // Vista previa corta del contenido
    metadata: Record<string, any> | null; // Metadata asociada al chunk/documento
    score: number; // Puntuación de relevancia
}
// El tipo frontend puede ser igual al de la API por ahora
export type RetrievedDoc = RetrievedDocApi;

export interface ChatSummary {
    id: string;
    title: string | null;
    created_at: string;
    updated_at: string;
    // --- MODIFICACIÓN: Añadir message_count ---
    message_count: number;
    // --------------------------------------
}

export interface ChatMessageApi {
    id: string;
    chat_id: string;
    role: 'user' | 'assistant';
    content: string;
    // --- MODIFICACIÓN: Aclarar el tipo de sources ---
    // La API devuelve null o un array de objetos con estructura específica
    sources: Array<{
        chunk_id: string;
        document_id: string;
        file_name: string;
        score: number;
        preview: string; // Este campo está en la API de mensajes, usarlo en el mapeo si es necesario
    }> | null;
    // -------------------------------------------
    created_at: string; // La API garantiza este campo para mensajes
}

export interface QueryPayload {
    query: string;
    retriever_top_k?: number;
    chat_id?: string | null;
}

export interface QueryApiResponse {
    answer: string;
    retrieved_documents: RetrievedDocApi[]; // Usa la interfaz definida arriba
    query_log_id: string | null; // Puede ser null
    chat_id: string; // La API de Ask garantiza devolver esto
}

export const getChats = async (limit: number = 50, offset: number = 0): Promise<ChatSummary[]> => {
     const endpoint = `/api/v1/query/chats?limit=${limit}&offset=${offset}`;
     return request<ChatSummary[]>(endpoint);
};

// --- MODIFICACIÓN: Añadir params a la firma ---
export const getChatMessages = async (chatId: string, limit: number = 100, offset: number = 0): Promise<ChatMessageApi[]> => {
     const endpoint = `/api/v1/query/chats/${chatId}/messages?limit=${limit}&offset=${offset}`;
     // -----------------------------------------
     return request<ChatMessageApi[]>(endpoint);
};

export const postQuery = async (payload: QueryPayload): Promise<QueryApiResponse> => {
     // Asegurarse que chat_id es null si no se proporciona, como espera la API
     const body = {
         ...payload,
         chat_id: payload.chat_id || null
     };
     return request<QueryApiResponse>('/api/v1/query/ask', {
        method: 'POST',
        body: JSON.stringify(body),
        headers: { 'Content-Type': 'application/json' } // Explícito aquí
     });
};

export const deleteChat = async (chatId: string): Promise<void> => {
     // El request ya maneja la respuesta 204 devolviendo null
     await request<null>(`/api/v1/query/chats/${chatId}`, { method: 'DELETE' });
};

// --- Auth Service ---
// Definición de LoginPayload explícita
interface LoginPayload {
    email: string;
    password: string;
}
// Definición de LoginResponse explícita basada en la documentación
export interface LoginResponse {
    access_token: string;
    token_type: string; // "bearer"
    user_id: string;
    email: string;
    full_name: string;
    role: string;
    company_id: string;
}
// Login se maneja en useAuth.tsx, no necesita una función aquí

// --- Type Mapping Helpers ---
// Mapea la estructura de sources recibida en ChatMessageApi a RetrievedDoc
export const mapApiSourcesToFrontend = (
    apiSources: ChatMessageApi['sources'] // Usa el tipo correcto definido en ChatMessageApi
): RetrievedDoc[] | undefined => {
    if (!apiSources) {
        return undefined;
    }
    // Mapea cada source de la API de mensaje al formato RetrievedDoc
    return apiSources.map(source => ({
        id: source.chunk_id, // Mapea chunk_id a id
        document_id: source.document_id,
        file_name: source.file_name,
        content: source.preview, // Usa preview como content por defecto (podría ajustarse si hay más data)
        content_preview: source.preview,
        metadata: null, // La API de mensajes no provee metadata detallada en 'sources'
        score: source.score,
    }));
};

export const mapApiMessageToFrontend = (apiMessage: ChatMessageApi): Message => {
    // Mapear las sources usando la función anterior
    const mappedSources = mapApiSourcesToFrontend(apiMessage.sources);

    return {
        id: apiMessage.id,
        role: apiMessage.role,
        content: apiMessage.content,
        sources: mappedSources, // Usa las sources mapeadas
        isError: false,
        created_at: apiMessage.created_at, // Usar siempre el timestamp de la API
    };
};
```

## File: `lib\auth\helpers.ts`
```ts
// File: lib/auth/helpers.ts
// Purpose: Define shared authentication types/interfaces. Remove outdated manual token helpers.

// --- Manual localStorage functions (OBSOLETE for Supabase session token) ---
// These functions should no longer be used for managing the main Supabase session token.
// Supabase JS client handles this internally. They are removed to avoid confusion.
/*
export const getToken = (): string | null => { ... };
export const setToken = (token: string): void => { ... };
export const removeToken = (): void => { ... };
*/
// --- END Obsolete localStorage functions ---


// --- Frontend User Interface ---
// Defines the structure of the user object used within the frontend application.
// This will be populated from the Supabase session data via the useAuth hook.
export interface User {
  userId: string;    // Mapped from Supabase User ID (user.id)
  email?: string;    // Mapped from Supabase User Email (user.email)
  name?: string | null; // Mapped from Supabase User Metadata (user.user_metadata.full_name or name) - Allow null
  companyId?: string; // Mapped from Supabase App Metadata (user.app_metadata.company_id)
  roles?: string[];  // Mapped from Supabase App Metadata (user.app_metadata.roles)
  // Add any other fields from the Supabase User object needed in the frontend
}

// --- getUserFromToken REMOVED ---
// Manual token decoding is not needed; user info comes from Supabase session object.

```

## File: `lib\constants.ts`
```ts
export const APP_NAME = "Atenex";
export const AUTH_TOKEN_KEY = "atenex_auth_token";
```

## File: `lib\hooks\useAuth.tsx`
```tsx
// File: lib/hooks/useAuth.tsx
"use client";

import React, {
    createContext,
    useContext,
    useState,
    useEffect,
    useCallback,
    ReactNode,
} from 'react';
import { useRouter } from 'next/navigation';
import { User as AppUser } from '@/lib/auth/helpers';
import { toast } from "sonner";
import { AUTH_TOKEN_KEY } from '@/lib/constants';
import { getApiGatewayUrl, cn } from '@/lib/utils';

interface AuthContextType {
    user: AppUser | null;
    token: string | null;
    isLoading: boolean;
    signIn: (email: string, password: string) => Promise<void>;
    signOut: () => Promise<void>;
}

const defaultAuthContextValue: AuthContextType = {
    user: null,
    token: null,
    isLoading: true,
    signIn: async () => { throw new Error("AuthProvider no inicializado"); }, // Traducido
    signOut: async () => { throw new Error("AuthProvider no inicializado"); }, // Traducido
};

const AuthContext = createContext<AuthContextType>(defaultAuthContextValue);

interface AuthProviderProps { children: ReactNode; }

function decodeJwtPayload(token: string): any | null {
    try {
        const base64Url = token.split('.')[1];
        if (!base64Url) return null;
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(
            atob(base64)
                .split('')
                .map(function (c) {
                    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
                })
                .join('')
        );
        return JSON.parse(jsonPayload);
    } catch (error) {
        console.error("Fallo al decodificar JWT:", error); // Traducido
        return null;
    }
}

function getUserFromDecodedToken(payload: any): AppUser | null {
    if (!payload || !payload.sub) {
        return null;
    }
    return {
        userId: payload.sub,
        email: payload.email,
        name: payload.name || null,
        companyId: payload.company_id,
        roles: payload.roles || [],
    };
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [token, setToken] = useState<string | null>(null);
    const [user, setUser] = useState<AppUser | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        console.log("AuthProvider: Inicializando y buscando token en localStorage...");
        if (typeof window !== 'undefined') {
            try {
                const storedToken = localStorage.getItem(AUTH_TOKEN_KEY);
                if (storedToken) {
                    const decodedPayload = decodeJwtPayload(storedToken);
                    const currentUser = getUserFromDecodedToken(decodedPayload);

                    if (currentUser) {
                        const isExpired = decodedPayload.exp && (decodedPayload.exp * 1000 < Date.now());
                        if (isExpired) {
                            console.warn("AuthProvider: Token almacenado está expirado. Limpiando."); // Traducido
                            localStorage.removeItem(AUTH_TOKEN_KEY);
                            setToken(null);
                            setUser(null);
                        } else {
                            console.log("AuthProvider: Token válido encontrado en almacenamiento.", currentUser);
                            setToken(storedToken);
                            setUser(currentUser);
                        }
                    } else {
                        console.warn("AuthProvider: Token inválido encontrado en almacenamiento. Limpiando."); // Traducido
                        localStorage.removeItem(AUTH_TOKEN_KEY);
                        setToken(null);
                        setUser(null);
                    }
                } else {
                    console.log("AuthProvider: No se encontró token en almacenamiento."); // Traducido
                    setToken(null);
                    setUser(null);
                }
            } catch (error) {
                console.error("AuthProvider: Error accediendo a localStorage o decodificando token:", error); // Traducido
                try { localStorage.removeItem(AUTH_TOKEN_KEY); } catch {}
                setToken(null);
                setUser(null);
            } finally {
                setIsLoading(false);
                console.log("AuthProvider: Carga inicial completa."); // Traducido
            }
        } else {
             setIsLoading(false);
        }
    }, []);

    const signIn = useCallback(async (email: string, password: string): Promise<void> => {
        console.log("AuthProvider: Intentando iniciar sesión..."); // Traducido
        setIsLoading(true);
        let gatewayUrl = '';
        try {
            gatewayUrl = getApiGatewayUrl();
            const loginEndpoint = `${gatewayUrl}/api/v1/users/login`;
            console.log(`AuthProvider: Llamando al endpoint de login: ${loginEndpoint}`);

            const response = await fetch(loginEndpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    ...(gatewayUrl.includes("ngrok-free.app") && { 'ngrok-skip-browser-warning': 'true' }),
                },
                body: JSON.stringify({ email, password }),
            });

            const responseBody = await response.json();

            if (!response.ok) {
                const errorMessage = responseBody?.message || responseBody?.detail || `Fallo en login (${response.status})`; // Traducido
                console.error("AuthProvider: Llamada a API de login fallida.", { status: response.status, body: responseBody }); // Traducido
                throw new Error(errorMessage);
            }

            const receivedToken = responseBody?.access_token || responseBody?.token;
            if (!receivedToken || typeof receivedToken !== 'string') {
                console.error("AuthProvider: No se recibió un token válido en la respuesta de login.", responseBody); // Traducido
                throw new Error("Login exitoso, pero no se recibió token."); // Traducido
            }

            const decodedPayload = decodeJwtPayload(receivedToken);
            const loggedInUser = getUserFromDecodedToken(decodedPayload);

            if (!loggedInUser) {
                console.error("AuthProvider: Token recibido es inválido o no se puede decodificar.", receivedToken); // Traducido
                throw new Error("Login exitoso, pero se recibió un token inválido."); // Traducido
            }

            localStorage.setItem(AUTH_TOKEN_KEY, receivedToken);
            setToken(receivedToken);
            setUser(loggedInUser);
            console.log("AuthProvider: Inicio de sesión exitoso.", loggedInUser); // Traducido
            // Toast traducido
            toast.success("Inicio de Sesión Exitoso", { description: `¡Bienvenido de nuevo, ${loggedInUser.name || loggedInUser.email}!` });

            router.replace('/chat');

        } catch (err: any) {
            console.error("AuthProvider: Error en inicio de sesión:", err); // Traducido
            localStorage.removeItem(AUTH_TOKEN_KEY);
            setToken(null);
            setUser(null);
            // Toast traducido
            toast.error("Inicio de Sesión Fallido", { description: err.message || "Ocurrió un error inesperado." });
            throw err;
        } finally {
            setIsLoading(false);
        }
    }, [router]);

    const signOut = useCallback(async (): Promise<void> => {
        console.log("AuthProvider: Cerrando sesión..."); // Traducido
        setIsLoading(true);
        try {
            localStorage.removeItem(AUTH_TOKEN_KEY);
            setToken(null);
            setUser(null);
            console.log("AuthProvider: Token eliminado y estado limpiado."); // Traducido
            // Toast traducido
            toast.success("Sesión Cerrada", { description: "Has cerrado sesión correctamente." });

            router.replace('/login');

        } catch (error) {
             console.error("AuthProvider: Error durante el proceso de cierre de sesión:", error); // Traducido
             localStorage.removeItem(AUTH_TOKEN_KEY);
             setToken(null);
             setUser(null);
             // Toast traducido
             toast.error("Problema al Cerrar Sesión", { description: "Ocurrió un error durante el cierre de sesión." });
        } finally {
             setIsLoading(false);
        }
    }, [router]);

    const value: AuthContextType = {
        user,
        token,
        isLoading,
        signIn,
        signOut,
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth debe ser usado dentro de un AuthProvider'); // Traducido
    }
    return context;
};
```

## File: `lib\hooks\useDocumentStatuses.ts`
```ts
import { useState, useEffect, useCallback } from 'react';
import { getDocumentStatusList, DocumentStatusResponse, AuthHeaders, ApiError } from '@/lib/api';
import { useAuth } from '@/lib/hooks/useAuth';

interface UseDocumentStatusesReturn {
  documents: DocumentStatusResponse[];
  isLoading: boolean;
  error: string | null;
  fetchDocuments: () => Promise<void>; // Función para refrescar manualmente
  retryLocalUpdate: (documentId: string) => void; // Función para actualizar estado local al reintentar
}

export function useDocumentStatuses(): UseDocumentStatusesReturn {
  const { user, isLoading: isAuthLoading } = useAuth();
  const [documents, setDocuments] = useState<DocumentStatusResponse[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true); // Loading state for documents specifically
  const [error, setError] = useState<string | null>(null);

  const fetchDocuments = useCallback(async () => {
    // Don't fetch if auth is still loading or user is not available
    if (isAuthLoading || !user?.userId || !user?.companyId) {
      // If auth finished and no user, clear documents and stop loading
      if (!isAuthLoading) {
        setDocuments([]);
        setIsLoading(false);
        setError(null); // No error, just no user
      }
      return;
    }

    const authHeaders: AuthHeaders = {
      'X-User-ID': user.userId,
      'X-Company-ID': user.companyId,
    };

    setIsLoading(true);
    setError(null);

    try {
      // TODO: Implement pagination/infinite loading here later if needed
      const data = await getDocumentStatusList(authHeaders); // Using default limit/offset for now
      setDocuments(Array.isArray(data) ? data : []);
    } catch (err: any) {
      const errorMessage = err instanceof ApiError ? err.message : (err.message || 'Error al cargar la lista de documentos.');
      setError(errorMessage);
      setDocuments([]); // Clear documents on error
    } finally {
      setIsLoading(false);
    }
  }, [user, isAuthLoading]); // Depend on user and auth loading state

  // Initial fetch when auth is ready
  useEffect(() => {
    fetchDocuments();
  }, [fetchDocuments]); // fetchDocuments already depends on user/isAuthLoading

  // Function to optimistically update status locally when retry is triggered
  const retryLocalUpdate = useCallback((documentId: string) => {
    setDocuments(prevDocs =>
      prevDocs.map(doc =>
        doc.document_id === documentId
          ? { ...doc, status: 'processing', error_message: null } // Optimistic update
          : doc
      )
    );
    // Optionally trigger a full refresh after a delay
    // setTimeout(fetchDocuments, 5000);
  }, []); // No dependencies needed for this specific update logic

  return { documents, isLoading, error, fetchDocuments, retryLocalUpdate };
}

```

## File: `lib\hooks\useUploadDocument.ts`
```ts
// File: lib/hooks/useUploadDocument.ts (NUEVO)
import { useState, useCallback } from 'react';
import { uploadDocument, IngestResponse, AuthHeaders, ApiError } from '@/lib/api';
import { toast } from 'sonner'; // Para notificaciones

interface UseUploadDocumentReturn {
  isUploading: boolean;
  uploadError: string | null;
  uploadResponse: IngestResponse | null;
  uploadFile: (file: File, authHeaders: AuthHeaders) => Promise<boolean>; // Devuelve boolean indicando éxito
  clearUploadStatus: () => void; // Para limpiar el estado después de mostrar error/éxito
}

/**
 * Hook personalizado para manejar la subida de documentos.
 * Encapsula la lógica de llamada API, estado de carga, errores (incluido 409) y notificaciones.
 * @param onSuccess - Callback opcional a ejecutar tras una subida exitosa.
 * @returns Objeto con el estado y la función de subida.
 */
export function useUploadDocument(onSuccess?: (response: IngestResponse) => void): UseUploadDocumentReturn {
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [uploadResponse, setUploadResponse] = useState<IngestResponse | null>(null);

  const uploadFile = useCallback(async (file: File, authHeaders: AuthHeaders): Promise<boolean> => {
    setIsUploading(true);
    setUploadError(null);
    setUploadResponse(null);
    const toastId = toast.loading(`Subiendo archivo "${file.name}"...`); // Notificación de carga

    try {
      const response = await uploadDocument(file, authHeaders);
      setUploadResponse(response);
      toast.success("Archivo Subido", {
        id: toastId,
        description: `"${file.name}" ha sido puesto en cola para procesamiento. Estado: ${response.status || 'recibido'}.`,
      });
      if (onSuccess) {
        onSuccess(response);
      }
      setIsUploading(false);
      return true; // Indica éxito
    } catch (err: any) {
      let errorMessage = 'Error al subir el documento.';
      let errorTitle = "Error al Subir";

      if (err instanceof ApiError) {
        // Manejo específico del error 409 (duplicado)
        if (err.status === 409) {
          errorTitle = "Archivo Duplicado";
          errorMessage = err.message || `Ya existe un documento llamado "${file.name}". No se ha subido de nuevo.`;
        } else {
          // Otros errores de API
          errorMessage = err.message || `Error API (${err.status})`;
        }
      } else if (err.message) {
        // Errores genéricos
        errorMessage = err.message;
      }

      setUploadError(errorMessage);
      setUploadResponse(null);
      toast.error(errorTitle, {
        id: toastId,
        description: errorMessage,
      });
      setIsUploading(false);
      return false; // Indica fallo
    }
    // No necesitamos finally porque isUploading se setea en try/catch
  }, [onSuccess]);

  // Función para limpiar el estado de error/respuesta (útil después de mostrar el error)
  const clearUploadStatus = useCallback(() => {
    setUploadError(null);
    setUploadResponse(null);
  }, []);

  return { isUploading, uploadError, uploadResponse, uploadFile, clearUploadStatus };
}
```

## File: `lib\utils.ts`
```ts
// File: lib/utils.ts
// Purpose: General utility functions, including CN for classnames and API URL retrieval.
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Retrieves the API Gateway URL from environment variables.
 * Throws an error if the environment variable is not set during runtime in production/staging.
 * Provides a default and warning in development.
 * @returns {string} The API Gateway URL without a trailing slash.
 */
export function getApiGatewayUrl(): string {
    const apiUrl = process.env.NEXT_PUBLIC_API_GATEWAY_URL;

    // Log para depuración: muestra la URL que está obteniendo del entorno
    console.log(`getApiGatewayUrl: NEXT_PUBLIC_API_GATEWAY_URL = ${apiUrl}`);

    if (!apiUrl) {
        const errorMessage = "CRITICAL: NEXT_PUBLIC_API_GATEWAY_URL environment variable is not set.";
        console.error(errorMessage);

        // Throw error in production/staging environments
        // process.env.NODE_ENV is reliable for this check in Next.js
        if (process.env.NODE_ENV === 'production') {
             // En Vercel, usa VERCEL_ENV para distinguir preview de production si es necesario
             // if (process.env.VERCEL_ENV === 'production' || process.env.VERCEL_ENV === 'preview') {
             console.error("API Gateway URL must be set in production environment variables.");
             throw new Error("API Gateway URL is not configured for production.");
             // }
        }

        // Provide a default for local development ONLY, with a clear warning.
        // Usa la URL de Ngrok que SÍ funciona según los logs del frontend.
        const defaultDevUrl = "https://1942-2001-1388-53a1-a7c9-241c-4a44-2b12-938f.ngrok-free.app";
        console.warn(`⚠️ ${errorMessage} Using default development Ngrok URL: ${defaultDevUrl}. Make sure this matches your current ngrok tunnel!`);
        return defaultDevUrl; // Return default for local dev only
    }

    // Ensure URL format is valid (basic check)
    if (!apiUrl.startsWith('http://') && !apiUrl.startsWith('https://')) {
        console.error(`Invalid API Gateway URL format: ${apiUrl}. Must start with http:// or https://`);
        throw new Error(`Invalid API Gateway URL format: ${apiUrl}`);
    }

     // Remove trailing slash if exists to prevent double slashes in requests
    return apiUrl.endsWith('/') ? apiUrl.slice(0, -1) : apiUrl;
}
```

## File: `next-env.d.ts`
```ts
/// <reference types="next" />
/// <reference types="next/image-types/global" />

// NOTE: This file should not be edited
// see https://nextjs.org/docs/app/api-reference/config/typescript for more information.

```
