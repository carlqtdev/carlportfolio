import { Container } from "@/components/container";
import { CopyrightYear } from "@/components/copyright-year";
import { profile } from "@/content/profile";

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-line py-12">
      <Container className="flex flex-col gap-2">
        <p className="text-sm text-muted">
          {profile.name} — {profile.role}
        </p>
        <p className="font-mono text-xs text-faint">
          © <CopyrightYear />. Built with Next.js and Tailwind CSS.
        </p>
      </Container>
    </footer>
  );
}
