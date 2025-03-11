import { useEffect, useState } from "react";
import { fetchData } from "./connection";
import LoadingSpinner from "../../components/loading/spinner";
import { Link } from "react-router-dom";
import { useFirebaseAuth } from "../../contexts/auth";
import ProductItemOfList from "../../components/list/item/product";
import LoadingProductItemOfList from "../../components/list/item/loadingProduct";
export default function Home() {
  const [products, setProducts] = useState([null]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchData().then((productsParameter) => {
      try {
        const productsData: any = [];
        productsParameter.forEach((element: any) => {
          let productObjectAux: any = {};
          productObjectAux = element.data();
          productObjectAux.id = element.id;
          productsData.push(productObjectAux);
        });
        setProducts(productsData);
      } catch (err: any) {
        setError(err);
      }

      setLoading(false);
      // setLoading(true)
    });
  }, []);

  const { userIsLoading } = useFirebaseAuth();

  if (userIsLoading)
    return (
      <div className="absolute inset-0 bg-contrast/50 min-h-50 flex justify-center">
        <LoadingSpinner text="loading user..." />
      </div>
    );

  // if (user) return <Redirect />

  if (loading)
    return (
      <ul className="flex flex-col gap-4">
        <li>
          <LoadingProductItemOfList />
        </li>
        <li>
          <LoadingProductItemOfList />
        </li>
      </ul>
    );
  if (error) return <p className="text-default">Error: {error}</p>;

  return (
    <>
      {/* <LoadingSpinner /> */}
      <ul className="flex flex-col gap-4">
        {products.length != 0 ? (
          products.map((product: any, index) => {
            return (
              <>
                <li key={index}>
                  <Link to={{ pathname: `/product/${product.id}` }}>
                    <ProductItemOfList product={product} />
                    {/* <LoadingProductItemOfList /> */}
                  </Link>
                </li>
              </>
            );
          })
        ) : (
          <div className="text-default">No products found :(</div>
        )}
      </ul>
      <div className="text-default">login and presentation</div>
    </>
  );
}
