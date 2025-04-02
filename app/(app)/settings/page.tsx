"use client";

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/lib/hooks/useAuth';
import { useState, useEffect } from 'react';

// Basic placeholder settings page
export default function SettingsPage() {
    const { user } = useAuth();
    const [name, setName] = useState(user?.name || '');

    useEffect(() => {
        if (user) {
            setName(user.name || '');
        }
    }, [user]);

    const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value);
    };

    const handleSave = async () => {
        // TODO: Implementar la lógica para guardar los cambios en el perfil del usuario.
        // Esto implicaría hacer una llamada a la API para actualizar el nombre del usuario.
        // Puedes usar la función 'request' de lib/api.ts para hacer la llamada a la API.
        console.log('Guardando cambios:', { name });
    };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Configuración</h1>

      <Card>
        <CardHeader>
          <CardTitle>Perfil</CardTitle>
          <CardDescription>Administra tu información personal.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
            <div className="space-y-1">
                 <Label htmlFor="name">Nombre</Label>
                 <Input id="name" value={name} onChange={handleNameChange} />
            </div>
             <div className="space-y-1">
                 <Label htmlFor="email">Correo electrónico</Label>
                 <Input id="email" type="email" defaultValue={user?.email} disabled />
            </div>
             <Button onClick={handleSave}>Guardar Cambios</Button>
        </CardContent>
      </Card>

       <Separator />

       <Card>
        <CardHeader>
          <CardTitle>Configuración de la Empresa</CardTitle>
          <CardDescription>Administra la configuración relacionada con tu empresa.</CardDescription>
        </CardHeader>
        <CardContent>
           <p className="text-sm text-muted-foreground">La gestión de la configuración de la empresa aún no está implementada.</p>
        </CardContent>
      </Card>

       <Separator />

       <Card>
        <CardHeader>
          <CardTitle>Apariencia</CardTitle>
          <CardDescription>Personaliza la apariencia.</CardDescription>
        </CardHeader>
        <CardContent>
           <p className="text-sm text-muted-foreground">La selección de temas está disponible en el encabezado.</p>
        </CardContent>
      </Card>

    </div>
  );
}