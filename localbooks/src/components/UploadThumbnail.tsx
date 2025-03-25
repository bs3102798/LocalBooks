import { UploadResponse } from "imagekit/dist/libs/interfaces";

export default function UploadThumbnail({file}:{file:UploadResponse}) {
    if(file.fileType === 'image'){
        return(
            <img src={file.thumbnailUrl} />
        )
    }
    return (
        <div>{file.url} &raqup;</div>
    );
}