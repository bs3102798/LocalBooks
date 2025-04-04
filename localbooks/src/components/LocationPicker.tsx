/* eslint-disable @typescript-eslint/no-explicit-any */
'use effect';
import { Loader, } from "@googlemaps/js-api-loader"
import { createRef,  useEffect } from "react"



export type Location = {
    lat: number;
    lng: number;
}


export default function LocationPicker({
    defaultlocation,
    onChange,
    gpsCoords,
}: {
    defaultlocation: Location;

   onChange: (location: Location) => void;
   gpsCoords: Location|null
}) {
    
    const divRef = createRef<HTMLDivElement>()


    async function loadMap() {
        const loader = new Loader({
            apiKey: process.env.NEXT_PUBLIC_MAPS_KEY as string,
        })

        const { Map } = await loader.importLibrary('maps');
        const { AdvancedMarkerElement } = await loader.importLibrary('marker')

        const map = new Map(divRef.current as HTMLDivElement, {
            mapId: 'map',
            center: defaultlocation,
            zoom: 6,
            mapTypeControl: false,
            streetViewControl: false,
        })
        
        const pin = new AdvancedMarkerElement({
            map,
            position: defaultlocation
        })

       
        map.addListener('click', (ev: any) => {
            if (ev.latLng) {
                pin.position = ev.latLng;
                const lat = ev.latLng.lat();
                const lng =ev.latLng.lng();
                onChange({lat, lng})
            }
        });


    }
    useEffect(() => {
 
        loadMap()
    }, [gpsCoords])
   
    return (
        <>
            <div ref={divRef} id="mapElem" className="w-full h-[200px]">

            </div>

        </>
    )
}