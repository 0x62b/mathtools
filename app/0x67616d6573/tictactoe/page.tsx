"use client";

import { useState } from "react";

function Tile({ x, setX }: { x: boolean; setX: React.Dispatch<React.SetStateAction<boolean>> }) {
  const [text, setText] = useState(".");

  const handleClick = () => {
    if (text === ".") {
      setText(x ? "X" : "O");
      setX(!x);
    }
  };

  return (
    <div 
      className="bg-zinc-800 hover:bg-zinc-700 rounded-md w-16 h-16 flex flex-row items-center justify-center cursor-pointer"
      onClick={handleClick}
    >
      <span className="text-white font-semibold text-2xl">
        {text}
      </span>
    </div>
  );
}

export default function TicTacToe() {
  const [x, setX] = useState(true);

  return (
    <div className="grid grid-cols-3 gap-2 w-fit">
      <Tile x={x} setX={setX} /><Tile x={x} setX={setX} /><Tile x={x} setX={setX} />
      <Tile x={x} setX={setX} /><Tile x={x} setX={setX} /><Tile x={x} setX={setX} />
      <Tile x={x} setX={setX} /><Tile x={x} setX={setX} /><Tile x={x} setX={setX} />
      <button onClick={() => location.reload()}>Clear</button>
    </div>
  );
}