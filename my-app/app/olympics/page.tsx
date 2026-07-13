import Link from "next/link";
import { tournaments } from "../lib/mock-data";

export default function OlympicsPage() {
  const wcTournaments = tournaments.filter((t) => t.type === "OG");

  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <Link href="/" className="font-mono text-sm text-ice">
        ← Home
      </Link>
      <h1 className="mb-8 text-3xl font-bold">Olympic Games</h1>
      <ul className="flex flex-col gap-3">
        {wcTournaments.map((t) => (
          <Link
            key={t.id}
            href={`/olympics/${t.year}`}
            className="block rounded-lg bg-surface p-4 font-mono text-sm hover:bg-[#1a2540]"
            >
            {t.year} — hosted by {t.host}
        </Link>
        ))}
      </ul>
    </div>
  );
}