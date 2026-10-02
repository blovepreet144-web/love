import { useState, useEffect } from "react";
import {
  X,
  Lock,
  Unlock,
  KeyRound,
  Eye,
  EyeOff,
  User,
  Briefcase,
  Layers,
  MessageSquare,
  Save,
  RotateCcw,
  Plus,
  Trash2,
  ExternalLink,
  Mail,
  Phone,
  Check,
  Download,
  Copy,
} from "lucide-react";
import { toast } from "sonner";
import {
  usePortfolioData,
  savePortfolioData,
  resetPortfolioData,
  getInquiries,
  deleteInquiry,
  markInquiryRead,
  type Inquiry,
} from "@/lib/portfolioStore";
import { type Project, type Service } from "@/data/portfolio";

const AUTH_STORAGE_KEY = "portfolio_admin_authenticated";
const ADMIN_PASSWORD = "jind";

export function AdminModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passwordInput, setPasswordInput] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [authError, setAuthError] = useState("");
  const [activeTab, setActiveTab] = useState<"profile" | "projects" | "services" | "inquiries" | "export">("profile");

  const portfolio = usePortfolioData();
  const [profileForm, setProfileForm] = useState(portfolio.profile);
  const [projectsList, setProjectsList] = useState<Project[]>(portfolio.projects);
  const [servicesList, setServicesList] = useState<Service[]>(portfolio.services);
  const [inquiriesList, setInquiriesList] = useState<Inquiry[]>([]);

  // Editing project state
  const [editingProjectIndex, setEditingProjectIndex] = useState<number | null>(null);
  const [isAddingProject, setIsAddingProject] = useState(false);
  const [newProject, setNewProject] = useState<Partial<Project>>({
    slug: "",
    name: "",
    category: "",
    url: "",
    summary: "",
    objective: "",
    approach: "",
    servicesProvided: ["Website Design", "UI/UX Design"],
    decisions: ["High performance architecture", "Mobile-optimized responsive design"],
    tags: ["Web Design", "Responsive"],
  });

  // Check existing session
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedAuth = sessionStorage.getItem(AUTH_STORAGE_KEY);
      if (storedAuth === "true") {
        setIsAuthenticated(true);
      }
    }
  }, []);

  // Sync state with portfolio data updates
  useEffect(() => {
    setProfileForm(portfolio.profile);
    setProjectsList(portfolio.projects);
    setServicesList(portfolio.services);
  }, [portfolio]);

  // Load inquiries
  const loadInquiries = () => {
    setInquiriesList(getInquiries());
  };

  useEffect(() => {
    loadInquiries();
    window.addEventListener("portfolio_inquiries_updated", loadInquiries);
    return () => window.removeEventListener("portfolio_inquiries_updated", loadInquiries);
  }, []);

  // Keyboard shortcut: Press 'j' or 'J' to trigger admin panel
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore if user is currently typing in an input, textarea, or contentEditable
      const target = e.target as HTMLElement;
      if (
        target.tagName === "INPUT" ||
        target.tagName === "TEXTAREA" ||
        target.tagName === "SELECT" ||
        target.isContentEditable
      ) {
        return;
      }

      // Check for single key 'j' or 'J'
      if (e.key === "j" || e.key === "J") {
        e.preventDefault();
        setIsOpen(true);
      }

      // Close on Esc
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };

    const handleCustomOpen = () => {
      setIsOpen(true);
    };

    const handleHashChange = () => {
      if (window.location.hash === "#admin") {
        setIsOpen(true);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("open-admin", handleCustomOpen);
    window.addEventListener("hashchange", handleHashChange);
    if (window.location.hash === "#admin") {
      setIsOpen(true);
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("open-admin", handleCustomOpen);
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, [isOpen]);

  // Handle password submission
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordInput.trim() === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      sessionStorage.setItem(AUTH_STORAGE_KEY, "true");
      setAuthError("");
      setPasswordInput("");
      toast.success("Welcome, Lovepreet! Admin unlocked.");
    } else {
      setAuthError("Incorrect password. Please try again.");
      toast.error("Incorrect password!");
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem(AUTH_STORAGE_KEY);
    setPasswordInput("");
    setAuthError("");
    toast.info("Admin session locked.");
  };

  const handleSaveProfile = () => {
    savePortfolioData({ profile: profileForm });
    toast.success("Profile details saved successfully!");
  };

  const handleSaveProjects = () => {
    savePortfolioData({ projects: projectsList });
    toast.success("Projects list saved successfully!");
  };

  const handleSaveServices = () => {
    savePortfolioData({ services: servicesList });
    toast.success("Services saved successfully!");
  };

  const handleResetDefaults = () => {
    if (window.confirm("Are you sure you want to reset all portfolio content to original defaults?")) {
      resetPortfolioData();
      toast.success("Portfolio reset to default values.");
    }
  };

  const handleAddNewProject = () => {
    if (!newProject.name || !newProject.category) {
      toast.error("Please enter at least a Project Name and Category.");
      return;
    }

    const slug = newProject.slug || newProject.name.toLowerCase().replace(/[^a-z0-9]+/g, "-");
    const projectToAdd: Project = {
      slug,
      name: newProject.name,
      category: newProject.category,
      url: newProject.url || "",
      summary: newProject.summary || "Modern website project.",
      objective: newProject.objective || "Craft an exceptional digital experience.",
      approach: newProject.approach || "Clean typography, responsiveness, and clear calls to action.",
      servicesProvided: newProject.servicesProvided || ["Website Design"],
      decisions: newProject.decisions || ["Optimized layout and performance"],
      tags: newProject.tags || ["Web Design"],
      image: newProject.image || portfolio.projects[0]?.image || "",
    };

    const updated = [projectToAdd, ...projectsList];
    setProjectsList(updated);
    savePortfolioData({ projects: updated });
    setIsAddingProject(false);
    setNewProject({
      slug: "",
      name: "",
      category: "",
      url: "",
      summary: "",
      objective: "",
      approach: "",
      servicesProvided: ["Website Design", "UI/UX Design"],
      decisions: ["High performance architecture"],
      tags: ["Web Design"],
    });
    toast.success(`Project "${projectToAdd.name}" added successfully!`);
  };

  const handleDeleteProject = (index: number) => {
    const proj = projectsList[index];
    if (!proj) return;
    if (window.confirm(`Delete project "${proj.name}"?`)) {
      const updated = projectsList.filter((_, i) => i !== index);
      setProjectsList(updated);
      savePortfolioData({ projects: updated });
      toast.success("Project removed.");
    }
  };

  const copyConfigAsJSON = () => {
    const currentData = portfolio;
    navigator.clipboard.writeText(JSON.stringify(currentData, null, 2));
    toast.success("Portfolio JSON copied to clipboard!");
  };

  const downloadJSONBackup = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(portfolio, null, 2));
    const downloadAnchor = document.createElement("a");
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `portfolio-backup-${new Date().toISOString().slice(0, 10)}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    toast.success("Backup JSON downloaded.");
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6 backdrop-blur-md bg-black/60 animate-in fade-in duration-200">
      {/* Container */}
      <div className="relative flex max-h-[92vh] w-full max-w-5xl flex-col overflow-hidden rounded-3xl border border-neutral-800 bg-[#070d19] text-white shadow-2xl shadow-black/80">
        
        {/* HEADER BAR */}
        <div className="flex items-center justify-between border-b border-blue-900/40 bg-[#091224] px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-xl bg-blue-600/20 text-blue-400 border border-blue-500/30">
              {isAuthenticated ? <Unlock className="size-5" /> : <Lock className="size-5" />}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-display text-lg font-bold text-white tracking-wide">
                  Admin Control Panel
                </h2>
                {isAuthenticated && (
                  <span className="rounded-full bg-emerald-500/20 px-2 py-0.5 text-[10px] font-bold text-emerald-400 border border-emerald-500/40">
                    UNLOCKED
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-400">
                {isAuthenticated ? "Live Portfolio Editor & Inquiries" : "Protected access (Press 'j' to open)"}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {isAuthenticated && (
              <button
                type="button"
                onClick={handleLogout}
                className="hidden sm:inline-flex items-center gap-1.5 rounded-full border border-neutral-700 bg-neutral-800/80 px-3 py-1.5 text-xs text-neutral-300 hover:bg-neutral-700 hover:text-white transition-colors"
                title="Lock session"
              >
                <Lock className="size-3.5" /> Lock
              </button>
            )}
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="flex size-9 items-center justify-center rounded-full border border-neutral-700 bg-neutral-800/80 text-neutral-300 hover:bg-neutral-700 hover:text-white transition-colors"
              aria-label="Close admin modal"
            >
              <X className="size-4" />
            </button>
          </div>
        </div>

        {/* BODY */}
        {!isAuthenticated ? (
          /* PASSWORD PROMPT SCREEN */
          <div className="flex flex-1 flex-col items-center justify-center p-6 sm:p-14 text-center">
            <div className="mb-5 sm:mb-6 flex size-16 sm:size-20 items-center justify-center rounded-2xl sm:rounded-3xl bg-blue-600/15 border border-blue-500/30 text-blue-400 shadow-xl shadow-blue-600/10">
              <KeyRound className="size-8 sm:size-10" />
            </div>
            <h3 className="font-display text-xl sm:text-2xl font-extrabold text-white">
              Lovepreet Admin Verification
            </h3>
            <p className="mt-2 max-w-sm text-xs sm:text-sm text-slate-300">
              Please enter your security password to access the administration dashboard.
            </p>

            <form onSubmit={handleLogin} className="mt-6 sm:mt-7 w-full max-w-sm space-y-4">
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={passwordInput}
                  onChange={(e) => {
                    setPasswordInput(e.target.value);
                    if (authError) setAuthError("");
                  }}
                  autoFocus
                  placeholder="Enter password..."
                  className="w-full rounded-2xl border border-blue-900/60 bg-[#0c162c] px-4 sm:px-5 py-3.5 pr-12 text-base sm:text-sm text-white outline-none transition-all placeholder:text-slate-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
                  aria-label="Toggle password visibility"
                >
                  {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                </button>
              </div>

              {authError && (
                <p className="text-xs font-semibold text-rose-400 animate-in fade-in">
                  {authError}
                </p>
              )}

              <button
                type="submit"
                className="w-full rounded-2xl bg-gradient-to-r from-blue-600 to-blue-500 py-3.5 text-sm font-bold text-white shadow-lg shadow-blue-600/30 hover:from-blue-500 hover:to-blue-400 active:scale-95 transition-all"
              >
                Unlock Admin Dashboard
              </button>
            </form>

            <p className="mt-6 sm:mt-8 text-xs text-slate-400">
              Open via <kbd className="rounded bg-neutral-800 px-1.5 py-0.5 text-slate-200">j</kbd> key or tap <kbd className="rounded bg-neutral-800 px-1.5 py-0.5 text-slate-200">©</kbd> in footer.
            </p>
          </div>
        ) : (
          /* AUTHENTICATED ADMIN DASHBOARD */
          <div className="flex flex-1 flex-col overflow-hidden">
            {/* TABS NAVIGATION */}
            <div className="flex items-center gap-2 overflow-x-auto border-b border-blue-900/30 bg-[#070e1c] px-4 sm:px-6 py-2.5 text-xs font-semibold">
              <button
                type="button"
                onClick={() => setActiveTab("profile")}
                className={`flex shrink-0 items-center gap-2 rounded-xl px-3.5 sm:px-4 py-2 transition-all ${
                  activeTab === "profile"
                    ? "bg-blue-600 text-white shadow-md shadow-blue-600/30"
                    : "text-slate-400 hover:bg-[#0e1933] hover:text-white"
                }`}
              >
                <User className="size-3.5" /> Profile & Contact
              </button>

              <button
                type="button"
                onClick={() => setActiveTab("projects")}
                className={`flex shrink-0 items-center gap-2 rounded-xl px-3.5 sm:px-4 py-2 transition-all ${
                  activeTab === "projects"
                    ? "bg-blue-600 text-white shadow-md shadow-blue-600/30"
                    : "text-slate-400 hover:bg-[#0e1933] hover:text-white"
                }`}
              >
                <Briefcase className="size-3.5" /> Projects ({projectsList.length})
              </button>

              <button
                type="button"
                onClick={() => setActiveTab("services")}
                className={`flex shrink-0 items-center gap-2 rounded-xl px-3.5 sm:px-4 py-2 transition-all ${
                  activeTab === "services"
                    ? "bg-blue-600 text-white shadow-md shadow-blue-600/30"
                    : "text-slate-400 hover:bg-[#0e1933] hover:text-white"
                }`}
              >
                <Layers className="size-3.5" /> Services ({servicesList.length})
              </button>

              <button
                type="button"
                onClick={() => setActiveTab("inquiries")}
                className={`flex shrink-0 items-center gap-2 rounded-xl px-3.5 sm:px-4 py-2 transition-all ${
                  activeTab === "inquiries"
                    ? "bg-blue-600 text-white shadow-md shadow-blue-600/30"
                    : "text-slate-400 hover:bg-[#0e1933] hover:text-white"
                }`}
              >
                <MessageSquare className="size-3.5" /> Inquiries
                {inquiriesList.filter((i) => !i.read).length > 0 && (
                  <span className="size-2 rounded-full bg-emerald-400" />
                )}
              </button>

              <button
                type="button"
                onClick={() => setActiveTab("export")}
                className={`flex shrink-0 items-center gap-2 rounded-xl px-3.5 sm:px-4 py-2 transition-all ${
                  activeTab === "export"
                    ? "bg-blue-600 text-white shadow-md shadow-blue-600/30"
                    : "text-slate-400 hover:bg-[#0e1933] hover:text-white"
                }`}
              >
                <Download className="size-3.5" /> Backup & Code
              </button>
            </div>

            {/* TAB CONTENTS (SCROLLABLE) */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-8 space-y-6">
              
              {/* TAB 1: PROFILE & CONTACT */}
              {activeTab === "profile" && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-display text-lg font-bold text-white">Profile & Contact Information</h4>
                      <p className="text-xs text-slate-400">Updates here apply immediately to hero, footer, and contact links.</p>
                    </div>
                    <button
                      type="button"
                      onClick={handleSaveProfile}
                      className="flex items-center gap-1.5 rounded-full bg-blue-600 px-5 py-2 text-xs font-bold text-white shadow-md shadow-blue-600/30 hover:bg-blue-500 transition-colors"
                    >
                      <Save className="size-3.5" /> Save Changes
                    </button>
                  </div>

                  <div className="flex items-center gap-4 rounded-2xl border border-blue-900/40 bg-[#091224] p-4">
                    <div className="size-16 overflow-hidden rounded-xl border border-blue-500/30 bg-white shadow shrink-0">
                      <img
                        src={profileForm.logo}
                        alt="Brand Logo"
                        className="h-full w-full object-contain p-1"
                      />
                    </div>
                    <div>
                      <h5 className="font-display text-sm font-bold text-white">Active Brand Logo & Monogram</h5>
                      <p className="text-xs text-slate-400">
                        Synchronized across Navbar header, Footer, and Browser Favicon.
                      </p>
                    </div>
                  </div>

                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-400">
                        Full Name
                      </label>
                      <input
                        type="text"
                        value={profileForm.name}
                        onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                        className="w-full rounded-xl border border-blue-900/50 bg-[#0c162c] px-4 py-2.5 text-sm text-white outline-none focus:border-blue-500"
                      />
                    </div>

                    <div>
                      <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-400">
                        Professional Title
                      </label>
                      <input
                        type="text"
                        value={profileForm.title}
                        onChange={(e) => setProfileForm({ ...profileForm, title: e.target.value })}
                        className="w-full rounded-xl border border-blue-900/50 bg-[#0c162c] px-4 py-2.5 text-sm text-white outline-none focus:border-blue-500"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-400">
                        Hero Headline
                      </label>
                      <input
                        type="text"
                        value={profileForm.headline}
                        onChange={(e) => setProfileForm({ ...profileForm, headline: e.target.value })}
                        className="w-full rounded-xl border border-blue-900/50 bg-[#0c162c] px-4 py-2.5 text-sm text-white outline-none focus:border-blue-500"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-400">
                        Hero Introduction / Bio
                      </label>
                      <textarea
                        rows={3}
                        value={profileForm.intro}
                        onChange={(e) => setProfileForm({ ...profileForm, intro: e.target.value })}
                        className="w-full rounded-xl border border-blue-900/50 bg-[#0c162c] px-4 py-2.5 text-sm text-white outline-none focus:border-blue-500"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-400">
                        Footer Tagline
                      </label>
                      <input
                        type="text"
                        value={profileForm.tagline}
                        onChange={(e) => setProfileForm({ ...profileForm, tagline: e.target.value })}
                        className="w-full rounded-xl border border-blue-900/50 bg-[#0c162c] px-4 py-2.5 text-sm text-white outline-none focus:border-blue-500"
                      />
                    </div>

                    <div>
                      <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-400">
                        Email Address
                      </label>
                      <input
                        type="email"
                        value={profileForm.email}
                        onChange={(e) => setProfileForm({ ...profileForm, email: e.target.value })}
                        className="w-full rounded-xl border border-blue-900/50 bg-[#0c162c] px-4 py-2.5 text-sm text-white outline-none focus:border-blue-500"
                      />
                    </div>

                    <div>
                      <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-400">
                        Phone (Display)
                      </label>
                      <input
                        type="text"
                        value={profileForm.phoneDisplay}
                        onChange={(e) => setProfileForm({ ...profileForm, phoneDisplay: e.target.value })}
                        className="w-full rounded-xl border border-blue-900/50 bg-[#0c162c] px-4 py-2.5 text-sm text-white outline-none focus:border-blue-500"
                      />
                    </div>

                    <div>
                      <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-400">
                        WhatsApp Link
                      </label>
                      <input
                        type="text"
                        value={profileForm.whatsapp}
                        onChange={(e) => setProfileForm({ ...profileForm, whatsapp: e.target.value })}
                        className="w-full rounded-xl border border-blue-900/50 bg-[#0c162c] px-4 py-2.5 text-sm text-white outline-none focus:border-blue-500"
                      />
                    </div>

                    <div>
                      <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-400">
                        Instagram Link
                      </label>
                      <input
                        type="text"
                        value={profileForm.socials.instagram}
                        onChange={(e) =>
                          setProfileForm({
                            ...profileForm,
                            socials: { ...profileForm.socials, instagram: e.target.value },
                          })
                        }
                        className="w-full rounded-xl border border-blue-900/50 bg-[#0c162c] px-4 py-2.5 text-sm text-white outline-none focus:border-blue-500"
                      />
                    </div>

                    <div>
                      <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-400">
                        LinkedIn Link
                      </label>
                      <input
                        type="text"
                        value={profileForm.socials.linkedin}
                        onChange={(e) =>
                          setProfileForm({
                            ...profileForm,
                            socials: { ...profileForm.socials, linkedin: e.target.value },
                          })
                        }
                        className="w-full rounded-xl border border-blue-900/50 bg-[#0c162c] px-4 py-2.5 text-sm text-white outline-none focus:border-blue-500"
                      />
                    </div>

                    <div>
                      <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-400">
                        Facebook Link
                      </label>
                      <input
                        type="text"
                        value={profileForm.socials.facebook}
                        onChange={(e) =>
                          setProfileForm({
                            ...profileForm,
                            socials: { ...profileForm.socials, facebook: e.target.value },
                          })
                        }
                        className="w-full rounded-xl border border-blue-900/50 bg-[#0c162c] px-4 py-2.5 text-sm text-white outline-none focus:border-blue-500"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 2: PROJECTS */}
              {activeTab === "projects" && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-display text-lg font-bold text-white">Manage Projects</h4>
                      <p className="text-xs text-slate-400">Add, edit, or remove client showcase projects.</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => setIsAddingProject(!isAddingProject)}
                        className="flex items-center gap-1.5 rounded-full border border-blue-500/50 bg-blue-600/20 px-4 py-2 text-xs font-bold text-blue-400 hover:bg-blue-600 hover:text-white transition-all"
                      >
                        <Plus className="size-3.5" /> Add Project
                      </button>
                      <button
                        type="button"
                        onClick={handleSaveProjects}
                        className="flex items-center gap-1.5 rounded-full bg-blue-600 px-5 py-2 text-xs font-bold text-white shadow-md shadow-blue-600/30 hover:bg-blue-500 transition-colors"
                      >
                        <Save className="size-3.5" /> Save List
                      </button>
                    </div>
                  </div>

                  {/* Add Project Form */}
                  {isAddingProject && (
                    <div className="rounded-2xl border border-blue-500/40 bg-[#0a1329] p-5 space-y-4 animate-in fade-in">
                      <h5 className="font-display text-sm font-bold text-blue-300">Add New Project</h5>
                      <div className="grid gap-3 sm:grid-cols-2">
                        <input
                          placeholder="Project Name (e.g., Downtown Bistro)"
                          value={newProject.name || ""}
                          onChange={(e) => setNewProject({ ...newProject, name: e.target.value })}
                          className="rounded-xl border border-blue-900/60 bg-[#060b17] px-3.5 py-2 text-xs text-white outline-none focus:border-blue-500"
                        />
                        <input
                          placeholder="Category (e.g., Restaurant & Bar)"
                          value={newProject.category || ""}
                          onChange={(e) => setNewProject({ ...newProject, category: e.target.value })}
                          className="rounded-xl border border-blue-900/60 bg-[#060b17] px-3.5 py-2 text-xs text-white outline-none focus:border-blue-500"
                        />
                        <input
                          placeholder="Live Website URL (optional)"
                          value={newProject.url || ""}
                          onChange={(e) => setNewProject({ ...newProject, url: e.target.value })}
                          className="rounded-xl border border-blue-900/60 bg-[#060b17] px-3.5 py-2 text-xs text-white outline-none focus:border-blue-500 sm:col-span-2"
                        />
                        <textarea
                          placeholder="Project Summary (1-2 sentences)"
                          rows={2}
                          value={newProject.summary || ""}
                          onChange={(e) => setNewProject({ ...newProject, summary: e.target.value })}
                          className="rounded-xl border border-blue-900/60 bg-[#060b17] px-3.5 py-2 text-xs text-white outline-none focus:border-blue-500 sm:col-span-2"
                        />
                      </div>
                      <div className="flex justify-end gap-2">
                        <button
                          type="button"
                          onClick={() => setIsAddingProject(false)}
                          className="rounded-xl border border-neutral-700 px-4 py-1.5 text-xs text-slate-400 hover:text-white"
                        >
                          Cancel
                        </button>
                        <button
                          type="button"
                          onClick={handleAddNewProject}
                          className="rounded-xl bg-blue-600 px-4 py-1.5 text-xs font-bold text-white shadow-md hover:bg-blue-500"
                        >
                          Save New Project
                        </button>
                      </div>
                    </div>
                  )}

                  {/* List */}
                  <div className="space-y-3">
                    {projectsList.map((project, idx) => (
                      <div
                        key={project.slug || idx}
                        className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-2xl border border-blue-950/60 bg-[#091224] p-4 transition-colors hover:border-blue-900/80"
                      >
                        <div className="flex items-center gap-4">
                          {project.image && (
                            <img
                              src={project.image}
                              alt={project.name}
                              className="size-16 rounded-xl object-cover border border-neutral-700"
                            />
                          )}
                          <div>
                            <span className="rounded bg-blue-600/20 px-2 py-0.5 text-[10px] font-bold text-blue-400 uppercase tracking-wider">
                              {project.category}
                            </span>
                            <h5 className="font-display text-base font-bold text-white mt-1">
                              {project.name}
                            </h5>
                            <p className="line-clamp-1 text-xs text-slate-400">{project.summary}</p>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 self-end sm:self-center">
                          {project.url && (
                            <a
                              href={project.url}
                              target="_blank"
                              rel="noreferrer"
                              className="flex size-8 items-center justify-center rounded-lg border border-neutral-700 text-slate-400 hover:text-white"
                              title="Visit live URL"
                            >
                              <ExternalLink className="size-3.5" />
                            </a>
                          )}
                          <button
                            type="button"
                            onClick={() => handleDeleteProject(idx)}
                            className="flex size-8 items-center justify-center rounded-lg border border-rose-900/60 text-rose-400 hover:bg-rose-950/60 hover:text-rose-300"
                            title="Delete project"
                          >
                            <Trash2 className="size-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 3: SERVICES */}
              {activeTab === "services" && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-display text-lg font-bold text-white">Services Offered</h4>
                      <p className="text-xs text-slate-400">Edit titles and descriptions displayed in the services grid.</p>
                    </div>
                    <button
                      type="button"
                      onClick={handleSaveServices}
                      className="flex items-center gap-1.5 rounded-full bg-blue-600 px-5 py-2 text-xs font-bold text-white shadow-md shadow-blue-600/30 hover:bg-blue-500 transition-colors"
                    >
                      <Save className="size-3.5" /> Save Services
                    </button>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    {servicesList.map((service, idx) => (
                      <div
                        key={service.title || idx}
                        className="rounded-2xl border border-blue-950/70 bg-[#091224] p-4 space-y-2.5"
                      >
                        <input
                          type="text"
                          value={service.title}
                          onChange={(e) => {
                            const updated = [...servicesList];
                            const current = updated[idx];
                            if (current) {
                              updated[idx] = { ...current, title: e.target.value };
                              setServicesList(updated);
                            }
                          }}
                          className="w-full rounded-xl border border-blue-900/40 bg-[#060b17] px-3.5 py-2 text-sm font-bold text-white outline-none focus:border-blue-500"
                        />
                        <textarea
                          rows={3}
                          value={service.description}
                          onChange={(e) => {
                            const updated = [...servicesList];
                            const current = updated[idx];
                            if (current) {
                              updated[idx] = { ...current, description: e.target.value };
                              setServicesList(updated);
                            }
                          }}
                          className="w-full rounded-xl border border-blue-900/40 bg-[#060b17] px-3.5 py-2 text-xs text-slate-300 outline-none focus:border-blue-500"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 4: INQUIRIES */}
              {activeTab === "inquiries" && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-display text-lg font-bold text-white">Client Messages & Inquiries</h4>
                      <p className="text-xs text-slate-400">Messages submitted directly by visitors through the contact form.</p>
                    </div>
                    <span className="rounded-full bg-blue-600/20 px-3 py-1 text-xs font-bold text-blue-400 border border-blue-500/30">
                      Total: {inquiriesList.length}
                    </span>
                  </div>

                  {inquiriesList.length === 0 ? (
                    <div className="rounded-2xl border border-dashed border-neutral-800 bg-[#091224]/50 py-12 text-center">
                      <MessageSquare className="mx-auto size-8 text-slate-500 mb-2" />
                      <p className="text-sm text-slate-400 font-semibold">No inquiries received yet.</p>
                      <p className="text-xs text-slate-500 mt-1">When someone submits your contact form, their message will appear here!</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {inquiriesList.map((inq) => (
                        <div
                          key={inq.id}
                          className="rounded-2xl border border-blue-950/70 bg-[#091224] p-5 space-y-3"
                        >
                          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-blue-950 pb-3">
                            <div>
                              <h5 className="font-display text-base font-bold text-white flex items-center gap-2">
                                {inq.name}
                                {inq.business && (
                                  <span className="text-xs font-normal text-slate-400">
                                    ({inq.business})
                                  </span>
                                )}
                              </h5>
                              <p className="text-xs text-slate-400">
                                {new Date(inq.date).toLocaleDateString()} · {new Date(inq.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                              </p>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="rounded-md bg-blue-600/20 px-2.5 py-1 text-[11px] font-bold text-blue-300">
                                {inq.service}
                              </span>
                              {inq.budget && (
                                <span className="rounded-md bg-emerald-500/20 px-2.5 py-1 text-[11px] font-bold text-emerald-400">
                                  {inq.budget}
                                </span>
                              )}
                              <button
                                type="button"
                                onClick={() => deleteInquiry(inq.id)}
                                className="flex size-7 items-center justify-center rounded-lg text-slate-400 hover:bg-rose-950/50 hover:text-rose-400"
                                title="Delete inquiry"
                              >
                                <Trash2 className="size-3.5" />
                              </button>
                            </div>
                          </div>

                          <p className="text-xs leading-relaxed text-slate-300 whitespace-pre-wrap">
                            {inq.details}
                          </p>

                          <div className="flex items-center gap-3 pt-2">
                            <a
                              href={`mailto:${inq.email}?subject=${encodeURIComponent("Re: Project Request")}`}
                              className="inline-flex items-center gap-1.5 rounded-lg bg-blue-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-blue-500"
                            >
                              <Mail className="size-3.5" /> Reply to {inq.email}
                            </a>
                            <a
                              href={portfolio.profile.whatsapp}
                              target="_blank"
                              rel="noreferrer"
                              className="inline-flex items-center gap-1.5 rounded-lg border border-emerald-500/40 bg-emerald-500/10 px-3 py-1.5 text-xs font-semibold text-emerald-400 hover:bg-emerald-500 hover:text-white"
                            >
                              <Phone className="size-3.5" /> WhatsApp
                            </a>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* TAB 5: EXPORT & BACKUP */}
              {activeTab === "export" && (
                <div className="space-y-6">
                  <div>
                    <h4 className="font-display text-lg font-bold text-white">Backup & Code Sync</h4>
                    <p className="text-xs text-slate-400">Export your configured portfolio data or reset to original defaults.</p>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="rounded-2xl border border-blue-900/40 bg-[#091224] p-5 space-y-3">
                      <h5 className="font-display text-sm font-bold text-white">Download JSON Backup</h5>
                      <p className="text-xs text-slate-400">Save a backup file with your latest custom settings and projects.</p>
                      <button
                        type="button"
                        onClick={downloadJSONBackup}
                        className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2 text-xs font-bold text-white hover:bg-blue-500"
                      >
                        <Download className="size-3.5" /> Download Backup (.json)
                      </button>
                    </div>

                    <div className="rounded-2xl border border-blue-900/40 bg-[#091224] p-5 space-y-3">
                      <h5 className="font-display text-sm font-bold text-white">Copy JSON Configuration</h5>
                      <p className="text-xs text-slate-400">Copy the active configuration data directly to your clipboard.</p>
                      <button
                        type="button"
                        onClick={copyConfigAsJSON}
                        className="inline-flex items-center gap-2 rounded-xl border border-blue-500/40 bg-blue-600/10 px-4 py-2 text-xs font-bold text-blue-400 hover:bg-blue-600 hover:text-white"
                      >
                        <Copy className="size-3.5" /> Copy to Clipboard
                      </button>
                    </div>
                  </div>

                  <div className="rounded-2xl border border-rose-900/40 bg-rose-950/20 p-5 space-y-3">
                    <h5 className="font-display text-sm font-bold text-rose-300">Reset Content to Default</h5>
                    <p className="text-xs text-rose-200/70">
                      Clears your custom saved data and restores the initial project portfolio files.
                    </p>
                    <button
                      type="button"
                      onClick={handleResetDefaults}
                      className="inline-flex items-center gap-2 rounded-xl border border-rose-800 bg-rose-900/40 px-4 py-2 text-xs font-bold text-rose-200 hover:bg-rose-800"
                    >
                      <RotateCcw className="size-3.5" /> Reset to Defaults
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* FOOTER BAR */}
            <div className="flex items-center justify-between border-t border-blue-900/30 bg-[#060b17] px-6 py-3 text-xs text-slate-500">
              <span>Admin Mode Active · Press <kbd className="rounded bg-neutral-800 px-1 text-slate-300">Esc</kbd> to close</span>
              <span>Trigger: Key 'j' | Password: jind</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
