import Link from "next/link";
import type { ModuleConfig } from "@/types/modules";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ChevronRight } from "lucide-react";

interface ModuleCardProps {
  module: ModuleConfig;
  step: number;
}

export function ModuleCard({ module, step }: ModuleCardProps) {
  const Icon = module.icon;

  return (
    <div className="relative flex gap-4">
      {/* Step number + vertical line */}
      <div className="flex flex-col items-center">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-bold shadow-sm">
          {step}
        </div>
        {step < 5 && (
          <div className="w-0.5 flex-1 bg-primary/20 mt-1" />
        )}
      </div>

      {/* Card */}
      <Link href={`/module/${module.slug}`} className="flex-1 pb-4">
        <Card className="group cursor-pointer transition-all hover:shadow-lg hover:border-primary/30 active:scale-[0.98]">
          <CardHeader className="flex flex-row items-center gap-4 p-5">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
              <Icon className="h-6 w-6" />
            </div>
            <div className="flex-1 space-y-1">
              <CardTitle className="text-base font-semibold">{module.name}</CardTitle>
              <CardDescription className="text-sm leading-snug">
                {module.description}
              </CardDescription>
            </div>
            <ChevronRight className="h-5 w-5 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-primary" />
          </CardHeader>
        </Card>
      </Link>
    </div>
  );
}
