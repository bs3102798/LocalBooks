import { connect } from "@/libs/heplers";
import { Ad, AdModel } from "@/models/Ad";
import { FilterQuery } from "mongoose";

export async function GET(req: Request,) {
    await connect();
    
    const {searchParams} = new URL(req.url)
    
    const filter: FilterQuery<Ad> = {};

    const phrase = searchParams.get('phrase') || null
    
    if (phrase) {
        filter.title = { $regex: '.*' + searchParams.get('phrase') + '.*', $options: 'i' }
    }
    const adsDocs = await AdModel.find(filter, null, { sort: { createdAt: -1 } })
    return Response.json(adsDocs)

}