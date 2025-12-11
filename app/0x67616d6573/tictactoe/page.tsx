"use client";

import { useState, useEffect } from "react";

function Tile({ index, x, setX, board, setBoard, winner }: { 
  index: number; 
  x: boolean; 
  setX: React.Dispatch<React.SetStateAction<boolean>>; 
  board: string[]; 
  setBoard: React.Dispatch<React.SetStateAction<string[]>>;
  winner: string | null;
}) {
  const handleClick = () => {
    if (board[index] === "." && !winner) {
      const newBoard = [...board];
      newBoard[index] = x ? "X" : "O";
      setBoard(newBoard);
      setX(!x);
    }
  };

  return (
    <div 
      className="bg-zinc-800 hover:bg-zinc-700 rounded-md w-16 h-16 flex flex-row items-center justify-center cursor-pointer"
      onClick={handleClick}
    >
      <span className="text-white font-semibold text-2xl">
        {board[index]}
      </span>
    </div>
  );
}

function check(board: string[]): string | null {
  // horizontals, diagonals, verticals all check
  const lines = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
  ];

  // check that all 3 of a "line" is equal
  for (const [a, b, c] of lines) {
    if (board[a] !== "." && board[a] === board[b] && board[a] === board[c]) {
      return `${board[a]} wins`;
    }
  }

  // all cells filled but no winner
  if (board.every(cell => cell !== ".")) {
    return "Tie";
  }

  return null;
}

export default function TicTacToe() {
  const [x, setX] = useState(true);
  const [board, setBoard] = useState(Array(9).fill("."));
  const [winner, setWinner] = useState<string | null>(null);

  useEffect(() => {
    const res = check(board);
    if (res) {
      setWinner(res);
    }
  }, [board]);

  const resetGame = () => {
    setBoard(Array(9).fill("."));
    setX(true);
    setWinner(null);
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-3 gap-2 w-fit">
        {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
          <Tile
            key={i} 
            index={i} 
            x={x} 
            setX={setX} 
            board={board} 
            setBoard={setBoard}
            winner={winner}
          />
        ))}
      </div>
      <button 
        onClick={resetGame}
        className="p-2 bg-zinc-700 hover:bg-zinc-600 text-white rounded-md w-min"
      >
        Reset
      </button>
      {!winner && (
        <div className="text-white">
          {x ? "X" : "O"} turn
        </div>
      )}
      {winner && (
        <div>
          {winner}
        </div>
      )}
    </div>
  );
}