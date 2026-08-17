import type { Metadata } from "next";
import { FindExperience } from "./FindExperience";

export const metadata: Metadata = {
  title: "Compare Stays & Flights",
  description: "Set your destination, dates, and travellers, then continue to live availability and current prices.",
};

export default function FindPage() {
  return <FindExperience variant="classic" />;
}
