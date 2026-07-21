import { TournamentForm } from "../../tournamentForm";

export default function NewTournamentPage() {
  return (
    <div className="mx-auto max-w-md px-6 py-16">
      <h1 className="mb-8 text-2xl font-bold">New Tournament</h1>
      <TournamentForm />
    </div>
  );
}