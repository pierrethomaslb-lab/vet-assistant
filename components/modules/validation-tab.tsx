"use client";

import { useState, useRef } from "react";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import type { ChecklistItem } from "@/types/modules";
import type { CaseInfo } from "@/components/modules/case-intake";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import {
  CheckCircle2,
  XCircle,
  Send,
  MessageSquare,
  Smartphone,
  Loader2,
  Stethoscope,
} from "lucide-react";

interface ValidationTabProps {
  moduleName: string;
  checklistItems: ChecklistItem[];
  checkedIds: Set<string>;
  answers: Record<string, string>;
  questionLabels: Record<string, string>;
  caseInfo?: CaseInfo;
}

export function ValidationTab({
  moduleName,
  checklistItems,
  checkedIds,
  answers,
  questionLabels,
  caseInfo,
}: ValidationTabProps) {
  const [doubt, setDoubt] = useState("");
  const [aiAnalysis, setAiAnalysis] = useState<string | null>(null);
  const [whatsappSent, setWhatsappSent] = useState(false);

  const caseContext = caseInfo
    ? `Espece: ${caseInfo.species}\nAge/Race/Poids: ${caseInfo.age || "Non precise"}\nMotif: ${caseInfo.problem}`
    : undefined;

  const transportRef = useRef(
    new DefaultChatTransport({
      api: "/api/chat",
      body: { moduleSlug: "validation", caseContext },
    })
  );

  const { messages: aiMessages, sendMessage, status } = useChat({
    transport: transportRef.current,
  });

  const isLoading = status === "streaming" || status === "submitted";

  const hasData = checkedIds.size > 0 || Object.keys(answers).length > 0;

  const buildContext = () => {
    const parts: string[] = [];

    if (caseInfo) {
      parts.push(
        `PATIENT: ${caseInfo.species}${caseInfo.age ? ` — ${caseInfo.age}` : ""}`
      );
      parts.push(`MOTIF: ${caseInfo.problem}`);
    }

    parts.push(`\nMODULE: ${moduleName}`);

    if (checkedIds.size > 0) {
      parts.push("\nCHECKLIST:");
      checklistItems.forEach((item) => {
        const done = checkedIds.has(item.id);
        parts.push(`  ${done ? "[x]" : "[ ]"} ${item.label}`);
      });
    }

    if (Object.keys(answers).length > 0) {
      parts.push("\nPARCOURS QUESTIONS:");
      Object.entries(answers).forEach(([stepId, answer]) => {
        const label = questionLabels[stepId] ?? stepId;
        parts.push(`  ${label} → ${answer}`);
      });
    }

    return parts.join("\n");
  };

  const handleAnalyse = async () => {
    const context = buildContext();
    const prompt = doubt.trim()
      ? `Voici le contexte complet du cas :\n\n${context}\n\nDOUTE DU VETERINAIRE:\n"${doubt}"\n\nAnalyse ce cas et donne ta recommandation.`
      : `Voici le contexte complet du cas :\n\n${context}\n\nAnalyse ce cas et donne ta recommandation.`;

    sendMessage({ text: prompt });
  };

  const handleWhatsApp = async () => {
    const context = buildContext();
    const aiReco =
      aiMessages.length > 0
        ? aiMessages[aiMessages.length - 1].parts
            ?.filter((p) => p.type === "text")
            .map((p) => p.text)
            .join("") ?? ""
        : "";

    try {
      const res = await fetch("/api/whatsapp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          context,
          doubt: doubt.trim(),
          aiRecommendation: aiReco,
          moduleName,
        }),
      });
      if (res.ok) {
        setWhatsappSent(true);
      }
    } catch {
      // Will show error later when WhatsApp is configured
      alert(
        "WhatsApp non configure. Ajoutez les variables TWILIO dans .env.local"
      );
    }
  };

  // Get latest AI response
  const lastAiMessage =
    aiMessages.length > 0 ? aiMessages[aiMessages.length - 1] : null;
  const aiText =
    lastAiMessage?.role === "assistant"
      ? lastAiMessage.parts
          ?.filter((p) => p.type === "text")
          .map((p) => p.text)
          .join("") ?? ""
      : null;

  return (
    <div className="space-y-6">
      {/* Checklist recap */}
      <div className="space-y-3">
        <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
          Checklist
        </h3>
        {checklistItems.length > 0 ? (
          <div className="space-y-1.5">
            {checklistItems.map((item) => {
              const done = checkedIds.has(item.id);
              return (
                <div
                  key={item.id}
                  className="flex items-center gap-2 text-sm"
                >
                  {done ? (
                    <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                  ) : (
                    <XCircle className="h-4 w-4 text-muted-foreground/50" />
                  )}
                  <span className={done ? "" : "text-muted-foreground"}>
                    {item.label}
                  </span>
                </div>
              );
            })}
          </div>
        ) : (
          <p className="text-sm text-muted-foreground">Aucun element coche</p>
        )}
      </div>

      <Separator />

      {/* Questions recap */}
      <div className="space-y-3">
        <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
          Parcours questions
        </h3>
        {Object.keys(answers).length > 0 ? (
          <div className="space-y-2">
            {Object.entries(answers).map(([stepId, answer]) => (
              <div key={stepId} className="flex items-start gap-2 text-sm">
                <MessageSquare className="mt-0.5 h-4 w-4 text-primary" />
                <div>
                  <p className="text-muted-foreground">
                    {questionLabels[stepId] ?? stepId}
                  </p>
                  <Badge variant="secondary" className="mt-1">
                    {answer}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-muted-foreground">
            Aucune reponse enregistree
          </p>
        )}
      </div>

      <Separator />

      {/* Doubt expression */}
      <div className="space-y-3">
        <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
          Votre question / doute
        </h3>
        <Textarea
          value={doubt}
          onChange={(e) => setDoubt(e.target.value)}
          placeholder="Qu'est-ce qui vous pose probleme ? Decrivez votre doute ici..."
          rows={4}
          className="resize-none text-base"
        />
      </div>

      {/* AI Analysis button */}
      <Button
        className="w-full gap-2 h-12 text-base"
        disabled={(!hasData && !doubt.trim()) || isLoading}
        onClick={handleAnalyse}
      >
        {isLoading ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <Stethoscope className="h-4 w-4" />
        )}
        {isLoading ? "Analyse en cours..." : "Analyser avec l'IA"}
      </Button>

      {/* AI Response */}
      {aiText && (
        <div className="rounded-xl border-l-4 border-l-primary bg-card p-5 shadow-sm space-y-3">
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-primary text-primary-foreground">
              <Stethoscope className="h-3.5 w-3.5" />
            </div>
            <h3 className="font-semibold text-sm">Recommandation IA</h3>
          </div>
          <div className="text-sm leading-relaxed whitespace-pre-wrap">
            {aiText}
          </div>
        </div>
      )}

      {/* WhatsApp button */}
      {aiText && (
        <Button
          variant="outline"
          className="w-full gap-2 h-12 text-base border-emerald-300 text-emerald-700 hover:bg-emerald-50"
          onClick={handleWhatsApp}
          disabled={whatsappSent}
        >
          <Smartphone className="h-4 w-4" />
          {whatsappSent
            ? "Envoye a la boss"
            : "Envoyer pour validation (WhatsApp)"}
        </Button>
      )}

      {!hasData && !doubt.trim() && (
        <p className="text-center text-xs text-muted-foreground">
          Completez la checklist ou les questions avant d&apos;envoyer
        </p>
      )}
    </div>
  );
}
