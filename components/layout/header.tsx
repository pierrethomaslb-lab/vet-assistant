import Link from "next/link";
import { Stethoscope, BookOpen, History, FlaskConical } from "lucide-react";

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-primary/10 bg-primary text-primary-foreground">
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2.5 font-bold text-lg tracking-tight">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/15">
            <Stethoscope className="h-4.5 w-4.5" />
          </div>
          <span>VetAssistant</span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          <Link
            href="/demo"
            className="flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm text-primary-foreground/80 hover:text-primary-foreground hover:bg-white/10 transition-colors"
          >
            <FlaskConical className="h-4 w-4" />
            Cas d'etude
          </Link>
          <Link
            href="/admin"
            className="flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm text-primary-foreground/80 hover:text-primary-foreground hover:bg-white/10 transition-colors"
          >
            <BookOpen className="h-4 w-4" />
            Sources
          </Link>
          <Link
            href="/historique"
            className="flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm text-primary-foreground/80 hover:text-primary-foreground hover:bg-white/10 transition-colors"
          >
            <History className="h-4 w-4" />
            Historique
          </Link>
        </nav>
      </div>
    </header>
  );
}
