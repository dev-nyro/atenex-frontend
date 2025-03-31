# Project Structure

```
atenex-frontend/
├── .env.local
├── .gitignore
├── README.md
├── app
│   ├── (app)
│   │   ├── chat
│   │   │   └── [[...chatId]]
│   │   │       └── page.tsx
│   │   ├── knowledge
│   │   │   └── page.tsx
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   └── settings
│   │       └── page.tsx
│   ├── (auth)
│   │   ├── layout.tsx
│   │   ├── login
│   │   │   └── page.tsx
│   │   └── register
│   │       └── page.tsx
│   ├── api
│   │   └── auth
│   │       ├── login
│   │       │   └── route.ts
│   │       ├── logout
│   │       │   └── route.ts
│   │       └── register
│   │           └── route.ts
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
│   ├── theme-provider.tsx
│   └── theme-toggle.tsx
├── export-codebase.py
├── full_codebase.md
├── lib
│   ├── api.ts
│   ├── auth
│   │   └── helpers.ts
│   ├── constants.ts
│   ├── hooks
│   │   └── useAuth.ts
│   └── utils.ts
├── next.config.mjs
├── postcss.config.js
├── tailwind.config.js
└── tsconfig.json
```

# Full Codebase

## File: `next.config.mjs`
```mjs

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
      './app/**/*.{ts,tsx}',
      './src/**/*.{ts,tsx}',
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
        colors: {
          border: "hsl(var(--border))",
          input: "hsl(var(--input))",
          ring: "hsl(var(--ring))",
          background: "hsl(var(--background))",
          foreground: "hsl(var(--foreground))",
          primary: {
            DEFAULT: "hsl(var(--primary))", // Teal
            foreground: "hsl(var(--primary-foreground))", // Dark Teal/White
          },
          secondary: {
            DEFAULT: "hsl(var(--secondary))", // Light Gray
            foreground: "hsl(var(--secondary-foreground))", // Dark Gray
          },
          destructive: {
            DEFAULT: "hsl(var(--destructive))", // Red
            foreground: "hsl(var(--destructive-foreground))", // White
          },
          muted: {
            DEFAULT: "hsl(var(--muted))", // Lighter Gray
            foreground: "hsl(var(--muted-foreground))", // Medium Gray
          },
          accent: {
            DEFAULT: "hsl(var(--accent))", // Amber/Orange
            foreground: "hsl(var(--accent-foreground))", // Dark Gray/Black
          },
          popover: {
            DEFAULT: "hsl(var(--popover))",
            foreground: "hsl(var(--popover-foreground))",
          },
          card: {
            DEFAULT: "hsl(var(--card))",
            foreground: "hsl(var(--card-foreground))",
          },
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
              '--tw-prose-body': theme('colors.foreground'),
              '--tw-prose-headings': theme('colors.foreground'),
              '--tw-prose-lead': theme('colors.muted.foreground'),
              '--tw-prose-links': theme('colors.primary.DEFAULT'),
              '--tw-prose-bold': theme('colors.foreground'),
              '--tw-prose-counters': theme('colors.muted.foreground'),
              '--tw-prose-bullets': theme('colors.muted.foreground'),
              '--tw-prose-hr': theme('colors.border'),
              '--tw-prose-quotes': theme('colors.foreground'),
              '--tw-prose-quote-borders': theme('colors.border'),
              '--tw-prose-captions': theme('colors.muted.foreground'),
              '--tw-prose-code': theme('colors.foreground'),
              '--tw-prose-pre-code': theme('colors.foreground'),
              '--tw-prose-pre-bg': theme('colors.muted.DEFAULT'),
              '--tw-prose-th-borders': theme('colors.border'),
              '--tw-prose-td-borders': theme('colors.border'),
              '--tw-prose-invert-body': theme('colors.foreground'), // Assuming foreground is light in dark mode
              '--tw-prose-invert-headings': theme('colors.foreground'),
              '--tw-prose-invert-lead': theme('colors.muted.foreground'),
              '--tw-prose-invert-links': theme('colors.primary.DEFAULT'),
              '--tw-prose-invert-bold': theme('colors.foreground'),
              '--tw-prose-invert-counters': theme('colors.muted.foreground'),
              '--tw-prose-invert-bullets': theme('colors.muted.foreground'),
              '--tw-prose-invert-hr': theme('colors.border'),
              '--tw-prose-invert-quotes': theme('colors.foreground'),
              '--tw-prose-invert-quote-borders': theme('colors.border'),
              '--tw-prose-invert-captions': theme('colors.muted.foreground'),
              '--tw-prose-invert-code': theme('colors.foreground'),
              '--tw-prose-invert-pre-code': theme('colors.foreground'),
              '--tw-prose-invert-pre-bg': theme('colors.muted.DEFAULT'),
              '--tw-prose-invert-th-borders': theme('colors.border'),
              '--tw-prose-invert-td-borders': theme('colors.border'),
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
    plugins: [require("tailwindcss-animate"), require('@tailwindcss/typography')], // Add typography plugin
  }
```

## File: `postcss.config.js`
```js
module.exports = {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  }
```

## File: `README.md`
```md
# Atenex Frontend

## 1. Overview

This repository contains the frontend application for **Atenex**, a B2B SaaS platform enabling users to query enterprise knowledge bases using natural language. Built with Next.js (App Router), TypeScript, Tailwind CSS, and shadcn/ui, it provides a modern, responsive, and user-friendly interface for interacting with the Atenex backend microservices.

## 2. Core Features

*   **Authentication:** Secure Login and Registration flows.
*   **Chat Interface:** Allows users to ask questions in natural language and receive answers generated by the backend RAG pipeline.
*   **Source Document Display:** Shows the relevant document snippets retrieved by the backend and used to generate answers.
*   **Knowledge Base Management:**
    *   **Document Upload:** Interface to upload new documents (PDF, DOCX, TXT, etc.) to the Ingest Service.
    *   **Status Tracking:** View the processing status of uploaded documents.
*   **Responsive Design:** Adapts to various screen sizes (desktop, tablet, mobile).
*   **Theming:** Supports light and dark modes.

## 3. Architecture

```mermaid
%%{init: {'theme': 'base', 'themeVariables': { 'primaryColor': '#5EEAD4', 'lineColor': '#A1A1AA', 'textColor': '#E4E4E7', 'secondaryColor': '#3B82F6', 'tertiaryColor': '#EC4899'}}}%%
graph LR
    User[End User] --> Browser[Browser: Atenex Frontend (Next.js)]

    subgraph Vercel / Hosting Provider
        Browser
    end

    Browser -->|HTTPS API Calls| APIGateway[API Gateway]

    subgraph Backend Infrastructure (e.g., Kubernetes)
        APIGateway -->|Route + Auth Inject| QueryService[Query Service]
        APIGateway -->|Route + Auth Inject| IngestService[Ingest Service]
        APIGateway -->|Route?| AuthService[(Optional) Auth Service]

        QueryService --> Milvus[(Milvus)]
        QueryService --> GeminiAPI[Google Gemini API]
        QueryService --> OpenAIEmbedAPI[OpenAI Embedding API]
        QueryService --> SupabaseLogs[(Supabase: Logs)]

        IngestService --> MinIO[(MinIO)]
        IngestService --> Milvus
        IngestService --> SupabaseMeta[(Supabase: Metadata)]
        IngestService --> OpenAIEmbedAPI

        AuthService --> SupabaseAuth[(Supabase: Users)]
    end

    style Browser fill:#111827,stroke:#5EEAD4,stroke-width:2px,color:#E4E4E7
    style APIGateway fill:#374151,stroke:#9CA3AF,stroke-width:1px,color:#E4E4E7
    style QueryService fill:#1F2937,stroke:#6B7280,stroke-width:1px,color:#E4E4E7
    style IngestService fill:#1F2937,stroke:#6B7280,stroke-width:1px,color:#E4E4E7
    style AuthService fill:#1F2937,stroke:#6B7280,stroke-width:1px,color:#E4E4E7

```

The frontend interacts primarily with the **API Gateway**, which routes requests to the appropriate backend microservices (`Query Service`, `Ingest Service`). Authentication is handled via JWT tokens, obtained during login/registration and included in subsequent API requests.

## 4. Tech Stack

*   **Framework:** [Next.js](https://nextjs.org/) (v14+ with App Router)
*   **Language:** [TypeScript](https://www.typescriptlang.org/)
*   **Styling:** [Tailwind CSS](https://tailwindcss.com/)
*   **UI Components:** [shadcn/ui](https://ui.shadcn.com/)
*   **Icons:** [Lucide React](https://lucide.dev/)
*   **State Management:** React Context (for Auth), Component State (`useState`, `useEffect`)
*   **Forms:** [React Hook Form](https://react-hook-form.com/) with [Zod](https://zod.dev/) for validation
*   **Linting/Formatting:** ESLint, Prettier (Recommended setup)

## 5. Project Structure

```
atenex-frontend/
├── app/                  # Next.js App Router Directory
│   ├── (app)/            # Main Authenticated App Routes Group
│   │   ├── chat/         # Chat Interface Routes
│   │   ├── knowledge/    # Knowledge Base Management Routes
│   │   ├── settings/     # User/Company Settings Routes
│   │   ├── layout.tsx    # Layout for Authenticated Routes
│   │   └── page.tsx      # Entry page for /app (redirects)
│   ├── (auth)/           # Authentication Routes Group
│   │   ├── login/
│   │   ├── register/
│   │   └── layout.tsx    # Layout for Auth Routes
│   ├── api/              # Next.js API Routes (BFF for Auth)
│   │   └── auth/
│   ├── globals.css       # Global Styles
│   ├── layout.tsx        # Root Layout
│   └── page.tsx          # Root Page (handles initial redirect)
├── components/           # Reusable UI Components
│   ├── auth/
│   ├── chat/
│   ├── knowledge/
│   ├── layout/
│   └── ui/               # shadcn/ui components (added via CLI)
├── lib/                  # Utility functions, API client, Hooks, Constants
│   ├── auth/             # Auth helpers
│   ├── hooks/            # Custom React Hooks (e.g., useAuth)
│   ├── api.ts            # API client wrapper
│   └── utils.ts          # General utility functions
├── public/               # Static Assets (e.g., images, icons)
├── .env.local            # Local Environment Variables (DO NOT COMMIT)
├── .gitignore            # Files/Folders to ignore in Git
├── next.config.mjs       # Next.js Configuration
├── postcss.config.js     # PostCSS Configuration
├── tailwind.config.js    # Tailwind CSS Configuration
├── tsconfig.json         # TypeScript Configuration
└── README.md             # This file
```

## 6. Getting Started

### Prerequisites

*   Node.js (v18 or later recommended)
*   npm, yarn, or pnpm

### Installation

1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    cd atenex-frontend
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    # or
    yarn install
    # or
    pnpm install
    ```
3.  **Setup Environment Variables:**
    *   Copy `.env.local.example` (if it exists) or create a new `.env.local` file.
    *   Define the required environment variables, especially `NEXT_PUBLIC_API_GATEWAY_URL` pointing to your running API Gateway and `JWT_SECRET` if using the local dummy auth routes.
    ```.env.local
    NEXT_PUBLIC_API_GATEWAY_URL=http://localhost:8080 # Or your deployed gateway URL
    JWT_SECRET='your-very-strong-secret-key-keep-safe' # Use a strong secret!
    ```
4.  **Initialize shadcn/ui:**
    *   Run the shadcn/ui init command:
        ```bash
        npx shadcn-ui@latest init
        ```
    *   Follow the prompts (select default options or customize as needed). This will create/update `components.json` and potentially `globals.css` and `tailwind.config.js`.
5.  **Add Required shadcn/ui Components:**
    *   Run the `add` command for each component used in the project:
        ```bash
        npx shadcn-ui@latest add button card input label avatar dropdown-menu separator scroll-area table badge progress alert toast skeleton resizable tooltip textarea
        ```

### Running Locally

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) (or the specified port) in your browser.

## 7. Key Implementation Details

*   **Authentication:** Uses React Context (`useAuth`) for managing user state and JWT token. Token is stored in `localStorage` (for simplicity in this example; **consider HttpOnly cookies for production**). API calls automatically include the `Authorization: Bearer <token>` header.
*   **API Client:** `lib/api.ts` provides a wrapper around `fetch` for making requests to the backend API Gateway. It handles adding the auth token and basic error handling.
*   **Routing:** Uses Next.js App Router with route groups `(app)` and `(auth)` to apply different layouts.
*   **Styling:** Leverages Tailwind CSS utility classes and shadcn/ui pre-built components, customized with a Teal/Gray theme defined in `globals.css` and `tailwind.config.js`.
*   **Error Handling:** Basic error handling for API calls and form submissions, displaying messages using shadcn/ui `Alert` and `Toast` components.

## 8. TODO / Future Enhancements

*   Implement real JWT decoding and validation on the client-side (`lib/auth/helpers.ts`).
*   Replace dummy local API routes (`/api/auth/...`) with actual calls to the backend Auth service (proxied via the Gateway).
*   Implement fetching/saving of actual chat history.
*   Implement the API endpoint and frontend logic for `listDocumentStatuses`.
*   Add document viewing functionality (modal or separate page).
*   Implement user profile and settings management.
*   Refine error handling and loading states across the application.
*   Add comprehensive unit and integration tests.
*   Consider using a server state management library like React Query or SWR for caching API data.
*   Improve accessibility (ARIA attributes, keyboard navigation).
*   Switch token storage from `localStorage` to secure HttpOnly cookies.

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
JWT_SECRET='your-very-strong-secret-key-keep-safe'

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

## File: `app/(app)/chat/[[...chatId]]/page.tsx`
```tsx
"use client";

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ChatInput } from './chat-input';
import { ChatMessage, Message } from './chat-message';
import { RetrievedDocumentsPanel } from './retrieved-documents-panel';
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import { postQuery, RetrievedDoc, ApiError } from '@/lib/api';
import { useToast } from "@/components/ui/use-toast";
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
  const [isPanelOpen, setIsPanelOpen] = useState(true); // State for the right panel
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  // Load chat history based on chatId (placeholder)
  useEffect(() => {
    if (chatId) {
      console.log(`Loading history for chat: ${chatId}`);
      // TODO: Fetch messages for the specific chatId from backend/localStorage
      // setMessages(fetchedMessages);
      setMessages([ // Dummy loading
           { id: 'initial-1', role: 'assistant', content: `Welcome back to chat ${chatId}. Ask me anything!` }
      ]);
      setRetrievedDocs([]); // Clear docs when changing chat
    } else {
      // New chat
      setMessages(initialMessages);
      setRetrievedDocs([]);
    }
  }, [chatId]);

  // Scroll to bottom when messages change
  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTo({ top: scrollAreaRef.current.scrollHeight, behavior: 'smooth' });
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

      toast({
        variant: "destructive",
        title: "Query Failed",
        description: errorMessage,
      });
    } finally {
      setIsLoading(false);
    }
  }, [isLoading, toast, isPanelOpen]); // Add isPanelOpen dependency

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
                            {isLoading && (
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
                        <RetrievedDocumentsPanel documents={retrievedDocs} isLoading={isLoading} />
                    </ResizablePanel>
                </>
            )}
        </ResizablePanelGroup>
  );
}
```

## File: `app/(app)/knowledge/page.tsx`
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

## File: `app/(app)/layout.tsx`
```tsx
"use client"; // This layout uses hooks (useAuth, useState)

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Sidebar } from '@/components/layout/sidebar';
import { Header } from '@/components/layout/header';
import { useAuth } from '@/lib/hooks/useAuth';
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import { cn } from '@/lib/utils';

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const { user, isLoading, token } = useAuth();
  const router = useRouter();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  useEffect(() => {
    if (!isLoading && !token) {
      console.log("AppLayout: No token found, redirecting to login.");
      router.push('/login');
    } else if (!isLoading && token && !user) {
        // Token exists but user data couldn't be derived (e.g., invalid token)
        console.log("AppLayout: Invalid token found, redirecting to login.");
        router.push('/login');
    }
  }, [user, isLoading, token, router]);

  if (isLoading || !user) {
    // Show a loading state or skeleton screen while checking auth / loading user
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-secondary/30 dark:bg-muted/30">
       <ResizablePanelGroup
            direction="horizontal"
            className="h-full items-stretch"
        >
            <ResizablePanel
                collapsible
                collapsedSize={4} // Percentage width when collapsed
                minSize={15}      // Minimum percentage width
                maxSize={25}      // Maximum percentage width
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

## File: `app/(app)/page.tsx`
```tsx
import { redirect } from 'next/navigation';

// This page handles the root '/' ONLY WITHIN the (app) route group context.
// The main app/page.tsx handles the absolute root '/'.
export default function AppPage() {
    // Redirect to the default chat page when accessing '/' after login.
    redirect('/chat');
}
```

## File: `app/(app)/settings/page.tsx`
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

## File: `app/(auth)/layout.tsx`
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

## File: `app/(auth)/login/page.tsx`
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

## File: `app/(auth)/register/page.tsx`
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

## File: `app/api/auth/login/route.ts`
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

## File: `app/api/auth/logout/route.ts`
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

## File: `app/api/auth/register/route.ts`
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

## File: `app/globals.css`
```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 240 10% 3.9%;
    --card: 0 0% 100%;
    --card-foreground: 240 10% 3.9%;
    --popover: 0 0% 100%;
    --popover-foreground: 240 10% 3.9%;
    --primary: 173 90% 36%; /* Teal */
    --primary-foreground: 180 100% 10%; /* Dark Teal */
    --secondary: 240 4.8% 95.9%;
    --secondary-foreground: 240 5.9% 10%;
    --muted: 240 4.8% 95.9%;
    --muted-foreground: 240 3.8% 46.1%;
    --accent: 38 92% 50%; /* Amber/Orange Accent */
    --accent-foreground: 40 10% 10%;
    --destructive: 0 84.2% 60.2%;
    --destructive-foreground: 0 0% 98%;
    --border: 240 5.9% 90%;
    --input: 240 5.9% 90%;
    --ring: 173 80% 40%; /* Lighter Teal for ring */
    --radius: 0.5rem;
  }

  .dark {
    --background: 240 10% 3.9%;
    --foreground: 0 0% 98%;
    --card: 240 10% 3.9%;
    --card-foreground: 0 0% 98%;
    --popover: 240 10% 3.9%;
    --popover-foreground: 0 0% 98%;
    --primary: 173 80% 40%; /* Lighter Teal for dark */
    --primary-foreground: 180 100% 15%;
    --secondary: 240 3.7% 15.9%;
    --secondary-foreground: 0 0% 98%;
    --muted: 240 3.7% 15.9%;
    --muted-foreground: 240 5% 64.9%;
    --accent: 38 92% 55%; /* Slightly brighter Amber */
    --accent-foreground: 40 10% 10%;
    --destructive: 0 62.8% 30.6%;
    --destructive-foreground: 0 0% 98%;
    --border: 240 3.7% 15.9%;
    --input: 240 3.7% 15.9%;
    --ring: 173 70% 45%; /* Adjusted Teal ring for dark */
  }
}

@layer base {
  * {
    @apply border-border;
  }
  body {
    @apply bg-background text-foreground;
    font-feature-settings: "rlig" 1, "calt" 1;
  }
}

/* Custom scrollbar styles (optional) */
::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}
::-webkit-scrollbar-track {
  background: hsl(var(--secondary) / 0.5);
  border-radius: 10px;
}
::-webkit-scrollbar-thumb {
  background: hsl(var(--primary) / 0.6);
  border-radius: 10px;
  border: 1px solid hsl(var(--secondary) / 0.5);
}
::-webkit-scrollbar-thumb:hover {
  background: hsl(var(--primary) / 0.8);
}
```

## File: `app/layout.tsx`
```tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/theme-provider";
import { AuthProvider } from "@/lib/hooks/useAuth"; // Import AuthProvider
import { Toaster } from "@/components/ui/toaster"; // For displaying notifications

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "Atenex - Enterprise Knowledge Query",
  description: "Query your enterprise knowledge base using natural language.",
  // Add icons later if needed
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
        <AuthProvider> {/* Wrap with AuthProvider */}
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
            <Toaster /> {/* Add Toaster component */}
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
```

## File: `app/page.tsx`
```tsx
"use client"; // Needed for hooks like useEffect and useRouter

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/hooks/useAuth'; // Assuming useAuth handles loading state and token check

export default function RootPage() {
  const { token, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading) {
      if (token) {
        // User is likely logged in, redirect to the main app page (e.g., chat)
        router.replace('/chat'); // Or router.replace('/app'); if you have a dedicated dashboard landing
      } else {
        // User is not logged in, redirect to login page
        router.replace('/login');
      }
    }
  }, [token, isLoading, router]);

  // Render a loading indicator while checking auth status
  return (
    <div className="flex h-screen items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      <p className="ml-4 text-muted-foreground">Loading Atenex...</p>
    </div>
  );
}
```

## File: `components/auth/login-form.tsx`
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

## File: `components/auth/register-form.tsx`
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

## File: `components/chat/chat-history.tsx`
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

## File: `components/chat/chat-input.tsx`
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

## File: `components/chat/chat-interface.tsx`
```tsx
"use client";

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ChatInput } from './chat-input';
import { ChatMessage, Message } from './chat-message';
import { RetrievedDocumentsPanel } from './retrieved-documents-panel';
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import { postQuery, RetrievedDoc, ApiError } from '@/lib/api';
import { useToast } from "@/components/ui/use-toast";
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
  const [isPanelOpen, setIsPanelOpen] = useState(true); // State for the right panel
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  // Load chat history based on chatId (placeholder)
  useEffect(() => {
    if (chatId) {
      console.log(`Loading history for chat: ${chatId}`);
      // TODO: Fetch messages for the specific chatId from backend/localStorage
      // setMessages(fetchedMessages);
      setMessages([ // Dummy loading
           { id: 'initial-1', role: 'assistant', content: `Welcome back to chat ${chatId}. Ask me anything!` }
      ]);
      setRetrievedDocs([]); // Clear docs when changing chat
    } else {
      // New chat
      setMessages(initialMessages);
      setRetrievedDocs([]);
    }
  }, [chatId]);

  // Scroll to bottom when messages change
  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTo({ top: scrollAreaRef.current.scrollHeight, behavior: 'smooth' });
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

      toast({
        variant: "destructive",
        title: "Query Failed",
        description: errorMessage,
      });
    } finally {
      setIsLoading(false);
    }
  }, [isLoading, toast, isPanelOpen]); // Add isPanelOpen dependency

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
                            {isLoading && (
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
                        <RetrievedDocumentsPanel documents={retrievedDocs} isLoading={isLoading} />
                    </ResizablePanel>
                </>
            )}
        </ResizablePanelGroup>
  );
}
```

## File: `components/chat/chat-message.tsx`
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

## File: `components/chat/retrieved-documents-panel.tsx`
```tsx
import React from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { FileText, AlertCircle } from 'lucide-react';
import { RetrievedDoc } from '@/lib/api'; // Import type
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';

interface RetrievedDocumentsPanelProps {
  documents: RetrievedDoc[];
  isLoading: boolean; // Indicate when the main query is loading
}

export function RetrievedDocumentsPanel({ documents, isLoading }: RetrievedDocumentsPanelProps) {

  const handleViewDocument = (doc: RetrievedDoc) => {
      // TODO: Implement document viewing logic
      // This could open a modal, navigate to a viewer page, or fetch content
      console.log("Viewing document:", doc.document_id || doc.id);
      alert(`Viewing document: ${doc.file_name || doc.id}\n(Implementation needed)`);
  };

  return (
    <div className="flex h-full flex-col border-l bg-muted/30">
      <CardHeader className="sticky top-0 z-10 border-b bg-background p-4">
        <CardTitle className="text-lg flex items-center">
            <FileText className="mr-2 h-5 w-5" /> Retrieved Sources
        </CardTitle>
        <CardDescription className="text-xs">
            Documents used to generate the answer.
        </CardDescription>
      </CardHeader>
      <ScrollArea className="flex-1">
        <div className="p-4 space-y-3">
          {isLoading && documents.length === 0 && ( // Show skeletons only when loading AND no docs yet
            <>
              <Skeleton className="h-16 w-full rounded-md" />
              <Skeleton className="h-16 w-full rounded-md" />
              <Skeleton className="h-16 w-full rounded-md" />
            </>
          )}
          {!isLoading && documents.length === 0 && (
            <div className="flex flex-col items-center justify-center h-40 text-center text-muted-foreground">
               <AlertCircle className="h-8 w-8 mb-2" />
               <p className="text-sm">No relevant documents found for the last query.</p>
            </div>
          )}
          {documents.map((doc, index) => (
            <Card
               key={doc.id || `doc-${index}`}
               className="cursor-pointer hover:shadow-md transition-shadow duration-150"
               onClick={() => handleViewDocument(doc)}
               title={`Click to view ${doc.file_name || 'document'}`}
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
                 {/* Optional: Display key metadata */}
                 {/* <div className="text-xs text-muted-foreground/80 pt-1">
                     Type: {doc.metadata?.file_type || 'N/A'}
                 </div> */}
              </CardContent>
            </Card>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}
```

## File: `components/knowledge/document-status-list.tsx`
```tsx
"use client";

import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { AlertCircle, CheckCircle2, Clock, Loader2, RefreshCw } from 'lucide-react';
// Import the specific LIST function
import { listDocumentStatuses, DocumentStatusResponse as DocumentStatus } from '@/lib/api'; // Use the specific type
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Skeleton } from '@/components/ui/skeleton';
import { useToast } from "@/components/ui/use-toast";

// DocumentStatus type is now imported from lib/api.ts

export function DocumentStatusList() {
    // Initialize with empty array, not dummy data
    const [statuses, setStatuses] = useState<DocumentStatus[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const { toast } = useToast();

    const fetchStatuses = React.useCallback(async () => { // Wrap in useCallback
        setIsLoading(true);
        setError(null);
        try {
            // Use the actual API call function
            const data = await listDocumentStatuses();
            setStatuses(data);
            if (data.length === 0 && !isLoading) { // Check isLoading to avoid toast on initial load if still loading
                 toast({ title: "No Documents", description: "No documents found. Upload documents to see their status here."});
            }
        } catch (err) {
            console.error("Failed to fetch document statuses:", err);
            const message = err instanceof Error ? err.message : "Could not load document statuses.";
            setError(message);
            toast({ variant: "destructive", title: "Error Loading Statuses", description: message });
            setStatuses([]); // Clear statuses on error
        } finally {
            setIsLoading(false);
        }
    }, [toast]); // Add toast as dependency

    // Fetch statuses on component mount
    useEffect(() => {
        fetchStatuses();
        // Optional: Set up polling or websockets for real-time updates
        // const intervalId = setInterval(fetchStatuses, 30000);
        // return () => clearInterval(intervalId);
    }, [fetchStatuses]); // Add fetchStatuses to dependency array

    // getStatusBadge and formatDateTime remain the same

    const getStatusBadge = (status: DocumentStatus['status']) => {
        switch (status) {
            case 'uploaded':
                return <Badge variant="outline"><Clock className="mr-1 h-3 w-3" />Uploaded</Badge>;
            case 'processing':
                return <Badge variant="secondary"><Loader2 className="mr-1 h-3 w-3 animate-spin" />Processing</Badge>;
            case 'processed': // Treat processed/indexed similarly for now
            case 'indexed':
                return <Badge variant="default" className="bg-green-100 text-green-800 border-green-300 hover:bg-green-200 dark:bg-green-900 dark:text-green-200 dark:border-green-700"><CheckCircle2 className="mr-1 h-3 w-3" />Processed</Badge>;
            case 'error':
                return <Badge variant="destructive"><AlertCircle className="mr-1 h-3 w-3" />Error</Badge>;
            default:
                // Handle potential unknown statuses gracefully
                const unknownStatus: string = status; // Cast to string for display
                return <Badge variant="outline">Unknown ({unknownStatus})</Badge>;
        }
    };

    const formatDateTime = (dateString?: string) => {
        if (!dateString) return 'N/A';
        try {
            return new Date(dateString).toLocaleString();
        } catch {
            return dateString;
        }
    };


    const renderContent = () => {
        if (isLoading) {
            return Array.from({ length: 3 }).map((_, index) => (
                <TableRow key={`skel-${index}`}>
                    <TableCell><Skeleton className="h-4 w-3/4" /></TableCell>
                    <TableCell><Skeleton className="h-4 w-1/4" /></TableCell>
                    <TableCell><Skeleton className="h-4 w-1/2" /></TableCell>
                    <TableCell><Skeleton className="h-4 w-1/4" /></TableCell>
                </TableRow>
            ));
        }

        if (error) {
            return (
                <TableRow>
                    <TableCell colSpan={4} className="text-center text-destructive py-8">
                        <AlertCircle className="mx-auto h-8 w-8 mb-2" />
                        Error loading statuses: {error}
                        <Button variant="link" onClick={fetchStatuses} className="ml-2">Try Again</Button>
                    </TableCell>
                </TableRow>
            );
        }

        if (statuses.length === 0) {
            return (
                <TableRow>
                    <TableCell colSpan={4} className="text-center text-muted-foreground py-8">
                        No documents found. Upload some documents to get started.
                    </TableCell>
                </TableRow>
            );
        }

        return statuses.map((doc) => (
            <TableRow key={doc.document_id}>
                <TableCell className="font-medium truncate max-w-xs" title={doc.file_name}>{doc.file_name || 'N/A'}</TableCell>
                <TableCell>{getStatusBadge(doc.status)}</TableCell>
                <TableCell className="text-muted-foreground text-xs">
                     {/* Display error message prominently if status is error */}
                    {doc.status === 'error'
                        ? <span className="text-destructive truncate block" title={doc.error_message || 'Unknown error'}>{doc.error_message || 'Unknown error'}</span>
                        : doc.status === 'processed' || doc.status === 'indexed'
                            ? `${doc.chunk_count ?? '?'} chunks`
                            // Display the backend message otherwise, or default '--'
                            : doc.message || '--'}
                </TableCell>
                <TableCell className="text-muted-foreground text-xs">{formatDateTime(doc.last_updated)}</TableCell>
            </TableRow>
        ));
    };


    return (
       <div className="space-y-2">
           <div className="flex justify-end">
                <Button variant="outline" size="sm" onClick={fetchStatuses} disabled={isLoading}>
                    <RefreshCw className={`mr-2 h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
                    Refresh
                </Button>
           </div>
            <ScrollArea className="h-[400px] border rounded-md"> {/* Adjust height */}
                <Table>
                    <TableHeader className="sticky top-0 bg-muted/50 backdrop-blur-sm z-10">
                        <TableRow>
                            <TableHead>Filename</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Details</TableHead>
                            <TableHead>Last Updated</TableHead>
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

## File: `components/knowledge/file-uploader.tsx`
```tsx
"use client";

import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input'; // Although hidden, good practice
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { UploadCloud, FileCheck2, AlertCircle, Loader2, X } from 'lucide-react';
import { uploadDocument, ApiError } from '@/lib/api';
import { useToast } from "@/components/ui/use-toast";
import { Badge } from '@/components/ui/badge';

interface UploadedFileStatus {
    file: File;
    status: 'pending' | 'uploading' | 'success' | 'error';
    progress: number;
    error?: string;
    documentId?: string; // Store ID upon success
    taskId?: string;
}

export function FileUploader() {
    const [filesStatus, setFilesStatus] = useState<UploadedFileStatus[]>([]);
    const { toast } = useToast();

    const updateFileStatus = (fileName: string, updates: Partial<Omit<UploadedFileStatus, 'file'>>) => {
        setFilesStatus(prev =>
            prev.map(fs => (fs.file.name === fileName ? { ...fs, ...updates } : fs))
        );
    };

    const onDrop = useCallback((acceptedFiles: File[]) => {
        // Add new files with 'pending' status
        const newFiles: UploadedFileStatus[] = acceptedFiles.map(file => ({
            file,
            status: 'pending',
            progress: 0,
        }));
        setFilesStatus(prev => [...prev, ...newFiles]);

        // Start uploading pending files
        newFiles.forEach(async (fileStatus) => {
            const formData = new FormData();
            formData.append('file', fileStatus.file);
            // TODO: Add metadata if needed, e.g., from a form
            const metadata = { source: 'web-uploader' };
            // formData.append('metadata_json', JSON.stringify(metadata)); // API client handles this now

            updateFileStatus(fileStatus.file.name, { status: 'uploading', progress: 10 }); // Show indeterminate progress initially

            try {
                // Simulate progress (replace with actual progress if API supports it)
                // For now, just set to 50% during the call
                 updateFileStatus(fileStatus.file.name, { progress: 50 });

                const response = await uploadDocument(formData, metadata); // Pass metadata separately

                updateFileStatus(fileStatus.file.name, {
                    status: 'success',
                    progress: 100,
                    documentId: response.document_id,
                    taskId: response.task_id
                });
                toast({
                    title: "Upload Queued",
                    description: `${fileStatus.file.name} uploaded successfully and queued for processing.`,
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
                 toast({
                    variant: "destructive",
                    title: `Upload Failed: ${fileStatus.file.name}`,
                    description: errorMessage,
                 });
            }
        });
    }, [toast]);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        // TODO: Add file type restrictions based on backend capabilities
        accept: {
            'application/pdf': ['.pdf'],
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
            'text/plain': ['.txt'],
            'text/markdown': ['.md'],
            'text/html': ['.html', '.htm'],
            // Add image types if OCR is supported later
            // 'image/jpeg': ['.jpg', '.jpeg'],
            // 'image/png': ['.png'],
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
                         {/* Add size limits if known */}
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
                                <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => removeFile(fs.file.name)} title="Remove from queue">
                                    <X className="h-4 w-4" />
                                </Button>
                             </div>

                        </div>
                    ))}
                     {filesStatus.some(fs => fs.status === 'error') && (
                        <p className="text-xs text-destructive">Some uploads failed. Please check the errors and try again.</p>
                     )}
                </div>
            )}
        </div>
    );
}
```

## File: `components/layout/header.tsx`
```tsx
"use client";

import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { LogOut, Settings, User as UserIcon, Menu } from "lucide-react";
import { useAuth } from '@/lib/hooks/useAuth';
import { APP_NAME } from '@/lib/constants';
import { ThemeToggle } from '@/components/theme-toggle'; // Import ThemeToggle

export function Header() {
  const { user, logout } = useAuth();

  const getInitials = (name?: string) => {
    if (!name) return '?';
    return name.split(' ').map(n => n[0]).slice(0, 2).join('').toUpperCase();
  };

  return (
    <header className="sticky top-0 z-10 flex h-16 items-center justify-between border-b bg-background px-4 md:px-6">
      {/* Left side - potentially breadcrumbs or title */}
      <div>
         {/* <Button variant="ghost" size="icon" className="md:hidden"> Mobile menu toggle if needed
             <Menu className="h-5 w-5" />
             <span className="sr-only">Toggle Menu</span>
         </Button> */}
         <span className="text-lg font-semibold hidden md:inline">{APP_NAME}</span>
         {/* Add Breadcrumbs or dynamic title here */}
      </div>


      {/* Right side - Theme toggle and User menu */}
      <div className="flex items-center space-x-4">
        <ThemeToggle /> {/* Add ThemeToggle button */}
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
              <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
                {/* <DropdownMenuShortcut>⌘S</DropdownMenuShortcut> */}
              </DropdownMenuItem>
               <DropdownMenuItem>
                <UserIcon className="mr-2 h-4 w-4" />
                <span>Profile</span>
                {/* <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut> */}
              </DropdownMenuItem>
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

## File: `components/layout/sidebar.tsx`
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

## File: `components/theme-provider.tsx`
```tsx
"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import type { ThemeProviderProps } from "next-themes/dist/types";

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}
```

## File: `components/theme-toggle.tsx`
```tsx
"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function ThemeToggle() {
  const { setTheme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setTheme("light")}>
          Light
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")}>
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("system")}>
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
```

## File: `export-codebase.py`
```py
from pathlib import Path

# Directories to exclude from the export
EXCLUDED_DIRS = {'.git', '__pycache__', '.venv', '.idea', '.mypy_cache', '.vscode', '.github', 'node_modules', 
                '.next', 'out', 'dist', 'coverage'}

# Important files to include even at the root level
IMPORTANT_CONFIG_FILES = [
    'next.config.mjs', 'next.config.js', 'package.json', 'tsconfig.json', 
    'tailwind.config.js', 'postcss.config.js', '.env.example', '.eslintrc.json',
    'README.md'
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

## File: `full_codebase.md`
```md
# Project Structure

```
atenex-frontend/
├── .env.local
├── .gitignore
├── README.md
├── app
│   ├── (app)
│   │   ├── chat
│   │   │   └── [[...chatId]]
│   │   │       └── page.tsx
│   │   ├── knowledge
│   │   │   └── page.tsx
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   └── settings
│   │       └── page.tsx
│   ├── (auth)
│   │   ├── layout.tsx
│   │   ├── login
│   │   │   └── page.tsx
│   │   └── register
│   │       └── page.tsx
│   ├── api
│   │   └── auth
│   │       ├── login
│   │       │   └── route.ts
│   │       ├── logout
│   │       │   └── route.ts
│   │       └── register
│   │           └── route.ts
│   ├── globals.css
│   └── layout.tsx
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
│   ├── theme-provider.tsx
│   ├── theme-toggle.tsx
│   └── ui
├── export-codebase.py
├── lib
│   ├── api.ts
│   ├── auth
│   │   └── helpers.ts
│   ├── constants.ts
│   ├── hooks
│   │   └── useAuth.ts
│   └── utils.ts
├── next.config.mjs
├── postcss.config.js
├── public
│   └── icons
├── tailwind.config.js
└── tsconfig.json
```

# Full Codebase

## File: `next.config.mjs`
```mjs

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
      './app/**/*.{ts,tsx}',
      './src/**/*.{ts,tsx}',
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
        colors: {
          border: "hsl(var(--border))",
          input: "hsl(var(--input))",
          ring: "hsl(var(--ring))",
          background: "hsl(var(--background))",
          foreground: "hsl(var(--foreground))",
          primary: {
            DEFAULT: "hsl(var(--primary))", // Teal
            foreground: "hsl(var(--primary-foreground))", // Dark Teal/White
          },
          secondary: {
            DEFAULT: "hsl(var(--secondary))", // Light Gray
            foreground: "hsl(var(--secondary-foreground))", // Dark Gray
          },
          destructive: {
            DEFAULT: "hsl(var(--destructive))", // Red
            foreground: "hsl(var(--destructive-foreground))", // White
          },
          muted: {
            DEFAULT: "hsl(var(--muted))", // Lighter Gray
            foreground: "hsl(var(--muted-foreground))", // Medium Gray
          },
          accent: {
            DEFAULT: "hsl(var(--accent))", // Amber/Orange
            foreground: "hsl(var(--accent-foreground))", // Dark Gray/Black
          },
          popover: {
            DEFAULT: "hsl(var(--popover))",
            foreground: "hsl(var(--popover-foreground))",
          },
          card: {
            DEFAULT: "hsl(var(--card))",
            foreground: "hsl(var(--card-foreground))",
          },
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
              '--tw-prose-body': theme('colors.foreground'),
              '--tw-prose-headings': theme('colors.foreground'),
              '--tw-prose-lead': theme('colors.muted.foreground'),
              '--tw-prose-links': theme('colors.primary.DEFAULT'),
              '--tw-prose-bold': theme('colors.foreground'),
              '--tw-prose-counters': theme('colors.muted.foreground'),
              '--tw-prose-bullets': theme('colors.muted.foreground'),
              '--tw-prose-hr': theme('colors.border'),
              '--tw-prose-quotes': theme('colors.foreground'),
              '--tw-prose-quote-borders': theme('colors.border'),
              '--tw-prose-captions': theme('colors.muted.foreground'),
              '--tw-prose-code': theme('colors.foreground'),
              '--tw-prose-pre-code': theme('colors.foreground'),
              '--tw-prose-pre-bg': theme('colors.muted.DEFAULT'),
              '--tw-prose-th-borders': theme('colors.border'),
              '--tw-prose-td-borders': theme('colors.border'),
              '--tw-prose-invert-body': theme('colors.foreground'), // Assuming foreground is light in dark mode
              '--tw-prose-invert-headings': theme('colors.foreground'),
              '--tw-prose-invert-lead': theme('colors.muted.foreground'),
              '--tw-prose-invert-links': theme('colors.primary.DEFAULT'),
              '--tw-prose-invert-bold': theme('colors.foreground'),
              '--tw-prose-invert-counters': theme('colors.muted.foreground'),
              '--tw-prose-invert-bullets': theme('colors.muted.foreground'),
              '--tw-prose-invert-hr': theme('colors.border'),
              '--tw-prose-invert-quotes': theme('colors.foreground'),
              '--tw-prose-invert-quote-borders': theme('colors.border'),
              '--tw-prose-invert-captions': theme('colors.muted.foreground'),
              '--tw-prose-invert-code': theme('colors.foreground'),
              '--tw-prose-invert-pre-code': theme('colors.foreground'),
              '--tw-prose-invert-pre-bg': theme('colors.muted.DEFAULT'),
              '--tw-prose-invert-th-borders': theme('colors.border'),
              '--tw-prose-invert-td-borders': theme('colors.border'),
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
    plugins: [require("tailwindcss-animate"), require('@tailwindcss/typography')], // Add typography plugin
  }
```

## File: `postcss.config.js`
```js
module.exports = {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  }
```

## File: `README.md`
```md
# atenex-frontend
Repositorio del frontend de atenex B2B

```

## File: `.env.local`
```local

```

## File: `.gitignore`
```
.vscode
```

## File: `app\(app)\chat\[[...chatId]]\page.tsx`
```tsx
"use client";

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ChatInput } from './chat-input';
import { ChatMessage, Message } from './chat-message';
import { RetrievedDocumentsPanel } from './retrieved-documents-panel';
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import { postQuery, RetrievedDoc, ApiError } from '@/lib/api';
import { useToast } from "@/components/ui/use-toast";
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
  const [isPanelOpen, setIsPanelOpen] = useState(true); // State for the right panel
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  // Load chat history based on chatId (placeholder)
  useEffect(() => {
    if (chatId) {
      console.log(`Loading history for chat: ${chatId}`);
      // TODO: Fetch messages for the specific chatId from backend/localStorage
      // setMessages(fetchedMessages);
      setMessages([ // Dummy loading
           { id: 'initial-1', role: 'assistant', content: `Welcome back to chat ${chatId}. Ask me anything!` }
      ]);
      setRetrievedDocs([]); // Clear docs when changing chat
    } else {
      // New chat
      setMessages(initialMessages);
      setRetrievedDocs([]);
    }
  }, [chatId]);

  // Scroll to bottom when messages change
  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTo({ top: scrollAreaRef.current.scrollHeight, behavior: 'smooth' });
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

      toast({
        variant: "destructive",
        title: "Query Failed",
        description: errorMessage,
      });
    } finally {
      setIsLoading(false);
    }
  }, [isLoading, toast, isPanelOpen]); // Add isPanelOpen dependency

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
                            {isLoading && (
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
                        <RetrievedDocumentsPanel documents={retrievedDocs} isLoading={isLoading} />
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
"use client"; // This layout uses hooks (useAuth, useState)

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Sidebar } from '@/components/layout/sidebar';
import { Header } from '@/components/layout/header';
import { useAuth } from '@/lib/hooks/useAuth';
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import { cn } from '@/lib/utils';

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const { user, isLoading, token } = useAuth();
  const router = useRouter();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  useEffect(() => {
    if (!isLoading && !token) {
      console.log("AppLayout: No token found, redirecting to login.");
      router.push('/login');
    } else if (!isLoading && token && !user) {
        // Token exists but user data couldn't be derived (e.g., invalid token)
        console.log("AppLayout: Invalid token found, redirecting to login.");
        router.push('/login');
    }
  }, [user, isLoading, token, router]);

  if (isLoading || !user) {
    // Show a loading state or skeleton screen while checking auth / loading user
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-secondary/30 dark:bg-muted/30">
       <ResizablePanelGroup
            direction="horizontal"
            className="h-full items-stretch"
        >
            <ResizablePanel
                collapsible
                collapsedSize={4} // Percentage width when collapsed
                minSize={15}      // Minimum percentage width
                maxSize={25}      // Maximum percentage width
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

## File: `app\(app)\page.tsx`
```tsx
import { redirect } from 'next/navigation';

// This page will likely just redirect to the main chat interface
export default function AppPage() {
    // Redirect to the default chat page or the first chat in history
    redirect('/chat');

    // Or render a welcome message/dashboard overview
    // return (
    //    <div>
    //      <h1>Welcome to Atenex</h1>
    //      <p>Select a chat or start a new one.</p>
    //    </div>
    // );
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

## File: `app\globals.css`
```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 240 10% 3.9%;
    --card: 0 0% 100%;
    --card-foreground: 240 10% 3.9%;
    --popover: 0 0% 100%;
    --popover-foreground: 240 10% 3.9%;
    --primary: 173 90% 36%; /* Teal */
    --primary-foreground: 180 100% 10%; /* Dark Teal */
    --secondary: 240 4.8% 95.9%;
    --secondary-foreground: 240 5.9% 10%;
    --muted: 240 4.8% 95.9%;
    --muted-foreground: 240 3.8% 46.1%;
    --accent: 38 92% 50%; /* Amber/Orange Accent */
    --accent-foreground: 40 10% 10%;
    --destructive: 0 84.2% 60.2%;
    --destructive-foreground: 0 0% 98%;
    --border: 240 5.9% 90%;
    --input: 240 5.9% 90%;
    --ring: 173 80% 40%; /* Lighter Teal for ring */
    --radius: 0.5rem;
  }

  .dark {
    --background: 240 10% 3.9%;
    --foreground: 0 0% 98%;
    --card: 240 10% 3.9%;
    --card-foreground: 0 0% 98%;
    --popover: 240 10% 3.9%;
    --popover-foreground: 0 0% 98%;
    --primary: 173 80% 40%; /* Lighter Teal for dark */
    --primary-foreground: 180 100% 15%;
    --secondary: 240 3.7% 15.9%;
    --secondary-foreground: 0 0% 98%;
    --muted: 240 3.7% 15.9%;
    --muted-foreground: 240 5% 64.9%;
    --accent: 38 92% 55%; /* Slightly brighter Amber */
    --accent-foreground: 40 10% 10%;
    --destructive: 0 62.8% 30.6%;
    --destructive-foreground: 0 0% 98%;
    --border: 240 3.7% 15.9%;
    --input: 240 3.7% 15.9%;
    --ring: 173 70% 45%; /* Adjusted Teal ring for dark */
  }
}

@layer base {
  * {
    @apply border-border;
  }
  body {
    @apply bg-background text-foreground;
    font-feature-settings: "rlig" 1, "calt" 1;
  }
}

/* Custom scrollbar styles (optional) */
::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}
::-webkit-scrollbar-track {
  background: hsl(var(--secondary) / 0.5);
  border-radius: 10px;
}
::-webkit-scrollbar-thumb {
  background: hsl(var(--primary) / 0.6);
  border-radius: 10px;
  border: 1px solid hsl(var(--secondary) / 0.5);
}
::-webkit-scrollbar-thumb:hover {
  background: hsl(var(--primary) / 0.8);
}
```

## File: `app\layout.tsx`
```tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/theme-provider";
import { AuthProvider } from "@/lib/hooks/useAuth"; // Import AuthProvider
import { Toaster } from "@/components/ui/toaster"; // For displaying notifications

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "Atenex - Enterprise Knowledge Query",
  description: "Query your enterprise knowledge base using natural language.",
  // Add icons later if needed
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
        <AuthProvider> {/* Wrap with AuthProvider */}
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
            <Toaster /> {/* Add Toaster component */}
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
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
"use client";

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ChatInput } from './chat-input';
import { ChatMessage, Message } from './chat-message';
import { RetrievedDocumentsPanel } from './retrieved-documents-panel';
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import { postQuery, RetrievedDoc, ApiError } from '@/lib/api';
import { useToast } from "@/components/ui/use-toast";
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
  const [isPanelOpen, setIsPanelOpen] = useState(true); // State for the right panel
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  // Load chat history based on chatId (placeholder)
  useEffect(() => {
    if (chatId) {
      console.log(`Loading history for chat: ${chatId}`);
      // TODO: Fetch messages for the specific chatId from backend/localStorage
      // setMessages(fetchedMessages);
      setMessages([ // Dummy loading
           { id: 'initial-1', role: 'assistant', content: `Welcome back to chat ${chatId}. Ask me anything!` }
      ]);
      setRetrievedDocs([]); // Clear docs when changing chat
    } else {
      // New chat
      setMessages(initialMessages);
      setRetrievedDocs([]);
    }
  }, [chatId]);

  // Scroll to bottom when messages change
  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTo({ top: scrollAreaRef.current.scrollHeight, behavior: 'smooth' });
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

      toast({
        variant: "destructive",
        title: "Query Failed",
        description: errorMessage,
      });
    } finally {
      setIsLoading(false);
    }
  }, [isLoading, toast, isPanelOpen]); // Add isPanelOpen dependency

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
                            {isLoading && (
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
                        <RetrievedDocumentsPanel documents={retrievedDocs} isLoading={isLoading} />
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
import React from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { FileText, AlertCircle } from 'lucide-react';
import { RetrievedDoc } from '@/lib/api'; // Import type
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';

interface RetrievedDocumentsPanelProps {
  documents: RetrievedDoc[];
  isLoading: boolean; // Indicate when the main query is loading
}

export function RetrievedDocumentsPanel({ documents, isLoading }: RetrievedDocumentsPanelProps) {

  const handleViewDocument = (doc: RetrievedDoc) => {
      // TODO: Implement document viewing logic
      // This could open a modal, navigate to a viewer page, or fetch content
      console.log("Viewing document:", doc.document_id || doc.id);
      alert(`Viewing document: ${doc.file_name || doc.id}\n(Implementation needed)`);
  };

  return (
    <div className="flex h-full flex-col border-l bg-muted/30">
      <CardHeader className="sticky top-0 z-10 border-b bg-background p-4">
        <CardTitle className="text-lg flex items-center">
            <FileText className="mr-2 h-5 w-5" /> Retrieved Sources
        </CardTitle>
        <CardDescription className="text-xs">
            Documents used to generate the answer.
        </CardDescription>
      </CardHeader>
      <ScrollArea className="flex-1">
        <div className="p-4 space-y-3">
          {isLoading && documents.length === 0 && ( // Show skeletons only when loading AND no docs yet
            <>
              <Skeleton className="h-16 w-full rounded-md" />
              <Skeleton className="h-16 w-full rounded-md" />
              <Skeleton className="h-16 w-full rounded-md" />
            </>
          )}
          {!isLoading && documents.length === 0 && (
            <div className="flex flex-col items-center justify-center h-40 text-center text-muted-foreground">
               <AlertCircle className="h-8 w-8 mb-2" />
               <p className="text-sm">No relevant documents found for the last query.</p>
            </div>
          )}
          {documents.map((doc, index) => (
            <Card
               key={doc.id || `doc-${index}`}
               className="cursor-pointer hover:shadow-md transition-shadow duration-150"
               onClick={() => handleViewDocument(doc)}
               title={`Click to view ${doc.file_name || 'document'}`}
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
                 {/* Optional: Display key metadata */}
                 {/* <div className="text-xs text-muted-foreground/80 pt-1">
                     Type: {doc.metadata?.file_type || 'N/A'}
                 </div> */}
              </CardContent>
            </Card>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}
```

## File: `components\knowledge\document-status-list.tsx`
```tsx
"use client";

import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { AlertCircle, CheckCircle2, Clock, Loader2, RefreshCw } from 'lucide-react';
import { getDocumentStatus } from '@/lib/api'; // Assuming an API function exists to list statuses
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Skeleton } from '@/components/ui/skeleton';
import { useToast } from "@/components/ui/use-toast";

// Define the structure of a document status object (adjust based on actual API response)
interface DocumentStatus {
    document_id: string;
    status: 'uploaded' | 'processing' | 'processed' | 'indexed' | 'error'; // Match backend enum
    file_name?: string;
    file_type?: string;
    chunk_count?: number | null;
    error_message?: string | null;
    last_updated?: string; // ISO 8601 string
    message?: string;
}

// Dummy data - replace with API call
const dummyStatuses: DocumentStatus[] = [
    // { document_id: 'uuid-doc-1', status: 'processed', file_name: 'Q3_Report.pdf', last_updated: new Date(Date.now() - 3600000).toISOString(), chunk_count: 153 },
    // { document_id: 'uuid-doc-2', status: 'processing', file_name: 'Competitor_Analysis.docx', last_updated: new Date(Date.now() - 60000).toISOString() },
    // { document_id: 'uuid-doc-3', status: 'error', file_name: 'Invalid_File.txt', last_updated: new Date(Date.now() - 7200000).toISOString(), error_message: 'Unsupported file format' },
    // { document_id: 'uuid-doc-4', status: 'uploaded', file_name: 'Onboarding_Guide.pdf', last_updated: new Date(Date.now() - 10000).toISOString() },
];

export function DocumentStatusList() {
    const [statuses, setStatuses] = useState<DocumentStatus[]>(dummyStatuses);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const { toast } = useToast();

    const fetchStatuses = async () => {
        setIsLoading(true);
        setError(null);
        try {
            // TODO: Implement API call to fetch document statuses for the company
            // Example: const data = await listDocumentStatuses(); // Needs implementation in lib/api.ts
            // For now, simulate loading and potential error/empty state
            await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate network delay
            // Set dummy data or handle empty response
             if (Math.random() < 0.1) { // Simulate occasional fetch error
                  throw new Error("Failed to fetch document statuses from server.");
             }
            setStatuses(dummyStatuses); // Replace with actual data: setStatuses(data);
            if (dummyStatuses.length === 0) {
                 toast({ title: "No Documents", description: "No documents found in your knowledge base yet."});
            }

        } catch (err) {
            console.error("Failed to fetch document statuses:", err);
            const message = err instanceof Error ? err.message : "Could not load document statuses.";
            setError(message);
            toast({ variant: "destructive", title: "Error", description: message });
             setStatuses([]); // Clear statuses on error
        } finally {
            setIsLoading(false);
        }
    };

    // Fetch statuses on component mount and potentially set up polling/websockets
    useEffect(() => {
        fetchStatuses();
        // TODO: Implement polling or preferably use WebSockets if backend supports it
        // const intervalId = setInterval(fetchStatuses, 30000); // Poll every 30 seconds (example)
        // return () => clearInterval(intervalId);
    }, []); // Run only on mount

    const getStatusBadge = (status: DocumentStatus['status']) => {
        switch (status) {
            case 'uploaded':
                return <Badge variant="outline"><Clock className="mr-1 h-3 w-3" />Uploaded</Badge>;
            case 'processing':
                return <Badge variant="secondary"><Loader2 className="mr-1 h-3 w-3 animate-spin" />Processing</Badge>;
            case 'processed': // Treat processed/indexed similarly for now
            case 'indexed':
                return <Badge variant="default" className="bg-green-100 text-green-800 border-green-300 hover:bg-green-200 dark:bg-green-900 dark:text-green-200 dark:border-green-700"><CheckCircle2 className="mr-1 h-3 w-3" />Processed</Badge>;
            case 'error':
                return <Badge variant="destructive"><AlertCircle className="mr-1 h-3 w-3" />Error</Badge>;
            default:
                return <Badge variant="outline">Unknown</Badge>;
        }
    };

    const formatDateTime = (dateString?: string) => {
        if (!dateString) return 'N/A';
        try {
            return new Date(dateString).toLocaleString();
        } catch {
            return dateString; // Return raw string if parsing fails
        }
    };

    const renderContent = () => {
        if (isLoading) {
            return Array.from({ length: 3 }).map((_, index) => (
                <TableRow key={`skel-${index}`}>
                    <TableCell><Skeleton className="h-4 w-3/4" /></TableCell>
                    <TableCell><Skeleton className="h-4 w-1/4" /></TableCell>
                    <TableCell><Skeleton className="h-4 w-1/2" /></TableCell>
                    <TableCell><Skeleton className="h-4 w-1/4" /></TableCell>
                </TableRow>
            ));
        }

        if (error) {
            return (
                <TableRow>
                    <TableCell colSpan={4} className="text-center text-destructive py-8">
                        <AlertCircle className="mx-auto h-8 w-8 mb-2" />
                        Error loading statuses: {error}
                    </TableCell>
                </TableRow>
            );
        }

        if (statuses.length === 0) {
            return (
                <TableRow>
                    <TableCell colSpan={4} className="text-center text-muted-foreground py-8">
                        No documents found. Upload some documents to get started.
                    </TableCell>
                </TableRow>
            );
        }

        return statuses.map((doc) => (
            <TableRow key={doc.document_id}>
                <TableCell className="font-medium truncate max-w-xs" title={doc.file_name}>{doc.file_name || 'N/A'}</TableCell>
                <TableCell>{getStatusBadge(doc.status)}</TableCell>
                <TableCell className="text-muted-foreground text-xs">
                    {doc.status === 'error'
                        ? <span className="text-destructive truncate block" title={doc.error_message || 'Unknown error'}>{doc.error_message || 'Unknown error'}</span>
                        : doc.status === 'processed' || doc.status === 'indexed'
                            ? `${doc.chunk_count ?? '?'} chunks`
                            : doc.message || '--'}
                </TableCell>
                <TableCell className="text-muted-foreground text-xs">{formatDateTime(doc.last_updated)}</TableCell>
            </TableRow>
        ));
    };


    return (
       <div className="space-y-2">
           <div className="flex justify-end">
                <Button variant="outline" size="sm" onClick={fetchStatuses} disabled={isLoading}>
                    <RefreshCw className={`mr-2 h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
                    Refresh
                </Button>
           </div>
            <ScrollArea className="h-[400px] border rounded-md"> {/* Adjust height as needed */}
                <Table>
                    <TableHeader className="sticky top-0 bg-muted/50 backdrop-blur-sm">
                        <TableRow>
                            <TableHead>Filename</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Details</TableHead>
                            <TableHead>Last Updated</TableHead>
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
"use client";

import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input'; // Although hidden, good practice
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { UploadCloud, FileCheck2, AlertCircle, Loader2, X } from 'lucide-react';
import { uploadDocument, ApiError } from '@/lib/api';
import { useToast } from "@/components/ui/use-toast";
import { Badge } from '@/components/ui/badge';

interface UploadedFileStatus {
    file: File;
    status: 'pending' | 'uploading' | 'success' | 'error';
    progress: number;
    error?: string;
    documentId?: string; // Store ID upon success
    taskId?: string;
}

export function FileUploader() {
    const [filesStatus, setFilesStatus] = useState<UploadedFileStatus[]>([]);
    const { toast } = useToast();

    const updateFileStatus = (fileName: string, updates: Partial<Omit<UploadedFileStatus, 'file'>>) => {
        setFilesStatus(prev =>
            prev.map(fs => (fs.file.name === fileName ? { ...fs, ...updates } : fs))
        );
    };

    const onDrop = useCallback((acceptedFiles: File[]) => {
        // Add new files with 'pending' status
        const newFiles: UploadedFileStatus[] = acceptedFiles.map(file => ({
            file,
            status: 'pending',
            progress: 0,
        }));
        setFilesStatus(prev => [...prev, ...newFiles]);

        // Start uploading pending files
        newFiles.forEach(async (fileStatus) => {
            const formData = new FormData();
            formData.append('file', fileStatus.file);
            // TODO: Add metadata if needed, e.g., from a form
            const metadata = { source: 'web-uploader' };
            // formData.append('metadata_json', JSON.stringify(metadata)); // API client handles this now

            updateFileStatus(fileStatus.file.name, { status: 'uploading', progress: 10 }); // Show indeterminate progress initially

            try {
                // Simulate progress (replace with actual progress if API supports it)
                // For now, just set to 50% during the call
                 updateFileStatus(fileStatus.file.name, { progress: 50 });

                const response = await uploadDocument(formData, metadata); // Pass metadata separately

                updateFileStatus(fileStatus.file.name, {
                    status: 'success',
                    progress: 100,
                    documentId: response.document_id,
                    taskId: response.task_id
                });
                toast({
                    title: "Upload Queued",
                    description: `${fileStatus.file.name} uploaded successfully and queued for processing.`,
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
                 toast({
                    variant: "destructive",
                    title: `Upload Failed: ${fileStatus.file.name}`,
                    description: errorMessage,
                 });
            }
        });
    }, [toast]);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        // TODO: Add file type restrictions based on backend capabilities
        accept: {
            'application/pdf': ['.pdf'],
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
            'text/plain': ['.txt'],
            'text/markdown': ['.md'],
            'text/html': ['.html', '.htm'],
            // Add image types if OCR is supported later
            // 'image/jpeg': ['.jpg', '.jpeg'],
            // 'image/png': ['.png'],
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
                         {/* Add size limits if known */}
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
                                <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => removeFile(fs.file.name)} title="Remove from queue">
                                    <X className="h-4 w-4" />
                                </Button>
                             </div>

                        </div>
                    ))}
                     {filesStatus.some(fs => fs.status === 'error') && (
                        <p className="text-xs text-destructive">Some uploads failed. Please check the errors and try again.</p>
                     )}
                </div>
            )}
        </div>
    );
}
```

## File: `components\layout\header.tsx`
```tsx
"use client";

import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { LogOut, Settings, User as UserIcon, Menu } from "lucide-react";
import { useAuth } from '@/lib/hooks/useAuth';
import { APP_NAME } from '@/lib/constants';
import { ThemeToggle } from '@/components/theme-toggle'; // Import ThemeToggle

export function Header() {
  const { user, logout } = useAuth();

  const getInitials = (name?: string) => {
    if (!name) return '?';
    return name.split(' ').map(n => n[0]).slice(0, 2).join('').toUpperCase();
  };

  return (
    <header className="sticky top-0 z-10 flex h-16 items-center justify-between border-b bg-background px-4 md:px-6">
      {/* Left side - potentially breadcrumbs or title */}
      <div>
         {/* <Button variant="ghost" size="icon" className="md:hidden"> Mobile menu toggle if needed
             <Menu className="h-5 w-5" />
             <span className="sr-only">Toggle Menu</span>
         </Button> */}
         <span className="text-lg font-semibold hidden md:inline">{APP_NAME}</span>
         {/* Add Breadcrumbs or dynamic title here */}
      </div>


      {/* Right side - Theme toggle and User menu */}
      <div className="flex items-center space-x-4">
        <ThemeToggle /> {/* Add ThemeToggle button */}
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
              <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
                {/* <DropdownMenuShortcut>⌘S</DropdownMenuShortcut> */}
              </DropdownMenuItem>
               <DropdownMenuItem>
                <UserIcon className="mr-2 h-4 w-4" />
                <span>Profile</span>
                {/* <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut> */}
              </DropdownMenuItem>
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

## File: `components\theme-provider.tsx`
```tsx
"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import type { ThemeProviderProps } from "next-themes/dist/types";

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}
```

## File: `components\theme-toggle.tsx`
```tsx
"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function ThemeToggle() {
  const { setTheme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setTheme("light")}>
          Light
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")}>
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("system")}>
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
```

## File: `export-codebase.py`
```py
from pathlib import Path

# Directories to exclude from the export
EXCLUDED_DIRS = {'.git', '__pycache__', '.venv', '.idea', '.mypy_cache', '.vscode', '.github', 'node_modules', 
                '.next', 'out', 'dist', 'coverage'}

# Important files to include even at the root level
IMPORTANT_CONFIG_FILES = [
    'next.config.mjs', 'next.config.js', 'package.json', 'tsconfig.json', 
    'tailwind.config.js', 'postcss.config.js', '.env.example', '.eslintrc.json',
    'README.md'
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
import { getToken } from './auth/helpers';
import { getApiGatewayUrl } from './utils';

interface ApiErrorData {
    detail?: string | { msg: string; type: string }[] | any; // FastAPI often uses 'detail'
    message?: string; // General fallback
}

export class ApiError extends Error {
  status: number;
  data?: ApiErrorData;

  constructor(message: string, status: number, data?: ApiErrorData) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.data = data;
  }
}

async function request<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const gatewayUrl = getApiGatewayUrl();
  const url = `${gatewayUrl}${endpoint}`; // Construct full URL
  const token = getToken();
  const headers = new Headers(options.headers || {});

  headers.set('Accept', 'application/json');
  if (!(options.body instanceof FormData)) {
     // Don't set Content-Type for FormData, browser does it with boundary
     headers.set('Content-Type', 'application/json');
  }


  if (token) {
    headers.set('Authorization', `Bearer ${token}`);
  }

  // Add X-Company-ID if needed DIRECTLY by a service (Gateway should handle it based on JWT)
  // const { user } = useAuth(); // Cannot use hooks here
  // const companyId = getCompanyIdFromSomewhere(); // Get company ID if needed
  // if (companyId) {
  //   headers.set('X-Company-ID', companyId);
  // }

  const config: RequestInit = {
    ...options,
    headers,
  };

  // Log the request details (optional)
  console.log(`API Request: ${config.method || 'GET'} ${url}`);
  // if (config.body && !(config.body instanceof FormData)) {
  //    console.log('Request Body:', config.body);
  // }

  try {
    const response = await fetch(url, config);

    if (!response.ok) {
      let errorData: ApiErrorData | null = null;
      try {
        // Try to parse error response body
        errorData = await response.json();
      } catch (e) {
        // Ignore if response is not JSON
        console.warn("API error response was not valid JSON:", await response.text());
      }
      const errorMessage = errorData?.detail
        ? (typeof errorData.detail === 'string' ? errorData.detail : JSON.stringify(errorData.detail))
        : errorData?.message || `HTTP error ${response.status}`;

      console.error(`API Error: ${response.status} ${errorMessage}`, errorData);
      throw new ApiError(errorMessage, response.status, errorData || undefined);
    }

    // Handle successful response with no content
    if (response.status === 204 || response.headers.get('content-length') === '0') {
        console.log(`API Success: ${response.status} No Content`);
        return {} as T; // Or return null/undefined based on expected type
    }

    const data: T = await response.json();
    console.log(`API Success: ${response.status}`, data);
    return data;
  } catch (error) {
    if (error instanceof ApiError) {
      // Re-throw known API errors
      throw error;
    } else {
      // Handle network errors or other exceptions
      console.error('Network or unexpected error:', error);
      throw new ApiError(error instanceof Error ? error.message : 'Network error or unexpected issue', 0, undefined); // status 0 for network errors
    }
  }
}

// --- Auth Service (Example Proxied through API Gateway or Direct) ---
// Note: Adjust endpoint if auth is handled by a separate service proxied via gateway

export const loginUser = async (credentials: { email: string; password: string }) => {
  // Assuming backend provides { access_token: string } on successful login
  // The Gateway might proxy this to an /auth service endpoint
  // Adjust the endpoint based on your Gateway/Auth service routing
  const response = await request<{ access_token: string }>('/api/auth/login', { // Example endpoint
    method: 'POST',
    body: JSON.stringify(credentials),
  });
  return response.access_token;
};

export const registerUser = async (details: { email: string; password: string; name?: string }) => {
  // Assuming backend provides user details or just success/token
  // Adjust endpoint and response type as needed
  const response = await request<{ access_token: string; user: User }>('/api/auth/register', { // Example endpoint
    method: 'POST',
    body: JSON.stringify(details),
  });
  return response;
};

// --- Ingest Service Endpoints (via API Gateway) ---

export const uploadDocument = async (formData: FormData, metadata: Record<string, any> = {}) => {
    // Append metadata as a JSON string field if needed by backend
    formData.append('metadata_json', JSON.stringify(metadata));

    // NOTE: Let the browser set the Content-Type header for FormData
    const headers = new Headers();
    const token = getToken();
    if (token) {
        headers.set('Authorization', `Bearer ${token}`);
    }
    // Remove manual Content-Type setting for FormData
    // headers.delete('Content-Type');

    return request<{ document_id: string; task_id: string; status: string; message: string }>('/api/v1/ingest', {
        method: 'POST',
        body: formData,
        headers: headers, // Pass only necessary headers (Auth)
    });
};

export const getDocumentStatus = async (documentId: string) => {
  return request<any>(`/api/v1/ingest/status/${documentId}`, { // Replace 'any' with specific StatusResponse type
    method: 'GET',
  });
};

// --- Query Service Endpoints (via API Gateway) ---

interface QueryPayload {
    query: string;
    retriever_top_k?: number;
    // chat_history?: Array<{ role: string; content: string }>; // Add if using history
}

export interface RetrievedDoc {
    id: string;
    score?: number | null;
    content_preview?: string | null;
    metadata?: Record<string, any> | null;
    document_id?: string | null;
    file_name?: string | null;
}
interface QueryApiResponse {
    answer: string;
    retrieved_documents: RetrievedDoc[];
    query_log_id?: string | null;
}

export const postQuery = async (payload: QueryPayload) => {
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

## File: `lib\hooks\useAuth.ts`
```ts
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

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
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
  }, []);

  const login = useCallback((newToken: string) => {
    setToken(newToken);
    const userData = getUserFromToken(newToken);
    setUser(userData);
    setAuthStateToken(newToken);
    // Redirect to app page after login
    router.push('/'); // Redirect to the main app page
    console.log("User logged in, token set.");
  }, [router]);

  const logout = useCallback(() => {
    removeToken();
    setUser(null);
    setAuthStateToken(null);
    // Redirect to login page after logout
    router.push('/login');
    console.log("User logged out.");
  }, [router]);

  const value = { user, token, isLoading, login, logout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
```

## File: `lib\utils.ts`
```ts
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Helper to get base URL for API calls
export function getBaseUrl() {
  if (typeof window !== "undefined") {
    // Client-side
    return ""; // Relative path for client-side calls
  }
  // Server-side
  if (process.env.VERCEL_URL) {
    // Vercel deployment
    return `https://${process.env.VERCEL_URL}`;
  }
  // Local development
  return `http://localhost:${process.env.PORT ?? 3000}`;
}

// Helper to get API Gateway URL (assuming it's exposed publicly or via env var)
export function getApiGatewayUrl() {
    // Prioritize environment variable if set
    const gatewayUrl = process.env.NEXT_PUBLIC_API_GATEWAY_URL;
    if (gatewayUrl) {
        return gatewayUrl.replace(/\/$/, ""); // Remove trailing slash if exists
    }
    // Fallback for local development (replace with your actual gateway URL)
    console.warn("NEXT_PUBLIC_API_GATEWAY_URL not set, using fallback http://localhost:8080");
    return "http://localhost:8080";
}
```

```

## File: `lib/api.ts`
```ts
import { getToken } from './auth/helpers';
import { getApiGatewayUrl } from './utils';
import type { User } from './auth/helpers'; // Import User type

interface ApiErrorData {
    detail?: string | { msg: string; type: string }[] | any; // FastAPI often uses 'detail'
    message?: string; // General fallback
}

export class ApiError extends Error {
  status: number;
  data?: ApiErrorData;

  constructor(message: string, status: number, data?: ApiErrorData) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.data = data;
  }
}

async function request<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const gatewayUrl = getApiGatewayUrl();
  const url = `${gatewayUrl}${endpoint}`; // Construct full URL
  const token = getToken();
  const headers = new Headers(options.headers || {});

  headers.set('Accept', 'application/json');
  if (!(options.body instanceof FormData)) {
     // Don't set Content-Type for FormData, browser does it with boundary
     headers.set('Content-Type', 'application/json');
  }


  if (token) {
    headers.set('Authorization', `Bearer ${token}`);
  }

  // The API Gateway is responsible for adding X-Company-ID based on the JWT.
  // Frontend usually doesn't need to send it directly when talking to the Gateway.

  const config: RequestInit = {
    ...options,
    headers,
  };

  console.log(`API Request: ${config.method || 'GET'} ${url}`);

  try {
    const response = await fetch(url, config);

    if (!response.ok) {
      let errorData: ApiErrorData | null = null;
      try {
        errorData = await response.json();
      } catch (e) {
        console.warn("API error response was not valid JSON:", await response.text());
      }
      const errorMessage = errorData?.detail
        ? (typeof errorData.detail === 'string' ? errorData.detail : JSON.stringify(errorData.detail))
        : errorData?.message || `HTTP error ${response.status}`;

      console.error(`API Error: ${response.status} ${errorMessage}`, errorData);
      throw new ApiError(errorMessage, response.status, errorData || undefined);
    }

    if (response.status === 204 || response.headers.get('content-length') === '0') {
        console.log(`API Success: ${response.status} No Content`);
        // Ensure the return type matches T, even if empty. Use 'any' or specific empty object type.
        // If T can be void or undefined, handle accordingly.
        return {} as T;
    }

    const data: T = await response.json();
    console.log(`API Success: ${response.status}`); // Avoid logging potentially large data object
    return data;
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    } else {
      console.error('Network or unexpected error:', error);
      throw new ApiError(error instanceof Error ? error.message : 'Network error or unexpected issue', 0, undefined);
    }
  }
}

// --- Auth Service ---
export const loginUser = async (credentials: { email: string; password: string }) => {
  const response = await request<{ access_token: string }>('/api/auth/login', { // Using internal BFF route
    method: 'POST',
    body: JSON.stringify(credentials),
  });
  return response.access_token;
};

export const registerUser = async (details: { email: string; password: string; name?: string }) => {
  const response = await request<{ access_token: string; user: User }>('/api/auth/register', { // Using internal BFF route
    method: 'POST',
    body: JSON.stringify(details),
  });
  return response;
};

// --- Ingest Service Endpoints (via API Gateway) ---
export interface IngestResponse {
    document_id: string;
    task_id: string;
    status: string; // Consider using the DocumentStatus enum type here
    message: string;
}
export const uploadDocument = async (formData: FormData, metadata: Record<string, any> = {}) => {
    formData.append('metadata_json', JSON.stringify(metadata));
    const headers = new Headers(); // Create headers specifically for this request
    const token = getToken();
    if (token) {
        headers.set('Authorization', `Bearer ${token}`);
    }
    // Don't set Content-Type for FormData manually

    return request<IngestResponse>('/api/v1/ingest', { // Endpoint proxied by Gateway
        method: 'POST',
        body: formData,
        headers: headers,
    });
};

// Define the expected status response structure based on backend/schemas
export interface DocumentStatusResponse {
    document_id: string;
    status: 'uploaded' | 'processing' | 'processed' | 'indexed' | 'error';
    file_name?: string;
    file_type?: string;
    chunk_count?: number | null;
    error_message?: string | null;
    last_updated?: string; // ISO 8601 string
    message?: string;
}

export const getDocumentStatus = async (documentId: string): Promise<DocumentStatusResponse> => {
  // Fetches status for a SINGLE document
  return request<DocumentStatusResponse>(`/api/v1/ingest/status/${documentId}`, { // Endpoint proxied by Gateway
    method: 'GET',
  });
};

// Placeholder function to list statuses (Needs corresponding Backend Endpoint)
export const listDocumentStatuses = async (/* Add filters like page, limit if needed */): Promise<DocumentStatusResponse[]> => {
    console.warn("listDocumentStatuses API call is not implemented yet.");
    // Replace with actual API call when backend endpoint exists
    // Example: return request<DocumentStatusResponse[]>('/api/v1/ingest/status', { method: 'GET' });

    // Returning dummy data for now
    await new Promise(resolve => setTimeout(resolve, 500)); // Simulate delay
    return [
        // Add some dummy data matching DocumentStatusResponse structure if needed for testing
        // { document_id: 'uuid-doc-1', status: 'processed', file_name: 'Q3_Report.pdf', last_updated: new Date(Date.now() - 3600000).toISOString(), chunk_count: 153, message: 'Processed successfully' },
        // { document_id: 'uuid-doc-2', status: 'processing', file_name: 'Competitor_Analysis.docx', last_updated: new Date(Date.now() - 60000).toISOString(), message: 'Processing document...' },
    ];
};


// --- Query Service Endpoints (via API Gateway) ---
interface QueryPayload {
    query: string;
    retriever_top_k?: number;
}
export interface RetrievedDoc {
    id: string;
    score?: number | null;
    content_preview?: string | null;
    metadata?: Record<string, any> | null;
    document_id?: string | null;
    file_name?: string | null;
}
interface QueryApiResponse {
    answer: string;
    retrieved_documents: RetrievedDoc[];
    query_log_id?: string | null; // Assuming UUID is stringified
}
export const postQuery = async (payload: QueryPayload): Promise<QueryApiResponse> => {
  return request<QueryApiResponse>('/api/v1/query', { // Endpoint proxied by Gateway
    method: 'POST',
    body: JSON.stringify(payload),
  });
};
```

## File: `lib/auth/helpers.ts`
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

## File: `lib/constants.ts`
```ts
export const APP_NAME = "Atenex";
export const AUTH_TOKEN_KEY = "atenex_auth_token";
```

## File: `lib/hooks/useAuth.ts`
```ts
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

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
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
  }, []);

  const login = useCallback((newToken: string) => {
    setToken(newToken);
    const userData = getUserFromToken(newToken);
    setUser(userData);
    setAuthStateToken(newToken);
    // Redirect to app page after login
    router.push('/'); // Redirect to the main app page
    console.log("User logged in, token set.");
  }, [router]);

  const logout = useCallback(() => {
    removeToken();
    setUser(null);
    setAuthStateToken(null);
    // Redirect to login page after logout
    router.push('/login');
    console.log("User logged out.");
  }, [router]);

  const value = { user, token, isLoading, login, logout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
```

## File: `lib/utils.ts`
```ts
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Helper to get base URL for API calls
export function getBaseUrl() {
  if (typeof window !== "undefined") {
    // Client-side
    return ""; // Relative path for client-side calls
  }
  // Server-side
  if (process.env.VERCEL_URL) {
    // Vercel deployment
    return `https://${process.env.VERCEL_URL}`;
  }
  // Local development
  return `http://localhost:${process.env.PORT ?? 3000}`;
}

// Helper to get API Gateway URL (assuming it's exposed publicly or via env var)
export function getApiGatewayUrl() {
    // Prioritize environment variable if set
    const gatewayUrl = process.env.NEXT_PUBLIC_API_GATEWAY_URL;
    if (gatewayUrl) {
        return gatewayUrl.replace(/\/$/, ""); // Remove trailing slash if exists
    }
    // Fallback for local development (replace with your actual gateway URL)
    console.warn("NEXT_PUBLIC_API_GATEWAY_URL not set, using fallback http://localhost:8080");
    return "http://localhost:8080";
}
```
