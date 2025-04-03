'use effect';
import { Loader, } from "@googlemaps/js-api-loader"
import { createRef,  useEffect, useState } from "react"
//import type  {Map} from '@types/google.maps'


export type Location = {
    lat: number;
    lng: number;
}

//type LocationChangeHandler = (pos: Location) => void

export default function LocationPicker({
    defaultlocation,
    onChange,
}: {
    defaultlocation: Location;
   // onChange: LocationChangeHandler
   onChange: (location: Location) => void
}) {
    const [map, setMap] = useState<any>();
    const [pin, setPin] = useState<any>()
    const divRef = createRef<HTMLDivElement>()


    async function loadMap() {
        const loader = new Loader({
            apiKey: process.env.NEXT_PUBLIC_MAPS_KEY as string,
        })
        //console.log(process.env.NEXT_PUBLIC_MAPS_KEY);
        const { Map } = await loader.importLibrary('maps');
        const { AdvancedMarkerElement } = await loader.importLibrary('marker')
        //console.log({Map,AdvancedMarkerElement})
        //console.log(divRef.current)
        const map = new Map(divRef.current as HTMLDivElement, {
            mapId: 'map',
            center: defaultlocation,
            zoom: 6,
            mapTypeControl: false,
            streetViewControl: false,
        })
        setMap(map);
        const pin = new AdvancedMarkerElement({
            map,
            position: defaultlocation
        })
        //alert('test')
        // map.addListener('click', (ev: any) => {
        //     pin.position = ev.latLng;

        // })
        setPin(pin);
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

    }, [])

    // useEffect(() => {
    //     if(map && pin) {
    //         // map.center = location
    //         // pin.position = location
            
    //         loadMap()
    //     }
    // }, [location])    
    return (
        <>
            <div ref={divRef} id="mapElem" className="w-full h-[200px]">

            </div>

        </>
    )
}