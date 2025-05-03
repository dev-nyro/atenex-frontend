// File: app/(app)/admin/page.tsx
"use client";

import React, { Suspense } from 'react'; // Import Suspense
import { useRouter, useSearchParams } from 'next/navigation';
import AdminStats from '@/components/admin/AdminStats';
import AdminManagement from '@/components/admin/AdminManagement';
import { useAuth } from '@/lib/hooks/useAuth';
import { Loader2 } from 'lucide-react';

// Componente interno para leer searchParams (necesario con Suspense)
function AdminDashboardContent() {
  const searchParams = useSearchParams();
  const view = searchParams.get('view') || 'stats'; // Default to stats view

  // Renderizar la vista seleccionada
  return (
    <div className="space-y-6">
      {view === 'stats' && <AdminStats />}
      {view === 'management' && <AdminManagement />}
      {/* Puedes añadir más vistas aquí si es necesario */}
    </div>
  );
}

export default function AdminDashboardPage() {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  // Opcional: Doble chequeo de admin, aunque el layout ya debería proteger
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  // Si después de cargar no hay usuario o no es admin, redirigir
  if (!user || !user.isAdmin) {
    // Si por alguna razón un no-admin llega aquí, redirigir
    // Usar useEffect para evitar problemas de renderizado durante el renderizado
    React.useEffect(() => {
        console.log("AdminDashboardPage: Non-admin detected, redirecting...");
        router.replace('/chat'); // o a donde sea apropiado
    }, [router]);
    return ( // Mostrar loader mientras redirige
       <div className="flex items-center justify-center h-full">
         <Loader2 className="h-8 w-8 animate-spin text-primary" />
         <p className="ml-2">Redirigiendo...</p>
       </div>
    );
  }

  // Usar Suspense para permitir que AdminDashboardContent use useSearchParams
  return (
    <Suspense fallback={
        <div className="flex items-center justify-center h-full">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
    }>
      <AdminDashboardContent />
    </Suspense>
  );
}