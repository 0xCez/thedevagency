import { notFound } from "next/navigation";
import { getDictionary, isLocale } from "@/lib/i18n";

const EMAIL = "cesar@thedevagency.xyz";
const LINKEDIN = "https://www.linkedin.com/in/cesar-derey/";

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
      <header className="mb-12 md:mb-16">
        <p className="mb-3 font-mono text-xs uppercase tracking-widest text-muted">
          ◼ {dict.about.label}
        </p>
        <h1 className="mb-6 max-w-3xl text-4xl font-semibold leading-[1.1] tracking-tight sm:text-5xl md:text-6xl">
          {dict.about.greeting}
        </h1>
      </header>

      <div className="max-w-3xl space-y-6 text-lg leading-relaxed text-muted md:text-xl">
        <p>{dict.about.intro}</p>
        <p>{dict.about.products}</p>
        <p>
          {dict.about.outro}{" "}
          <a
            href={`mailto:${EMAIL}?subject=Project%20inquiry`}
            className="text-foreground underline decoration-border underline-offset-4 transition hover:decoration-foreground"
          >
            {EMAIL}
          </a>
        </p>
        <p>
          {dict.about.linkedinLine}{" "}
          <a
            href={LINKEDIN}
            target="_blank"
            rel="noopener noreferrer"
            className="text-foreground underline decoration-border underline-offset-4 transition hover:decoration-foreground"
          >
            LinkedIn →
          </a>
        </p>
      </div>
    </article>
  );
}
