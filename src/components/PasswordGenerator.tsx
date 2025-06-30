"use client";
import React from "react";
import {
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  FormControlLabel,
  Checkbox,
  Slider,
  Box,
  IconButton,
  Snackbar,
  Alert,
  Grid,
  Chip,
} from "@mui/material";
import {
  ContentCopy,
  Refresh,
  Security,
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";
import { usePasswordGenerator } from "../hooks/usePasswordGenerator";
import PasswordStrengthIndicator from "./PasswordStrengthIndicator";

export default function PasswordGenerator() {
  const {
    password,
    options,
    showPassword,
    snackbarOpen,
    updateOptions,
    generatePassword,
    copyToClipboard,
    toggleShowPassword,
    closeSnackbar,
    getPasswordStrength,
  } = usePasswordGenerator();

  const strengthData = getPasswordStrength(password);

  return (
    <Card
      sx={{
        width: "100%",
        maxWidth: 600,
        mx: "auto",
        p: { xs: 2, md: 3 },
      }}
    >
      <CardContent>
        <Box sx={{ mb: 4 }}>
          <Typography
            variant="h5"
            gutterBottom
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              fontSize: { xs: "1.25rem", md: "1.5rem" },
            }}
          >
            <Security color="primary" />
            Generate Secure Password
          </Typography>
        </Box>

        {/* Password Display */}
        <Box sx={{ mb: 4 }}>
          <TextField
            fullWidth
            variant="outlined"
            value={password}
            type={showPassword ? "text" : "password"}
            InputProps={{
              readOnly: true,
              sx: {
                fontSize: { xs: "1.1rem", md: "1.3rem" },
                fontFamily: "monospace",
                letterSpacing: "0.1em",
                height: "60px",
              },
              endAdornment: (
                <Box sx={{ display: "flex", gap: 1 }}>
                  <IconButton onClick={toggleShowPassword} edge="end">
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                  <IconButton onClick={copyToClipboard} edge="end">
                    <ContentCopy />
                  </IconButton>
                </Box>
              ),
            }}
            sx={{ mb: 2 }}
          />

          <PasswordStrengthIndicator
            strength={strengthData.score}
            label={strengthData.label}
            color={strengthData.color}
          />
        </Box>

        {/* Password Length */}
        <Box sx={{ mb: 3 }}>
          <Typography gutterBottom sx={{ fontSize: "1.1rem", fontWeight: 500 }}>
            Password Length: {options.length}
          </Typography>
          <Slider
            value={options.length}
            onChange={(_, value) => updateOptions({ length: value as number })}
            min={4}
            max={50}
            step={1}
            marks={[
              { value: 8, label: "8" },
              { value: 16, label: "16" },
              { value: 32, label: "32" },
              { value: 50, label: "50" },
            ]}
            sx={{
              "& .MuiSlider-thumb": {
                width: 24,
                height: 24,
              },
              "& .MuiSlider-track": {
                height: 6,
              },
              "& .MuiSlider-rail": {
                height: 6,
              },
            }}
          />
        </Box>

        {/* Character Options */}
        <Box sx={{ mb: 4 }}>
          <Typography
            gutterBottom
            sx={{ fontSize: "1.1rem", fontWeight: 500, mb: 2 }}
          >
            Character Types
          </Typography>
          <Grid container spacing={2}>
            <Grid size={{ xs: 12, sm: 6 }}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={options.includeUppercase}
                    onChange={(e) =>
                      updateOptions({ includeUppercase: e.target.checked })
                    }
                    color="primary"
                  />
                }
                label={
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <Typography sx={{ fontSize: "1rem" }}>
                      Uppercase (A-Z)
                    </Typography>
                    <Chip label="ABC" size="small" variant="outlined" />
                  </Box>
                }
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={options.includeLowercase}
                    onChange={(e) =>
                      updateOptions({ includeLowercase: e.target.checked })
                    }
                    color="primary"
                  />
                }
                label={
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <Typography sx={{ fontSize: "1rem" }}>
                      Lowercase (a-z)
                    </Typography>
                    <Chip label="abc" size="small" variant="outlined" />
                  </Box>
                }
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={options.includeNumbers}
                    onChange={(e) =>
                      updateOptions({ includeNumbers: e.target.checked })
                    }
                    color="primary"
                  />
                }
                label={
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <Typography sx={{ fontSize: "1rem" }}>
                      Numbers (0-9)
                    </Typography>
                    <Chip label="123" size="small" variant="outlined" />
                  </Box>
                }
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={options.includeSymbols}
                    onChange={(e) =>
                      updateOptions({ includeSymbols: e.target.checked })
                    }
                    color="primary"
                  />
                }
                label={
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <Typography sx={{ fontSize: "1rem" }}>
                      Symbols (!@#$)
                    </Typography>
                    <Chip label="!@#" size="small" variant="outlined" />
                  </Box>
                }
              />
            </Grid>
          </Grid>
        </Box>

        {/* Generate Button */}
        <Button
          fullWidth
          variant="contained"
          onClick={generatePassword}
          startIcon={<Refresh />}
          sx={{
            height: "56px",
            fontSize: "1.1rem",
            fontWeight: 600,
            background: (theme) =>
              theme.palette.mode === "dark"
                ? "linear-gradient(45deg, #64B5F6, #4DD0E1)"
                : "linear-gradient(45deg, #2196F3, #21CBF3)",
            "&:hover": {
              background: (theme) =>
                theme.palette.mode === "dark"
                  ? "linear-gradient(45deg, #42A5F5, #26C6DA)"
                  : "linear-gradient(45deg, #1976D2, #0097A7)",
            },
            transition: "all 0.3s ease-in-out",
            boxShadow: (theme) =>
              theme.palette.mode === "dark"
                ? "0 4px 15px rgba(100, 181, 246, 0.3)"
                : "0 4px 15px rgba(33, 150, 243, 0.3)",
          }}
        >
          Generate New Password
        </Button>

        {/* Success Snackbar */}
        <Snackbar
          open={snackbarOpen}
          autoHideDuration={3000}
          onClose={closeSnackbar}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        >
          <Alert
            onClose={closeSnackbar}
            severity="success"
            sx={{ width: "100%" }}
          >
            Password copied to clipboard!
          </Alert>
        </Snackbar>
      </CardContent>
    </Card>
  );
}
