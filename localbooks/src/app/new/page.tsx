
'use client'
import AdTextInputs from "@/components/AdTextsInputs";
import LocationPicker, { Location } from "@/components/LocationPicker";
import UploadArea from "@/components/UploadArea";
//import MapPicker from 'react-google-map-picker';
import { faMapPin } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { UploadResponse } from "imagekit/dist/libs/interfaces";
import { useState } from "react";
import { createAd } from "../actions/adActions";

const locationDefault = {
    lat: 34.0522 , 
    lng: -118.2437 ,
}

export default function NewBookPage() {
    const [files, setFiles] = useState<UploadResponse[]>([]);
    const [location, setLocation] = useState<Location>(locationDefault)
    const [gpsCoords, setGpsCoords] = useState<Location|null>(null);

    function handleFindMyPostionClick() {
        navigator.geolocation.getCurrentPosition( ev => {
            //console.log("Location found:", ev.coords.latitude, ev.coords.longitude);
            const loation = {lat: ev.coords.latitude, lng: ev.coords.longitude}
            setLocation(loation)
            setGpsCoords(loation)
        }, console.error);
    }
    //console.log(handleFindMyPostionClick)
    async function handleSubmit(formData:FormData) {
       formData.set('location', JSON.stringify(location));

       formData.set('files', JSON.stringify(files));
       const result= await createAd(formData);
       console.log({result})
       //console.log(Object.fromEntries(formData));       

    }

    return (
        <form action={handleSubmit} className="max-w-xl mx-auto grid  grid-cols-2 gap-12">
            <div className="grow pt-8">
                <UploadArea files={files} setFiles={setFiles} />

                <div className="mt-6">
                    <div className="flex justify-between items-center mb-1">

                        <label htmlFor="" className="mt-0 mb-0">Add Location</label>
                        <div>

                            <button
                            type="button"
                            onClick={handleFindMyPostionClick}
                             className="border flex p-1 items-center gap-2 py-1 justify-center text-[#3F2E56] uppercase font-bold rounded">
                                <FontAwesomeIcon icon={faMapPin} />


                            </button>
                        </div>
                    </div>
                    <div className="mt-1 bg-gray-200 min-h-12 rounded overflow-hidden text-gray-400">
                        {JSON.stringify(location)}
                        
                        <LocationPicker
                         defaultlocation={locationDefault} 
                         gpsCoords={gpsCoords}
                         onChange={location => setLocation(location)} />

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