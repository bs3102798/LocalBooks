'use client';
import Link from "next/link";
import UploadThumbnail from "./UploadThumbnail";
import { redirect } from "next/navigation";
import { Ad } from "@/models/Ad";

export default function BookItem({ ad }: { ad: Ad }) {
    return (
        <>
            <div
                
                className="border border-gray-500 min-h-24 flex-col justify-start">

                {ad.files?.length > 0 && (
                    <div className="rounded-md overflow-hidden">

                        <UploadThumbnail onClick={() => redirect(`/ad/${ad._id}`)} file={ad.files[0]} />

                    </div>
                )}
                <div>
                    <p className="mt-1 font-bold">${ad.price}</p>
                    <Link href={`/ad/${ad._id}`}>{ad.title}</Link>
                    <button
                    onClick={() => {}}
                    className="mt-4 bg-blue-300 text-white rounded-full px-2 py-2"
                    >
                        add to cart ${ad.price}
                    </button>
                </div>
            </div>
        </>
    )
}