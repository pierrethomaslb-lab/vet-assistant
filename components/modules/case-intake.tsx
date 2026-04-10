"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Cat, Dog, ArrowRight } from "lucide-react";

export interface CaseInfo {
  species: "chien" | "chat" | null;
  age: string;
  problem: string;
}

interface CaseIntakeProps {
  onSubmit: (info: CaseInfo) => void;
}

export function CaseIntake({ onSubmit }: CaseIntakeProps) {
  const [species, setSpecies] = useState<"chien" | "chat" | null>(null);
  const [age, setAge] = useState("");
  const [problem, setProblem] = useState("");

  const canSubmit = species && problem.trim().length > 0;

  return (
    <Card className="border-2 border-primary/20">
      <CardHeader className="space-y-5 p-5 sm:p-6">
        <div>
          <CardTitle className="text-lg">Nouveau cas</CardTitle>
          <CardDescription className="mt-1">
            Quelques infos avant de commencer
          </CardDescription>
        </div>

        {/* Species */}
        <div className="space-y-2">
          <label className="text-sm font-medium">Espece</label>
          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => setSpecies("chien")}
              className={`flex flex-1 items-center justify-center gap-2 rounded-xl border-2 py-4 text-[15px] font-medium transition-all active:scale-95 ${
                species === "chien"
                  ? "border-primary bg-primary/10 text-primary"
                  : "border-border bg-card text-muted-foreground hover:border-primary/30"
              }`}
            >
              <Dog className="h-6 w-6" />
              Chien
            </button>
            <button
              type="button"
              onClick={() => setSpecies("chat")}
              className={`flex flex-1 items-center justify-center gap-2 rounded-xl border-2 py-4 text-[15px] font-medium transition-all active:scale-95 ${
                species === "chat"
                  ? "border-primary bg-primary/10 text-primary"
                  : "border-border bg-card text-muted-foreground hover:border-primary/30"
              }`}
            >
              <Cat className="h-6 w-6" />
              Chat
            </button>
          </div>
        </div>

        {/* Age */}
        <div className="space-y-2">
          <label className="text-sm font-medium">
            Age / race / poids{" "}
            <span className="text-muted-foreground font-normal">(optionnel)</span>
          </label>
          <input
            type="text"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            placeholder="Ex: Labrador 3 ans, 25kg"
            className="flex h-12 w-full rounded-xl border bg-card px-4 text-[15px] placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
          />
        </div>

        {/* Problem */}
        <div className="space-y-2">
          <label className="text-sm font-medium">Motif de consultation</label>
          <Textarea
            value={problem}
            onChange={(e) => setProblem(e.target.value)}
            placeholder="Decrivez brievement le probleme...&#10;Ex: Vomissements depuis 2 jours, ne mange plus"
            rows={3}
            className="resize-none text-[15px] rounded-xl"
          />
        </div>

        <Button
          onClick={() => onSubmit({ species, age, problem })}
          disabled={!canSubmit}
          className="w-full h-12 text-base rounded-xl gap-2"
        >
          Acceder aux modules
          <ArrowRight className="h-4 w-4" />
        </Button>
      </CardHeader>
    </Card>
  );
}
