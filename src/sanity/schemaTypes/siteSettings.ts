import { defineField, defineType } from "sanity";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site settings",
  type: "document",
  fields: [
    defineField({ name: "churchName", title: "Church name", type: "string", validation: (r) => r.required() }),
    defineField({ name: "tagline", title: "Tagline", type: "string" }),
    defineField({
      name: "description",
      title: "Site description",
      type: "text",
      rows: 3,
      description: "Used in search results and when the site is shared.",
    }),
    defineField({
      name: "address",
      title: "Address",
      type: "object",
      fields: [
        defineField({ name: "street", title: "Street", type: "string" }),
        defineField({ name: "locality", title: "Town or village", type: "string" }),
        defineField({ name: "region", title: "County or region", type: "string" }),
        defineField({ name: "postcode", title: "Postcode", type: "string" }),
      ],
    }),
    defineField({ name: "phone", title: "Telephone", type: "string" }),
    defineField({ name: "email", title: "Email", type: "string" }),
    defineField({
      name: "givingUrl",
      title: "Giving link",
      type: "url",
      description: "Where the “Give” button should send people.",
    }),
    defineField({
      name: "social",
      title: "Social links",
      type: "object",
      fields: [
        defineField({ name: "facebook", title: "Facebook", type: "url" }),
        defineField({ name: "instagram", title: "Instagram", type: "url" }),
      ],
    }),
    defineField({ name: "seo", title: "Default SEO", type: "seo" }),
  ],
  preview: {
    select: { title: "churchName", subtitle: "tagline" },
  },
});
