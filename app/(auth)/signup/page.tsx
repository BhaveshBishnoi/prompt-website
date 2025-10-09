"use client";

import { Container, Paper, Stack, Typography, TextField, Button } from "@mui/material";

export default function SignupPage() {
  return (
    <Container maxWidth="sm" sx={{ py: 8 }}>
      <Paper sx={{ p: 4 }}>
        <Stack spacing={3}>
          <Typography variant="h5" fontWeight={700}>Create account</Typography>
          <TextField label="Name" fullWidth disabled />
          <TextField label="Email" type="email" fullWidth disabled />
          <TextField label="Password" type="password" fullWidth disabled helperText="Account creation via OAuth for now" />
          <Button variant="contained" disabled>Sign up</Button>
        </Stack>
      </Paper>
    </Container>
  );
}


