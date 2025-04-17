// File: components/knowledge/document-status-list.tsx
"use client";

import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { AlertCircle, CheckCircle2, Loader2, RefreshCw, AlertTriangle } from 'lucide-react';
import { retryIngestDocument } from '@/lib/api';
import { toast } from 'sonner';

interface Document {
  id: string;
  name: string;
  status: 'uploaded' | 'processing' | 'processed' | 'error';
  error_message?: string | null;
  created_at: string;
}

interface DocumentStatusListProps {
  documents: Document[]; // Usar la interfaz definida
  isLoading: boolean;
  authHeaders: import('@/lib/api').AuthHeaders;
  onRetrySuccess: (documentId: string) => void;
}

// Helper con textos traducidos
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
              {/* Cabeceras traducidas */}
              <TableHead>Nombre</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead>Fecha de Subida</TableHead>
              <TableHead className="text-right">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {documents.map((doc) => {
              const { icon, text: statusText, color } = getStatusAttributes(doc.status);
              // Formato de fecha localizado (depende del navegador del usuario)
              const date = new Date(doc.created_at).toLocaleString();

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
                             // aria-label traducido
                             aria-label="Reintentar ingesta"
                           >
                             <RefreshCw className="h-4 w-4" />
                           </Button>
                        </TooltipTrigger>
                         <TooltipContent>
                            {/* Tooltip traducido */}
                            <p>Reintentar Ingesta</p>
                         </TooltipContent>
                      </Tooltip>
                    )}
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