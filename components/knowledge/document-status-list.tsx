"use client";

import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { AlertCircle, CheckCircle2, Clock, Loader2, RefreshCw } from 'lucide-react';
// Import the specific LIST function
import { listDocumentStatuses, DocumentStatusResponse as DocumentStatus } from '@/lib/api'; // Use the specific type
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Skeleton } from '@/components/ui/skeleton';
import { useToast } from "@/components/ui/use-toast";

// DocumentStatus type is now imported from lib/api.ts

export function DocumentStatusList() {
    // Initialize with empty array, not dummy data
    const [statuses, setStatuses] = useState<DocumentStatus[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const { toast } = useToast();

    const fetchStatuses = React.useCallback(async () => { // Wrap in useCallback
        setIsLoading(true);
        setError(null);
        try {
            // Use the actual API call function
            const data = await listDocumentStatuses();
            setStatuses(data);
            if (data.length === 0 && !isLoading) { // Check isLoading to avoid toast on initial load if still loading
                 toast({ title: "No Documents", description: "No documents found. Upload documents to see their status here."});
            }
        } catch (err) {
            console.error("Failed to fetch document statuses:", err);
            const message = err instanceof Error ? err.message : "Could not load document statuses.";
            setError(message);
            toast({ variant: "destructive", title: "Error Loading Statuses", description: message });
            setStatuses([]); // Clear statuses on error
        } finally {
            setIsLoading(false);
        }
    }, [toast]); // Add toast as dependency

    // Fetch statuses on component mount
    useEffect(() => {
        fetchStatuses();
        // Optional: Set up polling or websockets for real-time updates
        // const intervalId = setInterval(fetchStatuses, 30000);
        // return () => clearInterval(intervalId);
    }, [fetchStatuses]); // Add fetchStatuses to dependency array

    // getStatusBadge and formatDateTime remain the same

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
                // Handle potential unknown statuses gracefully
                const unknownStatus: string = status; // Cast to string for display
                return <Badge variant="outline">Unknown ({unknownStatus})</Badge>;
        }
    };

    const formatDateTime = (dateString?: string) => {
        if (!dateString) return 'N/A';
        try {
            return new Date(dateString).toLocaleString();
        } catch {
            return dateString;
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
                        <Button variant="link" onClick={fetchStatuses} className="ml-2">Try Again</Button>
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
                     {/* Display error message prominently if status is error */}
                    {doc.status === 'error'
                        ? <span className="text-destructive truncate block" title={doc.error_message || 'Unknown error'}>{doc.error_message || 'Unknown error'}</span>
                        : doc.status === 'processed' || doc.status === 'indexed'
                            ? `${doc.chunk_count ?? '?'} chunks`
                            // Display the backend message otherwise, or default '--'
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
            <ScrollArea className="h-[400px] border rounded-md"> {/* Adjust height */}
                <Table>
                    <TableHeader className="sticky top-0 bg-muted/50 backdrop-blur-sm z-10">
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