import { useNavigate, useParams } from "react-router";
import {
    SIMULATED_DELAY,
    useSimulatedLoading,
} from "../../hooks/useSimulatedLoading";
import LoadingSpinner from "../../components/loading/spinner";
import { useCart } from "../../contexts/cartContext";
import Navbar from "../../components/navigation/navbar";
import Button from "../../components/button/button";
import ProductInterface from "../../interfaces/product";
import NotFound from "../notFound/page";
import localData from "./../../data/productsList.json";
export default function Product() {
    const { name } = useParams();
    const product: ProductInterface | undefined = localData.find(
        (item: ProductInterface) => item.name === name
    );
    const navigate = useNavigate();
    // Document loads first, then user
    const isDocLoading = useSimulatedLoading();
    const userIsLoading = useSimulatedLoading(SIMULATED_DELAY * 2);
    const { setCart } = useCart();
    if (!product) return <NotFound />;
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
                    src={product?.heroImage}
                    alt={product?.name}
                    className="size-60"
                />
            </div>
            <div className="text-default text-2xl">
                {product?.name}
            </div>
            <div className="text-default text-2xl">
                {product?.description}
            </div>
            <div className="text-default">
                Description: {product.interactions ? product.interactions[0].interaction : null}
            </div>
            {userIsLoading ? (
                <LoadingSpinner text="loading user" />
            ) : (
                <>
                    <Button
                        variant="primary"
                        onClick={() => {
                            if (window.confirm("Confirm product to cart?")) {
                                setCart((currentCart) => [
                                    ...currentCart,
                                    {
                                        productName: product.name,
                                        productImg: product.heroImage,
                                    },
                                ]);
                                window.alert(product?.name + " added to cart!")
                            }
                        }}
                    >
                        Add to cart
                    </Button>
                </>
            )}
            <div>
                <Button variant="text" onClick={() => navigate(-1)}>
                    return
                </Button>
            </div>
        </>
    );
}
