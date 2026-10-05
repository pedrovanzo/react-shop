import PreviewCard from "../../../components/library/previewCard";
import PreviewGrid from "../../../components/library/previewGrid";
import ProductItemOfList from "../../../components/list/item/product";
import ProductItemLayout from "../../../components/list/item/productItemLayout";
import ProductImagePlaceholder from "../../../components/product/productImagePlaceholder";
import CartItem from "../../../components/list/item/cartItem";
import TopicTag from "../../../components/product/topicTag";
import { PRODUCTS } from "../../../data/products";
import ConfirmModal from "../../../components/modal/confirmModal";
import { useState } from "react";
export default function ListsPreview() {
    const product = PRODUCTS[0];
    const [isRemoveDialogOpen, setIsRemoveDialogOpen] = useState(false);
    return (
        <>
        <PreviewGrid>
            <PreviewCard label="ProductItemOfList" source="components/list/item/product.tsx" usedIn="products list, product page subtopics">
                <ProductItemOfList product={product} />
            </PreviewCard>
            <PreviewCard label="ProductItemLayout (plain slots)" source="components/list/item/productItemLayout.tsx" usedIn="ProductItemOfList, LoadingProductItemOfList">
                <ProductItemLayout title="title slot" description="description slot, clamped to two lines" />
            </PreviewCard>
            <PreviewCard label="ProductImagePlaceholder (default and size-40)" source="components/product/productImagePlaceholder.tsx" usedIn="product list items, product page header">
                <div className="flex flex-row items-center gap-4">
                    <ProductImagePlaceholder />
                    <ProductImagePlaceholder className="size-40" />
                </div>
            </PreviewCard>
            <PreviewCard label="TopicTag" source="components/product/topicTag.tsx" usedIn="product page, Related topics">
                <div className="flex flex-row flex-wrap justify-center gap-2">
                    <TopicTag name="Closures" />
                    <TopicTag name="Event loop" />
                    <TopicTag name="Common patterns (map/filter/reduce)" />
                </div>
            </PreviewCard>
            <PreviewCard label="CartItem" source="components/list/item/cartItem.tsx" usedIn="cart page">
                <div className="w-full">
                    <CartItem
                        item={{ productName: product.name }}
                        onRemove={() => setIsRemoveDialogOpen(true)}
                    />
                </div>
            </PreviewCard>
        </PreviewGrid>
        {isRemoveDialogOpen && (
            <ConfirmModal
                title="Preview only"
                message="Remove was clicked. Nothing is removed in the preview."
                onClose={() => setIsRemoveDialogOpen(false)}
            />
        )}
        </>
    );
}
