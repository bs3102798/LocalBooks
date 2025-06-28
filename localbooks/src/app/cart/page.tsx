/* eslint-disable react/jsx-key */
'use client'
import { CartContext } from "@/components/CartProvider"
import { useContext } from "react"

export default function Cart() {
    const {cartProducts} =  useContext(CartContext)
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