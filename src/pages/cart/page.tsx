import { useState } from "react";
import { useCart } from "../../contexts/cartContext";
import { Link } from "react-router";
import { IoCart, IoCartOutline } from "react-icons/io5";
import Navbar from "../../components/navigation/navbar";
import ThreeColumnLayout from "../../components/layout/threeColumnLayout";
import CartItem from "../../components/list/item/cartItem";
import Button from "../../components/button/button";
import ConfirmModal from "../../components/modal/confirmModal";

export default function Cart() {
    const { cart, setCart } = useCart();
    // Which confirmation is open: clearing the cart, or removing the item at an index
    const [pendingAction, setPendingAction] = useState<
        { type: "clear" } | { type: "remove"; index: number } | null
    >(null);
    function handleConfirmPendingAction() {
        if (pendingAction?.type === "clear") setCart([]);
        if (pendingAction?.type === "remove") {
            setCart(cart.filter((_, itemIndex) => itemIndex !== pendingAction.index));
        }
    }
    return (
        <>
            <Navbar />
            <ThreeColumnLayout>
                <div className="mx-auto max-w-xl my-2 flex flex-row gap-2 items-center">
                    {cart.length > 0 ? (
                        <IoCart className="text-default" size="24" />
                    ) : (
                        <IoCartOutline className="text-default" size="24" />
                    )}
                    <div className="w-full h-0.5 bg-default"></div>
                </div>
                <div className="mx-auto w-full max-w-xl">
                    {cart.length > 0 ? (
                        <>
                            <ul className="flex flex-col gap-2">
                                {cart.map((item, index) => (
                                    <li key={index}>
                                        <CartItem
                                            item={item}
                                            onRemove={() => setPendingAction({ type: "remove", index })}
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
                                    onClick={() => setPendingAction({ type: "clear" })}
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
                {pendingAction && (
                    <ConfirmModal
                        title={pendingAction.type === "clear" ? "Clear cart" : "Remove item"}
                        message={
                            pendingAction.type === "clear"
                                ? "Clear all items in the cart?"
                                : `Remove ${cart[pendingAction.index]?.productName ?? "this item"} from the cart?`
                        }
                        confirmLabel={pendingAction.type === "clear" ? "Clear cart" : "Remove"}
                        cancelLabel="Cancel"
                        onConfirm={handleConfirmPendingAction}
                        onClose={() => setPendingAction(null)}
                    />
                )}
            </ThreeColumnLayout>
        </>
    );
}
