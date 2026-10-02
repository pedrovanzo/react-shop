import { FaRegFileImage } from "react-icons/fa";
import ProductInterface from "../../../interfaces/product";
import ProductItemLayout from "./productItemLayout";

interface ProductFromProps {
    product: ProductInterface;
}

const ProductItemOfList: React.FC<ProductFromProps> = ({ product }) => {
    return (
        <ProductItemLayout
            image={
                product.heroImage ? (
                    <img
                        src={product.heroImage}
                        alt={product.name}
                        className="size-24 rounded-md shadow"
                    />
                ) : (
                    <FaRegFileImage className="rotate-345 size-14 text-default/20" />
                )
            }
            name={product.name}
            price="$former-price"
            delivery="deliver ready"
        />
    );
};
export default ProductItemOfList;
