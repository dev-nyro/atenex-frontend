// File: components/chat/retrieved-documents-panel.tsx (MODIFICADO - Iteración 3.3)
import React, { useState } from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { FileText, AlertCircle, Download, Loader2, Eye, Info } from 'lucide-react'; // Añadido Info
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
import { cn } from '@/lib/utils'; // Importar cn

interface RetrievedDocumentsPanelProps {
  documents: RetrievedDoc[];
  isLoading: boolean;
}

export function RetrievedDocumentsPanel({ documents, isLoading }: RetrievedDocumentsPanelProps) {
    const [selectedDoc, setSelectedDoc] = useState<RetrievedDoc | null>(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const handleViewDocument = (doc: RetrievedDoc) => {
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
        {/* Panel principal con estilo mejorado */}
        <div className="flex h-full flex-col border-l bg-background/50 dark:bg-muted/30">
            {/* Header del panel */}
            <CardHeader className="sticky top-0 z-10 border-b bg-background p-4 shadow-sm">
                <CardTitle className="text-base font-semibold flex items-center gap-2">
                    <FileText className="h-5 w-5 text-primary" /> Fuentes Recuperadas
                </CardTitle>
                <CardDescription className="text-xs mt-1">
                    Documentos relevantes usados para generar la respuesta.
                </CardDescription>
            </CardHeader>

            {/* Contenedor scrollable con padding */}
            <ScrollArea className="flex-1">
                {/* Espaciado y padding interno */}
                <div className="p-3 space-y-2">
                    {/* Estado de Carga con Skeleton */}
                    {isLoading && documents.length === 0 && (
                        <div className='space-y-2'>
                            <Skeleton className="h-20 w-full rounded-lg" />
                            <Skeleton className="h-20 w-full rounded-lg" />
                            <Skeleton className="h-20 w-full rounded-lg" />
                        </div>
                    )}
                    {/* Estado Vacío mejorado */}
                    {!isLoading && documents.length === 0 && (
                        <div className="flex flex-col items-center justify-center text-center text-muted-foreground py-10 px-4">
                            <Info className="h-8 w-8 mb-3 opacity-50" />
                            <p className="text-sm font-medium mb-1">Sin documentos relevantes</p>
                            <p className="text-xs">No se encontraron fuentes específicas para la última consulta.</p>
                        </div>
                    )}
                    {/* Lista de Documentos */}
                    {documents.map((doc, index) => (
                        <DialogTrigger asChild key={doc.id || `doc-${index}`}>
                            {/* Tarjeta de Documento */}
                            <Card
                                className={cn(
                                    "cursor-pointer transition-all duration-150 bg-card",
                                    "border border-border hover:border-primary/30 hover:shadow-md focus-visible:ring-1 focus-visible:ring-ring focus-visible:border-primary/30"
                                )}
                                onClick={() => handleViewDocument(doc)}
                                onKeyDown={(e) => e.key === 'Enter' && handleViewDocument(doc)}
                                tabIndex={0}
                                title={`Ver detalles de: ${doc.file_name || 'documento'}`}
                            >
                                <CardContent className="p-3 space-y-1.5 text-sm">
                                    {/* Header de la tarjeta: Título y Score */}
                                    <div className="flex justify-between items-start gap-2">
                                        <p className="font-medium text-foreground/90 truncate flex-1">
                                            {index + 1}. {doc.file_name || `Fragmento ${doc.id.substring(0, 8)}`}
                                        </p>
                                        {/* Badge de Score más refinado */}
                                        {doc.score != null && (
                                            <Badge variant="secondary" className="px-1.5 py-0 font-mono text-xs rounded-sm">
                                                {doc.score.toFixed(2)}
                                            </Badge>
                                        )}
                                    </div>
                                    {/* Preview del contenido */}
                                    <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                                        {doc.content_preview || 'Vista previa no disponible.'}
                                    </p>
                                    {/* Footer de la tarjeta: ID y icono */}
                                    <div className="text-[11px] text-muted-foreground/70 pt-1 flex justify-between items-center font-mono">
                                        <span>ID: {doc.document_id?.substring(0, 8) ?? doc.id.substring(0, 8)}...</span>
                                        <Eye className="h-3 w-3" />
                                    </div>
                                </CardContent>
                            </Card>
                        </DialogTrigger>
                    ))}
                </div>
            </ScrollArea>

            {/* Dialog de Detalles (mejorado) */}
            {selectedDoc && (
                 <DialogContent className="sm:max-w-xl"> {/* Un poco más ancho */}
                    <DialogHeader>
                        <DialogTitle className="truncate text-lg" title={selectedDoc.file_name || selectedDoc.document_id || 'Detalles del Documento'}>
                            <FileText className="inline-block h-5 w-5 mr-2 align-text-bottom text-primary" />
                            {selectedDoc.file_name || 'Detalles del Documento'}
                        </DialogTitle>
                        <DialogDescription>
                            Detalles del fragmento recuperado y su contexto.
                        </DialogDescription>
                    </DialogHeader>
                    {/* Contenido del Dialog con mejor estructura */}
                    <div className="grid gap-3 py-4 text-sm max-h-[60vh] overflow-y-auto px-1 -mx-1">
                        {/* Información Clave */}
                        <div className='grid grid-cols-3 gap-x-4 gap-y-1 text-xs border-b pb-3 mb-2'>
                            <div><span className="font-medium text-muted-foreground block">ID Documento</span><span className="font-mono text-[11px] block truncate">{selectedDoc.document_id || 'N/D'}</span></div>
                            <div><span className="font-medium text-muted-foreground block">ID Fragmento</span><span className="font-mono text-[11px] block truncate">{selectedDoc.id}</span></div>
                            <div><span className="font-medium text-muted-foreground block">Score</span><span>{selectedDoc.score?.toFixed(4) ?? 'N/D'}</span></div>
                        </div>
                        {/* Vista previa */}
                        <div>
                            <Label className="text-xs font-semibold text-muted-foreground">Vista Previa Contenido:</Label>
                            <ScrollArea className="mt-1 max-h-[200px] w-full rounded-md border bg-muted/30 p-3 text-xs">
                                <pre className="whitespace-pre-wrap break-words font-sans">{selectedDoc.content_preview || 'Vista previa no disponible.'}</pre>
                            </ScrollArea>
                        </div>
                        {/* Metadatos */}
                        {selectedDoc.metadata && Object.keys(selectedDoc.metadata).length > 0 && (
                             <div>
                                <Label className="text-xs font-semibold text-muted-foreground">Metadatos:</Label>
                                <ScrollArea className="mt-1 max-h-[100px] w-full rounded-md border bg-muted/30 p-3 text-[11px]">
                                    <pre className="whitespace-pre-wrap break-words font-mono">{JSON.stringify(selectedDoc.metadata, null, 2)}</pre>
                                </ScrollArea>
                            </div>
                        )}
                    </div>
                    <DialogFooter className="sm:justify-between">
                        <Button variant="outline" size="sm" onClick={() => handleDownloadDocument(selectedDoc)}>
                            <Download className="mr-2 h-4 w-4" />Descargar Original (N/D)
                        </Button>
                        <DialogClose asChild><Button variant="secondary" size="sm">Cerrar</Button></DialogClose>
                    </DialogFooter>
                </DialogContent>
            )}
        </div>
    </Dialog>
  );
}

// Helper Label component (si no existe o para simplificar)
const Label = ({ className, children, ...props }: React.LabelHTMLAttributes<HTMLLabelElement>) => (
    <label className={cn("block text-sm font-medium text-foreground", className)} {...props}>
        {children}
    </label>
);