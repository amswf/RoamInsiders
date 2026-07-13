import { GuidesExperience } from "../components/GuidesExperience";
import { getAllPosts, getSiteSettings } from "@/lib/static-content";

export const metadata = { title: "旅行内容" };

export default function GuidesPage() {
  return <GuidesExperience posts={getAllPosts()} settings={getSiteSettings()} />;
}
