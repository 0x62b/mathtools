"use client";

import Header from "@/app/components/Header";
import { useEffect, useState } from "react";
import { parse } from "marked";

export default function TimerPage() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  useEffect(() => {
    const update = async () => {
      setOutput(await parse(input));
    };
    update();
  }, [input])

  return (
    <div className="flex flex-col min-h-screen bg-zinc-50 font-sans dark:bg-black p-4">
      <Header title="Timer"/>
      <div>
        <h3 className="text-xl font-semibold">Markdown Previewer</h3>
        <div className="flex flex-row h-[75vh]">
          <textarea className="bg-zinc-900 w-[50%]" onChange={(e) => setInput(e.target.value)}/>
          <iframe srcDoc={output} className="w-[50%] bg-white" />
        </div>
      </div>
    </div>
  )
}