import type { Project } from "@portfolio/embeds";

// Phase 6 hook: this loader is the abstraction the future SaaS swaps with a DB call.
// Keep all reads going through getProjects() / getProject(slug).

export const projects: Project[] = [
  {
    slug: "bet-ai",
    title: "Bet.AI",
    tagline: "Scan any bet slip. Get instant AI analysis.",
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
        {
          label: "Core feature",
          src: "/demos/bet-ai-core.mp4",
        },
        {
          label: "Adjacent features",
          src: "/demos/bet-ai-adjacent.mp4",
        },
        {
          label: "Onboarding",
          src: "/demos/bet-ai-onboarding.mp4",
        },
      ],
    },
    features: [
      {
        title: "Bet slip scan",
        description:
          "Image captured via camera or gallery, OCR'd by GPT-4 Vision, then parsed into typed bet slip data and rendered as a structured analysis.",
      },
      {
        title: "Six-source data aggregation",
        description:
          "Parallel pipelines pull from The Odds API, SportsGameOdds (with key rotation), API-Sports, StatPal, API-Tennis, and WeatherAPI per request.",
      },
      {
        title: "Custom ML props model",
        description:
          "CatBoost on Google Cloud Vertex AI. 88 engineered features per prediction from real-time player game logs. NBA and soccer props hit 70%+ accuracy on high-confidence interval calls.",
      },
      {
        title: "Multi-sport coverage",
        description:
          "NBA + NCAA basketball, NFL + NCAA football, all major EU soccer leagues, MMA/UFC, and tennis Grand Slams + main tournaments.",
      },
      {
        title: "Match intelligence layer",
        description:
          "Recent form, head-to-head, momentum, x-factors, and a written AI breakdown surfaced alongside odds and value ratings on every analysis.",
      },
      {
        title: "Real-time orchestration",
        description:
          "~7K LOC of Firebase Cloud Functions running parallel async calls per analysis. Firestore cache layer with TTL controls keeps response time low across six external APIs.",
      },
    ],
    architecture: `Expo SDK 52 frontend with a Firebase backend (Auth, Firestore, Storage, ~7K LOC of Cloud Functions). Six sports data providers feed parallel pipelines covering NBA, NCAA basketball, NFL, NCAA football, all major EU soccer leagues, MMA/UFC, and tennis Grand Slams. A custom CatBoost model deployed on Google Cloud Vertex AI computes 88 engineered features per prediction, hitting 70%+ accuracy on high-confidence interval player prop calls.`,
  },
  {
    slug: "creator-platform",
    title: "Creator Platform",
    tagline: "End-to-end UGC creator management for Bet.AI's growth team.",
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
    features: [
      {
        title: "Engagement ingestion",
        description:
          "Apify actors and custom scrapers ingest engagement metrics on thousands of posts from hundreds of creators daily, upserted into Postgres.",
      },
      {
        title: "RevenueCat sync",
        description:
          "Subscription and revenue data pulled from RevenueCat for per-creator attribution and downstream KPI calculation.",
      },
      {
        title: "Revenue KPIs",
        description:
          "Admin dashboard tracks eCPM, RPM, ARPU, and total revenue across creators and time windows, computed via Postgres views.",
      },
      {
        title: "Payout engine",
        description:
          "Per-creator payouts computed from view thresholds and post-count tiers; surfaced in an admin review queue and per-creator payout history tabs.",
      },
      {
        title: "Sports-aware calendar",
        description:
          "Upcoming games scraped from sports APIs, paired with content-format templates so creators can plan posts against live events.",
      },
      {
        title: "Applications dashboard",
        description:
          "Admin reviews creator applications, approves/rejects, and manages role-based access (creator / AM / admin) backed by Supabase Auth + RLS.",
      },
    ],
    architecture: `Multi-role SaaS on Vite + React with a Supabase backend (Postgres, Auth, Storage, Deno Edge Functions). Apify actors and custom scrapers ingest engagement metrics on thousands of posts from hundreds of creators daily; RevenueCat data is pulled for revenue attribution. Three role-gated dashboards — UGC creator, account manager, admin — share one schema scoped by RLS.`,
  },
  {
    slug: "lastr",
    title: "Lastr'",
    tagline: "Take control. Last longer.",
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
        {
          label: "App",
          src: "/demos/lastr-app.mp4",
        },
        {
          label: "Onboarding",
          src: "/demos/lastr-onboarding.mp4",
        },
      ],
    },
    features: [
      {
        title: "13-step onboarding flow",
        description:
          "Welcome → questions → symptoms → social proof → analyzing → analysis reveal → education → custom plan → rating → paywall → login. Built around perceived effort, personalization, and psychological hooks.",
      },
      {
        title: "Reanimated 3 transitions",
        description:
          "Every screen uses spring/timing animations and FadeInDown entries. Layout transitions, interpolated gestures, sharedValue state. Movement reads as kinetic — no jumps, no jank.",
      },
      {
        title: "Ambient visual layer",
        description:
          "LinearGradient backgrounds, BlurView overlays, animated ambient glows behind hero CTAs. Consistent black + warm amber palette across every surface in the app.",
      },
      {
        title: "Tactile feedback",
        description:
          "expo-haptics fires on every meaningful interaction — taps, swipes, screen advance. Calibrated to reinforce intent without being noisy.",
      },
      {
        title: "Custom design system",
        description:
          "Hand-built reusable components: ShimmerCTA, AnimatedSplash, AnimatedIcon, OnboardingProgressBar, ProgressGraph, OptionButton. DM Sans + Inter typography, single color constants file.",
      },
      {
        title: "90-day program engine",
        description:
          "Daily sessions across three modalities (body-scan, breathing, physical) with Lottie cues and timers. Streak, score, and day tracked in Zustand (AsyncStorage-persisted) and Supabase. RevenueCat gates the full program.",
      },
    ],
    architecture: `Expo SDK 52 + Expo Router + Supabase + Zustand, shipped to TestFlight and the App Store. The technical investment is concentrated in the interaction layer — Reanimated 3 transitions, Lottie cues, expo-haptics on every interaction, gradient and blur ambient backgrounds, and a 13-step onboarding flow architected around social proof, perceived effort, and a custom-plan reveal moment.`,
  },
];

export function getProjects(): Project[] {
  return projects;
}

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
