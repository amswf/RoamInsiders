import { requireChatGPTUser, chatGPTSignOutPath } from "../chatgpt-auth";
import { claimOrCheckAdmin } from "@/lib/admin";
import { AdminDashboard } from "./AdminDashboard";

export const dynamic = "force-dynamic";
export const metadata = { title: "运营后台" };

export default async function AdminPage() {
  const user = await requireChatGPTUser("/admin");
  const allowed = await claimOrCheckAdmin(user);
  if (!allowed) return <main className="admin-denied"><h1>没有后台权限</h1><p>当前账号不在管理员列表中。</p></main>;
  return <AdminDashboard userName={user.displayName} signOutUrl={chatGPTSignOutPath("/")} />;
}
