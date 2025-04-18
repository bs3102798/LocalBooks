import { connect } from "@/libs/heplers";
import { Ad, AdModel } from "@/models/Ad";
import { FilterQuery } from "mongoose";

export async function GET(req: Request,) {
    await connect();
    //console.log(req)
    const url = new URL(req.url)
    //console.log(url.searchParams)

    const phrase = url.searchParams.get('phrase') || null
    //console.log({phrase})
    const filter: FilterQuery<Ad> = {};
    if (phrase) {
        filter.title = { $regex: '.*' + phrase + '.*', $options: 'i' }
    }
    const adsDocs = await AdModel.find(filter, null, { sort: { createdAt: -1 } })
    return Response.json(adsDocs)

}