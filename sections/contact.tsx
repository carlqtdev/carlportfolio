import { ContactForm } from "@/components/contact-form";
import { Reveal } from "@/components/reveal";
import { Section } from "@/components/section";
import { SocialLinks } from "@/components/social-links";
import { profile } from "@/content/profile";

export function Contact() {
  return (
    <Section
      id="contact"
      eyebrow="Contact"
      title="Let's talk"
      description="Hiring, collaborating, or just curious about something I built? Send a note."
    >
      <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
        <Reveal>
          <div className="space-y-6">
            <div>
              <p className="font-mono text-xs tracking-[0.12em] text-faint uppercase">
                Email
              </p>
              <a
                href={`mailto:${profile.email}`}
                className="mt-2 inline-block text-base font-medium text-ink underline decoration-accent/40 underline-offset-4 transition-colors hover:decoration-accent"
              >
                {profile.email}
              </a>
            </div>

            <div>
              <p className="font-mono text-xs tracking-[0.12em] text-faint uppercase">
                Based in
              </p>
              <p className="mt-2 text-base text-ink">{profile.location}</p>
            </div>

            <div>
              <p className="font-mono text-xs tracking-[0.12em] text-faint uppercase">
                Elsewhere
              </p>
              {/* The email is already shown above, so leave it out here. */}
              <SocialLinks className="mt-3" exclude={["mail"]} />
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.08}>
          <ContactForm />
        </Reveal>
      </div>
    </Section>
  );
}
