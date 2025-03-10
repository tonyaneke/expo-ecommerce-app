import React, { createContext, useContext, useState, useEffect } from "react";
import { useColorScheme } from "react-native";

// Define theme colors
export const lightTheme = {
  background: "#ffffff",
  text: "#111827",
  secondaryText: "#6b7280",
  primary: "#3b82f6",
  secondary: "#9ca3af",
  border: "#e5e7eb",
  card: "#ffffff",
  cardBorder: "#e5e7eb",
  success: "#047857",
  error: "#ef4444",
  inputBackground: "#f3f4f6",
  headerBackground: "#ffffff",
};

export const darkTheme = {
  background: "#111827",
  text: "#f3f4f6",
  secondaryText: "#9ca3af",
  primary: "#60a5fa",
  secondary: "#6b7280",
  border: "#374151",
  card: "#1f2937",
  cardBorder: "#374151",
  success: "#059669",
  error: "#ef4444",
  inputBackground: "#374151",
  headerBackground: "#111827",
};

type Theme = typeof lightTheme;

interface ThemeContextType {
  isDarkMode: boolean;
  toggleTheme: () => void;
  theme: Theme;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const systemColorScheme = useColorScheme();
  const [isDarkMode, setIsDarkMode] = useState(systemColorScheme === "dark");

  // Update theme when system theme changes
  useEffect(() => {
    setIsDarkMode(systemColorScheme === "dark");
  }, [systemColorScheme]);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const theme = isDarkMode ? darkTheme : lightTheme;

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme, theme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
