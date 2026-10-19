import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/constants/brand";

const ROUTES = [
  "",
  "/services",
  "/fleet",
  "/about",
  "/faq",
  "/contact",
  "/calculator",
  "/privacy",
  "/terms",
];

export default function sitemap(): MetadataRoute.Sitemap {
  return ROUTES.map((path) => ({ url: `${SITE_URL}${path}` }));
}
