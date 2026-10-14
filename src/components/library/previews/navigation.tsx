import PreviewCard from "../../library/previewCard";
import PreviewGrid from "../../library/previewGrid";
import Navbar from "../../navigation/navbar";
export default function NavigationPreview() {
    return (
        <PreviewGrid>
            <PreviewCard label="Navbar" source="components/navigation/navbar.tsx" usedIn="every page">
                <Navbar preview />
            </PreviewCard>
        </PreviewGrid>
    );
}
