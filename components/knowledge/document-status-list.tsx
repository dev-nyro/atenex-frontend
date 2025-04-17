// File: components/knowledge/document-status-list.tsx
"use client";

import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { AlertCircle, CheckCircle2, Loader2, RefreshCw, AlertTriangle } from 'lucide-react';
import { retryIngestDocument } from '@/lib/api'; // Import the retry API function
import { toast } from 'sonner'; // For notifications

// Define una interfaz para el tipo de documento esperado
interface Document {
  id: string; // o document_id, ajusta según la API
  name: string; // o filename
  status: 'uploaded' | 'processing' | 'processed' | 'error';
  error_message?: string | null; // Mensaje de error opcional
  created_at: string; // o upload_date
  // Añade otros campos si son necesarios (e.g., size, type)
}

interface DocumentStatusListProps {
  documents: any[];
  isLoading: boolean;
  authHeaders: import('@/lib/api').AuthHeaders;
  onRetrySuccess: (documentId: string) => void;
}

// Helper para obtener icono y color según el estado
const getStatusAttributes = (status: Document['status']) => {
  switch (status) {
    case 'uploaded':
      return { icon: <Loader2 className="h-4 w-4 animate-spin text-blue-500" />, text: 'En Cola', color: 'blue' };
    case 'processing':
      return { icon: <Loader2 className="h-4 w-4 animate-spin text-orange-500" />, text: 'Procesando', color: 'orange' };
    case 'processed':
      return { icon: <CheckCircle2 className="h-4 w-4 text-green-500" />, text: 'Procesado', color: 'green' };
    case 'error':
      return { icon: <AlertTriangle className="h-4 w-4 text-red-500" />, text: 'Error', color: 'red' };
    default:
      return { icon: <AlertCircle className="h-4 w-4 text-gray-500" />, text: 'Desconocido', color: 'gray' };
  }
};

export function DocumentStatusList({ documents, isLoading, authHeaders, onRetrySuccess }: DocumentStatusListProps) {

  const handleRetry = async (documentId: string) => {
    if (!authHeaders) return;
    const toastId = toast.loading(`Reintentando ingesta para el documento ${documentId}...`);
    try {
      const result = await retryIngestDocument(documentId, authHeaders);
      toast.success(`Reintento iniciado. Nuevo estado: ${result.status || 'procesando'}.`, { id: toastId });
      onRetrySuccess(documentId);
    } catch (error: any) {
      toast.error(`Error al reintentar: ${error.message || 'Error desconocido'}`, { id: toastId });
    }
  };

  if (isLoading) {
    return (
        <div className="flex justify-center items-center p-10">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            <span className="ml-2">Cargando documentos...</span>
        </div>
    );
  }

  if (!documents || documents.length === 0) {
    return <p className="text-center text-muted-foreground p-5">No hay documentos subidos aún.</p>;
  }

  return (
    <TooltipProvider>
      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nombre</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead>Fecha de Subida</TableHead>
              <TableHead className="text-right">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {documents.map((doc) => {
              const { icon, text: statusText, color } = getStatusAttributes(doc.status);
              const date = new Date(doc.created_at).toLocaleString(); // Formatear fecha

              return (
                <TableRow key={doc.id}>
                  <TableCell className="font-medium truncate max-w-xs" title={doc.name}>{doc.name}</TableCell>
                  <TableCell>
                    <Badge variant={doc.status === 'error' ? 'destructive' : 'outline'} className={`border-${color}-500/50 text-${color}-700 bg-${color}-50 dark:bg-${color}-900/30 dark:text-${color}-300`}>
                      <span className="mr-1">{icon}</span>
                      {statusText}
                      {doc.status === 'error' && doc.error_message && (
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <AlertCircle className="h-4 w-4 ml-1.5 cursor-help text-red-600" />
                          </TooltipTrigger>
                          <TooltipContent className="max-w-xs break-words">
                            <p>Error: {doc.error_message}</p>
                          </TooltipContent>
                        </Tooltip>
                      )}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-muted-foreground text-sm">{date}</TableCell>
                  <TableCell className="text-right">
                    {doc.status === 'error' && (
                      <Tooltip>
                        <TooltipTrigger asChild>
                           <Button
                             variant="ghost"
                             size="icon"
                             onClick={() => handleRetry(doc.id)}
                             aria-label="Reintentar ingesta"
                           >
                             <RefreshCw className="h-4 w-4" />
                           </Button>
                        </TooltipTrigger>
                         <TooltipContent>
                            <p>Reintentar Ingesta</p>
                         </TooltipContent>
                      </Tooltip>
                    )}
                    {/* Add other actions if needed, e.g., delete */}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </TooltipProvider>
  );
}