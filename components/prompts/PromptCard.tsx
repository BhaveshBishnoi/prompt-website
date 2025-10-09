"use client";

import { Card, CardActionArea, CardContent, CardHeader, Chip, Rating, Stack, Typography, Avatar, CardActions, Button } from "@mui/material";

type PromptCardProps = {
  title: string;
  description: string;
  category: string;
  rating: number;
  author: { name: string; image?: string };
  dense?: boolean;
};

export default function PromptCard({ title, description, category, rating, author, dense = false }: PromptCardProps) {
  return (
    <Card variant="outlined" sx={{ height: "100%" }}>
      <CardHeader
        titleTypographyProps={{ variant: dense ? "subtitle1" : "h6" }}
        title={title}
        subheader={
          <Stack direction="row" spacing={1} alignItems="center">
            <Chip size="small" label={category} />
            <Rating readOnly value={rating} size="small" precision={0.5} />
          </Stack>
        }
      />
      <CardActionArea>
        <CardContent>
          <Typography variant={dense ? "body2" : "body1"} color="text.secondary" sx={{ mb: 2 }}>
            {description}
          </Typography>
          <Stack direction="row" spacing={1} alignItems="center">
            <Avatar src={author.image} sx={{ width: 24, height: 24 }} />
            <Typography variant="caption" color="text.secondary">{author.name}</Typography>
          </Stack>
        </CardContent>
      </CardActionArea>
      <CardActions sx={{ justifyContent: "space-between", px: 2, pb: 2 }}>
        <Button size={dense ? "small" : "medium"} variant="text">Quick view</Button>
        <Button size={dense ? "small" : "medium"} variant="contained">Buy now</Button>
      </CardActions>
    </Card>
  );
}


