import { getDb } from "@/db";
import { posts } from "@/db/schema";
import { getAdminApiUser } from "@/lib/admin";

export async function POST(request: Request) {
  const auth = await getAdminApiUser(); if (auth.error) return auth.error;
  const body = await request.json() as Record<string, string | boolean>;
  if (!body.title || !body.slug) return Response.json({ error: "标题和 slug 必填" }, { status: 400 });
  const [post] = await getDb().insert(posts).values({ slug: String(body.slug), title: String(body.title), excerpt: String(body.excerpt || ""), content: String(body.content || ""), destination: String(body.destination || ""), duration: String(body.duration || ""), budget: String(body.budget || ""), season: String(body.season || ""), category: String(body.category || "城市灵感"), color: String(body.color || "sage"), status: String(body.status || "draft"), featured: Boolean(body.featured) }).returning();
  return Response.json({ post }, { status: 201 });
}
