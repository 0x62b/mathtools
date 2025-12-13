"use client";

import { useState } from "react";

function Cell({ score }: { score: number }) {
  return (
    <div className="w-24 h-24 bg-zinc-800 m-1 flex items-center justify-center rounded-md">
      {score ? score : ""}
    </div>
  );
}

export default function G2048() {
  const [values, setValues] = useState([
    [0, 0, 0, 0],
    [0, 0, 2, 0],
    [0, 0, 0, 0],
    [0, 0, 2, 0]
  ]);
  
  return (
    <div className="w-108 h-108 flex flex-col items-center justify-center rounded-md bg-zinc-900">
      <div>
        {values.map((row, rowIndex) => (
          <div key={rowIndex} className="flex flex-row w-96 h-24 m-2">
            {row.map((value, colIndex) => (
              <Cell key={colIndex} score={value} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}