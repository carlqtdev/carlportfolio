import { ButtonAnchor, ButtonLink } from "@/components/button";
import { Container } from "@/components/container";
import { HeroPortrait } from "@/components/hero-portrait";
import {
  ArrowRightIcon,
  DownloadIcon,
  PumpkinIcon,
} from "@/components/icons";
import { Reveal } from "@/components/reveal";
import { profile } from "@/content/profile";

export function Hero() {
  return (
    <section
      aria-labelledby="hero-heading"
      className="pt-16 pb-14 sm:pt-24 sm:pb-20"
    >
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,1fr)_22rem] lg:items-stretch lg:gap-12">
          <div>
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
                <PumpkinIcon className="h-3.5 w-3.5 shrink-0 text-accent" />
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
                  Download resume
                </ButtonAnchor>
              </div>
            </Reveal>
          </div>

          <Reveal
            delay={0.1}
            className="order-first mx-auto w-40 shrink-0 sm:w-52 lg:order-none lg:h-full lg:w-full"
          >
            <HeroPortrait
              src="/carll.jpg"
              alt={`Portrait of ${profile.name}`}
              sizes="(min-width: 1024px) 22rem, (min-width: 640px) 13rem, 10rem"
            />
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
