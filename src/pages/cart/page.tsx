import { useEffect, useState } from "react";
import { useProductContext } from "../../contexts/cart";
import { Link } from "react-router-dom";
import { IoCart, IoCartOutline } from "react-icons/io5";
import Navbar from "../../components/navigation/navbar";

export default function Cart() {
    const { cart, setCart } = useProductContext();
    const [totalProductValue, setTotalProductValue] = useState<number>(0);
    const [totalShippingValue, setTotalShippingValue] = useState<number>(0);
    let productSum: number = 0;
    let shippingSum: number = 0;
    function handleClearCart() {
        if (window.confirm("Clear all items on the cart?")) {
            localStorage.removeItem("react-shop-cart");
            localStorage.setItem("react-shop-cart", "[]");
            setCart([]);
            setTotalProductValue(0);
            setTotalShippingValue(0);
        }
    }
    function handleRemoveItem(index: number) {
        // localStorage and setCart must receive new instance of array. Otherwise the same reference will be used causing unexpected behaviour
        if (window.confirm("Confirm remove item?")) {
            let auxArray: typeof cart = [];
            for (let j = 0; j < cart.length; j++) {
                auxArray.push(cart[j]);
            }
            auxArray.splice(index, 1);
            setCart(auxArray);
            productSum -= cart[index]?.productPrice;
            shippingSum -= cart[index]?.productShipping;
            setTotalProductValue(productSum);
            setTotalShippingValue(shippingSum);
            localStorage.removeItem("react-shop-cart");
            localStorage.setItem("react-shop-cart", JSON.stringify(auxArray));
        }
    }
    useEffect(() => {
        for (let i = 0; i < cart.length; i++) {
            productSum += cart[i].productPrice;
            shippingSum += cart[i].productShipping;
        }
        setTotalProductValue(productSum);
        setTotalShippingValue(shippingSum);
    }, [setCart, totalProductValue]);
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
                            {cart.map((item, index) => {
                                return (
                                    <li
                                        key={index}
                                        className="py-4 px-4 bg-default/5 flex flex-row gap-2 items-center justify-between leading-none"
                                    >
                                        <div className="flex gap-6">
                                            <div className="flex flex-col gap-0.25 items-start justify-center">
                                                <div className="text-default">
                                                    <span className="text-sm me-1">
                                                        Price:
                                                    </span>
                                                    $
                                                    <span className="font-semibold">
                                                        {item.productPrice}
                                                    </span>
                                                </div>
                                                <div className="text-default">
                                                    <span className="text-sm me-1">
                                                        Shipping: $
                                                    </span>
                                                    <span>
                                                        {item.productShipping}
                                                    </span>
                                                </div>
                                            </div>
                                            <div
                                                className="my-auto text-blue-500 line-clamp-1"
                                                title={item.productName}
                                                aria-label={item.productName}
                                            >
                                                <Link
                                                    to={{
                                                        pathname: `/product/${item.id}`,
                                                    }}
                                                    state={{ data: item }}
                                                >
                                                    {item.productName}
                                                </Link>
                                            </div>
                                        </div>
                                        <div>
                                            <button
                                                className="text-default"
                                                onClick={() => {
                                                    handleRemoveItem(item.id);
                                                }}
                                            >
                                                Remove
                                            </button>
                                        </div>
                                    </li>
                                );
                            })}
                        </ul>
                        <div className="my-2 flex flex-row gap-2 items-center justify-between leading-none">
                            <div className="flex flex-col justify-center text-default">
                                <div><span className="text-sm">Products Total:</span> ${totalProductValue}</div>
                                <div><span className="text-sm">Shipping Total:</span> ${totalShippingValue}</div>
                                <div>
                                    <span className="text-sm">Purchase Total: $</span>
                                    {totalProductValue + totalShippingValue}
                                </div>
                            </div>
                            <button
                                onClick={() => {
                                    handleClearCart();
                                }}
                                className="my-2 leading-none text-default underline"
                            >
                                Clear current cart
                            </button>
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
