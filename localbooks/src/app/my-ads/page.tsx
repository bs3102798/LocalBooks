'use server'

import { getServerSession } from "next-auth"
import { authOptions } from "../api/auth/[...nextauth]/route"
import { connect } from "@/libs/heplers";
import { AdModel } from "@/models/Ad";
import BookItem from "@/components/BookItem";

export default async function MyAds() {
    const session = await getServerSession(authOptions);
    const email = session?.user?.email;

    if (!email) {
        return 'no email found';
    }

    await connect();
    const adsDocs = await AdModel.find({ userEmail:email })
    const ads = adsDocs.map(ad => JSON.parse(JSON.stringify(ad)));
    return (
        <>
            <div className="container my-8 mx-auto">
                <h1 className="text-2xl font-bold mb-4">Your ads</h1>
                <div className="grid grid-cols-4 gap-x-2 gap-y-4">

                {ads?.map(ad => (
                    <BookItem key={ad._id?.toString()} ad={ad} />
                ))}
                </div>
              
            </div>
        </>

    )

}