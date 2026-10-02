import { useCart } from "../../contexts/cartContext";
import { Link } from "react-router";
import { IoCart, IoCartOutline } from "react-icons/io5";
import Navbar from "../../components/navigation/navbar";
import CartItem from "../../components/list/item/cartItem";
import Button from "../../components/button/button";

export default function Cart() {
    const { cart, setCart } = useCart();
    function handleClearCart() {
        if (window.confirm("Clear all items on the cart?")) {
            setCart([]);
        }
    }
    function handleRemoveItem(index: number) {
        if (window.confirm("Confirm remove item?")) {
            setCart(cart.filter((_, itemIndex) => itemIndex !== index));
        }
    }
    return (
        <>
            <Navbar />
            <div className="my-2 flex flex-row gap-2 items-center">
                {cart.length > 0 ? (
                    <IoCart className="text-default" size="24" />
                ) : (
                    <IoCartOutline className="text-default" size="24" />
                )}
                <div className="w-full h-0.5 bg-default"></div>
            </div>
            <div className="w-full max-w-xl">
                {cart.length > 0 ? (
                    <>
                        <ul className="flex flex-col gap-2">
                            {cart.map((item, index) => (
                                <li key={index}>
                                    <CartItem
                                        item={item}
                                        onRemove={() => handleRemoveItem(index)}
                                    />
                                </li>
                            ))}
                        </ul>
                        <div className="my-2 flex flex-row gap-2 items-center justify-between leading-none">
                            <div className="flex flex-col justify-center text-default">
                                <div>
                                    <span className="text-sm">Items on cart:</span>{" "}
                                    {cart.length}
                                </div>
                            </div>
                            <Button
                                variant="link"
                                className="my-2"
                                onClick={handleClearCart}
                            >
                                Clear current cart
                            </Button>
                        </div>
                    </>
                ) : (
                    <div className="my-2 flex flex-row gap-1 items-center leading-none text-default">
                        Cart is empty. Add items on the
                        <Link
                            to={{ pathname: "/products" }}
                            className="text-blue-500"
                        >
                            products page
                        </Link>
                    </div>
                )}
            </div>
        </>
    );
}
