'use client'

import BookItem from "@/components/BookItem";
//import LabelRadioButton from "@/components/LabelRadioButton";
import SearchForm from "@/components/SearchForm";
import { defaultRadius } from "@/libs/heplers";
//import SubmitButton from "@/components/SubmitButton";
//import { categories } from "@/libs/heplers";
import { Ad } from "@/models/Ad";
//import { faStore } from "@fortawesome/free-solid-svg-icons";
import { useEffect, 
  //useRef, 
  useState } from "react";


export default function Home() {
  const [ads, setAds] = useState<Ad[]>([]);
  //const formRef = useRef<HTMLFormElement | null>(null)

  useEffect(() => {

    fetchAds();
  }, []);

  function fetchAds(params?: URLSearchParams) {
    if(!params) {
      params = new URLSearchParams()

    }
    if (!params.has('radius')) {
      params.set('radius', defaultRadius.toString())
    }
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


  }


  return (
    <div className="flex w-full">
      <SearchForm action={handleSearch} />
      
      
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
