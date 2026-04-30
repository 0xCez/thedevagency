import { notFound } from "next/navigation";
import Link from "next/link";
import { getProject, getProjects } from "@/content/projects";
import { ProjectDemo } from "@/components/project-demo";

export function generateStaticParams() {
  return getProjects().map((p) => ({ slug: p.slug }));
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProject(slug);
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
            ◼ {project.category} / {project.year} / {project.status}
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
                  {linkLabel(key)} →
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
        <ProjectDemo demo={project.demo} />
      </div>

      {project.architecture && (
        <Section label="Architecture">
          <Prose text={project.architecture} />
        </Section>
      )}

      {project.overview && (
        <Section label="Overview">
          <Prose text={project.overview} />
        </Section>
      )}

      {project.features && project.features.length > 0 && (
        <Section label="Features">
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
          <Section label="Metrics">
            <div className="grid gap-5 md:grid-cols-2">
              {project.metrics.users && (
                <Metric label="Users" value={project.metrics.users} />
              )}
              {project.metrics.revenue && (
                <Metric label="Revenue" value={project.metrics.revenue} />
              )}
            </div>
          </Section>
        )}

      <div className="mt-16 border-t border-border pt-8">
        <Link
          href="/work"
          className="font-mono text-xs uppercase tracking-widest text-muted hover:text-foreground"
        >
          ← All work
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

function linkLabel(key: string): string {
  switch (key) {
    case "appStore":
      return "App Store";
    case "playStore":
      return "Play Store";
    case "github":
      return "GitHub";
    case "web":
      return "Website";
    default:
      return key;
  }
}
