import { notFound } from "next/navigation";
import Link from "next/link";
import { getTournament, getGamesForTournament } from "@/app/lib/mock-data";
import { GameRow } from "@/app/components/GameRow";
import { Game } from "@/app/lib/types";
import { computeStandings } from "@/app/lib/mock-data";
import { StandingsTable } from "@/app/components/StandingsTable";

export default async function OlympicsTournamentPage({
  params,
}: {
  params: Promise<{ year: string }>;
}) {
  const { year } = await params;
  const tournament = getTournament("OG", Number(year));

  if (!tournament) {
    notFound();
  }

  const allGames = getGamesForTournament(tournament.id);
  const groupGames = allGames.filter((g) => g.stage === "group");
  const playoffGames = allGames.filter((g) => g.stage !== "group");

  // group the group-stage games by their groupName ("A", "B", ...)
  const groups = groupGames.reduce<Record<string, Game[]>>((acc, game) => {
    const key = game.groupName ?? "Unknown";
    acc[key] = acc[key] ?? [];
    acc[key].push(game);
    return acc;
  }, {});

  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <Link href="/wc" className="font-mono text-sm text-ice">
        ← All Olympics
      </Link>

      <h1 className="mt-4 mb-1 text-3xl font-bold">
        Olympic gmes {tournament.year}
      </h1>
      <p className="mb-10 text-muted">
        Hosted by {tournament.host} · {tournament.startDate} to {tournament.endDate}
      </p>

     {Object.entries(groups).map(([groupName, gamesInGroup]) => (
  <section key={groupName} className="mb-10">
    <h2 className="mb-3 font-mono text-sm uppercase tracking-widest text-ice">
      Group {groupName}
    </h2>
    <StandingsTable rows={computeStandings(gamesInGroup)} />
    <div className="flex flex-col gap-2">
      {gamesInGroup.map((g) => (
        <GameRow key={g.id} game={g} />
      ))}
     </div>
    </section>
    ))}

      {playoffGames.length > 0 && (
        <section>
          <h2 className="mb-3 font-mono text-sm uppercase tracking-widest text-ice">
            Playoffs
          </h2>
          <div className="flex flex-col gap-2">
            {playoffGames.map((g) => (
              <GameRow key={g.id} game={g} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}