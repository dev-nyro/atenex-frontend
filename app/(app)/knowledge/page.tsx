import { FileUploader } from '@/components/knowledge/file-uploader';
import { DocumentStatusList } from '@/components/knowledge/document-status-list';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

export default function KnowledgePage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Gestión de la Base de Conocimiento</h1>

      <Card>
        <CardHeader>
          <CardTitle>Subir Documentos</CardTitle>
          <CardDescription>
            Sube nuevos documentos (PDF, DOCX, TXT, etc.) para ser procesados y añadidos a la base de conocimientos.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <FileUploader />
        </CardContent>
      </Card>

      <Separator />

       <Card>
        <CardHeader>
          <CardTitle>Estado de los Documentos</CardTitle>
          <CardDescription>
            Ver el estado de procesamiento de tus documentos subidos.
          </CardDescription>
        </CardHeader>
        <CardContent>
           <DocumentStatusList />
        </CardContent>
      </Card>

    </div>
  );
}