import PreviewCard from "../../../components/library/previewCard";
import PreviewGrid from "../../../components/library/previewGrid";
import ProductItemOfList from "../../../components/list/item/product";
import ProductItemLayout from "../../../components/list/item/productItemLayout";
import CartItem from "../../../components/list/item/cartItem";
import localData from "../../../data/productsList.json";
export default function ListsPreview() {
    const product = localData[0];
    return (
        <PreviewGrid>
            <PreviewCard label="ProductItemOfList" source="components/list/item/product.tsx" usedIn="products list">
                <ProductItemOfList product={product} />
            </PreviewCard>
            <PreviewCard label="ProductItemLayout (plain slots)" source="components/list/item/productItemLayout.tsx" usedIn="ProductItemOfList, LoadingProductItemOfList">
                <ProductItemLayout image="image" name="name slot" price="price slot" delivery="delivery slot" />
            </PreviewCard>
            <PreviewCard label="CartItem" source="components/list/item/cartItem.tsx" usedIn="cart page">
                <div className="w-full">
                    <CartItem
                        item={{ productName: product.name, productImg: product.heroImage }}
                        onRemove={() => window.alert("Remove clicked (preview only)")}
                    />
                </div>
            </PreviewCard>
        </PreviewGrid>
    );
}
