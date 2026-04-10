import { cn } from "@/lib/utils";
import { Bot, User } from "lucide-react";

interface MessageBubbleProps {
  role: "assistant" | "user";
  content: string;
}

export function MessageBubble({ role, content }: MessageBubbleProps) {
  return (
    <div
      className={cn(
        "flex gap-3",
        role === "user" ? "flex-row-reverse" : "flex-row"
      )}
    >
      <div
        className={cn(
          "flex h-8 w-8 shrink-0 items-center justify-center rounded-full",
          role === "assistant"
            ? "bg-primary/10 text-primary"
            : "bg-muted text-muted-foreground"
        )}
      >
        {role === "assistant" ? (
          <Bot className="h-4 w-4" />
        ) : (
          <User className="h-4 w-4" />
        )}
      </div>
      <div
        className={cn(
          "max-w-[80%] rounded-lg px-4 py-3 text-sm",
          role === "assistant"
            ? "bg-muted text-foreground"
            : "bg-primary text-primary-foreground"
        )}
      >
        {content}
      </div>
    </div>
  );
}
