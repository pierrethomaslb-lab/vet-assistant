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
      { id: "ana-5", label: "Examen general complet (T°, FC, FR, TRC, hydratation)" },
      { id: "ana-6", label: "Examen cible selon motif" },
      // Contextuels jeune animal
      { id: "ana-7", label: "Statut vaccinal complet verifie (primo-vaccination)", young: true },
      { id: "ana-8", label: "Parasitisme intestinal recherche", young: true },
      // Contextuels senior
      { id: "ana-9", label: "Bilan geriatrique envisage", senior: true },
      { id: "ana-10", label: "Poids compare aux consultations precedentes", senior: true },
      // Contextuels digestif
      { id: "ana-11", label: "Palpation abdominale realisee", problemKeywords: ["vomissement", "diarrhee", "anorexie", "digestif", "mange plus", "regurgit"] },
      { id: "ana-12", label: "Acces toxiques / corps etranger questionne", problemKeywords: ["vomissement", "regurgit", "mange plus", "corps etranger", "intoxication"] },
      // Contextuels respiratoire
      { id: "ana-13", label: "Auscultation thoracique bilaterale", problemKeywords: ["toux", "dyspnee", "respirat", "eternue", "jetage"] },
      // Contextuels dermato
      { id: "ana-14", label: "Raclage / trichogramme envisage", problemKeywords: ["prurit", "alopecie", "lesion", "dermato", "gratte", "peau"] },
      // Chat specifique
      { id: "ana-15", label: "Statut FIV/FeLV connu", species: ["chat"] },
      // Chien specifique
      { id: "ana-16", label: "Risque leishmaniose / ehrlichiose evalue (zone endemique)", species: ["chien"] },
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
      { id: "exa-2", label: "Consentement client obtenu (si couteux)" },
      { id: "exa-3", label: "Prelevement correct (jeune si besoin)" },
      { id: "exa-4", label: "Tubes / materiel appropries" },
      { id: "exa-5", label: "Delais d'envoi respectes (si labo externe)" },
      // Contextuels digestif
      { id: "exa-6", label: "Radiographie abdominale (corps etranger ?)", problemKeywords: ["vomissement", "corps etranger", "occlusion", "mange plus"] },
      { id: "exa-7", label: "Coproscopie envisagee", problemKeywords: ["diarrhee", "parasit", "selles"] },
      // Contextuels urinaire
      { id: "exa-8", label: "Bandelette urinaire + culot", problemKeywords: ["urinaire", "polyurie", "dysurie", "hematurie", "pipi"] },
      // Senior
      { id: "exa-9", label: "Biochimie renale + hepatique (bilan senior)", senior: true },
      { id: "exa-10", label: "T4 / fructosamine si suspicion endocrinienne", senior: true },
      // Jeune
      { id: "exa-11", label: "Test parvovirose si diarrhee hemorragique", young: true, problemKeywords: ["diarrhee", "hemorrag", "sang"] },
      // Chat
      { id: "exa-12", label: "Snap FIV/FeLV si statut inconnu", species: ["chat"] },
      // Chien
      { id: "exa-13", label: "4Dx (ehrlichiose, anaplasmose, Lyme, dirofilariose)", species: ["chien"], problemKeywords: ["fievre", "abattement", "anemie", "tique"] },
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
      { id: "diag-2", label: "Chronologie precise (debut, evolution)" },
      { id: "diag-3", label: "Elements epidemio (age, race, saison, voyage)" },
      { id: "diag-4", label: "Examens deja realises pris en compte" },
      { id: "diag-5", label: "Urgences vitales ecartees" },
      // Jeune
      { id: "diag-6", label: "Maladies infectieuses juveniles ecartees (parvo, coryza)", young: true },
      { id: "diag-7", label: "Malformations congenitales considerees", young: true },
      // Senior
      { id: "diag-8", label: "Processus neoplasique envisage", senior: true },
      { id: "diag-9", label: "Insuffisance organique recherchee", senior: true },
      // Chat
      { id: "diag-10", label: "PIF / typhus / calicivirose envisages", species: ["chat"], problemKeywords: ["fievre", "abattement", "diarrhee", "vomissement"] },
      // Chien
      { id: "diag-11", label: "Leptospirose / piroplasmose ecartees", species: ["chien"], problemKeywords: ["fievre", "ictere", "abattement", "urine foncee"] },
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
      { id: "poso-3", label: "Traitements en cours (interactions)" },
      { id: "poso-4", label: "Gestation / lactation" },
      { id: "poso-5", label: "Allergies connues" },
      // Jeune
      { id: "poso-6", label: "Dose adaptee au poids exact (pas d'extrapolation adulte)", young: true },
      { id: "poso-7", label: "Molecules contre-indiquees chez le jeune verifiees", young: true },
      // Senior
      { id: "poso-8", label: "Ajustement dose si insuffisance renale", senior: true },
      { id: "poso-9", label: "AINS a eviter si deshydrate ou IRC", senior: true },
      // Chat
      { id: "poso-10", label: "Toxicite chat verifiee (paracetamol, permethrines = INTERDIT)", species: ["chat"] },
      { id: "poso-11", label: "Demi-vie prolongee chez le chat prise en compte", species: ["chat"] },
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
      { id: "cli-1", label: "Diagnostic explique en termes simples" },
      { id: "cli-2", label: "Pronostic evoque honnetement" },
      { id: "cli-3", label: "Couts annonces clairement" },
      { id: "cli-4", label: "Alternatives proposees si pertinent" },
      { id: "cli-5", label: "Consentement eclaire obtenu" },
      // Jeune
      { id: "cli-6", label: "Prevention (vaccins, sterilisation) abordee", young: true },
      // Senior
      { id: "cli-7", label: "Qualite de vie discutee avec le proprietaire", senior: true },
      { id: "cli-8", label: "Suivi regulier planifie (controles)", senior: true },
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
