import { connect } from "@/libs/heplers";
import { Ad, AdModel } from "@/models/Ad";
import { FilterQuery } from "mongoose";

export async function GET(req: Request,) {
    await connect();
    //console.log(req)
    const {searchParams} = new URL(req.url)
    //console.log(url.searchParams)
    const filter: FilterQuery<Ad> = {};

    const phrase = searchParams.get('phrase') || null
    //console.log({phrase})
    if (phrase) {
        filter.title = { $regex: '.*' + searchParams.get('phrase') + '.*', $options: 'i' }
    }
    const adsDocs = await AdModel.find(filter, null, { sort: { createdAt: -1 } })
    return Response.json(adsDocs)

}