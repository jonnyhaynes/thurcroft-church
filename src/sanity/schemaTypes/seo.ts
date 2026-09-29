import { defineField, defineType } from "sanity";

export const seo = defineType({
  name: "seo",
  title: "Search engine listing",
  type: "object",
  options: { collapsible: true, collapsed: true },
  fields: [
    defineField({
      name: "title",
      title: "Page title",
      type: "string",
      description: "Shown in search results and browser tabs. Keep it under about 60 characters.",
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 3,
      description: "A short summary shown in search results. Around 150 characters works best.",
      validation: (rule) => rule.max(200),
    }),
  ],
});
