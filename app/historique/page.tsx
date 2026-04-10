import { History, Inbox } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export default function HistoriquePage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Historique</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Historique des cas et validations
        </p>
      </div>

      <Card>
        <CardHeader className="flex flex-col items-center gap-3 py-12 text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted">
            <Inbox className="h-6 w-6 text-muted-foreground" />
          </div>
          <div className="space-y-1">
            <CardTitle className="text-base">Aucun cas enregistre</CardTitle>
            <CardDescription>
              Les cas cliniques apparaitront ici une fois l&apos;integration
              base de donnees activee.
            </CardDescription>
          </div>
        </CardHeader>
      </Card>
    </div>
  );
}
