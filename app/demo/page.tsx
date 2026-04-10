import { Metadata } from "next";
import { DemoClient } from "./demo-client";

export const metadata: Metadata = {
  title: "Cas d'etude — VetAssistant",
  description: "Demonstration du parcours clinique avec un cas reel : Labrador 3 ans, diarrhee et vomissements aigus.",
};

export default function DemoPage() {
  return <DemoClient />;
}
