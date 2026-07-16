import { db } from "../lib/db";
import { tournaments, teams, games } from "../lib/db/schema";
import {
  tournaments as mockTournaments,
  teams as mockTeams,
  games as mockGames,
} from "../lib/mock-data";

async function main() {
  console.log("Seeding teams...");
  await db.insert(teams).values(mockTeams).onConflictDoNothing();

  console.log("Seeding tournaments...");
  await db.insert(tournaments).values(mockTournaments).onConflictDoNothing();

  console.log("Seeding games...");
  await db
    .insert(games)
    .values(
      mockGames.map((g) => ({
        ...g,
        groupName: g.groupName ?? null,
        overtime: g.overtime ?? false,
      }))
    )
    .onConflictDoNothing();

  console.log("Done.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});