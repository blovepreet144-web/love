import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, ArrowUpRight, Check, ExternalLink } from "lucide-react";
import { projects as defaultProjects } from "@/data/portfolio";
import { getStoredPortfolioData, usePortfolioData } from "@/lib/portfolioStore";
import { Reveal } from "@/components/site/Reveal";

export const Route = createFileRoute("/work/$slug")({
  loader: ({ params }) => {
    const stored = getStoredPortfolioData();
    const project =
      stored.projects.find((p) => p.slug === params.slug) ||
      defaultProjects.find((p) => p.slug === params.slug);
    if (!project) throw notFound();
    return { project };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [{ title: "Project not found" }, { name: "robots", content: "noindex" }],
      };
    }
    const { project } = loaderData;
    const title = `${project.name} — Case Study | Lovepreet Singh Bhangu`;
    return {
      meta: [
        { title },
        { name: "description", content: project.summary },
        { property: "og:title", content: title },
        { property: "og:description", content: project.summary },
      ],
    };
  },
  component: CaseStudy,
});

function CaseStudy() {
  const { project } = Route.useLoaderData();
  const { projects } = usePortfolioData();

  return (
    <article className="pb-16 pt-28 sm:pb-24 sm:pt-36 lg:pt-40">
      <div className="mx-auto max-w-5xl px-5 sm:px-8">
        <Link
          to="/"
          hash="projects"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground active:scale-95"
        >
          <ArrowLeft className="size-4" /> Back to projects
        </Link>

        <p className="mt-6 sm:mt-8 text-xs uppercase tracking-[0.24em] text-primary font-semibold">
          {project.category}
        </p>
        <h1 className="mt-3 sm:mt-4 font-display text-3xl font-extrabold leading-tight sm:text-5xl lg:text-6xl">
          {project.name}
        </h1>
        <p className="mt-4 sm:mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
          {project.summary}
        </p>

        {project.url ? (
          <a
            href={project.url}
            target="_blank"
            rel="noreferrer"
            className="mt-6 sm:mt-7 inline-flex w-full sm:w-auto justify-center items-center gap-2 rounded-full border border-border px-6 py-3.5 text-sm font-semibold transition-colors hover:border-primary hover:text-primary active:scale-95"
          >
            Visit live website <ExternalLink className="size-4" />
          </a>
        ) : null}

        <Reveal className="mt-10 sm:mt-14">
          <div className="overflow-hidden rounded-3xl border border-border bg-surface-2 p-2.5 sm:p-3.5 shadow-2xl">
            <img
              src={project.image}
              alt={`${project.name} website design preview`}
              width={1536}
              height={1024}
              className="w-full rounded-2xl object-cover"
            />
          </div>
        </Reveal>

        <div className="mt-12 sm:mt-16 grid gap-8 sm:gap-10 sm:grid-cols-2">
          <Reveal>
            <h2 className="font-display text-lg sm:text-xl font-bold">Project objective</h2>
            <p className="mt-2.5 sm:mt-3 text-xs sm:text-sm leading-relaxed text-muted-foreground">
              {project.objective}
            </p>
          </Reveal>
          <Reveal delay={80}>
            <h2 className="font-display text-lg sm:text-xl font-bold">Design approach</h2>
            <p className="mt-2.5 sm:mt-3 text-xs sm:text-sm leading-relaxed text-muted-foreground">
              {project.approach}
            </p>
          </Reveal>
        </div>

        <Reveal className="mt-10 sm:mt-14">
          <h2 className="font-display text-lg sm:text-xl font-bold">Services provided</h2>
          <ul className="mt-4 sm:mt-5 flex flex-wrap gap-2">
            {project.servicesProvided.map((service) => (
              <li
                key={service}
                className="rounded-full border border-border px-3.5 py-1.5 text-xs sm:text-sm text-muted-foreground"
              >
                {service}
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal className="mt-10 sm:mt-14">
          <h2 className="font-display text-lg sm:text-xl font-bold">Key design decisions</h2>
          <ul className="mt-4 sm:mt-5 space-y-3">
            {project.decisions.map((decision) => (
              <li
                key={decision}
                className="flex gap-3 rounded-2xl border border-border bg-surface px-4 py-3.5 sm:px-5 sm:py-4"
              >
                <span className="mt-0.5 inline-flex size-6 shrink-0 items-center justify-center rounded-full bg-primary/15 text-primary">
                  <Check className="size-3.5" />
                </span>
                <span className="text-xs sm:text-sm leading-relaxed text-muted-foreground">
                  {decision}
                </span>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal className="mt-12 sm:mt-16">
          <div className="rounded-3xl border border-border bg-surface px-6 py-10 sm:px-8 sm:py-12 text-center">
            <h2 className="font-display text-2xl font-extrabold sm:text-3xl">
              Want something like this for your business?
            </h2>
            <Link
              to="/"
              hash="contact"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 sm:py-4 text-sm font-semibold text-primary-foreground transition-transform hover:scale-[1.03]"
            >
              Start a project <ArrowUpRight className="size-4" />
            </Link>
          </div>
        </Reveal>

        <nav className="mt-12 sm:mt-16 grid gap-4 sm:gap-6 sm:grid-cols-2">
          {projects
            .filter((p) => p.slug !== project.slug)
            .slice(0, 2)
            .map((other) => (
              <Link
                key={other.slug}
                to="/work/$slug"
                params={{ slug: other.slug }}
                className="rounded-2xl border border-border bg-surface px-5 py-4 sm:px-6 sm:py-5 transition-colors hover:border-primary/60"
              >
                <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                  Next project
                </span>
                <span className="mt-2 block font-display text-base sm:text-lg font-bold">
                  {other.name}
                </span>
              </Link>
            ))}
        </nav>
      </div>
    </article>
  );
}
