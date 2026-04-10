"use client";

import { useState } from "react";
import Link from "next/link";
import { MODULES } from "@/lib/modules-config";
import { filterChecklist } from "@/lib/checklist-filter";
import type { CaseInfo } from "@/components/modules/case-intake";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import {
  Dog,
  ChevronRight,
  CheckCircle2,
  Circle,
  AlertTriangle,
  ClipboardList,
  Microscope,
  Target,
  Pill,
  UserRound,
  Stethoscope,
  ArrowRight,
  Play,
  Smartphone,
} from "lucide-react";

const DEMO_CASE: CaseInfo = {
  species: "chien",
  age: "3 ans labrador, 28kg",
  problem: "Diarrhee et vomissements depuis 48h, abattu, ne mange plus",
};

interface TimelineStep {
  time: string;
  title: string;
  description: string;
  type: "intake" | "module" | "decision" | "outcome";
}

const TIMELINE: TimelineStep[] = [
  {
    time: "09:00",
    title: "Accueil et prise en charge",
    description: "Le proprietaire amene Max, labrador de 3 ans. Vomissements et diarrhee depuis 48h, ne mange plus, semble abattu. Pas de vaccination a jour pour la leptospirose.",
    type: "intake",
  },
  {
    time: "09:05",
    title: "Anamnese + Examen clinique",
    description: "Checklist adaptee : palpation abdominale, recherche corps etranger/toxique, verification statut vaccinal. T° 39.8°C, FC 110, deshydratation estimee 5-7%, abdomen tendu et douloureux.",
    type: "module",
  },
  {
    time: "09:20",
    title: "Examens complementaires",
    description: "Checklist contextuelle : radiographie abdominale (suspicion corps etranger), NFS + biochimie. Resultat : leucocytose, legere azotemia pre-renale (deshydratation), pas d'image de corps etranger.",
    type: "module",
  },
  {
    time: "09:45",
    title: "Diagnostic differentiel",
    description: "Hypotheses classees : 1) Gastro-enterite aigue (toxique/alimentaire), 2) Pancreatite aigue, 3) Leptospirose (vaccin non a jour). Decision : cPLI snap test → positif.",
    type: "module",
  },
  {
    time: "10:00",
    title: "Decision therapeutique",
    description: "Diagnostic retenu : pancreatite aigue. Hospitalisation pour fluidotherapie IV, maropitant (anti-vomitif), gabapentine (douleur viscerale). Doses calculees pour 28kg.",
    type: "decision",
  },
  {
    time: "10:15",
    title: "Communication client",
    description: "Annonce du diagnostic, explication du pronostic (favorable si pris en charge), devis hospitalisation 48-72h presente et accepte. Suivi telephonique prevu a J+1.",
    type: "module",
  },
  {
    time: "J+3",
    title: "Issue du cas",
    description: "Max mange spontanement a J+2, sortie a J+3 avec traitement per os. Controle a J+7 : biochimie normalisee, proprietaire satisfait.",
    type: "outcome",
  },
];

const MODULE_ICONS = {
  anamnese: ClipboardList,
  examens: Microscope,
  diagnostic: Target,
  posologie: Pill,
  "gestion-client": UserRound,
};

function StepIcon({ type }: { type: TimelineStep["type"] }) {
  switch (type) {
    case "intake":
      return <Dog className="h-4 w-4" />;
    case "module":
      return <Stethoscope className="h-4 w-4" />;
    case "decision":
      return <AlertTriangle className="h-4 w-4" />;
    case "outcome":
      return <CheckCircle2 className="h-4 w-4" />;
  }
}

function stepColor(type: TimelineStep["type"]) {
  switch (type) {
    case "intake":
      return "bg-blue-500 text-white";
    case "module":
      return "bg-primary text-primary-foreground";
    case "decision":
      return "bg-amber-500 text-white";
    case "outcome":
      return "bg-emerald-500 text-white";
  }
}

export function DemoClient() {
  const [activeStep, setActiveStep] = useState(0);
  const [showChecklist, setShowChecklist] = useState<string | null>(null);

  return (
    <div className="space-y-8">
      {/* Hero */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Badge variant="secondary" className="text-xs font-medium">Cas d'etude</Badge>
          <Badge className="text-xs bg-emerald-100 text-emerald-800 hover:bg-emerald-100">Resolu</Badge>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
          Pancreatite aigue chez un Labrador
        </h1>
        <p className="text-muted-foreground leading-relaxed max-w-2xl">
          Parcours clinique complet avec VetAssistant : de l'accueil du patient a la guerison,
          en passant par les checklists contextuelles, le diagnostic differentiel guide et la
          communication client.
        </p>
      </div>

      {/* Patient card */}
      <Card className="border-2 border-primary/20">
        <CardHeader className="p-5">
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary">
              <Dog className="h-7 w-7" />
            </div>
            <div className="flex-1">
              <CardTitle className="text-lg">Max</CardTitle>
              <CardDescription className="mt-1 space-y-0.5">
                <span className="flex items-center gap-2 flex-wrap">
                  <Badge variant="secondary">Labrador</Badge>
                  <Badge variant="secondary">3 ans</Badge>
                  <Badge variant="secondary">28 kg</Badge>
                  <Badge variant="secondary">Male castre</Badge>
                </span>
              </CardDescription>
            </div>
          </div>
          <div className="mt-4 rounded-lg bg-destructive/5 border border-destructive/10 p-3">
            <p className="text-sm font-medium text-destructive">Motif de consultation</p>
            <p className="text-sm text-muted-foreground mt-1">
              Diarrhee et vomissements depuis 48h, abattu, ne mange plus.
              A potentiellement mange des restes de barbecue (os, gras).
            </p>
          </div>
        </CardHeader>
      </Card>

      {/* Checklists contextuelles */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold tracking-tight">Checklists adaptees au cas</h2>
        <p className="text-sm text-muted-foreground">
          VetAssistant genere des checklists specifiques selon l'espece, l'age, la race et le motif de consultation.
          Voici ce que l'app affiche pour Max :
        </p>
        <div className="grid gap-3 sm:grid-cols-2">
          {MODULES.map((mod) => {
            const items = filterChecklist(mod.checklist, DEMO_CASE);
            const baseItems = mod.checklist.filter(
              (i) => !i.species && !i.problemKeywords && !i.young && !i.senior
            );
            const contextItems = items.length - baseItems.length;
            const isOpen = showChecklist === mod.slug;
            const Icon = MODULE_ICONS[mod.slug as keyof typeof MODULE_ICONS] || ClipboardList;

            return (
              <Card
                key={mod.slug}
                className={`cursor-pointer transition-all hover:shadow-md ${isOpen ? "ring-2 ring-primary/30" : ""}`}
                onClick={() => setShowChecklist(isOpen ? null : mod.slug)}
              >
                <CardHeader className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
                        <Icon className="h-4.5 w-4.5" />
                      </div>
                      <div>
                        <CardTitle className="text-sm">{mod.name}</CardTitle>
                        <p className="text-xs text-muted-foreground mt-0.5">
                          {items.length} items
                          {contextItems > 0 && (
                            <span className="text-primary font-medium"> dont {contextItems} contextuels</span>
                          )}
                        </p>
                      </div>
                    </div>
                    <ChevronRight className={`h-4 w-4 text-muted-foreground transition-transform ${isOpen ? "rotate-90" : ""}`} />
                  </div>

                  {isOpen && (
                    <div className="mt-3 space-y-1.5 border-t pt-3">
                      {items.map((item) => {
                        const isContextual = item.species || item.problemKeywords || item.young || item.senior;
                        return (
                          <div key={item.id} className="flex items-start gap-2 text-sm">
                            {isContextual ? (
                              <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                            ) : (
                              <Circle className="h-4 w-4 text-muted-foreground/40 mt-0.5 shrink-0" />
                            )}
                            <span className={isContextual ? "text-primary font-medium" : ""}>
                              {item.label}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </CardHeader>
              </Card>
            );
          })}
        </div>
      </div>

      <Separator />

      {/* Timeline */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold tracking-tight">Deroulement chronologique</h2>
        <p className="text-sm text-muted-foreground">
          Comment VetAssistant accompagne le veterinaire a chaque etape du cas.
        </p>
      </div>

      <div className="space-y-0">
        {TIMELINE.map((step, i) => (
          <div
            key={i}
            className="relative flex gap-4 cursor-pointer group"
            onClick={() => setActiveStep(i)}
          >
            {/* Timeline line + dot */}
            <div className="flex flex-col items-center">
              <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full shadow-sm transition-all ${
                i === activeStep ? stepColor(step.type) + " scale-110" : "bg-muted text-muted-foreground"
              }`}>
                <StepIcon type={step.type} />
              </div>
              {i < TIMELINE.length - 1 && (
                <div className={`w-0.5 flex-1 mt-1 transition-colors ${
                  i < activeStep ? "bg-primary/40" : "bg-border"
                }`} />
              )}
            </div>

            {/* Content */}
            <div className={`flex-1 pb-6 transition-all ${i === activeStep ? "" : "opacity-60"}`}>
              <div className="flex items-center gap-2 mb-1">
                <Badge variant="outline" className="text-xs font-mono">{step.time}</Badge>
                <h3 className="font-semibold text-sm">{step.title}</h3>
              </div>
              {i === activeStep && (
                <p className="text-sm text-muted-foreground leading-relaxed mt-2 animate-in fade-in duration-300">
                  {step.description}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>

      <Separator />

      {/* Key takeaways */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold tracking-tight">Points cles de ce cas</h2>
        <div className="grid gap-3 sm:grid-cols-3">
          <Card>
            <CardHeader className="p-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600 mb-2">
                <ClipboardList className="h-5 w-5" />
              </div>
              <CardTitle className="text-sm">Checklist contextuelle</CardTitle>
              <CardDescription className="text-xs mt-1">
                La palpation abdominale et la recherche de corps etranger sont apparus automatiquement
                grace au motif "vomissements + diarrhee".
              </CardDescription>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className="p-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-50 text-amber-600 mb-2">
                <Target className="h-5 w-5" />
              </div>
              <CardTitle className="text-sm">Diagnostic guide</CardTitle>
              <CardDescription className="text-xs mt-1">
                L'arbre decisionnel a oriente vers le cPLI snap test,
                confirmant la pancreatite et evitant des examens inutiles.
              </CardDescription>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className="p-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 mb-2">
                <UserRound className="h-5 w-5" />
              </div>
              <CardTitle className="text-sm">Communication structuree</CardTitle>
              <CardDescription className="text-xs mt-1">
                Le module client a guide l'annonce du diagnostic, la presentation du devis
                et le plan de suivi — rien n'a ete oublie.
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </div>

      {/* WhatsApp validation */}
      <Card className="border-2 border-emerald-200 bg-emerald-50/50">
        <CardHeader className="p-5 sm:p-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600">
              <Smartphone className="h-5 w-5" />
            </div>
            <div>
              <CardTitle className="text-base">Demande de validation senior</CardTitle>
              <CardDescription className="text-xs mt-0.5">
                Envoyer le resume du cas par WhatsApp pour validation
              </CardDescription>
            </div>
          </div>

          <div className="rounded-lg bg-white border p-4 text-sm font-mono leading-relaxed whitespace-pre-wrap text-muted-foreground">
{`Demande validation — Cas #demo

PATIENT: Chien — Labrador 3 ans, 28kg, male castre
MOTIF: Diarrhee + vomissements depuis 48h, abattu, anorexie

EXAMEN CLINIQUE:
- T° 39.8°C, FC 110 bpm
- Deshydratation 5-7%
- Abdomen tendu, douloureux

EXAMENS REALISES:
[x] NFS → leucocytose
[x] Biochimie → azotemia pre-renale legere
[x] Radio abdo → RAS corps etranger
[x] cPLI snap → POSITIF

DIAGNOSTIC: Pancreatite aigue

TRAITEMENT PROPOSE:
- Fluidotherapie IV (Ringer lactate)
- Maropitant 1mg/kg IV SID
- Gabapentine 5mg/kg PO BID
- Hospitalisation 48-72h

Merci de valider la prise en charge.
— VetAssistant`}
          </div>

          <a
            href={`https://wa.me/?text=${encodeURIComponent(
`Demande validation — Cas #demo

PATIENT: Chien — Labrador 3 ans, 28kg, male castre
MOTIF: Diarrhee + vomissements depuis 48h, abattu, anorexie

EXAMEN CLINIQUE:
- T° 39.8°C, FC 110 bpm
- Deshydratation 5-7%
- Abdomen tendu, douloureux

EXAMENS REALISES:
✓ NFS → leucocytose
✓ Biochimie → azotemia pre-renale legere
✓ Radio abdo → RAS corps etranger
✓ cPLI snap → POSITIF

DIAGNOSTIC: Pancreatite aigue

TRAITEMENT PROPOSE:
- Fluidotherapie IV (Ringer lactate)
- Maropitant 1mg/kg IV SID
- Gabapentine 5mg/kg PO BID
- Hospitalisation 48-72h

Merci de valider la prise en charge.
— VetAssistant`)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 px-6 py-3 text-sm font-medium text-white hover:bg-emerald-700 transition-colors"
          >
            <Smartphone className="h-4 w-4" />
            Envoyer par WhatsApp
          </a>
        </CardHeader>
      </Card>

      {/* CTA */}
      <Card className="border-2 border-primary/20 bg-primary/5">
        <CardHeader className="p-6 text-center">
          <CardTitle className="text-lg">Essayez avec votre propre cas</CardTitle>
          <CardDescription className="mt-1">
            Lancez VetAssistant et entrez les informations de votre patient pour obtenir
            des checklists et un accompagnement adaptes.
          </CardDescription>
          <div className="mt-4">
            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              <Play className="h-4 w-4" />
              Demarrer un cas
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </CardHeader>
      </Card>
    </div>
  );
}
