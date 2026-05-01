import { notFound } from "next/navigation";
import { getDictionary, isLocale } from "@/lib/i18n";
import { getProjects } from "@/content/projects";
import { ProjectCard } from "@/components/project-card";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const dict = await getDictionary(lang);
  return { title: dict.work.title };
}

export default async function WorkPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const dict = await getDictionary(lang);
  const projects = getProjects(dict);

  return (
    <section className="mx-auto max-w-6xl px-6 lg:px-8 py-16 md:py-20">
      <p className="mb-2 font-mono text-xs uppercase tracking-widest text-muted">
        ◼ {dict.work.label}
      </p>
      <h1 className="mb-10 text-3xl font-semibold tracking-tight md:text-4xl">
        {dict.work.title}
      </h1>
      <div className="grid gap-5 md:grid-cols-3">
        {projects.map((p) => (
          <ProjectCard
            key={p.slug}
            project={p}
            lang={lang}
            viewLabel={dict.projectCard.viewCase}
          />
        ))}
      </div>
    </section>
  );
}
