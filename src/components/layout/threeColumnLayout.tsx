import { ReactNode } from "react";

interface ThreeColumnLayoutProps {
    children: ReactNode;
    // Optional side content, shown on lg+ only; pages provide their own mobile alternative
    left?: ReactNode;
    right?: ReactNode;
}

// Page content area: left | content | right on lg+, content only below.
// Equal side columns keep the content centered on the screen even when a side is empty.
export default function ThreeColumnLayout({ children, left, right }: ThreeColumnLayoutProps) {
    return (
        <div className="mt-6 grid grid-cols-1 lg:grid-cols-[15rem_minmax(0,1fr)_15rem] gap-8 text-default">
            <aside className="hidden lg:block">
                {left && <div className="sticky top-[calc(var(--navbar-height,0px)+1rem)]">{left}</div>}
            </aside>
            <div className="min-w-0">{children}</div>
            <aside className="hidden lg:block">
                {right && <div className="sticky top-[calc(var(--navbar-height,0px)+1rem)]">{right}</div>}
            </aside>
        </div>
    );
}
