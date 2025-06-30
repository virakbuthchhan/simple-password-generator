"use client";
import {
  createTheme,
  ThemeProvider as MUIThemeProvider,
} from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import {
  ReactNode,
  createContext,
  useContext,
  useState,
  useEffect,
} from "react";

type ThemeMode = "light" | "dark" | "system";

interface ThemeContextType {
  mode: ThemeMode;
  toggleTheme: () => void;
  setThemeMode: (mode: ThemeMode) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useThemeMode = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useThemeMode must be used within a ThemeProvider");
  }
  return context;
};

const getSystemTheme = (): "light" | "dark" => {
  if (typeof window !== "undefined") {
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  }
  return "light";
};

const createCustomTheme = (mode: "light" | "dark") =>
  createTheme({
    palette: {
      mode,
      primary: {
        main: mode === "dark" ? "#64B5F6" : "#2196F3",
        light: mode === "dark" ? "#90CAF9" : "#64B5F6",
        dark: mode === "dark" ? "#42A5F5" : "#1976D2",
      },
      secondary: {
        main: mode === "dark" ? "#4DD0E1" : "#21CBF3",
        light: mode === "dark" ? "#80DEEA" : "#4DD0E1",
        dark: mode === "dark" ? "#26C6DA" : "#0097A7",
      },
      background: {
        default: mode === "dark" ? "#0a0e1a" : "#f8fafc",
        paper: mode === "dark" ? "#1a1f3a" : "#ffffff",
      },
      text: {
        primary: mode === "dark" ? "#e2e8f0" : "#1a202c",
        secondary: mode === "dark" ? "#a0aec0" : "#4a5568",
      },
      divider: mode === "dark" ? "#2d3748" : "#e2e8f0",
    },
    typography: {
      fontFamily: "Inter, -apple-system, BlinkMacSystemFont, sans-serif",
      h1: {
        fontSize: "2.5rem",
        fontWeight: 700,
      },
      h2: {
        fontSize: "2rem",
        fontWeight: 600,
      },
      body1: {
        fontSize: "1rem",
        lineHeight: 1.6,
      },
    },
    shape: {
      borderRadius: 12,
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            textTransform: "none",
            fontSize: "1rem",
            fontWeight: 600,
            padding: "12px 24px",
            borderRadius: "12px",
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            boxShadow:
              mode === "dark"
                ? "0 4px 20px rgba(0, 0, 0, 0.3)"
                : "0 4px 20px rgba(0, 0, 0, 0.08)",
            borderRadius: "16px",
            backdropFilter: "blur(10px)",
            border:
              mode === "dark" ? "1px solid rgba(255, 255, 255, 0.1)" : "none",
          },
        },
      },
      MuiTextField: {
        styleOverrides: {
          root: {
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor:
                  mode === "dark"
                    ? "rgba(255, 255, 255, 0.2)"
                    : "rgba(0, 0, 0, 0.23)",
              },
              "&:hover fieldset": {
                borderColor:
                  mode === "dark"
                    ? "rgba(255, 255, 255, 0.4)"
                    : "rgba(0, 0, 0, 0.4)",
              },
            },
          },
        },
      },
    },
  });

interface ThemeProviderProps {
  children: ReactNode;
}

export default function ThemeProvider({ children }: ThemeProviderProps) {
  const [mode, setMode] = useState<ThemeMode>("system");
  const [actualMode, setActualMode] = useState<"light" | "dark">("light");

  useEffect(() => {
    // Get saved theme preference or default to system
    const savedMode =
      (localStorage.getItem("theme-mode") as ThemeMode) || "system";
    setMode(savedMode);
  }, []);

  useEffect(() => {
    const updateActualMode = () => {
      if (mode === "system") {
        setActualMode(getSystemTheme());
      } else {
        setActualMode(mode as "light" | "dark");
      }
    };

    updateActualMode();

    if (mode === "system") {
      const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
      mediaQuery.addEventListener("change", updateActualMode);
      return () => mediaQuery.removeEventListener("change", updateActualMode);
    }
  }, [mode]);

  const toggleTheme = () => {
    const newMode = actualMode === "light" ? "dark" : "light";
    setThemeMode(newMode);
  };

  const setThemeMode = (newMode: ThemeMode) => {
    setMode(newMode);
    localStorage.setItem("theme-mode", newMode);
  };

  const theme = createCustomTheme(actualMode);

  return (
    <ThemeContext.Provider value={{ mode, toggleTheme, setThemeMode }}>
      <MUIThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MUIThemeProvider>
    </ThemeContext.Provider>
  );
}
