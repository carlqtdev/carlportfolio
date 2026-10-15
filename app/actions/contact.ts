"use server";

import { headers } from "next/headers";
import { Resend } from "resend";

import {
  parseContactForm,
  type ContactState,
} from "@/lib/contact";

/**
 * Best-effort in-memory throttle. It is per-instance, so on serverless hosting
 * it raises the cost of casual abuse rather than preventing it outright.
 */
const RATE_LIMIT = { windowMs: 60_000, max: 3, maxKeys: 5_000 } as const;
const recentAttempts = new Map<string, number[]>();

function isRateLimited(key: string): boolean {
  const now = Date.now();

  if (recentAttempts.size > RATE_LIMIT.maxKeys) {
    recentAttempts.clear();
  }

  const withinWindow = (recentAttempts.get(key) ?? []).filter(
    (timestamp) => now - timestamp < RATE_LIMIT.windowMs,
  );
  withinWindow.push(now);
  recentAttempts.set(key, withinWindow);

  return withinWindow.length > RATE_LIMIT.max;
}

async function clientKey(): Promise<string> {
  const headerList = await headers();
  const forwarded = headerList.get("x-forwarded-for");
  return forwarded?.split(",")[0]?.trim() || headerList.get("x-real-ip") || "unknown";
}

export async function submitContact(
  _previousState: ContactState,
  formData: FormData,
): Promise<ContactState> {
  const { input, fieldErrors, honeypot } = parseContactForm(formData);

  // A filled honeypot means a bot. Report success and drop the message.
  if (honeypot.length > 0) {
    return { status: "success", message: "Thanks — your message is on its way." };
  }

  if (Object.keys(fieldErrors).length > 0) {
    return {
      status: "error",
      message: "Some fields need attention.",
      fieldErrors,
      values: input,
    };
  }

  const apiKey = process.env.RESEND_API_KEY;
  const recipient = process.env.CONTACT_TO_EMAIL;

  if (!apiKey || !recipient) {
    return {
      status: "unconfigured",
      message:
        "The contact form isn't wired up yet. Set RESEND_API_KEY and CONTACT_TO_EMAIL, or email me directly.",
      values: input,
    };
  }

  if (isRateLimited(await clientKey())) {
    return {
      status: "error",
      message: "Too many messages from this address. Please try again in a minute.",
      values: input,
    };
  }

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from: process.env.CONTACT_FROM_EMAIL ?? "Portfolio <onboarding@resend.dev>",
      to: recipient,
      replyTo: input.email,
      subject: `Portfolio enquiry from ${input.name}`,
      text: `${input.message}\n\n—\n${input.name}\n${input.email}`,
    });

    if (error) throw new Error(error.message);

    return {
      status: "success",
      message: "Thanks — your message is on its way. I'll reply soon.",
    };
  } catch {
    return {
      status: "error",
      message: "Something went wrong sending that. Please email me directly.",
      values: input,
    };
  }
}
