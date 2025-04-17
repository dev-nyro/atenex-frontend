\
'use client'; // Required for hooks and client-side interactions

import React, { useState, useEffect, useCallback } from 'react';
import { FileUploader } from '@/components/knowledge/file-uploader';
import { DocumentStatusList } from '@/components/knowledge/document-status-list';
import { getDocumentStatusList } from '@/lib/api'; // Import API function
import { Skeleton } from '@/components/ui/skeleton'; // For loading state

// Define la interfaz para el tipo de documento esperado (debe coincidir con la de DocumentStatusList)
interface Document {
  id: string;
  name: string;
  status: 'uploaded' | 'processing' | 'processed' | 'error';
  error_message?: string | null;
  created_at: string;
}

export default function KnowledgePage() {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Función para cargar o refrescar la lista de documentos
  const fetchDocuments = useCallback(async () => {
    // setIsLoading(true); // Opcional: mostrar carga en cada refresh
    setError(null);
    try {
      const data = await getDocumentStatusList();
      // Asegurarse de que data es un array antes de hacer set
      setDocuments(Array.isArray(data) ? data : []);
    } catch (err: any) {
      setError(err.message || 'Error al cargar la lista de documentos.');
      setDocuments([]); // Limpiar documentos en caso de error
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Carga inicial de documentos
  useEffect(() => {
    fetchDocuments();
  }, [fetchDocuments]);

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


  return (
    <div className="container mx-auto p-4 md:p-6 space-y-6">
      <h1 className="text-2xl font-semibold">Gestionar Base de Conocimiento</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <h2 className="text-lg font-medium mb-3">Subir Nuevo Documento</h2>
          <FileUploader onUploadSuccess={handleUploadSuccess} />
        </div>

        <div className="lg:col-span-2">
          <h2 className="text-lg font-medium mb-3">Documentos Subidos</h2>
          {error && <p className="text-destructive mb-4">Error: {error}</p>}
          {isLoading ? (
             <div className="space-y-2">
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-full" />
             </div>
          ) : (
            <DocumentStatusList
              documents={documents}
              isLoading={isLoading} // Pasa el estado de carga real
              onRetrySuccess={handleRetrySuccess}
            />
          )}
        </div>
      </div>
    </div>
  );
}