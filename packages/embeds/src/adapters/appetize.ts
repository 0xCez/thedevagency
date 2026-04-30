import type { AppetizeEmbed } from "../types";

export function appetizeUrl(e: AppetizeEmbed): string {
  const params = new URLSearchParams({
    device: e.device ?? "iphone15pro",
    scale: "auto",
    autoplay: "false",
    centered: "both",
    deviceColor: "black",
    appearance: "dark",
    screenOnly: "true",
  });
  return `https://appetize.io/embed/${encodeURIComponent(
    e.publicKey
  )}?${params.toString()}`;
}
