function getCart() {
  const data: any = localStorage.getItem("react-shop-cart");
  console.log(JSON.parse(data))
  if (data) {
    console.log(data);
    return data;
  } else {
    console.log("Cart is empty...");
  }
}
type CartArray = Array<string>
function addToCart() {
  const currentCart = localStorage.getItem("react-shop-cart");
  console.log(currentCart)
  // add to current, then set localstorage
  const foo: CartArray = ["1", "2"]
  localStorage.setItem("react-shop-cart", JSON.stringify(foo))
}
function removeFromCart() {
  // check current, store on state
  // from state, remove selected
  // set localstorage
  localStorage.removeItem("react-shop-cart")
}

export { getCart, addToCart, removeFromCart };
