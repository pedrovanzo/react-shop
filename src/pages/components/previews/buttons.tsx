import PreviewCard from "../../../components/library/previewCard";
import PreviewGrid from "../../../components/library/previewGrid";
import Button from "../../../components/button/button";
const variants = [
    { variant: "solid", usedIn: "active theme mode, open modal" },
    { variant: "soft", usedIn: "inactive theme mode, components library mobile menu" },
    { variant: "primary", usedIn: "product page, Add to cart" },
    { variant: "text", usedIn: "product page return, cart item Remove, dev modal close" },
    { variant: "link", usedIn: "cart, Clear current cart" },
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
