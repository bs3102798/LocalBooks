'use server';

import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Gallary from "@/components/Gallery";
import LocationMap from "@/components/Locationmap";
import { connect, formatMoney } from "@/libs/heplers";
import { AdModel } from "@/models/Ad";
import { getServerSession } from "next-auth";

type Props = {
    params: {
        id: string;
    };
    searchParams: { [key: string]: string };
}
export default async function AdBookPage(args: Props) {
    await connect();
    const adDoc = await AdModel.findById(args.params.id);
    const session = await getServerSession(authOptions)
    //console.log(adDoc)

    if (!adDoc) {
        return 'Not found!'
    }

    return (
        <div className="flex absolute inset-0 top-16">
            <div className="w-3/5 grow bg-black text-white flex flex-col relative">
                <Gallary files={adDoc.files} />
            </div>

            <div className="w-2/5 p-8 grow shrink-0 overflow-y-scroll">
                <h1 className="text-lg font-bold">
                    {adDoc.title}
                </h1>
                {session && session?.user?.email === adDoc.userEmail && (
                    <button className="bg-green-400">edit</button>
                )}
                <label>price</label>
                <p>{formatMoney(adDoc.price)}</p>
                <label>category</label>
                <p>{adDoc.category}</p>
                <label>description</label>
                <p className="text-sm">{adDoc.description}</p>
                <label>contact</label>
                <p>{adDoc.contact}</p>
                <label>Location</label>
                <LocationMap className="w-full h-64" location={adDoc.location} />
            
            </div>
        </div>
    )
}