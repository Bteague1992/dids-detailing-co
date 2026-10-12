// Real Google reviews, word for word. Never edit the wording — only add
// reviews exactly as they appear on Google.
//
// `town` is optional: fill it in if you know where the customer lives and it
// shows next to their name.
// `featured` reviews are the ones shown on the homepage.

export interface Review {
  quote: string;
  firstName: string;
  town?: string;
  featured?: boolean;
}

const reviews: Review[] = [
  {
    quote:
      "Couldn’t say enough kind words about Brandon. He takes his time and pays the most attention to detail! Couldn’t recommend enough! Will be a regular!",
    firstName: "Tiffany",
    featured: true,
  },
  {
    quote:
      "Brandon not only did an outstanding job but he was punctual, professional and courteous. If I could I would rate him higher than 5 stars. You won’t be disappointed.",
    firstName: "Glenn",
    featured: true,
  },
  {
    quote:
      "Brandon does excellent work and has a great attention to detail. The convenience of coming to me and the competitive pricing keeps me a repeat customer!",
    firstName: "Brenna",
    featured: true,
  },
  {
    quote: "Awesome to work with. Very thorough work and great price",
    firstName: "Nick",
  },
  {
    quote: "Great service, great communication, detailed and timely. 10/10.",
    firstName: "Dylan",
  },
  {
    quote:
      "Attention to detail. And be prompt was my experience with Brandon. Highly recommend!!",
    firstName: "Travis",
  },
  {
    quote: "Great job. Good communication. Quick service.",
    firstName: "Kris",
  },
  {
    quote: "Great guy great work and detailed.",
    firstName: "Lee",
  },
  {
    quote: "Reliable quality work",
    firstName: "Brad",
  },
];

/** Up to `count` reviews for a page, featured ones first. */
export function getReviews(count = 3): Review[] {
  return [...reviews]
    .sort((a, b) => Number(b.featured ?? false) - Number(a.featured ?? false))
    .slice(0, count);
}
