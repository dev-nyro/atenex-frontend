// File: components/chat/retrieved-documents-panel.tsx
import React, { useState } from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { FileText, AlertCircle, Download, Loader2, Eye } from 'lucide-react';
import { ApiError, request, RetrievedDoc } from '@/lib/api';
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter,
    DialogClose
} from "@/components/ui/dialog";
import { toast } from "sonner";

interface RetrievedDocumentsPanelProps {
  documents: RetrievedDoc[];
  isLoading: boolean;
}

export function RetrievedDocumentsPanel({ documents, isLoading }: RetrievedDocumentsPanelProps) {
    const [selectedDoc, setSelectedDoc] = useState<RetrievedDoc | null>(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const handleViewDocument = (doc: RetrievedDoc) => {
        console.log("Viendo detalles del documento:", doc.document_id || doc.id);
        setSelectedDoc(doc);
        setIsDialogOpen(true);
    };

    const handleDownloadDocument = (doc: RetrievedDoc) => {
        const message = `Descarga solicitada para: ${doc.file_name || doc.id}`;
        console.log(message);
        toast.info("Descarga No Implementada", {
             description: `El endpoint de backend para descargar '${doc.file_name || doc.id}' aún no está disponible.`,
             action: { label: "Cerrar", onClick: () => {} },
        });
    };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <div className="flex h-full flex-col border-l bg-muted/30">
            <CardHeader className="sticky top-0 z-10 border-b bg-background p-4">
                {/* MODIFICADO: Título traducido */}
                <CardTitle className="text-lg flex items-center">
                    <FileText className="mr-2 h-5 w-5" /> Fuentes Recuperadas
                </CardTitle>
                {/* MODIFICADO: Descripción traducida */}
                <CardDescription className="text-xs">
                    Documentos usados para generar la respuesta. Haz clic para ver detalles.
                </CardDescription>
            </CardHeader>

            <ScrollArea className="flex-1">
                <div className="p-4 space-y-3">
                    {/* Estado de Carga */}
                    {isLoading && documents.length === 0 && (
                        <>
                            <Skeleton className="h-20 w-full rounded-md" />
                            <Skeleton className="h-20 w-full rounded-md" />
                            <Skeleton className="h-20 w-full rounded-md" />
                        </>
                    )}
                    {/* Estado Vacío */}
                    {!isLoading && documents.length === 0 && (
                        <div className="flex flex-col items-center justify-center h-40 text-center text-muted-foreground">
                            <AlertCircle className="h-8 w-8 mb-2" />
                            {/* MODIFICADO: Texto traducido */}
                            <p className="text-sm">No se encontraron documentos relevantes para la última consulta.</p>
                        </div>
                    )}
                    {/* Lista de Documentos */}
                    {documents.map((doc, index) => (
                        <DialogTrigger asChild key={doc.id || `doc-${index}`}>
                            <Card
                                className="cursor-pointer hover:shadow-md transition-shadow duration-150"
                                onClick={() => handleViewDocument(doc)}
                                // MODIFICADO: Tooltip traducido
                                title={`Haz clic para ver detalles de ${doc.file_name || 'documento'}`}
                            >
                                <CardContent className="p-3 space-y-1 text-sm">
                                    <div className="flex justify-between items-start">
                                        <p className="font-medium text-primary truncate pr-2">
                                            {index + 1}. {doc.file_name || doc.document_id?.substring(0, 8) || `Fragmento ${doc.id.substring(0, 8)}`}
                                        </p>
                                        {doc.score != null && (
                                            // MODIFICADO: Tooltip traducido
                                            <Badge variant="secondary" title={`Puntuación Relevancia: ${doc.score.toFixed(4)}`}>
                                                {doc.score.toFixed(2)}
                                            </Badge>
                                        )}
                                    </div>
                                    <p className="text-xs text-muted-foreground line-clamp-2">
                                        {/* MODIFICADO: Texto traducido */}
                                        {doc.content_preview || 'Vista previa no disponible.'}
                                    </p>
                                    <div className="text-xs text-muted-foreground/80 pt-1 flex justify-between items-center">
                                        <span>ID: {doc.document_id?.substring(0, 8) ?? doc.id.substring(0, 8)}...</span>
                                        <Eye className="h-3 w-3 text-muted-foreground/50" />
                                    </div>
                                </CardContent>
                            </Card>
                        </DialogTrigger>
                    ))}
                </div>
            </ScrollArea>

            {/* Contenido del Dialog */}
            {selectedDoc && (
                <DialogContent className="sm:max-w-lg">
                    <DialogHeader>
                        {/* MODIFICADO: Título traducido */}
                        <DialogTitle className="truncate" title={selectedDoc.file_name || selectedDoc.document_id || 'Detalles del Documento'}>
                            {selectedDoc.file_name || selectedDoc.document_id || 'Detalles del Documento'}
                        </DialogTitle>
                        {/* MODIFICADO: Descripción traducida */}
                        <DialogDescription>
                            Detalles del fragmento recuperado del documento.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="py-4 space-y-3 text-sm">
                        {/* MODIFICADO: Textos traducidos */}
                        <div className="flex justify-between"><span className="font-medium text-muted-foreground">ID Documento:</span><span className="font-mono text-xs bg-muted px-1 rounded">{selectedDoc.document_id || 'N/D'}</span></div>
                        <div className="flex justify-between"><span className="font-medium text-muted-foreground">ID Fragmento:</span><span className="font-mono text-xs bg-muted px-1 rounded">{selectedDoc.id}</span></div>
                        <div className="flex justify-between"><span className="font-medium text-muted-foreground">Puntuación Relevancia:</span><span>{selectedDoc.score?.toFixed(4) ?? 'N/D'}</span></div>
                        <div>
                            <span className="font-medium text-muted-foreground block mb-1">Vista Previa Contenido:</span>
                            <ScrollArea className="max-h-[250px] border rounded p-2 bg-muted/50 text-xs"><pre className="whitespace-pre-wrap break-words">{selectedDoc.content_preview || 'Vista previa no disponible.'}</pre></ScrollArea>
                        </div>
                        {selectedDoc.metadata && Object.keys(selectedDoc.metadata).length > 0 && (
                             <div>
                                <span className="font-medium text-muted-foreground block mb-1">Metadatos:</span>
                                <ScrollArea className="max-h-[100px] border rounded p-2 bg-muted/50 text-xs"><pre className="whitespace-pre-wrap break-words">{JSON.stringify(selectedDoc.metadata, null, 2)}</pre></ScrollArea>
                            </div>
                        )}
                    </div>
                    <DialogFooter>
                        {/* MODIFICADO: Textos traducidos */}
                        <Button variant="outline" onClick={() => handleDownloadDocument(selectedDoc)}>
                            <Download className="mr-2 h-4 w-4" />Descargar Original (N/D)
                        </Button>
                        <DialogClose asChild><Button variant="secondary">Cerrar</Button></DialogClose>
                    </DialogFooter>
                </DialogContent>
            )}
        </div>
    </Dialog>
  );
}