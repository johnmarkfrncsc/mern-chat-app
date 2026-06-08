import { createContext, useContext } from "react";
import useTheme from "../hooks/useTheme.js";

const ThemeContext = createContext(null);

export const ThemeProvider = ({ children }) => {
  const theme = useTheme();
  return (
    <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>
  );
};

export const useThemeContext = () => useContext(ThemeContext);
