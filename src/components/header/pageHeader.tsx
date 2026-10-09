import PatternText, { TextPattern } from "../pattern/patternText";

// Shared with the home hero morph, which rebuilds this header around its own layers
// The header gets compact while stuck to the top of the skills list (see SkillShopSection):
// the title shrinks to 3/7 of its size (7rem to 3rem on larger screens) and the gap below it
// from 0.75rem to 0.25rem. Same duration and easing as the sticky wrapper's margin, which makes up for it.
export const STUCK_TRANSITION = "duration-[400ms] ease-in-out";
export const PAGE_HEADER_CLASS =
    "flex flex-col items-start gap-3 group-data-[stuck=true]/sticky-header:gap-1 " +
    `transition-[gap] ${STUCK_TRANSITION} text-left text-default`;
export const PAGE_HEADER_TITLE_CLASS =
    "text-[clamp(3.75rem,19vw,6rem)] sm:text-[7rem] " +
    "group-data-[stuck=true]/sticky-header:text-[calc(clamp(3.75rem,19vw,6rem)*0.428571)] " +
    "sm:group-data-[stuck=true]/sticky-header:text-[3rem] " +
    `transition-[font-size] ${STUCK_TRANSITION} font-black tracking-tight leading-none`;
// Compact header: the size the Skill Shop header shrinks to when stuck, for pages that start compact
const PAGE_HEADER_COMPACT_CLASS = "flex flex-col items-start gap-1 text-left text-default";
const PAGE_HEADER_COMPACT_TITLE_CLASS =
    "text-[calc(clamp(3.75rem,19vw,6rem)*0.428571)] sm:text-[3rem] font-black tracking-tight leading-none";
export const PAGE_HEADER_DESCRIPTION_CLASS = "max-w-xl text-lg font-light leading-relaxed text-default/70";

interface PageHeaderProps {
    eyebrow?: string;
    title: string;
    description: string;
    pattern?: TextPattern;
    // Starts at the compact size (like the stuck Skill Shop header) instead of the full size
    compact?: boolean;
}

export default function PageHeader({ eyebrow, title, description, pattern, compact = false }: PageHeaderProps) {
    return (
        <header className={compact ? PAGE_HEADER_COMPACT_CLASS : PAGE_HEADER_CLASS}>
            {eyebrow && (
                <p className="text-sm font-medium uppercase tracking-[0.25em] text-default/60">
                    {eyebrow}
                </p>
            )}
            <PatternText
                as="h1"
                pattern={pattern}
                className={compact ? PAGE_HEADER_COMPACT_TITLE_CLASS : PAGE_HEADER_TITLE_CLASS}
            >
                {title}
            </PatternText>
            <p className={PAGE_HEADER_DESCRIPTION_CLASS}>{description}</p>
        </header>
    );
}
