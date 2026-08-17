"use client";

import { RosterTable } from "./RosterTable";
import { useMemo, useState } from "react";
import { Game, Team, PlayerStat, GroupWithTeams} from "@/app/lib/types";
import { GameRow } from "./GameRow";
import { StandingsTable } from "./StandingsTable";
import { isoToFlagEmoji } from "../lib/flags";
import { getPointSystem, usesDrawFormat } from "../lib/rules";
import { computeStandings } from "../lib/standings";

export function TournamentView({
  year,
  groups,
  groupsMeta,
  playoffGames,
  teams,
  playerStats,
}: {
  year: number,
  groups: Record<string, Game[]>;
  groupsMeta: GroupWithTeams[];
  playoffGames: Game[];
  teams: Team[];
  playerStats: PlayerStat[];
}) {

  const pointSystem = getPointSystem(year);
  const drawFormat = usesDrawFormat(year);
  const teamsById = useMemo(() => new Map(teams.map((t) => [t.id, t])), [teams]);

  const [selectedTeamId, setSelectedTeamId] = useState<string>("all");

  const allGames = [...Object.values(groups).flat(), ...playoffGames];
  const filteredGames =
    selectedTeamId === "all"
      ? null
      : allGames.filter
      ((g) => g.homeTeamId === selectedTeamId || g.awayTeamId === selectedTeamId);
      
  const statsForSelectedTeam = playerStats.filter((p) => p.teamId === selectedTeamId);

  const groupsMetaById = useMemo(() => new Map(groupsMeta.map((g) => [g.id, g])), [groupsMeta]);


      
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
            {teamsById.get(selectedTeamId)?.name}&apos;s games
          </h2>
          <div className="flex flex-col gap-2">
             {filteredGames.map((g) => (
              <GameRow key={g.id} game={g} teams={teamsById} />
            ))}
          </div>
           <h2 className="mb-3 font-mono text-sm uppercase tracking-widest text-ice">
            Roster &amp; Stats
          </h2>
          <RosterTable stats={statsForSelectedTeam} />
        </section>
      ) : (
        <>
          {Object.entries(groups).map(([groupId, gamesInGroup]) => {
    const meta = groupsMetaById.get(groupId);
    return (
      <section key={groupId} className="mb-10">
        <h2 className="mb-3 font-mono text-sm uppercase tracking-widest text-ice">
          Group {meta?.name ?? "?"}
        </h2>
        <StandingsTable
          rows={computeStandings(gamesInGroup, pointSystem, meta?.teams.map((t) => t.id) ?? [])}
          allowsDraws={drawFormat}
          teams={teamsById}
        />
        {gamesInGroup.length === 0 ? (
          <p className="rounded-lg border border-dashed border-white/10 p-4 font-mono text-sm text-muted">
            No games played yet.
          </p>
        ) : (
          <div className="flex flex-col gap-2">
            {gamesInGroup.map((g) => (
              <GameRow key={g.id} game={g} teams={teamsById} />
            ))}
          </div>
        )}
      </section>
    );
  })}

          {playoffGames.length > 0 && (
            <section>
              <h2 className="mb-3 font-mono text-sm uppercase tracking-widest text-ice">
                Playoffs
              </h2>
              <div className="flex flex-col gap-2">
                {playoffGames.map((g) => (
                  <GameRow key={g.id} game={g} teams={teamsById} />
                ))}
              </div>
            </section>
          )}
        </>
      )}
    </div>
  );
}