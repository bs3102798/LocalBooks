"use client";

import {
    createContext, useEffect, useState,
    //useState 
} from "react";

export type CartProduct = {
    id: string;
    name: string;
    price: number;
    size?: string | null;
    extras?: string[];
};

export type CartContextType = {
    cartProducts: CartProduct[];
    setCartProducts: React.Dispatch<React.SetStateAction<CartProduct[]>>;
    addToCart: (
        product: Omit<CartProduct, "size" | "extras">,
        size?: string | null,
        extras?: string[]
    ) => void;
    removeCartProduct: (indexToRemove: number) => void;
    clearCart: () => void
};

// export const CartContext = createContext({});
export const CartContext = createContext<CartContextType | undefined>(undefined);

export default function CartProvider({ children }: { children: React.ReactNode }) {

    const [cartProducts, setCartProducts] = useState<CartProduct[]>([]);

    const ls = typeof window !== "undefined" ? window.localStorage : null;

    useEffect(() => {
        if (ls && ls.getItem('cart')) {
            setCartProducts(JSON.parse(ls.getItem('cart')))
        }


    }, [])
    function clearCart() {
        setCartProducts([]);
        saveCartProductsToLocalStorage([])
    }

    function removeCartProduct(indexToRemove: number) {
        setCartProducts(prevCartProducts => {
            const newCartProducts = prevCartProducts
                .filter((v, index) => index !== indexToRemove)
                saveCartProductsToLocalStorage(newCartProducts)
                return newCartProducts
        })

    }

    function saveCartProductsToLocalStorage(cartProducts: CartProduct[]) {

        if (ls) {
            ls.setItem('cart', JSON.stringify(cartProducts))

        }


    }


    //   function addToCart(product, size=null, extras=[] ) {
    function addToCart(product: Omit<CartProduct, 'size' | 'extras'>, size: string | null = null, extras: string[] = []) {

        setCartProducts(prevProducts => {

            const cartProduct: CartProduct = { ...product, size, extras }

            const newProducts = [...prevProducts, cartProduct]
            saveCartProductsToLocalStorage(newProducts)

            return newProducts
        })

    }

    return (
        <CartContext.Provider value={{
            cartProducts, setCartProducts, addToCart, 
            removeCartProduct, clearCart,
        }}>
            {children}
        </CartContext.Provider>
    );
}