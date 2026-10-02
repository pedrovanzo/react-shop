import { useSimulatedLoading } from "../../hooks/useSimulatedLoading";
import { Link } from "react-router";
import LoadingProductItemOfList from "../../components/list/item/loadingProduct";
import ProductItemOfList from "../../components/list/item/product";
import Navbar from "../../components/navigation/navbar";
import localData from "./../../data/productsList.json";
import ProductInterface from "../../interfaces/product";
import { productPath } from "../../lib/productPath";
export default function Products() {
    const products: ProductInterface[] = localData;
    const loading = useSimulatedLoading();
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
            ) : products.length != 0 ? (
                <ul className="flex flex-col gap-4">
                    {products.map((product: ProductInterface) => {
                        return (
                            <li key={product.id}>
                                <Link
                                    to={{
                                        pathname: productPath(product.name),
                                    }}
                                >
                                    <ProductItemOfList product={product} />
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            ) : (
                <div className="text-default">No products found :(</div>
            )}
        </>
    );
}
