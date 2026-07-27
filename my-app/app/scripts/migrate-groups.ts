import "dotenv/config";
import { and, eq, isNotNull } from "drizzle-orm";
import { db } from "../lib/db";
import { games, tournamentGroups, groupTeams } from "../lib/db/schema";

async function main() {
  const groupedGames = await db.select().from(games).where(isNotNull(games.groupName));

  const groupMap = new Map
    <string,
    { tournamentId: string; groupName: string; teamIds: Set<string> }>();

  for (const g of groupedGames) {
    const key = `${g.tournamentId}::${g.groupName}`;
    if (!groupMap.has(key)) {
      groupMap.set(key, {
        tournamentId: g.tournamentId,
        groupName: g.groupName!,
        teamIds: new Set(),
      });
    }
    const entry = groupMap.get(key)!;
    entry.teamIds.add(g.homeTeamId);
    entry.teamIds.add(g.awayTeamId);
  }

  console.log(`Found ${groupMap.size} distinct groups across all tournaments.`);

  for (const [key, { tournamentId, groupName, teamIds }] of groupMap) {
    const groupId = `${tournamentId}-${groupName}`;

    await db
      .insert(tournamentGroups)
      .values({ id: groupId, tournamentId, name: groupName })
      .onConflictDoNothing();

    for (const teamId of teamIds) {
      await db.insert(groupTeams).values({ groupId, teamId }).onConflictDoNothing();
    }

    await db
      .update(games)
      .set({ groupId })
      .where(and(eq(games.tournamentId, tournamentId), eq(games.groupName, groupName)));

    console.log(`Migrated ${key} -> ${groupId} (${teamIds.size} teams)`);
  }

  console.log("Done.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});