import { notFound } from "next/navigation";
import Link from "next/link";
import { getTournament, getGamesForTournament, getTeamsInTournament } from "@/app/lib/mock-data";
import { GameRow } from "@/app/components/GameRow";
import { Game } from "@/app/lib/types";
import { computeStandings } from "@/app/lib/mock-data";
import { StandingsTable } from "@/app/components/StandingsTable";
import { TournamentView } from "@/app/components/TournamentView";

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
   const teamsInTournament = getTeamsInTournament(allGames);

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

     <TournamentView
        tournamentId={tournament.id}
        groups={groups}
        playoffGames={playoffGames}
        teams={teamsInTournament}
      />
    </div>
  );
}