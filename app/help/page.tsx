// filepath: e:/Nyro/AUDIZOR_B2B/atenex-frontend/app/help/page.tsx
"use client";

import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function HelpPage() {
  return (
    <div className="container mx-auto p-6 space-y-4">
      <h1 className="text-2xl font-semibold">Ayuda y Soporte</h1>
      <Card>
        <CardHeader>
          <CardTitle>Documentación de la Plataforma</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <p>
            Encuentra guías y respuestas a preguntas frecuentes sobre cómo utilizar Atenex.
            Visita nuestra <a href="https://docs.atenex.com" target="_blank" rel="noopener noreferrer" className="text-primary underline">documentación oficial</a> para más información.
          </p>
          <p>
            Si necesitas asistencia adicional, contacta al equipo de soporte:
          </p>
          <ul className="list-disc list-inside">
            <li>Email: <a href="mailto:soporte@atenex.com" className="text-primary underline">soporte@atenex.com</a></li>
            <li>Teléfono: <a href="tel:+34123456789" className="text-primary underline">+34 123 456 789</a></li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
