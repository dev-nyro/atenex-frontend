// File: components/knowledge/document-status-list.tsx (MODIFICADO)
"use client";

import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { AlertCircle, CheckCircle2, Loader2, RefreshCw, AlertTriangle, HelpCircle } from 'lucide-react'; // Added HelpCircle for chunks
import { retryIngestDocument, deleteIngestDocument, DocumentStatusResponse, AuthHeaders } from '@/lib/api'; // Usar interfaz y función API
import { toast } from 'sonner';
import { Skeleton } from '@/components/ui/skeleton'; // Importar Skeleton
import { cn } from '@/lib/utils';

// Interfaz local renombrada para claridad (usa la de la API)
type DocumentStatus = DocumentStatusResponse;

interface DocumentStatusListProps {
  documents: DocumentStatus[];
  authHeaders: AuthHeaders;
  onRetrySuccess: (documentId: string) => void;
  fetchMore: () => void;
  hasMore: boolean;
  refreshDocument: (documentId: string) => void;
  deleteLocalDocument: (documentId: string) => void;
}

// Helper con textos y estilos actualizados
const getStatusAttributes = (status: DocumentStatus['status']) => {
    switch (status) {
        case 'uploaded':
          return { icon: Loader2, text: 'En Cola', className: 'text-blue-600 bg-blue-100 border-blue-200 dark:text-blue-300 dark:bg-blue-900/30 dark:border-blue-700', animate: true };
        case 'processing':
          return { icon: Loader2, text: 'Procesando', className: 'text-orange-600 bg-orange-100 border-orange-200 dark:text-orange-300 dark:bg-orange-900/30 dark:border-orange-700', animate: true };
        case 'processed':
          return { icon: CheckCircle2, text: 'Procesado', className: 'text-green-600 bg-green-100 border-green-200 dark:text-green-300 dark:bg-green-900/30 dark:border-green-700', animate: false };
        case 'error':
          return { icon: AlertTriangle, text: 'Error', className: 'text-red-600 bg-red-100 border-red-200 dark:text-red-300 dark:bg-red-900/30 dark:border-red-700', animate: false };
        default:
          // Mapear cualquier otro estado (como 'indexed' si volviera) a Desconocido o similar
          return { icon: AlertCircle, text: status || 'Desconocido', className: 'text-gray-600 bg-gray-100 border-gray-200 dark:text-gray-400 dark:bg-gray-700/30 dark:border-gray-600', animate: false };
      }
};

export function DocumentStatusList({ documents, authHeaders, onRetrySuccess, fetchMore, hasMore, refreshDocument, deleteLocalDocument }: DocumentStatusListProps) {

  const handleRetry = async (documentId: string, fileName?: string | null) => {
    if (!authHeaders) return;
    const displayId = fileName || documentId.substring(0, 8) + "...";
    const toastId = toast.loading(`Reintentando ingesta para "${displayId}"...`);
    try {
      await retryIngestDocument(documentId, authHeaders);
      // Ya no necesitamos el 'result.status' porque onRetrySuccess hace la actualización local
      toast.success("Reintento Iniciado", {
        id: toastId,
        description: `El documento "${displayId}" se está procesando de nuevo.`,
      });
      onRetrySuccess(documentId); // Llama al callback para actualizar UI localmente
    } catch (error: any) {
      const errorMsg = error instanceof Error ? error.message : 'Error desconocido';
      toast.error("Error al Reintentar", {
        id: toastId,
        description: `No se pudo reintentar la ingesta para "${displayId}": ${errorMsg}`,
      });
    }
  };

  const handleRefresh = (documentId: string) => {
    refreshDocument(documentId);
    toast.success('Estado actualizado.');
  };

  const handleDelete = async (documentId: string, fileName?: string | null) => {
    const display = fileName || documentId.substring(0,8)+'...';
    const id = toast.loading(`Eliminando ${display}...`);
    try {
      await deleteIngestDocument(documentId, authHeaders);
      deleteLocalDocument(documentId);
      toast.success('Documento eliminado', { id });
    } catch(e:any) {
      toast.error('Error al eliminar', { id, description: e.message || '' });
    }
  };

  if (!documents || documents.length === 0) {
    return <p className="text-center text-muted-foreground p-5">No hay documentos subidos aún.</p>;
  }

  return (
    <TooltipProvider>
      {/* Legend for statuses */}
      <div className="flex flex-wrap gap-3 mb-4 text-xs">
        {['En Cola','Procesando','Procesado','Error'].map((label, i) => {
          const attr = [ 'uploaded','processing','processed','error' ].map(s => getStatusAttributes(s));
          const { className: cls } = attr[i];
          return <span key={label} className={`inline-block px-2 py-0.5 rounded ${cls}`}>{label}</span>;
        })}
      </div>
      <div className="border rounded-md overflow-hidden"> {/* overflow-hidden para bordes redondeados */}
        <Table>
          <TableHeader>
            <TableRow>
              {/* Columnas actualizadas */}
              <TableHead>Nombre Archivo</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead className="text-center hidden sm:table-cell">Chunks</TableHead> {/* Oculto en móvil */}
              <TableHead className="hidden md:table-cell">Última Actualización</TableHead> {/* Oculto en pantallas pequeñas */}
              <TableHead className="text-right">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {documents.map((doc) => {
              const { icon: Icon, text: statusText, className: statusClassName, animate } = getStatusAttributes(doc.status);
              // Mostrar fecha de última actualización desde 'last_updated'
              const dateToShow = doc.last_updated;
              const displayDate = dateToShow ? new Date(dateToShow).toLocaleString() : 'N/D';
              const displayFileName = doc.file_name || `ID: ${doc.document_id.substring(0, 8)}...`;

              return (
                <TableRow key={doc.document_id}>
                  <TableCell className="font-medium max-w-[150px] sm:max-w-xs truncate" title={displayFileName}>
                    {displayFileName}
                  </TableCell>
                  <TableCell>
                    <Badge variant='outline' className={cn("border", statusClassName)}>
                      <Icon className={cn("h-4 w-4 mr-1.5", animate && "animate-spin")} />
                      {statusText}
                      {doc.status === 'error' && doc.error_message && (
                        <Tooltip delayDuration={100}>
                          <TooltipTrigger asChild>
                            {/* Usar AlertCircle para el tooltip de error */}
                            <AlertCircle className="h-4 w-4 ml-1.5 cursor-help opacity-70 hover:opacity-100" />
                          </TooltipTrigger>
                          <TooltipContent side="top" className="max-w-xs break-words bg-destructive text-destructive-foreground">
                            <p>Error: {doc.error_message}</p>
                          </TooltipContent>
                        </Tooltip>
                      )}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-center hidden sm:table-cell">
                    {/* Mostrar chunks si están disponibles, si no 'N/D' */}
                    {doc.chunk_count !== undefined && doc.chunk_count !== null ? doc.chunk_count : (
                         <Tooltip delayDuration={100}>
                             <TooltipTrigger className='cursor-default'>N/D</TooltipTrigger>
                             <TooltipContent>
                                Conteo de chunks no disponible.
                             </TooltipContent>
                         </Tooltip>
                    )}
                  </TableCell>
                  <TableCell className="text-muted-foreground text-xs hidden md:table-cell">{displayDate}</TableCell>
                  <TableCell className="text-right space-x-1">
                    {/* Retry on error */}
                    {doc.status === 'error' && (
                      <Tooltip delayDuration={100}>
                        <TooltipTrigger asChild>
                           <Button
                             variant="ghost"
                             size="icon"
                             className="h-7 w-7" // Botón más pequeño
                             onClick={() => handleRetry(doc.document_id, doc.file_name)}
                             aria-label="Reintentar ingesta"
                           >
                             <RefreshCw className="h-4 w-4" />
                           </Button>
                        </TooltipTrigger>
                         <TooltipContent>
                            {/* Tooltip traducido */}
                            <p>Reintentar</p>
                         </TooltipContent>
                      </Tooltip>
                    )}
                    {/* Manual refresh */}
                    <Tooltip delayDuration={100}>
                      <TooltipTrigger asChild>
                        <Button variant="ghost" size="icon" onClick={() => handleRefresh(doc.document_id)} aria-label="Actualizar estado">
                          <Loader2 className="h-4 w-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent><p>Actualizar</p></TooltipContent>
                    </Tooltip>
                    {/* Delete document */}
                    <Tooltip delayDuration={100}>
                      <TooltipTrigger asChild>
                        <Button variant="ghost" size="icon" onClick={() => handleDelete(doc.document_id, doc.file_name)} aria-label="Eliminar documento">
                          <AlertCircle className="h-4 w-4 text-destructive" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent><p>Eliminar</p></TooltipContent>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
        {hasMore && (
          <div className="p-3 text-center">
            <Button variant="outline" size="sm" onClick={fetchMore}>Cargar más</Button>
          </div>
        )}
      </div>
    </TooltipProvider>
  );
}