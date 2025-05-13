// import { UploadResponse } from "imagekit/dist/libs/interfaces";
// import { Model, model, models, Schema } from "mongoose";

// export type Ad = {
//     _id: string,
//     title: string;
//     price: number;
//     category: string;
//     description: string;
//     contact: string;
//     files: UploadResponse[];
//     location: {
//         lat: number;
//         lng: number;
//     },
//     userEmail: string;
// }

// const adSchema = new Schema<Ad>({
//     title: String,
//     price: Number,
//     category: String,
//     description: String,
//     contact: String,
//     files: [Object],
//     location: Object,
//     userEmail: {type: String, require: true}


// }, {
//     timestamps: true,
// });

// //adSchema.index({location: '2dsphere'})

// //adSchema.ads.createIndex({ location: "2dsphere" });


// export const AdModel = (models?.Ad as Model<Ad>) || model<Ad>('Ad', adSchema);
import { UploadResponse } from "imagekit/dist/libs/interfaces";
import { Model, model, models, Schema } from "mongoose";

export type Ad = {
    _id: string,
    title: string;
    price: number;
    category: string;
    description: string;
    contact: string;
    files: UploadResponse[];
    location: {
        lat: number;
        lng: number;
    },
    userEmail: string;
}

const adSchema = new Schema<Ad>({
    title: String,
    price: Number,
    category: String,
    description: String,
    contact: String,
    files: [Object],
    location: {
        type: { type: String, enum: ['Point'], required: true }, // GeoJSON type
        coordinates: { type: [Number], required: true } // Array of [lng, lat]
    },
    userEmail: { type: String, required: true }
}, {
    timestamps: true,
});

// Create the 2dsphere index on the location field
adSchema.index({ location: "2dsphere" });

export const AdModel = (models?.Ad as Model<Ad>) || model<Ad>('Ad', adSchema);
