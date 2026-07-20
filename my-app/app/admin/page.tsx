import { auth, signOut } from "@/app/lib/auth";

export default async function AdminPage() {
  const session = await auth();

  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="mb-2 text-3xl font-bold">Admin</h1>
      <p className="mb-8 text-muted">Signed in as {session?.user?.email}</p>
      <form
        action={async () => {
          "use server";
          await signOut({ redirectTo: "/" });
        }}
      >
        <button className="rounded-lg bg-surface px-3 py-2 font-mono text-sm text-foreground">
          Sign out
        </button>
      </form>
    </div>
  );
}