// File: app/(app)/knowledge/page.tsx (MODIFICADO - Iteración 4.1)
'use client';
import React, { useCallback } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
// Importar Card y sus componentes
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'; // Añadido CardDescription
import { Loader2, AlertTriangle } from 'lucide-react'; // Añadido AlertTriangle
import { useAuth } from '@/lib/hooks/useAuth';
import { useDocumentStatuses } from '@/lib/hooks/useDocumentStatuses';
import { useUploadDocument } from '@/lib/hooks/useUploadDocument';
import { DocumentStatusList } from '@/components/knowledge/document-status-list';
import { FileUploader } from '@/components/knowledge/file-uploader';
import { AuthHeaders } from '@/lib/api';
import { cn } from '@/lib/utils';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'; // Añadir Alert

export default function KnowledgePage() {
  const { user, isLoading: isAuthLoading } = useAuth();

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

  const {
    isUploading,
    uploadError,
    uploadFile,
    clearUploadStatus
  } = useUploadDocument(
    () => {
        // Refrescar la lista un poco después de subir, para dar tiempo a que aparezca
        setTimeout(() => {
            fetchDocuments(true);
        }, 1500);
    }
  );

  const handleRetrySuccess = (documentId: string) => {
    retryLocalUpdate(documentId);
    // Opcional: Refrescar el documento específico inmediatamente después del reintento local
    // refreshDocument(documentId);
  };

  const handleDeleteSuccess = useCallback((documentId: string) => {
    deleteLocalDocument(documentId);
    // Podríamos simplemente eliminar localmente o refrescar toda la lista
    // fetchDocuments(true); // Si queremos asegurar consistencia total
  }, [deleteLocalDocument]);

  const authHeadersForChildren: AuthHeaders | null = user?.userId && user?.companyId ? {
    'X-User-ID': user.userId,
    'X-Company-ID': user.companyId,
  } : null;

  // Skeleton de carga principal
  if (isAuthLoading) {
    return (
        // Usamos grid para un layout más flexible en el skeleton
        <div className="container mx-auto p-4 md:p-6 lg:p-8 grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-3">
             <Skeleton className="h-10 w-1/3 mb-6" /> {/* Skeleton para el título principal */}
          </div>
          {/* Skeletons para las cards */}
          <Skeleton className="h-64 rounded-xl lg:col-span-1" />
          <Skeleton className="h-80 rounded-xl lg:col-span-2" />
        </div>
    );
  }

  // Renderizado principal usando grid layout
  return (
    <div className="container mx-auto p-4 md:p-6 lg:p-8 space-y-8">
        {/* Título de la página */}
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Base de Conocimiento</h1>

        {/* Grid para las dos secciones principales */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">

            {/* Columna Izquierda: Subir Documento */}
            <Card className="lg:col-span-1 sticky top-20"> {/* Hacemos sticky la card de subida en pantallas grandes */}
                <CardHeader>
                    <CardTitle className="text-xl">Subir Nuevo Documento</CardTitle>
                    <CardDescription>Añade archivos a tu base de conocimiento.</CardDescription>
                </CardHeader>
                <CardContent>
                {authHeadersForChildren ? (
                    <FileUploader
                    authHeaders={authHeadersForChildren}
                    onUploadFile={uploadFile}
                    isUploading={isUploading}
                    uploadError={uploadError}
                    clearUploadStatus={clearUploadStatus}
                    />
                ) : (
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
            <Card className="lg:col-span-2">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
                     <div>
                         <CardTitle className="text-xl">Documentos Subidos</CardTitle>
                         <CardDescription>Gestiona los documentos de tu organización.</CardDescription>
                     </div>
                    {authHeadersForChildren && (
                        <Button variant="outline" size="sm" onClick={() => fetchDocuments(true)} disabled={isLoadingDocuments}>
                            <Loader2 className={cn("mr-2 h-4 w-4", isLoadingDocuments ? "animate-spin" : "hidden")} />
                            Refrescar
                        </Button>
                    )}
                </CardHeader>
                <CardContent className="space-y-4">
                    {/* Mostrar error de carga de la lista */}
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

                    {/* Mostrar skeleton o lista */}
                    {isLoadingDocuments && !documentsError && documents.length === 0 ? (
                        <div className="space-y-2 pt-2">
                            <Skeleton className="h-12 w-full rounded-md" />
                            <Skeleton className="h-12 w-full rounded-md" />
                            <Skeleton className="h-12 w-full rounded-md" />
                        </div>
                    ) : (
                        authHeadersForChildren ? (
                        <DocumentStatusList
                            documents={documents}
                            authHeaders={authHeadersForChildren}
                            onRetrySuccess={handleRetrySuccess}
                            fetchMore={fetchMore}
                            hasMore={hasMore}
                            refreshDocument={refreshDocument}
                            onDeleteSuccess={handleDeleteSuccess}
                        />
                        ) : (
                            !documentsError && <p className="text-muted-foreground text-center py-10 text-sm">Inicia sesión para ver tus documentos.</p>
                        )
                    )}
                </CardContent>
            </Card>
        </div>
    </div>
  );
}