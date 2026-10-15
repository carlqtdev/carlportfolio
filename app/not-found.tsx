import { ButtonLink } from "@/components/button";
import { Container } from "@/components/container";
import { ArrowLeftIcon } from "@/components/icons";

export default function NotFound() {
  return (
    <Container className="flex min-h-[60vh] flex-col justify-center py-24">
      <p className="font-mono text-xs tracking-[0.14em] text-accent uppercase">
        404
      </p>
      <h1 className="mt-4 text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
        That page doesn&apos;t exist
      </h1>
      <p className="mt-3 max-w-md text-[0.9375rem] leading-7 text-muted">
        The link may be out of date, or the page may have been moved.
      </p>
      <div className="mt-8">
        <ButtonLink href="/">
          <ArrowLeftIcon className="h-4 w-4" />
          Back home
        </ButtonLink>
      </div>
    </Container>
  );
}
