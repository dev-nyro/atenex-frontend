// File: components/knowledge/document-status-list.tsx (CORREGIDO - Usa document_id consistentemente)
"use client";

import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import {
    AlertCircle, Loader2, RefreshCw, Trash2, Info,
    FileClock, FileCheck2, FileX2, FileQuestion, Download, AlertTriangle // Iconos
} from 'lucide-react';
// FLAG_LLM: Importa la interfaz correcta con document_id
import { DocumentStatusResponse, AuthHeaders, deleteIngestDocument, retryIngestDocument } from '@/lib/api';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import {
    AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
    AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle,
    AlertDialogTrigger
} from "@/components/ui/alert-dialog";
import { Skeleton } from '@/components/ui/skeleton';

// Mapeo de estado (sin cambios)
const statusMap: { [key: string]: { icon: React.ComponentType<{ className?: string }>, text: string, className: string, animate: boolean, description: string } } = {
    uploaded:   { icon: FileClock, text: 'En Cola', className: 'text-blue-600 bg-blue-100 border-blue-200 dark:text-blue-300 dark:bg-blue-900/30 dark:border-blue-700', animate: true, description: "Esperando para ser procesado." },
    processing: { icon: Loader2, text: 'Procesando', className: 'text-orange-600 bg-orange-100 border-orange-200 dark:text-orange-300 dark:bg-orange-900/30 dark:border-orange-700', animate: true, description: "Extrayendo texto y generando vectores..." },
    processed:  { icon: FileCheck2, text: 'Procesado', className: 'text-green-600 bg-green-100 border-green-200 dark:text-green-300 dark:bg-green-900/30 dark:border-green-700', animate: false, description: "Listo para ser consultado." },
    error:      { icon: FileX2, text: 'Error', className: 'text-red-600 bg-red-100 border-red-200 dark:text-red-300 dark:bg-red-900/30 dark:border-red-700', animate: false, description: "Hubo un problema durante el procesamiento." },
    default:    { icon: FileQuestion, text: 'Desconocido', className: 'text-gray-600 bg-gray-100 border-gray-200 dark:text-gray-400 dark:bg-gray-700/30 dark:border-gray-600', animate: false, description: "Estado no reconocido." }
};

// FLAG_LLM: Renombrado para claridad, usa la interfaz de frontend
type DocumentStatus = DocumentStatusResponse;

export interface DocumentStatusListProps {
  documents: DocumentStatus[];
  authHeaders: AuthHeaders;
  onRetrySuccess: (documentId: string) => void;
  fetchMore: () => void;
  hasMore: boolean;
  refreshDocument: (documentId: string) => void;
  onDeleteSuccess: (documentId: string) => void;
  isLoading: boolean;
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
  const [deletingDocId, setDeletingDocId] = React.useState<string | null>(null);
  const [isDeleting, setIsDeleting] = React.useState(false);
  const [isRetrying, setIsRetrying] = React.useState<string | null>(null);
  const [isRefreshing, setIsRefreshing] = React.useState<string | null>(null);

  // --- Handlers (con validaciones, usan document_id) ---
  const handleRetry = async (documentId: string, fileName?: string | null) => {
    if (!documentId || typeof documentId !== 'string') { console.error("Error: ID de documento inválido para reintento:", documentId); toast.error("Error Interno", { description: "ID de documento faltante." }); return; }
    if (!authHeaders || isRetrying) return;
    const displayId = fileName || documentId.substring(0, 8) + "..."; setIsRetrying(documentId);
    const toastId = toast.loading(`Reintentando ingesta para "${displayId}"...`);
    try { await retryIngestDocument(documentId, authHeaders); toast.success("Reintento Iniciado", { id: toastId, description: `El documento "${displayId}" se está procesando de nuevo.` }); onRetrySuccess(documentId); }
    catch (error: any) { const errorMsg = error instanceof Error ? error.message : 'Error desconocido'; toast.error("Error al Reintentar", { id: toastId, description: `No se pudo reintentar la ingesta para "${displayId}": ${errorMsg}` }); }
    finally { setIsRetrying(null); }
  };

  const handleRefresh = async (documentId: string, fileName?: string | null) => {
    if (!documentId || typeof documentId !== 'string') { console.error("Error: ID de documento inválido para refrescar:", documentId); toast.error("Error Interno", { description: "ID de documento faltante." }); return; }
    if (isRefreshing) return;
    const displayId = fileName || documentId.substring(0, 8) + "..."; setIsRefreshing(documentId);
    const toastId = toast.info(`Actualizando estado de "${displayId}"...`); // Usar toastId para actualizar
    try { await refreshDocument(documentId); toast.success("Estado Actualizado", { id: toastId, description: `Se actualizó el estado de "${displayId}".` }); } // Actualizar toast
    catch (error) { toast.error("Error al Actualizar", { id: toastId, description: `No se pudo actualizar el estado de "${displayId}".` }); } // Actualizar toast en error
    finally { setIsRefreshing(null); }
  };

    const handleDownload = (doc: DocumentStatus) => {
        if (!doc || !doc.document_id) { console.error("Error: datos de documento inválidos para descarga:", doc); toast.error("Error Interno", { description: "Información del documento incompleta." }); return; }
        toast.info("Descarga No Implementada", { description: `La funcionalidad para descargar "${doc.file_name || doc.document_id}" aún no está disponible.` });
        console.log("Download requested for:", doc.document_id);
    };

  const openDeleteConfirmation = (docId: string) => {
       if (!docId || typeof docId !== 'string') { console.error("Error: ID inválido para confirmación de eliminación:", docId); toast.error("Error Interno", { description: "ID de documento faltante." }); return; }
       setDeletingDocId(docId);
    };
  const closeDeleteConfirmation = () => { if (!isDeleting) setDeletingDocId(null); };

  const handleDeleteConfirmed = async () => {
    if (!deletingDocId || !authHeaders || isDeleting) return;
    // FLAG_LLM: Buscar usando document_id
    const docToDelete = documents.find(d => d.document_id === deletingDocId);
    const display = docToDelete?.file_name || deletingDocId.substring(0, 8) + '...';
    setIsDeleting(true); const toastId = toast.loading(`Eliminando "${display}"...`);
    try { await deleteIngestDocument(deletingDocId, authHeaders); onDeleteSuccess(deletingDocId); toast.success('Documento Eliminado', { id: toastId, description: `"${display}" ha sido eliminado.` }); closeDeleteConfirmation(); }
    catch (e: any) { const errorMsg = e instanceof Error ? e.message : 'Error desconocido'; toast.error('Error al Eliminar', { id: toastId, description: `No se pudo eliminar "${display}": ${errorMsg}` }); }
    finally { setIsDeleting(false); }
  };

  // --- Renderizado ---
  if (!isLoading && documents.length === 0) {
    return ( <div className="flex flex-col items-center justify-center text-center text-muted-foreground py-10 px-4 border-2 border-dashed rounded-lg bg-muted/30 mt-4 min-h-[150px]"> <Info className="h-8 w-8 mb-3 opacity-50"/> <p className="text-sm font-medium mb-1">Sin Documentos</p> <p className="text-xs">Aún no se han subido documentos.</p> </div> );
  }

  return (
      <TooltipProvider>
        <div className="border rounded-lg overflow-hidden shadow-sm bg-card">
          <Table className='w-full text-sm'>
            <TableHeader>
              <TableRow className="border-b bg-muted/50 hover:bg-muted/50">
                <TableHead className="w-[40%] pl-3 pr-2 py-2">Nombre Archivo</TableHead>
                <TableHead className="w-[15%] px-2 py-2">Estado</TableHead>
                <TableHead className="w-[10%] text-center px-2 py-2 hidden sm:table-cell">Chunks</TableHead>
                <TableHead className="w-[15%] px-2 py-2 hidden md:table-cell">Actualización</TableHead>
                <TableHead className="w-[20%] text-right pr-3 pl-2 py-2">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {documents.map((doc) => {
                 // FLAG_LLM: Comprobar document_id que es el esperado por el frontend
                if (!doc || !doc.document_id) {
                    // No mostrar el warning en producción, solo omitir
                    if (process.env.NODE_ENV === 'development') {
                         console.warn("Documento inválido (sin document_id) omitido:", doc);
                    }
                    return null;
                }

                const statusInfo = statusMap[doc.status] || statusMap.default;
                const Icon = statusInfo.icon;
                const isCurrentlyRetrying = isRetrying === doc.document_id;
                const isCurrentlyRefreshing = isRefreshing === doc.document_id;
                const isActionDisabled = isCurrentlyRetrying || isCurrentlyRefreshing;

                const dateToShow = doc.last_updated; // Usar last_updated que viene mapeado
                const displayDate = dateToShow ? new Date(dateToShow).toLocaleString('es-ES', { dateStyle: 'short', timeStyle: 'short'}) : 'N/D';
                const displayFileName = doc.file_name || `ID: ${doc.document_id.substring(0, 12)}...`;
                const displayChunks = doc.milvus_chunk_count ?? doc.chunk_count ?? '-';

                return (
                    // FLAG_LLM: Usar doc.document_id como key
                    <TableRow key={doc.document_id} className="group hover:bg-accent/30 data-[state=selected]:bg-accent">
                        <TableCell className="font-medium text-foreground/90 max-w-[150px] sm:max-w-xs lg:max-w-sm xl:max-w-md truncate pl-3 pr-2 py-1.5" title={displayFileName}>{displayFileName}</TableCell>
                        <TableCell className="px-2 py-1.5">
                            <Tooltip delayDuration={100}>
                                <TooltipTrigger asChild>
                                    <Badge variant='outline' className={cn("border text-[11px] font-medium whitespace-nowrap py-0.5 px-1.5 cursor-default", statusInfo.className)}>
                                        <Icon className={cn("h-3 w-3 mr-1", statusInfo.animate && "animate-spin")} />
                                        {statusInfo.text}
                                    </Badge>
                                </TooltipTrigger>
                                <TooltipContent side="top" sideOffset={5} className="max-w-xs break-words p-2 text-xs shadow-lg">
                                    <p>{statusInfo.description}</p>
                                    {doc.status === 'error' && doc.error_message && <p className='mt-1 pt-1 border-t text-destructive'>Error: {doc.error_message}</p>}
                                </TooltipContent>
                            </Tooltip>
                        </TableCell>
                        <TableCell className="text-center text-muted-foreground text-xs px-2 py-1.5 hidden sm:table-cell">{displayChunks}</TableCell>
                        <TableCell className="text-muted-foreground text-xs px-2 py-1.5 hidden md:table-cell">{displayDate}</TableCell>
                        <TableCell className="text-right space-x-1 pr-3 pl-2 py-1">
                            <Tooltip delayDuration={100}>
                                <TooltipTrigger asChild>
                                    <Button variant="ghost" size="icon" className="h-7 w-7 text-muted-foreground hover:bg-accent" onClick={() => handleDownload(doc)} aria-label="Descargar documento original" disabled={isActionDisabled || !doc.minio_exists}> <Download className="h-4 w-4" /> </Button>
                                </TooltipTrigger>
                                <TooltipContent side="top" sideOffset={6}><p>Descargar (N/D)</p></TooltipContent>
                            </Tooltip>
                            {doc.status === 'error' && (
                                <Tooltip delayDuration={100}>
                                    <TooltipTrigger asChild>
                                        {/* FLAG_LLM: Pasar doc.document_id */}
                                        <Button variant="ghost" size="icon" className="h-7 w-7 text-blue-600 hover:bg-blue-100 dark:hover:bg-blue-900/30" onClick={() => handleRetry(doc.document_id, doc.file_name)} aria-label="Reintentar ingesta" disabled={isActionDisabled}> {isCurrentlyRetrying ? <Loader2 className="h-4 w-4 animate-spin"/> : <RefreshCw className="h-4 w-4" />} </Button>
                                    </TooltipTrigger>
                                    <TooltipContent side="top" sideOffset={6}><p>Reintentar</p></TooltipContent>
                                </Tooltip>
                            )}
                            <Tooltip delayDuration={100}>
                                <TooltipTrigger asChild>
                                     {/* FLAG_LLM: Pasar doc.document_id */}
                                    <Button variant="ghost" size="icon" className="h-7 w-7 text-muted-foreground hover:bg-accent" onClick={() => handleRefresh(doc.document_id, doc.file_name)} aria-label="Actualizar estado" disabled={isActionDisabled}> {isCurrentlyRefreshing ? <Loader2 className="h-4 w-4 animate-spin"/> : <RefreshCw className="h-4 w-4" />} </Button>
                                </TooltipTrigger>
                                <TooltipContent side="top" sideOffset={6}><p>Actualizar Estado</p></TooltipContent>
                            </Tooltip>
                            <AlertDialog open={deletingDocId === doc.document_id} onOpenChange={(open) => !open && closeDeleteConfirmation()}>
                                <Tooltip delayDuration={100}>
                                    <TooltipTrigger asChild>
                                         <AlertDialogTrigger asChild>
                                             {/* FLAG_LLM: Pasar doc.document_id */}
                                            <Button variant="ghost" size="icon" className="h-7 w-7 text-destructive/80 hover:text-destructive hover:bg-destructive/10" onClick={(e) => { e.stopPropagation(); openDeleteConfirmation(doc.document_id); }} aria-label="Eliminar documento" disabled={isActionDisabled}>
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                         </AlertDialogTrigger>
                                    </TooltipTrigger>
                                    <TooltipContent side="top" sideOffset={6}><p>Eliminar</p></TooltipContent>
                                </Tooltip>
                                <AlertDialogContent>
                                    <AlertDialogHeader>
                                        <AlertDialogTitle className="flex items-center gap-2">
                                            <AlertTriangle className="h-5 w-5 text-destructive"/> ¿Confirmar Eliminación?
                                        </AlertDialogTitle>
                                        <AlertDialogDescription>
                                            Esta acción no se puede deshacer. Se eliminará permanentemente el documento y todos sus datos asociados: <br />
                                            <span className="font-semibold text-foreground mt-2 block break-all">"{doc.file_name || doc.document_id}"</span>
                                        </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                        <AlertDialogCancel onClick={closeDeleteConfirmation} disabled={isDeleting}>Cancelar</AlertDialogCancel>
                                        <AlertDialogAction onClick={handleDeleteConfirmed} disabled={isDeleting} className={cn(buttonVariants({ variant: "destructive" }), "min-w-[150px]")}>
                                            {isDeleting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Trash2 className="mr-2 h-4 w-4" />}
                                            Eliminar Permanentemente
                                        </AlertDialogAction>
                                    </AlertDialogFooter>
                                </AlertDialogContent>
                            </AlertDialog>
                        </TableCell>
                    </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
        {hasMore && ( <div className="pt-6 text-center"> <Button variant="outline" size="sm" onClick={fetchMore} disabled={isLoading || isDeleting}> {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null} Cargar más documentos </Button> </div> )}
      </TooltipProvider>
  );
}