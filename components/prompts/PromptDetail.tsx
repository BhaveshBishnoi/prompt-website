"use client";

import { Box, Button, Card, CardContent, Chip, Rating, Stack, Typography } from "@mui/material";

type PromptDetailProps = {
  promptId: string;
};

export default function PromptDetail({ promptId }: PromptDetailProps) {
  // Placeholder demo data
  const prompt = {
    title: "SEO Blog Writer",
    description: "Generate SEO-optimized blog posts with headings and keyword density controls.",
    content: "You are an expert SEO writer...",
    category: "Marketing",
    rating: 4.6,
    tags: ["seo", "blog", "marketing"],
    price: 9.99,
  };

  return (
    <Box>
      <Typography variant="h4" fontWeight={700} sx={{ mb: 1 }}>{prompt.title}</Typography>
      <Stack direction="row" spacing={1} sx={{ mb: 2 }} alignItems="center">
        <Chip label={prompt.category} />
        <Rating value={prompt.rating} precision={0.5} readOnly />
        <Typography variant="body2" color="text.secondary">{prompt.tags.join(', ')}</Typography>
      </Stack>
      <Typography sx={{ mb: 3 }}>{prompt.description}</Typography>

      <Card variant="outlined" sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1 }}>Prompt preview</Typography>
          <Typography variant="body2" sx={{ whiteSpace: "pre-wrap" }}>{prompt.content}</Typography>
        </CardContent>
      </Card>

      <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
        <Button variant="contained">Buy for ${prompt.price}</Button>
        <Button variant="outlined">Use Prompt</Button>
      </Stack>
    </Box>
  );
}


