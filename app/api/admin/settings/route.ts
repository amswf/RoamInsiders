import { getDb } from "@/db";
import { settings } from "@/db/schema";
import { getAdminApiUser } from "@/lib/admin";

export async function PATCH(request: Request) {
  const auth = await getAdminApiUser(); if (auth.error) return auth.error;
  const body = await request.json() as Record<string, string>;
  for (const [key, value] of Object.entries(body)) await getDb().insert(settings).values({ key, value, updatedAt: new Date().toISOString() }).onConflictDoUpdate({ target: settings.key, set: { value, updatedAt: new Date().toISOString() } });
  return Response.json({ ok: true });
}
