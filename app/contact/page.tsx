// File: app/contact/page.tsx (MODIFICADO - Iteración 5.2)
"use client";

import React from 'react';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { APP_NAME } from '@/lib/constants';
import { useAuth } from '@/lib/hooks/useAuth';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Mail, Phone, Linkedin, MessageCircle, Loader2, Building, MapPin, ArrowLeft } from 'lucide-react'; // Icono volver
import { cn } from '@/lib/utils';
import { toast } from 'sonner';
import Link from 'next/link';
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';


export default function ContactPage() {
  const router = useRouter();
  const { user, isLoading: isAuthLoading } = useAuth();
  const isAuthenticated = !isAuthLoading && !!user;

  // Header consistente con otras páginas públicas
  const renderHeader = () => (
    <header className="sticky top-0 z-50 w-full bg-background/90 backdrop-blur-lg border-b border-border/60">
        <div className="container flex items-center justify-between h-16 px-4 md:px-6">
          <Link
            href="/"
            className="flex items-center gap-2 text-xl font-semibold text-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm"
            aria-label={`${APP_NAME} - Inicio`}
          >
             <Building className="w-6 h-6" /> {/* Usar Building para consistencia */}
            <span className='font-bold'>{APP_NAME}</span>
          </Link>
          <nav className="flex items-center space-x-1 sm:space-x-2">
            <LinkButton href="/">Inicio</LinkButton>
            <LinkButton href="/about">Nosotros</LinkButton>
            <LinkButton href="/contact" isActive={true}>Contacto</LinkButton>
            <div className="pl-2 sm:pl-4">
                {isAuthLoading ? (
                    <Button variant="ghost" disabled={true} size="sm" className="w-[95px]">
                        <Loader2 className="h-4 w-4 animate-spin" />
                    </Button>
                ) : isAuthenticated ? (
                    <Button variant="default" onClick={() => router.push('/chat')} size="sm" className="w-[95px] shadow-sm">
                        Ir a la App
                    </Button>
                ) : (
                    <Button variant="outline" onClick={() => router.push('/login')} size="sm" className="w-[95px]">
                        Acceder
                    </Button>
                )}
            </div>
          </nav>
        </div>
    </header>
  );

  return (
    <div className="flex flex-col min-h-screen bg-muted/20 dark:bg-background">
      {renderHeader()}

      {/* Main Content Area */}
      <main className="container mx-auto px-4 py-12 md:py-20 flex-1">
        {/* Título y descripción */}
        <section className="text-center mb-12 md:mb-16">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-4">
            Ponte en Contacto
          </h1>
          <p className="text-base sm:text-lg text-muted-foreground max-w-xl mx-auto">
            ¿Tienes preguntas o comentarios? ¡Nos encantaría escucharte! Utiliza el formulario o nuestros canales directos.
          </p>
        </section>

        {/* Grid para Formulario e Información */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12 items-start max-w-6xl mx-auto">

          {/* Columna Izquierda: Formulario */}
          <Card className="lg:col-span-3 shadow-md border">
            <CardHeader>
              <CardTitle>Envíanos un Mensaje</CardTitle>
              <CardDescription>
                Rellena el formulario y te responderemos lo antes posible.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ContactForm />
            </CardContent>
          </Card>

          {/* Columna Derecha: Información Adicional */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="shadow-md border">
              <CardHeader>
                <CardTitle className="text-lg">Información de Contacto</CardTitle>
                <CardDescription>Otras formas de localizarnos.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                 <ContactInfoItem Icon={Mail} label="Correo Electrónico:" href="mailto:info@atenex.ai" text="info@atenex.ai" />
                 <ContactInfoItem Icon={Phone} label="Teléfono:" href="tel:+15551234567" text="+1 (555) 123-4567" />
                 <Separator className='my-4'/> {/* Más margen en separador */}
                 <ContactInfoItem Icon={Linkedin} label="LinkedIn:" href="https://linkedin.com/company/atenex" text="Atenex en LinkedIn" targetBlank={true} />
                 <ContactInfoItem Icon={MessageCircle} label="WhatsApp:" href="https://wa.me/15551234567" text="Chatea por WhatsApp" targetBlank={true}/>
                 <Separator className='my-4'/>
                 <ContactInfoItem Icon={MapPin} label="Oficina:" text="Dirección Ficticia, Ciudad, País" />
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

       {/* Footer Consistente */}
       <footer className="bg-muted/20 border-t border-border/60 py-6 mt-16">
         <div className="container text-center text-muted-foreground text-xs sm:text-sm flex flex-col sm:flex-row justify-between items-center gap-2">
           <span>© {new Date().getFullYear()} {APP_NAME}. Todos los derechos reservados.</span>
           <div className="flex gap-3">
              <Link href="/privacy" className="hover:text-primary hover:underline underline-offset-4 transition-colors">Política de Privacidad</Link>
              <span className='opacity-50'>|</span>
              <Link href="/terms" className="hover:text-primary hover:underline underline-offset-4 transition-colors">Términos de Servicio</Link>
           </div>
         </div>
       </footer>
    </div>
  );
}

// Componente LinkButton (consistente)
function LinkButton({ href, children, Icon, isActive = false }: { href: string; children: React.ReactNode; Icon?: React.ElementType; isActive?: boolean }) {
  const router = useRouter();
  return (
    <Button
        variant="ghost"
        onClick={() => router.push(href)}
        className={cn(
            "text-sm px-2 sm:px-3 py-1 h-8",
            "rounded-md",
            "hover:bg-accent hover:text-accent-foreground",
            "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
            isActive ? "text-primary font-semibold bg-primary/10" : "text-muted-foreground"
        )}
     >
       {Icon && <Icon className="h-4 w-4 mr-1.5 hidden sm:inline-block flex-shrink-0" />}
      {children}
    </Button>
  );
}


// Formulario de contacto (consistente)
function ContactForm() {
  const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      console.log("Formulario de contacto enviado (implementar lógica de envío)");
      toast.info("Formulario Enviado (Simulado)", { description: "La lógica de envío del formulario necesita implementación."});
  }

  return (
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label htmlFor="name">Nombre</Label>
              <Input id="name" required placeholder="Tu Nombre" />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="email">Correo Electrónico</Label>
              <Input id="email" type="email" required placeholder="tu@ejemplo.com" />
            </div>
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="subject">Asunto</Label>
          <Input id="subject" placeholder="Ej: Consulta sobre precios" />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="message">Mensaje</Label>
          <Textarea
            id="message"
            required
            placeholder="Escribe tu mensaje aquí..."
            className="min-h-[120px]"
          />
        </div>
        <Button type="submit" className="w-full sm:w-auto">
          Enviar Mensaje
        </Button>
      </form>
  );
}

// Componente ContactInfoItem (consistente)
function ContactInfoItem({ Icon, label, href, text, targetBlank = false }: { Icon: React.ElementType, label: string, href?: string, text: string, targetBlank?: boolean }) {
    const content = (
        <>
            <Icon className="h-4 w-4 text-primary flex-shrink-0" />
            <span className="font-medium text-foreground/90">{label}</span>
            <span className="text-muted-foreground break-all">{text}</span> {/* Allow break-all for long text */}
        </>
    );
    const containerClasses = "flex items-center space-x-2 text-sm";
    const linkClasses = "inline-flex items-center gap-2 group hover:text-primary transition-colors";

    return (
        <div className={containerClasses}>
            {href ? (
                 <a
                    href={href}
                    className={cn(linkClasses)}
                    target={targetBlank ? "_blank" : undefined}
                    rel={targetBlank ? "noopener noreferrer" : undefined}
                >
                    {content}
                 </a>
            ) : (
                <div className="inline-flex items-center gap-2">{content}</div>
            )}
        </div>
    );
}