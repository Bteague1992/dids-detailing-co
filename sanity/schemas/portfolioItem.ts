// Sanity schema definition for the `portfolioItem` document type, used by the
// before/after portfolio grid at app/portfolio/page.tsx.
//
// This repo does not embed Sanity Studio — this file is the read-side contract
// only. To make this schema active, add it to a Studio's schema.ts (or run
// `sanity init` / `sanity deploy` in a Studio project pointed at the same
// project ID/dataset from NEXT_PUBLIC_SANITY_PROJECT_ID / NEXT_PUBLIC_SANITY_DATASET)
// and deploy it — that step is out of scope here.

// Stored values for the Service Category field. These are data labels, not
// page URLs — keep them unchanged so existing portfolio items stay valid.
const serviceCategoryOptions = [
  "car-detailing",
  "motorcycle-detailing",
  "camper-rv-detailing",
  "maintenance-plans",
];

export const portfolioItemSchema = {
  name: "portfolioItem",
  title: "Portfolio Item",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule: { required: () => unknown }) => Rule.required(),
    },
    {
      name: "serviceCategory",
      title: "Service Category",
      type: "string",
      description: "One of the service category values listed below",
      options: {
        list: serviceCategoryOptions,
      },
      validation: (Rule: { required: () => unknown }) => Rule.required(),
    },
    {
      name: "location",
      title: "City / Location",
      type: "string",
    },
    {
      name: "beforeImage",
      title: "Before Image",
      type: "image",
      options: { hotspot: true },
      validation: (Rule: { required: () => unknown }) => Rule.required(),
    },
    {
      name: "afterImage",
      title: "After Image",
      type: "image",
      options: { hotspot: true },
      validation: (Rule: { required: () => unknown }) => Rule.required(),
    },
    {
      name: "description",
      title: "Description",
      type: "text",
      rows: 3,
    },
    {
      name: "date",
      title: "Date",
      type: "date",
    },
  ],
  orderings: [
    {
      title: "Newest first",
      name: "dateDesc",
      by: [{ field: "date", direction: "desc" }],
    },
  ],
};
