import { useParams, useNavigate, Link } from "react-router-dom";
import dataList from "./../../data/productsList.json";
import { useFirebaseAuth } from "../../contexts/auth";
export default function Product() {
  const navigate = useNavigate();
  const { id }: any = useParams();
  const product = dataList.find((p) => p.productId === parseInt(id));
  const user = useFirebaseAuth();
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
      {user ? (
        <button className="py-1 px-2 bg-blue-500 text-white rounded-md">
          Add to cart
        </button>
      ) : (
        <Link to={{ pathname: "/signin" }}>Sign in</Link>
      )}
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
