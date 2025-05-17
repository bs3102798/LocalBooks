'use client'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import UploadArea from "./UploadArea";
import LocationPicker, { Location } from "./LocationPicker";
import AdTextInputs, { AdText } from "./AdTextsInputs";
import SubmitButton from "./SubmitButton";
import { useState } from "react";
import { UploadResponse } from "imagekit/dist/libs/interfaces";
import { faMapPin } from "@fortawesome/free-solid-svg-icons";
import { createAd, updateAd } from "@/app/actions/adActions";
import { redirect } from "next/navigation";
//import { revalidatePath } from "next/cache";

type Props = {
    //handleSubmit: (formData: FormData) => void;
    // handleSubmit: (formData: FormData) => {};
    id?: string | null;
    defaultFiles?: UploadResponse[];
    defaultLocation: Location;
    defaultText?: AdText



};

export default function AdForm({
    //handleSubmit, 
    id = null,
    defaultFiles = [],
    defaultLocation,
    defaultText = {}
}: Props) {

    const [files, setFiles] = useState<UploadResponse[]>(defaultFiles);
    const [location, setLocation] = useState<Location>(defaultLocation);
    const [gpsCoords, setGpsCoords] = useState<Location | null>(null);

    function handleFindMyPostionClick() {
        navigator.geolocation.getCurrentPosition(ev => {
            //console.log("Location found:", ev.coords.latitude, ev.coords.longitude);
            const location = { lat: ev.coords.latitude, lng: ev.coords.longitude }
            setLocation(location)
            setGpsCoords(location)
        }, console.error);
    }

    async function handleSubmit(formData: FormData) {
        // setIsSaving(true)
        formData.set('location', JSON.stringify(location));

        formData.set('files', JSON.stringify(files));
        if (id) {
            formData.set('_id', id)
        }
        const result = id
            ? await updateAd(formData)
            : await createAd(formData)
      
        redirect('/ad/' + result._id)
        // if(id) {
        //     const result = await updateAd(formData)
        //     redirect('/ad/'+result._id)

        // } else {
        //     const result = await createAd(formData)
        //     redirect('/ad/'+result._id)
        // }
        //const result= await createAd(formData);


        //setIsSaving(false)
        //console.log({result})


    }



    return (
        <>
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
                                defaultlocation={defaultLocation}
                                gpsCoords={gpsCoords}
                                onChange={location => setLocation(location)} />

                        </div>
                    </div>
                </div>

                <div className="grow pt-2">
                    <AdTextInputs defaultValues={defaultText} />
                    <SubmitButton>{id ? 'Save' : 'Publish'}</SubmitButton>

                </div>
            </form>
        </>
    )
}