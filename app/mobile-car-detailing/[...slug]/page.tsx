import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowRight, Caravan, Motorbike, Repeat } from "lucide-react";
import { PageHero } from "@/components/site/page-hero";
import { TrustBar } from "@/components/site/trust-bar";
import { CarPackages } from "@/components/site/package-card";
import { HowItWorks } from "@/components/site/how-it-works";
import { Reviews } from "@/components/site/reviews";
import { FaqAccordion } from "@/components/site/faq-accordion";
import { NearbyAreas } from "@/components/site/brand-blocks";
import { FAQSchema } from "@/components/seo/faq-schema";
import { Section } from "@/components/ui/section";
import { businessConfig, getCity } from "@/config/business";
import {
  bikeWash,
  dadsClubFromPrice,
  formatPrice,
  rvFromRate,
  startingCarPrice,
} from "@/config/services";
import { siteConfig } from "@/config/site";
import {
  carCityIntros,
  cityHubIntros,
  dadsClubCityIntros,
  motoCityIntros,
  rvCityIntros,
  WATER_POWER_ANSWER,
} from "@/lib/city-content";
import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/metadata";

export async function generateStaticParams() {
  return businessConfig.serviceAreaCities.map((city) => ({
    slug: [city.slug, "nc"],
  }));
}

function resolveCity(slug: string[]) {
  return slug.length === 2 && slug[1] === "nc" ? getCity(slug[0]) : undefined;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const city = resolveCity(slug);

  if (!city) {
    return {
      title: "City Not Found",
      robots: { index: false, follow: false },
    };
  }

  // SEO note: self-canonical, deliberately not pointed at "/". This page
  // targets local queries ("mobile detailing in {city}") and carries its own
  // town-specific intro, FAQ schema, and cross-city links — see the matching
  // note in app/page.tsx.
  return createPageMetadata({
    title: `Mobile Car Detailing in ${city.name}, NC | We Come to You | ${siteConfig.title}`,
    description: `Mobile car detailing in ${city.name}, NC. We come to your driveway or work and clean it right there. Cars, trucks & SUVs from $${startingCarPrice}, plus motorcycles, RVs, and Dad's Club. Text Dad to book.`,
    canonical: `/mobile-car-detailing/${city.slug}/nc`,
  });
}

function getFaqs(cityName: string) {
  return [
    {
      question: `Do you come to me in ${cityName}?`,
      answer: `Yep. We bring everything to your home or work in ${cityName} and clean the vehicle right where it's parked. No drop-off, no waiting room.`,
    },
    {
      question: "How do I book?",
      answer:
        "Text us what you drive, which package you're thinking about, and where you are. We'll find a time that works.",
    },
    {
      question: "What if I'm not sure which package I need?",
      answer:
        "Totally normal. Text us a couple of photos and tell us what's bugging you. We'll point you to the right package and give you the price before we start.",
    },
    {
      question: "Do you bring your own water and power?",
      answer: WATER_POWER_ANSWER,
    },
  ];
}

export default async function CarCityPage({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  const { slug } = await params;
  const city = resolveCity(slug);

  if (!city) {
    notFound();
  }

  const faqs = getFaqs(city.name);

  // One short section per other service, each with this town's own paragraph
  // and a link to that service's main page.
  const otherServices = [
    {
      icon: Motorbike,
      title: `Motorcycle detailing in ${city.name}`,
      text: motoCityIntros[city.slug],
      price: `From ${formatPrice(bikeWash.price)}`,
      href: "/motorcycle-detailing",
      link: "See motorcycle detailing",
    },
    {
      icon: Caravan,
      title: `RV & camper detailing in ${city.name}`,
      text: rvCityIntros[city.slug],
      price: `From ${formatPrice(rvFromRate)}/ft`,
      href: "/rv-detailing",
      link: "See RV & camper detailing",
    },
    {
      icon: Repeat,
      title: `Dad's Club in ${city.name}`,
      text: dadsClubCityIntros[city.slug],
      price: `From ${formatPrice(dadsClubFromPrice)} a visit`,
      href: "/dads-club",
      link: "See Dad's Club",
    },
  ];

  return (
    <>
      <FAQSchema faqs={faqs} pagePath={`/mobile-car-detailing/${city.slug}/nc`} />
      <PageHero
        location="car-city-hero"
        city={city.name}
        title={`Mobile detailing in ${city.name}, NC`}
        sub={city.description}
      />

      <TrustBar />

      <Section tone="white" width="3xl" title={`Life gets messy in ${city.name}, too`}>
        <p className="text-center text-lg">{carCityIntros[city.slug]}</p>
        <p className="mt-4 text-center text-lg">{cityHubIntros[city.slug]}</p>
      </Section>

      <Section
        id="packages"
        tone="warm"
        title="Simple packages. Honest prices."
        subtitle="Pick your vehicle size to see your price."
      >
        <CarPackages city={city.name} />
      </Section>

      <Section
        id="more-services"
        tone="white"
        title={`More we do in ${city.name}`}
        subtitle="Bikes, campers, and regular visits. Same deal: we come to you."
      >
        <div className="grid gap-5 lg:grid-cols-3">
          {otherServices.map(({ icon: Icon, title, text, price, href, link }) => (
            <section
              key={href}
              className="flex flex-col rounded-card bg-white p-6 shadow-card ring-1 ring-line"
            >
              <Icon
                aria-hidden="true"
                strokeWidth={1.75}
                className="h-9 w-9 text-orange"
              />
              <h3 className="mt-3 text-xl">{title}</h3>
              <p className="mt-2 grow text-muted-text">{text}</p>
              <p className="mt-3 font-heading text-lg font-extrabold text-orange-dark">
                {price}
              </p>
              <Link
                href={href}
                className="mt-2 inline-flex items-center gap-1.5 font-semibold underline decoration-orange decoration-2 underline-offset-4 hover:text-orange-dark"
              >
                {link}
                <ArrowRight aria-hidden="true" className="h-4 w-4" />
              </Link>
            </section>
          ))}
        </div>
      </Section>

      <HowItWorks tone="warm" />

      <Reviews tone="white" />

      <Section id="faq" tone="warm" title={`${city.name} questions`} width="3xl">
        <FaqAccordion faqs={faqs} />
      </Section>

      <Section tone="white">
        <NearbyAreas
          currentSlug={city.slug}
          hrefFor={(citySlug) => `/mobile-car-detailing/${citySlug}/nc`}
        />
      </Section>
    </>
  );
}
