"use client";

import { useState, useCallback, useId } from "react";
import type { QuestionStep, QuestionOption, Message } from "@/types/modules";
import { ChatContainer } from "@/components/chat/chat-container";
import { QuickReply } from "@/components/modules/quick-reply";
import { VoiceInput } from "@/components/chat/voice-input";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Send, RotateCcw } from "lucide-react";

interface QuestionsTabProps {
  steps: QuestionStep[];
  onAnswersChange?: (answers: Record<string, string>) => void;
}

export function QuestionsTab({ steps, onAnswersChange }: QuestionsTabProps) {
  const prefix = useId();
  const [messages, setMessages] = useState<Message[]>(() => {
    if (steps.length === 0) return [];
    return [
      {
        id: `${prefix}-init`,
        role: "assistant",
        content: steps[0].question,
        timestamp: new Date(),
      },
    ];
  });
  const [currentStepId, setCurrentStepId] = useState<string | null>(
    steps[0]?.id ?? null
  );
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [freeTextInput, setFreeTextInput] = useState("");
  const [showFreeText, setShowFreeText] = useState(false);

  const currentStep = steps.find((s) => s.id === currentStepId);

  const addMessage = useCallback(
    (role: "assistant" | "user", content: string) => {
      setMessages((prev) => [
        ...prev,
        {
          id: `${prefix}-${Date.now()}-${Math.random()}`,
          role,
          content,
          timestamp: new Date(),
        },
      ]);
    },
    [prefix]
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
          addMessage("assistant", next.question);
        }, 300);
      } else {
        setCurrentStepId(null);
      }
    },
    [steps, addMessage]
  );

  const handleSelect = useCallback(
    (option: QuestionOption) => {
      if (option.freeText) {
        setShowFreeText(true);
        return;
      }

      addMessage("user", option.label);

      if (currentStepId) {
        const newAnswers = { ...answers, [currentStepId]: option.label };
        setAnswers(newAnswers);
        onAnswersChange?.(newAnswers);
      }

      goToStep(option.nextStepId);
      setShowFreeText(false);
    },
    [addMessage, currentStepId, answers, onAnswersChange, goToStep]
  );

  const handleFreeTextSubmit = useCallback(() => {
    const text = freeTextInput.trim();
    if (!text) return;

    addMessage("user", text);

    if (currentStepId) {
      const newAnswers = { ...answers, [currentStepId]: text };
      setAnswers(newAnswers);
      onAnswersChange?.(newAnswers);
    }

    setFreeTextInput("");
    setShowFreeText(false);
    setCurrentStepId(null);
  }, [freeTextInput, addMessage, currentStepId, answers, onAnswersChange]);

  const handleReset = useCallback(() => {
    setMessages(
      steps.length > 0
        ? [
            {
              id: `${prefix}-reset-${Date.now()}`,
              role: "assistant",
              content: steps[0].question,
              timestamp: new Date(),
            },
          ]
        : []
    );
    setCurrentStepId(steps[0]?.id ?? null);
    setAnswers({});
    setFreeTextInput("");
    setShowFreeText(false);
    onAnswersChange?.({});
  }, [steps, prefix, onAnswersChange]);

  const isFinished = !currentStep && messages.length > 1;

  return (
    <div className="flex flex-col gap-4">
      <ChatContainer messages={messages} />

      {currentStep && !showFreeText && (
        <QuickReply options={currentStep.options} onSelect={handleSelect} />
      )}

      {(showFreeText || currentStep?.allowVoice) && currentStep && (
        <form
          className="flex items-center gap-2"
          onSubmit={(e) => {
            e.preventDefault();
            handleFreeTextSubmit();
          }}
        >
          <Input
            value={freeTextInput}
            onChange={(e) => setFreeTextInput(e.target.value)}
            placeholder="Tapez votre reponse..."
            className="h-11 text-base"
            autoFocus={showFreeText}
          />
          <VoiceInput disabled />
          <Button
            type="submit"
            size="icon"
            className="h-11 w-11 shrink-0"
            disabled={!freeTextInput.trim()}
          >
            <Send className="h-4 w-4" />
          </Button>
        </form>
      )}

      {isFinished && (
        <div className="space-y-3">
          <div className="rounded-lg border-l-4 border-emerald-500 bg-emerald-50 p-4 text-sm text-emerald-800">
            <p className="font-medium">Parcours termine</p>
            <p className="mt-1">
              Passez a l&apos;onglet Validation pour envoyer votre cas.
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

      {!currentStep && messages.length <= 1 && steps.length === 0 && (
        <p className="text-center text-sm text-muted-foreground">
          Aucune question configuree pour ce module.
        </p>
      )}
    </div>
  );
}
