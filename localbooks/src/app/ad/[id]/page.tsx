'use server';

import UploadThumbnail from "@/components/UploadThumbnail";
import UploadView from "@/components/UploadView";
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
        <div className="flex absolute inset-0 top-16">
            <div className="grow bg-black text-white flex flex-col">
                <div className="grow flex items-center p-4">
                    {adDoc.files?.length > 0 && (
                        <div>
                            <UploadView file={adDoc.files[0]}/>
                        </div>
                    )}
                </div>
                <div className="p-4 flex gap-4 shrink-0">
                    {adDoc.files.map((file, index) => (
                        <div className="size-14" key={index}>
                            <UploadThumbnail file={file}  />

                        </div>

                    ))}

                </div>
            </div>
            <div className="w-2/5 p-8 grow shrink-0">
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