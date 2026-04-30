import { snackUrl, appetizeUrl, type EmbedConfig } from "@portfolio/embeds";
import { IframeWithTabs } from "./iframe-with-tabs";
import { VideoWithTabs } from "./video-with-tabs";

export function ProjectDemo({ demo }: { demo: EmbedConfig }) {
  switch (demo.type) {
    case "snack":
      return (
        <Wrap label="Live demo">
          <PhoneFrame>
            <iframe
              src={snackUrl(demo)}
              className="h-full w-full border-0"
              allow="geolocation; camera; microphone"
              loading="lazy"
            />
          </PhoneFrame>
        </Wrap>
      );
    case "appetize":
      return (
        <Wrap label="Live demo">
          <PhoneFrame>
            <iframe
              src={appetizeUrl(demo)}
              className="h-full w-full border-0"
              allow="autoplay; fullscreen; clipboard-write"
              loading="lazy"
            />
          </PhoneFrame>
        </Wrap>
      );
    case "iframe":
      if (demo.views && demo.views.length > 0) {
        return (
          <IframeWithTabs
            url={demo.url}
            views={demo.views}
            frame={demo.frame === "browser" ? "browser" : "none"}
          />
        );
      }
      return (
        <Wrap label="Live demo">
          <BrowserFrame url={demo.url}>
            <iframe src={demo.url} className="h-full w-full border-0" loading="lazy" />
          </BrowserFrame>
        </Wrap>
      );
    case "video":
      if (demo.views && demo.views.length > 0) {
        return <VideoWithTabs views={demo.views} />;
      }
      return (
        <Wrap label="Live demo">
          <PhoneFrame>
            <video
              src={demo.src}
              poster={demo.poster}
              autoPlay
              muted
              loop
              playsInline
              className="h-full w-full object-cover"
            />
          </PhoneFrame>
        </Wrap>
      );
    default:
      return (
        <div className="rounded-lg border border-border p-8 text-center font-mono text-sm text-muted">
          Demo type not yet implemented: {(demo as { type: string }).type}
        </div>
      );
  }
}

function Wrap({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <section>
      <p className="mb-5 font-mono text-xs uppercase tracking-widest text-muted">
        ◼ {label}
      </p>
      {children}
    </section>
  );
}

function PhoneFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto w-[320px]">
      <div className="rounded-[2.5rem] border-[10px] border-zinc-800 bg-black p-1 shadow-2xl">
        <div className="relative h-[640px] w-full overflow-hidden rounded-[2rem] bg-black">
          {children}
        </div>
      </div>
    </div>
  );
}

function BrowserFrame({ url, children }: { url: string; children: React.ReactNode }) {
  return (
    <div className="overflow-hidden rounded-lg border border-border bg-zinc-950 shadow-2xl">
      <div className="flex items-center gap-2 border-b border-border px-4 py-2">
        <span className="h-2.5 w-2.5 rounded-full bg-zinc-700" />
        <span className="h-2.5 w-2.5 rounded-full bg-zinc-700" />
        <span className="h-2.5 w-2.5 rounded-full bg-zinc-700" />
        <span className="ml-3 truncate font-mono text-xs text-muted">{url}</span>
      </div>
      <div className="h-[560px] w-full bg-white">{children}</div>
    </div>
  );
}
