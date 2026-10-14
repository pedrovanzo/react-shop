import { ColorMode } from "../../lib/theme";

// Shared by the theme pickers, the theme preview card and their components library previews
export const COLOR_LABELS: Record<ColorMode, string> = { default: "Default", red: "Red", blue: "Blue", green: "Green" };

// The palette's shades, lightest to darkest (--tint-50 to --tint-950)
export const SHADES = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950] as const;
export type Shade = (typeof SHADES)[number];

// Selected shadcn ToggleGroupItem in the accent color
export const BRAND_TOGGLE_ITEM_CLASS = "data-[state=on]:bg-brand/15 data-[state=on]:text-brand";
