import Link from "next/link";

export const metadata = { title: "Contact — The Dev Agency" };

const EMAIL = "hello@thedevagency.xyz";

export default function ContactPage() {
  return (
    <article className="mx-auto max-w-6xl px-6 lg:px-8 py-16 md:py-20">
      <p className="mb-3 font-mono text-xs uppercase tracking-widest text-muted">
        ◼ Contact
      </p>
      <h1 className="mb-6 max-w-3xl text-4xl font-semibold leading-[1.1] tracking-tight sm:text-5xl md:text-6xl">
        Tell us about your project.
      </h1>
      <p className="mb-12 max-w-2xl text-base text-muted md:text-lg">
        The more concrete, the better. Stage, scope, timeline, what&apos;s
        stuck. We&apos;ll respond within 48 hours.
      </p>

      <Section label="Email">
        <a
          href={`mailto:${EMAIL}?subject=Project%20inquiry`}
          className="inline-block border border-foreground bg-foreground px-6 py-3 font-mono text-sm tracking-tight text-background transition hover:bg-transparent hover:text-foreground"
        >
          {EMAIL} →
        </a>
        <p className="mt-5 max-w-2xl text-sm leading-relaxed text-muted">
          Include: what you&apos;re building, where you are (idea / MVP /
          scaling), what you need (end-to-end / a specific layer), and your
          rough timeline. The more context up front, the faster we can tell
          you whether we&apos;re a fit.
        </p>
      </Section>

      <div className="mt-16 border-t border-border pt-8">
        <Link
          href="/"
          className="font-mono text-xs uppercase tracking-widest text-muted hover:text-foreground"
        >
          ← Home
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
