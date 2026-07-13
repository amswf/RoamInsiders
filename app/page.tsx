import { HomeExperience } from "./components/HomeExperience";
import { getAllPosts, getSiteSettings } from "@/lib/static-content";

export default function Home() {
  return <HomeExperience posts={getAllPosts()} settings={getSiteSettings()} />;
}
