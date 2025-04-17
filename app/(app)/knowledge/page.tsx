// File: app/(app)/knowledge/page.tsx (MODIFICADO)
'use client';
import React from 'react'; // No se necesita useState, useEffect, useCallback aquí
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button'; // Import Button
import { Loader2 } from 'lucide-react';
import { useAuth } from '@/lib/hooks/useAuth';
import { useDocumentStatuses } from '@/lib/hooks/useDocumentStatuses'; // Hook para estados
import { useUploadDocument } from '@/lib/hooks/useUploadDocument'; // Hook para subida
import { DocumentStatusList } from '@/components/knowledge/document-status-list';
import { FileUploader } from '@/components/knowledge/file-uploader';
import { AuthHeaders } from '@/lib/api';

export default function KnowledgePage() {
  const { user, isLoading: isAuthLoading } = useAuth();

  // Hook para manejar la lista de estados de documentos
  const {
    documents,
    isLoading: isLoadingDocuments,
    error: documentsError,
    fetchDocuments, // Función para refrescar la lista
    retryLocalUpdate, // Función para actualizar localmente al reintentar
  } = useDocumentStatuses();

  // Hook para manejar la subida de archivos
  const {
    isUploading,
    uploadError,
    // uploadResponse, // No necesitamos mostrar la respuesta aquí directamente
    uploadFile,
    clearUploadStatus // Para limpiar el error de subida si el usuario interactúa de nuevo
  } = useUploadDocument(
    // Callback onSuccess: Refrescar la lista después de subir
    () => {
        // Pequeño delay para dar tiempo al backend a actualizar el estado
        setTimeout(() => {
            fetchDocuments();
        }, 1500);
    }
  );

  // Handler para el botón de reintentar en la lista
  const handleRetrySuccess = (documentId: string) => {
    retryLocalUpdate(documentId); // Actualiza UI localmente
    // Opcional: refrescar toda la lista después de un tiempo
    // setTimeout(fetchDocuments, 5000);
  };

  // Construir headers solo si el usuario está autenticado
  const authHeadersForChildren: AuthHeaders | null = user?.userId && user?.companyId ? {
    'X-User-ID': user.userId,
    'X-Company-ID': user.companyId,
  } : null;

  // Estado de carga principal (Autenticación)
  if (isAuthLoading) {
    return (
        <div className="container mx-auto p-4 md:p-6 lg:p-8">
          <h1 className="text-2xl font-semibold mb-6">
             <Skeleton className="h-8 w-1/2" />
          </h1>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1 space-y-3">
               <Skeleton className="h-6 w-1/3" />
               <Skeleton className="h-32 w-full" />
               <Skeleton className="h-10 w-full" />
            </div>
            <div className="lg:col-span-2 space-y-3">
               <Skeleton className="h-6 w-1/4" />
               <Skeleton className="h-10 w-full" />
               <Skeleton className="h-10 w-full" />
               <Skeleton className="h-10 w-full" />
            </div>
          </div>
        </div>
    );
  }

  // Renderizado principal
  return (
    <div className="container mx-auto p-4 md:p-6 lg:p-8 space-y-6">
      <h1 className="text-2xl font-semibold">Gestionar Base de Conocimiento</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8"> {/* Aumentado gap */}
        {/* Columna de subida */}
        <div className="lg:col-span-1 space-y-4"> {/* Añadido space-y */}
          <h2 className="text-lg font-medium">Subir Nuevo Documento</h2>
          {authHeadersForChildren ? (
            <FileUploader
              authHeaders={authHeadersForChildren}
              onUploadFile={uploadFile} // Pasar la función de subida del hook
              isUploading={isUploading} // Pasar estado de carga del hook
              uploadError={uploadError} // Pasar error de subida del hook
              clearUploadStatus={clearUploadStatus} // Pasar función para limpiar estado
            />
          ) : (
            <p className="text-muted-foreground text-sm border p-4 rounded-md bg-muted/50">
              Inicia sesión para poder subir nuevos documentos a tu base de conocimiento.
            </p>
          )}
        </div>

        {/* Columna de listado */}
        <div className="lg:col-span-2 space-y-4"> {/* Wrap list column content */}
           <div className='flex justify-between items-center'>
              <h2 className="text-lg font-medium">Documentos Subidos</h2>
              {/* Botón opcional para refrescar manualmente */}
              {authHeadersForChildren && (
                 <Button variant="outline" size="sm" onClick={fetchDocuments} disabled={isLoadingDocuments}>
                    <Loader2 className={`mr-2 h-4 w-4 ${isLoadingDocuments ? 'animate-spin' : 'hidden'}`} /> {/* Use template literal for class */}
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
          {isLoadingDocuments ? (
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
                  isLoading={false}
                  onRetrySuccess={handleRetrySuccess}
                  authHeaders={authHeadersForChildren} // Pasar headers por si se necesitan dentro
                />
            ) : (
                // Mensaje si no está cargando, no hay error y no hay usuario
                !documentsError && <p className="text-muted-foreground text-center py-6">Inicia sesión para ver tus documentos.</p>
            )
          )}
        </div> {/* Close list column wrapper */}
      </div>
    </div>
  );
}