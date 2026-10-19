import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Book Online",
  description:
    "Get an instant fare and book your chauffeur or private hire journey online with AA Chauffeurs.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
