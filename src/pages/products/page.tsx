import { useState } from "react";
import { IoCart, IoCartOutline, IoOptions } from "react-icons/io5";
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
import ProductInterface from "../../interfaces/product";
import { useCart } from "../../contexts/cartContext";
import AddToCartModal from "../../components/cart/addToCartModal";
import ConfirmModal from "../../components/modal/confirmModal";
import ProductCartButton from "../../components/product/productCartButton";

const CATEGORIES = getProductCategories(PRODUCTS);

function isProductSort(value: string | null): value is ProductSort {
    return PRODUCT_SORTS.some((sort) => sort.value === value);
}

// Adds a set of products; shows how many are left to add, or "All in cart" when none are
function CartActionButton({ remaining, label, onClick }: { remaining: number; label: string; onClick: () => void }) {
    if (remaining === 0) {
        return (
            <span className="flex flex-row items-center gap-1 text-xs font-medium text-blue-500/70">
                <IoCart className="size-4" aria-hidden="true" />
                All in cart
            </span>
        );
    }
    return (
        <button
            type="button"
            onClick={onClick}
            className="flex flex-row items-center gap-1 text-xs font-medium text-blue-500 hover:underline"
        >
            <IoCartOutline className="size-4" aria-hidden="true" />
            {label} ({remaining})
        </button>
    );
}

export default function Products() {
    const loading = useSimulatedLoading();
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    // Pending add: one product, a whole group, or everything listed
    const [pendingAdd, setPendingAdd] = useState<{ label: string; products: ProductInterface[] } | null>(null);
    const [productToRemove, setProductToRemove] = useState<ProductInterface | null>(null);
    const { cart, setCart } = useCart();
    const productNamesInCart = new Set(cart.map((item) => item.productName));
    const notInCart = (products: ProductInterface[]) =>
        products.filter((product) => !productNamesInCart.has(product.name));
    // Adds only the products not in the cart yet, so nothing is added twice
    function addToCart(products: ProductInterface[]) {
        setCart((currentCart) => {
            const names = new Set(currentCart.map((item) => item.productName));
            const toAdd = products.filter((product) => !names.has(product.name));
            return [...currentCart, ...toAdd.map((product) => ({ productName: product.name }))];
        });
    }
    function requestAdd(label: string, products: ProductInterface[]) {
        const toAdd = notInCart(products);
        if (toAdd.length === 0) return;
        setPendingAdd({
            label: toAdd.length === 1 ? toAdd[0].name : `${toAdd.length} ${label}`,
            products: toAdd,
        });
    }
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
                                {groups.map((group, index) => (
                                    <section key={group.title ?? "all"} className="flex flex-col gap-4">
                                        {/* Header line: group title + add group (grouped sorts only), "Add all" on the first line */}
                                        {(group.title || index === 0) && (
                                            <div className="flex flex-row flex-wrap items-center gap-x-4 gap-y-2">
                                                {group.title && (
                                                    <div className="flex flex-row items-center gap-3">
                                                        <h2 className="text-xs font-medium uppercase tracking-widest text-default/50">
                                                            {group.title}
                                                        </h2>
                                                        <CartActionButton
                                                            remaining={notInCart(group.products).length}
                                                            label="Add group"
                                                            onClick={() =>
                                                                requestAdd(
                                                                    filters.sort === "first-contact"
                                                                        ? `products from ${group.title}`
                                                                        : `${group.title} products`,
                                                                    group.products
                                                                )
                                                            }
                                                        />
                                                    </div>
                                                )}
                                                {index === 0 && (
                                                    <div className="ml-auto">
                                                        <CartActionButton
                                                            remaining={notInCart(visibleProducts).length}
                                                            label="Add all"
                                                            onClick={() => requestAdd("products", visibleProducts)}
                                                        />
                                                    </div>
                                                )}
                                            </div>
                                        )}
                                        <ul className={"flex flex-col " + (isCondensed ? "gap-3" : "gap-6")}>
                                            {group.products.map((product) => (
                                                <li key={product.id} className="flex flex-row items-center gap-2">
                                                    {/* Two separate click areas: the item opens the product, the cart button adds or removes it */}
                                                    <Link
                                                        to={{ pathname: productPath(product.name) }}
                                                        // Lets the product page return to this list with the same filters
                                                        state={{ productsSearch: searchParams.toString() }}
                                                        className="flex-1 min-w-0 block rounded-lg p-2 -m-2 hover:bg-default/5"
                                                    >
                                                        <ProductItemOfList
                                                            product={product}
                                                            condensed={isCondensed}
                                                            inCart={productNamesInCart.has(product.name)}
                                                        />
                                                    </Link>
                                                    <ProductCartButton
                                                        productName={product.name}
                                                        inCart={productNamesInCart.has(product.name)}
                                                        onAdd={() => setPendingAdd({ label: product.name, products: [product] })}
                                                        onRemove={() => setProductToRemove(product)}
                                                    />
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
            {productToRemove && (
                <ConfirmModal
                    title="Remove item"
                    message={`Remove ${productToRemove.name} from the cart?`}
                    confirmLabel="Remove"
                    cancelLabel="Cancel"
                    onConfirm={() =>
                        // Removes every entry of this product, in case it was added more than once
                        setCart((currentCart) =>
                            currentCart.filter((item) => item.productName !== productToRemove.name)
                        )
                    }
                    onClose={() => setProductToRemove(null)}
                />
            )}
            {pendingAdd && (
                <AddToCartModal
                    productName={pendingAdd.label}
                    plural={pendingAdd.products.length > 1}
                    onConfirm={() => addToCart(pendingAdd.products)}
                    onClose={() => setPendingAdd(null)}
                />
            )}
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
