import { authenticate } from "@/app/lib/actions";

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;

  return (
    <div className="mx-auto flex max-w-sm flex-1 flex-col justify-center px-6">
      <h1 className="mb-6 text-2xl font-bold">Admin Login</h1>
      {error && (
        <p className="mb-4 rounded-lg bg-goal-light/10 px-3 py-2 font-mono text-sm text-goal-light">
          Invalid email or password.
        </p>
      )}
      <form action={authenticate} className="flex flex-col gap-4">
        <input
          name="email"
          type="email"
          placeholder="Email"
          required
          className="rounded-lg border border-white/10 bg-surface px-3 py-2 font-mono text-sm text-foreground"
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          required
          className="rounded-lg border border-white/10 bg-surface px-3 py-2 font-mono text-sm text-foreground"
        />
        <button
          type="submit"
          className="rounded-lg bg-ice px-3 py-2 font-mono text-sm font-semibold text-background"
        >
          Sign in
        </button>
      </form>
    </div>
  );
}