"use client";

import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { AlertCircle, CheckCircle2, Clock, Loader2, RefreshCw } from 'lucide-react';
import { getDocumentStatus } from '@/lib/api'; // Assuming an API function exists to list statuses
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Skeleton } from '@/components/ui/skeleton';
import { useToast } from "@/components/ui/use-toast";

// Define the structure of a document status object (adjust based on actual API response)
interface DocumentStatus {
    document_id: string;
    status: 'uploaded' | 'processing' | 'processed' | 'indexed' | 'error'; // Match backend enum
    file_name?: string;
    file_type?: string;
    chunk_count?: number | null;
    error_message?: string | null;
    last_updated?: string; // ISO 8601 string
    message?: string;
}

// Dummy data - replace with API call
const dummyStatuses: DocumentStatus[] = [
    // { document_id: 'uuid-doc-1', status: 'processed', file_name: 'Q3_Report.pdf', last_updated: new Date(Date.now() - 3600000).toISOString(), chunk_count: 153 },
    // { document_id: 'uuid-doc-2', status: 'processing', file_name: 'Competitor_Analysis.docx', last_updated: new Date(Date.now() - 60000).toISOString() },
    // { document_id: 'uuid-doc-3', status: 'error', file_name: 'Invalid_File.txt', last_updated: new Date(Date.now() - 7200000).toISOString(), error_message: 'Unsupported file format' },
    // { document_id: 'uuid-doc-4', status: 'uploaded', file_name: 'Onboarding_Guide.pdf', last_updated: new Date(Date.now() - 10000).toISOString() },
];

export function DocumentStatusList() {
    const [statuses, setStatuses] = useState<DocumentStatus[]>(dummyStatuses);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const { toast } = useToast();

    const fetchStatuses = async () => {
        setIsLoading(true);
        setError(null);
        try {
            // TODO: Implement API call to fetch document statuses for the company
            // Example: const data = await listDocumentStatuses(); // Needs implementation in lib/api.ts
            // For now, simulate loading and potential error/empty state
            await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate network delay
            // Set dummy data or handle empty response
             if (Math.random() < 0.1) { // Simulate occasional fetch error
                  throw new Error("Failed to fetch document statuses from server.");
             }
            setStatuses(dummyStatuses); // Replace with actual data: setStatuses(data);
            if (dummyStatuses.length === 0) {
                 toast({ title: "No Documents", description: "No documents found in your knowledge base yet."});
            }

        } catch (err) {
            console.error("Failed to fetch document statuses:", err);
            const message = err instanceof Error ? err.message : "Could not load document statuses.";
            setError(message);
            toast({ variant: "destructive", title: "Error", description: message });
             setStatuses([]); // Clear statuses on error
        } finally {
            setIsLoading(false);
        }
    };

    // Fetch statuses on component mount and potentially set up polling/websockets
    useEffect(() => {
        fetchStatuses();
        // TODO: Implement polling or preferably use WebSockets if backend supports it
        // const intervalId = setInterval(fetchStatuses, 30000); // Poll every 30 seconds (example)
        // return () => clearInterval(intervalId);
    }, []); // Run only on mount

    const getStatusBadge = (status: DocumentStatus['status']) => {
        switch (status) {
            case 'uploaded':
                return <Badge variant="outline"><Clock className="mr-1 h-3 w-3" />Uploaded</Badge>;
            case 'processing':
                return <Badge variant="secondary"><Loader2 className="mr-1 h-3 w-3 animate-spin" />Processing</Badge>;
            case 'processed': // Treat processed/indexed similarly for now
            case 'indexed':
                return <Badge variant="default" className="bg-green-100 text-green-800 border-green-300 hover:bg-green-200 dark:bg-green-900 dark:text-green-200 dark:border-green-700"><CheckCircle2 className="mr-1 h-3 w-3" />Processed</Badge>;
            case 'error':
                return <Badge variant="destructive"><AlertCircle className="mr-1 h-3 w-3" />Error</Badge>;
            default:
                return <Badge variant="outline">Unknown</Badge>;
        }
    };

    const formatDateTime = (dateString?: string) => {
        if (!dateString) return 'N/A';
        try {
            return new Date(dateString).toLocaleString();
        } catch {
            return dateString; // Return raw string if parsing fails
        }
    };

    const renderContent = () => {
        if (isLoading) {
            return Array.from({ length: 3 }).map((_, index) => (
                <TableRow key={`skel-${index}`}>
                    <TableCell><Skeleton className="h-4 w-3/4" /></TableCell>
                    <TableCell><Skeleton className="h-4 w-1/4" /></TableCell>
                    <TableCell><Skeleton className="h-4 w-1/2" /></TableCell>
                    <TableCell><Skeleton className="h-4 w-1/4" /></TableCell>
                </TableRow>
            ));
        }

        if (error) {
            return (
                <TableRow>
                    <TableCell colSpan={4} className="text-center text-destructive py-8">
                        <AlertCircle className="mx-auto h-8 w-8 mb-2" />
                        Error loading statuses: {error}
                    </TableCell>
                </TableRow>
            );
        }

        if (statuses.length === 0) {
            return (
                <TableRow>
                    <TableCell colSpan={4} className="text-center text-muted-foreground py-8">
                        No documents found. Upload some documents to get started.
                    </TableCell>
                </TableRow>
            );
        }

        return statuses.map((doc) => (
            <TableRow key={doc.document_id}>
                <TableCell className="font-medium truncate max-w-xs" title={doc.file_name}>{doc.file_name || 'N/A'}</TableCell>
                <TableCell>{getStatusBadge(doc.status)}</TableCell>
                <TableCell className="text-muted-foreground text-xs">
                    {doc.status === 'error'
                        ? <span className="text-destructive truncate block" title={doc.error_message || 'Unknown error'}>{doc.error_message || 'Unknown error'}</span>
                        : doc.status === 'processed' || doc.status === 'indexed'
                            ? `${doc.chunk_count ?? '?'} chunks`
                            : doc.message || '--'}
                </TableCell>
                <TableCell className="text-muted-foreground text-xs">{formatDateTime(doc.last_updated)}</TableCell>
            </TableRow>
        ));
    };


    return (
       <div className="space-y-2">
           <div className="flex justify-end">
                <Button variant="outline" size="sm" onClick={fetchStatuses} disabled={isLoading}>
                    <RefreshCw className={`mr-2 h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
                    Refresh
                </Button>
           </div>
            <ScrollArea className="h-[400px] border rounded-md"> {/* Adjust height as needed */}
                <Table>
                    <TableHeader className="sticky top-0 bg-muted/50 backdrop-blur-sm">
                        <TableRow>
                            <TableHead>Filename</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Details</TableHead>
                            <TableHead>Last Updated</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                       {renderContent()}
                    </TableBody>
                </Table>
            </ScrollArea>
       </div>
    );
}