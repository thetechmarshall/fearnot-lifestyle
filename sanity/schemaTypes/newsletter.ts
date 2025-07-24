import { defineField, defineType } from "sanity";

const newsletterSchema = defineType({
  name: "newsletter",
  title: "Newsletter Subscriptions",
  type: "document",
  fields: [
    defineField({
      name: "email",
      title: "Email",
      type: "string",
      validation: (Rule) => Rule.required().email(),
    }),
    defineField({
      name: "subscribedAt",
      title: "Subscribed At",
      type: "datetime",
      initialValue: () => new Date().toISOString(),
      readOnly: true,
    }),
  ],
});

export default newsletterSchema;
