"use client";

import React, { useMemo } from "react";
import PromptCard, { Prompt } from "./PromptCard";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

export type PromptListItem = {
  id: string;
  title: string;
  description: string;
  slug?: string;
  category: { name: string } | string;
  rating?: number;
  author: { name?: string; image?: string };
  thumbnail?: string | null;
  price?: number;
  previewContent?: string | null;
  tags?: string[];
};

type Props = {
  prompts?: PromptListItem[] | null;
  limit?: number;
  dense?: boolean;
  loading?: boolean;
  onCardClick?: (item: PromptListItem) => void;
};

function EmptyState() {
  return (
    <div className="w-full py-16 text-center">
      <h3 className="text-lg font-semibold">No prompts found</h3>
      <p className="mt-2 text-sm text-muted-foreground">
        Try changing filters or explore trending prompts.
      </p>
    </div>
  );
}

export default function PromptGrid({
  prompts,
  limit,
  dense = false,
  loading = false,
  onCardClick,
}: Props) {
  const visible = useMemo(() => {
    if (!prompts) return [];
    return limit ? prompts.slice(0, limit) : prompts;
  }, [prompts, limit]);

  const gapClass = dense ? "gap-3" : "gap-6";
  const colsClass = dense
    ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
    : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3";

  if (loading) {
    const placeholders = new Array(6).fill(null);
    return (
      <div className={cn("w-full", gapClass)}>
        <div className={cn("grid", colsClass)}>
          {placeholders.map((_, i) => (
            <div key={i} className="w-full">
              <PromptCard
                prompt={
                  {
                    id: `skele-${i}`,
                    title: "",
                    slug: "",
                    price: 0,
                    previewContent: "",
                  } as Prompt
                }
                skeleton
                dense={dense}
              />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (!visible || visible.length === 0) {
    return <EmptyState />;
  }

  return (
    <div className={cn("w-full", gapClass)}>
      <div className={cn("grid", colsClass)}>
        {visible.map((item) => {
          const prompt: Prompt = {
            id: item.id,
            title: item.title,
            slug: item.slug ?? item.id,
            price: item.price ?? 0,
            previewContent: item.previewContent ?? item.description,
            aiModel: undefined,
            thumbnail: item.thumbnail,
            tags: item.tags,
            author: item.author,
            rating: item.rating,
          };

          return (
            <div key={item.id} className="w-full">
              <div
                role="button"
                tabIndex={0}
                onClick={() => onCardClick?.(item)}
                onKeyDown={(e) =>
                  (e.key === "Enter" || e.key === " ") && onCardClick?.(item)
                }
                className="cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-md"
              >
                <PromptCard prompt={prompt} dense={dense} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
