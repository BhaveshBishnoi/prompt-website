"use client";

import { Container, Typography } from "@mui/material";
import PromptGrid from "../../components/prompts/PromptGrid";

export default function PromptsPage() {
  return (
    <Container sx={{ py: 6 }}>
      <Typography variant="h4" fontWeight={700} sx={{ mb: 3 }}>Marketplace</Typography>
      <PromptGrid />
    </Container>
  );
}


