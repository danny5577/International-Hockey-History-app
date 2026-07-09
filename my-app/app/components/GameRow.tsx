import { getTeam } from "../lib/mock-data";
import { Game } from "../lib/types";

export function GameRow({ game }: { game: Game }) {
  const home = getTeam(game.homeTeamId);
  const away = getTeam(game.awayTeamId);
  const homeWon = game.homeScore > game.awayScore;
  const awayWon = game.awayScore > game.homeScore;

  return (
    <div className="flex items-center justify-between rounded-lg bg-surface px-4 py-3">
      <span className={`font-mono text-sm ${homeWon ? "font-semibold text-foreground" : "text-muted"}`}>
        {home?.code ?? "???"}
      </span>
      <span className="font-mono text-base tracking-widest">
        {game.homeScore} : {game.awayScore}
      </span>
      <span className={`font-mono text-sm ${awayWon ? "font-semibold text-foreground" : "text-muted"}`}>
        {away?.code ?? "???"}
      </span>
    </div>
  );
}