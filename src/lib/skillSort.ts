import SkillInterface from "../interfaces/skill";

export type SkillSort = "alphabetical" | "topic" | "first-contact";
export interface SkillGroup {
    // Group heading; null when the list isn't grouped
    title: string | null;
    skills: SkillInterface[];
}

export const DEFAULT_SKILL_SORT: SkillSort = "topic";
export const SKILL_SORTS: { value: SkillSort; label: string }[] = [
    { value: "topic", label: "By topic" },
    { value: "alphabetical", label: "A–Z" },
    { value: "first-contact", label: "First contact" },
];

// Topic groups follow the order of the thesaurus scope
const CATEGORY_ORDER = [
    "JS fundamentals",
    "Data structures",
    "React",
    "Styling",
    "Browser and performance",
    "Git operations",
    "Engineering practices",
    "Languages",
    "This project",
];

const byName = (a: SkillInterface, b: SkillInterface) =>
    a.name.localeCompare(b.name, undefined, { sensitivity: "base" });

function groupBy(skills: SkillInterface[], getKey: (skill: SkillInterface) => string) {
    const groups = new Map<string, SkillInterface[]>();
    for (const skill of skills) {
        const key = getKey(skill);
        groups.set(key, [...(groups.get(key) ?? []), skill]);
    }
    return groups;
}

// Short uppercase labels for tight spots like the blueprint star plot, in the style of old sports game stats
export const TOPIC_SHORT_LABELS: Record<string, string> = {
    "JS fundamentals": "JS",
    "Data structures": "DATA",
    React: "REACT",
    Styling: "CSS",
    "Browser and performance": "PERF",
    "Git operations": "GIT",
    "Engineering practices": "ENG",
    Languages: "LANG",
    "This project": "PROJ",
};

function categoryRank(category: string) {
    const index = CATEGORY_ORDER.indexOf(category);
    return index === -1 ? CATEGORY_ORDER.length : index;
}

// Every category in use, in thesaurus order, with how many skills it has
export function getSkillCategories(skills: SkillInterface[]) {
    const counts = new Map<string, number>();
    for (const skill of skills) {
        counts.set(skill.category, (counts.get(skill.category) ?? 0) + 1);
    }
    return [...counts.entries()]
        .sort(([a], [b]) => categoryRank(a) - categoryRank(b) || a.localeCompare(b))
        .map(([name, count]) => ({ name, count }));
}

export function sortSkills(skills: SkillInterface[], sort: SkillSort): SkillGroup[] {
    if (sort === "topic") {
        const groups = groupBy([...skills].sort(byName), (skill) => skill.category);
        return [...groups.entries()]
            .sort(([a], [b]) => categoryRank(a) - categoryRank(b) || a.localeCompare(b))
            .map(([title, items]) => ({ title, skills: items }));
    }
    if (sort === "first-contact") {
        // Oldest first: the order I came in contact with each concept
        const sorted = [...skills].sort(
            (a, b) => a.firstContact.localeCompare(b.firstContact) || byName(a, b)
        );
        const groups = groupBy(sorted, (skill) => skill.firstContact.slice(0, 4));
        return [...groups.entries()].map(([title, items]) => ({ title, skills: items }));
    }
    return [{ title: null, skills: [...skills].sort(byName) }];
}
