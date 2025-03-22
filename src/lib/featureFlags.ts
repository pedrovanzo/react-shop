export type FeatureFlagName = keyof typeof FEATURE_FLAGS
export const FEATURE_FLAGS = {
    SANDBOX: import.meta.env.FEATURE_FLAG_SANDBOX === "true",
    SNAKE: import.meta.env.FEATURE_FLAG_SNAKE === "true"
} as const