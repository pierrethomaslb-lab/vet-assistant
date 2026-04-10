import { BookOpen, Upload } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

const MOCK_BOOKS = [
  {
    id: 1,
    title: "Therapeutique du chien et du chat",
    author: "Dr. Dupont",
    year: 2023,
    chunks: 450,
  },
  {
    id: 2,
    title: "Precis de pathologie medicale",
    author: "Dr. Martin",
    year: 2024,
    chunks: 320,
  },
  {
    id: 3,
    title: "Pharmacologie veterinaire",
    author: "Dr. Bernard",
    year: 2022,
    chunks: 280,
  },
];

export default function AdminPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Gestion des sources</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Livres et documents de reference pour le RAG
        </p>
      </div>

      <div className="space-y-3">
        {MOCK_BOOKS.map((book) => (
          <Card key={book.id}>
            <CardHeader className="flex flex-row items-center gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <BookOpen className="h-5 w-5" />
              </div>
              <div className="flex-1 space-y-1">
                <CardTitle className="text-base">{book.title}</CardTitle>
                <CardDescription>
                  {book.author} — {book.year}
                </CardDescription>
              </div>
              <Badge variant="secondary">{book.chunks} chunks</Badge>
            </CardHeader>
          </Card>
        ))}
      </div>

      <Separator />

      <Card className="border-dashed">
        <CardHeader className="flex flex-col items-center gap-3 text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted">
            <Upload className="h-6 w-6 text-muted-foreground" />
          </div>
          <div className="space-y-1">
            <CardTitle className="text-base">Ajouter un livre PDF</CardTitle>
            <CardDescription>
              Upload et indexation automatique (bientot disponible)
            </CardDescription>
          </div>
          <Button disabled className="mt-2">
            Choisir un fichier PDF
          </Button>
        </CardHeader>
      </Card>
    </div>
  );
}
