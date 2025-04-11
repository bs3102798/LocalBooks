'use server';

import { connect } from "@/libs/heplers";
import { AdModel } from "@/models/Ad";

type Props = {
    params: {
        id: string;
    };
    searchParams: { [key: string]: string };
}
export default async function AdBookPage(args: Props) {
    await connect();
    const adDoc = await AdModel.findById(args.params.id);

    if (!adDoc) {
        return 'Not found!'
    }

    return (
        <div className="flex absolute inset-0 top-14">
            <div className="grow bg-black text-white">
                <div>big photo</div>
                <div className="">thumbnail</div>
                </div>
            <div className="w-2/5 p-8">
                <h1 className="text-lg font-bold">

                    {adDoc.title}
                </h1>
            <label>category</label>
            <p>{adDoc.category}</p>
                <label>description</label>
                <p className="text-sm">{adDoc.description}</p>
                <label>contact</label>
                <p>{adDoc.contact}</p>

            </div>
        </div>
    )
}