
'use client'
import AdTextInputs from "@/components/AdTextsInputs";
import LocationPicker, { Location } from "@/components/LocationPicker";
import UploadArea from "@/components/UploadArea";
//import MapPicker from 'react-google-map-picker';
import { faMapPin } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { UploadResponse } from "imagekit/dist/libs/interfaces";
import {  useState } from "react";

export default function NewBookPage() {
    const [files, setFiles] = useState<UploadResponse[]>([]);
    const [location, setLocation] = useState<Location>()
   
    return (
        <form action='' className="max-w-xl mx-auto grid  grid-cols-2 gap-12">
            <div className="grow pt-8">
                <UploadArea files={files} setFiles={setFiles} />

                <div className="mt-6">
                    <label htmlFor="">Where is it located</label>
                    <button className="w-full flex items-center gap-2 py-1 justify-center border border-[#3F2E56] text-[#3F2E56] uppercase font-bold rounded">
                        <FontAwesomeIcon icon={faMapPin} />
                        <span>
                            add location
                        </span>
                    </button>
                    <div className="mt-2 bg-gray-200 p-4 min-h-12 rounded text-gray-400">
                        {JSON.stringify(location)}
                        <LocationPicker onChange={location => setLocation(location)} />
                      
                    </div>
                </div>
            </div>

            <div className="grow pt-2">
                <AdTextInputs />

                <button className="mt-2 bg-[#3F2E56] text-white px-6 py-2 rounded font-bold">
                    POST BOOK
                </button>
            </div>
        </form>
    )

}