// File: app/page.tsx (CORREGIDO - Contenido restaurado, logo y animación)
"use client";

import React from 'react';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { APP_NAME } from '@/lib/constants';
import { useAuth } from '@/lib/hooks/useAuth';
import { cn } from '@/lib/utils';
import { Loader2, Home as HomeIcon, Info, Mail, Search, Library, Zap } from 'lucide-react';
import Link from 'next/link';
import AtenexLogo from '@/components/icons/atenex-logo'; // Importar logo SVG

// Mapeo de iconos
const iconMap: { [key: string]: React.ComponentType<{ className?: string }> } = {
  Search: Search,
  Library: Library,
  Zap: Zap,
  HomeIcon: HomeIcon,
  Info: Info,
  Mail: Mail,
};

export default function HomePage() {
  const router = useRouter();
  const { user, isLoading: isAuthLoading } = useAuth();
  const isAuthenticated = !isAuthLoading && !!user;

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-background via-background to-secondary/10 dark:to-muted/10">
      {/* Header específico de la Landing Page */}
      <header className="sticky top-0 z-50 w-full bg-background/90 backdrop-blur-lg border-b border-border/60">
        <div className="container flex items-center justify-between h-16 px-4 md:px-6">
          {/* Logo/Nombre App */}
          <Link
            href="/"
            className="flex items-center gap-2 text-xl font-semibold text-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm"
            aria-label={`${APP_NAME} - Inicio`}
          >
             {/* Logo aquí o icono simple si se prefiere */}
             <AtenexLogo className="h-7 w-auto" />
            <span className='font-bold'>{APP_NAME}</span>
          </Link>

          {/* Navegación y Autenticación */}
          <nav className="flex items-center space-x-1 sm:space-x-2">
            <LinkButton href="/" Icon={HomeIcon} isActive={true}>Inicio</LinkButton>
            <LinkButton href="/about" Icon={Info}>Nosotros</LinkButton>
            <LinkButton href="/contact" Icon={Mail}>Contacto</LinkButton>
            <div className="pl-2 sm:pl-4">
                {isAuthLoading ? (
                    <Button variant="ghost" disabled={true} size="sm" className="w-[95px]"> <Loader2 className="h-4 w-4 animate-spin" /> </Button>
                ) : isAuthenticated ? (
                    <Button variant="default" onClick={() => router.push('/chat')} size="sm" className="w-[95px] shadow-sm"> Ir a la App </Button>
                ) : (
                    <Button variant="outline" onClick={() => router.push('/login')} size="sm" className="w-[95px] transition-colors duration-150 hover:bg-accent hover:text-accent-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"> Acceder </Button>
                )}
            </div>
          </nav>
        </div>
      </header>

      {/* Contenido Principal con animación fade-in */}
      <main className="container mx-auto px-4 py-20 md:py-32 flex-1 flex flex-col items-center text-center animate-fade-in opacity-0 [--animation-delay:200ms]" style={{animationFillMode: 'forwards'}}>
         {/* Hero Section */}
         <section className="max-w-4xl">
            {/* Logo Atenex */}
            <div className="mb-8 flex justify-center">
                <AtenexLogo width={100} height={100} className="text-primary drop-shadow-lg" />
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tighter text-foreground mb-6 leading-tight">
                Desbloquea el Conocimiento Oculto en tu Empresa con <span className="text-primary">{APP_NAME}</span>
            </h1>
            <p className="text-lg sm:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
                Haz preguntas en lenguaje natural. Obtén respuestas precisas al instante, directamente desde los documentos y datos de tu organización.
            </p>
            {/* Botón Principal */}
            {isAuthLoading ? (
                 <Button size="lg" disabled={true} className="w-48 shadow-md"> <Loader2 className="mr-2 h-5 w-5 animate-spin" /> Cargando... </Button>
            ) : (
              <Button size="lg" onClick={() => isAuthenticated ? router.push('/chat') : router.push('/login')} className={cn( "w-48 transition-transform duration-150 ease-in-out transform hover:scale-[1.03]", "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus:outline-none shadow-lg" )}>
                  {isAuthenticated ? 'Ir al Chat' : 'Comenzar Ahora'}
              </Button>
            )}
            {!isAuthenticated && !isAuthLoading && (
                 <p className="text-xs text-muted-foreground mt-4">
                     ¿Ya tienes cuenta? <Link href="/login" className="font-medium text-primary hover:underline underline-offset-4">Inicia Sesión</Link>
                 </p>
            )}
         </section>

         {/* Features Section */}
         <section className="mt-24 md:mt-32 grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 max-w-6xl w-full">
             <FeatureCard title="Búsqueda Inteligente" description="Encuentra información exacta al instante usando lenguaje natural. Olvídate de adivinar palabras clave." icon="Search"/>
             <FeatureCard title="Conocimiento Centralizado" description="Rompe los silos de información. Accede al conocimiento colectivo de tu organización en un solo lugar seguro." icon="Library"/>
             <FeatureCard title="Productividad Mejorada" description="Empodera a tu equipo con acceso rápido a datos relevantes, permitiendo decisiones más rápidas y fundamentadas." icon="Zap"/>
         </section>
      </main>

      {/* Footer */}
      <footer className="bg-muted/20 border-t border-border/60 py-6">
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

// Componente LinkButton (sin cambios)
function LinkButton({ href, children, Icon, isActive = false }: { href: string; children: React.ReactNode; Icon?: React.ComponentType<{ className?: string }>; isActive?: boolean }) {
  const router = useRouter();
  return ( <Button variant="ghost" onClick={() => router.push(href)} className={cn( "text-sm px-2 sm:px-3 py-1 h-8", "rounded-md", "hover:bg-accent hover:text-accent-foreground", "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring", isActive ? "text-primary font-semibold bg-primary/10" : "text-muted-foreground" )}> {Icon && <Icon className="h-4 w-4 mr-1.5 hidden sm:inline-block flex-shrink-0" />} {children} </Button> );
}

// Componente FeatureCard (sin cambios)
function FeatureCard({ title, description, icon }: { title: string; description: string; icon: string }) {
   const IconComponent = iconMap[icon] || Info; // Default icon fallback
  return ( <div className={cn( "p-6 rounded-xl bg-card/60 backdrop-blur-sm", "border border-border/60", "hover:bg-card/90 hover:shadow-lg hover:-translate-y-1", "transition-all duration-200 ease-in-out text-left" )}> <IconComponent className="w-8 h-8 mb-4 text-primary" /> <h3 className="text-lg font-semibold text-foreground mb-2">{title}</h3> <p className="text-sm text-muted-foreground leading-relaxed">{description}</p> </div> );
}