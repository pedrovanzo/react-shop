import { useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router";
import { IoCart } from "react-icons/io5";
import ConfirmModal from "../../components/modal/confirmModal";
import {
    SIMULATED_DELAY,
    useSimulatedLoading,
} from "../../hooks/useSimulatedLoading";
import LoadingSpinner from "../../components/loading/spinner";
import { useCart } from "../../contexts/cartContext";
import Navbar from "../../components/navigation/navbar";
import ThreeColumnLayout from "../../components/layout/threeColumnLayout";
import Button from "../../components/button/button";
import ProductImagePlaceholder from "../../components/product/productImagePlaceholder";
import ProductItemOfList from "../../components/list/item/product";
import AddToCartModal from "../../components/cart/addToCartModal";
import { InsightType } from "../../interfaces/product";
import { getChildProducts, getProductById, getProductByName, getRelatedProducts } from "../../data/products";
import TopicTag from "../../components/product/topicTag";
import { productPath } from "../../lib/productPath";
import NotFound from "../notFound/page";

const insightTypeLabels: Record<InsightType, string> = {
    explored: "How I explored it",
    gotcha: "Gotcha",
    "in-production": "In production",
    opinion: "Opinion",
};

function SectionTitle({ children }: { children: string }) {
    return <h2 className="text-xl font-semibold tracking-tight">{children}</h2>;
}

export default function Product() {
    const { name } = useParams();
    const product = getProductByName(name);
    const navigate = useNavigate();
    // Document loads first, then user
    const isDocLoading = useSimulatedLoading();
    const userIsLoading = useSimulatedLoading(SIMULATED_DELAY * 2);
    const { cart, setCart } = useCart();
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isRemoveModalOpen, setIsRemoveModalOpen] = useState(false);
    // Filters of the products list this page was opened from, if any
    const location = useLocation();
    const productsSearch: string = location.state?.productsSearch ?? "";
    if (!product) return <NotFound />;
    if (isDocLoading)
        return (
            <div className="absolute inset-0 w-full h-screen flex items-center justify-center">
                <LoadingSpinner />
            </div>
        );
    const parent = getProductById(product.parentId);
    const isInCart = cart.some((item) => item.productName === product.name);
    const children = getChildProducts(product.id);
    const related = getRelatedProducts(product);
    return (
        <>
            <Navbar />
            <ThreeColumnLayout>
                <article className="mx-auto w-full max-w-3xl flex flex-col gap-10 text-default">
                    <header className="flex flex-col sm:flex-row items-start gap-6">
                        <ProductImagePlaceholder className="size-28 sm:size-32" />
                        <div className="flex flex-col gap-3 min-w-0">
                            {/* Title, then the eyebrow (parent, category, draft) right below it */}
                            <div className="flex flex-col gap-1">
                                {/* Title on the left, "Return to Products" at the far right of the same line */}
                                <div className="flex flex-row flex-wrap items-center justify-between gap-x-6 gap-y-2">
                                    <h1 className="text-3xl sm:text-4xl font-semibold tracking-[-0.02em] leading-tight">
                                        {product.name}
                                    </h1>
                                    <Button
                                        variant="text"
                                        className="shrink-0"
                                        onClick={() => navigate(`/products${productsSearch ? `?${productsSearch}` : ""}`)}
                                    >
                                        Return to Products
                                    </Button>
                                </div>
                                <div className="flex flex-row flex-wrap items-center gap-1.5 text-xs font-medium uppercase tracking-widest text-default/50">
                                    {parent && (
                                        <Link to={{ pathname: productPath(parent.name) }} className="hover:text-default">
                                            {parent.name}
                                        </Link>
                                    )}
                                    {/* Skip the category when it repeats the parent's name (e.g. Git operations / Git operations) */}
                                    {product.category !== parent?.name && (
                                        <>
                                            {parent && <span aria-hidden="true">/</span>}
                                            <span>{product.category}</span>
                                        </>
                                    )}
                                    {product.draft && (
                                        <span className="rounded-full px-1.5 normal-case tracking-normal bg-default/10 text-default/70">
                                            Draft content
                                        </span>
                                    )}
                                </div>
                            </div>
                            <p className="text-lg font-light leading-relaxed text-default/70">
                                {product.summary}
                            </p>
                            <div className="flex flex-row flex-wrap items-center gap-4">
                                {userIsLoading ? (
                                    <LoadingSpinner text="loading user" />
                                ) : isInCart ? (
                                    // Cart-aware: same states as the products list (blue "In cart", red remove)
                                    <div className="flex flex-row flex-wrap items-center gap-3">
                                        <Link
                                            to={{ pathname: "/cart" }}
                                            title="Go to cart"
                                            className="flex flex-row items-center gap-1.5 rounded-full px-3 py-1 text-sm font-medium bg-blue-500/15 text-blue-500 transition-colors hover:bg-blue-500/25"
                                        >
                                            <IoCart className="size-4" aria-hidden="true" />
                                            In cart
                                        </Link>
                                        <Button
                                            variant="text"
                                            className="transition-colors hover:text-red-500"
                                            onClick={() => setIsRemoveModalOpen(true)}
                                        >
                                            Remove from cart
                                        </Button>
                                    </div>
                                ) : (
                                    <Button variant="primary" onClick={() => setIsAddModalOpen(true)}>
                                        Add to cart
                                    </Button>
                                )}
                            </div>
                        </div>
                    </header>

                    {related.length > 0 && (
                        <section className="flex flex-col gap-3">
                            <SectionTitle>Related topics</SectionTitle>
                            <ul className="flex flex-row flex-wrap gap-2">
                                {related.map((item) => (
                                    <li key={item.id} className="max-w-full">
                                        <TopicTag name={item.name} />
                                    </li>
                                ))}
                            </ul>
                        </section>
                    )}

                    {product.insights.length > 0 && (
                        <section className="flex flex-col gap-4">
                            <SectionTitle>Insights</SectionTitle>
                            <ul className="flex flex-col gap-3">
                                {product.insights.map((insight) => (
                                    <li key={insight.title} className="flex flex-col gap-2 rounded-lg p-4 bg-default/5">
                                        <span className="text-xs font-medium uppercase tracking-widest text-default/50">
                                            {insightTypeLabels[insight.type]}
                                        </span>
                                        <h3 className="font-semibold leading-snug">{insight.title}</h3>
                                        <p className="leading-relaxed text-default/70">{insight.body}</p>
                                    </li>
                                ))}
                            </ul>
                        </section>
                    )}

                    {children.length > 0 && (
                        <section className="flex flex-col gap-4">
                            <SectionTitle>Subtopics</SectionTitle>
                            <ul className="flex flex-col gap-4">
                                {children.map((child) => (
                                    <li key={child.id}>
                                        <Link
                                            to={{ pathname: productPath(child.name) }}
                                            className="block rounded-lg p-2 -m-2 hover:bg-default/5"
                                        >
                                            <ProductItemOfList product={child} />
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </section>
                    )}

                    {product.inProject && product.inProject.length > 0 && (
                        <section className="flex flex-col gap-4">
                            <SectionTitle>See it in this project</SectionTitle>
                            <ul className="flex flex-col gap-2">
                                {product.inProject.map((example) => (
                                    <li key={example.path + example.label} className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-3">
                                        <span>{example.label}</span>
                                        <code className="text-sm text-default/60 break-all">{example.path}</code>
                                        {example.route && (
                                            <Link to={{ pathname: example.route }} className="text-sm underline">
                                                open
                                            </Link>
                                        )}
                                    </li>
                                ))}
                            </ul>
                        </section>
                    )}

                    {product.references && product.references.length > 0 && (
                        <section className="flex flex-col gap-4">
                            <SectionTitle>References</SectionTitle>
                            <ul className="flex flex-col gap-2">
                                {product.references.map((reference) => (
                                    <li key={reference.url}>
                                        <a
                                            href={reference.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="underline"
                                        >
                                            {reference.title}
                                        </a>
                                        {reference.author && (
                                            <span className="text-default/60"> · {reference.author}</span>
                                        )}
                                    </li>
                                ))}
                            </ul>
                        </section>
                    )}
                </article>
                {isRemoveModalOpen && (
                    <ConfirmModal
                        title="Remove item"
                        message={`Remove ${product.name} from the cart?`}
                        confirmLabel="Remove"
                        cancelLabel="Cancel"
                        onConfirm={() =>
                            // Removes every entry of this product, in case it was added more than once
                            setCart((currentCart) =>
                                currentCart.filter((item) => item.productName !== product.name)
                            )
                        }
                        onClose={() => setIsRemoveModalOpen(false)}
                    />
                )}
                {isAddModalOpen && (
                    <AddToCartModal
                        productName={product.name}
                        onConfirm={() =>
                            setCart((currentCart) => [...currentCart, { productName: product.name }])
                        }
                        onClose={() => setIsAddModalOpen(false)}
                    />
                )}
            </ThreeColumnLayout>
        </>
    );
}
