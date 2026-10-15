/** Shared types and pure validation for the contact form. */

export type ContactField = "name" | "email" | "message";

export type ContactStatus = "idle" | "success" | "error" | "unconfigured";

export type ContactState = {
  status: ContactStatus;
  message?: string;
  fieldErrors?: Partial<Record<ContactField, string>>;
  values?: ContactInput;
};

export type ContactInput = {
  name: string;
  email: string;
  message: string;
};

export const initialContactState: ContactState = { status: "idle" };

export const CONTACT_LIMITS = {
  name: 80,
  email: 200,
  message: 40,
  messageMax: 2000,
} as const;

/**
 * Deliberately permissive: the goal is to catch obvious typos, not to
 * adjudicate RFC 5322.
 */
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function readString(formData: FormData, key: string): string {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
}

export function parseContactForm(formData: FormData): {
  input: ContactInput;
  fieldErrors: Partial<Record<ContactField, string>>;
  honeypot: string;
} {
  const input: ContactInput = {
    name: readString(formData, "name"),
    email: readString(formData, "email"),
    message: readString(formData, "message"),
  };

  const fieldErrors: Partial<Record<ContactField, string>> = {};

  if (input.name.length === 0) {
    fieldErrors.name = "Please tell me your name.";
  } else if (input.name.length > CONTACT_LIMITS.name) {
    fieldErrors.name = `Keep this under ${CONTACT_LIMITS.name} characters.`;
  }

  if (input.email.length === 0) {
    fieldErrors.email = "An email address lets me reply.";
  } else if (!EMAIL_PATTERN.test(input.email) || input.email.length > CONTACT_LIMITS.email) {
    fieldErrors.email = "That doesn't look like a valid email address.";
  }

  if (input.message.length < CONTACT_LIMITS.message) {
    fieldErrors.message = `Please write at least ${CONTACT_LIMITS.message} characters.`;
  } else if (input.message.length > CONTACT_LIMITS.messageMax) {
    fieldErrors.message = `Keep this under ${CONTACT_LIMITS.messageMax} characters.`;
  }

  return { input, fieldErrors, honeypot: readString(formData, "company") };
}
