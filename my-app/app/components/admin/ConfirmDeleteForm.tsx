"use client";

export function ConfirmDeleteForm({
  action,
  confirmMessage,
  label = "Delete",
}: {
  action: (FormData: FormData) => Promise<void>;
  confirmMessage: string;
  label?: string;
}) {
  return (
    <form
      action={action}
      onSubmit={(e) => {
        if (!confirm(confirmMessage)) {
          e.preventDefault();
        }
      }}
    >
      <button type="submit" className="font-mono text-xs text-goal-light hover:underline">
        {label}
      </button>
    </form>
  );
}