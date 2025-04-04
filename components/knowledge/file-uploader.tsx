// File: atenex-frontend/components/knowledge/file-uploader.tsx
"use client";

import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input'; // Input no se usa aquí, pero lo dejo por si acaso
import { Progress } from '@/components/ui/progress';
// Alert no se usa directamente aquí, pero lo dejo por si acaso
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { UploadCloud, FileCheck2, AlertCircle, Loader2, X } from 'lucide-react';
import { uploadDocument, ApiError } from '@/lib/api';
// (+) AÑADIR ESTA LÍNEA (si no existe):
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

export function FileUploader() {
    const [filesStatus, setFilesStatus] = useState<UploadedFileStatus[]>([]);

    const updateFileStatus = (fileName: string, updates: Partial<Omit<UploadedFileStatus, 'file'>>) => {
        setFilesStatus(prev =>
            prev.map(fs => (fs.file.name === fileName ? { ...fs, ...updates } : fs))
        );
    };

    const onDrop = useCallback((acceptedFiles: File[]) => {
        const newFiles: UploadedFileStatus[] = acceptedFiles.map(file => ({
            file,
            status: 'pending',
            progress: 0,
        }));
        setFilesStatus(prev => [...prev, ...newFiles]);

        newFiles.forEach(async (fileStatus) => {
            const formData = new FormData();
            formData.append('file', fileStatus.file);

            // --- AÑADIR ESTA LÍNEA ---
            // Crear el objeto metadata y añadirlo como string JSON al FormData
            // con el nombre de campo esperado por el backend ('metadata_json')
            const metadata = { source: 'web-uploader' }; // Puedes añadir más datos si es necesario
            formData.append('metadata_json', JSON.stringify(metadata));
            // -----------------------

            updateFileStatus(fileStatus.file.name, { status: 'uploading', progress: 10 });

            try {
                 updateFileStatus(fileStatus.file.name, { progress: 50 });

                // --- MODIFICAR LLAMADA: Quitar el argumento 'metadata' ---
                // Ahora la metadata va dentro del formData
                const response = await uploadDocument(formData);
                // ------------------------------------------------------

                updateFileStatus(fileStatus.file.name, {
                    status: 'success',
                    progress: 100,
                    documentId: response.document_id,
                    taskId: response.task_id
                });
                 toast.success("Upload Queued", {
                    description: `${fileStatus.file.name} uploaded successfully and queued for processing. Task ID: ${response.task_id}`,
                 });

            } catch (error) {
                console.error(`Upload failed for ${fileStatus.file.name}:`, error);
                let errorMessage = 'Upload failed.';
                if (error instanceof ApiError && error.message) {
                   errorMessage = error.message;
                } else if (error instanceof Error) {
                   errorMessage = error.message;
                }
                updateFileStatus(fileStatus.file.name, { status: 'error', progress: 0, error: errorMessage });
                 toast.error(`Upload Failed: ${fileStatus.file.name}`, {
                    description: errorMessage,
                 });
            }
        });
    // Dependencias de useCallback: no se necesita 'toast' para sonner
    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: {
            'application/pdf': ['.pdf'],
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
            'text/plain': ['.txt'],
            'text/markdown': ['.md'],
            'text/html': ['.html', '.htm'],
            // Añade más tipos si son soportados por tu backend
            // 'image/jpeg': ['.jpeg', '.jpg'],
            // 'image/png': ['.png'],
        },
        multiple: true,
    });

     const removeFile = (fileName: string) => {
        setFilesStatus(prev => prev.filter(fs => fs.file.name !== fileName));
    };

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
                        <p className="text-sm text-muted-foreground">Supported types: PDF, DOCX, TXT, MD, HTML</p>
                         {/* Add size limits if known from backend */}
                        {/* <p className="text-xs text-muted-foreground mt-1">Max file size: 50MB</p> */}
                    </>
                )}
            </div>

            {filesStatus.length > 0 && (
                <div className="space-y-2">
                    <h4 className="text-sm font-medium">Upload Queue:</h4>
                    {filesStatus.map((fs) => (
                        <div key={fs.file.name} className="flex items-center justify-between p-2 border rounded-md bg-background">
                            <div className="flex items-center space-x-2 overflow-hidden">
                                {fs.status === 'success' && <FileCheck2 className="w-5 h-5 text-green-600 flex-shrink-0" />}
                                {fs.status === 'error' && <AlertCircle className="w-5 h-5 text-destructive flex-shrink-0" />}
                                {(fs.status === 'pending' || fs.status === 'uploading') && <Loader2 className="w-5 h-5 text-muted-foreground animate-spin flex-shrink-0" />}
                                <span className="text-sm truncate flex-1" title={fs.file.name}>{fs.file.name}</span>
                                <span className="text-xs text-muted-foreground flex-shrink-0">({(fs.file.size / 1024 / 1024).toFixed(2)} MB)</span>
                             </div>
                             <div className="flex items-center space-x-2 flex-shrink-0">
                                {fs.status === 'uploading' && <Progress value={fs.progress} className="w-20 h-2" />}
                                {fs.status === 'success' && <Badge variant="outline" className="text-green-700 border-green-300 bg-green-50 dark:bg-green-900 dark:text-green-300 dark:border-green-700">Queued</Badge>}
                                {fs.status === 'error' && <Badge variant="destructive" title={fs.error}>Error</Badge>}
                                {/* Permitir eliminar incluso si está subiendo o tuvo éxito/error */}
                                <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => removeFile(fs.file.name)} title="Remove from queue">
                                    <X className="h-4 w-4" />
                                </Button>
                             </div>
                            {/* Mostrar mensaje de error debajo si existe */}
                             {fs.status === 'error' && fs.error && (
                                <p className="text-xs text-destructive col-span-full mt-1 pl-7" title={fs.error}>
                                   {fs.error}
                                </p>
                             )}
                        </div>
                    ))}
                     {filesStatus.some(fs => fs.status === 'error') && (
                        <p className="text-xs text-destructive mt-2">Some uploads failed. Check individual errors above.</p>
                     )}
                </div>
            )}
        </div>
    );
}