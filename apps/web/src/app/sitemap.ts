import type { MetadataRoute } from "next";
import { getProjectSlugs } from "@/content/projects";

const SITE_URL = "https://thedevagency.xyz";
const locales = ["en", "fr"] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const slugs = getProjectSlugs();
  const lastMod = new Date();

  const routes: { path: string; priority: number }[] = [
    { path: "", priority: 1.0 },
    { path: "/work", priority: 0.9 },
    { path: "/about", priority: 0.7 },
    { path: "/contact", priority: 0.7 },
    ...slugs.map((s) => ({ path: `/work/${s}`, priority: 0.8 })),
  ];

  return locales.flatMap((locale) =>
    routes.map(({ path, priority }) => ({
      url: `${SITE_URL}/${locale}${path}`,
      lastModified: lastMod,
      changeFrequency: "weekly" as const,
      priority,
      alternates: {
        languages: Object.fromEntries(
          locales.map((l) => [l, `${SITE_URL}/${l}${path}`])
        ),
      },
    }))
  );
}
