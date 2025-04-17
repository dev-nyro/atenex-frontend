import { useState, useCallback } from 'react';
import { uploadDocument, IngestResponse, AuthHeaders, ApiError } from '@/lib/api';

interface UseUploadDocumentReturn {
  isUploading: boolean;
  uploadError: string | null;
  uploadResponse: IngestResponse | null;
  uploadFile: (file: File, authHeaders: AuthHeaders) => Promise<void>;
}

export function useUploadDocument(onSuccess?: (response: IngestResponse) => void): UseUploadDocumentReturn {
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [uploadResponse, setUploadResponse] = useState<IngestResponse | null>(null);

  const uploadFile = useCallback(async (file: File, authHeaders: AuthHeaders) => {
    setIsUploading(true);
    setUploadError(null);
    setUploadResponse(null);

    try {
      const response = await uploadDocument(file, authHeaders);
      setUploadResponse(response);
      if (onSuccess) {
        onSuccess(response);
      }
    } catch (err: any) {
      let errorMessage = 'Error al subir el documento.';
      if (err instanceof ApiError) {
        // Check for specific 409 Conflict error (duplicate)
        if (err.status === 409) {
          errorMessage = err.message || 'Error: Ya existe un documento con este nombre.'; // Use backend message if available
        } else {
          errorMessage = err.message; // Use the generic ApiError message
        }
      } else if (err.message) {
        errorMessage = err.message;
      }
      setUploadError(errorMessage);
      setUploadResponse(null); // Clear response on error
    } finally {
      setIsUploading(false);
    }
  }, [onSuccess]); // Dependency on onSuccess callback

  return { isUploading, uploadError, uploadResponse, uploadFile };
}
