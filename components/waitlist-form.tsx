"use client";

import { FormEvent, useState } from "react";

type WaitlistFormProps = {
  buttonLabel?: string;
  copy?: {
    company: string;
    companyPlaceholder: string;
    email: string;
    emailPlaceholder: string;
    error: string;
    fullName: string;
    fullNamePlaceholder: string;
    pending: string;
    success: string;
    useCase: string;
    useCasePlaceholder: string;
    website: string;
  };
};

type SubmissionStatus =
  | {
      message: string;
      type: "error";
    }
  | {
      message: string;
      type: "success";
    }
  | null;

export function WaitlistForm({
  buttonLabel = "Join the waitlist",
  copy = {
    company: "Company",
    companyPlaceholder: "Analytical Systems GmbH",
    email: "Work email",
    emailPlaceholder: "ada@company.com",
    error: "Something went wrong while sending your request. Please try again.",
    fullName: "Full name",
    fullNamePlaceholder: "Ada Lovelace",
    pending: "Sending...",
    success: "Thanks. Your request has been received.",
    useCase: "Use case",
    useCasePlaceholder:
      "What kind of anomaly detection or predictive workflow are you evaluating?",
    website: "Website"
  }
}: WaitlistFormProps) {
  const [isPending, setIsPending] = useState(false);
  const [status, setStatus] = useState<SubmissionStatus>(null);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsPending(true);
    setStatus(null);

    const form = event.currentTarget;
    const formData = new FormData(form);

    const payload = {
      company: String(formData.get("company") ?? ""),
      email: String(formData.get("email") ?? ""),
      fullName: String(formData.get("fullName") ?? ""),
      useCase: String(formData.get("useCase") ?? ""),
      website: String(formData.get("website") ?? "")
    };

    try {
      const response = await fetch("/api/waitlist", {
        body: JSON.stringify(payload),
        headers: {
          "Content-Type": "application/json"
        },
        method: "POST"
      });

      await response.json().catch(() => null);

      if (!response.ok) {
        setStatus({
          message: copy.error,
          type: "error"
        });

        return;
      }

      form.reset();
      setStatus({
        message: copy.success,
        type: "success"
      });
    } catch {
      setStatus({
        message: copy.error,
        type: "error"
      });
    } finally {
      setIsPending(false);
    }
  };

  return (
    <form className="waitlist-form" noValidate onSubmit={handleSubmit}>
      <div className="field-grid">
        <label className="field">
          <input
            aria-label={copy.fullName}
            autoComplete="name"
            name="fullName"
            placeholder={copy.fullName}
            required
            type="text"
          />
        </label>

        <label className="field">
          <input
            aria-label={copy.email}
            autoComplete="email"
            name="email"
            placeholder={copy.email}
            required
            type="email"
          />
        </label>
      </div>

      <label className="field">
        <input
          aria-label={copy.company}
          autoComplete="organization"
          name="company"
          placeholder={copy.company}
          required
          type="text"
        />
      </label>

      <label className="field">
        <textarea
          aria-label={copy.useCase}
          name="useCase"
          placeholder={copy.useCase}
          rows={4}
        />
      </label>

      <label
        aria-hidden="true"
        aria-label={copy.website}
        className="field field-honeypot"
        tabIndex={-1}
      >
        <input autoComplete="off" name="website" tabIndex={-1} type="text" />
      </label>

      <button className="button button-primary waitlist-submit" disabled={isPending} type="submit">
        {isPending ? copy.pending : buttonLabel}
      </button>

      {status ? (
        <p
          aria-live="polite"
          className={`status-message status-message-${status.type}`}
          role="status"
        >
          {status.message}
        </p>
      ) : null}
    </form>
  );
}
