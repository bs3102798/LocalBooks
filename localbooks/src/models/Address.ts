import { model, Model, models, Schema } from "mongoose";

export type Address = {
    phone: string;
    streetAddress: string;
    postalCode: string;
    city: string;
    country: string;
}

export const addressSchema = new Schema<Address>({
    phone: String,
    streetAddress: String,
    postalCode: String,
    city: String,
    country: String,

})

export const AddressModel = (models?.Address as Model<Address>) || model<Address>('Address', addressSchema);