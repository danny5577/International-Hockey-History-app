import { notFound } from "next/navigation";
import Link from "next/link";
import {
    getTournament,
    getGamesForTournament,
    getTeamsForGames,
    getPlayerStatsForTournament,
    getGroupsWithTeams
        } from "@/app/lib/db/queries";
import { Game, Team} from "@/app/lib/types";
import { TournamentView } from "@/app/components/TournamentView";

export default async function OlympicsTournamentPage({
  params,
}: {
  params: Promise<{ year: string }>;
}) {
  const { year } = await params;
  const tournament = await getTournament("OG", Number(year));

  if (!tournament) {
    notFound();
  }

  const [allGames, playerStats, groupsWithTeams] = await Promise.all([
    getGamesForTournament(tournament.id),
    getPlayerStatsForTournament(tournament.id),
    getGroupsWithTeams(tournament.id)
  ]);

  const groupGames = allGames.filter((g) => g.stage === "group");
  const playoffGames = allGames.filter((g) => g.stage !== "group");


  const groups: Record<string, Game[]> = {};
for (const g of groupsWithTeams) {
  groups[g.id] = [];
}
for (const game of groupGames) {
  const key = game.groupId ?? "unknown";
  groups[key] = groups[key] ?? [];
  groups[key].push(game);
}

const teamsMap = new Map<string, Team>();
for (const g of groupsWithTeams) {
  for (const t of g.teams) teamsMap.set(t.id, t);
}
for (const t of await getTeamsForGames(allGames)) {
  teamsMap.set(t.id, t);
}
const teamsInTournament = [...teamsMap.values()].sort((a, b) => a.name.localeCompare(b.name));
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
        year = {tournament.year}
        groups={groups}
        groupsMeta={groupsWithTeams}
        playoffGames={playoffGames}
        teams={teamsInTournament}
        playerStats={playerStats}
      />
    </div>
  );
}