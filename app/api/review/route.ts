import { NextRequest, NextResponse } from "next/server";
import { client } from "@/sanity/lib/client";

export async function POST(req: NextRequest) {
  const { productId, name, rating, comment } = await req.json();

  if (!productId || name == null || rating == null || comment == null) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  try {
    await client.create({
      _type: "review",
      product: { _type: "reference", _ref: productId },
      name,
      rating,
      comment,
      date: new Date().toISOString(),
    });

    return NextResponse.json(
      { message: "Review submitted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error submitting review:", error);
    return NextResponse.json(
      { error: "Error submitting review. Please try again." },
      { status: 500 }
    );
  }
}
