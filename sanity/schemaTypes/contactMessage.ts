import { defineType, defineField } from "sanity";

const ContactShema = defineType({
  name: "contactMessage",
  title: "Contact-Us Messages",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Full Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "email",
      title: "Email",
      type: "string",
      validation: (Rule) => Rule.required().email(),
    }),
    defineField({
      name: "subject",
      title: "Subject",
      type: "string",
    }),
    defineField({
      name: "message",
      title: "Message",
      type: "text",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "createdAt",
      title: "Created At",
      type: "datetime",
      initialValue: () => new Date().toISOString(),
    }),
  ],

  preview: {
    select: {
      title: "name",
      subtitle: "email",
    },
    prepare(selection) {
      const { title, subtitle } = selection;
      return {
        title: `Name: ${title}`,
        subtitle: `Email: ${subtitle}`,
      };
    },
  },
});
export default ContactShema;
