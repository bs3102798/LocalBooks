import { useEffect, useRef, useState } from "react";
import LabelRadioButton from "./LabelRadioButton";
import SubmitButton from "./SubmitButton";
import { faStore } from "@fortawesome/free-solid-svg-icons";
import { categories, defaultRadius } from "@/libs/heplers";


type Props = {
    action: (data: FormData) => void;

}


export default function SearchForm({ action}: Props) {
    const [radius, 
        //setRadius
    ] = useState(defaultRadius)
    const formRef = useRef<HTMLFormElement | null>(null)
    useEffect(() => {
        if(radius !== defaultRadius) {
            formRef?.current?.requestSubmit();

        }

    },[radius])

    return (
        <>
            <form
                ref={formRef}

                action={action}
                className="bg-white grow w-1/4 p-4 border-r flex flex-col gap-4">
                <input
                    name="phrase" type="text" placeholder="Search Local Book..." />
                <div className="flex flex-col gap-0">
                    <LabelRadioButton
                        name="category"
                        value={''}
                        icon={faStore}
                        onClick={() => formRef?.current?.requestSubmit()}
                        label={"all categoryies"}
                        defaultChecked={true}
                    />


                    {categories.map(({ key: categoryKey, label, icon }) => (
                        <LabelRadioButton
                            key={categoryKey}
                            name="category"
                            value={categoryKey}
                            icon={icon}
                            onClick={() => formRef?.current?.requestSubmit()}
                            label={label} />
                    ))}
                </div>
                <div className=" ">
                    <label>Filter By Price</label>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <input name="min" type="number" placeholder="min" />
                        </div>
                        <div>
                            <input name="max" type="number" placeholder="max" />
                        </div>
                    </div>

                </div>
                <div>
                    {/* <input type="hidden" name="radius" value={radius}/>
                    <DistancePicker 
                    defaultRadius={defaultRadius}
                    onChange={newRadius => setRadius(newRadius)}/> */}
                </div>
                <SubmitButton>Search</SubmitButton>

            </form>
        </>
    )
}