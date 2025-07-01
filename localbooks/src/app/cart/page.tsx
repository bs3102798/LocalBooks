/* eslint-disable react/jsx-key */
'use client'
import { CartContext } from "@/components/CartProvider"
import DeleteAdButton from "@/components/DeletButton"
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
                            <div className="flex gap-4 mb-2 border-b py-2 items-center">
                                <div className="w-24">
                                    <Image width={"240"} height={"240"}
                                        //  src={product.files}
                                        src={product.url?.[0]?.url || "/placeholder.png"}
                                        alt={''} />
                                </div>
                                <div className="grow">
                                    <h2 className="font-semibold">
                                        {product.name}

                                    </h2>
                                    <div>
                                        <h3>
                                            Description:
                                        </h3>
                                        <div className="text-sm text-gray-500">
                                            {product.description}
                                        </div>
                                    </div>
                                </div>

                                <div>$
                                    {product.price}
                                </div>

                                <button className="p-2">
                                    <DeleteAdButton id={product._id} />

                                </button>

                            </div>
                        ))}
                    </div>
                    <div>right</div>
                </div>
            </section>
        </>
    )
}