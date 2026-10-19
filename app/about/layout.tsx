import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about AA Chauffeurs, a licensed Wolverhampton chauffeur and private hire company offering reliable, professional transport.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
