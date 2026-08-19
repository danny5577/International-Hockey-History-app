"use server";

import z from "zod";
import { signIn } from "@/app/lib/auth";
import { AuthError } from "next-auth";
import { redirect } from "next/navigation";
import { auth } from "@/app/lib/auth";
import { insertTournament, insertGroup, insertGroupTeam,
   getGroupById, isTeamInGroup, getTournamentById, insertGame,
  deleteGameById, teamHasGamesInTournament, deleteGroupTeam } from "./db/queries";
import { revalidatePath } from "next/cache";

export async function authenticate(formData: FormData) {
  try {
    await signIn("credentials", {
      email: formData.get("email"),
      password: formData.get("password"),
      redirectTo: "/admin",
    });
  } catch (error) {
    if (error instanceof AuthError) {
      redirect("/login?error=1");
    }
    throw error;
  }
}

const tournamentSchema = z.object({
  type: z.enum(["WC", "OG"]),
  year: z.coerce.number().int().min(1920).max(2100),
  host: z.string().min(1, "Host is required"),
  startDate: z.string().min(1, "Start date is required"),
  endDate: z.string().min(1, "End date is required"),
});

export type TournamentFormState = {
  errors?: {
    type?: string[];
    year?: string[];
    host?: string[];
    startDate?: string[];
    endDate?: string[];
    _form?: string[];
  };
};


export async function createTournament(
  prevState: TournamentFormState,
  formData: FormData
): Promise<TournamentFormState> {
 
//Defence in depth principle- not relying on auth only in proxy.ts
  const session = await auth();
  if (!session?.user) {
    return { errors: { _form: ["Not authorized."] } };
  }

  const parsed = tournamentSchema.safeParse({
    type: formData.get("type"),
    year: formData.get("year"),
    host: formData.get("host"),
    startDate: formData.get("startDate"),
    endDate: formData.get("endDate"),
  });

  if (!parsed.success) {
    return { errors: z.flattenError(parsed.error).fieldErrors};
  }

  const { type, year, host, startDate, endDate } = parsed.data;
  const id = `${type.toLowerCase()}-${year}`;

  try {
    await insertTournament({ id, type, year, host, startDate, endDate });
  } catch {
    return { errors: { _form: ["A tournament of this type and year already exists."] } };
  }

  revalidatePath("/admin");
  revalidatePath(type === "WC" ? "/wc" : "/olympics");
  redirect("/admin");
}



//create group action
const groupSchema = z.object({
  name: z.string().min(1, "Required").max(2, "Use a short label, e.g. A"),
});

export type GroupFormState = { errors?: { name?: string[]; _form?: string[] } };

export async function createGroup(
  tournamentId: string,
  prevState: GroupFormState,
  formData: FormData
): Promise<GroupFormState> {
  const session = await auth();
  if (!session?.user) return { errors: { _form: ["Not authorized."] } };

  const parsed = groupSchema.safeParse({ name: formData.get("name") });
  if (!parsed.success) return { errors: z.flattenError(parsed.error).fieldErrors };

  const id = `${tournamentId}-${parsed.data.name}`;
  try {
    await insertGroup({ id, tournamentId, name: parsed.data.name });
  } catch {
    return { errors: { _form: ["A group with this name already exists."] } };
  }

  revalidatePath(`/admin/tournaments/${tournamentId}`);
  return {};
}

const assignTeamSchema = z.object({
  teamId: z.string().min(1, "Select a team"),
});

export type AssignTeamFormState = { errors?: { teamId?: string[]; _form?: string[] } };

export async function assignTeamToGroup(
  groupId: string,
  prevState: AssignTeamFormState,
  formData: FormData
): Promise<AssignTeamFormState> {
  const session = await auth();
  if (!session?.user) return { errors: { _form: ["Not authorized."] } };

  const parsed = assignTeamSchema.safeParse({ teamId: formData.get("teamId") });
  if (!parsed.success) return { errors: z.flattenError(parsed.error).fieldErrors };

  const group = await getGroupById(groupId);
  if (!group) return { errors: { _form: ["Group not found."] } };

  if (await isTeamInGroup(groupId, parsed.data.teamId)) {
    return { errors: { _form: ["This team is already in the group."] } };
  }

  await insertGroupTeam(groupId, parsed.data.teamId);
  revalidatePath(`/admin/tournaments/${group.tournamentId}`);
  return {};
}

const gameSchema = z
  .object({
    stage: z.enum(["group", "quarterfinal", "semifinal", "bronze", "final", "relegation"]),
    homeTeamId: z.string().min(1, "Select a team"),
    awayTeamId: z.string().min(1, "Select a team"),
    date: z.string().min(1, "Date required"),
    homeScore: z.coerce.number().int().min(0, "Must be 0 or more"),
    awayScore: z.coerce.number().int().min(0, "Must be 0 or more"),
  })
  .refine((data) => data.homeTeamId !== data.awayTeamId, {
    message: "Home and away teams must be different",
    path: ["awayTeamId"],
  });

export type GameFormState = {
  errors?: {
    stage?: string[];
    homeTeamId?: string[];
    awayTeamId?: string[];
    date?: string[];
    homeScore?: string[];
    awayScore?: string[];
    _form?: string[];
  };
};

export async function createGame(
  tournamentId: string,
  groupId: string | null,
  prevState: GameFormState,
  formData: FormData
): Promise<GameFormState> {
  const session = await auth();
  if (!session?.user) return { errors: { _form: ["Not authorized."] } };

  const parsed = gameSchema.safeParse({
    stage: formData.get("stage"),
    homeTeamId: formData.get("homeTeamId"),
    awayTeamId: formData.get("awayTeamId"),
    date: formData.get("date"),
    homeScore: formData.get("homeScore"),
    awayScore: formData.get("awayScore"),
  });

  if (!parsed.success) {
    return { errors: z.flattenError(parsed.error).fieldErrors };
  }

  const overtime = formData.get("overtime") === "on"; // see checkbox note above

  await insertGame({
    id: crypto.randomUUID(),
    tournamentId,
    groupId: parsed.data.stage === "group" ? groupId : null,
    stage: parsed.data.stage,
    date: parsed.data.date,
    homeTeamId: parsed.data.homeTeamId,
    awayTeamId: parsed.data.awayTeamId,
    homeScore: parsed.data.homeScore,
    awayScore: parsed.data.awayScore,
    overtime,
  });

  const tournament = await getTournamentById(tournamentId);
  revalidatePath(`/admin/tournaments/${tournamentId}`);
  if (tournament) {
    revalidatePath(tournament.type === "WC" ? `/wc/${tournament.year}` : `/olympics/${tournament.year}`);
  }

  return {};
}

export async function deleteGame(gameId: string, tournamentId: string, _formData: FormData) {
  const session = await auth();
  if (!session?.user) return;

  await deleteGameById(gameId);

  const tournament = await getTournamentById(tournamentId);
  revalidatePath(`/admin/tournaments/${tournamentId}`);
  if (tournament) {
    revalidatePath(tournament.type === "WC" ? `/wc/${tournament.year}` : `/olympics/${tournament.year}`);
  }
}

export type RemoveTeamFormState = { errors?: { _form?: string[] } };

export async function removeTeamFromGroup(
  groupId: string,
  teamId: string,
  tournamentId: string,
  prevState: RemoveTeamFormState,
  formData: FormData
): Promise<RemoveTeamFormState> {
  const session = await auth();
  if (!session?.user) return { errors: { _form: ["Not authorized."] } };

  const hasGames = await teamHasGamesInTournament(tournamentId, teamId);
  if (hasGames) {
    return { errors: { _form: ["This team has games recorded — delete those first."] } };
  }

  await deleteGroupTeam(groupId, teamId);
  revalidatePath(`/admin/tournaments/${tournamentId}`);
  return {};
}