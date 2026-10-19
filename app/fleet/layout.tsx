import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our Fleet",
  description:
    "Saloon, Comfort, wheelchair accessible, MPV and large group vehicles. View capacity and starting fares, then book online.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
