// File: lib/hooks/useDocumentStatuses.ts (SIMULADO - Solo Frontend)
import { useState, useEffect, useCallback, useRef } from 'react';
import {
    DocumentStatusResponse,
    DetailedDocumentStatusResponse,
    AuthHeaders,
} from '@/lib/api';
import { useAuth } from '@/lib/hooks/useAuth';
import { toast } from 'sonner';

const DEFAULT_LIMIT = 30;

interface UseDocumentStatusesReturn {
  documents: DocumentStatusResponse[];
  isLoading: boolean;
  error: string | null;
  fetchDocuments: (reset?: boolean) => Promise<void>;
  fetchMore: () => void;
  hasMore: boolean;
  retryLocalUpdate: (documentId: string) => void;
  refreshDocument: (documentId: string) => Promise<void>;
  deleteLocalDocument: (documentId: string) => void;
  addDocument: (file: File, documentId: string) => void; // Nueva función para agregar documentos simulados
}

//Simulación de documentos iniciales
const generateMockDocuments = (): DocumentStatusResponse[] => {
  const mockDocs: DocumentStatusResponse[] = [
    {
      document_id: 'doc_example_001',
      file_name: 'Manual_Usuario.pdf',
      status: 'processed',
      chunk_count: 25,
      milvus_chunk_count: 25,
      created_at: new Date(Date.now() - 3600000).toISOString(), // 1 hora atrás
      error_message: null,
      file_type: 'application/pdf'
    },
    {
      document_id: 'doc_example_002',
      file_name: 'Politicas_Empresa.docx',
      status: 'processed',
      chunk_count: 18,
      milvus_chunk_count: 18,
      created_at: new Date(Date.now() - 7200000).toISOString(), // 2 horas atrás
      error_message: null,
      file_type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    },
    {
      document_id: 'doc_example_003',
      file_name: 'Datos_Financieros.xlsx',
      status: 'error',
      chunk_count: 0,
      milvus_chunk_count: 0,
      created_at: new Date(Date.now() - 1800000).toISOString(), // 30 min atrás
      error_message: 'Error en el procesamiento: Formato no compatible',
      file_type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    }
  ];
  
  return mockDocs;
};

export function useDocumentStatuses(): UseDocumentStatusesReturn {
  const { user, isLoading: isAuthLoading } = useAuth();
  const [documents, setDocuments] = useState<DocumentStatusResponse[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const offsetRef = useRef<number>(0);
  const [hasMore, setHasMore] = useState<boolean>(false);
  const isFetchingRef = useRef<boolean>(false);

  const fetchDocuments = useCallback(async (reset: boolean = false) => {
    if (isFetchingRef.current || isAuthLoading || !user?.userId || !user?.companyId) {
      if (!isAuthLoading && !user?.userId) {
        setDocuments([]); 
        setIsLoading(false); 
        setError(null); 
        setHasMore(false);
      }
      return;
    }
    
    isFetchingRef.current = true; 
    setIsLoading(true); 
    setError(null);

    try {
      // Simular carga con delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      if (reset) {
        // Cargar documentos mock iniciales
        const mockDocs = generateMockDocuments();
        setDocuments(mockDocs);
        offsetRef.current = mockDocs.length;
        setHasMore(false); // No hay más documentos en la simulación
      }
    } catch (err: any) {
      const errorMessage = 'Error simulado al cargar la lista de documentos.';
      setError(errorMessage); 
      setHasMore(false);
    } finally {
      setIsLoading(false); 
      isFetchingRef.current = false;
    }
  }, [user, isAuthLoading]);

  useEffect(() => {
    if (user?.userId && user?.companyId) {
      fetchDocuments(true);
    } else if (!isAuthLoading && !user?.userId) {
      setDocuments([]); 
      setIsLoading(false); 
      setError(null); 
      setHasMore(false);
    }
  }, [user?.userId, user?.companyId, isAuthLoading, fetchDocuments]);

  const retryLocalUpdate = useCallback((documentId: string) => {
    setDocuments(prevDocs =>
      prevDocs.map(doc =>
        doc.document_id === documentId
          ? { ...doc, status: 'processing', error_message: null }
          : doc
      )
    );
    
    // Simular proceso y cambio a 'processed' después de 2 segundos
    setTimeout(() => {
      setDocuments(prevDocs =>
        prevDocs.map(doc =>
          doc.document_id === documentId
            ? { 
                ...doc, 
                status: 'processed', 
                chunk_count: Math.floor(Math.random() * 30) + 5,
                milvus_chunk_count: Math.floor(Math.random() * 30) + 5,
                error_message: null 
              }
            : doc
        )
      );
      toast.success("Documento Procesado", {
        description: "El documento ha sido procesado exitosamente.",
      });
    }, 2000);
  }, []);

  const fetchMore = useCallback(() => {
    if (!isLoading && hasMore && !isFetchingRef.current) {
      fetchDocuments(false);
    }
  }, [fetchDocuments, isLoading, hasMore]);

  const refreshDocument = useCallback(async (documentId: string) => {
    if (!user?.userId || !user?.companyId) {
        console.error("Cannot refresh document: user or company ID missing.");
        toast.error("Error de autenticación", { description: "No se pudo verificar la sesión." }); 
        return;
    }
    
    try {
      // Simular actualización del estado
      await new Promise(resolve => setTimeout(resolve, 300));
      
      setDocuments(prev => prev.map(doc => {
        if (doc.document_id === documentId) {
          // Simular cambio aleatorio de estado para demostrar funcionalidad
          const statuses = ['processing', 'processed', 'error'];
          const randomStatus = statuses[Math.floor(Math.random() * statuses.length)] as any;
          return {
            ...doc,
            status: randomStatus,
            error_message: randomStatus === 'error' ? 'Error simulado durante actualización' : null
          };
        }
        return doc;
      }));
      
      toast.success("Estado Actualizado", {
        description: "El estado del documento ha sido actualizado.",
      });
    } catch (error){
      console.error(`Failed to refresh status for document ${documentId}:`, error);
      toast.error("Error al refrescar estado", { 
        description: "Error simulado durante la actualización" 
      });
    }
  }, [user]);

  const deleteLocalDocument = useCallback((documentId: string) => {
    setDocuments(prev => prev.filter(doc => doc.document_id !== documentId));
    toast.success("Documento Eliminado", {
      description: "El documento ha sido eliminado de la lista.",
    });
  }, []);
  // Nueva función para agregar documentos cuando se suben
  const addDocument = useCallback((file: File, documentId: string) => {
    const newDocument: DocumentStatusResponse = {
      document_id: documentId,
      file_name: file.name,
      status: 'processing',
      chunk_count: 0,
      milvus_chunk_count: 0,
      created_at: new Date().toISOString(),
      error_message: null,
      file_type: file.type || 'application/octet-stream'
    };

    setDocuments(prev => [newDocument, ...prev]);

    // Simular cambio a 'processed' después de 2 segundos
    setTimeout(() => {
      setDocuments(prev =>
        prev.map(doc =>
          doc.document_id === documentId
            ? { 
                ...doc, 
                status: 'processed',
                chunk_count: Math.floor(Math.random() * 25) + 5,
                milvus_chunk_count: Math.floor(Math.random() * 25) + 5
              }
            : doc
        )
      );
      toast.success("Documento Procesado", {
        description: `"${file.name}" ha sido procesado exitosamente.`,
      });
    }, 2000);
  }, []);

  return { 
    documents, 
    isLoading, 
    error, 
    fetchDocuments, 
    fetchMore, 
    hasMore, 
    retryLocalUpdate, 
    refreshDocument, 
    deleteLocalDocument,
    addDocument
  };
}