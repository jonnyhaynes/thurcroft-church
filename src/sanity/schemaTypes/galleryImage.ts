import { defineField, defineType } from "sanity";

export const galleryImage = defineType({
  name: "galleryImage",
  title: "Gallery photo",
  type: "document",
  fields: [
    defineField({
      name: "image",
      title: "Photo",
      type: "image",
      options: { hotspot: true },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "alt",
      title: "Alternative text",
      type: "string",
      description: "Describe the photo for people who cannot see it. Required for accessibility.",
      validation: (rule) => rule.required().error("Alternative text is required."),
    }),
    defineField({ name: "caption", title: "Caption", type: "string" }),
    defineField({ name: "order", title: "Order", type: "number", initialValue: 1 }),
  ],
  orderings: [{ title: "Order", name: "order", by: [{ field: "order", direction: "asc" }] }],
  preview: { select: { title: "alt", subtitle: "caption", media: "image" } },
});
