"use client";

import { useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { notFound } from "next/navigation";
import { getModuleBySlug } from "@/lib/modules-config";
import { filterChecklist } from "@/lib/checklist-filter";
import { useCase } from "@/contexts/case-context";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChecklistTab } from "@/components/modules/checklist-tab";
import { QuestionsTab } from "@/components/modules/questions-tab";
import { ValidationTab } from "@/components/modules/validation-tab";
import { Badge } from "@/components/ui/badge";
import {
  ChevronLeft,
  ClipboardCheck,
  MessageCircle,
  ShieldCheck,
  Dog,
  Cat,
} from "lucide-react";

interface ModulePageClientProps {
  slug: string;
}

export function ModulePageClient({ slug }: ModulePageClientProps) {
  const module = getModuleBySlug(slug);
  const router = useRouter();
  const {
    caseInfo,
    getChecklist,
    setChecklist,
    getAnswers,
    setAnswers,
  } = useCase();

  if (!module) {
    notFound();
  }

  // Redirect to home if no case started
  if (!caseInfo) {
    router.push("/");
    return null;
  }

  const Icon = module.icon;
  const SpeciesIcon = caseInfo.species === "chat" ? Cat : Dog;
  const checkedIds = getChecklist(slug);
  const answers = getAnswers(slug);

  const contextualChecklist = useMemo(
    () => filterChecklist(module.checklist, caseInfo),
    [module.checklist, caseInfo]
  );

  const questionLabels = useMemo(() => {
    const map: Record<string, string> = {};
    for (const step of module.questionSteps) {
      map[step.id] = step.question;
    }
    return map;
  }, [module.questionSteps]);

  return (
    <div className="space-y-4">
      <Link
        href="/"
        className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        <ChevronLeft className="h-4 w-4" />
        Retour
      </Link>

      {/* Case context bar */}
      <div className="flex items-center gap-2 rounded-lg bg-muted/50 px-3 py-2 text-sm">
        <SpeciesIcon className="h-4 w-4 text-primary" />
        <span className="font-medium capitalize">{caseInfo.species}</span>
        {caseInfo.age && (
          <Badge variant="secondary" className="text-xs">
            {caseInfo.age}
          </Badge>
        )}
        <span className="text-muted-foreground truncate">
          — {caseInfo.problem}
        </span>
      </div>

      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
          <Icon className="h-5 w-5" />
        </div>
        <h1 className="text-xl font-bold tracking-tight">{module.name}</h1>
      </div>

      <Tabs defaultValue="checklist" className="w-full">
        <TabsList className="w-full">
          <TabsTrigger value="checklist" className="flex-1 gap-1.5">
            <ClipboardCheck className="h-4 w-4" />
            <span className="hidden sm:inline">Checklist</span>
          </TabsTrigger>
          <TabsTrigger value="questions" className="flex-1 gap-1.5">
            <MessageCircle className="h-4 w-4" />
            <span className="hidden sm:inline">Questions</span>
          </TabsTrigger>
          <TabsTrigger value="validation" className="flex-1 gap-1.5">
            <ShieldCheck className="h-4 w-4" />
            <span className="hidden sm:inline">Validation</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="checklist" className="mt-4">
          <ChecklistTab
            items={contextualChecklist}
            caseInfo={caseInfo}
            onChecklistChange={(checked) => setChecklist(slug, checked)}
          />
        </TabsContent>

        <TabsContent value="questions" className="mt-4">
          <QuestionsTab
            steps={module.questionSteps}
            caseInfo={caseInfo}
            moduleSlug={slug}
            moduleName={module.name}
            onAnswersChange={(a) => setAnswers(slug, a)}
          />
        </TabsContent>

        <TabsContent value="validation" className="mt-4">
          <ValidationTab
            moduleName={module.name}
            moduleSlug={slug}
            checklistItems={contextualChecklist}
            checkedIds={checkedIds}
            answers={answers}
            questionLabels={questionLabels}
            caseInfo={caseInfo}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}
