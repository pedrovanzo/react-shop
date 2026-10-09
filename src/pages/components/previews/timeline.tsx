import PreviewCard from "../../../components/library/previewCard";
import PreviewGrid from "../../../components/library/previewGrid";
import Timeline from "../../../components/timeline/timeline";
const sampleEntries = [
    { year: 2020, title: "Oldest entry", description: "Selected first; previous is muted." },
    { year: 2024, title: "After a gap", description: "Dashed segment when years are skipped." },
    { year: 2025, title: "Consecutive year", description: "Solid segment between consecutive years." },
    { year: 2026, title: "Latest entry", description: "Next is muted on the last point." },
];
export default function TimelinePreview() {
    return (
        <PreviewGrid>
            <PreviewCard label="Timeline" source="components/timeline/timeline.tsx" usedIn="history page">
                <div className="w-full text-left">
                    <Timeline entries={sampleEntries} />
                </div>
            </PreviewCard>
        </PreviewGrid>
    );
}
