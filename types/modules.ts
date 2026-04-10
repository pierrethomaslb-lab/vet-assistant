import type { LucideIcon } from "lucide-react";

export interface ChecklistItem {
  id: string;
  label: string;
}

export interface QuestionOption {
  label: string;
  /** If set, navigates to this step ID when clicked */
  nextStepId?: string;
  /** If set, this is a free-text option */
  freeText?: boolean;
}

export interface QuestionStep {
  id: string;
  question: string;
  options: QuestionOption[];
  /** If true, show voice input button */
  allowVoice?: boolean;
}

export interface Message {
  id: string;
  role: "assistant" | "user";
  content: string;
  timestamp: Date;
}

export interface ModuleConfig {
  slug: string;
  name: string;
  description: string;
  icon: LucideIcon;
  checklist: ChecklistItem[];
  questionSteps: QuestionStep[];
}
