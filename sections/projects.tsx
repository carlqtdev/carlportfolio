import Image from "next/image";

import { Badge } from "@/components/badge";
import { ExternalLinkIcon } from "@/components/icons";
import { Reveal } from "@/components/reveal";
import { Section } from "@/components/section";
import { type ProjectItem, projects } from "@/content/profile";
import { cn } from "@/lib/utils";

function ProjectCard({
  project,
  wide = false,
}: {
  project: ProjectItem;
  wide?: boolean;
}) {
  const links = [
    project.href ? { href: project.href, label: "Live site" } : null,
    project.repo ? { href: project.repo, label: "Source" } : null,
  ].filter((link): link is { href: string; label: string } => link !== null);

  return (
    <article
      className={cn(
        "spooky-card group flex h-full flex-col overflow-hidden rounded-lg border border-line bg-surface transition-colors hover:border-line-strong hover:bg-elevated",
        wide && "sm:flex-row",
      )}
    >
      {project.image ? (
        <div
          className={cn(
            "relative aspect-[4/3] overflow-hidden border-b border-line bg-elevated",
            wide &&
              "sm:w-1/2 sm:shrink-0 sm:border-r sm:border-b-0",
          )}
        >
          <Image
            src={project.image}
            alt={`Preview of ${project.title}`}
            fill
            sizes={
              wide
                ? "(min-width: 1024px) 480px, 100vw"
                : "(min-width: 1024px) 464px, (min-width: 640px) 50vw, 100vw"
            }
            className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.02] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
          />
        </div>
      ) : null}

      <div
        className={cn(
          "flex flex-1 flex-col p-6",
          wide && "sm:justify-center sm:p-8",
        )}
      >
        <div className="flex items-baseline justify-between gap-4">
          <h3 className="text-base font-semibold tracking-tight text-ink">
            {project.title}
          </h3>
          {project.year ? (
            <p className="shrink-0 font-mono text-xs text-faint">
              {project.year}
            </p>
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
      </div>
    </article>
  );
}

export function Projects() {
  if (projects.length === 0) return null;

  // A lone project fills the row instead of leaving half the grid empty.
  const wide = projects.length === 1;

  return (
    <Section
      id="projects"
      eyebrow="Projects"
      title="Things I've built"
      description="A selection of work — sites and designs I've taken from an idea through to something that runs."
    >
      <ul className="grid gap-5 sm:grid-cols-2">
        {projects.map((project, index) => (
          <li key={project.title} className={cn(wide && "sm:col-span-2")}>
            <Reveal delay={index * 0.06} className="h-full">
              <ProjectCard project={project} wide={wide} />
            </Reveal>
          </li>
        ))}
      </ul>
    </Section>
  );
}
