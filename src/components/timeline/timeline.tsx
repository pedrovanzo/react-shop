import HistoryEntry from "../../interfaces/historyEntry";

interface TimelineProps {
    // Ordered newest first: the first entry renders at the top
    entries: HistoryEntry[];
}

export default function Timeline({ entries }: TimelineProps) {
    return (
        <ol className="flex flex-col">
            {entries.map((entry, index) => {
                const next = entries[index + 1];
                const isLatest = index === 0;
                // Dashed connector when years are skipped between this entry and the next
                const hasGap = next !== undefined && entry.year - next.year > 1;
                return (
                    <li key={entry.year} className="relative pl-8 pb-10 last:pb-0">
                        {next && (
                            <span
                                className={
                                    "absolute left-[5px] top-4 bottom-0 " +
                                    (hasGap
                                        ? "border-l-2 border-dashed border-default/20"
                                        : "w-0.5 bg-default/20")
                                }
                                aria-hidden="true"
                            ></span>
                        )}
                        <span
                            className={
                                "absolute left-0 top-1.5 size-3 rounded-full bg-default " +
                                (isLatest ? "ring-4 ring-primary/40" : "")
                            }
                            aria-hidden="true"
                        ></span>
                        <div className="flex flex-col gap-1">
                            <span className="text-sm font-semibold tracking-wide text-default/60">
                                {entry.year}
                            </span>
                            <h2 className="text-lg font-semibold leading-snug">{entry.title}</h2>
                            <p className="text-default/70 leading-relaxed">{entry.description}</p>
                        </div>
                    </li>
                );
            })}
        </ol>
    );
}
