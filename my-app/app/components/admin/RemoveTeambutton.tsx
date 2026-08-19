"use client";

import { useActionState } from "react";
import { removeTeamFromGroup, RemoveTeamFormState } from "@/app/lib/actions";

export function RemoveTeamButton({
  groupId,
  teamId,
  tournamentId,
}: {
  groupId: string;
  teamId: string;
  tournamentId: string;
}) {
  const action = removeTeamFromGroup.bind(null, groupId, teamId, tournamentId);
  const [state, formAction, pending] = useActionState<RemoveTeamFormState, FormData>(action, {});

  return (
    <div className="inline-flex flex-col">
      <form
        action={formAction}
        onSubmit={(e) => {
          if (!confirm("Remove this team from the group?")) e.preventDefault();
        }}
      >
        <button
          type="submit"
          disabled={pending}
          className="font-mono text-xs text-muted hover:text-goal-light disabled:opacity-50"
        >
          ×
        </button>
      </form>
      {state.errors?._form && (
        <p className="font-mono text-[10px] text-goal-light">{state.errors._form[0]}</p>
      )}
    </div>
  );
}