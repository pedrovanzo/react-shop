import { Link } from "react-router-dom";
import dataList from "./../../data/productsList.json";
export default function Products() {
  const productsList = dataList;
  return (
    <>
      <ul className="flex flex-col gap-4">
        {productsList.map((product, index) => {
          return (
            <>
              <li key={index}>
                <Link
                  to={{ pathname: `/product/${product.productId}` }}
                  className="max-w-60 flex flex-row gap-2 items-center"
                >
                  <div className="shrink-0">
                    <img
                      src={product.productImages[0]}
                      alt={product.productName}
                      className="size-24 rounded-lg"
                    />
                  </div>
                  <div>
                    <div className="text-default text-2xl">
                      {product.productPrice}
                    </div>
                    <div className="text-default text-sm">
                      {product.productName}
                    </div>
                  </div>
                </Link>
              </li>
            </>
          );
        })}
      </ul>
    </>
  );
}
