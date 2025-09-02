//import mongoose from "mongoose"
//import { metadata } from "@/app/layout";
import {connect, stripe} from "@/libs/heplers"
//import stripe from 'stripe';(process.env.STRIPE_SK);


export async function POST(req: Request) {
    await connect();

    const {cartProducts, address} = await req.json() 

    const stripeSession = await stripe.checkout.session.create({
        line_items: [],
        mode: 'payment',
        customer_email: '',
        success_url: '',
        cancel_url: '',
        metadata:{orderId:null},
        shipping_options: [
            {
                shipping_rate_data: {
                    display_name: 'Delivery fee',
                    type: 'fixed_amount',
                    fixed_amount: {amount: 500, currency: 'USD'} ,
                }
            }
        ]
    })
}