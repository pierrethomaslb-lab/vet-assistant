"use client";

import { MODULES } from "@/lib/modules-config";
import { ModuleCard } from "@/components/modules/module-card";
import { CaseIntake } from "@/components/modules/case-intake";
import { useCase } from "@/contexts/case-context";
import { ShieldAlert, Dog, Cat, RotateCcw } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default function HomePage() {
  const { caseInfo, setCaseInfo, reset } = useCase();

  if (!caseInfo) {
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
        <CaseIntake onSubmit={setCaseInfo} />
      </div>
    );
  }

  const SpeciesIcon = caseInfo.species === "chat" ? Cat : Dog;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 rounded-xl border bg-card p-4 shadow-sm">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
          <SpeciesIcon className="h-5 w-5" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-semibold text-sm capitalize">
              {caseInfo.species}
            </span>
            {caseInfo.age && (
              <Badge variant="secondary" className="text-xs">
                {caseInfo.age}
              </Badge>
            )}
          </div>
          <p className="text-sm text-muted-foreground truncate mt-0.5">
            {caseInfo.problem}
          </p>
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="shrink-0 h-9 w-9"
          onClick={reset}
          title="Nouveau cas"
        >
          <RotateCcw className="h-4 w-4" />
        </Button>
      </div>

      <div>
        <h1 className="text-2xl font-bold tracking-tight">Modules</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Suivez les etapes dans l&apos;ordre
        </p>
      </div>

      <div className="flex flex-col gap-3">
        {MODULES.map((mod, index) => (
          <ModuleCard key={mod.slug} module={mod} step={index + 1} />
        ))}
      </div>
    </div>
  );
}
