"use client";

import { Box, Button, Container, Paper, Stack, TextField, Typography } from "@mui/material";
import { signIn } from "next-auth/react";

export default function LoginPage() {
  return (
    <Container maxWidth="sm" sx={{ py: 8 }}>
      <Paper sx={{ p: 4 }}>
        <Stack spacing={3}>
          <Typography variant="h5" fontWeight={700}>Sign in</Typography>
          <Box>
            <Button fullWidth variant="outlined" sx={{ mb: 1 }} onClick={() => signIn("github")}>Continue with GitHub</Button>
            <Button fullWidth variant="contained" onClick={() => signIn("google")}>Continue with Google</Button>
          </Box>
          <TextField label="Email" type="email" fullWidth disabled />
          <TextField label="Password" type="password" fullWidth disabled helperText="Email/password coming soon" />
        </Stack>
      </Paper>
    </Container>
  );
}


