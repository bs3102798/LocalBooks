import { Schema } from "mongoose";

const adSchema = new Schema({
    title: String,
    price: Number,
    category: String,
    description: String,
    contact: String,


}, {
    timestamps: true,
})