"use client";

import { useEffect, useState } from "react";

export default function Roman() {
  const [input, setInput] = useState<string>("");
  const [output, setOutput] = useState<string>("");

  useEffect(() => {
    const num = Number.parseInt(input);
    if (Number.isNaN(num)) {
      const map: { [key: string]: number } = {
        I: 1, V: 5, X: 10, L: 50,
        C: 100, D: 500, M: 1000
      };
      let sum = 0;
      let prev = 0;
      for (let i = input.length - 1; i >= 0; i--) {
        const curr = map[input[i].toUpperCase()];
        if (!curr) {
          setOutput("Error");
        }
        if (curr < prev) {
          sum -= curr;
        } else {
          sum += curr;
        }
        prev = curr;
      }
      setOutput(sum.toString());
    } else {

    }
  }, [input])

  return (
    <div className="flex flex-col">
      <input className="bg-zinc-800 p-2 m-1 rounded-md" placeholder="From..." onChange={(e) => setInput(e.target.value)}/>
      <label>The type of numeral is auto-detected</label>
      <div className="m-1 p-2 flex flex-col">
        <b>Output</b>
        <label>{output}</label>
      </div>
    </div>
  )
}