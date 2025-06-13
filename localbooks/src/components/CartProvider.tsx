"use client";

import { createContext, useEffect, useState, 
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
  };

// export const CartContext = createContext({});
export const CartContext = createContext<CartContextType | undefined>(undefined);

export default function CartProvider({ children }: { children: React.ReactNode }) {

  const [cartProducts, setCartProducts] = useState<CartProduct[]>([]);

  const ls = typeof window !== "undefined" ? window.localStorage : null;

  useEffect(() => {

  } ,[cartProducts])

//   function addToCart(product, size=null, extras=[] ) {
    function addToCart(product: Omit<CartProduct, 'size' | 'extras'>, size: string | null = null, extras: string[] = []){

    setCartProducts(prevProducts => {

        const cartProduct: CartProduct = {...product, size, extras}

        const newProducts = [...prevProducts, cartProduct ]

        return newProducts
    })

  }

  return (
    <CartContext.Provider value={{
        cartProducts, setCartProducts, addToCart,
     }}>
      {children}
    </CartContext.Provider>
  );
}