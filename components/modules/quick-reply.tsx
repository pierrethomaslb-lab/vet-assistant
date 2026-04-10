"use client";

import type { QuestionOption } from "@/types/modules";
import { Button } from "@/components/ui/button";

interface QuickReplyProps {
  options: QuestionOption[];
  onSelect: (option: QuestionOption) => void;
}

export function QuickReply({ options, onSelect }: QuickReplyProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((option) => (
        <Button
          key={option.label}
          variant="outline"
          className="h-auto min-h-[44px] px-4 py-2.5 text-base font-medium transition-all hover:border-primary hover:bg-primary/5 active:scale-95"
          onClick={() => onSelect(option)}
        >
          {option.label}
        </Button>
      ))}
    </div>
  );
}
