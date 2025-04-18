// File: app/about/page.tsx (MODIFICADO - Iteración 5.2)
"use client";

import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { APP_NAME } from '@/lib/constants';
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"; // Añadido AvatarImage
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react'; // Icono para volver

const teamMembers = [
    { name: "Demo User 1", role: "Fundador", imageUrl: null },
    { name: "Demo User 2", role: "Co-Fundador", imageUrl: null },
    { name: "Demo User 3", role: "Ingeniero Líder", imageUrl: null },
];

export default function AboutPage() {
    const router = useRouter();

  return (
      // Contenedor principal con padding y layout de una columna
      <div className="container mx-auto max-w-4xl p-4 md:p-8 space-y-8">
          {/* Botón volver mejorado */}
          <Button variant="ghost" onClick={() => router.push('/')} className="text-sm text-muted-foreground hover:text-foreground mb-4 -ml-4">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Volver al Inicio
          </Button>
          {/* Título principal */}
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">Acerca de {APP_NAME}</h1>

          {/* Card Misión */}
          <Card>
              <CardHeader>
                  <CardTitle>Nuestra Misión</CardTitle>
                  <CardDescription>
                      Empoderar a las organizaciones con acceso fluido a su conocimiento colectivo.
                  </CardDescription>
              </CardHeader>
              <CardContent className="prose prose-sm sm:prose-base dark:prose-invert max-w-none">
                  <p>
                      Estamos comprometidos a proporcionar soluciones innovadoras que optimicen la gestión del conocimiento,
                      faciliten la toma de decisiones informadas y mejoren la productividad del equipo.
                  </p>
              </CardContent>
          </Card>

          {/* Card Visión */}
          <Card>
              <CardHeader>
                  <CardTitle>Nuestra Visión</CardTitle>
                  <CardDescription>
                      Ser la plataforma líder de consulta de conocimiento, transformando cómo las empresas aprovechan la información.
                  </CardDescription>
              </CardHeader>
              <CardContent className="prose prose-sm sm:prose-base dark:prose-invert max-w-none">
                  <p>
                      Visualizamos un futuro donde las organizaciones pueden aprovechar sin esfuerzo su experiencia interna,
                      fomentando una cultura de aprendizaje y crecimiento continuos.
                  </p>
              </CardContent>
          </Card>

          {/* Card Valores */}
          <Card>
              <CardHeader>
                  <CardTitle>Nuestros Valores</CardTitle>
                  <CardDescription>
                      Pilares que guían nuestro trabajo diario.
                  </CardDescription>
              </CardHeader>
              <CardContent className="prose prose-sm sm:prose-base dark:prose-invert max-w-none">
                  <ul>
                      <li>
                          <strong>Integridad:</strong> Mantenemos los más altos estándares éticos en todas nuestras operaciones.
                      </li>
                      <li>
                          <strong>Innovación:</strong> Buscamos continuamente nuevas formas de mejorar nuestra plataforma y servicios.
                      </li>
                      <li>
                          <strong>Colaboración:</strong> Creemos en trabajar juntos para lograr objetivos compartidos.
                      </li>
                      <li>
                          <strong>Éxito del Cliente:</strong> Estamos dedicados a ayudar a nuestros clientes a tener éxito.
                      </li>
                  </ul>
              </CardContent>
          </Card>

          {/* Card Equipo */}
          <Card>
              <CardHeader>
                  <CardTitle>Conoce a Nuestro Equipo</CardTitle>
                  <CardDescription>
                      Las talentosas personas detrás de {APP_NAME}.
                  </CardDescription>
              </CardHeader>
              <CardContent>
                  {/* Grid para el equipo */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 justify-items-center">
                    {teamMembers.map((member) => (
                        <div key={member.name} className="flex flex-col items-center text-center">
                            <Avatar className="h-20 w-20 border-2 border-primary/10">
                                {member.imageUrl ? (
                                    <AvatarImage src={member.imageUrl} alt={member.name} />
                                ) : (
                                    // Fallback con iniciales y fondo suave
                                    <AvatarFallback className='text-xl bg-muted'>{member.name.charAt(0)}</AvatarFallback>
                                )}
                            </Avatar>
                            <div className="mt-3">
                                <p className="font-semibold text-foreground">{member.name}</p>
                                <p className="text-xs text-muted-foreground">{member.role}</p>
                            </div>
                        </div>
                    ))}
                 </div>
              </CardContent>
          </Card>
          <Separator className="my-12" /> {/* Separador al final */}
      </div>
  );
}