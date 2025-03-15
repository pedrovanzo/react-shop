import { useParams, useNavigate, Link } from "react-router-dom";
import { useFirebaseAuth } from "../../contexts/auth";
import { fetchData } from "./connection";
import { useEffect, useState } from "react";
import LoadingSpinner from "../../components/loading/spinner";
import { useProductContext } from "../../contexts/cart";
export default function Product() {
    const navigate = useNavigate();
    let id: any;
    id = useParams();
    const { user, userIsLoading } = useFirebaseAuth();
    const [product, setProduct] = useState<any>();
    const [isDocLoading, setIsDocLoading] = useState<boolean>(true);
    const { setCart } = useProductContext();
    useEffect(() => {
        fetchData(id).then((res) => {
            setProduct(res);
            setIsDocLoading(false);
        });
    }, []);
    if (isDocLoading)
        return (
            <div className="absolute inset-0 w-full h-screen flex items-center justify-center">
                <LoadingSpinner />
            </div>
        );
    return (
        <>
            <div>
                <img
                    src={product?.productImages[0]}
                    alt={product?.productName}
                    className="size-60"
                />
            </div>
            <div className="text-default text-2xl">{product?.productName}</div>
            <div className="text-default text-2xl">{product?.productPrice}</div>
            <div className="text-default">
                Description: {product?.productDescription}
            </div>
            <div className="text-default">
                Year of build: {product?.productYearOfProduction}
            </div>
            {userIsLoading ? (
                <LoadingSpinner text="loading user" />
            ) : (
                <>
                    {user ? (
                        <button
                            onClick={() => {
                                if (
                                    window.confirm("Confirm product to cart?")
                                ) {
                                    let beforeCurrentCart =
                                        localStorage.getItem("react-shop-cart");
                                    if (beforeCurrentCart === null)
                                        beforeCurrentCart = "[]";
                                    let currentCart: any =
                                        JSON.parse(beforeCurrentCart);
                                    currentCart.push({
                                        id: id.id,
                                        productName: product?.productName,
                                        productImg: product?.productImages[0],
                                        productPrice: product?.productPrice,
                                        productShipping: product?.productShipping
                                    });
                                    localStorage.setItem(
                                        "react-shop-cart",
                                        JSON.stringify(currentCart)
                                    );
                                    setCart(currentCart);
                                }
                            }}
                            className="py-1 px-2 bg-blue-500 text-white rounded-md"
                        >
                            Add to cart
                        </button>
                    ) : (
                        <Link to={{ pathname: "/signin" }}>Sign in</Link>
                    )}
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
