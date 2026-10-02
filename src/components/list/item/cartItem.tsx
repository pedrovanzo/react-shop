import { Link } from "react-router";
import Button from "../../button/button";
import { CartProduct } from "../../../contexts/cartContext";
import { productPath } from "../../../lib/productPath";

interface CartItemProps {
    item: CartProduct;
    onRemove: () => void;
}

export default function CartItem({ item, onRemove }: CartItemProps) {
    return (
        <div className="py-4 px-4 bg-default/5 flex flex-row gap-2 items-center justify-between leading-none">
            <div className="flex gap-6">
                <div className="flex flex-col gap-0.25 items-start justify-center">
                    <div className="text-default">
                        <span className="text-sm me-1">Price:</span>
                        {/* TODO: price placeholder until the product data is reshaped */}
                        <span className="font-semibold">$--</span>
                    </div>
                    <div className="text-default">
                        <span className="text-sm me-1">Shipping:</span>
                        <span>$--</span>
                    </div>
                </div>
                <div
                    className="my-auto text-blue-500 line-clamp-1"
                    title={item.productName}
                    aria-label={item.productName}
                >
                    <Link to={{ pathname: productPath(item.productName) }}>
                        {item.productName}
                    </Link>
                </div>
            </div>
            <div>
                <Button variant="text" onClick={onRemove}>
                    Remove
                </Button>
            </div>
        </div>
    );
}
