import PreviewCard from "../../library/previewCard";
import PreviewGrid from "../../library/previewGrid";
import Button from "../../button/button";
const variants = [
    { variant: "solid", usedIn: "active theme mode and skill sort, open modal" },
    { variant: "soft", usedIn: "inactive theme mode and skill sort, modal cancel actions" },
    { variant: "primary", usedIn: "skill page Equip, confirm actions in modals" },
    { variant: "text", usedIn: "skill page return, build item Remove, dev modal close" },
    { variant: "link", usedIn: "build, Clear current build" },
] as const;
export default function ButtonsPreview() {
    return (
        <PreviewGrid>
            {variants.map(({ variant, usedIn }) => (
                <PreviewCard
                    key={variant}
                    label={`Button (variant="${variant}")`}
                    source="components/button/button.tsx"
                    usedIn={usedIn}
                >
                    <Button variant={variant}>Button</Button>
                </PreviewCard>
            ))}
        </PreviewGrid>
    );
}
