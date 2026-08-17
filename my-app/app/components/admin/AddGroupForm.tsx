"use client";

import { useActionState } from "react";
import { createGroup, GroupFormState } from "@/app/lib/actions";

export function AddGroupForm({ tournamentId }: { tournamentId: string }) {
  const action = createGroup.bind(null, tournamentId);
  const [state, formAction, pending] = useActionState<GroupFormState, FormData>(action, {});

  return (
    <form action={formAction} className="flex items-end gap-2">
      <div>
        <input
          name="name"
          placeholder="A"
          maxLength={2}
          className="w-20 rounded-lg border border-white/10 bg-surface px-3 py-2 font-mono text-sm text-foreground"
        />
        {state.errors?.name && (
          <p className="mt-1 text-xs text-goal-light">{state.errors.name[0]}</p>
        )}
      </div>
      <button
        type="submit"
        disabled={pending}
        className="rounded-lg bg-ice px-3 py-2 font-mono text-sm font-semibold text-background disabled:opacity-50"
      >
        {pending ? "Adding…" : "Add group"}
      </button>
      {state.errors?._form && (
        <p className="text-xs text-goal-light">{state.errors._form[0]}</p>
      )}
    </form>
  );
}