import { useState } from "react";
import PreviewCard from "../../library/previewCard";
import PreviewGrid from "../../library/previewGrid";
import OptionCard from "../../options/optionCard";
import { ColorSwatches, ThemeSketch } from "../../options/themePickers";
import { BRAND_TOGGLE_ITEM_CLASS, COLOR_LABELS, Shade } from "../../options/themeTokens";
import { BrandBadge, EquipButton, ProgressBar, RemoveButton, ShadeScale } from "../../options/themePreviewCard";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { COLOR_MODES } from "../../../lib/theme";

const PICKERS = "options page (theme and color mode pickers)";
const PREVIEW_CARD = "options page (theme preview card)";

// The pieces the theme pickers and the theme preview card are made of, one at a time.
// Local state only: nothing here changes the app's theme
export default function ThemePreview() {
    const [option, setOption] = useState("a");
    const [shade, setShade] = useState<Shade>(600);
    const [toggle, setToggle] = useState("frontend");
    const [level, setLevel] = useState(6);
    const [isEquipped, setIsEquipped] = useState(false);
    return (
        <PreviewGrid>
            <PreviewCard label="OptionCard" source="components/options/optionCard.tsx" usedIn={PICKERS}>
                <div className="grid w-full grid-cols-2 gap-3 text-left">
                    {["a", "b"].map((value) => (
                        <OptionCard
                            key={value}
                            name="library-option-card"
                            value={value}
                            label={value === "a" ? "Option A" : "Option B"}
                            checked={option === value}
                            onSelect={() => setOption(value)}
                            preview={<div className="h-10 rounded bg-muted"></div>}
                        />
                    ))}
                </div>
            </PreviewCard>
            <PreviewCard label="ThemeSketch" source="components/options/themePickers.tsx" usedIn={PICKERS}>
                <div className="grid w-full grid-cols-3 gap-2">
                    <ThemeSketch value="system" />
                    <ThemeSketch value="light" />
                    <ThemeSketch value="dark" />
                </div>
            </PreviewCard>
            <PreviewCard label="ColorSwatches" source="components/options/themePickers.tsx" usedIn={PICKERS}>
                <div className="grid w-full grid-cols-2 gap-2">
                    {COLOR_MODES.map((mode) => (
                        <div key={mode} className="flex flex-col gap-1 text-xs text-muted-foreground">
                            <ColorSwatches mode={mode} />
                            {COLOR_LABELS[mode]}
                        </div>
                    ))}
                </div>
            </PreviewCard>
            <PreviewCard label="ShadeScale" source="components/options/themePreviewCard.tsx" usedIn={PREVIEW_CARD}>
                <div className="flex w-full flex-col gap-2 text-xs text-muted-foreground">
                    <ShadeScale value={shade} onChange={setShade} />
                    Shade {shade} of the current palette
                </div>
            </PreviewCard>
            <PreviewCard label="ToggleGroup (shadcn, accent)" source="components/ui/toggle-group.tsx" usedIn={PREVIEW_CARD}>
                <ToggleGroup
                    type="single"
                    variant="outline"
                    size="sm"
                    className="w-full"
                    value={toggle}
                    onValueChange={(value) => value && setToggle(value)}
                >
                    {["frontend", "ai", "product"].map((value) => (
                        <ToggleGroupItem key={value} value={value} className={BRAND_TOGGLE_ITEM_CLASS}>
                            {value === "ai" ? "AI" : value[0].toUpperCase() + value.slice(1)}
                        </ToggleGroupItem>
                    ))}
                </ToggleGroup>
            </PreviewCard>
            <PreviewCard
                label="Range input + ProgressBar"
                source="components/options/themePreviewCard.tsx"
                usedIn={PREVIEW_CARD}
            >
                <div className="flex w-full flex-col gap-3">
                    <input
                        type="range"
                        min={0}
                        max={10}
                        value={level}
                        onChange={(event) => setLevel(Number(event.target.value))}
                        aria-label="Level"
                        className="w-full accent-brand"
                    />
                    <ProgressBar value={level * 10} />
                </div>
            </PreviewCard>
            <PreviewCard
                label="BrandBadge, RemoveButton, EquipButton"
                source="components/options/themePreviewCard.tsx"
                usedIn={PREVIEW_CARD}
            >
                <div className="flex flex-row flex-wrap items-center justify-center gap-3">
                    <BrandBadge>Badge</BrandBadge>
                    <RemoveButton disabled={!isEquipped} onClick={() => setIsEquipped(false)} />
                    <EquipButton isEquipped={isEquipped} onClick={() => setIsEquipped(true)} />
                </div>
            </PreviewCard>
            <PreviewCard label="Card (shadcn)" source="components/ui/card.tsx" usedIn={PREVIEW_CARD}>
                <Card className="w-full gap-3 py-4 text-left">
                    <CardHeader className="px-4">
                        <CardTitle>Card title</CardTitle>
                        <CardDescription>Card description</CardDescription>
                    </CardHeader>
                    <CardContent className="px-4 text-sm">Card content</CardContent>
                    <CardFooter className="px-4 text-sm text-muted-foreground">Card footer</CardFooter>
                </Card>
            </PreviewCard>
        </PreviewGrid>
    );
}
