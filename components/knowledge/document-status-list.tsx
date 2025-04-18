// File: components/knowledge/document-status-list.tsx (CORREGIDO Y MEJORADO - Iteración 4.1 -> Refinado)
"use client";

import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { AlertCircle, CheckCircle2, Loader2, RefreshCw, AlertTriangle, Trash2, ServerCrash, Info, FileClock, FileCheck2, FileX2, FileQuestion } from 'lucide-react'; // Más iconos para estados
import { DocumentStatusResponse, AuthHeaders, deleteIngestDocument, retryIngestDocument } from '@/lib/api'; // Importar retryIngestDocument
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
} from "@/components/ui/alert-dialog"; // No se necesita Trigger aquí
import { Skeleton } from '@/components/ui/skeleton';

// Mapeo de estado a atributos visuales (mejorado con más iconos)
const statusMap: { [key: string]: { icon: React.ElementType, text: string, className: string, animate: boolean } } = {
    uploaded:   { icon: FileClock, text: 'En Cola', className: 'text-blue-600 bg-blue-100 border-blue-200 dark:text-blue-300 dark:bg-blue-900/30 dark:border-blue-700', animate: true },
    processing: { icon: Loader2, text: 'Procesando', className: 'text-orange-600 bg-orange-100 border-orange-200 dark:text-orange-300 dark:bg-orange-900/30 dark:border-orange-700', animate: true },
    processed:  { icon: FileCheck2, text: 'Procesado', className: 'text-green-600 bg-green-100 border-green-200 dark:text-green-300 dark:bg-green-900/30 dark:border-green-700', animate: false },
    error:      { icon: FileX2, text: 'Error', className: 'text-red-600 bg-red-100 border-red-200 dark:text-red-300 dark:bg-red-900/30 dark:border-red-700', animate: false },
    default:    { icon: FileQuestion, text: 'Desconocido', className: 'text-gray-600 bg-gray-100 border-gray-200 dark:text-gray-400 dark:bg-gray-700/30 dark:border-gray-600', animate: false }
};

// Tipo de documento (usando la interfaz base de la API)
type DocumentStatus = DocumentStatusResponse;

export interface DocumentStatusListProps {
  documents: DocumentStatus[];
  authHeaders: AuthHeaders;
  onRetrySuccess: (documentId: string) => void; // Callback al iniciar reintento
  fetchMore: () => void;
  hasMore: boolean;
  refreshDocument: (documentId: string) => void;
  onDeleteSuccess: (documentId: string) => void; // Callback al confirmar eliminación local
  isLoading: boolean; // Indica si se están cargando más documentos
}

export function DocumentStatusList({
    documents,
    authHeaders,
    onRetrySuccess,
    fetchMore,
    hasMore,
    refreshDocument,
    onDeleteSuccess,
    isLoading
}: DocumentStatusListProps) {
  const [docToDelete, setDocToDelete] = React.useState<DocumentStatus | null>(null);
  const [isDeleting, setIsDeleting] = React.useState(false);
  const [isRetrying, setIsRetrying] = React.useState<string | null>(null); // ID del doc reintentando
  const [isRefreshing, setIsRefreshing] = React.useState<string | null>(null); // ID del doc refrescando

  // --- Handlers de Acciones ---

  const handleRetry = async (documentId: string, fileName?: string | null) => {
    if (!authHeaders || isRetrying) return;
    const displayId = fileName || documentId.substring(0, 8) + "...";
    setIsRetrying(documentId); // Marcar como reintentando
    const toastId = toast.loading(`Reintentando ingesta para "${displayId}"...`);

    try {
      await retryIngestDocument(documentId, authHeaders); // Llama a la API real
      toast.success("Reintento Iniciado", { id: toastId, description: `El documento "${displayId}" se está procesando de nuevo.` });
      onRetrySuccess(documentId); // Actualiza UI local y pide refresco (manejado en el padre)
    } catch (error: any) {
      const errorMsg = error instanceof Error ? error.message : 'Error desconocido';
      toast.error("Error al Reintentar", { id: toastId, description: `No se pudo reintentar la ingesta para "${displayId}": ${errorMsg}` });
    } finally {
      setIsRetrying(null); // Desmarcar
    }
  };

  const handleRefresh = async (documentId: string, fileName?: string | null) => {
     if (isRefreshing) return;
    const displayId = fileName || documentId.substring(0, 8) + "...";
    setIsRefreshing(documentId); // Marcar como refrescando
    toast.info(`Actualizando estado de "${displayId}"...`);
    try {
        await refreshDocument(documentId); // Llama a la función del padre (que llama a la API)
    } catch (error) {
        // El error ya se maneja en el hook, aquí solo limpiamos el estado visual
        console.error("Error during refresh handled by parent hook");
    } finally {
        setIsRefreshing(null); // Desmarcar
    }
  };

  const openDeleteConfirmation = (doc: DocumentStatus) => {
    setDocToDelete(doc);
    // No necesitamos setIsAlertOpen(true); Dialog se controla externamente si es necesario, o usamos state local si es modal
  };

  const handleDeleteConfirmed = async () => {
    if (!docToDelete || !authHeaders || isDeleting) return;
    const display = docToDelete.file_name || docToDelete.document_id.substring(0, 8) + '...';
    setIsDeleting(true);
    const toastId = toast.loading(`Eliminando "${display}"...`);
    try {
      await deleteIngestDocument(docToDelete.document_id, authHeaders); // Llama a la API real
      onDeleteSuccess(docToDelete.document_id); // Actualiza UI localmente
      toast.success('Documento Eliminado', { id: toastId, description: `"${display}" ha sido eliminado.` });
    } catch (e: any) {
      const errorMsg = e instanceof Error ? e.message : 'Error desconocido';
      toast.error('Error al Eliminar', { id: toastId, description: `No se pudo eliminar "${display}": ${errorMsg}` });
    } finally {
      setIsDeleting(false);
      setDocToDelete(null); // Cierra el diálogo de confirmación
    }
  };

  // --- Renderizado ---

  // Estado Vacío (si no está cargando y no hay documentos)
  if (!isLoading && (!documents || documents.length === 0)) {
    return (
        <div className="flex flex-col items-center justify-center text-center text-muted-foreground py-10 px-4 border-2 border-dashed rounded-lg bg-muted/30 mt-4 min-h-[150px]">
            <Info className="h-8 w-8 mb-3 opacity-50"/>
            <p className="text-sm font-medium mb-1">Sin Documentos</p>
            <p className="text-xs">Aún no se han subido documentos a la base de conocimiento.</p>
        </div>
    );
  }

  // Componente Principal (Tabla y Diálogo)
  return (
    <AlertDialog open={!!docToDelete} onOpenChange={(open) => !open && setDocToDelete(null)}>
      <TooltipProvider>
        {/* Contenedor de la tabla con borde */}
        <div className="border rounded-lg overflow-hidden shadow-sm">
          <Table className='w-full text-sm'> {/* Tamaño de texto base */}
            <TableHeader>
              <TableRow className="border-b bg-muted/50 hover:bg-muted/50">
                 {/* Ajuste de padding y widths */}
                <TableHead className="w-[35%] pl-4 pr-2 py-2.5">Nombre Archivo</TableHead>
                <TableHead className="w-[15%] px-2 py-2.5">Estado</TableHead>
                <TableHead className="w-[10%] text-center px-2 py-2.5 hidden sm:table-cell">Chunks</TableHead>
                <TableHead className="w-[20%] px-2 py-2.5 hidden md:table-cell">Últ. Actualización</TableHead>
                <TableHead className="w-[20%] text-right pr-4 pl-2 py-2.5">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {documents.map((doc) => {
                const statusInfo = statusMap[doc.status] || statusMap.default;
                const Icon = statusInfo.icon;
                const isCurrentlyRetrying = isRetrying === doc.document_id;
                const isCurrentlyRefreshing = isRefreshing === doc.document_id;
                const isActionDisabled = isDeleting || isCurrentlyRetrying || isCurrentlyRefreshing;

                const dateToShow = doc.last_updated;
                const displayDate = dateToShow ? new Date(dateToShow).toLocaleString('es-ES', { dateStyle: 'short', timeStyle: 'short'}) : 'N/D';
                const displayFileName = doc.file_name || `ID: ${doc.document_id.substring(0, 8)}...`;
                // Usar ?? para manejar null y undefined
                const displayChunks = doc.milvus_chunk_count ?? doc.chunk_count ?? '-'; // Prioriza conteo real de Milvus si existe

                return (
                  <TableRow key={doc.document_id} className="group hover:bg-accent/50 data-[state=selected]:bg-accent">
                    {/* Celda Nombre */}
                    <TableCell className="font-medium text-foreground/90 max-w-[150px] sm:max-w-xs truncate pl-4 pr-2 py-2" title={displayFileName}>
                      {displayFileName}
                    </TableCell>
                    {/* Celda Estado */}
                    <TableCell className="px-2 py-2">
                      <Badge variant='outline' className={cn("border text-xs font-medium whitespace-nowrap py-0.5", statusInfo.className)}>
                        <Icon className={cn("h-3.5 w-3.5 mr-1.5", statusInfo.animate && "animate-spin")} />
                        {statusInfo.text}
                        {/* Tooltip para errores */}
                        {doc.status === 'error' && doc.error_message && (
                          <Tooltip delayDuration={100}>
                            <TooltipTrigger asChild>
                               {/* Usar un div simple para no interferir con el layout de Badge */}
                               <div className='inline-flex items-center justify-center h-4 w-4 ml-1 cursor-help opacity-70 hover:opacity-100'>
                                 <AlertCircle className="h-3.5 w-3.5" />
                               </div>
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
                    <TableCell className="text-right space-x-0.5 pr-4 pl-2 py-1">
                      {/* Botón Reintentar */}
                      {doc.status === 'error' && (
                        <Tooltip delayDuration={100}>
                          <TooltipTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8 text-blue-600 hover:bg-blue-100 dark:hover:bg-blue-900/30" onClick={() => handleRetry(doc.document_id, doc.file_name)} aria-label="Reintentar ingesta" disabled={isActionDisabled}>
                              {isCurrentlyRetrying ? <Loader2 className="h-4 w-4 animate-spin"/> : <RefreshCw className="h-4 w-4" />}
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent><p>Reintentar</p></TooltipContent>
                        </Tooltip>
                      )}
                      {/* Botón Actualizar */}
                      <Tooltip delayDuration={100}>
                        <TooltipTrigger asChild>
                           <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:bg-accent" onClick={() => handleRefresh(doc.document_id, doc.file_name)} aria-label="Actualizar estado" disabled={isActionDisabled}>
                             {isCurrentlyRefreshing ? <Loader2 className="h-4 w-4 animate-spin"/> : <RefreshCw className="h-4 w-4" />}
                           </Button>
                        </TooltipTrigger>
                        <TooltipContent><p>Actualizar Estado</p></TooltipContent>
                      </Tooltip>
                      {/* Botón Eliminar */}
                      <Tooltip delayDuration={100}>
                        <TooltipTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive/80 hover:text-destructive hover:bg-destructive/10" onClick={() => openDeleteConfirmation(doc)} aria-label="Eliminar documento" disabled={isActionDisabled}>
                            <Trash2 className="h-4 w-4" />
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
        </div>

        {/* Botón Cargar Más */}
        {hasMore && (
          <div className="pt-6 text-center">
            <Button variant="outline" size="sm" onClick={fetchMore} disabled={isLoading || isDeleting}>
                {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                Cargar más documentos
            </Button>
          </div>
        )}
      </TooltipProvider>

      {/* AlertDialog de Confirmación de Eliminación */}
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="flex items-center gap-2">
             <AlertTriangle className="h-5 w-5 text-destructive"/> ¿Confirmar Eliminación?
          </AlertDialogTitle>
          <AlertDialogDescription>
            Esta acción no se puede deshacer. Se eliminará permanentemente el documento y todos sus datos asociados de la base de conocimiento:
            <br />
            <span className="font-semibold text-foreground mt-2 block break-all">"{docToDelete?.file_name || docToDelete?.document_id}"</span>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isDeleting}>Cancelar</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDeleteConfirmed}
            disabled={isDeleting}
            className={cn(buttonVariants({ variant: "destructive" }), "min-w-[150px]")} // Ancho mínimo para el botón
          >
            {isDeleting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Trash2 className="mr-2 h-4 w-4" />}
            Eliminar Permanentemente
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}