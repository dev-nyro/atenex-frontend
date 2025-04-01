// File: components/chat/retrieved-documents-panel.tsx
import React, { useState } from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { FileText, AlertCircle, Download } from 'lucide-react'; // Import Download icon
import { RetrievedDoc } from '@/lib/api'; // Import type
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button'; // Import Button component
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from "@radix-ui/react-dialog"; // Import Dialog components

interface RetrievedDocumentsPanelProps {
  documents: RetrievedDoc[];
  isLoading: boolean; // Indicate when the main query is loading
}

export function RetrievedDocumentsPanel({ documents, isLoading }: RetrievedDocumentsPanelProps) {
    const [open, setOpen] = React.useState(false)
    const [selectedDoc, setSelectedDoc] = useState<RetrievedDoc | null>(null);

    const handleViewDocument = (doc: RetrievedDoc) => {
        // TODO: Implement document viewing logic
        // This could open a modal, navigate to a viewer page, or fetch content
        console.log("Viewing document:", doc.document_id || doc.id);
        // alert(`Viewing document: ${doc.file_name || doc.id}\n(Implementation needed)`);
        setSelectedDoc(doc);
        setOpen(true); // Open the Dialog
    };

    const handleDownloadDocument = (doc: RetrievedDoc) => {
        // TODO: Implement document download logic
        console.log("Downloading document:", doc.document_id || doc.id);
        alert(`Downloading document: ${doc.file_name || doc.id}\n(Implementation needed)`);
    };

  return (
    <div className="flex h-full flex-col border-l bg-muted/30">
      <CardHeader className="sticky top-0 z-10 border-b bg-background p-4">
        <CardTitle className="text-lg flex items-center">
            <FileText className="mr-2 h-5 w-5" /> Retrieved Sources
        </CardTitle>
        <CardDescription className="text-xs">
            Documents used to generate the answer.
        </CardDescription>
      </CardHeader>
      <ScrollArea className="flex-1">
        <div className="p-4 space-y-3">
          {isLoading && documents.length === 0 && ( // Show skeletons only when loading AND no docs yet
            <>
              <Skeleton className="h-16 w-full rounded-md" />
              <Skeleton className="h-16 w-full rounded-md" />
              <Skeleton className="h-16 w-full rounded-md" />
            </>
          )}
          {!isLoading && documents.length === 0 && (
            <div className="flex flex-col items-center justify-center h-40 text-center text-muted-foreground">
               <AlertCircle className="h-8 w-8 mb-2" />
               <p className="text-sm">No relevant documents found for the last query.</p>
            </div>
          )}
          {documents.map((doc, index) => (
            <Card
               key={doc.id || `doc-${index}`}
               className="cursor-pointer hover:shadow-md transition-shadow duration-150"
               onClick={() => handleViewDocument(doc)}
               title={`Click to view ${doc.file_name || 'document'}`}
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
                 {/* Optional: Display key metadata */}
                 {/* <div className="text-xs text-muted-foreground/80 pt-1">
                     Type: {doc.metadata?.file_type || 'N/A'}
                 </div> */}
              </CardContent>
            </Card>
          ))}
        </div>
      </ScrollArea>

      {/* Document Dialog (Modal) */}
      <Dialog open={open} onOpenChange={setOpen}>
            {selectedDoc && (
                <DialogContent className="sm:max-w-[425px]">
                        <div className="px-6 pb-4 text-center sm:text-left">
                            <DialogTitle>{selectedDoc.file_name || selectedDoc.document_id || 'Document Details'}</DialogTitle>
                            <DialogDescription>
                                {/* Implement document viewer or preview here. For MVP, show details. */}
                                <p>ID: {selectedDoc.id}</p>
                                <p>Score: {selectedDoc.score?.toFixed(4) || 'N/A'}</p>
                                {/* Add scrollable content area */}
                                <ScrollArea className="max-h-[300px]">
                                    <p>{selectedDoc.content_preview || 'No preview available.'}</p>
                                </ScrollArea>
                            </DialogDescription>
                        </div>
                         {/* Action buttons in footer - View/Download */}
                        <div className="flex justify-end space-x-2">
                            <Button variant="outline" onClick={() => handleDownloadDocument(selectedDoc)}>
                                <Download className="mr-2 h-4 w-4" />
                                Download
                            </Button>
                        </div>
                </DialogContent>
                
            )}
        </Dialog>

    </div>
  );
}