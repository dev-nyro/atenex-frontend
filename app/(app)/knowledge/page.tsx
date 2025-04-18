// File: app/(app)/knowledge/page.tsx (MODIFICADO)
'use client';
import React, { useCallback } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
// Importar Card y sus componentes
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2 } from 'lucide-react';
import { useAuth } from '@/lib/hooks/useAuth';
import { useDocumentStatuses } from '@/lib/hooks/useDocumentStatuses';
import { useUploadDocument } from '@/lib/hooks/useUploadDocument';
import { DocumentStatusList } from '@/components/knowledge/document-status-list';
import { FileUploader } from '@/components/knowledge/file-uploader';
import { AuthHeaders } from '@/lib/api';
import { cn } from '@/lib/utils'; // Import cn

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
        setTimeout(() => {
            fetchDocuments(true);
        }, 1500);
    }
  );

  const handleRetrySuccess = (documentId: string) => {
    retryLocalUpdate(documentId);
  };

  const handleDeleteSuccess = useCallback((documentId: string) => {
    deleteLocalDocument(documentId);
    fetchDocuments(true);
  }, [deleteLocalDocument, fetchDocuments]);

  const authHeadersForChildren: AuthHeaders | null = user?.userId && user?.companyId ? {
    'X-User-ID': user.userId,
    'X-Company-ID': user.companyId,
  } : null;

  // Estado de carga principal (Autenticación)
  if (isAuthLoading) {
    return (
        <div className="container mx-auto p-4 md:p-6 lg:p-8 space-y-6"> {/* Añadido space-y-6 */}
          <h1 className="text-2xl font-semibold mb-6">
             <Skeleton className="h-8 w-1/2" />
          </h1>
          {/* Layout simplificado para Skeleton */}
          <div className="space-y-6">
             <Skeleton className="h-48 w-full lg:w-1/3" /> {/* Simula Card de Upload */}
             <Skeleton className="h-64 w-full" /> {/* Simula Card de Lista */}
          </div>
        </div>
    );
  }

  // Renderizado principal
  return (
    // Usar flex flex-col para apilar elementos verticalmente, gap-6 para espaciado
    <div className="container mx-auto p-4 md:p-6 lg:p-8 flex flex-col gap-8">
      <h1 className="text-3xl font-bold tracking-tight">Base de Conocimiento</h1>

      {/* Card para Subir Documento */}
      <Card className="w-full">
        {/* Opcional: Usar CardHeader para un título más formal */}
        {/* <CardHeader>
             <CardTitle>Subir Nuevo Documento</CardTitle>
        </CardHeader> */}
        <CardContent className="pt-6"> {/* Añadir padding top si no se usa CardHeader */}
          <h2 className="text-xl font-semibold mb-4">Subir Nuevo Documento</h2>
          {authHeadersForChildren ? (
            <FileUploader
              authHeaders={authHeadersForChildren}
              onUploadFile={uploadFile}
              isUploading={isUploading}
              uploadError={uploadError}
              clearUploadStatus={clearUploadStatus}
            />
          ) : (
            <p className="text-muted-foreground text-sm border p-4 rounded-md bg-muted/50">
              Inicia sesión para poder subir nuevos documentos a tu base de conocimiento.
            </p>
          )}
        </CardContent>
      </Card>

      {/* Card para Lista de Documentos */}
      <Card className="w-full">
        {/* <CardHeader>
            <CardTitle>Documentos Subidos</CardTitle>
        </CardHeader> */}
        <CardContent className="pt-6 space-y-4">
           <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3'>
             <h2 className="text-xl font-semibold">Documentos Subidos</h2>
             {authHeadersForChildren && (
               <Button variant="outline" size="sm" onClick={() => fetchDocuments(true)} disabled={isLoadingDocuments}>
                 {/* Mostrar icono de carga solo cuando está cargando */}
                 <Loader2 className={cn("mr-2 h-4 w-4", isLoadingDocuments ? "animate-spin" : "hidden")} />
                 Refrescar Lista
               </Button>
             )}
           </div>

          {/* Mostrar error de carga de la lista */}
          {documentsError && (
              <div className="text-destructive border border-destructive/50 bg-destructive/10 p-3 rounded-md text-sm">
                Error al cargar documentos: {documentsError}
              </div>
          )}

          {/* Mostrar estado de carga de la lista */}
          {isLoadingDocuments && !documentsError && documents.length === 0 ? ( // Mostrar skeleton solo en carga inicial o reset
             <div className="space-y-2">
                <Skeleton className="h-12 w-full" />
                <Skeleton className="h-12 w-full" />
                <Skeleton className="h-12 w-full" />
             </div>
          ) : (
            // Renderizar la lista solo si hay headers (usuario logueado)
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
                // Mensaje si no está cargando, no hay error y no hay usuario
                !documentsError && <p className="text-muted-foreground text-center py-6">Inicia sesión para ver tus documentos.</p>
            )
          )}
        </CardContent>
      </Card>
    </div>
  );
}