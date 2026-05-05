import { useState, useEffect } from "react";
import { themes } from "../config/themes.js";
import { changeTheme as saveTheme } from "../api/settings.js"; // ✅

const applyTheme = (theme) => {
  const root = document.documentElement;
  root.style.setProperty("--color-accent", theme.accent);
  root.style.setProperty("--color-hover", theme.hover);
  root.style.setProperty("--color-banner", theme.banner);
};

const useTheme = () => {
  const [activeTheme, setActiveTheme] = useState(() => {
    const saved = localStorage.getItem("tsika-theme");
    return themes.find((t) => t.id === saved) || themes[0];
  });

  useEffect(() => {
    applyTheme(activeTheme);
  }, [activeTheme]);

  const changeTheme = async (themeId) => {
    const theme = themes.find((t) => t.id === themeId);
    if (!theme) return;
    setActiveTheme(theme);
    localStorage.setItem("tsika-theme", themeId);

    try {
      await saveTheme(theme.accent);
    } catch (err) {
      console.error("Failed to save theme:", err);
    }
  };

  return { activeTheme, changeTheme, themes };
};

export default useTheme;
