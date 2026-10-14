export type ThemePreference = "system" | "light" | "dark"
export type Theme = "light" | "dark"
// Keep in sync with the inline script in index.html
export const THEME_STORAGE_KEY = "theme"
export const darkSchemeQuery = window.matchMedia("(prefers-color-scheme: dark)")
export function getStoredThemePreference(): ThemePreference {
    const stored = localStorage.getItem(THEME_STORAGE_KEY)
    return stored === "light" || stored === "dark" ? stored : "system"
}
export function storeThemePreference(preference: ThemePreference) {
    if (preference === "system") {
        localStorage.removeItem(THEME_STORAGE_KEY)
    } else {
        localStorage.setItem(THEME_STORAGE_KEY, preference)
    }
}
export function resolveTheme(preference: ThemePreference, systemIsDark: boolean): Theme {
    if (preference !== "system") return preference
    return systemIsDark ? "dark" : "light"
}

// Color modes repaint the whole palette in shades of one color (src/themes.css)
export type ColorMode = "default" | "red" | "blue" | "green"
export const COLOR_MODES: ColorMode[] = ["default", "red", "blue", "green"]
// Keep in sync with the inline script in index.html
export const COLOR_MODE_STORAGE_KEY = "theme-color"
export function getStoredColorMode(): ColorMode {
    const stored = localStorage.getItem(COLOR_MODE_STORAGE_KEY)
    return COLOR_MODES.includes(stored as ColorMode) ? (stored as ColorMode) : "default"
}
export function storeColorMode(mode: ColorMode) {
    if (mode === "default") {
        localStorage.removeItem(COLOR_MODE_STORAGE_KEY)
    } else {
        localStorage.setItem(COLOR_MODE_STORAGE_KEY, mode)
    }
}
