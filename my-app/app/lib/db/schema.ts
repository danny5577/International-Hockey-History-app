import {
  pgTable,
  text,
  integer,
  boolean,
  varchar,
  pgEnum,
  timestamp,
} from "drizzle-orm/pg-core";

export const tournamentTypeEnum = pgEnum("tournament_type", ["WC", "OG"]);
export const gameStageEnum = pgEnum("game_stage", [
  "group",
  "quarterfinal",
  "semifinal",
  "bronze",
  "final",
  "relegation",
]);

export const users = pgTable("users", {
  id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
  email: text("email").notNull().unique(),
  passwordHash: text("password_hash").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const tournaments = pgTable("tournaments", {
  id: text("id").primaryKey(),
  type: tournamentTypeEnum("type").notNull(),
  year: integer("year").notNull(),
  host: text("host").notNull(),
  startDate: text("start_date").notNull(),
  endDate: text("end_date").notNull(),
});

export const teams = pgTable("teams", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  code: varchar("code", { length: 3 }).notNull(),
  isoCode: varchar("iso_code", { length: 2 }).notNull(),
});

export const games = pgTable("games", {
  id: text("id").primaryKey(),
  tournamentId: text("tournament_id").notNull().references(() => tournaments.id),
  stage: gameStageEnum("stage").notNull(),
  groupName: text("group_name"),
  date: text("date").notNull(),
  homeTeamId: text("home_team_id").notNull().references(() => teams.id),
  awayTeamId: text("away_team_id").notNull().references(() => teams.id),
  homeScore: integer("home_score").notNull(),
  awayScore: integer("away_score").notNull(),
  overtime: boolean("overtime").notNull().default(false),
});

//---better solution to a playerPosition type error fix , it requires drizzle database reseeding tho
/*export const playerPositionEnum = pgEnum("player_position", ["F", "D", "G"]);

// in the playerStats table definition:
position: playerPositionEnum("position"),*/

export const playerStats = pgTable("player_stats", {
  id: text("id").primaryKey(),
  tournamentId: text("tournament_id").notNull().references(() => tournaments.id),
  teamId: text("team_id").notNull().references(() => teams.id),
  playerName: text("player_name").notNull(),
  position: varchar("position", { length: 1 }),
  gamesPlayed: integer("games_played").notNull().default(0),
  goals: integer("goals").notNull().default(0),
  assists: integer("assists").notNull().default(0),
  points: integer("points").notNull().default(0),
  penaltyMinutes: integer("penalty_minutes").notNull().default(0),
});