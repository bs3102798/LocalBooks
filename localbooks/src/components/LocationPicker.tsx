'use effect';
import { Loader } from "@googlemaps/js-api-loader"
import { createRef, useEffect } from "react"

export type Location = {
    lat: number;
    lng: number;
}

type LocationChangeHandler = (pos: Location) => void

export default function LocationPicker({
    onChange,
}: {
    onChange: LocationChangeHandler
}) {
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
            center: { lat: 0, lng: 0 },
            zoom: 3,
            mapTypeControl: false,
            streetViewControl: false,
        })
        const pin = new AdvancedMarkerElement({
            map,
            position: { lat: 0, lng: 0 }
        })
        //alert('test')
        // map.addListener('click', (ev: any) => {
        //     pin.position = ev.latLng;

        // })
        map.addListener('click', (ev: google.maps.MapMouseEvent) => {
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
    return (
        <>
            <div ref={divRef} id="mapElem" className="w-full h-[200px]">

            </div>

        </>
    )
}