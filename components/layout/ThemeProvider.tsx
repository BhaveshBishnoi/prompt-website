"use client";

import { ThemeProvider as NextThemeProvider } from "next-themes";
import { useEffect, useState } from "react";

export default function ThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  // Prevent hydration mismatch by rendering children only after mount
  return (
    <NextThemeProvider attribute="class" defaultTheme="system">
      {mounted ? children : null}
    </NextThemeProvider>
  );
}
