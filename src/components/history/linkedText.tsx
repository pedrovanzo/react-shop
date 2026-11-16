import { ReactNode, useState } from "react";
import Modal from "../modal/modal";
import entities from "../../data/entities.json";

interface Entity {
    name: string;
    url: string;
    note?: string;
}
const ENTITIES: Record<string, Entity> = entities;

// Markup in the history data, shared with /history.md:
// - links: "[label](https://...)"
// - groups: "{four portals|agazeta,hz,cbn,correio}", a button listing the members (ids in data/entities.json)
const TOKEN = /\[([^\]]+)\]\((https?:\/\/[^)\s]+)\)|\{([^|}]+)\|([a-z0-9,-]+)\}/g;

const LINK_CLASS = "underline decoration-default/30 underline-offset-2 hover:decoration-default";

function GroupMention({ label, ids }: { label: string; ids: string[] }) {
    const [open, setOpen] = useState(false);
    const members = ids.map((id) => ENTITIES[id]).filter(Boolean);
    return (
        <>
            <button type="button" onClick={() => setOpen(true)} className={`${LINK_CLASS} decoration-dotted`}>
                {label}
            </button>
            {/* The names stay in the page for screen readers and AI readers; the modal adds the links */}
            <span className="sr-only"> ({members.map((member) => member.name).join(", ")})</span>
            {open && (
                <Modal title={label.charAt(0).toUpperCase() + label.slice(1)} onClose={() => setOpen(false)}>
                    <ul className="flex flex-col gap-2">
                        {members.map((member) => (
                            <li key={member.url}>
                                <a
                                    href={member.url}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="flex flex-row flex-wrap items-baseline gap-x-3 rounded-md border border-border px-3 py-2 text-sm transition-colors hover:bg-accent"
                                >
                                    <span className="font-medium">{member.name}</span>
                                    {member.note && <span className="text-default/60">{member.note}</span>}
                                </a>
                            </li>
                        ))}
                    </ul>
                </Modal>
            )}
        </>
    );
}

export default function LinkedText({ text }: { text: string }) {
    const parts: ReactNode[] = [];
    let last = 0;
    for (const match of text.matchAll(TOKEN)) {
        const index = match.index ?? 0;
        if (index > last) parts.push(text.slice(last, index));
        parts.push(
            match[2] ? (
                <a key={index} href={match[2]} target="_blank" rel="noreferrer" className={LINK_CLASS}>
                    {match[1]}
                </a>
            ) : (
                <GroupMention key={index} label={match[3]} ids={match[4].split(",")} />
            )
        );
        last = index + match[0].length;
    }
    if (last < text.length) parts.push(text.slice(last));
    return <>{parts}</>;
}
