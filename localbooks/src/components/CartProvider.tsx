"use client";

import { createContext, useState, 
    //useState 
} from "react";

export const CartContext = createContext({});

export default function CartProvider({ children }: { children: React.ReactNode }) {
  const [cartProducs, setCartProducts] = useState([]);

  return (
    <CartContext.Provider value={{
        cartProducs, setCartProducts,
     }}>
      {children}
    </CartContext.Provider>
  );
}