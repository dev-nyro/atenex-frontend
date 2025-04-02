// File: app/page.tsx
"use client";

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { APP_NAME } from '@/lib/constants';
import { useAuth } from '@/lib/hooks/useAuth';
import EmailConfirmationHandler from '@/components/auth/email-confirmation-handler';

export default function HomePage() {
  const router = useRouter();
  const { token } = useAuth();

  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Header/Navigation */}
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

      {/* Main Content */}
      <main className="container mx-auto px-4 py-16 md:py-24 flex-1">
        <section className="text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-foreground mb-6">
            Desbloquea el Conocimiento de tu Empresa con <span className="text-primary">{APP_NAME}</span>
          </h1>
          <p className="text-lg text-muted-foreground mb-8">
            Haz preguntas en lenguaje natural y obtén respuestas instantáneas basadas en el conocimiento colectivo de tu organización.
          </p>
          <Button size="lg" onClick={() => token ? router.push('/chat') : router.push('/register')}>
            {token ? 'Ir al Chat' : 'Comenzar'}
          </Button>
        </section>

        <section className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Feature Cards - replace with actual feature descriptions */}
          <FeatureCard title="Búsqueda Inteligente" description="Encuentra la información que necesitas rápida y fácilmente usando consultas en lenguaje natural." />
          <FeatureCard title="Conocimiento Centralizado" description="Accede a todo el conocimiento colectivo de tu organización en un solo lugar, eliminando los silos de información." />
          <FeatureCard title="Productividad Mejorada" description="Empodera a tu equipo para tomar mejores decisiones con un acceso más rápido a información relevante." />
        </section>
           <EmailConfirmationHandler />
      </main>

      {/* Footer (optional) */}
      <footer className="bg-secondary/10 border-t py-8">
        <div className="container text-center text-muted-foreground">
          © {new Date().getFullYear()} Atenex. Todos los derechos reservados.
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