import { createContext, useContext } from "react";

type ThemeContextType = {
  isDarkMode: boolean;
  toggleTheme: () => void;
};

const LevelContext = createContext<ThemeContextType | undefined>(undefined);
export default LevelContext;

export function useTheme() {
  const context = useContext(LevelContext);
  if (context === undefined) {
    throw new Error("useThemeContext must be used within ThemeProvider");
  }
  return context;
}
