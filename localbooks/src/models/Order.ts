import { model, models, Schema } from "mongoose";

const OrderSchema = new Schema({

    userEmail: {type: String},
    //not needed
    phone: String,
    streetAddress: String,
    postalCode: String, 
    country: String,
    //not needed

    cartProduts: Object,
    paid: {type: Boolean, default: false}
}, {timestamps: true})

export const Order = models?.Order || model("Order", OrderSchema)