import { FaRegFileImage } from "react-icons/fa";
import ProductItemLayout from "./productItemLayout";

export default function LoadingProductItemOfList() {
  return (
    <ProductItemLayout
      className="animate-pulse"
      imageLabel="loading-image"
      image={<FaRegFileImage className="rotate-345 size-14 text-default/20" />}
      name="product name"
      price="price"
      delivery="delivery mode"
    />
  );
}
