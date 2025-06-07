import React from "react";
import { Container, Paper } from "@mui/material";

export default function ContainerWrapper({ children }) {
  return (
    <Container maxWidth="sm" sx={{ mt: 6 }}>
      <Paper sx={{ p: 4 }}>{children}</Paper>
    </Container>
  );
}
