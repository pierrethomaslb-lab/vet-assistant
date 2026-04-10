import { cn } from "@/lib/utils";
import { Stethoscope, User } from "lucide-react";

interface MessageBubbleProps {
  role: "assistant" | "user";
  content: string;
}

export function MessageBubble({ role, content }: MessageBubbleProps) {
  return (
    <div
      className={cn(
        "flex gap-2.5",
        role === "user" ? "flex-row-reverse" : "flex-row"
      )}
    >
      <div
        className={cn(
          "flex h-9 w-9 shrink-0 items-center justify-center rounded-full shadow-sm",
          role === "assistant"
            ? "bg-primary text-primary-foreground"
            : "bg-secondary text-secondary-foreground"
        )}
      >
        {role === "assistant" ? (
          <Stethoscope className="h-4 w-4" />
        ) : (
          <User className="h-4 w-4" />
        )}
      </div>
      <div
        className={cn(
          "max-w-[85%] rounded-2xl px-4 py-3 text-[15px] leading-relaxed shadow-sm",
          role === "assistant"
            ? "rounded-tl-sm bg-card text-card-foreground border"
            : "rounded-tr-sm bg-primary text-primary-foreground"
        )}
      >
        {content}
      </div>
    </div>
  );
}
