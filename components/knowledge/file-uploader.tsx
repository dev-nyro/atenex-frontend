// File: atenex-frontend/components/knowledge/file-uploader.tsx
"use client";

import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { UploadCloud, FileCheck2, AlertCircle, Loader2, X } from 'lucide-react';
import { uploadDocument, ApiError } from '@/lib/api';
import { toast } from "sonner";
import { Badge } from '@/components/ui/badge';

interface UploadedFileStatus {
    file: File;
    status: 'pending' | 'uploading' | 'success' | 'error';
    progress: number;
    error?: string;
    documentId?: string;
    taskId?: string;
}

// Define tipos MIME soportados basados en la documentación del backend
// (Ajusta si es necesario)
const supportedMimeTypes = {
    'application/pdf': ['.pdf'],
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx'],
    'text/plain': ['.txt'],
    'text/csv': ['.csv'],
    // Añade otros tipos soportados por tu backend
    // 'text/markdown': ['.md'],
    // 'text/html': ['.html', '.htm'],
};

export function FileUploader() {
    const [filesStatus, setFilesStatus] = useState<UploadedFileStatus[]>([]);

    const updateFileStatus = (fileName: string, updates: Partial<Omit<UploadedFileStatus, 'file'>>) => {
        setFilesStatus(prev =>
            prev.map(fs => (fs.file.name === fileName ? { ...fs, ...updates } : fs))
        );
    };

    const onDrop = useCallback((acceptedFiles: File[], fileRejections: any[]) => {
        // Mostrar errores para archivos rechazados (tipo no soportado, tamaño, etc.)
        fileRejections.forEach(({ file, errors }) => {
             const errorMessages = errors.map((e: any) => e.message).join(', ');
             toast.error(`File Rejected: ${file.name}`, {
                 description: errorMessages,
             });
        });


        const newFiles: UploadedFileStatus[] = acceptedFiles.map(file => ({
            file,
            status: 'pending',
            progress: 0,
        }));
        setFilesStatus(prev => [...prev, ...newFiles]);

        newFiles.forEach(async (fileStatus) => {
            const formData = new FormData();
            formData.append('file', fileStatus.file);

            // --- MODIFICACIÓN: Añadir metadata_json al FormData ---
            // Define el objeto de metadatos que quieres enviar
            const metadata = {
                source: 'web-uploader', // Origen de la subida
                uploaded_by: 'user-id-placeholder', // TODO: Reemplazar con el ID del usuario real si está disponible
                original_filename: fileStatus.file.name,
                // Puedes añadir más campos relevantes aquí si los necesitas en el backend
                 // category: 'general',
                 // tags: ['web', 'manual'],
            };
            // Convierte el objeto a string JSON y lo añade al FormData
            // con la clave 'metadata_json' que espera el backend
            formData.append('metadata_json', JSON.stringify(metadata));
            // ------------------------------------------------------

            updateFileStatus(fileStatus.file.name, { status: 'uploading', progress: 10 }); // Inicia progreso

            try {
                 updateFileStatus(fileStatus.file.name, { progress: 30 }); // Progreso intermedio

                // --- MODIFICACIÓN: Llamar a uploadDocument solo con formData ---
                // La metadata ahora está incluida en el formData
                const response = await uploadDocument(formData);
                // -----------------------------------------------------------

                updateFileStatus(fileStatus.file.name, {
                    status: 'success',
                    progress: 100,
                    documentId: response.document_id,
                    taskId: response.task_id,
                    // Limpia el error si había uno previo (por reintento, etc.)
                    error: undefined
                });
                 toast.success("Upload Queued", {
                    description: `${fileStatus.file.name} received and queued for processing. Doc ID: ${response.document_id}`,
                 });

            } catch (error) {
                console.error(`Upload failed for ${fileStatus.file.name}:`, error);
                let errorMessage = 'Upload failed.';
                if (error instanceof ApiError) {
                   errorMessage = error.message || `API Error (${error.status})`;
                    // Manejar errores específicos como 401/403 si es necesario
                    // if (error.status === 401 || error.status === 403) // ... hacer algo ...
                } else if (error instanceof Error) {
                   errorMessage = error.message;
                }
                updateFileStatus(fileStatus.file.name, { status: 'error', progress: 0, error: errorMessage });
                 toast.error(`Upload Failed: ${fileStatus.file.name}`, {
                    description: errorMessage,
                 });
            }
        });
    }, []); // Dependencias de useCallback

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: supportedMimeTypes, // Usar los tipos definidos
        multiple: true,
        // Podrías añadir maxSize aquí si el backend tiene un límite (en bytes)
        // maxSize: 50 * 1024 * 1024, // Ejemplo: 50MB
    });

     const removeFile = (fileName: string) => {
        setFilesStatus(prev => prev.filter(fs => fs.file.name !== fileName));
    };

    // Generar la cadena de extensiones soportadas para mostrar al usuario
    const supportedExtensions = Object.values(supportedMimeTypes).flat().join(', ');

    return (
        <div className="space-y-4">
            <div
                {...getRootProps()}
                className={`flex flex-col items-center justify-center w-full p-8 border-2 border-dashed rounded-lg cursor-pointer transition-colors duration-200 ease-in-out
                ${isDragActive ? 'border-primary bg-primary/10' : 'border-border hover:border-primary/50 hover:bg-muted/50'}`}
            >
                <input {...getInputProps()} />
                <UploadCloud className={`w-12 h-12 mb-4 ${isDragActive ? 'text-primary' : 'text-muted-foreground'}`} />
                {isDragActive ? (
                    <p className="text-lg font-semibold text-primary">Drop the files here ...</p>
                ) : (
                    <>
                        <p className="text-lg font-semibold mb-2">Drag & drop files here, or click to select</p>
                        <p className="text-sm text-muted-foreground">Supported types: {supportedExtensions}</p>
                         {/* <p className="text-xs text-muted-foreground mt-1">Max file size: 50MB</p> */}
                    </>
                )}
            </div>

            {filesStatus.length > 0 && (
                <div className="space-y-3">
                    <h4 className="text-sm font-medium text-muted-foreground">Upload Queue:</h4>
                    <div className="max-h-60 overflow-y-auto pr-2 space-y-2"> {/* Scroll si hay muchos archivos */}
                        {filesStatus.map((fs) => (
                            <div key={fs.file.name} className="flex flex-col p-2 border rounded-md bg-card shadow-sm">
                                <div className="flex items-center justify-between gap-2">
                                    <div className="flex items-center space-x-2 overflow-hidden min-w-0"> {/* Ensure minimum width */}
                                        {fs.status === 'success' && <FileCheck2 className="w-4 h-4 text-green-600 flex-shrink-0" />}
                                        {fs.status === 'error' && <AlertCircle className="w-4 h-4 text-destructive flex-shrink-0" />}
                                        {(fs.status === 'pending' || fs.status === 'uploading') && <Loader2 className="w-4 h-4 text-muted-foreground animate-spin flex-shrink-0" />}
                                        <span className="text-sm font-medium truncate flex-1" title={fs.file.name}>{fs.file.name}</span>
                                        <span className="text-xs text-muted-foreground flex-shrink-0">({(fs.file.size / 1024 / 1024).toFixed(2)} MB)</span>
                                     </div>
                                     <div className="flex items-center space-x-2 flex-shrink-0 ml-2">
                                        {fs.status === 'uploading' && <Progress value={fs.progress} className="w-20 h-1.5" />}
                                        {fs.status === 'success' && <Badge variant="outline" className="text-green-700 border-green-300 bg-green-50 dark:bg-green-900/30 dark:text-green-200 dark:border-green-700">Queued</Badge>}
                                        {fs.status === 'error' && <Badge variant="destructive" title={fs.error || 'Error occurred'}>Error</Badge>}
                                        {fs.status === 'pending' && <Badge variant="outline">Pending</Badge>}

                                        {/* Botón para eliminar */}
                                        <Button variant="ghost" size="icon" className="h-6 w-6 text-muted-foreground hover:text-destructive" onClick={() => removeFile(fs.file.name)} title="Remove from queue">
                                            <X className="h-4 w-4" />
                                        </Button>
                                     </div>
                                </div>
                                {/* Mostrar mensaje de error debajo si existe */}
                                 {fs.status === 'error' && fs.error && (
                                    <p className="text-xs text-destructive mt-1.5 pl-6 break-words" title={fs.error}>
                                       {fs.error}
                                    </p>
                                 )}
                            </div>
                        ))}
                     </div>
                     {filesStatus.some(fs => fs.status === 'error') && (
                        <Alert variant="destructive" className="p-2 text-xs">
                             <AlertCircle className="h-4 w-4" />
                             <AlertTitle>Upload Issues</AlertTitle>
                             <AlertDescription>
                               Some uploads failed. Please check individual errors above and retry if necessary.
                             </AlertDescription>
                        </Alert>
                     )}
                </div>
            )}
        </div>
    );
}