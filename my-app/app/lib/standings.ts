import { Game, StandingRow } from "./types";
import { PointSystem } from "./rules";

export function computeStandings(gamesInGroup: Game[], pointSystem: PointSystem): StandingRow[] {
  const table: Record<string, StandingRow> = {};

  function row(teamId: string): StandingRow {
    if (!table[teamId]) {
      table[teamId] = {
        teamId,
        played: 0,
        won: 0,
        otWon: 0,
        otLost: 0,
        draw: 0,
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

     if (game.homeScore === game.awayScore) {
      // draw — only occurs pre-2007
      home.draw += 1;
      away.draw += 1;
      home.points += pointSystem.draw;
      away.points += pointSystem.draw;
      continue;
    }

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