import { count, eq } from "drizzle-orm";
import { getDb } from "@/db";
import { ensureDatabase } from "@/db/bootstrap";
import { admins } from "@/db/schema";
import { getChatGPTUser, type ChatGPTUser } from "@/app/chatgpt-auth";

export async function claimOrCheckAdmin(user: ChatGPTUser) {
  await ensureDatabase();
  const db = getDb();
  const [{ value }] = await db.select({ value: count() }).from(admins);
  if (value === 0) {
    await db.insert(admins).values({ email: user.email, name: user.displayName }).onConflictDoNothing();
  }
  const [admin] = await db.select().from(admins).where(eq(admins.email, user.email)).limit(1);
  return Boolean(admin);
}

export async function getAdminApiUser() {
  const user = await getChatGPTUser();
  if (!user) return { user: null, error: Response.json({ error: "请先登录" }, { status: 401 }) };
  if (!(await claimOrCheckAdmin(user))) return { user: null, error: Response.json({ error: "无后台权限" }, { status: 403 }) };
  return { user, error: null };
}
