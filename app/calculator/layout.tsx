import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Fare Calculator",
  description:
    "Get an instant fare for your journey across all AA Chauffeurs vehicle types.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
