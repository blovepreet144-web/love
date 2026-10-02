import { Link } from "@tanstack/react-router";
import { Facebook, Instagram, Linkedin, Mail, MessageCircle } from "lucide-react";
import { navItems } from "@/data/portfolio";
import { usePortfolioData } from "@/lib/portfolioStore";

export function SiteFooter() {
  const { profile } = usePortfolioData();
  return (
    <footer className="relative border-t border-blue-950/80 bg-gradient-to-b from-[#060b17] via-[#040812] to-[#02040a] text-white overflow-hidden">
      {/* Ambient subtle glow for depth */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 right-0 size-[32rem] rounded-full blur-[140px] opacity-25"
        style={{
          background: "radial-gradient(circle, #2563eb, transparent 70%)",
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 left-[-5%] size-[28rem] rounded-full blur-[140px] opacity-15"
        style={{
          background: "radial-gradient(circle, #3b82f6, transparent 70%)",
        }}
      />

      <div className="relative mx-auto grid max-w-7xl gap-10 sm:gap-12 lg:gap-16 px-5 py-14 sm:py-16 lg:py-20 sm:px-8 lg:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <div className="flex items-center gap-4 mb-4">
            <div className="size-14 sm:size-16 overflow-hidden rounded-xl border border-blue-400/30 bg-white shadow-md shrink-0">
              <img
                src={profile.logo}
                alt={profile.name}
                className="h-full w-full object-contain p-1"
              />
            </div>
            <div>
              <p className="font-logo text-base sm:text-lg font-black uppercase tracking-[0.06em] leading-tight text-white flex items-baseline">
                LOVEPREET<span className="inline-block size-1.5 sm:size-2 bg-blue-500 ml-0.5" />
              </p>
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-blue-400 mt-1">
                WEB & SOCIAL DESIGN
              </p>
            </div>
          </div>
          <p className="max-w-sm text-sm leading-relaxed text-slate-300">
            {profile.tagline}
          </p>
          <div className="mt-6 flex gap-3">
            <SocialIcon href={profile.socials.instagram} label="Instagram">
              <Instagram className="size-4" />
            </SocialIcon>
            <SocialIcon href={profile.socials.facebook} label="Facebook">
              <Facebook className="size-4" />
            </SocialIcon>
            <SocialIcon href={profile.socials.linkedin} label="LinkedIn">
              <Linkedin className="size-4" />
            </SocialIcon>
          </div>
        </div>

        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-blue-300/80 font-semibold">
            Navigate
          </p>
          <ul className="mt-5 space-y-2.5">
            {navItems.map((item) => (
              <li key={item.hash}>
                <Link
                  to="/"
                  hash={item.hash}
                  className="text-sm text-slate-300 transition-colors hover:text-white"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-blue-300/80 font-semibold">
            Get in touch
          </p>
          <ul className="mt-5 space-y-3 text-sm">
            <li>
              <a
                href={`mailto:${profile.email}`}
                className="inline-flex items-center gap-2 text-slate-300 transition-colors hover:text-white"
              >
                <Mail className="size-4 text-blue-400" /> {profile.email}
              </a>
            </li>
            <li>
              <a
                href={profile.whatsapp}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 text-slate-300 transition-colors hover:text-white"
              >
                <MessageCircle className="size-4 text-emerald-400" /> WhatsApp {profile.phoneDisplay}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-blue-950/60">
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-2.5 px-5 py-6 text-xs text-slate-400 sm:flex-row sm:items-center sm:justify-between sm:px-8 text-center sm:text-left">
          <p>
            <button
              type="button"
              onClick={() => window.dispatchEvent(new CustomEvent("open-admin"))}
              className="text-inherit hover:text-slate-300 transition-colors cursor-default bg-transparent border-none p-0 inline font-normal focus:outline-none"
              title="Lovepreet Admin"
            >
              ©
            </button>{" "}
            {new Date().getFullYear()} {profile.name}. All rights reserved.
          </p>
          <p className="text-slate-400">Web &amp; Social Design · India</p>
        </div>
      </div>
    </footer>
  );
}

function SocialIcon({
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
      className="inline-flex size-10 items-center justify-center rounded-full border border-blue-900/60 bg-[#0c162c]/80 text-slate-300 transition-all hover:border-blue-400 hover:bg-blue-600 hover:text-white hover:scale-105"
    >
      {children}
    </a>
  );
}
