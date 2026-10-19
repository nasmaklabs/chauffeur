import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "FAQ",
  description:
    "Answers about AA Chauffeurs pricing, licensing, airport pickups, cancellations and holiday surcharges.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
