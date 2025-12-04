// app/page.tsx
"use client";

import { useEffect, useMemo, useState } from "react";
import PromptGrid, { PromptListItem } from "@/components/prompts/PromptGrid";
import HeroSection from "@/components/home/HeroSection";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

export default function HomePage() {
  const [search, setSearch] = useState("");
  const [prompts, setPrompts] = useState<PromptListItem[]>([]);
  const [loading, setLoading] = useState(true);
  const tags = ["Writing", "Marketing", "Design", "Education", "Coding"];

  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);
    fetch("/api/prompts", { signal: controller.signal })
      .then((r) => r.json())
      .then((d) => {
        setPrompts(d.items ?? []);
      })
      .catch(() => {
        // ignore for now
      })
      .finally(() => setLoading(false));

    return () => controller.abort();
  }, []);

  const placeholder = useMemo(
    () =>
      "Search prompts e.g. SEO blog writer, Midjourney logo, Instagram captions",
    []
  );

  // simple client-side filtering
  const filtered = useMemo(() => {
    if (!search) return prompts;
    const q = search.toLowerCase();
    return prompts.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        (typeof p.category === "string"
          ? p.category.toLowerCase().includes(q)
          : p.category?.name?.toLowerCase().includes(q))
    );
  }, [search, prompts]);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <HeroSection />

      {/* Search / Discover */}
      <section className="py-10">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-col items-center text-center gap-4">
            <Badge variant="outline">Discover top prompts</Badge>

            <h2 className="text-3xl sm:text-4xl font-extrabold leading-tight">
              Find, explore and use the best AI prompts
            </h2>

            <p className="max-w-2xl text-muted-foreground">
              Curated marketplace of high-quality prompts for GPT, Claude,
              Gemini, Midjourney and more.
            </p>

            <div className="w-full max-w-2xl mt-4 flex gap-3">
              <Input
                value={search}
                onChange={(e) =>
                  setSearch((e.target as HTMLInputElement).value)
                }
                placeholder={placeholder}
                className="flex-1"
              />
              <Button
                onClick={() => {
                  /* optional action */
                }}
              >
                Search
              </Button>
            </div>

            <div className="mt-3 flex flex-wrap gap-2 justify-center">
              {tags.map((t) => (
                <button
                  key={t}
                  onClick={() => setSearch(t)}
                  className={cn(
                    "px-3 py-1 rounded-full text-sm border transition",
                    search === t
                      ? "bg-primary text-primary-foreground"
                      : "bg-transparent"
                  )}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Featured */}
      <section className="py-8">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-semibold">Featured</h3>
            <Button
              variant="ghost"
              onClick={() => {
                /* navigate to explore */
              }}
            >
              View all
            </Button>
          </div>

          {loading ? (
            // Skeleton block while loading
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <Card key={i} className="p-4">
                  <Skeleton className="h-40 w-full rounded-md" />
                  <div className="mt-3">
                    <Skeleton className="h-6 w-3/4" />
                    <Skeleton className="h-4 w-full mt-2" />
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <PromptGrid
              prompts={filtered}
              limit={6}
              dense
              onCardClick={(p) => console.log("clicked", p.slug ?? p.id)}
            />
          )}

          {/* highlights */}
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Card className="p-4">
              <h4 className="text-lg font-bold">10k+ Prompts</h4>
              <p className="text-sm text-muted-foreground">
                Curated across popular AI models
              </p>
            </Card>
            <Card className="p-4">
              <h4 className="text-lg font-bold">Trusted Sellers</h4>
              <p className="text-sm text-muted-foreground">
                Quality checked and rated
              </p>
            </Card>
            <Card className="p-4">
              <h4 className="text-lg font-bold">Secure Checkout</h4>
              <p className="text-sm text-muted-foreground">Powered by Stripe</p>
            </Card>
          </div>
        </div>
      </section>

      {/* All prompts */}
      <section className="py-8">
        <div className="max-w-6xl mx-auto px-4">
          <h3 className="text-xl font-semibold mb-4">All Prompts</h3>
          <PromptGrid
            prompts={filtered}
            onCardClick={(p) => console.log("open", p.slug ?? p.id)}
          />
        </div>
      </section>
    </div>
  );
}
