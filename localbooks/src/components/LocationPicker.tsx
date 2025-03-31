'use effect';
import { Loader } from "@googlemaps/js-api-loader"
import { createRef, useEffect } from "react"

export default function LocationPicker() {
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
        const map = new Map(divRef.current, {
            mapId: 'map',
            center: { lat: 0, lng: 0 },
            zoom: 8
        })
        const pin = new AdvancedMarkerElement({
            map,
            position: { lat: 0, lng: 0 }
        })
        //alert('test')

    }
    useEffect(() => {

        loadMap()

    }, [])
    return (
        <>
            <div ref={divRef} id="mapElem" className="w-[200px] h-[200px]">

            </div>

        </>
    )
}