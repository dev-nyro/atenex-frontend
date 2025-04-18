// File: lib/hooks/useDocumentStatuses.ts (MODIFICADO - Corregido error y adaptado a API)
import { useState, useEffect, useCallback, useRef } from 'react';
import {
    getDocumentStatusList,
    DocumentStatusResponse, // Usar esta interfaz base
    DetailedDocumentStatusResponse, // Usar esta para refresco individual
    AuthHeaders,
    ApiError,
    getDocumentStatus // Importar la función individual
} from '@/lib/api';
import { useAuth } from '@/lib/hooks/useAuth';

// Devolver la interfaz base en el hook, ya que la lista puede no tener todos los detalles
interface UseDocumentStatusesReturn {
  documents: DocumentStatusResponse[];
  isLoading: boolean;
  error: string | null;
  fetchDocuments: (reset?: boolean) => Promise<void>;
  fetchMore: () => void;
  hasMore: boolean;
  retryLocalUpdate: (documentId: string) => void;
  refreshDocument: (documentId: string) => Promise<void>; // Refrescar estado individual
  deleteLocalDocument: (documentId: string) => void;
}

export function useDocumentStatuses(): UseDocumentStatusesReturn {
  const { user, isLoading: isAuthLoading } = useAuth();
  const [documents, setDocuments] = useState<DocumentStatusResponse[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const offsetRef = useRef<number>(0);
  const limit = 50; // Reducir límite por si las verificaciones paralelas son pesadas
  const [hasMore, setHasMore] = useState<boolean>(true); // Asumir que hay más al inicio

  const fetchDocuments = useCallback(async (reset: boolean = true) => {
    if (isAuthLoading || !user?.userId || !user?.companyId) {
      if (!isAuthLoading) {
        setDocuments([]); setIsLoading(false); setError(null); setHasMore(false);
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
      const currentOffset = reset ? 0 : offsetRef.current;
      const data = await getDocumentStatusList(authHeaders, limit, currentOffset);

      // Actualizar estado de paginación
      setHasMore(data.length === limit);
      offsetRef.current = currentOffset + data.length; // Actualizar offset correctamente

      // Actualizar documentos (reemplazar o añadir)
      setDocuments(prev => reset ? data : [...prev, ...data]);

    } catch (err: any) {
      const errorMessage = err instanceof ApiError ? err.message : (err.message || 'Error al cargar la lista de documentos.');
      setError(errorMessage);
      // Mantener documentos existentes en caso de error al cargar más? O limpiar? Por ahora limpiamos.
      if(reset) setDocuments([]);
      setHasMore(false); // Asumir que no hay más si hay error
    } finally {
      setIsLoading(false);
    }
  }, [user, isAuthLoading]); // Dependencias correctas

  // Carga inicial
  useEffect(() => {
    if (user?.userId && user?.companyId) { // Solo llamar si hay usuario
        fetchDocuments(true);
    } else if (!isAuthLoading) { // Si auth terminó y no hay usuario, limpiar
        setDocuments([]);
        setIsLoading(false);
        setError(null);
        setHasMore(false);
    }
  }, [user, isAuthLoading, fetchDocuments]); // Depender también de fetchDocuments

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
    if (!isLoading && hasMore) {
      fetchDocuments(false); // Llamar con reset=false para añadir, no reemplazar
    }
  }, [fetchDocuments, isLoading, hasMore]);

  // --- CORRECCIÓN: Pasar authHeaders a getDocumentStatus ---
  const refreshDocument = useCallback(async (documentId: string) => {
    if (!user?.userId || !user?.companyId) {
        console.error("Cannot refresh document: user or company ID missing.");
        return;
    }
    const authHeaders: AuthHeaders = {
        'X-User-ID': user.userId,
        'X-Company-ID': user.companyId,
      };
    try {
      // Pasar authHeaders como segundo argumento
      const updated = await getDocumentStatus(documentId, authHeaders);
      // Actualizar el documento específico en la lista
      setDocuments(prev => prev.map(doc => doc.document_id === documentId ? updated : doc));
    } catch (error){
      console.error(`Failed to refresh status for document ${documentId}:`, error);
      // Opcional: mostrar toast de error
      // toast.error("Error al refrescar estado", { description: error instanceof Error ? error.message : "Error desconocido" });
    }
  }, [user]); // Añadir user como dependencia

  const deleteLocalDocument = useCallback((documentId: string) => {
    setDocuments(prev => prev.filter(doc => doc.document_id !== documentId));
    // Recalcular si hay más después de eliminar? Podría ser complejo.
    // Por ahora, el usuario puede hacer clic en "Cargar más" si es necesario.
  }, []);

  return { documents, isLoading, error, fetchDocuments, fetchMore, hasMore, retryLocalUpdate, refreshDocument, deleteLocalDocument };
}