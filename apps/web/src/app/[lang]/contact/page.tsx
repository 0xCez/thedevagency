import Link from "next/link";
import { notFound } from "next/navigation";
import { getDictionary, isLocale } from "@/lib/i18n";

const EMAIL = "cesar@thedevagency.xyz";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const dict = await getDictionary(lang);
  return { title: dict.contact.label };
}

export default async function ContactPage({
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
        ◼ {dict.contact.label}
      </p>
      <h1 className="mb-6 max-w-3xl text-4xl font-semibold leading-[1.1] tracking-tight sm:text-5xl md:text-6xl">
        {dict.contact.title}
      </h1>
      <p className="mb-12 max-w-2xl text-base text-muted md:text-lg">
        {dict.contact.intro}
      </p>

      <Section label={dict.contact.emailLabel}>
        <a
          href={`mailto:${EMAIL}?subject=Project%20inquiry`}
          className="inline-block border border-foreground bg-foreground px-6 py-3 font-mono text-sm tracking-tight text-background transition hover:bg-transparent hover:text-foreground"
        >
          {EMAIL} →
        </a>
        <p className="mt-5 max-w-2xl text-sm leading-relaxed text-muted">
          {dict.contact.emailIntro}
        </p>
      </Section>

      <div className="mt-16 border-t border-border pt-8">
        <Link
          href={`/${lang}`}
          className="font-mono text-xs uppercase tracking-widest text-muted hover:text-foreground"
        >
          {dict.contact.backHome}
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
