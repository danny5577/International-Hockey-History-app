export type TournamentType = "WC" | "OG";

export interface Tournament {
  id: string;          // e.g. "wc-2002"
  type: TournamentType;
  year: number;
  host: string;
  startDate: string;   // ISO date, e.g. "2002-04-27"
  endDate: string;
}

export interface Team {
  id: string;           // e.g. "svk"
  name: string;         // "Slovakia"
  code: string;         // "SVK" — IIHF 3-letter code
  isoCode: string;    // ISO 3166-1 alpha-2, lowercase, e.g. "sk" — for flags
}

export type GameStage =
  | "group"
  | "quarterfinal"
  | "semifinal"
  | "bronze"
  | "final"
  | "relegation";

export interface Game {
  id: string;
  tournamentId: string;
  stage: GameStage;
  groupName?: string;    // "A", "B" — only set when stage is "group"
  date: string;
  homeTeamId: string;
  awayTeamId: string;
  homeScore: number;
  awayScore: number;
  overtime?: boolean;
}

export interface PlayerStat {
  id: string;
  tournamentId: string;
  teamId: string;
  playerName: string;
  position?: "F" | "D" | "G";
  gamesPlayed: number;
  goals: number;
  assists: number;
  points: number;
  penaltyMinutes: number;
}