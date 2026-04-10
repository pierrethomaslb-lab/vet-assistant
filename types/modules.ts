import type { LucideIcon } from "lucide-react";

export interface ChecklistItem {
  id: string;
  label: string;
  /** Show only for these species */
  species?: ("chien" | "chat")[];
  /** Show only if problem matches one of these keywords */
  problemKeywords?: string[];
  /** Show only for young animals (keyword match on age) */
  young?: boolean;
  /** Show only for senior animals (keyword match on age) */
  senior?: boolean;
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
