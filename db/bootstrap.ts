import { count, eq } from "drizzle-orm";
import { starterPosts, defaultSettings } from "@/lib/content";
import { getDb, getRawDb } from ".";
import { posts, settings } from "./schema";

let ready: Promise<void> | null = null;

export function ensureDatabase() {
  if (!ready) ready = bootstrap().catch((error) => { ready = null; throw error; });
  return ready;
}

async function bootstrap() {
  const d1 = getRawDb();
  await d1.batch([
    d1.prepare(`CREATE TABLE IF NOT EXISTS posts (id INTEGER PRIMARY KEY AUTOINCREMENT, slug TEXT NOT NULL UNIQUE, title TEXT NOT NULL, excerpt TEXT NOT NULL, content TEXT NOT NULL, destination TEXT NOT NULL, duration TEXT NOT NULL, budget TEXT NOT NULL, season TEXT NOT NULL, category TEXT NOT NULL DEFAULT '城市灵感', color TEXT NOT NULL DEFAULT 'sage', status TEXT NOT NULL DEFAULT 'draft', featured INTEGER NOT NULL DEFAULT 0, created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP, updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP)`),
    d1.prepare(`CREATE TABLE IF NOT EXISTS leads (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL DEFAULT '', email TEXT NOT NULL, destination TEXT NOT NULL DEFAULT '', days TEXT NOT NULL DEFAULT '', budget TEXT NOT NULL DEFAULT '', note TEXT NOT NULL DEFAULT '', source TEXT NOT NULL DEFAULT 'website', status TEXT NOT NULL DEFAULT 'new', created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP)`),
    d1.prepare(`CREATE TABLE IF NOT EXISTS settings (key TEXT PRIMARY KEY NOT NULL, value TEXT NOT NULL, updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP)`),
    d1.prepare(`CREATE TABLE IF NOT EXISTS admins (email TEXT PRIMARY KEY NOT NULL, name TEXT NOT NULL DEFAULT '', created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP)`),
    d1.prepare(`CREATE INDEX IF NOT EXISTS posts_status_idx ON posts (status)`),
    d1.prepare(`CREATE INDEX IF NOT EXISTS leads_created_idx ON leads (created_at)`),
  ]);

  const db = getDb();
  const [{ value }] = await db.select({ value: count() }).from(posts);
  if (value === 0) {
    await db.insert(posts).values(starterPosts.map(({ id: _id, ...post }) => post));
  }
  for (const [key, value] of Object.entries(defaultSettings)) {
    const existing = await db.select().from(settings).where(eq(settings.key, key)).limit(1);
    if (!existing.length) await db.insert(settings).values({ key, value });
  }
}
