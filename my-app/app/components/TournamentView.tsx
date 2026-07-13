"use client";

import { getPlayerStats } from "@/app/lib/mock-data";
import { RosterTable } from "./RosterTable";
import { useState } from "react";
import { Game, Team } from "@/app/lib/types";
import { computeStandings, getTeam } from "@/app/lib/mock-data";
import { GameRow } from "./GameRow";
import { StandingsTable } from "./StandingsTable";
import { isoToFlagEmoji } from "../lib/flags";

export function TournamentView({
  tournamentId,
  groups,
  playoffGames,
  teams,
}: {
  tournamentId: string;
  groups: Record<string, Game[]>;
  playoffGames: Game[];
  teams: Team[];
}) {
  const [selectedTeamId, setSelectedTeamId] = useState<string>("all");

  const allGames = [...Object.values(groups).flat(), ...playoffGames];
  const filteredGames =
    selectedTeamId === "all"
      ? null
      : allGames.filter(
          (g) =>
            g.homeTeamId === selectedTeamId || g.awayTeamId === selectedTeamId
        );

  return (
    <div>
      <div className="mb-8">
        <label className="mb-2 block font-mono text-xs uppercase tracking-widest text-muted">
          Filter by team
        </label>
        <select
          value={selectedTeamId}
          onChange={(e) => setSelectedTeamId(e.target.value)}
          className="rounded-lg border border-white/10 bg-surface px-3 py-2 font-mono text-sm text-foreground"
        >
          <option value="all">All teams</option>
          {teams.map((t) => (
            <option key={t.id} value={t.id}>
              {isoToFlagEmoji(t.isoCode)} {t.name}
            </option>
          ))}
        </select>
      </div>

      {filteredGames ? (
        <section>
          <h2 className="mb-3 font-mono text-sm uppercase tracking-widest text-ice">
            {getTeam(selectedTeamId)?.name}&apos;s games
          </h2>
          <div className="flex flex-col gap-2">
            {filteredGames.map((g) => (
              <GameRow key={g.id} game={g} />
            ))}
          </div>
           <h2 className="mb-3 font-mono text-sm uppercase tracking-widest text-ice">
            Roster &amp; Stats
          </h2>
          <RosterTable stats={getPlayerStats(tournamentId, selectedTeamId)} />
        </section>
      ) : (
        <>
          {Object.entries(groups).map(([groupName, gamesInGroup]) => (
            <section key={groupName} className="mb-10">
              <h2 className="mb-3 font-mono text-sm uppercase tracking-widest text-ice">
                Group {groupName}
              </h2>
              <StandingsTable rows={computeStandings(gamesInGroup)} />
              <div className="flex flex-col gap-2">
                {gamesInGroup.map((g) => (
                  <GameRow key={g.id} game={g} />
                ))}
              </div>
            </section>
          ))}

          {playoffGames.length > 0 && (
            <section>
              <h2 className="mb-3 font-mono text-sm uppercase tracking-widest text-ice">
                Playoffs
              </h2>
              <div className="flex flex-col gap-2">
                {playoffGames.map((g) => (
                  <GameRow key={g.id} game={g} />
                ))}
              </div>
            </section>
          )}
        </>
      )}
    </div>
  );
}