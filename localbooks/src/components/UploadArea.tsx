import { faImage, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Uploader from "./Uploader";
import { UploadResponse } from "imagekit/dist/libs/interfaces";
import { Dispatch, SetStateAction, useState, } from "react";
import UploadThumbnail from "./UploadThumbnail";

type Props = {
    files: UploadResponse[];
    setFiles: Dispatch<SetStateAction<UploadResponse[]>>;
}

export default function UploadArea({ files, setFiles }: Props) {
    const [isUploading, setIsUploading] = useState(false);

    return (
        <div className="bg-gray-200 p-4 rounded">
            <h2 className="text-center text-xs text-gray-400 uppercase font-bold">
                Add photos of book:
            </h2>
            <div className="flex flex-col">
                <FontAwesomeIcon icon={faImage} className="h-24 text-gray-400" />
                <label
                    onClick={() => console.log}
                    className={
                        ' upload-btn cursor-pointer mt-2 border px-4 py-2 rounded uppercase font-bold items-center justify-content '
                        + (
                            isUploading
                                ? ' text-gray-400 cursor-not-allowed'
                                : " border-[#3F2E56] text-[#3F2E56]"
                        )
                    }>

                    <Uploader
                        onUploadStart={() => setIsUploading(true)}
                        onSuccess={file => {
                            setFiles(prev => [...prev, file as UploadResponse]);
                            setIsUploading(false)
                        }}
                    />
                    {isUploading ? (
                        <span>Uploading...</span>
                    ) : (
                        <>
                            <FontAwesomeIcon icon={faPlus} />
                            <span >add photos</span>
                        </>
                    )}
                </label>
                <div className="flex flex-wrap mt-2 gap-2">

                    {files.map((file) => (
                        // <div className="text-xs" key={file.url || index}>{file.url}</div>
                        <div className="size-14 rounded overflow-hidden" key={file.url}>
                            <UploadThumbnail file={file} key={file.url} />

                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}