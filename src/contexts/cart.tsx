import { useEffect, useState, ReactNode } from "react";
import { CartContext, CartProduct } from "./cartContext";
const CART_STORAGE_KEY = "react-shop-cart";
interface CartProviderProps {
    children: ReactNode;
}
export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
    const [cart, setCart] = useState<CartProduct[]>(() =>
        JSON.parse(localStorage.getItem(CART_STORAGE_KEY) ?? "[]")
    );
    // Single place where the cart is persisted
    useEffect(() => {
        localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    }, [cart]);
    return (
        <CartContext.Provider value={{ cart, setCart }}>
            {children}
        </CartContext.Provider>
    );
};
