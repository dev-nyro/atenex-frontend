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