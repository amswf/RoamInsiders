import { AboutExperience } from "../components/AboutExperience";
import { getSiteSettings } from "@/lib/static-content";

export const metadata = { title: "关于我们" };

export default function AboutPage() {
  return <AboutExperience settings={getSiteSettings()} />;
}
