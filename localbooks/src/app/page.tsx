'use client'

import BookItem from "@/components/BookItem";

import SearchForm from "@/components/SearchForm";
import { defaultRadius } from "@/libs/heplers";

import { Ad } from "@/models/Ad";

import {
  useEffect,
  //useRef, 
  useState
} from "react";


export default function Home() {
  const [ads, setAds] = useState<Ad[]>([]);
  //const formRef = useRef<HTMLFormElement | null>(null)
  const [adsParams, setAdsParams] = useState<URLSearchParams> (new URLSearchParams)

  useEffect(() => {

    fetchAds();
  }, []);

  function fetchAds(params?: URLSearchParams) {
    if (!params) {
      params = new URLSearchParams()

    }
    if (!params.has('radius')) {
      params.set('radius', defaultRadius.toString())
    }
    const url = `/api/ads?${params?.toString() || ''}`;
    fetch(url).then(response => {
      response.json().then(adsDocs => {
        setAds(adsDocs)
        setAdsParams(params)
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

  const formDirty = 
  adsParams.get('phrase') || 
  adsParams.get('category') ||
   adsParams.get('min') || adsParams.get('max')


  return (
    <div className="flex w-full">
      <SearchForm action={handleSearch} />


      {/* change color */}
      <div className="bg-gray-200 p-4 grow w-3/4 ">
        <h2 className="font-bold mt-2 mb-4">
          {formDirty ? 'Search results' : 'Latest Ads'}
        </h2>
        <div className="grid md:grid-cols-4 gap-x-4 gap-y-6">
          {ads.map((ad, index) => (
            <>
            <div className="grid colum">
              <BookItem ad={ad} key={index} />
              <button className="bg-blue-200 text-white">add to cart</button>
            </div>
            </>
          ))}
        </div>
        {ads?.length === 0 && (
          <div className="text-gray-400">No products found</div>
        )}
        {ads == null && (
          <div className="text-gray-400">Loading....</div>
        )}
      </div>

    </div>
  );
}
