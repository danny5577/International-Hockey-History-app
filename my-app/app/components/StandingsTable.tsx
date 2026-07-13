import { getTeam, StandingRow } from "@/app/lib/mock-data";
import { Flag } from "./Flag";

export function StandingsTable({ rows }: { rows: StandingRow[] }) {
  return (
    <table className="mb-4 w-full border-collapse font-mono text-sm">
      <thead>
        <tr className="text-left text-muted">
          <th className="pb-2">Team</th>
          <th className="pb-2 text-right">GP</th>
          <th className="pb-2 text-right">W</th>
          <th className="pb-2 text-right">OTW</th>
          <th className="pb-2 text-right">OTL</th>
          <th className="pb-2 text-right">L</th>
          <th className="pb-2 text-right">GF</th>
          <th className="pb-2 text-right">GA</th>
          <th className="pb-2 text-right text-ice">PTS</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((r) => {
          const team = getTeam(r.teamId);
          return (
            <tr key={r.teamId} className="border-t border-white/10">
              <td className="py-2 flex items-center gap-1.5">
                <Flag isoCode={team?.isoCode ?? "xx"} label={team?.name} />
                {team?.code ?? "???"} </td>
                              
              <td className="py-2">{team?.code ?? "???"}</td>
              <td className="py-2 text-right">{r.played}</td>
              <td className="py-2 text-right">{r.won}</td>
              <td className="py-2 text-right">{r.otWon}</td>
              <td className="py-2 text-right">{r.otLost}</td>
              <td className="py-2 text-right">{r.lost}</td>
              <td className="py-2 text-right">{r.goalsFor}</td>
              <td className="py-2 text-right">{r.goalsAgainst}</td>
              <td className="py-2 text-right font-semibold text-ice">
                {r.points}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}