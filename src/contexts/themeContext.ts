import { createContext, useContext } from "react";
import { Theme, ThemePreference } from "../lib/theme";
interface ThemeContextType {
    preference: ThemePreference;
    theme: Theme;
    setPreference: (preference: ThemePreference) => void;
}
export const ThemeContext = createContext<ThemeContextType | undefined>(
    undefined
);
export const useTheme = (): ThemeContextType => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error("useTheme must be used within a ThemeProvider");
    }
    return context;
};
