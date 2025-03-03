import { useParams, useNavigate } from "react-router-dom";
import dataList from "./../../data/productsList.json";
export default function Product() {
  const navigate = useNavigate();
  const { id }: any = useParams();
  const product = dataList.find((p) => p.productId === parseInt(id));
  console.log(id);
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
      <div>
        <button
          onClick={() => {
            navigate(-1);
          }}
          className="text-default"
        >
          return to products list
        </button>
      </div>
    </>
  );
}
