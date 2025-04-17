'use client';
import { useEffect } from 'react'; // Import useEffect
import { Skeleton } from '@/components/ui/skeleton';
import { useAuth } from '@/lib/hooks/useAuth';
import { useDocumentStatuses } from '@/lib/hooks/useDocumentStatuses'; // Import the new hook
import { DocumentStatusList } from '@/components/knowledge/document-status-list'; // Assuming this component exists and accepts the new props
import { FileUploader } from '@/components/knowledge/file-uploader'; // Assuming this component exists
import { AuthHeaders } from '@/lib/api'; // Keep AuthHeaders for passing down if needed

export default function KnowledgePage() {
  const { user, isLoading: isAuthLoading } = useAuth(); // Still need auth loading state

  // Use the new hook to manage document state
  const {
    documents,
    isLoading: isLoadingDocuments, // Rename to avoid conflict
    error: documentsError,
    fetchDocuments,
    retryLocalUpdate,
  } = useDocumentStatuses();

  // Callback for when an upload is successful (passed to FileUploader)
  const handleUploadSuccess = () => {
    // Refresh the list after a brief delay
    setTimeout(fetchDocuments, 1500);
  };

  // Callback for when a retry is successful (passed to DocumentStatusList)
  // This now just calls the local update function from the hook
  const handleRetrySuccess = (documentId: string) => {
    retryLocalUpdate(documentId);
    // Optionally trigger a full refresh after a delay via fetchDocuments if needed
    // setTimeout(fetchDocuments, 5000);
  };

  // Construct authHeaders for child components that might need them directly (like FileUploader or Retry button inside list)
  const authHeadersForChildren: AuthHeaders | null = user?.userId && user?.companyId ? {
    'X-User-ID': user.userId,
    'X-Company-ID': user.companyId,
  } : null;

  // Show main loading skeleton while auth is resolving
  if (isAuthLoading) {
    return (
      <div className="container mx-auto p-4 md:p-6 lg:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <Skeleton className="h-48 w-full mb-4" />
          </div>
          <div className="lg:col-span-2 space-y-2">
            <Skeleton className="h-8 w-1/3 mb-3" />
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
          </div>
        </div>
      </div>
    );
  }

  // Main page content
  return (
    <div className="container mx-auto p-4 md:p-6 lg:p-8">
      <h1 className="text-2xl font-semibold mb-6">Gestión de Conocimiento</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Columna de subida */}
        <div className="lg:col-span-1">
          <h2 className="text-lg font-medium mb-3">Subir Nuevo Documento</h2>
          {authHeadersForChildren ? (
            <FileUploader
              onUploadSuccess={handleUploadSuccess}
              authHeaders={authHeadersForChildren}
            />
          ) : (
            <p className="text-muted-foreground">Inicia sesión para subir documentos.</p>
          )}
        </div>

        {/* Columna de listado */}
        <div className="lg:col-span-2">
          <h2 className="text-lg font-medium mb-3">Documentos Subidos</h2>
          {/* Display error from the hook */}
          {documentsError && <p className="text-destructive mb-4">Error: {documentsError}</p>}

          {/* Display loading state from the hook */}
          {isLoadingDocuments ? (
            <div className="space-y-2">
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
            </div>
          ) : (
            // Only render list if auth headers are available (user is logged in)
            authHeadersForChildren ? (
              <DocumentStatusList
                documents={documents} // Pass documents from the hook
                isLoading={false} // The list itself isn't loading, the hook handles it
                onRetrySuccess={handleRetrySuccess} // Pass the retry handler
                authHeaders={authHeadersForChildren} // Pass headers for potential actions within the list
              />
            ) : (
              // If not loading and no user, show message (unless there was an error)
              !documentsError && <p className="text-muted-foreground">Inicia sesión para ver documentos.</p>
            )
          )}
        </div>
      </div>
    </div>
  );
}