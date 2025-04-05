"use server"

import { AdModel } from "@/models/Ad";
import mongoose from "mongoose";

async function connect() {
    return mongoose.connect(process.env.MONGODB_URL as string)
}

export async function createAd(formData: FormData) {
    const { files, location, ...data } = Object.fromEntries(formData)
    await connect();
    await AdModel.create({
        files: JSON.parse(files as string),
        location: JSON.parse(location as string),
        ...data

    })

    //console.log({ files, location, data})
    return (true);
}