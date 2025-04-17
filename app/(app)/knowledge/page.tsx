'use client'; // Required for hooks and client-side interactions

import React, { useState, useEffect, useCallback } from 'react';
import { FileUploader } from '@/components/knowledge/file-uploader';
import { DocumentStatusList } from '@/components/knowledge/document-status-list';
import { getDocumentStatusList } from '@/lib/api'; // Import API function
import { Skeleton } from '@/components/ui/skeleton'; // For loading state
import { useAuth } from '@/lib/hooks/useAuth'; // Import useAuth hook
import { AuthHeaders } from '@/lib/api'; // Import AuthHeaders type
import { Loader2 } from 'lucide-react';

// Define la interfaz para el tipo de documento esperado (debe coincidir con la de DocumentStatusList)
interface Document {
  id: string; // Ajustado a 'id' según el componente DocumentStatusList
  name: string; // Ajustado a 'name' según el componente DocumentStatusList
  status: 'uploaded' | 'processing' | 'processed' | 'error';
  error_message?: string | null;
  created_at: string;
}

export default function KnowledgePage() {
  const { user, isLoading: isAuthLoading } = useAuth(); // Get user and auth loading state
  const [documents, setDocuments] = useState<Document[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Función para cargar o refrescar la lista de documentos
  const fetchDocuments = useCallback(async () => {
    if (!user?.userId || !user?.companyId) {
        // No intentar cargar si no hay información de usuario
        // Podrías mostrar un mensaje o simplemente esperar
        if (!isAuthLoading) {
            setError("Información de usuario no disponible. Por favor, inicie sesión.");
            setIsLoading(false);
        }
        return;
    }

    const authHeaders: AuthHeaders = {
        'X-User-ID': user.userId,
        'X-Company-ID': user.companyId,
    };

    // setIsLoading(true); // Opcional: mostrar carga en cada refresh
    setError(null);
    try {
      // Pasar authHeaders a la función API
      const data = await getDocumentStatusList(authHeaders);

      // Mapear la respuesta de la API a la interfaz Document local si es necesario
      // Asumiendo que la respuesta de getDocumentStatusList ya coincide con DocumentStatusResponse
      // y que DocumentStatusList espera algo similar a DocumentStatusResponse
      // Si DocumentStatusList usa la interfaz 'Document', necesitamos mapear:
      const mappedData: Document[] = (Array.isArray(data) ? data : []).map((item: any) => ({
        id: item.document_id, // Mapear document_id a id
        name: item.file_name || 'N/A', // Mapear file_name a name
        status: item.status,
        error_message: item.error_message,
        created_at: item.created_at || new Date().toISOString(), // Usar created_at si existe
      }));

      setDocuments(mappedData);
    } catch (err: any) {
      setError(err.message || 'Error al cargar la lista de documentos.');
      setDocuments([]); // Limpiar documentos en caso de error
    } finally {
      setIsLoading(false);
    }
    // Depender de user para re-ejecutar si cambia
  }, [user, isAuthLoading]);

  // Carga inicial de documentos
  useEffect(() => {
    // Solo empezar a cargar documentos una vez que la autenticación haya terminado y tengamos usuario
    if (!isAuthLoading) {
        setIsLoading(true); // Asegurarse de que isLoading es true antes de llamar a fetchDocuments
        fetchDocuments();
    }
  }, [fetchDocuments, isAuthLoading]);

  // Callback para cuando una subida es exitosa
  const handleUploadSuccess = () => {
    // Refrescar la lista después de un breve retraso para dar tiempo al backend
    setTimeout(fetchDocuments, 1500); // Ajusta el tiempo si es necesario
  };

  // Callback para cuando un reintento es exitoso (iniciado)
  const handleRetrySuccess = (documentId: string) => {
    // Actualizar el estado local del documento a 'processing' inmediatamente para UX
    setDocuments(prevDocs =>
        prevDocs.map(doc =>
            doc.id === documentId ? { ...doc, status: 'processing', error_message: null } : doc
        )
    );
    // Opcionalmente, refrescar toda la lista después de un tiempo para obtener el estado final
    // setTimeout(fetchDocuments, 5000); // Ejemplo: refrescar después de 5s
  };

  // Construir authHeaders aquí también para pasarlo a los hijos
  const authHeadersForChildren: AuthHeaders | null = user?.userId && user?.companyId ? {
    'X-User-ID': user.userId,
    'X-Company-ID': user.companyId,
  } : null;

  // Mostrar estado de carga mientras se verifica la autenticación
  if (isAuthLoading) {
    return (
        <div className="container mx-auto p-4 md:p-6 space-y-6 flex justify-center items-center h-[calc(100vh-100px)]">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            <span className="ml-2">Verificando autenticación...</span>
        </div>
    );
  }

  return (
    <div className="container mx-auto p-4 md:p-6 space-y-6">
      <h1 className="text-2xl font-semibold">Gestionar Base de Conocimiento</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <h2 className="text-lg font-medium mb-3">Subir Nuevo Documento</h2>
          {/* Pasar authHeaders al FileUploader */}
          {authHeadersForChildren ? (
            <FileUploader
                onUploadSuccess={handleUploadSuccess}
                authHeaders={authHeadersForChildren}
            />
          ) : (
            <p className="text-muted-foreground">Inicia sesión para subir documentos.</p>
          )}
        </div>

        <div className="lg:col-span-2">
          <h2 className="text-lg font-medium mb-3">Documentos Subidos</h2>
          {error && <p className="text-destructive mb-4">Error: {error}</p>}
          {/* Usar isLoading (estado local) en lugar de isAuthLoading aquí */}
          {isLoading ? (
             <div className="space-y-2">
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-full" />
             </div>
          ) : (
            /* Pasar authHeaders al DocumentStatusList */
            authHeadersForChildren ? (
                <DocumentStatusList
                  documents={documents}
                  isLoading={false} // Ya hemos manejado la carga principal
                  onRetrySuccess={handleRetrySuccess}
                  authHeaders={authHeadersForChildren}
                />
            ) : (
                !error && <p className="text-muted-foreground">Inicia sesión para ver documentos.</p>
            )
          )}
        </div>
      </div>
    </div>
  );
}