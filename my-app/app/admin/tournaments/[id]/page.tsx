import { notFound } from "next/navigation";
import Link from "next/link";
import {
  getTournamentById,
  getGroupsWithTeams,
  getGamesForTournament,
  getTeamsForGames,
} from "@/app/lib/db/queries";
import { Flag } from "@/app/components/Flag";
import { GameRow } from "@/app/components/GameRow";

export default async function AdminTournamentPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const tournament = await getTournamentById(id);
  if (!tournament) notFound();

  const [groupsWithTeams, allGames] = await Promise.all([
    getGroupsWithTeams(tournament.id),
    getGamesForTournament(tournament.id),
  ]);
  const teamsById = new Map((await getTeamsForGames(allGames)).map((t) => [t.id, t]));

  const groupGames = allGames.filter((g) => g.stage === "group");
  const playoffGames = allGames.filter((g) => g.stage !== "group");

  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <Link href="/admin" className="font-mono text-sm text-ice">← Admin dashboard</Link>
      <h1 className="mt-4 mb-1 text-3xl font-bold">{tournament.type} {tournament.year}</h1>
      <p className="mb-10 text-muted">
        Hosted by {tournament.host} · {tournament.startDate} to {tournament.endDate}
      </p>

      <section className="mb-10">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="font-mono text-sm uppercase tracking-widest text-ice">Groups</h2>
          <span className="font-mono text-xs text-muted">Add group — next step</span>
        </div>
        {groupsWithTeams.length === 0 ? (
          <p className="rounded-lg border border-dashed border-white/10 p-4 font-mono text-sm text-muted">
            No groups yet.
          </p>
        ) : (
          <div className="flex flex-col gap-3">
            {groupsWithTeams.map((g) => (
              <div key={g.id} className="rounded-lg bg-surface p-4">
                <p className="mb-2 font-mono text-sm text-ice">Group {g.name}</p>
                <div className="flex flex-wrap gap-3">
                  {g.teams.map((t) => (
                    <span key={t.id} className="flex items-center gap-1 font-mono text-xs text-muted">
                      <Flag isoCode={t.isoCode} label={t.name} />
                      {t.code}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      <section className="mb-10">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="font-mono text-sm uppercase tracking-widest text-ice">Group Stage Games</h2>
          <span className="font-mono text-xs text-muted">Add game — next step</span>
        </div>
        {groupGames.length === 0 ? (
          <p className="rounded-lg border border-dashed border-white/10 p-4 font-mono text-sm text-muted">No group games yet.</p>
        ) : (
          <div className="flex flex-col gap-2">
            {groupGames.map((g) => <GameRow key={g.id} game={g} teams={teamsById} />)}
          </div>
        )}
      </section>

      <section>
        <div className="mb-3 flex items-center justify-between">
          <h2 className="font-mono text-sm uppercase tracking-widest text-ice">Playoff Games</h2>
          <span className="font-mono text-xs text-muted">Add game — next step</span>
        </div>
        {playoffGames.length === 0 ? (
          <p className="rounded-lg border border-dashed border-white/10 p-4 font-mono text-sm text-muted">No playoff games yet.</p>
        ) : (
          <div className="flex flex-col gap-2">
            {playoffGames.map((g) => <GameRow key={g.id} game={g} teams={teamsById} />)}
          </div>
        )}
      </section>
    </div>
  );
}