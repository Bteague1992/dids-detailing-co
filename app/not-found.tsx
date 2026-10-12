import { Logo } from "@/components/site/logo";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";

export default function NotFound() {
  return (
    <section className="bg-white py-12 md:py-16">
      <Container width="3xl" className="text-center">
        <Logo
          variant="shield"
          decorative
          priority
          sizes="240px"
          className="mx-auto h-52 md:h-60"
        />
        <h1 className="mt-6 text-[2rem] font-extrabold sm:text-4xl lg:text-5xl">
          Well, this page got lost under the seat.
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-lg text-muted-text">
          We looked. Found two fries and a crayon, but not this page. Let&apos;s
          get you somewhere useful.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <ButtonLink href="/">Back to home</ButtonLink>
          <ButtonLink href="/packages" variant="secondary">
            See packages
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}
