import { ReactNode, useEffect, useState } from "react";
import { ThemeContext } from "./themeContext";
import { setFavicon } from "../lib/favicon";
import {
    darkSchemeQuery,
    getStoredThemePreference,
    resolveTheme,
    storeThemePreference,
    ThemePreference,
} from "../lib/theme";
interface ThemeProviderProps {
    children: ReactNode;
}
export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
    const [preference, setPreferenceState] = useState<ThemePreference>(
        getStoredThemePreference
    );
    const [systemIsDark, setSystemIsDark] = useState(darkSchemeQuery.matches);
    const theme = resolveTheme(preference, systemIsDark);
    useEffect(() => {
        const onChange = (event: MediaQueryListEvent) =>
            setSystemIsDark(event.matches);
        darkSchemeQuery.addEventListener("change", onChange);
        return () => darkSchemeQuery.removeEventListener("change", onChange);
    }, []);
    useEffect(() => {
        document.documentElement.setAttribute("data-theme", theme);
        if (theme === "dark") {
            setFavicon("#ffffff", "#000000");
        } else {
            setFavicon("#000000", "#ffffff");
        }
    }, [theme]);
    // Only an explicit choice is persisted, so "system" keeps following the OS
    const setPreference = (newPreference: ThemePreference) => {
        storeThemePreference(newPreference);
        setPreferenceState(newPreference);
    };
    return (
        <ThemeContext.Provider value={{ preference, theme, setPreference }}>
            {children}
        </ThemeContext.Provider>
    );
};
