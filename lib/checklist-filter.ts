import type { ChecklistItem } from "@/types/modules";
import type { CaseInfo } from "@/components/modules/case-intake";

const YOUNG_KEYWORDS = ["chiot", "chaton", "jeune", "bebe", "mois", "semaine", "< 1 an", "puppy", "kitten"];
const SENIOR_KEYWORDS = ["senior", "age", "âge", "vieux", "ancien", "> 7", "> 8", "> 10", "12 ans", "13 ans", "14 ans", "15 ans"];

function matchesKeywords(text: string, keywords: string[]): boolean {
  const lower = text.toLowerCase();
  return keywords.some((kw) => lower.includes(kw.toLowerCase()));
}

export function filterChecklist(items: ChecklistItem[], caseInfo?: CaseInfo): ChecklistItem[] {
  if (!caseInfo) return items.filter((i) => !i.species && !i.problemKeywords && !i.young && !i.senior);

  const ageText = caseInfo.age || "";
  const problemText = caseInfo.problem || "";
  const isYoung = matchesKeywords(ageText, YOUNG_KEYWORDS);
  const isSenior = matchesKeywords(ageText, SENIOR_KEYWORDS);

  return items.filter((item) => {
    if (item.species && caseInfo.species && !item.species.includes(caseInfo.species)) return false;
    if (item.problemKeywords && !matchesKeywords(problemText, item.problemKeywords)) return false;
    if (item.young && !isYoung) return false;
    if (item.senior && !isSenior) return false;
    return true;
  });
}
