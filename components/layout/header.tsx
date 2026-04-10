import Link from "next/link";
import { Stethoscope, BookOpen, History } from "lucide-react";

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <Stethoscope className="h-5 w-5 text-primary" />
          <span>VetAssistant</span>
        </Link>

        <nav className="hidden items-center gap-4 md:flex">
          <Link
            href="/admin"
            className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <BookOpen className="h-4 w-4" />
            Sources
          </Link>
          <Link
            href="/historique"
            className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <History className="h-4 w-4" />
            Historique
          </Link>
        </nav>
      </div>
    </header>
  );
}
