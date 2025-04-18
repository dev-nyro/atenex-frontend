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
    const [hasChanged, setHasChanged] = useState(false);

    useEffect(() => {
        if (user) {
            const currentName = user.name || '';
            setName(currentName);
            setHasChanged(false);
        }
    }, [user]);

    const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newName = event.target.value;
        setName(newName);
        setHasChanged(newName !== (user?.name || ''));
    };

    const handleSave = async () => {
        if (!hasChanged) return;
        setIsSaving(true);
        console.log('Guardando cambios (simulado):', { name });
        try {
          await new Promise(resolve => setTimeout(resolve, 1000));
          toast.success("Perfil Actualizado", { description: "Tu nombre ha sido guardado." });
          setHasChanged(false);
          // TODO: Actualizar user en AuthContext
        } catch (error) {
          console.error("Error al guardar perfil:", error);
          toast.error("Error al Guardar", { description: "No se pudo actualizar el perfil." });
        } finally {
           setIsSaving(false);
        }
    };

  return (
    // Contenedor principal con espaciado vertical
    <div className="space-y-8 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold tracking-tight">Configuración</h1>

      {/* Card para Perfil */}
      <Card>
        <CardHeader>
          <CardTitle>Perfil de Usuario</CardTitle>
          <CardDescription>Administra tu información personal.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
            <div className="space-y-2"> {/* Agrupado con Label */}
                 <Label htmlFor="name">Nombre</Label>
                 <Input
                    id="name"
                    value={name}
                    onChange={handleNameChange}
                    disabled={isSaving}
                    className="max-w-sm" // Limitar ancho del input
                 />
            </div>
             <div className="space-y-2"> {/* Agrupado con Label */}
                 <Label htmlFor="email">Correo electrónico</Label>
                 <Input id="email" type="email" defaultValue={user?.email} disabled className="max-w-sm"/>
                 <p className="text-xs text-muted-foreground pt-1">El correo electrónico no se puede cambiar.</p>
            </div>
             <Button onClick={handleSave} disabled={isSaving || !hasChanged}>
                {isSaving ? "Guardando..." : "Guardar Cambios"}
             </Button>
        </CardContent>
      </Card>

      {/* Card para Configuración de Empresa */}
       <Card>
        <CardHeader>
          <CardTitle>Configuración de la Empresa</CardTitle>
          <CardDescription>Administra la configuración relacionada con tu empresa.</CardDescription>
        </CardHeader>
        <CardContent>
           <p className="text-sm text-muted-foreground">La gestión de la configuración de la empresa aún no está implementada.</p>
            {/* Información de la compañía actual (si existe) */}
            {user?.companyId && (
                 <div className="mt-4 space-y-2">
                    <Label>ID de Empresa Actual</Label>
                    <Input value={user.companyId} readOnly disabled className="max-w-sm font-mono text-xs"/>
                 </div>
             )}
        </CardContent>
      </Card>

    </div>
  );
}