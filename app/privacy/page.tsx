import type { Metadata } from "next";
import { LegalExperience } from "../components/LegalExperience";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How TravelGoGuide handles search, location, advertising, and third-party booking information.",
};

export default function PrivacyPage() {
  return <LegalExperience kind="privacy" />;
}
