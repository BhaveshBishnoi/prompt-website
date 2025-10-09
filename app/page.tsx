"use client";

import { Container, Box, Typography, TextField, Stack, Chip, Grid, Card, CardContent } from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import PromptGrid, { PromptListItem } from "../components/prompts/PromptGrid";

export default function Home() {
  const [search, setSearch] = useState("");
  const [prompts, setPrompts] = useState<PromptListItem[]>([]);
  const [tags] = useState<string[]>(["Writing", "Marketing", "Design", "Education", "Coding"]);

  useEffect(() => {
    const controller = new AbortController();
    fetch(`/api/prompts`, { signal: controller.signal })
      .then((r) => r.json())
      .then((d) => setPrompts(d.items ?? []))
      .catch(() => {});
    return () => controller.abort();
  }, []);

  const placeholder = useMemo(
    () => "Search prompts e.g. SEO blog writer, Midjourney logo, Instagram captions",
    []
  );

  return (
    <>
      <Box sx={{ py: { xs: 6, md: 10 }, background: "linear-gradient(135deg, #eef2ff, #fae8ff)" }}>
        <Container maxWidth="lg">
          <Stack spacing={2} alignItems="center" textAlign="center">
            <Chip label="Discover top prompts" color="secondary" variant="outlined" />
            <Typography variant="h3" fontWeight={800}>
              Find, explore and use the best AI prompts
            </Typography>
            <Typography variant="h6" color="text.secondary">
              Curated marketplace of high-quality prompts for ChatGPT, Claude, Midjourney and more.
            </Typography>
            <TextField
              placeholder={placeholder}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              fullWidth
              sx={{ maxWidth: 720, backgroundColor: "white" }}
            />
            <Stack direction="row" spacing={1} flexWrap="wrap" justifyContent="center">
              {tags.map((t) => (
                <Chip key={t} label={t} clickable />
              ))}
            </Stack>
          </Stack>
        </Container>
      </Box>

      <Container sx={{ py: 6 }}>
        <Typography variant="h5" fontWeight={700} sx={{ mb: 2 }}>
          Featured
        </Typography>
        <PromptGrid prompts={prompts} limit={6} dense />

        <Box className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Card className="bg-white">
            <CardContent>
              <Typography variant="h6" fontWeight={700}>10k+ Prompts</Typography>
              <Typography color="text.secondary">Curated across popular AI models</Typography>
            </CardContent>
          </Card>
          <Card className="bg-white">
            <CardContent>
              <Typography variant="h6" fontWeight={700}>Trusted Sellers</Typography>
              <Typography color="text.secondary">Quality checked and rated</Typography>
            </CardContent>
          </Card>
          <Card className="bg-white">
            <CardContent>
              <Typography variant="h6" fontWeight={700}>Secure Checkout</Typography>
              <Typography color="text.secondary">Powered by Stripe</Typography>
            </CardContent>
          </Card>
        </Box>

        <Typography variant="h5" fontWeight={700} sx={{ mt: 8, mb: 2 }}>
          All Prompts
        </Typography>
        <PromptGrid prompts={prompts} />
      </Container>
    </>
  );
}
