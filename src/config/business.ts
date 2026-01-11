export interface ServiceCity {
  slug: string;
  name: string;
  description: string;
}

export const businessConfig = {
  address: {
    city: "Hickory",
    state: "NC",
    region: "Hickory, NC",
  },
  serviceAreaCities: [
    {
      slug: "hickory",
      name: "Hickory",
      description:
        "Serving Hickory with convenient mobile car detailing. We come to your home or workplace.",
    },
    {
      slug: "conover",
      name: "Conover",
      description:
        "Professional mobile detailing in Conover. Quality service at your location.",
    },
    {
      slug: "newton",
      name: "Newton",
      description:
        "Mobile car detailing in Newton. We bring the service to you.",
    },
    {
      slug: "long-view",
      name: "Long View",
      description:
        "Convenient mobile detailing in Long View. Schedule your detail today.",
    },
    {
      slug: "granite-falls",
      name: "Granite Falls",
      description:
        "Professional mobile car detailing serving Granite Falls and surrounding areas.",
    },
    {
      slug: "morganton",
      name: "Morganton",
      description:
        "Mobile detailing in Morganton. Quality service, fair pricing.",
    },
    {
      slug: "valdese",
      name: "Valdese",
      description:
        "Serving Valdese with professional mobile car detailing services.",
    },
    {
      slug: "lenoir",
      name: "Lenoir",
      description:
        "Mobile car detailing in Lenoir. We come to you for your convenience.",
    },
  ] as ServiceCity[],
} as const;
