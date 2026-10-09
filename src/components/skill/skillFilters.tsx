import { LuList, LuRows3 } from "react-icons/lu";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { cn } from "@/lib/utils";
import { SKILLS } from "../../data/skills";
import { getSkillCategories, SKILL_SORTS, SkillSort } from "../../lib/skillSort";

export type ListView = "expanded" | "condensed";
export interface SkillFiltersValue {
    view: ListView;
    sort: SkillSort;
    // null means all topics
    topic: string | null;
}

const LIST_VIEWS: { value: ListView; label: string; Icon: typeof LuList }[] = [
    { value: "expanded", label: "Expanded", Icon: LuRows3 },
    { value: "condensed", label: "Condensed", Icon: LuList },
];
// "All topics" (name null) followed by one option per category
const TOPIC_OPTIONS: { name: string | null; label: string; count: number }[] = [
    { name: null, label: "All topics", count: SKILLS.length },
    ...getSkillCategories(SKILLS).map((category) => ({
        name: category.name,
        label: category.name,
        count: category.count,
    })),
];

function GroupLabel({ children }: { children: string }) {
    return <h2 className="px-2 text-xs font-medium text-muted-foreground">{children}</h2>;
}

interface SkillFiltersProps {
    value: SkillFiltersValue;
    onChange: (changes: Partial<SkillFiltersValue>) => void;
}

// View, sort and topic controls for the skills list, styled like a framework docs sidebar (shadcn tokens):
// segmented toggles for view and sort, then a nav list of topics with the active one highlighted
export default function SkillFilters({ value, onChange }: SkillFiltersProps) {
    return (
        <div className="flex flex-col gap-6 text-sm text-foreground">
            <section className="flex flex-col gap-2" aria-label="List view">
                <GroupLabel>View</GroupLabel>
                <ToggleGroup
                    type="single"
                    variant="outline"
                    size="sm"
                    className="w-full"
                    value={value.view}
                    // Radix sends "" when the active item is clicked again; keep the current view
                    onValueChange={(view) => view && onChange({ view: view as ListView })}
                >
                    {LIST_VIEWS.map(({ value: view, label, Icon }) => (
                        <ToggleGroupItem key={view} value={view} aria-label={`${label} view`}>
                            <Icon aria-hidden="true" />
                            {label}
                        </ToggleGroupItem>
                    ))}
                </ToggleGroup>
            </section>
            <section className="flex flex-col gap-2" aria-label="Sort skills">
                <GroupLabel>Sort by</GroupLabel>
                <ToggleGroup
                    type="single"
                    variant="outline"
                    size="sm"
                    className="w-full"
                    value={value.sort}
                    onValueChange={(sort) => sort && onChange({ sort: sort as SkillSort })}
                >
                    {SKILL_SORTS.map((option) => (
                        <ToggleGroupItem key={option.value} value={option.value} className="text-xs">
                            {option.label}
                        </ToggleGroupItem>
                    ))}
                </ToggleGroup>
            </section>
            <nav className="flex flex-col gap-1" aria-label="Filter by topic">
                <GroupLabel>Topics</GroupLabel>
                <ul className="flex flex-col gap-0.5">
                    {TOPIC_OPTIONS.map((option) => {
                        const isActive = value.topic === option.name;
                        return (
                            <li key={option.label}>
                                <button
                                    type="button"
                                    aria-current={isActive ? "true" : undefined}
                                    onClick={() => onChange({ topic: option.name })}
                                    className={cn(
                                        "flex h-8 w-full items-center justify-between gap-2 rounded-md px-2 text-left outline-none transition-colors",
                                        "focus-visible:ring-[3px] focus-visible:ring-ring/50",
                                        isActive
                                            ? "bg-accent font-medium text-accent-foreground"
                                            : "text-muted-foreground hover:bg-accent/60 hover:text-foreground"
                                    )}
                                >
                                    <span className="truncate">{option.label}</span>
                                    <span className="text-xs tabular-nums text-muted-foreground">{option.count}</span>
                                </button>
                            </li>
                        );
                    })}
                </ul>
            </nav>
        </div>
    );
}
