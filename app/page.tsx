import { HomeExperience } from "./components/HomeExperience";
import { getAllPosts } from "@/lib/static-content";

export default function Home() {
  return <HomeExperience posts={getAllPosts()} />;
}
