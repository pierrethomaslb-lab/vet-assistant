import Link from "next/link";
import type { ModuleConfig } from "@/types/modules";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ChevronRight } from "lucide-react";

interface ModuleCardProps {
  module: ModuleConfig;
}

export function ModuleCard({ module }: ModuleCardProps) {
  const Icon = module.icon;

  return (
    <Link href={`/module/${module.slug}`}>
      <Card className="group cursor-pointer transition-all hover:shadow-md hover:border-primary/30 active:scale-[0.98]">
        <CardHeader className="flex flex-row items-center gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
            <Icon className="h-6 w-6" />
          </div>
          <div className="flex-1 space-y-1">
            <CardTitle className="text-base">{module.name}</CardTitle>
            <CardDescription className="text-sm">
              {module.description}
            </CardDescription>
          </div>
          <ChevronRight className="h-5 w-5 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
        </CardHeader>
      </Card>
    </Link>
  );
}
