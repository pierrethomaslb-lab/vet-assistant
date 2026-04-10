"use client";

import { Mic } from "lucide-react";
import { Button } from "@/components/ui/button";

interface VoiceInputProps {
  disabled?: boolean;
}

export function VoiceInput({ disabled }: VoiceInputProps) {
  return (
    <Button
      type="button"
      size="icon"
      variant="outline"
      disabled={disabled}
      className="h-11 w-11 shrink-0 rounded-full"
      title="Saisie vocale (bientot disponible)"
    >
      <Mic className="h-5 w-5" />
    </Button>
  );
}
