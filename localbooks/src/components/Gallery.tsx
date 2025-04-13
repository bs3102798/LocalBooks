'use client'

import { UploadResponse } from "imagekit/dist/libs/interfaces";
import UploadThumbnail from "./UploadThumbnail";
import UploadView from "./UploadView";
import { useState } from "react";

export default function Gallary({files}:{files:UploadResponse[]}) {
    const [activeFile, setActiveFile] = useState<UploadResponse | null>(files?.[0] || null)
    return(
        <>
        <div className="grow flex items-center p-4">
                    {activeFile && (
                        <div className="max-w-full max-h-full">
                            <UploadView file={activeFile} />
                        </div>
                    )}
                </div>
                <div className="p-4 flex gap-4 shrink-0">
                    {files.map((file, index) => (
                        <div className="size-14" key={index}>
                            <UploadThumbnail onClick={() => setActiveFile(file)} 
                            file={file} 
                            />

                        </div>

                    ))}

                </div>
        </>
    )
}