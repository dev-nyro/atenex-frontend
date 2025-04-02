// File: components/chat/retrieved-documents-panel.tsx
"use client";

import React, { useState } from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
// --- CORRECCIÓN: Importar iconos en una sola línea ---
import { FileText, AlertCircle, Download, Eye } from 'lucide-react';
// ---------------------------------------------------
import { RetrievedDoc } from '@/lib/api'; // Mantener esta importación
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
        console.log("Viewing document details:", doc.document_id || doc.id);
        setSelectedDoc(doc);
        setIsDialogOpen(true);
    };

    const handleDownloadDocument = (doc: RetrievedDoc) => {
        const message = `Download requested for: ${doc.file_name || doc.id}`;
        console.log(message);
        toast.info("Download Not Implemented", {
             description: `Backend endpoint for downloading '${doc.file_name || doc.id}' is not yet available.`,
             action: { label: "Close", onClick: () => {} },
        });
    };

  return (
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
                {isLoading && documents.length === 0 && ( /* Skeleton */ )}
                {!isLoading && documents.length === 0 && ( /* No docs found */ )}
                {documents.map((doc, index) => (
                    <DialogTrigger asChild key={doc.id || `doc-${index}`}>
                         <Card /* ... Card content ... */ >
                            {/* ... */}
                         </Card>
                    </DialogTrigger>
                ))}
                </div>
            </ScrollArea>

            {selectedDoc && (
                <DialogContent className="sm:max-w-lg">
                   {/* ... Dialog Content ... */}
                </DialogContent>
            )}
        </div>
    </Dialog>
  );
}