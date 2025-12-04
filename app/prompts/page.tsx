"use client";

import PromptGrid from "../../components/prompts/PromptGrid";

export default function PromptsPage() {
  return (
    <div style={{ paddingTop: 24, paddingBottom: 24 }}>
      <p style={{ fontWeight: 700, marginBottom: 24, fontSize: "1.5rem" }}>
        Marketplace
      </p>
      <PromptGrid />
    </div>
  );
}
