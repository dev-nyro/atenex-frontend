// app/(app)/settings/page.tsx
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
        console.log('Saving changes:', { name });
    };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Settings</h1>

      <Card>
        <CardHeader>
          <CardTitle>Profile</CardTitle>
          <CardDescription>Manage your personal information.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
            <div className="space-y-1">
                 <Label htmlFor="name">Name</Label>
                 <Input id="name" value={name} onChange={handleNameChange} />
            </div>
             <div className="space-y-1">
                 <Label htmlFor="email">Email</Label>
                 <Input id="email" type="email" defaultValue={user?.email} disabled />
            </div>
             <Button onClick={handleSave}>Save Changes</Button>
        </CardContent>
      </Card>

       <Separator />

       <Card>
        <CardHeader>
          <CardTitle>Company Settings</CardTitle>
          <CardDescription>Manage settings related to your company.</CardDescription>
        </CardHeader>
        <CardContent>
           <p className="text-sm text-muted-foreground">Company settings management is not yet implemented.</p>
           {/* Add company settings fields here */}
        </CardContent>
      </Card>

       <Separator />

       <Card>
        <CardHeader>
          <CardTitle>Appearance</CardTitle>
          <CardDescription>Customize the look and feel.</CardDescription>
        </CardHeader>
        <CardContent>
           <p className="text-sm text-muted-foreground">Theme selection is available in the header.</p>
           {/* Add other appearance settings if needed */}
        </CardContent>
      </Card>

    </div>
  );
}