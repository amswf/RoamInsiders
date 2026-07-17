import type { Metadata } from "next";
import { TravelCompareExperience } from "./TravelCompareExperience";

export const metadata: Metadata = {
  title: "Curated Global Hotel & Flight Deals",
  description: "Search hotel stays and flight options worldwide, then review the details that matter before you book.",
};

export default function ComparePage() {
  return <TravelCompareExperience />;
}
