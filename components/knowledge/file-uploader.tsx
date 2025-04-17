// File: components/knowledge/file-uploader.tsx
"use client";

import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { toast } from 'sonner';
import { uploadDocument } from '@/lib/api';
import { UploadCloud, File as FileIcon, X } from 'lucide-react';

const acceptedFileTypes = {
  'application/pdf': ['.pdf'],
  'application/msword': ['.doc'],
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
  'text/plain': ['.txt'],
  'text/markdown': ['.md', '.markdown'],
  'text/html': ['.html', '.htm'],
};

interface FileUploaderProps {
  authHeaders: import('@/lib/api').AuthHeaders;
  onUploadSuccess: () => void;
}

export function FileUploader({ authHeaders, onUploadSuccess }: FileUploaderProps) {
  const [file, setFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const onDrop = useCallback((acceptedFiles: File[], fileRejections: any[]) => {
    setError(null);
    setFile(null);

    if (fileRejections.length > 0) {
        const firstRejection = fileRejections[0];
        const errorMessages = firstRejection.errors.map((e: any) => e.message).join(', ');
        let customError = `Error: ${errorMessages}`;
        if (firstRejection.errors.some((e:any) => e.code === 'file-invalid-type')) {
             customError = `Tipo de archivo no permitido. Permitidos: PDF, DOC, DOCX, TXT, MD, HTML.`;
        } else if (firstRejection.errors.some((e:any) => e.code === 'file-too-large')) {
            customError = `El archivo es demasiado grande.`; // Añadir límite si se especifica
        }
        setError(customError);
        toast.error("Archivo no válido", { description: customError }); // Toast traducido
        return;
    }

    if (acceptedFiles.length > 0) {
      setFile(acceptedFiles[0]);
      setUploadProgress(0);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: acceptedFileTypes,
    multiple: false,
  });

  const handleUpload = async () => {
    if (!file || !authHeaders) return;

    setIsUploading(true);
    setError(null);
    setUploadProgress(0);

    const progressInterval = setInterval(() => {
        setUploadProgress((prev) => (prev >= 95 ? 95 : prev + 5));
    }, 200);

    try {
      const result = await uploadDocument(file, authHeaders);
      clearInterval(progressInterval);
      setUploadProgress(100);
      // Toast traducido
      toast.success("Archivo Subido", { description: `Archivo "${file.name}" subido. Estado: ${result.status || 'recibido'}.` });
      setFile(null);
      onUploadSuccess();
    } catch (err: any) {
       clearInterval(progressInterval);
       setUploadProgress(0);
       const errorMessage = err.message || 'Ocurrió un error al subir el archivo.';
       setError(errorMessage);
       // Toast traducido
       toast.error("Error al Subir", { description: errorMessage });
    } finally {
      setIsUploading(false);
    }
  };

  const removeFile = () => {
    setFile(null);
    setError(null);
    setUploadProgress(0);
    setIsUploading(false);
  }

  return (
    <div className="space-y-4">
      <div
        {...getRootProps()}
        className={`p-6 border-2 border-dashed rounded-md cursor-pointer text-center transition-colors
                    ${isDragActive ? 'border-primary bg-primary/10' : 'border-muted-foreground/50 hover:border-primary/70'}
                    ${error ? 'border-destructive' : ''}`}
      >
        <input {...getInputProps()} />
        <UploadCloud className="mx-auto h-10 w-10 text-muted-foreground mb-2" />
        {isDragActive ? (
          // Texto traducido
          <p>Suelta el archivo aquí...</p>
        ) : (
          // Texto traducido
          <p>Arrastra y suelta un archivo aquí, o haz clic para seleccionar (PDF, DOC, DOCX, TXT, MD, HTML)</p>
        )}
      </div>

      {error && <p className="text-sm text-destructive">{error}</p>}

      {file && (
        <div className="p-3 border rounded-md flex items-center justify-between space-x-2">
            <div className="flex items-center space-x-2 overflow-hidden">
                 <FileIcon className="h-5 w-5 flex-shrink-0 text-muted-foreground" />
                 <span className="text-sm truncate" title={file.name}>{file.name}</span>
                 <span className="text-xs text-muted-foreground">({(file.size / 1024).toFixed(1)} KB)</span>
            </div>
          {!isUploading && (
             // aria-label traducido
             <Button variant="ghost" size="sm" onClick={removeFile} aria-label="Quitar archivo">
                <X className="h-4 w-4" />
             </Button>
          )}
        </div>
      )}

      {isUploading && (
        <Progress value={uploadProgress} className="w-full" />
      )}

      <Button
        onClick={handleUpload}
        disabled={!file || isUploading}
        className="w-full"
      >
        {/* Texto traducido */}
        {isUploading ? 'Subiendo...' : 'Subir Archivo'}
      </Button>
    </div>
  );
}