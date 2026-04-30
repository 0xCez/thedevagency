// Embed adapter types — the SaaS core abstraction.
// Adding a new demo type = add a variant here + a renderer in the web app.

export type SnackEmbed = {
  type: "snack";
  snackId: string; // e.g. "@cesar/fyp-app-1"
  device?: "iphone15" | "pixel7";
  platform?: "ios" | "android" | "web";
  theme?: "light" | "dark";
};

export type IframeView = {
  label: string;
  path: string;
};

export type IframeEmbed = {
  type: "iframe";
  url: string;
  frame?: "macbook" | "browser" | "none";
  views?: IframeView[];
};

export type StackblitzEmbed = {
  type: "stackblitz";
  repo: string; // "user/repo"
  branch?: string;
  file?: string;
};

export type AppetizeEmbed = {
  type: "appetize";
  publicKey: string;
  device?: string;
};

export type VideoView = {
  label: string;
  src: string;
  poster?: string;
};

export type VideoEmbed = {
  type: "video";
  src: string;
  poster?: string;
  views?: VideoView[];
};

export type EmbedConfig =
  | SnackEmbed
  | IframeEmbed
  | StackblitzEmbed
  | AppetizeEmbed
  | VideoEmbed;

export type ProjectCategory = "mobile" | "web";
export type ProjectStatus = "live" | "in-progress" | "archived";

export type ProjectFeature = {
  title: string;
  description: string;
};

export type Project = {
  slug: string;
  title: string;
  tagline: string;
  category: ProjectCategory;
  techStack: string[];
  role: string;
  year: number;
  status: ProjectStatus;
  links?: {
    appStore?: string;
    playStore?: string;
    web?: string;
    github?: string;
  };
  demo: EmbedConfig;
  demoFallback?: EmbedConfig;
  gallery?: string[];
  metrics?: { users?: string; revenue?: string };
  overview?: string;
  features?: ProjectFeature[];
  architecture?: string;
};
