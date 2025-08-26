
'use client'
// import AdTextInputs from "@/components/AdTextsInputs";
// import LocationPicker, { Location } from "@/components/LocationPicker";
// import UploadArea from "@/components/UploadArea";
//import MapPicker from 'react-google-map-picker';
// import { faMapPin } from "@fortawesome/free-solid-svg-icons";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { UploadResponse } from "imagekit/dist/libs/interfaces";
// import { useState } from "react";
// import { createAd } from "../actions/adActions";
// import SubmitButton from "@/components/SubmitButton";
// import { redirect } from "next/navigation";
import AdForm from "@/components/AdForm";
//import { redirect } from "next/navigation";
;

const locationDefault = {
    lat: 34.0522 , 
    lng: -118.2437 ,
}

export default function NewBookPage() {
   
  

    return (
       
        <AdForm defaultLocation={locationDefault} />
    )

}