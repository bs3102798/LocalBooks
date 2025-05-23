'use server';

import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import DeleteAdButton from "@/components/DeletButton";

import Gallary from "@/components/Gallery";
import LocationMap from "@/components/Locationmap";
import { connect, formateDate, formatMoney } from "@/libs/heplers";
import { AdModel } from "@/models/Ad";
import { faPencil, 

} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getServerSession } from "next-auth";
import Link from "next/link";

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
                    <div className="mt-2 flex gap-2">

                        <Link href={ `/edit/${adDoc._id}`} className=" border border-blue-500 rounded-md py-1 px-2 inline-flex gap-1 items-center">
                            <FontAwesomeIcon icon={faPencil} />
                            <span>Edit</span>
                        </Link>
                       
                        <DeleteAdButton id={adDoc._id} />
                    </div>
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
                <p className="mt-4 text-xs text-gray-400">
                    Posted: {formateDate(adDoc.createdAt)} <br />
                    {/* Last update: {formateDate(adDoc.updateAt)} */}
                </p>

            </div>
        </div>
    )
}