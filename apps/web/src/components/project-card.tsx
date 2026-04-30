import Link from "next/link";
import type { Project } from "@portfolio/embeds";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <Link
      href={`/work/${project.slug}`}
      className="group flex h-full flex-col border border-border p-5 transition hover:border-foreground"
    >
      <div className="mb-4 flex items-center justify-between font-mono text-xs uppercase tracking-widest text-muted">
        <span>{project.category}</span>
        <span>{project.year}</span>
      </div>
      <h3 className="mb-2 text-xl font-semibold tracking-tight md:text-2xl">
        {project.title}
      </h3>
      <p className="mb-4 text-sm text-muted">{project.tagline}</p>
      <div className="mb-5 flex flex-1 flex-wrap content-start gap-1">
        {project.techStack.map((t) => (
          <span
            key={t}
            className="border border-border px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-muted"
          >
            {t}
          </span>
        ))}
      </div>
      <div className="font-mono text-xs text-muted group-hover:text-foreground">
        View case study →
      </div>
    </Link>
  );
}
