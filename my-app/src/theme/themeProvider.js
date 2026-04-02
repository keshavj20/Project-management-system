// theme/themeProvider.js
import { createContext, useMemo, useState, useContext } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import darkTheme from "./darkMode";
// import lightTheme from "./lightMode";

const ThemeModeContext = createContext();

export const useThemeMode = () => useContext(ThemeModeContext);

export default function ThemeProviderWrapper({ children }) {
  const [mode, setMode] = useState("light");

  const toggleTheme = () => {
    setMode((prev) => (prev === "light" ? "dark" : "light"));
  };

  const theme = useMemo(() => createTheme(mode === "light" ? lightTheme : darkTheme), [mode]);

  return (
    <ThemeModeContext.Provider value={{ toggleTheme, mode }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ThemeModeContext.Provider>
  );
}
