"use client";

import { Container } from "@mui/material";
import PromptDetail from "../../../components/prompts/PromptDetail";

type PageProps = {
  params: { id: string };
};

export default function PromptDetailPage({ params }: PageProps) {
  return (
    <Container sx={{ py: 6 }}>
      <PromptDetail promptId={params.id} />
    </Container>
  );
}


