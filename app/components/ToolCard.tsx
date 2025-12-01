import Link from "next/link";

interface ToolCardProps {
  title: string;
  desc: string;
  url: string;
}

export function ToolCard({title, desc, url}: ToolCardProps) {
  return (
    <Link href={url}>
      <div className="p-2 m-1 bg-zinc-900 hover:bg-zinc-800 hover:cursor-pointer rounded-md">
        <h2 className="text-xl">{title}</h2>
        <p>{desc}</p>
      </div>
    </Link>
  )
}