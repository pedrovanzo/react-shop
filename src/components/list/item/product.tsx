import ProductInterface from "../../../interfaces/product";
import { getProductById } from "../../../data/products";
import ProductItemLayout from "./productItemLayout";

interface ProductFromProps {
    product: ProductInterface;
    condensed?: boolean;
    // Already in the cart: muted, with an "In cart" badge
    inCart?: boolean;
}

const ProductItemOfList: React.FC<ProductFromProps> = ({ product, condensed, inCart = false }) => {
    const parent = getProductById(product.parentId);
    return (
        <ProductItemLayout
            badge={parent?.name}
            status={inCart ? "In cart" : undefined}
            muted={inCart}
            title={product.name}
            description={product.summary}
            condensed={condensed}
        />
    );
};
export default ProductItemOfList;
