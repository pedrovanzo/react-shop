import { ReactNode, useState } from "react";
import { GiAnvilImpact } from "react-icons/gi";
import { IoTrashOutline } from "react-icons/io5";
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { cn } from "@/lib/utils";
import { useTheme } from "../../contexts/themeContext";
import { BRAND_TOGGLE_ITEM_CLASS, SHADES, Shade } from "./themeTokens";


// What each shade does in the current theme (see src/themes.css); the others are free for mixing
function shadeRoles(isDark: boolean): Partial<Record<Shade, string>> {
    return isDark
        ? { 50: "Text", 400: "Accent", 950: "Background" }
        : { 50: "Background", 600: "Accent", 950: "Text" };
}

const ROLES = [
    { value: "frontend", label: "Frontend", level: 8 },
    { value: "ai", label: "AI", level: 6 },
    { value: "product", label: "Product", level: 5 },
];

// The current palette's eleven shades as a strip; pick one to select it
export function ShadeScale({ value, onChange }: { value: Shade; onChange: (shade: Shade) => void }) {
    return (
        <div className="flex h-8 w-full overflow-hidden rounded-md border border-border">
            {SHADES.map((shade) => (
                <button
                    key={shade}
                    type="button"
                    onClick={() => onChange(shade)}
                    aria-label={`Shade ${shade}`}
                    aria-pressed={value === shade}
                    className={cn(
                        "flex-1 transition-transform outline-none focus-visible:z-10 focus-visible:ring-2 focus-visible:ring-ring",
                        value === shade && "relative z-10 scale-y-125 ring-2 ring-foreground"
                    )}
                    style={{ backgroundColor: `var(--tint-${shade})` }}
                ></button>
            ))}
        </div>
    );
}

// A thin bar filled to `value` percent in the accent color
export function ProgressBar({ value }: { value: number }) {
    return (
        <div className="h-2 w-full overflow-hidden rounded-full bg-muted" aria-hidden="true">
            <div className="h-full rounded-full bg-brand transition-[width] duration-300" style={{ width: `${value}%` }}></div>
        </div>
    );
}

// A small pill in the accent color
export function BrandBadge({ children }: { children: ReactNode }) {
    return <span className="rounded-full px-2.5 py-0.5 text-xs font-medium bg-brand/15 text-brand">{children}</span>;
}

// Quiet remove action that turns to the danger color on hover
export function RemoveButton({ disabled, onClick }: { disabled?: boolean; onClick: () => void }) {
    return (
        <button
            type="button"
            onClick={onClick}
            disabled={disabled}
            className="flex flex-row items-center gap-1.5 rounded-md px-2.5 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-danger/15 hover:text-danger disabled:pointer-events-none disabled:opacity-40"
        >
            <IoTrashOutline className="size-4" aria-hidden="true" />
            Remove
        </button>
    );
}

// Solid accent button that settles into a soft "Equipped" state
export function EquipButton({ isEquipped, onClick }: { isEquipped: boolean; onClick: () => void }) {
    return (
        <button
            type="button"
            onClick={onClick}
            disabled={isEquipped}
            className={cn(
                "flex flex-row items-center gap-1.5 rounded-md px-3 py-1.5 text-sm font-medium transition-colors",
                isEquipped ? "bg-brand/15 text-brand" : "bg-brand text-brand-foreground hover:bg-brand/90"
            )}
        >
            <GiAnvilImpact className="size-4" aria-hidden="true" />
            {isEquipped ? "Equipped" : "Equip"}
        </button>
    );
}

// A small card that shows the current theme in action: its shade scale, a segmented control, a slider and
// a progress bar in the accent color, and the equip / remove buttons
export default function ThemePreviewCard() {
    const { theme, colorMode } = useTheme();
    const roles = shadeRoles(theme === "dark");
    const [shade, setShade] = useState<Shade>(theme === "dark" ? 400 : 600);
    const [role, setRole] = useState(ROLES[0].value);
    const [level, setLevel] = useState(ROLES[0].level);
    const [isEquipped, setIsEquipped] = useState(false);
    const modeLabel = colorMode === "default" ? "Default" : colorMode[0].toUpperCase() + colorMode.slice(1);

    return (
        <Card className="w-full max-w-md gap-5 py-5">
            <CardHeader className="px-5">
                <CardTitle>Theme preview</CardTitle>
                <CardDescription>
                    {modeLabel} colors, {theme} mode
                </CardDescription>
                <CardAction>
                    <BrandBadge>{modeLabel}</BrandBadge>
                </CardAction>
            </CardHeader>
            <CardContent className="flex flex-col gap-5 px-5">
                {/* Shade scale: pick a shade to see its name and what the theme uses it for */}
                <div className="flex flex-col gap-2">
                    <ShadeScale value={shade} onChange={setShade} />
                    <p className="text-xs text-muted-foreground">
                        Shade <span className="font-medium text-foreground tabular-nums">{shade}</span>
                        {roles[shade] ? ` · ${roles[shade]}` : " · Mixed into borders and muted text"}
                    </p>
                </div>

                {/* Segmented control and a slider driving a progress bar, all in the accent color */}
                <div className="flex flex-col gap-3">
                    <ToggleGroup
                        type="single"
                        variant="outline"
                        size="sm"
                        className="w-full"
                        value={role}
                        onValueChange={(value) => {
                            const next = ROLES.find((item) => item.value === value);
                            if (!next) return;
                            setRole(next.value);
                            setLevel(next.level);
                        }}
                    >
                        {ROLES.map((item) => (
                            <ToggleGroupItem
                                key={item.value}
                                value={item.value}
                                className={BRAND_TOGGLE_ITEM_CLASS}
                            >
                                {item.label}
                            </ToggleGroupItem>
                        ))}
                    </ToggleGroup>
                    <label className="flex flex-col gap-2 text-sm">
                        <span className="flex flex-row justify-between">
                            <span className="text-muted-foreground">Skill level</span>
                            <span className="font-medium tabular-nums">{level}/10</span>
                        </span>
                        <input
                            type="range"
                            min={0}
                            max={10}
                            value={level}
                            onChange={(event) => setLevel(Number(event.target.value))}
                            className="w-full accent-brand"
                        />
                    </label>
                    <ProgressBar value={level * 10} />
                </div>
            </CardContent>
            <CardFooter className="justify-between gap-2 px-5">
                <RemoveButton disabled={!isEquipped} onClick={() => setIsEquipped(false)} />
                <EquipButton isEquipped={isEquipped} onClick={() => setIsEquipped(true)} />
            </CardFooter>
        </Card>
    );
}
