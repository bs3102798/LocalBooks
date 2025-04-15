import { connect } from "@/libs/heplers";
import { AdModel } from "@/models/Ad";

export async function GET() {
    await connect();
    const adsDocs = await AdModel.find({})
    return Response.json(adsDocs)

}