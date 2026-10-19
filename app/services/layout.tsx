import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our Services",
  description:
    "Airport transfers, corporate travel and event transport with professional chauffeurs. Fixed prices on pre-booked journeys, available 24/7.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
