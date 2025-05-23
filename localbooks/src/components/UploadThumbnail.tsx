import { UploadResponse } from "imagekit/dist/libs/interfaces";
import MyImage from "./MyImage";


type Props = {
    file: UploadResponse;
    onClick?: () => void
}


export default function UploadThumbnail({ file, onClick }: Props) {
    function handleClick(ev: React.MouseEvent) {
        if (onClick) {
            ev.preventDefault();
            return onClick();
        }
        location.href = file.url
    }
    if (file.fileType === 'image') {
        return (
            //fo-auto centers what is important to image
            <a onClick={handleClick} href={file.url} target="_blank">
                <MyImage width={300} height={300} alt={'product thumbnail'} aiCrop={true} src={file.filePath} />
            </a>
        )
    }
    return (
        <>
            <div>{file.url} &raqup;</div>

        </>
    );
}