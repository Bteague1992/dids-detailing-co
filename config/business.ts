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
        "Hickory is our home base. We know the area well and offer fast scheduling for cars, trucks, SUVs, and motorcycles — straight to your driveway or workplace.",
    },
    {
      slug: "conover",
      name: "Conover",
      description:
        "Professional mobile detailing in Conover, NC. We come to your home or office — no drop-off needed. Quality service at a fair price.",
    },
    {
      slug: "newton",
      name: "Newton",
      description:
        "Serving Newton, NC with convenient mobile car detailing. Whether you're at home or at work, we come to you and get your vehicle looking its best.",
    },
    {
      slug: "long-view",
      name: "Long View",
      description:
        "Mobile car detailing available in Long View, NC. We bring the equipment to your location and handle everything — exterior wash, interior clean, or a full detail.",
    },
    {
      slug: "granite-falls",
      name: "Granite Falls",
      description:
        "Professional mobile car detailing serving Granite Falls, NC. We travel to you with all the supplies needed for a thorough exterior wash or full detail.",
    },
    {
      slug: "morganton",
      name: "Morganton",
      description:
        "Serving Morganton, NC with mobile car and motorcycle detailing. We come to your home or workplace in Burke County — no drop-off, no hassle, honest pricing.",
    },
    {
      slug: "valdese",
      name: "Valdese",
      description:
        "Mobile car detailing in Valdese, NC. We travel to your location with everything needed to clean and detail your vehicle inside and out.",
    },
    {
      slug: "lenoir",
      name: "Lenoir",
      description:
        "Serving Lenoir, NC with mobile car and motorcycle detailing. We come to you in Caldwell County — convenient scheduling, fair pricing, quality results.",
    },
  ] as ServiceCity[],
} as const;
