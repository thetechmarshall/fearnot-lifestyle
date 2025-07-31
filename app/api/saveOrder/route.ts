import { NextResponse } from "next/server";
import { createClient } from "@sanity/client";

const sanity = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  token: process.env.SANITY_API_TOKEN!,
  apiVersion: "2025-02-19",
  useCdn: false,
});

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const order = await sanity.create({
      _type: "order",
      ...body,
    });

    return NextResponse.json({ success: true, order });

  } catch (error) {
    console.error("Error creating order:", error);

    // THE FIX: Return only a single NextResponse object.
    return NextResponse.json(
      { success: false, error: "Failed to save order" },
      { status: 500 }
    );
  }
}