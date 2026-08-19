import { Game, Team } from "@/app/lib/types";
import { GameRow } from "@/app/components/GameRow";
import { ConfirmDeleteForm } from "./ConfirmDeleteForm";
import { deleteGame } from "@/app/lib/actions";

export function AdminGameRow({
  game,
  teams,
  tournamentId,
}: {
  game: Game;
  teams: Map<string, Team>;
  tournamentId: string;
}) {
  return (
    <div className="flex items-center gap-3">
      <div className="flex-1">
        <GameRow game={game} teams={teams} />
      </div>
      <ConfirmDeleteForm
        action={deleteGame.bind(null, game.id, tournamentId)}
        confirmMessage="Delete this game? This cannot be undone."
      />
    </div>
  );
}