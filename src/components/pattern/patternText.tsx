import { ElementType, ReactNode } from "react";

// Each pattern maps to a class in src/styles/patterns.css
const PATTERN_CLASSES = {
    bauhaus: "pattern-bauhaus",
};
export type TextPattern = keyof typeof PATTERN_CLASSES;

interface PatternTextProps {
    children: ReactNode;
    pattern?: TextPattern;
    // Element to render, e.g. "h1" or "span"
    as?: ElementType;
    className?: string;
}

// Shows a pattern only inside the letters of its text
export default function PatternText({
    children,
    pattern = "bauhaus",
    as: Element = "span",
    className = "",
}: PatternTextProps) {
    return (
        <Element className={`pattern-text ${PATTERN_CLASSES[pattern]} ${className}`}>
            {children}
        </Element>
    );
}
