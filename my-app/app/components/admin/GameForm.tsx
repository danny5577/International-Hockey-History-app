"use client";

import { useActionState } from "react";
import { createGame, GameFormState } from "@/app/lib/actions";
import { Team, GameStage } from "@/app/lib/types";

const PLAYOFF_STAGES: { value: GameStage; label: string }[] = [
  { value: "quarterfinal", label: "Quarterfinal" },
  { value: "semifinal", label: "Semifinal" },
  { value: "bronze", label: "Bronze Medal Game" },
  { value: "final", label: "Final" },
  { value: "relegation", label: "Relegation" },
];

export function AddGameForm({
  tournamentId,
  groupId,
  fixedStage,
  availableTeams,
}: {
  tournamentId: string;
  groupId: string | null;
  fixedStage?: GameStage;
  availableTeams: Team[];
}) {
  const action = createGame.bind(null, tournamentId, groupId);
  const [state, formAction, pending] = useActionState<GameFormState, FormData>(action, {});

  if (availableTeams.length < 2) {
    return (
      <p className="font-mono text-xs text-muted">
        Assign at least two teams before adding games.
      </p>
    );
  }

  return (
    <form action={formAction} className="flex flex-col gap-3 rounded-lg border border-white/10 p-4">
      {state.errors?._form && (
        <p className="font-mono text-xs text-goal-light">{state.errors._form[0]}</p>
      )}

      {fixedStage ? (
        <input type="hidden" name="stage" value={fixedStage} />
      ) : (
        <div>
          <label className="mb-1 block font-mono text-xs uppercase tracking-widest text-muted">
            Stage
          </label>
          <select
            name="stage"
            className="w-full rounded-lg border border-white/10 bg-background px-3 py-2 font-mono text-sm text-foreground"
          >
            {PLAYOFF_STAGES.map((s) => (
              <option key={s.value} value={s.value}>
                {s.label}
              </option>
            ))}
          </select>
        </div>
      )}

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="mb-1 block font-mono text-xs uppercase tracking-widest text-muted">
            Home team
          </label>
          <select
            name="homeTeamId"
            className="w-full rounded-lg border border-white/10 bg-background px-3 py-2 font-mono text-sm text-foreground"
          >
            {availableTeams.map((t) => (
              <option key={t.id} value={t.id}>
                {t.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="mb-1 block font-mono text-xs uppercase tracking-widest text-muted">
            Away team
          </label>
          <select
            name="awayTeamId"
            className="w-full rounded-lg border border-white/10 bg-background px-3 py-2 font-mono text-sm text-foreground"
          >
            {availableTeams.map((t) => (
              <option key={t.id} value={t.id}>
                {t.name}
              </option>
            ))}
          </select>
        </div>
      </div>
      {state.errors?.awayTeamId && (
        <p className="-mt-2 font-mono text-xs text-goal-light">{state.errors.awayTeamId[0]}</p>
      )}

      <div>
        <label className="mb-1 block font-mono text-xs uppercase tracking-widest text-muted">Date</label>
        <input
          name="date"
          type="date"
          className="w-full rounded-lg border border-white/10 bg-background px-3 py-2 font-mono text-sm text-foreground"
        />
        {state.errors?.date && (
          <p className="mt-1 font-mono text-xs text-goal-light">{state.errors.date[0]}</p>
        )}
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="mb-1 block font-mono text-xs uppercase tracking-widest text-muted">
            Home score
          </label>
          <input
            name="homeScore"
            type="number"
            min={0}
            defaultValue={0}
            className="w-full rounded-lg border border-white/10 bg-background px-3 py-2 font-mono text-sm text-foreground"
          />
        </div>
        <div>
          <label className="mb-1 block font-mono text-xs uppercase tracking-widest text-muted">
            Away score
          </label>
          <input
            name="awayScore"
            type="number"
            min={0}
            defaultValue={0}
            className="w-full rounded-lg border border-white/10 bg-background px-3 py-2 font-mono text-sm text-foreground"
          />
        </div>
      </div>

      <label className="flex items-center gap-2 font-mono text-xs text-muted">
        <input type="checkbox" name="overtime" />
        Decided in overtime / shootout
      </label>

      <button
        type="submit"
        disabled={pending}
        className="rounded-lg bg-ice px-3 py-2 font-mono text-sm font-semibold text-background disabled:opacity-50"
      >
        {pending ? "Adding…" : "Add game"}
      </button>
    </form>
  );
}