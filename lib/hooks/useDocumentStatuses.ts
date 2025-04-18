// File: lib/hooks/useDocumentStatuses.ts (REVISADO Y CORREGIDO - Coincide con API y componentes)
import { useState, useEffect, useCallback, useRef } from 'react';
import {
    getDocumentStatusList,
    DocumentStatusResponse,
    DetailedDocumentStatusResponse,
    AuthHeaders,
    ApiError,
    getDocumentStatus
} from '@/lib/api';
import { useAuth } from '@/lib/hooks/useAuth';
import { toast } from 'sonner'; // Para mostrar errores al refrescar

const DEFAULT_LIMIT = 30; // Ajustar límite si es necesario

interface UseDocumentStatusesReturn {
  documents: DocumentStatusResponse[]; // Lista de documentos
  isLoading: boolean; // Estado general de carga (inicial o cargando más)
  error: string | null; // Mensaje de error si falla la carga
  fetchDocuments: (reset?: boolean) => Promise<void>; // Función para (re)cargar documentos
  fetchMore: () => void; // Función para cargar la siguiente página
  hasMore: boolean; // Indica si hay más documentos por cargar
  retryLocalUpdate: (documentId: string) => void; // Actualiza UI para reintento
  refreshDocument: (documentId: string) => Promise<void>; // Refresca un documento individual
  deleteLocalDocument: (documentId: string) => void; // Elimina un documento de la UI local
}

export function useDocumentStatuses(): UseDocumentStatusesReturn {
  const { user, isLoading: isAuthLoading } = useAuth(); // Obtener usuario y estado de auth
  const [documents, setDocuments] = useState<DocumentStatusResponse[]>([]); // Estado para la lista de documentos
  const [isLoading, setIsLoading] = useState<boolean>(true); // Estado de carga general
  const [error, setError] = useState<string | null>(null); // Estado de error
  const offsetRef = useRef<number>(0); // Referencia para el offset de paginación
  const [hasMore, setHasMore] = useState<boolean>(true); // Estado para saber si hay más páginas
  const isFetchingRef = useRef<boolean>(false); // Ref para evitar llamadas concurrentes

  // Función principal para cargar documentos
  const fetchDocuments = useCallback(async (reset: boolean = false) => {
    // Evitar ejecución si ya se está cargando o si no hay usuario/compañía
    if (isFetchingRef.current || isAuthLoading || !user?.userId || !user?.companyId) {
      if (!isAuthLoading && !user?.userId) {
        // Si la autenticación terminó y no hay usuario, limpiar estado
        setDocuments([]); setIsLoading(false); setError(null); setHasMore(false);
      }
      return;
    }

    isFetchingRef.current = true; // Marcar como cargando
    setIsLoading(true); // Activar estado de carga visual
    setError(null); // Limpiar errores previos

    // Preparar headers de autenticación
    const authHeaders: AuthHeaders = {
      'X-User-ID': user.userId,
      'X-Company-ID': user.companyId,
    };

    try {
      const currentOffset = reset ? 0 : offsetRef.current; // Determinar offset
      const data = await getDocumentStatusList(authHeaders, DEFAULT_LIMIT, currentOffset);

      // Actualizar estado de paginación
      setHasMore(data.length === DEFAULT_LIMIT);
      offsetRef.current = currentOffset + data.length; // Incrementar offset

      // Actualizar lista de documentos (reemplazar si reset=true, añadir si reset=false)
      setDocuments(prev => reset ? data : [...prev, ...data]);

    } catch (err: any) {
      const errorMessage = err instanceof ApiError ? err.message : (err.message || 'Error al cargar la lista de documentos.');
      setError(errorMessage);
      // Opcional: limpiar documentos en error, o mantener los actuales
      // if(reset) setDocuments([]);
      setHasMore(false); // Asumir no más páginas si hay error
    } finally {
      setIsLoading(false); // Desactivar estado de carga visual
      isFetchingRef.current = false; // Desmarcar como cargando
    }
  }, [user, isAuthLoading]); // Dependencias: usuario y estado de auth

  // Carga inicial de documentos cuando el usuario esté disponible
  useEffect(() => {
    if (user?.userId && user?.companyId && documents.length === 0) { // Cargar solo si hay usuario y la lista está vacía
        fetchDocuments(true); // reset = true
    } else if (!isAuthLoading && !user?.userId) {
        // Si auth terminó y no hay usuario, asegurar estado limpio
        setDocuments([]);
        setIsLoading(false);
        setError(null);
        setHasMore(false);
    }
    // No incluir fetchDocuments en dependencias para evitar bucles si cambia rápido
  }, [user, isAuthLoading]); // Solo depende del usuario y auth

  // Actualiza la UI localmente cuando se inicia un reintento
  const retryLocalUpdate = useCallback((documentId: string) => {
    setDocuments(prevDocs =>
      prevDocs.map(doc =>
        doc.document_id === documentId
          ? { ...doc, status: 'processing', error_message: null } // Cambiar estado a 'processing'
          : doc
      )
    );
  }, []);

  // Carga la siguiente página de documentos
  const fetchMore = useCallback(() => {
    if (!isLoading && hasMore && !isFetchingRef.current) {
      fetchDocuments(false); // reset = false para añadir
    }
  }, [fetchDocuments, isLoading, hasMore]);

  // Refresca el estado de un documento individual desde la API
  const refreshDocument = useCallback(async (documentId: string) => {
    if (!user?.userId || !user?.companyId) {
        console.error("Cannot refresh document: user or company ID missing.");
        toast.error("Error de autenticación", { description: "No se pudo verificar la sesión." });
        return;
    }
    const authHeaders: AuthHeaders = {
        'X-User-ID': user.userId,
        'X-Company-ID': user.companyId,
      };
    try {
      const updatedDoc = await getDocumentStatus(documentId, authHeaders); // Llama a la API
      // Actualiza el documento específico en la lista local
      setDocuments(prev => prev.map(doc => doc.document_id === documentId ? updatedDoc : doc));
      // Opcional: toast de éxito
      // toast.success("Estado Actualizado", { description: `Se actualizó el estado de ${updatedDoc.file_name || documentId}.` });
    } catch (error){
      console.error(`Failed to refresh status for document ${documentId}:`, error);
      toast.error("Error al refrescar estado", { description: error instanceof Error ? error.message : "Error desconocido" });
    }
  }, [user]); // Depende del usuario para los headers

  // Elimina un documento de la lista local (después de confirmación API exitosa)
  const deleteLocalDocument = useCallback((documentId: string) => {
    setDocuments(prev => prev.filter(doc => doc.document_id !== documentId));
    // Nota: No recalcula 'hasMore' aquí para simplificar. Podría ser necesario en casos complejos.
  }, []);

  // Devuelve el estado y las funciones del hook
  return { documents, isLoading, error, fetchDocuments, fetchMore, hasMore, retryLocalUpdate, refreshDocument, deleteLocalDocument };
}