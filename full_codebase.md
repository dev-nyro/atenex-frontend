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
│   ├── api
│   │   └── auth
│   │       ├── login
│   │       │   └── route.ts
│   │       ├── logout
│   │       │   └── route.ts
│   │       └── register
│   │           └── route.ts
│   ├── contact
│   │   └── page.tsx
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components
│   ├── auth
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
│       ├── alert.tsx
│       ├── avatar.tsx
│       ├── badge.tsx
│       ├── button.tsx
│       ├── card.tsx
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
│   └── utils.ts
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
  
    // You can add other Next.js configurations here as needed:
    // images: {
    //   remotePatterns: [
    //     {
    //       protocol: 'https',
    //       hostname: 'example.com', // Add hostnames for external images
    //     },
    //   ],
    // },
    // experimental: {
    //   // Add experimental features if you use any
    // },
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
    "jsonwebtoken": "^9.0.2",
    "lucide-react": "^0.486.0",
    "next": "^15.2.4",
    "next-themes": "^0.4.6",
    "react": "^19.1.0",
    "react-dom": "^19.1.0",
    "react-dropzone": "^14.3.8",
    "react-hook-form": "^7.55.0",
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
    "@types/jsonwebtoken": "^9.0.9",
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

# Base URL of your deployed API Gateway (REQUIRED for API calls to work)
# Example: http://localhost:8080 if running gateway locally
# Example: https://your-gateway-dev.example.com if deployed
NEXT_PUBLIC_API_GATEWAY_URL=http://localhost:8080

# Dummy JWT Secret for local API route simulation (MATCH THE ONE IN THE API ROUTES)
# IMPORTANT: Use a strong, unique secret and load from actual environment in production!
JWT_SECRET=d698c43f3db9fc7a47ac0a49f159d21296d49636a9d5bf2f592e5308374e5be6

# Add other environment variables needed by your app here
# Example: NEXT_PUBLIC_SOME_CONFIG=value
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
import { useParams, useRouter } from 'next/navigation'; // (+) Import useRouter
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ChatInput } from '@/components/chat/chat-input';
import { ChatMessage, Message } from '@/components/chat/chat-message';
import { RetrievedDocumentsPanel } from '@/components/chat/retrieved-documents-panel';
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import { postQuery, RetrievedDoc, ApiError } from '@/lib/api';
import { toast } from "sonner";
import { PanelRightClose, PanelRightOpen, BrainCircuit } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

const initialMessageContent = 'Hello! How can I help you query your knowledge base today?';
const initialMessages: Message[] = [
    { id: 'initial-1', role: 'assistant', content: initialMessageContent }
];

// (+) Helper function to get localStorage key
const getChatHistoryKey = (id: string | undefined): string | null => {
    return id ? `chatHistory_${id}` : null;
}

export default function ChatPage() {
  const params = useParams();
  const router = useRouter(); // (+) Get router instance
  const chatId = params.chatId ? (Array.isArray(params.chatId) ? params.chatId.join('/') : params.chatId) : undefined;

  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [retrievedDocs, setRetrievedDocs] = useState<RetrievedDoc[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isPanelOpen, setIsPanelOpen] = useState(true);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const [isHistoryLoaded, setIsHistoryLoaded] = useState(false); // (+) Track history loading

  // (*) MODIFIED: Load chat history from localStorage based on chatId
  useEffect(() => {
    setIsHistoryLoaded(false); // Start loading state
    const storageKey = getChatHistoryKey(chatId);
    let loadedMessages = initialMessages; // Default to initial

    if (storageKey && typeof window !== 'undefined') {
        console.log(`Attempting to load history for chat: ${chatId} from key: ${storageKey}`);
        try {
            const storedHistory = localStorage.getItem(storageKey);
            if (storedHistory) {
                const parsedMessages = JSON.parse(storedHistory) as Message[];
                // Basic validation: check if it's an array and has items
                if (Array.isArray(parsedMessages) && parsedMessages.length > 0) {
                    loadedMessages = parsedMessages;
                    console.log(`Successfully loaded ${parsedMessages.length} messages for chat ${chatId}.`);
                } else {
                     console.log(`Stored history for ${chatId} was empty or invalid format. Using initial message.`);
                     // Ensure initial message is set if storage is invalid/empty
                     localStorage.setItem(storageKey, JSON.stringify(initialMessages));
                }
            } else {
                console.log(`No history found for chat ${chatId}. Initializing with default message.`);
                // Store the initial message if none exists
                localStorage.setItem(storageKey, JSON.stringify(initialMessages));
            }
        } catch (error) {
            console.error(`Failed to load or parse chat history for ${chatId}:`, error);
            toast.error("Error loading chat history", { description: "Could not retrieve previous messages. Resetting chat." });
            // Optionally clear corrupted storage
            // localStorage.removeItem(storageKey);
        }
    } else if (!chatId) {
        console.log("No chatId provided, using ephemeral chat state.");
        // For new chats (no ID), just use initial messages without storage interaction yet
    }

    setMessages(loadedMessages);
    setRetrievedDocs([]); // Reset retrieved docs when chat changes
    setIsLoading(false); // Ensure loading indicator is off
    setIsHistoryLoaded(true); // Mark history as loaded

  }, [chatId]); // Depend only on chatId

  // (*) ADDED: Save chat history to localStorage when messages change
  useEffect(() => {
    // Only save if history has been loaded and chatId exists
    if (isHistoryLoaded && chatId && typeof window !== 'undefined') {
        const storageKey = getChatHistoryKey(chatId);
        if (storageKey && messages.length > 0) { // Don't save empty array
            // Avoid saving only the initial default message if no interaction happened yet
            // This check prevents overwriting potentially loaded history with the default
            // if the load effect hasn't finished before this effect runs initially.
            // Or, more simply, just save whatever is in state. Let's go with simpler for MVP.
            try {
                console.log(`Saving ${messages.length} messages for chat ${chatId} to key ${storageKey}`);
                localStorage.setItem(storageKey, JSON.stringify(messages));
            } catch (error) {
                 console.error(`Failed to save chat history for ${chatId}:`, error);
                 toast.error("Error saving chat history", { description: "Could not save the latest messages." });
            }
        }
    }
  }, [messages, chatId, isHistoryLoaded]); // Depend on messages, chatId, and load status

  // Scroll to bottom when messages change
  useEffect(() => {
    if (scrollAreaRef.current) {
        setTimeout(() => {
             if (scrollAreaRef.current) {
                 scrollAreaRef.current.scrollTo({ top: scrollAreaRef.current.scrollHeight, behavior: 'smooth' });
             }
        }, 100); // Small delay to allow render
    }
  }, [messages]); // Depend only on messages

  const handleSendMessage = useCallback(async (query: string) => {
    if (!query.trim() || isLoading) return;

    // (+) If this is the first message in a new chat (no chatId), create one
    let currentChatId = chatId;
    if (!currentChatId) {
        currentChatId = `chat-${Date.now()}`; // Simple unique ID generation
        console.log(`Starting new chat with ID: ${currentChatId}`);
        // Redirect to the new chat URL to persist the ID
        router.replace(`/chat/${currentChatId}`, { scroll: false });
        // Note: The useEffects depending on chatId will re-run after redirect
        // We proceed optimistically with the currentChatId for this message send
    }

    const userMessage: Message = { id: `user-${Date.now()}`, role: 'user', content: query };
    // Update state immediately for responsiveness
    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);
    setRetrievedDocs([]);

    try {
      // Use currentChatId (which might be newly generated)
      const response = await postQuery({ query }); // Assuming postQuery doesn't need chatId yet
      const assistantMessage: Message = {
        id: `assistant-${Date.now()}`,
        role: 'assistant',
        content: response.answer,
        sources: response.retrieved_documents
      };
      setMessages(prev => [...prev, assistantMessage]); // State update triggers save useEffect
      setRetrievedDocs(response.retrieved_documents || []);
      if (response.retrieved_documents && response.retrieved_documents.length > 0 && !isPanelOpen) {
         setIsPanelOpen(true);
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
      setMessages(prev => [...prev, errorMessageObj]); // State update triggers save useEffect

      toast.error("Query Failed", {
        description: errorMessage,
      });

    } finally {
      setIsLoading(false);
    }
  // (+) Added router to dependencies
  }, [isLoading, isPanelOpen, chatId, router]);

  const handlePanelToggle = () => {
        setIsPanelOpen(!isPanelOpen);
    };

  return (
     <ResizablePanelGroup direction="horizontal" className="h-full max-h-[calc(100vh-theme(space.16))]">
            <ResizablePanel defaultSize={isPanelOpen ? 70 : 100} minSize={50}>
                <div className="flex h-full flex-col">
                    <div className="absolute top-2 right-2 z-10">
                        <Button onClick={handlePanelToggle} variant="ghost" size="icon">
                            {isPanelOpen ? <PanelRightClose className="h-5 w-5" /> : <PanelRightOpen className="h-5 w-5" />}
                            <span className="sr-only">{isPanelOpen ? 'Close Sources Panel' : 'Open Sources Panel'}</span>
                        </Button>
                    </div>

                    <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
                        <div className="space-y-4 pr-4">
                            {/* Conditional rendering while history loads */}
                            {!isHistoryLoaded && chatId && (
                                <div className="flex justify-center items-center h-full">
                                    <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
                                    <span className="ml-2 text-muted-foreground">Loading chat history...</span>
                                </div>
                            )}
                            {/* Render messages once loaded */}
                            {isHistoryLoaded && messages.map((message) => (
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
                    <ResizablePanel defaultSize={30} minSize={20} maxSize={40}>
                        <RetrievedDocumentsPanel documents={retrievedDocs} isLoading={isLoading && messages[messages.length - 1]?.role === 'user'} />
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
      <h1 className="text-2xl font-semibold">Knowledge Base Management</h1>

      <Card>
        <CardHeader>
          <CardTitle>Upload Documents</CardTitle>
          <CardDescription>
            Upload new documents (PDF, DOCX, TXT, etc.) to be processed and added to the knowledge base.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <FileUploader />
        </CardContent>
      </Card>

      <Separator />

       <Card>
        <CardHeader>
          <CardTitle>Document Status</CardTitle>
          <CardDescription>
            View the processing status of your uploaded documents.
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
import { Header } from '@/components/layout/header'; //Added This Line
import { useAuth } from '@/lib/hooks/useAuth';
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import { cn } from '@/lib/utils';
// (+) AÑADIR ESTA LÍNEA:
import { removeToken } from '@/lib/auth/helpers';

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const { user, isLoading, token } = useAuth();
  const router = useRouter();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  useEffect(() => {
    if (!isLoading && !token) {
      console.log("AppLayout: No token found, redirecting to login.");
      router.push('/'); // Cambiado a '/'
    } else if (!isLoading && token && !user) {
      console.log("AppLayout: Invalid token found, redirecting to login.");
      // Ahora TypeScript sabe qué es removeToken gracias a la importación
      removeToken();
      router.push('/'); // Cambiado a '/'
    }
    // La función removeToken importada es estable, no necesita estar en las dependencias.
  }, [user, isLoading, token, router]);

  // Muestra un spinner mientras se verifica la autenticación
  if (isLoading || (!token && !isLoading)) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
    );
  }

  // Si no está cargando y no hay usuario/token
  if (!user || !token) {
    console.log("AppLayout: Renderizando null porque no hay usuario/token después de la carga.");
    // Considera redirigir de nuevo aquí como medida extra de seguridad si llega a este punto
    // router.push('/login');
    return null;
  }


  return (
    <div className="flex h-screen bg-secondary/30 dark:bg-muted/30">
      <ResizablePanelGroup
            direction="horizontal"
            className="h-full items-stretch"
        >
          <ResizablePanel
              collapsible
              collapsedSize={4}
              minSize={15}
              maxSize={25}
              defaultSize={20}
              onCollapse={() => setIsSidebarCollapsed(true)}
              onExpand={() => setIsSidebarCollapsed(false)}
              className={cn(
                  "transition-all duration-300 ease-in-out",
                  isSidebarCollapsed ? "min-w-[50px] max-w-[50px]" : "min-w-[200px]"
              )}
          >
              <Sidebar isCollapsed={isSidebarCollapsed} />
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel defaultSize={80} minSize={30}>
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
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';

// Basic placeholder settings page
export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Settings</h1>

      <Card>
        <CardHeader>
          <CardTitle>Profile</CardTitle>
          <CardDescription>Manage your personal information.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
            <div className="space-y-1">
                 <Label htmlFor="name">Name</Label>
                 <Input id="name" defaultValue="Demo User" /> {/* TODO: Fetch user data */}
            </div>
             <div className="space-y-1">
                 <Label htmlFor="email">Email</Label>
                 <Input id="email" type="email" defaultValue="user@example.com" disabled />
            </div>
             <Button>Save Changes</Button>
        </CardContent>
      </Card>

       <Separator />

       <Card>
        <CardHeader>
          <CardTitle>Company Settings</CardTitle>
          <CardDescription>Manage settings related to your company.</CardDescription>
        </CardHeader>
        <CardContent>
           <p className="text-sm text-muted-foreground">Company settings management is not yet implemented.</p>
           {/* Add company settings fields here */}
        </CardContent>
      </Card>

       <Separator />

       <Card>
        <CardHeader>
          <CardTitle>Appearance</CardTitle>
          <CardDescription>Customize the look and feel.</CardDescription>
        </CardHeader>
        <CardContent>
           <p className="text-sm text-muted-foreground">Theme selection is available in the header.</p>
           {/* Add other appearance settings if needed */}
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
        <CardTitle className="text-2xl">Welcome Back!</CardTitle>
        <CardDescription>Sign in to access your Atenex workspace</CardDescription>
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
        <CardTitle className="text-2xl">Create Account</CardTitle>
        <CardDescription>Join Atenex and unlock your knowledge</CardDescription>
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
// app/about/page.tsx
"use client"; // Add this line

import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { APP_NAME } from '@/lib/constants';
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from '@/components/ui/button'; // Import the Button component
import { useRouter } from 'next/navigation'; // Import the useRouter hook

const teamMembers = [
    { name: "Demo User 1", role: "Founder", imageUrl: null },
    { name: "Demo User 2", role: "Co-Founder", imageUrl: null },
    { name: "Demo User 3", role: "Lead Engineer", imageUrl: null },
    // Add more team members as needed
];

const milestones = [
    { year: 2023, event: "Atenex founded with a vision for accessible knowledge." },
    // Add more milestones
];

export default function AboutPage() {
    const router = useRouter(); // Initialize the router

  return (
      <div className="container mx-auto p-6 space-y-4">
          <Button variant="link" onClick={() => router.push('/')}>Back to Home</Button> {/* Button to go back */}
          <h1 className="text-3xl font-semibold">About {APP_NAME}</h1>

          <Card>
              <CardHeader>
                  <CardTitle>Our Mission</CardTitle>
                  <CardDescription>
                      Empowering organizations with seamless access to their collective knowledge.
                  </CardDescription>
              </CardHeader>
              <CardContent>
                  <p>
                      We are committed to providing innovative solutions that streamline knowledge management,
                      facilitate informed decision-making, and enhance team productivity.
                  </p>
              </CardContent>
          </Card>

          <Separator />

          <Card>
              <CardHeader>
                  <CardTitle>Our Vision</CardTitle>
                  <CardDescription>
                      To be the leading knowledge query platform, transforming how businesses leverage information.
                  </CardDescription>
              </CardHeader>
              <CardContent>
                  <p>
                      We envision a future where organizations can effortlessly tap into their internal expertise,
                      fostering a culture of continuous learning and growth.
                  </p>
              </CardContent>
          </Card>

          <Separator />

          <Card>
              <CardHeader>
                  <CardTitle>Our Values</CardTitle>
                  <CardDescription>
                      Integrity, Innovation, Collaboration, and Customer Success.
                  </CardDescription>
              </CardHeader>
              <CardContent>
                  <ul className="list-disc list-inside space-y-1">
                      <li>
                          <strong>Integrity:</strong> We uphold the highest ethical standards in all our operations.
                      </li>
                      <li>
                          <strong>Innovation:</strong> We continuously seek new ways to improve our platform and services.
                      </li>
                      <li>
                          <strong>Collaboration:</strong> We believe in working together to achieve shared goals.
                      </li>
                      <li>
                          <strong>Customer Success:</strong> We are dedicated to helping our customers succeed.
                      </li>
                  </ul>
              </CardContent>
          </Card>
          <Separator />

          <Card>
              <CardHeader>
                  <CardTitle>Meet Our Team</CardTitle>
                  <CardDescription>
                      The talented individuals behind {APP_NAME}.
                  </CardDescription>
              </CardHeader>
              <CardContent className="flex justify-center">
                  <div className="grid sm:grid-cols-3 gap-4"> {/* Flex Container for centering */}
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

## File: `app\api\auth\login\route.ts`
```ts
// Example Backend Route (using Next.js Route Handler - BFF pattern)
// In a real app, this might call your actual Auth microservice or handle auth logic.
// For this example, it simulates login and returns a dummy JWT.

import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken'; // Use a JWT library like 'jsonwebtoken' or 'jose'
// You'd install this: npm install jsonwebtoken @types/jsonwebtoken

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    console.log(`API Route: Login attempt for ${email}`);

    // --- !!! DUMMY AUTHENTICATION LOGIC !!! ---
    // --- !!! REPLACE WITH ACTUAL AUTHENTICATION AGAINST YOUR BACKEND/DB !!! ---
    if (email === 'user@example.com' && password === 'password') {
      // --- DUMMY JWT GENERATION ---
      // --- REPLACE WITH SECURE JWT SIGNING USING A STRONG SECRET KEY ---
      const DUMMY_SECRET = process.env.JWT_SECRET || 'your-very-strong-secret-key-keep-safe'; // LOAD FROM ENV VARS
      const payload = {
        userId: 'dummy-user-id-from-route',
        email: email,
        companyId: 'dummy-company-id-from-route', // Add relevant claims
        // Add expiry (e.g., '1h', '7d')
        exp: Math.floor(Date.now() / 1000) + (60 * 60), // 1 hour expiry
      };
      const token = jwt.sign(payload, DUMMY_SECRET);

       console.log(`API Route: Login successful for ${email}`);
      return NextResponse.json({ access_token: token });
    } else {
        console.log(`API Route: Login failed for ${email}`);
      return NextResponse.json({ detail: 'Invalid credentials' }, { status: 401 });
    }
    // --- END DUMMY LOGIC ---

  } catch (error) {
    console.error("API Route Login Error:", error);
    return NextResponse.json({ detail: 'An error occurred during login' }, { status: 500 });
  }
}
```

## File: `app\api\auth\logout\route.ts`
```ts
// Example Backend Route for Logout (Optional)
// Often, logout is handled purely client-side by clearing the token.
// This route could be used for server-side session invalidation if needed.

import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    console.log("API Route: Logout request received");
    // --- SERVER-SIDE LOGOUT LOGIC (IF ANY) ---
    // e.g., Invalidate refresh tokens, clear server-side session state.
    // For simple JWT, there might be nothing to do here.
    // --- END SERVER-SIDE LOGIC ---

    // Respond with success
    return NextResponse.json({ message: 'Logout successful' });

  } catch (error) {
    console.error("API Route Logout Error:", error);
    return NextResponse.json({ detail: 'An error occurred during logout' }, { status: 500 });
  }
}

// Note: You might also need a GET route or similar to check auth status
// e.g., /api/auth/session which verifies the token and returns user info.
```

## File: `app\api\auth\register\route.ts`
```ts
// Example Backend Route for Registration

import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

export async function POST(request: Request) {
  try {
    const { email, password, name } = await request.json();

    console.log(`API Route: Registration attempt for ${email}`);

    // --- !!! DUMMY REGISTRATION LOGIC !!! ---
    // --- !!! REPLACE WITH ACTUAL USER CREATION IN YOUR BACKEND/DB !!! ---
    // Check if user already exists, create user, etc.
    // For demo, assume registration is always successful if email/password provided
    if (!email || !password) {
        return NextResponse.json({ detail: 'Email and password are required' }, { status: 400 });
    }

     // --- DUMMY USER CREATION ---
     const newUser = {
        id: `dummy-user-${Date.now()}`,
        email: email,
        name: name || `User ${Date.now()}`,
        companyId: `dummy-company-${Date.now()}` // Assign a dummy company
     }

    // --- DUMMY JWT GENERATION AFTER REGISTRATION ---
    const DUMMY_SECRET = process.env.JWT_SECRET || 'your-very-strong-secret-key-keep-safe';
    const payload = {
        userId: newUser.id,
        email: newUser.email,
        companyId: newUser.companyId,
        exp: Math.floor(Date.now() / 1000) + (60 * 60), // 1 hour expiry
    };
    const token = jwt.sign(payload, DUMMY_SECRET);

    console.log(`API Route: Registration successful for ${email}`);
    // Return token and user info (omit sensitive data like password hash)
    return NextResponse.json({ access_token: token, user: { id: newUser.id, email: newUser.email, name: newUser.name, companyId: newUser.companyId } });
    // --- END DUMMY LOGIC ---

  } catch (error) {
    console.error("API Route Register Error:", error);
    // Handle specific errors like "user already exists" if applicable
    return NextResponse.json({ detail: 'An error occurred during registration' }, { status: 500 });
  }
}
```

## File: `app\contact\page.tsx`
```tsx
// app/contact/page.tsx
"use client"; // Add this line

import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { APP_NAME } from '@/lib/constants';
import { Mail, Phone, MapPin } from 'lucide-react';
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useRouter } from 'next/navigation'; // Import the useRouter hook

export default function ContactPage() {
    const router = useRouter(); // Initialize the router

    return (
        <div className="container mx-auto p-6 space-y-4">
            <Button variant="link" onClick={() => router.push('/')}>Back to Home</Button> {/* Button to go back */}
            <h1 className="text-3xl font-semibold">Contact {APP_NAME}</h1>

            <Card>
                <CardHeader>
                    <CardTitle>General Inquiries</CardTitle>
                    <CardDescription>
                        For questions about our platform, features, or pricing.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                    <div className="flex items-center space-x-2">
                        <Mail className="h-4 w-4 text-muted-foreground" />
                        <a href="mailto:info@example.com">info@example.com</a>
                    </div>
                    <div className="flex items-center space-x-2">
                        <Phone className="h-4 w-4 text-muted-foreground" />
                        <span>(123) 456-7890</span>
                    </div>
                </CardContent>
            </Card>

            <Separator />

            <Card>
                <CardHeader>
                    <CardTitle>Support</CardTitle>
                    <CardDescription>
                        Need help with using the platform? Contact our support team.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                    <div className="flex items-center space-x-2">
                        <Mail className="h-4 w-4 text-muted-foreground" />
                        <a href="mailto:support@example.com">support@example.com</a>
                    </div>
                </CardContent>
            </Card>

            <Separator />

            <Card>
                <CardHeader>
                    <CardTitle>Contact Form</CardTitle>
                    <CardDescription>Send us a message directly.</CardDescription>
                </CardHeader>
                <CardContent>
                    <form className="grid gap-4">
                        <div className="grid gap-2">
                            <Label htmlFor="name">Your Name</Label>
                            <Input id="name" placeholder="John Doe" type="text" />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="email">Email</Label>
                            <Input id="email" placeholder="johndoe@example.com" type="email" />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="message">Message</Label>
                            <Textarea id="message" placeholder="Write your message here." />
                        </div>
                        <Button>Send Message</Button>
                    </form>
                </CardContent>
            </Card>

            <Separator />

            <Card>
                <CardHeader>
                    <CardTitle>Our Office</CardTitle>
                    <CardDescription>
                        Visit us at our headquarters.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                    <div className="flex items-center space-x-2">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                        <span>123 Main Street, Anytown, CA 12345</span>
                    </div>
                    {/* Google Maps Embed or similar here if desired */}
                </CardContent>
            </Card>
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
// (*) Ensure this import points to sonner's Toaster
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "Atenex - Enterprise Knowledge Query",
  description: "Query your enterprise knowledge base using natural language.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
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
// app/page.tsx
"use client";

import React from 'react';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { APP_NAME } from '@/lib/constants';
import { useAuth } from '@/lib/hooks/useAuth';

export default function HomePage() {
  const router = useRouter();
  const { token } = useAuth();

  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Header/Navigation */}
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-md border-b">
        <div className="container flex items-center justify-between h-16 py-4 px-4"> {/* (+) Added px-4 */}
          <a href="/" className="font-bold text-2xl text-primary">{APP_NAME}</a>
          <nav className="flex items-center space-x-4 sm:space-x-6 lg:space-x-8">
            <LinkButton href="/">Home</LinkButton>
            <LinkButton href="/about">About Us</LinkButton>
            <LinkButton href="/contact">Contact Us</LinkButton>
            {token ?
              <Button variant="secondary" onClick={() => router.push('/chat')} className="ml-2">
                Go to App
              </Button>
              :
              <Button onClick={() => router.push('/login')}>
                Login
              </Button>
            }

          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-16 md:py-24 flex-1">
        <section className="text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-foreground mb-6">
            Unlock Your Enterprise Knowledge with <span className="text-primary">{APP_NAME}</span>
          </h1>
          <p className="text-lg text-muted-foreground mb-8">
            Ask questions in natural language and get instant answers based on your organization's collective knowledge.
          </p>
          <Button size="lg" onClick={() => token ? router.push('/chat') : router.push('/register')}>
            {token ? 'Go to Chat' : 'Get Started'}
          </Button>
        </section>

        <section className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Feature Cards - replace with actual feature descriptions */}
          <FeatureCard title="Intelligent Search" description="Find the information you need quickly and easily using natural language queries." />
          <FeatureCard title="Centralized Knowledge" description="Access all your organization's knowledge in one place, eliminating information silos." />
          <FeatureCard title="Improved Productivity" description="Empower your team to make better decisions with faster access to relevant insights." />
        </section>
      </main>

      {/* Footer (optional) */}
      <footer className="bg-secondary/10 border-t py-8">
        <div className="container text-center text-muted-foreground"> {/* (+) Added text-center */}
          © {new Date().getFullYear()} Atenex. All rights reserved.
        </div>
      </footer>
    </div>
  );
}

// Reusable Button Component
function LinkButton({ href, children }: { href: string; children: React.ReactNode }) {
  const router = useRouter();
  return (
    <Button variant="link" onClick={() => router.push(href)}>
      {children}
    </Button>
  );
}

// Reusable Feature Card Component
function FeatureCard({ title, description }: { title: string; description: string }) {
  return (
    <div className="p-6 rounded-lg shadow-md bg-card hover:shadow-xl transition-shadow duration-200">
      <h3 className="text-xl font-semibold text-foreground mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
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
import { useAuth } from '@/lib/hooks/useAuth';
import { loginUser, ApiError } from '@/lib/api'; // Import ApiError

const loginSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters' }),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export function LoginForm() {
  const { login: setAuthToken } = useAuth(); // Use the context login function
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: LoginFormValues) => {
    setIsLoading(true);
    setError(null);
    try {
      console.log("Attempting login with:", data.email);
      const token = await loginUser(data);
      console.log("Login successful, received token.");
      setAuthToken(token); // Update auth state and redirect
      // Redirect happens inside useAuth's login function
    } catch (err) {
      console.error("Login failed:", err);
      let errorMessage = 'Login failed. Please check your credentials.';
       if (err instanceof ApiError) {
         // Use specific error message from API if available
         errorMessage = err.message || errorMessage;
       } else if (err instanceof Error) {
           errorMessage = err.message || errorMessage;
       }
      setError(errorMessage);
      setIsLoading(false);
    }
    // No need to set isLoading false here if redirect happens on success
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      <div className="space-y-1">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          placeholder="name@example.com"
          required
          {...form.register('email')}
          aria-invalid={form.formState.errors.email ? 'true' : 'false'}
        />
        {form.formState.errors.email && (
          <p className="text-sm text-destructive">{form.formState.errors.email.message}</p>
        )}
      </div>
      <div className="space-y-1">
        <Label htmlFor="password">Password</Label>
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
      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : 'Login'}
      </Button>
       <div className="mt-4 text-center text-sm">
         Don't have an account?{" "}
         <Link href="/register" className="underline text-primary hover:text-primary/80">
           Register
         </Link>
       </div>
    </form>
  );
}
```

## File: `components\auth\register-form.tsx`
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
import { useAuth } from '@/lib/hooks/useAuth';
import { registerUser, ApiError } from '@/lib/api';

const registerSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters' }).optional(),
  email: z.string().email({ message: 'Invalid email address' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters' }),
  // confirmPassword: z.string(), // Add if needed
// }).refine(data => data.password === data.confirmPassword, {
//   message: "Passwords don't match",
//   path: ["confirmPassword"], // path of error
});

type RegisterFormValues = z.infer<typeof registerSchema>;

export function RegisterForm() {
  const { login } = useAuth(); // Use login from auth context to set token after registration
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: RegisterFormValues) => {
    setIsLoading(true);
    setError(null);
    setSuccess(false);
    try {
      console.log("Attempting registration with:", data.email);
      const response = await registerUser(data);
      console.log("Registration successful:", response);
      setSuccess(true);
       // Automatically log in the user after successful registration
       if (response.access_token) {
         login(response.access_token);
         // Redirect happens inside useAuth's login
       } else {
          setError("Registration successful, but failed to automatically log in.");
           setIsLoading(false);
       }

    } catch (err) {
        console.error("Registration failed:", err);
        let errorMessage = 'Registration failed. Please try again.';
        if (err instanceof ApiError) {
          errorMessage = err.message || errorMessage;
        } else if (err instanceof Error) {
           errorMessage = err.message || errorMessage;
        }
        setError(errorMessage);
        setIsLoading(false);
    }
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
       {success && !error && ( // Show success only if no subsequent error occurred
        <Alert variant="default" className="bg-green-100 dark:bg-green-900 border-green-300 dark:border-green-700">
          {/* <CheckCircle className="h-4 w-4 text-green-700 dark:text-green-300" /> */}
          <AlertTitle className="text-green-800 dark:text-green-200">Success</AlertTitle>
          <AlertDescription className="text-green-700 dark:text-green-300">
            Account created successfully! Redirecting...
          </AlertDescription>
        </Alert>
      )}
      <div className="space-y-1">
        <Label htmlFor="name">Name (Optional)</Label>
        <Input
          id="name"
          type="text"
          placeholder="Your Name"
          {...form.register('name')}
          aria-invalid={form.formState.errors.name ? 'true' : 'false'}
        />
         {form.formState.errors.name && (
          <p className="text-sm text-destructive">{form.formState.errors.name.message}</p>
        )}
      </div>
      <div className="space-y-1">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          placeholder="name@example.com"
          required
          {...form.register('email')}
          aria-invalid={form.formState.errors.email ? 'true' : 'false'}
        />
        {form.formState.errors.email && (
          <p className="text-sm text-destructive">{form.formState.errors.email.message}</p>
        )}
      </div>
      <div className="space-y-1">
        <Label htmlFor="password">Password</Label>
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
      {/* Add Confirm Password if needed */}
      <Button type="submit" className="w-full" disabled={isLoading || success}>
        {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : 'Create Account'}
      </Button>
      <div className="mt-4 text-center text-sm">
        Already have an account?{" "}
        <Link href="/login" className="underline text-primary hover:text-primary/80">
          Login
        </Link>
      </div>
    </form>
  );
}
```

## File: `components\chat\chat-history.tsx`
```tsx
"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { MessageSquareText, Trash2 } from 'lucide-react'; // Import icons
import { cn } from '@/lib/utils';

// Dummy data - replace with actual chat history fetching
const dummyHistory = [
  { id: 'chat-1', title: 'Q3 Marketing Strategy' },
  { id: 'chat-2', title: 'Competitor Analysis - Project X' },
  { id: 'chat-3', title: 'Onboarding Process Review' },
  { id: 'chat-4', title: 'API Documentation Query' },
  { id: 'chat-5', title: 'Financial Report Summary' },
  { id: 'chat-6', title: 'Long Chat Title That Might Need Truncation Example' },
];

export function ChatHistory() {
  const pathname = usePathname();
  // TODO: Fetch actual chat history, maybe store in state or use a hook
  const [history, setHistory] = useState(dummyHistory);

  const handleDeleteChat = (id: string, event: React.MouseEvent) => {
     event.stopPropagation(); // Prevent link navigation when clicking delete
     event.preventDefault();
     console.log("Deleting chat:", id);
     // TODO: Implement actual deletion logic (API call, update state)
     setHistory(prev => prev.filter(chat => chat.id !== id));
  }

  return (
    <ScrollArea className="h-[300px] flex-1"> {/* Adjust height as needed */}
      <div className="flex flex-col gap-1 p-2">
        {history.length === 0 && (
          <p className="text-sm text-muted-foreground px-2 py-4 text-center">No chat history yet.</p>
        )}
        {history.map((chat) => {
           const isActive = pathname === `/chat/${chat.id}`;
           return (
            <Link key={chat.id} href={`/chat/${chat.id}`} passHref legacyBehavior>
                <Button
                    variant={isActive ? "secondary" : "ghost"}
                    className={cn(
                        "w-full justify-between h-10 group",
                        isActive ? "bg-muted hover:bg-muted" : ""
                    )}
                    title={chat.title}
                >
                    <div className="flex items-center overflow-hidden">
                        <MessageSquareText className="h-4 w-4 mr-2 flex-shrink-0" />
                        <span className="truncate flex-1 text-sm">{chat.title}</span>
                    </div>
                    <Trash2
                        className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity duration-150 flex-shrink-0 hover:text-destructive"
                        onClick={(e) => handleDeleteChat(chat.id, e)}
                        aria-label={`Delete chat: ${chat.title}`}
                    />
                </Button>
            </Link>
           );
        })}
      </div>
    </ScrollArea>
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
      // TODO: Fetch messages for the specific chatId from backend/localStorage
      // setMessages(fetchedMessages);
      setMessages([ // Dummy loading
           { id: 'initial-1', role: 'assistant', content: `Welcome back to chat ${chatId}. Ask me anything!` }
      ]);
    } else {
      // New chat
      setMessages(initialMessages);
    }
  }, [chatId]);

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
```

## File: `components\chat\retrieved-documents-panel.tsx`
```tsx
// File: components/chat/retrieved-documents-panel.tsx
"use client"; // (+) ADDED "use client" directive

import React, { useState } from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { FileText, AlertCircle, Download, Eye } from 'lucide-react'; // (+) ADDED Download, Eye icons
import { RetrievedDoc } from '@/lib/api';
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button'; // (+) ADDED Button import
// (+) ADDED Dialog imports from shadcn/ui (assuming it re-exports Radix)
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader, // (+) Use DialogHeader
    DialogTitle,
    DialogTrigger,
    DialogFooter, // (+) Use DialogFooter
    DialogClose   // (+) Use DialogClose for explicit closing
} from "@/components/ui/dialog"; // (*) ADJUST path if needed
import { toast } from "sonner"; // (+) ADDED for download feedback

interface RetrievedDocumentsPanelProps {
  documents: RetrievedDoc[];
  isLoading: boolean;
}

export function RetrievedDocumentsPanel({ documents, isLoading }: RetrievedDocumentsPanelProps) {
    // (+) ADDED state for dialog
    const [selectedDoc, setSelectedDoc] = useState<RetrievedDoc | null>(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const handleViewDocument = (doc: RetrievedDoc) => {
        console.log("Viewing document details:", doc.document_id || doc.id);
        setSelectedDoc(doc);
        setIsDialogOpen(true); // Open the Dialog
    };

    const handleDownloadDocument = (doc: RetrievedDoc) => {
        // TODO: Implement actual document download logic when backend endpoint exists
        const message = `Download requested for: ${doc.file_name || doc.id}`;
        console.log(message);
        // Use toast for user feedback
        toast.info("Download Not Implemented", {
             description: `Backend endpoint for downloading '${doc.file_name || doc.id}' is not yet available.`,
             action: {
                label: "Close",
                onClick: () => {}, // No-op, just closes the toast
             },
        });
        // Close the dialog after attempting download
        // setIsDialogOpen(false); // Optional: keep dialog open if preferred
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
                {isLoading && documents.length === 0 && (
                    <>
                    <Skeleton className="h-20 w-full rounded-md" />
                    <Skeleton className="h-20 w-full rounded-md" />
                    <Skeleton className="h-20 w-full rounded-md" />
                    </>
                )}
                {!isLoading && documents.length === 0 && (
                    <div className="flex flex-col items-center justify-center h-40 text-center text-muted-foreground">
                    <AlertCircle className="h-8 w-8 mb-2" />
                    <p className="text-sm">No relevant documents found for the last query.</p>
                    </div>
                )}
                {documents.map((doc, index) => (
                    // (+) Use DialogTrigger to open the modal on click
                    <DialogTrigger asChild key={doc.id || `doc-${index}`}>
                         <Card
                            className="cursor-pointer hover:shadow-md transition-shadow duration-150"
                            onClick={() => handleViewDocument(doc)} // Set selected doc on click
                            title={`Click to view details for ${doc.file_name || 'document'}`}
                        >
                            <CardContent className="p-3 space-y-1 text-sm">
                                <div className="flex justify-between items-start">
                                    <p className="font-medium text-primary truncate pr-2">
                                        {index + 1}. {doc.file_name || doc.document_id || `Chunk ${doc.id.substring(0, 8)}`}
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
                                {/* Optional Metadata */}
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

            {/* (+) Document Dialog Content */}
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
                        <div className="flex justify-between">
                            <span className="font-medium text-muted-foreground">Document ID:</span>
                            <span className="font-mono text-xs bg-muted px-1 rounded">{selectedDoc.document_id || 'N/A'}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="font-medium text-muted-foreground">Chunk ID:</span>
                            <span className="font-mono text-xs bg-muted px-1 rounded">{selectedDoc.id}</span>
                        </div>
                         <div className="flex justify-between">
                            <span className="font-medium text-muted-foreground">Relevance Score:</span>
                            <span>{selectedDoc.score?.toFixed(4) ?? 'N/A'}</span>
                        </div>
                        <div>
                            <span className="font-medium text-muted-foreground block mb-1">Content Preview:</span>
                            <ScrollArea className="max-h-[250px] border rounded p-2 bg-muted/50 text-xs">
                                <pre className="whitespace-pre-wrap break-words">{selectedDoc.content_preview || 'No content preview available.'}</pre>
                            </ScrollArea>
                        </div>
                        {/* Display other metadata if needed */}
                        {selectedDoc.metadata && Object.keys(selectedDoc.metadata).length > 0 && (
                             <div>
                                <span className="font-medium text-muted-foreground block mb-1">Metadata:</span>
                                <ScrollArea className="max-h-[100px] border rounded p-2 bg-muted/50 text-xs">
                                   <pre className="whitespace-pre-wrap break-words">
                                       {JSON.stringify(selectedDoc.metadata, null, 2)}
                                   </pre>
                                </ScrollArea>
                            </div>
                        )}
                    </div>
                    <DialogFooter>
                        {/* Action buttons */}
                        <Button variant="outline" onClick={() => handleDownloadDocument(selectedDoc)}>
                            <Download className="mr-2 h-4 w-4" />
                            Download Original (N/A)
                        </Button>
                        <DialogClose asChild>
                           <Button variant="secondary">Close</Button>
                        </DialogClose>
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
import { AlertCircle, CheckCircle2, Clock, Loader2, RefreshCw, Info } from 'lucide-react'; // (+) Added Info icon
import { listDocumentStatuses, DocumentStatusResponse, ApiError } from '@/lib/api'; // (+) Import ApiError
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Skeleton } from '@/components/ui/skeleton';
import { toast } from "sonner"; // (*) Use sonner directly
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip" // (+) Import Tooltip for error messages

type DocumentStatus = DocumentStatusResponse;

export function DocumentStatusList() {
    const [statuses, setStatuses] = useState<DocumentStatus[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchStatuses = useCallback(async (showToast = false) => {
        setIsLoading(true);
        setError(null); // Clear previous errors
        try {
            // (*) Call the correct API function
            const data = await listDocumentStatuses();
            setStatuses(data);
            if (showToast) {
                 // (*) Use sonner toast
                 toast.success("Statuses Refreshed", { description: `Loaded ${data.length} document statuses.`});
            }
            console.log(`Fetched ${data.length} document statuses.`);
        } catch (err) {
            console.error("Failed to fetch document statuses:", err);
            // (*) Improved error message extraction
            let message = "Could not load document statuses.";
            if (err instanceof ApiError) {
                message = err.message || message;
            } else if (err instanceof Error) {
                message = err.message;
            }
            setError(message); // Set error state for UI feedback
            // (*) Use sonner toast for error
            toast.error("Error Loading Statuses", { description: message });
            // setStatuses([]); // Keep potentially stale data or clear? Clearing might be confusing. Let's keep stale data but show error.
        } finally {
            setIsLoading(false);
        }
    }, []); // No dependencies needed if listDocumentStatuses is stable

    useEffect(() => {
        fetchStatuses(false); // Fetch on initial mount
        // Optional: Set up polling if needed
        // const intervalId = setInterval(() => fetchStatuses(false), 30000); // Refresh every 30s
        // return () => clearInterval(intervalId);
    }, [fetchStatuses]);

    const handleRefresh = () => {
        fetchStatuses(true); // Fetch manually with toast feedback
    };

    const getStatusBadge = (status: DocumentStatus['status']) => {
       switch (status) {
            case 'uploaded':
                return <Badge variant="outline" className="border-blue-300 text-blue-700 bg-blue-50 dark:border-blue-700 dark:text-blue-300 dark:bg-blue-900/30"><Clock className="mr-1 h-3 w-3" />Uploaded</Badge>;
            case 'processing':
                return <Badge variant="secondary" className="border-yellow-300 text-yellow-800 bg-yellow-50 dark:border-yellow-600 dark:text-yellow-200 dark:bg-yellow-900/30"><Loader2 className="mr-1 h-3 w-3 animate-spin" />Processing</Badge>;
            case 'processed': // Treat processed/indexed similarly for display
            case 'indexed': // Added based on potential backend status
                return <Badge variant="default" className="bg-green-100 text-green-800 border-green-300 hover:bg-green-200 dark:bg-green-900/30 dark:text-green-200 dark:border-green-700"><CheckCircle2 className="mr-1 h-3 w-3" />Processed</Badge>;
            case 'error':
                return <Badge variant="destructive"><AlertCircle className="mr-1 h-3 w-3" />Error</Badge>;
            default:
                const unknownStatus: string = status; // Cast to string for display
                return <Badge variant="outline"><Info className="mr-1 h-3 w-3" />Unknown ({unknownStatus})</Badge>;
        }
    };

    const formatDateTime = (dateString?: string) => {
      if (!dateString) return 'N/A';
        try {
            return new Date(dateString).toLocaleString(undefined, {
                year: 'numeric', month: 'short', day: 'numeric',
                hour: 'numeric', minute: '2-digit' // Adjusted format
            });
        } catch {
            return dateString;
        }
    };

     const renderContent = () => {
        // Show skeletons only on initial load when statuses array is empty
        if (isLoading && statuses.length === 0) {
            return Array.from({ length: 5 }).map((_, index) => (
                <TableRow key={`skel-${index}`}>
                    <TableCell><Skeleton className="h-4 w-3/4" /></TableCell>
                    <TableCell><Skeleton className="h-6 w-20" /></TableCell> {/* Badge size */}
                    <TableCell><Skeleton className="h-4 w-full" /></TableCell>
                    <TableCell><Skeleton className="h-4 w-1/2" /></TableCell>
                </TableRow>
            ));
        }

        // Show error message if fetching failed, even if stale data exists
        if (error && statuses.length === 0) { // Show big error only if list is empty
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

        // Show message if the list is empty after loading and no error occurred
        if (!isLoading && !error && statuses.length === 0) {
            return (
                <TableRow>
                    <TableCell colSpan={4} className="text-center text-muted-foreground py-8">
                        No documents found. Upload documents using the form above.
                    </TableCell>
                </TableRow>
            );
        }

        // Render the actual data rows (potentially stale if error occurred but data exists)
        return statuses.map((doc) => (
            <TableRow key={doc.document_id}>
                <TableCell className="font-medium truncate max-w-xs" title={doc.file_name}>
                    {doc.file_name || 'N/A'}
                </TableCell>
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
                        // Display backend message if available (e.g., for 'uploaded' or 'processing')
                        doc.message || '--' // Use message field from response if present
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
                 {/* Show error indicator if fetch failed but list might have stale data */}
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
                {/* Loading overlay */}
                {isLoading && statuses.length > 0 && ( // Show overlay only when refreshing existing data
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

    import React from 'react';
    import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
    import { Button } from "@/components/ui/button";
    import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
    import { LogOut, Settings, User as UserIcon, Menu, Home } from "lucide-react";
    import { useAuth } from '@/lib/hooks/useAuth';
    import { APP_NAME } from '@/lib/constants';
    import { ThemePaletteButton } from '@/components/theme-palette-button';
    import { useRouter } from 'next/navigation';

    export function Header() {
      const { user, logout } = useAuth();
        const router = useRouter();
        const getInitials = (name?: string) => {
          if (!name) return '?';
          return name.split(' ').map(n => n[0]).slice(0, 2).join('').toUpperCase();
        };

        return (
          <header className="sticky top-0 z-10 flex h-16 items-center justify-between border-b bg-background px-4 md:px-6">
            {/* Left side - Home Link */}
            <div className="flex items-center">
                <Button variant="ghost" size="icon" onClick={() => router.push('/')}>
                    <Home className="h-5 w-5" />
                    <span className="sr-only">Home</span>
                </Button>
                <span className="text-lg font-semibold hidden md:inline">{APP_NAME}</span>
                {/* Add Breadcrumbs or dynamic title here */}
            </div>


            {/* Right side - Theme toggle and User menu */}
            <div className="flex items-center space-x-4">
              <ThemePaletteButton />
              {user && (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-9 w-9 rounded-full">
                      <Avatar className="h-9 w-9">
                        {/* Add AvatarImage if user has profile picture URL */}
                        {/* <AvatarImage src="/avatars/01.png" alt={user.name || user.email} /> */}
                        <AvatarFallback className="bg-primary text-primary-foreground">
                          {getInitials(user.name)}
                        </AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56" align="end" forceMount>
                    <DropdownMenuLabel className="font-normal">
                      <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">{user.name || 'User'}</p>
                        <p className="text-xs leading-none text-muted-foreground">
                          {user.email}
                        </p>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    {/* Add links to settings or profile page */}
                    <DropdownMenuItem onClick={() => router.push('/settings')}>
                      <Settings className="mr-2 h-4 w-4" />
                      <span>Settings</span>
                      {/* <DropdownMenuShortcut>⌘S</DropdownMenuShortcut> */}
                    </DropdownMenuItem>
                    {/* Remove Profile DropDown Option
                    <DropdownMenuItem>
                      <UserIcon className="mr-2 h-4 w-4" />
                      <span>Profile</span>
                      {/* <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
                    </DropdownMenuItem> */}
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={logout} className="cursor-pointer text-destructive focus:text-destructive focus:bg-destructive/10">
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Log out</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              )}
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
// File: components/ui/button.tsx
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
        "icon-palette": // New variant
          "border bg-transparent shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50",
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
import { getToken } from './auth/helpers';
import { getApiGatewayUrl } from './utils';
import type { User } from './auth/helpers';

// --- ApiError Class ---
interface ApiErrorData {
    detail?: string | { msg: string; type: string }[] | any;
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
    // Set the prototype explicitly.
    Object.setPrototypeOf(this, ApiError.prototype);
  }
}

// --- Core Request Function ---
async function request<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {

  let url: string;
  const cleanEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;

  // Determine if internal Next.js API route or external gateway route
  const isInternalApiRoute = cleanEndpoint.startsWith('/api/') && !cleanEndpoint.startsWith('/api/v1/');

  if (isInternalApiRoute) {
    // Use relative URL for internal routes
    url = cleanEndpoint;
    // console.debug(`Internal API Request Target: ${url}`);
  } else {
    // Use absolute API Gateway URL for external routes
    const gatewayUrl = getApiGatewayUrl();
    url = `${gatewayUrl}${cleanEndpoint}`;
    // console.debug(`External API Request Target: ${url}`);
  }

  const token = getToken();
  const headers = new Headers(options.headers || {});

  headers.set('Accept', 'application/json');
  // Don't set Content-Type for FormData, browser handles it with boundary
  if (!(options.body instanceof FormData)) {
     headers.set('Content-Type', 'application/json');
  }

  // Add Authorization header if token exists
  if (token) {
    headers.set('Authorization', `Bearer ${token}`);
  }

  // Add Company ID if available (assuming it's needed by backend - check READMEs)
  // This might be better handled in a dedicated function or middleware if complex
  // For now, let's assume the gateway extracts it from JWT or it's not needed here explicitly
  // Example:
  // const user = getUserFromToken(token); // You'd need this function
  // if (user?.companyId) {
  //    headers.set('X-Company-ID', user.companyId); // Header name from READMEs
  // }

  const config: RequestInit = {
    ...options,
    headers,
    // Add timeout? Fetch doesn't support it directly, need AbortController
  };

  console.log(`API Request: ${config.method || 'GET'} ${url}`);

  try {
    const response = await fetch(url, config);

    if (!response.ok) {
      let errorData: ApiErrorData | null = null;
      let errorText = '';
      try {
        // Try to parse JSON error body first
        errorData = await response.json();
      } catch (e) {
        // If JSON parsing fails, try to get text body
        try {
           errorText = await response.text();
           console.warn("API error response was not valid JSON:", errorText);
        } catch (textErr) {
             console.warn("Could not read API error response body.");
        }
      }

      // Extract a meaningful error message
      let errorMessage = `HTTP error ${response.status}`;
      if (errorData?.detail && typeof errorData.detail === 'string') {
          errorMessage = errorData.detail;
      } else if (errorData?.detail && Array.isArray(errorData.detail)) {
          errorMessage = errorData.detail.map(e => (typeof e === 'object' && e !== null && 'msg' in e) ? e.msg : String(e)).join(', ');
      } else if (errorData?.message) {
          errorMessage = errorData.message;
      } else if (errorText) {
          errorMessage = errorText.substring(0, 200); // Limit length
      }

      console.error(`API Error: ${response.status} ${errorMessage}`, { url, data: errorData, text: errorText });
      throw new ApiError(errorMessage, response.status, errorData || undefined);
    }

    // Handle No Content response
    if (response.status === 204 || response.headers.get('content-length') === '0') {
        console.log(`API Success: ${response.status} No Content`);
        // Return an empty object or null based on expected type T
        // Using {} as T might be problematic if T expects specific fields.
        // Consider returning null or making T potentially null. For now, {} as T.
        return {} as T;
    }

    // Parse successful JSON response
    try {
        const data: T = await response.json();
        // console.debug(`API Success: ${response.status}`, { url, data });
        return data;
    } catch (jsonError) {
         console.error(`API Error: Failed to parse JSON response for ${response.status}`, { url, error: jsonError });
         throw new ApiError(`Invalid JSON response from server`, response.status);
    }

  } catch (error) {
    if (error instanceof ApiError) {
      // Re-throw known API errors
      throw error;
    } else if (error instanceof TypeError && error.message === 'Failed to fetch') {
        // Handle Network errors specifically
        console.error('Network Error:', { url, error });
        throw new ApiError('Network error: Could not connect to the server.', 0); // Use status 0 for network errors
    }
    else {
      // Handle other unexpected errors (e.g., programming errors in this function)
      console.error('Unexpected error during API request:', { url, error });
      throw new ApiError(error instanceof Error ? error.message : 'An unexpected error occurred', 500);
    }
  }
}

// --- Auth Service (Internal API Routes) ---
export const loginUser = async (credentials: { email: string; password: string }) => {
  const response = await request<{ access_token: string }>('/api/auth/login', {
    method: 'POST',
    body: JSON.stringify(credentials),
  });
  return response.access_token;
};

export const registerUser = async (details: { email: string; password: string; name?: string }) => {
    const response = await request<{ access_token: string; user: User }>('/api/auth/register', {
        method: 'POST',
        body: JSON.stringify(details),
    });
    return response;
};

// --- Ingest Service (External API Routes - /api/v1/ingest) ---
export interface IngestResponse {
    document_id: string;
    task_id: string;
    status: string; // Should match DocumentStatus values
    message: string;
}

export const uploadDocument = async (formData: FormData, metadata: Record<string, any> = {}) => {
    // Metadata is now expected as JSON string in the form data by backend
    formData.append('metadata_json', JSON.stringify(metadata));
    // Headers are set within the `request` function, including Authorization
    // Content-Type for FormData is handled automatically by the browser/fetch
    return request<IngestResponse>('/api/v1/ingest', {
        method: 'POST',
        body: formData,
        // No need to set Content-Type header here for FormData
    });
};

export interface DocumentStatusResponse {
    document_id: string;
    // Use specific statuses based on backend enum/definition
    status: 'uploaded' | 'processing' | 'processed' | 'indexed' | 'error' | string; // Allow string for potential future statuses
    file_name?: string | null; // Make optional as per backend schema
    file_type?: string | null; // Make optional
    chunk_count?: number | null;
    error_message?: string | null;
    last_updated?: string; // ISO 8601 date string
    message?: string | null; // Optional message field from backend
}

export const getDocumentStatus = async (documentId: string): Promise<DocumentStatusResponse> => {
  return request<DocumentStatusResponse>(`/api/v1/ingest/status/${documentId}`, {
    method: 'GET',
  });
};

// Function to list all document statuses for the company (uses X-Company-ID from token via gateway)
export const listDocumentStatuses = async (): Promise<DocumentStatusResponse[]> => {
    console.log("Calling listDocumentStatuses API function...");
    return request<DocumentStatusResponse[]>('/api/v1/ingest/status', {
         method: 'GET',
    });
};


// --- Query Service (External API Routes - /api/v1/query) ---
export interface QueryPayload {
    query: string;
    retriever_top_k?: number; // Optional based on backend schema
    // Add chat_history if needed by backend in future
    // chat_history?: { role: 'user' | 'assistant', content: string }[];
}

export interface RetrievedDoc {
    id: string; // Chunk ID from Milvus/vector store
    score?: number | null;
    content_preview?: string | null; // Or full content if backend provides it
    metadata?: Record<string, any> | null;
    document_id?: string | null; // Original document ID from Supabase
    file_name?: string | null; // Original filename
}

export interface QueryApiResponse {
    answer: string;
    retrieved_documents: RetrievedDoc[];
    query_log_id?: string | null; // Optional based on backend schema
}

export const postQuery = async (payload: QueryPayload): Promise<QueryApiResponse> => {
  return request<QueryApiResponse>('/api/v1/query', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
};
```

## File: `lib\auth\helpers.ts`
```ts
import { AUTH_TOKEN_KEY } from "@/lib/constants";

// Basic token handling for client-side (use HttpOnly cookies in production)
export const getToken = (): string | null => {
  if (typeof window !== "undefined") {
    return localStorage.getItem(AUTH_TOKEN_KEY);
  }
  return null;
};

export const setToken = (token: string): void => {
  if (typeof window !== "undefined") {
    localStorage.setItem(AUTH_TOKEN_KEY, token);
  }
};

export const removeToken = (): void => {
  if (typeof window !== "undefined") {
    localStorage.removeItem(AUTH_TOKEN_KEY);
  }
};

// You would expand this with functions to parse JWT, check expiry, etc.
// For now, we just store/retrieve the raw token string.

export interface User {
    id: string;
    email: string;
    name?: string;
    // Add other relevant user properties like companyId, roles etc.
    companyId?: string; // Example: Add company ID if available in JWT payload
}

// Dummy function to simulate getting user from token (replace with actual JWT parsing)
export const getUserFromToken = (token: string | null): User | null => {
  if (!token) return null;
  try {
    // In a real app, decode the JWT here (e.g., using jwt-decode library)
    // const decoded = jwt_decode(token);
    // For demo, create a dummy user based on token presence
    return {
      id: "dummy-user-id", // Replace with actual ID from decoded token
      email: "user@example.com", // Replace with actual email
      name: "Demo User",
      companyId: "dummy-company-id" // Example, extract from token if available
    };
  } catch (error) {
    console.error("Failed to decode token:", error);
    removeToken(); // Clear invalid token
    return null;
  }
};
```

## File: `lib\constants.ts`
```ts
export const APP_NAME = "Atenex";
export const AUTH_TOKEN_KEY = "atenex_auth_token";
```

## File: `lib\hooks\useAuth.tsx`
```tsx
"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { getToken, setToken, removeToken, getUserFromToken, User } from '@/lib/auth/helpers';
import { useRouter } from 'next/navigation'; // Use next/navigation for App Router

interface AuthContextType {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  login: (token: string) => void;
  logout: () => void;
}

// (+) Define un valor por defecto que coincide con la estructura de AuthContextType
const defaultAuthContextValue: AuthContextType = {
    user: null,
    token: null,
    isLoading: true, // Empezar como cargando por defecto si se usa fuera del provider
    login: (token: string) => {
        // Función vacía o lanza error si se llama fuera del provider
        console.error("Login function called outside of AuthProvider context");
        // throw new Error("Login function called outside AuthProvider");
    },
    logout: () => {
        // Función vacía o lanza error si se llama fuera del provider
        console.error("Logout function called outside of AuthProvider context");
        // throw new Error("Logout function called outside AuthProvider");
    },
};

// (+) Modifica createContext para usar el valor por defecto y el tipo AuthContextType (sin | undefined)
const AuthContext = createContext<AuthContextType>(defaultAuthContextValue);

// Explicitly type the props for the component, including children
interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setAuthStateToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true); // Start loading until token is checked
  const router = useRouter();

  // Check for token on initial load
  useEffect(() => {
    const storedToken = getToken();
    if (storedToken) {
      const userData = getUserFromToken(storedToken);
      if (userData) {
        setUser(userData);
        setAuthStateToken(storedToken);
      } else {
        // Invalid token found
        removeToken();
      }
    }
    setIsLoading(false);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Nota: getUserFromToken debería ser estable o incluido si no lo es

  const login = useCallback((newToken: string) => {
    setToken(newToken);
    const userData = getUserFromToken(newToken); // Asegúrate que esta función es segura/pura
    setUser(userData);
    setAuthStateToken(newToken);
    // (+) Cambiado a '/' para ir a la página principal después del login
    router.push('/');
    console.log("User logged in, token set.");
  }, [router]); // getUserFromToken no suele necesitar estar aquí si es pura

  const logout = useCallback(() => {
    removeToken();
    setUser(null);
    setAuthStateToken(null);
    router.push('/login');
    console.log("User logged out.");
  }, [router]);

  // El valor proporcionado por el Provider ahora siempre coincide con AuthContextType
  const providerValue = {
      user,
      token,
      isLoading,
      login,
      logout
  };

  return (
    // Pasa el objeto calculado
    <AuthContext.Provider value={providerValue}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  // La comprobación de undefined ya no es estrictamente necesaria porque
  // createContext ahora tiene un valor por defecto válido, pero
  // mantenerla puede ser útil para detectar errores de configuración inesperados.
  if (context === undefined || context === defaultAuthContextValue) { // (+) Check against default value too
    // Only throw error if it's truly used outside and hasn't received the real value
    if (context === defaultAuthContextValue && typeof window !== 'undefined') { // Avoid throwing during SSR/build if possible
       console.warn("useAuth might be used outside of its Provider or hasn't initialized yet.");
    } else if (context === undefined) {
       throw new Error('useAuth must be used within an AuthProvider');
    }
  }
  return context;
};
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
