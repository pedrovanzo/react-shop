import ProductInterface from "../interfaces/product";
import productsList from "./productsList.json";

export const PRODUCTS = productsList as ProductInterface[];

export function getProductByName(name: string | undefined) {
    return PRODUCTS.find((product) => product.name === name);
}
export function getProductById(id: string | undefined) {
    return PRODUCTS.find((product) => product.id === id);
}
export function getChildProducts(parentId: string) {
    return PRODUCTS.filter((product) => product.parentId === parentId);
}
// Products in the same topic, excluding the product itself and its children (listed as subtopics)
export function getRelatedProducts(product: ProductInterface) {
    return PRODUCTS.filter(
        (item) =>
            item.category === product.category &&
            item.id !== product.id &&
            item.parentId !== product.id
    ).sort((a, b) => a.name.localeCompare(b.name, undefined, { sensitivity: "base" }));
}
