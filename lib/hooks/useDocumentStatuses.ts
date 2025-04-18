import { useState, useEffect, useCallback, useRef } from 'react';
import { getDocumentStatusList, DocumentStatusResponse, AuthHeaders, ApiError, getDocumentStatus } from '@/lib/api';
import { useAuth } from '@/lib/hooks/useAuth';

interface UseDocumentStatusesReturn {
  documents: DocumentStatusResponse[];
  isLoading: boolean;
  error: string | null;
  fetchDocuments: (reset?: boolean) => Promise<void>; // Función para refrescar manualmente
  fetchMore: () => void; // Función para cargar más documentos
  hasMore: boolean; // Indica si hay más documentos para cargar
  retryLocalUpdate: (documentId: string) => void; // Función para actualizar estado local al reintentar
  refreshDocument: (documentId: string) => Promise<void>; // Refrescar estado de un documento específico
  deleteLocalDocument: (documentId: string) => void; // Eliminar documento localmente
}

export function useDocumentStatuses(): UseDocumentStatusesReturn {
  const { user, isLoading: isAuthLoading } = useAuth();
  const [documents, setDocuments] = useState<DocumentStatusResponse[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const offsetRef = useRef<number>(0);
  const limit = 100; // page size
  const [hasMore, setHasMore] = useState<boolean>(false);

  const fetchDocuments = useCallback(async (reset: boolean = true) => {
    if (isAuthLoading || !user?.userId || !user?.companyId) {
      if (!isAuthLoading) {
        setDocuments([]);
        setIsLoading(false);
        setError(null);
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
      const newOffset = reset ? 0 : offsetRef.current;
      const data = await getDocumentStatusList(authHeaders, limit, newOffset);
      setHasMore(data.length === limit);
      setDocuments(prev => reset ? data : [...prev, ...data]);
      if (reset) offsetRef.current = limit; else offsetRef.current += limit;
    } catch (err: any) {
      const errorMessage = err instanceof ApiError ? err.message : (err.message || 'Error al cargar la lista de documentos.');
      setError(errorMessage);
      setDocuments([]);
    } finally {
      setIsLoading(false);
    }
  }, [user, isAuthLoading]);

  useEffect(() => {
    fetchDocuments(true);
  }, [fetchDocuments]);

  const retryLocalUpdate = useCallback((documentId: string) => {
    setDocuments(prevDocs =>
      prevDocs.map(doc =>
        doc.document_id === documentId
          ? { ...doc, status: 'processing', error_message: null }
          : doc
      )
    );
  }, []);

  const fetchMore = useCallback(() => {
    if (!isLoading && hasMore) fetchDocuments(false);
  }, [fetchDocuments, isLoading, hasMore]);

  const refreshDocument = useCallback(async (documentId: string) => {
    try {
      const updated = await getDocumentStatus(documentId);
      setDocuments(prev => prev.map(doc => doc.document_id === documentId ? updated : doc));
    } catch {
      // ignore errors
    }
  }, []);

  const deleteLocalDocument = useCallback((documentId: string) => {
    setDocuments(prev => prev.filter(doc => doc.document_id !== documentId));
  }, []);

  return { documents, isLoading, error, fetchDocuments, fetchMore, hasMore, retryLocalUpdate, refreshDocument, deleteLocalDocument };
}
