import { CommentIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const reviewType = defineType({
  name: "review",
  title: "Product Review",
  type: "document",
  icon: CommentIcon,
  fields: [
    defineField({
      name: "product",
      title: "Product",
      type: "reference",
      to: [{ type: "product" }],
    }),
    defineField({
      name: "name",
      title: "Reviewer Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "rating",
      title: "Rating (1-5)",
      type: "number",
      validation: Rule => Rule.required().min(1).max(5),
    }),
    defineField({
      name: "comment",
      title: "Comment",
      type: "text",
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: "date",
      title: "Review Date",
      type: "datetime",
      initialValue: () => new Date().toISOString(),
    }),
  ],
});
