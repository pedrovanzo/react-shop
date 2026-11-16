import { LuBookOpen, LuHistory, LuStar } from "react-icons/lu";
import Navbar from "../../components/navigation/navbar";
import ThreeColumnLayout from "../../components/layout/threeColumnLayout";
import PageHeader from "../../components/header/pageHeader";
import { SettingsSection } from "../../components/options/settingsSection";
import SettingsNav, { SettingsNavItem } from "../../components/options/settingsNav";
import CareerEntryItem from "../../components/history/careerEntryItem";
import HighlightCard from "../../components/history/highlightCard";
import CareerEntry from "../../interfaces/careerEntry";
import Highlight from "../../interfaces/highlight";
import historyData from "../../data/history.json";
import historyPage from "../../data/historyPage.json";

// Newest first, as stored
const entries: CareerEntry[] = historyData;
const highlights: Highlight[] = historyPage.highlights;

const SECTIONS: SettingsNavItem[] = [
    { id: "highlights", label: "Highlights", Icon: LuStar },
    {
        id: "timeline",
        label: "Timeline",
        Icon: LuHistory,
        groups: [{ title: "Years", items: entries.map((entry) => ({ id: `entry-${entry.id}`, label: entry.period })) }],
    },
    { id: "lessons", label: "Lessons", Icon: LuBookOpen },
];

// Highlights first (the few things worth a conversation), then the full timeline, then the lessons.
// Nothing collapses: everything is always shown, so it reads the same for people and for machines
export default function History() {
    return (
        <>
            <Navbar />
            <ThreeColumnLayout left={<SettingsNav label="History sections" sections={SECTIONS} />}>
                <div className="mx-auto flex w-full max-w-3xl flex-col gap-12 text-default">
                    <PageHeader
                        compact
                        title="History"
                        description={historyPage.headline}
                    />

                    <SettingsSection id="highlights" title="Highlights">
                        <p className="text-default/70 leading-relaxed">{historyPage.highlightsIntro}</p>
                        <ul className="flex flex-col gap-4">
                            {highlights.map((highlight) => (
                                <li key={highlight.id}>
                                    <HighlightCard highlight={highlight} />
                                </li>
                            ))}
                        </ul>
                    </SettingsSection>

                    <SettingsSection id="timeline" title="Timeline">
                        <p className="flex flex-row items-center gap-2 text-sm text-default/60">
                            <LuStar className="size-4 fill-current text-brand" aria-hidden="true" />
                            marks notable work
                        </p>
                        {/* The left border is the timeline's line; each entry centers its icon on it.
                            The margin leaves room for the half of each icon left of the line */}
                        <ol className="ml-4 flex flex-col gap-10 border-l border-border">
                            {entries.map((entry) => (
                                <CareerEntryItem key={entry.id} entry={entry} />
                            ))}
                        </ol>
                    </SettingsSection>

                    <SettingsSection id="lessons" title="Lessons">
                        <ul className="flex list-disc flex-col gap-2 pl-5 leading-relaxed marker:text-default/40">
                            {historyPage.lessons.map((lesson) => (
                                <li key={lesson}>{lesson}</li>
                            ))}
                        </ul>
                    </SettingsSection>
                </div>
            </ThreeColumnLayout>
        </>
    );
}
