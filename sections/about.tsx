import { Badge } from "@/components/badge";
import { Reveal } from "@/components/reveal";
import { Section } from "@/components/section";
import { profile, skills } from "@/content/profile";

export function About() {
  return (
    <Section id="about" title="About me" description={profile.available}>
      <div className="grid gap-10 lg:grid-cols-[1.35fr_1fr] lg:gap-16">
        <Reveal className="space-y-5">
          {profile.bio.map((paragraph) => (
            <p key={paragraph} className="text-[0.9375rem] leading-7 text-muted">
              {paragraph}
            </p>
          ))}
        </Reveal>

        <Reveal delay={0.08}>
          <h3 className="font-mono text-xs tracking-[0.12em] text-faint uppercase">
            Skills
          </h3>
          <ul className="mt-3 flex flex-wrap gap-2">
            {skills.map((skill) => (
              <li key={skill}>
                <Badge>{skill}</Badge>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </Section>
  );
}
