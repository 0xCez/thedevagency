import Link from "next/link";

const services: { label: string; description: string }[] = [
  {
    label: "AI-Powered Apps",
    description:
      "Full-stack apps with LLM integration. RAG pipelines, custom agents, end-to-end product. React, Python, Figma.",
  },
  {
    label: "Automation & Co-pilots",
    description:
      "Conversational agents and workflow automation, integrated into your business stack. n8n, Zapier, Make, custom.",
  },
  {
    label: "Mobile & Web Apps",
    description:
      "End-to-end products from concept to App Store deployment. Figma, React Native, React, Next.js.",
  },
  {
    label: "Infrastructure",
    description:
      "Auth, payments, data, deployment, edge functions. Supabase, Firebase, Vercel, EAS.",
  },
];

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-6xl px-6 lg:px-8 py-24 md:py-32 lg:py-40">
          <h1
            className="text-5xl font-semibold leading-[0.95] tracking-tight sm:text-6xl md:text-7xl lg:text-8xl"
            style={{ textWrap: "balance" }}
          >
            We design, build, and ship products.
          </h1>
          <div className="mt-12 flex flex-wrap gap-3 font-mono text-xs uppercase tracking-widest md:mt-16">
            <Link
              href="/work"
              className="border border-foreground bg-foreground px-5 py-3 text-background transition hover:bg-transparent hover:text-foreground"
            >
              See selected work →
            </Link>
            <Link
              href="/contact"
              className="border border-border px-5 py-3 transition hover:border-foreground"
            >
              Start a project
            </Link>
          </div>
        </div>
      </section>

      {/* What we do */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-6xl px-6 lg:px-8 py-20 md:py-28">
          <p className="mb-12 font-mono text-xs uppercase tracking-widest text-muted">
            ◼ What we do
          </p>
          <ol className="border-y border-border">
            {services.map((s, i) => (
              <li
                key={s.label}
                className="grid grid-cols-[auto_1fr] items-baseline gap-x-8 border-b border-border py-7 last:border-b-0 md:grid-cols-[60px_1fr_2fr] md:gap-x-12 md:py-9"
              >
                <span className="font-mono text-sm tabular-nums text-muted md:text-base">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="col-start-2 text-2xl font-semibold tracking-tight md:text-3xl">
                  {s.label}
                </h3>
                <p className="col-span-2 mt-2 max-w-2xl text-sm leading-relaxed text-muted md:col-start-3 md:col-end-4 md:mt-0 md:text-base">
                  {s.description}
                </p>
              </li>
            ))}
          </ol>
          <p className="mt-12 text-base text-muted md:text-lg">
            End-to-end, or just the layer you need.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section>
        <div className="mx-auto max-w-6xl px-6 lg:px-8 py-20 text-center md:py-28">
          <h2 className="mx-auto mb-8 max-w-3xl text-3xl font-semibold tracking-tight md:text-5xl">
            Have a project in mind?
          </h2>
          <Link
            href="/contact"
            className="inline-block border border-foreground bg-foreground px-6 py-3 font-mono text-xs uppercase tracking-widest text-background transition hover:bg-transparent hover:text-foreground"
          >
            Start a project →
          </Link>
        </div>
      </section>
    </>
  );
}
