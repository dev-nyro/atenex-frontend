// File: components/knowledge/document-status-list.tsx
"use client";

import React, { useState, useEffect, useCallback } from 'react'; // useCallback added
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { AlertCircle, CheckCircle2, Clock, Loader2, RefreshCw } from 'lucide-react';
// Import the specific LIST function and the response type
import { listDocumentStatuses, DocumentStatusResponse } from '@/lib/api';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Skeleton } from '@/components/ui/skeleton';
import { useToast } from "@/components/ui/use-toast";

// Type alias for clarity in the component
type DocumentStatus = DocumentStatusResponse;

export function DocumentStatusList() {
    // Initialize with empty array
    const [statuses, setStatuses] = useState<DocumentStatus[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const { toast } = useToast();

    const fetchStatuses = useCallback(async (showToast = false) => { // Added showToast flag
        setIsLoading(true);
        setError(null);
        try {
            // Use the actual API call function from lib/api.ts
            const data = await listDocumentStatuses();
            setStatuses(data);
            if (showToast) { // Show toast only on manual refresh or if needed logic
                 toast({ title: "Statuses Refreshed", description: `Loaded ${data.length} document statuses.`});
            } else if (data.length === 0) {
                // Optionally show a message if the list is empty after initial load
                 console.log("No document statuses found.");
                 // toast({ title: "No Documents", description: "No documents found. Upload documents to see their status here.", duration: 5000});
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [toast]); // Toast is the only dependency needed here for useCallback

    // Fetch statuses on component mount
    useEffect(() => {
        fetchStatuses(false); // Fetch initially without showing toast
        // Optional: Set up polling or websockets for real-time updates
        // const intervalId = setInterval(() => fetchStatuses(false), 30000); // Fetch silently
        // return () => clearInterval(intervalId);
    }, [fetchStatuses]); // Add fetchStatuses to dependency array

    const handleRefresh = () => {
        fetchStatuses(true); // Fetch and show toast on manual refresh
    };

    const getStatusBadge = (status: DocumentStatus['status']) => {
        switch (status) {
            case 'uploaded':
                return <Badge variant="outline"><Clock className="mr-1 h-3 w-3" />Uploaded</Badge>;
            case 'processing':
                return <Badge variant="secondary"><Loader2 className="mr-1 h-3 w-3 animate-spin" />Processing</Badge>;
            case 'processed': // Treat processed/indexed similarly for display
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
            // Format for better readability, adjust locale/options as needed
            return new Date(dateString).toLocaleString(undefined, {
                dateStyle: 'short',
                timeStyle: 'short'
            });
        } catch {
            return dateString; // Return raw string if parsing fails
        }
    };


    const renderContent = () => {
        // Show skeleton rows during initial load or refresh
        if (isLoading && statuses.length === 0) { // Show skeletons only on initial load
            return Array.from({ length: 5 }).map((_, index) => ( // Render more skeleton rows
                <TableRow key={`skel-${index}`}>
                    <TableCell><Skeleton className="h-4 w-3/4" /></TableCell>
                    <TableCell><Skeleton className="h-4 w-1/4" /></TableCell>
                    <TableCell><Skeleton className="h-4 w-1/2" /></TableCell>
                    <TableCell><Skeleton className="h-4 w-1/4" /></TableCell>
                </TableRow>
            ));
        }

        // Show error message if fetching failed
        if (error && statuses.length === 0) { // Show error prominently only if list is empty
            return (
                <TableRow>
                    <TableCell colSpan={4} className="text-center text-destructive py-8">
                        <AlertCircle className="mx-auto h-8 w-8 mb-2" />
                        Error loading statuses: {error}
                        <Button variant="link" onClick={handleRefresh} className="ml-2">Try Again</Button>
                    </TableCell>
                </TableRow>
            );
        }

        // Show message if the list is empty after loading and no error occurred
        if (!isLoading && !error && statuses.length === 0) {
            return (
                <TableRow>
                    <TableCell colSpan={4} className="text-center text-muted-foreground py-8">
                        No documents found. Upload documents using the form above.
                    </TableCell>
                </TableRow>
            );
        }

        // Render the actual data rows
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
                {/* Show error inline with refresh button if an error occurred but list might still have old data */}
                {error && statuses.length > 0 && <span className="text-xs text-destructive mr-2 self-center">Refresh failed: {error}</span>}
                <Button variant="outline" size="sm" onClick={handleRefresh} disabled={isLoading}>
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
                    {/* Render skeleton inside TableBody if loading */}
                    <TableBody>
                       {renderContent()}
                    </TableBody>
                </Table>
            </ScrollArea>
       </div>
    );
}