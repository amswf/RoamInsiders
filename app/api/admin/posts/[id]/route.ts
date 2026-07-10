import { eq } from "drizzle-orm";
import { getDb } from "@/db";
import { posts } from "@/db/schema";
import { getAdminApiUser } from "@/lib/admin";

export async function PATCH(request: Request, context: { params: Promise<{ id: string }> }) {
  const auth = await getAdminApiUser(); if (auth.error) return auth.error;
  const { id } = await context.params; const body = await request.json() as Record<string, string | boolean>;
  const [post] = await getDb().update(posts).set({ slug: String(body.slug), title: String(body.title), excerpt: String(body.excerpt || ""), content: String(body.content || ""), destination: String(body.destination || ""), duration: String(body.duration || ""), budget: String(body.budget || ""), season: String(body.season || ""), category: String(body.category || "城市灵感"), color: String(body.color || "sage"), status: String(body.status || "draft"), featured: Boolean(body.featured), updatedAt: new Date().toISOString() }).where(eq(posts.id, Number(id))).returning();
  return Response.json({ post });
}

export async function DELETE(_request: Request, context: { params: Promise<{ id: string }> }) {
  const auth = await getAdminApiUser(); if (auth.error) return auth.error;
  const { id } = await context.params; await getDb().delete(posts).where(eq(posts.id, Number(id))); return Response.json({ ok: true });
}
