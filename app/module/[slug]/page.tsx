import { notFound } from "next/navigation";
import { getModuleBySlug, MODULES } from "@/lib/modules-config";
import { ModulePageClient } from "./module-page-client";

export function generateStaticParams() {
  return MODULES.map((m) => ({ slug: m.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const mod = getModuleBySlug(slug);
  if (!mod) return {};
  return {
    title: `${mod.name} — VetAssistant`,
    description: mod.description,
  };
}

export default async function ModulePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const mod = getModuleBySlug(slug);

  if (!mod) {
    notFound();
  }

  return <ModulePageClient slug={mod.slug} />;
}
