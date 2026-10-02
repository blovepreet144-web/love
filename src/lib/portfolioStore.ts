import { useState, useEffect } from "react";
import {
  profile as defaultProfile,
  projects as defaultProjects,
  services as defaultServices,
  whyWorkWithMe as defaultWhy,
  type Project,
  type Service,
} from "@/data/portfolio";

export interface Inquiry {
  id: string;
  name: string;
  email: string;
  business?: string | undefined;
  service: string;
  details: string;
  budget?: string | undefined;
  date: string;
  read?: boolean;
}

const STORAGE_KEY = "portfolio_custom_data_v1";
const INQUIRIES_KEY = "portfolio_inquiries_v1";

export interface PortfolioData {
  profile: typeof defaultProfile;
  projects: Project[];
  services: Service[];
  whyWorkWithMe: string[];
}

const initialServices: Service[] = defaultServices as unknown as Service[];

export function getStoredPortfolioData(): PortfolioData {
  if (typeof window === "undefined") {
    return {
      profile: defaultProfile,
      projects: defaultProjects,
      services: initialServices,
      whyWorkWithMe: defaultWhy,
    };
  }

  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      return {
        profile: {
          ...defaultProfile,
          ...(parsed.profile || {}),
          logo: defaultProfile.logo,
        },
        projects: parsed.projects?.length ? parsed.projects : defaultProjects,
        services: parsed.services?.length ? parsed.services : initialServices,
        whyWorkWithMe: parsed.whyWorkWithMe?.length ? parsed.whyWorkWithMe : defaultWhy,
      };
    }
  } catch (err) {
    console.error("Failed to read stored portfolio data:", err);
  }

  return {
    profile: defaultProfile,
    projects: defaultProjects,
    services: initialServices,
    whyWorkWithMe: defaultWhy,
  };
}

export function savePortfolioData(data: Partial<PortfolioData>) {
  if (typeof window === "undefined") return;
  const current = getStoredPortfolioData();
  const next: PortfolioData = {
    profile: { ...current.profile, ...(data.profile || {}) },
    projects: data.projects || current.projects,
    services: data.services || current.services,
    whyWorkWithMe: data.whyWorkWithMe || current.whyWorkWithMe,
  };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  window.dispatchEvent(new CustomEvent("portfolio_data_updated", { detail: next }));
}

export function resetPortfolioData() {
  if (typeof window === "undefined") return;
  localStorage.removeItem(STORAGE_KEY);
  const next = {
    profile: defaultProfile,
    projects: defaultProjects,
    services: initialServices,
    whyWorkWithMe: defaultWhy,
  };
  window.dispatchEvent(new CustomEvent("portfolio_data_updated", { detail: next }));
}

export function usePortfolioData() {
  const [data, setData] = useState<PortfolioData>(getStoredPortfolioData);

  useEffect(() => {
    const handleUpdate = () => {
      setData(getStoredPortfolioData());
    };

    window.addEventListener("portfolio_data_updated", handleUpdate);
    window.addEventListener("storage", handleUpdate);
    return () => {
      window.removeEventListener("portfolio_data_updated", handleUpdate);
      window.removeEventListener("storage", handleUpdate);
    };
  }, []);

  return data;
}

export function getInquiries(): Inquiry[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(INQUIRIES_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function saveInquiry(inquiry: Omit<Inquiry, "id" | "date">) {
  if (typeof window === "undefined") return;
  const current = getInquiries();
  const next: Inquiry = {
    ...inquiry,
    id: Date.now().toString(),
    date: new Date().toISOString(),
    read: false,
  };
  localStorage.setItem(INQUIRIES_KEY, JSON.stringify([next, ...current]));
  window.dispatchEvent(new CustomEvent("portfolio_inquiries_updated"));
}

export function deleteInquiry(id: string) {
  if (typeof window === "undefined") return;
  const current = getInquiries().filter((i) => i.id !== id);
  localStorage.setItem(INQUIRIES_KEY, JSON.stringify(current));
  window.dispatchEvent(new CustomEvent("portfolio_inquiries_updated"));
}

export function markInquiryRead(id: string) {
  if (typeof window === "undefined") return;
  const current = getInquiries().map((i) =>
    i.id === id ? { ...i, read: true } : i
  );
  localStorage.setItem(INQUIRIES_KEY, JSON.stringify(current));
  window.dispatchEvent(new CustomEvent("portfolio_inquiries_updated"));
}
