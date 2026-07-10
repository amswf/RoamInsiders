import { asc, desc, eq } from "drizzle-orm";
import { ensureDatabase } from "@/db/bootstrap";
import { getDb } from "@/db";
import { posts, settings } from "@/db/schema";
import { defaultSettings, starterPosts, type GuidePost } from "./content";

export async function getPublishedPosts(): Promise<GuidePost[]> {
  try {
    await ensureDatabase();
    return (await getDb().select().from(posts).where(eq(posts.status, "published")).orderBy(desc(posts.featured), desc(posts.updatedAt))) as GuidePost[];
  } catch {
    return starterPosts;
  }
}

export async function getPostBySlug(slug: string): Promise<GuidePost | null> {
  try {
    await ensureDatabase();
    const [post] = await getDb().select().from(posts).where(eq(posts.slug, slug)).limit(1);
    return post?.status === "published" ? post as GuidePost : null;
  } catch {
    return starterPosts.find((post) => post.slug === slug) ?? null;
  }
}

export async function getSiteSettings() {
  try {
    await ensureDatabase();
    const rows = await getDb().select().from(settings).orderBy(asc(settings.key));
    return { ...defaultSettings, ...Object.fromEntries(rows.map((row) => [row.key, row.value])) };
  } catch {
    return defaultSettings;
  }
}
