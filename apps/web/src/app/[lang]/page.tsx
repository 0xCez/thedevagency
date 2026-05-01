import Link from "next/link";
import { notFound } from "next/navigation";
import { getDictionary, isLocale } from "@/lib/i18n";

export default async function Home({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const dict = await getDictionary(lang);

  return (
    <>
      {/* Hero */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-6xl px-6 lg:px-8 py-24 md:py-32 lg:py-40">
          <h1
            className="text-5xl font-semibold leading-[0.95] tracking-tight sm:text-6xl md:text-7xl lg:text-8xl"
            style={{ textWrap: "balance" }}
          >
            {dict.hero.headline}
          </h1>
          <p className="mt-8 max-w-2xl text-lg text-muted md:text-xl">
            {dict.hero.sub}
          </p>
          <div className="mt-10 flex flex-wrap gap-3 font-mono text-xs uppercase tracking-widest md:mt-12">
            <Link
              href={`/${lang}/work`}
              className="border border-foreground bg-foreground px-5 py-3 text-background transition hover:bg-transparent hover:text-foreground"
            >
              {dict.hero.ctaWork}
            </Link>
            <Link
              href={`/${lang}/contact`}
              className="border border-border px-5 py-3 transition hover:border-foreground"
            >
              {dict.hero.ctaContact}
            </Link>
          </div>
        </div>
      </section>

      {/* What we do */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-6xl px-6 lg:px-8 py-20 md:py-28">
          <p className="mb-12 font-mono text-xs uppercase tracking-widest text-muted">
            ◼ {dict.whatWeDo.label}
          </p>
          <ol className="border-y border-border">
            {dict.whatWeDo.services.map((s, i) => (
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
        </div>
      </section>

      {/* CTA */}
      <section>
        <div className="mx-auto max-w-6xl px-6 lg:px-8 py-20 text-center md:py-28">
          <h2 className="mx-auto mb-8 max-w-3xl text-3xl font-semibold tracking-tight md:text-5xl">
            {dict.homeCta.headline}
          </h2>
          <Link
            href={`/${lang}/contact`}
            className="inline-block border border-foreground bg-foreground px-6 py-3 font-mono text-xs uppercase tracking-widest text-background transition hover:bg-transparent hover:text-foreground"
          >
            {dict.homeCta.button}
          </Link>
        </div>
      </section>
    </>
  );
}
