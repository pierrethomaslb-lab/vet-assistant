"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  type ReactNode,
} from "react";
import type { CaseInfo } from "@/components/modules/case-intake";

interface CaseState {
  info: CaseInfo | null;
  checklists: Record<string, Set<string>>;
  answers: Record<string, Record<string, string>>;
}

interface CaseContextValue {
  caseInfo: CaseInfo | null;
  setCaseInfo: (info: CaseInfo | null) => void;
  getChecklist: (moduleSlug: string) => Set<string>;
  setChecklist: (moduleSlug: string, checked: Set<string>) => void;
  getAnswers: (moduleSlug: string) => Record<string, string>;
  setAnswers: (moduleSlug: string, answers: Record<string, string>) => void;
  reset: () => void;
}

const CaseContext = createContext<CaseContextValue | null>(null);

export function CaseProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<CaseState>({
    info: null,
    checklists: {},
    answers: {},
  });

  const setCaseInfo = useCallback((info: CaseInfo | null) => {
    if (!info) {
      setState({ info: null, checklists: {}, answers: {} });
    } else {
      setState((prev) => ({ ...prev, info }));
    }
  }, []);

  const getChecklist = useCallback(
    (moduleSlug: string) => state.checklists[moduleSlug] ?? new Set<string>(),
    [state.checklists]
  );

  const setChecklist = useCallback(
    (moduleSlug: string, checked: Set<string>) => {
      setState((prev) => ({
        ...prev,
        checklists: { ...prev.checklists, [moduleSlug]: checked },
      }));
    },
    []
  );

  const getAnswers = useCallback(
    (moduleSlug: string) => state.answers[moduleSlug] ?? {},
    [state.answers]
  );

  const setAnswers = useCallback(
    (moduleSlug: string, answers: Record<string, string>) => {
      setState((prev) => ({
        ...prev,
        answers: { ...prev.answers, [moduleSlug]: answers },
      }));
    },
    []
  );

  const reset = useCallback(() => {
    setState({ info: null, checklists: {}, answers: {} });
  }, []);

  return (
    <CaseContext.Provider
      value={{
        caseInfo: state.info,
        setCaseInfo,
        getChecklist,
        setChecklist,
        getAnswers,
        setAnswers,
        reset,
      }}
    >
      {children}
    </CaseContext.Provider>
  );
}

export function useCase() {
  const ctx = useContext(CaseContext);
  if (!ctx) throw new Error("useCase must be used within CaseProvider");
  return ctx;
}
