import { Container } from "@/components/container";
import { CopyrightYear } from "@/components/copyright-year";
import { SocialLinks } from "@/components/social-links";
import { profile } from "@/content/profile";

export function SiteFooter() {
  return (
    <footer className="relative z-10 mt-auto border-t border-line py-12">
      <Container className="flex flex-col gap-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <p className="text-sm text-muted">
            {profile.name} — {profile.role}
          </p>
          <SocialLinks />
        </div>
        <p className="font-mono text-xs text-faint">
          © <CopyrightYear />. Built with Next.js and Tailwind CSS.
        </p>
      </Container>
    </footer>
  );
}
