"use client";

import { SessionProvider } from "next-auth/react";
import { createTheme, ThemeProvider, CssBaseline } from "@mui/material";
import { ReactNode, useMemo } from "react";

type ProvidersProps = {
  children: ReactNode;
};

export default function Providers({ children }: ProvidersProps) {
  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: "light",
          primary: { main: "#6366f1" },
          secondary: { main: "#ec4899" },
        },
        shape: { borderRadius: 10 },
      }),
    []
  );

  return (
    <SessionProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </SessionProvider>
  );
}


