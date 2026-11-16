import Highlight from "../../interfaces/highlight";
import HistoryIcon from "./historyIcon";
import LinkedText from "./linkedText";
import TopicChip from "./topicChip";

// A timeless highlight, one column: icon, period and title across the full width, then the detail
export default function HighlightCard({ highlight }: { highlight: Highlight }) {
    return (
        <article
            aria-labelledby={`highlight-${highlight.id}-title`}
            className="flex flex-col gap-3 rounded-xl border border-border bg-card p-5 text-card-foreground"
        >
            <div className="flex flex-row items-center gap-4">
                <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-brand/10 text-brand">
                    <HistoryIcon name={highlight.icon} className="size-5" />
                </span>
                <div className="flex flex-col gap-0.5">
                    <p className="text-xs font-medium uppercase tracking-[0.25em] text-default/60">{highlight.period}</p>
                    <h3 id={`highlight-${highlight.id}-title`} className="text-lg font-semibold leading-snug">
                        {highlight.title}
                    </h3>
                </div>
            </div>
            <p className="text-default/70 leading-relaxed"><LinkedText text={highlight.summary} /></p>
            <ul className="flex list-disc flex-col gap-1 pl-5 text-sm leading-relaxed marker:text-default/40">
                {highlight.bullets.map((bullet) => (
                    <li key={bullet}><LinkedText text={bullet} /></li>
                ))}
            </ul>
            {highlight.tags.length > 0 && (
                <ul aria-label="Topics" className="flex flex-row flex-wrap gap-2">
                    {highlight.tags.map((tag) => (
                        <li key={tag} className="max-w-full">
                            <TopicChip name={tag} />
                        </li>
                    ))}
                </ul>
            )}
        </article>
    );
}
