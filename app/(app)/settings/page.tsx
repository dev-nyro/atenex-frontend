// File: app/(app)/settings/page.tsx
"use client";

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/lib/hooks/useAuth';
import { useState, useEffect } from 'react';
import { toast } from 'sonner'; // Para notificaciones

export default function SettingsPage() {
    const { user } = useAuth();
    const [name, setName] = useState(user?.name || '');
    const [isSaving, setIsSaving] = useState(false); // Estado para el botón

    useEffect(() => {
        if (user) {
            setName(user.name || '');
        }
    }, [user]);

    const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value);
    };

    const handleSave = async () => {
        setIsSaving(true);
        // TODO: Implementar llamada API real a /users/me/update o similar
        console.log('Guardando cambios (simulado):', { name });
        try {
          // Simular llamada a API
          await new Promise(resolve => setTimeout(resolve, 1000));
          // Aquí iría la llamada real: await updateUserProfile({ name });
          toast.success("Perfil Actualizado", { description: "Tu nombre ha sido guardado." });
          // Opcional: actualizar el estado global del usuario si el nombre cambia
          // (requeriría una función updateUser en useAuth)
        } catch (error) {
          console.error("Error al guardar perfil:", error);
          toast.error("Error al Guardar", { description: "No se pudo actualizar el perfil." });
        } finally {
           setIsSaving(false);
        }
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
                 <Input
                    id="name"
                    value={name}
                    onChange={handleNameChange}
                    disabled={isSaving}
                 />
            </div>
             <div className="space-y-1">
                 <Label htmlFor="email">Correo electrónico</Label>
                 <Input id="email" type="email" defaultValue={user?.email} disabled />
                 <p className="text-xs text-muted-foreground">El correo electrónico no se puede cambiar.</p>
            </div>
             <Button onClick={handleSave} disabled={isSaving || name === (user?.name || '')}>
                {isSaving ? "Guardando..." : "Guardar Cambios"}
             </Button>
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
           {/* Placeholder para futuras opciones */}
           {/* <div className="space-y-2 mt-4">
                <Label htmlFor="companyName">Nombre de la Empresa</Label>
                <Input id="companyName" defaultValue={user?.companyId} disabled/>
           </div> */}
        </CardContent>
      </Card>

       <Separator />

    </div>
  );
}