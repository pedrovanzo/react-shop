import PatternText, { TextPattern } from "../pattern/patternText";

interface PageHeaderProps {
    eyebrow?: string;
    title: string;
    description: string;
    pattern?: TextPattern;
}

export default function PageHeader({ eyebrow, title, description, pattern }: PageHeaderProps) {
    return (
        <header className="flex flex-col items-center gap-3 text-center text-default">
            {eyebrow && (
                <p className="text-sm font-medium uppercase tracking-[0.25em] text-default/60">
                    {eyebrow}
                </p>
            )}
            <PatternText
                as="h1"
                pattern={pattern}
                className="text-[clamp(3.75rem,19vw,6rem)] sm:text-[7rem] font-black tracking-tight leading-none"
            >
                {title}
            </PatternText>
            <p className="max-w-xl text-lg font-light leading-relaxed text-default/70">
                {description}
            </p>
        </header>
    );
}
