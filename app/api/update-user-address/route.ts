import { NextResponse } from "next/server";
import { createClient } from "@sanity/client";

const sanity = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  token: process.env.SANITY_API_WRITE_TOKEN!,
  apiVersion: "2025-02-19",
  useCdn: false,
});

export async function POST(req: Request) {
  try {
    const { clerkUserId, fullName, email, address } = await req.json();

    console.log("📦 Updating address for:", clerkUserId);

    const existing = await sanity.fetch(
      `*[_type == "user" && clerkUserId == $clerkUserId][0]`,
      { clerkUserId }
    );

    if (existing?._id) {
      const updated = await sanity
        .patch(existing._id)
        .set({ deliveryAddress: address })
        .commit();
      console.log("✅ Updated user address:", updated);
    } else {
      const created = await sanity.create({
        _type: "user",
        clerkUserId,
        fullName,
        email,
        deliveryAddress: address,
      });
      console.log("✅ Created new user with address:", created);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("❌ Error updating address:", error);
    return NextResponse.json(
      { success: false, message: "Failed to update address" },
      { status: 500 }
    );
  }
}
