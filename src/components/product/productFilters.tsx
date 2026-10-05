import { PRODUCTS } from "../../data/products";
import { getProductCategories, PRODUCT_SORTS, ProductSort } from "../../lib/productSort";

export type ListView = "expanded" | "condensed";
export interface ProductFiltersValue {
    view: ListView;
    sort: ProductSort;
    // null means all topics
    topic: string | null;
}

const LIST_VIEWS: { value: ListView; label: string }[] = [
    { value: "expanded", label: "Expanded" },
    { value: "condensed", label: "Condensed" },
];
// "All topics" (name null) followed by one option per category
const TOPIC_OPTIONS: { name: string | null; label: string; count: number }[] = [
    { name: null, label: "All topics", count: PRODUCTS.length },
    ...getProductCategories(PRODUCTS).map((category) => ({
        name: category.name,
        label: category.name,
        count: category.count,
    })),
];

function MenuHeading({ children }: { children: string }) {
    return (
        <h2 className="text-xs font-medium uppercase tracking-widest text-default/50">
            {children}
        </h2>
    );
}

// Same look as the components library side menu: active item filled, others on hover
function menuItemClasses(isActive: boolean) {
    return (
        "flex flex-row items-center justify-between gap-2 w-full px-2 py-1 rounded-md text-left " +
        (isActive ? "text-contrast bg-default" : "hover:bg-default/10")
    );
}

interface ProductFiltersProps {
    value: ProductFiltersValue;
    onChange: (changes: Partial<ProductFiltersValue>) => void;
}

// View, sort and topic controls for the products list
export default function ProductFilters({ value, onChange }: ProductFiltersProps) {
    return (
        <div className="flex flex-col gap-6 text-default">
            <nav className="flex flex-col gap-2" aria-label="List view">
                <MenuHeading>View</MenuHeading>
                <ul className="flex flex-col gap-1">
                    {LIST_VIEWS.map((option) => (
                        <li key={option.value}>
                            <button
                                type="button"
                                className={menuItemClasses(value.view === option.value)}
                                aria-pressed={value.view === option.value}
                                onClick={() => onChange({ view: option.value })}
                            >
                                {option.label}
                            </button>
                        </li>
                    ))}
                </ul>
            </nav>
            <nav className="flex flex-col gap-2" aria-label="Sort products">
                <MenuHeading>Sort by</MenuHeading>
                <ul className="flex flex-col gap-1">
                    {PRODUCT_SORTS.map((option) => (
                        <li key={option.value}>
                            <button
                                type="button"
                                className={menuItemClasses(value.sort === option.value)}
                                aria-pressed={value.sort === option.value}
                                onClick={() => onChange({ sort: option.value })}
                            >
                                {option.label}
                            </button>
                        </li>
                    ))}
                </ul>
            </nav>
            <nav className="flex flex-col gap-2" aria-label="Filter by topic">
                <MenuHeading>Topics</MenuHeading>
                <ul className="flex flex-col gap-1">
                    {TOPIC_OPTIONS.map((option) => {
                        const isActive = value.topic === option.name;
                        return (
                            <li key={option.label}>
                                <button
                                    type="button"
                                    className={menuItemClasses(isActive)}
                                    aria-pressed={isActive}
                                    onClick={() => onChange({ topic: option.name })}
                                >
                                    <span>{option.label}</span>
                                    <span className={isActive ? "text-contrast/70" : "text-default/40"}>
                                        {option.count}
                                    </span>
                                </button>
                            </li>
                        );
                    })}
                </ul>
            </nav>
        </div>
    );
}
