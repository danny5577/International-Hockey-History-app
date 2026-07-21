// app/admin/page.tsx
import Link from "next/link";
import { auth, signOut } from "@/app/lib/auth";
import { getAllTournaments } from "@/app/lib/db/queries";

export default async function AdminPage() {
  const session = await auth();
  const allTournaments = await getAllTournaments();

  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Admin</h1>
          <p className="text-muted">Signed in as {session?.user?.email}</p>
        </div>
        <form
          action={async () => {
            "use server";
            await signOut({ redirectTo: "/" });
          }}
        >
          <button className="rounded-lg hover:bg-blue-900 bg-surface px-3 py-2 font-mono text-sm text-foreground">
            Sign out
          </button>
        </form>
      </div>

      <div className="mb-6 flex items-center justify-between">
        <h2 className="font-mono text-sm uppercase tracking-widest text-ice">Tournaments</h2>
        <Link
          href="/admin/tournaments/new"
          className="rounded-lg bg-ice px-3 py-2 font-mono text-sm font-semibold text-background"
        >
          + New Tournament
        </Link>
      </div>

      <ul className="flex flex-col gap-2">
        {allTournaments.map((t) => (
          <li key={t.id} className="rounded-lg bg-surface p-4 font-mono text-sm">
            {t.type} {t.year} — hosted by {t.host}
          </li>
        ))}
      </ul>
    </div>
  );
}