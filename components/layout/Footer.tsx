"use client";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Link from "next/link";

export default function Footer() {
  return (
    <Box component="footer" sx={{ py: 6, color: "text.secondary", mt: 8, borderTop: (t) => `1px solid ${t.palette.divider}` }}>
      <Box sx={{ maxWidth: 1200, mx: "auto", px: 2 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={4}>
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 1, color: "text.primary" }}>ReadyPrompt</Typography>
            <Typography variant="body2">Find and share high-quality prompts for your favorite AI models.</Typography>
          </Grid>
          <Grid item xs={6} sm={3} md={2}>
            <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1, color: "text.primary" }}>Marketplace</Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 0.5 }}>
              <Link href="/(marketplace)/prompts">Prompts</Link>
              <Link href="/(marketplace)/categories">Categories</Link>
              <Link href="/(marketplace)/search">Search</Link>
            </Box>
          </Grid>
          <Grid item xs={6} sm={3} md={2}>
            <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1, color: "text.primary" }}>Company</Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 0.5 }}>
              <Link href="#">About</Link>
              <Link href="#">Blog</Link>
              <Link href="#">Support</Link>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1, color: "text.primary" }}>Newsletter</Typography>
            <Typography variant="body2" sx={{ mb: 1 }}>Get updates on new prompts and features.</Typography>
            <Box className="flex gap-2">
              <input className="flex-1 border rounded px-3 py-2" placeholder="Enter your email" />
              <button className="bg-indigo-500 text-white rounded px-4">Subscribe</button>
            </Box>
          </Grid>
        </Grid>
        <Typography variant="caption" sx={{ display: "block", mt: 3, textAlign: "center" }}>© {new Date().getFullYear()} ReadyPrompt</Typography>
      </Box>
    </Box>
  );
}


