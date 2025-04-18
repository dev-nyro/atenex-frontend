// File: components/knowledge/file-uploader.tsx (MODIFICADO - Iteración 4.1)
"use client";

import React, { useState, useCallback, useEffect } from 'react';
import { useDropzone, FileRejection } from 'react-dropzone';
import { Button } from '@/components/ui/button';
// Progress ya no se usa directamente aquí
import { toast } from 'sonner';
import { UploadCloud, File as FileIcon, X, Loader2, CheckCircle2, AlertTriangle } from 'lucide-react'; // Añadidos iconos
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge'; // Para mostrar tipo archivo

// Tipos de archivo aceptados
const acceptedFileTypes = {
  'application/pdf': ['.pdf'],
  'application/msword': ['.doc'],
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
  'text/plain': ['.txt'],
  'text/markdown': ['.md', '.markdown'],
  'text/html': ['.html', '.htm'],
};
// Lista para mostrar al usuario
const allowedExtensions = Object.values(acceptedFileTypes).flat().map(ext => ext.substring(1).toUpperCase()).join(', ');

interface FileUploaderProps {
  authHeaders: import('@/lib/api').AuthHeaders;
  onUploadFile: (file: File, authHeaders: import('@/lib/api').AuthHeaders) => Promise<boolean>;
  isUploading: boolean;
  uploadError: string | null;
  clearUploadStatus: () => void;
}

export function FileUploader({
    authHeaders,
    onUploadFile,
    isUploading,
    uploadError,
    clearUploadStatus
}: FileUploaderProps) {
  const [file, setFile] = useState<File | null>(null);
  const [dropzoneError, setDropzoneError] = useState<string | null>(null);
  const [localUploadSuccess, setLocalUploadSuccess] = useState<boolean | null>(null); // Para feedback visual post-subida

  useEffect(() => {
    setDropzoneError(null);
    setLocalUploadSuccess(null); // Limpiar éxito/error visual si cambia el archivo
    if (uploadError) {
        // No limpiar el error de subida automáticamente, dejar que el usuario lo vea
    }
  }, [file]); // Solo depende del archivo seleccionado

  const onDrop = useCallback((acceptedFiles: File[], fileRejections: FileRejection[]) => {
    setDropzoneError(null);
    setLocalUploadSuccess(null);
    clearUploadStatus(); // Limpiar error de subida previo
    setFile(null);

    if (fileRejections.length > 0) {
        const firstRejection = fileRejections[0];
        const errorMessages = firstRejection.errors.map((e) => e.message).join(', ');
        let customError = `Error: ${errorMessages}`;
        if (firstRejection.errors.some((e) => e.code === 'file-invalid-type')) {
             customError = `Tipo de archivo no permitido. Permitidos: ${allowedExtensions}.`;
        } else if (firstRejection.errors.some((e) => e.code === 'file-too-large')) {
            customError = `El archivo es demasiado grande (límite no especificado).`; // TODO: Añadir límite si se conoce
        }
        setDropzoneError(customError);
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
    disabled: isUploading,
  });

  const handleUploadClick = async () => {
    if (!file || !authHeaders || isUploading) return;
    setLocalUploadSuccess(null); // Resetear estado visual

    const success = await onUploadFile(file, authHeaders);
    setLocalUploadSuccess(success); // Guardar estado de éxito/fallo para UI
    if (success) {
        setFile(null); // Limpiar selección si fue exitosa
    }
    // Los toasts son manejados por el hook useUploadDocument
  };

  const removeFile = () => {
    setFile(null);
    setDropzoneError(null);
    setLocalUploadSuccess(null);
    clearUploadStatus(); // Limpiar cualquier error de subida previo
  }

  // Combinar error del dropzone y del hook de subida
  const displayError = dropzoneError || uploadError;

  return (
    <div className="space-y-4">
      {/* Dropzone Area */}
      <div
        {...getRootProps()}
        className={cn(
            `relative flex flex-col items-center justify-center p-6 border-2 border-dashed rounded-lg text-center transition-colors duration-200 ease-in-out`,
            isUploading
                ? 'cursor-not-allowed bg-muted/30 border-muted/50 text-muted-foreground'
                : 'cursor-pointer border-muted-foreground/30 hover:border-primary/50 hover:bg-accent/50 dark:hover:bg-accent/10',
            isDragActive ? 'border-primary bg-primary/10 border-solid' : '',
            displayError ? 'border-destructive bg-destructive/5 border-solid' : '', // Estilo error más claro
            localUploadSuccess === true ? 'border-green-500 bg-green-500/10 border-solid' : '', // Estilo éxito
            localUploadSuccess === false && !displayError ? 'border-destructive bg-destructive/5 border-solid' : '' // Estilo fallo (si no hay otro error)
        )}
      >
        <input {...getInputProps()} disabled={isUploading} />

        {/* Icono central */}
        <div className={cn("mb-2 transition-transform duration-200", isDragActive ? "scale-110" : "")}>
            {localUploadSuccess === true && <CheckCircle2 className="h-10 w-10 text-green-600" />}
            {localUploadSuccess === false && !displayError && <AlertTriangle className="h-10 w-10 text-destructive" />}
            {displayError && <AlertTriangle className="h-10 w-10 text-destructive" />}
            {localUploadSuccess === null && !displayError && <UploadCloud className={cn("h-10 w-10", isUploading ? "text-muted-foreground/60" : "text-muted-foreground/80")} />}
        </div>

        {/* Texto del Dropzone */}
        {isDragActive ? (
          <p className="text-sm font-medium text-primary">Suelta el archivo aquí...</p>
        ) : (
          <p className={cn("text-sm", isUploading ? "text-muted-foreground/80" : "text-foreground/90")}>
            Arrastra y suelta un archivo, o{' '}
            <span className="font-medium text-primary underline underline-offset-2">haz clic para seleccionar</span>
            <span className="mt-1 block text-xs text-muted-foreground">(Permitidos: {allowedExtensions})</span>
          </p>
        )}
      </div>

      {/* Mensaje de Error (si existe) */}
      {displayError && <p className="text-sm text-destructive px-1 flex items-center gap-1.5"><AlertTriangle className="h-4 w-4"/>{displayError}</p>}

      {/* Preview del Archivo Seleccionado */}
      {file && (
        <div className="p-3 border rounded-lg flex items-center justify-between space-x-3 bg-muted/40">
            <div className="flex items-center space-x-3 overflow-hidden">
                 <FileIcon className="h-5 w-5 flex-shrink-0 text-primary" />
                 <div className='flex flex-col min-w-0'>
                    <span className="text-sm font-medium truncate" title={file.name}>{file.name}</span>
                    <span className="text-xs text-muted-foreground">({(file.size / 1024).toFixed(1)} KB) - <Badge variant="outline" className='ml-1 py-0 px-1'>{file.type || 'desconocido'}</Badge></span>
                 </div>
            </div>
          <Button variant="ghost" size="icon" className="h-7 w-7 text-muted-foreground hover:text-destructive hover:bg-destructive/10" onClick={removeFile} aria-label="Quitar archivo" disabled={isUploading}>
            <X className="h-4 w-4" />
          </Button>
        </div>
      )}

      {/* Botón de Subida */}
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
         ) : 'Subir y Procesar Archivo'}
      </Button>
    </div>
  );
}