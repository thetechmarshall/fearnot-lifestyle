"use server";

import { client } from "@/sanity/lib/client"; 

export const sendContactMessage = async (formData: FormData) => {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const subject = formData.get("subject") as string;
  const message = formData.get("message") as string;

  if (!name || !email || !subject || !message) {
    return { success: false, error: "Missing required fields" };
  }

  try {
    await client.create({
      _type: "contactMessage",
      name,
      email,
      subject,
      message,
      createdAt: new Date().toISOString(),
    });

    return { success: true };
  } catch (error) {
    console.error("Sanity contact message error:", error);
    return { success: false, error: "Failed to submit message" };
  }
};
