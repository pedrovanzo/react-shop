import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import LoadingProductItemOfList from "../../components/list/item/loadingProduct";
import ProductItemOfList from "../../components/list/item/product";
import Navbar from "../../components/navigation/navbar";
import localData from "./../../data/productsList.json";
import ProductInterface from "../../interfaces/product";
export default function Products() {
    const [products, setProducts] = useState<ProductInterface[]>([]);
    console.log(localData);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        setInterval(() => {
            setProducts(localData);
            setLoading(false);
        }, 500);
        return;
    }, []);
    return (
        <>
            <Navbar />
            {loading ? (
                <>
                    <ul className="flex flex-col gap-4">
                        <li key={1}>
                            <LoadingProductItemOfList />
                        </li>
                        <li key={2}>
                            <LoadingProductItemOfList />
                        </li>
                        <li key={3}>
                            <LoadingProductItemOfList />
                        </li>
                    </ul>
                </>
            ) : (
                <ul className="flex flex-col gap-4">
                    {products.length != 0 ? (
                        products.map(
                            (product: ProductInterface, index: number) => {
                                return (
                                    <>
                                        <li key={index}>
                                            <Link
                                                to={{
                                                    pathname: `/product/${product.name}`,
                                                }}
                                                state={{ data: product }}
                                            >
                                                <ProductItemOfList
                                                    product={product}
                                                />
                                            </Link>
                                        </li>
                                    </>
                                );
                            }
                        )
                    ) : (
                        <div className="text-default">No products found :(</div>
                    )}
                </ul>
            )}
        </>
    );
}
