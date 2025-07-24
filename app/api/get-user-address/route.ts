import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@sanity/client";

const sanity = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  token: process.env.SANITY_API_TOKEN!,
  apiVersion: "2025-02-19",
  useCdn: false,
});

export async function GET(req: NextRequest) {
  const clerkUserId = req.nextUrl.searchParams.get("clerkUserId");
  const user = await sanity.fetch(
    `*[_type == "user" && clerkUserId == $clerkUserId][0]`,
    { clerkUserId }
  );

  return NextResponse.json({ deliveryAddress: user?.deliveryAddress || "" });
}
