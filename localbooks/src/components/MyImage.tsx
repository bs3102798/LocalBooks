"use client"
import { height, width } from "@fortawesome/free-solid-svg-icons/faBook";
/* eslint-disable jsx-a11y/alt-text */
import Image, { ImageProps } from "next/image";

type LoaderProps = {
    src: string;
    width: number;
    height?: number
    quality?: number | undefined
    aiCrop?: boolean
}

const imageKitLoader = ({ src, width, quality, height, aiCrop }: LoaderProps) => {
    if (src[0] === '/') src = src.slice(1);

    const params = [`w-${width}`];
    if (quality) {
        params.push(`q-${quality}`);
    }
    if (aiCrop) {
        params.push('fo-auto')
    }
    if (height && aiCrop) {
        params.push(`h-${height}`)
    }
    console.log(params);

    const paramsString = params.join(",");
    console.log({ paramsString, width, height, quality })
    let urlEndpoint = process.env.NEXT_PUBLIC_IK_ENDPOINT as string;


    if (urlEndpoint.endsWith("/")) {
        urlEndpoint = urlEndpoint.slice(0, -1);
    }

    return `${urlEndpoint}/${src}?tr=${paramsString}`;
};

type MyImageProps = ImageProps & {
    aiCrop?: boolean;
    width: number
    height?: number
}

const MyImage = ({ width, height, aiCrop, ...props }: MyImageProps) => {
    return (
        <Image
            loader={args => imageKitLoader({
                ...args,
                width,
                height,
                aiCrop
            })}
            width={width}
            height={height}
            {...props}
        />
    );
};

export default MyImage;