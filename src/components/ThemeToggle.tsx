"use client";
import React, { useState } from "react";
import {
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Tooltip,
  Box,
  useTheme,
} from "@mui/material";
import {
  Brightness4,
  Brightness7,
  SettingsBrightness,
  Check,
} from "@mui/icons-material";
import { useThemeMode } from "./ThemeProvider";

export default function ThemeToggle() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const { mode, setThemeMode } = useThemeMode();
  const theme = useTheme();
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleThemeChange = (newMode: "light" | "dark" | "system") => {
    setThemeMode(newMode);
    handleClose();
  };

  const getIcon = () => {
    switch (mode) {
      case "light":
        return <Brightness7 />;
      case "dark":
        return <Brightness4 />;
      case "system":
        return <SettingsBrightness />;
      default:
        return <SettingsBrightness />;
    }
  };

  const getTooltip = () => {
    switch (mode) {
      case "light":
        return "Light mode";
      case "dark":
        return "Dark mode";
      case "system":
        return "System theme";
      default:
        return "Theme";
    }
  };

  return (
    <Box>
      <Tooltip title={getTooltip()}>
        <IconButton
          onClick={handleClick}
          sx={{
            backgroundColor: theme.palette.background.paper,
            border: `1px solid ${theme.palette.divider}`,
            "&:hover": {
              backgroundColor: theme.palette.action.hover,
            },
            transition: "all 0.2s ease-in-out",
          }}
        >
          {getIcon()}
        </IconButton>
      </Tooltip>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        PaperProps={{
          sx: {
            mt: 1,
            minWidth: 160,
            border: `1px solid ${theme.palette.divider}`,
          },
        }}
      >
        <MenuItem onClick={() => handleThemeChange("light")} sx={{ gap: 1 }}>
          <ListItemIcon>
            <Brightness7 fontSize="small" />
          </ListItemIcon>
          <ListItemText>Light</ListItemText>
          {mode === "light" && <Check fontSize="small" color="primary" />}
        </MenuItem>

        <MenuItem onClick={() => handleThemeChange("dark")} sx={{ gap: 1 }}>
          <ListItemIcon>
            <Brightness4 fontSize="small" />
          </ListItemIcon>
          <ListItemText>Dark</ListItemText>
          {mode === "dark" && <Check fontSize="small" color="primary" />}
        </MenuItem>

        <MenuItem onClick={() => handleThemeChange("system")} sx={{ gap: 1 }}>
          <ListItemIcon>
            <SettingsBrightness fontSize="small" />
          </ListItemIcon>
          <ListItemText>System</ListItemText>
          {mode === "system" && <Check fontSize="small" color="primary" />}
        </MenuItem>
      </Menu>
    </Box>
  );
}
