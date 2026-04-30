import { getProjects } from "@/content/projects";
import { ProjectCard } from "@/components/project-card";

export const metadata = { title: "Work — The Dev Agency" };

export default function WorkPage() {
  const projects = getProjects();
  return (
    <section className="mx-auto max-w-6xl px-6 lg:px-8 py-16 md:py-20">
      <p className="mb-2 font-mono text-xs uppercase tracking-widest text-muted">
        ◼ Work
      </p>
      <h1 className="mb-10 text-3xl font-semibold tracking-tight md:text-4xl">
        All projects
      </h1>
      <div className="grid gap-5 md:grid-cols-3">
        {projects.map((p) => (
          <ProjectCard key={p.slug} project={p} />
        ))}
      </div>
    </section>
  );
}
