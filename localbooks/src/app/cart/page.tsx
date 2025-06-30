/* eslint-disable react/jsx-key */
'use client'
import { CartContext } from "@/components/CartProvider"
import Image from "next/image"
import { useContext } from "react"

export default function Cart() {
    const { cartProducts } = useContext(CartContext)
    
    //console.log(cartProducts)
    return (
        <>
            <section className="mt-8">

                <h1>Checkout</h1>
                <div className="grid gap-4 grid-cols-2">
                    <div>
                        Products
                        {cartProducts?.length === 0 && (
                            <div>No Products in your cart</div>
                        )}
                        {cartProducts?.length > 0 && cartProducts.map((product: any) => (
                            <div>
                                <div>
                                    <Image width={"240"} height={"240"}
                                    //  src={product.files}
                                     src={product.url?.[0]?.url || "/placeholder.png"}
                                      alt={''} />
                                </div>
                                {/* {product.price}
                                {product.id}
                                {product.description} */}
                                
                                
                                {product.name}

                            </div>
                        ))}
                    </div>
                    <div>right</div>
                </div>
            </section>
        </>
    )
}