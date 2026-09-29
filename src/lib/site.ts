export const site = {
  name: "St Simon and St Jude",
  shortName: "St Simon & St Jude",
  tagline: "Thurcroft Parish Church",
  description:
    "St Simon and St Jude, Thurcroft's Parish Church — at the heart of the community it serves. A warm, inclusive, family-friendly church in Rotherham. Everyone is welcome.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  address: {
    street: "Church Street",
    locality: "Thurcroft",
    region: "Rotherham",
    postcode: "S66 9LH",
    country: "GB",
  },
  geo: { lat: 53.394308, lng: -1.255124 },
  directionsUrl: "https://www.google.com/maps/dir//53.394308,+-1.255124",
  mapEmbedUrl:
    "https://www.openstreetmap.org/export/embed.html?bbox=-1.260124%2C53.391308%2C-1.250124%2C53.397308&layer=mapnik&marker=53.394308%2C-1.255124",
  phone: "01909 318059",
  phoneHref: "tel:+441909318059",
  // TODO: supply the parish email address before launch.
  email: null as string | null,
  givingUrl: "https://pay.sumup.io/b2c/Q618SYSP",
  social: {
    facebook: "https://www.facebook.com/SaintSimonandSaintJude",
    instagram: "https://instagram.com/st_simon_and_st_jude_thurcroft",
  },
  missionArea: "St Leonard's Church, Dinnington",
  welcome:
    "We are a family-friendly church with an area for children to sit and do activities while our service takes place. We are welcoming and helpful if this is your first visit to our church.",
} as const;

export type NavItem = { label: string; href: string };

export const primaryNav: NavItem[] = [
  { label: "Services", href: "/services" },
  { label: "What's on", href: "/events" },
  { label: "News", href: "/news" },
  { label: "About", href: "/about" },
  { label: "Gallery", href: "/gallery" },
  { label: "Contact", href: "/contact" },
];

export const footerNav: { heading: string; items: NavItem[] }[] = [
  {
    heading: "Visit",
    items: [
      { label: "Services & times", href: "/services" },
      { label: "What's on", href: "/events" },
      { label: "Find us", href: "/contact" },
      { label: "Gallery", href: "/gallery" },
    ],
  },
  {
    heading: "Life events",
    items: [
      { label: "Weddings", href: "/weddings" },
      { label: "Baptisms", href: "/baptisms" },
      { label: "Memorial book", href: "/memorial-book" },
    ],
  },
  {
    heading: "About",
    items: [
      { label: "Our story", href: "/about" },
      { label: "Parish priests", href: "/parish-priests" },
      { label: "News", href: "/news" },
      { label: "Support us", href: "/give" },
    ],
  },
  {
    heading: "Information",
    items: [
      { label: "Safeguarding", href: "/safeguarding" },
      { label: "Accessibility", href: "/accessibility" },
      { label: "Privacy", href: "/privacy" },
    ],
  },
];
