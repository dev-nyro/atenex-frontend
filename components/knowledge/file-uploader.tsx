// File: components/knowledge/file-uploader.tsx (MODIFICADO - Iteración 4.1 -> Refinado Feedback Visual)
"use client";

import React, { useState, useCallback, useEffect } from 'react';
import { useDropzone, FileRejection } from 'react-dropzone';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { UploadCloud, File as FileIcon, X, Loader2, CheckCircle2, AlertTriangle, FileUp } from 'lucide-react'; // FileUp para icono inicial
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge'; // Para mostrar tipo archivo

// Tipos de archivo aceptados (tomados del README Ingest)
const acceptedFileTypes = {
  'application/pdf': ['.pdf'],
  'application/msword': ['.doc'],
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
  'text/plain': ['.txt'],
  'text/markdown': ['.md', '.markdown'], // Añadido .markdown
  'text/html': ['.html', '.htm'],
  // Faltaban en la definición anterior pero mencionados en el video/README
  // 'application/vnd.oasis.opendocument.text': ['.odt'], // Si se soportan
  // 'application/epub+zip': ['.epub'], // Si se soportan
};
const allowedExtensions = Object.values(acceptedFileTypes).flat().map(ext => ext.substring(1).toUpperCase()).join(', ');
const MAX_FILE_SIZE_MB = 50; // Definir un límite (ej. 50MB) - AJUSTAR SEGÚN NECESIDAD
const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024;

interface FileUploaderProps {
  authHeaders: import('@/lib/api').AuthHeaders;
  onUploadFile: (file: File, authHeaders: import('@/lib/api').AuthHeaders) => Promise<boolean>;
  isUploading: boolean; // Estado de carga del hook padre
  uploadError: string | null; // Error del hook padre
  clearUploadStatus: () => void; // Función para limpiar error/éxito del padre
}

export function FileUploader({
    authHeaders,
    onUploadFile,
    isUploading,
    uploadError,
    clearUploadStatus
}: FileUploaderProps) {
  const [files, setFiles] = useState<File[]>([]);
  const [dropzoneError, setDropzoneError] = useState<string | null>(null);
  const [localUploadSuccess, setLocalUploadSuccess] = useState<boolean | null>(null);

  // Efecto para limpiar errores/éxito visual si el archivo cambia o se deselecciona
  useEffect(() => {
    if (files.length === 0) {
      setDropzoneError(null);
      setLocalUploadSuccess(null);
      // No limpiar uploadError aquí, podría ser un error persistente del último intento
    } else {
      // Si se selecciona un NUEVO archivo, limpiar estados visuales y error del padre
      setDropzoneError(null);
      setLocalUploadSuccess(null);
      clearUploadStatus();
    }
  }, [files, clearUploadStatus]);

  // Manejador del Dropzone
  const onDrop = useCallback((acceptedFiles: File[], fileRejections: FileRejection[]) => {
    // Siempre limpiar estados al soltar nuevos archivos
    setDropzoneError(null);
    setLocalUploadSuccess(null);
    clearUploadStatus();
    // setFile(null); // Eliminar referencia obsoleta

    if (fileRejections.length > 0) {
        const rejection = fileRejections[0];
        let msg = rejection.errors.map(e => e.message).join(', ');
        if (rejection.errors.some(e => e.code === 'file-invalid-type')) {
            msg = `Tipo de archivo no válido. Permitidos: ${allowedExtensions}.`;
        } else if (rejection.errors.some(e => e.code === 'file-too-large')) {
            msg = `El archivo supera el límite de ${MAX_FILE_SIZE_MB} MB.`;
        }
        setDropzoneError(msg);
        toast.error("Archivo Rechazado", { description: msg });
        return;
    }

    if (acceptedFiles.length > 0) {
      setFiles(acceptedFiles);
    }
  }, [clearUploadStatus]);

  const { getRootProps, getInputProps, isDragActive, isFocused } = useDropzone({
    onDrop,
    accept: acceptedFileTypes,
    maxSize: MAX_FILE_SIZE_BYTES,
    multiple: true,
    disabled: isUploading, // Deshabilitar dropzone mientras se sube
  });

  // Manejador del click del botón de subida
  // El botón de subir ahora sube todos los archivos, así que esta función ya no se usa

  // Quitar el archivo seleccionado
  const removeFile = () => {
    // setFile(null); // Eliminar referencia obsoleta
  }

  // Determinar el error a mostrar (prioridad al error de subida si existe)
  const displayError = uploadError || dropzoneError;
  // Determinar si el estado visual es de éxito (solo si la subida terminó y fue exitosa)
  const displaySuccess = !isUploading && localUploadSuccess === true;
  // Determinar si el estado visual es de fallo (solo si la subida terminó y falló, y no hay error de dropzone)
  const displayFailure = !isUploading && localUploadSuccess === false && !dropzoneError;

  return (
    <div className="space-y-4">
      {/* Área del Dropzone */}
      <div
        {...getRootProps()}
        className={cn(
            `relative flex flex-col items-center justify-center p-8 border-2 border-dashed rounded-lg text-center transition-all duration-200 ease-in-out min-h-[180px] outline-none`, // Aumentar padding y altura mínima
            // Estilos interactivos (no mientras sube)
            !isUploading && 'cursor-pointer hover:border-primary/50 hover:bg-accent/50 dark:hover:bg-accent/10',
            !isUploading && (isDragActive || isFocused) && 'border-primary bg-primary/10 border-solid ring-2 ring-primary/30',
            // Estilos de estado (deshabilitado, error, éxito, fallo)
            isUploading && 'cursor-not-allowed bg-muted/30 border-muted/50 text-muted-foreground',
            displayError && 'border-destructive bg-destructive/5 border-solid text-destructive',
            displaySuccess && 'border-green-500 bg-green-500/10 border-solid text-green-700 dark:text-green-400',
            displayFailure && 'border-destructive bg-destructive/5 border-solid text-destructive' // Mismo estilo que error para fallo
        )}
      >
        <input {...getInputProps()} />

        {/* Icono Central Dinámico */}
        <div className="mb-3 transform transition-transform duration-200 ease-in-out motion-safe:hover:scale-105">
            {isUploading && <Loader2 className="h-10 w-10 animate-spin" />}
            {displaySuccess && <CheckCircle2 className="h-10 w-10" />}
            {(displayError || displayFailure) && <AlertTriangle className="h-10 w-10" />}
            {!isUploading && !displaySuccess && !displayError && !displayFailure && (
                 <FileUp className={cn("h-10 w-10", isDragActive ? "text-primary" : "text-muted-foreground/60")} />
            )}
        </div>

        {/* Texto del Dropzone Dinámico */}
        <div className="text-sm max-w-xs">
             {isUploading && <p className="font-medium">Subiendo archivo...</p>}
             {displaySuccess && <p className="font-medium">Archivo puesto en cola exitosamente.</p>}
             {displayError && <p className="font-medium">{displayError}</p>}
             {displayFailure && <p className="font-medium">Fallo la subida del archivo.</p>}

             {/* Texto por defecto / arrastre */}
            {!isUploading && !displaySuccess && !displayError && !displayFailure && (
                isDragActive ? (
                <p className="font-medium text-primary">Suelta el archivo aquí...</p>
                ) : (
                <p className={cn("text-foreground/90")}>
                    Arrastra y suelta un archivo, o{' '}
                    <span className="font-medium text-primary underline underline-offset-2">haz clic para seleccionar</span>
                </p>
                )
            )}
            {/* Siempre mostrar extensiones permitidas y límite (si no hay error/éxito/subida) */}
            {!isUploading && !displaySuccess && !displayError && !displayFailure && (
                <p className="mt-1.5 text-xs text-muted-foreground">
                    (Permitidos: {allowedExtensions}. Máx: {MAX_FILE_SIZE_MB}MB)
                </p>
            )}
        </div>
      </div>

      {/* Preview del Archivo Seleccionado (scrollable, sticky button) */}
      {files.length > 0 && !isUploading && (
        <div className="relative">
          <div className="max-h-56 overflow-y-auto space-y-2 pr-1">
            {files.map(file => (
              <div key={file.name} className="p-3 border rounded-lg flex items-center justify-between space-x-3 bg-muted/40 shadow-sm">
                <div className="flex items-center space-x-3 overflow-hidden flex-1 min-w-0">
                  <FileIcon className="h-5 w-5 flex-shrink-0 text-primary" />
                  <div className='flex flex-col min-w-0'>
                    <span className="text-sm font-medium truncate" title={file.name}>{file.name}</span>
                    <span className="text-xs text-muted-foreground">
                      ({(file.size / 1024 / 1024).toFixed(2)} MB) -
                      <Badge variant="outline" className='ml-1.5 py-0 px-1.5 text-[10px]'>{file.type || 'desconocido'}</Badge>
                    </span>
                  </div>
                </div>
                <Button variant="ghost" size="icon" className="h-7 w-7 text-muted-foreground hover:text-destructive hover:bg-destructive/10 flex-shrink-0" onClick={() => setFiles(files.filter(f => f.name !== file.name))} aria-label="Quitar archivo" disabled={isUploading}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
          {/* Botón sticky al fondo del uploader */}
          <div className="sticky bottom-0 left-0 right-0 z-10 bg-background pt-3 pb-1 flex justify-end">
            <Button
              onClick={async () => {
                for (const file of files) {
                  await onUploadFile(file, authHeaders);
                }
                setFiles([]);
              }}
              disabled={isUploading}
              className="w-full"
            >
              {isUploading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Subiendo...
                </>
              ) : 'Subir y Procesar Archivos'}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}