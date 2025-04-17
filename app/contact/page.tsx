// File: app/contact/page.tsx
"use client";

import React from 'react';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { APP_NAME } from '@/lib/constants';
import { useAuth } from '@/lib/hooks/useAuth';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Mail, Phone, Linkedin, MessageCircle, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

export default function ContactPage() {
  const router = useRouter();
  const { user, isLoading: isAuthLoading } = useAuth();
  const isAuthenticated = !isAuthLoading && !!user;

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-md border-b">
        <div className="container flex items-center justify-between h-16 py-4 px-4 md:px-6">
          <button onClick={() => router.push('/')} className="font-bold text-2xl text-primary focus:outline-none focus:ring-2 focus:ring-ring rounded-sm">
            {APP_NAME}
          </button>
          {/* Botones traducidos */}
          <nav className="flex items-center space-x-2 sm:space-x-4">
            <LinkButton href="/">Inicio</LinkButton>
            <LinkButton href="/about">Nosotros</LinkButton>
            <LinkButton href="/contact" isActive={true}>Contacto</LinkButton>
             <div className="ml-2">
                {isAuthLoading ? (
                    <Button variant="secondary" disabled={true} size="sm">
                        <Loader2 className="h-4 w-4 animate-spin" />
                    </Button>
                ) : isAuthenticated ? (
                    // Botón traducido
                    <Button variant="secondary" onClick={() => router.push('/chat')} size="sm">
                        Ir a la App
                    </Button>
                ) : (
                    // Botón traducido
                    <Button onClick={() => router.push('/login')} size="sm" className="transition-colors duration-150 hover:bg-primary/90 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
                        Acceder
                    </Button>
                )}
            </div>
          </nav>
        </div>
      </header>

      <main className="container mx-auto px-4 py-16 md:py-24 flex-1">
        {/* Textos traducidos */}
        <section className="text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-foreground mb-6">
            Contáctanos
          </h1>
          <p className="text-lg text-muted-foreground mb-12 max-w-2xl mx-auto">
            ¿Tienes preguntas o comentarios? ¡Nos encantaría escucharte! Contáctanos usando el formulario o nuestros canales de contacto.
          </p>
        </section>

        <section className="max-w-lg mx-auto">
          <Card className="shadow-lg">
            <CardHeader>
              {/* Textos traducidos */}
              <CardTitle>Envíanos un Mensaje</CardTitle>
              <CardDescription>
                Normalmente respondemos en 1-2 días hábiles.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ContactForm />
            </CardContent>
          </Card>
        </section>
      </main>

      <footer className="bg-muted/10 border-t py-8 mt-16">
        {/* Texto traducido */}
        <div className="container text-center text-muted-foreground text-sm">
          © {new Date().getFullYear()} {APP_NAME}. Todos los derechos reservados.
        </div>
      </footer>
    </div>
  );
}

// Componente traducido
function LinkButton({ href, children, isActive = false }: { href: string; children: React.ReactNode; isActive?: boolean }) {
  const router = useRouter();
  return (
    <Button
        variant="link"
        onClick={() => router.push(href)}
        className={cn(
            "text-sm sm:text-base hover:text-primary/80 focus:outline-none focus:ring-2 focus:ring-ring rounded-sm px-1 sm:px-2",
            isActive ? "text-primary font-medium underline underline-offset-4" : "text-muted-foreground"
        )}
     >
      {children}
    </Button>
  );
}

// Formulario de contacto traducido
function ContactForm() {
  const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      console.log("Formulario de contacto enviado (implementar lógica de envío)");
      toast.info("Formulario Enviado (Simulado)", { description: "La lógica de envío del formulario de contacto necesita implementación."});
  }

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-foreground mb-1">
            Nombre:
          </label>
          <input
            type="text"
            id="name"
            required
            className="block w-full rounded-md border-input bg-background shadow-sm focus:border-ring focus:ring-ring/50 sm:text-sm p-2"
            placeholder="Tu Nombre"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-foreground mb-1">
            Correo Electrónico:
          </label>
          <input
            type="email"
            id="email"
            required
             className="block w-full rounded-md border-input bg-background shadow-sm focus:border-ring focus:ring-ring/50 sm:text-sm p-2"
            placeholder="tu@ejemplo.com"
          />
        </div>
        <div>
          <label htmlFor="message" className="block text-sm font-medium text-foreground mb-1">
            Mensaje:
          </label>
          <textarea
            id="message"
            rows={4}
            required
            className="block w-full rounded-md border-input bg-background shadow-sm focus:border-ring focus:ring-ring/50 sm:text-sm p-2 min-h-[100px]"
            placeholder="Tu Mensaje"
          />
        </div>
        <Button type="submit" className="w-full">
          Enviar Mensaje
        </Button>
      </form>

      <div className="space-y-3 pt-6 border-t">
         <h3 className="text-sm font-medium text-muted-foreground mb-2">Otras formas de contactarnos:</h3>
        {/* Labels y textos traducidos */}
        <ContactInfoItem Icon={Mail} label="Correo:" href="mailto:info@atenex.ai" text="info@atenex.ai" />
        <ContactInfoItem Icon={Phone} label="Teléfono:" href="tel:+15551234567" text="+1 (555) 123-4567" />
        <ContactInfoItem Icon={Linkedin} label="LinkedIn:" href="https://linkedin.com/company/atenex" text="Atenex en LinkedIn" targetBlank={true} />
        <ContactInfoItem Icon={MessageCircle} label="WhatsApp:" href="https://wa.me/15551234567" text="Chatea por WhatsApp" targetBlank={true}/>
      </div>
    </div>
  );
}

// Componente de item de contacto (sin cambios internos, usa props traducidas)
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