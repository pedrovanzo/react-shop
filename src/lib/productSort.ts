import ProductInterface from "../interfaces/product";

export type ProductSort = "alphabetical" | "topic" | "first-contact";
export interface ProductGroup {
    // Group heading; null when the list isn't grouped
    title: string | null;
    products: ProductInterface[];
}

export const PRODUCT_SORTS: { value: ProductSort; label: string }[] = [
    { value: "alphabetical", label: "A–Z" },
    { value: "topic", label: "By topic" },
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

const byName = (a: ProductInterface, b: ProductInterface) =>
    a.name.localeCompare(b.name, undefined, { sensitivity: "base" });

function groupBy(products: ProductInterface[], getKey: (product: ProductInterface) => string) {
    const groups = new Map<string, ProductInterface[]>();
    for (const product of products) {
        const key = getKey(product);
        groups.set(key, [...(groups.get(key) ?? []), product]);
    }
    return groups;
}

function categoryRank(category: string) {
    const index = CATEGORY_ORDER.indexOf(category);
    return index === -1 ? CATEGORY_ORDER.length : index;
}

// Every category in use, in thesaurus order, with how many products it has
export function getProductCategories(products: ProductInterface[]) {
    const counts = new Map<string, number>();
    for (const product of products) {
        counts.set(product.category, (counts.get(product.category) ?? 0) + 1);
    }
    return [...counts.entries()]
        .sort(([a], [b]) => categoryRank(a) - categoryRank(b) || a.localeCompare(b))
        .map(([name, count]) => ({ name, count }));
}

export function sortProducts(products: ProductInterface[], sort: ProductSort): ProductGroup[] {
    if (sort === "topic") {
        const groups = groupBy([...products].sort(byName), (product) => product.category);
        return [...groups.entries()]
            .sort(([a], [b]) => categoryRank(a) - categoryRank(b) || a.localeCompare(b))
            .map(([title, items]) => ({ title, products: items }));
    }
    if (sort === "first-contact") {
        // Oldest first: the order I came in contact with each concept
        const sorted = [...products].sort(
            (a, b) => a.firstContact.localeCompare(b.firstContact) || byName(a, b)
        );
        const groups = groupBy(sorted, (product) => product.firstContact.slice(0, 4));
        return [...groups.entries()].map(([title, items]) => ({ title, products: items }));
    }
    return [{ title: null, products: [...products].sort(byName) }];
}
