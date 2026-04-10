"use client";

import { useState, useCallback } from "react";
import type { ChecklistItem } from "@/types/modules";

export function useChecklist(items: ChecklistItem[]) {
  const [checked, setChecked] = useState<Set<string>>(new Set());

  const toggle = useCallback((id: string) => {
    setChecked((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  }, []);

  const isChecked = useCallback((id: string) => checked.has(id), [checked]);

  const completedCount = checked.size;
  const totalCount = items.length;
  const progress = totalCount > 0 ? (completedCount / totalCount) * 100 : 0;

  return { checked, toggle, isChecked, completedCount, totalCount, progress };
}
