// File: components/chat/retrieved-documents-panel.tsx
import React, { useState } from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { FileText, Info, Star, Download, Loader2, Eye, X } from 'lucide-react';
import { RetrievedDoc } from '@/lib/api';
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
import { cn } from '@/lib/utils';

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

    const ScoreStars = ({ score }: { score: number | null | undefined }) => {
      if (score == null || score < 0) return null;
      const numStars = Math.max(0, Math.min(5, Math.round(score * 5)));
      return (
        <div className="flex items-center gap-0.5" title={`Score: ${score.toFixed(3)}`}>
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={cn(
                "h-3 w-3",
                i < numStars
                  ? "text-yellow-400 fill-yellow-400" 
                  : "text-gray-300 fill-gray-300 dark:text-gray-600 dark:fill-gray-600" 
              )}
            />
          ))}
        </div>
      );
    };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <div className="flex h-full flex-col border-l bg-muted/10 dark:bg-muted/20">
            <CardHeader className="sticky top-0 z-10 border-b bg-background p-4 shadow-sm">
                <CardTitle className="text-base font-semibold flex items-center gap-2">
                    <FileText className="h-5 w-5 text-primary" /> Fuentes Relevantes
                </CardTitle>
                <CardDescription className="text-xs mt-1">
                    Documentos utilizados para generar la respuesta.
                </CardDescription>
            </CardHeader>

            <ScrollArea className="flex-1">
                <div className="p-3 space-y-2">
                    {isLoading && documents.length === 0 && (
                        <div className='space-y-2'>
                            {[...Array(3)].map((_, i) => (
                                <Card key={`skel-${i}`} className="p-3 border border-border/50 bg-card opacity-70">
                                    <div className="flex justify-between items-center mb-1.5">
                                        <Skeleton className="h-4 w-3/4 rounded" />
                                        <Skeleton className="h-3 w-8 rounded-sm" />
                                    </div>
                                    <Skeleton className="h-3 w-full rounded" />
                                    <Skeleton className="h-3 w-1/2 rounded mt-1" />
                                    <div className="flex justify-between items-center mt-2">
                                        <Skeleton className="h-2.5 w-16 rounded" />
                                        <Skeleton className="h-3 w-3 rounded" />
                                    </div>
                                </Card>
                            ))}
                        </div>
                    )}
                    {!isLoading && documents.length === 0 && (
                        <div className="flex flex-col items-center justify-center text-center text-muted-foreground py-10 px-4 min-h-[200px]">
                            <Info className="h-8 w-8 mb-3 opacity-50" />
                            <p className="text-sm font-medium mb-1">Sin Fuentes</p>
                            <p className="text-xs">No se encontraron fuentes específicas para la última consulta.</p>
                        </div>
                    )}
                    {documents.map((doc, index) => (
                        <DialogTrigger asChild key={doc.id || `doc-${index}`}>
                            <Card
                                className={cn(
                                    "cursor-pointer transition-all duration-150 bg-card",
                                    "border border-border hover:border-primary/40 hover:shadow-md focus-visible:ring-1 focus-visible:ring-ring focus-visible:border-primary/40"
                                )}
                                onClick={() => handleViewDocument(doc)}
                                onKeyDown={(e) => e.key === 'Enter' && handleViewDocument(doc)}
                                tabIndex={0}
                                title={`Ver detalles de: ${doc.file_name || 'documento'}`}
                            >
                                <CardContent className="p-3 space-y-1 text-sm">
                                    <div className="flex justify-between items-start gap-2">
                                        <p className="font-medium text-foreground/95 truncate flex-1 flex items-center gap-1.5">
                                            <span className="flex-shrink-0 h-5 w-5 flex items-center justify-center text-xs font-mono bg-muted text-muted-foreground rounded-full border">
                                                {index + 1}
                                            </span>
                                            <span className="truncate" title={doc.file_name || `Fragmento ${doc.id.substring(0, 8)}`}>
                                                {doc.file_name || `Fragmento ${doc.id.substring(0, 8)}`}
                                            </span>
                                        </p>
                                        <ScoreStars score={doc.score} />
                                    </div>
                                    <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed pl-7">
                                        {doc.content_preview || <span className="italic opacity-70">Vista previa no disponible.</span>}
                                    </p>
                                     <div className="text-[10px] text-muted-foreground/70 pt-1.5 flex justify-between items-center font-mono pl-7">
                                        <span>ID: {doc.document_id?.substring(0, 8) ?? doc.id.substring(0, 8)}...</span>
                                        <Eye className="h-3 w-3" />
                                    </div>
                                </CardContent>
                            </Card>
                        </DialogTrigger>
                    ))}
                </div>
            </ScrollArea>

            {selectedDoc && (
                 <DialogContent className="sm:max-w-2xl lg:max-w-3xl grid-rows-[auto_minmax(0,1fr)_auto] max-h-[85vh] p-0">
                    <DialogHeader className="px-6 pt-6 pb-4 border-b">
                        <DialogTitle className="truncate text-lg flex items-center gap-2" title={selectedDoc.file_name || selectedDoc.document_id || 'Detalles del Documento'}>
                            <FileText className="inline-block h-5 w-5 align-text-bottom text-primary" />
                            {selectedDoc.file_name || 'Detalles del Documento'}
                        </DialogTitle>
                        <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground pt-1">
                            <span>ID Doc: <span className="font-mono text-[11px]">{selectedDoc.document_id?.substring(0,12) || 'N/D'}...</span></span>
                            <span>ID Frag: <span className="font-mono text-[11px]">{selectedDoc.id}</span></span>
                            <span>Score: <span className="font-medium">{selectedDoc.score?.toFixed(4) ?? 'N/D'}</span></span>
                        </div>
                    </DialogHeader>
                    <ScrollArea className="overflow-y-auto px-6 py-4 max-h-[calc(85vh-180px)]">
                         <div className="space-y-4 text-sm">
                            <div>
                                <Label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Contenido Relevante (Vista Previa Completa):</Label>
                                <blockquote className="mt-1 border-l-4 pl-4 text-sm text-foreground/80 max-h-[300px] overflow-y-auto pretty-scrollbar whitespace-pre-wrap break-words">
                                    {selectedDoc.content || <span className="italic opacity-70">Contenido no disponible.</span>}
                                </blockquote>
                            </div>
                            {selectedDoc.metadata && Object.keys(selectedDoc.metadata).length > 0 && (
                                 <div>
                                    <Label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Metadatos:</Label>
                                    <pre className="mt-1 max-h-[150px] w-full overflow-auto rounded-md border bg-muted/30 p-3 text-[11px] font-mono whitespace-pre-wrap break-all pretty-scrollbar">
                                        {JSON.stringify(selectedDoc.metadata, null, 2)}
                                    </pre>
                                </div>
                            )}
                         </div>
                     </ScrollArea>
                    <DialogFooter className="sm:justify-between px-6 py-4 border-t bg-muted/30">
                        <Button variant="outline" size="sm" onClick={() => handleDownloadDocument(selectedDoc)} disabled={!selectedDoc.file_name}>
                            <Download className="mr-2 h-4 w-4" />Descargar Original {selectedDoc.file_name ? '' : '(N/D)'}
                        </Button>
                        <DialogClose asChild><Button variant="secondary" size="sm">Cerrar</Button></DialogClose>
                    </DialogFooter>
                </DialogContent>
            )}
        </div>
        <style jsx global>{`
            .pretty-scrollbar::-webkit-scrollbar { width: 6px; height: 6px; }
            .pretty-scrollbar::-webkit-scrollbar-track { background: hsl(var(--muted) / 0.3); border-radius: 3px; }
            .pretty-scrollbar::-webkit-scrollbar-thumb { background: hsl(var(--border)); border-radius: 3px; }
            .pretty-scrollbar::-webkit-scrollbar-thumb:hover { background: hsl(var(--primary) / 0.7); }
        `}</style>
    </Dialog>
  );
}

// Helper Label component (si no existe globalmente)
const Label = ({ className, children, ...props }: React.LabelHTMLAttributes<HTMLLabelElement>) => (
    <label className={cn("block text-sm font-medium text-foreground", className)} {...props}>
        {children}
    </label>
);