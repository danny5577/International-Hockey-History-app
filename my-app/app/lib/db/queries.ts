import { eq, and, inArray } from "drizzle-orm";
import { db } from "./index";
import { tournaments, teams, games, playerStats } from "./schema";
import { TournamentType, PlayerStat } from "@/app/lib/types";

export async function getTournament(type: TournamentType, year: number) {
  const rows = await db
    .select()
    .from(tournaments)
    .where(and(eq(tournaments.type, type), eq(tournaments.year, year)));
  return rows[0]; // undefined if no match — same behavior as Array.find
}

export async function getTournamentsByType(type: TournamentType) {
  return db
    .select()
    .from(tournaments)
    .where(eq(tournaments.type, type))
    .orderBy(tournaments.year);
}

export async function getGamesForTournament(tournamentId: string) {
  const rows = await db
    .select()
    .from(games)
    .where(eq(games.tournamentId, tournamentId));

  // DB uses null for "no group"; our Game type uses undefined — reconcile here
  return rows.map((g) => ({ ...g, groupName: g.groupName ?? undefined }));
}

// One query for every team that appears in a set of games — this is the
// fix for the N+1 problem: called once per page, not once per row.
export async function getTeamsForGames(
  gamesInTournament: { homeTeamId: string; awayTeamId: string }[]
) {
  const ids = new Set<string>();
  for (const g of gamesInTournament) {
    ids.add(g.homeTeamId);
    ids.add(g.awayTeamId);
  }
  if (ids.size === 0) return [];

  return db
    .select()
    .from(teams)
    .where(inArray(teams.id, [...ids]))
    .orderBy(teams.name);
}

export async function getPlayerStatsForTournament(tournamentId: string) {
  const rows = await db
    .select()
    .from(playerStats)
    .where(eq(playerStats.tournamentId, tournamentId));

    //better solution in schema.ts
  return rows.map((p) => ({
    ...p,
    position: (p.position ?? undefined) as PlayerStat["position"],
  }));
}

export async function insertTournament(data: {
  id: string;
  type: TournamentType;
  year: number;
  host: string;
  startDate: string;
  endDate: string;
}) {
  await db.insert(tournaments).values(data);
}

export async function getAllTournaments() {
  return db.select().from(tournaments).orderBy(tournaments.type, tournaments.year);
}