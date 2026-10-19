import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Contact AA Chauffeurs for bookings, enquiries and support. Based in Wolverhampton.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
