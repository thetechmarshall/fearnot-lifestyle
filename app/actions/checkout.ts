"use server";

import { CartItem } from "@/store";
import { client } from "@/sanity/lib/client";
import { v4 as uuidv4 } from "uuid";

export interface Metadata {
  orderNumber: string;
  customerName: string;
  customerEmail: string;
  clerkUserId: string;
  deliveryAddress: string;
}

const PAYSTACK_SECRET_KEY = process.env.PAYSTACK_SECRET_KEY!;
const CALLBACK_URL = process.env.NEXT_PUBLIC_PAYSTACK_CALLBACK_URL!;

export async function createCheckoutSession(
  cartItems: CartItem[],
  metadata: Metadata,
  shippingFee: number,
  subtotal: number,
  finalTotal: number
): Promise<string | null> {
  const koboAmount = Math.round(finalTotal * 100); // Only for Paystack

  const discount =
    subtotal -
    cartItems.reduce((acc, item) => {
      return acc + (item.product.price ?? 0) * item.quantity;
    }, 0);

  // Save order to Sanity
  await client.create({
    _id: `order-${metadata.orderNumber}`,
    _type: "order",
    orderId: metadata.orderNumber,
    customerName: metadata.customerName,
    customerEmail: metadata.customerEmail,
    clerkUserId: metadata.clerkUserId,
    deliveryAddress: metadata.deliveryAddress,
    subtotalAmount: subtotal, // Save as Naira
    shippingFee: shippingFee, // Save as Naira
    discountAmount: discount, // Save as Naira
    totalAmount: finalTotal, // Save as Naira
    items: cartItems.map((item) => ({
      _key: uuidv4(),
      image: item.product.images?.[0]?.asset?._ref
        ? {
            _type: "image",
            asset: {
              _type: "reference",
              _ref: item.product.images[0]?.asset?._ref, 
            },
          }
        : null,
      name: item.product.name,
      variant: item.product.variant,
      size: item.product.selectedVariation?.name ?? "",
      quantity: item.quantity,
      price: item.product.price,
    })),
    createdAt: new Date().toISOString(),
  });

  // Initialize Paystack Checkout
  const response = await fetch(
    "https://api.paystack.co/transaction/initialize",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: metadata.customerEmail,
        amount: koboAmount,
        reference: metadata.orderNumber,
        callback_url: CALLBACK_URL,
        metadata: {
          orderId: `order-${metadata.orderNumber}`,
          customerName: metadata.customerName,
          customerEmail: metadata.customerEmail,
        },
      }),
    }
  );

  const data = await response.json();

  if (data.status && data.data?.authorization_url) {
    return data.data.authorization_url;
  } else {
    console.error("Paystack init failed:", data);
    return null;
  }
}
