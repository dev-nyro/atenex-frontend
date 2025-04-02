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
│   │   ├── login
│   │   │   └── page.tsx
│   │   └── register
│   │       └── page.tsx
│   ├── about
│   │   └── page.tsx
│   ├── contact
│   │   └── page.tsx
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components
│   ├── auth
│   │   ├── email-confirmation-handler.tsx
│   │   ├── login-form.tsx
│   │   └── register-form.tsx
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
│   │   └── useAuth.tsx
│   ├── supabaseClient.ts
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
  
    env: {
      NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
      NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    },
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
    "@supabase/supabase-js": "^2.49.4",
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
NEXT_PUBLIC_API_GATEWAY_URL=https://TU_URL_DE_NGROK_O_GATEWAY.io # <-- ¡REEMPLAZA ESTO!

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
"use client";

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ChatInput } from '@/components/chat/chat-input';
import { ChatMessage, Message } from '@/components/chat/chat-message';
import { RetrievedDocumentsPanel } from '@/components/chat/retrieved-documents-panel';
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import {
    postQuery,
    getChatMessages,
    RetrievedDoc, // Usar tipo frontend
    ApiError,
    mapApiMessageToFrontend,
    mapApiSourcesToFrontend
} from '@/lib/api';
import { toast } from "sonner";
import { PanelRightClose, PanelRightOpen, BrainCircuit, Loader2, AlertCircle } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { useAuth } from '@/lib/hooks/useAuth'; // Importar hook useAuth refactorizado

// Mensaje inicial de bienvenida
const welcomeMessage: Message = {
    id: 'initial-welcome',
    role: 'assistant',
    content: '¡Hola! ¿Cómo puedo ayudarte a consultar tu base de conocimientos hoy?',
    created_at: new Date().toISOString(), // Usar fecha actual
};

export default function ChatPage() {
  const params = useParams();
  const router = useRouter();
  // --- CORRECCIÓN: Usar session, user, isLoading, signOut del hook useAuth ---
  const { session, user, isLoading: isAuthLoading, signOut } = useAuth();
  // ---------------------------------------------------------------------
  const bypassAuth = process.env.NEXT_PUBLIC_BYPASS_AUTH === 'true';

  // Obtener chatId de los parámetros de la ruta
  const chatIdParam = params.chatId ? (Array.isArray(params.chatId) ? params.chatId[0] : params.chatId) : undefined;
  const [chatId, setChatId] = useState<string | undefined>(chatIdParam);

  // Estados del componente
  const [messages, setMessages] = useState<Message[]>([welcomeMessage]);
  const [retrievedDocs, setRetrievedDocs] = useState<RetrievedDoc[]>([]);
  const [isSending, setIsSending] = useState(false); // Enviando un nuevo mensaje
  const [isLoadingHistory, setIsLoadingHistory] = useState(false); // Cargando historial
  const [historyError, setHistoryError] = useState<string | null>(null);
  const [isPanelOpen, setIsPanelOpen] = useState(true); // Panel derecho de fuentes

  // Refs
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const fetchedChatIdRef = useRef<string | undefined>(undefined); // Para evitar fetches duplicados

  // Sincronizar chatId del estado con el parámetro de la ruta
  useEffect(() => {
    setChatId(chatIdParam);
  }, [chatIdParam]);

  // --- Efecto para Cargar Historial de Chat ---
  useEffect(() => {
    const isAuthenticated = !!session || bypassAuth; // Determinar si está autenticado

    // Si estamos esperando que la autenticación termine (y no estamos en bypass), mostrar carga
    if (!bypassAuth && isAuthLoading) {
        console.log("ChatPage: Waiting for auth state...");
        setIsLoadingHistory(true); // Reutilizar estado de carga de historial
        setMessages([welcomeMessage]); // Mostrar bienvenida mientras carga auth
        setHistoryError(null);
        fetchedChatIdRef.current = undefined; // Resetear ref
        return;
    }

    // Si está autenticado, hay un chatId, y es diferente al último que buscamos...
    if (isAuthenticated && chatId && fetchedChatIdRef.current !== chatId) {
      console.log(`ChatPage: Auth ready. Fetching history for chat ${chatId}...`);
      setIsLoadingHistory(true);
      setHistoryError(null);
      fetchedChatIdRef.current = chatId; // Marcar como buscado

      getChatMessages(chatId)
        .then(apiMessages => {
           // Ordenar mensajes por fecha (por si acaso la API no los devuelve ordenados)
           apiMessages.sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime());
           // Mapear mensajes de la API al formato del frontend
           const mappedMessages = apiMessages.map(mapApiMessageToFrontend);
           // Establecer mensajes (o bienvenida si el historial está vacío)
           setMessages(mappedMessages.length > 0 ? mappedMessages : [welcomeMessage]);
           console.log(`ChatPage: History loaded for ${chatId}, ${mappedMessages.length} messages.`);
        })
        .catch(error => {
          // Manejo de errores al cargar historial
          let message = "Error loading chat history.";
          console.error(`ChatPage: Error loading history for ${chatId}:`, error);
          if (error instanceof ApiError) {
              message = error.message || message;
              // Si no se encuentra el chat, redirigir a /chat (nuevo chat)
              if (error.status === 404) {
                  toast.error("Chat Not Found", { description: `The chat with ID ${chatId} could not be found.` });
                  router.replace('/chat');
                  return; // Detener ejecución
              }
              // Si hay error de autenticación (401) o autorización (403), desloguear
              if (error.status === 401 || error.status === 403) {
                  toast.error("Authentication Error", { description: "Your session may have expired. Please log in again." });
                  signOut(); // Usar signOut del contexto
              }
          } else if (error instanceof Error) {
              message = error.message;
          }
          setHistoryError(message);
          setMessages([welcomeMessage]); // Mostrar bienvenida en caso de error
          toast.error("Failed to Load Chat", { description: message });
        })
        .finally(() => {
          setIsLoadingHistory(false); // Terminar carga de historial
        });

    } else if (!chatId) {
      // Si no hay chatId (estamos en /chat), resetear a estado inicial
      console.log("ChatPage: No chat ID provided, showing welcome message.");
      setMessages([welcomeMessage]);
      setRetrievedDocs([]);
      setIsLoadingHistory(false);
      setHistoryError(null);
      fetchedChatIdRef.current = undefined; // Resetear ref
    } else if (!isAuthenticated && !isAuthLoading) {
         // Si no está autenticado (y auth ya cargó), mostrar mensaje de login
         console.log("ChatPage: Not authenticated, showing login prompt.");
         setIsLoadingHistory(false);
         setHistoryError("Please log in to view chat history.");
         setMessages([welcomeMessage]);
         fetchedChatIdRef.current = undefined; // Resetear ref
    } else {
        // Caso residual: ya se cargó este chat o no se cumplen condiciones. Asegurar que no quede cargando.
        if (isLoadingHistory) setIsLoadingHistory(false);
    }
  // --- CORRECCIÓN: Dependencias del useEffect ---
  }, [chatId, session, isAuthLoading, bypassAuth, router, signOut, isLoadingHistory]); // Incluir isLoadingHistory para evitar bucles si cambia rápido
  // -------------------------------------------

  // --- Efecto para Scroll al Final ---
  useEffect(() => {
    if (scrollAreaRef.current) {
        // Usar un pequeño timeout para asegurar que el DOM se actualice antes de hacer scroll
        const timer = setTimeout(() => {
             if (scrollAreaRef.current) {
                 scrollAreaRef.current.scrollTo({ top: scrollAreaRef.current.scrollHeight, behavior: 'smooth' });
             }
        }, 100); // 100ms suele ser suficiente
        return () => clearTimeout(timer); // Limpiar timeout al desmontar o si las dependencias cambian
    }
  }, [messages, isSending, isLoadingHistory]); // Depender de mensajes, envío y carga de historial

  // --- Función para Enviar Mensaje ---
  const handleSendMessage = useCallback(async (query: string) => {
    const isAuthenticated = !!session || bypassAuth;
    if (!query.trim() || isSending || !isAuthenticated) {
        if (!isAuthenticated) {
             toast.error("Authentication Error", { description: "Please log in to send messages." });
        } else if (isSending) {
             console.warn("ChatPage: Message sending already in progress.");
        } else {
             console.warn("ChatPage: Cannot send empty message.");
        }
        return;
    }

    // Crear mensaje del usuario y añadirlo al estado
    const userMessage: Message = {
        id: `client-user-${Date.now()}`, // ID temporal del cliente
        role: 'user',
        content: query,
        created_at: new Date().toISOString()
    };
    // Usar callback de setState para asegurar que usamos el estado más reciente
    setMessages(prev => [...prev, userMessage]);
    setIsSending(true);
    setRetrievedDocs([]); // Limpiar documentos anteriores
    const currentChatIdForApi = chatId || null; // Enviar null si es un chat nuevo

    console.log(`ChatPage: Sending query to API (Chat ID: ${currentChatIdForApi || 'New'})...`);

    try {
      // Llamar a la API para obtener la respuesta
      const response = await postQuery({ query, chat_id: currentChatIdForApi });
      const returnedChatId = response.chat_id; // La API debe devolver el ID del chat

      // Mapear fuentes/documentos recuperados
      const mappedSources = mapApiSourcesToFrontend(response.retrieved_documents);

      // Crear mensaje del asistente
      const assistantMessage: Message = {
        id: `client-assistant-${Date.now()}`, // ID temporal del cliente
        role: 'assistant',
        content: response.answer,
        sources: mappedSources, // Adjuntar fuentes mapeadas
        created_at: new Date().toISOString() // Usar fecha actual
      };

      // Añadir mensaje del asistente al estado
      setMessages(prev => [...prev, assistantMessage]);
      setRetrievedDocs(mappedSources || []); // Actualizar panel de documentos

      // Si era un chat nuevo y la API devolvió un ID, actualizar la URL y el estado
      if (!currentChatIdForApi && returnedChatId) {
        console.log(`ChatPage: New chat created with ID: ${returnedChatId}. Updating URL.`);
        setChatId(returnedChatId);
        fetchedChatIdRef.current = returnedChatId; // Actualizar ref para evitar recarga
        // Usar replace para no añadir al historial del navegador, scroll: false para evitar saltos
        router.replace(`/chat/${returnedChatId}`, { scroll: false });
      }

      // Si se recuperaron documentos y el panel estaba cerrado, abrirlo
      if (mappedSources && mappedSources.length > 0 && !isPanelOpen) {
          setIsPanelOpen(true);
      }
      console.log(`ChatPage: Query successful. Answer received.`);

    } catch (error) {
      // Manejo de errores al enviar query
      let errorMessage = "Sorry, I encountered an error trying to answer.";
      console.error("ChatPage: Query failed:", error);
      if (error instanceof ApiError) {
           errorMessage = error.message || `API Error (${error.status})`;
           // Si es error de autenticación/autorización, desloguear
           if (error.status === 401 || error.status === 403) {
               errorMessage = "Authentication error. Please log in again.";
               signOut(); // Usar signOut del contexto
           }
       } else if (error instanceof Error) {
           errorMessage = `Error: ${error.message}`;
       }

      // Crear y añadir mensaje de error al chat
      const errorMsgObj: Message = {
          id: `error-${Date.now()}`,
          role: 'assistant',
          content: errorMessage,
          isError: true,
          created_at: new Date().toISOString()
      };
      setMessages(prev => [...prev, errorMsgObj]);
      toast.error("Fallo en la consulta", { description: errorMessage });

    } finally {
      setIsSending(false); // Terminar estado de envío
    }
  // --- CORRECCIÓN: Dependencias del useCallback ---
  }, [isSending, chatId, router, session, bypassAuth, isPanelOpen, signOut]);
  // -------------------------------------------

  // Toggle para el panel derecho
  const handlePanelToggle = () => { setIsPanelOpen(!isPanelOpen); };

  // --- Componentes de Renderizado Internos ---
  const renderHistoryLoading = () => (
       <div className="flex flex-col items-center justify-center h-full p-8 text-center">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground mb-4" />
            <p className="text-muted-foreground">Loading chat history...</p>
            {isAuthLoading && <p className="text-xs text-muted-foreground/70 mt-1">(Waiting for authentication...)</p>}
        </div>
  );

  const renderHistoryError = () => (
      <div className="flex flex-col items-center justify-center h-full p-8 text-center">
          <AlertCircle className="h-8 w-8 text-destructive mb-4" />
          <p className="text-destructive font-medium mb-2">Error Loading History</p>
          <p className="text-sm text-muted-foreground mb-4">{historyError}</p>
          {/* Podrías añadir un botón de reintento si historyError no es por auth */}
          {/* <Button variant="outline" size="sm" onClick={retryFetchHistory}>Retry</Button> */}
      </div>
  );

  const renderMessages = () => {
      // Filtrar el mensaje de bienvenida inicial si ya hay otros mensajes cargados
      const messagesToRender = messages.filter(m => !(m.id === 'initial-welcome' && messages.length > 1));

      return messagesToRender.map((message) => (
          <ChatMessage key={message.id} message={message} />
      ));
  };
  // --- Fin Componentes de Renderizado ---

  // Determinar si mostrar el estado de carga principal
  const showLoading = (isLoadingHistory || (isAuthLoading && !bypassAuth && !chatId)); // Mostrar carga si historial carga, o si auth carga y no estamos en bypass y no hay chat ID aún

  return (
     <ResizablePanelGroup direction="horizontal" className="h-full max-h-[calc(100vh-theme(space.16))]"> {/* Ajustar altura */}
            <ResizablePanel defaultSize={isPanelOpen ? 70 : 100} minSize={50}>
                <div className="flex h-full flex-col relative">
                    {/* Botón para ocultar/mostrar panel derecho */}
                    <div className="absolute top-2 right-2 z-10">
                        <Button onClick={handlePanelToggle} variant="ghost" size="icon" aria-label={isPanelOpen ? 'Close Sources Panel' : 'Open Sources Panel'}>
                            {isPanelOpen ? <PanelRightClose className="h-5 w-5" /> : <PanelRightOpen className="h-5 w-5" />}
                        </Button>
                    </div>

                    {/* Área de Mensajes del Chat */}
                    <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
                         {showLoading ? (
                            renderHistoryLoading() // Mostrar spinner de carga
                         ) : historyError ? (
                             renderHistoryError() // Mostrar mensaje de error
                         ) : (
                            <div className="space-y-4 pr-4"> {/* Añadir padding para que no se pegue al borde */}
                                {renderMessages()} {/* Mostrar mensajes */}
                                {/* Skeleton de "pensando" mientras se envía */}
                                {isSending && (
                                    <div className="flex items-start space-x-3">
                                        <Skeleton className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0"><BrainCircuit className="h-5 w-5 text-primary"/></Skeleton>
                                        <div className="space-y-2 flex-1 pt-1"><Skeleton className="h-4 w-16" /></div>
                                    </div>
                                )}
                            </div>
                         )}
                    </ScrollArea>

                    {/* Área de Input */}
                    <div className="border-t p-4 bg-muted/30">
                        <ChatInput
                            onSendMessage={handleSendMessage}
                            // Deshabilitar input si está cargando historial, enviando, o si auth está cargando y no bypass
                            isLoading={isSending || showLoading}
                        />
                    </div>
                </div>
            </ResizablePanel>

            {/* Panel de Documentos Recuperados (condicional) */}
            {isPanelOpen && (
                <>
                    <ResizableHandle withHandle />
                    <ResizablePanel defaultSize={30} minSize={20} maxSize={40}>
                        <RetrievedDocumentsPanel
                            documents={retrievedDocs}
                            // Mostrar carga en el panel solo mientras se está enviando la respuesta
                            isLoading={isSending}
                        />
                    </ResizablePanel>
                </>
            )}
        </ResizablePanelGroup>
  );
}
```

## File: `app\(app)\knowledge\page.tsx`
```tsx
import { FileUploader } from '@/components/knowledge/file-uploader';
import { DocumentStatusList } from '@/components/knowledge/document-status-list';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

export default function KnowledgePage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Gestión de la Base de Conocimiento</h1>

      <Card>
        <CardHeader>
          <CardTitle>Subir Documentos</CardTitle>
          <CardDescription>
            Sube nuevos documentos (PDF, DOCX, TXT, etc.) para ser procesados y añadidos a la base de conocimientos.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <FileUploader />
        </CardContent>
      </Card>

      <Separator />

       <Card>
        <CardHeader>
          <CardTitle>Estado de los Documentos</CardTitle>
          <CardDescription>
            Ver el estado de procesamiento de tus documentos subidos.
          </CardDescription>
        </CardHeader>
        <CardContent>
           <DocumentStatusList />
        </CardContent>
      </Card>

    </div>
  );
}
```

## File: `app\(app)\layout.tsx`
```tsx
// File: app/(app)/layout.tsx
"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Sidebar } from '@/components/layout/sidebar';
import { Header } from '@/components/layout/header';
import { useAuth } from '@/lib/hooks/useAuth'; // Importar hook actualizado
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react'; // Para el spinner

export default function AppLayout({ children }: { children: React.ReactNode }) {
  // --- CORRECCIÓN: Usar session, user, isLoading, signOut del hook useAuth ---
  const { session, user, isLoading, signOut } = useAuth();
  // ----------------------------------------------------------------------
  const router = useRouter();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const bypassAuth = process.env.NEXT_PUBLIC_BYPASS_AUTH === 'true';

  useEffect(() => {
    // Si el bypass está activo, no hacer nada (permitir acceso)
    if (bypassAuth) {
      console.warn("AppLayout: Autenticación OMITIDA debido a NEXT_PUBLIC_BYPASS_AUTH=true.");
      return;
    }

    // Si NO estamos cargando y NO hay sesión válida, redirigir a la página principal/pública
    if (!isLoading && !session) {
      console.log("AppLayout: No se encontró token, redirigiendo a login.");
      router.replace('/'); // Redirigir a la página principal (o '/login')
      return; // Detener ejecución del efecto
    }

    // --- CORRECCIÓN: Chequeo adicional si companyId es obligatorio ---
    // Si hay sesión pero el usuario mapeado es null (posiblemente por falta de companyId
    // u otro dato requerido en app_metadata), forzar logout.
    // Descomenta y ajusta si `companyId` es estrictamente necesario para acceder al app.
    // if (!isLoading && session && !user) {
    //   console.error("AppLayout: Session exists but user mapping failed (missing required data like companyId?). Forcing logout.");
    //   signOut(); // Forzar logout si el estado del usuario no es válido
    //   // No necesitas redirigir aquí, el signOut provocará un cambio de estado que
    //   // llevará a la condición !session en la próxima ejecución del efecto.
    //   return;
    // }
    // -------------------------------------------------------------

  // --- CORRECCIÓN: Dependencias del useEffect ---
  // Incluir todas las variables usadas: isLoading, session, user, router, bypassAuth, signOut
  }, [isLoading, session, user, router, bypassAuth, signOut]);
  // -------------------------------------------

  // --- Estado de Carga ---
  // Mostrar spinner mientras isLoading es true Y no estamos en modo bypass
  if (isLoading && !bypassAuth) {
    return (
      <div className="flex h-screen items-center justify-center bg-background">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
        {/* Opcional: Añadir texto */}
        {/* <p className="mt-4 text-muted-foreground">Loading session...</p> */}
      </div>
    );
  }
  // --- Fin Estado de Carga ---

  // --- Guardia de Autenticación ---
  // Si NO estamos en bypass Y (aún estamos cargando O no hay sesión O no hay usuario mapeado),
  // no renderizar el layout protegido. Esto evita flashes de contenido.
  // El useEffect se encargará de la redirección si es necesario.
  if (!bypassAuth && (isLoading || !session /* || !user */)) {
     // Descomenta `|| !user` si el chequeo de usuario mapeado es estricto
     console.log("AppLayout: Not rendering protected layout (isLoading, no session, or no valid user). Waiting for redirect or state update.");
     // Renderizar null o un spinner mínimo mientras se redirige o el estado cambia.
     // Usar el mismo spinner que arriba puede ser buena idea para consistencia.
     return (
       <div className="flex h-screen items-center justify-center bg-background">
         <Loader2 className="h-12 w-12 animate-spin text-primary" />
       </div>
     );
  }
  // --- Fin Guardia de Autenticación ---

  // Si llegamos aquí, o estamos en bypass, o estamos autenticados y autorizados.
  console.log("AppLayout: Rendering protected layout.");
  return (
    <div className="flex h-screen bg-secondary/30 dark:bg-muted/30">
      <ResizablePanelGroup direction="horizontal" className="h-full items-stretch">
          <ResizablePanel
              collapsible collapsedSize={4} minSize={15} maxSize={25} defaultSize={20}
              onCollapse={() => setIsSidebarCollapsed(true)}
              onExpand={() => setIsSidebarCollapsed(false)}
              className={cn("transition-all duration-300 ease-in-out", isSidebarCollapsed ? "min-w-[50px] max-w-[50px]" : "min-w-[200px]")}
          >
              {/* Pasar user al Sidebar si necesita mostrar info del usuario */}
              <Sidebar isCollapsed={isSidebarCollapsed} />
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel defaultSize={80} minSize={30}>
              <div className="flex h-full flex-col">
                   {/* Pasar user y signOut al Header */}
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
"use client";

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/lib/hooks/useAuth';
import { useState, useEffect } from 'react';

// Basic placeholder settings page
export default function SettingsPage() {
    const { user } = useAuth();
    const [name, setName] = useState(user?.name || '');

    useEffect(() => {
        if (user) {
            setName(user.name || '');
        }
    }, [user]);

    const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value);
    };

    const handleSave = async () => {
        // TODO: Implementar la lógica para guardar los cambios en el perfil del usuario.
        // Esto implicaría hacer una llamada a la API para actualizar el nombre del usuario.
        // Puedes usar la función 'request' de lib/api.ts para hacer la llamada a la API.
        console.log('Guardando cambios:', { name });
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
                 <Input id="name" value={name} onChange={handleNameChange} />
            </div>
             <div className="space-y-1">
                 <Label htmlFor="email">Correo electrónico</Label>
                 <Input id="email" type="email" defaultValue={user?.email} disabled />
            </div>
             <Button onClick={handleSave}>Guardar Cambios</Button>
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
        </CardContent>
      </Card>

       <Separator />

       <Card>
        <CardHeader>
          <CardTitle>Apariencia</CardTitle>
          <CardDescription>Personaliza la apariencia.</CardDescription>
        </CardHeader>
        <CardContent>
           <p className="text-sm text-muted-foreground">La selección de temas está disponible en el encabezado.</p>
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

## File: `app\(auth)\register\page.tsx`
```tsx
import { RegisterForm } from "@/components/auth/register-form";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

export default function RegisterPage() {
  return (
    <Card className="w-full max-w-md shadow-lg">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl">Crear Cuenta</CardTitle>
        <CardDescription>Únete a Atenex y desbloquea tu conocimiento</CardDescription>
      </CardHeader>
      <CardContent>
        <RegisterForm />
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
import { LucideIcon, Mail, Phone, Linkedin, MessageCircle } from 'lucide-react'; // Changed Whatsapp to MessageCircle

export default function ContactPage() {
  const router = useRouter();
  const { token } = useAuth();

  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Header/Navigation (replicated from app/page.tsx) */}
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-md border-b">
        <div className="container flex items-center justify-between h-16 py-4 px-4">
          <a href="/" className="font-bold text-2xl text-primary">{APP_NAME}</a>
          <nav className="flex items-center space-x-4 sm:space-x-6 lg:space-x-8">
            <LinkButton href="/">Inicio</LinkButton>
            <LinkButton href="/about">Nosotros</LinkButton>
            <LinkButton href="/contact">Contacto</LinkButton>
            {token ?
              <Button variant="secondary" onClick={() => router.push('/chat')} className="ml-2">
                Ir a la App
              </Button>
              :
              <Button onClick={() => router.push('/login')}>
                Iniciar sesión
              </Button>
            }
          </nav>
        </div>
      </header>

      {/* Main Content - Contact Form */}
      <main className="container mx-auto px-4 py-16 md:py-24 flex-1">
        <section className="text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-foreground mb-6">
            Contáctanos
          </h1>
          <p className="text-lg text-muted-foreground mb-8">
            ¡Nos encantaría saber de ti! Por favor, utiliza el formulario a continuación para ponerte en contacto.
          </p>
        </section>

        <section className="max-w-lg mx-auto">
          <Card>
            <CardHeader>
              <CardTitle>Envíanos un mensaje</CardTitle>
              <CardDescription>
                Te responderemos lo antes posible.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ContactForm />
            </CardContent>
          </Card>
        </section>
      </main>

      {/* Footer (replicated from app/page.tsx) */}
      <footer className="bg-secondary/10 border-t py-8">
        <div className="container text-center text-muted-foreground">
          © {new Date().getFullYear()} Atenex. Todos los derechos reservados.
        </div>
      </footer>
    </div>
  );
}

// Reusable Button Component (defined inside ContactPage)
function LinkButton({ href, children }: { href: string; children: React.ReactNode }) {
  const router = useRouter();
  return (
    <Button variant="link" onClick={() => router.push(href)}>
      {children}
    </Button>
  );
}

// Contact Form Component (separate component for better organization)
function ContactForm() {
  return (
    <div className="space-y-6">
      <form className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Nombre:
          </label>
          <input
            type="text"
            id="name"
            className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
            placeholder="Tu Nombre"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Correo electrónico:
          </label>
          <input
            type="email"
            id="email"
            className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
            placeholder="Tu Correo electrónico"
          />
        </div>
        <div>
          <label htmlFor="message" className="block text-sm font-medium text-gray-700">
            Mensaje:
          </label>
          <textarea
            id="message"
            rows={4}
            className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
            placeholder="Tu Mensaje"
          />
        </div>
        <Button type="submit" className="w-full">
          Enviar Mensaje
        </Button>
      </form>

      <div className="space-y-3 mt-8">
        <div className="flex items-center space-x-2">
          <Mail className="h-5 w-5 text-muted-foreground" />
          <span>Contacto:</span>
          <a
            href="mailto:info@example.com"
            className="text-primary hover:underline"
          >
            info@example.com
          </a>
        </div>

        <div className="flex items-center space-x-2">
          <Phone className="h-5 w-5 text-muted-foreground" />
          <span>Contacto:</span>
          <a
            href="tel:+15551234567"
            className="text-primary hover:underline"
          >
            +15551234567
          </a>
        </div>

        <div className="flex items-center space-x-2">
          <Linkedin className="h-5 w-5 text-muted-foreground" />
          <a
            href="https://www.linkedin.com/company/example"
            className="text-primary hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn
          </a>
        </div>

        <div className="flex items-center space-x-2">
          <MessageCircle className="h-5 w-5 text-muted-foreground" />
          <a
            href="https://wa.me/15551234567"
            className="text-primary hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            WhatsApp
          </a>
        </div>
      </div>
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
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/theme-provider";
import { AuthProvider } from "@/lib/hooks/useAuth";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "Atenex - Consulta de Conocimiento Empresarial",
  description: "Consulta tu base de conocimiento empresarial usando lenguaje natural.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          inter.variable
        )}
      >
        <AuthProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system" // Or your preferred default
            enableSystem
            disableTransitionOnChange
          >
            {children}
            {/* (*) Ensure this Toaster component is rendered */}
            <Toaster richColors position="top-right" /> {/* Added richColors and position */}
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
"use client";

import React from 'react';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { APP_NAME } from '@/lib/constants';
import { useAuth } from '@/lib/hooks/useAuth'; // Hook actualizado
import EmailConfirmationHandler from '@/components/auth/email-confirmation-handler';
import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react'; // Para estado de carga

export default function HomePage() {
  const router = useRouter();
  // --- CORRECCIÓN: Usar 'session' e 'isLoading' del hook useAuth ---
  const { session, isLoading: isAuthLoading } = useAuth();
  // ---------------------------------------------------------------

  // Determinar si el usuario está autenticado basado en la sesión
  // Solo consideramos autenticado si NO está cargando Y hay sesión
  const isAuthenticated = !isAuthLoading && !!session;

  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Header/Navigation */}
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-md border-b">
        <div className="container flex items-center justify-between h-16 py-4 px-4 md:px-6">
          {/* --- CORRECCIÓN: Usar Link de Next o router.push para navegación SPA --- */}
          <button onClick={() => router.push('/')} className="font-bold text-2xl text-primary focus:outline-none focus:ring-2 focus:ring-ring rounded-sm">
            {APP_NAME}
          </button>
          {/* -------------------------------------------------------------------- */}
          <nav className="flex items-center space-x-2 sm:space-x-4">
            <LinkButton href="/">Home</LinkButton>
            <LinkButton href="/about">About</LinkButton>
            <LinkButton href="/contact">Contact</LinkButton>
            <div className="ml-2"> {/* Contenedor para botón de Login/App */}
                {/* --- CORRECCIÓN: Mostrar estado de carga o botón correspondiente --- */}
                {isAuthLoading ? (
                    <Button variant="secondary" disabled={true} size="sm">
                        <Loader2 className="h-4 w-4 animate-spin" />
                    </Button>
                ) : isAuthenticated ? (
                    <Button variant="secondary" onClick={() => router.push('/chat')} size="sm">
                        Go to App
                    </Button>
                ) : (
                    <Button
                        onClick={() => router.push('/login')}
                        size="sm" // Hacerlo consistente con el botón "Go to App"
                        className={cn(
                            "transition-colors duration-150",
                            "hover:bg-primary/90 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                        )}
                    >
                        Login
                    </Button>
                )}
                {/* --------------------------------------------------------------- */}
            </div>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-16 md:py-24 flex-1">
        <section className="text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-foreground mb-6">
            Desbloquea el Conocimiento de tu Empresa con <span className="text-primary">{APP_NAME}</span>
          </h1>
          <p className="text-lg text-muted-foreground mb-8">
            Haz preguntas en lenguaje natural y obtén respuestas instantáneas basadas en el conocimiento colectivo de tu organización.
          </p>
          {/* --- CORRECCIÓN: Botón principal también debe considerar isLoading --- */}
          {isAuthLoading ? (
               <Button size="lg" disabled={true}>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" /> Loading...
               </Button>
          ) : (
            <Button
                size="lg"
                onClick={() => isAuthenticated ? router.push('/chat') : router.push('/register')}
                className={cn(
                    "transition-colors duration-150",
                    "hover:bg-primary/90 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                )}
            >
                {isAuthenticated ? 'Go to Chat' : 'Get Started'}
            </Button>
          )}
          {/* --------------------------------------------------------------- */}
        </section>

        <section className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Feature Cards - replace with actual feature descriptions */}
          <FeatureCard title="Búsqueda Inteligente" description="Encuentra la información que necesitas rápida y fácilmente usando consultas en lenguaje natural." />
          <FeatureCard title="Conocimiento Centralizado" description="Accede a todo el conocimiento colectivo de tu organización en un solo lugar, eliminando los silos de información." />
          <FeatureCard title="Productividad Mejorada" description="Empodera a tu equipo para tomar mejores decisiones con un acceso más rápido a información relevante." />
        </section>

        {/* Handler para confirmación de email (se mantiene igual en su lógica interna) */}
        <EmailConfirmationHandler />
      </main>

      {/* Footer (sin cambios) */}
      <footer className="bg-secondary/10 border-t py-8">
        <div className="container text-center text-muted-foreground">
          © {new Date().getFullYear()} Atenex. Todos los derechos reservados.
        </div>
      </footer>
    </div>
  );
}

// Reusable Link Button Component (sin cambios)
function LinkButton({ href, children }: { href: string; children: React.ReactNode }) {
  const router = useRouter();
  return (
    <Button
        variant="link"
        onClick={() => router.push(href)}
        className={cn("text-sm sm:text-base", "hover:text-primary/80 focus:outline-none focus:ring-2 focus:ring-ring rounded-sm")}
     >
      {children}
    </Button>
  );
}

// Reusable Feature Card Component (sin cambios)
function FeatureCard({ title, description }: { title: string; description: string }) {
  return (
    <div className="p-6 rounded-lg shadow-md bg-card hover:shadow-lg transition-shadow duration-200 border">
      <h3 className="text-xl font-semibold text-foreground mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
}
```

## File: `components\auth\email-confirmation-handler.tsx`
```tsx
// File: components/auth/email-confirmation-handler.tsx
"use client";

import { useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient'; // Usar el cliente global
import { toast } from "sonner";

// Este componente se monta en una página pública (ej. '/')
// y escucha el evento SIGNED_IN que Supabase dispara después
// de procesar el hash de la URL de confirmación.
export default function EmailConfirmationHandler() {
    const router = useRouter();
    // Usamos una ref para evitar que el efecto se ejecute múltiples veces
    // si el componente se re-renderiza por otras razones.
    const processedAuthEvent = useRef(false);

    useEffect(() => {
        // Si ya hemos procesado un evento, no hacer nada más.
        if (processedAuthEvent.current) {
            return;
        }

        console.log("EmailConfirmationHandler: Mounted. Setting up listener.");

        // Escuchar cambios de autenticación. El evento clave es SIGNED_IN
        // que ocurre después de que Supabase procesa el hash de la URL.
        const { data: authListener } = supabase.auth.onAuthStateChange(
            (event, session) => {
                // Solo actuar en el evento SIGNED_IN y si no lo hemos procesado ya.
                if (event === 'SIGNED_IN' && session && !processedAuthEvent.current) {
                    console.log("EmailConfirmationHandler: Detected SIGNED_IN event after email confirmation.");
                    processedAuthEvent.current = true; // Marcar como procesado

                    // Mostrar notificación de éxito
                    toast.success("Email Confirmed", {
                        description: "Your email address has been successfully confirmed. You are now logged in.",
                    });

                    // Redirigir al usuario a la aplicación principal (ej. /chat)
                    // Usamos replace para no añadir la URL de confirmación al historial
                    router.replace('/chat');

                } else if (event === 'PASSWORD_RECOVERY') {
                     // Manejar evento de recuperación de contraseña si es necesario
                     console.log("EmailConfirmationHandler: Detected PASSWORD_RECOVERY event.");
                     // Podrías redirigir a una página de cambio de contraseña o mostrar un mensaje.
                     // Por ahora, solo lo logueamos.
                     toast.info("Password Recovery", { description: "Please follow the instructions to set a new password." });
                     // router.push('/update-password'); // Ejemplo de redirección
                }
            }
        );

        // Limpieza del listener al desmontar el componente
        return () => {
            console.log("EmailConfirmationHandler: Unmounting. Unsubscribing listener.");
            authListener?.subscription.unsubscribe();
        };

    // Solo ejecutar este efecto una vez al montar el componente
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []); // Dependencias vacías para ejecutar solo al montar

    // Este componente no renderiza nada visible
    return null;
}
```

## File: `components\auth\login-form.tsx`
```tsx
"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircle, Loader2 } from 'lucide-react';
import { useAuth } from '@/lib/hooks/useAuth'; // Importar hook de Auth refactorizado
// import { ApiError } from '@/lib/api'; // Ya no es necesario para errores de login específicos de Supabase
import { AuthError } from '@supabase/supabase-js'; // Importar tipo de error de Supabase

const loginSchema = z.object({
  email: z.string().email({ message: 'Dirección de correo electrónico no válida' }),
  password: z.string().min(6, { message: 'La contraseña debe tener al menos 6 caracteres' }),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export function LoginForm() {
  // --- CORRECCIÓN: Usar signInWithPassword del contexto useAuth ---
  const { signInWithPassword } = useAuth();
  // ----------------------------------------------------------
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '' },
  });

  const onSubmit = async (data: LoginFormValues) => {
    setIsLoading(true);
    setError(null);
    try {
      console.log("LoginForm: Attempting login with:", data.email);
      // Llamar a la función del contexto que encapsula supabase.auth.signInWithPassword
      await signInWithPassword({
        email: data.email,
        password: data.password,
      });
      // Si la función signInWithPassword tiene éxito, la redirección
      // o actualización de estado será manejada por el AuthProvider o AppLayout.
      // No es necesario hacer nada más aquí en caso de éxito.
      console.log("LoginForm: signInWithPassword call succeeded (further actions handled by AuthProvider).");
      // No detener isLoading aquí, dejar que el cambio de estado lo haga.

    } catch (err) {
      // El hook signInWithPassword debería haber lanzado un error en caso de fallo
      console.error("LoginForm: signInWithPassword failed:", err);
      let errorMessage = 'Login failed. Please check your credentials.';
       // Usar AuthError de Supabase para mensajes específicos
       if (err instanceof AuthError) {
           errorMessage = err.message || errorMessage;
           // Puedes añadir lógica específica para códigos de error si es necesario
           if (err.message.includes("Invalid login credentials")) {
               errorMessage = "Invalid email or password.";
           } else if (err.message.includes("Email not confirmed")) {
               errorMessage = "Please confirm your email address first.";
           }
       } else if (err instanceof Error) {
           // Otros errores (poco probables aquí si el hook maneja bien)
           errorMessage = err.message;
       }
      setError(errorMessage);
      setIsLoading(false); // Detener carga solo en caso de error
    }
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
      {error && (
        <Alert variant="destructive" role="alert">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Login Failed</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      <div className="space-y-1">
        <Label htmlFor="email">Correo electrónico</Label>
        <Input
          id="email"
          type="email"
          placeholder="name@example.com"
          autoComplete="email"
          required
          disabled={isLoading}
          {...form.register('email')}
          aria-invalid={form.formState.errors.email ? 'true' : 'false'}
        />
        {form.formState.errors.email && (
          <p className="text-sm text-destructive">{form.formState.errors.email.message}</p>
        )}
      </div>
      <div className="space-y-1">
        <Label htmlFor="password">Contraseña</Label>
        <Input
          id="password"
          type="password"
          autoComplete="current-password"
          required
          disabled={isLoading}
          {...form.register('password')}
          aria-invalid={form.formState.errors.password ? 'true' : 'false'}
        />
        {form.formState.errors.password && (
          <p className="text-sm text-destructive">{form.formState.errors.password.message}</p>
        )}
      </div>
      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : 'Iniciar sesión'}
      </Button>
      <div className="mt-4 text-center text-sm">
        ¿No tienes una cuenta?{" "}
        <Link href="/register" className="underline text-primary hover:text-primary/80">
          Registrarse
        </Link>
      </div>
    </form>
  );
}
```

## File: `components\auth\register-form.tsx`
```tsx
// File: components/auth/register-form.tsx
"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircle, Loader2, CheckCircle } from 'lucide-react';
import { useAuth } from '@/lib/hooks/useAuth';
import { AuthError } from '@supabase/supabase-js';

// --- Esquema Zod (Simplificado, sin companyId) ---
const registerSchema = z.object({
  name: z.string().min(2, { message: 'El nombre debe tener al menos 2 caracteres' }).optional(), // El nombre debe tener al menos 2 caracteres
  email: z.string().email({ message: 'Dirección de correo electrónico no válida' }), // Dirección de correo electrónico no válida
  password: z.string().min(6, { message: 'La contraseña debe tener al menos 6 caracteres' }), // La contraseña debe tener al menos 6 caracteres
  // (+) AÑADIR company_id
  companyId: z.string().uuid({message: 'ID de empresa no válido'}).optional(), // ID de empresa no válido
});

type RegisterFormValues = z.infer<typeof registerSchema>;

export function RegisterForm() {
  const { signUp } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: { name: '', email: '', password: '' },
  });

  const onSubmit = async (data: RegisterFormValues) => {
    setIsLoading(true);
    setError(null);
    setSuccess(false);
    try {
      console.log("Attempting registration with:", data.email);

      if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
        console.error("Supabase URL or Anon Key not set in environment variables.");
        setError("Error de configuración de Supabase. Por favor, comprueba tus variables de entorno.");
        setIsLoading(false);
        return;
      }

      const supabaseClient = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    );

     console.log("Supabase client created."); // Add this

     // Try signing up the user
     const { data: authResponse, error: authError } = await supabaseClient.auth.signUp({
        email: data.email,
        password: data.password,
        options: {
           data: {
              name: data.name || null,
           },
        },
     });
     console.log("signUp response:", authResponse, authError); // Add this

     if (authError) {
        console.error("Supabase registration failed:", authError);
        setError(authError.message || 'Error al registrarse. Por favor, inténtalo de nuevo.'); // Error al registrarse. Por favor, inténtalo de nuevo.
        setIsLoading(false);
     } else {
        setSuccess(true); // Registration successful, set success state
     }
    } catch (err: any) {
      console.error("Registration failed:", err);
      let errorMessage = 'Error al registrarse. Por favor, inténtalo de nuevo.'; // Error al registrarse. Por favor, inténtalo de nuevo.
      if (err instanceof ApiError) {
        errorMessage = err.message || errorMessage;
      } else if (err instanceof Error) {
        errorMessage = err.message || errorMessage;
      }
      setError(errorMessage);
    } finally {
      // Do not stop isLoading if success to keep the message visible
      if (!success) {
          setIsLoading(false);
      }
    }
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
      {error && !success && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle> {/* Error */}
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
       {success && (
        <Alert variant="default" className="bg-green-100 dark:bg-green-900 border-green-300 dark:border-green-700">
          <AlertTitle className="text-green-800 dark:text-green-200">Éxito</AlertTitle> {/* Éxito */}
          <AlertDescription className="text-green-700 dark:text-green-300">
            ¡Cuenta creada con éxito! Por favor, revisa tu correo electrónico para verificar tu cuenta.
          </AlertDescription> {/* ¡Cuenta creada con éxito! Por favor, revisa tu correo electrónico para verificar tu cuenta. */}
        </Alert>
      )}

      {/* Campos del Formulario */}
      <div className="space-y-1">
        <Label htmlFor="name">Nombre (Opcional)</Label> {/* Nombre (Opcional) */}
        <Input
          id="name"
          type="text"
          placeholder="Tu Nombre"
          {...form.register('name')}
          aria-invalid={form.formState.errors.name ? 'true' : 'false'}
        />
        {form.formState.errors.name && (
          <p className="text-sm text-destructive">{form.formState.errors.name.message}</p>
        )}
      </div>
      <div className="space-y-1">
        <Label htmlFor="email">Correo electrónico</Label> {/* Correo electrónico */}
        <Input
          id="email"
          type="email"
          placeholder="nombre@ejemplo.com"
          required
          {...form.register('email')}
          aria-invalid={form.formState.errors.email ? 'true' : 'false'}
        />
        {form.formState.errors.email && (
          <p className="text-sm text-destructive">{form.formState.errors.email.message}</p>
        )}
      </div>
      <div className="space-y-1">
        <Label htmlFor="password">Contraseña</Label> {/* Contraseña */}
        <Input
          id="password"
          type="password"
          required
          {...form.register('password')}
          aria-invalid={form.formState.errors.password ? 'true' : 'false'}
        />
        {form.formState.errors.password && (
          <p className="text-sm text-destructive">{form.formState.errors.password.message}</p>
        )}
      </div>
      {/* (+) AÑADIR company_id */}
      <div className="space-y-1">
        <Label htmlFor="companyId">ID de empresa (Opcional)</Label> {/* ID de empresa (Opcional) */}
        <Input
          id="companyId"
          type="text"
          placeholder="ID de la empresa"
          {...form.register('companyId')}
          aria-invalid={form.formState.errors.companyId ? 'true' : 'false'}
        />
        {form.formState.errors.companyId && (
          <p className="text-sm text-destructive">{form.formState.errors.companyId.message}</p>
        )}
      </div>
      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : 'Crear cuenta'} {/* Crear cuenta */}
      </Button>
      <div className="mt-4 text-center text-sm">
        ¿Ya tienes una cuenta?{" "} {/* ¿Ya tienes una cuenta? */}
        <Link href="/login" className="underline text-primary hover:text-primary/80">
          Iniciar sesión
        </Link>
      </div>
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
                    <RefreshCw className="mr-1 h-3 w-3"/> Reintentar
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
                    Esta acción no se puede deshacer. Se eliminará permanentemente el chat
                    <span className="font-medium"> "{chatToDelete?.title || chatToDelete?.id?.substring(0,8)}"</span> y todos sus mensajes.
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
```

## File: `components\chat\chat-input.tsx`
```tsx
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
        placeholder="Ask Atenex anything about your documents..."
        className="flex-1 resize-none max-h-40 min-h-[40px] overflow-y-auto rounded-lg border p-2 pr-12 text-sm shadow-sm focus-visible:ring-1 focus-visible:ring-primary" // Added padding right for button
        rows={1}
        disabled={isLoading}
        aria-label="Chat input"
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
        <span className="sr-only">Send message</span>
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
    // (-) QUITAR ESTA LÍNEA: import { useToast } from "@/components/ui/use-toast";
    // (+) AÑADIR ESTA LÍNEA:
    import { toast } from "sonner";
    import { PanelRightClose, PanelRightOpen, BrainCircuit, FileText } from 'lucide-react'; // Mantuve FileText aunque no se use directamente, por si acaso.
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
      const [isPanelOpen, setIsPanelOpen] = useState(true); // State for the right panel
      const scrollAreaRef = useRef<HTMLDivElement>(null);
      // (-) QUITAR ESTA LÍNEA: const { toast } = useToast(); // Ya no se usa el hook, se importa 'toast' directamente.

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

          // (*) MODIFICAR ESTA LLAMADA PARA USAR 'sonner'
          toast.error("Query Failed", {
            description: errorMessage,
          });

        } finally {
          setIsLoading(false);
        }
      // (*) QUITAR 'toast' de las dependencias si estaba, ya que 'toast' de sonner es una función estable importada.
      }, [isLoading, isPanelOpen]); // Add isPanelOpen dependency

      const handlePanelToggle = () => {
            setIsPanelOpen(!isPanelOpen);
        };

      return (
         <ResizablePanelGroup direction="horizontal" className="h-full max-h-[calc(100vh-theme(space.16))]"> {/* Adjust height based on header */}
                <ResizablePanel defaultSize={isPanelOpen ? 70 : 100} minSize={50}>
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
                                {/* (*) Modificado para mostrar Skeleton solo cuando el último mensaje es del usuario */}
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

                {/* Conditionally render the panel based on isPanelOpen */}
                {isPanelOpen && (
                    <>
                        <ResizableHandle withHandle />
                        <ResizablePanel defaultSize={30} minSize={20} maxSize={40}>
                            {/* (*) Modificado para pasar el estado de carga correcto al panel de documentos */}
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
import { User, BrainCircuit, AlertTriangle } from 'lucide-react';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
// Use the frontend type definition for RetrievedDoc
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
  sources?: RetrievedDoc[]; // Use the frontend type
  isError?: boolean;
  created_at?: string; // Optional timestamp from API
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
          'max-w-[75%] rounded-lg p-3 text-sm shadow-sm',
          isUser
            ? 'bg-primary text-primary-foreground'
            : isError
              ? 'bg-destructive/10 text-destructive-foreground border border-destructive/20'
              : 'bg-muted'
        )}
      >
         <div className="prose prose-sm dark:prose-invert max-w-none break-words">
            <Markdown remarkPlugins={[remarkGfm]}>
                {message.content}
            </Markdown>
         </div>

         {/* Display sources if available */}
         {!isUser && !isError && message.sources && message.sources.length > 0 && (
            <div className="mt-2 pt-2 border-t border-border/50">
                <p className="text-xs font-medium text-muted-foreground mb-1">Sources:</p>
                <ul className="space-y-1">
                 {message.sources.map((doc, index) => (
                    <li key={doc.id || `source-${index}`} className="text-xs text-muted-foreground hover:text-foreground transition-colors">
                       <TooltipProvider delayDuration={100}>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    {/* Make sources clickable if you have a way to view the doc */}
                                    <a
                                        href="#" // Replace with actual link/action if available
                                        onClick={(e) => {e.preventDefault(); console.log("View source:", doc)}} // Log for now
                                        className="underline decoration-dotted underline-offset-2"
                                    >
                                        {index + 1}. {doc.file_name || doc.document_id?.substring(0, 8) || `Source ${index+1}`}
                                    </a>
                                </TooltipTrigger>
                                <TooltipContent side="top" className="max-w-xs text-xs">
                                    <p>ID: {doc.id}</p>
                                    {doc.document_id && <p>Doc ID: {doc.document_id}</p>}
                                    {doc.score != null && <p>Score: {doc.score.toFixed(4)}</p>}
                                    {doc.content_preview && <p className="mt-1 pt-1 border-t border-border/50 line-clamp-3">Preview: {doc.content_preview}</p>}
                                </TooltipContent>
                            </Tooltip>
                       </TooltipProvider>
                    </li>
                 ))}
                </ul>
            </div>
         )}

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
// --- MODIFICACIÓN: Añadir 'Eye' a la importación ---
import { FileText, AlertCircle, Download, Loader2, Eye } from 'lucide-react';
// -------------------------------------------------
import { ApiError, request, RetrievedDoc } from '@/lib/api'; // Import request function, RetrievedDoc
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
        console.log("Viewing document details:", doc.document_id || doc.id);
        setSelectedDoc(doc);
        setIsDialogOpen(true);
    };

    const handleDownloadDocument = (doc: RetrievedDoc) => {
        const message = `Download requested for: ${doc.file_name || doc.id}`;
        console.log(message);
        toast.info("Download Not Implemented", {
             description: `Backend endpoint for downloading '${doc.file_name || doc.id}' is not yet available.`,
             action: { label: "Close", onClick: () => {} },
        });
    };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <div className="flex h-full flex-col border-l bg-muted/30">
            <CardHeader className="sticky top-0 z-10 border-b bg-background p-4">
                <CardTitle className="text-lg flex items-center">
                    <FileText className="mr-2 h-5 w-5" /> Retrieved Sources
                </CardTitle>
                <CardDescription className="text-xs">
                    Documents used to generate the answer. Click to view details.
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
                            <p className="text-sm">No relevant documents found for the last query.</p>
                        </div>
                    )}
                    {/* Lista de Documentos */}
                    {documents.map((doc, index) => (
                        <DialogTrigger asChild key={doc.id || `doc-${index}`}>
                            <Card
                                className="cursor-pointer hover:shadow-md transition-shadow duration-150"
                                onClick={() => handleViewDocument(doc)}
                                title={`Click to view details for ${doc.file_name || 'document'}`}
                            >
                                <CardContent className="p-3 space-y-1 text-sm">
                                    <div className="flex justify-between items-start">
                                        <p className="font-medium text-primary truncate pr-2">
                                            {index + 1}. {doc.file_name || doc.document_id?.substring(0, 8) || `Chunk ${doc.id.substring(0, 8)}`}
                                        </p>
                                        {doc.score != null && (
                                            <Badge variant="secondary" title={`Relevance Score: ${doc.score.toFixed(4)}`}>
                                                {doc.score.toFixed(2)}
                                            </Badge>
                                        )}
                                    </div>
                                    <p className="text-xs text-muted-foreground line-clamp-2">
                                        {doc.content_preview || 'No preview available.'}
                                    </p>
                                    <div className="text-xs text-muted-foreground/80 pt-1 flex justify-between items-center">
                                        <span>ID: {doc.document_id?.substring(0, 8) ?? doc.id.substring(0, 8)}...</span>
                                        {/* --- USO DEL ICONO 'Eye' --- */}
                                        <Eye className="h-3 w-3 text-muted-foreground/50" />
                                        {/* --------------------------- */}
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
                        <DialogTitle className="truncate" title={selectedDoc.file_name || selectedDoc.document_id || 'Document Details'}>
                            {selectedDoc.file_name || selectedDoc.document_id || 'Document Details'}
                        </DialogTitle>
                        <DialogDescription>
                            Details of the retrieved document chunk.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="py-4 space-y-3 text-sm">
                        <div className="flex justify-between"><span className="font-medium text-muted-foreground">Document ID:</span><span className="font-mono text-xs bg-muted px-1 rounded">{selectedDoc.document_id || 'N/A'}</span></div>
                        <div className="flex justify-between"><span className="font-medium text-muted-foreground">Chunk ID:</span><span className="font-mono text-xs bg-muted px-1 rounded">{selectedDoc.id}</span></div>
                        <div className="flex justify-between"><span className="font-medium text-muted-foreground">Relevance Score:</span><span>{selectedDoc.score?.toFixed(4) ?? 'N/A'}</span></div>
                        <div>
                            <span className="font-medium text-muted-foreground block mb-1">Content Preview:</span>
                            <ScrollArea className="max-h-[250px] border rounded p-2 bg-muted/50 text-xs"><pre className="whitespace-pre-wrap break-words">{selectedDoc.content_preview || 'No content preview available.'}</pre></ScrollArea>
                        </div>
                        {selectedDoc.metadata && Object.keys(selectedDoc.metadata).length > 0 && (
                             <div>
                                <span className="font-medium text-muted-foreground block mb-1">Metadata:</span>
                                <ScrollArea className="max-h-[100px] border rounded p-2 bg-muted/50 text-xs"><pre className="whitespace-pre-wrap break-words">{JSON.stringify(selectedDoc.metadata, null, 2)}</pre></ScrollArea>
                            </div>
                        )}
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => handleDownloadDocument(selectedDoc)}>
                            <Download className="mr-2 h-4 w-4" />Download Original (N/A)
                        </Button>
                        <DialogClose asChild><Button variant="secondary">Close</Button></DialogClose>
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
// File: components/knowledge/document-status-list.tsx
"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { AlertCircle, CheckCircle2, Clock, Loader2, RefreshCw, Info } from 'lucide-react';
import { listDocumentStatuses, DocumentStatusResponse, ApiError } from '@/lib/api';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Skeleton } from '@/components/ui/skeleton';
import { toast } from "sonner";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"

type DocumentStatus = DocumentStatusResponse;

export function DocumentStatusList() {
    const [statuses, setStatuses] = useState<DocumentStatus[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchStatuses = useCallback(async (showToast = false) => {
        setIsLoading(true);
        setError(null);
        try {
            const data = await listDocumentStatuses();
            setStatuses(data);
            if (showToast) {
                toast.info("Statuses Refreshed", { description: `Loaded ${data.length} document statuses.`});
            } else if (data.length === 0) {
                console.log("No document statuses found.");
            }
        } catch (err) {
            console.error("Failed to fetch document statuses:", err);
            let message = "Could not load document statuses.";
            if (err instanceof ApiError) {
                message = err.message || message;
            } else if (err instanceof Error) {
                message = err.message;
            }
            setError(message);
            toast.error("Error Loading Statuses", { description: message });
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchStatuses(false);
    }, [fetchStatuses]);

    const handleRefresh = () => {
        fetchStatuses(true);
    };

    const getStatusBadge = (status: DocumentStatus['status']) => {
        switch (status) {
            case 'uploaded':
                return <Badge variant="outline" className="border-blue-300 text-blue-700 bg-blue-50 dark:border-blue-700 dark:text-blue-300 dark:bg-blue-900/30"><Clock className="mr-1 h-3 w-3" />Uploaded</Badge>;
            case 'processing':
                return <Badge variant="secondary" className="border-yellow-300 text-yellow-800 bg-yellow-50 dark:border-yellow-600 dark:text-yellow-200 dark:bg-yellow-900/30"><Loader2 className="mr-1 h-3 w-3 animate-spin" />Processing</Badge>;
            case 'processed':
            case 'indexed':
                return <Badge variant="default" className="bg-green-100 text-green-800 border-green-300 hover:bg-green-200 dark:bg-green-900/30 dark:text-green-200 dark:border-green-700"><CheckCircle2 className="mr-1 h-3 w-3" />Processed</Badge>;
            case 'error':
                return <Badge variant="destructive"><AlertCircle className="mr-1 h-3 w-3" />Error</Badge>;
            default:
                const unknownStatus: string = status;
                return <Badge variant="outline"><Info className="mr-1 h-3 w-3" />Unknown ({unknownStatus})</Badge>;
        }
    };

    const formatDateTime = (dateString?: string) => {
        if (!dateString) return 'N/A';
        try {
            return new Date(dateString).toLocaleString(undefined, {
                year: 'numeric', month: 'short', day: 'numeric',
                hour: 'numeric', minute: '2-digit'
            });
        } catch {
            return dateString;
        }
    };

    const renderContent = () => {
        if (isLoading && statuses.length === 0) { // Show skeletons only on initial load
            return Array.from({ length: 5 }).map((_, index) => ( // Render more skeleton rows
                <TableRow key={`skel-${index}`}>
                    <TableCell><Skeleton className="h-4 w-3/4" /></TableCell>
                    <TableCell><Skeleton className="h-6 w-20" /></TableCell>
                    <TableCell><Skeleton className="h-4 w-full" /></TableCell>
                    <TableCell><Skeleton className="h-4 w-1/2" /></TableCell>
                </TableRow>
            ));
        }

        if (error && statuses.length === 0) {
            return (
                <TableRow>
                    <TableCell colSpan={4} className="text-center text-destructive py-8">
                        <AlertCircle className="mx-auto h-8 w-8 mb-2" />
                        Error loading statuses: {error}
                        <Button variant="link" onClick={handleRefresh} className="ml-2">Try Again</Button>
                    </TableCell>
                </TableRow>
            );
        }

        if (!isLoading && !error && statuses.length === 0) {
            return (
                <TableRow>
                    <TableCell colSpan={4} className="text-center text-muted-foreground py-8">
                        No documents found. Upload documents using the form above.
                    </TableCell>
                </TableRow>
            );
        }

        return statuses.map((doc) => (
            <TableRow key={doc.document_id}>
                <TableCell className="font-medium truncate max-w-xs" title={doc.file_name || 'N/A'}>{doc.file_name || 'N/A'}</TableCell>
                <TableCell>{getStatusBadge(doc.status)}</TableCell>
                <TableCell className="text-muted-foreground text-xs max-w-sm">
                    {doc.status === 'error' ? (
                        <TooltipProvider delayDuration={100}>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <span className="text-destructive truncate block cursor-help underline decoration-dotted">
                                        {doc.error_message || 'Unknown error'}
                                    </span>
                                </TooltipTrigger>
                                <TooltipContent side="top" className="max-w-xs text-xs">
                                    <p>{doc.error_message || 'No details provided.'}</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    ) : doc.status === 'processed' || doc.status === 'indexed' ? (
                        `${doc.chunk_count ?? '?'} chunks indexed`
                    ) : (
                        doc.message || '--'
                    )}
                </TableCell>
                <TableCell className="text-muted-foreground text-xs whitespace-nowrap">
                    {formatDateTime(doc.last_updated)}
                </TableCell>
            </TableRow>
        ));
    };

    return (
       <div className="space-y-2">
           <div className="flex justify-end items-center gap-2">
                {error && statuses.length > 0 && (
                    <TooltipProvider delayDuration={100}>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <span className="text-xs text-destructive flex items-center gap-1 cursor-help">
                                    <AlertCircle className="h-4 w-4"/> Refresh Error
                                </span>
                            </TooltipTrigger>
                            <TooltipContent side="left" className="max-w-xs text-xs">
                                <p>{error}</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                )}
                <Button variant="outline" size="sm" onClick={handleRefresh} disabled={isLoading}>
                    <RefreshCw className={`mr-2 h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
                    Refresh
                </Button>
           </div>
            <ScrollArea className="h-[400px] border rounded-md relative">
                {isLoading && statuses.length > 0 && (
                   <div className="absolute inset-0 bg-background/50 backdrop-blur-sm flex items-center justify-center z-20">
                       <Loader2 className="h-6 w-6 animate-spin text-primary" />
                   </div>
                )}
                <Table>
                    <TableHeader className="sticky top-0 bg-muted/50 backdrop-blur-sm z-10">
                        <TableRow>
                            <TableHead className="w-[40%]">Filename</TableHead>
                            <TableHead className="w-[15%]">Status</TableHead>
                            <TableHead className="w-[30%]">Details</TableHead>
                            <TableHead className="w-[15%] text-right">Last Updated</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {renderContent()}
                    </TableBody>
                </Table>
            </ScrollArea>
        </div>
    );
}
```

## File: `components\knowledge\file-uploader.tsx`
```tsx
// File: components/knowledge/file-uploader.tsx
"use client";

import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input'; // Input no se usa aquí, pero lo dejo por si acaso
import { Progress } from '@/components/ui/progress';
// Alert no se usa directamente aquí, pero lo dejo por si acaso
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { UploadCloud, FileCheck2, AlertCircle, Loader2, X } from 'lucide-react';
import { uploadDocument, ApiError } from '@/lib/api';
// (-) QUITAR ESTA LÍNEA (si existía): import { useToast } from "@/components/ui/use-toast";
// (+) AÑADIR ESTA LÍNEA (si no existe):
import { toast } from "sonner";
import { Badge } from '@/components/ui/badge';

interface UploadedFileStatus {
    file: File;
    status: 'pending' | 'uploading' | 'success' | 'error';
    progress: number;
    error?: string;
    documentId?: string;
    taskId?: string;
}

export function FileUploader() {
    const [filesStatus, setFilesStatus] = useState<UploadedFileStatus[]>([]);
    // (-) QUITAR ESTA LÍNEA (si existía): const { toast } = useToast(); // No necesitas esto con sonner

    const updateFileStatus = (fileName: string, updates: Partial<Omit<UploadedFileStatus, 'file'>>) => {
        setFilesStatus(prev =>
            prev.map(fs => (fs.file.name === fileName ? { ...fs, ...updates } : fs))
        );
    };

    const onDrop = useCallback((acceptedFiles: File[]) => {
        const newFiles: UploadedFileStatus[] = acceptedFiles.map(file => ({
            file,
            status: 'pending',
            progress: 0,
        }));
        setFilesStatus(prev => [...prev, ...newFiles]);

        newFiles.forEach(async (fileStatus) => {
            const formData = new FormData();
            formData.append('file', fileStatus.file);
            const metadata = { source: 'web-uploader' };

            updateFileStatus(fileStatus.file.name, { status: 'uploading', progress: 10 });

            try {
                 updateFileStatus(fileStatus.file.name, { progress: 50 });

                const response = await uploadDocument(formData, metadata);

                updateFileStatus(fileStatus.file.name, {
                    status: 'success',
                    progress: 100,
                    documentId: response.document_id,
                    taskId: response.task_id
                });
                // (-) QUITAR ESTO (si existía):
                // toast({
                //     title: "Upload Queued",
                //     description: `${fileStatus.file.name} uploaded successfully and queued for processing.`,
                // });
                // (+) AÑADIR/USAR ESTO:
                 toast.success("Upload Queued", {
                    description: `${fileStatus.file.name} uploaded successfully and queued for processing. Task ID: ${response.task_id}`, // Puedes añadir más info si quieres
                 });

            } catch (error) {
                console.error(`Upload failed for ${fileStatus.file.name}:`, error);
                let errorMessage = 'Upload failed.';
                if (error instanceof ApiError && error.message) {
                   errorMessage = error.message;
                } else if (error instanceof Error) {
                   errorMessage = error.message;
                }
                updateFileStatus(fileStatus.file.name, { status: 'error', progress: 0, error: errorMessage });
                 // (-) QUITAR ESTO (si existía):
                 // toast({
                 //    variant: "destructive",
                 //    title: `Upload Failed: ${fileStatus.file.name}`,
                 //    description: errorMessage,
                 // });
                 // (+) AÑADIR/USAR ESTO:
                 toast.error(`Upload Failed: ${fileStatus.file.name}`, {
                    description: errorMessage,
                 });
            }
        });
    // (+) Dependencias de useCallback: no se necesita 'toast' para sonner
    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: {
            'application/pdf': ['.pdf'],
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
            'text/plain': ['.txt'],
            'text/markdown': ['.md'],
            'text/html': ['.html', '.htm'],
            // Añade más tipos si son soportados por tu backend
        },
        multiple: true,
    });

     const removeFile = (fileName: string) => {
        setFilesStatus(prev => prev.filter(fs => fs.file.name !== fileName));
    };

    return (
        <div className="space-y-4">
            <div
                {...getRootProps()}
                className={`flex flex-col items-center justify-center w-full p-8 border-2 border-dashed rounded-lg cursor-pointer transition-colors duration-200 ease-in-out
                ${isDragActive ? 'border-primary bg-primary/10' : 'border-border hover:border-primary/50 hover:bg-muted/50'}`}
            >
                <input {...getInputProps()} />
                <UploadCloud className={`w-12 h-12 mb-4 ${isDragActive ? 'text-primary' : 'text-muted-foreground'}`} />
                {isDragActive ? (
                    <p className="text-lg font-semibold text-primary">Drop the files here ...</p>
                ) : (
                    <>
                        <p className="text-lg font-semibold mb-2">Drag & drop files here, or click to select</p>
                        <p className="text-sm text-muted-foreground">Supported types: PDF, DOCX, TXT, MD, HTML</p>
                         {/* Add size limits if known from backend */}
                        {/* <p className="text-xs text-muted-foreground mt-1">Max file size: 50MB</p> */}
                    </>
                )}
            </div>

            {filesStatus.length > 0 && (
                <div className="space-y-2">
                    <h4 className="text-sm font-medium">Upload Queue:</h4>
                    {filesStatus.map((fs) => (
                        <div key={fs.file.name} className="flex items-center justify-between p-2 border rounded-md bg-background">
                            <div className="flex items-center space-x-2 overflow-hidden">
                                {fs.status === 'success' && <FileCheck2 className="w-5 h-5 text-green-600 flex-shrink-0" />}
                                {fs.status === 'error' && <AlertCircle className="w-5 h-5 text-destructive flex-shrink-0" />}
                                {(fs.status === 'pending' || fs.status === 'uploading') && <Loader2 className="w-5 h-5 text-muted-foreground animate-spin flex-shrink-0" />}
                                <span className="text-sm truncate flex-1" title={fs.file.name}>{fs.file.name}</span>
                                <span className="text-xs text-muted-foreground flex-shrink-0">({(fs.file.size / 1024 / 1024).toFixed(2)} MB)</span>
                             </div>
                             <div className="flex items-center space-x-2 flex-shrink-0">
                                {fs.status === 'uploading' && <Progress value={fs.progress} className="w-20 h-2" />}
                                {fs.status === 'success' && <Badge variant="outline" className="text-green-700 border-green-300 bg-green-50 dark:bg-green-900 dark:text-green-300 dark:border-green-700">Queued</Badge>}
                                {fs.status === 'error' && <Badge variant="destructive" title={fs.error}>Error</Badge>}
                                {/* Permitir eliminar incluso si está subiendo o tuvo éxito/error */}
                                <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => removeFile(fs.file.name)} title="Remove from queue">
                                    <X className="h-4 w-4" />
                                </Button>
                             </div>
                            {/* Mostrar mensaje de error debajo si existe */}
                             {fs.status === 'error' && fs.error && (
                                <p className="text-xs text-destructive col-span-full mt-1 pl-7" title={fs.error}>
                                   {fs.error}
                                </p>
                             )}
                        </div>
                    ))}
                     {filesStatus.some(fs => fs.status === 'error') && (
                        <p className="text-xs text-destructive mt-2">Some uploads failed. Check individual errors above.</p>
                     )}
                </div>
            )}
        </div>
    );
}
```

## File: `components\layout\header.tsx`
```tsx
// File: components/layout/header.tsx
"use client";
// File: components/layout/header.tsx
"use client";

import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { LogOut, Settings, User as UserIcon, Home } from "lucide-react"; // Quitado Menu, añadido Home
import { useAuth } from '@/lib/hooks/useAuth'; // Hook refactorizado
import { APP_NAME } from '@/lib/constants';
import { ThemePaletteButton } from '@/components/theme-palette-button';
import { useRouter } from 'next/navigation';

export function Header() {
  // --- CORRECCIÓN: Usar user y signOut del hook useAuth ---
  const { user, signOut } = useAuth();
  // -----------------------------------------------------
  const router = useRouter();

  // Helper para obtener iniciales (sin cambios)
  const getInitials = (name?: string | null) => { // Permitir null
    if (!name) return '?';
    return name.split(' ').map(n => n[0]).slice(0, 2).join('').toUpperCase();
  };

  const handleLogout = async () => {
      console.log("Header: Initiating logout...");
      await signOut(); // Llamar a signOut del contexto
      // La redirección será manejada por el AuthProvider o AppLayout al detectar el cambio de estado
      console.log("Header: signOut called.");
  };

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b bg-background/95 backdrop-blur-sm px-4 md:px-6">
      {/* Lado Izquierdo - Enlace a Home y Título (opcional) */}
      <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={() => router.push('/')} aria-label="Go to Homepage">
              <Home className="h-5 w-5" />
          </Button>
          {/* Opcional: Mostrar nombre de la app o título de la página actual */}
          {/* <span className="text-lg font-semibold hidden md:inline">{APP_NAME}</span> */}
      </div>

      {/* Lado Derecho - Controles (Tema y Menú de Usuario) */}
      <div className="flex items-center space-x-2 md:space-x-4">
        <ThemePaletteButton />

        {/* Menú de Usuario (solo si hay usuario) */}
        {user && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-9 w-9 rounded-full focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
                <Avatar className="h-9 w-9 border">
                  {/* <AvatarImage src="/path/to/user-image.jpg" alt={user.name || 'User Avatar'} /> */}
                  <AvatarFallback className="bg-secondary text-secondary-foreground font-medium">
                    {getInitials(user.name)}
                  </AvatarFallback>
                </Avatar>
                <span className="sr-only">Open user menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              {/* Información del Usuario */}
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none truncate" title={user.name || 'User'}>
                    {user.name || 'User'}
                  </p>
                  <p className="text-xs leading-none text-muted-foreground truncate" title={user.email}>
                    {user.email}
                  </p>
                  {/* Mostrar Company ID si existe */}
                  {user.companyId && (
                    <p className="text-xs leading-none text-muted-foreground/80 mt-1" title={`Company ID: ${user.companyId}`}>
                      Company: {user.companyId.substring(0,8)}...
                    </p>
                  )}
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              {/* Opciones del Menú */}
              <DropdownMenuItem onClick={() => router.push('/settings')} className="cursor-pointer">
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
              </DropdownMenuItem>
              {/* Podrías añadir más items aquí (ej. Profile, Billing, etc.) */}
              {/*
              <DropdownMenuItem onClick={() => router.push('/profile')} className="cursor-pointer">
                <UserIcon className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </DropdownMenuItem>
              */}
              <DropdownMenuSeparator />
              {/* Logout */}
              <DropdownMenuItem onClick={handleLogout} className="cursor-pointer text-destructive focus:text-destructive focus:bg-destructive/10">
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
        {/* Fin Menú de Usuario */}
      </div>
    </header>
  );
}
```

## File: `components\layout\sidebar.tsx`
```tsx
"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Button, buttonVariants } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { BotMessageSquare, FileUp, Settings, BarChartHorizontalBig, CircleHelp } from 'lucide-react'; // Added Help icon
import { APP_NAME } from '@/lib/constants';
import { ChatHistory } from '@/components/chat/chat-history'; // Import ChatHistory

interface SidebarProps {
  isCollapsed: boolean;
}

const navItems = [
  { href: '/chat', label: 'Chat', icon: BotMessageSquare },
  { href: '/knowledge', label: 'Knowledge Base', icon: FileUp },
//   { href: '/analytics', label: 'Analytics', icon: BarChartHorizontalBig }, // Example extra item
  { href: '/settings', label: 'Settings', icon: Settings },
//   { href: '/help', label: 'Help & Support', icon: CircleHelp }, // Example extra item
];

export function Sidebar({ isCollapsed }: SidebarProps) {
  const pathname = usePathname();

  return (
    <aside className={cn(
        "flex h-full flex-col border-r bg-muted/40 transition-all duration-300 ease-in-out",
        isCollapsed ? "w-[50px] items-center" : "w-full p-4" // Adjust padding/width
      )}
      >
      <div className={cn("flex items-center", isCollapsed ? "h-16 justify-center" : "h-16 justify-start")}>
          {/* Simple Icon or Logo when collapsed */}
          <BotMessageSquare className={cn("h-6 w-6 text-primary", !isCollapsed && "mr-2")} />
        {!isCollapsed && (
          <span className="text-lg font-bold text-primary">{APP_NAME}</span>
        )}
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
             <h3 className="px-2 text-xs font-semibold uppercase text-muted-foreground tracking-wider">Chat History</h3>
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
import { getApiGatewayUrl } from './utils';
import type { Message } from '@/components/chat/chat-message'; // Asegúrate que la interfaz Message se exporte desde aquí
import { supabase } from './supabaseClient';

// --- ApiError Class (sin cambios) ---
interface ApiErrorData {
    detail?: string | { msg: string; type: string; loc?: string[] }[] | any;
    message?: string;
}
export class ApiError extends Error {
  status: number;
  data?: ApiErrorData;
  constructor(message: string, status: number, data?: ApiErrorData) {
    super(message); this.name = 'ApiError'; this.status = status; this.data = data;
    Object.setPrototypeOf(this, ApiError.prototype);
  }
}

// --- Core Request Function (exportada, sin cambios internos) ---
export async function request<T>(
    endpoint: string,
    options: RequestInit = {}
): Promise<T> {
    let url: string;
    const cleanEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
    if (!cleanEndpoint.startsWith('/api/v1/')) {
      throw new Error(`Invalid API endpoint: ${cleanEndpoint}. Must start with /api/v1/`);
    }
    const gatewayUrl = getApiGatewayUrl();
    url = `${gatewayUrl}${cleanEndpoint}`;
    let token: string | null = null;
    try {
      const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
      if (sessionError) { console.error("API Request: Error getting Supabase session:", sessionError); }
      token = sessionData?.session?.access_token || null;
      if (!token) { console.warn(`API Request: No Supabase access token found for ${cleanEndpoint}.`); }
    } catch (e) { console.error("API Request: Unexpected error fetching Supabase session:", e); }
    const headers = new Headers(options.headers || {});
    headers.set('Accept', 'application/json');
    if (!(options.body instanceof FormData)) { headers.set('Content-Type', 'application/json'); }
    if (token) { headers.set('Authorization', `Bearer ${token}`); }
    const config: RequestInit = { ...options, headers };
    console.log(`API Request: ${config.method || 'GET'} ${url} (Token ${token ? 'Present' : 'Absent'})`);
    try {
      const response = await fetch(url, config);
      if (!response.ok) {
        let errorData: ApiErrorData | null = null; let errorText = ''; const contentType = response.headers.get('content-type');
        try { if (contentType && contentType.includes('application/json')) { errorData = await response.json(); } else { errorText = await response.text(); } } catch (e) { console.warn(`API Request: Could not parse error response body for ${response.status} from ${url}`, e); try { errorText = await response.text(); } catch {} }
        let errorMessage = `API Error (${response.status})`;
        if (errorData?.detail && typeof errorData.detail === 'string') { errorMessage = errorData.detail; } else if (errorData?.detail && Array.isArray(errorData.detail) && errorData.detail.length > 0) { errorMessage = errorData.detail.map(e => `${e.loc?.join('.')} - ${e.msg}`).join('; ') || 'Validation Error'; } else if (errorData?.message && typeof errorData.message === 'string') { errorMessage = errorData.message; } else if (errorText) { errorMessage = errorText.substring(0, 200); } else { switch (response.status) { case 400: errorMessage = 'Bad Request'; break; case 401: errorMessage = 'Authentication required or token invalid.'; break; case 403: errorMessage = 'Forbidden. Missing permissions or required data (like Company ID).'; break; case 404: errorMessage = 'Resource not found.'; break; case 500: errorMessage = 'Internal Server Error'; break; default: errorMessage = `HTTP error ${response.status}`; } }
        console.error(`API Error Response: ${response.status} ${errorMessage}`, { url, status: response.status, errorData, errorText });
        throw new ApiError(errorMessage, response.status, errorData || undefined);
      }
      if (response.status === 204 || response.headers.get('content-length') === '0') { return null as T; }
      try { const data: T = await response.json(); return data; } catch (jsonError) { console.error(`API Request: Invalid JSON response for successful request from ${url}`, jsonError); throw new ApiError(`Invalid JSON response received from server.`, response.status); }
    } catch (error) {
      if (error instanceof ApiError) { throw error; } else if (error instanceof TypeError && (error.message.includes('fetch') || error.message.includes('NetworkError') || error.message.includes('Failed to fetch'))) { const networkErrorMessage = `Network error connecting to API Gateway at ${gatewayUrl}. Check connection/gateway status.`; console.error('API Request Network Error:', { url, gatewayUrl, error: error.message }); throw new ApiError(networkErrorMessage, 0); } else { console.error('API Request Unexpected Error:', { url, error }); const message = error instanceof Error ? error.message : 'An unexpected error occurred during the API request.'; throw new ApiError(message, 500); }
    }
}

// --- Funciones Específicas de API ---
export interface IngestResponse { document_id: string; task_id: string; status: string; message: string; }
export const uploadDocument = async (formData: FormData, metadata: Record<string, any> = {}) => request<IngestResponse>('/api/v1/ingest/documents', { method: 'POST', body: formData });
export interface DocumentStatusResponse { document_id: string; status: string; file_name?: string | null; file_type?: string | null; chunk_count?: number | null; error_message?: string | null; last_updated?: string; message?: string | null; }
export const listDocumentStatuses = async (): Promise<DocumentStatusResponse[]> => request<DocumentStatusResponse[]>('/api/v1/ingest/documents/status');
export interface RetrievedDocApi { id: string; score?: number | null; content_preview?: string | null; metadata?: Record<string, any> | null; document_id?: string | null; file_name?: string | null; }
export type RetrievedDoc = RetrievedDocApi;
export interface ChatSummary { id: string; title: string | null; updated_at: string; created_at: string;}
export interface ChatMessageApi { id: string; chat_id: string; role: 'user' | 'assistant'; content: string; sources: RetrievedDocApi[] | null; created_at: string; }
export interface QueryPayload { query: string; retriever_top_k?: number; chat_id?: string | null; }
export interface QueryApiResponse { answer: string; retrieved_documents: RetrievedDocApi[]; query_log_id?: string | null; chat_id: string; }
export const getChats = async (): Promise<ChatSummary[]> => request<ChatSummary[]>('/api/v1/query/chats');
export const getChatMessages = async (chatId: string): Promise<ChatMessageApi[]> => request<ChatMessageApi[]>(`/api/v1/query/chats/${chatId}/messages`);
export const postQuery = async (payload: QueryPayload): Promise<QueryApiResponse> => request<QueryApiResponse>('/api/v1/query/ask', { method: 'POST', body: JSON.stringify({...payload, chat_id: payload.chat_id || null}) });
export const deleteChat = async (chatId: string): Promise<void> => { await request<null>(`/api/v1/query/chats/${chatId}`, { method: 'DELETE' }); };
interface EnsureCompanyResponse { message: string; company_id?: string; }
export const ensureCompanyAssociation = async (): Promise<EnsureCompanyResponse> => request<EnsureCompanyResponse>('/api/v1/users/me/ensure-company', { method: 'POST' });

// --- Type Mapping Helpers (IMPLEMENTACIONES RESTAURADAS) ---
export const mapApiSourcesToFrontend = (apiSources: RetrievedDocApi[] | null): RetrievedDoc[] | undefined => {
    // Si la entrada es null, devuelve undefined (coincide con el tipo de retorno)
    if (!apiSources) {
        return undefined;
    }
    // Si es un array (incluso vacío), mapea cada elemento
    return apiSources.map(source => ({
        // Copia todas las propiedades esperadas
        id: source.id,
        score: source.score,
        content_preview: source.content_preview,
        metadata: source.metadata,
        document_id: source.document_id,
        file_name: source.file_name,
    })); // Esta función ahora siempre devuelve RetrievedDoc[] o undefined
};

export const mapApiMessageToFrontend = (apiMessage: ChatMessageApi): Message => {
    // Llama a la función de mapeo de fuentes
    const mappedSources = mapApiSourcesToFrontend(apiMessage.sources);

    // Construye y devuelve el objeto Message del frontend
    return {
        id: apiMessage.id,
        role: apiMessage.role,
        content: apiMessage.content,
        sources: mappedSources, // Usa las fuentes mapeadas
        isError: false, // Asume que no hay error al mapear una respuesta exitosa de la API
        created_at: apiMessage.created_at, // Conserva el timestamp
    }; // Esta función ahora siempre devuelve un objeto Message
};
```

## File: `lib\auth\helpers.ts`
```ts
// lib/auth/helpers.ts
// import { AUTH_TOKEN_KEY } from "@/lib/constants"; // Ya no es necesario para el token principal

// --- Funciones manuales de localStorage (OBSOLETAS para el token de sesión) ---
// Estas funciones ya no deben usarse para gestionar el token de sesión de Supabase.
// El cliente Supabase JS maneja esto internamente. Se dejan aquí comentadas
// o con advertencias por si se usan para otros fines, pero idealmente deberían eliminarse.

/*
export const getToken = (): string | null => {
  if (typeof window !== "undefined") {
    console.warn("getToken() manual llamado. Supabase maneja la sesión. Considera eliminar esta función.");
    // return localStorage.getItem(AUTH_TOKEN_KEY); // Evitar leer directamente
    return null; // Devolver null para evitar conflictos
  }
  return null;
};

export const setToken = (token: string): void => {
   if (typeof window !== "undefined") {
     console.warn("setToken() manual llamado. Supabase maneja la sesión. Considera eliminar esta función.");
     // localStorage.setItem(AUTH_TOKEN_KEY, token); // Evitar escribir directamente
   }
};

export const removeToken = (): void => {
   if (typeof window !== "undefined") {
     console.warn("removeToken() manual llamado. Usa supabase.auth.signOut(). Considera eliminar esta función.");
     // localStorage.removeItem(AUTH_TOKEN_KEY); // Evitar eliminar directamente
   }
};
*/
// --- FIN Funciones localStorage obsoletas ---


// --- Interfaz User del Frontend (sin cambios) ---
// Define la estructura del usuario que usaremos en el frontend.
// Esta interfaz se poblará con datos de la sesión de Supabase via useAuth.
export interface User {
  userId: string;    // Mapeado desde Supabase User ID (user.id)
  email?: string;    // Mapeado desde Supabase User Email (user.email)
  name?: string;     // Mapeado desde Supabase User Metadata (user.user_metadata.full_name o name)
  companyId?: string; // Mapeado desde Supabase App Metadata (user.app_metadata.company_id)
  roles?: string[];  // Mapeado desde Supabase App Metadata (user.app_metadata.roles)
  // Añade otros campos necesarios del objeto User de Supabase si los necesitas en el frontend
}

// --- getUserFromToken ELIMINADO ---
// Ya no necesitamos decodificar el token manualmente en el frontend.
// La información del usuario vendrá directamente del objeto User/Session de Supabase
// gestionado por el hook useAuth.
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

import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';
import { User as AppUser } from '@/lib/auth/helpers';
import type { Session, User as SupabaseUser, AuthError, SignInWithPasswordCredentials } from '@supabase/supabase-js';
import { toast } from "sonner";
import { ensureCompanyAssociation, ApiError as EnsureCompanyApiError } from '@/lib/api';

interface AuthContextType {
  user: AppUser | null;
  session: Session | null;
  isLoading: boolean;
  signInWithPassword: (credentials: SignInWithPasswordCredentials) => Promise<void>;
  signUp: (params: {
    email: string;
    password: string;
    options?: {
      data?: object;
      emailRedirectTo?: string;
    };
  }) => Promise<{ data: { user: SupabaseUser | null; session: Session | null; }; error: AuthError | null; }>;
  signOut: () => Promise<void>;
}

const defaultAuthContextValue: AuthContextType = {
  user: null,
  session: null,
  isLoading: true,
  signInWithPassword: async () => { console.error("signInWithPassword called outside of AuthProvider"); throw new Error("Not initialized"); },
  signUp: async () => { console.error("signUp called outside of AuthProvider"); return { data: { user: null, session: null }, error: new Error("Not initialized") as AuthError }; },
  signOut: async () => { console.error("signOut called outside of AuthProvider"); },
};

const AuthContext = createContext<AuthContextType>(defaultAuthContextValue);

interface AuthProviderProps {
  children: React.ReactNode;
}

const mapSupabaseUserToAppUser = (supabaseUser: SupabaseUser | null | undefined): AppUser | null => {
    if (!supabaseUser) return null;
    const companyIdRaw = supabaseUser.app_metadata?.company_id;
    const companyId = companyIdRaw ? String(companyIdRaw) : undefined;
    const roles = supabaseUser.app_metadata?.roles as string[] | undefined;
    return {
        userId: supabaseUser.id, email: supabaseUser.email,
        name: supabaseUser.user_metadata?.full_name || supabaseUser.user_metadata?.name,
        companyId: companyId, roles: roles,
    };
};

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<AppUser | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();
  const ensureCompanyCallPending = useRef(false);

  const signOut = useCallback(async () => {
    setIsLoading(true);
    try {
      const { error } = await supabase.auth.signOut();
      if (error) { toast.error("Logout Failed", { description: error.message }); }
      else { console.log("AuthProvider: signOut successful."); }
    } catch (error) { toast.error("Logout Failed", { description: "An unexpected error occurred." }); }
    finally { /* Dejar que onAuthStateChange maneje isLoading */ }
  }, []);

  useEffect(() => {
    console.log("AuthProvider: Setting up auth state listener.");
    setIsLoading(true);
    supabase.auth.getSession().then(async ({ data: { session: initialSession } }) => {
        setSession(initialSession);
        const mappedUser = mapSupabaseUserToAppUser(initialSession?.user);
        setUser(mappedUser);
        if (initialSession && mappedUser && !mappedUser.companyId && !ensureCompanyCallPending.current) {
            ensureCompanyCallPending.current = true;
            try {
                await ensureCompanyAssociation(); await supabase.auth.refreshSession();
            } catch (error) { toast.error("Company Setup Failed", { description: error instanceof EnsureCompanyApiError ? error.message : "Could not associate company." }); }
            finally { ensureCompanyCallPending.current = false; }
        }
        setIsLoading(false);
    }).catch(error => { console.error("AuthProvider: Error fetching initial session:", error); setIsLoading(false); });
    const { data: authListener } = supabase.auth.onAuthStateChange( async (event, newSession) => {
        setSession(newSession); const mappedUser = mapSupabaseUserToAppUser(newSession?.user); setUser(mappedUser);
        if (event === 'SIGNED_IN' && newSession && mappedUser && !mappedUser.companyId && !ensureCompanyCallPending.current) {
            ensureCompanyCallPending.current = true;
            try {
                await ensureCompanyAssociation(); await supabase.auth.refreshSession();
            } catch (error) { toast.error("Company Setup Failed", { description: error instanceof EnsureCompanyApiError ? error.message : "Could not associate company." }); }
            finally { ensureCompanyCallPending.current = false; }
        }
        if (event === 'SIGNED_OUT') { if (pathname?.startsWith('/chat') || pathname?.startsWith('/knowledge') || pathname?.startsWith('/settings')) { router.push('/'); } }
        if (isLoading) setIsLoading(false);
    });
    return () => { authListener?.subscription.unsubscribe(); };
  }, [isLoading, router, pathname, signOut]);

  const signInWithPassword = useCallback(async (credentials: SignInWithPasswordCredentials) => {
    setIsLoading(true);
    try {
      const { error } = await supabase.auth.signInWithPassword(credentials);
      if (error) { throw error; }
    } finally { setIsLoading(false); }
  }, []);

  const signUp = useCallback(async (params: {
    email: string;
    password: string;
    options?: {
      data?: object;
      emailRedirectTo?: string;
    };
  }) => {
    setIsLoading(true);
    try {
      const { email, password, options } = params;
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        ...options,
      });
      if (error) {
        toast.error("Registration Failed", { description: error.message || "Could not create account." });
      } else if (data.user && data.user.identities?.length === 0) {
        toast.success("Registration Submitted", { description: `Please check your email (${email}) to confirm.` });
      } else if (data.user) {
        toast.success("Registration Successful");
      } else {
        toast.warning("Registration Status Unknown");
      }
      return { data, error };
    } catch (error) {
      toast.error("Registration Failed", { description: "An unexpected error occurred." });
      return { data: { user: null, session: null }, error: error as AuthError };
    } finally {
      setIsLoading(false);
    }
  }, []);

  const providerValue: AuthContextType = {
    user, session, isLoading, signInWithPassword, signUp, signOut,
  };

  return (
    <AuthContext.Provider value={providerValue}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (context === undefined) { throw new Error('useAuth must be used within an AuthProvider'); }
    if (context === defaultAuthContextValue && typeof window !== 'undefined') { console.warn("useAuth hook used possibly outside of AuthProvider or before initialization."); }
    return context;
};
```

## File: `lib\supabaseClient.ts`
```ts
// lib/supabaseClient.ts
import { createClient, SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl) {
  throw new Error("Missing environment variable NEXT_PUBLIC_SUPABASE_URL");
}
if (!supabaseAnonKey) {
  throw new Error("Missing environment variable NEXT_PUBLIC_SUPABASE_ANON_KEY");
}

// Crear una única instancia del cliente Supabase para ser usada en toda la app
// Nota: El cliente Supabase maneja la sesión internamente.
export const supabase: SupabaseClient = createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
        // Supabase JS client maneja el almacenamiento del token automáticamente (localStorage por defecto)
        // autoRefreshToken: true, // Habilitado por defecto
        // persistSession: true, // Habilitado por defecto
        // detectSessionInUrl: true, // Habilitado por defecto (para OAuth y Magic Links/Confirmación)
    }
});

console.log("Supabase client initialized.");
```

## File: `lib\utils.ts`
```ts
// File: lib/utils.ts
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// (+) AÑADIR ESTA FUNCIÓN COMPLETA
/**
 * Retrieves the API Gateway URL from environment variables.
 * Throws an error if the environment variable is not set during runtime.
 * @returns {string} The API Gateway URL.
 */
export function getApiGatewayUrl(): string {
    const apiUrl = process.env.NEXT_PUBLIC_API_GATEWAY_URL;

    if (!apiUrl) {
        // En el lado del cliente o si la variable simplemente no está definida,
        // podríamos querer lanzar un error o retornar un valor por defecto/vacío
        // dependiendo de cómo queremos manejar este caso. Lanzar un error es más seguro
        // para detectar problemas de configuración temprano.
        console.error("Error: NEXT_PUBLIC_API_GATEWAY_URL environment variable is not set.");
        // Puedes decidir lanzar un error en producción/staging
        if (process.env.NODE_ENV !== 'development') {
             throw new Error("API Gateway URL is not configured. Please set NEXT_PUBLIC_API_GATEWAY_URL.");
        } else {
            // En desarrollo, podrías retornar una URL por defecto o un string vacío
            // para evitar bloquear el desarrollo, pero con una advertencia clara.
            console.warn("Returning default/empty URL for API Gateway in development.");
            return "http://localhost:8080"; // O un string vacío "" si prefieres
        }
    }
     // Eliminar la barra diagonal final si existe para evitar dobles barras
    return apiUrl.endsWith('/') ? apiUrl.slice(0, -1) : apiUrl;
}
// FIN DE LA FUNCIÓN AÑADIDA
```

## File: `next-env.d.ts`
```ts
/// <reference types="next" />
/// <reference types="next/image-types/global" />

// NOTE: This file should not be edited
// see https://nextjs.org/docs/app/api-reference/config/typescript for more information.

```
