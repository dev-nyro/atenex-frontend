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
