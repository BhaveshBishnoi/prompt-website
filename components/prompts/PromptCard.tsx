"use client";

import Link from "next/link";
import Image from "next/image";
import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";
import { Star } from "lucide-react";

export type Prompt = {
  id: string;
  title: string;
  slug: string;
  price: number;
  previewContent?: string | null;
  aiModel?: string[];
  thumbnail?: string | null;
  tags?: string[];
  author?: { name?: string; image?: string };
  rating?: number;
};

type Props = {
  prompt: Prompt;
  dense?: boolean;
  skeleton?: boolean;
  className?: string;
};

/**
 * PromptCard
 * - Accepts `prompt` object (type exported)
 * - `skeleton` prop for placeholder rendering
 * - `dense` toggles compact layout
 */
export default function PromptCard({
  prompt,
  dense = false,
  skeleton = false,
  className = "",
}: Props) {
  if (skeleton) {
    return (
      <Card className={cn("overflow-hidden", className)}>
        <div className={cn("p-4", dense ? "space-y-2" : "space-y-3")}>
          <Skeleton className={cn("w-full h-36 rounded-md")} />
          <div>
            <Skeleton className="h-5 w-3/4 mb-2" />
            <Skeleton className="h-4 w-full" />
          </div>
        </div>
      </Card>
    );
  }

  const priceLabel = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 2,
  }).format(prompt.price ?? 0);

  return (
    <Card className={cn("overflow-hidden", className)}>
      <CardHeader
        className={cn("flex items-start gap-4 p-4", dense ? "p-3" : "p-4")}
      >
        <div className="w-20 h-20 rounded-md overflow-hidden bg-slate-50 flex-shrink-0">
          {prompt.thumbnail ? (
            // next/image preferred — using fill would require wrapper; using Image with fixed sizes for simplicity
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={prompt.thumbnail}
              alt={prompt.title}
              className="object-cover w-full h-full"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-sm text-muted-foreground">
              Preview
            </div>
          )}
        </div>

        <div className="flex-1 min-w-0">
          <CardTitle className={cn("text-base leading-snug")}>
            <Link href={`/prompts/${prompt.slug}`} className="block truncate">
              {prompt.title}
            </Link>
          </CardTitle>

          <CardDescription className="text-sm text-muted-foreground line-clamp-2">
            {prompt.previewContent ??
              (prompt.aiModel ? prompt.aiModel.join(", ") : "")}
          </CardDescription>

          <div className="mt-2 flex flex-wrap items-center gap-2">
            {prompt.tags?.slice(0, 4).map((t) => (
              <Badge key={t} className="text-xs">
                {t}
              </Badge>
            ))}
          </div>
        </div>

        <div className="flex flex-col items-end justify-between">
          <div className="text-sm font-semibold">{priceLabel}</div>

          <div className="mt-2 flex items-center gap-3">
            <div className="flex items-center gap-2">
              <Avatar className="h-8 w-8">
                {prompt.author?.image ? (
                  <AvatarImage
                    src={prompt.author.image}
                    alt={prompt.author?.name ?? "Author"}
                  />
                ) : (
                  <AvatarFallback>
                    {(prompt.author?.name ?? "U").slice(0, 1)}
                  </AvatarFallback>
                )}
              </Avatar>
              <div className="text-xs text-muted-foreground">
                <div className="font-medium">
                  {prompt.author?.name ?? "Unknown"}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <Star className="w-4 h-4 text-amber-400" />
              <span>{(prompt.rating ?? 4.5).toFixed(1)}</span>
            </div>
          </div>

          <Link
            href={`/prompts/${prompt.slug}`}
            className="mt-3 text-xs text-primary"
          >
            View
          </Link>
        </div>
      </CardHeader>

      <CardContent className="pt-0 px-4 pb-4">
        {/* optionally show short meta or actions here in future */}
      </CardContent>
    </Card>
  );
}
