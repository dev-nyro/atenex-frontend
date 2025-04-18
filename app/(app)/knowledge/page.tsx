// File: app/(app)/knowledge/page.tsx (REFACTORIZADO - Layout de 1 Columna)
'use client';
import React, { useCallback, useEffect } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Loader2, AlertTriangle, UploadCloud, FileText, List } from 'lucide-react'; // Iconos relevantes
import { useAuth } from '@/lib/hooks/useAuth';
import { useDocumentStatuses } from '@/lib/hooks/useDocumentStatuses';
import { useUploadDocument } from '@/lib/hooks/useUploadDocument';
import { DocumentStatusList } from '@/components/knowledge/document-status-list';
import { FileUploader } from '@/components/knowledge/file-uploader';
import { AuthHeaders } from '@/lib/api';
import { cn } from '@/lib/utils';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Separator } from '@/components/ui/separator'; // Importar Separator

export default function KnowledgePage() {
  const { user, isLoading: isAuthLoading } = useAuth();

  // Hook para manejar el estado de los documentos
  const {
    documents,
    isLoading: isLoadingDocuments,
    error: documentsError,
    fetchDocuments,
    fetchMore,
    hasMore,
    retryLocalUpdate,
    refreshDocument,
    deleteLocalDocument,
  } = useDocumentStatuses();

  // Hook para manejar la subida de archivos
  const {
    isUploading,
    uploadError,
    uploadResponse, // Usamos uploadResponse para el useEffect
    uploadFile,
    clearUploadStatus
  } = useUploadDocument(
    // Callback onSuccess (opcional, la lógica principal está en useEffect)
    // () => { console.log("Upload initiated successfully via hook"); }
  );

  // Efecto para refrescar la lista cuando una subida es exitosa (estado 202 recibido)
  // y el backend confirma que el documento existe (se obtiene un document_id).
  useEffect(() => {
    if (uploadResponse?.document_id) {
       const refreshDelay = 1500; // ms
       console.log(`KnowledgePage: Upload successful for ${uploadResponse.document_id}. Refreshing list in ${refreshDelay}ms.`);
       const timer = setTimeout(() => {
           fetchDocuments(true); // Recarga completa para incluir el nuevo
       }, refreshDelay);
       return () => clearTimeout(timer); // Limpiar timeout si el componente se desmonta
    }
  }, [uploadResponse, fetchDocuments]); // Depende de la respuesta de subida y la función de fetch

  // Callbacks para acciones en la lista
  const handleRetrySuccess = useCallback((documentId: string) => {
    retryLocalUpdate(documentId);
    refreshDocument(documentId);
  }, [retryLocalUpdate, refreshDocument]);

  const handleDeleteSuccess = useCallback((documentId: string) => {
    deleteLocalDocument(documentId);
  }, [deleteLocalDocument]);

  // Headers de autenticación
  const authHeadersForChildren: AuthHeaders | null = user?.userId && user?.companyId ? {
    'X-User-ID': user.userId,
    'X-Company-ID': user.companyId,
  } : null;

  // --- Renderizado ---

  // Skeleton de Carga Principal (mientras se verifica la autenticación)
  if (isAuthLoading) {
    return (
        <div className="container mx-auto p-4 md:p-6 lg:p-8 space-y-8">
          <Skeleton className="h-10 w-1/3 mb-6" /> {/* Skeleton título */}
          <Skeleton className="h-64 rounded-xl mb-8" /> {/* Skeleton Uploader */}
          <Skeleton className="h-10 w-1/4 mb-4" /> {/* Skeleton título lista */}
          <Skeleton className="h-80 rounded-xl" /> {/* Skeleton Lista */}
        </div>
    );
  }

  // Renderizado Principal - Layout de UNA SOLA COLUMNA
  return (
    <div className="container mx-auto p-4 md:p-6 lg:p-8 space-y-8">
        {/* Título de la página */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground flex items-center gap-2">
                 <FileText className="h-7 w-7" />
                 Base de Conocimiento
            </h1>
             {/* Botón global de refresco */}
            {authHeadersForChildren && (
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => fetchDocuments(true)} // reset = true
                    disabled={isLoadingDocuments}
                    className="w-full sm:w-auto" // Ancho completo en móvil
                >
                    <Loader2 className={cn("mr-2 h-4 w-4", isLoadingDocuments ? "animate-spin" : "hidden")} />
                    Refrescar Documentos
                </Button>
            )}
        </div>

        {/* Sección: Subir Documento */}
        <Card className="shadow-md border">
            <CardHeader>
                <CardTitle className="text-xl flex items-center gap-2">
                    <UploadCloud className="h-5 w-5 text-primary" /> Subir Nuevo Documento
                </CardTitle>
                <CardDescription>Añade archivos a tu base de conocimiento.</CardDescription>
            </CardHeader>
            <CardContent>
            {authHeadersForChildren ? (
                // Componente FileUploader
                <FileUploader
                    authHeaders={authHeadersForChildren}
                    onUploadFile={uploadFile}
                    isUploading={isUploading}
                    uploadError={uploadError}
                    clearUploadStatus={clearUploadStatus}
                />
            ) : (
                // Mensaje si no está autenticado
                <Alert variant="default" className="bg-muted/50">
                     <AlertTriangle className="h-4 w-4 text-muted-foreground" />
                    <AlertTitle className="text-sm font-medium">Autenticación Requerida</AlertTitle>
                    <AlertDescription className="text-xs text-muted-foreground">
                        Inicia sesión para poder subir nuevos documentos.
                    </AlertDescription>
                </Alert>
            )}
            </CardContent>
        </Card>

        <Separator /> {/* Separador visual */}

        {/* Sección: Lista de Documentos Subidos */}
        <div className='space-y-4'>
             <h2 className="text-xl md:text-2xl font-semibold tracking-tight text-foreground flex items-center gap-2">
                 <List className="h-6 w-6" /> Documentos Gestionados
            </h2>

             {/* Mostrar Error de Carga de la Lista */}
             {documentsError && (
                <Alert variant="destructive">
                     <AlertTriangle className="h-4 w-4" />
                    <AlertTitle>Error al Cargar Documentos</AlertTitle>
                    <AlertDescription>
                        {documentsError}
                        <Button variant="link" size="sm" onClick={() => fetchDocuments(true)} className="p-0 h-auto ml-2 text-destructive underline">Reintentar</Button>
                    </AlertDescription>
                </Alert>
             )}

             {/* Mostrar Skeleton si está cargando inicialmente y no hay error */}
             {isLoadingDocuments && documents.length === 0 && !documentsError && (
                <div className="space-y-2 pt-2 border rounded-lg p-4">
                    <Skeleton className="h-12 w-full rounded-md" />
                    <Skeleton className="h-12 w-full rounded-md" />
                    <Skeleton className="h-12 w-full rounded-md" />
                </div>
             )}

             {/* Mostrar Lista de Documentos si está autenticado y no en skeleton inicial */}
             {!isLoadingDocuments && documentsError == null && authHeadersForChildren && (
                <DocumentStatusList
                    documents={documents}
                    authHeaders={authHeadersForChildren}
                    onRetrySuccess={handleRetrySuccess}
                    fetchMore={fetchMore}
                    hasMore={hasMore}
                    refreshDocument={refreshDocument}
                    onDeleteSuccess={handleDeleteSuccess}
                    isLoading={isLoadingDocuments} // Prop para indicar si se está cargando más
                />
             )}

             {/* Mensaje si no está autenticado y no hubo error ni carga inicial */}
             {!isLoadingDocuments && !authHeadersForChildren && !documentsError && (
                <div className="text-center py-10 border-2 border-dashed rounded-lg bg-muted/30">
                     <p className="text-muted-foreground text-sm">Inicia sesión para ver tus documentos.</p>
                </div>
             )}
        </div>
    </div>
  );
}