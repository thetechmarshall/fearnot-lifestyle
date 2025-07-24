import { TagIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const categoryType = defineType({
  name: "category",
  title: "Category",
  type: "document",
  icon: TagIcon,
  fields: [
    defineField({
      name: "title",
      type: "string",
    }),
    defineField({
      name: "slug",
      type: "slug",
      options: {
        source: "title",
      },
    }),
    defineField({
      name: "description",
      type: "text",
    }),
    defineField({
      name: "image",
      title: "category",
      type: "image",
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: "sortOrder",
      title: "Sort Order",
      type: "number",
      description:
        "Controls the display order of categories (lower numbers come first)",
      initialValue: 0,
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "description",
      media: "image",
    },
  },
});
