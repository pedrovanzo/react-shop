import { FaRegFileImage } from "react-icons/fa";

export default function LoadingProductItemOfList() {
  return (
    <>
      <div className="flex flex-row gap-2 animate-pulse">
        <div
          className="flex items-center justify-center size-24 rounded-md shadow bg-default/5"
          aria-label="loading-image"
        >
          <FaRegFileImage className="rotate-345 size-14 text-default/20" />
        </div>
        <div className="flex flex-col gap-1 justify-center text-default">
          <div className="text-sm leading-none" aria-label="Product Name">
            product name
          </div>
          <div
            className="text-2xl leading-none italic font-semibold"
            aria-label="Product Price"
          >
            price
          </div>
          <div
            className="flex flex-row gap-2 items-center text-sm leading-none"
            aria-label="Delivery mode"
          >
            delivery mode
          </div>
        </div>
      </div>
    </>
  );
}
