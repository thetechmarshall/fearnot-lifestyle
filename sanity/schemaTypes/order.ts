import { defineField, defineType } from "sanity";

const orderSchema = defineType({
  name: "order",
  title: "Orders",
  type: "document",
  fields: [
    defineField({ name: "orderId", type: "string", title: "Order ID" }),
    defineField({
      name: "customerName",
      type: "string",
      title: "Customer Name",
    }),
    defineField({
      name: "customerEmail",
      type: "string",
      title: "Customer Email",
    }),
    defineField({
      name: "clerkUserId",
      type: "string",
      title: "Clerk User ID",
    }),
    defineField({
      name: "deliveryAddress",
      type: "string",
      title: "Delivery Address",
    }),
    defineField({
      name: "subtotalAmount",
      type: "number",
      title: "Subtotal Amount (Naira)",
    }),
    defineField({
      name: "totalAmount",
      type: "number",
      title: "Total Amount (Naira)",
    }),
    defineField({
      name: "discountAmount",
      title: "Discount Amount (in Naira)",
      type: "number",
    }),
    defineField({
      name: "shippingFee",
      title: "Shipping Fee (in Naira)",
      type: "number",
    }),
    defineField({
      name: "items",
      title: "Items",
      type: "array",
      of: [
        {
          type: "object",
          name: "cartItem",
          fields: [
            { name: "image", type: "image", title: "Product Image" },
            { name: "name", type: "string", title: "Product Name" },
            { name: "variant", type: "string", title: "Variant" },
            { name: "size", type: "string", title: "Size" },
            { name: "quantity", type: "number", title: "Quantity" },
            { name: "price", type: "number", title: "Price (per unit)" },
          ],
        },
      ],
    }),
    defineField({
      name: "paid",
      type: "boolean",
      title: "Paid",
      initialValue: false,
    }),
    defineField({
      name: "status",
      title: "Order Status",
      type: "string",
      options: {
        list: [
          { title: "Pending", value: "pending" },
          { title: "Processing", value: "processing" },
          { title: "Shipped", value: "shipped" },
          { title: "Delivered", value: "delivered" },
          { title: "Cancelled", value: "cancelled" },
        ],
      },
      initialValue: "pending",
    }),
    defineField({
      name: "createdAt",
      type: "datetime",
      title: "Created At",
      initialValue: () => new Date().toISOString(),
      readOnly: true,
    }),
  ],

  preview: {
    select: {
      title: "orderId",
      subtitle: "customerName",
    },
    prepare(selection) {
      const { title, subtitle } = selection;
      return {
        title: `Order ID: ${title}`,
        subtitle: `Customer: ${subtitle}`,
      };
    },
  },
});

export default orderSchema;
