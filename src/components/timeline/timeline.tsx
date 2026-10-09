import { KeyboardEvent, useRef, useState } from "react";
import { IoChevronBack, IoChevronForward } from "react-icons/io5";
import HistoryEntry from "../../interfaces/historyEntry";

interface TimelineProps {
    // Any order: shown oldest (left) to newest (right)
    entries: HistoryEntry[];
}

// Horizontal timeline: previous/next on both ends of a line, and a single text area below for the selected year.
// From sm up the line shows every year as a clickable point (evenly spaced, not by year); a dashed segment
// marks skipped years. Below sm only the selected point and the line around it show: at the left end on the
// first year, centered in between, at the right end on the last year.
export default function Timeline({ entries }: TimelineProps) {
    const sorted = [...entries].sort((a, b) => a.year - b.year);
    const [selected, setSelected] = useState(0);
    const pointRefs = useRef<(HTMLButtonElement | null)[]>([]);
    if (sorted.length === 0) return null;

    const last = sorted.length - 1;
    const index = Math.min(selected, last);
    const entry = sorted[index];
    // Horizontal position of a point, in % of the line
    const position = (i: number) => (last === 0 ? 50 : (i / last) * 100);

    function select(next: number, moveFocus = false) {
        const clamped = Math.min(last, Math.max(0, next));
        setSelected(clamped);
        if (moveFocus) pointRefs.current[clamped]?.focus();
    }
    // Arrow keys move between points; only the selected point is a tab stop
    function onPointKeyDown(event: KeyboardEvent) {
        if (event.key === "ArrowLeft") select(index - 1, true);
        else if (event.key === "ArrowRight") select(index + 1, true);
        else if (event.key === "Home") select(0, true);
        else if (event.key === "End") select(last, true);
        else return;
        event.preventDefault();
    }

    const segmentClass = (hasGap: boolean) =>
        "absolute top-1/2 -translate-y-1/2 " +
        (hasGap ? "border-t-2 border-dashed border-default/25" : "h-0.5 bg-default/25");
    const markerClass =
        "pointer-events-none absolute top-1/2 size-4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-default ring-4 ring-primary/40 motion-safe:transition-[left] motion-safe:duration-300 motion-safe:ease-in-out";
    const gapBefore = index > 0 && entry.year - sorted[index - 1].year > 1;
    const gapAfter = index < last && sorted[index + 1].year - entry.year > 1;
    const mobilePosition = index === 0 ? (last === 0 ? 50 : 0) : index === last ? 100 : 50;

    const stepButtonClass =
        "shrink-0 flex flex-row items-center gap-1 text-sm font-medium text-default hover:underline disabled:text-default/30 disabled:no-underline disabled:cursor-default";

    return (
        <div className="flex flex-col gap-6 text-default">
            <div className="flex flex-row items-center gap-3">
                <button
                    type="button"
                    onClick={() => select(index - 1)}
                    disabled={index === 0}
                    aria-label="Previous year"
                    className={stepButtonClass}
                >
                    <IoChevronBack className="size-4" aria-hidden="true" />
                    <span className="hidden sm:inline">previous</span>
                </button>
                {/* Below sm: the selected point and the line around it (the arrows do the navigating) */}
                <div className="relative flex-1 h-8 mx-3 sm:hidden" aria-hidden="true">
                    {index > 0 && (
                        <span className={segmentClass(gapBefore)} style={{ left: 0, width: `${mobilePosition}%` }}></span>
                    )}
                    {index < last && (
                        <span className={segmentClass(gapAfter)} style={{ left: `${mobilePosition}%`, right: 0 }}></span>
                    )}
                    <span className={markerClass} style={{ left: `${mobilePosition}%` }}></span>
                </div>
                {/* From sm up: every year. Margins keep the end points' click areas inside the line's box */}
                <ol className="relative flex-1 h-8 mx-3 hidden sm:block" aria-label="Years">
                    {sorted.slice(0, last).map((current, i) => {
                        const hasGap = sorted[i + 1].year - current.year > 1;
                        return (
                            <li
                                key={`segment-${current.year}`}
                                aria-hidden="true"
                                className={segmentClass(hasGap)}
                                style={{ left: `${position(i)}%`, width: `${position(i + 1) - position(i)}%` }}
                            ></li>
                        );
                    })}
                    {sorted.map((point, i) => (
                        <li
                            key={point.year}
                            className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2"
                            style={{ left: `${position(i)}%` }}
                        >
                            <button
                                ref={(element) => {
                                    pointRefs.current[i] = element;
                                }}
                                type="button"
                                onClick={() => select(i)}
                                onKeyDown={onPointKeyDown}
                                tabIndex={i === index ? 0 : -1}
                                aria-label={`${point.year}: ${point.title}`}
                                aria-current={i === index ? "step" : undefined}
                                title={String(point.year)}
                                className="group flex size-6 items-center justify-center rounded-full"
                            >
                                <span className="size-2 rounded-full bg-default/40 group-hover:bg-default/70"></span>
                            </button>
                        </li>
                    ))}
                    {/* The selected point's marker, sliding between points */}
                    <li
                        aria-hidden="true"
                        className={markerClass}
                        style={{ left: `${position(index)}%` }}
                    ></li>
                </ol>
                <button
                    type="button"
                    onClick={() => select(index + 1)}
                    disabled={index === last}
                    aria-label="Next year"
                    className={stepButtonClass}
                >
                    <span className="hidden sm:inline">next</span>
                    <IoChevronForward className="size-4" aria-hidden="true" />
                </button>
            </div>
            {/* key restarts the fade for each year; min height keeps the page from jumping between entries */}
            <div key={entry.year} aria-live="polite" className="min-h-28 max-w-2xl flex flex-col gap-2 motion-safe:animate-fade-up">
                <h2 className="text-lg font-semibold leading-snug">
                    {entry.title} <span className="font-normal text-default/60">({entry.year})</span>
                </h2>
                <p className="text-default/70 leading-relaxed">{entry.description}</p>
            </div>
        </div>
    );
}
