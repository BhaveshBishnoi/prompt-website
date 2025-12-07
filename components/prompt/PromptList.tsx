// File: app/prompts/components/PromptList.tsx
import React from "react";
import PromptCard from "./promptCard";
import type { Prompt } from "@/types/prompt";

type Props = {
  prompts: Prompt[];
  onCopy: (text: string) => void;
};

export default function PromptList({ prompts, onCopy }: Props) {
  if (!prompts.length) {
    return (
      <div className="text-center py-16 text-muted-foreground">
        No prompts found. Try another search.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {prompts.map((p) => (
        <PromptCard key={p.id} prompt={p} onCopy={onCopy} />
      ))}
    </div>
  );
}
