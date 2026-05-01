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
      <p className="mb-3 font-mono text-xs uppercase tracking-widest text-muted">
        ◼ {dict.about.label}
      </p>
      <h1 className="mb-12 max-w-4xl text-4xl font-semibold leading-[1.1] tracking-tight sm:text-5xl md:text-6xl">
        {dict.about.title}
      </h1>

      <Section label={dict.about.sections.whoWeAre}>
        <p className="max-w-3xl text-base leading-relaxed text-muted md:text-lg">
          {dict.about.whoWeAre}
        </p>
      </Section>

      <Section label={dict.about.sections.whatWeBelieve}>
        <ol className="grid gap-x-10 gap-y-6 md:grid-cols-2">
          {dict.about.principles.map((p) => (
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

      <Section label={dict.about.sections.theNetwork}>
        <ul className="grid gap-x-10 gap-y-2 md:grid-cols-2">
          {dict.about.networkDomains.map((d) => (
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
