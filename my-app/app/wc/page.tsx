import Link from "next/link";
import { tournaments } from "../lib/mock-data";

export default function WorldChampionshipsPage() {
  const wcTournaments = tournaments.filter((t) => t.type === "WC");

  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="mb-8 text-3xl font-bold">World Championships</h1>
      <ul className="flex flex-col gap-3">
        {wcTournaments.map((t) => (
          <Link
            key={t.id}
            href={`/wc/${t.year}`}
            className="block rounded-lg bg-surface p-4 font-mono text-sm hover:bg-[#1a2540]"
            >
            {t.year} — hosted by {t.host}
        </Link>
        ))}
      </ul>
    </div>
  );
}