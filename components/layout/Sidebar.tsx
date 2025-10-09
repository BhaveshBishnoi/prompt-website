"use client";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

type SidebarProps = {
  title?: string;
  children?: React.ReactNode;
};

export default function Sidebar({ title = "Filters", children }: SidebarProps) {
  return (
    <Box sx={{ minWidth: 260 }}>
      <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2 }}>{title}</Typography>
      {children}
    </Box>
  );
}


