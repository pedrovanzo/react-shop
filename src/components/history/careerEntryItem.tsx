import { Fragment } from "react";
import { LuArrowRight, LuStar } from "react-icons/lu";
import CareerEntry from "../../interfaces/careerEntry";
import HistoryIcon from "./historyIcon";
import LinkedText from "./linkedText";
import TopicChip from "./topicChip";

// One period of the timeline, always fully shown. Its icon sits on the list's vertical line
export default function CareerEntryItem({ entry }: { entry: CareerEntry }) {
    return (
        <li
            id={`entry-${entry.id}`}
            className="relative pl-10 scroll-mt-[calc(var(--navbar-height,0px)+1rem)]"
        >
            <span
                aria-hidden="true"
                className="absolute left-0 top-0 flex size-8 -translate-x-1/2 items-center justify-center rounded-full border border-border bg-card text-default/80"
            >
                <HistoryIcon name={entry.icon} className="size-4" />
            </span>
            <article aria-labelledby={`entry-${entry.id}-title`} className="flex flex-col gap-4">
                <div className="flex flex-col gap-1">
                    <p className="flex flex-row flex-wrap items-center gap-x-3 gap-y-1 text-sm text-default/60">
                        <time dateTime={entry.end ? `${entry.start}/${entry.end}` : entry.start} className="font-semibold text-default">
                            {entry.period}
                        </time>
                        {entry.phases && (
                            <span className="flex flex-row flex-wrap items-center gap-2 text-xs font-medium uppercase tracking-[0.25em]">
                                {entry.phases.map((phase, i) => (
                                    <Fragment key={phase}>
                                        {i > 0 && (
                                            <>
                                                <LuArrowRight className="size-3" aria-hidden="true" />
                                                <span className="sr-only">then</span>
                                            </>
                                        )}
                                        <span>{phase}</span>
                                    </Fragment>
                                ))}
                            </span>
                        )}
                    </p>
                    <h3 id={`entry-${entry.id}-title`} className="text-lg font-semibold leading-snug">
                        <LinkedText text={entry.title} />
                    </h3>
                    <p className="text-default/70 leading-relaxed"><LinkedText text={entry.summary} /></p>
                </div>
                <ul className="flex flex-col gap-2">
                    {entry.bullets.map((bullet) => (
                        <li key={bullet.text} className="flex flex-row items-start gap-2 leading-relaxed">
                            {bullet.notable ? (
                                <LuStar className="mt-1 size-4 shrink-0 fill-current text-brand" aria-hidden="true" />
                            ) : (
                                <span aria-hidden="true" className="mt-2.5 size-1.5 shrink-0 rounded-full bg-default/40"></span>
                            )}
                            <span>
                                {bullet.notable && <span className="sr-only">Notable work: </span>}
                                <LinkedText text={bullet.text} />
                                {bullet.personal && (
                                    <span className="ml-2 rounded-full border border-border px-2 py-0.5 text-xs text-default/60">
                                        side project
                                    </span>
                                )}
                            </span>
                        </li>
                    ))}
                </ul>
                {entry.tags.length > 0 && (
                    <ul aria-label="Topics" className="flex flex-row flex-wrap gap-2">
                        {entry.tags.map((tag) => (
                            <li key={tag} className="max-w-full">
                                <TopicChip name={tag} />
                            </li>
                        ))}
                    </ul>
                )}
            </article>
        </li>
    );
}
