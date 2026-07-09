import { TournamentType, Tournament, Team, Game } from "./types";

export function getTournament(type: TournamentType, year: number) {
  return tournaments.find((t) => t.type === type && t.year === year);
}

export function getGamesForTournament(tournamentId: string) {
  return games.filter((g) => g.tournamentId === tournamentId);
}

export function getTeam(teamId: string) {
  return teams.find((t) => t.id === teamId);
}

export const tournaments: Tournament[] = [
  {
    id: "wc-2002",
    type: "WC",
    year: 2002,
    host: "Sweden",
    startDate: "2002-04-27",
    endDate: "2002-05-12",
  },
  {
    id: "wc-2000",
    type: "WC",
    year: 2000,
    host: "Russia",
    startDate: "2000-04-29",
    endDate: "2000-05-14",
  },
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
  { id: "svk", name: "Slovakia", code: "SVK" },
  { id: "rus", name: "Russia", code: "RUS" },
  { id: "swe", name: "Sweden", code: "SWE" },
  { id: "cze", name: "Czech Republic", code: "CZE" },
];

export const games: Game[] = [
  {
    id: "g1",
    tournamentId: "wc-2002",
    stage: "final",
    date: "2002-05-12",
    homeTeamId: "svk",
    awayTeamId: "rus",
    homeScore: 4,
    awayScore: 3,
  },
  {
    id: "g2",
    tournamentId: "wc-2002",
    stage: "group",
    groupName: "A",
    date: "2002-04-28",
    homeTeamId: "swe",
    awayTeamId: "cze",
    homeScore: 2,
    awayScore: 5,
  },
];

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