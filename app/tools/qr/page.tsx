"use client";

import Header from "@/app/components/Header";
import { useEffect, useState } from "react";
import { encodeQR } from "qr";

export default function TimerPage() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  useEffect(() => {
    setOutput(encodeQR(input, "svg"));
  }, [input]);

  return (
    <div className="flex flex-col p-4">
      <Header title="QR Generator"/>
      <div>
        <h3 className="text-xl font-semibold">QR Generator</h3>
        <div className="flex flex-col">
          <input
            className="bg-zinc-900 w-[30%] m-1 p-2 rounded-md"
            placeholder="Text"
            onChange={(e) => setInput(e.target.value)}
          />
          <div className="fill-white w-[25%] h-[25%]" dangerouslySetInnerHTML={{ __html: output }} />
        </div>
      </div>
    </div>
  )
}