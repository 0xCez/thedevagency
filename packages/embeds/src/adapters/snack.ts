import type { SnackEmbed } from "../types";

export function snackUrl(e: SnackEmbed): string {
  const params = new URLSearchParams({
    platform: e.platform ?? "ios",
    theme: e.theme ?? "dark",
    preview: "true",
    name: e.snackId,
  });
  return `https://snack.expo.dev/embedded/${encodeURIComponent(
    e.snackId
  )}?${params.toString()}`;
}
