import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
  type ErrorComponentProps,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { SiteNav } from "@/components/site/SiteNav";
import { SiteFooter } from "@/components/site/SiteFooter";
import { Toaster } from "@/components/ui/sonner";
import { AdminModal } from "@/components/admin/AdminModal";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: ErrorComponentProps) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Lovepreet Singh Bhangu | Web & Social Designer" },
      {
        name: "description",
        content:
          "Lovepreet Singh Bhangu is a web and social designer creating modern websites, UI/UX, landing pages, branding and social media design for businesses.",
      },
      { name: "author", content: "Lovepreet Singh Bhangu" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Anybody:wdth,wght@125..150,700..900&family=Michroma&family=Syne:wght@700;800;900&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap",
      },
      { rel: "icon", href: "/favicon.png", type: "image/png" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  useEffect(() => {
    const scrollToHash = (hash: string) => {
      const cleanHash = hash.replace(/^[/#]+/, "");
      if (!cleanHash) return;
      const el = document.getElementById(cleanHash);
      if (el) {
        const headerOffset = 85;
        const elementPosition = el.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        });
      }
    };

    // Auto-scroll on initial load or navigation if hash exists
    if (window.location.hash && window.location.hash !== "#admin") {
      setTimeout(() => scrollToHash(window.location.hash), 100);
    }

    const handleAnchorClick = (e: MouseEvent) => {
      const anchor = (e.target as HTMLElement).closest("a");
      if (!anchor) return;
      const href = anchor.getAttribute("href");
      if (!href) return;

      if (href.startsWith("#") || (href.startsWith("/#") && window.location.pathname === "/")) {
        const hash = href.startsWith("/#") ? href.slice(2) : href.slice(1);
        if (hash && hash !== "admin") {
          e.preventDefault();
          window.history.pushState(null, "", `#${hash}`);
          scrollToHash(hash);
        }
      }
    };

    const handleHashChange = () => {
      if (window.location.hash && window.location.hash !== "#admin") {
        scrollToHash(window.location.hash);
      }
    };

    document.addEventListener("click", handleAnchorClick, true);
    window.addEventListener("hashchange", handleHashChange);
    return () => {
      document.removeEventListener("click", handleAnchorClick, true);
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <SiteNav />
      <main className="relative min-h-screen">
        {/* Unique atmospheric ambient background system with soft multi-color shadows */}
        <div className="grid-lines pointer-events-none fixed inset-0 -z-10 opacity-60" />
        
        {/* Top-Right: Soft Sky & Azure Light Shadow */}
        <div
          aria-hidden="true"
          className="pointer-events-none fixed -top-24 right-[-5%] size-[44rem] rounded-full blur-[130px] opacity-45 -z-10"
          style={{
            background:
              "radial-gradient(circle, oklch(0.86 0.13 235 / 65%), oklch(0.92 0.08 200 / 35%), transparent 70%)",
          }}
        />

        {/* Top-Left: Soft Lavender & Violet Light Shadow */}
        <div
          aria-hidden="true"
          className="pointer-events-none fixed top-[10%] -left-[10%] size-[40rem] rounded-full blur-[140px] opacity-35 -z-10"
          style={{
            background:
              "radial-gradient(circle, oklch(0.88 0.10 280 / 55%), oklch(0.93 0.06 250 / 25%), transparent 70%)",
          }}
        />

        {/* Mid-Page: Luminous Mint & Aqua Light Shadow */}
        <div
          aria-hidden="true"
          className="pointer-events-none fixed top-[45%] -right-[8%] size-[38rem] rounded-full blur-[140px] opacity-35 -z-10"
          style={{
            background:
              "radial-gradient(circle, oklch(0.88 0.11 180 / 50%), oklch(0.93 0.06 215 / 25%), transparent 70%)",
          }}
        />

        {/* Bottom-Left: Subtle Warm Peach & Champagne Light Shadow */}
        <div
          aria-hidden="true"
          className="pointer-events-none fixed bottom-[-10%] -left-[5%] size-[42rem] rounded-full blur-[150px] opacity-30 -z-10"
          style={{
            background:
              "radial-gradient(circle, oklch(0.91 0.09 45 / 45%), oklch(0.94 0.06 330 / 25%), transparent 70%)",
          }}
        />

        {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
        <Outlet />
      </main>
      <SiteFooter />
      <Toaster />
      <AdminModal />
    </QueryClientProvider>
  );
}
