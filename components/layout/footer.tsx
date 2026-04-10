import { AlertTriangle } from "lucide-react";

export function Footer() {
  return (
    <footer className="mt-auto border-t bg-muted/30">
      <div className="mx-auto flex max-w-5xl items-center gap-2 px-4 py-3 text-xs text-muted-foreground">
        <AlertTriangle className="h-3.5 w-3.5 shrink-0" />
        <p>
          Outil d&apos;aide a la decision — ne remplace pas le jugement
          clinique du veterinaire. Validation clinique requise.
        </p>
      </div>
    </footer>
  );
}
