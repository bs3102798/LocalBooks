import { Loader } from "@googlemaps/js-api-loader";
import { useEffect, useRef, useState } from "react"
import { Location } from "./LocationPicker";


const locationDefault = {
    lat: 34.0522,
    lng: -118.2437,
}


export default function DistancePicker({
    onChange ,
    defaultRadius,
}:{
        onChange:(radius:number) => void;
        defaultRadius:number;
    }) {
    const [radius, setRadius] = useState(defaultRadius);
    const [
        center,
        setCenter] = useState<Location | null>(null)
    const [zoom, setZoom] = useState<number>(9)
    const mapsDiv = useRef<HTMLDivElement | null>(null)
    const [geoError, setGeoError] = useState('')

    useEffect(() => {
        if (center) {

            loadMap();
            if (window && window.localStorage) {
                window.localStorage.setItem('center', JSON.stringify(center));
                //window.localStorage.setItem('center', JSON.stringify())
            }
        }
        if(!center) {
            if(window && window.localStorage && window.localStorage.getItem('center')) {
                const centerFromLS = window.localStorage.getItem('center') || '';

                setCenter (JSON.parse(centerFromLS));
            }
        }

    }, [center]);

    useEffect(() => {
        if(locationDefault) {

            onChange(radius)
        }


    }, [radius])

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(ev => {

            setCenter({ lat: ev.coords.latitude, lng: ev.coords.longitude })

        }, err => setGeoError(err.message))
    }, []);

    async function loadMap() {
        const loader = new Loader({
            apiKey: process.env.NEXT_PUBLIC_MAPS_KEY as string,
        })

        const Core = await loader.importLibrary('core')
        const { Map, Circle } = await loader.importLibrary('maps');
        //onsole.log({rest})
        const map = new Map(mapsDiv.current as HTMLDivElement, {
            mapId: 'map',
            center: locationDefault,
            //center: center,
            zoom: 9,
            zoomControl: true,
            mapTypeControl: false,
            streetViewControl: false,
        })
        const circle = new Circle({
            map,
            strokeColor: "#FF0000",
            strokeOpacity: 0.8,
            strokeWeight: 2,
            fillColor: "#FF0000",
            fillOpacity: 0.35,
            center: locationDefault,
            // center: center,
            radius,
            editable: true,
        });

        // const events = [
        //     'bounds_changed',
        //     'center_changed',
        //     'click',
        //     'drag',
        //     'dragend',
        //     'dragestart',

        // ];

        // for (const e of events) {

        //     Core.event.addListener(circle, e, () => console.log(e))
        // }

        Core.event.addListener(circle, 'bounds_changed', () => {
            // console.log('radious:',circle.getRadius())
            const radius = circle.getRadius()
            setRadius(radius)
            if (radius > 150000000) map.setZoom(1);
            else if (radius > 800000) map.setZoom(2);
            else if (radius > 400000) map.setZoom(3);
            else if (radius > 180000) map.setZoom(4);
            else if (radius > 100000) map.setZoom(5);
            else if (radius > 50000) map.setZoom(6);
            else if (radius > 25000) map.setZoom(7);
            else if (radius > 12000) map.setZoom(8);
            else if (radius > 5000) map.setZoom(9);
            else if (radius <= 10000) map.setZoom(10);
            setZoom(map.getZoom() as number)
        })
        Core.event.addListener(circle, 'center_changed', () => {
            const circleCenter: Location | undefined = circle.getCenter()?.toJSON()
            if (circleCenter) {
                setCenter(circleCenter);
                map.setCenter(circleCenter)

            }



        })

    }
    return (
        <>
            radious:{radius / 1000} <br />
            Zoom:{zoom}
            <label>Where</label>
            <div ref={mapsDiv} className="w-full h-48 bg-gray-200">
                {(!locationDefault || geoError) &&
                    (
                        <div className="text-gray-600 p-4">
                            {geoError || 'loading map...'}
                        </div>
                    )}
            </div>

        </>
    )
}