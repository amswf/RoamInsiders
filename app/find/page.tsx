import type { Metadata } from "next";
import { TravelCompareExperience } from "../compare/TravelCompareExperience";

export const metadata: Metadata = {
  title: "Compare Stays & Flights",
  description: "Set your destination, dates, and travellers, then continue to live availability and current prices.",
};

export default function FindPage() {
  return <TravelCompareExperience showFeaturedDestinations={false} showPartnerDisclosure />;
}
