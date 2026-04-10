"use client";

import { useRef, useEffect } from "react";
import { MessageBubble } from "./message-bubble";
import type { Message } from "@/types/modules";

interface ChatContainerProps {
  messages: Message[];
}

export function ChatContainer({ messages }: ChatContainerProps) {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages.length]);

  return (
    <div className="flex flex-col gap-4 overflow-y-auto">
      {messages.map((msg) => (
        <MessageBubble key={msg.id} role={msg.role} content={msg.content} />
      ))}
      <div ref={bottomRef} />
    </div>
  );
}
