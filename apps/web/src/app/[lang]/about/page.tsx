import Link from "next/link";
import { notFound } from "next/navigation";
import { getDictionary, isLocale } from "@/lib/i18n";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const dict = await getDictionary(lang);
  return { title: dict.about.label };
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const dict = await getDictionary(lang);

  return (
    <article className="mx-auto max-w-6xl px-6 lg:px-8 py-16 md:py-20">
      {/* Hero */}
      <header className="mb-16">
        <p className="mb-3 font-mono text-xs uppercase tracking-widest text-muted">
          ◼ {dict.about.label}
        </p>
        <h1 className="mb-8 max-w-4xl text-4xl font-semibold leading-[1.1] tracking-tight sm:text-5xl md:text-6xl">
          {dict.about.title}
        </h1>
        <p className="max-w-3xl text-base leading-relaxed text-muted md:text-lg">
          {dict.about.intro}
        </p>
      </header>

      {/* What we've built */}
      <section className="mb-16">
        <p className="mb-8 font-mono text-xs uppercase tracking-widest text-muted">
          ◼ {dict.about.builtLabel}
        </p>
        <ol className="border-y border-border">
          {dict.about.built.map((b, i) => (
            <li
              key={b.slug}
              className="grid grid-cols-[auto_1fr] items-baseline gap-x-6 border-b border-border py-6 last:border-b-0 md:grid-cols-[60px_1fr_2fr] md:gap-x-12 md:py-8"
            >
              <span className="font-mono text-sm tabular-nums text-muted md:text-base">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="col-start-2 text-xl font-semibold tracking-tight md:text-2xl">
                <Link
                  href={`/${lang}/work/${b.slug}`}
                  className="transition hover:text-muted"
                >
                  {b.name} →
                </Link>
              </h3>
              <p className="col-span-2 mt-2 max-w-2xl text-sm leading-relaxed text-muted md:col-start-3 md:col-end-4 md:mt-0 md:text-base">
                {b.blurb}
              </p>
            </li>
          ))}
        </ol>
      </section>

      {/* How we work */}
      <section className="mb-16">
        <p className="mb-5 font-mono text-xs uppercase tracking-widest text-muted">
          ◼ {dict.about.howWeWorkLabel}
        </p>
        <p className="max-w-3xl text-base leading-relaxed text-muted md:text-lg">
          {dict.about.howWeWork}
        </p>
      </section>

      {/* Not for us */}
      <section className="mb-16">
        <p className="mb-5 font-mono text-xs uppercase tracking-widest text-muted">
          ◼ {dict.about.notForUsLabel}
        </p>
        <ul className="space-y-3">
          {dict.about.notForUs.map((item) => (
            <li
              key={item}
              className="border-l border-border pl-5 text-base leading-relaxed text-muted md:text-lg"
            >
              {item}
            </li>
          ))}
        </ul>
      </section>

      {/* CTA */}
      <div className="mt-20 border-t border-border pt-16 text-center">
        <p className="mb-4 font-mono text-xs uppercase tracking-widest text-muted">
          ◼ {dict.about.cta.label}
        </p>
        <h2 className="mx-auto mb-5 max-w-2xl text-3xl font-semibold tracking-tight md:text-4xl">
          {dict.about.cta.title}
        </h2>
        <Link
          href={`/${lang}/contact`}
          className="inline-block border border-foreground bg-foreground px-6 py-3 font-mono text-xs uppercase tracking-widest text-background transition hover:bg-transparent hover:text-foreground"
        >
          {dict.about.cta.button}
        </Link>
      </div>
    </article>
  );
}
