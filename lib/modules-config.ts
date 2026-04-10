import {
  ClipboardList,
  Microscope,
  Target,
  Pill,
  UserRound,
} from "lucide-react";
import type { ModuleConfig } from "@/types/modules";

export const MODULES: ModuleConfig[] = [
  {
    slug: "anamnese",
    name: "Anamnese + Examen clinique",
    description:
      "Recueil des informations patient et examen clinique complet",
    icon: ClipboardList,
    checklist: [
      { id: "ana-1", label: "Motif de consultation precis" },
      { id: "ana-2", label: "Duree des symptomes" },
      { id: "ana-3", label: "Historique medical consulte" },
      { id: "ana-4", label: "Vaccination / vermifugation a jour" },
      {
        id: "ana-5",
        label:
          "Examen general complet (T\u00b0, FC, FR, TRC, hydratation)",
      },
      { id: "ana-6", label: "Examen cible selon motif" },
    ],
    questionSteps: [
      {
        id: "ana-q1",
        question: "Quel est le motif principal de consultation ?",
        options: [
          { label: "Digestif", nextStepId: "ana-q2-digestif" },
          { label: "Respiratoire", nextStepId: "ana-q2-respi" },
          { label: "Dermatologique", nextStepId: "ana-q2-dermato" },
          { label: "Locomoteur", nextStepId: "ana-q2-loco" },
          { label: "Urinaire", nextStepId: "ana-q2-urinaire" },
          { label: "Neurologique", nextStepId: "ana-q2-neuro" },
          { label: "Autre...", freeText: true },
        ],
        allowVoice: true,
      },
      {
        id: "ana-q2-digestif",
        question: "Quel symptome digestif ?",
        options: [
          { label: "Vomissements", nextStepId: "ana-q3-vomit" },
          { label: "Diarrhee" },
          { label: "Anorexie" },
          { label: "Regurgitation" },
          { label: "Autre...", freeText: true },
        ],
        allowVoice: true,
      },
      {
        id: "ana-q3-vomit",
        question: "Depuis combien de temps ?",
        options: [
          { label: "< 24h" },
          { label: "1-3 jours" },
          { label: "> 3 jours" },
          { label: "Chronique > 2 semaines" },
        ],
      },
      {
        id: "ana-q2-respi",
        question: "Quel symptome respiratoire ?",
        options: [
          { label: "Toux" },
          { label: "Dyspnee" },
          { label: "Eternuements" },
          { label: "Jetage nasal" },
          { label: "Autre...", freeText: true },
        ],
        allowVoice: true,
      },
      {
        id: "ana-q2-dermato",
        question: "Quel symptome dermatologique ?",
        options: [
          { label: "Prurit" },
          { label: "Alopecie" },
          { label: "Lesions cutanees" },
          { label: "Otite" },
          { label: "Autre...", freeText: true },
        ],
        allowVoice: true,
      },
      {
        id: "ana-q2-loco",
        question: "Quel symptome locomoteur ?",
        options: [
          { label: "Boiterie" },
          { label: "Douleur articulaire" },
          { label: "Gonflement" },
          { label: "Autre...", freeText: true },
        ],
        allowVoice: true,
      },
      {
        id: "ana-q2-urinaire",
        question: "Quel symptome urinaire ?",
        options: [
          { label: "Polyurie / Polydipsie" },
          { label: "Dysurie" },
          { label: "Hematurie" },
          { label: "Incontinence" },
          { label: "Autre...", freeText: true },
        ],
        allowVoice: true,
      },
      {
        id: "ana-q2-neuro",
        question: "Quel symptome neurologique ?",
        options: [
          { label: "Convulsions" },
          { label: "Ataxie" },
          { label: "Paresis / Paralysie" },
          { label: "Tremblements" },
          { label: "Autre...", freeText: true },
        ],
        allowVoice: true,
      },
    ],
  },
  {
    slug: "examens",
    name: "Examens complementaires",
    description: "Choix et interpretation des examens",
    icon: Microscope,
    checklist: [
      { id: "exa-1", label: "Examen justifie cliniquement" },
      {
        id: "exa-2",
        label: "Consentement client obtenu (si couteux)",
      },
      {
        id: "exa-3",
        label: "Prelevement correct (jeune si besoin)",
      },
      { id: "exa-4", label: "Tubes / materiel appropries" },
      {
        id: "exa-5",
        label: "Delais d'envoi respectes (si labo externe)",
      },
    ],
    questionSteps: [
      {
        id: "exa-q1",
        question: "Quel type d'examen envisages-tu ?",
        options: [
          { label: "Biologie", nextStepId: "exa-q2-bio" },
          { label: "Imagerie", nextStepId: "exa-q2-imagerie" },
          { label: "Biopsie" },
          { label: "Autre...", freeText: true },
        ],
        allowVoice: true,
      },
      {
        id: "exa-q2-bio",
        question: "Quel examen precis ?",
        options: [
          { label: "NFS", nextStepId: "exa-q3-objectif" },
          { label: "Biochimie", nextStepId: "exa-q3-objectif" },
          { label: "Analyse urinaire", nextStepId: "exa-q3-objectif" },
          { label: "Serologie" },
          { label: "Autre...", freeText: true },
        ],
        allowVoice: true,
      },
      {
        id: "exa-q2-imagerie",
        question: "Quel type d'imagerie ?",
        options: [
          { label: "Radiographie" },
          { label: "Echographie" },
          { label: "Scanner / IRM" },
          { label: "Autre...", freeText: true },
        ],
        allowVoice: true,
      },
      {
        id: "exa-q3-objectif",
        question: "Pour quel objectif ?",
        options: [
          { label: "Bilan pre-operatoire" },
          { label: "Fonction renale" },
          { label: "Fonction hepatique" },
          { label: "Pancreas" },
          { label: "Bilan complet" },
        ],
      },
    ],
  },
  {
    slug: "diagnostic",
    name: "Diagnostic differentiel",
    description: "Hypotheses diagnostiques et arbre decisionnel",
    icon: Target,
    checklist: [
      { id: "diag-1", label: "Tous les symptomes listes" },
      {
        id: "diag-2",
        label: "Chronologie precise (debut, evolution)",
      },
      {
        id: "diag-3",
        label: "Elements epidemio (age, race, saison, voyage)",
      },
      {
        id: "diag-4",
        label: "Examens deja realises pris en compte",
      },
      { id: "diag-5", label: "Urgences vitales ecartees" },
    ],
    questionSteps: [
      {
        id: "diag-q1",
        question: "Symptome principal ?",
        options: [
          { label: "Digestif", nextStepId: "diag-q2-associes" },
          { label: "Respiratoire", nextStepId: "diag-q2-associes" },
          { label: "Dermatologique", nextStepId: "diag-q2-associes" },
          { label: "Locomoteur", nextStepId: "diag-q2-associes" },
          { label: "Urinaire", nextStepId: "diag-q2-associes" },
          { label: "Neurologique", nextStepId: "diag-q2-associes" },
          { label: "Autre...", freeText: true },
        ],
        allowVoice: true,
      },
      {
        id: "diag-q2-associes",
        question: "Symptomes associes ?",
        options: [
          { label: "Fievre" },
          { label: "Abattement" },
          { label: "Perte de poids" },
          { label: "Douleur" },
          { label: "Aucun autre", nextStepId: "diag-q3-terrain" },
          { label: "Autre...", freeText: true },
        ],
        allowVoice: true,
      },
      {
        id: "diag-q3-terrain",
        question: "Terrain de l'animal ?",
        options: [
          { label: "Chiot / Chaton (< 1 an)" },
          { label: "Adulte (1-7 ans)" },
          { label: "Senior (> 7 ans)" },
          { label: "Race predisposee" },
        ],
      },
    ],
  },
  {
    slug: "posologie",
    name: "Posologie",
    description: "Calcul de doses et protocoles medicamenteux",
    icon: Pill,
    checklist: [
      { id: "poso-1", label: "Poids exact de l'animal" },
      { id: "poso-2", label: "Fonction renale / hepatique OK" },
      {
        id: "poso-3",
        label: "Traitements en cours (interactions)",
      },
      { id: "poso-4", label: "Gestation / lactation" },
      { id: "poso-5", label: "Allergies connues" },
    ],
    questionSteps: [
      {
        id: "poso-q1",
        question: "Quel medicament veux-tu prescrire ?",
        options: [
          { label: "Metronidazole", nextStepId: "poso-q2-indication" },
          { label: "Amoxicilline", nextStepId: "poso-q2-indication" },
          { label: "Meloxicam", nextStepId: "poso-q2-indication" },
          { label: "Prednisolone", nextStepId: "poso-q2-indication" },
          { label: "Autre...", freeText: true },
        ],
        allowVoice: true,
      },
      {
        id: "poso-q2-indication",
        question: "Pour quelle indication ?",
        options: [
          { label: "Giardiose", nextStepId: "poso-q3-poids" },
          { label: "Diarrhee chronique", nextStepId: "poso-q3-poids" },
          { label: "Gingivite", nextStepId: "poso-q3-poids" },
          { label: "Infection cutanee", nextStepId: "poso-q3-poids" },
          { label: "Douleur / inflammation", nextStepId: "poso-q3-poids" },
          { label: "Autre...", freeText: true },
        ],
        allowVoice: true,
      },
      {
        id: "poso-q3-poids",
        question: "Poids de l'animal ?",
        options: [
          { label: "< 5 kg" },
          { label: "5-10 kg" },
          { label: "10-20 kg" },
          { label: "> 30 kg" },
          { label: "Preciser...", freeText: true },
        ],
        allowVoice: true,
      },
    ],
  },
  {
    slug: "gestion-client",
    name: "Gestion client",
    description:
      "Communication client, annonces et gestion des situations",
    icon: UserRound,
    checklist: [
      {
        id: "cli-1",
        label: "Diagnostic explique en termes simples",
      },
      {
        id: "cli-2",
        label: "Pronostic evoque honnetement",
      },
      { id: "cli-3", label: "Couts annonces clairement" },
      {
        id: "cli-4",
        label: "Alternatives proposees si pertinent",
      },
      {
        id: "cli-5",
        label: "Consentement eclaire obtenu",
      },
    ],
    questionSteps: [
      {
        id: "cli-q1",
        question: "Quelle situation client ?",
        options: [
          {
            label: "Annonce diagnostic grave",
            nextStepId: "cli-q2-grave",
          },
          { label: "Refus financier", nextStepId: "cli-q2-financier" },
          { label: "Euthanasie", nextStepId: "cli-q2-euthanasie" },
          { label: "Plainte / insatisfaction" },
          { label: "Autre...", freeText: true },
        ],
        allowVoice: true,
      },
      {
        id: "cli-q2-grave",
        question: "Quel type de pathologie ?",
        options: [
          { label: "Cancer" },
          { label: "Insuffisance organique" },
          { label: "Maladie chronique" },
          { label: "Autre...", freeText: true },
        ],
      },
      {
        id: "cli-q2-financier",
        question: "Quel est le contexte financier ?",
        options: [
          { label: "Chirurgie couteuse" },
          { label: "Traitement long" },
          { label: "Urgence non planifiee" },
          { label: "Autre...", freeText: true },
        ],
      },
      {
        id: "cli-q2-euthanasie",
        question: "Quel contexte pour l'euthanasie ?",
        options: [
          { label: "Fin de vie / souffrance" },
          { label: "Accident grave" },
          { label: "Demande proprietaire (animal sain)" },
          { label: "Autre...", freeText: true },
        ],
      },
    ],
  },
];

export function getModuleBySlug(slug: string): ModuleConfig | undefined {
  return MODULES.find((m) => m.slug === slug);
}
