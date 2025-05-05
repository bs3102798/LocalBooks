import { Loader } from "@googlemaps/js-api-loader";
import { useEffect, useRef } from "react"

export default function DistancePicker() {
    const mapsDiv = useRef<HTMLDivElement|null>(null)

    useEffect(() => {
        loadMap();
    }, []);

    async function loadMap() {
        const loader = new Loader({
            apiKey: process.env.NEXT_PUBLIC_MAPS_KEY as string,
        })

        const { Map } = await loader.importLibrary('maps');
        const map = new Map(mapsDiv.current as HTMLDivElement, {
            mapId: 'map',
            center: {lat: 0, lng: 0},
            zoom: 6,
            mapTypeControl: false,
            streetViewControl: false,
        })

    }
    return (
        <>
        <div ref={mapsDiv} className="size-12 bg-gray-200"></div>

        </>
    )
}