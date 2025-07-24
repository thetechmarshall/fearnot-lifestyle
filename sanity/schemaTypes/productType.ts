import { TrolleyIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const productType = defineType({
  name: "product",
  title: "Product",
  type: "document",
  icon: TrolleyIcon,
  fields: [
    defineField({
      name: "name",
      title: "Product Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "name",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "images",
      title: "Product Images",
      type: "array",
      of: [{ type: "image", options: { hotspot: true } }],
    }),
    defineField({
      name: "intro",
      title: "Product Intro",
      type: "string",
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "string",
    }),
    defineField({
      name: "price",
      title: "Product price",
      type: "number",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "discount",
      title: "Discount percentage",
      type: "number",
    }),
    defineField({
      name: "categories",
      title: "Categories",
      type: "array",
      of: [{ type: "reference", to: { type: "category" } }],
    }),
    defineField({
      name: "stock",
      title: "Stock",
      type: "number",
      validation: (Rule) => Rule.min(0),
    }),
    defineField({
      name: "status",
      title: "Product status",
      type: "string",
      options: {
        list: [
          { title: "New", value: "new" },
          { title: "Hot", value: "hot" },
          { title: "Sale", value: "sale" },
        ],
      },
    }),
    defineField({
      name: "variant",
      title: "Product type",
      type: "string",
      options: {
        list: [
          { title: "Tshirt", value: "tshirt" },
          { title: "Pants", value: "pants" },
          { title: "Shorts", value: "shorts" },
          { title: "Hoodie", value: "hoodie" },
          { title: "Others", value: "others" },
        ],
      },
    }),
    defineField({
      name: "variations",
      title: "Product Variations (Sizes)",
      type: "array",
      of: [
        defineField({
          name: "variation",
          title: "Variation",
          type: "object",
          fields: [
            {
              name: "name",
              title: "Size",
              type: "string",
              options: {
                list: [
                  { title: "S", value: "S" },
                  { title: "M", value: "M" },
                  { title: "L", value: "L" },
                  { title: "XL", value: "XL" },
                  { title: "XXL", value: "XXL" },
                  { title: "XXXL", value: "XXXL" },
                ],
              },
              validation: (Rule) => Rule.required(),
            },
            {
              name: "details",
              title: "Additional Details",
              type: "string",
              description: "Optional - You can provide size guide or notes",
            },
          ],
        }),
      ],
    }),
  ],

  preview: {
    select: {
      title: "name",
      media: "images",
      subtitle: "price",
    },
    prepare(selection) {
      const { title, subtitle, media } = selection;
      const image = media && media[0];
      return {
        title: title,
        subtitle: `₦${subtitle}`,
        media: image,
      };
    },
  },
});
