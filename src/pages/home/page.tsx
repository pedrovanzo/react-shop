import { useEffect, useState } from "react";
import { fetchData } from "./connection";
export default function Home() {
  const [products, setProducts] = useState([null]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchData().then((productsParameter) => {
      try {
        const productsData: any = [];
        productsParameter.forEach((element: any) => {
          productsData.push(element.data());
        });
        setProducts(productsData);
      } catch (err: any) {
        setError(err);
      }

      setLoading(false);
    });
  }, []);

  if (loading) return <p className="text-default">Loading...</p>;
  if (error) return <p className="text-default">Error: {error}</p>;

  return (
    <>
      {console.log("FROM UI", products)}
      <ul className="flex flex-col gap-4">
        {products.length != 0 ? (
          products.map((product: any, index) => {
            return (
              <>
                <li className="flex flex-row gap-2" key={index}>
                  <img
                    src={product.productImages[0]}
                    alt={product.productName}
                    className="size-16 rounded-md"
                  />
                  <div className="text-default">{product.productName}</div>
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
