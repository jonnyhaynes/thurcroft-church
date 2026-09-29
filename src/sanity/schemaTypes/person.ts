import { defineField, defineType } from "sanity";

export const person = defineType({
  name: "person",
  title: "Person",
  type: "document",
  description: "Clergy, churchwardens, safeguarding officers and other named contacts.",
  fields: [
    defineField({ name: "name", title: "Name", type: "string", validation: (r) => r.required() }),
    defineField({ name: "role", title: "Role", type: "string", description: "For example: Priest in Charge" }),
    defineField({ name: "phone", title: "Telephone", type: "string" }),
    defineField({ name: "email", title: "Email", type: "string" }),
    defineField({ name: "order", title: "Order", type: "number", initialValue: 1 }),
  ],
  preview: { select: { title: "name", subtitle: "role" } },
});
