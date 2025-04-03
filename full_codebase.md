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
// Purpose: Main chat interface page, using useAuth for state and API calls via lib/api.
"use client";

import React, { useState, useEffect, useRef, useCallback } from 'react';
// --- CORRECTION: Import usePathname ---
import { useParams, useRouter, usePathname } from 'next/navigation';
// ---------------------------------------
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ChatInput } from '@/components/chat/chat-input';
import { ChatMessage, Message } from '@/components/chat/chat-message';
import { RetrievedDocumentsPanel } from '@/components/chat/retrieved-documents-panel';
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import {
    postQuery,
    getChatMessages,
    deleteChat, // Import deleteChat
    RetrievedDoc,
    ApiError,
    mapApiMessageToFrontend,
    mapApiSourcesToFrontend,
    ChatSummary, // Import ChatSummary for potential use
} from '@/lib/api'; // Use functions from centralized API module
import { toast } from "sonner"; // Use sonner for notifications
import { PanelRightClose, PanelRightOpen, BrainCircuit, Loader2, AlertCircle, PlusCircle } from 'lucide-react'; // Added PlusCircle
import { Skeleton } from '@/components/ui/skeleton';
import { useAuth } from '@/lib/hooks/useAuth'; // Import the CORRECTED auth hook

// Initial welcome message for new chats
const welcomeMessage: Message = {
    id: 'initial-welcome',
    role: 'assistant',
    content: '¡Hola! Soy Atenex. Pregúntame cualquier cosa sobre tus documentos.',
    created_at: new Date().toISOString(),
};

export default function ChatPage() {
    const params = useParams();
    const router = useRouter();
    // --- CORRECTION: Instantiate usePathname ---
    const pathname = usePathname();
    // ------------------------------------------
    const { session, user, isLoading: isAuthLoading, signOut } = useAuth(); // Get auth state

    // Extract chatId from dynamic route parameters
    const chatIdParam = params.chatId ? (Array.isArray(params.chatId) ? params.chatId[0] : params.chatId) : undefined;
    const [chatId, setChatId] = useState<string | undefined>(chatIdParam);

    // Component State
    const [messages, setMessages] = useState<Message[]>([welcomeMessage]);
    const [retrievedDocs, setRetrievedDocs] = useState<RetrievedDoc[]>([]);
    const [isSending, setIsSending] = useState(false); // Is a new message being sent?
    const [isLoadingHistory, setIsLoadingHistory] = useState(false); // Is chat history loading?
    const [historyError, setHistoryError] = useState<string | null>(null);
    const [isPanelOpen, setIsPanelOpen] = useState(true); // Sources panel visibility

    // Refs
    const scrollAreaRef = useRef<HTMLDivElement>(null);
    // Ref to track the last chatId for which history was fetched to prevent redundant fetches
    const fetchedChatIdRef = useRef<string | 'welcome' | undefined>(undefined);

    // Effect to sync state chatId with route param chatId
    useEffect(() => {
        setChatId(chatIdParam);
    }, [chatIdParam]);

    // --- Effect to Load Chat History ---
    useEffect(() => {
        const bypassAuth = process.env.NEXT_PUBLIC_BYPASS_AUTH === 'true';
        const currentFetchTarget = chatId || 'welcome'; // Target 'welcome' if no chatId

        // 1. Skip if auth is still loading (and not bypassing)
        if (!bypassAuth && isAuthLoading) {
            console.log("ChatPage: Waiting for auth state...");
            // Optionally set loading state here, or rely on the main loading display
            // setIsLoadingHistory(true); // Can show loading specifically for history area
            return;
        }

        // 2. Skip if not authenticated (and auth has loaded)
        if (!bypassAuth && !session) {
            console.log("ChatPage: Not authenticated, cannot load history.");
            setMessages([welcomeMessage]);
            setHistoryError("Please log in to view or start chats.");
            fetchedChatIdRef.current = undefined; // Reset fetch ref
            setIsLoadingHistory(false);
            return;
        }

        // 3. Skip if this chatId (or welcome state) has already been fetched
        if (fetchedChatIdRef.current === currentFetchTarget) {
             console.log(`ChatPage: History for ${currentFetchTarget} already loaded or being loaded.`);
             // Ensure loading state is false if we skip
             if (isLoadingHistory) setIsLoadingHistory(false);
             return;
        }

        // 4. Fetch History or Reset for New Chat
        console.log(`ChatPage: Auth ready. Target: ${currentFetchTarget}. Fetching history or resetting...`);
        setIsLoadingHistory(true);
        setHistoryError(null);
        fetchedChatIdRef.current = currentFetchTarget; // Mark as being fetched

        if (chatId) {
            // Fetch history for existing chat
            getChatMessages(chatId)
                .then(apiMessages => {
                    // Sort messages by creation time (belt-and-suspenders)
                    apiMessages.sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime());
                    const mappedMessages = apiMessages.map(mapApiMessageToFrontend);
                    setMessages(mappedMessages.length > 0 ? mappedMessages : [welcomeMessage]); // Show welcome if history is empty
                    console.log(`ChatPage: History loaded for ${chatId}, ${mappedMessages.length} messages.`);
                })
                .catch(error => {
                    console.error(`ChatPage: Error loading history for ${chatId}:`, error);
                    let message = "Error loading chat history.";
                    if (error instanceof ApiError) {
                        message = error.message || message;
                        if (error.status === 404) {
                            toast.error("Chat Not Found", { description: `Chat ${chatId} not found. Starting a new chat.` });
                            router.replace('/chat'); // Redirect to new chat page
                            return; // Stop processing
                        }
                        if (error.status === 401 || error.status === 403) {
                            toast.error("Authentication Error", { description: "Session expired. Please log in again." });
                            signOut(); // Force logout on auth errors
                        }
                    } else if (error instanceof Error) { message = error.message; }
                    setHistoryError(message);
                    setMessages([welcomeMessage]); // Show welcome on error
                    toast.error("Failed to Load Chat", { description: message });
                })
                .finally(() => {
                    setIsLoadingHistory(false);
                });
        } else {
            // No chatId, reset to welcome state for a new chat
            console.log("ChatPage: No chat ID, setting welcome message.");
            setMessages([welcomeMessage]);
            setRetrievedDocs([]);
            setIsLoadingHistory(false); // Finished "loading" the welcome state
        }

    // Dependencies: Re-run when chatId, session, or auth loading state changes.
    }, [chatId, session, isAuthLoading, router, signOut, isLoadingHistory]); // Added isLoadingHistory to deps

    // --- Effect for Scrolling to Bottom ---
    useEffect(() => {
        if (scrollAreaRef.current) {
            const scrollElement = scrollAreaRef.current;
            // Use requestAnimationFrame for smoother scrolling after render
            requestAnimationFrame(() => {
                 // Scroll only if the user isn't manually scrolled up significantly
                 // (e.g., allow scrolling up by more than 100px without forcing down)
                 const isScrolledUp = scrollElement.scrollHeight - scrollElement.scrollTop - scrollElement.clientHeight > 100;
                 if (!isScrolledUp) {
                    scrollElement.scrollTo({ top: scrollElement.scrollHeight, behavior: 'smooth' });
                 }
            });
        }
    // Dependency: Run whenever messages array changes length or content, or when sending state changes.
    }, [messages, isSending]);

    // --- Function to Send a Message ---
    const handleSendMessage = useCallback(async (query: string) => {
        const bypassAuth = process.env.NEXT_PUBLIC_BYPASS_AUTH === 'true';
        const isAuthenticated = !!session || bypassAuth;

        // Basic validation
        if (!query.trim()) {
            toast.warning("Cannot send empty message.");
            return;
        }
        if (isSending) {
            toast.warning("Please wait for the previous response.", { id: 'sending-throttle'});
            return;
        }
         if (!isAuthenticated) {
             toast.error("Authentication Error", { description: "Please log in to send messages." });
             return;
         }

        // Add user message immediately to UI
        const userMessage: Message = {
            id: `client-user-${Date.now()}`, // Temporary client-side ID
            role: 'user',
            content: query,
            created_at: new Date().toISOString()
        };
        // Use functional update to ensure we're working with the latest state
        setMessages(prev => [...prev, userMessage]);
        setIsSending(true);
        setRetrievedDocs([]); // Clear previous documents

        const currentChatIdForApi = chatId || null; // Send null for new chats

        console.log(`ChatPage: Sending query to API (Chat ID: ${currentChatIdForApi || 'New'})...`);

        try {
            // Call the API
            const response = await postQuery({ query, chat_id: currentChatIdForApi });
            const returnedChatId = response.chat_id; // API MUST return the chat_id

            // Map sources and create assistant message
            const mappedSources = mapApiSourcesToFrontend(response.retrieved_documents);
            const assistantMessage: Message = {
                id: `client-assistant-${Date.now()}`, // Temporary client-side ID
                role: 'assistant',
                content: response.answer,
                sources: mappedSources,
                created_at: new Date().toISOString() // Use current time for assistant msg
            };

            // Add assistant message to state
            setMessages(prev => [...prev, assistantMessage]);
            setRetrievedDocs(mappedSources || []);

            // If it was a new chat, update URL and state without full page reload
            if (!currentChatIdForApi && returnedChatId) {
                console.log(`ChatPage: New chat created with ID: ${returnedChatId}. Updating URL.`);
                setChatId(returnedChatId); // Update state
                fetchedChatIdRef.current = returnedChatId; // Update fetch ref to prevent immediate reload
                // Use router.replace to update URL without adding to history
                router.replace(`/chat/${returnedChatId}`, { scroll: false });
            }

            // Auto-open sources panel if closed and sources were found
            if (mappedSources && mappedSources.length > 0 && !isPanelOpen) {
                setIsPanelOpen(true);
            }
             console.log(`ChatPage: Query successful. Answer received for chat ${returnedChatId}.`);

        } catch (error) {
            console.error("ChatPage: Query failed:", error);
            let errorMessage = "Sorry, an error occurred while processing your request.";
            if (error instanceof ApiError) {
                 errorMessage = error.message || `API Error (${error.status})`;
                 if (error.status === 401 || error.status === 403) {
                     errorMessage = "Authentication error. Please log in again.";
                     signOut(); // Force logout
                 }
             } else if (error instanceof Error) {
                 errorMessage = `Error: ${error.message}`;
             }

            // Add error message to chat
            const errorMsgObj: Message = {
                id: `error-${Date.now()}`,
                role: 'assistant',
                content: errorMessage,
                isError: true,
                created_at: new Date().toISOString()
            };
            setMessages(prev => [...prev, errorMsgObj]);
            toast.error("Query Failed", { description: errorMessage });

        } finally {
            setIsSending(false); // Reset sending state
        }
    // Dependencies: Include all state and functions used
    }, [chatId, isSending, session, router, isPanelOpen, signOut]);

    // Toggle for the sources panel
    const handlePanelToggle = () => { setIsPanelOpen(!isPanelOpen); };

    // Navigate to start a new chat
    const handleNewChat = () => {
        console.log("ChatPage: Starting new chat.");
        // --- CORRECTION: Use the 'pathname' variable from the hook ---
        if (pathname !== '/chat') {
             router.push('/chat');
        } else {
        // ------------------------------------------------------------
            // If already on /chat, just reset the state manually
            setChatId(undefined);
            setMessages([welcomeMessage]);
            setRetrievedDocs([]);
            setHistoryError(null);
            fetchedChatIdRef.current = 'welcome'; // Mark welcome state as "loaded"
            setIsLoadingHistory(false);
            console.log("ChatPage: Already on /chat, resetting state.");
        }
    };


    // --- Rendering Logic ---
    const renderChatContent = () => {
        // 1. Show loading indicator if auth is loading OR history is loading
        if (isAuthLoading || isLoadingHistory) {
            return (
                <div className="flex flex-col items-center justify-center h-full p-8 text-center">
                    <Loader2 className="h-8 w-8 animate-spin text-muted-foreground mb-4" />
                    <p className="text-muted-foreground">
                         {isAuthLoading ? "Authenticating..." : "Loading chat history..."}
                    </p>
                </div>
            );
        }

        // 2. Show error message if history loading failed
        if (historyError) {
             return (
                 <div className="flex flex-col items-center justify-center h-full p-8 text-center">
                     <AlertCircle className="h-8 w-8 text-destructive mb-4" />
                     <p className="text-destructive font-medium mb-2">Error Loading Chat</p>
                     <p className="text-sm text-muted-foreground mb-4">{historyError}</p>
                     {/* Optionally add a retry button if error is not auth-related */}
                     {/* <Button variant="outline" size="sm" onClick={retryFetch}>Retry</Button> */}
                 </div>
             );
         }

        // 3. Render messages
        // Filter out the initial welcome message if other messages exist
        const messagesToRender = messages.filter(m => !(m.id === 'initial-welcome' && messages.length > 1));
        return (
             <div className="space-y-4 pr-4 pb-4"> {/* Padding for scrollbar and input area */}
                 {messagesToRender.map((message) => (
                     <ChatMessage key={message.id} message={message} />
                 ))}
                 {/* Skeleton "thinking" indicator while waiting for response */}
                 {isSending && (
                     <div className="flex items-start space-x-3">
                         <Skeleton className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                             <BrainCircuit className="h-5 w-5 text-primary"/>
                         </Skeleton>
                         <div className="space-y-2 flex-1 pt-1">
                              <Skeleton className="h-4 w-16" />
                         </div>
                     </div>
                 )}
             </div>
        );
    };

    return (
        <div className="flex flex-col h-full"> {/* Ensure outer div takes full height */}
            {/* Button to start a new chat */}
            <div className="absolute top-2 left-2 z-10">
                 <Button
                    variant="outline"
                    size="sm"
                    onClick={handleNewChat}
                    disabled={isSending || isLoadingHistory || isAuthLoading} // Disable during critical operations
                    title="Start a new chat"
                 >
                     <PlusCircle className="h-4 w-4 mr-2" />
                     New Chat
                 </Button>
             </div>

            <ResizablePanelGroup direction="horizontal" className="flex-1"> {/* Panel group takes remaining height */}
                <ResizablePanel defaultSize={isPanelOpen ? 70 : 100} minSize={30}>
                    <div className="flex h-full flex-col relative">
                        {/* Button to toggle sources panel */}
                        <div className="absolute top-2 right-2 z-10">
                            <Button onClick={handlePanelToggle} variant="ghost" size="icon" aria-label={isPanelOpen ? 'Close Sources Panel' : 'Open Sources Panel'}>
                                {isPanelOpen ? <PanelRightClose className="h-5 w-5" /> : <PanelRightOpen className="h-5 w-5" />}
                            </Button>
                        </div>

                        {/* Chat Messages Area */}
                        <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
                            {renderChatContent()}
                        </ScrollArea>

                        {/* Chat Input Area */}
                        <div className="border-t p-4 bg-muted/30 shrink-0">
                            <ChatInput
                                onSendMessage={handleSendMessage}
                                isLoading={isSending || isLoadingHistory || isAuthLoading} // Disable input comprehensively
                            />
                        </div>
                    </div>
                </ResizablePanel>

                {/* Sources Panel (Conditional) */}
                {isPanelOpen && (
                    <>
                        <ResizableHandle withHandle />
                        <ResizablePanel defaultSize={30} minSize={20} maxSize={50}>
                            <RetrievedDocumentsPanel
                                documents={retrievedDocs}
                                isLoading={isSending} // Show loading in panel only when actively waiting for response
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
// Purpose: Layout for authenticated sections, handling route protection.
"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Sidebar } from '@/components/layout/sidebar';
import { Header } from '@/components/layout/header';
import { useAuth } from '@/lib/hooks/useAuth'; // Import the CORRECTED hook
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react'; // For loading spinner
// --- CORRECTION: Import toast from sonner ---
import { toast } from 'sonner';
// ------------------------------------------

export default function AppLayout({ children }: { children: React.ReactNode }) {
  // Get auth state from the hook
  const { session, user, isLoading, signOut } = useAuth();
  const router = useRouter();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  // Determine if authentication bypass is enabled (for local dev)
  const bypassAuth = process.env.NEXT_PUBLIC_BYPASS_AUTH === 'true';

  useEffect(() => {
    // 1. Handle Bypass: If bypass is active, log it and do nothing else.
    if (bypassAuth) {
      console.warn("AppLayout: Auth check SKIPPED due to NEXT_PUBLIC_BYPASS_AUTH=true.");
      return;
    }

    // 2. Handle Loading: If auth state is still loading, do nothing yet.
    if (isLoading) {
      console.log("AppLayout: Waiting for auth state to load...");
      return;
    }

    // 3. Handle No Session: If auth has loaded and there's NO session, redirect to login/home.
    if (!session) {
      console.log("AppLayout: No session found after loading, redirecting to /");
      router.replace('/'); // Use replace to avoid adding to browser history
      return;
    }

    // 4. Handle Session OK, but Missing Critical User Data (e.g., companyId):
    // If a session exists, but the mapped 'user' object is null or lacks essential data
    // (like companyId, if it's strictly required *after* the ensure-company flow),
    // it might indicate an incomplete setup or inconsistent state.
    // The API Gateway requires companyId for most backend calls.
    // The ensure-company flow in useAuth should handle adding it, but if something
    // goes wrong or the user state is invalid, we might need to force a logout.
    if (session && (!user || !user.companyId)) {
        // This condition checks if we have a session, but the user mapping failed OR
        // the user is mapped but explicitly lacks a companyId AFTER the initial auth flow.
        console.error(`AppLayout: Session exists but user data is incomplete (User: ${!!user}, CompanyID: ${user?.companyId}). Forcing logout.`);
        // --- CORRECTION: 'toast' is now defined via import ---
        toast.error("Incomplete Account Setup", {
            description: "Your account setup seems incomplete (missing company association). Please log in again.",
            duration: 7000,
        });
        // ----------------------------------------------------
        signOut(); // Force sign out
        // No need to redirect here, signOut will trigger an auth state change,
        // leading to the !session condition above in the next effect run.
        return;
    }

    // 5. Authenticated and Valid: If we reach here, isLoading is false, session exists,
    // and the user object (with companyId) is valid. Allow rendering.
    console.log("AppLayout: Auth check passed. User is authenticated and valid.");

  // Dependencies: Trigger effect when loading state, session, user, or bypass status changes.
  // Include router and signOut as they are used within the effect.
  }, [isLoading, session, user, bypassAuth, router, signOut]);

  // --- Render Loading State ---
  // Show a full-screen loader ONLY if bypass is OFF AND auth is loading.
  if (!bypassAuth && isLoading) {
    return (
      <div className="flex h-screen items-center justify-center bg-background">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
        {/* Optional: Add loading text */}
         <p className="mt-4 text-muted-foreground">Loading session...</p>
      </div>
    );
  }

  // --- Render Auth Wall ---
  // Prevent rendering the protected layout if bypass is OFF AND
  // (auth is still loading OR there's no session OR user data is invalid)
  // This prevents content flashing before redirection or state resolution.
  if (!bypassAuth && (isLoading || !session || !user || !user.companyId)) {
     // We already handle redirection in useEffect. Render null or a minimal loader
     // while waiting for the redirect or state update. Using the same loader
     // as above provides consistency.
     console.log("AppLayout: Auth guard preventing render (isLoading, no session, or invalid user).");
     return (
       <div className="flex h-screen items-center justify-center bg-background">
         <Loader2 className="h-12 w-12 animate-spin text-primary" />
       </div>
     );
  }

  // --- Render Protected Layout ---
  // If we reach here, user is authenticated (or bypass is on).
  console.log("AppLayout: Rendering protected layout...");
  return (
    <div className="flex h-screen bg-secondary/30 dark:bg-muted/30 overflow-hidden">
      <ResizablePanelGroup direction="horizontal" className="h-full items-stretch">
          <ResizablePanel
              collapsible collapsedSize={4} minSize={15} maxSize={25} defaultSize={20}
              onCollapse={() => setIsSidebarCollapsed(true)}
              onExpand={() => setIsSidebarCollapsed(false)}
              className={cn(
                  "transition-all duration-300 ease-in-out bg-background dark:bg-card", // Added background color
                  isSidebarCollapsed ? "min-w-[50px] max-w-[50px]" : "min-w-[200px]"
              )}
              order={1} // Ensure sidebar comes first visually
          >
              {/* Pass isCollapsed state to Sidebar */}
              <Sidebar isCollapsed={isSidebarCollapsed} />
          </ResizablePanel>
          <ResizableHandle withHandle className="bg-border" />
          <ResizablePanel defaultSize={80} minSize={30} order={2}>
              <div className="flex h-full flex-col">
                  {/* Header component - No need to pass props if Header uses useAuth directly */}
                  <Header />
                  <main className="flex-1 overflow-y-auto bg-background p-4 md:p-6 lg:p-8">
                      {/* Render the specific page content */}
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
// Purpose: Contact page, fixing the original error by using 'session' instead of 'token'.
"use client";

import React from 'react';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { APP_NAME } from '@/lib/constants';
import { useAuth } from '@/lib/hooks/useAuth'; // Import the CORRECTED hook
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Mail, Phone, Linkedin, MessageCircle, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils'; // Import cn for conditional classes
import { toast } from 'sonner';

export default function ContactPage() {
  const router = useRouter();
  // --- CORRECTION: Use 'session' and 'isLoading' from useAuth ---
  // The 'token' is inside session?.access_token if needed,
  // but usually checking for session existence is enough.
  const { session, isLoading: isAuthLoading } = useAuth();
  // -----------------------------------------------------------

  // Determine authentication status based on loading state and session presence
  const isAuthenticated = !isAuthLoading && !!session;

  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Header/Navigation (similar to app/page.tsx) */}
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-md border-b">
        <div className="container flex items-center justify-between h-16 py-4 px-4 md:px-6">
          {/* Use button with onClick for SPA navigation */}
          <button onClick={() => router.push('/')} className="font-bold text-2xl text-primary focus:outline-none focus:ring-2 focus:ring-ring rounded-sm">
            {APP_NAME}
          </button>
          <nav className="flex items-center space-x-2 sm:space-x-4">
            <LinkButton href="/">Home</LinkButton>
            <LinkButton href="/about">About</LinkButton>
            <LinkButton href="/contact" isActive={true}>Contact</LinkButton> {/* Mark Contact as active */}
             <div className="ml-2"> {/* Container for Login/App button */}
                {/* Show loading spinner or appropriate button */}
                {isAuthLoading ? (
                    <Button variant="secondary" disabled={true} size="sm">
                        <Loader2 className="h-4 w-4 animate-spin" />
                    </Button>
                ) : isAuthenticated ? (
                    <Button variant="secondary" onClick={() => router.push('/chat')} size="sm">
                        Go to App
                    </Button>
                ) : (
                    <Button onClick={() => router.push('/login')} size="sm" className="transition-colors duration-150 hover:bg-primary/90 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
                        Login
                    </Button>
                )}
            </div>
          </nav>
        </div>
      </header>

      {/* Main Content - Contact Form */}
      <main className="container mx-auto px-4 py-16 md:py-24 flex-1">
        <section className="text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-foreground mb-6">
            Contact Us
          </h1>
          <p className="text-lg text-muted-foreground mb-12 max-w-2xl mx-auto">
            Have questions or feedback? We'd love to hear from you! Reach out using the form below or through our contact channels.
          </p>
        </section>

        <section className="max-w-lg mx-auto">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle>Send us a Message</CardTitle>
              <CardDescription>
                We typically respond within 1-2 business days.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {/* ContactForm component remains unchanged */}
              <ContactForm />
            </CardContent>
          </Card>
        </section>
      </main>

      {/* Footer (similar to app/page.tsx) */}
      <footer className="bg-muted/10 border-t py-8 mt-16">
        <div className="container text-center text-muted-foreground text-sm">
          © {new Date().getFullYear()} {APP_NAME}. All rights reserved.
        </div>
      </footer>
    </div>
  );
}

// Reusable Link Button Component (add isActive prop)
function LinkButton({ href, children, isActive = false }: { href: string; children: React.ReactNode; isActive?: boolean }) {
  const router = useRouter();
  return (
    <Button
        variant="link"
        onClick={() => router.push(href)}
        className={cn(
            "text-sm sm:text-base hover:text-primary/80 focus:outline-none focus:ring-2 focus:ring-ring rounded-sm px-1 sm:px-2",
            isActive ? "text-primary font-medium underline underline-offset-4" : "text-muted-foreground" // Style active link
        )}
     >
      {children}
    </Button>
  );
}

// Contact Form Component (remains the same, extracted for clarity)
function ContactForm() {
  // Basic form structure - add state management and submission logic as needed
  const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      console.log("Contact form submitted (implement submission logic)");
      toast.info("Form Submitted (Placeholder)", { description: "Contact form submission logic needs implementation."});
  }

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-foreground mb-1">
            Name:
          </label>
          <input
            type="text"
            id="name"
            required
            className="block w-full rounded-md border-input bg-background shadow-sm focus:border-ring focus:ring-ring/50 sm:text-sm p-2" // Use UI component styles
            placeholder="Your Name"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-foreground mb-1">
            Email:
          </label>
          <input
            type="email"
            id="email"
            required
             className="block w-full rounded-md border-input bg-background shadow-sm focus:border-ring focus:ring-ring/50 sm:text-sm p-2"
            placeholder="you@example.com"
          />
        </div>
        <div>
          <label htmlFor="message" className="block text-sm font-medium text-foreground mb-1">
            Message:
          </label>
          <textarea
            id="message"
            rows={4}
            required
            className="block w-full rounded-md border-input bg-background shadow-sm focus:border-ring focus:ring-ring/50 sm:text-sm p-2 min-h-[100px]"
            placeholder="Your Message"
          />
        </div>
        <Button type="submit" className="w-full">
          Send Message
        </Button>
      </form>

      {/* Contact Info Section */}
      <div className="space-y-3 pt-6 border-t">
         <h3 className="text-sm font-medium text-muted-foreground mb-2">Other ways to reach us:</h3>
        <ContactInfoItem Icon={Mail} label="Email:" href="mailto:info@atenex.ai" text="info@atenex.ai" />
        <ContactInfoItem Icon={Phone} label="Phone:" href="tel:+15551234567" text="+1 (555) 123-4567" />
        <ContactInfoItem Icon={Linkedin} label="LinkedIn:" href="https://linkedin.com/company/atenex" text="Atenex on LinkedIn" targetBlank={true} />
        <ContactInfoItem Icon={MessageCircle} label="WhatsApp:" href="https://wa.me/15551234567" text="Chat on WhatsApp" targetBlank={true}/>
      </div>
    </div>
  );
}

// Helper component for contact info items
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
import { Button, buttonVariants } from '@/components/ui/button'; // Import buttonVariants
import { useRouter } from 'next/navigation';
import { APP_NAME } from '@/lib/constants';
import { useAuth } from '@/lib/hooks/useAuth'; // Import the CORRECTED hook
import EmailConfirmationHandler from '@/components/auth/email-confirmation-handler'; // Handles email confirm links
import { cn } from '@/lib/utils';
import { Loader2, Home as HomeIcon, Info, Mail } from 'lucide-react'; // Added icons
import Link from 'next/link'; // Import the Link component

export default function HomePage() {
  const router = useRouter();
  // Get session and loading state from the auth hook
  const { session, isLoading: isAuthLoading } = useAuth();

  // Determine authentication status (only true if not loading AND session exists)
  const isAuthenticated = !isAuthLoading && !!session;

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-background via-background to-secondary/30 dark:to-muted/30">
      {/* Header/Navigation */}
      <header className="sticky top-0 z-50 w-full bg-background/80 backdrop-blur-md border-b border-border/50">
        <div className="container flex items-center justify-between h-16 px-4 md:px-6">
          {/* App Logo/Name */}
          <button
            onClick={() => router.push('/')}
            className="flex items-center gap-2 text-xl font-bold text-primary focus:outline-none focus:ring-2 focus:ring-ring rounded-sm"
          >
             {/* <img src="/logo.svg" alt={`${APP_NAME} logo`} className="h-6 w-6" /> Optional Logo */}
             <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                 <path d="M11.25 4.533A9.707 9.707 0 0 0 6 3a9.735 9.735 0 0 0-3.25.555.75.75 0 0 0-.5.707v14.5a.75.75 0 0 0 .5.707A9.716 9.716 0 0 0 6 21a9.707 9.707 0 0 0 5.25-1.533.75.75 0 0 0 .5-.68V5.213a.75.75 0 0 0-.5-.68ZM12.75 4.533A9.707 9.707 0 0 1 18 3a9.735 9.735 0 0 1 3.25.555.75.75 0 0 1 .5.707v14.5a.75.75 0 0 1-.5.707A9.716 9.716 0 0 1 18 21a9.707 9.707 0 0 1-5.25-1.533.75.75 0 0 1-.5-.68V5.213a.75.75 0 0 1 .5-.68Z" />
             </svg>
            <span>{APP_NAME}</span>
          </button>

          {/* Navigation Links */}
          <nav className="flex items-center space-x-1 sm:space-x-2">
            <LinkButton href="/" Icon={HomeIcon} isActive={true}>Home</LinkButton>
            <LinkButton href="/about" Icon={Info}>About</LinkButton>
            <LinkButton href="/contact" Icon={Mail}>Contact</LinkButton>

            {/* Auth Button Container */}
            <div className="pl-2 sm:pl-4">
                {isAuthLoading ? (
                    // Show loading spinner while checking auth state
                    <Button variant="secondary" disabled={true} size="sm" className="w-[90px]"> {/* Fixed width */}
                        <Loader2 className="h-4 w-4 animate-spin" />
                    </Button>
                ) : isAuthenticated ? (
                    // Show "Go to App" button if logged in
                    <Button variant="default" onClick={() => router.push('/chat')} size="sm" className="w-[90px]">
                        Go to App
                    </Button>
                ) : (
                    // Show "Login" button if logged out
                    <Button
                        variant="outline" // Use outline for login button on homepage
                        onClick={() => router.push('/login')}
                        size="sm"
                        className="w-[90px] transition-colors duration-150 hover:bg-accent hover:text-accent-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    >
                        Login
                    </Button>
                )}
            </div>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-16 md:py-24 flex-1 flex flex-col items-center justify-center text-center">
         {/* Hero Section */}
         <section>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-foreground mb-6 leading-tight">
                Unlock Your Company's Knowledge with <span className="text-primary">{APP_NAME}</span>
            </h1>
            <p className="text-lg sm:text-xl text-muted-foreground mb-10 max-w-3xl mx-auto">
                Ask questions in natural language and get instant, accurate answers sourced directly from your organization's documents and data.
            </p>
            {/* Call to Action Button */}
            {isAuthLoading ? (
                 <Button size="lg" disabled={true} className="w-48">
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" /> Loading...
                 </Button>
            ) : (
              <Button
                  size="lg"
                  onClick={() => isAuthenticated ? router.push('/chat') : router.push('/register')}
                  className={cn(
                      "w-48 transition-all duration-150 ease-in-out transform hover:scale-105",
                      "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus:outline-none"
                  )}
              >
                  {isAuthenticated ? 'Go to Chat' : 'Get Started Free'}
              </Button>
            )}
            {!isAuthenticated && !isAuthLoading && (
                 <p className="text-xs text-muted-foreground mt-3">
                     Already have an account? <Link href="/login" className="text-primary hover:underline">Log In</Link>
                 </p>
            )}
         </section>

         {/* Feature Section (Optional) */}
         <section className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl w-full">
             <FeatureCard
                 title="Intelligent Search"
                 description="Find the exact information you need instantly using natural language queries. No more keyword guessing."
                 icon="Search"
              />
             <FeatureCard
                 title="Centralized Knowledge"
                 description="Break down information silos. Access your entire organization's collective knowledge in one secure place."
                 icon="Library"
             />
             <FeatureCard
                 title="Enhanced Productivity"
                 description="Empower your team with faster access to relevant information, enabling quicker, data-driven decisions."
                  icon="Zap"
             />
         </section>

        {/* Handler for email confirmation links (invisible component) */}
        <EmailConfirmationHandler />
      </main>

      {/* Footer */}
      <footer className="bg-muted/10 border-t py-8 mt-16">
        <div className="container text-center text-muted-foreground text-sm">
          © {new Date().getFullYear()} {APP_NAME}. All rights reserved. | <Link href="/privacy" className="hover:text-primary">Privacy Policy</Link> | <Link href="/terms" className="hover:text-primary">Terms of Service</Link>
        </div>
      </footer>
    </div>
  );
}

// Reusable Link Button Component for Header
function LinkButton({ href, children, Icon, isActive = false }: { href: string; children: React.ReactNode; Icon: React.ElementType; isActive?: boolean }) {
  const router = useRouter();
  return (
    <Button
        variant="ghost" // Use ghost variant for nav links
        onClick={() => router.push(href)}
        className={cn(
            "text-sm px-2 sm:px-3 py-1 h-8", // Adjust padding/height
            "hover:bg-accent/50 focus:outline-none focus:ring-1 focus:ring-ring rounded",
            isActive ? "text-primary font-medium bg-accent/50" : "text-muted-foreground hover:text-foreground"
        )}
     >
       <Icon className="h-4 w-4 mr-1 hidden sm:inline-block" /> {/* Show icon on larger screens */}
      {children}
    </Button>
  );
}

// Reusable Feature Card Component
function FeatureCard({ title, description, icon }: { title: string; description: string; icon: string }) {
   // Basic icon mapping - replace with actual icons or a library like Lucide
   const IconComponent = ({ name, ...props }: { name: string } & React.SVGProps<SVGSVGElement>) => {
        switch (name) {
            case 'Search': return <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" /></svg>;
            case 'Library': return <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" /></svg>;
            case 'Zap': return <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="m3.75 13.5 10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75Z" /></svg>;
            default: return <div className="w-6 h-6 bg-muted rounded" />; // Placeholder
        }
   };

  return (
    <div className="p-6 rounded-lg bg-card/50 hover:bg-card border border-border/50 hover:shadow-lg transition-all duration-200 text-left">
       <IconComponent name={icon} className="w-8 h-8 mb-3 text-primary" />
      <h3 className="text-lg font-semibold text-foreground mb-2">{title}</h3>
      <p className="text-sm text-muted-foreground">{description}</p>
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
// File: components/auth/login-form.tsx
// Purpose: Handles user login using email and password via the useAuth hook.
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
import { useAuth } from '@/lib/hooks/useAuth'; // Import the CORRECTED hook
import { AuthError } from '@supabase/supabase-js'; // Import Supabase error type

// Zod schema for login form validation
const loginSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters long.' }),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export function LoginForm() {
  // Get the signInWithPassword function from the auth context
  const { signInWithPassword } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '' },
    mode: 'onChange', // Validate on change for better UX
  });

  const onSubmit = async (data: LoginFormValues) => {
    setIsLoading(true);
    setError(null);
    try {
      console.log("LoginForm: Attempting login for:", data.email);
      // Call the signIn function from the context
      await signInWithPassword({
        email: data.email,
        password: data.password,
      });
      // **Success Handling**: If signInWithPassword succeeds, the AuthProvider's
      // onAuthStateChange listener will detect the SIGNED_IN event, update the
      // session/user state, and AppLayout will handle redirection or allow access.
      // No explicit navigation needed here upon success.
      console.log("LoginForm: signInWithPassword call succeeded. AuthProvider will handle state update.");
      // Keep isLoading true briefly to allow state update and potential redirect.
      // It will be reset by the AuthProvider or if an error occurs below.

    } catch (err) {
      // Catch errors thrown by the signInWithPassword context function
      console.error("LoginForm: signInWithPassword failed:", err);
      let errorMessage = 'Login failed. Please check your credentials and try again.'; // Default error

       // Check if it's a Supabase AuthError for more specific messages
       if (err instanceof AuthError) {
           errorMessage = err.message; // Use Supabase's message
           // Provide more user-friendly messages for common errors
           if (err.message.toLowerCase().includes("invalid login credentials")) {
               errorMessage = "Invalid email or password.";
           } else if (err.message.toLowerCase().includes("email not confirmed")) {
               errorMessage = "Your email address is not confirmed. Please check your inbox.";
           }
           // Add more specific checks if needed (e.g., rate limits)
       } else if (err instanceof Error) {
           // Handle other unexpected errors
           errorMessage = err.message;
       }

      setError(errorMessage);
      setIsLoading(false); // Stop loading indicator on error
    }
     // Removed finally block - isLoading should only be false on error here.
     // On success, let the page transition handle the visual change.
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
      {/* Error Alert */}
      {error && (
        <Alert variant="destructive" role="alert" aria-live="assertive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Login Failed</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {/* Email Input */}
      <div className="space-y-1">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          placeholder="name@example.com"
          autoComplete="email"
          required
          disabled={isLoading}
          aria-required="true"
          {...form.register('email')}
          aria-invalid={form.formState.errors.email ? 'true' : 'false'}
        />
        {form.formState.errors.email && (
          <p className="text-sm text-destructive" role="alert">{form.formState.errors.email.message}</p>
        )}
      </div>

      {/* Password Input */}
      <div className="space-y-1">
        <Label htmlFor="password">Password</Label>
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
        {form.formState.errors.password && (
          <p className="text-sm text-destructive" role="alert">{form.formState.errors.password.message}</p>
        )}
      </div>

      {/* Submit Button */}
      <Button type="submit" className="w-full" disabled={isLoading || !form.formState.isValid}>
        {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : 'Log In'}
      </Button>

      {/* Link to Register */}
      <div className="mt-4 text-center text-sm">
        Don't have an account?{" "}
        <Link href="/register" className="underline text-primary hover:text-primary/80 focus:outline-none focus:ring-1 focus:ring-ring rounded-sm">
          Sign Up
        </Link>
      </div>
       {/* Optional: Forgot Password Link */}
       {/*
       <div className="text-center text-sm mt-2">
         <Link href="/forgot-password" className="underline text-muted-foreground hover:text-primary/90 text-xs">
           Forgot Password?
         </Link>
       </div>
       */}
    </form>
  );
}
```

## File: `components\auth\register-form.tsx`
```tsx
// File: components/auth/register-form.tsx
// Purpose: Handles user registration using the useAuth hook.
"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Button, buttonVariants } from '@/components/ui/button'; // Import buttonVariants
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircle, Loader2, CheckCircle } from 'lucide-react';
import { useAuth } from '@/lib/hooks/useAuth'; // Import the CORRECTED hook
import { AuthError } from '@supabase/supabase-js'; // Import Supabase error type
import { cn } from '@/lib/utils'; // Import cn utility

// Zod schema for registration form validation
// REMOVED companyId - it will be handled by the ensure-company flow after login
const registerSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }).optional(), // Make name optional but validated if provided
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  password: z.string().min(8, { message: 'Password must be at least 8 characters long.' }) // Increased minimum length
    // Optional: Add password complexity requirements if desired
    // .regex(/[a-z]/, { message: "Password must contain a lowercase letter." })
    // .regex(/[A-Z]/, { message: "Password must contain an uppercase letter." })
    // .regex(/[0-9]/, { message: "Password must contain a number." })
    // .regex(/[^a-zA-Z0-9]/, { message: "Password must contain a special character." }),
});

type RegisterFormValues = z.infer<typeof registerSchema>;

export function RegisterForm() {
  // Get the signUp function from the auth context
  const { signUp } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false); // State to show success message

  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: { name: '', email: '', password: '' },
    mode: 'onChange', // Validate on change
  });

  const onSubmit = async (data: RegisterFormValues) => {
    setIsLoading(true);
    setError(null);
    setSuccess(false); // Reset success state on new submission
    try {
      console.log("RegisterForm: Attempting registration for:", data.email);

      // Call the signUp function from the context
      // Pass the name in the options.data field for user_metadata
      const { data: responseData, error: responseError } = await signUp({
        email: data.email,
        password: data.password,
        options: {
          data: {
            // Include name in user_metadata if provided
            // Use 'full_name' or 'name' depending on your Supabase setup preference
            ...(data.name && { name: data.name }),
          },
          // Optional: Specify where the confirmation email should redirect the user
          // emailRedirectTo: `${window.location.origin}/confirm-email`, // Example redirect
        },
      });

      // Check the response from the signUp function
      if (responseError) {
        // Error occurred during signup
        setError(responseError.message || 'Registration failed. Please try again.');
        setIsLoading(false);
      } else if (responseData.user && !responseData.session) {
        // Success: User created, needs email confirmation
        setSuccess(true);
        // Keep isLoading=true to prevent form resubmission while success message is shown
      } else if (responseData.user && responseData.session) {
         // Success: User created AND logged in (e.g., auto-confirm enabled)
         // AuthProvider will handle the session update and redirect/access.
         console.log("RegisterForm: Sign up successful and session created.");
         // You might want to show a brief success message before redirect,
         // but often the redirect itself is sufficient indication.
         // setSuccess(true); // Optionally show success message briefly
         setIsLoading(false); // Allow potential redirect to happen
      } else {
         // Unexpected outcome
         setError("An unexpected issue occurred during registration. Please try again.");
         setIsLoading(false);
      }

    } catch (err) {
      // Catch unexpected errors during the process
      console.error("RegisterForm: Unexpected error during submission:", err);
      let errorMessage = 'An unexpected error occurred. Please try again later.';
      if (err instanceof Error) {
        errorMessage = err.message;
      }
      setError(errorMessage);
      setIsLoading(false);
    }
  };

  // If registration was successful, show the confirmation message and hide the form
  if (success) {
    return (
       <Alert variant="default" className="border-green-300 bg-green-50 dark:border-green-700 dark:bg-green-900/30">
          <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" />
          <AlertTitle className="text-green-800 dark:text-green-200">Account Created!</AlertTitle>
          <AlertDescription className="text-green-700 dark:text-green-300">
             Success! Please check your email (<span className="font-medium">{form.getValues('email')}</span>) for a confirmation link to activate your account.
          </AlertDescription>
           <div className="mt-4 text-center">
              <Link href="/login" className={cn(buttonVariants({ variant: "link" }), "text-sm")}>
                 Go to Login
              </Link>
           </div>
       </Alert>
    );
  }

  // Render the form if not successful yet
  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
      {/* Error Alert */}
      {error && (
        <Alert variant="destructive" role="alert" aria-live="assertive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Registration Failed</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {/* Name Input (Optional) */}
      <div className="space-y-1">
        <Label htmlFor="name">Full Name (Optional)</Label>
        <Input
          id="name"
          type="text"
          placeholder="Your Name"
          autoComplete="name"
          disabled={isLoading}
          {...form.register('name')}
          aria-invalid={form.formState.errors.name ? 'true' : 'false'}
        />
        {form.formState.errors.name && (
          <p className="text-sm text-destructive" role="alert">{form.formState.errors.name.message}</p>
        )}
      </div>

      {/* Email Input */}
      <div className="space-y-1">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          placeholder="name@example.com"
          autoComplete="email"
          required
          disabled={isLoading}
          aria-required="true"
          {...form.register('email')}
          aria-invalid={form.formState.errors.email ? 'true' : 'false'}
        />
        {form.formState.errors.email && (
          <p className="text-sm text-destructive" role="alert">{form.formState.errors.email.message}</p>
        )}
      </div>

      {/* Password Input */}
      <div className="space-y-1">
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          type="password"
          placeholder="••••••••"
          autoComplete="new-password"
          required
          disabled={isLoading}
          aria-required="true"
          {...form.register('password')}
          aria-invalid={form.formState.errors.password ? 'true' : 'false'}
        />
        {form.formState.errors.password && (
          <p className="text-sm text-destructive" role="alert">{form.formState.errors.password.message}</p>
        )}
      </div>

      {/* Submit Button */}
      <Button type="submit" className="w-full" disabled={isLoading || !form.formState.isValid}>
        {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : 'Create Account'}
      </Button>

      {/* Link to Login */}
      <div className="mt-4 text-center text-sm">
        Already have an account?{" "}
        <Link href="/login" className="underline text-primary hover:text-primary/80 focus:outline-none focus:ring-1 focus:ring-ring rounded-sm">
          Log In
        </Link>
      </div>
    </form>
  );
}

```

## File: `components\chat\chat-history.tsx`
```tsx
// File: components/chat/chat-history.tsx
// Purpose: Displays the list of past chats in the sidebar.
"use client";

import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Button, buttonVariants } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { MessageSquareText, Trash2, Loader2, AlertCircle, RefreshCw } from 'lucide-react';
import { cn } from '@/lib/utils';
import { getChats, deleteChat, ChatSummary, ApiError } from '@/lib/api'; // Use API functions
import { useAuth } from '@/lib/hooks/useAuth'; // Import the CORRECTED auth hook
import { toast } from "sonner"; // Use sonner
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
import { Skeleton } from '@/components/ui/skeleton'; // Import Skeleton

export function ChatHistory() {
    const pathname = usePathname();
    const router = useRouter();
    // Get auth state from the hook
    const { session, isLoading: isAuthLoading, signOut } = useAuth();

    // Component State
    const [chats, setChats] = useState<ChatSummary[]>([]);
    const [isLoading, setIsLoading] = useState(false); // Loading state specific to this component
    const [error, setError] = useState<string | null>(null);
    const [chatToDelete, setChatToDelete] = useState<ChatSummary | null>(null);
    const [isDeleting, setIsDeleting] = useState(false);
    const [isAlertOpen, setIsAlertOpen] = useState(false);

    // --- Function to Fetch Chat History ---
    const fetchChatHistory = useCallback(async (showToast = false) => {
         const bypassAuth = process.env.NEXT_PUBLIC_BYPASS_AUTH === 'true';
         const isAuthenticated = !!session || bypassAuth;

        // Skip if not authenticated (and auth check is complete)
        if (!isAuthLoading && !isAuthenticated) {
            console.log("ChatHistory: Not authenticated, clearing history.");
            setChats([]);
            setError(null); // Clear previous errors
            setIsLoading(false); // Ensure loading is false
            return;
        }

        // Skip if auth is still loading (and not bypassing)
        if (!bypassAuth && isAuthLoading) {
             console.log("ChatHistory: Waiting for auth state...");
             // Set loading true here to show skeleton while waiting for auth
             setIsLoading(true);
             return;
        }

        console.log("ChatHistory: Auth ready. Fetching chat list...");
        setIsLoading(true); // Start loading history list
        setError(null);

        try {
            const fetchedChats = await getChats();
            // Sort by most recently updated
            fetchedChats.sort((a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime());
            setChats(fetchedChats);
            console.log(`ChatHistory: Fetched ${fetchedChats.length} chats.`);
            if (showToast) toast.success("Chat History Refreshed");
        } catch (err) {
            console.error("ChatHistory: Failed to fetch chat history:", err);
            let message = "Could not load chat history.";
            if (err instanceof ApiError) {
                message = err.message || message;
                if (err.status === 401 || err.status === 403) {
                    message = "Session expired or invalid. Please log in again.";
                    signOut(); // Force logout on auth error
                }
            } else if (err instanceof Error) { message = err.message; }
            setError(message);
            setChats([]); // Clear chats on error
            if (showToast) toast.error("Error Loading Chats", { description: message });
        } finally {
            setIsLoading(false); // Finish loading history list
        }
    // Dependencies: Re-run if session or auth loading state changes. Include signOut.
    }, [session, isAuthLoading, signOut]);

    // --- Effect to Fetch on Mount and Auth Change ---
    useEffect(() => {
        // Fetch history immediately if auth is ready or bypassed,
        // or wait for auth loading to finish.
        fetchChatHistory(false); // Fetch without toast on initial load/auth change
    }, [fetchChatHistory]); // Depend only on the memoized fetch function

    // --- Delete Confirmation Handlers ---
    const openDeleteConfirmation = (chat: ChatSummary, event: React.MouseEvent) => {
        event.stopPropagation(); // Prevent link navigation
        event.preventDefault();
        setChatToDelete(chat);
        setIsAlertOpen(true);
    };

    const handleDeleteConfirmed = async () => {
        if (!chatToDelete) return;
        setIsDeleting(true);
        try {
            await deleteChat(chatToDelete.id);
            // Optimistically update UI
            setChats(prev => prev.filter(chat => chat.id !== chatToDelete.id));
            toast.success("Chat Deleted", { description: `Chat "${chatToDelete.title || chatToDelete.id.substring(0, 8)}" removed.` });

            // If the currently viewed chat was deleted, navigate to new chat page
            const currentChatId = pathname.split('/').pop();
            if (currentChatId === chatToDelete.id) {
                router.push('/chat');
            }
        } catch (err) {
            console.error("ChatHistory: Failed to delete chat:", err);
            let message = "Could not delete chat.";
            if (err instanceof ApiError) {
                message = err.message || message;
                if (err.status === 401 || err.status === 403) signOut(); // Logout on auth error
            } else if (err instanceof Error) { message = err.message; }
            toast.error("Deletion Failed", { description: message });
            // Optional: Re-fetch history on error to ensure consistency, or rely on user refresh
            // fetchChatHistory(false);
        } finally {
            setIsDeleting(false);
            setIsAlertOpen(false);
            setChatToDelete(null);
        }
    };
    // --- End Delete Handlers ---

    // --- Render Logic Helper ---
    const renderContent = () => {
        const bypassAuth = process.env.NEXT_PUBLIC_BYPASS_AUTH === 'true';
        const isAuthenticated = !!session || bypassAuth;

        // 1. Loading State (Auth or History)
        if (isLoading || (!bypassAuth && isAuthLoading)) {
            return (
                <div className="space-y-1 p-2">
                    {Array.from({ length: 4 }).map((_, i) => (
                         <Skeleton key={i} className="h-8 w-full rounded" />
                    ))}
                 </div>
            );
        }

        // 2. Not Authenticated
        if (!isAuthenticated) {
            return (
                <div className="px-2 py-4 text-center text-muted-foreground">
                    <p className="text-xs mb-2">Log in to view chat history.</p>
                    {/* <Button size="xs" variant="outline" onClick={() => router.push('/login')}>Login</Button> */}
                </div>
            );
        }

        // 3. Error State
        if (error) {
            return (
                <div className="px-2 py-4 text-center text-destructive">
                    <AlertCircle className="mx-auto h-5 w-5 mb-1" />
                    <p className="text-xs mb-2">{error}</p>
                    <Button variant="outline" size="sm" onClick={() => fetchChatHistory(true)}>
                        <RefreshCw className="mr-1 h-3 w-3"/> Retry
                    </Button>
                </div>
            );
        }

        // 4. Empty State
        if (chats.length === 0) {
            return <p className="text-xs text-muted-foreground px-2 py-4 text-center">No previous chats found.</p>;
        }

        // 5. Chat List
        return chats.map((chat) => {
            const isActive = pathname === `/chat/${chat.id}`;
            const displayTitle = chat.title || `Chat ${chat.id.substring(0, 8)}...`;
            const displayDate = new Date(chat.updated_at).toLocaleDateString(undefined, { month: 'short', day: 'numeric' });

            return (
                <div key={chat.id} className="relative group w-full pr-8"> {/* Space for delete button */}
                    <Link href={`/chat/${chat.id}`} passHref legacyBehavior>
                        <a
                            className={cn(
                                buttonVariants({ variant: isActive ? "secondary" : "ghost", size: "sm" }),
                                "w-full justify-start h-auto py-1.5 px-2 overflow-hidden text-left rounded", // Ensure rounded corners
                                isActive ? "bg-muted hover:bg-muted font-medium" : "hover:bg-muted/50"
                            )}
                            title={displayTitle}
                        >
                            <MessageSquareText className="h-4 w-4 mr-2 flex-shrink-0" />
                            <span className="truncate flex-1 text-sm">{displayTitle}</span>
                            <span className="text-xs text-muted-foreground/70 ml-2 flex-shrink-0">{displayDate}</span>
                        </a>
                    </Link>
                    {/* Delete Button Trigger */}
                    <AlertDialogTrigger asChild>
                        <Button
                            variant="ghost" size="icon"
                            className={cn(
                                "absolute right-0 top-1/2 -translate-y-1/2 h-7 w-7 p-0 opacity-0 group-hover:opacity-100 transition-opacity duration-150 flex-shrink-0 focus-visible:opacity-100",
                                isDeleting && chatToDelete?.id === chat.id ? "opacity-50 cursor-not-allowed" : ""
                            )}
                            onClick={(e) => openDeleteConfirmation(chat, e)}
                            aria-label={`Delete chat: ${displayTitle}`}
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
    // --- End Render Logic Helper ---

    return (
        <AlertDialog open={isAlertOpen} onOpenChange={setIsAlertOpen}>
            {/* Main container for history list */}
            <div className="flex flex-col h-full">
                 {/* Header with Title and Refresh Button */}
                 <div className="flex justify-between items-center p-2 border-b shrink-0">
                     <h3 className="px-1 text-xs font-semibold uppercase text-muted-foreground tracking-wider">
                         Chat History
                     </h3>
                     <Button
                         variant="ghost"
                         size="sm" // Make button smaller
                         className="p-1 h-6 w-6" // Adjust padding and size
                         onClick={() => fetchChatHistory(true)}
                         disabled={isLoading || isAuthLoading}
                         title="Refresh chat history"
                     >
                         <RefreshCw className={cn("h-3.5 w-3.5", (isLoading || isAuthLoading) && "animate-spin")} />
                         <span className="sr-only">Refresh History</span>
                     </Button>
                 </div>
                 {/* Scrollable Area for Chat List */}
                 <ScrollArea className="flex-1">
                     <div className="flex flex-col gap-0.5 p-2">
                         {renderContent()}
                     </div>
                 </ScrollArea>
            </div>

            {/* Alert Dialog Content (Rendered in a portal) */}
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete the chat
                        <span className="font-medium"> "{chatToDelete?.title || chatToDelete?.id?.substring(0, 8)}"</span> and all its messages.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                        onClick={handleDeleteConfirmed}
                        disabled={isDeleting}
                        className={buttonVariants({ variant: "destructive" })} // Use destructive variant
                    >
                        {isDeleting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                        Delete Permanently
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
// Purpose: Displays the top header bar with theme toggle and user menu.
"use client";

import React from 'react';
import { Avatar, AvatarFallback /*, AvatarImage */ } from "@/components/ui/avatar"; // Image commented out if not used
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { LogOut, Settings, /* User as UserIcon, */ Home, HelpCircle } from "lucide-react"; // Added Home, HelpCircle
import { useAuth } from '@/lib/hooks/useAuth'; // Import the CORRECTED hook
import { APP_NAME } from '@/lib/constants';
import { ThemePaletteButton } from '@/components/theme-palette-button'; // Use the palette button
import { useRouter } from 'next/navigation';
import { toast } from 'sonner'; // For logout feedback

export function Header() {
  // Get user and signOut function directly from the hook
  const { user, signOut } = useAuth();
  const router = useRouter();

  // Helper to get initials from name
  const getInitials = (name?: string | null): string => {
    if (!name) return '?'; // Handle null or empty name
    // Basic initials logic (e.g., "John Doe" -> "JD")
    const parts = name.split(' ').filter(Boolean); // Split by space and remove empty parts
    if (parts.length === 0) return '?';
    if (parts.length === 1) return parts[0].charAt(0).toUpperCase();
    return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
  };

  // Logout handler using the signOut function from context
  const handleLogout = async () => {
      console.log("Header: Initiating logout...");
      try {
          await signOut();
          // Redirection is handled by AuthProvider/AppLayout observing the state change
          toast.success("Logged Out", { description: "You have been successfully logged out." });
      } catch (error) {
          // Error handling is likely within signOut itself, but catch here just in case
          console.error("Header: Logout failed unexpectedly.", error);
          toast.error("Logout Failed", { description: "Could not log you out." });
      }
  };

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b bg-background/95 backdrop-blur-sm px-4 md:px-6 shrink-0">
      {/* Left Side - Optional: Breadcrumbs or Title could go here */}
       <div className="flex items-center gap-2">
         {/* Example: Link back to the main app page or dashboard */}
         <Button variant="ghost" size="icon" onClick={() => router.push('/chat')} aria-label="Go to Chat">
             <Home className="h-5 w-5" />
         </Button>
          {/* <span className="text-lg font-semibold hidden md:inline">{APP_NAME}</span> */}
      </div>


      {/* Right Side - Controls */}
      <div className="flex items-center space-x-2 md:space-x-4">
        {/* Theme Palette Button */}
        <ThemePaletteButton />

         {/* Help Button (Example) */}
         <Button variant="ghost" size="icon" onClick={() => router.push('/help')} aria-label="Help & Support">
             <HelpCircle className="h-5 w-5" />
         </Button>

        {/* User Menu Dropdown (only shown if user exists) */}
        {user ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-9 w-9 rounded-full focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
                <Avatar className="h-9 w-9 border">
                  {/* Add AvatarImage if you have user profile pictures */}
                  {/* <AvatarImage src={user.avatarUrl || undefined} alt={user.name || 'User Avatar'} /> */}
                  <AvatarFallback className="bg-secondary text-secondary-foreground font-medium text-sm">
                    {getInitials(user.name)}
                  </AvatarFallback>
                </Avatar>
                <span className="sr-only">Open user menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-60" align="end" forceMount>
              {/* User Info Section */}
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none truncate" title={user.name || 'User'}>
                    {user.name || 'User'} {/* Display name or 'User' */}
                  </p>
                  <p className="text-xs leading-none text-muted-foreground truncate" title={user.email}>
                    {user.email}
                  </p>
                  {/* Display Company ID if available */}
                  {user.companyId && (
                    <p className="text-xs leading-none text-muted-foreground/80 mt-1 flex items-center gap-1" title={`Company ID: ${user.companyId}`}>
                       <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-3 h-3">
                           <path fillRule="evenodd" d="M4 1.75A2.25 2.25 0 0 0 1.75 4v1.5a.75.75 0 0 0 1.5 0V4c0-.414.336-.75.75-.75h8.5c.414 0 .75.336.75.75v1.5a.75.75 0 0 0 1.5 0V4A2.25 2.25 0 0 0 12 1.75H4ZM1.75 8.5A.75.75 0 0 0 1 9.25v2.25A2.25 2.25 0 0 0 3.25 14h9.5A2.25 2.25 0 0 0 15 11.5V9.25a.75.75 0 0 0-1.5 0v2.25c0 .414-.336.75-.75.75h-9.5c-.414 0-.75-.336-.75-.75V9.25a.75.75 0 0 0-.75-.75Z" clipRule="evenodd" />
                       </svg>
                      <span className="truncate">Company: {user.companyId.substring(0, 8)}...</span>
                    </p>
                  )}
                   {/* Display Roles if available */}
                   {user.roles && user.roles.length > 0 && (
                     <p className="text-xs leading-none text-muted-foreground/80 mt-1" title={`Roles: ${user.roles.join(', ')}`}>
                       Role(s): {user.roles.join(', ')}
                     </p>
                   )}
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              {/* Menu Items */}
              <DropdownMenuItem onClick={() => router.push('/settings')} className="cursor-pointer">
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
              </DropdownMenuItem>
              {/* Add other items like Profile, Billing etc. if needed */}
              {/*
              <DropdownMenuItem onClick={() => router.push('/profile')} className="cursor-pointer">
                 <UserIcon className="mr-2 h-4 w-4" />
                 <span>Profile</span>
              </DropdownMenuItem>
              */}
              <DropdownMenuSeparator />
              {/* Logout Item */}
              <DropdownMenuItem onClick={handleLogout} className="cursor-pointer text-destructive focus:text-destructive focus:bg-destructive/10">
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
           // Optional: Show Login button if user is not logged in (though usually handled elsewhere)
           // <Button variant="outline" size="sm" onClick={() => router.push('/login')}>Login</Button>
           null // Usually header assumes user is logged in within AppLayout
        )}
        {/* End User Menu Dropdown */}
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
// Purpose: Centralized API request function and specific API call definitions.
import { getApiGatewayUrl } from './utils';
import type { Message } from '@/components/chat/chat-message'; // Ensure Message interface is exported
import { supabase } from './supabaseClient'; // Import the initialized Supabase client

// --- ApiError Class ---
interface ApiErrorDataDetail {
    msg: string;
    type: string;
    loc?: (string | number)[]; // Location can be string or number indices
}
interface ApiErrorData {
    detail?: string | ApiErrorDataDetail[] | any; // FastAPI often uses 'detail'
    message?: string; // General message fallback
}
export class ApiError extends Error {
    status: number;
    data?: ApiErrorData;

    constructor(message: string, status: number, data?: ApiErrorData) {
        super(message);
        this.name = 'ApiError';
        this.status = status;
        this.data = data;
        // Ensure the prototype chain is correct for instanceof checks
        Object.setPrototypeOf(this, ApiError.prototype);
    }
}

// --- Core Request Function ---
export async function request<T>(
    endpoint: string,
    options: RequestInit = {}
): Promise<T> {
    const cleanEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;

    // Validate endpoint structure (optional but good practice)
    if (!cleanEndpoint.startsWith('/api/v1/')) {
        console.error(`Invalid API endpoint format: ${cleanEndpoint}. Must start with /api/v1/`);
        throw new ApiError(`Invalid API endpoint format: ${cleanEndpoint}.`, 400);
    }

    let apiUrl: string;
    try {
        const gatewayUrl = getApiGatewayUrl(); // Fetch base URL using the utility
        apiUrl = `${gatewayUrl}${cleanEndpoint}`;
    } catch (err) {
        // If getApiGatewayUrl throws (e.g., in production missing env var)
        console.error("API Request failed: Could not get API Gateway URL.", err);
        throw new ApiError("API Gateway URL configuration error.", 500);
    }


    let token: string | null = null;
    try {
        // Get the current session token from Supabase *before* making the request
        const { data: sessionData, error: sessionError } = await supabase.auth.getSession();

        if (sessionError) {
            // Log the error but proceed, maybe it's a public endpoint
            console.warn(`API Request: Error getting Supabase session for ${cleanEndpoint}:`, sessionError.message);
        }
        token = sessionData?.session?.access_token || null;
        // Log token presence for debugging (optional: remove in production)
        // console.log(`API Request to ${cleanEndpoint}: Token ${token ? 'Present' : 'Absent'}`);

    } catch (e) {
        console.error(`API Request: Unexpected error fetching Supabase session for ${cleanEndpoint}:`, e);
        // Decide if you want to proceed without a token or throw an error
        // throw new ApiError("Failed to retrieve authentication token.", 500);
    }

    const headers = new Headers(options.headers || {});
    headers.set('Accept', 'application/json');

    // Set Content-Type unless it's FormData
    if (!(options.body instanceof FormData)) {
        // Default to JSON if not set and not FormData
        if (!headers.has('Content-Type')) {
             headers.set('Content-Type', 'application/json');
        }
    }

    // Add Authorization header if token exists
    if (token) {
        headers.set('Authorization', `Bearer ${token}`);
    } else {
        // Optional: Decide if you want to disallow requests without tokens for protected routes
        // This check might be better handled by the API Gateway itself, but you could add a frontend check
        // if (!isPublicEndpoint(cleanEndpoint)) { // You'd need a helper function isPublicEndpoint
        //    console.error(`API Request Error: Attempted to call protected endpoint ${cleanEndpoint} without a token.`);
        //    throw new ApiError("Authentication token is missing.", 401);
        // }
        console.warn(`API Request: Making request to ${cleanEndpoint} without Authorization header.`);
    }


    const config: RequestInit = {
        ...options,
        headers,
    };

    console.log(`API Request: ${config.method || 'GET'} ${apiUrl}`);

    try {
        const response = await fetch(apiUrl, config);

        // --- Improved Error Handling ---
        if (!response.ok) {
            let errorData: ApiErrorData | null = null;
            let errorText = '';
            const contentType = response.headers.get('content-type');

            try {
                if (contentType && contentType.includes('application/json')) {
                    errorData = await response.json();
                } else {
                    // Read as text if not JSON or if JSON parsing fails
                    errorText = await response.text();
                }
            } catch (parseError) {
                console.warn(`API Request: Could not parse error response body (status ${response.status}) from ${apiUrl}. Content-Type: ${contentType}`, parseError);
                // Attempt to read as text as a fallback if JSON parsing failed
                if (!errorText) {
                    try { errorText = await response.text(); } catch {}
                }
            }

            // Construct a meaningful error message
            let errorMessage = `API Error (${response.status})`; // Default message

            if (errorData?.detail) {
                if (typeof errorData.detail === 'string') {
                    errorMessage = errorData.detail;
                } else if (Array.isArray(errorData.detail) && errorData.detail.length > 0 && typeof errorData.detail[0] === 'object') {
                    // Handle FastAPI validation errors {loc: [...], msg: ..., type: ...}
                    errorMessage = errorData.detail
                        .map((e: ApiErrorDataDetail) => `${e.loc?.join('.')} - ${e.msg}`)
                        .join('; ') || 'Validation Error';
                } else {
                     // Handle other shapes of 'detail' if necessary
                     try { errorMessage = JSON.stringify(errorData.detail).substring(0, 200); } catch {}
                }
            } else if (errorData?.message && typeof errorData.message === 'string') {
                errorMessage = errorData.message; // Use 'message' field if available
            } else if (errorText) {
                errorMessage = errorText.substring(0, 200); // Use text content if no structured error
            } else {
                // Fallback messages based on status code
                switch (response.status) {
                    case 400: errorMessage = 'Bad Request. Please check your input.'; break;
                    case 401: errorMessage = 'Authentication failed. Please log in again.'; break;
                    case 403: errorMessage = 'Permission denied. You might lack necessary roles or company association.'; break;
                    case 404: errorMessage = 'The requested resource was not found.'; break;
                    case 429: errorMessage = 'Too many requests. Please try again later.'; break;
                    case 500: errorMessage = 'Internal Server Error. Please try again later or contact support.'; break;
                    case 502: errorMessage = 'Bad Gateway. The server received an invalid response.'; break;
                    case 503: errorMessage = 'Service Unavailable. The server is temporarily down.'; break;
                    case 504: errorMessage = 'Gateway Timeout. The request took too long.'; break;
                    default: errorMessage = `Request failed with status code ${response.status}.`;
                }
            }

            console.error(`API Error Response: ${response.status} ${response.statusText} from ${apiUrl}`, {
                status: response.status,
                message: errorMessage, // Log the derived message
                responseData: errorData, // Log parsed data if available
                responseText: errorText, // Log text if available or parsing failed
            });

            // Throw the custom ApiError
            throw new ApiError(errorMessage, response.status, errorData || undefined);
        }

        // Handle successful responses
        // Check for No Content response
        if (response.status === 204 || response.headers.get('content-length') === '0') {
            return null as T; // Return null for 204 No Content
        }

        // Try to parse JSON for other successful responses
        try {
            const data: T = await response.json();
            return data;
        } catch (jsonError) {
            console.error(`API Request: Invalid JSON in successful response (status ${response.status}) from ${apiUrl}`, jsonError);
            throw new ApiError(`Invalid JSON response received from the server.`, response.status);
        }

    } catch (error) {
        // Handle different types of errors (ApiError, Network errors, others)
        if (error instanceof ApiError) {
            // Re-throw known API errors
            throw error;
        } else if (error instanceof TypeError && (
            error.message.includes('fetch') || // Generic fetch error
            error.message.includes('NetworkError') || // Firefox network error
            error.message.includes('Failed to fetch') // Common browser network error
        )) {
            const networkErrorMessage = `Network Error: Could not connect to the API Gateway at ${getApiGatewayUrl()}. Please check your network connection and the gateway status.`;
            console.error('API Request Network Error:', { url: apiUrl, gatewayUrl: getApiGatewayUrl(), error: error.message });
            throw new ApiError(networkErrorMessage, 0); // Use status 0 for network errors
        } else {
            // Handle other unexpected errors
            console.error('API Request Unexpected Error:', { url: apiUrl, error });
            const message = error instanceof Error ? error.message : 'An unexpected error occurred during the API request.';
            throw new ApiError(message, 500); // Assume 500 for unexpected errors
        }
    }
}

// --- API Function Definitions ---

// Ingest Service
export interface IngestResponse {
    document_id: string;
    task_id: string; // Celery task ID maybe?
    status: string;
    message: string;
}
export const uploadDocument = async (
    formData: FormData,
    metadata: Record<string, any> = {} // Metadata might not be used if embedded in FormData logic server-side
): Promise<IngestResponse> => {
    // Note: Sending metadata alongside FormData might require specific backend handling
    // or embedding metadata within the FormData itself if the backend expects it.
    // Adjust if your backend expects metadata differently (e.g., query params, separate JSON part).
    console.log("Uploading document via API..."); // Added log
    return request<IngestResponse>('/api/v1/ingest/upload', { // Adjusted endpoint based on typical naming
        method: 'POST',
        body: formData,
        // If metadata needs to be sent separately (less common with FormData):
        // headers: { 'X-Upload-Metadata': JSON.stringify(metadata) }
    });
};

export interface DocumentStatusResponse {
    document_id: string;
    status: 'uploaded' | 'processing' | 'processed' | 'indexed' | 'error' | string; // Allow other strings for flexibility
    file_name?: string | null;
    file_type?: string | null;
    chunk_count?: number | null; // How many chunks were created
    error_message?: string | null; // Details if status is 'error'
    last_updated?: string; // ISO timestamp string
    message?: string | null; // General status message
    metadata?: Record<string, any> | null; // Original metadata if stored
}
export const listDocumentStatuses = async (): Promise<DocumentStatusResponse[]> => {
    console.log("Fetching document statuses via API..."); // Added log
    return request<DocumentStatusResponse[]>('/api/v1/ingest/status'); // Adjusted endpoint
};


// Query Service
export interface RetrievedDocApi {
    id: string; // Often the chunk ID
    score?: number | null;
    content_preview?: string | null;
    metadata?: Record<string, any> | null;
    document_id?: string | null; // ID of the parent document
    file_name?: string | null; // Filename of the parent document
}
// Frontend type can be the same if no transformation is needed initially
export type RetrievedDoc = RetrievedDocApi;

export interface ChatSummary {
    id: string; // Chat ID (UUID)
    title: string | null; // Optional title, might be first user message or generated
    updated_at: string; // ISO timestamp
    created_at: string; // ISO timestamp
}

export interface ChatMessageApi {
    id: string; // Message ID
    chat_id: string;
    role: 'user' | 'assistant';
    content: string;
    sources: RetrievedDocApi[] | null; // Sources used for assistant message
    created_at: string; // ISO timestamp
    // Potentially add other fields like model used, latency, etc.
}

export interface QueryPayload {
    query: string;
    retriever_top_k?: number; // Optional: How many docs to retrieve
    chat_id?: string | null; // Provide if continuing a conversation
    // Potentially add other params: filters, generation config, etc.
}

export interface QueryApiResponse {
    answer: string; // The generated answer
    retrieved_documents: RetrievedDocApi[]; // The documents used
    query_log_id?: string | null; // ID for logging/tracing
    chat_id: string; // ID of the chat (new or existing)
}

export const getChats = async (): Promise<ChatSummary[]> => {
     console.log("Fetching chat list via API..."); // Added log
     return request<ChatSummary[]>('/api/v1/query/chats');
};

export const getChatMessages = async (chatId: string): Promise<ChatMessageApi[]> => {
     console.log(`Fetching messages for chat ${chatId} via API...`); // Added log
     return request<ChatMessageApi[]>(`/api/v1/query/chats/${chatId}/messages`);
};

export const postQuery = async (payload: QueryPayload): Promise<QueryApiResponse> => {
     console.log(`Sending query to API (Chat ID: ${payload.chat_id || 'New'})...`); // Added log
     // Ensure chat_id is explicitly null if undefined/empty, as backend might expect null for new chat
     const body = { ...payload, chat_id: payload.chat_id || null };
     return request<QueryApiResponse>('/api/v1/query/ask', {
        method: 'POST',
        body: JSON.stringify(body),
     });
};

export const deleteChat = async (chatId: string): Promise<void> => {
     console.log(`Deleting chat ${chatId} via API...`); // Added log
     // Expecting 204 No Content on successful deletion
     await request<null>(`/api/v1/query/chats/${chatId}`, { method: 'DELETE' });
};


// User/Company Association (API Gateway Endpoint)
interface EnsureCompanyResponse {
    message: string; // e.g., "Company association successful." or "Company association already exists."
    company_id?: string; // The company ID that was ensured/found
}
export const ensureCompanyAssociation = async (): Promise<EnsureCompanyResponse> => {
     console.log("Calling ensure-company association endpoint..."); // Added log
     return request<EnsureCompanyResponse>('/api/v1/users/me/ensure-company', { method: 'POST' });
};


// --- Type Mapping Helpers ---

// Maps sources from the API structure to the structure needed by the frontend Message component.
export const mapApiSourcesToFrontend = (apiSources: RetrievedDocApi[] | null | undefined): RetrievedDoc[] | undefined => {
    if (!apiSources) {
        return undefined; // Return undefined if sources are null/undefined
    }
    // If it's an array (even empty), map each source.
    // Currently, API and Frontend types are the same (RetrievedDoc = RetrievedDocApi),
    // so this is mostly a pass-through, but good practice for future changes.
    return apiSources.map(source => ({
        id: source.id,
        score: source.score,
        content_preview: source.content_preview,
        metadata: source.metadata,
        document_id: source.document_id,
        file_name: source.file_name,
    }));
};

// Maps a full message object from the API to the frontend Message interface.
export const mapApiMessageToFrontend = (apiMessage: ChatMessageApi): Message => {
    // Use the helper to map the sources array within the message
    const mappedSources = mapApiSourcesToFrontend(apiMessage.sources);

    // Construct the frontend Message object
    return {
        id: apiMessage.id,
        role: apiMessage.role,
        content: apiMessage.content,
        sources: mappedSources, // Use the potentially transformed sources
        isError: false, // Assume success when mapping API response
        created_at: apiMessage.created_at, // Preserve timestamp
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
// Purpose: Provides authentication state and actions using React Context and Supabase.
"use client";

import React, {
    createContext,
    useContext,
    useState,
    useEffect,
    useCallback,
    useRef, // Added useRef
    ReactNode,
} from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';
import { User as AppUser } from '@/lib/auth/helpers'; // Use our defined frontend User type
// Import AuthError directly, not just as a type
import { Session, User as SupabaseUser, AuthError, SignInWithPasswordCredentials, SignUpWithPasswordCredentials } from '@supabase/supabase-js';
import { toast } from "sonner";
import { ensureCompanyAssociation, ApiError as EnsureCompanyApiError } from '@/lib/api'; // Import API function and specific error type

// --- Types ---
interface AuthContextType {
    user: AppUser | null; // Use our application-specific User type
    session: Session | null; // Keep the full Supabase session if needed elsewhere
    isLoading: boolean; // Tracks if auth state is being determined
    signInWithPassword: (credentials: SignInWithPasswordCredentials) => Promise<void>;
    signUp: (params: SignUpWithPasswordCredentials) => Promise<{ data: { user: SupabaseUser | null; session: Session | null; }; error: AuthError | null; }>;
    signOut: () => Promise<void>;
    // No 'token' here - access via session.access_token if needed directly
}

// --- Initial Context State ---
const defaultAuthContextValue: AuthContextType = {
    user: null,
    session: null,
    isLoading: true, // Start as true until initial check completes
    signInWithPassword: async () => {
        console.error("AuthProvider: signInWithPassword called outside of AuthProvider");
        throw new Error("Auth context not initialized");
    },
    signUp: async () => {
        console.error("AuthProvider: signUp called outside of AuthProvider");
        // Use AuthError constructor directly
        return { data: { user: null, session: null }, error: new AuthError("Auth context not initialized") };
    },
    signOut: async () => {
        console.error("AuthProvider: signOut called outside of AuthProvider");
    },
};

// --- Context Definition ---
const AuthContext = createContext<AuthContextType>(defaultAuthContextValue);

// --- Props for Provider ---
interface AuthProviderProps {
    children: ReactNode;
}

// --- Helper to Map Supabase User to App User ---
const mapSupabaseUserToAppUser = (supabaseUser: SupabaseUser | null | undefined): AppUser | null => {
    if (!supabaseUser) {
        return null;
    }

    // Extract data safely, checking for undefined/null
    const companyIdRaw = supabaseUser.app_metadata?.company_id;
    // Ensure companyId is a string if it exists, otherwise undefined
    const companyId = companyIdRaw ? String(companyIdRaw) : undefined;

    // Extract roles, ensuring it's an array of strings or undefined
    const rolesRaw = supabaseUser.app_metadata?.roles;
    const roles = Array.isArray(rolesRaw) && rolesRaw.every(r => typeof r === 'string')
        ? rolesRaw as string[]
        : undefined;

    // Extract name from user_metadata (common places: 'name' or 'full_name')
    const name = supabaseUser.user_metadata?.full_name || supabaseUser.user_metadata?.name || null;

    return {
        userId: supabaseUser.id,
        email: supabaseUser.email,
        name: name, // Will be string or null
        companyId: companyId, // Will be string or undefined
        roles: roles, // Will be string[] or undefined
    };
};


// --- AuthProvider Component ---
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [user, setUser] = useState<AppUser | null>(null);
    const [session, setSession] = useState<Session | null>(null);
    const [isLoading, setIsLoading] = useState(true); // Start loading until first check
    const router = useRouter();
    const pathname = usePathname();
    // Ref to prevent multiple ensureCompany calls running concurrently
    const ensureCompanyCallPending = useRef(false);
    // Ref to store the initial session check promise
    const initialCheckPromise = useRef<Promise<void> | null>(null);

    // --- Sign Out Logic ---
    const signOut = useCallback(async () => {
        console.log("AuthProvider: Initiating sign out...");
        // Don't set isLoading true here immediately, let onAuthStateChange handle it
        // to avoid UI flicker if sign out is very fast.
        try {
            const { error } = await supabase.auth.signOut();
            if (error) {
                console.error("AuthProvider: Sign out error:", error);
                toast.error("Logout Failed", { description: error.message });
            } else {
                console.log("AuthProvider: Sign out successful via Supabase.");
                // Clear local state immediately for faster UI response
                setUser(null);
                setSession(null);
                // Redirect happens via useEffect watching session state change to null
            }
        } catch (error) {
            console.error("AuthProvider: Unexpected sign out error:", error);
            toast.error("Logout Failed", { description: "An unexpected error occurred during sign out." });
            // Still clear local state in case of unexpected error
            setUser(null);
            setSession(null);
        } finally {
             // Ensure loading is false after attempt, though onAuthStateChange might set it again briefly
             setIsLoading(false);
        }
    }, []); // No dependencies needed for signOut itself

    // --- Core Effect for Auth State Changes & Initial Load ---
    useEffect(() => {
        console.log("AuthProvider: useEffect setup running.");

        // Function to handle session updates and potential company association
        const handleSessionUpdate = async (currentSession: Session | null) => {
            console.log("AuthProvider: Handling session update. Session present:", !!currentSession);
            setSession(currentSession);
            const mappedUser = mapSupabaseUserToAppUser(currentSession?.user);
            setUser(mappedUser);

            // --- Ensure Company Association Logic ---
            // Check only if we have a session, a mapped user, but NO companyId,
            // and no call is already pending.
            if (currentSession && mappedUser && !mappedUser.companyId && !ensureCompanyCallPending.current) {
                console.log(`AuthProvider: User ${mappedUser.userId} lacks companyId. Attempting association.`);
                ensureCompanyCallPending.current = true; // Mark as pending
                try {
                    const result = await ensureCompanyAssociation();
                    console.log("AuthProvider: ensureCompanyAssociation API call successful:", result.message);
                    toast.info("Company Association", { description: result.message });
                    // IMPORTANT: Refresh the Supabase session to get the updated token with the new app_metadata
                    console.log("AuthProvider: Refreshing Supabase session after company association...");
                    const { error: refreshError } = await supabase.auth.refreshSession();
                    if (refreshError) {
                        console.error("AuthProvider: Failed to refresh session after company association:", refreshError);
                        toast.error("Session Refresh Failed", { description: "Could not update session after company setup. Please log in again." });
                        // Consider signing out if refresh fails critically
                        // await signOut();
                    } else {
                        console.log("AuthProvider: Session refreshed successfully.");
                        // The onAuthStateChange listener will fire again with the *new* session,
                        // updating user/session state automatically. No need to manually set user/session here.
                    }
                } catch (error) {
                    console.error("AuthProvider: ensureCompanyAssociation API call failed:", error);
                    let errorDesc = "Could not automatically associate your account with a company.";
                    if (error instanceof EnsureCompanyApiError) {
                        errorDesc = error.message || errorDesc;
                         // If the error is 401/403 from the ensure-company endpoint, it implies token issues.
                         if (error.status === 401 || error.status === 403) {
                            errorDesc = "Authentication error during company setup. Please log in again.";
                            await signOut(); // Force sign out on critical auth error
                         }
                    } else if (error instanceof Error) {
                        errorDesc = error.message;
                    }
                    toast.error("Company Setup Failed", { description: errorDesc });
                } finally {
                    ensureCompanyCallPending.current = false; // Mark as no longer pending
                }
            }
             // --- End Ensure Company Logic ---

             // Regardless of company check, ensure loading is false after handling
             setIsLoading(false);
             console.log("AuthProvider: Session update handling complete. isLoading set to false.");
        };


        // 1. Initial Session Check (Only once on mount)
        if (!initialCheckPromise.current) {
            console.log("AuthProvider: Performing initial session check...");
            setIsLoading(true); // Ensure loading is true during initial check
            initialCheckPromise.current = supabase.auth.getSession()
                .then(async ({ data: { session: initialSession }, error: initialError }) => {
                    if (initialError) {
                        console.error("AuthProvider: Error fetching initial session:", initialError);
                        toast.error("Session Load Error", { description: "Could not load your session." });
                    }
                    console.log("AuthProvider: Initial session check complete. Session found:", !!initialSession);
                    await handleSessionUpdate(initialSession); // Handle the initial session
                })
                .catch(error => {
                    console.error("AuthProvider: Unexpected error during initial session check:", error);
                    toast.error("Session Load Error", { description: "An unexpected error occurred." });
                    setIsLoading(false); // Ensure loading stops on unexpected error
                });
        }


        // 2. Auth State Change Listener
        console.log("AuthProvider: Setting up onAuthStateChange listener.");
        const { data: authListener } = supabase.auth.onAuthStateChange(
            async (event, newSession) => {
                console.log(`AuthProvider: onAuthStateChange event: ${event}`, { hasSession: !!newSession });

                // Wait for initial check to complete before processing listener events fully
                if (initialCheckPromise.current) {
                    await initialCheckPromise.current;
                }

                 // Always update state based on the event, but handle company logic specifically on SIGNED_IN
                 // The handleSessionUpdate function now contains the company check logic.
                 await handleSessionUpdate(newSession);

                // Handle redirection on SIGNED_OUT
                if (event === 'SIGNED_OUT') {
                    // Redirect to home if user was in a protected area
                    const protectedPaths = ['/chat', '/knowledge', '/settings'];
                    if (protectedPaths.some(p => pathname?.startsWith(p))) {
                        console.log("AuthProvider: Signed out from protected route, redirecting to /");
                        router.push('/'); // Use push for clearer navigation history
                    }
                }
                // Note: Redirection on SIGNED_IN is usually handled by the login form
                // or components observing the session becoming non-null.
            }
        );

        // Cleanup listener on component unmount
        return () => {
            console.log("AuthProvider: Unmounting, unsubscribing listener.");
            authListener?.subscription.unsubscribe();
            initialCheckPromise.current = null; // Clear the promise ref on unmount
        };
    // Dependencies: router and pathname are needed for redirection logic on signout.
    // signOut is included as it's used within the effect's error handling.
    }, [router, pathname, signOut]); // Rerun if router or pathname changes (for redirection logic)

    // --- Sign In Action ---
    const signInWithPassword = useCallback(async (credentials: SignInWithPasswordCredentials) => {
        console.log("AuthProvider: Attempting sign in...");
        setIsLoading(true); // Indicate loading during sign-in attempt
        try {
            const { error } = await supabase.auth.signInWithPassword(credentials);
            if (error) {
                console.error("AuthProvider: Sign in error:", error);
                // Throw the error so the form can catch it and display specifics
                throw error;
            }
            console.log("AuthProvider: signInWithPassword successful. Waiting for onAuthStateChange.");
            // Don't set loading false here; let onAuthStateChange handle it when the session updates.
        } catch (error) {
            // Ensure loading is set to false if an error is thrown *before* Supabase call returns
            // or if the thrown error needs to be handled immediately.
             setIsLoading(false);
             // Re-throw the error for the form
             throw error;
        }
    }, []);

    // --- Sign Up Action ---
    const signUp = useCallback(async (params: SignUpWithPasswordCredentials) => {
        console.log("AuthProvider: Attempting sign up...");
        setIsLoading(true);
        try {
            // Ensure password is provided and either email or phone is provided
            const hasEmail = 'email' in params && params.email;
            const hasPhone = 'phone' in params && params.phone;
            if (!params.password || (!hasEmail && !hasPhone)) {
                throw new AuthError("Password and either Email or Phone are required for sign up.");
            }

            const { data, error } = await supabase.auth.signUp(params); // Pass params directly

            // Handle Supabase-specific responses
            if (error) {
                 console.error("AuthProvider: Sign up error:", error);
                 toast.error("Registration Failed", { description: error.message || "Could not create account." });
            } else if (data.user && data.session) {
                 // User created AND session started (e.g., auto-confirm enabled)
                 console.log("AuthProvider: Sign up successful and user logged in.");
                 toast.success("Registration Successful!", { description: "You are now logged in." });
                 // onAuthStateChange will handle the session update and company check
            } else if (data.user && !data.session) {
                 // User created but requires confirmation (common case)
                 console.log("AuthProvider: Sign up successful, confirmation required.");
                 // Safely determine which contact method was used for the message
                 const contactMethod = 'email' in params && params.email
                    ? `email (${params.email})`
                    : ('phone' in params && params.phone ? 'phone' : 'provided contact method');
                 toast.success("Registration Submitted", {
                    description: `Please check your ${contactMethod} to confirm your account.`,
                    duration: 10000, // Longer duration for this message
                 });
            } else {
                 // Unexpected case
                 console.warn("AuthProvider: Sign up status unknown.", { data });
                 toast.warning("Registration Status Unknown", { description: "Please try logging in or check your email." });
            }
            setIsLoading(false); // Set loading false after handling response
            return { data, error }; // Return the result for the form

        } catch (error) {
            console.error("AuthProvider: Unexpected sign up error:", error);
            let errorMsg = "An unexpected error occurred during registration.";
            if (error instanceof Error) errorMsg = error.message;
            toast.error("Registration Failed", { description: errorMsg });
            setIsLoading(false);
            // Return an error structure consistent with Supabase response
            // Use AuthError constructor directly
            return { data: { user: null, session: null }, error: error instanceof AuthError ? error : new AuthError(errorMsg) };
        }
    }, []);

    // --- Context Value ---
    const providerValue: AuthContextType = {
        user,
        session,
        isLoading,
        signInWithPassword,
        signUp,
        signOut,
    };

    // --- Render Provider ---
    return (
        <AuthContext.Provider value={providerValue}>
            {/* Optionally render children only after initial load, or show a global loader */}
            {/* {isLoading ? <GlobalLoader /> : children} */}
            {children}
        </AuthContext.Provider>
    );
};

// --- Hook to Use Auth Context ---
export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    // Optional: Add a check if the context is still the default value,
    // which might indicate usage outside the provider or before initialization.
    // This check might be noisy during initial renders.
    // if (context === defaultAuthContextValue && typeof window !== 'undefined') {
    //    console.warn("useAuth hook used possibly outside of AuthProvider or before initialization finished.");
    // }
    return context;
};

```

## File: `lib\supabaseClient.ts`
```ts
// File: lib/supabaseClient.ts
// Purpose: Initialize and export the Supabase client instance.
import { createClient, SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl) {
  console.error("CRITICAL: Missing environment variable NEXT_PUBLIC_SUPABASE_URL");
  throw new Error("Missing environment variable NEXT_PUBLIC_SUPABASE_URL");
}
if (!supabaseAnonKey) {
  console.error("CRITICAL: Missing environment variable NEXT_PUBLIC_SUPABASE_ANON_KEY");
  throw new Error("Missing environment variable NEXT_PUBLIC_SUPABASE_ANON_KEY");
}

// Create a single Supabase client instance to be used throughout the app.
// The Supabase JS client handles session management (storage, refresh) internally.
export const supabase: SupabaseClient = createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
        // Supabase JS client handles token storage automatically (localStorage by default)
        autoRefreshToken: true, // Default: true
        persistSession: true, // Default: true
        detectSessionInUrl: true, // Default: true (handles OAuth, Magic Links, Email Confirm)
    },
    // Optional: Add global fetch options if needed, e.g., for specific headers
    // global: {
    //   fetch: (input, init) => {
    //     // Add custom logic if needed before fetch executes
    //     return fetch(input, init);
    //   },
    // },
});

console.log("Supabase client initialized successfully.");
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

    if (!apiUrl) {
        const errorMessage = "CRITICAL: NEXT_PUBLIC_API_GATEWAY_URL environment variable is not set.";
        console.error(errorMessage);

        // Throw error in production/staging environments
        if (process.env.NODE_ENV === 'production' || process.env.VERCEL_ENV === 'production' || process.env.VERCEL_ENV === 'preview') {
             throw new Error("API Gateway URL is not configured. Please set NEXT_PUBLIC_API_GATEWAY_URL in Vercel environment variables.");
        } else {
            // Provide a default for local development ONLY, with a clear warning.
            // Adjust the default URL if your local gateway runs elsewhere.
            const defaultDevUrl = "http://localhost:8080"; // Default for local FastAPI gateway
            console.warn(`⚠️ ${errorMessage} Using default development URL: ${defaultDevUrl}`);
            return defaultDevUrl;
        }
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
