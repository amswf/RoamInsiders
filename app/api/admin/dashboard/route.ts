import { desc } from "drizzle-orm";
import { getDb } from "@/db";
import { leads, posts, settings } from "@/db/schema";
import { getAdminApiUser } from "@/lib/admin";

export async function GET() {
  const auth = await getAdminApiUser(); if (auth.error) return auth.error;
  const db = getDb();
  const [postRows, leadRows, settingRows] = await Promise.all([db.select().from(posts).orderBy(desc(posts.updatedAt)), db.select().from(leads).orderBy(desc(leads.createdAt)).limit(100), db.select().from(settings)]);
  return Response.json({ posts: postRows, leads: leadRows, settings: Object.fromEntries(settingRows.map((row) => [row.key, row.value])) });
}
