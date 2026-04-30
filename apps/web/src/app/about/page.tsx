import Link from "next/link";

export const metadata = { title: "About — The Dev Agency" };

const principles: { number: string; title: string; body: string }[] = [
  {
    number: "01",
    title: "Design and code ship from the same brain.",
    body: "Same person designs and builds. No handoffs, no translation loss.",
  },
  {
    number: "02",
    title: "Production from day one.",
    body: "We build for shipping, not for portfolios.",
  },
  {
    number: "03",
    title: "Lean stacks > fashionable stacks.",
    body: "We pick tools for shipping speed, not LinkedIn cred.",
  },
  {
    number: "04",
    title: "We tell you when we're not the right fit.",
    body: "We run lean. Better to know early than waste each other's time.",
  },
];

const networkDomains: string[] = [
  "Native iOS / Swift",
  "Native Android / Kotlin",
  "ML & data (Python, PyTorch)",
  "Backend depth (Go, Rust, Postgres)",
  "Design systems",
  "Motion (Lottie, Rive)",
  "Growth analytics",
  "Copy + content",
];

export default function AboutPage() {
  return (
    <article className="mx-auto max-w-6xl px-6 lg:px-8 py-16 md:py-20">
      <p className="mb-3 font-mono text-xs uppercase tracking-widest text-muted">
        ◼ About
      </p>
      <h1 className="mb-12 max-w-4xl text-4xl font-semibold leading-[1.1] tracking-tight sm:text-5xl md:text-6xl">
        A small studio. Production-grade output.
      </h1>

      <Section label="Who we are">
        <p className="max-w-3xl text-base leading-relaxed text-muted md:text-lg">
          A tight core plus a curated network of specialists. We work with
          founders building from zero, and with teams polishing what&apos;s
          already there.
        </p>
      </Section>

      <Section label="What we believe">
        <ol className="grid gap-x-10 gap-y-6 md:grid-cols-2">
          {principles.map((p) => (
            <li key={p.number} className="border-l border-border pl-5">
              <p className="mb-2 font-mono text-xs uppercase tracking-widest text-muted">
                {p.number}
              </p>
              <h3 className="mb-2 text-base font-semibold tracking-tight md:text-lg">
                {p.title}
              </h3>
              <p className="text-sm leading-relaxed text-muted">{p.body}</p>
            </li>
          ))}
        </ol>
      </Section>

      <Section label="The network">
        <ul className="grid gap-x-10 gap-y-2 md:grid-cols-2">
          {networkDomains.map((d) => (
            <li
              key={d}
              className="border-l border-border pl-3 font-mono text-sm text-muted"
            >
              → {d}
            </li>
          ))}
        </ul>
      </Section>

      <div className="mt-20 border-t border-border pt-16 text-center">
        <p className="mb-4 font-mono text-xs uppercase tracking-widest text-muted">
          ◼ Get in touch
        </p>
        <h2 className="mx-auto mb-5 max-w-2xl text-3xl font-semibold tracking-tight md:text-4xl">
          Working on something?
        </h2>
        <Link
          href="/contact"
          className="inline-block border border-foreground bg-foreground px-6 py-3 font-mono text-xs uppercase tracking-widest text-background transition hover:bg-transparent hover:text-foreground"
        >
          Start a project →
        </Link>
      </div>
    </article>
  );
}

function Section({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mb-16">
      <p className="mb-5 font-mono text-xs uppercase tracking-widest text-muted">
        ◼ {label}
      </p>
      {children}
    </section>
  );
}
