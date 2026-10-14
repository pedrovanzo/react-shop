import { ReactNode, useEffect, useState } from "react";
import { ThemeContext } from "./themeContext";
import { setFavicon } from "../lib/favicon";
import {
    ColorMode,
    darkSchemeQuery,
    getStoredColorMode,
    getStoredThemePreference,
    resolveTheme,
    storeColorMode,
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
    const [colorMode, setColorModeState] = useState<ColorMode>(getStoredColorMode);
    const theme = resolveTheme(preference, systemIsDark);
    useEffect(() => {
        const onChange = (event: MediaQueryListEvent) =>
            setSystemIsDark(event.matches);
        darkSchemeQuery.addEventListener("change", onChange);
        return () => darkSchemeQuery.removeEventListener("change", onChange);
    }, []);
    useEffect(() => {
        const root = document.documentElement;
        root.setAttribute("data-theme", theme);
        root.setAttribute("data-color-mode", colorMode);
        // The favicon uses the resolved text and background colors, so it follows the color mode too
        const styles = getComputedStyle(root);
        setFavicon(styles.getPropertyValue("--color-default").trim(), styles.getPropertyValue("--color-contrast").trim());
    }, [theme, colorMode]);
    // Only an explicit choice is persisted, so "system" keeps following the OS
    const setPreference = (newPreference: ThemePreference) => {
        storeThemePreference(newPreference);
        setPreferenceState(newPreference);
    };
    const setColorMode = (mode: ColorMode) => {
        storeColorMode(mode);
        setColorModeState(mode);
    };
    return (
        <ThemeContext.Provider value={{ preference, theme, setPreference, colorMode, setColorMode }}>
            {children}
        </ThemeContext.Provider>
    );
};
