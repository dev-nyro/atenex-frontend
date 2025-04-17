// File: atenex-frontend/components/knowledge/file-uploader.tsx
"use client";

import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input'; // Assuming Input is used or needed elsewhere
import { Progress } from '@/components/ui/progress';
import { toast } from 'sonner'; // Using sonner for notifications
import { uploadDocument } from '@/lib/api'; // Import the API function
import { UploadCloud, File as FileIcon, X } from 'lucide-react';

// Define accepted file types based on backend documentation
const acceptedFileTypes = {
  'application/pdf': ['.pdf'],
  'application/msword': ['.doc'],
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
  'text/plain': ['.txt'],
  'text/markdown': ['.md', '.markdown'], // Added .markdown as common extension
  'text/html': ['.html', '.htm'],
};

interface FileUploaderProps {
  onUploadSuccess: () => void; // Callback to refresh list on success
}

export function FileUploader({ onUploadSuccess }: FileUploaderProps) {
  const [file, setFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState<number>(0); // Example progress state
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const onDrop = useCallback((acceptedFiles: File[], fileRejections: any[]) => {
    setError(null); // Clear previous errors
    setFile(null); // Clear previous file selection

    if (fileRejections.length > 0) {
        // Show specific error for rejected files (type, size etc.)
        const firstRejection = fileRejections[0];
        const errorMessages = firstRejection.errors.map((e: any) => e.message).join(', ');
        // Customize message based on error code if needed
        if (firstRejection.errors.some((e:any) => e.code === 'file-invalid-type')) {
             setError(`Tipo de archivo no permitido. Permitidos: PDF, DOC, DOCX, TXT, MD, HTML.`);
        } else {
             setError(`Error: ${errorMessages}`);
        }
        toast.error(error || "Error al seleccionar el archivo."); // Show toast as well
        return;
    }

    if (acceptedFiles.length > 0) {
      setFile(acceptedFiles[0]);
      setUploadProgress(0); // Reset progress
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: acceptedFileTypes,
    multiple: false, // Allow only single file upload
    // Add size limits if necessary
    // maxSize: MAX_FILE_SIZE_BYTES,
  });

  const handleUpload = async () => {
    if (!file) return;

    setIsUploading(true);
    setError(null);
    setUploadProgress(0); // Start progress simulation or actual tracking if available

    // Simulate progress for demo purposes if no real progress tracking
    const progressInterval = setInterval(() => {
        setUploadProgress((prev) => (prev >= 95 ? 95 : prev + 5));
    }, 200);


    try {
      const result = await uploadDocument(file);
      clearInterval(progressInterval); // Stop simulation
      setUploadProgress(100); // Mark as complete
      toast.success(`Archivo "${file.name}" subido correctamente. Estado: ${result.status || 'recibido'}.`);
      setFile(null); // Clear selection on success
      onUploadSuccess(); // Trigger list refresh
    } catch (err: any) {
       clearInterval(progressInterval); // Stop simulation on error
       setUploadProgress(0); // Reset progress
       const errorMessage = err.message || 'Ocurrió un error al subir el archivo.';
       setError(errorMessage);
       toast.error(errorMessage); // Show specific error from API or generic
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
          <p>Suelta el archivo aquí...</p>
        ) : (
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
        {isUploading ? 'Subiendo...' : 'Subir Archivo'}
      </Button>
    </div>
  );
}