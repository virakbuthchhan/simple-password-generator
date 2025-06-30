"use client";

import PasswordGenerator from "../components/PasswordGenerator";
import ThemeToggle from "../components/ThemeToggle";
import { Container, Box, Typography } from "@mui/material";

export default function Home() {
  return (
    <Container maxWidth="md">
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          py: 4,
          position: "relative",
        }}
      >
        {/* Theme Toggle */}
        <Box
          sx={{
            position: "absolute",
            top: { xs: 16, md: 24 },
            right: { xs: 16, md: 24 },
          }}
        >
          <ThemeToggle />
        </Box>

        <Typography
          variant="h2"
          component="h1"
          gutterBottom
          sx={{
            fontSize: { xs: "2.5rem", md: "3.5rem" },
            fontWeight: 700,
            textAlign: "center",
            background: (theme) =>
              theme.palette.mode === "dark"
                ? "linear-gradient(45deg, #64B5F6, #4DD0E1)"
                : "linear-gradient(45deg, #2196F3, #21CBF3)",
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            mb: 4,
          }}
        >
          Password Generator
        </Typography>
        <PasswordGenerator />
      </Box>
    </Container>
  );
}
