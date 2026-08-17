"use client";

import { useActionState } from "react";
import { assignTeamToGroup, AssignTeamFormState } from "@/app/lib/actions";
import { Team } from "@/app/lib/types";

export function AssignTeamForm({
  groupId,
  availableTeams,
}: {
  groupId: string;
  availableTeams: Team[];
}) {
  const action = assignTeamToGroup.bind(null, groupId);
  const [state, formAction, pending] = useActionState<AssignTeamFormState, FormData>(action, {});

  if (availableTeams.length === 0) {
    return <p className="font-mono text-xs text-muted">All teams assigned.</p>;
  }

  return (
    <form action={formAction} className="flex items-end gap-2">
      <select
        name="teamId"
        className="rounded-lg border border-white/10 bg-surface px-3 py-2 font-mono text-sm text-foreground"
      >
        {availableTeams.map((t) => (
          <option key={t.id} value={t.id}>
            {t.name}
          </option>
        ))}
      </select>
      <button
        type="submit"
        disabled={pending}
        className="rounded-lg bg-surface px-3 py-2 font-mono text-sm text-foreground disabled:opacity-50"
      >
        {pending ? "Adding…" : "+ Team"}
      </button>
      {state.errors?._form && (
        <p className="text-xs text-goal-light">{state.errors._form[0]}</p>
      )}
    </form>
  );
}