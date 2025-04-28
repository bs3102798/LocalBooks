'use client'

import BookItem from "@/components/BookItem";
import LabelRadioButton from "@/components/LabelRadioButton";
import SubmitButton from "@/components/SubmitButton";
import { categories } from "@/libs/heplers";
//import SubmitButton from "@/components/SubmitButton";

import { Ad } from "@/models/Ad";
import { faStore } from "@fortawesome/free-solid-svg-icons";
//import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { useEffect, useRef, useState } from "react";


export default function Home() {
  const [ads, setAds] = useState<Ad[]>([]);
  const formRef = useRef<HTMLFormElement | null>(null)

  useEffect(() => {

    fetchAds();
  }, []);

  function fetchAds(params?: URLSearchParams) {
    const url = `/api/ads?${params?.toString() || ''}`;
    fetch(url).then(response => {
      response.json().then(adsDocs => {
        setAds(adsDocs)
      });
    })
  }

  function handleSearch(formData: FormData) {

    const params = new URLSearchParams();
    formData.forEach((value, key) => {
      //console.log({key,value})
      if (typeof value === 'string') {
        params.set(key, value)
      }
    });
    fetchAds(params)
    //console.log({url})

  }


  return (
    <div className="flex w-full">
      {/* change color */}
      <form
        ref={formRef}

        action={handleSearch}
        className="bg-white grow w-1/4 p-4 border-r flex flex-col gap-4">

        <input
          // onClick={() => 

          //   formRef.current?.requestSubmit()
          // }

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
        <SubmitButton>search</SubmitButton>

      </form>
      {/* change color */}
      <div className="bg-gray-200 p-4 grow w-3/4 ">
        <h2 className="font-bold mt-2 mb-4">Latest products</h2>
        <div className="grid md:grid-cols-4 gap-x-4 gap-y-6">
          {ads.map((ad, index) => (
            <BookItem ad={ad} key={index} />
          ))}
        </div>
      </div>

    </div>
  );
}
