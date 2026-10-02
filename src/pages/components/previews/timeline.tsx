import PreviewCard from "../../../components/library/previewCard";
import PreviewGrid from "../../../components/library/previewGrid";
import Timeline from "../../../components/timeline/timeline";
const sampleEntries = [
    { year: 2026, title: "Latest entry", description: "Ringed dot marks the newest year." },
    { year: 2025, title: "Consecutive year", description: "Solid connector to the next entry." },
    { year: 2024, title: "Before a gap", description: "Dashed connector when years are skipped." },
    { year: 2020, title: "Oldest entry", description: "No connector below the last item." },
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
