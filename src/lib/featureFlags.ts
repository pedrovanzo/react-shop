// A flag with no value in .env falls back to its default
function resolveFlag(value: string | undefined, defaultEnabled: boolean) {
    if (value === undefined || value === "") return defaultEnabled
    return value === "true"
}
export const FEATURE_FLAG_DEFINITIONS = {
    SANDBOX: {
        envVar: "FEATURE_FLAG_SANDBOX",
        value: import.meta.env.FEATURE_FLAG_SANDBOX,
        defaultEnabled: false,
        description: "Sandbox page and its menu link",
    },
    SNAKE: {
        envVar: "FEATURE_FLAG_SNAKE",
        value: import.meta.env.FEATURE_FLAG_SNAKE,
        defaultEnabled: true,
        description: "Snake game page",
    },
    FEATURE_FLAG_MENU: {
        envVar: "FEATURE_FLAG_MENU",
        value: import.meta.env.FEATURE_FLAG_MENU,
        defaultEnabled: false,
        description: "Feature flag page and its menu link",
    },
} as const
export type FeatureFlagName = keyof typeof FEATURE_FLAG_DEFINITIONS
export const FEATURE_FLAGS = Object.fromEntries(
    Object.entries(FEATURE_FLAG_DEFINITIONS).map(([name, definition]) => [
        name,
        resolveFlag(definition.value, definition.defaultEnabled),
    ])
) as Record<FeatureFlagName, boolean>
