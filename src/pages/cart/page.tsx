import { useEffect } from "react";
import { useProductContext } from "../../contexts/cart";
import { Link, Navigate } from "react-router-dom";
import { useFirebaseAuth } from "../../contexts/auth";
import { IoCart, IoCartOutline } from "react-icons/io5";
import LoadingSpinnerIcon from "../../components/loading/spinnerIcon";

export default function Cart() {
  const { cart, setCart } = useProductContext();
  const { user, userIsLoading } = useFirebaseAuth();
  function handleClearCart() {
    if (window.confirm("Clear all items on the cart?")) {
      localStorage.removeItem("react-shop-cart");
      localStorage.setItem("react-shop-cart", "[]");
      setCart([]);
    }
  }
  useEffect(() => {}, [setCart]);
  if (userIsLoading)
    return (
      <div className="my-2 flex flex-row gap-4 items-center">
        {/* <IoCartOutline className="text-default" size="24" /> */}
        <LoadingSpinnerIcon size="default" variant="default" />
        <div className="w-full h-0.5 bg-default"></div>
      </div>
    );
  if (!user) return <Navigate to={{ pathname: "/" }} />;
  return (
    <>
      <div className="my-2 flex flex-row gap-2 items-center">
        {cart.length > 0 ? (
          <IoCart className="text-default" size="24" />
        ) : (
          <IoCartOutline className="text-default" size="24" />
        )}
        <div className="w-full h-0.5 bg-default"></div>
      </div>
      {cart.length > 0 ? (
        <>
          <ul>
            {cart.map((item, index) => {
              return (
                <li key={index} className="flex flex-row gap-2">
                  <div className="text-default">{item.productPrice}</div>
                  <div className="text-default">{item.productName}</div>
                  <div className="text-blue-500">
                    <Link to={{ pathname: `/product/${item.id}` }}>
                      product page
                    </Link>
                  </div>
                </li>
              );
            })}
          </ul>
          <button
            onClick={() => {
              handleClearCart();
            }}
            className="my-2 p-2 rounded  border-2 border-red-500 leading-none text-default"
          >
            Clear current cart
          </button>
        </>
      ) : (
        <div className="my-2 flex flex-row gap-2 items-center leading-none text-default">
          Cart is empty. Add items on the
          <Link to={{ pathname: "/products" }} className="text-blue-500">
            products page
          </Link>
        </div>
      )}
    </>
  );
}
