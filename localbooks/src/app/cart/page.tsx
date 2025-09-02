/* eslint-disable react/jsx-key */
'use client'
import AddressInputs from "@/components/AddressInputs"
import { CartContext, cartProductPrice } from "@/components/CartProvider"
//import { Address } from "@/models/Address"
//import SubmitButton from "@/components/SubmitButton"
import { faTrash } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
//import DeleteAdButton from "@/components/DeletButton"
import Image from "next/image"
import { SetStateAction, useContext, useState } from "react"

export default function Cart() {
    const { cartProducts, removeCartProduct } = useContext(CartContext);

    const [address, setAddress] = useState('')
    const [city, setCity] = useState('')
    const [phone, setPhone] = useState('')
    const [country, setCountry] = useState('')
    const [postalCode, setPostalCode] = useState('')
    const [streetAddress, setStreetAddress] = useState('')



    function handleAddressChange(propName: string, value: SetStateAction<string>) {
        if (propName === 'phone') setPhone(value)
        if (propName === 'city') setCity(value)
        if (propName === 'country') setCountry(value)
        if (propName === 'streetAddress') setStreetAddress(value)
        if (propName === 'postalCode') setPostalCode(value)

        console.log(handleAddressChange)

    }



    let Subtotal = 0;

    for (const p of cartProducts) {
        // console.log(cartProductPrice(p))
        Subtotal += cartProductPrice(p)
    }

    //console.log(cartProducts)

    async function proceedToCheckout(ev) {
        //shoppiing cart products   
         await fetch('/api/checkout' , {
            method: "POST", 
            headers: {'Content-Type:' : "application/json"},
            body: JSON.stringify({
                address,
                cartProducts,
            })
        });
        const link = await response.json()
        window.location = link
        //go to stripe

    }
    return (
        <>
            <section className="mt-8">

                <h1 className="items-center">Checkout</h1>
                <div className="grid gap-4 grid-cols-2">
                    <div>
                        Products
                        {cartProducts?.length === 0 && (
                            <div>No Products in your cart</div>
                        )}
                        {cartProducts?.length > 0 && cartProducts.map((product: any, index: any) => (
                            <div className="flex gap-4 mb-2 border-b py-2 items-center">
                                <div className="w-24">
                                    <Image width={"240"} height={"240"}
                                        //  src={product.files}
                                        src={product.files?.[0]?.url || "/placeholder.png"}
                                        alt={product.name} />
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

                                <button className="p-2" type="button" onClick={() => removeCartProduct(index)}>
                                    <FontAwesomeIcon icon={faTrash} />

                                    {/* <DeleteAdButton id={product._id} /> */}
                                    {/* look at route.ts and find out how to add product._id to the delete
                                    request it should be in the line const adDoc */}
                                </button>

                            </div>
                        ))}
                        
                        <div className="py-4 justify-end pr-12 flex items-center">
                            <div className="text-gray-500">
                                SubTotal: <br />
                                Delivery: <br />
                                Total: 
                            </div>
                            <div className="text-lg font-semibold pl-2 text-right">
                                ${Subtotal} <br /> 
                                $5 <br />
                                ${Subtotal + 5}
                            </div>
                        </div>
                        {/* <div className="py-4 text-right pr-12">
                            <span className="text-gray-500">
                                Delivery:
                            </span>
                            <span className="text-lg font-semibold pl-2">
                                $5
                            </span>
                        </div> */}
                    </div>
                    <div className="bg-gray-200 p-4 rounded-lg">
                        <h2>checkout</h2>
                        <form onSubmit={proceedToCheckout} >

                            <AddressInputs
                                adressProps={{ phone, streetAddress, postalCode, city, country }}
                                setAddressProp={handleAddressChange}
                            />


                            <button className="bg-[#3F2E32] mt-2 text-white px-6 py-2 rounded font-bold w-full" type="submit">
                                Pay ${Subtotal + 5}
                            </button>
                            {/* <SubmitButton >Pay ${total} </SubmitButton> */}
                        </form>

                    </div>
                </div>
            </section>
        </>
    )
}