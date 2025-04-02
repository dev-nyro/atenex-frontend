"use client";

import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { APP_NAME } from '@/lib/constants';
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

const teamMembers = [
    { name: "Demo User 1", role: "Fundador", imageUrl: null },
    { name: "Demo User 2", role: "Co-Fundador", imageUrl: null },
    { name: "Demo User 3", role: "Ingeniero Líder", imageUrl: null },
    // Add more team members as needed
];

const milestones = [
    { year: 2023, event: "Atenex fundada con una visión de conocimiento accesible." },
    // Add more milestones
];

export default function AboutPage() {
    const router = useRouter();

  return (
      <div className="container mx-auto p-6 space-y-4">
          <Button variant="link" onClick={() => router.push('/')}>Volver al Inicio</Button>
          <h1 className="text-3xl font-semibold">Acerca de {APP_NAME}</h1>

          <Card>
              <CardHeader>
                  <CardTitle>Nuestra Misión</CardTitle>
                  <CardDescription>
                      Empoderar a las organizaciones con acceso fluido a su conocimiento colectivo.
                  </CardDescription>
              </CardHeader>
              <CardContent>
                  <p>
                      Estamos comprometidos a proporcionar soluciones innovadoras que optimicen la gestión del conocimiento,
                      faciliten la toma de decisiones informadas y mejoren la productividad del equipo.
                  </p>
              </CardContent>
          </Card>

          <Separator />

          <Card>
              <CardHeader>
                  <CardTitle>Nuestra Visión</CardTitle>
                  <CardDescription>
                      Ser la plataforma líder de consulta de conocimiento, transformando cómo las empresas aprovechan la información.
                  </CardDescription>
              </CardHeader>
              <CardContent>
                  <p>
                      Visualizamos un futuro donde las organizaciones pueden aprovechar sin esfuerzo su experiencia interna,
                      fomentando una cultura de aprendizaje y crecimiento continuos.
                  </p>
              </CardContent>
          </Card>

          <Separator />

          <Card>
              <CardHeader>
                  <CardTitle>Nuestros Valores</CardTitle>
                  <CardDescription>
                      Integridad, Innovación, Colaboración y Éxito del Cliente.
                  </CardDescription>
              </CardHeader>
              <CardContent>
                  <ul className="list-disc list-inside space-y-1">
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
          <Separator />

          <Card>
              <CardHeader>
                  <CardTitle>Conoce a Nuestro Equipo</CardTitle>
                  <CardDescription>
                      Las talentosas personas detrás de {APP_NAME}.
                  </CardDescription>
              </CardHeader>
              <CardContent className="flex justify-center">
                  <div className="grid sm:grid-cols-3 gap-4">
                    {teamMembers.map((member) => (
                        <div key={member.name} className="flex flex-col items-center">
                            <Avatar className="h-16 w-16">
                                {member.imageUrl ? (
                                    <img src={member.imageUrl} alt={member.name} />
                                ) : (
                                    <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                                )}
                            </Avatar>
                            <div className="mt-2 text-center">
                                <p className="font-medium">{member.name}</p>
                                <p className="text-sm text-muted-foreground">{member.role}</p>
                            </div>
                        </div>
                    ))}
                </div>
              </CardContent>
          </Card>
      </div>
  );
}