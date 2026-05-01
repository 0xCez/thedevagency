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
    <article className="mx-auto max-w-6xl px-6 lg:px-8 py-20 md:py-28">
      <p className="mb-6 font-mono text-xs uppercase tracking-widest text-muted">
        ◼ {dict.about.label}
      </p>

      <h1 className="mb-10 text-4xl font-semibold leading-[1.1] tracking-tight sm:text-5xl md:text-6xl">
        {dict.about.greeting}
      </h1>

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
      </div>
    </article>
  );
}
