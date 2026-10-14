import { useEffect, useRef, useState } from "react";
import { IconType } from "react-icons";
import { cn } from "@/lib/utils";

export interface SettingsNavSubItem {
    // Id of the page element it links to
    id: string;
    label: string;
}

export interface SettingsNavGroup {
    title: string;
    items: SettingsNavSubItem[];
}

export interface SettingsNavItem extends SettingsNavSubItem {
    Icon: IconType;
    // Optional sub-menu listed right below the item, in titled groups
    groups?: SettingsNavGroup[];
}

// Every linked id in page order: each item, then its sub-items
function flatIds(sections: SettingsNavItem[]) {
    return sections.flatMap((section) => [
        section.id,
        ...(section.groups ?? []).flatMap((group) => group.items.map((item) => item.id)),
    ]);
}

// GitHub-style settings menu: icon + label, the section in view gets a bar on its left.
// Sub-menus look like the Tailwind CSS docs: uppercase group titles (the hero eyebrow style) over a thin line, the item in
// view marked by a dark stretch of that line
export default function SettingsNav({ label, sections }: { label: string; sections: SettingsNavItem[] }) {
    const [activeId, setActiveId] = useState(sections[0].id);
    // A clicked item stays active while the page jumps to it, even when a short last section ends the page
    // early (the bottom rule would pick the last one). The user scrolling again hands control back.
    const pinnedId = useRef<string | null>(null);
    useEffect(() => {
        const ids = flatIds(sections);
        // The last section whose top went past the upper quarter of the screen is the one being read.
        // At the bottom of the page the last section wins, since a short one can never scroll that far up
        function update() {
            if (pinnedId.current) return;
            const atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2;
            if (atBottom) {
                setActiveId(ids[ids.length - 1]);
                return;
            }
            const line = window.innerHeight * 0.25;
            let current = ids[0];
            ids.forEach((id) => {
                const element = document.getElementById(id);
                if (element && element.getBoundingClientRect().top <= line) current = id;
            });
            setActiveId(current);
        }
        function unpin() {
            pinnedId.current = null;
        }
        update();
        window.addEventListener("scroll", update, { passive: true });
        window.addEventListener("resize", update);
        const userScrolls = ["wheel", "touchstart", "keydown"] as const;
        userScrolls.forEach((type) => window.addEventListener(type, unpin, { passive: true }));
        return () => {
            window.removeEventListener("scroll", update);
            window.removeEventListener("resize", update);
            userScrolls.forEach((type) => window.removeEventListener(type, unpin));
        };
    }, [sections]);

    function select(id: string) {
        pinnedId.current = id;
        setActiveId(id);
    }

    return (
        <nav aria-label={label}>
            <ul className="flex flex-col gap-0.5 text-sm">
                {sections.map(({ id, label, Icon, groups }) => {
                    const subIds = (groups ?? []).flatMap((group) => group.items.map((item) => item.id));
                    // A section stays highlighted while one of its sub-items is the one in view
                    const isActive = activeId === id || subIds.includes(activeId);
                    return (
                        <li key={id}>
                            <a
                                href={`#${id}`}
                                onClick={() => select(id)}
                                aria-current={activeId === id ? "location" : undefined}
                                className={cn(
                                    "relative flex h-8 flex-row items-center gap-2 rounded-md px-2 transition-colors",
                                    isActive
                                        ? "bg-accent font-medium text-accent-foreground before:absolute before:-left-2 before:top-1 before:bottom-1 before:w-1 before:rounded-full before:bg-brand"
                                        : "text-muted-foreground hover:bg-accent/60 hover:text-foreground"
                                )}
                            >
                                <Icon className="size-4" aria-hidden="true" />
                                {label}
                            </a>
                            {groups && (
                                <div className="flex flex-col gap-5 pt-4 pb-2 pl-4">
                                    {groups.map((group) => (
                                        <div key={group.title} className="flex flex-col gap-2">
                                            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-muted-foreground">
                                                {group.title}
                                            </p>
                                            <ul className="flex flex-col border-l border-border">
                                                {group.items.map((item) => {
                                                    const isItemActive = activeId === item.id;
                                                    return (
                                                        <li key={item.id}>
                                                            <a
                                                                href={`#${item.id}`}
                                                                onClick={() => select(item.id)}
                                                                aria-current={isItemActive ? "location" : undefined}
                                                                className={cn(
                                                                    "-ml-px block border-l py-1 pl-4 transition-colors",
                                                                    isItemActive
                                                                        ? "border-foreground font-semibold text-foreground"
                                                                        : "border-transparent text-muted-foreground hover:border-muted-foreground hover:text-foreground"
                                                                )}
                                                            >
                                                                {item.label}
                                                            </a>
                                                        </li>
                                                    );
                                                })}
                                            </ul>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </li>
                    );
                })}
            </ul>
        </nav>
    );
}
