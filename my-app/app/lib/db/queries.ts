import { eq, and, inArray } from "drizzle-orm";
import { db } from "./index";
import { tournaments, teams, games, playerStats , tournamentGroups, groupTeams} from "./schema";
import { TournamentType, PlayerStat, Team, GameStage} from "@/app/lib/types";

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
  return rows.map((g) => ({ ...g, groupId: g.groupId ?? undefined }));
}

export async function getGroupsForTournament(tournamentId: string) {
  return db.select().from(tournamentGroups).where(eq(tournamentGroups.tournamentId, tournamentId));
}

export async function getGroupsWithTeams(tournamentId: string) {
  const groupRows = await getGroupsForTournament(tournamentId);
  const result = [];
  for (const group of groupRows) {
    const teamRows = await db
      .select({ team: teams })
      .from(groupTeams)
      .innerJoin(teams, eq(groupTeams.teamId, teams.id))
      .where(eq(groupTeams.groupId, group.id));
    result.push({ ...group, teams: teamRows.map((r) => r.team) });
  }
  return result;
}

export async function getTournamentById(id: string) {
  const rows = await db.select().from(tournaments).where(eq(tournaments.id, id));
  return rows[0];
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

export async function getAllTeams() {
  return db.select().from(teams).orderBy(teams.name);
}

export async function getGroupById(groupId: string) {
  const rows = await db.select().from(tournamentGroups).where(eq(tournamentGroups.id, groupId));
  return rows[0];
}

export async function insertGroup(data: { id: string; tournamentId: string; name: string }) {
  await db.insert(tournamentGroups).values(data);
}

export async function isTeamInGroup(groupId: string, teamId: string) {
  const rows = await db
    .select()
    .from(groupTeams)
    .where(and(eq(groupTeams.groupId, groupId), eq(groupTeams.teamId, teamId)));
  return rows.length > 0;
}

export async function insertGroupTeam(groupId: string, teamId: string) {
  await db.insert(groupTeams).values({ groupId, teamId });
}

export async function getTeamsForTournament(tournamentId: string) {
  const [groupsWithTeams, gamesInTournament] = await Promise.all([
    getGroupsWithTeams(tournamentId),
    getGamesForTournament(tournamentId),
  ]);

  const teamsMap = new Map<string, Team>();
  for (const g of groupsWithTeams) {
    for (const t of g.teams) teamsMap.set(t.id, t);
  }
  for (const t of await getTeamsForGames(gamesInTournament)) {
    teamsMap.set(t.id, t);
  }

  return [...teamsMap.values()].sort((a, b) => a.name.localeCompare(b.name));
}

export async function insertGame(data: {
  id: string;
  tournamentId: string;
  groupId: string | null;
  stage: GameStage;
  date: string;
  homeTeamId: string;
  awayTeamId: string;
  homeScore: number;
  awayScore: number;
  overtime: boolean;
}) {
  await db.insert(games).values(data);
}