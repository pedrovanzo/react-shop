export default function ProductItemOfList(props: any) {
  let product = props.product;
  return (
    <>
      <div className="flex flex-row gap-2">
        <img
          src={product.productImages[0]}
          alt={product.productName}
          className="size-24 rounded-md"
        />
        <div className="flex flex-col gap-1 justify-center text-default">
          <div className="text-sm leading-none" aria-label="Product Name">
            {product.productName}
          </div>
          <div
            className="text-2xl leading-none italic font-semibold"
            aria-label="Product Price"
          >
            ${product.productPrice}
          </div>
          <div
            className="flex flex-row gap-2 items-center text-sm leading-none"
            aria-label="Delivery mode"
          >
            deliver ready
          </div>
          {product.productShipping === 0 ? (
            <div
              className="flex flex-row gap-2 items-center text-green-600 font-semibold text-sm leading-none"
              aria-label="Free Shipping"
            >
              free shiping
            </div>
          ) : (
            <div
              className="flex flex-row gap-2 items-center text-sm leading-none"
              aria-label="Shipping Cost"
            >
              shipping: ${product.productShipping}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
