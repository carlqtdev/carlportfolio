import type { Metadata } from "next";

import { Badge } from "@/components/badge";
import { ButtonAnchor } from "@/components/button";
import { Container } from "@/components/container";
import { DownloadIcon } from "@/components/icons";
import { Reveal } from "@/components/reveal";
import { Section } from "@/components/section";
import { education, profile, skills } from "@/content/profile";

export const metadata: Metadata = {
  title: "Résumé",
  description: `Education and skills for ${profile.name}, ${profile.role}.`,
  alternates: { canonical: "/resume" },
};

export default function ResumePage() {
  return (
    <>
      <Container as="header" className="pt-16 pb-12 sm:pt-20 sm:pb-16">
        <Reveal>
          <p className="font-mono text-xs tracking-[0.14em] text-accent uppercase">
            Résumé
          </p>
          <h1 className="mt-4 text-[2rem] font-semibold tracking-tight text-ink sm:text-[2.5rem]">
            {profile.name}
          </h1>
          <p className="mt-3 text-base text-muted">
            {profile.role} · {profile.location}
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <ButtonAnchor
              href={profile.resumeHref}
              download="Carl-Penaranda-Resume.pdf"
            >
              <DownloadIcon className="h-4 w-4" />
              Download PDF
            </ButtonAnchor>
            <ButtonAnchor href={`mailto:${profile.email}`} variant="secondary">
              {profile.email}
            </ButtonAnchor>
          </div>
        </Reveal>
      </Container>

      <Section id="education" title="Education">
        <ul className="space-y-8">
          {education.map((item) => (
            <li
              key={item.credential}
              className="grid gap-3 sm:grid-cols-[9rem_1fr] sm:gap-8"
            >
              <p className="font-mono text-xs text-faint sm:pt-1">
                {item.period}
              </p>
              <div>
                <h3 className="text-base font-semibold tracking-tight text-ink">
                  {item.credential}
                </h3>
                <p className="mt-1 text-sm text-muted">{item.institution}</p>
                {item.detail ? (
                  <p className="mt-2 max-w-2xl text-[0.9375rem] leading-7 text-muted">
                    {item.detail}
                  </p>
                ) : null}
              </div>
            </li>
          ))}
        </ul>
      </Section>

      <Section
        id="skills"
        title="Skills"
        description="What I work with day to day."
      >
        <ul className="flex flex-wrap gap-2">
          {skills.map((skill) => (
            <li key={skill}>
              <Badge>{skill}</Badge>
            </li>
          ))}
        </ul>
      </Section>
    </>
  );
}
