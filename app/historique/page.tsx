"use client";

import { useEffect, useState } from "react";
import {
  Dog,
  Cat,
  Inbox,
  Loader2,
  Clock,
  CheckCircle2,
  AlertCircle,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { CaseRow } from "@/types/database";

export default function HistoriquePage() {
  const [cases, setCases] = useState<CaseRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/cases")
      .then((res) => {
        if (!res.ok) throw new Error("Erreur chargement");
        return res.json();
      })
      .then((data) => setCases(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Historique</h1>
        </div>
        <div className="flex items-center gap-2 rounded-lg border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800">
          <AlertCircle className="h-4 w-4 shrink-0" />
          <p>
            Base de donnees non connectee. Ajoutez les variables Supabase dans
            .env.local pour activer l&apos;historique.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Historique</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          {cases.length} cas enregistre{cases.length > 1 ? "s" : ""}
        </p>
      </div>

      {cases.length === 0 ? (
        <Card>
          <CardHeader className="flex flex-col items-center gap-3 py-12 text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted">
              <Inbox className="h-6 w-6 text-muted-foreground" />
            </div>
            <div className="space-y-1">
              <CardTitle className="text-base">Aucun cas enregistre</CardTitle>
              <CardDescription>
                Les cas apparaitront ici apres une analyse IA.
              </CardDescription>
            </div>
          </CardHeader>
        </Card>
      ) : (
        <div className="space-y-3">
          {cases.map((c) => {
            const SpeciesIcon = c.species === "chat" ? Cat : Dog;
            const isExpanded = expandedId === c.id;
            const date = new Date(c.created_at);
            const statusColor =
              c.validation_status === "validated"
                ? "text-emerald-600"
                : c.validation_status === "modified"
                  ? "text-amber-600"
                  : "text-muted-foreground";
            const StatusIcon =
              c.validation_status === "validated"
                ? CheckCircle2
                : c.validation_status === "modified"
                  ? AlertCircle
                  : Clock;

            return (
              <Card key={c.id}>
                <button
                  type="button"
                  className="w-full text-left"
                  onClick={() =>
                    setExpandedId(isExpanded ? null : c.id)
                  }
                >
                  <CardHeader className="flex flex-row items-center gap-3 p-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                      <SpeciesIcon className="h-5 w-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-semibold text-sm capitalize">
                          {c.species}
                        </span>
                        {c.age_info && (
                          <Badge variant="secondary" className="text-xs">
                            {c.age_info}
                          </Badge>
                        )}
                        <Badge variant="outline" className="text-xs">
                          {c.module_slug}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground truncate mt-0.5">
                        {c.problem}
                      </p>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <StatusIcon className={`h-4 w-4 ${statusColor}`} />
                      <span className="text-xs text-muted-foreground hidden sm:inline">
                        {date.toLocaleDateString("fr-FR", {
                          day: "numeric",
                          month: "short",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                      {isExpanded ? (
                        <ChevronUp className="h-4 w-4 text-muted-foreground" />
                      ) : (
                        <ChevronDown className="h-4 w-4 text-muted-foreground" />
                      )}
                    </div>
                  </CardHeader>
                </button>

                {isExpanded && (
                  <div className="border-t px-4 py-4 space-y-4 text-sm">
                    {c.doubt_text && (
                      <div>
                        <p className="font-medium text-muted-foreground mb-1">
                          Doute exprime
                        </p>
                        <p>{c.doubt_text}</p>
                      </div>
                    )}
                    {c.ai_recommendation && (
                      <div>
                        <p className="font-medium text-muted-foreground mb-1">
                          Recommandation IA
                        </p>
                        <div className="rounded-lg bg-muted/50 p-3 whitespace-pre-wrap text-sm leading-relaxed">
                          {c.ai_recommendation}
                        </div>
                      </div>
                    )}
                    {c.senior_feedback && (
                      <div>
                        <p className="font-medium text-muted-foreground mb-1">
                          Feedback senior
                        </p>
                        <p>{c.senior_feedback}</p>
                      </div>
                    )}
                    <p className="text-xs text-muted-foreground">
                      {date.toLocaleDateString("fr-FR", {
                        weekday: "long",
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>
                )}
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
