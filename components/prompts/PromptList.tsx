"use client";

import PromptCard, { Prompt } from "./PromptCard";

export default function PromptList({ items }: { items: Prompt[] }) {
  if (!items || items.length === 0) {
    return (
      <div className="p-6 text-center text-muted-foreground">
        No prompts found.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {items.map((p) => (
        <PromptCard key={p.id} prompt={p} />
      ))}
    </div>
  );
}
