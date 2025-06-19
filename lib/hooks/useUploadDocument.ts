// File: lib/hooks/useUploadDocument.ts (SIMULADO - Solo Frontend)
import { useState, useCallback } from 'react';
import { IngestResponse, AuthHeaders } from '@/lib/api';
import { toast } from 'sonner'; // Para notificaciones

interface UseUploadDocumentReturn {
  isUploading: boolean;
  uploadError: string | null;
  uploadResponse: IngestResponse | null;
  uploadFile: (file: File, authHeaders: AuthHeaders) => Promise<boolean>; // Devuelve boolean indicando éxito
  clearUploadStatus: () => void; // Para limpiar el estado después de mostrar error/éxito
}

/**
 * Hook personalizado SIMULADO para manejar la subida de documentos.
 * Todo es simulado en el frontend - no hace llamadas reales al backend.
 * @param onSuccess - Callback opcional a ejecutar tras una subida exitosa.
 * @returns Objeto con el estado y la función de subida.
 */
export function useUploadDocument(onSuccess?: (response: IngestResponse) => void): UseUploadDocumentReturn {
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [uploadResponse, setUploadResponse] = useState<IngestResponse | null>(null);

  const uploadFile = useCallback(async (file: File, authHeaders: AuthHeaders): Promise<boolean> => {
    setIsUploading(true);
    setUploadError(null);
    setUploadResponse(null);
    const toastId = toast.loading(`Subiendo archivo "${file.name}"...`); // Notificación de carga

    try {
      // Simular la subida del archivo
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simular 1 segundo de subida      // Crear respuesta simulada
      const mockResponse: IngestResponse = {
        document_id: `doc_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        task_id: `task_${Date.now()}`,
        status: 'processing',
        message: 'Documento recibido y en cola para procesamiento'
      };

      setUploadResponse(mockResponse);
      toast.success("Archivo Subido", {
        id: toastId,
        description: `"${file.name}" ha sido puesto en cola para procesamiento.`,
      });
      
      if (onSuccess) {
        onSuccess(mockResponse);
      }
      
      setIsUploading(false);
      return true; // Indica éxito
    } catch (err: any) {
      // En la simulación, esto no debería ocurrir, pero mantenemos el manejo por consistencia
      const errorMessage = 'Error simulado al subir el documento.';
      setUploadError(errorMessage);
      setUploadResponse(null);
      toast.error("Error al Subir", {
        id: toastId,
        description: errorMessage,
      });
      setIsUploading(false);
      return false; // Indica fallo
    }
  }, [onSuccess]);

  // Función para limpiar el estado de error/respuesta (útil después de mostrar el error)
  const clearUploadStatus = useCallback(() => {
    setUploadError(null);
    setUploadResponse(null);
  }, []);

  return { isUploading, uploadError, uploadResponse, uploadFile, clearUploadStatus };
}