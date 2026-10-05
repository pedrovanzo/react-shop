import ProductInterface from "../../../interfaces/product";
import { getProductById } from "../../../data/products";
import ProductItemLayout from "./productItemLayout";

interface ProductFromProps {
    product: ProductInterface;
    condensed?: boolean;
}

const ProductItemOfList: React.FC<ProductFromProps> = ({ product, condensed }) => {
    const parent = getProductById(product.parentId);
    return (
        <ProductItemLayout
            badge={parent?.name}
            title={product.name}
            description={product.summary}
            condensed={condensed}
        />
    );
};
export default ProductItemOfList;
