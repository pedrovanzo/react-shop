import { createContext, useContext } from "react";
export interface CartProduct {
    productName: string;
    productImg?: string;
}
interface CartContextType {
    cart: CartProduct[];
    setCart: React.Dispatch<React.SetStateAction<CartProduct[]>>;
}
export const CartContext = createContext<CartContextType | undefined>(undefined);
export const useCart = (): CartContextType => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error("useCart must be used within a CartProvider");
    }
    return context;
};
