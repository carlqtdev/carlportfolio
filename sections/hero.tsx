import { ButtonAnchor, ButtonLink } from "@/components/button";
import { Container } from "@/components/container";
import { ArrowRightIcon, DownloadIcon } from "@/components/icons";
import { Reveal } from "@/components/reveal";
import { profile } from "@/content/profile";

export function Hero() {
  return (
    <section
      aria-labelledby="hero-heading"
      className="pt-16 pb-20 sm:pt-24 sm:pb-28"
    >
      <Container>
        <Reveal>
          <p className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-3 py-1 font-mono text-xs text-muted">
            <span className="relative flex h-1.5 w-1.5">
              <span
                aria-hidden
                className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60 motion-reduce:hidden"
              />
              <span
                aria-hidden
                className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent"
              />
            </span>
            {profile.available}
          </p>
        </Reveal>

        <Reveal delay={0.05}>
          <h1
            id="hero-heading"
            className="mt-8 max-w-3xl text-[2rem] leading-[1.15] font-semibold tracking-tight text-ink sm:text-[2.5rem] lg:text-[3rem]"
          >
            {profile.tagline}
          </h1>
        </Reveal>

        <Reveal delay={0.1}>
          <p className="mt-6 max-w-xl text-base leading-7 text-muted">
            I&apos;m {profile.name}, a {profile.role.toLowerCase()} based in{" "}
            {profile.location}.
          </p>
        </Reveal>

        <Reveal delay={0.15}>
          <div className="mt-10 flex flex-wrap items-center gap-3">
            <ButtonLink href="/#contact">
              Get in touch
              <ArrowRightIcon className="h-4 w-4" />
            </ButtonLink>
            <ButtonAnchor
              href={profile.resumeHref}
              variant="secondary"
              download="Carl-Penaranda-Resume.pdf"
            >
              <DownloadIcon className="h-4 w-4" />
              Download résumé
            </ButtonAnchor>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
