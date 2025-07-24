"use server";

import { client } from "@/sanity/lib/client";
import { revalidatePath } from "next/cache";

export const subscribeToNewsletter = async (email: string) => {
  // Email format validation
  const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  if (!isValidEmail) {
    return { success: false, error: "Invalid email format." };
  }

  try {
    // Checks if email already exists
    const existing = await client.fetch(
      `*[_type == "newsletter" && email == $email][0]`,
      { email }
    );

    if (existing) {
      return { success: false, error: "Email is already subscribed." };
    }

    // Save new subscription
    const result = await client.create({
      _type: "newsletter",
      email,
      subscribedAt: new Date().toISOString(),
    });

    revalidatePath("/"); // optional
    return { success: true, result };
  } catch (error) {
    console.error("Newsletter subscription error:", error);
    return { success: false, error: "Subscription failed. Try again later." };
  }
};
