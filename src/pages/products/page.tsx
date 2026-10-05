import { useState } from "react";
import { IoOptions } from "react-icons/io5";
import { useSimulatedLoading } from "../../hooks/useSimulatedLoading";
import { Link, useSearchParams } from "react-router";
import LoadingProductItemOfList from "../../components/list/item/loadingProduct";
import ProductItemOfList from "../../components/list/item/product";
import Navbar from "../../components/navigation/navbar";
import PageHeader from "../../components/header/pageHeader";
import ThreeColumnLayout from "../../components/layout/threeColumnLayout";
import ProductFilters, { ProductFiltersValue } from "../../components/product/productFilters";
import {
    Drawer,
    DrawerContent,
    DrawerDescription,
    DrawerHeader,
    DrawerTitle,
} from "@/components/ui/drawer";
import { productPath } from "../../lib/productPath";
import { getProductCategories, PRODUCT_SORTS, ProductSort, sortProducts } from "../../lib/productSort";
import { PRODUCTS } from "../../data/products";

const CATEGORIES = getProductCategories(PRODUCTS);

function isProductSort(value: string | null): value is ProductSort {
    return PRODUCT_SORTS.some((sort) => sort.value === value);
}

export default function Products() {
    const loading = useSimulatedLoading();
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    // View, sort and topic live in the URL (?view=condensed&sort=topic&topic=React)
    // so they survive refresh and back navigation
    const [searchParams, setSearchParams] = useSearchParams();
    const sortParam = searchParams.get("sort");
    const topicParam = searchParams.get("topic");
    const filters: ProductFiltersValue = {
        view: searchParams.get("view") === "condensed" ? "condensed" : "expanded",
        sort: isProductSort(sortParam) ? sortParam : "alphabetical",
        topic: CATEGORIES.some((category) => category.name === topicParam) ? topicParam : null,
    };
    const isCondensed = filters.view === "condensed";

    function updateFilters(changes: Partial<ProductFiltersValue>) {
        const next = new URLSearchParams(searchParams);
        if (changes.view !== undefined) {
            if (changes.view === "expanded") next.delete("view");
            else next.set("view", changes.view);
        }
        if (changes.sort !== undefined) {
            if (changes.sort === "alphabetical") next.delete("sort");
            else next.set("sort", changes.sort);
        }
        if (changes.topic !== undefined) {
            if (changes.topic === null) next.delete("topic");
            else next.set("topic", changes.topic);
        }
        setSearchParams(next, { replace: true });
    }

    const visibleProducts = filters.topic
        ? PRODUCTS.filter((product) => product.category === filters.topic)
        : PRODUCTS;
    const groups = sortProducts(visibleProducts, filters.sort);

    return (
        <>
            <Navbar
                actions={
                    // Below lg the filters live in a drawer opened from the navbar
                    <button
                        type="button"
                        onClick={() => setIsDrawerOpen(true)}
                        className="lg:hidden flex flex-row items-center gap-1.5"
                        aria-label="Open filters"
                    >
                        <IoOptions className="size-5" aria-hidden="true" />
                        filters
                    </button>
                }
            />
            <ThreeColumnLayout left={<ProductFilters value={filters} onChange={updateFilters} />}>
                <div className="min-w-0 flex flex-col gap-10">
                    <PageHeader
                        title="Skill Shop"
                        description="Browse the items and add them to cart to make a build"
                    />
                    <main className="mx-auto w-full max-w-2xl">
                        {loading ? (
                            <ul className={"flex flex-col " + (isCondensed ? "gap-3" : "gap-6")}>
                                <li key={1}>
                                    <LoadingProductItemOfList condensed={isCondensed} />
                                </li>
                                <li key={2}>
                                    <LoadingProductItemOfList condensed={isCondensed} />
                                </li>
                                <li key={3}>
                                    <LoadingProductItemOfList condensed={isCondensed} />
                                </li>
                            </ul>
                        ) : visibleProducts.length != 0 ? (
                            <div className={"flex flex-col " + (isCondensed ? "gap-8" : "gap-10")}>
                                {groups.map((group) => (
                                    <section key={group.title ?? "all"} className="flex flex-col gap-4">
                                        {group.title && (
                                            <h2 className="text-xs font-medium uppercase tracking-widest text-default/50">
                                                {group.title}
                                            </h2>
                                        )}
                                        <ul className={"flex flex-col " + (isCondensed ? "gap-3" : "gap-6")}>
                                            {group.products.map((product) => (
                                                <li key={product.id}>
                                                    <Link
                                                        to={{ pathname: productPath(product.name) }}
                                                        className="block rounded-lg p-2 -m-2 hover:bg-default/5"
                                                    >
                                                        <ProductItemOfList product={product} condensed={isCondensed} />
                                                    </Link>
                                                </li>
                                            ))}
                                        </ul>
                                    </section>
                                ))}
                            </div>
                        ) : (
                            <div>No products found :(</div>
                        )}
                    </main>
                </div>
            </ThreeColumnLayout>
            <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen} direction="left">
                <DrawerContent className="text-default">
                    <DrawerHeader>
                        <DrawerTitle>Filters</DrawerTitle>
                        <DrawerDescription>View, sort and filter the products.</DrawerDescription>
                    </DrawerHeader>
                    <div className="overflow-y-auto px-4 pb-4">
                        <ProductFilters value={filters} onChange={updateFilters} />
                    </div>
                </DrawerContent>
            </Drawer>
        </>
    );
}
