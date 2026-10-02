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
