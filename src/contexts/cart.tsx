import { createContext, useContext, useState, ReactNode } from "react";
interface Product {
    id: number;
    productName: string;
    productImg: string;
    productPrice: number;
    productShipping: number;
}
interface ProductContextType {
    cart: Product[];
    setCart: React.Dispatch<React.SetStateAction<Product[]>>;
}
const ProductContext = createContext<ProductContextType | undefined>(undefined);
interface ProductProviderProps {
    children: ReactNode;
}
export const ProductProvider: React.FC<ProductProviderProps> = ({
    children,
}) => {
    let currentCart = localStorage.getItem("react-shop-cart");
    if (currentCart === null) {
        currentCart = "[]";
    }
    const [cart, setCart] = useState<Product[]>(JSON.parse(currentCart));
    return (
        <ProductContext.Provider value={{ cart, setCart }}>
            {children}
        </ProductContext.Provider>
    );
};
export const useProductContext = (): ProductContextType => {
    const context = useContext(ProductContext);
    if (!context) {
        throw new Error(
            "useProductContext must be used within a ProductProvider"
        );
    }
    return context;
};
