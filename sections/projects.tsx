import { Badge } from "@/components/badge";
import { ExternalLinkIcon } from "@/components/icons";
import { Reveal } from "@/components/reveal";
import { Section } from "@/components/section";
import { type ProjectItem, projects } from "@/content/profile";
import { cn } from "@/lib/utils";

function ProjectCard({ project }: { project: ProjectItem }) {
  const links = [
    project.href ? { href: project.href, label: "Live site" } : null,
    project.repo ? { href: project.repo, label: "Source" } : null,
  ].filter((link): link is { href: string; label: string } => link !== null);

  return (
    <article className="group flex h-full flex-col rounded-lg border border-line bg-surface p-6 transition-colors hover:border-line-strong hover:bg-elevated">
      <div className="flex items-baseline justify-between gap-4">
        <h3 className="text-base font-semibold tracking-tight text-ink">
          {project.title}
        </h3>
        {project.year ? (
          <p className="shrink-0 font-mono text-xs text-faint">{project.year}</p>
        ) : null}
      </div>

      <p className="mt-3 text-[0.9375rem] leading-7 text-muted">
        {project.description}
      </p>

      {project.tags.length > 0 ? (
        <ul className="mt-5 flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <li key={tag}>
              <Badge>{tag}</Badge>
            </li>
          ))}
        </ul>
      ) : null}

      {links.length > 0 ? (
        <ul className="mt-auto flex flex-wrap gap-x-4 gap-y-2 pt-6">
          {links.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-muted transition-colors hover:text-ink"
              >
                {link.label}
                <ExternalLinkIcon className="h-3.5 w-3.5" />
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            </li>
          ))}
        </ul>
      ) : null}
    </article>
  );
}

export function Projects() {
  if (projects.length === 0) return null;

  return (
    <Section
      id="projects"
      eyebrow="Projects"
      title="Things I've built"
      description="A selection of work — sites and designs I've taken from an idea through to something that runs."
    >
      <ul className="grid gap-5 sm:grid-cols-2">
        {projects.map((project, index) => (
          <li
            key={project.title}
            className={cn(projects.length === 1 && "sm:col-span-2")}
          >
            <Reveal delay={index * 0.06} className="h-full">
              <ProjectCard project={project} />
            </Reveal>
          </li>
        ))}
      </ul>
    </Section>
  );
}
