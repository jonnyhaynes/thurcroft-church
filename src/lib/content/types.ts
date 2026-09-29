export type Block =
  | { _type: "paragraph"; text: string }
  | { _type: "heading"; text: string }
  | { _type: "list"; style: "bullet" | "number"; items: string[] }
  | { _type: "image"; src: string; alt: string; caption?: string }
  | { _type: "quote"; text: string; attribution?: string };

export interface Seo {
  title?: string;
  description?: string;
}

export interface ContentPage {
  slug: string;
  title: string;
  eyebrow?: string;
  intro?: string;
  body: Block[];
  seo?: Seo;
}

export interface ServiceTime {
  id: string;
  title: string;
  pattern: string;
  time: string;
  description: string;
  order: number;
}

export interface WeeklyActivity {
  id: string;
  name: string;
  when: string;
  description: string;
}

export interface FacilityGroup {
  heading: string;
  items: string[];
}

export interface ImageRef {
  src: string;
  alt: string;
  caption?: string;
}

export interface ChurchEvent {
  slug: string;
  title: string;
  summary: string;
  body: Block[];
  recurring: { day: string; time: string };
  venue: string;
  tags: string[];
  image?: ImageRef;
  featured?: boolean;
}

export interface NewsPost {
  slug: string;
  title: string;
  date?: string;
  excerpt: string;
  body: Block[];
  coverImage?: ImageRef;
}
