"use client";

import Link from "next/link";
import { FormEvent } from "react";
import * as math from "mathjs";

export default function Calculator() {
  function submit(e: FormEvent) {
    e.preventDefault();
    const input = ((e.target as HTMLFormElement).children[0] as HTMLInputElement);
    input.value = math.evaluate(input.value);
  }

  return (
    <div className="flex flex-col min-h-screen bg-zinc-50 font-sans dark:bg-black p-4">
      <header className="flex flex-row justify-start items-center">
        <Link href="/" className="m-2 font-semibold">MathTools</Link>
        <h1 className="font-bold text-2xl m-2">Calculator</h1>
      </header>
      <form className="w-[50%]" onSubmit={submit}>
        <input type="text" className="bg-zinc-900 p-2 m-1 rounded-md w-full" placeholder="Calculate..."/>
      </form>
    </div>
  )
}