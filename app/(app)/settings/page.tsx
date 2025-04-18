// File: app/(app)/settings/page.tsx (MODIFICADO)
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
    const [isSaving, setIsSaving] = useState(false);
    // Estado para rastrear si el nombre ha cambiado
    const [hasChanged, setHasChanged] = useState(false);

    useEffect(() => {
        if (user) {
            const currentName = user.name || '';
            setName(currentName);
            // Resetear cambio cuando el usuario cambie o se cargue inicialmente
            setHasChanged(false);
        }
    }, [user]);

    const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newName = event.target.value;
        setName(newName);
        // Verificar si el nuevo nombre es diferente al original del usuario
        setHasChanged(newName !== (user?.name || ''));
    };

    const handleSave = async () => {
        // No hacer nada si no hay cambios
        if (!hasChanged) return;

        setIsSaving(true);
        console.log('Guardando cambios (simulado):', { name });
        try {
          await new Promise(resolve => setTimeout(resolve, 1000));
          toast.success("Perfil Actualizado", { description: "Tu nombre ha sido guardado." });
          // Una vez guardado, marcar que ya no hay cambios pendientes
          setHasChanged(false);
          // TODO: Idealmente, actualizar el 'user' en el AuthContext si la API devuelve el usuario actualizado
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
             {/* Deshabilitar si está guardando O si no hay cambios */}
             <Button onClick={handleSave} disabled={isSaving || !hasChanged}>
                {isSaving ? "Guardando..." : "Guardar Cambios"}
             </Button>
        </CardContent>
      </Card>

       <Separator />

       {/* Sección de Empresa Mantenida por ahora, pero marcada como no implementada */}
       <Card>
        <CardHeader>
          <CardTitle>Configuración de la Empresa</CardTitle>
          <CardDescription>Administra la configuración relacionada con tu empresa.</CardDescription>
        </CardHeader>
        <CardContent>
           <p className="text-sm text-muted-foreground">La gestión de la configuración de la empresa aún no está implementada.</p>
        </CardContent>
      </Card>

       {/* ELIMINADO: Sección de Apariencia Redundante */}
       {/* <Separator />
       <Card>
        <CardHeader>...</CardHeader>
        <CardContent>...</CardContent>
      </Card> */}

    </div>
  );
}