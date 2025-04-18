'use client'

import BookItem from "@/components/BookItem";
import SubmitButton from "@/components/SubmitButton";

import { Ad } from "@/models/Ad";

import { useEffect, useState } from "react";

export default function Home() {
  const [ads, setAds] = useState<Ad[]>([]);
  useEffect(() => {
    fetch('/api/ads').then(response => {
      response.json().then(adsDocs => {
        setAds(adsDocs)

      });
    })

  }, []);

  function handleSearch(formData:FormData) {
    //const data = Object.fromEntries(formData)
    const params = new URLSearchParams();
    formData.forEach((value, key) => {
      //console.log({key,value})
      if(typeof value === 'string') {
        params.set(key, value)

      }

    })
    const url = `/api/ads?${params.toString()}`;
    //console.log({url})

  }


  return (
    <div className="flex">
      {/* change color */}
      <form
        action={handleSearch}
        className="bg-white grow w-1/4 p-4">

        <input name="phrase" type="text" placeholder="Search Local Book..." />
        {/* <SubmitButton>Search</SubmitButton> */}
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
