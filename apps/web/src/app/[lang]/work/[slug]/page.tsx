import { notFound } from "next/navigation";
import Link from "next/link";
import { getProject, getProjectSlugs } from "@/content/projects";
import { ProjectDemo } from "@/components/project-demo";
import { getDictionary, isLocale, locales, type Dictionary } from "@/lib/i18n";

export function generateStaticParams() {
  const slugs = getProjectSlugs();
  return locales.flatMap((lang) => slugs.map((slug) => ({ lang, slug })));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}) {
  const { lang, slug } = await params;
  if (!isLocale(lang)) return {};
  const dict = await getDictionary(lang);
  const project = getProject(slug, dict);
  if (!project) return {};
  return {
    title: project.title,
    description: project.tagline,
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}) {
  const { lang, slug } = await params;
  if (!isLocale(lang)) notFound();
  const dict = await getDictionary(lang);
  const project = getProject(slug, dict);
  if (!project) notFound();

  const linkEntries = project.links
    ? (Object.entries(project.links).filter(([, v]) => Boolean(v)) as [
        string,
        string,
      ][])
    : [];

  return (
    <article className="mx-auto max-w-6xl px-6 lg:px-8 py-16 md:py-20">
      <header className="mb-16">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <p className="font-mono text-xs uppercase tracking-widest text-muted">
            ◼ {dict.categories[project.category]} / {project.year} /{" "}
            {dict.status[project.status]}
          </p>
          {linkEntries.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {linkEntries.map(([key, url]) => (
                <Link
                  key={key}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border border-foreground bg-foreground px-4 py-2 font-mono text-xs uppercase tracking-widest text-background transition hover:bg-transparent hover:text-foreground"
                >
                  {linkLabel(key, dict)} →
                </Link>
              ))}
            </div>
          )}
        </div>
        <h1 className="mb-3 text-4xl font-semibold leading-[1.1] tracking-tight sm:text-5xl md:text-6xl">
          {project.title}
        </h1>
        <p className="mb-8 max-w-2xl text-lg text-muted md:text-xl">
          {project.tagline}
        </p>
        <div className="flex flex-wrap gap-2">
          {project.techStack.map((t) => (
            <span
              key={t}
              className="border border-border px-3 py-1.5 font-mono text-xs uppercase tracking-wider text-muted"
            >
              {t}
            </span>
          ))}
        </div>
      </header>

      <div className="mb-16">
        <ProjectDemo demo={project.demo} dict={dict} />
      </div>

      {project.architecture && (
        <Section label={dict.project.sections.architecture}>
          <Prose text={project.architecture} />
        </Section>
      )}

      {project.overview && (
        <Section label={dict.project.sections.overview}>
          <Prose text={project.overview} />
        </Section>
      )}

      {project.features && project.features.length > 0 && (
        <Section label={dict.project.sections.features}>
          <ul className="grid gap-x-10 gap-y-7 md:grid-cols-2">
            {project.features.map((f) => (
              <li key={f.title} className="border-l border-border pl-5">
                <h3 className="mb-2 text-base font-semibold tracking-tight md:text-lg">
                  {f.title}
                </h3>
                <p className="text-sm leading-relaxed text-muted">
                  {f.description}
                </p>
              </li>
            ))}
          </ul>
        </Section>
      )}

      {project.metrics &&
        (project.metrics.users || project.metrics.revenue) && (
          <Section label={dict.project.sections.metrics}>
            <div className="grid gap-5 md:grid-cols-2">
              {project.metrics.users && (
                <Metric
                  label={dict.project.sections.users}
                  value={project.metrics.users}
                />
              )}
              {project.metrics.revenue && (
                <Metric
                  label={dict.project.sections.revenue}
                  value={project.metrics.revenue}
                />
              )}
            </div>
          </Section>
        )}

      <div className="mt-16 border-t border-border pt-8">
        <Link
          href={`/${lang}/work`}
          className="font-mono text-xs uppercase tracking-widest text-muted hover:text-foreground"
        >
          {dict.project.backToWork}
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

function Prose({ text }: { text: string }) {
  const paragraphs = text.split(/\n\s*\n/).filter(Boolean);
  return (
    <div className="max-w-3xl space-y-4 text-base leading-relaxed text-muted">
      {paragraphs.map((p, i) => (
        <p key={i}>{p.trim()}</p>
      ))}
    </div>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="border border-border p-5">
      <p className="mb-2 font-mono text-xs uppercase tracking-widest text-muted">
        {label}
      </p>
      <p className="text-2xl font-semibold tracking-tight md:text-3xl">
        {value}
      </p>
    </div>
  );
}

function linkLabel(key: string, dict: Dictionary): string {
  switch (key) {
    case "appStore":
      return dict.links.appStore;
    case "playStore":
      return dict.links.playStore;
    case "github":
      return dict.links.github;
    case "web":
      return dict.links.web;
    default:
      return key;
  }
}
