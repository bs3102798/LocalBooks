import { ReactNode } from "react";
import { useFormStatus } from "react-dom";

export default function SubmitButton({children}:{children:ReactNode}) {
    const {pending} = useFormStatus();
    return (
        <>
            <button className="mt-2 bg-[#3F2E56] text-white px-6 py-2 rounded font-bold">
               {pending && (
                   <span>Saving...</span>
                )}
                {!pending && (
                    <span>
                        {children}
                    </span>
                )}
                

            </button>
        </>
    )
}