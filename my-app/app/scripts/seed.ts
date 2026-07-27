import { db } from "../lib/db";
import { tournaments, teams } from "../lib/db/schema";
import {
  tournaments as mockTournaments,
  teams as mockTeams,
} from "../lib/mock-data";

async function main() {
  console.log("Seeding teams...");
  await db.insert(teams).values(mockTeams).onConflictDoNothing();

  console.log("Seeding tournaments...");
  await db.insert(tournaments).values(mockTournaments).onConflictDoNothing();

  console.log("Done.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});