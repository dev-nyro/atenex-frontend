// File: components/knowledge/file-uploader.tsx (MODIFICADO)
"use client";

import React, { useState, useCallback, useEffect } from 'react';
import { useDropzone, FileRejection } from 'react-dropzone'; // Importar FileRejection
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress'; // Progress podría usarse si el hook diera progreso
import { toast } from 'sonner';
import { UploadCloud, File as FileIcon, X, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

// Tipos de archivo aceptados (sin cambios)
const acceptedFileTypes = {
  'application/pdf': ['.pdf'],
  'application/msword': ['.doc'],
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
  'text/plain': ['.txt'],
  'text/markdown': ['.md', '.markdown'],
  'text/html': ['.html', '.htm'],
};

interface FileUploaderProps {
  authHeaders: import('@/lib/api').AuthHeaders; // Necesario para pasarlo a uploadFile
  onUploadFile: (file: File, authHeaders: import('@/lib/api').AuthHeaders) => Promise<boolean>; // Función del hook
  isUploading: boolean; // Estado de carga del hook
  uploadError: string | null; // Error del hook
  clearUploadStatus: () => void; // Función para limpiar estado del hook
}

export function FileUploader({
    authHeaders,
    onUploadFile,
    isUploading,
    uploadError,
    clearUploadStatus
}: FileUploaderProps) {
  const [file, setFile] = useState<File | null>(null);
  const [dropzoneError, setDropzoneError] = useState<string | null>(null); // Error específico del dropzone

  // Limpiar errores cuando el archivo cambia o se quita
  useEffect(() => {
    setDropzoneError(null); // Limpiar error del dropzone si cambia el archivo
    if (uploadError) {
        // Opcional: Limpiar error de subida del hook si el usuario interactúa de nuevo
        // clearUploadStatus();
    }
  }, [file, uploadError, clearUploadStatus]);

  const onDrop = useCallback((acceptedFiles: File[], fileRejections: FileRejection[]) => {
    setDropzoneError(null); // Limpiar error previo del dropzone
    clearUploadStatus(); // Limpiar error previo de subida del hook
    setFile(null); // Limpiar selección previa

    if (fileRejections.length > 0) {
        const firstRejection = fileRejections[0];
        const errorMessages = firstRejection.errors.map((e) => e.message).join(', ');
        let customError = `Error: ${errorMessages}`;
        if (firstRejection.errors.some((e) => e.code === 'file-invalid-type')) {
             customError = `Tipo de archivo no permitido. Permitidos: PDF, DOC, DOCX, TXT, MD, HTML.`;
        } else if (firstRejection.errors.some((e) => e.code === 'file-too-large')) {
            customError = `El archivo es demasiado grande.`;
        }
        setDropzoneError(customError); // Mostrar error del dropzone
        // No usamos toast aquí, el error se muestra en la UI
        return;
    }

    if (acceptedFiles.length > 0) {
      setFile(acceptedFiles[0]);
    }
  }, [clearUploadStatus]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: acceptedFileTypes,
    multiple: false,
    disabled: isUploading, // Deshabilitar dropzone mientras se sube
  });

  const handleUploadClick = async () => {
    if (!file || !authHeaders || isUploading) return;

    const success = await onUploadFile(file, authHeaders);
    if (success) {
        setFile(null); // Limpiar selección solo si la subida fue exitosa (no error 409)
    }
    // El hook `useUploadDocument` se encarga de las notificaciones toast
  };

  const removeFile = () => {
    setFile(null);
    setDropzoneError(null); // Limpiar error del dropzone al quitar archivo
    clearUploadStatus(); // Limpiar error de subida del hook al quitar archivo
  }

  // Combinar error del dropzone y del hook de subida
  const displayError = dropzoneError || uploadError;

  return (
    <div className="space-y-4">
      <div
        {...getRootProps()}
        className={cn(`p-6 border-2 border-dashed rounded-md text-center transition-colors`,
            isUploading ? 'cursor-not-allowed bg-muted/50 border-muted/30' : 'cursor-pointer',
            isDragActive ? 'border-primary bg-primary/10' : 'border-muted-foreground/50 hover:border-primary/70',
            displayError ? 'border-destructive' : ''
        )}
      >
        <input {...getInputProps()} disabled={isUploading} />
        <UploadCloud className={cn("mx-auto h-10 w-10 mb-2", isUploading ? "text-muted-foreground/50" : "text-muted-foreground")} />
        {isDragActive ? (
          <p>Suelta el archivo aquí...</p>
        ) : (
          <p className={cn(isUploading ? "text-muted-foreground/80" : "")}>
            Arrastra y suelta un archivo, o haz clic para seleccionar
            <span className="block text-xs text-muted-foreground mt-1">(PDF, DOC, DOCX, TXT, MD, HTML)</span>
          </p>
        )}
      </div>

      {/* Mostrar error (del dropzone o de la subida) */}
      {displayError && <p className="text-sm text-destructive px-1">{displayError}</p>}

      {file && (
        <div className="p-3 border rounded-md flex items-center justify-between space-x-2">
            <div className="flex items-center space-x-2 overflow-hidden">
                 <FileIcon className="h-5 w-5 flex-shrink-0 text-muted-foreground" />
                 <span className="text-sm truncate" title={file.name}>{file.name}</span>
                 <span className="text-xs text-muted-foreground">({(file.size / 1024).toFixed(1)} KB)</span>
            </div>
          {/* Permitir quitar archivo incluso si está subiendo (cancela la subida implícitamente) */}
          <Button variant="ghost" size="sm" onClick={removeFile} aria-label="Quitar archivo" disabled={isUploading}>
            <X className="h-4 w-4" />
          </Button>
        </div>
      )}

      {/* Ya no se muestra la barra de progreso aquí, el toast de carga lo indica */}
      {/* {isUploading && ( <Progress value={uploadProgress} className="w-full" /> )} */}

      <Button
        onClick={handleUploadClick}
        disabled={!file || isUploading}
        className="w-full"
      >
        {isUploading ? (
            <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Subiendo...
            </>
         ) : 'Subir Archivo'}
      </Button>
    </div>
  );
}