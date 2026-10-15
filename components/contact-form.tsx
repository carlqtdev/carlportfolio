"use client";

import { useActionState } from "react";

import { submitContact } from "@/app/actions/contact";
import { Button } from "@/components/button";
import { AlertIcon, CheckIcon, SpinnerIcon } from "@/components/icons";
import { initialContactState, type ContactState } from "@/lib/contact";
import { cn } from "@/lib/utils";

const controlClass =
  "w-full rounded-md border border-line bg-surface px-3 py-2 text-sm text-ink transition-colors placeholder:text-faint focus:border-accent focus:outline-none focus-visible:ring-2 focus-visible:ring-ring/40 aria-[invalid=true]:border-red-500/70";

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} className="mt-1.5 text-xs text-red-600 dark:text-red-400">
      {message}
    </p>
  );
}

export function ContactForm() {
  const [state, formAction, pending] = useActionState(
    submitContact,
    initialContactState,
  );
  const errors = state.fieldErrors ?? {};

  return (
    <form action={formAction} className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="mb-1.5 block text-sm font-medium text-ink">
            Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            maxLength={80}
            autoComplete="name"
            placeholder="Jane Doe"
            defaultValue={state.values?.name}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? "name-error" : undefined}
            className={controlClass}
          />
          <FieldError id="name-error" message={errors.name} />
        </div>

        <div>
          <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-ink">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            maxLength={200}
            autoComplete="email"
            placeholder="jane@company.com"
            defaultValue={state.values?.email}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? "email-error" : undefined}
            className={controlClass}
          />
          <FieldError id="email-error" message={errors.email} />
        </div>
      </div>

      <div>
        <label htmlFor="message" className="mb-1.5 block text-sm font-medium text-ink">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={6}
          minLength={40}
          maxLength={2000}
          placeholder="A little context about the role, project or question."
          defaultValue={state.values?.message}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? "message-error" : "message-hint"}
          className={cn(controlClass, "resize-y")}
        />
        {errors.message ? (
          <FieldError id="message-error" message={errors.message} />
        ) : (
          <p id="message-hint" className="mt-1.5 text-xs text-faint">
            At least 40 characters.
          </p>
        )}
      </div>

      {/* Honeypot: hidden from users, tempting to bots. */}
      <div aria-hidden="true" className="absolute left-[-9999px] h-px w-px overflow-hidden">
        <label htmlFor="company">Company</label>
        <input id="company" name="company" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="flex flex-wrap items-center gap-x-4 gap-y-3">
        <Button type="submit" disabled={pending} className="w-full sm:w-auto">
          {pending ? (
            <>
              <SpinnerIcon className="h-4 w-4 animate-spin" />
              Sending…
            </>
          ) : (
            "Send message"
          )}
        </Button>
        <StatusMessage state={state} />
      </div>
    </form>
  );
}

function StatusMessage({ state }: { state: ContactState }) {
  if (state.status === "idle" || !state.message) return null;

  const tone =
    state.status === "success"
      ? "text-accent"
      : state.status === "unconfigured"
        ? "text-muted"
        : "text-red-600 dark:text-red-400";

  return (
    <p
      role="status"
      aria-live="polite"
      className={cn("flex items-center gap-2 text-sm", tone)}
    >
      {state.status === "success" ? (
        <CheckIcon className="h-4 w-4 shrink-0" />
      ) : (
        <AlertIcon className="h-4 w-4 shrink-0" />
      )}
      {state.message}
    </p>
  );
}
