// File: components/admin/AdminStats.tsx
"use client";

import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Skeleton } from '@/components/ui/skeleton';
import { AlertCircle, Users, Building, Loader2 } from 'lucide-react';
import { getAdminStats, AdminStatsResponse } from '@/lib/api'; // Necesitarás definir esto en api.ts
import { useAuth } from '@/lib/hooks/useAuth';
import { toast } from 'sonner';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';

export default function AdminStats() {
  const { token } = useAuth(); // Necesario para las llamadas API (implícito en request)
  const [stats, setStats] = useState<AdminStatsResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      if (!token) {
        // No establecer error aquí, simplemente no hacer la llamada si no hay token
        // El componente padre (layout/page) debería manejar la redirección
        console.warn("AdminStats: No token available, skipping fetch.");
        setIsLoading(false); // Marcar como no cargando
        return;
      }
      setIsLoading(true);
      setError(null);
      try {
        const data = await getAdminStats(); // Llamada API (usará mock por ahora)
        setStats(data);
      } catch (err: any) {
        console.error("Error fetching admin stats:", err);
        const message = err.message || "No se pudieron cargar las estadísticas.";
        setError(message);
        toast.error("Error al cargar estadísticas", { description: message });
      } finally {
        setIsLoading(false);
      }
    };

    fetchStats();
  }, [token]); // Depende del token para re-fetch si cambia

  // Calcula el total de usuarios sumando los user_count de cada compañía
  const totalUsers = React.useMemo(() => {
    return stats?.users_per_company?.reduce((sum, company) => sum + company.user_count, 0);
  }, [stats]);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold tracking-tight">Estadísticas Generales</h1>

      {/* Tarjetas de Resumen */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {/* Tarjeta Empresas */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Empresas Totales</CardTitle>
            <Building className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <Skeleton className="h-8 w-16" />
            ) : error ? (
              <span className="text-sm text-destructive">-</span>
            ) : (
              <div className="text-2xl font-bold">{stats?.company_count ?? '-'}</div>
            )}
            <p className="text-xs text-muted-foreground pt-1">
              Organizaciones registradas.
            </p>
          </CardContent>
        </Card>
        {/* Tarjeta Usuarios */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Usuarios Totales</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <Skeleton className="h-8 w-16" />
            ) : error ? (
              <span className="text-sm text-destructive">-</span>
            ) : (
              <div className="text-2xl font-bold">{totalUsers ?? '-'}</div>
            )}
            <p className="text-xs text-muted-foreground pt-1">
              Usuarios activos en todas las empresas.
            </p>
          </CardContent>
        </Card>
        {/* Puedes añadir más tarjetas aquí */}
      </div>

      {/* Tabla de Usuarios por Empresa */}
      <Card>
        <CardHeader>
          <CardTitle>Usuarios por Empresa</CardTitle>
          <CardDescription>Desglose del número de usuarios activos por cada empresa.</CardDescription>
        </CardHeader>
        <CardContent>
          {error && !isLoading && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[50%]">Nombre Empresa</TableHead>
                <TableHead className="hidden sm:table-cell">ID Empresa</TableHead>
                <TableHead className="text-right">Usuarios</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                [...Array(5)].map((_, i) => (
                  <TableRow key={`skel-row-${i}`}>
                    <TableCell><Skeleton className="h-4 w-3/4" /></TableCell>
                    <TableCell className="hidden sm:table-cell"><Skeleton className="h-4 w-24" /></TableCell>
                    <TableCell className="text-right"><Skeleton className="h-4 w-8 ml-auto" /></TableCell>
                  </TableRow>
                ))
              ) : stats?.users_per_company && stats.users_per_company.length > 0 ? (
                stats.users_per_company.map((company) => (
                  <TableRow key={company.company_id}>
                    <TableCell className="font-medium">{company.name || `Empresa ${company.company_id.substring(0, 6)}`}</TableCell>
                    <TableCell className="text-muted-foreground text-xs font-mono hidden sm:table-cell">{company.company_id}</TableCell>
                    <TableCell className="text-right font-medium">{company.user_count}</TableCell>
                  </TableRow>
                ))
              ) : !error ? (
                <TableRow>
                  <TableCell colSpan={3} className="h-24 text-center text-muted-foreground">
                    No hay datos de empresas disponibles.
                  </TableCell>
                </TableRow>
              ) : null}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}