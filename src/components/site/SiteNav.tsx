import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { navItems } from "@/data/portfolio";
import { usePortfolioData } from "@/lib/portfolioStore";
import { cn } from "@/lib/utils";

export function SiteNav() {
  const { profile } = usePortfolioData();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24);

      const sectionIds = navItems.map((item) => item.hash);
      const scrollPosition = window.scrollY + 180;

      // Check if user reached near the bottom of the page
      if (
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 70
      ) {
        setActiveSection("contact");
        return;
      }

      let current = "home";
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el) {
          const top = el.offsetTop;
          if (scrollPosition >= top) {
            current = id;
          }
        }
      }
      setActiveSection(current);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNavClick = (hash: string) => {
    setActiveSection(hash);
    setOpen(false);
    if (window.location.pathname === "/") {
      const el = document.getElementById(hash);
      if (el) {
        const headerOffset = 85;
        const elementPosition = el.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        });
        window.history.pushState(null, "", `#${hash}`);
      }
    }
  };

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-gradient-to-r from-[#060b17]/95 via-[#0b1426]/95 to-[#060b17]/95 backdrop-blur-xl border-b border-blue-500/25 py-2 shadow-2xl shadow-[#020617]/40"
          : "bg-gradient-to-r from-[#060b17]/85 via-[#0a1324]/85 to-[#060b17]/85 backdrop-blur-md border-b border-blue-900/40 py-2.5 sm:py-3 shadow-lg shadow-[#020617]/20",
      )}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between gap-4 sm:gap-6 px-5 sm:px-8">
        <Link
          to="/"
          hash="home"
          onClick={() => handleNavClick("home")}
          className="flex items-center gap-3 group outline-none shrink-0"
        >
          <div className="relative size-11 sm:size-12 overflow-hidden rounded-xl border border-blue-400/30 bg-white shadow-sm transition-all duration-300 group-hover:scale-105 group-hover:border-blue-400 group-hover:shadow-md shrink-0">
            <img
              src={profile.logo}
              alt="Lovepreet Logo"
              className="h-full w-full object-contain p-1"
            />
          </div>
          <div className="flex flex-col justify-center">
            <span className="font-logo text-sm sm:text-base font-black uppercase tracking-[0.06em] text-white leading-tight flex items-baseline">
              LOVEPREET<span className="inline-block size-1.5 bg-blue-500 ml-0.5" />
            </span>
            <span className="text-[9px] sm:text-[10px] font-bold tracking-[0.2em] text-blue-300/80 uppercase mt-0.5">
              WEB & SOCIAL DESIGN
            </span>
          </div>
        </Link>

        <ul className="hidden items-center gap-7 lg:flex">
          {navItems.map((item) => {
            const isActive = activeSection === item.hash;
            return (
              <li key={item.hash} className="relative">
                <Link
                  to="/"
                  hash={item.hash}
                  onClick={() => handleNavClick(item.hash)}
                  className={cn(
                    "relative py-1 text-sm font-medium transition-colors duration-200 block",
                    isActive
                      ? "text-white font-semibold"
                      : "text-slate-300 hover:text-white",
                  )}
                >
                  {item.label}
                  {isActive && (
                    <span className="absolute -bottom-1.5 inset-x-0 h-0.5 rounded-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.9)] transition-all duration-300" />
                  )}
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-3">
          <Link
            to="/"
            hash="contact"
            onClick={() => handleNavClick("contact")}
            className="hidden rounded-full bg-gradient-to-r from-blue-600 to-blue-500 px-6 py-2.5 text-sm font-semibold text-white shadow-lg shadow-blue-600/30 transition-all duration-300 hover:scale-[1.03] hover:from-blue-500 hover:to-blue-400 hover:shadow-blue-500/40 sm:inline-flex"
          >
            Start a Project
          </Link>
          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="inline-flex size-11 items-center justify-center rounded-full border border-blue-900/60 bg-[#0c162c]/90 text-white transition-colors hover:bg-blue-950/90 active:scale-95 touch-manipulation lg:hidden shrink-0"
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer */}
      <div
        className={cn(
          "overflow-hidden transition-[max-height,opacity] duration-300 lg:hidden",
          open ? "max-h-[34rem] opacity-100" : "max-h-0 opacity-0",
        )}
      >
        <ul className="mx-4 mt-3 space-y-1 rounded-2xl border border-blue-900/50 bg-[#060b17]/98 backdrop-blur-2xl p-3 shadow-2xl">
          {navItems.map((item) => {
            const isActive = activeSection === item.hash;
            return (
              <li key={item.hash}>
                <Link
                  to="/"
                  hash={item.hash}
                  onClick={() => handleNavClick(item.hash)}
                  className={cn(
                    "flex items-center justify-between rounded-xl px-4 py-3.5 text-base font-semibold transition-colors active:scale-[0.98]",
                    isActive
                      ? "bg-blue-600/25 text-white border border-blue-500/50"
                      : "text-slate-300 hover:bg-[#0c162c] hover:text-white",
                  )}
                >
                  <span>{item.label}</span>
                  {isActive && (
                    <span className="size-1.5 rounded-full bg-blue-400 shadow-[0_0_8px_rgba(59,130,246,0.9)]" />
                  )}
                </Link>
              </li>
            );
          })}
          <li className="pt-2 grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => handleNavClick("contact")}
              className="block w-full rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 px-3 py-3 text-center text-xs font-bold text-white shadow-md shadow-blue-600/30 active:scale-95 transition-all"
            >
              Contact Form
            </button>
            <a
              href={profile.whatsapp}
              target="_blank"
              rel="noreferrer"
              className="block w-full rounded-xl border border-emerald-500/40 bg-emerald-500/15 px-3 py-3 text-center text-xs font-bold text-emerald-300 shadow-md active:scale-95 transition-all"
            >
              WhatsApp
            </a>
          </li>
        </ul>
      </div>

      {open && (
        <div
          aria-hidden="true"
          onClick={() => setOpen(false)}
          className="fixed inset-0 top-[65px] -z-10 bg-black/50 backdrop-blur-xs lg:hidden"
        />
      )}
    </header>
  );
}
