import PreviewCard from "../../../components/library/previewCard";
import PreviewGrid from "../../../components/library/previewGrid";
import ThemeSelector from "../../../components/theme/themeSelector";
export default function ThemePreview() {
    return (
        <PreviewGrid>
            <PreviewCard label="ThemeSelector" source="components/theme/themeSelector.tsx" usedIn="options page (changes the app theme live)">
                <ThemeSelector />
            </PreviewCard>
        </PreviewGrid>
    );
}
