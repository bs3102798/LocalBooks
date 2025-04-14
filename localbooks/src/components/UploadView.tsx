import { UploadResponse } from "imagekit/dist/libs/interfaces";
//import Image from "next/image";
import MyImage from "./MyImage";

 export default function UploadView({file} :{file:UploadResponse}) {
    if(file.fileType === 'image') {
        return(
            // <Image src={file.url} alt={'photo'} width={1000} height={1000} />
            <MyImage 
            src={file.filePath} 
            alt={'product photo'} 
            width={2048} 
            height={2048}
            
            className="w-auto h-auto max-w-full max-h-full"
            />
        )
    }
    return(
        <>
        {file.name}
        </>
    )
 }