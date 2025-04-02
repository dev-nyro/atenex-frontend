// File: components/chat/retrieved-documents-panel.tsx
"use client";

import React, { useState } from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { FileText, AlertCircle, Download } from 'lucide-react'; // Import Download icon
import { ApiError, request, RetrievedDoc } from '@/lib/api'; // Import request function, RetrievedDoc
import { FileText, AlertCircle, Download, Eye } from 'lucide-react';
import { RetrievedDoc } from '@/lib/api';
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
// (*) CORRECT IMPORT PATH (Ensure components/ui/dialog.tsx exists after running `npx shadcn-ui@latest add dialog`)
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter,
    DialogClose
} from "@/components/ui/dialog"; // <--- This path causes the error if the file is missing
import { toast } from "sonner";

interface RetrievedDocumentsPanelProps {
  documents: RetrievedDoc[];
  isLoading: boolean;
}

export function RetrievedDocumentsPanel({ documents, isLoading }: RetrievedDocumentsPanelProps) {
    const [selectedDoc, setSelectedDoc] = useState<RetrievedDoc | null>(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const handleViewDocument = (doc: RetrievedDoc) => {
        console.log("Viewing document details:", doc.document_id || doc.id);
        setSelectedDoc(doc);
        setIsDialogOpen(true);
    };

    const handleDownloadDocument = (doc: RetrievedDoc) => {
        const message = `Download requested for: ${doc.file_name || doc.id}`;
        console.log(message);
        toast.info("Download Not Implemented", {
             description: `Backend endpoint for downloading '${doc.file_name || doc.id}' is not yet available.`,
             action: {
                label: "Close",
                onClick: () => {},
             },
        });
    };

  return (
    // Wrap the entire panel content potentially triggering the dialog
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <div className="flex h-full flex-col border-l bg-muted/30">
            <CardHeader className="sticky top-0 z-10 border-b bg-background p-4">
                <CardTitle className="text-lg flex items-center">
                    <FileText className="mr-2 h-5 w-5" /> Retrieved Sources
                </CardTitle>
                <CardDescription className="text-xs">
                    Documents used to generate the answer. Click to view details.
                </CardDescription>
            </CardHeader>
            <ScrollArea className="flex-1">
                <div className="p-4 space-y-3">
                {isLoading && documents.length === 0 && (
                    <>
                    <Skeleton className="h-20 w-full rounded-md" />
                    <Skeleton className="h-20 w-full rounded-md" />
                    <Skeleton className="h-20 w-full rounded-md" />
                    </>
                )}
                {!isLoading && documents.length === 0 && (
                    <div className="flex flex-col items-center justify-center h-40 text-center text-muted-foreground">
                    <AlertCircle className="h-8 w-8 mb-2" />
                    <p className="text-sm">No relevant documents found for the last query.</p>
                    </div>
                )}
                {documents.map((doc, index) => (
                    // Use DialogTrigger around the Card to make it clickable
                    <DialogTrigger asChild key={doc.id || `doc-${index}`}>
                         <Card
                            className="cursor-pointer hover:shadow-md transition-shadow duration-150"
                            onClick={() => handleViewDocument(doc)} // Set selected doc on click
                            title={`Click to view details for ${doc.file_name || 'document'}`}
                        >
                            <CardContent className="p-3 space-y-1 text-sm">
                                <div className="flex justify-between items-start">
                                    <p className="font-medium text-primary truncate pr-2">
                                        {index + 1}. {doc.file_name || doc.document_id || `Chunk ${doc.id.substring(0, 8)}`}
                                    </p>
                                    {doc.score != null && (
                                        <Badge variant="secondary" title={`Relevance Score: ${doc.score.toFixed(4)}`}>
                                            {doc.score.toFixed(2)}
                                        </Badge>
                                    )}
                                </div>
                                <p className="text-xs text-muted-foreground line-clamp-2">
                                {doc.content_preview || 'No preview available.'}
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

            {/* Dialog Content - Rendered conditionally when selectedDoc is not null */}
            {selectedDoc && (
                <DialogContent className="sm:max-w-lg">
                    <DialogHeader>
                        <DialogTitle className="truncate" title={selectedDoc.file_name || selectedDoc.document_id || 'Document Details'}>
                            {selectedDoc.file_name || selectedDoc.document_id || 'Document Details'}
                        </DialogTitle>
                        <DialogDescription>
                            Details of the retrieved document chunk.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="py-4 space-y-3 text-sm">
                        {/* Details content */}
                        <div className="flex justify-between">
                            <span className="font-medium text-muted-foreground">Document ID:</span>
                            <span className="font-mono text-xs bg-muted px-1 rounded">{selectedDoc.document_id || 'N/A'}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="font-medium text-muted-foreground">Chunk ID:</span>
                            <span className="font-mono text-xs bg-muted px-1 rounded">{selectedDoc.id}</span>
                        </div>
                         <div className="flex justify-between">
                            <span className="font-medium text-muted-foreground">Relevance Score:</span>
                            <span>{selectedDoc.score?.toFixed(4) ?? 'N/A'}</span>
                        </div>
                        <div>
                            <span className="font-medium text-muted-foreground block mb-1">Content Preview:</span>
                            <ScrollArea className="max-h-[250px] border rounded p-2 bg-muted/50 text-xs">
                                <pre className="whitespace-pre-wrap break-words">{selectedDoc.content_preview || 'No content preview available.'}</pre>
                            </ScrollArea>
                        </div>
                        {selectedDoc.metadata && Object.keys(selectedDoc.metadata).length > 0 && (
                             <div>
                                <span className="font-medium text-muted-foreground block mb-1">Metadata:</span>
                                <ScrollArea className="max-h-[100px] border rounded p-2 bg-muted/50 text-xs">
                                   <pre className="whitespace-pre-wrap break-words">
                                       {JSON.stringify(selectedDoc.metadata, null, 2)}
                                   </pre>
                                </ScrollArea>
                            </div>
                        )}
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => handleDownloadDocument(selectedDoc)}>
                            <Download className="mr-2 h-4 w-4" />
                            Download Original (N/A)
                        </Button>
                        <DialogClose asChild>
                           <Button variant="secondary">Close</Button>
                        </DialogClose>
                    </DialogFooter>
                </DialogContent>
            )}
        </div>
    </Dialog> // Close the main Dialog wrapper
  );
}