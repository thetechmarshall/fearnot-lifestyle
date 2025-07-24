import { defineField, defineType } from "sanity";

const userSchema = defineType({
  name: "user",
  title: "Users",
  type: "document",
  fields: [
    defineField({
      name: "clerkUserId",
      type: "string",
      title: "Clerk User ID",
    }),
    defineField({
      name: "email",
      type: "string",
      title: "Email",
    }),
    defineField({
      name: "fullName",
      type: "string",
      title: "Full Name",
    }),
    defineField({
      name: "deliveryAddress",
      type: "string",
      title: "Delivery Address",
    }),
  ],

  preview: {
    select: {
      title: "fullName",
      subtitle: "clerkUserId",
    },
    prepare(selection) {
      const { title, subtitle } = selection;
      return {
        title: `Name: ${title}`,
        subtitle: `Clerk User ID: ${subtitle}`,
      };
    },
  },
});

export default userSchema;
