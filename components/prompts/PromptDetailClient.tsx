"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function PromptDetailClient({ slug }: { slug: string }) {
  const [count, setCount] = useState(0);

  return (
    <div className="space-y-4">
      <div className="text-muted-foreground">Interactive actions</div>
      <div className="flex gap-3">
        <Button onClick={() => setCount((x) => x + 1)}>Like ({count})</Button>
        <Button variant="secondary">Buy</Button>
      </div>
    </div>
  );
}
