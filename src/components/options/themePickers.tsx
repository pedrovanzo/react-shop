import { useId } from "react";
import { useTheme } from "../../contexts/themeContext";
import { ColorMode, COLOR_MODES, ThemePreference } from "../../lib/theme";
import OptionCard from "./optionCard";
import { COLOR_LABELS } from "./themeTokens";

// A tiny app window in fixed colors, so each option shows its own look whatever the current theme is
export function WindowSketch({ dark }: { dark: boolean }) {
    return (
        <div className={`flex h-full flex-col gap-1.5 p-2 ${dark ? "bg-neutral-900" : "bg-white"}`}>
            <div className={`h-1.5 w-1/2 rounded-full ${dark ? "bg-neutral-500" : "bg-neutral-400"}`}></div>
            <div className={`h-1.5 w-3/4 rounded-full ${dark ? "bg-neutral-700" : "bg-neutral-200"}`}></div>
            <div className={`h-1.5 w-2/3 rounded-full ${dark ? "bg-neutral-700" : "bg-neutral-200"}`}></div>
            <div className="mt-auto h-2.5 w-1/3 rounded-sm bg-blue-500"></div>
        </div>
    );
}

// The picture on each theme option: a light window, a dark one, or half of each for "Sync with system"
export function ThemeSketch({ value }: { value: ThemePreference }) {
    return (
        <div className="flex h-20 w-full overflow-hidden rounded border border-border">
            {value === "system" ? (
                // Half light, half dark
                <>
                    <div className="w-1/2">
                        <WindowSketch dark={false} />
                    </div>
                    <div className="w-1/2">
                        <WindowSketch dark />
                    </div>
                </>
            ) : (
                <div className="w-full">
                    <WindowSketch dark={value === "dark"} />
                </div>
            )}
        </div>
    );
}

const THEME_OPTIONS: { value: ThemePreference; label: string }[] = [
    { value: "system", label: "Sync with system" },
    { value: "light", label: "Light" },
    { value: "dark", label: "Dark" },
];

export function ThemeModePicker() {
    const { preference, setPreference } = useTheme();
    // Own radio group per picker: the options page shows it twice (Appearance and the components library)
    const name = useId();
    return (
        <fieldset>
            <legend className="sr-only">Theme mode</legend>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                {THEME_OPTIONS.map(({ value, label }) => (
                    <OptionCard
                        key={value}
                        name={name}
                        value={value}
                        label={label}
                        checked={preference === value}
                        onSelect={() => setPreference(value)}
                        preview={<ThemeSketch value={value} />}
                    />
                ))}
            </div>
        </fieldset>
    );
}

// Five shades per palette, light to dark (full class names so Tailwind generates them)
const COLOR_SWATCHES: Record<ColorMode, string[]> = {
    default: ["bg-white", "bg-neutral-300", "bg-neutral-500", "bg-neutral-800", "bg-black"],
    red: ["bg-red-50", "bg-red-300", "bg-red-500", "bg-red-800", "bg-red-950"],
    blue: ["bg-blue-50", "bg-blue-300", "bg-blue-500", "bg-blue-800", "bg-blue-950"],
    green: ["bg-green-50", "bg-green-300", "bg-green-500", "bg-green-800", "bg-green-950"],
};

// A color mode's palette as a strip of five shades
export function ColorSwatches({ mode }: { mode: ColorMode }) {
    return (
        <div className="flex h-10 w-full overflow-hidden rounded border border-border">
            {COLOR_SWATCHES[mode].map((swatch) => (
                <div key={swatch} className={`flex-1 ${swatch}`}></div>
            ))}
        </div>
    );
}

export function ColorModePicker() {
    const { colorMode, setColorMode } = useTheme();
    const name = useId();
    return (
        <fieldset>
            <legend className="sr-only">Color mode</legend>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                {COLOR_MODES.map((mode) => (
                    <OptionCard
                        key={mode}
                        name={name}
                        value={mode}
                        label={COLOR_LABELS[mode]}
                        checked={colorMode === mode}
                        onSelect={() => setColorMode(mode)}
                        preview={<ColorSwatches mode={mode} />}
                    />
                ))}
            </div>
        </fieldset>
    );
}
