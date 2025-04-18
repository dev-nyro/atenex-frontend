// File: components/knowledge/document-status-list.tsx (MODIFICADO)
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

type DocumentStatus = DocumentStatusResponse;

export interface DocumentStatusListProps {
  documents: DocumentStatus[];
  authHeaders: AuthHeaders;
  onRetrySuccess: (documentId: string) => void;
  fetchMore: () => void;
  hasMore: boolean;
  refreshDocument: (documentId: string) => void;
  onDeleteSuccess: (documentId: string) => void;
}

const getStatusAttributes = (status: DocumentStatus['status']) => {
    // Mismos atributos que antes
    switch (status) {
        case 'uploaded': return { icon: Loader2, text: 'En Cola', className: 'text-blue-600 bg-blue-100 border-blue-200 dark:text-blue-300 dark:bg-blue-900/30 dark:border-blue-700', animate: true };
        case 'processing': return { icon: Loader2, text: 'Procesando', className: 'text-orange-600 bg-orange-100 border-orange-200 dark:text-orange-300 dark:bg-orange-900/30 dark:border-orange-700', animate: true };
        case 'processed': return { icon: CheckCircle2, text: 'Procesado', className: 'text-green-600 bg-green-100 border-green-200 dark:text-green-300 dark:bg-green-900/30 dark:border-green-700', animate: false };
        case 'error': return { icon: AlertTriangle, text: 'Error', className: 'text-red-600 bg-red-100 border-red-200 dark:text-red-300 dark:bg-red-900/30 dark:border-red-700', animate: false };
        default: return { icon: ServerCrash, text: status || 'Desconocido', className: 'text-gray-600 bg-gray-100 border-gray-200 dark:text-gray-400 dark:bg-gray-700/30 dark:border-gray-600', animate: false };
    }
};

export function DocumentStatusList({ documents, authHeaders, onRetrySuccess, fetchMore, hasMore, refreshDocument, onDeleteSuccess }: DocumentStatusListProps) {
  const [docToDelete, setDocToDelete] = React.useState<DocumentStatus | null>(null);
  const [isDeleting, setIsDeleting] = React.useState(false);
  const [isAlertOpen, setIsAlertOpen] = React.useState(false);

  const handleRetry = async (documentId: string, fileName?: string | null) => {
    if (!authHeaders) return;
    const displayId = fileName || documentId.substring(0, 8) + "...";
    const toastId = toast.loading(`Reintentando ingesta para "${displayId}"...`);
    try {
      // La API real de reintento debe ser implementada y llamada aquí
      // await retryIngestDocument(documentId, authHeaders);
      await new Promise(res => setTimeout(res, 500)); // Simular llamada
      toast.success("Reintento Iniciado", { id: toastId, description: `El documento "${displayId}" se está procesando de nuevo.` });
      onRetrySuccess(documentId);
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
      onDeleteSuccess(docToDelete.document_id);
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

  if (!documents || documents.length === 0) {
    return <p className="text-center text-muted-foreground p-5 italic">No hay documentos subidos aún.</p>;
  }

  return (
    <AlertDialog open={isAlertOpen} onOpenChange={setIsAlertOpen}>
      <TooltipProvider>
        {/* Leyenda de Estados */}
        <div className="flex flex-wrap gap-2 mb-4 text-xs">
          <span className="font-medium mr-2">Estados:</span>
          {['uploaded', 'processing', 'processed', 'error'].map((status) => {
            const { text, className } = getStatusAttributes(status as DocumentStatus['status']);
            return <Badge key={status} variant="outline" className={cn("border", className)}>{text}</Badge>;
          })}
        </div>

        {/* Quitar el borde y overflow-hidden del div exterior si la tabla está dentro de CardContent */}
        <div className="relative w-full overflow-auto">
          <Table>
            <TableHeader>
              {/* Añadir sticky top-0 y bg-background para cabecera fija si ScrollArea externa lo permite */}
              <TableRow className="border-b hover:bg-transparent">
                <TableHead className="w-[35%] pl-4">Nombre Archivo</TableHead>
                <TableHead className="w-[15%]">Estado</TableHead>
                <TableHead className="w-[10%] text-center hidden sm:table-cell">Chunks</TableHead>
                <TableHead className="w-[25%] hidden md:table-cell">Última Actualización</TableHead>
                <TableHead className="w-[15%] text-right pr-4">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {documents.map((doc, index) => {
                const { icon: Icon, text: statusText, className: statusClassName, animate } = getStatusAttributes(doc.status);
                const dateToShow = doc.last_updated;
                const displayDate = dateToShow ? new Date(dateToShow).toLocaleString() : 'N/D';
                const displayFileName = doc.file_name || `ID: ${doc.document_id.substring(0, 8)}...`;
                const displayChunks = doc.chunk_count !== undefined && doc.chunk_count !== null ? doc.chunk_count : 'N/D';

                return (
                  // Aplicar estilo de fila alternada
                  <TableRow key={doc.document_id} className="group hover:bg-muted/50 data-[state=selected]:bg-muted [&:nth-child(even)]:bg-muted/30 dark:[&:nth-child(even)]:bg-muted/10">
                    <TableCell className="font-medium max-w-[150px] sm:max-w-xs truncate pl-4" title={displayFileName}>
                      {displayFileName}
                    </TableCell>
                    <TableCell>
                      <Badge variant='outline' className={cn("border font-medium", statusClassName)}>
                        <Icon className={cn("h-3.5 w-3.5 mr-1.5", animate && "animate-spin")} />
                        {statusText}
                        {doc.status === 'error' && doc.error_message && (
                          <Tooltip delayDuration={100}>
                            <TooltipTrigger asChild>
                              <AlertCircle className="h-3.5 w-3.5 ml-1.5 cursor-help opacity-70 hover:opacity-100" />
                            </TooltipTrigger>
                            <TooltipContent side="top" className="max-w-xs break-words bg-destructive text-destructive-foreground">
                              <p>Error: {doc.error_message}</p>
                            </TooltipContent>
                          </Tooltip>
                        )}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-center hidden sm:table-cell">
                      {displayChunks === 'N/D' ? (
                        <Tooltip delayDuration={100}>
                          <TooltipTrigger className='cursor-default text-muted-foreground'>N/D</TooltipTrigger>
                          <TooltipContent>Conteo de chunks no disponible aún.</TooltipContent>
                        </Tooltip>
                      ) : displayChunks}
                    </TableCell>
                    <TableCell className="text-muted-foreground text-xs hidden md:table-cell">{displayDate}</TableCell>
                    <TableCell className="text-right space-x-1 pr-4">
                      {/* Botón Reintentar */}
                      {doc.status === 'error' && (
                        <Tooltip delayDuration={100}>
                          <TooltipTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-7 w-7 text-blue-600 hover:bg-blue-100" onClick={() => handleRetry(doc.document_id, doc.file_name)} aria-label="Reintentar ingesta">
                              <RefreshCw className="h-4 w-4" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent><p>Reintentar</p></TooltipContent>
                        </Tooltip>
                      )}
                      {/* Botón Actualizar */}
                      <Tooltip delayDuration={100}>
                        <TooltipTrigger asChild>
                           <Button variant="ghost" size="icon" className="h-7 w-7 text-gray-500 hover:bg-gray-100" onClick={() => handleRefresh(doc.document_id, doc.file_name)} aria-label="Actualizar estado">
                             <RefreshCw className="h-4 w-4" /> {/* Cambiado a RefreshCw para consistencia */}
                           </Button>
                        </TooltipTrigger>
                        <TooltipContent><p>Actualizar Estado</p></TooltipContent>
                      </Tooltip>
                      {/* Botón Eliminar (Usa AlertDialogTrigger) */}
                      <Tooltip delayDuration={100}>
                        <AlertDialogTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-7 w-7 text-destructive hover:bg-destructive/10" onClick={() => openDeleteConfirmation(doc)} aria-label="Eliminar documento">
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
        </div> {/* Fin del div contenedor de la tabla */}
        {hasMore && (
          <div className="p-4 text-center">
            <Button variant="outline" size="sm" onClick={fetchMore} disabled={isDeleting}>Cargar más documentos</Button>
          </div>
        )}
      </TooltipProvider>

      {/* Diálogo de Confirmación de Eliminación */}
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>¿Confirmar Eliminación?</AlertDialogTitle>
          <AlertDialogDescription>
            Esta acción no se puede deshacer. Se eliminará permanentemente el documento
            <span className="font-medium"> "{docToDelete?.file_name || docToDelete?.document_id.substring(0, 8)}"</span>,
            su archivo original y todos sus datos asociados de la base de conocimiento.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isDeleting}>Cancelar</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDeleteConfirmed}
            disabled={isDeleting}
            className={buttonVariants({ variant: "destructive" })}
          >
            {isDeleting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
            Eliminar Permanentemente
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}