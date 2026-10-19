import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Track Your Booking",
  description:
    "Look up your AA Chauffeurs booking with your reference number.",
  robots: { index: false, follow: false },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
