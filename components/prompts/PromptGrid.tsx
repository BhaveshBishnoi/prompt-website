"use client";

import { Grid } from "@mui/material";
import PromptCard from "./PromptCard";

export type PromptListItem = {
  id: string;
  title: string;
  description: string;
  category: { name: string } | string;
  rating?: number;
  author: { name?: string; image?: string };
};

export default function PromptGrid({ prompts, limit, dense = false }: { prompts: PromptListItem[]; limit?: number; dense?: boolean }) {
  return (
    <Grid container spacing={3}>
      {(limit ? prompts.slice(0, limit) : prompts).map((item) => (
        <Grid key={item.id} item xs={12} sm={6} md={4}>
          <PromptCard
            title={item.title}
            description={item.description}
            category={typeof item.category === "string" ? item.category : item.category?.name}
            rating={item.rating ?? 4.5}
            author={{ name: item.author?.name ?? "Unknown", image: item.author?.image }}
            dense={dense}
          />
        </Grid>
      ))}
    </Grid>
  );
}


