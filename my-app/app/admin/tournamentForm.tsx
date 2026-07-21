"use client";

import { useActionState } from "react";
import { createTournament, TournamentFormState } from "@/app/lib/actions";

const initialState: TournamentFormState = {};

export function TournamentForm() {
  const [state, formAction, pending] = useActionState(createTournament, initialState);

  return (
    <form action={formAction} className="flex flex-col gap-4">
      {state.errors?._form && (
        <p className="rounded-lg bg-goal-light/10 px-3 py-2 font-mono text-sm text-goal-light">
          {state.errors._form[0]}
        </p>
      )}

      <div>
        <label className="mb-1 block font-mono text-xs uppercase tracking-widest text-muted">
          Type
        </label>
        <select
          name="type"
          className="w-full rounded-lg border border-white/10 bg-surface px-3 py-2 font-mono text-sm text-foreground"
        >
          <option value="WC">World Championship</option>
          <option value="OLYMPICS">Olympic Games</option>
        </select>
      </div>

      <div>
        <label className="mb-1 block font-mono text-xs uppercase tracking-widest text-muted">Year</label>
        <input
          name="year"
          type="number"
          className="w-full rounded-lg border border-white/10 bg-surface px-3 py-2 font-mono text-sm text-foreground"
        />
        {state.errors?.year && (
          <p className="mt-1 text-xs text-goal-light">{state.errors.year[0]}</p>
        )}
      </div>

      <div>
        <label className="mb-1 block font-mono text-xs uppercase tracking-widest text-muted">Host</label>
        <input
          name="host"
          type="text"
          className="w-full rounded-lg border border-white/10 bg-surface px-3 py-2 font-mono text-sm text-foreground"
        />
        {state.errors?.host && (
          <p className="mt-1 text-xs text-goal-light">{state.errors.host[0]}</p>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="mb-1 block font-mono text-xs uppercase tracking-widest text-muted">
            Start date
          </label>
          <input
            name="startDate"
            type="date"
            className="w-full rounded-lg border border-white/10 bg-surface px-3 py-2 font-mono text-sm text-foreground"
          />
          {state.errors?.startDate && (
            <p className="mt-1 text-xs text-goal-light">{state.errors.startDate[0]}</p>
          )}
        </div>
        <div>
          <label className="mb-1 block font-mono text-xs uppercase tracking-widest text-muted">
            End date
          </label>
          <input
            name="endDate"
            type="date"
            className="w-full rounded-lg border border-white/10 bg-surface px-3 py-2 font-mono text-sm text-foreground"
          />
          {state.errors?.endDate && (
            <p className="mt-1 text-xs text-goal-light">{state.errors.endDate[0]}</p>
          )}
        </div>
      </div>

      <button
        type="submit"
        disabled={pending}
        className="rounded-lg bg-ice px-3 py-2 font-mono text-sm font-semibold text-background disabled:opacity-50"
      >
        {pending ? "Creating…" : "Create tournament"}
      </button>
    </form>
  );
}