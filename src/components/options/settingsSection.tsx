import { ReactNode } from "react";

// GitHub-style settings section: a large title over a full-width rule, then its groups
export function SettingsSection({ id, title, children }: { id: string; title: string; children: ReactNode }) {
    return (
        // scroll-mt keeps the title below the sticky navbar when jumping here from the side menu
        <section
            id={id}
            aria-labelledby={`${id}-title`}
            className="flex flex-col gap-6 scroll-mt-[calc(var(--navbar-height,0px)+1rem)]"
        >
            <h2 id={`${id}-title`} className="border-b border-border pb-2 text-2xl font-normal text-foreground">
                {title}
            </h2>
            {children}
        </section>
    );
}

// A titled group inside a section: bold title, a muted line of explanation, then its controls
export function SettingsGroup({
    title,
    description,
    children,
}: {
    title: string;
    description?: ReactNode;
    children: ReactNode;
}) {
    return (
        <div className="flex flex-col gap-3">
            <div className="flex flex-col gap-1">
                <h3 className="text-base font-semibold text-foreground">{title}</h3>
                {description && <p className="text-sm text-muted-foreground">{description}</p>}
            </div>
            {children}
        </div>
    );
}
