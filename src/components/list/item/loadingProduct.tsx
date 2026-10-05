import ProductItemLayout from "./productItemLayout";

export default function LoadingProductItemOfList({ condensed = false }: { condensed?: boolean }) {
  return (
    <ProductItemLayout
      className="animate-pulse"
      imageLabel="loading-image"
      title="product name"
      description="product summary"
      condensed={condensed}
    />
  );
}
