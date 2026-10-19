import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How AA Chauffeurs collects, uses and protects your personal data.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
