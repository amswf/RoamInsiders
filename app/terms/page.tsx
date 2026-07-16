import type { Metadata } from "next";
import { LegalExperience } from "../components/LegalExperience";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Terms governing use of TravelGoGuide travel content and comparison services.",
};

export default function TermsPage() {
  return <LegalExperience kind="terms" />;
}
