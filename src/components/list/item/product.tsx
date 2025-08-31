import { FaRegFileImage } from "react-icons/fa";
import ProductInterface from "../../../interfaces/product";

interface ProductFromProps {
    product: ProductInterface;
}

const ProductItemOfList: React.FC<ProductFromProps> = ({ product }) => {
    return (
        <>
            <div className="flex flex-row gap-2">
                <div className="flex items-center justify-center size-24 rounded-md shadow bg-default/5">
                    {product.heroImage ? (
                        <img
                            src={product.heroImage}
                            alt={product.name}
                            className="size-24 rounded-md shadow"
                        />
                    ) : (
                        <FaRegFileImage className="rotate-345 size-14 text-default/20" />
                    )}
                </div>
                <div className="flex flex-col gap-1 justify-center text-default">
                    <div
                        className="text-sm leading-none"
                        aria-label="Product Name"
                    >
                        {product.name}
                    </div>
                    <div
                        className="text-2xl leading-none italic font-semibold"
                        aria-label="Product Price"
                    >
                        $former-price
                    </div>
                    <div
                        className="flex flex-row gap-2 items-center text-sm leading-none"
                        aria-label="Delivery mode"
                    >
                        deliver ready
                    </div>
                </div>
            </div>
        </>
    );
};
export default ProductItemOfList;
