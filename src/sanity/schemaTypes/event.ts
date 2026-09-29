import { defineField, defineType } from "sanity";

export const churchEvent = defineType({
  name: "event",
  title: "Event",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Title", type: "string", validation: (r) => r.required() }),
    defineField({
      name: "slug",
      title: "Web address",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (r) => r.required(),
    }),
    defineField({ name: "summary", title: "Summary", type: "text", rows: 2 }),
    defineField({ name: "body", title: "Details", type: "blockContent" }),
    defineField({
      name: "recurring",
      title: "When it happens",
      type: "object",
      fields: [
        defineField({ name: "day", title: "Day", type: "string", description: "For example: Every Thursday" }),
        defineField({ name: "time", title: "Time", type: "string" }),
      ],
    }),
    defineField({ name: "venue", title: "Venue", type: "string" }),
    defineField({
      name: "tags",
      title: "Tags",
      type: "array",
      of: [{ type: "string" }],
      options: { layout: "tags" },
    }),
    defineField({
      name: "image",
      title: "Image",
      type: "image",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          title: "Alternative text",
          type: "string",
          validation: (r) => r.required().error("Alternative text is required."),
        }),
      ],
    }),
    defineField({ name: "featured", title: "Feature on the home page", type: "boolean", initialValue: false }),
  ],
  orderings: [{ title: "Title", name: "title", by: [{ field: "title", direction: "asc" }] }],
  preview: { select: { title: "title", subtitle: "recurring.day", media: "image" } },
});
