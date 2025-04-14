'use client'

import { UploadResponse } from "imagekit/dist/libs/interfaces";
import UploadThumbnail from "./UploadThumbnail";
import UploadView from "./UploadView";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";

export default function Gallary({ files }: { files: UploadResponse[] }) {
    const [activeFile, setActiveFile] = useState<UploadResponse | null>(files?.[0] || null)
    return (
        <>
            <div className="grow flex items-center relative">
                {activeFile && (
                    <>
                        <div className="absolute inset-4 flex items-center justify-center">
                            <UploadView file={activeFile} />
                        </div>
                        <div className="absolute inset-4 flex items-center">
                            <div className="flex justify-between w-full">
                                <button className="size-12 justify-center rounded-full flex items-center bg-gray-500/40 hover:bg-gray-500/80">
                                    <FontAwesomeIcon icon={faChevronLeft} />
                                </button>
                                <button className="size-12 justify-center rounded-full flex items-center bg-gray-500/40 hover:bg-gray-500/80">
                                    <FontAwesomeIcon icon={faChevronRight} />
                                </button>
                            </div>

                        </div>
                    </>
                )}
            </div>
            <div className="p-4 flex gap-4">
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