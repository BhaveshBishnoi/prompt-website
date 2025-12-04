"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function HeroSection() {
  return (
    <section className="w-full py-20 bg-gradient-to-b from-background to-muted/20">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
          Discover & Sell High-Quality{" "}
          <span className="text-primary">AI Prompts</span>
        </h1>

        <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto">
          Browse premium prompts crafted for GPT-4, Claude, Gemini, Midjourney
          and more. Unlock creativity, save time, and supercharge your
          workflows.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button asChild size="lg">
            <Link href="/explore">Explore Prompts</Link>
          </Button>

          <Button asChild size="lg" variant="outline">
            <Link href="/create">Create & Sell Prompts</Link>
          </Button>
        </div>

        <div className="mt-12 text-sm text-muted-foreground">
          Trusted marketplace for AI creators · Updated daily · Shadcn + Next.js
        </div>
      </div>
    </section>
  );
}
