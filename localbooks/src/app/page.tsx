'use client'

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

  },[])
  return (
    <div className="flex">
      <div className="bg-gray-300 grow w-1/4">
        left
      </div>
      <div className="bg-gray-500 grow w-3/4">
        {ads.map((ad,index) => (
          <div key={index}>{ad.title}</div>
        ))}
      </div>

    </div>
  );
}
