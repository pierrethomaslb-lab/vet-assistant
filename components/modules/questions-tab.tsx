"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import type { QuestionStep, QuestionOption } from "@/types/modules";
import type { CaseInfo } from "@/components/modules/case-intake";
import { ChatContainer } from "@/components/chat/chat-container";
import { QuickReply } from "@/components/modules/quick-reply";
import { VoiceInput } from "@/components/chat/voice-input";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Send, RotateCcw, Loader2 } from "lucide-react";
import type { Message } from "@/types/modules";

interface QuestionsTabProps {
  steps: QuestionStep[];
  caseInfo?: CaseInfo;
  moduleSlug?: string;
  moduleName?: string;
  onAnswersChange?: (answers: Record<string, string>) => void;
}

function buildCaseIntro(caseInfo: CaseInfo, moduleName: string): string {
  const parts = [`Je vois que vous consultez pour un **${caseInfo.species}**`];
  if (caseInfo.age) parts[0] += ` (${caseInfo.age})`;
  parts[0] += `.`;
  parts.push(`Motif : **${caseInfo.problem}**`);
  parts.push(`\nJe vais vous guider sur le module **${moduleName}**. Commençons.`);
  return parts.join("\n");
}

export function QuestionsTab({
  steps,
  caseInfo,
  moduleSlug,
  moduleName,
  onAnswersChange,
}: QuestionsTabProps) {
  const [freeTextInput, setFreeTextInput] = useState("");
  const [currentStepId, setCurrentStepId] = useState<string | null>(
    steps[0]?.id ?? null
  );
  const [guidedAnswers, setGuidedAnswers] = useState<Record<string, string>>(
    {}
  );
  const [hasSentInit, setHasSentInit] = useState(false);

  // Build initial message based on case
  const [localMessages, setLocalMessages] = useState<Message[]>(() => {
    const msgs: Message[] = [];

    if (caseInfo && moduleName) {
      msgs.push({
        id: "case-intro",
        role: "assistant",
        content: buildCaseIntro(caseInfo, moduleName),
        timestamp: new Date(),
      });
    }

    if (steps.length > 0) {
      msgs.push({
        id: "init-question",
        role: "assistant",
        content: steps[0].question,
        timestamp: new Date(),
      });
    }

    return msgs;
  });

  const caseContext = caseInfo
    ? `Espece: ${caseInfo.species}\nAge/Race/Poids: ${caseInfo.age || "Non precise"}\nMotif: ${caseInfo.problem}`
    : undefined;

  const transportRef = useRef(
    new DefaultChatTransport({
      api: "/api/chat",
      body: { moduleSlug: moduleSlug ?? "posologie", caseContext },
    })
  );

  const { messages: aiMessages, sendMessage, status } = useChat({
    transport: transportRef.current,
  });

  const isLoading = status === "streaming" || status === "submitted";

  // Auto-send case context to AI on first interaction so it knows the case
  const sendInitContext = useCallback(() => {
    if (hasSentInit || !caseInfo) return;
    setHasSentInit(true);
  }, [hasSentInit, caseInfo]);

  // Merge local guided messages with AI messages
  const allMessages: Message[] = [
    ...localMessages,
    ...aiMessages.map((m) => ({
      id: m.id,
      role: m.role as "assistant" | "user",
      content:
        m.parts
          ?.filter((p) => p.type === "text")
          .map((p) => p.text)
          .join("") ?? "",
      timestamp: new Date(),
    })),
  ];

  const currentStep = steps.find((s) => s.id === currentStepId);

  const addLocalMessage = useCallback(
    (role: "assistant" | "user", content: string) => {
      setLocalMessages((prev) => [
        ...prev,
        {
          id: `local-${Date.now()}-${Math.random()}`,
          role,
          content,
          timestamp: new Date(),
        },
      ]);
    },
    []
  );

  const goToStep = useCallback(
    (stepId: string | undefined) => {
      if (!stepId) {
        setCurrentStepId(null);
        return;
      }
      const next = steps.find((s) => s.id === stepId);
      if (next) {
        setCurrentStepId(stepId);
        setTimeout(() => {
          addLocalMessage("assistant", next.question);
        }, 300);
      } else {
        setCurrentStepId(null);
      }
    },
    [steps, addLocalMessage]
  );

  const handleSelect = useCallback(
    (option: QuestionOption) => {
      addLocalMessage("user", option.label);

      if (currentStepId) {
        const newAnswers = { ...guidedAnswers, [currentStepId]: option.label };
        setGuidedAnswers(newAnswers);
        onAnswersChange?.(newAnswers);
      }

      if (option.freeText) {
        setCurrentStepId(null);
      } else {
        goToStep(option.nextStepId);
      }
    },
    [addLocalMessage, currentStepId, guidedAnswers, onAnswersChange, goToStep]
  );

  const handleFreeTextSubmit = useCallback(() => {
    const text = freeTextInput.trim();
    if (!text || isLoading) return;

    // Prepend case context on first AI message
    let messageText = text;
    if (!hasSentInit && caseInfo) {
      const guidedSummary = Object.keys(guidedAnswers).length > 0
        ? `\n\nReponses guidees precedentes :\n${Object.entries(guidedAnswers)
            .map(([, v]) => `- ${v}`)
            .join("\n")}`
        : "";
      messageText = `[Contexte du cas : ${caseInfo.species}${caseInfo.age ? `, ${caseInfo.age}` : ""}, motif: ${caseInfo.problem}]${guidedSummary}\n\n${text}`;
      setHasSentInit(true);
    }

    sendMessage({ text: messageText });
    setFreeTextInput("");

    if (currentStepId) {
      const newAnswers = { ...guidedAnswers, [currentStepId]: text };
      setGuidedAnswers(newAnswers);
      onAnswersChange?.(newAnswers);
      setCurrentStepId(null);
    }
  }, [
    freeTextInput,
    isLoading,
    sendMessage,
    currentStepId,
    guidedAnswers,
    onAnswersChange,
    hasSentInit,
    caseInfo,
  ]);

  const handleReset = useCallback(() => {
    const msgs: Message[] = [];
    if (caseInfo && moduleName) {
      msgs.push({
        id: `case-intro-${Date.now()}`,
        role: "assistant",
        content: buildCaseIntro(caseInfo, moduleName),
        timestamp: new Date(),
      });
    }
    if (steps.length > 0) {
      msgs.push({
        id: `reset-${Date.now()}`,
        role: "assistant",
        content: steps[0].question,
        timestamp: new Date(),
      });
    }
    setLocalMessages(msgs);
    setCurrentStepId(steps[0]?.id ?? null);
    setGuidedAnswers({});
    setFreeTextInput("");
    setHasSentInit(false);
    onAnswersChange?.({});
  }, [steps, caseInfo, moduleName, onAnswersChange]);

  const guidedFinished = !currentStep && localMessages.length > 1 && !localMessages.every(m => m.role === "assistant");

  return (
    <div className="flex flex-col">
      {/* Chat area */}
      <div className="min-h-[200px] max-h-[50vh] overflow-y-auto pb-3">
        <ChatContainer messages={allMessages} />
        {isLoading && (
          <div className="flex items-center gap-2 mt-3 text-sm text-muted-foreground">
            <Loader2 className="h-4 w-4 animate-spin" />
            L&apos;assistant reflechit...
          </div>
        )}
      </div>

      {/* Quick reply suggestions */}
      {currentStep && (
        <div className="border-t pt-3 pb-2">
          <p className="text-xs text-muted-foreground mb-2">
            Reponses rapides
          </p>
          <QuickReply options={currentStep.options} onSelect={handleSelect} />
        </div>
      )}

      {/* Guided finished hint */}
      {guidedFinished && aiMessages.length === 0 && (
        <div className="border-t pt-3 space-y-3">
          <div className="rounded-lg border-l-4 border-emerald-500 bg-emerald-50 p-4 text-sm text-emerald-800">
            <p className="font-medium">Parcours guide termine</p>
            <p className="mt-1">
              Posez une question libre ci-dessous ou passez a l&apos;onglet
              Validation.
            </p>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleReset}
            className="gap-1.5"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            Recommencer
          </Button>
        </div>
      )}

      {/* Permanent input bar */}
      <form
        className="sticky bottom-0 flex items-center gap-2 border-t bg-background pt-3 mt-2"
        onSubmit={(e) => {
          e.preventDefault();
          handleFreeTextSubmit();
        }}
      >
        <Input
          value={freeTextInput}
          onChange={(e) => setFreeTextInput(e.target.value)}
          placeholder={
            caseInfo
              ? `Question sur ce ${caseInfo.species} (${caseInfo.problem})...`
              : "Decrivez votre situation ou posez une question..."
          }
          className="h-12 text-base rounded-full px-4"
          disabled={isLoading}
        />
        <VoiceInput disabled />
        <Button
          type="submit"
          size="icon"
          className="h-12 w-12 shrink-0 rounded-full"
          disabled={!freeTextInput.trim() || isLoading}
        >
          {isLoading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Send className="h-4 w-4" />
          )}
        </Button>
      </form>
    </div>
  );
}
