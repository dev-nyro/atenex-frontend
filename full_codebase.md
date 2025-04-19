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
│   ├── help
│   │   └── page.tsx
│   ├── layout.tsx
│   ├── page.tsx
│   ├── privacy
│   │   └── page.tsx
│   └── terms
│       └── page.tsx
├── components
│   ├── animations
│   │   └── snakeanimation.tsx
│   ├── auth
│   │   └── login-form.tsx
│   ├── chat
│   │   ├── chat-history.tsx
│   │   ├── chat-input.tsx
│   │   ├── chat-interface.tsx
│   │   ├── chat-message.tsx
│   │   └── retrieved-documents-panel.tsx
│   ├── icons
│   │   └── atenex-logo.tsx
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
    "@react-three/drei": "^10.0.6",
    "@react-three/fiber": "^9.1.2",
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
    "three": "^0.175.0",
    "tw-animate-css": "^1.2.5",
    "zod": "^3.24.2"
  },
  "devDependencies": {
    "@tailwindcss/postcss": "^4.0.0",
    "@tailwindcss/typography": "^0.5.16",
    "@testing-library/jest-dom": "^6.6.3",
    "@testing-library/react": "^16.3.0",
    "@testing-library/user-event": "^14.6.1",
    "@types/jest": "^29.5.14",
    "@types/node": "^22.13.14",
    "@types/react": "^19.0.12",
    "@types/react-dom": "^19.0.4",
    "@types/react-dropzone": "^4.2.2",
    "autoprefixer": "^10.4.21",
    "eslint": "^9.23.0",
    "eslint-config-next": "^15.2.4",
    "jest": "^29.7.0",
    "jest-environment-jsdom": "^29.7.0",
    "postcss": "^8.5.3",
    "tailwindcss": "^4.0.17",
    "ts-jest": "^29.3.2",
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
// File: app/(app)/chat/[[...chatId]]/page.tsx (MODIFICADO - Iteración 3.1)
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
import { PanelRightClose, PanelRightOpen, BrainCircuit, Loader2, AlertCircle, RefreshCw } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { useAuth } from '@/lib/hooks/useAuth';
import { cn, isGreeting, isMetaQuery, getMetaResponse } from '@/lib/utils'; // Importar helpers

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
            setIsLoadingHistory(true);
            setMessages([]);
            return;
        }

        if (!bypassAuth && !user) {
            setMessages([welcomeMessage]);
            setIsLoadingHistory(false);
            fetchedChatIdRef.current = 'welcome';
            return;
        }

        if (fetchedChatIdRef.current === currentFetchTarget) {
            if (isLoadingHistory) setIsLoadingHistory(false);
            return;
        }

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
                    // Mostrar mensaje de bienvenida solo si el chat está vacío después de cargar
                    setMessages(mappedMessages.length > 0 ? mappedMessages : [welcomeMessage]);
                })
                .catch(error => {
                    let message = "Fallo al cargar el historial del chat.";
                    if (error instanceof ApiError) {
                        message = error.message || `Error API (${error.status})`;
                        if (error.status === 401 || error.status === 403) { message = "Sesión expirada o inválida. Por favor, inicia sesión de nuevo."; toast.error("Error de Autenticación", { description: message }); signOut(); }
                        else if (error.status === 404) { message = "Chat no encontrado o no tienes permiso para acceder a él."; router.replace('/chat'); }
                        else { toast.error("Fallo al cargar historial", { description: message }); }
                    } else { toast.error("Fallo al cargar historial", { description: "Ocurrió un error inesperado." }); }
                    setHistoryError(message);
                    setMessages([welcomeMessage]); // Mostrar bienvenida en caso de error
                    fetchedChatIdRef.current = undefined;
                })
                .finally(() => setIsLoadingHistory(false));
        } else {
            // Página de nuevo chat, mostrar bienvenida
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
        const text = query.trim();
        if (!text) {
            toast.warning("No se puede enviar un mensaje vacío.");
            return;
        }

        // Añadir mensaje del usuario inmediatamente
        const userMessage: Message = {
            id: `client-user-${Date.now()}`,
            role: 'user',
            content: text,
            created_at: new Date().toISOString()
        };
        // Asegurarse de quitar el mensaje de bienvenida si existe y no es el único mensaje
        setMessages(prev => prev.length === 1 && prev[0].id === 'initial-welcome' ? [userMessage] : [...prev.filter(m => m.id !== 'initial-welcome'), userMessage]);


        // --- NUEVO: Manejo local de saludos y consultas meta ---
        if (isGreeting(text)) {
            const greetingResponse: Message = {
                id: `assistant-greet-${Date.now()}`,
                role: 'assistant',
                content: '¡Hola! ¿En qué puedo ayudarte hoy?',
                created_at: new Date().toISOString()
            };
            setMessages(prev => [...prev, greetingResponse]);
            return; // No llamar a la API
        }
        if (isMetaQuery(text)) {
             const metaResponse: Message = {
                 id: `assistant-meta-${Date.now()}`,
                 role: 'assistant',
                 content: getMetaResponse(),
                 created_at: new Date().toISOString()
             };
             setMessages(prev => [...prev, metaResponse]);
             return; // No llamar a la API
        }
        // --- FIN Manejo local ---

        const bypassAuth = process.env.NEXT_PUBLIC_BYPASS_AUTH === 'true';
        const isAuthenticated = !!user || bypassAuth;

        if (!isAuthenticated) {
            toast.error("No Autenticado", { description: "Por favor, inicia sesión para enviar mensajes."});
            signOut();
            return;
        }
        if (isSending) {
            console.warn("ChatPage: Envío de mensaje ya en progreso.");
            return;
        }

        setIsSending(true);
        setRetrievedDocs([]);

        const currentChatIdForApi = chatId || null;
        console.log(`ChatPage: Sending query to API (Chat ID: ${currentChatIdForApi || 'New'})...`);

        try {
            const response: QueryApiResponse = await postQuery({
                query: text, // Usar texto limpio
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
                setChatId(returnedChatId);
                fetchedChatIdRef.current = returnedChatId;
                router.replace(`/chat/${returnedChatId}`, { scroll: false });
            } else if (currentChatIdForApi && currentChatIdForApi !== returnedChatId) {
                 console.warn(`ChatPage: API returned different chat ID (${returnedChatId}) than expected (${currentChatIdForApi}).`);
            }

            if (mappedSources && mappedSources.length > 0) {
                setIsSourcesPanelVisible(true); // Abrir panel si hay fuentes
            }
             console.log(`ChatPage: Query successful. Answer received for chat ${returnedChatId}.`);

        } catch (error) {
            let errorMessage = "Lo siento, ocurrió un error al procesar tu solicitud.";
             if (error instanceof ApiError) {
                 errorMessage = error.message || `Error API (${error.status})`;
                 if (error.status === 401 || error.status === 403) { errorMessage = "Error de autenticación. Por favor, inicia sesión de nuevo."; signOut(); }
                 else { toast.error("Consulta Fallida", { description: errorMessage }); }
             } else if (error instanceof Error) { errorMessage = `Error: ${error.message}`; toast.error("Consulta Fallida", { description: errorMessage }); }
             else { toast.error("Consulta Fallida", { description: "Ocurrió un error desconocido." }); }

            const errorMsgObj: Message = { id: `error-${Date.now()}`, role: 'assistant', content: errorMessage, isError: true, created_at: new Date().toISOString() };
            setMessages(prev => [...prev, errorMsgObj]);

        } finally {
            setIsSending(false);
        }
    }, [chatId, isSending, user, router, signOut]);

    const handlePanelToggle = () => { setIsSourcesPanelVisible(!isSourcesPanelVisible); };

    const handleNewChat = () => {
        if (pathname !== '/chat') { router.push('/chat'); }
        else {
             // Resetear estado local para un nuevo chat
             setMessages([welcomeMessage]);
             setRetrievedDocs([]);
             setChatId(undefined);
             setIsSourcesPanelVisible(false);
             fetchedChatIdRef.current = 'welcome';
             console.log("ChatPage: Already on new chat page, reset state.");
        }
    };

    // Renderizado del contenido del chat
    const renderChatContent = (): React.ReactNode => {
        if (isLoadingHistory) {
            return (
                // Skeleton mejorado
                <div className="space-y-6 p-4">
                    <div className="flex items-start space-x-3 pr-10">
                        <Skeleton className="h-8 w-8 rounded-full flex-shrink-0" />
                        <div className="flex-1 space-y-2">
                            <Skeleton className="h-4 w-3/4 rounded" />
                            <Skeleton className="h-4 w-1/2 rounded" />
                        </div>
                    </div>
                    <div className="flex items-start space-x-3 justify-end pl-10">
                         <div className="flex-1 space-y-2 items-end flex flex-col">
                            <Skeleton className="h-4 w-3/4 rounded" />
                        </div>
                        <Skeleton className="h-8 w-8 rounded-full flex-shrink-0" />
                    </div>
                     <div className="flex items-start space-x-3 pr-10">
                        <Skeleton className="h-8 w-8 rounded-full flex-shrink-0" />
                        <div className="flex-1 space-y-2">
                            <Skeleton className="h-4 w-1/2 rounded" />
                        </div>
                    </div>
                </div>
            );
        }
        if (historyError) {
            // Mensaje de error mejorado
            return (
                <div className="flex flex-col items-center justify-center h-full text-center p-6">
                    <AlertCircle className="h-12 w-12 text-destructive mb-4" />
                    <p className="text-xl font-semibold text-foreground mb-2">Error al Cargar el Chat</p>
                    <p className="text-sm text-muted-foreground mb-5 max-w-sm">{historyError}</p>
                    <Button variant="outline" size="sm" onClick={() => window.location.reload()} className="mt-4">
                        <RefreshCw className="mr-2 h-4 w-4" />
                        Reintentar Carga
                    </Button>
                </div>
            );
        }
        // Mostrar mensajes o estado vacío si no hay error ni carga
        return (
            <div className="space-y-6 pb-6"> {/* Espaciado y padding inferior */}
                {messages.map((message) => ( <ChatMessage key={message.id} message={message} /> ))}
                {/* Indicador de carga "pensando" */}
                {isSending && (
                    <div className="flex items-start space-x-3 pr-10 pt-4">
                        <Skeleton className="h-8 w-8 rounded-full flex-shrink-0 bg-primary/10" />
                        <div className="flex-1 space-y-2 pt-1.5">
                            <Skeleton className="h-3.5 w-16 rounded" />
                        </div>
                    </div>
                )}
            </div>
        );
    };

    return (
        // Fondo ligeramente diferente para el área de chat
        <div className="flex flex-col h-full bg-background">
             <ResizablePanelGroup direction="horizontal" className="flex-1 overflow-hidden">
                 <ResizablePanel defaultSize={isSourcesPanelVisible ? 65 : 100} minSize={40}>
                     <div className="flex h-full flex-col relative">
                         {/* Botón toggle más discreto */}
                         <div className="absolute top-3 right-3 z-20">
                             <Button
                                onClick={handlePanelToggle}
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 rounded-full text-muted-foreground hover:text-foreground hover:bg-accent/50 data-[state=open]:bg-accent data-[state=open]:text-accent-foreground"
                                data-state={isSourcesPanelVisible ? "open" : "closed"} // Para posible estilo futuro
                                aria-label={isSourcesPanelVisible ? 'Cerrar Panel de Fuentes' : 'Abrir Panel de Fuentes'}
                             >
                                 {isSourcesPanelVisible ? <PanelRightClose className="h-5 w-5" /> : <PanelRightOpen className="h-5 w-5" />}
                             </Button>
                         </div>
                         {/* Ajuste de padding en ScrollArea */}
                         <ScrollArea className="flex-1 px-6 pt-6 pb-2" ref={scrollAreaRef}>
                             {renderChatContent()}
                         </ScrollArea>
                         {/* Borde superior más sutil y padding ajustado */}
                         <div className="border-t border-border/60 p-4 bg-background/95 backdrop-blur-sm shadow-sm shrink-0">
                             <ChatInput onSendMessage={handleSendMessage} isLoading={isSending || isLoadingHistory || isAuthLoading} />
                         </div>
                     </div>
                 </ResizablePanel>
                 {isSourcesPanelVisible && (
                     <>
                         <ResizableHandle withHandle />
                         {/* Ajuste de tamaño del panel de fuentes */}
                         <ResizablePanel defaultSize={35} minSize={25} maxSize={50}>
                             <RetrievedDocumentsPanel documents={retrievedDocs} isLoading={isSending} />
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
// File: app/(app)/knowledge/page.tsx (REFACTORIZADO - Layout de 1 Columna)
'use client';
import React, { useCallback, useEffect } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Loader2, AlertTriangle, UploadCloud, FileText, List } from 'lucide-react'; // Iconos relevantes
import { useAuth } from '@/lib/hooks/useAuth';
import { useDocumentStatuses } from '@/lib/hooks/useDocumentStatuses';
import { useUploadDocument } from '@/lib/hooks/useUploadDocument';
import { DocumentStatusList } from '@/components/knowledge/document-status-list';
import { FileUploader } from '@/components/knowledge/file-uploader';
import { AuthHeaders } from '@/lib/api';
import { cn } from '@/lib/utils';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Separator } from '@/components/ui/separator'; // Importar Separator

export default function KnowledgePage() {
  const { user, isLoading: isAuthLoading } = useAuth();

  // Hook para manejar el estado de los documentos
  const {
    documents,
    isLoading: isLoadingDocuments,
    error: documentsError,
    fetchDocuments,
    fetchMore,
    hasMore,
    retryLocalUpdate,
    refreshDocument,
    deleteLocalDocument,
  } = useDocumentStatuses();

  // Hook para manejar la subida de archivos
  const {
    isUploading,
    uploadError,
    uploadResponse, // Usamos uploadResponse para el useEffect
    uploadFile,
    clearUploadStatus
  } = useUploadDocument(
    // Callback onSuccess (opcional, la lógica principal está en useEffect)
    // () => { console.log("Upload initiated successfully via hook"); }
  );

  // Efecto para refrescar la lista cuando una subida es exitosa (estado 202 recibido)
  // y el backend confirma que el documento existe (se obtiene un document_id).
  useEffect(() => {
    if (uploadResponse?.document_id) {
       const refreshDelay = 1500; // ms
       console.log(`KnowledgePage: Upload successful for ${uploadResponse.document_id}. Refreshing list in ${refreshDelay}ms.`);
       const timer = setTimeout(() => {
           fetchDocuments(true); // Recarga completa para incluir el nuevo
       }, refreshDelay);
       return () => clearTimeout(timer); // Limpiar timeout si el componente se desmonta
    }
  }, [uploadResponse, fetchDocuments]); // Depende de la respuesta de subida y la función de fetch

  // Callbacks para acciones en la lista
  const handleRetrySuccess = useCallback((documentId: string) => {
    retryLocalUpdate(documentId);
    refreshDocument(documentId);
  }, [retryLocalUpdate, refreshDocument]);

  const handleDeleteSuccess = useCallback((documentId: string) => {
    deleteLocalDocument(documentId);
  }, [deleteLocalDocument]);

  // Headers de autenticación
  const authHeadersForChildren: AuthHeaders | null = user?.userId && user?.companyId ? {
    'X-User-ID': user.userId,
    'X-Company-ID': user.companyId,
  } : null;

  // --- Renderizado ---

  // Skeleton de Carga Principal (mientras se verifica la autenticación)
  if (isAuthLoading) {
    return (
        <div className="container mx-auto p-4 md:p-6 lg:p-8 space-y-8">
          <Skeleton className="h-10 w-1/3 mb-6" /> {/* Skeleton título */}
          <Skeleton className="h-64 rounded-xl mb-8" /> {/* Skeleton Uploader */}
          <Skeleton className="h-10 w-1/4 mb-4" /> {/* Skeleton título lista */}
          <Skeleton className="h-80 rounded-xl" /> {/* Skeleton Lista */}
        </div>
    );
  }

  // Renderizado Principal - Layout de UNA SOLA COLUMNA
  return (
    <div className="container mx-auto p-4 md:p-6 lg:p-8 space-y-8">
        {/* Título de la página */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground flex items-center gap-2">
                 <FileText className="h-7 w-7" />
                 Base de Conocimiento
            </h1>
             {/* Botón global de refresco */}
            {authHeadersForChildren && (
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => fetchDocuments(true)} // reset = true
                    disabled={isLoadingDocuments}
                    className="w-full sm:w-auto" // Ancho completo en móvil
                >
                    <Loader2 className={cn("mr-2 h-4 w-4", isLoadingDocuments ? "animate-spin" : "hidden")} />
                    Refrescar Documentos
                </Button>
            )}
        </div>

        {/* Sección: Subir Documento */}
        <Card className="shadow-md border">
            <CardHeader>
                <CardTitle className="text-xl flex items-center gap-2">
                    <UploadCloud className="h-5 w-5 text-primary" /> Subir Nuevo Documento
                </CardTitle>
                <CardDescription>Añade archivos a tu base de conocimiento.</CardDescription>
            </CardHeader>
            <CardContent>
            {authHeadersForChildren ? (
                // Componente FileUploader
                <FileUploader
                    authHeaders={authHeadersForChildren}
                    onUploadFile={uploadFile}
                    isUploading={isUploading}
                    uploadError={uploadError}
                    clearUploadStatus={clearUploadStatus}
                />
            ) : (
                // Mensaje si no está autenticado
                <Alert variant="default" className="bg-muted/50">
                     <AlertTriangle className="h-4 w-4 text-muted-foreground" />
                    <AlertTitle className="text-sm font-medium">Autenticación Requerida</AlertTitle>
                    <AlertDescription className="text-xs text-muted-foreground">
                        Inicia sesión para poder subir nuevos documentos.
                    </AlertDescription>
                </Alert>
            )}
            </CardContent>
        </Card>

        <Separator /> {/* Separador visual */}

        {/* Sección: Lista de Documentos Subidos */}
        <div className='space-y-4'>
             <h2 className="text-xl md:text-2xl font-semibold tracking-tight text-foreground flex items-center gap-2">
                 <List className="h-6 w-6" /> Documentos Gestionados
            </h2>

             {/* Mostrar Error de Carga de la Lista */}
             {documentsError && (
                <Alert variant="destructive">
                     <AlertTriangle className="h-4 w-4" />
                    <AlertTitle>Error al Cargar Documentos</AlertTitle>
                    <AlertDescription>
                        {documentsError}
                        <Button variant="link" size="sm" onClick={() => fetchDocuments(true)} className="p-0 h-auto ml-2 text-destructive underline">Reintentar</Button>
                    </AlertDescription>
                </Alert>
             )}

             {/* Mostrar Skeleton si está cargando inicialmente y no hay error */}
             {isLoadingDocuments && documents.length === 0 && !documentsError && (
                <div className="space-y-2 pt-2 border rounded-lg p-4">
                    <Skeleton className="h-12 w-full rounded-md" />
                    <Skeleton className="h-12 w-full rounded-md" />
                    <Skeleton className="h-12 w-full rounded-md" />
                </div>
             )}

             {/* Mostrar Lista de Documentos si está autenticado y no en skeleton inicial */}
             {!isLoadingDocuments && documentsError == null && authHeadersForChildren && (
                <DocumentStatusList
                    documents={documents}
                    authHeaders={authHeadersForChildren}
                    onRetrySuccess={handleRetrySuccess}
                    fetchMore={fetchMore}
                    hasMore={hasMore}
                    refreshDocument={refreshDocument}
                    onDeleteSuccess={handleDeleteSuccess}
                    isLoading={isLoadingDocuments} // Prop para indicar si se está cargando más
                />
             )}

             {/* Mensaje si no está autenticado y no hubo error ni carga inicial */}
             {!isLoadingDocuments && !authHeadersForChildren && !documentsError && (
                <div className="text-center py-10 border-2 border-dashed rounded-lg bg-muted/30">
                     <p className="text-muted-foreground text-sm">Inicia sesión para ver tus documentos.</p>
                </div>
             )}
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
  // Iniciar colapsado por defecto en pantallas más pequeñas podría ser una opción futura,
  // pero por ahora empezamos expandido.
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
              collapsible
              collapsedSize={4} // Tamaño colapsado (en porcentaje o píxeles si se especifica unit)
              minSize={15} // Permitir que sea más delgado
              maxSize={25} // Límite superior
              defaultSize={18} // Un poco más ancho por defecto
              onCollapse={() => setIsSidebarCollapsed(true)}
              onExpand={() => setIsSidebarCollapsed(false)}
              className={cn(
                  "transition-all duration-300 ease-in-out bg-background dark:bg-card",
                  // Definimos el tamaño colapsado con clases específicas si collapsedSize no funciona como esperado
                  isSidebarCollapsed ? "min-w-[50px] max-w-[50px]" : "min-w-[220px]" // Ancho mínimo expandido
              )}
              order={1}
          >
              {/* Pasamos el estado colapsado al Sidebar */}
              <Sidebar isCollapsed={isSidebarCollapsed} />
          </ResizablePanel>
          {/* Usamos el handle personalizado de ui/resizable */}
          <ResizableHandle withHandle />
          <ResizablePanel defaultSize={82} minSize={30} order={2}> {/* Ajustar tamaño restante */}
              <div className="flex h-full flex-col">
                  <Header />
                  {/* Cambiado el padding para ser consistente */}
                  <main className="flex-1 overflow-y-auto bg-background p-6 lg:p-8">
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
// File: app/(app)/settings/page.tsx (MODIFICADO - Iteración 4.2)
"use client";

import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card'; // Añadido CardFooter
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/lib/hooks/useAuth';
import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { Loader2, Check } from 'lucide-react'; // Importar iconos
import { Skeleton } from '@/components/ui/skeleton'; // Importar Skeleton

export default function SettingsPage() {
    const { user, isLoading: isAuthLoading } = useAuth(); // Añadir isLoading
    const [name, setName] = useState('');
    const [isSaving, setIsSaving] = useState(false);
    const [hasChanged, setHasChanged] = useState(false);
    const [saveSuccess, setSaveSuccess] = useState(false); // Estado para feedback visual

    useEffect(() => {
        if (user) {
            setName(user.name || '');
            setHasChanged(false);
            setSaveSuccess(false); // Resetear éxito al cargar datos
        }
    }, [user]);

    const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newName = event.target.value;
        setName(newName);
        setHasChanged(newName !== (user?.name || ''));
        setSaveSuccess(false); // Resetear éxito si cambia de nuevo
    };

    const handleSave = async () => {
        if (!hasChanged || !user) return; // Asegurar que hay usuario
        setIsSaving(true);
        setSaveSuccess(false);
        console.log('Guardando cambios (simulado):', { name });
        try {
          // Simular llamada API
          await new Promise(resolve => setTimeout(resolve, 1200));

          // TODO: Implementar llamada API real para actualizar el nombre del usuario
          // Ejemplo: await updateUserProfile(user.userId, { name });

          toast.success("Perfil Actualizado", { description: "Tu nombre ha sido guardado." });
          setHasChanged(false);
          setSaveSuccess(true); // Marcar éxito

          // TODO: Actualizar el objeto 'user' en AuthContext para reflejar el cambio
          // Esto podría requerir una función adicional en useAuth o recargar datos

        } catch (error) {
          console.error("Error al guardar perfil:", error);
          toast.error("Error al Guardar", { description: "No se pudo actualizar el perfil." });
          setSaveSuccess(false);
        } finally {
           setIsSaving(false);
        }
    };

    // Mostrar skeleton mientras carga la autenticación
    if (isAuthLoading) {
        return (
            <div className="space-y-8 max-w-3xl mx-auto">
                 <Skeleton className="h-10 w-1/4 mb-6" /> {/* Skeleton título */}
                 <Skeleton className="h-64 w-full rounded-xl" /> {/* Skeleton Card Perfil */}
                 <Skeleton className="h-48 w-full rounded-xl" /> {/* Skeleton Card Empresa */}
            </div>
        )
    }

  return (
    // Contenedor principal con espaciado vertical y ancho máximo
    <div className="space-y-8 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold tracking-tight">Configuración</h1>

      {/* Card para Perfil */}
      <Card>
        <CardHeader>
          <CardTitle>Perfil de Usuario</CardTitle>
          <CardDescription>Administra la información de tu cuenta personal.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6"> {/* Aumentado space-y */}
            {/* Campo Nombre */}
            <div className="grid sm:grid-cols-3 items-center gap-4">
                 <Label htmlFor="name" className="sm:text-right sm:mt-2">Nombre</Label>
                 <Input
                    id="name"
                    value={name}
                    onChange={handleNameChange}
                    disabled={isSaving}
                    className="sm:col-span-2" // Input ocupa 2 columnas en SM+
                    placeholder="Tu nombre completo"
                 />
            </div>
             {/* Campo Email (Deshabilitado) */}
             <div className="grid sm:grid-cols-3 items-start gap-4">
                 <Label htmlFor="email" className="sm:text-right sm:mt-2">Correo electrónico</Label>
                 <div className="sm:col-span-2 space-y-1">
                     <Input id="email" type="email" value={user?.email || ''} disabled />
                     <p className="text-xs text-muted-foreground">El correo electrónico no se puede cambiar.</p>
                 </div>
            </div>
        </CardContent>
        {/* Footer para el botón Guardar */}
        <CardFooter className="border-t pt-6 justify-end">
            <Button onClick={handleSave} disabled={isSaving || !hasChanged || saveSuccess}>
                {isSaving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {saveSuccess && <Check className="mr-2 h-4 w-4" />}
                {isSaving ? "Guardando..." : saveSuccess ? "Guardado" : "Guardar Cambios"}
             </Button>
        </CardFooter>
      </Card>

      {/* Card para Configuración de Empresa */}
       <Card>
        <CardHeader>
          <CardTitle>Configuración de la Empresa</CardTitle>
          <CardDescription>Información relacionada con tu organización.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
           {/* Información de la compañía actual (si existe) */}
            {user?.companyId ? (
                 <div className="grid sm:grid-cols-3 items-center gap-4">
                    <Label htmlFor="companyId" className="sm:text-right">ID de Empresa</Label>
                    <Input id="companyId" value={user.companyId} readOnly disabled className="sm:col-span-2 font-mono text-xs"/>
                 </div>
             ) : (
                <p className="text-sm text-muted-foreground italic">No hay información de empresa asociada a tu cuenta.</p>
             )}
             {/* Placeholder para futuras configuraciones */}
             <p className="text-sm text-muted-foreground pt-4 border-t">
                Otras configuraciones de la empresa aparecerán aquí en futuras versiones.
             </p>
        </CardContent>
      </Card>

    </div>
  );
}
```

## File: `app\(auth)\layout.tsx`
```tsx
// File: app/(auth)/layout.tsx (MODIFICADO - Iteración 5.3)
import React from 'react';
import Image from 'next/image';
import { APP_NAME } from '@/lib/constants';
import { BookOpen } from 'lucide-react'; // Usar el mismo icono que en landing

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // Fondo gradiente más sutil
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-background via-background to-muted/30 p-4">
       {/* Logo consistente con landing */}
       <div className="mb-8 flex items-center space-x-2 text-primary">
         <BookOpen className="h-7 w-7" />
         <span className="text-3xl font-bold">{APP_NAME}</span>
       </div>
      {children}
    </div>
  );
}
```

## File: `app\(auth)\login\page.tsx`
```tsx
// File: app/(auth)/login/page.tsx (MODIFICADO - Iteración 5.3)
import { LoginForm } from "@/components/auth/login-form";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { APP_NAME } from "@/lib/constants";
import Link from "next/link"; // Importar Link

export default function LoginPage() {
  return (
    // Card con sombra más pronunciada y padding ajustado
    <Card className="w-full max-w-sm shadow-xl border-border/60">
      <CardHeader className="text-center space-y-1 pt-8 pb-6"> {/* Ajuste de padding */}
        <CardTitle className="text-2xl font-semibold tracking-tight">Iniciar Sesión</CardTitle> {/* Ajuste fuente */}
        <CardDescription>Accede a tu cuenta {APP_NAME}</CardDescription> {/* Nombre App */}
      </CardHeader>
      {/* Padding inferior en CardContent */}
      <CardContent className="pb-8 px-6"> {/* Padding horizontal también */}
        <LoginForm />
         {/* Separador y enlace (si se añade registro) */}
         {/* <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground">
                      O continuar con
                  </span>
              </div>
          </div> */}
         {/* Placeholder para botones de SSO si se añaden */}
         {/* <div className="grid gap-2"> ... </div> */}

        {/* Enlace a Registro (si existe) */}
        {/* <p className="mt-6 text-center text-sm text-muted-foreground">
            ¿No tienes cuenta?{' '}
            <Link href="/register" className="font-medium text-primary hover:underline underline-offset-4">
                Regístrate aquí
            </Link>
        </p> */}
      </CardContent>
    </Card>
  );
}
```

## File: `app\about\page.tsx`
```tsx
// File: app/about/page.tsx (MODIFICADO - Iteración 5.2)
"use client";

import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { APP_NAME } from '@/lib/constants';
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"; // Añadido AvatarImage
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react'; // Icono para volver

const teamMembers = [
    { name: "Demo User 1", role: "Fundador", imageUrl: null },
    { name: "Demo User 2", role: "Co-Fundador", imageUrl: null },
    { name: "Demo User 3", role: "Ingeniero Líder", imageUrl: null },
];

export default function AboutPage() {
    const router = useRouter();

  return (
      // Contenedor principal con padding y layout de una columna
      <div className="container mx-auto max-w-4xl p-4 md:p-8 space-y-8">
          {/* Botón volver mejorado */}
          <Button variant="ghost" onClick={() => router.push('/')} className="text-sm text-muted-foreground hover:text-foreground mb-4 -ml-4">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Volver al Inicio
          </Button>
          {/* Título principal */}
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">Acerca de {APP_NAME}</h1>

          {/* Card Misión */}
          <Card>
              <CardHeader>
                  <CardTitle>Nuestra Misión</CardTitle>
                  <CardDescription>
                      Empoderar a las organizaciones con acceso fluido a su conocimiento colectivo.
                  </CardDescription>
              </CardHeader>
              <CardContent className="prose prose-sm sm:prose-base dark:prose-invert max-w-none">
                  <p>
                      Estamos comprometidos a proporcionar soluciones innovadoras que optimicen la gestión del conocimiento,
                      faciliten la toma de decisiones informadas y mejoren la productividad del equipo.
                  </p>
              </CardContent>
          </Card>

          {/* Card Visión */}
          <Card>
              <CardHeader>
                  <CardTitle>Nuestra Visión</CardTitle>
                  <CardDescription>
                      Ser la plataforma líder de consulta de conocimiento, transformando cómo las empresas aprovechan la información.
                  </CardDescription>
              </CardHeader>
              <CardContent className="prose prose-sm sm:prose-base dark:prose-invert max-w-none">
                  <p>
                      Visualizamos un futuro donde las organizaciones pueden aprovechar sin esfuerzo su experiencia interna,
                      fomentando una cultura de aprendizaje y crecimiento continuos.
                  </p>
              </CardContent>
          </Card>

          {/* Card Valores */}
          <Card>
              <CardHeader>
                  <CardTitle>Nuestros Valores</CardTitle>
                  <CardDescription>
                      Pilares que guían nuestro trabajo diario.
                  </CardDescription>
              </CardHeader>
              <CardContent className="prose prose-sm sm:prose-base dark:prose-invert max-w-none">
                  <ul>
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

          {/* Card Equipo */}
          <Card>
              <CardHeader>
                  <CardTitle>Conoce a Nuestro Equipo</CardTitle>
                  <CardDescription>
                      Las talentosas personas detrás de {APP_NAME}.
                  </CardDescription>
              </CardHeader>
              <CardContent>
                  {/* Grid para el equipo */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 justify-items-center">
                    {teamMembers.map((member) => (
                        <div key={member.name} className="flex flex-col items-center text-center">
                            <Avatar className="h-20 w-20 border-2 border-primary/10">
                                {member.imageUrl ? (
                                    <AvatarImage src={member.imageUrl} alt={member.name} />
                                ) : (
                                    // Fallback con iniciales y fondo suave
                                    <AvatarFallback className='text-xl bg-muted'>{member.name.charAt(0)}</AvatarFallback>
                                )}
                            </Avatar>
                            <div className="mt-3">
                                <p className="font-semibold text-foreground">{member.name}</p>
                                <p className="text-xs text-muted-foreground">{member.role}</p>
                            </div>
                        </div>
                    ))}
                 </div>
              </CardContent>
          </Card>
          <Separator className="my-12" /> {/* Separador al final */}
      </div>
  );
}
```

## File: `app\contact\page.tsx`
```tsx
// File: app/contact/page.tsx (MODIFICADO - Iteración 5.2)
"use client";

import React from 'react';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { APP_NAME } from '@/lib/constants';
import { useAuth } from '@/lib/hooks/useAuth';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Mail, Phone, Linkedin, MessageCircle, Loader2, Building, MapPin, ArrowLeft } from 'lucide-react'; // Icono volver
import { cn } from '@/lib/utils';
import { toast } from 'sonner';
import Link from 'next/link';
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';


export default function ContactPage() {
  const router = useRouter();
  const { user, isLoading: isAuthLoading } = useAuth();
  const isAuthenticated = !isAuthLoading && !!user;

  // Header consistente con otras páginas públicas
  const renderHeader = () => (
    <header className="sticky top-0 z-50 w-full bg-background/90 backdrop-blur-lg border-b border-border/60">
        <div className="container flex items-center justify-between h-16 px-4 md:px-6">
          <Link
            href="/"
            className="flex items-center gap-2 text-xl font-semibold text-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm"
            aria-label={`${APP_NAME} - Inicio`}
          >
             <Building className="w-6 h-6" /> {/* Usar Building para consistencia */}
            <span className='font-bold'>{APP_NAME}</span>
          </Link>
          <nav className="flex items-center space-x-1 sm:space-x-2">
            <LinkButton href="/">Inicio</LinkButton>
            <LinkButton href="/about">Nosotros</LinkButton>
            <LinkButton href="/contact" isActive={true}>Contacto</LinkButton>
            <div className="pl-2 sm:pl-4">
                {isAuthLoading ? (
                    <Button variant="ghost" disabled={true} size="sm" className="w-[95px]">
                        <Loader2 className="h-4 w-4 animate-spin" />
                    </Button>
                ) : isAuthenticated ? (
                    <Button variant="default" onClick={() => router.push('/chat')} size="sm" className="w-[95px] shadow-sm">
                        Ir a la App
                    </Button>
                ) : (
                    <Button variant="outline" onClick={() => router.push('/login')} size="sm" className="w-[95px]">
                        Acceder
                    </Button>
                )}
            </div>
          </nav>
        </div>
    </header>
  );

  return (
    <div className="flex flex-col min-h-screen bg-muted/20 dark:bg-background">
      {renderHeader()}

      {/* Main Content Area */}
      <main className="container mx-auto px-4 py-12 md:py-20 flex-1">
        {/* Título y descripción */}
        <section className="text-center mb-12 md:mb-16">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-4">
            Ponte en Contacto
          </h1>
          <p className="text-base sm:text-lg text-muted-foreground max-w-xl mx-auto">
            ¿Tienes preguntas o comentarios? ¡Nos encantaría escucharte! Utiliza el formulario o nuestros canales directos.
          </p>
        </section>

        {/* Grid para Formulario e Información */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12 items-start max-w-6xl mx-auto">

          {/* Columna Izquierda: Formulario */}
          <Card className="lg:col-span-3 shadow-md border">
            <CardHeader>
              <CardTitle>Envíanos un Mensaje</CardTitle>
              <CardDescription>
                Rellena el formulario y te responderemos lo antes posible.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ContactForm />
            </CardContent>
          </Card>

          {/* Columna Derecha: Información Adicional */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="shadow-md border">
              <CardHeader>
                <CardTitle className="text-lg">Información de Contacto</CardTitle>
                <CardDescription>Otras formas de localizarnos.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                 <ContactInfoItem Icon={Mail} label="Correo Electrónico:" href="mailto:info@atenex.ai" text="info@atenex.ai" />
                 <ContactInfoItem Icon={Phone} label="Teléfono:" href="tel:+15551234567" text="+1 (555) 123-4567" />
                 <Separator className='my-4'/> {/* Más margen en separador */}
                 <ContactInfoItem Icon={Linkedin} label="LinkedIn:" href="https://linkedin.com/company/atenex" text="Atenex en LinkedIn" targetBlank={true} />
                 <ContactInfoItem Icon={MessageCircle} label="WhatsApp:" href="https://wa.me/15551234567" text="Chatea por WhatsApp" targetBlank={true}/>
                 <Separator className='my-4'/>
                 <ContactInfoItem Icon={MapPin} label="Oficina:" text="Dirección Ficticia, Ciudad, País" />
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

       {/* Footer Consistente */}
       <footer className="bg-muted/20 border-t border-border/60 py-6 mt-16">
         <div className="container text-center text-muted-foreground text-xs sm:text-sm flex flex-col sm:flex-row justify-between items-center gap-2">
           <span>© {new Date().getFullYear()} {APP_NAME}. Todos los derechos reservados.</span>
           <div className="flex gap-3">
              <Link href="/privacy" className="hover:text-primary hover:underline underline-offset-4 transition-colors">Política de Privacidad</Link>
              <span className='opacity-50'>|</span>
              <Link href="/terms" className="hover:text-primary hover:underline underline-offset-4 transition-colors">Términos de Servicio</Link>
           </div>
         </div>
       </footer>
    </div>
  );
}

// Componente LinkButton (consistente)
function LinkButton({ href, children, Icon, isActive = false }: { href: string; children: React.ReactNode; Icon?: React.ComponentType<{ className?: string }>; isActive?: boolean }) {
  const router = useRouter();
  return (
    <Button
        variant="ghost"
        onClick={() => router.push(href)}
        className={cn(
            "text-sm px-2 sm:px-3 py-1 h-8",
            "rounded-md",
            "hover:bg-accent hover:text-accent-foreground",
            "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
            isActive ? "text-primary font-semibold bg-primary/10" : "text-muted-foreground"
        )}
     >
       {Icon && <Icon className="h-4 w-4 mr-1.5 hidden sm:inline-block flex-shrink-0" />}
      {children}
    </Button>
  );
}


// Formulario de contacto (consistente)
function ContactForm() {
  const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      console.log("Formulario de contacto enviado (implementar lógica de envío)");
      toast.info("Formulario Enviado (Simulado)", { description: "La lógica de envío del formulario necesita implementación."});
  }

  return (
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label htmlFor="name">Nombre</Label>
              <Input id="name" required placeholder="Tu Nombre" />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="email">Correo Electrónico</Label>
              <Input id="email" type="email" required placeholder="tu@ejemplo.com" />
            </div>
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="subject">Asunto</Label>
          <Input id="subject" placeholder="Ej: Consulta sobre precios" />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="message">Mensaje</Label>
          <Textarea
            id="message"
            required
            placeholder="Escribe tu mensaje aquí..."
            className="min-h-[120px]"
          />
        </div>
        <Button type="submit" className="w-full sm:w-auto">
          Enviar Mensaje
        </Button>
      </form>
  );
}

// Componente ContactInfoItem (consistente)
function ContactInfoItem({ Icon, label, href, text, targetBlank = false }: { Icon: React.ComponentType<{ className?: string }>, label: string, href?: string, text: string, targetBlank?: boolean }) {
    const content = (
        <>
            <Icon className="h-4 w-4 text-primary flex-shrink-0" />
            <span className="font-medium text-foreground/90">{label}</span>
            <span className="text-muted-foreground break-all">{text}</span> {/* Allow break-all for long text */}
        </>
    );
    const containerClasses = "flex items-center space-x-2 text-sm";
    const linkClasses = "inline-flex items-center gap-2 group hover:text-primary transition-colors";

    return (
        <div className={containerClasses}>
            {href ? (
                 <a
                    href={href}
                    className={cn(linkClasses)}
                    target={targetBlank ? "_blank" : undefined}
                    rel={targetBlank ? "noopener noreferrer" : undefined}
                >
                    {content}
                 </a>
            ) : (
                <div className="inline-flex items-center gap-2">{content}</div>
            )}
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
/* Variables para el tema claro (:root) - Ajustados para mayor neutralidad */
:root {
    --radius: 0.6rem;
    --background: oklch(0.995 0.005 240);
    --foreground: oklch(0.15 0.015 240);
    --card: oklch(1 0 0);
    --card-foreground: var(--foreground);
    --popover: var(--card);
    --popover-foreground: var(--card-foreground);
    --primary: oklch(0.48 0.16 265);
    --primary-foreground: oklch(0.99 0.01 265);
    --secondary: oklch(0.97 0.01 240);
    --secondary-foreground: oklch(0.30 0.02 240);
    --muted: var(--secondary);
    --muted-foreground: oklch(0.50 0.015 240);
    --accent: oklch(0.95 0.015 240);
    --accent-foreground: oklch(0.20 0.02 240);
    --destructive: oklch(0.6 0.2 20);
    --destructive-foreground: oklch(0.99 0.01 20);
    --border: oklch(0.92 0.01 240);
    --input: oklch(0.94 0.01 240);
    --ring: oklch(0.65 0.16 265 / 0.5);
    --chart-1: oklch(0.646 0.222 41.116);
    --chart-2: oklch(0.6 0.118 184.704);
    --chart-3: oklch(0.398 0.07 227.392);
    --chart-4: oklch(0.828 0.189 84.429);
    --chart-5: oklch(0.769 0.188 70.08);
    --sidebar: var(--card);
    --sidebar-foreground: var(--foreground);
    --sidebar-primary: var(--primary);
    --sidebar-primary-foreground: var(--primary-foreground);
    --sidebar-accent: var(--accent);
    --sidebar-accent-foreground: var(--accent-foreground);
    --sidebar-border: var(--border);
    --sidebar-ring: var(--ring);
}

/* Variables para el tema oscuro (.dark) - Base Oscuro (Elegante) */
.dark {
    --background: oklch(0.1 0.01 230); /* Azul/Gris muy oscuro */
    --foreground: oklch(0.93 0.008 230); /* Gris muy claro, ligeramente azulado */
    --card: oklch(0.14 0.015 230);    /* Un poco más claro que el fondo */
    --card-foreground: var(--foreground);
    --popover: oklch(0.10 0.01 230);   /* Más oscuro para popovers */
    --popover-foreground: var(--foreground);
    --primary: oklch(0.8 0.1 210);    /* Azul claro brillante como primario */
    --primary-foreground: oklch(0.08 0.03 210); /* Azul muy oscuro para texto primario */
    --secondary: oklch(0.20 0.02 230); /* Gris oscuro azulado */
    --secondary-foreground: oklch(0.80 0.01 230); /* Texto claro para secundario */
    --muted: var(--secondary);
    --muted-foreground: oklch(0.55 0.015 230); /* Muted más claro */
    --accent: oklch(0.25 0.025 230);   /* Accent oscuro */
    --accent-foreground: oklch(0.97 0.008 230); /* Texto claro para accent */
    --destructive: oklch(0.65 0.18 15);    /* Rojo anaranjado */
    --destructive-foreground: oklch(0.99 0.01 15); /* Texto claro */
    --border: oklch(0.22 0.02 230);   /* Borde oscuro */
    --input: oklch(0.24 0.022 230);  /* Input oscuro */
    --ring: oklch(0.8 0.1 210 / 0.5); /* Anillo azul claro semi-transparente */
    /* Variables Chart */
    --chart-1: oklch(0.488 0.243 264.376);
    --chart-2: oklch(0.696 0.17 162.48);
    --chart-3: oklch(0.769 0.188 70.08);
    --chart-4: oklch(0.627 0.265 303.9);
    --chart-5: oklch(0.645 0.246 16.439);
    /* Sidebar */
     --sidebar: oklch(0.13 0.012 230); /* Sidebar ligeramente diferente */
     --sidebar-foreground: var(--foreground);
     --sidebar-primary: var(--primary);
     --sidebar-primary-foreground: var(--primary-foreground);
     --sidebar-accent: var(--accent);
     --sidebar-accent-foreground: var(--accent-foreground);
     --sidebar-border: var(--border);
     --sidebar-ring: var(--ring);
}

/* --- TEMA: Slate (Oscuro) --- */
.slate {
    --background: oklch(0.18 0.01 230);
    --foreground: oklch(0.94 0.005 230);
    --card: oklch(0.22 0.015 230);
    --card-foreground: var(--foreground);
    --popover: oklch(0.15 0.01 230);
    --popover-foreground: var(--foreground);
    --primary: oklch(0.7 0.18 40); /* Naranja vibrante */
    --primary-foreground: oklch(0.1 0.05 40);
    --secondary: oklch(0.3 0.02 230);
    --secondary-foreground: oklch(0.88 0.008 230);
    --muted: var(--secondary);
    --muted-foreground: oklch(0.6 0.01 230);
    --accent: oklch(0.35 0.025 230);
    --accent-foreground: oklch(0.96 0.006 230);
    --destructive: oklch(0.65 0.16 15);
    --destructive-foreground: oklch(0.99 0.01 15);
    --border: oklch(0.3 0.02 230);
    --input: oklch(0.32 0.022 230);
    --ring: oklch(0.7 0.18 40 / 0.5);
    --sidebar: oklch(0.20 0.012 230);
    --sidebar-border: var(--border);
    --sidebar-foreground: var(--foreground);
    --sidebar-primary: var(--primary);
    --sidebar-primary-foreground: var(--primary-foreground);
    --sidebar-accent: var(--accent);
    --sidebar-accent-foreground: var(--accent-foreground);
    --sidebar-ring: var(--ring);
}

/* --- TEMA: Indigo (Claro) --- */
.indigo {
    --background: oklch(0.98 0.01 250);
    --foreground: oklch(0.15 0.03 280);
    --card: oklch(1 0 0);
    --card-foreground: var(--foreground);
    --popover: var(--card);
    --popover-foreground: var(--card-foreground);
    --primary: oklch(0.55 0.18 280);
    --primary-foreground: oklch(0.99 0.01 280);
    --secondary: oklch(0.96 0.02 270);
    --secondary-foreground: oklch(0.35 0.04 280);
    --muted: var(--secondary);
    --muted-foreground: oklch(0.55 0.03 275);
    --accent: oklch(0.8 0.15 190); /* Aqua/Cian */
    --accent-foreground: oklch(0.1 0.04 190);
    --destructive: oklch(0.6 0.2 10);
    --destructive-foreground: oklch(0.99 0.01 10);
    --border: oklch(0.9 0.015 260);
    --input: oklch(0.93 0.018 265);
    --ring: oklch(0.55 0.18 280 / 0.5);
    --sidebar: oklch(0.99 0.008 255);
    --sidebar-border: var(--border);
    --sidebar-foreground: var(--foreground);
    --sidebar-primary: var(--primary);
    --sidebar-primary-foreground: var(--primary-foreground);
    --sidebar-accent: var(--accent);
    --sidebar-accent-foreground: var(--accent-foreground);
    --sidebar-ring: var(--ring);
}

/* --- TEMA: Stone (Claro) --- */
.stone {
    --background: oklch(0.98 0.005 80);
    --foreground: oklch(0.25 0.01 80);
    --card: oklch(1 0 0);
    --card-foreground: var(--foreground);
    --popover: var(--card);
    --popover-foreground: var(--card-foreground);
    --primary: oklch(0.55 0.12 165); /* Teal */
    --primary-foreground: oklch(0.99 0.01 165);
    --secondary: oklch(0.95 0.01 80);
    --secondary-foreground: oklch(0.40 0.01 80);
    --muted: var(--secondary);
    --muted-foreground: oklch(0.55 0.01 80);
    --accent: oklch(0.92 0.015 80);
    --accent-foreground: oklch(0.28 0.01 80);
    --destructive: oklch(0.6 0.18 30); /* Marrón rojizo */
    --destructive-foreground: oklch(0.99 0.01 30);
    --border: oklch(0.90 0.01 80);
    --input: oklch(0.93 0.01 80);
    --ring: oklch(0.55 0.12 165 / 0.5);
    --sidebar: oklch(0.99 0.006 80);
    --sidebar-border: var(--border);
    --sidebar-foreground: var(--foreground);
    --sidebar-primary: var(--primary);
    --sidebar-primary-foreground: var(--primary-foreground);
    --sidebar-accent: var(--accent);
    --sidebar-accent-foreground: var(--accent-foreground);
    --sidebar-ring: var(--ring);
}

/* --- NUEVO TEMA: Zinc (Oscuro Elegante) --- */
.zinc {
    --background: oklch(0.15 0.01 220);  /* Gris Zinc muy oscuro */
    --foreground: oklch(0.95 0.005 220); /* Gris muy claro */
    --card: oklch(0.19 0.012 220);   /* Ligeramente más claro que el fondo */
    --card-foreground: var(--foreground);
    --popover: oklch(0.12 0.008 220);  /* Más oscuro */
    --popover-foreground: var(--foreground);
    --primary: oklch(0.75 0.06 220);   /* Azul grisáceo claro como primario */
    --primary-foreground: oklch(0.1 0.01 220); /* Texto oscuro */
    --secondary: oklch(0.25 0.015 220); /* Gris zinc medio */
    --secondary-foreground: oklch(0.88 0.006 220); /* Texto claro */
    --muted: var(--secondary);
    --muted-foreground: oklch(0.6 0.01 220);
    --accent: oklch(0.3 0.02 220);     /* Accent más oscuro */
    --accent-foreground: oklch(0.98 0.005 220);
    --destructive: oklch(0.6 0.15 20);     /* Rojo */
    --destructive-foreground: oklch(0.99 0.01 20);
    --border: oklch(0.25 0.015 220);  /* Borde sutil */
    --input: oklch(0.27 0.018 220);   /* Input un poco más claro */
    --ring: oklch(0.75 0.06 220 / 0.5); /* Ring azul grisáceo */
    /* Sidebar */
     --sidebar: oklch(0.17 0.011 220);
     --sidebar-foreground: var(--foreground);
     --sidebar-primary: var(--primary);
     --sidebar-primary-foreground: var(--primary-foreground);
     --sidebar-accent: var(--accent);
     --sidebar-accent-foreground: var(--accent-foreground);
     --sidebar-border: var(--border);
     --sidebar-ring: var(--ring);
}
/* --- FIN NUEVOS TEMAS --- */

/* 4. Aplica overrides mínimos en la capa base */
@layer base {
    body {
        background-color: var(--background);
        color: var(--foreground);
        /* Aplicar antialiasing para mejor legibilidad */
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
    }
    /* Asegurar que los elementos deshabilitados tengan cursor not-allowed */
    [disabled] {
        cursor: not-allowed !important;
    }

    /* Mejoras específicas para Tooltip Content para evitar solapamientos */
    [data-slot="tooltip-content"] {
        /* z-index: 60 !important; ya no es necesario con la nueva estructura */
    }

    /* Keyframes para animación fade-in */
    @keyframes fade-in {
      from { opacity: 0; transform: translateY(10px); }
      to { opacity: 1; transform: translateY(0); }
    }
    .animate-fade-in {
      animation: fade-in 0.6s ease-out forwards;
      animation-delay: var(--animation-delay, 0s); /* Permite retraso opcional */
    }

}
```

## File: `app\help\page.tsx`
```tsx
// File: app/help/page.tsx (MODIFICADO - Iteración 5.2)
"use client";

import React from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card'; // Añadido CardDescription
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowLeft, BookText, Mail, Phone } from 'lucide-react'; // Iconos

export default function HelpPage() {
  const router = useRouter();

  return (
    <div className="container mx-auto max-w-3xl p-4 md:p-8 space-y-8">
       {/* Botón volver mejorado */}
        <Button variant="ghost" onClick={() => router.push('/chat')} className="text-sm text-muted-foreground hover:text-foreground mb-4 -ml-4">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Volver a la Aplicación
        </Button>
      {/* Título principal */}
      <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">Ayuda y Soporte</h1>

      <Card className="border shadow-sm">
        <CardHeader>
          <CardTitle className='flex items-center gap-2'>
             <BookText className="h-5 w-5 text-primary"/> Documentación
          </CardTitle>
          <CardDescription>Recursos y guías para usar Atenex.</CardDescription>
        </CardHeader>
        <CardContent className="prose prose-sm sm:prose-base dark:prose-invert max-w-none">
          <p>
            Encuentra guías detalladas y respuestas a preguntas frecuentes sobre cómo utilizar {APP_NAME}.
            Visita nuestra <a href="https://docs.atenex.com" target="_blank" rel="noopener noreferrer" className="font-medium text-primary underline hover:text-primary/80">documentación oficial</a> para más información.
          </p>
        </CardContent>
      </Card>

       <Card className="border shadow-sm">
        <CardHeader>
          <CardTitle className='flex items-center gap-2'>
             <Mail className="h-5 w-5 text-primary"/> Contactar con Soporte
          </CardTitle>
           <CardDescription>Si necesitas asistencia adicional.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3 text-sm"> {/* Tamaño de texto base */}
           <div className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-muted-foreground flex-shrink-0" />
              <span className='font-medium'>Email:</span>
              <a href="mailto:soporte@atenex.com" className="text-primary underline hover:text-primary/80">soporte@atenex.com</a>
           </div>
           <div className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-muted-foreground flex-shrink-0" />
              <span className='font-medium'>Teléfono:</span>
               <a href="tel:+34123456789" className="text-primary underline hover:text-primary/80">+34 123 456 789</a>
           </div>
        </CardContent>
      </Card>
    </div>
  );
}

// Definición local de APP_NAME si no está importado globalmente
const APP_NAME = "Atenex";
```

## File: `app\layout.tsx`
```tsx
// File: app/layout.tsx
// Purpose: Root layout, sets up global providers (Theme, Auth) and Toaster.
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css"; // Import global styles
import AtenexLogo from '@/components/icons/atenex-logo';
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

// Define the application name constant
const APP_NAME = "Atenex";

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
            {/* Cabecera con Logo Atenex */}
           <header className="sticky top-0 z-50 w-full bg-black/90 backdrop-blur-sm">
             <div className="container mx-auto px-4 py-2 flex items-center">
               <AtenexLogo />
               <span className="ml-3 text-white font-bold text-xl">{APP_NAME}</span>
             </div>
           </header>
           {/* Render the application content */}

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
// File: app/page.tsx (REFACTORIZADO - Animación eliminada, logo integrado)
"use client";

import React from 'react';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { APP_NAME } from '@/lib/constants';
import { useAuth } from '@/lib/hooks/useAuth';
import { cn } from '@/lib/utils';
import { Loader2, Home as HomeIcon, Info, Mail, Search, Library, Zap, BookOpen } from 'lucide-react';
import Link from 'next/link';
// import SnakeAnimation from '@/components/animations/snakeanimation'; // Eliminado - Causaba problemas
import AtenexLogo from '@/components/icons/atenex-logo'; // Importar el logo SVG

// Mapeo de iconos (sin cambios)
const iconMap: { [key: string]: React.ComponentType<{ className?: string }> } = {
  Search: Search,
  Library: Library,
  Zap: Zap,
  BookOpen: BookOpen
};

export default function HomePage() {
  const router = useRouter();
  const { user, isLoading: isAuthLoading } = useAuth();
  const isAuthenticated = !isAuthLoading && !!user;

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-background via-background to-secondary/10 dark:to-muted/10">
      {/* Header (sin cambios) */}
      <header className="sticky top-0 z-50 w-full bg-background/90 backdrop-blur-lg border-b border-border/60">
        <div className="container flex items-center justify-between h-16 px-4 md:px-6">
          {/* Logo/Nombre App */}
          <Link
            href="/"
            className="flex items-center gap-2 text-xl font-semibold text-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm"
            aria-label={`${APP_NAME} - Inicio`}
          >
             {/* Usar BookOpen o un icono simple aquí si el logo principal va al sidebar */}
             <BookOpen className="w-6 h-6" />
            <span className='font-bold'>{APP_NAME}</span>
          </Link>
          {/* Navegación y Autenticación (sin cambios) */}
          <nav className="flex items-center space-x-1 sm:space-x-2">
            <LinkButton href="/" Icon={HomeIcon} isActive={true}>Inicio</LinkButton>
            <LinkButton href="/about" Icon={Info}>Nosotros</LinkButton>
            <LinkButton href="/contact" Icon={Mail}>Contacto</LinkButton>
            <div className="pl-2 sm:pl-4">
                {isAuthLoading ? ( <Button variant="ghost" disabled={true} size="sm" className="w-[95px]"> <Loader2 className="h-4 w-4 animate-spin" /> </Button>
                ) : isAuthenticated ? ( <Button variant="default" onClick={() => router.push('/chat')} size="sm" className="w-[95px] shadow-sm"> Ir a la App </Button>
                ) : ( <Button variant="outline" onClick={() => router.push('/login')} size="sm" className="w-[95px] transition-colors duration-150 hover:bg-accent hover:text-accent-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"> Acceder </Button> )}
            </div>
          </nav>
        </div>
      </header>

      {/* ELIMINADO: <SnakeAnimation /> */}

      {/* Contenido Principal (Hero + Features) */}
      {/* Añadido 'animate-fade-in' (definir en globals.css o usar librería) */}
      <main className="container mx-auto px-4 py-20 md:py-32 flex-1 flex flex-col items-center text-center animate-fade-in opacity-0 [--animation-delay:200ms]" style={{animationFillMode: 'forwards'}}>
         {/* Hero Section */}
         <section className="max-w-4xl">
             {/* Logo Atenex Integrado */}
             <div className="mb-8 flex justify-center">
                 <AtenexLogo width={80} height={80} className="text-primary" />
             </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tighter text-foreground mb-6 leading-tight">
                Desbloquea el Conocimiento Oculto en tu Empresa con <span className="text-primary">{APP_NAME}</span>
            </h1>
            <p className="text-lg sm:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
                Haz preguntas en lenguaje natural. Obtén respuestas precisas al instante, directamente desde los documentos y datos de tu organización.
            </p>
            {/* Botón Principal */}
            {isAuthLoading ? (
                 <Button size="lg" disabled={true} className="w-48 shadow-md">
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" /> Cargando...
                 </Button>
            ) : (
              <Button
                  size="lg"
                  onClick={() => isAuthenticated ? router.push('/chat') : router.push('/login')}
                  className={cn( "w-48 transition-transform duration-150 ease-in-out transform hover:scale-[1.03]", "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus:outline-none shadow-lg" )}
              >
                  {isAuthenticated ? 'Ir al Chat' : 'Comenzar Ahora'}
              </Button>
            )}
            {!isAuthenticated && !isAuthLoading && (
                 <p className="text-xs text-muted-foreground mt-4">
                     ¿Ya tienes cuenta? <Link href="/login" className="font-medium text-primary hover:underline underline-offset-4">Inicia Sesión</Link>
                 </p>
            )}
         </section>

         {/* Features Section (sin cambios estructurales) */}
         <section className="mt-24 md:mt-32 grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 max-w-6xl w-full">
             <FeatureCard title="Búsqueda Inteligente" description="Encuentra información exacta al instante usando lenguaje natural. Olvídate de adivinar palabras clave." icon="Search"/>
             <FeatureCard title="Conocimiento Centralizado" description="Rompe los silos de información. Accede al conocimiento colectivo de tu organización en un solo lugar seguro." icon="Library"/>
             <FeatureCard title="Productividad Mejorada" description="Empodera a tu equipo con acceso rápido a datos relevantes, permitiendo decisiones más rápidas y fundamentadas." icon="Zap"/>
         </section>
      </main>

      {/* Footer (sin cambios) */}
      <footer className="bg-muted/20 border-t border-border/60 py-6">
        {/* ... contenido footer ... */}
      </footer>
    </div>
  );
}

// Componente LinkButton (sin cambios)
function LinkButton({ href, children, Icon, isActive = false }: { href: string; children: React.ReactNode; Icon?: React.ComponentType<{ className?: string }>; isActive?: boolean }) {
  const router = useRouter();
  return ( <Button variant="ghost" onClick={() => router.push(href)} className={cn( "text-sm px-2 sm:px-3 py-1 h-8", "rounded-md", "hover:bg-accent hover:text-accent-foreground", "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring", isActive ? "text-primary font-semibold bg-primary/10" : "text-muted-foreground" )}> {Icon && <Icon className="h-4 w-4 mr-1.5 hidden sm:inline-block flex-shrink-0" />} {children} </Button> );
}

// Componente FeatureCard (sin cambios)
function FeatureCard({ title, description, icon }: { title: string; description: string; icon: string }) {
   const IconComponent = iconMap[icon] || BookOpen;
  return ( <div className={cn( "p-6 rounded-xl bg-card/60 backdrop-blur-sm", "border border-border/60", "hover:bg-card/90 hover:shadow-lg hover:-translate-y-1", "transition-all duration-200 ease-in-out text-left" )}> <IconComponent className="w-8 h-8 mb-4 text-primary" /> <h3 className="text-lg font-semibold text-foreground mb-2">{title}</h3> <p className="text-sm text-muted-foreground leading-relaxed">{description}</p> </div> );
}
```

## File: `app\privacy\page.tsx`
```tsx
// File: app/privacy/page.tsx (MODIFICADO - Iteración 5.2)
"use client";

import React from 'react';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'; // Añadido CardDescription
import { APP_NAME } from '@/lib/constants';
import { ArrowLeft } from 'lucide-react'; // Icono volver

export default function PrivacyPage() {
    const router = useRouter();

  return (
    <div className="min-h-screen bg-background text-foreground">
        <div className="container mx-auto max-w-4xl p-4 md:p-8 space-y-6">
            {/* Botón volver */}
            <Button variant="ghost" onClick={() => router.push('/')} className="text-sm text-muted-foreground hover:text-foreground mb-4 -ml-4">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Volver al Inicio
            </Button>
            {/* Card principal */}
            <Card className="shadow-sm border">
                <CardHeader>
                <CardTitle className="text-2xl md:text-3xl font-bold">Política de Privacidad</CardTitle>
                <CardDescription>Última Actualización: [Insertar Fecha]</CardDescription> {/* Fecha aquí */}
                </CardHeader>
                <CardContent className="prose prose-sm sm:prose-base dark:prose-invert max-w-none pt-0"> {/* prose para estilos de texto */}
                <p>
                    {APP_NAME} ("nosotros", "nos", o "nuestro") opera la aplicación {APP_NAME} (el "Servicio"). Esta página le informa de nuestras políticas relativas a la recopilación, uso y divulgación de datos personales cuando utiliza nuestro Servicio y las opciones que tiene asociadas a esos datos.
                </p>

                <h2>1. Recopilación y Uso de Información</h2>
                <p>
                    Recopilamos diferentes tipos de información para diversos fines para proporcionar y mejorar nuestro Servicio para usted.
                </p>
                <ul>
                    <li><strong>Datos Personales:</strong> Al utilizar nuestro Servicio, podemos pedirle que nos proporcione cierta información de identificación personal que puede utilizarse para contactarle o identificarle ("Datos Personales"). La información de identificación personal puede incluir, entre otros: Dirección de correo electrónico, Nombre, Información de la empresa (si aplica).</li>
                    <li><strong>Datos de Uso:</strong> También podemos recopilar información sobre cómo se accede y utiliza el Servicio ("Datos de Uso"). Estos Datos de Uso pueden incluir información como la dirección de Protocolo de Internet de su ordenador (por ejemplo, dirección IP), tipo de navegador, versión del navegador, las páginas de nuestro Servicio que visita, la hora y fecha de su visita, el tiempo dedicado a esas páginas, identificadores únicos de dispositivos y otros datos de diagnóstico.</li>
                    <li><strong>Contenido del Usuario:</strong> Procesamos los documentos y datos que usted carga ("Contenido del Usuario") únicamente con el fin de proporcionar las funciones del Servicio, como la indexación y la consulta. Tratamos su Contenido de Usuario como confidencial.</li>
                </ul>

                <h2>2. Uso de Datos</h2>
                <p>{APP_NAME} utiliza los datos recopilados para diversos fines:</p>
                 <ul>
                    <li>Para proporcionar y mantener el Servicio</li>
                    <li>Para notificarle cambios en nuestro Servicio</li>
                    <li>Para permitirle participar en funciones interactivas de nuestro Servicio cuando decida hacerlo</li>
                    <li>Para proporcionar atención y soporte al cliente</li>
                    <li>Para proporcionar análisis o información valiosa para que podamos mejorar el Servicio</li>
                    <li>Para supervisar el uso del Servicio</li>
                    <li>Para detectar, prevenir y abordar problemas técnicos</li>
                 </ul>

                <h2>3. Almacenamiento y Seguridad de los Datos</h2>
                <p>
                    El Contenido del Usuario se almacena de forma segura utilizando proveedores de almacenamiento en la nube estándar de la industria [Especificar si es posible, ej., AWS S3, Google Cloud Storage, MinIO]. Implementamos medidas de seguridad diseñadas para proteger su información contra el acceso, divulgación, alteración y destrucción no autorizados. Sin embargo, ninguna transmisión por Internet o almacenamiento electrónico es 100% seguro.
                </p>

                 <h2>4. Proveedores de Servicios</h2>
                 <p>
                    Podemos emplear a empresas e individuos terceros para facilitar nuestro Servicio ("Proveedores de Servicios"), para proporcionar el Servicio en nuestro nombre, para realizar servicios relacionados con el Servicio o para ayudarnos a analizar cómo se utiliza nuestro Servicio. Estos terceros tienen acceso a sus Datos Personales sólo para realizar estas tareas en nuestro nombre y están obligados a no divulgarlos ni utilizarlos para ningún otro fin. Ejemplos incluyen: [Listar categorías, ej., Alojamiento en la nube (AWS/GCP/Azure), Proveedores LLM (OpenAI/Google), Autenticación (Supabase)].
                 </p>

                 <h2>5. Sus Derechos sobre los Datos</h2>
                 <p>
                    Dependiendo de su jurisdicción, puede tener ciertos derechos con respecto a sus Datos Personales, como el derecho a acceder, corregir, eliminar o restringir su procesamiento. Póngase en contacto con nosotros para ejercer estos derechos.
                 </p>

                 <h2>6. Privacidad de los Niños</h2>
                 <p>
                    Nuestro Servicio no se dirige a menores de 18 años ("Niños"). No recopilamos conscientemente información de identificación personal de menores de 18 años.
                 </p>

                 <h2>7. Cambios a esta Política de Privacidad</h2>
                 <p>
                    Podemos actualizar nuestra Política de Privacidad de vez en cuando. Le notificaremos cualquier cambio publicando la nueva Política de Privacidad en esta página. Se le aconseja revisar esta Política de Privacidad periódicamente para cualquier cambio.
                 </p>

                 <h2>8. Contáctenos</h2>
                 <p>
                    Si tiene alguna pregunta sobre esta Política de Privacidad, por favor contáctenos: [Su Correo/Enlace de Contacto]
                 </p>
                </CardContent>
            </Card>
        </div>
    </div>
  );
}
```

## File: `app\terms\page.tsx`
```tsx
// File: app/terms/page.tsx (MODIFICADO - Iteración 5.2)
"use client";

import React from 'react';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'; // Añadido CardDescription
import { APP_NAME } from '@/lib/constants';
import { ArrowLeft } from 'lucide-react'; // Icono volver

export default function TermsPage() {
    const router = useRouter();

  return (
    <div className="min-h-screen bg-background text-foreground">
        <div className="container mx-auto max-w-4xl p-4 md:p-8 space-y-6">
             {/* Botón volver */}
             <Button variant="ghost" onClick={() => router.push('/')} className="text-sm text-muted-foreground hover:text-foreground mb-4 -ml-4">
               <ArrowLeft className="mr-2 h-4 w-4" />
               Volver al Inicio
             </Button>
            {/* Card principal */}
            <Card className="shadow-sm border">
                <CardHeader>
                <CardTitle className="text-2xl md:text-3xl font-bold">Términos de Servicio</CardTitle>
                 <CardDescription>Última Actualización: [Insertar Fecha]</CardDescription> {/* Fecha aquí */}
                </CardHeader>
                <CardContent className="prose prose-sm sm:prose-base dark:prose-invert max-w-none pt-0"> {/* prose para estilos de texto */}
                <h2>1. Aceptación de los Términos</h2>
                <p>
                    Al acceder o utilizar el servicio {APP_NAME} ("Servicio"), usted acepta estar sujeto a estos Términos de Servicio ("Términos"). Si no está de acuerdo con alguna parte de los términos, no podrá acceder al Servicio.
                </p>

                <h2>2. Descripción del Servicio</h2>
                <p>
                    {APP_NAME} proporciona una plataforma para consultar bases de conocimiento empresariales utilizando procesamiento de lenguaje natural. Las características incluyen carga, procesamiento, indexación de documentos y consulta en lenguaje natural.
                </p>

                <h2>3. Cuentas de Usuario</h2>
                <p>
                    Usted es responsable de salvaguardar sus credenciales de cuenta y de cualquier actividad o acción bajo su cuenta. Debe notificarnos inmediatamente al tener conocimiento de cualquier violación de seguridad o uso no autorizado de su cuenta.
                </p>

                <h2>4. Contenido del Usuario</h2>
                <p>
                    Usted conserva la propiedad de cualquier documento o dato que cargue en el Servicio ("Contenido del Usuario"). Al cargar Contenido del Usuario, usted otorga a {APP_NAME} una licencia mundial, no exclusiva y libre de regalías para usar, procesar, almacenar y mostrar su Contenido del Usuario únicamente con el propósito de proporcionarle el Servicio.
                </p>

                <h2>5. Uso Aceptable</h2>
                <p>
                    Usted acepta no hacer un mal uso del Servicio. Las actividades prohibidas incluyen, entre otras: [Listar actividades prohibidas, ej., cargar contenido ilegal, intentar violar la seguridad, sobrecargar el sistema].
                </p>

                <h2>6. Terminación</h2>
                <p>
                    Podemos terminar o suspender su acceso al Servicio inmediatamente, sin previo aviso ni responsabilidad, por cualquier motivo, incluido, entre otros, si incumple los Términos.
                </p>

                <h2>7. Exclusión de Garantías</h2>
                <p>
                    El Servicio se proporciona "TAL CUAL" y "SEGÚN DISPONIBILIDAD". {APP_NAME} no ofrece garantías, expresas o implícitas, y por la presente renuncia a todas las demás garantías, incluidas, entre otras, las garantías implícitas de comerciabilidad, idoneidad para un propósito particular o no infracción.
                </p>

                 <h2>8. Limitación de Responsabilidad</h2>
                 <p>
                    En ningún caso {APP_NAME}, ni sus directores, empleados, socios, agentes, proveedores o afiliados, serán responsables de ningún daño indirecto, incidental, especial, consecuente o punitivo, incluidos, entre otros, la pérdida de beneficios, datos, uso, fondo de comercio u otras pérdidas intangibles, resultantes de su acceso o uso o incapacidad para acceder o usar el Servicio.
                 </p>

                 <h2>9. Ley Aplicable</h2>
                 <p>
                    Estos Términos se regirán e interpretarán de acuerdo con las leyes de [Su Jurisdicción], sin tener en cuenta sus disposiciones sobre conflicto de leyes.
                 </p>

                 <h2>10. Cambios a los Términos</h2>
                 <p>
                    Nos reservamos el derecho, a nuestra entera discreción, de modificar o reemplazar estos Términos en cualquier momento. Le notificaremos cualquier cambio publicando los nuevos Términos en esta página.
                 </p>

                 <h2>11. Contáctenos</h2>
                 <p>
                    Si tiene alguna pregunta sobre estos Términos, contáctenos en [Su Correo/Enlace de Contacto].
                 </p>
                </CardContent>
            </Card>
        </div>
    </div>
  );
}
```

## File: `components\animations\snakeanimation.tsx`
```tsx
'use client';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrthographicCamera, Text } from '@react-three/drei';
import { useRef, useState, useEffect } from 'react';
import * as THREE from 'three';

const WORDS = [
  { id: 'Nosotros', pos: new THREE.Vector3(-6, 3, 0) },
  { id: 'Contacto', pos: new THREE.Vector3(5, -2, 0) },
];

// Curva para la forma de 'A'
const A_SHAPE_POINTS = new THREE.CatmullRomCurve3([
  new THREE.Vector3(-2, -2, 0),
  new THREE.Vector3(0, 2, 0),
  new THREE.Vector3(2, -2, 0),
  new THREE.Vector3(-1, 0, 0),
  new THREE.Vector3(1, 0, 0),
]).getPoints(100);

interface SnakeProps {
  eaten: Set<string>;
  onEat: (id: string) => void;
  final: boolean;
}

function Snake({ eaten, onEat, final }: SnakeProps) {
  const segments = useRef<THREE.Vector3[]>([]);
  const curve = useRef(new THREE.CatmullRomCurve3([]));
  const meshRef = useRef<THREE.Mesh>(null!);

  if (segments.current.length === 0) {
    segments.current = Array.from({ length: 60 }).map(
      (_, i) => new THREE.Vector3(-10 + i * 0.4, 0, 0)
    );
    curve.current.points = segments.current;
  }

  useFrame(({ clock }) => {
    if (final) {
      // Dibujar forma de 'A' estática
      segments.current = A_SHAPE_POINTS.map(p => p.clone());
      curve.current.points = segments.current;
    } else {
      const t = clock.getElapsedTime() * 0.4;
      const head = new THREE.Vector3(
        Math.cos(t) * 8,
        Math.sin(t * 1.2) * 4,
        0
      );
      // Detectar colisiones con palabras
      WORDS.forEach(w => {
        if (!eaten.has(w.id) && head.distanceTo(w.pos) < 0.5) {
          onEat(w.id);
        }
      });
      // Crecer según comidas
      const maxLen = 60 + eaten.size * 5;
      segments.current.unshift(head);
      if (segments.current.length > maxLen) segments.current.pop();
      curve.current.points = segments.current;
    }
    const geo = new THREE.TubeGeometry(
      curve.current,
      60,
      0.15 + 0.03 * Math.sin(clock.getElapsedTime() * 3),
      8,
      false
    );
    meshRef.current.geometry.dispose();
    meshRef.current.geometry = geo;
  });

  return (
    <mesh ref={meshRef} material={new THREE.MeshBasicMaterial({ color: '#fff' })}>
      <bufferGeometry />
    </mesh>
  );
}

export default function SnakeAnimation() {
  const [eaten, setEaten] = useState<Set<string>>(new Set());
  const final = eaten.size >= WORDS.length;

  // Callback para registrar palabra comida
  const handleEat = (id: string) => {
    setEaten(prev => new Set(prev).add(id));
  };

  useEffect(() => {
    if (final) {
      // opcional: reproducir sonido o animación al llegar al final
    }
  }, [final]);

  return (
    <Canvas
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        pointerEvents: 'none',
      }}
    >
      <OrthographicCamera
        makeDefault
        left={-10}
        right={10}
        top={7}
        bottom={-7}
        near={0.1}
        far={100}
        position={[0, 0, 20]}
      />
      <ambientLight intensity={0.5} />
      <Snake eaten={eaten} onEat={handleEat} final={final} />
      {WORDS.map((w) =>
        !eaten.has(w.id) ? (
          <Text key={w.id} position={[w.pos.x, w.pos.y, w.pos.z]} fontSize={1} color="#facc15">
            {w.id}
          </Text>
        ) : null
      )}
      {final && (
        <Text position={[0, -1, 0]} fontSize={2.5} color="#fff" anchorX="center" anchorY="middle">
          Atenex
        </Text>
      )}
    </Canvas>
  );
}
```

## File: `components\auth\login-form.tsx`
```tsx
// File: components/auth/login-form.tsx (MODIFICADO - Iteración 5.3, solo estilo)
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
import { cn } from '@/lib/utils'; // Importar cn
import Link from 'next/link'; // Para enlace "Olvidaste contraseña"

// Esquema Zod (sin cambios)
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
    } catch (err: any) {
      setError(err.message || 'Inicio de sesión fallido. Revisa tus credenciales e inténtalo de nuevo.');
    }
  };

  return (
    // Aumentar espaciado entre elementos del formulario
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
      {/* Alerta de Error */}
      {error && (
        <Alert variant="destructive" role="alert" aria-live="assertive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error de Inicio de Sesión</AlertTitle> {/* Título más genérico */}
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      {/* Campo Email */}
      <div className="space-y-1.5"> {/* Ajuste espaciado label/input */}
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
          className={cn(form.formState.errors.email && "border-destructive focus-visible:ring-destructive/50")} // Highlight error
        />
        {form.formState.errors.email && (
          <p className="text-xs text-destructive pt-1" role="alert">{form.formState.errors.email.message}</p> // Texto más pequeño
        )}
      </div>
      {/* Campo Contraseña */}
      <div className="space-y-1.5">
        <div className="flex items-center justify-between">
             <Label htmlFor="password">Contraseña</Label>
             {/* Enlace "¿Olvidaste tu contraseña?" */}
             {/* <Link href="#" className="text-xs text-muted-foreground hover:text-primary underline underline-offset-2">
                 ¿Olvidaste tu contraseña?
             </Link> */}
        </div>
        <Input
          id="password"
          type="password"
          autoComplete="current-password"
          required
          disabled={isLoading}
          aria-required="true"
          {...form.register('password')}
          aria-invalid={form.formState.errors.password ? 'true' : 'false'}
           className={cn(form.formState.errors.password && "border-destructive focus-visible:ring-destructive/50")} // Highlight error
        />
        {form.formState.errors.password && (
          <p className="text-xs text-destructive pt-1" role="alert">{form.formState.errors.password.message}</p>
        )}
      </div>
      {/* Botón de Envío */}
      <Button type="submit" className="w-full" disabled={isLoading || !form.formState.isDirty || !form.formState.isValid}>
        {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
        {isLoading ? 'Iniciando Sesión...' : 'Iniciar Sesión'}
      </Button>
    </form>
  );
}
```

## File: `components\chat\chat-history.tsx`
```tsx
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
```

## File: `components\chat\chat-input.tsx`
```tsx
// File: components/chat/chat-input.tsx (MODIFICADO - Iteración 3.4)
"use client";

import React, { useState, useRef, KeyboardEvent, useEffect } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { SendHorizonal, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  isLoading: boolean;
}

export function ChatInput({ onSendMessage, isLoading }: ChatInputProps) {
  const [inputValue, setInputValue] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(event.target.value);
  };

  // Auto-resize logic in useEffect to handle external value changes too (e.g., clearing)
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'; // Reset height first
      // Set height based on scroll height, but enforce max-height via CSS
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 160)}px`; // 160px = 10rem (max-h-40)
    }
  }, [inputValue]); // Re-run when input value changes

  const handleSubmit = (event?: React.FormEvent<HTMLFormElement>) => {
    event?.preventDefault();
    const trimmedValue = inputValue.trim();
    if (trimmedValue && !isLoading) {
      onSendMessage(trimmedValue);
      setInputValue(''); // Clear input after sending
    }
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter' && !event.shiftKey && !isLoading) {
      event.preventDefault(); // Prevent newline on Enter
      handleSubmit();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="relative flex items-end space-x-2">
      <Textarea
        ref={textareaRef}
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        placeholder="Pregúntale a Atenex..."
        className={cn(
            "flex-1 resize-none min-h-[40px] max-h-40", // min/max height
            "py-2 pr-12 pl-3", // Ajuste de padding (más a la derecha para botón)
            "rounded-lg border border-input", // Estilo de borde
            "text-sm shadow-sm placeholder:text-muted-foreground",
            "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:border-ring", // Estilo focus
            "disabled:cursor-not-allowed disabled:opacity-50" // Estilo disabled
        )}
        rows={1} // Empezar con una sola fila
        disabled={isLoading}
        aria-label="Entrada de chat"
      />
      {/* Botón posicionado absolutamente dentro del form */}
      <Button
        type="submit"
        size="icon"
        className={cn(
            "absolute right-2 bottom-2 h-8 w-8 flex-shrink-0 rounded-lg", // Posición y tamaño
            "transition-colors duration-150"
        )}
        disabled={isLoading || !inputValue.trim()}
        aria-label="Enviar mensaje"
      >
        {isLoading ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <SendHorizonal className="h-4 w-4" />
        )}
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
import { isGreeting, isMetaQuery, getMetaResponse } from '@/lib/utils';

interface ChatInterfaceProps {
  chatId?: string; // Receive chatId from the page
}

const initialMessages: Message[] = [
  { id: 'initial-1', role: 'assistant', content: 'Hello! How can I help you query your knowledge base today?' },
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
          const parsedMessages = JSON.parse(storedMessages);
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
    const text = query.trim();
    if (!text || isLoading) return;

    // Local greeting
    if (isGreeting(text)) {
      setMessages(prev => [...prev, { id: `assistant-${Date.now()}`, role: 'assistant', content: '¡Hola! ¿En qué puedo ayudarte hoy?' } as Message]);
      return;
    }

    // Local meta query
    if (isMetaQuery(text)) {
      setMessages(prev => [...prev, { id: `assistant-meta-${Date.now()}`, role: 'assistant', content: getMetaResponse() } as Message]);
      return;
    }

    const userMessage: Message = { id: `user-${Date.now()}`, role: 'user', content: text };
    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);
    setRetrievedDocs([]); // Clear previous docs

    try {
      const response = await postQuery({ query: text });
      const assistantMessage: Message = {
        id: `assistant-${Date.now()}`,
        role: 'assistant',
        content: response.answer,
        sources: response.retrieved_documents, // Attach sources to the message
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
                            {messages.map(message => (
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
```

## File: `components\chat\retrieved-documents-panel.tsx`
```tsx
// File: components/chat/retrieved-documents-panel.tsx (MODIFICADO - Iteración 3.3)
import React, { useState } from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { FileText, AlertCircle, Download, Loader2, Eye, Info } from 'lucide-react'; // Añadido Info
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
import { cn } from '@/lib/utils'; // Importar cn

interface RetrievedDocumentsPanelProps {
  documents: RetrievedDoc[];
  isLoading: boolean;
}

export function RetrievedDocumentsPanel({ documents, isLoading }: RetrievedDocumentsPanelProps) {
    const [selectedDoc, setSelectedDoc] = useState<RetrievedDoc | null>(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const handleViewDocument = (doc: RetrievedDoc) => {
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
        {/* Panel principal con estilo mejorado */}
        <div className="flex h-full flex-col border-l bg-background/50 dark:bg-muted/30">
            {/* Header del panel */}
            <CardHeader className="sticky top-0 z-10 border-b bg-background p-4 shadow-sm">
                <CardTitle className="text-base font-semibold flex items-center gap-2">
                    <FileText className="h-5 w-5 text-primary" /> Fuentes Recuperadas
                </CardTitle>
                <CardDescription className="text-xs mt-1">
                    Documentos relevantes usados para generar la respuesta.
                </CardDescription>
            </CardHeader>

            {/* Contenedor scrollable con padding */}
            <ScrollArea className="flex-1">
                {/* Espaciado y padding interno */}
                <div className="p-3 space-y-2">
                    {/* Estado de Carga con Skeleton */}
                    {isLoading && documents.length === 0 && (
                        <div className='space-y-2'>
                            <Skeleton className="h-20 w-full rounded-lg" />
                            <Skeleton className="h-20 w-full rounded-lg" />
                            <Skeleton className="h-20 w-full rounded-lg" />
                        </div>
                    )}
                    {/* Estado Vacío mejorado */}
                    {!isLoading && documents.length === 0 && (
                        <div className="flex flex-col items-center justify-center text-center text-muted-foreground py-10 px-4">
                            <Info className="h-8 w-8 mb-3 opacity-50" />
                            <p className="text-sm font-medium mb-1">Sin documentos relevantes</p>
                            <p className="text-xs">No se encontraron fuentes específicas para la última consulta.</p>
                        </div>
                    )}
                    {/* Lista de Documentos */}
                    {documents.map((doc, index) => (
                        <DialogTrigger asChild key={doc.id || `doc-${index}`}>
                            {/* Tarjeta de Documento */}
                            <Card
                                className={cn(
                                    "cursor-pointer transition-all duration-150 bg-card",
                                    "border border-border hover:border-primary/30 hover:shadow-md focus-visible:ring-1 focus-visible:ring-ring focus-visible:border-primary/30"
                                )}
                                onClick={() => handleViewDocument(doc)}
                                onKeyDown={(e) => e.key === 'Enter' && handleViewDocument(doc)}
                                tabIndex={0}
                                title={`Ver detalles de: ${doc.file_name || 'documento'}`}
                            >
                                <CardContent className="p-3 space-y-1.5 text-sm">
                                    {/* Header de la tarjeta: Título y Score */}
                                    <div className="flex justify-between items-start gap-2">
                                        <p className="font-medium text-foreground/90 truncate flex-1">
                                            {index + 1}. {doc.file_name || `Fragmento ${doc.id.substring(0, 8)}`}
                                        </p>
                                        {/* Badge de Score más refinado */}
                                        {doc.score != null && (
                                            <Badge variant="secondary" className="px-1.5 py-0 font-mono text-xs rounded-sm">
                                                {doc.score.toFixed(2)}
                                            </Badge>
                                        )}
                                    </div>
                                    {/* Preview del contenido */}
                                    <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                                        {doc.content_preview || 'Vista previa no disponible.'}
                                    </p>
                                    {/* Footer de la tarjeta: ID y icono */}
                                    <div className="text-[11px] text-muted-foreground/70 pt-1 flex justify-between items-center font-mono">
                                        <span>ID: {doc.document_id?.substring(0, 8) ?? doc.id.substring(0, 8)}...</span>
                                        <Eye className="h-3 w-3" />
                                    </div>
                                </CardContent>
                            </Card>
                        </DialogTrigger>
                    ))}
                </div>
            </ScrollArea>

            {/* Dialog de Detalles (mejorado) */}
            {selectedDoc && (
                 <DialogContent className="sm:max-w-xl"> {/* Un poco más ancho */}
                    <DialogHeader>
                        <DialogTitle className="truncate text-lg" title={selectedDoc.file_name || selectedDoc.document_id || 'Detalles del Documento'}>
                            <FileText className="inline-block h-5 w-5 mr-2 align-text-bottom text-primary" />
                            {selectedDoc.file_name || 'Detalles del Documento'}
                        </DialogTitle>
                        <DialogDescription>
                            Detalles del fragmento recuperado y su contexto.
                        </DialogDescription>
                    </DialogHeader>
                    {/* Contenido del Dialog con mejor estructura */}
                    <div className="grid gap-3 py-4 text-sm max-h-[60vh] overflow-y-auto px-1 -mx-1">
                        {/* Información Clave */}
                        <div className='grid grid-cols-3 gap-x-4 gap-y-1 text-xs border-b pb-3 mb-2'>
                            <div><span className="font-medium text-muted-foreground block">ID Documento</span><span className="font-mono text-[11px] block truncate">{selectedDoc.document_id || 'N/D'}</span></div>
                            <div><span className="font-medium text-muted-foreground block">ID Fragmento</span><span className="font-mono text-[11px] block truncate">{selectedDoc.id}</span></div>
                            <div><span className="font-medium text-muted-foreground block">Score</span><span>{selectedDoc.score?.toFixed(4) ?? 'N/D'}</span></div>
                        </div>
                        {/* Vista previa */}
                        <div>
                            <Label className="text-xs font-semibold text-muted-foreground">Vista Previa Contenido:</Label>
                            <ScrollArea className="mt-1 max-h-[200px] w-full rounded-md border bg-muted/30 p-3 text-xs">
                                <pre className="whitespace-pre-wrap break-words font-sans">{selectedDoc.content_preview || 'Vista previa no disponible.'}</pre>
                            </ScrollArea>
                        </div>
                        {/* Metadatos */}
                        {selectedDoc.metadata && Object.keys(selectedDoc.metadata).length > 0 && (
                             <div>
                                <Label className="text-xs font-semibold text-muted-foreground">Metadatos:</Label>
                                <ScrollArea className="mt-1 max-h-[100px] w-full rounded-md border bg-muted/30 p-3 text-[11px]">
                                    <pre className="whitespace-pre-wrap break-words font-mono">{JSON.stringify(selectedDoc.metadata, null, 2)}</pre>
                                </ScrollArea>
                            </div>
                        )}
                    </div>
                    <DialogFooter className="sm:justify-between">
                        <Button variant="outline" size="sm" onClick={() => handleDownloadDocument(selectedDoc)}>
                            <Download className="mr-2 h-4 w-4" />Descargar Original (N/D)
                        </Button>
                        <DialogClose asChild><Button variant="secondary" size="sm">Cerrar</Button></DialogClose>
                    </DialogFooter>
                </DialogContent>
            )}
        </div>
    </Dialog>
  );
}

// Helper Label component (si no existe o para simplificar)
const Label = ({ className, children, ...props }: React.LabelHTMLAttributes<HTMLLabelElement>) => (
    <label className={cn("block text-sm font-medium text-foreground", className)} {...props}>
        {children}
    </label>
);
```

## File: `components\icons\atenex-logo.tsx`
```tsx
import React from 'react';
import { cn } from '@/lib/utils';

interface AtenexLogoProps extends React.SVGProps<SVGSVGElement> {
  // Puedes agregar props adicionales según sea necesario
}

export default function AtenexLogo(props: AtenexLogoProps) {
  return (
    <svg
      width="64"
      height="64"
      viewBox="0 0 1024 1024"
      xmlns="http://www.w3.org/2000/svg"
      style={{ background: '#000000', borderRadius: '8px' }}
      {...props}
    >
      <g
        transform="translate(0.000000,1024.000000) scale(0.100000,-0.100000)"
        fill="#FFFFFF"
        stroke="none"
      >
        <path d="M0 5120 l0 -5120 5120 0 5120 0 0 5120 0 5120 -5120 0 -5120 0 0 -5120z m5638 3284 c31 -22 60 -82 132 -279 122 -333 876 -2402 1131 -3105 291 -802 374 -1020 466 -1230 186 -423 345 -594 602 -647 85 -17 121 -42 121 -83 0 -16 -11 -37 -26 -51 l-26 -24 -866 -3 c-609 -2 -882 0 -918 8 -63 13 -87 37 -82 81 3 32 4 33 75 45 137 23 224 78 270 172 26 53 28 65 27 182 0 109 -4 141 -33 250 -28 102 -310 887 -419 1164 -48 122 46 111 -910 111 -781 0 -829 -1 -864 -18 -42 -21 -35 -9 -98 -192 -27 -77 -105 -304 -174 -505 -194 -561 -237 -768 -186 -903 47 -124 143 -202 299 -244 116 -31 140 -66 82 -124 l-29 -29 -749 0 c-807 0 -775 -2 -803 51 -22 40 5 61 125 94 73 20 195 81 290 143 99 66 249 220 324 332 71 106 188 341 249 500 48 125 277 787 316 915 26 83 33 95 89 150 69 67 177 128 300 170 153 51 217 55 910 55 514 0 639 3 643 13 4 12 -123 378 -349 1002 -58 160 -137 380 -175 490 -100 285 -191 534 -202 556 -22 40 -37 19 -74 -98 -203 -646 -480 -1431 -568 -1607 -36 -71 -103 -145 -180 -197 -31 -21 -137 -81 -235 -132 -203 -106 -258 -141 -326 -209 -93 -93 -126 -224 -98 -391 l13 -72 -50 -130 c-27 -71 -76 -203 -107 -292 -32 -90 -61 -163 -65 -163 -4 0 -49 42 -100 93 -203 202 -302 423 -303 672 -1 280 109 522 321 705 87 76 178 132 425 267 117 64 241 135 277 158 82 55 186 159 230 231 39 65 373 909 501 1269 104 292 132 410 127 540 -2 72 -8 100 -28 140 -22 44 -31 52 -72 65 -27 8 -48 21 -48 28 0 24 21 53 53 72 30 19 53 20 387 20 307 0 359 -2 378 -16z m-1103 -569 c50 -13 116 -35 149 -49 47 -21 57 -29 51 -43 -4 -10 -41 -113 -82 -229 l-75 -212 -36 10 c-65 19 -200 13 -267 -11 -93 -33 -122 -63 -192 -196 -89 -170 -115 -187 -378 -246 -96 -21 -189 -45 -207 -52 -18 -8 -66 -42 -107 -76 -122 -102 -188 -127 -372 -138 l-96 -6 -27 -43 c-56 -88 -157 -153 -243 -157 -48 -2 -103 17 -103 35 0 5 22 6 49 2 86 -11 181 37 242 121 20 28 40 45 53 45 13 0 5 8 -24 23 -59 29 -94 91 -94 163 0 55 8 68 135 219 33 39 77 113 124 210 46 95 86 163 109 186 21 21 102 70 189 115 84 43 231 124 328 180 97 55 196 108 219 118 159 64 466 78 655 31z m65 -3330 c455 -100 559 -132 688 -209 187 -111 320 -249 399 -411 58 -122 77 -219 70 -360 -14 -264 -88 -429 -281 -620 -133 -132 -223 -188 -501 -309 -366 -161 -479 -258 -479 -416 -1 -155 93 -222 310 -222 112 1 229 27 419 94 203 72 324 98 485 105 173 7 268 -10 395 -72 78 -37 183 -111 173 -121 -2 -1 -44 11 -93 29 -87 30 -96 31 -250 31 -233 0 -264 -10 -643 -209 -278 -146 -547 -190 -772 -125 -166 48 -332 168 -405 294 -84 145 -85 344 -2 500 40 76 156 199 266 282 46 34 161 106 255 160 302 172 397 247 454 360 77 152 63 294 -39 391 -140 133 -479 227 -851 234 -54 2 -98 5 -98 8 0 10 207 629 214 640 4 6 12 8 19 6 7 -2 127 -29 267 -60z" />
        <path d="M3340 7268 c0 -12 -21 -64 -46 -116 -32 -67 -54 -98 -75 -110 -67 -39 -14 -39 133 0 63 16 84 27 108 55 28 32 95 152 88 158 -8 6 -154 35 -179 35 -23 0 -29 -4 -29 -22z" />
      </g>
    </svg>
  );
}
```

## File: `components\knowledge\document-status-list.tsx`
```tsx
// File: components/knowledge/document-status-list.tsx (REFACTORIZADO - Fix Superposición Tooltip/Dialog v3)
"use client";

import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import {
    AlertCircle, Loader2, RefreshCw, Trash2, Info,
    FileClock, FileCheck2, FileX2, FileQuestion, Download, AlertTriangle // Iconos
} from 'lucide-react';
import { DocumentStatusResponse, AuthHeaders, deleteIngestDocument, retryIngestDocument } from '@/lib/api';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import {
    AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
    AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle,
    AlertDialogTrigger
} from "@/components/ui/alert-dialog";
import { Skeleton } from '@/components/ui/skeleton';

// Mapeo de estado (sin cambios)
const statusMap: { [key: string]: { icon: React.ComponentType<{ className?: string }>, text: string, className: string, animate: boolean, description: string } } = {
    uploaded:   { icon: FileClock, text: 'En Cola', className: 'text-blue-600 bg-blue-100 border-blue-200 dark:text-blue-300 dark:bg-blue-900/30 dark:border-blue-700', animate: true, description: "Esperando para ser procesado." },
    processing: { icon: Loader2, text: 'Procesando', className: 'text-orange-600 bg-orange-100 border-orange-200 dark:text-orange-300 dark:bg-orange-900/30 dark:border-orange-700', animate: true, description: "Extrayendo texto y generando vectores..." },
    processed:  { icon: FileCheck2, text: 'Procesado', className: 'text-green-600 bg-green-100 border-green-200 dark:text-green-300 dark:bg-green-900/30 dark:border-green-700', animate: false, description: "Listo para ser consultado." },
    error:      { icon: FileX2, text: 'Error', className: 'text-red-600 bg-red-100 border-red-200 dark:text-red-300 dark:bg-red-900/30 dark:border-red-700', animate: false, description: "Hubo un problema durante el procesamiento." },
    default:    { icon: FileQuestion, text: 'Desconocido', className: 'text-gray-600 bg-gray-100 border-gray-200 dark:text-gray-400 dark:bg-gray-700/30 dark:border-gray-600', animate: false, description: "Estado no reconocido." }
};

type DocumentStatus = DocumentStatusResponse;

export interface DocumentStatusListProps {
  documents: DocumentStatus[];
  authHeaders: AuthHeaders;
  onRetrySuccess: (documentId: string) => void;
  fetchMore: () => void;
  hasMore: boolean;
  refreshDocument: (documentId: string) => void;
  onDeleteSuccess: (documentId: string) => void;
  isLoading: boolean;
}

export function DocumentStatusList({
    documents,
    authHeaders,
    onRetrySuccess,
    fetchMore,
    hasMore,
    refreshDocument,
    onDeleteSuccess,
    isLoading
}: DocumentStatusListProps) {
  // Estado para controlar qué diálogo de confirmación está abierto (usando el ID del documento)
  const [deletingDocId, setDeletingDocId] = React.useState<string | null>(null);
  const [isDeleting, setIsDeleting] = React.useState(false);
  const [isRetrying, setIsRetrying] = React.useState<string | null>(null);
  const [isRefreshing, setIsRefreshing] = React.useState<string | null>(null);

  // --- Handlers (sin cambios lógicos) ---
  const handleRetry = async (documentId: string, fileName?: string | null) => {
    if (!authHeaders || isRetrying) return;
    const displayId = fileName || documentId.substring(0, 8) + "...";
    setIsRetrying(documentId);
    const toastId = toast.loading(`Reintentando ingesta para "${displayId}"...`);
    try {
      await retryIngestDocument(documentId, authHeaders);
      toast.success("Reintento Iniciado", { id: toastId, description: `El documento "${displayId}" se está procesando de nuevo.` });
      onRetrySuccess(documentId);
    } catch (error: any) {
      const errorMsg = error instanceof Error ? error.message : 'Error desconocido';
      toast.error("Error al Reintentar", { id: toastId, description: `No se pudo reintentar la ingesta para "${displayId}": ${errorMsg}` });
    } finally {
      setIsRetrying(null);
    }
  };

  const handleRefresh = async (documentId: string, fileName?: string | null) => {
     if (isRefreshing) return;
    const displayId = fileName || documentId.substring(0, 8) + "...";
    setIsRefreshing(documentId);
    toast.info(`Actualizando estado de "${displayId}"...`, {id: `refresh-${documentId}`});
    try {
        await refreshDocument(documentId);
        toast.success("Estado Actualizado", { id: `refresh-${documentId}`, description: `Se actualizó el estado de "${displayId}".` });
    } catch (error) {
        toast.dismiss(`refresh-${documentId}`);
    } finally {
        setIsRefreshing(null);
    }
  };

    const handleDownload = (doc: DocumentStatus) => {
        toast.info("Descarga No Implementada", {
            description: `La funcionalidad para descargar "${doc.file_name || doc.document_id}" aún no está disponible.`
        });
        console.log("Download requested for:", doc.document_id);
    };

  // Abre el diálogo seteando el ID del documento a borrar
  const openDeleteConfirmation = (docId: string) => { setDeletingDocId(docId); };

  // Cierra el diálogo reseteando el ID
  const closeDeleteConfirmation = () => {
      // Solo cerrar si no está en proceso de borrado para evitar cierres accidentales
      if (!isDeleting) {
          setDeletingDocId(null);
      }
  };

  const handleDeleteConfirmed = async () => {
    if (!deletingDocId || !authHeaders || isDeleting) return;
    const docToDelete = documents.find(d => d.document_id === deletingDocId);
    const display = docToDelete?.file_name || deletingDocId.substring(0, 8) + '...';

    setIsDeleting(true);
    const toastId = toast.loading(`Eliminando "${display}"...`);
    try {
      await deleteIngestDocument(deletingDocId, authHeaders);
      onDeleteSuccess(deletingDocId);
      toast.success('Documento Eliminado', { id: toastId, description: `"${display}" ha sido eliminado.` });
      closeDeleteConfirmation(); // Cierra el diálogo al éxito
    } catch (e: any) {
      const errorMsg = e instanceof Error ? e.message : 'Error desconocido';
      toast.error('Error al Eliminar', { id: toastId, description: `No se pudo eliminar "${display}": ${errorMsg}` });
      // Mantenemos el dialogo abierto en caso de error
    } finally {
      setIsDeleting(false);
    }
  };

  // --- Renderizado ---
  if (!isLoading && documents.length === 0) {
    return ( <div className="flex flex-col items-center justify-center text-center text-muted-foreground py-10 px-4 border-2 border-dashed rounded-lg bg-muted/30 mt-4 min-h-[150px]"> <Info className="h-8 w-8 mb-3 opacity-50"/> <p className="text-sm font-medium mb-1">Sin Documentos</p> <p className="text-xs">Aún no se han subido documentos.</p> </div> );
  }

  return (
      <TooltipProvider>
        <div className="border rounded-lg overflow-hidden shadow-sm bg-card">
          <Table className='w-full text-sm'>
            <TableHeader>
              <TableRow className="border-b bg-muted/50 hover:bg-muted/50">
                <TableHead className="w-[40%] pl-3 pr-2 py-2">Nombre Archivo</TableHead>
                <TableHead className="w-[15%] px-2 py-2">Estado</TableHead>
                <TableHead className="w-[10%] text-center px-2 py-2 hidden sm:table-cell">Chunks</TableHead>
                <TableHead className="w-[15%] px-2 py-2 hidden md:table-cell">Actualización</TableHead>
                <TableHead className="w-[20%] text-right pr-3 pl-2 py-2">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {documents.map((doc) => {
                const statusInfo = statusMap[doc.status] || statusMap.default;
                const Icon = statusInfo.icon;
                const isCurrentlyRetrying = isRetrying === doc.document_id;
                const isCurrentlyRefreshing = isRefreshing === doc.document_id;
                // Permitir abrir dialog incluso si otra acción está en curso, pero los botones del dialog estarán deshabilitados
                const isActionDisabled = isCurrentlyRetrying || isCurrentlyRefreshing;

                const dateToShow = doc.last_updated;
                const displayDate = dateToShow ? new Date(dateToShow).toLocaleString('es-ES', { dateStyle: 'short', timeStyle: 'short'}) : 'N/D';
                const displayFileName = doc.file_name || `ID: ${doc.document_id.substring(0, 12)}...`;
                const displayChunks = doc.milvus_chunk_count ?? doc.chunk_count ?? '-';

                return (
                      <TableRow key={doc.document_id} className="group hover:bg-accent/30 data-[state=selected]:bg-accent">
                          <TableCell className="font-medium text-foreground/90 max-w-[150px] sm:max-w-xs lg:max-w-sm xl:max-w-md truncate pl-3 pr-2 py-1.5" title={displayFileName}>{displayFileName}</TableCell>
                          <TableCell className="px-2 py-1.5">
                              <Tooltip delayDuration={100}>
                                  <TooltipTrigger asChild>
                                      <Badge variant='outline' className={cn("border text-[11px] font-medium whitespace-nowrap py-0.5 px-1.5 cursor-default", statusInfo.className)}>
                                          <Icon className={cn("h-3 w-3 mr-1", statusInfo.animate && "animate-spin")} />
                                          {statusInfo.text}
                                      </Badge>
                                  </TooltipTrigger>
                                  <TooltipContent side="top" sideOffset={5} className="max-w-xs break-words p-2 text-xs shadow-lg">
                                      <p>{statusInfo.description}</p>
                                      {doc.status === 'error' && doc.error_message && <p className='mt-1 pt-1 border-t text-destructive'>Error: {doc.error_message}</p>}
                                  </TooltipContent>
                              </Tooltip>
                          </TableCell>
                          <TableCell className="text-center text-muted-foreground text-xs px-2 py-1.5 hidden sm:table-cell">{displayChunks}</TableCell>
                          <TableCell className="text-muted-foreground text-xs px-2 py-1.5 hidden md:table-cell">{displayDate}</TableCell>
                          <TableCell className="text-right space-x-1 pr-3 pl-2 py-1">
                              {/* --- ACCIONES INDIVIDUALES CON SU TOOLTIP --- */}
                              <Tooltip delayDuration={100}>
                                  <TooltipTrigger asChild>
                                      <Button variant="ghost" size="icon" className="h-7 w-7 text-muted-foreground hover:bg-accent" onClick={() => handleDownload(doc)} aria-label="Descargar documento original" disabled={isActionDisabled || !doc.minio_exists}> <Download className="h-4 w-4" /> </Button>
                                  </TooltipTrigger>
                                  <TooltipContent side="top" sideOffset={6}><p>Descargar (N/D)</p></TooltipContent>
                              </Tooltip>
                              {doc.status === 'error' && (
                                  <Tooltip delayDuration={100}>
                                      <TooltipTrigger asChild>
                                          <Button variant="ghost" size="icon" className="h-7 w-7 text-blue-600 hover:bg-blue-100 dark:hover:bg-blue-900/30" onClick={() => handleRetry(doc.document_id, doc.file_name)} aria-label="Reintentar ingesta" disabled={isActionDisabled}> {isCurrentlyRetrying ? <Loader2 className="h-4 w-4 animate-spin"/> : <RefreshCw className="h-4 w-4" />} </Button>
                                      </TooltipTrigger>
                                      <TooltipContent side="top" sideOffset={6}><p>Reintentar</p></TooltipContent>
                                  </Tooltip>
                              )}
                              <Tooltip delayDuration={100}>
                                  <TooltipTrigger asChild>
                                      <Button variant="ghost" size="icon" className="h-7 w-7 text-muted-foreground hover:bg-accent" onClick={() => handleRefresh(doc.document_id, doc.file_name)} aria-label="Actualizar estado" disabled={isActionDisabled}> {isCurrentlyRefreshing ? <Loader2 className="h-4 w-4 animate-spin"/> : <RefreshCw className="h-4 w-4" />} </Button>
                                  </TooltipTrigger>
                                  <TooltipContent side="top" sideOffset={6}><p>Actualizar Estado</p></TooltipContent>
                              </Tooltip>

                              {/* AlertDialog + Tooltip para Eliminar */}
                              <AlertDialog open={deletingDocId === doc.document_id} onOpenChange={(open) => !open && closeDeleteConfirmation()}>
                                  <Tooltip delayDuration={100}>
                                      <TooltipTrigger asChild>
                                          <AlertDialogTrigger asChild>
                                              <Button variant="ghost" size="icon" className="h-7 w-7 text-destructive/80 hover:text-destructive hover:bg-destructive/10" aria-label="Eliminar documento" disabled={isActionDisabled}>
                                                  <Trash2 className="h-4 w-4" />
                                              </Button>
                                          </AlertDialogTrigger>
                                      </TooltipTrigger>
                                      <TooltipContent side="top" sideOffset={6}><p>Eliminar</p></TooltipContent>
                                  </Tooltip>
                                  {/* Contenido del diálogo específico para esta fila */}
                                  <AlertDialogContent>
                                      <AlertDialogHeader>
                                          <AlertDialogTitle className="flex items-center gap-2">
                                              <AlertTriangle className="h-5 w-5 text-destructive"/> ¿Confirmar Eliminación?
                                          </AlertDialogTitle>
                                          <AlertDialogDescription>
                                              Esta acción no se puede deshacer. Se eliminará permanentemente el documento y todos sus datos asociados:
                                              <br />
                                              <span className="font-semibold text-foreground mt-2 block break-all">"{doc.file_name || doc.document_id}"</span>
                                          </AlertDialogDescription>
                                      </AlertDialogHeader>
                                      <AlertDialogFooter>
                                          <AlertDialogCancel onClick={closeDeleteConfirmation} disabled={isDeleting}>Cancelar</AlertDialogCancel>
                                          <AlertDialogAction
                                              onClick={handleDeleteConfirmed}
                                              disabled={isDeleting}
                                              className={cn(buttonVariants({ variant: "destructive" }), "min-w-[150px]")}
                                          >
                                              {isDeleting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Trash2 className="mr-2 h-4 w-4" />}
                                              Eliminar Permanentemente
                                          </AlertDialogAction>
                                      </AlertDialogFooter>
                                  </AlertDialogContent>
                              </AlertDialog>
                          </TableCell>
                      </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>

        {/* Botón Cargar Más */}
        {hasMore && ( <div className="pt-6 text-center"> <Button variant="outline" size="sm" onClick={fetchMore} disabled={isLoading || isDeleting}> {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null} Cargar más documentos </Button> </div> )}

      </TooltipProvider>
  );
}
```

## File: `components\knowledge\file-uploader.tsx`
```tsx
// File: components/knowledge/file-uploader.tsx (MODIFICADO - Iteración 4.1 -> Refinado Feedback Visual)
"use client";

import React, { useState, useCallback, useEffect } from 'react';
import { useDropzone, FileRejection } from 'react-dropzone';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { UploadCloud, File as FileIcon, X, Loader2, CheckCircle2, AlertTriangle, FileUp } from 'lucide-react'; // FileUp para icono inicial
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge'; // Para mostrar tipo archivo

// Tipos de archivo aceptados (tomados del README Ingest)
const acceptedFileTypes = {
  'application/pdf': ['.pdf'],
  'application/msword': ['.doc'],
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
  'text/plain': ['.txt'],
  'text/markdown': ['.md', '.markdown'], // Añadido .markdown
  'text/html': ['.html', '.htm'],
  // Faltaban en la definición anterior pero mencionados en el video/README
  // 'application/vnd.oasis.opendocument.text': ['.odt'], // Si se soportan
  // 'application/epub+zip': ['.epub'], // Si se soportan
};
const allowedExtensions = Object.values(acceptedFileTypes).flat().map(ext => ext.substring(1).toUpperCase()).join(', ');
const MAX_FILE_SIZE_MB = 50; // Definir un límite (ej. 50MB) - AJUSTAR SEGÚN NECESIDAD
const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024;

interface FileUploaderProps {
  authHeaders: import('@/lib/api').AuthHeaders;
  onUploadFile: (file: File, authHeaders: import('@/lib/api').AuthHeaders) => Promise<boolean>;
  isUploading: boolean; // Estado de carga del hook padre
  uploadError: string | null; // Error del hook padre
  clearUploadStatus: () => void; // Función para limpiar error/éxito del padre
}

export function FileUploader({
    authHeaders,
    onUploadFile,
    isUploading,
    uploadError,
    clearUploadStatus
}: FileUploaderProps) {
  const [file, setFile] = useState<File | null>(null);
  const [dropzoneError, setDropzoneError] = useState<string | null>(null);
  const [localUploadSuccess, setLocalUploadSuccess] = useState<boolean | null>(null);

  // Efecto para limpiar errores/éxito visual si el archivo cambia o se deselecciona
  useEffect(() => {
    if (!file) {
        setDropzoneError(null);
        setLocalUploadSuccess(null);
        // No limpiar uploadError aquí, podría ser un error persistente del último intento
    } else {
        // Si se selecciona un NUEVO archivo, limpiar estados visuales y error del padre
        setDropzoneError(null);
        setLocalUploadSuccess(null);
        clearUploadStatus();
    }
  }, [file, clearUploadStatus]);

  // Manejador del Dropzone
  const onDrop = useCallback((acceptedFiles: File[], fileRejections: FileRejection[]) => {
    // Siempre limpiar estados al soltar nuevos archivos
    setDropzoneError(null);
    setLocalUploadSuccess(null);
    clearUploadStatus();
    setFile(null);

    if (fileRejections.length > 0) {
        const rejection = fileRejections[0];
        let msg = rejection.errors.map(e => e.message).join(', ');
        if (rejection.errors.some(e => e.code === 'file-invalid-type')) {
            msg = `Tipo de archivo no válido. Permitidos: ${allowedExtensions}.`;
        } else if (rejection.errors.some(e => e.code === 'file-too-large')) {
            msg = `El archivo supera el límite de ${MAX_FILE_SIZE_MB} MB.`;
        }
        setDropzoneError(msg);
        toast.error("Archivo Rechazado", { description: msg });
        return;
    }

    if (acceptedFiles.length > 0) {
      setFile(acceptedFiles[0]);
    }
  }, [clearUploadStatus]);

  const { getRootProps, getInputProps, isDragActive, isFocused } = useDropzone({
    onDrop,
    accept: acceptedFileTypes,
    maxSize: MAX_FILE_SIZE_BYTES,
    multiple: false,
    disabled: isUploading, // Deshabilitar dropzone mientras se sube
  });

  // Manejador del click del botón de subida
  const handleUploadClick = async () => {
    if (!file || !authHeaders || isUploading) return;
    setLocalUploadSuccess(null); // Resetear estado visual

    const success = await onUploadFile(file, authHeaders); // Llama a la función del hook padre
    setLocalUploadSuccess(success);
    if (success) {
        // Limpiar selección solo si la subida fue exitosa (estado 202)
        // Si falla (ej. 409 duplicado), mantener el archivo seleccionado para info
        setFile(null);
    }
    // El hook padre se encarga de los toasts
  };

  // Quitar el archivo seleccionado
  const removeFile = () => {
    setFile(null);
  }

  // Determinar el error a mostrar (prioridad al error de subida si existe)
  const displayError = uploadError || dropzoneError;
  // Determinar si el estado visual es de éxito (solo si la subida terminó y fue exitosa)
  const displaySuccess = !isUploading && localUploadSuccess === true;
  // Determinar si el estado visual es de fallo (solo si la subida terminó y falló, y no hay error de dropzone)
  const displayFailure = !isUploading && localUploadSuccess === false && !dropzoneError;

  return (
    <div className="space-y-4">
      {/* Área del Dropzone */}
      <div
        {...getRootProps()}
        className={cn(
            `relative flex flex-col items-center justify-center p-8 border-2 border-dashed rounded-lg text-center transition-all duration-200 ease-in-out min-h-[180px] outline-none`, // Aumentar padding y altura mínima
            // Estilos interactivos (no mientras sube)
            !isUploading && 'cursor-pointer hover:border-primary/50 hover:bg-accent/50 dark:hover:bg-accent/10',
            !isUploading && (isDragActive || isFocused) && 'border-primary bg-primary/10 border-solid ring-2 ring-primary/30',
            // Estilos de estado (deshabilitado, error, éxito, fallo)
            isUploading && 'cursor-not-allowed bg-muted/30 border-muted/50 text-muted-foreground',
            displayError && 'border-destructive bg-destructive/5 border-solid text-destructive',
            displaySuccess && 'border-green-500 bg-green-500/10 border-solid text-green-700 dark:text-green-400',
            displayFailure && 'border-destructive bg-destructive/5 border-solid text-destructive' // Mismo estilo que error para fallo
        )}
      >
        <input {...getInputProps()} />

        {/* Icono Central Dinámico */}
        <div className="mb-3 transform transition-transform duration-200 ease-in-out motion-safe:hover:scale-105">
            {isUploading && <Loader2 className="h-10 w-10 animate-spin" />}
            {displaySuccess && <CheckCircle2 className="h-10 w-10" />}
            {(displayError || displayFailure) && <AlertTriangle className="h-10 w-10" />}
            {!isUploading && !displaySuccess && !displayError && !displayFailure && (
                 <FileUp className={cn("h-10 w-10", isDragActive ? "text-primary" : "text-muted-foreground/60")} />
            )}
        </div>

        {/* Texto del Dropzone Dinámico */}
        <div className="text-sm max-w-xs">
             {isUploading && <p className="font-medium">Subiendo archivo...</p>}
             {displaySuccess && <p className="font-medium">Archivo puesto en cola exitosamente.</p>}
             {displayError && <p className="font-medium">{displayError}</p>}
             {displayFailure && <p className="font-medium">Fallo la subida del archivo.</p>}

             {/* Texto por defecto / arrastre */}
            {!isUploading && !displaySuccess && !displayError && !displayFailure && (
                isDragActive ? (
                <p className="font-medium text-primary">Suelta el archivo aquí...</p>
                ) : (
                <p className={cn("text-foreground/90")}>
                    Arrastra y suelta un archivo, o{' '}
                    <span className="font-medium text-primary underline underline-offset-2">haz clic para seleccionar</span>
                </p>
                )
            )}
            {/* Siempre mostrar extensiones permitidas y límite (si no hay error/éxito/subida) */}
            {!isUploading && !displaySuccess && !displayError && !displayFailure && (
                <p className="mt-1.5 text-xs text-muted-foreground">
                    (Permitidos: {allowedExtensions}. Máx: {MAX_FILE_SIZE_MB}MB)
                </p>
            )}
        </div>
      </div>

      {/* Preview del Archivo Seleccionado (si existe y no está subiendo/completado) */}
      {file && !isUploading && localUploadSuccess === null && (
        <div className="p-3 border rounded-lg flex items-center justify-between space-x-3 bg-muted/40 shadow-sm">
            <div className="flex items-center space-x-3 overflow-hidden flex-1 min-w-0">
                 <FileIcon className="h-5 w-5 flex-shrink-0 text-primary" />
                 <div className='flex flex-col min-w-0'>
                    <span className="text-sm font-medium truncate" title={file.name}>{file.name}</span>
                    <span className="text-xs text-muted-foreground">
                        ({(file.size / 1024 / 1024).toFixed(2)} MB) -
                        <Badge variant="outline" className='ml-1.5 py-0 px-1.5 text-[10px]'>{file.type || 'desconocido'}</Badge>
                    </span>
                 </div>
            </div>
          {/* Botón para quitar archivo, deshabilitado si está subiendo */}
          <Button variant="ghost" size="icon" className="h-7 w-7 text-muted-foreground hover:text-destructive hover:bg-destructive/10 flex-shrink-0" onClick={removeFile} aria-label="Quitar archivo" disabled={isUploading}>
            <X className="h-4 w-4" />
          </Button>
        </div>
      )}

      {/* Botón de Subida (visible solo si hay archivo y no se completó la subida) */}
      {file && localUploadSuccess === null && (
          <Button
            onClick={handleUploadClick}
            disabled={isUploading} // Deshabilitar si está subiendo
            className="w-full"
          >
            {isUploading ? (
                <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Subiendo...
                </>
             ) : 'Subir y Procesar Archivo'}
          </Button>
       )}
    </div>
  );
}
```

## File: `components\layout\header.tsx`
```tsx
// File: components/layout/header.tsx (MODIFICADO)
"use client";

import React from 'react';
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
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
      } catch (error) {
          console.error("Header: Logout failed unexpectedly.", error);
      }
  };

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b bg-background/95 backdrop-blur-sm px-4 md:px-6 shrink-0">
       {/* Espacio Izquierdo (Podría tener Breadcrumbs o Título de página en el futuro) */}
       <div className="flex items-center gap-2">
         {/* Eliminamos el botón Home aquí, ya que está en el Sidebar */}
         {/* <Button variant="ghost" size="icon" onClick={() => router.push('/chat')} aria-label="Ir al Chat">
             <Home className="h-5 w-5" />
         </Button> */}
         {/* Placeholder para título de página si se necesita */}
         {/* <h1 className="text-lg font-semibold text-foreground">Chat</h1> */}
      </div>

      {/* Iconos y Menú de Usuario a la Derecha */}
      {/* Ajustado espaciado a space-x-1 y padding en botones icon */}
      <div className="flex items-center space-x-1">
        {/* Botón de Tema */}
        <ThemePaletteButton />

         {/* Botón de Ayuda */}
         <Button variant="ghost" size="icon" className="h-9 w-9" onClick={() => router.push('/help')} aria-label="Ayuda y Soporte">
             <HelpCircle className="h-5 w-5" />
         </Button>

        {/* Menú de Usuario */}
        {user ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-9 w-9 rounded-full focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
                <Avatar className="h-9 w-9 border">
                  {/* Fuente ligeramente más pequeña para iniciales */}
                  <AvatarFallback className="bg-secondary text-secondary-foreground font-medium text-xs">
                    {getInitials(user.name)}
                  </AvatarFallback>
                </Avatar>
                <span className="sr-only">Abrir menú de usuario</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-60" align="end" forceMount>
              <DropdownMenuLabel className="font-normal p-2"> {/* Añadido padding */}
                <div className="flex flex-col space-y-1.5"> {/* Aumentado space-y */}
                  <p className="text-sm font-medium leading-none truncate" title={user.name || 'Usuario'}>
                    {user.name || 'Usuario'}
                  </p>
                  <p className="text-xs leading-none text-muted-foreground truncate" title={user.email}>
                    {user.email}
                  </p>
                  {/* Info Empresa y Rol con iconos */}
                  {user.companyId && (
                    <div className="flex items-center gap-1.5 text-xs text-muted-foreground/80 pt-1" title={`ID Empresa: ${user.companyId}`}>
                       <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-3.5 h-3.5 flex-shrink-0">
                         <path fillRule="evenodd" d="M4 1.75A2.25 2.25 0 0 0 1.75 4v1.5a.75.75 0 0 0 1.5 0V4c0-.414.336-.75.75-.75h8.5c.414 0 .75.336.75.75v1.5a.75.75 0 0 0 1.5 0V4A2.25 2.25 0 0 0 12 1.75H4ZM1.75 8.5A.75.75 0 0 0 1 9.25v2.25A2.25 2.25 0 0 0 3.25 14h9.5A2.25 2.25 0 0 0 15 11.5V9.25a.75.75 0 0 0-1.5 0v2.25c0 .414-.336.75-.75.75h-9.5c-.414 0-.75-.336-.75-.75V9.25a.75.75 0 0 0-.75-.75Z" clipRule="evenodd" />
                       </svg>
                      <span className="truncate">Empresa: {user.companyId.substring(0, 8)}...</span>
                    </div>
                  )}
                   {user.roles && user.roles.length > 0 && (
                     <div className="flex items-center gap-1.5 text-xs text-muted-foreground/80" title={`Roles: ${user.roles.join(', ')}`}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-3.5 h-3.5 flex-shrink-0">
                         <path fillRule="evenodd" d="M8 1a.75.75 0 0 1 .75.75V3h3.75A1.75 1.75 0 0 1 14.25 4.75v3.51a.75.75 0 0 1-1.5 0V5.76L8 8.41l-4.75-2.65v6.01c0 .17.02.338.059.497l1.49-.497a.75.75 0 1 1 .502 1.414l-2.08 1.04A2.25 2.25 0 0 1 3.25 11H.75a.75.75 0 0 1 0-1.5h1.77a.75.75 0 0 0 .75-.75V4.75A1.75 1.75 0 0 1 5 3h3V1.75A.75.75 0 0 1 8 1Z" clipRule="evenodd" />
                       </svg>
                       <span className="truncate">Rol(es): {user.roles.join(', ')}</span>
                     </div>
                   )}
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => router.push('/settings')} className="cursor-pointer">
                <Settings className="mr-2 h-4 w-4" />
                <span>Configuración</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              {/* Estilo destructivo más claro */}
              <DropdownMenuItem onClick={handleLogout} className="cursor-pointer text-destructive focus:text-destructive focus:bg-destructive/10 dark:focus:bg-destructive/20">
                <LogOut className="mr-2 h-4 w-4" />
                <span>Cerrar sesión</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          // Placeholder si no hay usuario (aunque no debería pasar en este layout)
          <Skeleton className="h-9 w-9 rounded-full" />
        )}
      </div>
    </header>
  );
}
```

## File: `components\layout\sidebar.tsx`
```tsx
// File: components/layout/sidebar.tsx (REFACTORIZADO - Logo y Navegación v2)
"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation'; // Quitar useRouter si no se usa aquí
import { cn } from '@/lib/utils';
import { Button, buttonVariants } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { BotMessageSquare, Database, Settings, /* Quitamos PlusCircle */ LayoutDashboard } from 'lucide-react';
import { APP_NAME } from '@/lib/constants';
import { ChatHistory } from '@/components/chat/chat-history';
import { Separator } from '@/components/ui/separator';
import AtenexLogo from '@/components/icons/atenex-logo'; // Importar logo

interface SidebarProps {
  isCollapsed: boolean;
}

// Items de navegación actualizados
const navItems = [
  // { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard }, // Ejemplo
  { href: '/chat', label: 'Chat', icon: BotMessageSquare },
  { href: '/knowledge', label: 'Conocimiento', icon: Database }, // Texto más corto
  { href: '/settings', label: 'Configuración', icon: Settings },
];

export function Sidebar({ isCollapsed }: SidebarProps) {
  const pathname = usePathname();
  // const router = useRouter(); // Ya no se necesita aquí

  // Ya no se necesita handleNewChat

  return (
    <aside className={cn(
        "flex h-full flex-col border-r bg-card", // Fondo card para consistencia
        isCollapsed ? "w-[60px] items-center px-2 py-4" : "w-full p-4"
      )}
      >
      {/* Sección Superior: Logo/Nombre como Link */}
      <div className={cn( "flex items-center mb-6", isCollapsed ? "h-10 justify-center" : "h-12 justify-start" )}>
            <Link href="/chat" // Enlaza a la sección principal (Chat)
                className={cn( "flex items-center gap-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm", isCollapsed ? 'justify-center w-full' : '' )}
                aria-label={`${APP_NAME} - Inicio`}
            >
                 {/* Ajustar tamaño del logo SVG */}
                 <AtenexLogo className={cn("h-8 w-auto text-primary", isCollapsed ? "h-7" : "")} />
                 {!isCollapsed && (
                     <span className="text-xl font-bold text-foreground tracking-tight">{APP_NAME}</span>
                 )}
            </Link>
       </div>

        {/* SE ELIMINÓ el botón "Nuevo Chat" */}

        {/* Separador solo si no está colapsado y hay historial */}
        {/* {!isCollapsed && <Separator className="my-2" />} */}

        {/* Navegación Principal */}
        <nav className={cn(
            "flex flex-col gap-1 flex-grow", // flex-grow para empujar historial abajo
            isCollapsed ? "items-center mt-4" : "mt-2" // Margen superior ajustado
            )}
        >
          <TooltipProvider delayDuration={0}>
            {navItems.map((item) => {
               // Mejorar lógica isActive para /chat y sus subrutas [[...chatId]]
               const isChatActive = item.href === '/chat' && (pathname === '/chat' || pathname.startsWith('/chat/'));
               const isActive = isChatActive || (item.href !== '/chat' && pathname.startsWith(item.href));
               return (
                  <Tooltip key={item.href} disableHoverableContent={!isCollapsed}>
                    <TooltipTrigger asChild>
                      <Link
                          href={item.href}
                          className={cn(
                              buttonVariants({ variant: 'ghost', size: isCollapsed ? "icon" : "default" }),
                              "w-full transition-colors duration-150 ease-in-out relative group",
                              isCollapsed ? "h-10 w-10 rounded-lg" : "justify-start pl-3 py-2 text-sm h-10",
                              isActive
                                  ? 'font-semibold text-primary bg-primary/10 dark:bg-primary/20'
                                  : 'text-muted-foreground hover:text-foreground hover:bg-accent/50 dark:hover:bg-accent/30'
                          )}
                          aria-label={item.label}
                      >
                        {/* Indicador activo */}
                        {isActive && !isCollapsed && (
                          <span className="absolute left-0 top-1/2 -translate-y-1/2 h-5 w-1 bg-primary rounded-r-md transition-all duration-200"></span>
                        )}
                        <item.icon className={cn(
                            "h-5 w-5 transition-colors",
                            isCollapsed ? "" : "mr-3",
                            isActive ? "text-primary" : "text-muted-foreground group-hover:text-foreground"
                            )}
                         />
                        {!isCollapsed && <span className="truncate">{item.label}</span>}
                      </Link>
                    </TooltipTrigger>
                    {isCollapsed && (
                      <TooltipContent side="right" sideOffset={5}>
                        {item.label}
                      </TooltipContent>
                    )}
                  </Tooltip>
               )
              })}
          </TooltipProvider>
        </nav>

        {/* Historial de Chats (Solo si no está colapsado) */}
        {!isCollapsed && (
           <div className="mt-4 flex flex-col border-t pt-3 -mx-4 px-4 h-1/3"> {/* Altura limitada para historial */}
               <div className='flex-1 overflow-hidden min-h-0'> {/* Forzar overflow */}
                   <ChatHistory />
               </div>
           </div>
        )}
    </aside>
  );
}
```

## File: `components\theme-palette-button.tsx`
```tsx
// File: components/theme-palette-button.tsx (REFACTORIZADO - Temas B2B Final)
"use client";

import * as React from "react";
import { Palette, Check } from "lucide-react"; // Importar Check
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel, // Importar Label
  DropdownMenuSeparator, // Importar Separator
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

// Definición de temas B2B disponibles (Final)
const themes = [
    { value: 'system', label: 'Automático (Sistema)' },
    { value: 'light', label: 'Claro Profesional' },
    { value: 'dark', label: 'Oscuro Elegante' },
    { value: 'slate', label: 'Pizarra (Oscuro)' },
    { value: 'indigo', label: 'Índigo (Claro)' },
    { value: 'stone', label: 'Piedra (Claro)' },
    { value: 'zinc', label: 'Zinc (Oscuro)' },
];

export function ThemePaletteButton() {
  const { setTheme, theme: activeTheme, resolvedTheme } = useTheme();

  // El tema resuelto (light o dark) si activeTheme es 'system'
  const currentResolvedTheme = resolvedTheme;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
           <Button variant="ghost" size="icon" className="h-9 w-9" aria-label="Cambiar tema">
               <Palette className="h-5 w-5"/>
            </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-52"> {/* Ancho ajustado */}
           <DropdownMenuLabel className="px-2 py-1.5 text-xs font-semibold">Apariencia</DropdownMenuLabel>
           <DropdownMenuSeparator />
           {themes.map((theme) => {
               // Determinar si este item es el activo (considerando 'system')
               const isActive = activeTheme === theme.value || (activeTheme === 'system' && currentResolvedTheme === theme.value);
               return (
                 <DropdownMenuItem
                    key={theme.value}
                    onClick={() => setTheme(theme.value)}
                    className={cn(
                        "flex items-center justify-between cursor-pointer text-sm px-2 py-1.5 rounded-sm",
                        isActive
                          ? "font-semibold text-primary bg-accent dark:bg-accent/50"
                          : "hover:bg-accent/50 dark:hover:bg-accent/20"
                    )}
                 >
                    <span>{theme.label}</span>
                    {isActive && ( <Check className="h-4 w-4" /> )}
                 </DropdownMenuItem>
               );
           })}
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
// File: components/ui/resizable.tsx (MODIFICADO)
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
        // Más sutil: opacidad baja, aumenta en hover/focus
        "relative flex w-px items-center justify-center bg-border", // Mantiene la línea de 1px
        "opacity-40 transition-all duration-200 ease-in-out hover:opacity-100 hover:bg-primary/20", // Aumenta opacidad y muestra área sutil en hover
        "focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-1 focus-visible:outline-none focus-visible:opacity-100 focus-visible:bg-primary/10", // Resalta en focus
        "data-[panel-group-direction=vertical]:h-px data-[panel-group-direction=vertical]:w-full",
        // Estilos para el after (línea visual) - Se puede quitar si se prefiere sin línea extra
        // "after:absolute after:inset-y-0 after:left-1/2 after:w-1 after:-translate-x-1/2 data-[panel-group-direction=vertical]:after:left-0 data-[panel-group-direction=vertical]:after:h-1 data-[panel-group-direction=vertical]:after:w-full data-[panel-group-direction=vertical]:after:-translate-y-1/2 data-[panel-group-direction=vertical]:after:translate-x-0",
        // Estilos para el div del handle si withHandle es true
        "[&[data-panel-group-direction=vertical]>div]:rotate-90",
        className
      )}
      {...props}
    >
      {withHandle && (
        // Más sutil: sin fondo explícito, solo el icono sobre el área resaltada en hover/focus
        <div className="z-10 flex h-5 w-2.5 items-center justify-center rounded-sm">
          {/* Icono más pequeño y con color muted */}
          <GripVerticalIcon className="h-3 w-3 text-muted-foreground" />
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
// File: components/ui/tooltip.tsx (MODIFICADO - Iteración 3)
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
    // No necesitamos un Provider anidado aquí si ya se usa en ChatMessage
    // <TooltipProvider>
      <TooltipPrimitive.Root data-slot="tooltip" {...props} />
    // </TooltipProvider>
  )
}

function TooltipTrigger({
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Trigger>) {
  return <TooltipPrimitive.Trigger data-slot="tooltip-trigger" {...props} />
}

function TooltipContent({
  className,
  sideOffset = 4, // Aumentar ligeramente el offset
  children,
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Content>) {
  return (
    <TooltipPrimitive.Portal>
      <TooltipPrimitive.Content
        data-slot="tooltip-content"
        sideOffset={sideOffset}
        className={cn(
          // Cambiado a popover para consistencia con otros menús flotantes
          "bg-popover text-popover-foreground border shadow-md", // Añadido borde y sombra
          "animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95",
          "data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
          "z-50 w-fit origin-(--radix-tooltip-content-transform-origin) rounded-md px-3 py-2 text-xs", // Ajustado padding y tamaño de texto
          "text-balance", // Mejorar balance de texto si es largo
          className
        )}
        {...props}
      >
        {children}
        {/* La flecha puede quitarse para un look más limpio o estilizarse diferente */}
        {/* <TooltipPrimitive.Arrow className="fill-popover border-t border-l border-popover z-50 size-2.5 translate-y-[calc(-50%_-_2px)] rotate-45 rounded-[2px]" /> */}
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
// File: lib/api.ts (REVISADO Y ASEGURADO - Coincide con READMEs)
// Purpose: Centralized API request function and specific API call definitions.
import { getApiGatewayUrl } from './utils';
import type { Message } from '@/components/chat/chat-message';
import { AUTH_TOKEN_KEY } from './constants';

// --- Tipos de Error ---
interface ApiErrorDataDetail {
    msg: string;
    type: string;
    loc?: (string | number)[];
}
interface ApiErrorData {
    detail?: string | ApiErrorDataDetail[] | any;
    message?: string; // Campo alternativo común para mensajes de error
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

// --- Función Genérica de Request ---
/**
 * Realiza una solicitud a la API Gateway.
 * Maneja la URL base, token de autenticación, headers y errores comunes.
 * @param endpoint Ruta del endpoint (ej. '/api/v1/ingest/status')
 * @param options Opciones de Fetch API (method, body, etc.)
 * @returns Promise<T> La respuesta parseada como JSON o null si es 204.
 * @throws {ApiError} Si la respuesta no es OK (status >= 400) o hay otros errores.
 */
export async function request<T>(
    endpoint: string,
    options: RequestInit = {}
): Promise<T> {
    const cleanEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;

    // Validar formato del endpoint (debe empezar con /api/v1/)
    if (!cleanEndpoint.startsWith('/api/v1/')) {
        console.error(`Invalid API endpoint format: ${cleanEndpoint}. Must start with /api/v1/`);
        throw new ApiError(`Invalid API endpoint format: ${cleanEndpoint}.`, 400);
    }

    // Obtener URL del API Gateway
    let apiUrl: string;
    try {
        apiUrl = `${getApiGatewayUrl()}${cleanEndpoint}`;
    } catch (err) {
        console.error("API Request failed: Could not get API Gateway URL.", err);
        const message = err instanceof Error ? err.message : "API Gateway URL configuration error.";
        throw new ApiError(message, 500);
    }

    // Obtener token de autenticación si está disponible
    let token: string | null = null;
    if (typeof window !== 'undefined') {
        token = localStorage.getItem(AUTH_TOKEN_KEY);
    } else {
        // Advertir si se ejecuta en contexto de servidor (no debería para llamadas protegidas)
        console.warn(`API Request: localStorage not available for ${cleanEndpoint} (SSR/Server Context?). Cannot get auth token.`);
    }

    // Configurar Headers
    const headers = new Headers(options.headers || {});
    headers.set('Accept', 'application/json');
    // Header especial para evitar advertencia de Ngrok (si se usa)
    if (apiUrl.includes("ngrok-free.app")) {
        headers.set('ngrok-skip-browser-warning', 'true');
    }
    // Establecer Content-Type a JSON por defecto, excepto para FormData
    if (!(options.body instanceof FormData)) {
        if (!headers.has('Content-Type')) {
             headers.set('Content-Type', 'application/json');
        }
    } else {
        // Dejar que el navegador establezca Content-Type para FormData (incluye boundary)
        headers.delete('Content-Type');
    }
    // Añadir token de autorización si existe
    if (token) {
        headers.set('Authorization', `Bearer ${token}`);
    } else if (!cleanEndpoint.includes('/api/v1/users/login')) {
        // Advertir si se llama a endpoint protegido sin token (excepto login)
        console.warn(`API Request: Making request to protected endpoint ${cleanEndpoint} without Authorization header.`);
    }

    // Configuración final de la solicitud
    const config: RequestInit = {
        ...options,
        headers,
    };

    // Loggear la solicitud (útil para depuración)
    // console.log(`API Request: ${config.method || 'GET'} ${apiUrl}`);

    try {
        // Realizar la solicitud Fetch
        const response = await fetch(apiUrl, config);

        // --- Manejo de Respuestas ---

        // Si la respuesta NO es OK (status >= 400)
        if (!response.ok) {
            let errorData: ApiErrorData | null = null;
            let errorText = '';
            const contentType = response.headers.get('content-type');

            // Intentar parsear el cuerpo del error (JSON o Texto)
            try {
                if (contentType && contentType.includes('application/json')) {
                    errorData = await response.json();
                } else { errorText = await response.text(); }
            } catch (parseError) {
                 console.warn(`API Request: Could not parse error response body for ${response.status} ${response.statusText} from ${apiUrl}`, parseError);
                 try { errorText = await response.text(); } catch {} // Intenta leer como texto si falla JSON
            }

            // Construir mensaje de error significativo
            let errorMessage = `API Error (${response.status})`;
            if (errorData) {
                if (typeof errorData.detail === 'string') { // FastAPI a veces usa string
                    errorMessage = errorData.detail;
                } else if (Array.isArray(errorData.detail) && errorData.detail.length > 0 && typeof errorData.detail[0].msg === 'string') { // FastAPI validation errors
                    errorMessage = errorData.detail.map(d => `${d.loc ? d.loc.join('.')+': ' : ''}${d.msg}`).join('; ');
                } else if (typeof errorData.message === 'string') { // Otros formatos
                    errorMessage = errorData.message;
                }
            } else if (errorText) { // Si no hubo JSON o falló, usar texto
                errorMessage = errorText.substring(0, 200); // Limitar longitud
            } else { // Fallback
                errorMessage = response.statusText || `Request failed with status ${response.status}`;
            }

            console.error(`API Error Response: ${response.status} ${response.statusText} from ${apiUrl}`, { data: errorData, text: errorText });
            // Lanzar ApiError personalizado
            throw new ApiError(errorMessage, response.status, errorData || undefined);
        }

        // Manejo específico de respuestas 204 No Content
        if (response.status === 204 || response.headers.get('content-length') === '0') {
            return null as T; // Devuelve null explícito para concordar con Promise<void>
        }

        // Intentar parsear la respuesta JSON para respuestas OK con contenido
        try {
            const data: T = await response.json();
            return data;
        } catch (jsonError) {
             // Si falla el parseo JSON de una respuesta OK
             const responseText = await response.text().catch(() => "Could not read response text."); // Leer como texto para depurar
             console.error(`API Request: Invalid JSON response from ${apiUrl}. Status: ${response.status}. Response Text: ${responseText}`, jsonError);
             throw new ApiError(`Invalid JSON response received from server.`, response.status);
        }

    } catch (error) {
        // Re-lanzar ApiError si ya fue capturado
        if (error instanceof ApiError) { throw error; }
        // Manejar errores de red (TypeError: Failed to fetch)
        else if (error instanceof TypeError && error.message.toLowerCase().includes('failed to fetch')) {
             const networkErrorMsg = 'Network error or API Gateway unreachable. Check connection and API URL.';
             console.error(`API Request Network Error: ${networkErrorMsg} (URL: ${apiUrl})`, error);
             throw new ApiError(networkErrorMsg, 0); // Status 0 para errores de red
        } else {
             // Otros errores inesperados
             console.error(`API Request: Unexpected error during fetch to ${apiUrl}`, error);
             const message = error instanceof Error ? error.message : 'An unknown fetch error occurred.';
             throw new ApiError(`Unexpected fetch error: ${message}`, 500);
        }
    }
}

// --- Tipos Específicos de Servicio ---

// --- Ingest Service ---
export interface IngestResponse {
    document_id: string;
    task_id: string; // ID de la tarea Celery
    status: string; // Estado inicial ('uploaded' o 'processing' si reintenta)
    message: string; // Mensaje de confirmación
}

export interface AuthHeaders {
  'X-Company-ID': string;
  'X-User-ID': string;
}

// Interfaz para la respuesta de la lista de estados (GET /status)
export interface DocumentStatusResponse {
    document_id: string;
    status: 'uploaded' | 'processing' | 'processed' | 'error' | string; // Tipos conocidos + fallback string
    file_name?: string | null;
    file_type?: string | null;
    chunk_count?: number | null; // Desde DB
    error_message?: string | null; // Mensaje de error si status='error'
    created_at?: string; // Fecha creación registro
    last_updated: string; // Fecha última actualización registro
    // Campos adicionales que el backend añade al verificar en GET /status
    minio_exists?: boolean; // Si el archivo existe en MinIO (verificado por el backend)
    milvus_chunk_count?: number; // Conteo real de chunks en Milvus (verificado por el backend)
}

// Interfaz para la respuesta detallada (GET /status/{id}) - campos de verificación garantizados
export interface DetailedDocumentStatusResponse extends DocumentStatusResponse {
    minio_exists: boolean; // Garantizado
    milvus_chunk_count: number; // Garantizado
    message?: string; // Mensaje descriptivo adicional del backend
}


// --- Query Service ---
export interface RetrievedDocApi {
    id: string; // ID del chunk en Milvus
    document_id: string; // ID del documento padre
    file_name: string | null; // Nombre del archivo original
    content: string; // Contenido completo del chunk (puede ser largo)
    content_preview: string; // Versión corta/preview del contenido
    metadata: Record<string, any> | null; // Metadatos asociados al chunk
    score: number; // Puntuación de relevancia del retriever
}
// Usamos el mismo tipo para frontend por ahora
export type RetrievedDoc = RetrievedDocApi;

export interface ChatSummary {
    id: string; // ID del chat
    title: string | null; // Título del chat (puede ser null)
    created_at: string; // Fecha creación
    updated_at: string; // Fecha última actualización
    message_count: number; // Número de mensajes en el chat
}

export interface ChatMessageApi {
    id: string; // ID del mensaje
    chat_id: string; // ID del chat al que pertenece
    role: 'user' | 'assistant'; // Quién envió el mensaje
    content: string; // Contenido del mensaje
    // Fuentes usadas por el asistente (si aplica)
    sources: Array<{
        chunk_id: string;
        document_id: string;
        file_name: string | null;
        score: number;
        preview: string; // Vista previa del chunk fuente
    }> | null;
    created_at: string; // Fecha creación del mensaje
}

export interface QueryPayload {
    query: string; // La pregunta del usuario
    retriever_top_k?: number; // Opcional: cuántos documentos recuperar
    chat_id?: string | null; // Opcional: ID del chat existente o null para uno nuevo
}

export interface QueryApiResponse {
    answer: string; // La respuesta del LLM
    retrieved_documents: RetrievedDocApi[]; // Documentos/chunks usados
    query_log_id: string | null; // ID del registro en query_logs
    chat_id: string; // ID del chat (nuevo o existente)
}


// --- Auth Service (API Gateway) ---
// No necesitamos definir LoginPayload aquí, se pasa directamente en useAuth
export interface LoginResponse {
    access_token: string; // El token JWT
    token_type: string; // "bearer"
    // Información del usuario devuelta para conveniencia (puede variar)
    user_id: string;
    email: string;
    full_name: string | null;
    role: string; // O roles: string[]
    company_id: string | null; // Puede ser null si aún no está asociado
}


// --- Funciones API Específicas ---

// ** INGEST SERVICE **

/**
 * POST /api/v1/ingest/upload
 * Sube un archivo para ser procesado. Requiere X-Company-ID y X-User-ID (implícito en auth).
 */
export async function uploadDocument(file: File, auth: AuthHeaders): Promise<IngestResponse> {
  const formData = new FormData();
  formData.append('file', file);
  // Metadata JSON opcional - no implementado en UI actual
  // formData.append('metadata_json', JSON.stringify({ custom_key: 'value' }));
  return request<IngestResponse>('/api/v1/ingest/upload', {
    method: 'POST',
    headers: { ...auth } as Record<string, string>, // Pasar headers de autenticación/compañía
    body: formData,
  });
}

/**
 * GET /api/v1/ingest/status
 * Obtiene la lista paginada de estados de documentos para la compañía. Requiere X-Company-ID.
 */
export async function getDocumentStatusList(auth: AuthHeaders, limit: number = 50, offset: number = 0): Promise<DocumentStatusResponse[]> {
  const endpoint = `/api/v1/ingest/status?limit=${limit}&offset=${offset}`;
  const response = await request<DocumentStatusResponse[]>(endpoint, {
    method: 'GET',
    headers: { ...auth } as Record<string, string>,
  });
  return response || []; // Devolver array vacío si la respuesta es null/undefined
}

/**
 * GET /api/v1/ingest/status/{document_id}
 * Obtiene el estado detallado de un documento específico. Requiere X-Company-ID.
 */
export const getDocumentStatus = async (documentId: string, auth: AuthHeaders): Promise<DetailedDocumentStatusResponse> => {
    return request<DetailedDocumentStatusResponse>(`/api/v1/ingest/status/${documentId}`, {
        method: 'GET',
        headers: { ...auth } as Record<string, string>
    });
};

/**
 * POST /api/v1/ingest/retry/{document_id}
 * Reintenta la ingesta de un documento que falló. Requiere X-Company-ID y X-User-ID.
 */
export async function retryIngestDocument(documentId: string, auth: AuthHeaders): Promise<IngestResponse> {
  const endpoint = `/api/v1/ingest/retry/${documentId}`;
  // Este endpoint espera 202 Accepted con un cuerpo IngestResponse
  return request<IngestResponse>(endpoint, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json', // Aunque no haya body, especificar
        ...auth
    } as Record<string, string>,
  });
}

/**
 * DELETE /api/v1/ingest/{document_id}
 * Elimina un documento (registro DB, archivo MinIO, chunks Milvus). Requiere X-Company-ID.
 */
export async function deleteIngestDocument(documentId: string, auth: AuthHeaders): Promise<void> {
  // Espera 204 No Content, que request<T> manejará devolviendo null.
  // El tipo de retorno void es correcto para el consumidor.
  await request<null>(`/api/v1/ingest/${documentId}`, {
    method: 'DELETE',
    headers: { ...auth } as Record<string, string>,
  });
}


// ** QUERY SERVICE **

/**
 * GET /api/v1/query/chats
 * Obtiene la lista de chats del usuario/compañía. Requiere X-Company-ID y X-User-ID (implícitos en el token).
 */
export const getChats = async (limit: number = 100, offset: number = 0): Promise<ChatSummary[]> => {
     const endpoint = `/api/v1/query/chats?limit=${limit}&offset=${offset}`;
     const response = await request<ChatSummary[]>(endpoint); // No necesita pasar auth explícito, va en token
     return response || [];
};

/**
 * GET /api/v1/query/chats/{chat_id}/messages
 * Obtiene los mensajes de un chat específico. Requiere X-Company-ID y X-User-ID.
 */
export const getChatMessages = async (chatId: string, limit: number = 100, offset: number = 0): Promise<ChatMessageApi[]> => {
     const endpoint = `/api/v1/query/chats/${chatId}/messages?limit=${limit}&offset=${offset}`;
     const response = await request<ChatMessageApi[]>(endpoint);
     return response || [];
};

/**
 * POST /api/v1/query/ask
 * Envía una consulta para obtener una respuesta (RAG o saludo). Requiere X-Company-ID y X-User-ID.
 */
export const postQuery = async (payload: QueryPayload): Promise<QueryApiResponse> => {
     // Asegurar que chat_id sea null si no se proporciona, como espera el backend
     const body = { ...payload, chat_id: payload.chat_id || null };
     return request<QueryApiResponse>('/api/v1/query/ask', {
        method: 'POST',
        body: JSON.stringify(body),
        // Content-Type es añadido por defecto en request()
     });
};

/**
 * DELETE /api/v1/query/chats/{chat_id}
 * Elimina un chat y sus mensajes/logs asociados. Requiere X-Company-ID y X-User-ID.
 */
export const deleteChat = async (chatId: string): Promise<void> => {
    // Espera 204 No Content
    await request<null>(`/api/v1/query/chats/${chatId}`, { method: 'DELETE' });
};


// --- Helpers de Mapeo de Tipos (API -> Frontend) ---

export const mapApiSourcesToFrontend = (apiSources: ChatMessageApi['sources']): RetrievedDoc[] | undefined => {
    if (!apiSources || apiSources.length === 0) return undefined;
    return apiSources.map(source => ({
        // Mapeo cuidadoso según las definiciones de tipos
        id: source.chunk_id,
        document_id: source.document_id,
        file_name: source.file_name || null, // Asegurar null si no viene
        content: source.preview, // Usar preview como content principal por ahora
        content_preview: source.preview,
        metadata: null, // Metadata no viene en este nivel según ChatMessageApi
        score: source.score,
    }));
};

export const mapApiMessageToFrontend = (apiMessage: ChatMessageApi): Message => {
    const mappedSources = mapApiSourcesToFrontend(apiMessage.sources);
    return {
        id: apiMessage.id,
        role: apiMessage.role,
        content: apiMessage.content,
        sources: mappedSources, // Puede ser undefined
        isError: false, // Asumir no error al mapear desde API normal
        created_at: apiMessage.created_at,
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
// File: lib/hooks/useDocumentStatuses.ts (REVISADO Y CORREGIDO - Coincide con API y componentes)
import { useState, useEffect, useCallback, useRef } from 'react';
import {
    getDocumentStatusList,
    DocumentStatusResponse,
    DetailedDocumentStatusResponse,
    AuthHeaders,
    ApiError,
    getDocumentStatus
} from '@/lib/api';
import { useAuth } from '@/lib/hooks/useAuth';
import { toast } from 'sonner'; // Para mostrar errores al refrescar

const DEFAULT_LIMIT = 30; // Ajustar límite si es necesario

interface UseDocumentStatusesReturn {
  documents: DocumentStatusResponse[]; // Lista de documentos
  isLoading: boolean; // Estado general de carga (inicial o cargando más)
  error: string | null; // Mensaje de error si falla la carga
  fetchDocuments: (reset?: boolean) => Promise<void>; // Función para (re)cargar documentos
  fetchMore: () => void; // Función para cargar la siguiente página
  hasMore: boolean; // Indica si hay más documentos por cargar
  retryLocalUpdate: (documentId: string) => void; // Actualiza UI para reintento
  refreshDocument: (documentId: string) => Promise<void>; // Refresca un documento individual
  deleteLocalDocument: (documentId: string) => void; // Elimina un documento de la UI local
}

export function useDocumentStatuses(): UseDocumentStatusesReturn {
  const { user, isLoading: isAuthLoading } = useAuth(); // Obtener usuario y estado de auth
  const [documents, setDocuments] = useState<DocumentStatusResponse[]>([]); // Estado para la lista de documentos
  const [isLoading, setIsLoading] = useState<boolean>(true); // Estado de carga general
  const [error, setError] = useState<string | null>(null); // Estado de error
  const offsetRef = useRef<number>(0); // Referencia para el offset de paginación
  const [hasMore, setHasMore] = useState<boolean>(true); // Estado para saber si hay más páginas
  const isFetchingRef = useRef<boolean>(false); // Ref para evitar llamadas concurrentes

  // Función principal para cargar documentos
  const fetchDocuments = useCallback(async (reset: boolean = false) => {
    // Evitar ejecución si ya se está cargando o si no hay usuario/compañía
    if (isFetchingRef.current || isAuthLoading || !user?.userId || !user?.companyId) {
      if (!isAuthLoading && !user?.userId) {
        // Si la autenticación terminó y no hay usuario, limpiar estado
        setDocuments([]); setIsLoading(false); setError(null); setHasMore(false);
      }
      return;
    }

    isFetchingRef.current = true; // Marcar como cargando
    setIsLoading(true); // Activar estado de carga visual
    setError(null); // Limpiar errores previos

    // Preparar headers de autenticación
    const authHeaders: AuthHeaders = {
      'X-User-ID': user.userId,
      'X-Company-ID': user.companyId,
    };

    try {
      const currentOffset = reset ? 0 : offsetRef.current; // Determinar offset
      const data = await getDocumentStatusList(authHeaders, DEFAULT_LIMIT, currentOffset);

      // Actualizar estado de paginación
      setHasMore(data.length === DEFAULT_LIMIT);
      offsetRef.current = currentOffset + data.length; // Incrementar offset

      // Actualizar lista de documentos (reemplazar si reset=true, añadir si reset=false)
      setDocuments(prev => reset ? data : [...prev, ...data]);

    } catch (err: any) {
      const errorMessage = err instanceof ApiError ? err.message : (err.message || 'Error al cargar la lista de documentos.');
      setError(errorMessage);
      // Opcional: limpiar documentos en error, o mantener los actuales
      // if(reset) setDocuments([]);
      setHasMore(false); // Asumir no más páginas si hay error
    } finally {
      setIsLoading(false); // Desactivar estado de carga visual
      isFetchingRef.current = false; // Desmarcar como cargando
    }
  }, [user, isAuthLoading]); // Dependencias: usuario y estado de auth

  // Carga inicial de documentos cuando el usuario esté disponible
  useEffect(() => {
    if (user?.userId && user?.companyId && documents.length === 0) { // Cargar solo si hay usuario y la lista está vacía
        fetchDocuments(true); // reset = true
    } else if (!isAuthLoading && !user?.userId) {
        // Si auth terminó y no hay usuario, asegurar estado limpio
        setDocuments([]);
        setIsLoading(false);
        setError(null);
        setHasMore(false);
    }
    // No incluir fetchDocuments en dependencias para evitar bucles si cambia rápido
  }, [user, isAuthLoading]); // Solo depende del usuario y auth

  // Actualiza la UI localmente cuando se inicia un reintento
  const retryLocalUpdate = useCallback((documentId: string) => {
    setDocuments(prevDocs =>
      prevDocs.map(doc =>
        doc.document_id === documentId
          ? { ...doc, status: 'processing', error_message: null } // Cambiar estado a 'processing'
          : doc
      )
    );
  }, []);

  // Carga la siguiente página de documentos
  const fetchMore = useCallback(() => {
    if (!isLoading && hasMore && !isFetchingRef.current) {
      fetchDocuments(false); // reset = false para añadir
    }
  }, [fetchDocuments, isLoading, hasMore]);

  // Refresca el estado de un documento individual desde la API
  const refreshDocument = useCallback(async (documentId: string) => {
    if (!user?.userId || !user?.companyId) {
        console.error("Cannot refresh document: user or company ID missing.");
        toast.error("Error de autenticación", { description: "No se pudo verificar la sesión." });
        return;
    }
    const authHeaders: AuthHeaders = {
        'X-User-ID': user.userId,
        'X-Company-ID': user.companyId,
      };
    try {
      const updatedDoc = await getDocumentStatus(documentId, authHeaders); // Llama a la API
      // Actualiza el documento específico en la lista local
      setDocuments(prev => prev.map(doc => doc.document_id === documentId ? updatedDoc : doc));
      // Opcional: toast de éxito
      // toast.success("Estado Actualizado", { description: `Se actualizó el estado de ${updatedDoc.file_name || documentId}.` });
    } catch (error){
      console.error(`Failed to refresh status for document ${documentId}:`, error);
      toast.error("Error al refrescar estado", { description: error instanceof Error ? error.message : "Error desconocido" });
    }
  }, [user]); // Depende del usuario para los headers

  // Elimina un documento de la lista local (después de confirmación API exitosa)
  const deleteLocalDocument = useCallback((documentId: string) => {
    setDocuments(prev => prev.filter(doc => doc.document_id !== documentId));
    // Nota: No recalcula 'hasMore' aquí para simplificar. Podría ser necesario en casos complejos.
  }, []);

  // Devuelve el estado y las funciones del hook
  return { documents, isLoading, error, fetchDocuments, fetchMore, hasMore, retryLocalUpdate, refreshDocument, deleteLocalDocument };
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
// File: lib/utils.ts (MODIFICADO)
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

    console.log(`getApiGatewayUrl: NEXT_PUBLIC_API_GATEWAY_URL = ${apiUrl}`);

    if (!apiUrl) {
        const errorMessage = "CRITICAL: NEXT_PUBLIC_API_GATEWAY_URL environment variable is not set.";
        console.error(errorMessage);

        if (process.env.NODE_ENV === 'production') {
             console.error("API Gateway URL must be set in production environment variables.");
             throw new Error("API Gateway URL is not configured for production.");
        }

        const defaultDevUrl = "https://1942-2001-1388-53a1-a7c9-241c-4a44-2b12-938f.ngrok-free.app";
        console.warn(`⚠️ ${errorMessage} Using default development Ngrok URL: ${defaultDevUrl}. Make sure this matches your current ngrok tunnel!`);
        return defaultDevUrl;
    }

    if (!apiUrl.startsWith('http://') && !apiUrl.startsWith('https://')) {
        console.error(`Invalid API Gateway URL format: ${apiUrl}. Must start with http:// or https://`);
        throw new Error(`Invalid API Gateway URL format: ${apiUrl}`);
    }

    return apiUrl.endsWith('/') ? apiUrl.slice(0, -1) : apiUrl;
}

// --- NUEVO: Helpers para manejo local de queries ---

/**
 * Detecta saludos comunes en español o inglés.
 * @param text - El texto de entrada.
 * @returns `true` si es un saludo, `false` en caso contrario.
 */
export function isGreeting(text: string): boolean {
  const msg = text.trim().toLowerCase();
  // Regex mejorada para cubrir más variaciones y evitar falsos positivos
  return /^\s*(hola|hello|hi|hey|buen(os)?\s+(d[íi]as?|tardes?|noches?))\s*[!¡?.]*\s*$/i.test(msg);
}

/**
 * Detecta preguntas sobre las capacidades o información del asistente.
 * @param text - El texto de entrada.
 * @returns `true` si es una consulta meta, `false` en caso contrario.
 */
export function isMetaQuery(text: string): boolean {
  const msg = text.trim().toLowerCase();
  const patterns = [
    /\b(qu[ée] puedes hacer|cu[áa]les son tus func|capacidades|capabilities)\b/i, // Qué puedes hacer, capacidades
    /\b(qui[ée]n eres|what are you)\b/i, // Quién eres
    /\b(qu[ée] informaci[óo]n (tienes|posees)|what info)\b/i, // Qué información tienes
    /\b(ayuda|help|soporte|support)\b/i, // Ayuda/Soporte
  ];
  return patterns.some(pattern => pattern.test(msg));
}

/**
 * Genera una respuesta estándar para consultas meta.
 * @returns Una cadena con la respuesta predefinida.
 */
export function getMetaResponse(): string {
  // Respuesta más elaborada y útil
  return `Soy Atenex, tu asistente de inteligencia artificial diseñado para ayudarte a explorar y consultar la base de conocimiento de tu organización. Puedo:
- Buscar información específica dentro de los documentos cargados.
- Responder preguntas basadas en el contenido de esos documentos.
- Mostrarte las fuentes de donde extraje la información.

Simplemente hazme una pregunta sobre el contenido que esperas encontrar.`;
}
// --- FIN Helpers ---
```

## File: `next-env.d.ts`
```ts
/// <reference types="next" />
/// <reference types="next/image-types/global" />

// NOTE: This file should not be edited
// see https://nextjs.org/docs/app/api-reference/config/typescript for more information.

```
