'use client'

import { UploadResponse } from "imagekit/dist/libs/interfaces";
import UploadThumbnail from "./UploadThumbnail";
import UploadView from "./UploadView";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import MyImage from "./MyImage";

export default function Gallary({ files }: { files: UploadResponse[] }) {
    const [activeFile, setActiveFile] = useState<UploadResponse | null>(files?.[0] || null)
    function next() {
        const activeFileIndex = files.findIndex(f => f.fileId === activeFile?.fileId)
        const nextIndex = activeFileIndex === files.length - 1 ? 0 : activeFileIndex + 1;
        const nextFile = files[nextIndex];
        setActiveFile(nextFile)
    }
    function prev() {
        const activeFileIndex = files.findIndex(f => f.fileId === activeFile?.fileId)
        const prevIndex = activeFileIndex === 0 ? files.length - 1 : activeFileIndex - 1;
        const prevFile = files[prevIndex];
        setActiveFile(prevFile)

    }
    return (
        <>
            <div className="grow flex items-center relative">
                {activeFile && (
                    <>
                        <div className="absolute inset-0 overflow-hidden">

                            <MyImage
                                src={activeFile.filePath}
                                alt={'bg'}
                                width={3048}
                                height={3048}
                                className="object-cover opacity-20"
                            />
                        </div>
                        <div className="absolute inset-4 flex items-center justify-center">

                            <UploadView file={activeFile} />
                        </div>
                        <div className="absolute inset-4 flex items-center">
                            <div className="flex justify-between w-full">
                                <button
                                    onClick={prev}
                                    className="size-12 justify-center rounded-full flex items-center transition bg-gray-500/40 hover:bg-gray-500/80">
                                    <FontAwesomeIcon icon={faChevronLeft} />
                                </button>
                                <button
                                    onClick={next}
                                    className="size-12 justify-center rounded-full flex items-center transition bg-gray-500/40 hover:bg-gray-500/80">
                                    <FontAwesomeIcon icon={faChevronRight} />
                                </button>
                            </div>

                        </div>
                    </>
                )}
            </div>
            <div className="p-4 flex gap-4 justify-center">
                {files.map((file, index) => (
                    <div className="size-14 cursor-pointer" key={index}>
                        <UploadThumbnail onClick={() => setActiveFile(file)}
                            file={file}
                        />

                    </div>

                ))}

            </div>
        </>
    )
}