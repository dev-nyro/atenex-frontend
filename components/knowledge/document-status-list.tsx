// File: components/knowledge/document-status-list.tsx (CORREGIDO Y MODIFICADO - Iteración 4.1)
"use client";

import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { AlertCircle, CheckCircle2, Loader2, RefreshCw, AlertTriangle, HelpCircle, Trash2, ServerCrash } from 'lucide-react';
import { DocumentStatusResponse, AuthHeaders, deleteIngestDocument } from '@/lib/api';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Skeleton } from '@/components/ui/skeleton'; // Importar Skeleton
import { Info } from 'lucide-react'; // Importar Info

type DocumentStatus = DocumentStatusResponse;

export interface DocumentStatusListProps {
  documents: DocumentStatus[];
  authHeaders: AuthHeaders;
  onRetrySuccess: (documentId: string) => void;
  fetchMore: () => void;
  hasMore: boolean;
  refreshDocument: (documentId: string) => void;
  onDeleteSuccess: (documentId: string) => void;
  // Añadimos isLoadingDocuments a las props ya que lo necesitamos aquí
  isLoading?: boolean; // Renombrado a isLoading para simplificar
}

const getStatusAttributes = (status: DocumentStatus['status']) => {
    switch (status) {
        case 'uploaded': return { icon: Loader2, text: 'En Cola', className: 'text-blue-600 bg-blue-100 border-blue-200 dark:text-blue-300 dark:bg-blue-900/30 dark:border-blue-700', animate: true };
        case 'processing': return { icon: Loader2, text: 'Procesando', className: 'text-orange-600 bg-orange-100 border-orange-200 dark:text-orange-300 dark:bg-orange-900/30 dark:border-orange-700', animate: true };
        case 'processed': return { icon: CheckCircle2, text: 'Procesado', className: 'text-green-600 bg-green-100 border-green-200 dark:text-green-300 dark:bg-green-900/30 dark:border-green-700', animate: false };
        case 'error': return { icon: AlertTriangle, text: 'Error', className: 'text-red-600 bg-red-100 border-red-200 dark:text-red-300 dark:bg-red-900/30 dark:border-red-700', animate: false };
        default: return { icon: ServerCrash, text: status || 'Desconocido', className: 'text-gray-600 bg-gray-100 border-gray-200 dark:text-gray-400 dark:bg-gray-700/30 dark:border-gray-600', animate: false };
    }
};

export function DocumentStatusList({
    documents,
    authHeaders,
    onRetrySuccess,
    fetchMore,
    hasMore,
    refreshDocument,
    onDeleteSuccess,
    isLoading = false // Recibe isLoading (antes isLoadingDocuments)
}: DocumentStatusListProps) {
  const [docToDelete, setDocToDelete] = React.useState<DocumentStatus | null>(null);
  const [isDeleting, setIsDeleting] = React.useState(false);
  const [isAlertOpen, setIsAlertOpen] = React.useState(false);

  // Funciones handleRetry, handleRefresh, openDeleteConfirmation, handleDeleteConfirmed (sin cambios lógicos internos)
  const handleRetry = async (documentId: string, fileName?: string | null) => {
    if (!authHeaders) return;
    const displayId = fileName || documentId.substring(0, 8) + "...";
    const toastId = toast.loading(`Reintentando ingesta para "${displayId}"...`);
    try {
      // TODO: Implementar llamada API real si existe
      // await retryIngestDocument(documentId, authHeaders);
      await new Promise(res => setTimeout(res, 700)); // Simular llamada
      toast.success("Reintento Iniciado", { id: toastId, description: `El documento "${displayId}" se está procesando de nuevo.` });
      onRetrySuccess(documentId); // Actualizar UI localmente
      refreshDocument(documentId); // Refrescar estado desde API
    } catch (error: any) {
      const errorMsg = error instanceof Error ? error.message : 'Error desconocido';
      toast.error("Error al Reintentar", { id: toastId, description: `No se pudo reintentar la ingesta para "${displayId}": ${errorMsg}` });
    }
  };

  const handleRefresh = (documentId: string, fileName?: string | null) => {
    const displayId = fileName || documentId.substring(0, 8) + "...";
    toast.info(`Actualizando estado de "${displayId}"...`);
    refreshDocument(documentId);
  };

  const openDeleteConfirmation = (doc: DocumentStatus) => {
    setDocToDelete(doc);
    setIsAlertOpen(true);
  };

  const handleDeleteConfirmed = async () => {
    if (!docToDelete || !authHeaders) return;
    const display = docToDelete.file_name || docToDelete.document_id.substring(0, 8) + '...';
    setIsDeleting(true);
    const toastId = toast.loading(`Eliminando "${display}"...`);
    try {
      await deleteIngestDocument(docToDelete.document_id, authHeaders);
      onDeleteSuccess(docToDelete.document_id); // Actualiza UI localmente
      toast.success('Documento Eliminado', { id: toastId, description: `"${display}" ha sido eliminado.` });
    } catch (e: any) {
      const errorMsg = e instanceof Error ? e.message : 'Error desconocido';
      toast.error('Error al Eliminar', { id: toastId, description: `No se pudo eliminar "${display}": ${errorMsg}` });
    } finally {
      setIsDeleting(false);
      setIsAlertOpen(false);
      setDocToDelete(null);
    }
  };

  // Estado vacío mejorado
  if (!isLoading && (!documents || documents.length === 0)) { // Verifica isLoading aquí también
    return (
        <div className="flex flex-col items-center justify-center text-center text-muted-foreground py-10 px-4 border rounded-lg bg-muted/30 mt-4">
            <Info className="h-8 w-8 mb-3 opacity-50"/>
            <p className="text-sm font-medium mb-1">Sin Documentos</p>
            <p className="text-xs">Aún no se han subido documentos a la base de conocimiento.</p>
        </div>
    );
  }

  return (
    <AlertDialog open={isAlertOpen} onOpenChange={setIsAlertOpen}>
      <TooltipProvider>
        {/* Leyenda de Estados (opcional, si se quiere mantener) */}
        {/* <div className="flex flex-wrap gap-2 mb-4 text-xs">...</div> */}

        {/* Contenedor de la tabla con borde y overflow */}
        <div className="border rounded-lg overflow-hidden">
          <Table className='w-full'> {/* Asegurar ancho completo */}
            <TableHeader>
              {/* Cabecera con fondo y borde */}
              <TableRow className="border-b bg-muted/50 hover:bg-muted/50">
                <TableHead className="w-[40%] pl-4 pr-2 py-2.5">Nombre Archivo</TableHead>
                <TableHead className="w-[15%] px-2 py-2.5">Estado</TableHead>
                <TableHead className="w-[10%] text-center px-2 py-2.5 hidden sm:table-cell">Chunks</TableHead>
                <TableHead className="w-[20%] px-2 py-2.5 hidden md:table-cell">Actualización</TableHead>
                <TableHead className="w-[15%] text-right pr-4 pl-2 py-2.5">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {documents.map((doc) => {
                const { icon: Icon, text: statusText, className: statusClassName, animate } = getStatusAttributes(doc.status);
                const dateToShow = doc.last_updated;
                const displayDate = dateToShow ? new Date(dateToShow).toLocaleString('es-ES', { dateStyle: 'short', timeStyle: 'short'}) : 'N/D';
                const displayFileName = doc.file_name || `ID: ${doc.document_id.substring(0, 8)}...`;
                const displayChunks = doc.chunk_count !== undefined && doc.chunk_count !== null ? doc.chunk_count : '-'; // Usar guión en lugar de N/D

                return (
                  // Fila con hover sutil
                  <TableRow key={doc.document_id} className="group hover:bg-accent/50 data-[state=selected]:bg-accent">
                    {/* Celda Nombre Archivo */}
                    <TableCell className="font-medium text-foreground/90 max-w-[150px] sm:max-w-xs truncate pl-4 pr-2 py-2" title={displayFileName}>
                      {displayFileName}
                    </TableCell>
                    {/* Celda Estado */}
                    <TableCell className="px-2 py-2">
                      <Badge variant='outline' className={cn("border text-xs font-medium whitespace-nowrap", statusClassName)}>
                        <Icon className={cn("h-3.5 w-3.5 mr-1", animate && "animate-spin")} />
                        {statusText}
                        {doc.status === 'error' && doc.error_message && (
                          <Tooltip delayDuration={100}>
                            <TooltipTrigger asChild>
                               <Button variant="ghost" size="icon" className='h-4 w-4 p-0 ml-1 cursor-help opacity-70 hover:opacity-100'>
                                 <AlertCircle className="h-3.5 w-3.5" />
                               </Button>
                            </TooltipTrigger>
                            <TooltipContent side="top" className="max-w-xs break-words bg-destructive text-destructive-foreground p-2 text-xs shadow-lg">
                              <p>Error: {doc.error_message}</p>
                            </TooltipContent>
                          </Tooltip>
                        )}
                      </Badge>
                    </TableCell>
                    {/* Celda Chunks */}
                    <TableCell className="text-center text-muted-foreground text-xs px-2 py-2 hidden sm:table-cell">
                      {displayChunks}
                    </TableCell>
                    {/* Celda Fecha */}
                    <TableCell className="text-muted-foreground text-xs px-2 py-2 hidden md:table-cell">{displayDate}</TableCell>
                    {/* Celda Acciones */}
                    <TableCell className="text-right space-x-0.5 pr-4 pl-2 py-1"> {/* Reducido space */}
                      {/* Botón Reintentar */}
                      {doc.status === 'error' && (
                        <Tooltip delayDuration={100}>
                          <TooltipTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8 text-blue-600 hover:bg-blue-100 dark:hover:bg-blue-900/30" onClick={() => handleRetry(doc.document_id, doc.file_name)} aria-label="Reintentar ingesta">
                              <RefreshCw className="h-4 w-4" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent><p>Reintentar</p></TooltipContent>
                        </Tooltip>
                      )}
                      {/* Botón Actualizar */}
                      <Tooltip delayDuration={100}>
                        <TooltipTrigger asChild>
                           <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:bg-accent" onClick={() => handleRefresh(doc.document_id, doc.file_name)} aria-label="Actualizar estado">
                             <RefreshCw className="h-4 w-4" />
                           </Button>
                        </TooltipTrigger>
                        <TooltipContent><p>Actualizar Estado</p></TooltipContent>
                      </Tooltip>
                      {/* Botón Eliminar */}
                      <Tooltip delayDuration={100}>
                        <AlertDialogTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive/80 hover:text-destructive hover:bg-destructive/10" onClick={() => openDeleteConfirmation(doc)} aria-label="Eliminar documento">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </AlertDialogTrigger>
                        <TooltipContent><p>Eliminar</p></TooltipContent>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>

        {/* Botón Cargar Más */}
        {hasMore && (
          <div className="pt-4 text-center">
            {/* CORRECCIÓN: Usar isLoading de las props, no una variable local */}
            <Button variant="outline" size="sm" onClick={fetchMore} disabled={isDeleting || isLoading}>
                {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                Cargar más
            </Button>
          </div>
        )}
      </TooltipProvider>

      {/* AlertDialog de Confirmación (mejorado) */}
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>¿Confirmar Eliminación?</AlertDialogTitle>
          <AlertDialogDescription>
            Esta acción no se puede deshacer. Se eliminará permanentemente el documento y todos sus datos asociados de la base de conocimiento:
            <br />
            <span className="font-semibold text-foreground mt-2 block">"{docToDelete?.file_name || docToDelete?.document_id}"</span>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isDeleting}>Cancelar</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDeleteConfirmed}
            disabled={isDeleting}
            className={buttonVariants({ variant: "destructive" })}
          >
            {isDeleting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Trash2 className="mr-2 h-4 w-4" />}
            Eliminar Permanentemente
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}