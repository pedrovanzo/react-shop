import PreviewCard from "../../../components/library/previewCard";
import PreviewGrid from "../../../components/library/previewGrid";
import Navbar from "../../../components/navigation/navbar";
export default function NavigationPreview() {
    return (
        <PreviewGrid>
            <PreviewCard label="Navbar" source="components/navigation/navbar.tsx" usedIn="every page">
                <Navbar />
            </PreviewCard>
        </PreviewGrid>
    );
}
