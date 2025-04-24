import { faCar, faHome, faMobile, faTShirt } from "@fortawesome/free-solid-svg-icons";
import mongoose from "mongoose";

export async function connect() {
    return mongoose.connect(process.env.MONGODB_URL as string)
}

export const categories = [


    // place font awsome images later

    { key: 'action  ', label: "action", icon: faCar },
    { key: 'historic', label: "historic", icon: faMobile },
    { key: 'romance ', label: "romance", icon: faTShirt },
    { key: 'comedy: ', label: "comedy", icon: faHome },
];

;