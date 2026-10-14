import PreviewCard from "../../library/previewCard";
import PreviewGrid from "../../library/previewGrid";
import PageHeader from "../../header/pageHeader";
import PatternText from "../../pattern/patternText";
export default function TypographyPreview() {
    return (
        <PreviewGrid>
            <PreviewCard label="PageHeader" source="components/header/pageHeader.tsx" usedIn="skills page">
                <PageHeader eyebrow="Eyebrow" title="Title" description="Short description below the title." />
            </PreviewCard>
            <PreviewCard label='PatternText (pattern="bauhaus")' source="components/pattern/patternText.tsx, styles/patterns.css" usedIn="PageHeader">
                <PatternText className="text-7xl font-black tracking-tight leading-none">Aa</PatternText>
            </PreviewCard>
        </PreviewGrid>
    );
}
