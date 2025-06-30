"use client";
import React from "react";
import { Box, Typography, LinearProgress } from "@mui/material";

interface PasswordStrengthIndicatorProps {
  strength: number;
  label: string;
  color: "error" | "warning" | "info" | "success";
}

export default function PasswordStrengthIndicator({
  strength,
  label,
  color,
}: PasswordStrengthIndicatorProps) {
  return (
    <Box>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
        <Typography variant="body2" color="text.secondary">
          Password Strength
        </Typography>
        <Typography
          variant="body2"
          sx={{
            fontWeight: 600,
            color: `${color}.main`,
            textTransform: "capitalize",
          }}
        >
          {label}
        </Typography>
      </Box>
      <LinearProgress
        variant="determinate"
        value={strength * 25}
        color={color}
        sx={{
          height: 8,
          borderRadius: 4,
          "& .MuiLinearProgress-bar": {
            borderRadius: 4,
          },
        }}
      />
    </Box>
  );
}
