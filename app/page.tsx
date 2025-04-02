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
            Unlock Your Enterprise Knowledge with <span className="text-primary">{APP_NAME}</span>
          </h1>
          <p className="text-lg text-muted-foreground mb-8 max-w-3xl mx-auto">
            Ask questions in natural language and get instant answers based on your organization's collective knowledge.
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

        {/* Sección de Features (sin cambios) */}
        <section className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          <FeatureCard title="Intelligent Search" description="Find information quickly using natural language queries." />
          <FeatureCard title="Centralized Knowledge" description="Access all your organization's documents in one place." />
          <FeatureCard title="Improved Productivity" description="Empower your team with faster access to relevant insights." />
        </section>

        {/* Handler para confirmación de email (se mantiene igual en su lógica interna) */}
        <EmailConfirmationHandler />
      </main>

      {/* Footer (sin cambios) */}
      <footer className="bg-secondary/10 border-t py-8">
        <div className="container text-center text-muted-foreground text-sm">
          © {new Date().getFullYear()} {APP_NAME}. All rights reserved.
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