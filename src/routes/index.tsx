import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  ArrowUpRight,
  Code2,
  ExternalLink,
  Facebook,
  Instagram,
  Layout,
  Linkedin,
  Mail,
  MessageCircle,
  MousePointerClick,
  Phone,
  Rocket,
  Search,
  Share2,
  Sparkles,
  UserRound,
  Check,
} from "lucide-react";
import { Reveal } from "@/components/site/Reveal";
import { ContactForm } from "@/components/site/ContactForm";
import { usePortfolioData } from "@/lib/portfolioStore";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Lovepreet Singh Bhangu | Web & Social Designer" },
      {
        name: "description",
        content:
          "Portfolio of Lovepreet Singh Bhangu — website design, website development, UI/UX, landing pages, branding, social media design and SEO for modern businesses.",
      },
      {
        property: "og:title",
        content: "Lovepreet Singh Bhangu | Web & Social Designer",
      },
      {
        property: "og:description",
        content:
          "Modern websites, UI/UX, branding and social media design that help businesses stand out online.",
      },
    ],
  }),
  component: Home,
});

const serviceIcons = {
  Layout,
  Code2,
  MousePointerClick,
  Rocket,
  Share2,
  Sparkles,
  Search,
} as const;

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.24em] text-primary">
      <span className="h-px w-8 bg-primary" />
      {children}
    </span>
  );
}

function scrollToSection(id: string) {
  const el = document.getElementById(id);
  if (el) {
    const headerOffset = 85;
    const elementPosition = el.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth",
    });
    window.history.pushState(null, "", `#${id}`);
  }
}

function Home() {
  const { profile, projects, services, whyWorkWithMe } = usePortfolioData();
  return (
    <>
      {/* HERO */}
      <section id="home" className="relative overflow-hidden pt-28 pb-16 sm:pt-36 sm:pb-24 lg:pt-40 lg:pb-28">

        <div className="relative mx-auto grid max-w-7xl items-center gap-10 lg:gap-14 px-5 sm:px-8 lg:grid-cols-[1.15fr_0.85fr]">
          <div>
            <Reveal delay={40}>
              <h1 className="font-display text-3xl font-extrabold tracking-[-0.035em] leading-[1.14] sm:text-5xl lg:text-6xl max-w-2xl">
                <span className="text-gradient">{profile.headline}</span>
              </h1>
            </Reveal>
            <Reveal delay={160}>
              <p className="mt-5 sm:mt-6 max-w-xl text-base leading-relaxed text-slate-600 sm:text-lg font-normal">
                {profile.intro}
              </p>
            </Reveal>
            <Reveal delay={220}>
              <ul className="mt-5 sm:mt-6 flex flex-wrap gap-2">
                {[
                  "Website Design",
                  "Website Development",
                  "UI/UX Design",
                  "Social Media Design",
                  "Landing Pages",
                  "Branding",
                  "SEO",
                ].map((item) => (
                  <li
                    key={item}
                    className="rounded-full border border-blue-900/10 bg-white/80 px-3 py-1.5 text-xs font-semibold text-slate-700 shadow-xs backdrop-blur-sm transition-all hover:border-blue-500/50 hover:text-blue-600"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal delay={280}>
              <div className="mt-7 sm:mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                <a
                  href="#projects"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection("projects");
                  }}
                  className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-full bg-gradient-to-r from-blue-600 to-blue-500 px-8 py-3.5 sm:py-4 text-sm font-bold text-white shadow-lg shadow-blue-600/25 transition-all duration-300 hover:scale-[1.02] hover:from-blue-500 hover:to-blue-400 hover:shadow-blue-500/35 active:scale-95 cursor-pointer touch-manipulation"
                >
                  View Selected Work <ArrowUpRight className="size-4" />
                </a>
                <a
                  href="#contact"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection("contact");
                  }}
                  className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-full border border-blue-900/20 bg-white/70 px-8 py-3.5 sm:py-4 text-sm font-bold text-slate-800 shadow-xs backdrop-blur-sm transition-all duration-300 hover:border-blue-500 hover:text-blue-600 hover:bg-white active:scale-95 cursor-pointer touch-manipulation"
                >
                  Let's Work Together
                </a>
              </div>

              <div className="mt-6 sm:mt-7 flex flex-wrap items-center gap-x-5 gap-y-2 pt-3 border-t border-slate-200/60 text-xs font-semibold text-slate-600">
                <span className="inline-flex items-center gap-1.5">
                  <Check className="size-3.5 text-emerald-500 stroke-[2.5]" /> 100% Custom Tailored
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Check className="size-3.5 text-blue-500 stroke-[2.5]" /> Responsive &amp; Mobile-Ready
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Check className="size-3.5 text-indigo-500 stroke-[2.5]" /> Business Growth Focused
                </span>
              </div>
            </Reveal>
          </div>

          <Reveal delay={200} className="relative mx-auto w-full max-w-[280px] sm:max-w-xs md:max-w-sm">
            <div className="accent-glow group relative aspect-4/5 overflow-hidden rounded-[2rem] border border-border bg-surface shadow-2xl">
              <img
                src={profile.photo}
                alt={profile.name}
                className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/90 via-background/25 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-6 text-left">
                <p className="font-display text-xl font-bold text-foreground drop-shadow-sm">
                  {profile.name}
                </p>
                <p className="mt-1 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                  {profile.title}
                </p>
              </div>
            </div>
          </Reveal>
        </div>

      </section>

      {/* ABOUT */}
      <section id="about" className="border-t border-border py-16 sm:py-20 lg:py-24">
        <div className="mx-auto grid max-w-7xl items-center gap-10 lg:gap-14 px-5 sm:px-8 lg:grid-cols-[0.9fr_1.1fr]">
          <Reveal>
            <SectionLabel>About</SectionLabel>
            <h2 className="mt-4 sm:mt-5 font-display text-3xl font-extrabold leading-tight sm:text-4xl lg:text-5xl">
              A designer who thinks like a business owner.
            </h2>
            <p className="mt-4 sm:mt-5 text-sm sm:text-base leading-relaxed text-muted-foreground">
              Lovepreet Singh Bhangu is a creative digital professional focused on web
              design, website development, UI/UX and social media design. His work
              combines modern visual design, usability, branding and digital strategy to
              create websites and online experiences that help businesses present
              themselves professionally.
            </p>
            <p className="mt-3 text-sm sm:text-base leading-relaxed text-muted-foreground">
              Working across both web and social design means a business can keep one
              consistent digital identity — the website and the social feed speak the
              same language.
            </p>
            <a
              href="#projects"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection("projects");
              }}
              className="mt-6 sm:mt-8 inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline cursor-pointer transition-colors"
            >
              View selected work <ArrowUpRight className="size-4" />
            </a>
          </Reveal>

          <div className="grid gap-4 sm:gap-5 sm:grid-cols-2 self-center">
            {[
              {
                title: "Career focus",
                body: "Modern websites and digital brand presence for businesses that need to look credible online.",
              },
              {
                title: "Design philosophy",
                body: "Clarity first. Strong hierarchy, generous space and purposeful motion — never decoration for its own sake.",
              },
              {
                title: "Strengths",
                body: "Visual design, responsive layout, usability, branding direction and search-friendly structure.",
              },
              {
                title: "Way of working",
                body: "Direct communication, clear stages and designs made around real business goals.",
              },
            ].map((card, i) => (
              <Reveal key={card.title} delay={i * 80} className="h-full">
                <article className="h-full rounded-2xl border border-border bg-surface p-5 sm:p-6 transition-colors hover:border-primary/50 flex flex-col justify-start">
                  <h3 className="font-display text-base sm:text-lg font-bold">{card.title}</h3>
                  <p className="mt-2.5 text-xs sm:text-sm leading-relaxed text-muted-foreground">
                    {card.body}
                  </p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="border-t border-border py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <Reveal>
            <SectionLabel>Services</SectionLabel>
            <h2 className="mt-4 sm:mt-5 max-w-2xl font-display text-3xl font-extrabold sm:text-4xl lg:text-5xl">
              Everything your brand needs to show up well online
            </h2>
          </Reveal>

          <div className="mt-8 sm:mt-12 grid gap-5 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service, i) => {
              const Icon = (serviceIcons as Record<string, any>)[service.icon || "Layout"] || Layout;
              return (
                <Reveal key={service.title} delay={i * 60}>
                  <article className="group flex h-full flex-col rounded-2xl border border-border bg-surface p-6 sm:p-7 transition-all hover:-translate-y-1.5 hover:border-primary/60">
                    <span className="inline-flex size-11 sm:size-12 items-center justify-center rounded-xl border border-border text-primary transition-colors group-hover:border-primary/60">
                      <Icon className="size-5" />
                    </span>
                    <h3 className="mt-5 sm:mt-6 font-display text-lg sm:text-xl font-bold">
                      {service.title}
                    </h3>
                    <p className="mt-2.5 sm:mt-3 flex-1 text-xs sm:text-sm leading-relaxed text-muted-foreground">
                      {service.description}
                    </p>
                    <a
                      href="#contact"
                      onClick={(e) => {
                        e.preventDefault();
                        scrollToSection("contact");
                      }}
                      className="mt-5 sm:mt-6 inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-primary hover:underline cursor-pointer transition-colors"
                    >
                      Start a project <ArrowUpRight className="size-4" />
                    </a>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* PROJECTS */}
      <section id="projects" className="border-t border-border py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-5xl px-5 sm:px-8">
          <Reveal>
            <SectionLabel>Featured Projects</SectionLabel>
            <h2 className="mt-4 sm:mt-5 max-w-2xl font-display text-3xl font-extrabold sm:text-4xl lg:text-5xl">
              Selected work for real businesses
            </h2>
          </Reveal>

          <div className="mt-8 sm:mt-12 grid gap-6 sm:gap-7 sm:grid-cols-2">
            {projects.map((project, i) => (
              <Reveal key={project.slug} delay={i * 80}>
                <article className="group flex h-full flex-col justify-between overflow-hidden rounded-2xl border border-border bg-surface transition-all hover:-translate-y-1 hover:border-primary/60">
                  <div>
                    <Link
                      to="/work/$slug"
                      params={{ slug: project.slug }}
                      className="block"
                      aria-label={`Open the ${project.name} case study`}
                    >
                      <div className="border-b border-border bg-surface-2 px-3 pt-2.5">
                        <div className="mb-1.5 flex gap-1">
                          <span className="size-1.5 rounded-full bg-muted-foreground/40" />
                          <span className="size-1.5 rounded-full bg-muted-foreground/40" />
                          <span className="size-1.5 rounded-full bg-muted-foreground/40" />
                        </div>
                        <div className="relative aspect-[16/9.5] overflow-hidden rounded-t-md bg-surface">
                          <img
                            src={project.image}
                            alt={`${project.name} website design preview`}
                            loading="lazy"
                            width={1536}
                            height={1024}
                            className="aspect-[16/9.5] w-full object-cover transition-transform duration-700 group-hover:scale-105"
                          />
                        </div>
                      </div>
                    </Link>
                    <div className="p-5 sm:p-6">
                      <p className="text-[10px] sm:text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                        {project.category}
                      </p>
                      <h3 className="mt-1.5 sm:mt-2 font-display text-lg sm:text-xl font-bold">
                        {project.name}
                      </h3>
                      <p className="mt-2 line-clamp-2 text-xs sm:text-sm leading-relaxed text-muted-foreground">
                        {project.summary}
                      </p>
                      <ul className="mt-3.5 flex flex-wrap gap-1.5">
                        {project.tags.map((tag) => (
                          <li
                            key={tag}
                            className="rounded-full border border-border px-2.5 py-0.5 text-[10px] sm:text-xs text-muted-foreground"
                          >
                            {tag}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <div className="px-5 pb-5 sm:px-6 sm:pb-6">
                    <div className="flex flex-wrap items-center gap-4 border-t border-border/50 pt-3.5">
                      <Link
                        to="/work/$slug"
                        params={{ slug: project.slug }}
                        className="inline-flex items-center gap-1 text-xs sm:text-sm font-semibold text-primary"
                      >
                        View case study <ArrowUpRight className="size-3.5" />
                      </Link>
                      {project.url ? (
                        <a
                          href={project.url}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1 text-xs sm:text-sm text-muted-foreground transition-colors hover:text-foreground"
                        >
                          Visit website <ExternalLink className="size-3.5" />
                        </a>
                      ) : null}
                    </div>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>

          <Reveal delay={120}>
            <div className="mt-8 sm:mt-12 rounded-2xl border border-dashed border-border bg-surface/50 p-6 sm:p-8 text-center">
              <h3 className="font-display text-base sm:text-lg font-bold">
                Selected Work & Ongoing Projects
              </h3>
              <p className="mx-auto mt-2 max-w-md text-xs sm:text-sm text-muted-foreground">
                More projects are currently in progress and will be added here as they
                go live.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* EXPERIENCE */}
      <section id="experience" className="border-t border-border py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <Reveal>
            <SectionLabel>Experience</SectionLabel>
            <h2 className="mt-4 sm:mt-5 max-w-3xl font-display text-3xl font-extrabold sm:text-4xl lg:text-5xl">
              Professional Work & Selected Projects
            </h2>
            <p className="mt-4 sm:mt-5 max-w-2xl text-sm sm:text-base leading-relaxed text-muted-foreground">
              Working independently as a web and social designer, partnering directly
              with businesses on their websites and digital presence.
            </p>
          </Reveal>

          <ol className="mt-8 sm:mt-12 border-l border-border pl-6 sm:pl-10">
            {[...projects.map((p) => ({ name: p.name, note: p.category })), {
              name: "Additional projects in progress",
              note: "Ongoing client work",
            }].map((item, i) => (
              <Reveal as="li" key={item.name} delay={i * 70} className="relative pb-8 sm:pb-10 last:pb-0">
                <span className="absolute -left-[31px] top-1.5 size-3 rounded-full bg-primary sm:-left-[47px]" />
                <h3 className="font-display text-lg sm:text-xl font-bold">{item.name}</h3>
                <p className="mt-1 text-xs sm:text-sm text-muted-foreground">{item.note}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* WHY */}
      <section id="why" className="border-t border-border py-16 sm:py-20 lg:py-24">
        <div className="mx-auto grid max-w-7xl items-center gap-8 sm:gap-12 px-5 sm:px-8 lg:grid-cols-[0.8fr_1.2fr]">
          <Reveal>
            <SectionLabel>Why work with me</SectionLabel>
            <h2 className="mt-4 sm:mt-5 font-display text-3xl font-extrabold sm:text-4xl lg:text-5xl">
              Design with a reason behind every decision.
            </h2>
          </Reveal>
          <div className="grid gap-3 sm:gap-3.5 sm:grid-cols-2">
            {whyWorkWithMe.map((item, i) => (
              <Reveal key={item} delay={i * 50}>
                <div className="flex items-center gap-3.5 rounded-xl border border-border bg-surface px-4 py-3.5 sm:px-5 sm:py-4">
                  <span className="inline-flex size-6 shrink-0 items-center justify-center rounded-full bg-primary/15 text-primary">
                    <Check className="size-3.5" />
                  </span>
                  <span className="text-xs sm:text-sm font-medium leading-normal">{item}</span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="border-t border-border py-16 sm:py-20 lg:py-24">
        <div className="mx-auto grid max-w-7xl items-start gap-10 sm:gap-14 px-5 sm:px-8 lg:grid-cols-[0.85fr_1.15fr]">
          <Reveal>
            <SectionLabel>Contact</SectionLabel>
            <h2 className="mt-4 sm:mt-5 font-display text-3xl font-extrabold leading-tight sm:text-4xl lg:text-5xl">
              Have a project in mind?
            </h2>
            <p className="mt-4 sm:mt-5 max-w-md text-sm sm:text-base leading-relaxed text-muted-foreground">
              Let's create a modern digital presence that represents your brand and helps
              you grow online.
            </p>

            <ul className="mt-7 sm:mt-8 space-y-3">
              <li>
                <a
                  href={`mailto:${profile.email}`}
                  className="flex items-center gap-4 rounded-2xl border border-border bg-surface px-4 py-3.5 sm:px-5 sm:py-4 transition-colors hover:border-primary/60"
                >
                  <Mail className="size-5 text-primary shrink-0" />
                  <span className="text-xs sm:text-sm font-medium break-all">{profile.email}</span>
                </a>
              </li>
              <li>
                <a
                  href={`tel:${profile.phoneRaw}`}
                  className="flex items-center gap-4 rounded-2xl border border-border bg-surface px-4 py-3.5 sm:px-5 sm:py-4 transition-colors hover:border-primary/60"
                >
                  <Phone className="size-5 text-primary shrink-0" />
                  <span className="text-xs sm:text-sm font-medium">{profile.phoneDisplay}</span>
                </a>
              </li>
              <li>
                <a
                  href={profile.whatsapp}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-4 rounded-2xl bg-primary px-4 py-3.5 sm:px-5 sm:py-4 text-primary-foreground transition-transform hover:scale-[1.02]"
                >
                  <MessageCircle className="size-5 shrink-0" />
                  <span className="text-xs sm:text-sm font-semibold">Chat on WhatsApp</span>
                </a>
              </li>
            </ul>

            <div className="mt-6 sm:mt-7 flex gap-3">
              <SocialLink href={profile.socials.instagram} label="Instagram">
                <Instagram className="size-4" />
              </SocialLink>
              <SocialLink href={profile.socials.facebook} label="Facebook">
                <Facebook className="size-4" />
              </SocialLink>
              <SocialLink href={profile.socials.linkedin} label="LinkedIn">
                <Linkedin className="size-4" />
              </SocialLink>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <div className="rounded-3xl border border-border bg-surface p-6 sm:p-8 lg:p-9 shadow-sm">
              <ContactForm />
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}

function SocialLink({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label={label}
      className="inline-flex size-11 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:border-primary hover:text-primary"
    >
      {children}
    </a>
  );
}
