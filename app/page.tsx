// File: app/page.tsx
"use client";

import React from 'react'; // Quitar useState si no se usa
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { APP_NAME } from '@/lib/constants';
import { useAuth } from '@/lib/hooks/useAuth';
import EmailConfirmationHandler from '@/components/auth/email-confirmation-handler'; // <-- IMPORTAR
import { cn } from '@/lib/utils';

export default function HomePage() {
  const router = useRouter();
  const { token } = useAuth(); // O usa `session` si lo prefieres: const { session } = useAuth();

  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Header/Navigation */}
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-md border-b">
        <div className="container flex items-center justify-between h-16 py-4 px-4 md:px-6">
          <a href="/" className="font-bold text-2xl text-primary">{APP_NAME}</a>
          <nav className="flex items-center space-x-2 sm:space-x-4">
            <LinkButton href="/">Home</LinkButton>
            <LinkButton href="/about">About</LinkButton>
            <LinkButton href="/contact">Contact</LinkButton>
            {token ? ( // O `session`
              <Button variant="secondary" onClick={() => router.push('/chat')} className="ml-2">
                Go to App
              </Button>
            ) : (
              <Button
                 onClick={() => router.push('/login')}
                 className={cn(
                     "transition-colors duration-150",
                     "hover:bg-primary/90 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                 )}
              >
                Login
              </Button>
            )}
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
          <Button
            size="lg"
            onClick={() => token ? router.push('/chat') : router.push('/register')} // O `session`
            className={cn(
                 "transition-colors duration-150",
                 "hover:bg-primary/90 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
             )}
          >
            {token ? 'Go to Chat' : 'Get Started'} {/* O `session` */}
          </Button>
        </section>

        <section className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          <FeatureCard title="Intelligent Search" description="Find information quickly using natural language queries." />
          <FeatureCard title="Centralized Knowledge" description="Access all your organization's documents in one place." />
          <FeatureCard title="Improved Productivity" description="Empower your team with faster access to relevant insights." />
        </section>
        {/* --- AÑADIR EL HANDLER AQUÍ --- */}
        {/* Este componente escuchará los cambios de auth y manejará el hash de confirmación */}
        <EmailConfirmationHandler />
        {/* ------------------------------ */}
      </main>

      {/* Footer */}
      <footer className="bg-secondary/10 border-t py-8">
        <div className="container text-center text-muted-foreground text-sm">
          © {new Date().getFullYear()} {APP_NAME}. All rights reserved.
        </div>
      </footer>
    </div>
  );
}

// Reusable Link Button Component
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

// Reusable Feature Card Component
function FeatureCard({ title, description }: { title: string; description: string }) {
  return (
    <div className="p-6 rounded-lg shadow-md bg-card hover:shadow-lg transition-shadow duration-200 border">
      <h3 className="text-xl font-semibold text-foreground mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
}