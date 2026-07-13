import { TournamentType, Tournament, Team, Game, PlayerStat } from "./types";

export function getTournament(type: TournamentType, year: number) {
  return tournaments.find((t) => t.type === type && t.year === year);
}

export function getGamesForTournament(tournamentId: string) {
  return games.filter((g) => g.tournamentId === tournamentId);
}

export function getTeam(teamId: string) {
  return teams.find((t) => t.id === teamId);
}

export function getTeamsInTournament(gamesInTournament: Game[]): Team[] {
  const ids = new Set<string>();
  for (const g of gamesInTournament) {
    ids.add(g.homeTeamId);
    ids.add(g.awayTeamId);
  }
  return teams
    .filter((t) => ids.has(t.id))
    .sort((a, b) => a.name.localeCompare(b.name));
}

export const tournaments: Tournament[] = [
   { id: "wc-2000", type: "WC", year: 2000, host: "Russia", startDate: "2000-04-29", endDate: "2000-05-14" },
  { id: "wc-2001", type: "WC", year: 2001, host: "Germany", startDate: "2001-04-28", endDate: "2001-05-13" },
  { id: "wc-2002", type: "WC", year: 2002, host: "Sweden", startDate: "2002-04-27", endDate: "2002-05-12" },
  { id: "wc-2003", type: "WC", year: 2003, host: "Finland", startDate: "2003-04-26", endDate: "2003-05-11" },
  { id: "wc-2004", type: "WC", year: 2004, host: "Czech Republic", startDate: "2004-04-24", endDate: "2004-05-09" },
  {
    id: "og-2002",
    type: "OG",
    year: 2002,
    host: "United States",
    startDate: "2000-02-09",
    endDate: "2000-02-24",
  },
];

export const teams: Team[] = [
  { id: "svk", name: "Slovakia", code: "SVK", isoCode: "sk" },
  { id: "rus", name: "Russia", code: "RUS", isoCode: "ru" },
  { id: "swe", name: "Sweden", code: "SWE", isoCode: "se" },
  { id: "cze", name: "Czech Republic", code: "CZE", isoCode: "cz" },
  { id: "fin", name: "Finland", code: "FIN", isoCode: "fi" },
  { id: "can", name: "Canada", code: "CAN", isoCode: "ca" },
  { id: "usa", name: "United States", code: "USA", isoCode: "us" },
];

export const games: Game[] = [
  // --- 2000, Saint Petersburg ---
  { id: "g2000-final", tournamentId: "wc-2000", stage: "final", date: "2000-05-14", homeTeamId: "cze", awayTeamId: "svk", homeScore: 5, awayScore: 3 },
  { id: "g2000-bronze", tournamentId: "wc-2000", stage: "bronze", date: "2000-05-13", homeTeamId: "fin", awayTeamId: "can", homeScore: 2, awayScore: 1 },

  // --- 2001, Hanover ---
  { id: "g2001-final", tournamentId: "wc-2001", stage: "final", date: "2001-05-13", homeTeamId: "cze", awayTeamId: "fin", homeScore: 3, awayScore: 2, overtime: true },

  // --- 2002, Sweden ---
  { id: "g1", tournamentId: "wc-2002", stage: "final", date: "2002-05-12", homeTeamId: "svk", awayTeamId: "rus", homeScore: 4, awayScore: 3 },
  { id: "g2", tournamentId: "wc-2002", stage: "group", groupName: "A", date: "2002-04-28", homeTeamId: "swe", awayTeamId: "cze", homeScore: 2, awayScore: 5 },

  // --- 2003, Helsinki ---
  { id: "g2003-final", tournamentId: "wc-2003", stage: "final", date: "2003-05-11", homeTeamId: "can", awayTeamId: "swe", homeScore: 3, awayScore: 2, overtime: true },

  // --- 2004, Prague ---
  { id: "g2004-final", tournamentId: "wc-2004", stage: "final", date: "2004-05-09", homeTeamId: "can", awayTeamId: "swe", homeScore: 5, awayScore: 3 },
  { id: "g2004-bronze", tournamentId: "wc-2004", stage: "bronze", date: "2004-05-09", homeTeamId: "usa", awayTeamId: "svk", homeScore: 1, awayScore: 0, overtime: true },
];

export const playerStats: PlayerStat[] = []; // intentionally empty — added later

export function getPlayerStats(tournamentId: string, teamId: string) {
  return playerStats.filter(
    (p) => p.tournamentId === tournamentId && p.teamId === teamId
  );
}

export interface StandingRow {
  teamId: string;
  played: number;
  won: number;
  otWon: number;
  otLost: number;
  lost: number;
  goalsFor: number;
  goalsAgainst: number;
  points: number;
}

export function computeStandings(gamesInGroup: Game[]): StandingRow[] {
  const table: Record<string, StandingRow> = {};

  function row(teamId: string): StandingRow {
    if (!table[teamId]) {
      table[teamId] = {
        teamId,
        played: 0,
        won: 0,
        otWon: 0,
        otLost: 0,
        lost: 0,
        goalsFor: 0,
        goalsAgainst: 0,
        points: 0,
      };
    }
    return table[teamId];
  }

  for (const game of gamesInGroup) {
    const home = row(game.homeTeamId);
    const away = row(game.awayTeamId);

    home.played += 1;
    away.played += 1;
    home.goalsFor += game.homeScore;
    home.goalsAgainst += game.awayScore;
    away.goalsFor += game.awayScore;
    away.goalsAgainst += game.homeScore;

    const homeWon = game.homeScore > game.awayScore;
    const winner = homeWon ? home : away;
    const loser = homeWon ? away : home;

    if (game.overtime) {
      winner.otWon += 1;
      winner.points += 2;
      loser.otLost += 1;
      loser.points += 1;
    } else {
      winner.won += 1;
      winner.points += 3;
      loser.lost += 1;
    }
  }

  return Object.values(table).sort((a, b) => {
    if (b.points !== a.points) return b.points - a.points;
    const diffA = a.goalsFor - a.goalsAgainst;
    const diffB = b.goalsFor - b.goalsAgainst;
    if (diffB !== diffA) return diffB - diffA;
    return b.goalsFor - a.goalsFor;
  });
}