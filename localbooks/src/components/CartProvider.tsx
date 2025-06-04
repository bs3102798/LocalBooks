"use client";

import { createContext, 
    //useState 
} from "react";

export const CartContext = createContext({});

export default function CartProvider({ children }: { children: React.ReactNode }) {
  //const [cart, setCart] = useState([]);

  return (
    <CartContext.Provider value={{ }}>
      {children}
    </CartContext.Provider>
  );
}