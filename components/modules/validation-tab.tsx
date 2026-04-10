"use client";

import { useState } from "react";
import type { ChecklistItem } from "@/types/modules";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import {
  CheckCircle2,
  XCircle,
  Send,
  MessageSquare,
} from "lucide-react";

interface ValidationTabProps {
  moduleName: string;
  checklistItems: ChecklistItem[];
  checkedIds: Set<string>;
  answers: Record<string, string>;
  questionLabels: Record<string, string>;
}

export function ValidationTab({
  moduleName,
  checklistItems,
  checkedIds,
  answers,
  questionLabels,
}: ValidationTabProps) {
  const [doubt, setDoubt] = useState("");

  const hasData =
    checkedIds.size > 0 || Object.keys(answers).length > 0;

  return (
    <div className="space-y-6">
      {/* Checklist recap */}
      <div className="space-y-3">
        <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
          Checklist
        </h3>
        {checklistItems.length > 0 ? (
          <div className="space-y-1.5">
            {checklistItems.map((item) => {
              const done = checkedIds.has(item.id);
              return (
                <div
                  key={item.id}
                  className="flex items-center gap-2 text-sm"
                >
                  {done ? (
                    <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                  ) : (
                    <XCircle className="h-4 w-4 text-muted-foreground/50" />
                  )}
                  <span
                    className={
                      done ? "" : "text-muted-foreground"
                    }
                  >
                    {item.label}
                  </span>
                </div>
              );
            })}
          </div>
        ) : (
          <p className="text-sm text-muted-foreground">
            Aucun element coche
          </p>
        )}
      </div>

      <Separator />

      {/* Questions recap */}
      <div className="space-y-3">
        <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
          Parcours questions
        </h3>
        {Object.keys(answers).length > 0 ? (
          <div className="space-y-2">
            {Object.entries(answers).map(([stepId, answer]) => (
              <div key={stepId} className="flex items-start gap-2 text-sm">
                <MessageSquare className="mt-0.5 h-4 w-4 text-primary" />
                <div>
                  <p className="text-muted-foreground">
                    {questionLabels[stepId] ?? stepId}
                  </p>
                  <Badge variant="secondary" className="mt-1">
                    {answer}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-muted-foreground">
            Aucune reponse enregistree
          </p>
        )}
      </div>

      <Separator />

      {/* Doubt expression */}
      <div className="space-y-3">
        <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
          Votre question / doute
        </h3>
        <Textarea
          value={doubt}
          onChange={(e) => setDoubt(e.target.value)}
          placeholder="Qu'est-ce qui vous pose probleme ? Decrivez votre doute ici..."
          rows={4}
          className="resize-none text-base"
        />
      </div>

      {/* Send button */}
      <Button
        className="w-full gap-2 h-12 text-base"
        disabled={!hasData && !doubt.trim()}
        onClick={() => {
          // Placeholder — will integrate WhatsApp/AI later
          alert(
            `Validation envoyee pour le module "${moduleName}". Integration IA et WhatsApp a venir.`
          );
        }}
      >
        <Send className="h-4 w-4" />
        Envoyer pour validation
      </Button>

      {!hasData && !doubt.trim() && (
        <p className="text-center text-xs text-muted-foreground">
          Completez la checklist ou les questions avant d&apos;envoyer
        </p>
      )}
    </div>
  );
}
