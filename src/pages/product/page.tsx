import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import LoadingSpinner from "../../components/loading/spinner";
import { useProductContext } from "../../contexts/cart";
import Navbar from "../../components/navigation/navbar";
import ProductInterface from "../../interfaces/product";
export default function Product() {
    const location = useLocation();
    const productFromPreviousPage: ProductInterface = location.state?.data;
    const navigate = useNavigate();
    const [userIsLoading, setUserIsLoading] = useState(true);
    const [isDocLoading, setIsDocLoading] = useState<boolean>(true);
    const { setCart } = useProductContext();
    useEffect(() => {
        setInterval(() => {
            setInterval(() => {
                setUserIsLoading(false);
            }, 300);
            setIsDocLoading(false);
        }, 300);
    }, [userIsLoading]);
    if (isDocLoading)
        return (
            <div className="absolute inset-0 w-full h-screen flex items-center justify-center">
                <LoadingSpinner />
            </div>
        );
    return (
        <>
            <Navbar />
            <div>
                <img
                    src={productFromPreviousPage?.heroImage}
                    alt={productFromPreviousPage?.name}
                    className="size-60"
                />
            </div>
            <div className="text-default text-2xl">
                {productFromPreviousPage?.name}
            </div>
            <div className="text-default text-2xl">
                {productFromPreviousPage?.description}
            </div>
            <div className="text-default">
                Description: {productFromPreviousPage.interactions ? productFromPreviousPage.interactions[0].interaction : null}
            </div>
            {userIsLoading ? (
                <LoadingSpinner text="loading user" />
            ) : (
                <>
                    <button
                        onClick={() => {
                            if (window.confirm("Confirm product to cart?")) {
                                let beforeCurrentCart =
                                    localStorage.getItem("react-shop-cart");
                                if (beforeCurrentCart === null)
                                    beforeCurrentCart = "[]";
                                let currentCart: any =
                                    JSON.parse(beforeCurrentCart);
                                currentCart.push({
                                    productName:
                                        productFromPreviousPage?.name,
                                    productImg:
                                        productFromPreviousPage
                                            ?.heroImage,
                                });
                                localStorage.setItem(
                                    "react-shop-cart",
                                    JSON.stringify(currentCart)
                                );
                                setCart(currentCart);
                                window.alert(productFromPreviousPage?.name + " added to cart!")
                            }
                        }}
                        className="py-1 px-2 bg-blue-500 text-white rounded-md"
                    >
                        Add to cart
                    </button>
                </>
            )}
            <div>
                <button
                    onClick={() => {
                        navigate(-1);
                    }}
                    className="text-default"
                >
                    return
                </button>
            </div>
        </>
    );
}
