// File: components/knowledge/document-status-list.tsx
"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { AlertCircle, CheckCircle2, Clock, Loader2, RefreshCw, Info, PackageOpen, DatabaseZap } from 'lucide-react';
// --- MODIFICACIÓN: Importar tipos correctos, incluido DocumentStatusResponse ---
import { listDocumentStatuses, DocumentStatusResponse, ApiError } from '@/lib/api';
// ---------------------------------------------------------------------
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Skeleton } from '@/components/ui/skeleton';
import { toast } from "sonner";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"

// --- MODIFICACIÓN: Usar el tipo importado ---
type DocumentStatus = DocumentStatusResponse;
// -----------------------------------------

export function DocumentStatusList() {
    const [statuses, setStatuses] = useState<DocumentStatus[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // --- MODIFICACIÓN: Usar tipos correctos en useCallback ---
    const fetchStatuses = useCallback(async (showToast = false) => {
    // ------------------------------------------------------
        setIsLoading(true);
        setError(null);
        try {
            // Llamada a la API para obtener los estados
            const data = await listDocumentStatuses();
            // Ordenar por fecha de actualización (más reciente primero)
             const sortedData = data.sort((a, b) => {
                const dateA = a.updated_at ? new Date(a.updated_at).getTime() : 0;
                const dateB = b.updated_at ? new Date(b.updated_at).getTime() : 0;
                return dateB - dateA; // Descendente
            });
            setStatuses(sortedData);

            if (showToast) {
                toast.info("Statuses Refreshed", { description: `Loaded ${sortedData.length} document statuses.`});
            }
            if (sortedData.length === 0) {
                console.log("DocumentStatusList: No document statuses found.");
            }
        } catch (err) {
            console.error("DocumentStatusList: Failed to fetch document statuses:", err);
            let message = "Could not load document statuses.";
            if (err instanceof ApiError) {
                message = err.message || `API Error (${err.status})`;
                // Aquí podrías manejar 401/403 para desloguear si fuera necesario
            } else if (err instanceof Error) {
                message = err.message;
            }
            setError(message);
            setStatuses([]); // Limpiar statuses en caso de error
            if (showToast || !isLoading) { // Mostrar toast en refresh o si ya no estaba cargando
                 toast.error("Error Loading Statuses", { description: message });
            }
        } finally {
            setIsLoading(false);
        }
    }, []); // Dejar dependencias vacías para que fetchStatuses sea estable

    useEffect(() => {
        fetchStatuses(false); // Fetch inicial sin toast
    }, [fetchStatuses]); // Depender de la función estable

    const handleRefresh = () => {
        fetchStatuses(true); // Fetch con toast al refrescar manualmente
    };

    // --- MODIFICACIÓN: Manejar todos los estados definidos en la API ---
    const getStatusBadge = (status: DocumentStatus['status']) => {
        switch (status) {
            case 'UPLOADED': // Asumiendo que la API devuelve mayúsculas según el ejemplo
                 return <Badge variant="outline" className="border-blue-300 text-blue-700 bg-blue-50 dark:border-blue-700 dark:text-blue-300 dark:bg-blue-900/30"><Clock className="mr-1 h-3 w-3" />Uploaded</Badge>;
            case 'PROCESSING':
                 return <Badge variant="secondary" className="border-yellow-300 text-yellow-800 bg-yellow-50 dark:border-yellow-600 dark:text-yellow-200 dark:bg-yellow-900/30"><Loader2 className="mr-1 h-3 w-3 animate-spin" />Processing</Badge>;
            case 'PROCESSED': // Significa que el contenido se extrajo, pero aún no está listo para buscar
                return <Badge variant="outline" className="border-purple-400 text-purple-700 bg-purple-50 dark:border-purple-600 dark:text-purple-300 dark:bg-purple-900/30"><PackageOpen className="mr-1 h-3 w-3" />Processed</Badge>;
             case 'INDEXED': // Listo para la búsqueda
                return <Badge variant="default" className="bg-green-100 text-green-800 border-green-300 hover:bg-green-200 dark:bg-green-900/30 dark:text-green-200 dark:border-green-700"><DatabaseZap className="mr-1 h-3 w-3" />Indexed</Badge>;
            case 'ERROR':
                 return <Badge variant="destructive"><AlertCircle className="mr-1 h-3 w-3" />Error</Badge>;
            default:
                // Para estados desconocidos o que no coincidan exactamente
                const unknownStatus: string = status;
                return <Badge variant="outline"><Info className="mr-1 h-3 w-3" />{unknownStatus || 'Unknown'}</Badge>;
        }
    };
    // -----------------------------------------------------------------

    const formatDateTime = (dateString?: string | null) => {
        if (!dateString) return 'N/A';
        try {
            return new Date(dateString).toLocaleString(undefined, {
                year: 'numeric', month: 'short', day: 'numeric',
                hour: 'numeric', minute: '2-digit'
            });
        } catch {
            console.warn(`DocumentStatusList: Invalid date string received: ${dateString}`);
            return dateString; // Devolver el string original si no se puede parsear
        }
    };

    const renderContent = () => {
        // Mostrar esqueletos solo en la carga inicial
        if (isLoading && statuses.length === 0) {
            return Array.from({ length: 5 }).map((_, index) => (
                <TableRow key={`skel-${index}`}>
                    <TableCell><Skeleton className="h-5 w-3/4" /></TableCell>
                    <TableCell><Skeleton className="h-5 w-24" /></TableCell> {/* Ancho para Badge */}
                    <TableCell><Skeleton className="h-5 w-full" /></TableCell>
                    <TableCell><Skeleton className="h-5 w-1/2" /></TableCell>
                </TableRow>
            ));
        }

        // Mostrar error si ocurrió y no hay datos previos
        if (error && statuses.length === 0) {
            return (
                <TableRow>
                    <TableCell colSpan={4} className="text-center text-destructive py-8">
                        <AlertCircle className="mx-auto h-8 w-8 mb-2" />
                        Error loading statuses: {error}
                        <Button variant="outline" size="sm" onClick={handleRefresh} className="ml-2 mt-2">
                           <RefreshCw className="mr-1 h-3 w-3"/> Retry
                        </Button>
                    </TableCell>
                </TableRow>
            );
        }

        // Mostrar mensaje si no hay documentos después de cargar
        if (!isLoading && !error && statuses.length === 0) {
            return (
                <TableRow>
                    <TableCell colSpan={4} className="text-center text-muted-foreground py-8">
                        <PackageOpen className="mx-auto h-8 w-8 mb-2" />
                        No documents found. Upload documents using the form above.
                    </TableCell>
                </TableRow>
            );
        }

        // Renderizar la lista de estados
        return statuses.map((doc) => (
            <TableRow key={doc.document_id}>
                 <TableCell className="font-medium max-w-xs">
                     <TooltipProvider delayDuration={100}>
                         <Tooltip>
                             <TooltipTrigger asChild>
                                <span className="truncate block cursor-default">{doc.file_name || 'N/A'}</span>
                             </TooltipTrigger>
                             <TooltipContent side="top">
                                 <p>{doc.file_name || 'No filename'}</p>
                                 <p className="text-xs text-muted-foreground mt-1 pt-1 border-t">ID: {doc.document_id}</p>
                                 {doc.file_type && <p className="text-xs text-muted-foreground">Type: {doc.file_type}</p>}
                             </TooltipContent>
                         </Tooltip>
                     </TooltipProvider>
                 </TableCell>
                <TableCell>{getStatusBadge(doc.status)}</TableCell>
                <TableCell className="text-muted-foreground text-xs max-w-sm">
                    {doc.status === 'ERROR' ? (
                        <TooltipProvider delayDuration={100}>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <span className="text-destructive truncate block cursor-help underline decoration-dotted">
                                        {doc.error_message || 'Unknown error'}
                                    </span>
                                </TooltipTrigger>
                                <TooltipContent side="top" className="max-w-xs text-xs bg-destructive text-destructive-foreground border-destructive/50">
                                    <p>{doc.error_message || 'No error details provided.'}</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                     ) : doc.status === 'INDEXED' ? (
                         // --- MODIFICACIÓN: Usar chunk_count si existe ---
                         `${doc.chunk_count ?? '?'} chunks indexed`
                         // ----------------------------------------------
                     ) : (
                         // Mostrar mensaje general o chunk count para otros estados si aplica
                         doc.message || (doc.chunk_count ? `${doc.chunk_count} chunks` : '--')
                    )}
                </TableCell>
                <TableCell className="text-muted-foreground text-xs whitespace-nowrap text-right">
                     {/* --- MODIFICACIÓN: Usar updated_at --- */}
                    <TooltipProvider delayDuration={100}>
                        <Tooltip>
                             <TooltipTrigger asChild>
                                 <span className="cursor-default">{formatDateTime(doc.updated_at)}</span>
                             </TooltipTrigger>
                             <TooltipContent side="top">
                                 <p>Last Updated: {formatDateTime(doc.updated_at)}</p>
                                 {/* Mostrar también created_at si existe */}
                                 {doc.created_at && <p>Created: {formatDateTime(doc.created_at)}</p>}
                             </TooltipContent>
                        </Tooltip>
                     </TooltipProvider>
                     {/* ----------------------------------- */}
                </TableCell>
            </TableRow>
        ));
    };

    return (
       <div className="space-y-2">
           <div className="flex justify-end items-center gap-2 h-9"> {/* Altura fija para evitar saltos */}
                {/* Mostrar error persistente si ocurrió durante un refresh */}
                {error && statuses.length > 0 && (
                    <TooltipProvider delayDuration={100}>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <span className="text-xs text-destructive flex items-center gap-1 cursor-help">
                                    <AlertCircle className="h-4 w-4"/> Refresh Error
                                </span>
                            </TooltipTrigger>
                            <TooltipContent side="left" className="max-w-xs text-xs bg-destructive text-destructive-foreground border-destructive/50">
                                <p>{error}</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                )}
                <Button variant="outline" size="sm" onClick={handleRefresh} disabled={isLoading}>
                    <RefreshCw className={`mr-2 h-4 w-4 ${isLoading && statuses.length === 0 ? '' : (isLoading ? 'animate-spin' : '')}`} />
                    Refresh
                </Button>
           </div>
            {/* Area con scroll para la tabla */}
            <ScrollArea className="h-[400px] border rounded-md relative">
                {/* Indicador de carga superpuesto si ya hay datos */}
                {isLoading && statuses.length > 0 && (
                   <div className="absolute inset-0 bg-background/60 backdrop-blur-sm flex items-center justify-center z-20 rounded-md">
                       <Loader2 className="h-6 w-6 animate-spin text-primary" />
                   </div>
                )}
                <Table>
                    <TableHeader className="sticky top-0 bg-muted/80 backdrop-blur-md z-10"> {/* Header pegajoso */}
                        <TableRow>
                            <TableHead className="w-[35%]">Filename</TableHead>
                            <TableHead className="w-[15%]">Status</TableHead>
                            <TableHead className="w-[30%]">Details</TableHead>
                            <TableHead className="w-[20%] text-right">Last Updated</TableHead>
                        </TableRow>
                    </TableHeader>
                    {/* Usar TableBody para el contenido */}
                    <TableBody>
                        {renderContent()}
                    </TableBody>
                </Table>
            </ScrollArea>
        </div>
    );
}