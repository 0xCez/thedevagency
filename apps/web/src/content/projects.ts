import type { Project } from "@portfolio/embeds";
import type { Dictionary } from "@/lib/i18n";

// Phase 6 hook: this loader is the abstraction the future SaaS swaps with a DB call.
// Translatable text (tagline, architecture, features) lives in dictionaries — the
// structural data (slug, year, links, demo, techStack) lives here.

type ProjectSlug = "bet-ai" | "creator-platform" | "lastr";

type ProjectStructure = Omit<Project, "tagline" | "architecture" | "features"> & {
  slug: ProjectSlug;
};

const projectStructures: ProjectStructure[] = [
  {
    slug: "bet-ai",
    title: "Bet.AI",
    category: "mobile",
    techStack: [
      "Expo",
      "React Native",
      "Expo Router",
      "Firebase",
      "RevenueCat",
      "OpenAI",
      "Vertex AI",
      "TypeScript",
    ],
    role: "Founder / Solo Dev",
    year: 2025,
    status: "live",
    links: {
      web: "https://www.betaiapp.com",
      github: "https://github.com/0xCez/bet.ai",
    },
    demo: {
      type: "video",
      src: "/demos/bet-ai-core.mp4",
      views: [
        { label: "Core feature", src: "/demos/bet-ai-core.mp4" },
        { label: "Adjacent features", src: "/demos/bet-ai-adjacent.mp4" },
        { label: "Onboarding", src: "/demos/bet-ai-onboarding.mp4" },
      ],
    },
  },
  {
    slug: "creator-platform",
    title: "Creator Platform",
    category: "web",
    techStack: [
      "React",
      "TypeScript",
      "Vite",
      "Tailwind",
      "shadcn/ui",
      "Supabase",
      "TanStack Query",
      "Recharts",
    ],
    role: "Founder / Solo Dev",
    year: 2025,
    status: "live",
    links: {
      web: "https://www.betaiapp.com",
      github: "https://github.com/0xCez/creator-platform",
    },
    demo: {
      type: "iframe",
      url: "https://creator-platform-demo.vercel.app",
      frame: "browser",
      views: [
        { label: "Admin", path: "/dashboard?demoRole=admin" },
        { label: "UGC Creator", path: "/dashboard?demoRole=creator" },
        { label: "Clippers", path: "/dashboard?demoRole=am" },
      ],
    },
  },
  {
    slug: "lastr",
    title: "Lastr'",
    category: "mobile",
    techStack: [
      "Expo",
      "React Native",
      "Expo Router",
      "Supabase",
      "RevenueCat",
      "Zustand",
      "TypeScript",
    ],
    role: "Founder / Solo Dev",
    year: 2025,
    status: "live",
    links: {
      web: "https://lastr.app",
      github: "https://github.com/0xCez/lastr-app",
    },
    demo: {
      type: "video",
      src: "/demos/lastr-app.mp4",
      views: [
        { label: "App", src: "/demos/lastr-app.mp4" },
        { label: "Onboarding", src: "/demos/lastr-onboarding.mp4" },
      ],
    },
  },
];

export function getProjects(dict: Dictionary): Project[] {
  return projectStructures.map((p) => {
    const content = dict.projects[p.slug];
    return {
      ...p,
      tagline: content.tagline,
      architecture: content.architecture,
      features: content.features,
    };
  });
}

export function getProject(
  slug: string,
  dict: Dictionary
): Project | undefined {
  return getProjects(dict).find((p) => p.slug === slug);
}

export function getProjectSlugs(): string[] {
  return projectStructures.map((p) => p.slug);
}
