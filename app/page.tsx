import { MODULES } from "@/lib/modules-config";
import { ModuleCard } from "@/components/modules/module-card";
import { ShieldAlert } from "lucide-react";

export default function HomePage() {
  return (
    <div className="space-y-6">
      <div className="flex items-start gap-3 rounded-lg border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
        <ShieldAlert className="mt-0.5 h-5 w-5 shrink-0" />
        <div>
          <p className="font-medium">Avertissement</p>
          <p className="mt-1 text-amber-800">
            Cet assistant est un outil d&apos;aide a la decision. Il ne
            remplace pas le jugement clinique du veterinaire. Toujours valider
            avec un confrere senior en cas de doute.
          </p>
        </div>
      </div>

      <div>
        <h1 className="text-2xl font-bold tracking-tight">Modules</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Selectionnez un module pour commencer
        </p>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        {MODULES.map((mod) => (
          <ModuleCard key={mod.slug} module={mod} />
        ))}
      </div>
    </div>
  );
}
