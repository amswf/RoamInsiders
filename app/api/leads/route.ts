import { ensureDatabase } from "@/db/bootstrap";
import { getDb } from "@/db";
import { leads } from "@/db/schema";

export async function POST(request: Request) {
  try {
    const body = await request.json() as Record<string, string>;
    const email = body.email?.trim().toLowerCase();
    if (!email || !email.includes("@")) return Response.json({ error: "请填写有效邮箱" }, { status: 400 });
    await ensureDatabase();
    await getDb().insert(leads).values({ name: body.name?.trim() || "", email, destination: body.destination?.trim() || "", days: body.days || "", budget: body.budget || "", note: body.note?.trim() || "", source: body.source || "website" });
    return Response.json({ ok: true }, { status: 201 });
  } catch { return Response.json({ error: "提交失败" }, { status: 500 }); }
}
