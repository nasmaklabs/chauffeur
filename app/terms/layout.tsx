import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description:
    "Terms and conditions for booking and travelling with AA Chauffeurs.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
