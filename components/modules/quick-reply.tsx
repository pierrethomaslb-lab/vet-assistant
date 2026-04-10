"use client";

import type { QuestionOption } from "@/types/modules";

interface QuickReplyProps {
  options: QuestionOption[];
  onSelect: (option: QuestionOption) => void;
}

export function QuickReply({ options, onSelect }: QuickReplyProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((option) => (
        <button
          key={option.label}
          type="button"
          className="min-h-[48px] rounded-full border-2 border-primary/20 bg-card px-5 py-2.5 text-[15px] font-medium text-primary shadow-sm transition-all hover:border-primary hover:bg-primary/5 active:scale-95 active:bg-primary/10"
          onClick={() => onSelect(option)}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}
