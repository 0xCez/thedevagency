"use client";

import { useState } from "react";
import type { VideoView } from "@portfolio/embeds";

export function VideoWithTabs({ views }: { views: VideoView[] }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = views[activeIndex];

  return (
    <div>
      <section className="mb-12">
        <p className="mb-5 font-mono text-xs uppercase tracking-widest text-muted">
          ◼ Walkthroughs
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
        <PhoneFrame>
          <video
            key={active.src}
            src={active.src}
            poster={active.poster}
            autoPlay
            muted
            loop
            playsInline
            className="h-full w-full object-cover"
          />
        </PhoneFrame>
      </section>
    </div>
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
