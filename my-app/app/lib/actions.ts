"use server";

import z from "zod";
import { signIn } from "@/app/lib/auth";
import { AuthError } from "next-auth";
import { redirect } from "next/navigation";
import { auth } from "@/app/lib/auth";
import { insertTournament } from "./db/queries";
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