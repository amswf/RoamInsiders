import type { Metadata } from "next";
import { TravelCompareExperience } from "./TravelCompareExperience";

export const metadata: Metadata = {
  title: "Compare Hotels & Flights",
  description: "Compare hotel and flight options, then continue to a trusted travel partner with your search details intact.",
};

export default function ComparePage() {
  return <TravelCompareExperience />;
}
