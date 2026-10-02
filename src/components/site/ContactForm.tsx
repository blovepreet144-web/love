import { useState } from "react";
import { z } from "zod";
import { toast } from "sonner";
import { serviceOptions } from "@/data/portfolio";
import { saveInquiry, usePortfolioData } from "@/lib/portfolioStore";

const schema = z.object({
  name: z.string().trim().min(1, "Please enter your name").max(100),
  email: z.string().trim().email("Please enter a valid email").max(255),
  business: z.string().trim().max(120).optional().or(z.literal("")),
  service: z.string().trim().min(1, "Please choose a service").max(80),
  details: z
    .string()
    .trim()
    .min(10, "Please tell me a little more about the project")
    .max(2000),
  budget: z.string().trim().max(80).optional().or(z.literal("")),
});

const fieldClass =
  "w-full rounded-xl border border-input bg-surface px-4 py-3 sm:py-3.5 text-base sm:text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-primary";

export function ContactForm() {
  const { profile } = usePortfolioData();
  const [errors, setErrors] = useState<Record<string, string>>({});

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formElement = event.currentTarget;
    const form = new FormData(formElement);
    const parsed = schema.safeParse({
      name: form.get("name"),
      email: form.get("email"),
      business: form.get("business"),
      service: form.get("service"),
      details: form.get("details"),
      budget: form.get("budget"),
    });

    if (!parsed.success) {
      const next: Record<string, string> = {};
      parsed.error.issues.forEach((issue) => {
        const key = String(issue.path[0]);
        if (!next[key]) next[key] = issue.message;
      });
      setErrors(next);
      toast.error("Please check the highlighted fields.");
      return;
    }

    setErrors({});
    const d = parsed.data;

    // Save inquiry to Admin Panel store
    saveInquiry({
      name: d.name,
      email: d.email,
      business: d.business || undefined,
      service: d.service,
      details: d.details,
      budget: d.budget || undefined,
    });

    const body = [
      `Name: ${d.name}`,
      `Email: ${d.email}`,
      `Business: ${d.business || "—"}`,
      `Service needed: ${d.service}`,
      `Budget: ${d.budget || "—"}`,
      "",
      "Project details:",
      d.details,
    ].join("\n");

    window.location.href = `mailto:${profile.email}?subject=${encodeURIComponent(
      `Project request from ${d.name}`,
    )}&body=${encodeURIComponent(body)}`;
    toast.success("Request sent and saved to inquiries!");
    formElement.reset();
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-4 sm:gap-5 sm:grid-cols-2" noValidate>
      <Field label="Name" error={errors['name']}>
        <input name="name" className={fieldClass} placeholder="Your full name" />
      </Field>
      <Field label="Email" error={errors['email']}>
        <input name="email" type="email" className={fieldClass} placeholder="you@email.com" />
      </Field>
      <Field label="Business / Company" error={errors['business']}>
        <input name="business" className={fieldClass} placeholder="Optional" />
      </Field>
      <Field label="Service needed" error={errors['service']}>
        <select name="service" defaultValue="" className={fieldClass}>
          <option value="" disabled>
            Select a service
          </option>
          {serviceOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </Field>
      <Field label="Project details" error={errors['details']} full>
        <textarea
          name="details"
          rows={5}
          className={fieldClass}
          placeholder="Tell me about your business, goals and timeline."
        />
      </Field>
      <Field label="Budget (optional)" error={errors['budget']} full>
        <input name="budget" className={fieldClass} placeholder="e.g. ₹15,000 – ₹40,000" />
      </Field>

      <div className="sm:col-span-2 pt-1">
        <button
          type="submit"
          className="w-full rounded-full bg-primary px-8 py-3.5 sm:py-4 text-sm font-semibold text-primary-foreground transition-transform hover:scale-[1.02] sm:w-auto cursor-pointer"
        >
          Submit Project Request
        </button>
      </div>
    </form>
  );
}

function Field({
  label,
  error,
  children,
  full,
}: {
  label: string;
  error?: string | undefined;
  children: React.ReactNode;
  full?: boolean | undefined;
}) {
  return (
    <label className={full ? "block sm:col-span-2" : "block"}>
      <span className="mb-2 block text-xs uppercase tracking-[0.16em] text-muted-foreground">
        {label}
      </span>
      {children}
      {error ? <span className="mt-2 block text-xs text-destructive">{error}</span> : null}
    </label>
  );
}
