"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

const ReactJsonView = dynamic(() => import('@microlink/react-json-view'), {
  ssr: false,
});

export default function JSONPage() {
  const [json, setJson] = useState<string>("");
  const [formatted, setFormatted] = useState({});

  useEffect(() => {
    try {
      setFormatted(JSON.parse(json));
    } catch {
      setFormatted({});
    }
  }, [json])
  
  return (
    <div className="flex flex-col min-h-screen bg-zinc-50 font-sans dark:bg-black p-4">
      <header className="flex flex-row justify-start items-center">
        <Link href="/" className="m-2 font-semibold">MathTools</Link>
        <h1 className="font-bold text-2xl m-2">JSON Formatter</h1>
      </header>
      <div>
        <div className="flex flex-row justify-between w-full">
          <textarea className="bg-zinc-900 w-[40%] h-screen" onChange={(e) => setJson(e.target.value)} />
          <button className="bg-blue-600 p-2 m-1 rounded-md h-12">Format</button>
          <div className="bg-zinc-900 w-[40%] h-screen">
            <ReactJsonView 
              src={formatted}
              theme="apathy"
            />
          </div>
        </div>
      </div>
    </div>
  )
}