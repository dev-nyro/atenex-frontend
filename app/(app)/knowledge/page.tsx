// File: app/(app)/knowledge/page.tsx (MODIFICADO - Iteración 4.1 -> Refinado)
'use client';
import React, { useCallback, useEffect } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Loader2, AlertTriangle, UploadCloud, FileText } from 'lucide-react'; // Iconos relevantes
import { useAuth } from '@/lib/hooks/useAuth';
import { useDocumentStatuses } from '@/lib/hooks/useDocumentStatuses';
import { useUploadDocument } from '@/lib/hooks/useUploadDocument';
import { DocumentStatusList } from '@/components/knowledge/document-status-list';
import { FileUploader } from '@/components/knowledge/file-uploader';
import { AuthHeaders } from '@/lib/api';
import { cn } from '@/lib/utils';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

export default function KnowledgePage() {
  const { user, isLoading: isAuthLoading } = useAuth();

  // Hook para manejar el estado de los documentos
  const {
    documents,
    isLoading: isLoadingDocuments, // Renombrado isLoadingDocuments para claridad
    error: documentsError,
    fetchDocuments,
    fetchMore,
    hasMore,
    retryLocalUpdate, // Para actualizar UI inmediatamente al reintentar
    refreshDocument, // Para forzar refresco desde API
    deleteLocalDocument, // Para actualizar UI inmediatamente al borrar
  } = useDocumentStatuses();

  // Hook para manejar la subida de archivos
  const {
    isUploading,
    uploadError,
    uploadResponse,
    uploadFile,
    clearUploadStatus
  } = useUploadDocument(
    // Callback onSuccess para refrescar la lista después de un tiempo prudencial
    () => {
        setTimeout(() => {
            fetchDocuments(true); // reset = true para obtener la lista desde el principio
        }, 1500); // Espera 1.5s para dar tiempo a que el backend empiece a procesar
    }
  );

  // Cuando se obtiene una respuesta de subida con document_id válido, recargar lista y refrescar ese documento
  useEffect(() => {
    if (uploadResponse?.document_id) {
      // Refrescar lista completa y estado individual
      fetchDocuments(true);
      refreshDocument(uploadResponse.document_id);
    }
  }, [uploadResponse, fetchDocuments, refreshDocument]);

  // Callback para cuando un reintento se inicia (actualiza UI y refresca desde API)
  const handleRetrySuccess = useCallback((documentId: string) => {
    retryLocalUpdate(documentId); // Cambia estado a 'processing' localmente
    refreshDocument(documentId); // Pide el estado actualizado a la API
  }, [retryLocalUpdate, refreshDocument]);

  // Callback para cuando se confirma la eliminación (actualiza UI localmente)
  const handleDeleteSuccess = useCallback((documentId: string) => {
    deleteLocalDocument(documentId);
    // Opcional: fetchDocuments(true); si se prefiere recargar toda la lista
  }, [deleteLocalDocument]);

  // Prepara los headers de autenticación para los componentes hijos
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
          <div className="grid gap-8 lg:grid-cols-3 items-start">
            <Skeleton className="h-64 rounded-xl lg:col-span-1" /> {/* Skeleton Uploader */}
            <Skeleton className="h-80 rounded-xl lg:col-span-2" /> {/* Skeleton Lista */}
          </div>
        </div>
    );
  }

  // Renderizado Principal con Layout de Grid
  return (
    <div className="container mx-auto p-4 md:p-6 lg:p-8 space-y-8">
        {/* Título de la página */}
        <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold tracking-tight text-foreground flex items-center gap-2">
                 <FileText className="h-7 w-7" /> {/* Icono representativo */}
                 Base de Conocimiento
            </h1>
             {/* Botón global de refresco, solo si está autenticado */}
            {authHeadersForChildren && (
                <Button variant="outline" size="sm" onClick={() => fetchDocuments(true)} disabled={isLoadingDocuments}>
                    <Loader2 className={cn("mr-2 h-4 w-4", isLoadingDocuments ? "animate-spin" : "hidden")} />
                    Refrescar Todo
                </Button>
            )}
        </div>


        {/* Grid para las dos secciones principales: Subida y Lista */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">

            {/* Columna Izquierda: Subir Documento (Card Sticky) */}
            <Card className="lg:col-span-1 lg:sticky top-20 shadow-md">
                <CardHeader>
                    <CardTitle className="text-xl flex items-center gap-2">
                        <UploadCloud className="h-5 w-5 text-primary" /> Subir Nuevo Documento
                    </CardTitle>
                    <CardDescription>Añade archivos a tu base de conocimiento.</CardDescription>
                </CardHeader>
                <CardContent>
                {authHeadersForChildren ? (
                    // Componente FileUploader si el usuario está autenticado
                    <FileUploader
                        authHeaders={authHeadersForChildren}
                        onUploadFile={uploadFile}
                        isUploading={isUploading}
                        uploadError={uploadError}
                        clearUploadStatus={clearUploadStatus}
                    />
                ) : (
                    // Mensaje si el usuario no está autenticado
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

            {/* Columna Derecha: Lista de Documentos */}
            <Card className="lg:col-span-2 shadow-md">
                 {/* Header de la card de lista, sin botón de refresco aquí (ya está global) */}
                 <CardHeader>
                    <CardTitle className="text-xl">Documentos Subidos</CardTitle>
                    <CardDescription>Gestiona los documentos de tu organización.</CardDescription>
                 </CardHeader>
                <CardContent className="space-y-4">
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

                    {/* Mostrar Skeleton si está cargando y no hay error */}
                    {isLoadingDocuments && documents.length === 0 && !documentsError && (
                        <div className="space-y-2 pt-2">
                            <Skeleton className="h-14 w-full rounded-md" />
                            <Skeleton className="h-14 w-full rounded-md" />
                            <Skeleton className="h-14 w-full rounded-md" />
                        </div>
                    )}

                    {/* Mostrar Lista de Documentos si hay headers y no está en skeleton inicial */}
                     {!isLoadingDocuments && documentsError == null && authHeadersForChildren && (
                        <DocumentStatusList
                            documents={documents}
                            authHeaders={authHeadersForChildren}
                            onRetrySuccess={handleRetrySuccess} // Pasa el callback de reintento
                            fetchMore={fetchMore} // Pasa la función para cargar más
                            hasMore={hasMore} // Pasa el indicador de si hay más
                            refreshDocument={refreshDocument} // Pasa la función de refresco individual
                            onDeleteSuccess={handleDeleteSuccess} // Pasa el callback de eliminación
                            isLoading={isLoadingDocuments} // Indica si se está cargando más
                        />
                    )}

                     {/* Mensaje si no está autenticado y no hubo error */}
                     {!isLoadingDocuments && !authHeadersForChildren && !documentsError && (
                        <p className="text-muted-foreground text-center py-10 text-sm">Inicia sesión para ver tus documentos.</p>
                     )}
                </CardContent>
            </Card>
        </div>
    </div>
  );
}