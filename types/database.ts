export interface CaseRow {
  id: string;
  created_at: string;
  species: string;
  age_info: string | null;
  problem: string;
  module_slug: string;
  checklist_data: Record<string, boolean> | null;
  questions_data: Record<string, string> | null;
  doubt_text: string | null;
  ai_recommendation: string | null;
  validation_status: "pending" | "validated" | "modified";
  senior_feedback: string | null;
  validated_at: string | null;
}

export interface CaseInsert {
  id?: string;
  created_at?: string;
  species: string;
  age_info?: string | null;
  problem: string;
  module_slug: string;
  checklist_data?: Record<string, boolean> | null;
  questions_data?: Record<string, string> | null;
  doubt_text?: string | null;
  ai_recommendation?: string | null;
  validation_status?: "pending" | "validated" | "modified";
  senior_feedback?: string | null;
  validated_at?: string | null;
}

export type CaseUpdate = Partial<CaseInsert>;

// Supabase Database type — simplified without self-reference
export interface Database {
  public: {
    Tables: {
      cases: {
        Row: CaseRow;
        Insert: CaseInsert;
        Update: CaseUpdate;
      };
    };
  };
}
