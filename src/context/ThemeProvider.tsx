import React, { useState } from "react";
import ThemeContext from "./ThemeContext";

export default function ThemeProvider({ children }: React.PropsWithChildren) {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(true);
  const toggleTheme = () => setIsDarkMode((prev) => !prev);

  return (
    <ThemeContext value={{ isDarkMode, toggleTheme }}>{children}</ThemeContext>
  );
}
