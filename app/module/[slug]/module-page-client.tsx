"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getModuleBySlug } from "@/lib/modules-config";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChecklistTab } from "@/components/modules/checklist-tab";
import { QuestionsTab } from "@/components/modules/questions-tab";
import { ValidationTab } from "@/components/modules/validation-tab";
import { ChevronLeft, ClipboardCheck, MessageCircle, ShieldCheck } from "lucide-react";

interface ModulePageClientProps {
  slug: string;
}

export function ModulePageClient({ slug }: ModulePageClientProps) {
  const module = getModuleBySlug(slug);

  if (!module) {
    notFound();
  }

  const [checkedIds, setCheckedIds] = useState<Set<string>>(new Set());
  const [answers, setAnswers] = useState<Record<string, string>>({});

  const Icon = module.icon;

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
            items={module.checklist}
            onChecklistChange={setCheckedIds}
          />
        </TabsContent>

        <TabsContent value="questions" className="mt-4">
          <QuestionsTab
            steps={module.questionSteps}
            onAnswersChange={setAnswers}
          />
        </TabsContent>

        <TabsContent value="validation" className="mt-4">
          <ValidationTab
            moduleName={module.name}
            checklistItems={module.checklist}
            checkedIds={checkedIds}
            answers={answers}
            questionLabels={questionLabels}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}
