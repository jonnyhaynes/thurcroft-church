import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

export default function NotFound() {
  return (
    <Container className="py-24 text-center">
      <p className="text-sm font-semibold uppercase tracking-[0.16em] text-gold">Page not found</p>
      <h1 className="mt-4 font-serif text-4xl text-ink sm:text-5xl">
        Sorry, we could not find that page.
      </h1>
      <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-ink-soft">
        The page may have moved or no longer exists. You could try one of these instead:
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <ButtonLink href="/">Home</ButtonLink>
        <ButtonLink href="/services" variant="secondary">
          Service times
        </ButtonLink>
        <ButtonLink href="/contact" variant="secondary">
          Contact us
        </ButtonLink>
      </div>
    </Container>
  );
}
