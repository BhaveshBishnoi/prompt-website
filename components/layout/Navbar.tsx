"use client";

import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import TextField from "@mui/material/TextField";
import useMediaQuery from "@mui/material/useMediaQuery";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import { useSession, signIn, signOut } from "next-auth/react";
import { useMemo, useState } from "react";
import Link from "next/link";

export default function Navbar() {
  const { data: session, status } = useSession();
  const [open, setOpen] = useState(false);
  const isMdUp = useMediaQuery("(min-width:900px)");

  const navLinks = useMemo(() => [
    { label: "Marketplace", href: "/" },
    { label: "Prompts", href: "/(marketplace)/prompts" },
    { label: "Categories", href: "/(marketplace)/categories" },
    ...(status === "authenticated" ? [{ label: "Dashboard", href: "/(dashboard)/dashboard" }] : []),
  ], [status]);

  return (
    <AppBar position="sticky" color="default" elevation={0}>
      <Toolbar sx={{ display: "flex", gap: 2 }}>
        {!isMdUp && (
          <IconButton edge="start" onClick={() => setOpen(true)} aria-label="menu">
            <MenuIcon />
          </IconButton>
        )}
        <Typography component={Link} href="/" variant="h6" sx={{ fontWeight: 700, textDecoration: "none", color: "inherit", mr: 1 }}>
          ReadyPrompt
        </Typography>

        {isMdUp && (
          <Stack direction="row" spacing={2} sx={{ ml: 2, mr: "auto" }}>
            {navLinks.map((l) => (
              <Button key={l.href} component={Link} href={l.href} color="inherit">{l.label}</Button>
            ))}
          </Stack>
        )}

        {isMdUp && (
          <TextField size="small" placeholder="Search prompts" InputProps={{ startAdornment: <SearchIcon fontSize="small" /> }} sx={{ maxWidth: 300, mr: 2 }} />
        )}

        <Box sx={{ ml: "auto" }}>
          {status === "authenticated" ? (
            <Stack direction="row" spacing={1} alignItems="center">
              <Avatar src={session.user?.image ?? undefined} alt={session.user?.name ?? ""} sx={{ width: 30, height: 30 }} />
              <Typography variant="body2" sx={{ mr: 1, display: { xs: "none", sm: "block" } }}>{session.user?.name}</Typography>
              <Button variant="outlined" color="inherit" onClick={() => signOut()}>
                Sign out
              </Button>
            </Stack>
          ) : (
            <Stack direction="row" spacing={1}>
              <Button variant="outlined" onClick={() => signIn("github")}>GitHub</Button>
              <Button variant="contained" onClick={() => signIn("google")}>Google</Button>
            </Stack>
          )}
        </Box>
      </Toolbar>

      <Drawer anchor="left" open={open} onClose={() => setOpen(false)}>
        <Box sx={{ width: 280, p: 2 }} role="presentation" onClick={() => setOpen(false)}>
          <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>ReadyPrompt</Typography>
          <TextField size="small" placeholder="Search prompts" fullWidth sx={{ mb: 1 }} />
          <Divider sx={{ mb: 1 }} />
          <List>
            {navLinks.map((l) => (
              <ListItem key={l.href} disablePadding>
                <ListItemButton component={Link} href={l.href}>
                  <ListItemText primary={l.label} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          <Divider sx={{ my: 1 }} />
          {status === "authenticated" ? (
            <Button fullWidth variant="outlined" onClick={() => signOut()}>Sign out</Button>
          ) : (
            <Stack direction="row" spacing={1}>
              <Button fullWidth variant="outlined" onClick={() => signIn("github")}>GitHub</Button>
              <Button fullWidth variant="contained" onClick={() => signIn("google")}>Google</Button>
            </Stack>
          )}
        </Box>
      </Drawer>
    </AppBar>
  );
}


