import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface OptionCardProps {
    // Radio group name and this option's value
    name: string;
    value: string;
    label: string;
    checked: boolean;
    onSelect: () => void;
    // Picture of the option above the label (theme preview, color swatches)
    preview: ReactNode;
}

// GitHub-like selectable card: a preview on top, a radio and label below. A real radio input underneath
// keeps keyboard (arrow keys) and screen reader behavior
export default function OptionCard({ name, value, label, checked, onSelect, preview }: OptionCardProps) {
    return (
        <label
            className={cn(
                "flex cursor-pointer flex-col overflow-hidden rounded-md border text-sm transition-colors",
                "has-[:focus-visible]:ring-[3px] has-[:focus-visible]:ring-ring/50",
                checked ? "border-brand" : "border-border hover:border-muted-foreground"
            )}
        >
            <div className="p-2">{preview}</div>
            <div className={cn("flex flex-row items-center gap-2 border-t px-3 py-2", checked ? "border-brand" : "border-border")}>
                <input
                    type="radio"
                    name={name}
                    value={value}
                    checked={checked}
                    onChange={onSelect}
                    className="size-4 accent-brand"
                />
                <span className={cn("font-medium", checked ? "text-foreground" : "text-muted-foreground")}>{label}</span>
            </div>
        </label>
    );
}
