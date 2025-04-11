"use client"
/* eslint-disable jsx-a11y/alt-text */
import Image, { ImageProps } from "next/image";

type LoaderProps = {
    src: string;
    width: number;
    quality?: number | undefined
}

const imageKitLoader = ({ src, width, quality }: LoaderProps) => {
    if (src[0] === '/') src = src.slice(1);
    
    const params = [`w-${width}`];
    if (quality) {
        params.push(`q-${quality}`);
    }

    const paramsString = params.join(",");
    let urlEndpoint = process.env.NEXT_PUBLIC_IK_ENDPOINT as string;

    // Properly trim the trailing slash if present
    if (urlEndpoint.endsWith("/")) {
        urlEndpoint = urlEndpoint.slice(0, -1);
    }

    return `${urlEndpoint}/${src}?tr=${paramsString}`;
};

const  MyImage = (props:ImageProps) => {
    return (
        <Image 
            loader={imageKitLoader}
            {...props}
        />
    );
};

export default MyImage;