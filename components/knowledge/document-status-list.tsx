// File: components/knowledge/document-status-list.tsx
"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { AlertCircle, CheckCircle2, Clock, Loader2, RefreshCw, Info } from 'lucide-react';
import { listDocumentStatuses, DocumentStatusResponse, ApiError } from '@/lib/api';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Skeleton } from '@/components/ui/skeleton';
import { toast } from "sonner";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"

type DocumentStatus = DocumentStatusResponse;

export function DocumentStatusList() {
    const [statuses, setStatuses] = useState<DocumentStatus[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchStatuses = useCallback(async (showToast = false) => {
        setIsLoading(true);
        setError(null);
        try {
            const data = await listDocumentStatuses();
            setStatuses(data);
            if (showToast) {
                toast.info("Statuses Refreshed", { description: `Loaded ${data.length} document statuses.`});
            } else if (data.length === 0) {
                console.log("No document statuses found.");
            }
        } catch (err) {
            console.error("Failed to fetch document statuses:", err);
            let message = "Could not load document statuses.";
            if (err instanceof ApiError) {
                message = err.message || message;
            } else if (err instanceof Error) {
                message = err.message;
            }
            setError(message);
            toast.error("Error Loading Statuses", { description: message });
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchStatuses(false);
    }, [fetchStatuses]);

    const handleRefresh = () => {
        fetchStatuses(true);
    };

    const getStatusBadge = (status: DocumentStatus['status']) => {
        switch (status) {
            case 'uploaded':
                return <Badge variant="outline" className="border-blue-300 text-blue-700 bg-blue-50 dark:border-blue-700 dark:text-blue-300 dark:bg-blue-900/30"><Clock className="mr-1 h-3 w-3" />Uploaded</Badge>;
            case 'processing':
                return <Badge variant="secondary" className="border-yellow-300 text-yellow-800 bg-yellow-50 dark:border-yellow-600 dark:text-yellow-200 dark:bg-yellow-900/30"><Loader2 className="mr-1 h-3 w-3 animate-spin" />Processing</Badge>;
            case 'processed':
            case 'indexed':
                return <Badge variant="default" className="bg-green-100 text-green-800 border-green-300 hover:bg-green-200 dark:bg-green-900/30 dark:text-green-200 dark:border-green-700"><CheckCircle2 className="mr-1 h-3 w-3" />Processed</Badge>;
            case 'error':
                return <Badge variant="destructive"><AlertCircle className="mr-1 h-3 w-3" />Error</Badge>;
            default:
                const unknownStatus: string = status;
                return <Badge variant="outline"><Info className="mr-1 h-3 w-3" />Unknown ({unknownStatus})</Badge>;
        }
    };

    const formatDateTime = (dateString?: string) => {
        if (!dateString) return 'N/A';
        try {
            return new Date(dateString).toLocaleString(undefined, {
                year: 'numeric', month: 'short', day: 'numeric',
                hour: 'numeric', minute: '2-digit'
            });
        } catch {
            return dateString;
        }
    };

    const renderContent = () => {
        if (isLoading && statuses.length === 0) { // Show skeletons only on initial load
            return Array.from({ length: 5 }).map((_, index) => ( // Render more skeleton rows
                <TableRow key={`skel-${index}`}>
                    <TableCell><Skeleton className="h-4 w-3/4" /></TableCell>
                    <TableCell><Skeleton className="h-6 w-20" /></TableCell>
                    <TableCell><Skeleton className="h-4 w-full" /></TableCell>
                    <TableCell><Skeleton className="h-4 w-1/2" /></TableCell>
                </TableRow>
            ));
        }

        if (error && statuses.length === 0) {
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

        if (!isLoading && !error && statuses.length === 0) {
            return (
                <TableRow>
                    <TableCell colSpan={4} className="text-center text-muted-foreground py-8">
                        No documents found. Upload documents using the form above.
                    </TableCell>
                </TableRow>
            );
        }

        return statuses.map((doc) => (
            <TableRow key={doc.document_id}>
                <TableCell className="font-medium truncate max-w-xs" title={doc.file_name || 'N/A'}>{doc.file_name || 'N/A'}</TableCell>
                <TableCell>{getStatusBadge(doc.status)}</TableCell>
                <TableCell className="text-muted-foreground text-xs max-w-sm">
                    {doc.status === 'error' ? (
                        <TooltipProvider delayDuration={100}>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <span className="text-destructive truncate block cursor-help underline decoration-dotted">
                                        {doc.error_message || 'Unknown error'}
                                    </span>
                                </TooltipTrigger>
                                <TooltipContent side="top" className="max-w-xs text-xs">
                                    <p>{doc.error_message || 'No details provided.'}</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    ) : doc.status === 'processed' || doc.status === 'indexed' ? (
                        `${doc.chunk_count ?? '?'} chunks indexed`
                    ) : (
                        doc.message || '--'
                    )}
                </TableCell>
                <TableCell className="text-muted-foreground text-xs whitespace-nowrap">
                    {formatDateTime(doc.last_updated)}
                </TableCell>
            </TableRow>
        ));
    };

    return (
       <div className="space-y-2">
           <div className="flex justify-end items-center gap-2">
                {error && statuses.length > 0 && (
                    <TooltipProvider delayDuration={100}>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <span className="text-xs text-destructive flex items-center gap-1 cursor-help">
                                    <AlertCircle className="h-4 w-4"/> Refresh Error
                                </span>
                            </TooltipTrigger>
                            <TooltipContent side="left" className="max-w-xs text-xs">
                                <p>{error}</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                )}
                <Button variant="outline" size="sm" onClick={handleRefresh} disabled={isLoading}>
                    <RefreshCw className={`mr-2 h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
                    Refresh
                </Button>
           </div>
            <ScrollArea className="h-[400px] border rounded-md relative">
                {isLoading && statuses.length > 0 && (
                   <div className="absolute inset-0 bg-background/50 backdrop-blur-sm flex items-center justify-center z-20">
                       <Loader2 className="h-6 w-6 animate-spin text-primary" />
                   </div>
                )}
                <Table>
                    <TableHeader className="sticky top-0 bg-muted/50 backdrop-blur-sm z-10">
                        <TableRow>
                            <TableHead className="w-[40%]">Filename</TableHead>
                            <TableHead className="w-[15%]">Status</TableHead>
                            <TableHead className="w-[30%]">Details</TableHead>
                            <TableHead className="w-[15%] text-right">Last Updated</TableHead>
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