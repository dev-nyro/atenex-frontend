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
        <div className="p-6 lg:p-8 space-y-8"> {/* Padding aquí */}
          <Skeleton className="h-10 w-1/3 mb-6" />
          <Skeleton className="h-64 rounded-xl mb-8" />
          <Skeleton className="h-10 w-1/4 mb-4" />
          <Skeleton className="h-80 rounded-xl" />
        </div>
    );
  }

  return (
    <div className="p-6 lg:p-8 space-y-8"> {/* Padding principal de la página */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground flex items-center gap-2">
                 <FileText className="h-7 w-7" />
                 Base de Conocimiento
            </h1>
            {authHeadersForChildren && (
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => fetchDocuments(true)}
                    disabled={isLoadingDocuments}
                    className="w-full sm:w-auto"
                >
                    <Loader2 className={cn("mr-2 h-4 w-4", isLoadingDocuments ? "animate-spin" : "hidden")} />
                    Refrescar Documentos
                </Button>
            )}
        </div>


        {/* Uploader: Compact, collapsible */}
        <details className="mb-2" open>
          <summary className="cursor-pointer select-none text-base font-semibold flex items-center gap-2 px-2 py-2 rounded hover:bg-accent/30 transition-colors">
            <UploadCloud className="h-5 w-5 text-primary" /> Subir Nuevo Documento
            <span className="ml-2 text-xs text-muted-foreground font-normal">(Arrastra, selecciona o pega archivos)</span>
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
        <Separator />

        <div className='space-y-4'>
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
             {!isLoadingDocuments && documentsError == null && authHeadersForChildren && (
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
             )}
             {!isLoadingDocuments && !authHeadersForChildren && !documentsError && (
                <div className="text-center py-10 border-2 border-dashed rounded-lg bg-muted/30">
                     <p className="text-muted-foreground text-sm">Inicia sesión para ver tus documentos.</p>
                </div>
             )}
        </div>
    </div>
  );
}