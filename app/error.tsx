"use client";

import { Logo } from "@/components/site/logo";
import { Button, ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";

export default function Error({ reset }: { error: Error; reset: () => void }) {
  return (
    <section className="bg-white py-12 md:py-16">
      <Container width="3xl" className="text-center">
        <Logo
          variant="shield"
          decorative
          sizes="240px"
          className="mx-auto h-52 md:h-60"
        />
        <h1 className="mt-6 text-[2rem] font-extrabold sm:text-4xl lg:text-5xl">
          Well, that made a mess.
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-lg text-muted-text">
          Something went wrong on our end. Give it another try, or head back
          home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Button onClick={reset}>Try again</Button>
          <ButtonLink href="/" variant="secondary">
            Back to home
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}
