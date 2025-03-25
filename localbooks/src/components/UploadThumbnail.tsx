import { UploadResponse } from "imagekit/dist/libs/interfaces";

export default function UploadThumbnail({ file }: { file: UploadResponse }) {
    if (file.fileType === 'image') {
        return (
            //fo-auto centers what is important to image
            <a href={file.url} target="_blank">
                <img src={file.url + '?tr=w-100,h-100,fo-auto'} />
            </a>
        )
    }
    return (
        <div>{file.url} &raqup;</div>
    );
}