import { notFound } from "next/navigation";
import Link from "next/link";
import {
  getTournamentById,
  getGroupsWithTeams,
  getGamesForTournament,
  getTeamsForGames,
  getAllTeams,
  getTeamsForTournament
} from "@/app/lib/db/queries";
import { Flag } from "@/app/components/Flag";
import { AddGroupForm } from "@/app/components/admin/AddGroupForm";
import { AssignTeamForm } from "@/app/components/admin/AssignTeamForm";
import { AddGameForm } from "@/app/components/admin/GameForm";
import { AdminGameRow } from "@/app/components/admin/AdminGameRow";
import { RemoveTeamButton } from "@/app/components/admin/RemoveTeambutton";

export default async function AdminTournamentPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const tournament = await getTournamentById(id);
  const allTeams = await getAllTeams();
  if (!tournament) notFound();

  const [groupsWithTeams, allGames] = await Promise.all([
    getGroupsWithTeams(tournament.id),
    getGamesForTournament(tournament.id),
  ]);
  const teamsInTournament= await getTeamsForTournament(tournament.id);
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
  <h2 className="mb-3 font-mono text-sm uppercase tracking-widest text-ice">Groups</h2>

  <div className="mb-4 flex flex-col gap-3">
    {groupsWithTeams.map((g) => {
      const assignedIds = new Set(g.teams.map((t) => t.id));
      const availableTeams = allTeams.filter((t) => !assignedIds.has(t.id));

      return (
        <div key={g.id} className="rounded-lg bg-surface p-4">
          <p className="mb-2 font-mono text-sm text-ice">Group {g.name}</p>
          <div className="mb-3 flex flex-wrap gap-3">
            {g.teams.map((t) => (
              <span key={t.id} className="flex items-center gap-1 font-mono text-xs text-muted">
                <Flag isoCode={t.isoCode} label={t.name} />
                {t.code}
                <RemoveTeamButton groupId={g.id} teamId={t.id} tournamentId={tournament.id} />
              </span>
            ))}
          </div>
          <AssignTeamForm groupId={g.id} availableTeams={availableTeams} />
          <AddGameForm
             tournamentId={tournament.id}
             groupId={g.id}
             fixedStage="group"
             availableTeams={g.teams}
          />
        </div>
      );
    })}
  </div>

  <AddGroupForm tournamentId={tournament.id} />
</section>

      <section className="mb-10">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="font-mono text-sm uppercase tracking-widest text-ice">Group Stage Games</h2>
        
        </div>
        {groupGames.length === 0 ? (
          <p className="rounded-lg border border-dashed border-white/10 p-4 font-mono text-sm text-muted">No group games yet.</p>
        ) : (
          <div className="flex flex-col gap-2">
            {groupGames.map((g) => <AdminGameRow key={g.id} game={g} teams={teamsById} tournamentId={tournament.id} />)}
          </div>
        )}
      </section>

      <section>
  <h2 className="mb-3 font-mono text-sm uppercase tracking-widest text-ice">Playoff Games</h2>
  {playoffGames.length > 0 && (
    <div className="mb-4 flex flex-col gap-2">
      {playoffGames.map((g) => (
        <AdminGameRow key={g.id} game={g} teams={teamsById} tournamentId={tournament.id} />
      ))}
    </div>
  )}
  <AddGameForm tournamentId={tournament.id} groupId={null} availableTeams={teamsInTournament} />
</section>
    </div>
  );
}