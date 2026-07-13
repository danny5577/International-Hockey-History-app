import { PlayerStat } from "@/app/lib/types";

export function RosterTable({ stats }: { stats: PlayerStat[] }) {
  if (stats.length === 0) {
    return (
      <div className="rounded-lg border border-dashed border-white/10 p-6 text-center">
        <p className="font-mono text-sm text-muted">
          No player statistics recorded for this tournament yet.
        </p>
      </div>
    );
  }

  const sorted = [...stats].sort((a, b) => b.points - a.points);

  return (
    <table className="w-full border-collapse font-mono text-sm">
      <thead>
        <tr className="text-left text-muted">
          <th className="pb-2">Player</th>
          <th className="pb-2 text-right">GP</th>
          <th className="pb-2 text-right">G</th>
          <th className="pb-2 text-right">A</th>
          <th className="pb-2 text-right text-ice">PTS</th>
          <th className="pb-2 text-right">PIM</th>
        </tr>
      </thead>
      <tbody>
        {sorted.map((s) => (
          <tr key={s.id} className="border-t border-white/10">
            <td className="py-2">{s.playerName}</td>
            <td className="py-2 text-right">{s.gamesPlayed}</td>
            <td className="py-2 text-right">{s.goals}</td>
            <td className="py-2 text-right">{s.assists}</td>
            <td className="py-2 text-right font-semibold text-ice">{s.points}</td>
            <td className="py-2 text-right">{s.penaltyMinutes}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}