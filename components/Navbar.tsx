"use client";

import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import { useSession, signIn, signOut } from "next-auth/react";

export default function Navbar() {
  const { data: session, status } = useSession();

  return (
    <AppBar position="sticky" color="default" elevation={0}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h6" sx={{ fontWeight: 700 }}>
          ReadyPrompt
        </Typography>
        <Box>
          {status === "authenticated" ? (
            <Stack direction="row" spacing={1} alignItems="center">
              <Avatar src={session.user?.image ?? undefined} alt={session.user?.name ?? ""} sx={{ width: 30, height: 30 }} />
              <Typography variant="body2" sx={{ mr: 1 }}>{session.user?.name}</Typography>
              <Button variant="outlined" color="inherit" onClick={() => signOut()}>
                Sign out
              </Button>
            </Stack>
          ) : (
            <Button variant="contained" onClick={() => signIn("github")}>Sign in</Button>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}


