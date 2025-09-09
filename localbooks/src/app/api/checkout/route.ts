//import mongoose from "mongoose"
//import { metadata } from "@/app/layout";
import { connect, stripe } from "@/libs/heplers"
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { Order } from "@/models/Order";
import { AdModel } from "@/models/Ad";
//import stripe from 'stripe';(process.env.STRIPE_SK);


export async function POST(req: Request) {
    await connect();

    const { cartProducts, address } = await req.json()

    const session = await getServerSession(authOptions);
    const userEmail = session?.user?.email

    const orderDoc = await Order.create({
        userEmail,
        ...address,
        cartProducts,
        paid: false,
    });

    const stripeLineItems = []
    // we dont have extra in the cart whole price
    for (const cartProduct of cartProducts) {
        const productInfo = await AdModel.findById(cartProduct._id)
        const productPrice = productInfo.price;
        //if (cartProduct.size) {
            //const size = productInfo.size
            //productInfo.size.find( size => size._id === cartProduct._size);
            //productPrice
            // += size.price;
        //}
        // if (cartProduct.extras?.length > 0) {
        //     for (const cartProductExtraThing of cartProduct.extras) {
        //         const extraThingInfo = productInfo.extraIngredientPrices
        //         .find(extra => extra._id === extraThingInfo._id);
        //         productPrice
        //     }
        // }
        //we dont have extas in the cart whole price

        const productName = cartProduct.name
        stripeLineItems.push({
            quantity: 1,
            price_data: {
                currency: "USD",
                product_data: {
                    name: productName,
                },
                unit_amount: productPrice * 100
            }
        })
    }



    const stripeSession = await stripe.checkout.session.create({
        line_items: stripeLineItems,
        mode: 'payment',
        customer_email: userEmail,
        success_url: process.env.NEXTAUTH_URL + 'cart?success=1',
        cancel_url: process.env.NEXTAUTH_URL + 'cart?canceled=1',
        metadata: { orderId: orderDoc._id },
        shipping_options: [
            {
                shipping_rate_data: {
                    display_name: 'Delivery fee',
                    type: 'fixed_amount',
                    fixed_amount: { amount: 500, currency: 'USD' },
                }
            }
        ]
    })
}