"use client";

import type { ChecklistItem } from "@/types/modules";
import type { CaseInfo } from "@/components/modules/case-intake";
import { useChecklist } from "@/hooks/use-checklist";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, Dog, Cat } from "lucide-react";

interface ChecklistTabProps {
  items: ChecklistItem[];
  caseInfo?: CaseInfo;
  onChecklistChange?: (checked: Set<string>) => void;
}

export function ChecklistTab({ items, caseInfo, onChecklistChange }: ChecklistTabProps) {
  const { toggle, isChecked, completedCount, totalCount, progress } =
    useChecklist(items);

  const handleToggle = (id: string) => {
    toggle(id);
    if (onChecklistChange) {
      const next = new Set(
        items.filter((item) => {
          if (item.id === id) return !isChecked(id);
          return isChecked(item.id);
        }).map((item) => item.id)
      );
      onChecklistChange(next);
    }
  };

  const SpeciesIcon = caseInfo?.species === "chat" ? Cat : Dog;

  return (
    <div className="space-y-4">
      {/* Case reminder */}
      {caseInfo && (
        <div className="flex items-start gap-3 rounded-lg bg-primary/5 border border-primary/10 p-3">
          <SpeciesIcon className="h-5 w-5 text-primary mt-0.5 shrink-0" />
          <div className="text-sm">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-medium capitalize">{caseInfo.species}</span>
              {caseInfo.age && (
                <Badge variant="secondary" className="text-xs">{caseInfo.age}</Badge>
              )}
            </div>
            <p className="text-muted-foreground mt-0.5">{caseInfo.problem}</p>
          </div>
        </div>
      )}

      <div className="space-y-2">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Progression</span>
          <span className="font-medium">
            {completedCount} / {totalCount}
          </span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      {completedCount === totalCount && totalCount > 0 && (
        <div className="flex items-center gap-2 rounded-lg border border-emerald-200 bg-emerald-50 p-3 text-sm text-emerald-800">
          <CheckCircle2 className="h-4 w-4" />
          Checklist complete
        </div>
      )}

      <div className="space-y-1">
        {items.map((item) => (
          <label
            key={item.id}
            className="flex cursor-pointer items-center gap-3 rounded-lg p-3 transition-colors hover:bg-muted/50"
          >
            <Checkbox
              checked={isChecked(item.id)}
              onCheckedChange={() => handleToggle(item.id)}
              className="h-5 w-5"
            />
            <span
              className={
                isChecked(item.id)
                  ? "text-muted-foreground line-through"
                  : ""
              }
            >
              {item.label}
            </span>
          </label>
        ))}
      </div>
    </div>
  );
}
