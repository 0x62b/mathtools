"use client";

import { useEffect, useState } from "react";
import Header from "@/app/components/Header";

export default function CurrencyPage() {
  const [from, setFrom] = useState(0);
  const [fromUnit, setFromUnit] = useState("AED");
  const [to, setTo] = useState(0);
  const [toUnit, setToUnit] = useState("AED");

  const currencies = ["AED", "AUD", "CAD", "CNY", "GBP", "HKD", "SGD", "NZD", "USD"]; // this is the currencies i remember without internet

  useEffect(() => {
    if (!Number.isNaN(from)) setTo(from); // ill add actual logic later im on the plane w/o internet
    else setTo(0);
  }, [from, fromUnit, to, toUnit]);

  return (
    <div className="flex flex-col min-h-screen bg-zinc-50 font-sans dark:bg-black p-4">
      <Header title="Currency Converter"/>
      <div>        
        <div>
          <h3 className="text-lg font-semibold">Convert from</h3>
          <input type="number" className="bg-zinc-900 m-1 p-2 rounded-md" onChange={(e) => {setFrom(Number.parseInt(e.target.value));}}/>
          <select className="bg-zinc-900 m-1 p-2 rounded-md" onChange={(e) => {setFromUnit(e.target.value);}}>
            {currencies.map(c => (
              <option key={c}>{c}</option>
            ))}
          </select>
          <h3 className="text-lg font-semibold">Convert to</h3>
          <input type="number" readOnly className="bg-zinc-900 m-1 p-2 rounded-md" value={to}/>
          <select className="bg-zinc-900 m-1 p-2 rounded-md" onChange={(e) => {setToUnit(e.target.value)}}>
            {currencies.map(c => (
              <option key={c}>{c}</option>
            ))}
          </select>
        </div>
      </div>
    </div>
  )
}