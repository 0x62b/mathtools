"use client";

import { useState } from "react";

export default function Text() {
  const [from, setFrom] = useState<string>("");
  const [to, setTo] = useState<string>("");

  function convert() {
    setTo(from);
  }

  return (
    <div className="flex flex-col items-center">
      <textarea className="bg-zinc-900 p-2 m-1 w-[40%] sm:w-full h-48" placeholder="From..." onChange={(e) => setFrom(e.target.value)}/>
      <div className="flex flex-col items-center">
        <div>
          <b>From</b>
          <select className="bg-zinc-900 p-2 m-1 rounded-md w-max">
            <option>binary</option>
            <option>text</option>
            <option>hexadecimal</option>
          </select>
        </div>
        <button className="bg-blue-600 p-2 m-1 rounded-md h-12" onClick={convert}>Convert</button>
        <div>
          <b>To</b>
          <select className="bg-zinc-900 p-2 m-1 rounded-md w-max">
            <option>binary</option>
            <option>text</option>
            <option>hexadecimal</option>
          </select>
        </div>
      </div>
      <textarea className="bg-zinc-900 p-2 m-1 w-[40%] sm:w-full h-48" placeholder="To..." value={to} readOnly/>
    </div>
  )
}