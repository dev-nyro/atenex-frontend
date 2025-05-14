// File: app/(app)/knowledge/page.tsx (CONFIRMADO CON PADDING)
'use client';
import React, { useCallback, useEffect } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Loader2, AlertTriangle, UploadCloud, FileText, List } from 'lucide-react';
import { useAuth } from '@/lib/hooks/useAuth';
import { useDocumentStatuses } from '@/lib/hooks/useDocumentStatuses';
import { useUploadDocument } from '@/lib/hooks/useUploadDocument';
import { DocumentStatusList } from '@/components/knowledge/document-status-list';
import { FileUploader } from '@/components/knowledge/file-uploader';
import { AuthHeaders } from '@/lib/api';
import { cn } from '@/lib/utils';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Separator } from '@/components/ui/separator';

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
    uploadResponse,
    uploadFile,
    clearUploadStatus
  } = useUploadDocument();

  useEffect(() => {
    if (uploadResponse?.document_id) {
       const refreshDelay = 1500;
       const timer = setTimeout(() => { fetchDocuments(true); }, refreshDelay);
       return () => clearTimeout(timer);
    }
  }, [uploadResponse, fetchDocuments]);

  const handleRetrySuccess = useCallback((documentId: string) => {
    retryLocalUpdate(documentId);
    refreshDocument(documentId);
  }, [retryLocalUpdate, refreshDocument]);

  const handleDeleteSuccess = useCallback((documentId: string) => {
    deleteLocalDocument(documentId);
  }, [deleteLocalDocument]);

  const authHeadersForChildren: AuthHeaders | null = user?.userId && user?.companyId ? {
    'X-User-ID': user.userId,
    'X-Company-ID': user.companyId,
  } : null;

  if (isAuthLoading) {
    return (
      <div className="p-6 lg:p-8 space-y-8">
        <Skeleton className="h-10 w-1/3 mb-6" />
        <Skeleton className="h-64 rounded-xl mb-8" />
        <Skeleton className="h-10 w-1/4 mb-4" />
        <Skeleton className="h-80 rounded-xl" />
      </div>
    );
  }

  // --- Estadísticas locales (solo frontend) ---
  const totalDocs = documents.length;
  const statusCounts = documents.reduce((acc, doc) => {
    acc[doc.status] = (acc[doc.status] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  const totalChunks = documents.reduce((acc, doc) => acc + (doc.milvus_chunk_count ?? doc.chunk_count ?? 0), 0);

  return (
    <div className="p-4 sm:p-6 lg:p-8 flex flex-col gap-6 min-h-[80vh]">
      {/* Barra de estadísticas */}
      <div className="flex flex-wrap gap-4 items-center justify-between bg-muted/60 border rounded-lg px-4 py-3 shadow-sm">
        <div className="flex flex-wrap gap-4 items-center">
          <span className="font-semibold text-lg">Documentos: <span className="text-primary">{totalDocs}</span></span>
          <span className="text-sm text-muted-foreground">Chunks: <span className="font-semibold">{totalChunks}</span></span>
          <span className="text-sm text-muted-foreground">Procesados: <span className="font-semibold text-green-600">{statusCounts['processed'] || 0}</span></span>
          <span className="text-sm text-muted-foreground">En Cola: <span className="font-semibold text-blue-600">{statusCounts['uploaded'] || 0}</span></span>
          <span className="text-sm text-muted-foreground">Procesando: <span className="font-semibold text-orange-600">{statusCounts['processing'] || 0}</span></span>
          <span className="text-sm text-muted-foreground">Error: <span className="font-semibold text-red-600">{statusCounts['error'] || 0}</span></span>
        </div>
        <details className="w-full sm:w-auto group" open={false}>
          <summary className="flex items-center gap-2 cursor-pointer select-none text-sm font-medium px-3 py-2 rounded-md border border-dashed border-primary/40 bg-background hover:bg-muted/40 transition-all">
            <UploadCloud className="h-5 w-5 text-primary" />
            <span>Subir Nuevo Documento</span>
            <span className="ml-2 text-xs text-muted-foreground font-normal hidden sm:inline">(Arrastra, selecciona o pega archivos)</span>
          </summary>
          <div className="p-2 pt-0">
            {authHeadersForChildren ? (
              <FileUploader
                authHeaders={authHeadersForChildren}
                onUploadFile={uploadFile}
                isUploading={isUploading}
                uploadError={uploadError}
                clearUploadStatus={clearUploadStatus}
              />
            ) : (
              <Alert variant="default" className="bg-muted/50 mt-2">
                <AlertTriangle className="h-4 w-4 text-muted-foreground" />
                <AlertTitle className="text-sm font-medium">Autenticación Requerida</AlertTitle>
                <AlertDescription className="text-xs text-muted-foreground">
                  Inicia sesión para poder subir nuevos documentos.
                </AlertDescription>
              </Alert>
            )}
          </div>
        </details>
      </div>

      <Separator />

      {/* Documentos gestionados */}
      <div className="flex-1 min-h-0 w-full max-w-none flex flex-col gap-4">
        <h2 className="text-xl md:text-2xl font-semibold tracking-tight text-foreground flex items-center gap-2">
          <List className="h-6 w-6" /> Documentos Gestionados
        </h2>
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
        {isLoadingDocuments && documents.length === 0 && !documentsError && (
          <div className="space-y-2 pt-2 border rounded-lg p-4">
            <Skeleton className="h-12 w-full rounded-md" />
            <Skeleton className="h-12 w-full rounded-md" />
            <Skeleton className="h-12 w-full rounded-md" />
          </div>
        )}
        {/* Scroll para la tabla de documentos, sticky header y bulk bar */}
        {!isLoadingDocuments && documentsError == null && authHeadersForChildren && (
          <div className="h-full min-h-0 flex-1 flex flex-col">
            <div className="flex-1 min-h-0">
              <DocumentStatusList
                documents={documents}
                authHeaders={authHeadersForChildren}
                onRetrySuccess={handleRetrySuccess}
                fetchMore={fetchMore}
                hasMore={hasMore}
                refreshDocument={refreshDocument}
                onDeleteSuccess={handleDeleteSuccess}
                isLoading={isLoadingDocuments}
              />
            </div>
          </div>
        )}
        {!isLoadingDocuments && !authHeadersForChildren && !documentsError && (
          <Alert variant="default" className="bg-muted/50 mt-2">
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
            <AlertTitle className="text-sm font-medium">Autenticación Requerida</AlertTitle>
            <AlertDescription className="text-xs text-muted-foreground">
              Inicia sesión para ver y administrar tus documentos.
            </AlertDescription>
          </Alert>
        )}
      </div>
    </div>
  );
}