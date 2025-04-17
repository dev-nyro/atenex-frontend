import { useState, useEffect, useCallback } from 'react';
import { getDocumentStatusList, DocumentStatusResponse, AuthHeaders, ApiError } from '@/lib/api';
import { useAuth } from '@/lib/hooks/useAuth';

interface UseDocumentStatusesReturn {
  documents: DocumentStatusResponse[];
  isLoading: boolean;
  error: string | null;
  fetchDocuments: () => Promise<void>; // Función para refrescar manualmente
  retryLocalUpdate: (documentId: string) => void; // Función para actualizar estado local al reintentar
}

export function useDocumentStatuses(): UseDocumentStatusesReturn {
  const { user, isLoading: isAuthLoading } = useAuth();
  const [documents, setDocuments] = useState<DocumentStatusResponse[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true); // Loading state for documents specifically
  const [error, setError] = useState<string | null>(null);

  const fetchDocuments = useCallback(async () => {
    // Don't fetch if auth is still loading or user is not available
    if (isAuthLoading || !user?.userId || !user?.companyId) {
      // If auth finished and no user, clear documents and stop loading
      if (!isAuthLoading) {
        setDocuments([]);
        setIsLoading(false);
        setError(null); // No error, just no user
      }
      return;
    }

    const authHeaders: AuthHeaders = {
      'X-User-ID': user.userId,
      'X-Company-ID': user.companyId,
    };

    setIsLoading(true);
    setError(null);

    try {
      // TODO: Implement pagination/infinite loading here later if needed
      const data = await getDocumentStatusList(authHeaders); // Using default limit/offset for now
      setDocuments(Array.isArray(data) ? data : []);
    } catch (err: any) {
      const errorMessage = err instanceof ApiError ? err.message : (err.message || 'Error al cargar la lista de documentos.');
      setError(errorMessage);
      setDocuments([]); // Clear documents on error
    } finally {
      setIsLoading(false);
    }
  }, [user, isAuthLoading]); // Depend on user and auth loading state

  // Initial fetch when auth is ready
  useEffect(() => {
    fetchDocuments();
  }, [fetchDocuments]); // fetchDocuments already depends on user/isAuthLoading

  // Function to optimistically update status locally when retry is triggered
  const retryLocalUpdate = useCallback((documentId: string) => {
    setDocuments(prevDocs =>
      prevDocs.map(doc =>
        doc.document_id === documentId
          ? { ...doc, status: 'processing', error_message: null } // Optimistic update
          : doc
      )
    );
    // Optionally trigger a full refresh after a delay
    // setTimeout(fetchDocuments, 5000);
  }, []); // No dependencies needed for this specific update logic

  return { documents, isLoading, error, fetchDocuments, retryLocalUpdate };
}
