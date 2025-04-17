// File: app/page.tsx
// Purpose: Public home page, shows login/register or go to app based on auth state.
"use client";

import React from 'react';
import { Button, buttonVariants } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { APP_NAME } from '@/lib/constants';
import { useAuth } from '@/lib/hooks/useAuth';
import { cn } from '@/lib/utils';
import { Loader2, Home as HomeIcon, Info, Mail, Search, Library, Zap } from 'lucide-react';
import Link from 'next/link';

const iconMap: { [key: string]: React.ElementType } = {
  Search: Search,
  Library: Library,
  Zap: Zap,
};

export default function HomePage() {
  const router = useRouter();
  const { user, isLoading: isAuthLoading } = useAuth();
  const isAuthenticated = !isAuthLoading && !!user;

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-background via-background to-secondary/30 dark:to-muted/30">
      <header className="sticky top-0 z-50 w-full bg-background/80 backdrop-blur-md border-b border-border/50">
        <div className="container flex items-center justify-between h-16 px-4 md:px-6">
          <button
            onClick={() => router.push('/')}
            className="flex items-center gap-2 text-xl font-bold text-primary focus:outline-none focus:ring-2 focus:ring-ring rounded-sm"
          >
             <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                 <path d="M11.25 4.533A9.707 9.707 0 0 0 6 3a9.735 9.735 0 0 0-3.25.555.75.75 0 0 0-.5.707v14.5a.75.75 0 0 0 .5.707A9.716 9.716 0 0 0 6 21a9.707 9.707 0 0 0 5.25-1.533.75.75 0 0 0 .5-.68V5.213a.75.75 0 0 0-.5-.68ZM12.75 4.533A9.707 9.707 0 0 1 18 3a9.735 9.735 0 0 1 3.25.555.75.75 0 0 1 .5.707v14.5a.75.75 0 0 1-.5.707A9.716 9.716 0 0 1 18 21a9.707 9.707 0 0 1-5.25-1.533.75.75 0 0 1-.5-.68V5.213a.75.75 0 0 1-.5-.68Z" />
             </svg>
            <span>{APP_NAME}</span>
          </button>

          {/* Botones de navegación traducidos */}
          <nav className="flex items-center space-x-1 sm:space-x-2">
            <LinkButton href="/" Icon={HomeIcon} isActive={true}>Inicio</LinkButton>
            <LinkButton href="/about" Icon={Info}>Nosotros</LinkButton>
            <LinkButton href="/contact" Icon={Mail}>Contacto</LinkButton>

            <div className="pl-2 sm:pl-4">
                {isAuthLoading ? (
                    <Button variant="secondary" disabled={true} size="sm" className="w-[90px]">
                        <Loader2 className="h-4 w-4 animate-spin" />
                    </Button>
                ) : isAuthenticated ? (
                    // Botón traducido
                    <Button variant="default" onClick={() => router.push('/chat')} size="sm" className="w-[90px]">
                        Ir a la App
                    </Button>
                ) : (
                    // Botón traducido
                    <Button
                        variant="outline"
                        onClick={() => router.push('/login')}
                        size="sm"
                        className="w-[90px] transition-colors duration-150 hover:bg-accent hover:text-accent-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    >
                        Acceder
                    </Button>
                )}
            </div>
          </nav>
        </div>
      </header>

      <main className="container mx-auto px-4 py-16 md:py-24 flex-1 flex flex-col items-center justify-center text-center">
         <section>
            {/* Textos de Hero Section traducidos */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-foreground mb-6 leading-tight">
                Desbloquea el Conocimiento de tu Empresa con <span className="text-primary">{APP_NAME}</span>
            </h1>
            <p className="text-lg sm:text-xl text-muted-foreground mb-10 max-w-3xl mx-auto">
                Haz preguntas en lenguaje natural y obtén respuestas instantáneas y precisas, extraídas directamente de los documentos y datos de tu organización.
            </p>
            {isAuthLoading ? (
                 <Button size="lg" disabled={true} className="w-48">
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" /> Cargando...
                 </Button>
            ) : (
              <Button
                  size="lg"
                  onClick={() => isAuthenticated ? router.push('/chat') : router.push('/login')}
                  className={cn(
                      "w-48 transition-all duration-150 ease-in-out transform hover:scale-105",
                      "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus:outline-none"
                  )}
              >
                  {/* Botones traducidos */}
                  {isAuthenticated ? 'Ir al Chat' : 'Empezar Ahora'}
              </Button>
            )}
            {!isAuthenticated && !isAuthLoading && (
                 // Texto traducido
                 <p className="text-xs text-muted-foreground mt-3">
                     ¿Ya tienes cuenta? <Link href="/login" className="text-primary hover:underline">Inicia Sesión</Link>
                 </p>
            )}
         </section>

         <section className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl w-full">
             {/* Textos de Feature Cards traducidos */}
             <FeatureCard
                 title="Búsqueda Inteligente"
                 description="Encuentra la información exacta que necesitas al instante usando lenguaje natural. Olvídate de adivinar palabras clave."
                 icon="Search"
              />
             <FeatureCard
                 title="Conocimiento Centralizado"
                 description="Rompe los silos de información. Accede al conocimiento colectivo de toda tu organización en un solo lugar seguro."
                 icon="Library"
             />
             <FeatureCard
                 title="Productividad Mejorada"
                 description="Empodera a tu equipo con acceso rápido a información relevante, permitiendo decisiones más rápidas y basadas en datos."
                  icon="Zap"
             />
         </section>
      </main>

      <footer className="bg-muted/10 border-t py-8 mt-16">
        {/* Textos de Footer traducidos */}
        <div className="container text-center text-muted-foreground text-sm">
          © {new Date().getFullYear()} {APP_NAME}. Todos los derechos reservados. | <Link href="/privacy" className="hover:text-primary">Política de Privacidad</Link> | <Link href="/terms" className="hover:text-primary">Términos de Servicio</Link>
        </div>
      </footer>
    </div>
  );
}

// Componente de botón de enlace traducido
function LinkButton({ href, children, Icon, isActive = false }: { href: string; children: React.ReactNode; Icon: React.ElementType; isActive?: boolean }) {
  const router = useRouter();
  return (
    <Button
        variant="ghost"
        onClick={() => router.push(href)}
        className={cn(
            "text-sm px-2 sm:px-3 py-1 h-8",
            "hover:bg-accent/50 focus:outline-none focus:ring-1 focus:ring-ring rounded",
            isActive ? "text-primary font-medium bg-accent/50" : "text-muted-foreground hover:text-foreground"
        )}
     >
       <Icon className="h-4 w-4 mr-1 hidden sm:inline-block" />
      {children}
    </Button>
  );
}

// Componente de tarjeta de característica (sin cambios internos, usa props traducidas)
function FeatureCard({ title, description, icon }: { title: string; description: string; icon: string }) {
   const IconComponent = iconMap[icon] || Zap;
  return (
    <div className="p-6 rounded-lg bg-card/50 hover:bg-card border border-border/50 hover:shadow-lg transition-all duration-200 text-left">
       <IconComponent className="w-8 h-8 mb-3 text-primary" />
      <h3 className="text-lg font-semibold text-foreground mb-2">{title}</h3>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  );
}