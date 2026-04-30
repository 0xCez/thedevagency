"use client";

import { useState } from "react";
import type { IframeView } from "@portfolio/embeds";

export function IframeWithTabs({
  url,
  views,
  frame,
}: {
  url: string;
  views: IframeView[];
  frame: "browser" | "none";
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = views[activeIndex];
  const fullUrl = active ? `${url}${active.path}` : url;

  const iframe = (
    <iframe
      key={activeIndex}
      src={fullUrl}
      className="h-full w-full border-0"
      loading="lazy"
    />
  );

  return (
    <div>
      <section className="mb-12">
        <p className="mb-5 font-mono text-xs uppercase tracking-widest text-muted">
          ◼ Roles
        </p>
        <div className="flex flex-wrap gap-2 font-mono text-xs uppercase tracking-widest">
          {views.map((v, i) => {
            const isActive = i === activeIndex;
            return (
              <button
                key={v.label}
                type="button"
                onClick={() => setActiveIndex(i)}
                className={
                  isActive
                    ? "border border-foreground bg-foreground px-4 py-2 text-background transition"
                    : "border border-border px-4 py-2 text-muted transition hover:border-foreground hover:text-foreground"
                }
              >
                {v.label}
              </button>
            );
          })}
        </div>
      </section>

      <section>
        <p className="mb-5 font-mono text-xs uppercase tracking-widest text-muted">
          ◼ Live demo
        </p>
        <div className="-mx-6 md:-mx-12 lg:-mx-24 xl:-mx-32">
          {frame === "browser" ? (
            <BrowserFrame url={fullUrl}>{iframe}</BrowserFrame>
          ) : (
            <div className="h-[720px] w-full overflow-hidden rounded-lg border border-border">
              {iframe}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

function BrowserFrame({
  url,
  children,
}: {
  url: string;
  children: React.ReactNode;
}) {
  return (
    <div className="overflow-hidden rounded-lg border border-border bg-zinc-950 shadow-2xl">
      <div className="flex items-center gap-2 border-b border-border px-4 py-2">
        <span className="h-2.5 w-2.5 rounded-full bg-zinc-700" />
        <span className="h-2.5 w-2.5 rounded-full bg-zinc-700" />
        <span className="h-2.5 w-2.5 rounded-full bg-zinc-700" />
        <span className="ml-3 truncate font-mono text-xs text-muted">
          {url}
        </span>
      </div>
      <div className="h-[720px] w-full bg-white">{children}</div>
    </div>
  );
}
