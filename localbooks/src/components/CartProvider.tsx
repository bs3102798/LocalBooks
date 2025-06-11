"use client";

import { createContext, useState, 
    //useState 
} from "react";

export const CartContext = createContext({});

export default function CartProvider({ children }: { children: React.ReactNode }) {
  const [cartProducts, setCartProducts] = useState([]);

  function addToCart(product, size=null, extras=[] ) {

    setCartProducts(prevProducts => {
        const cartProduct = {...product, size, extras}
        const newProducts = [...prevProducts, cartProduct ]
        return newProducts
    })

  }

  return (
    <CartContext.Provider value={{
        cartProducts, setCartProducts,
     }}>
      {children}
    </CartContext.Provider>
  );
}