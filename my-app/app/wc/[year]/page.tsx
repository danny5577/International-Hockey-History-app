import { notFound } from "next/navigation";
import Link from "next/link";
import {
    getTournament,
    getGamesForTournament,
    getTeamsForGames,
    getPlayerStatsForTournament
        } from "@/app/lib/db/queries";
import { Game } from "@/app/lib/types";
import { TournamentView } from "@/app/components/TournamentView";

export default async function WcTournamentPage({
  params,
}: {
  params: Promise<{ year: string }>;
}) {
  const { year } = await params;
  const tournament = await getTournament("WC", Number(year));

  if (!tournament) {
    notFound();
  }

   const [allGames, playerStats] = await Promise.all([
    getGamesForTournament(tournament.id),
    getPlayerStatsForTournament(tournament.id),
  ]);

  const teamsInTournament = await getTeamsForGames(allGames);

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
        ← All World Championships
      </Link>

      <h1 className="mt-4 mb-1 text-3xl font-bold">
        World Championship {tournament.year}
      </h1>
      <p className="mb-10 text-muted">
        Hosted by {tournament.host} · {tournament.startDate} to {tournament.endDate}
      </p>

      <TournamentView
        tournamentId={tournament.id}
        year = {tournament.year}
        groups={groups}
        playoffGames={playoffGames}
        teams={teamsInTournament}
        playerStats={playerStats}
      />
    </div>
  );
}