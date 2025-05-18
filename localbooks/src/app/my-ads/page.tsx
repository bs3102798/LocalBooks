'use server'

import { getServerSession } from "next-auth"
import { authOptions } from "../api/auth/[...nextauth]/route"
import { connect } from "@/libs/heplers";
import { AdModel } from "@/models/Ad";

export default async  function MyAds() {
    const session = await getServerSession(authOptions);
   await connect();
   AdModel.find({userEmail:session?.user?.email})
    return (
        <>
            <div>my ads</div>
        </>
    )

}