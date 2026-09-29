import { defineField, defineType } from "sanity";

export const serviceTime = defineType({
  name: "serviceTime",
  title: "Service time",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Service name", type: "string", validation: (r) => r.required() }),
    defineField({
      name: "pattern",
      title: "When (pattern)",
      type: "string",
      description: "For example: “1st, 2nd & 3rd Sundays”",
      validation: (r) => r.required(),
    }),
    defineField({ name: "time", title: "Time", type: "string", description: "For example: 10:30am" }),
    defineField({ name: "description", title: "Description", type: "text", rows: 3 }),
    defineField({
      name: "order",
      title: "Order",
      type: "number",
      description: "Lower numbers appear first.",
      initialValue: 1,
    }),
  ],
  orderings: [{ title: "Order", name: "order", by: [{ field: "order", direction: "asc" }] }],
  preview: { select: { title: "title", subtitle: "pattern" } },
});
