import { auth } from "@clerk/nextjs/server";
import { getMyOrders } from "@/sanity/helpers/queries";
import { NextResponse } from "next/server";

export async function GET() {
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ orders: [] });

  const orders = await getMyOrders(userId);

  return NextResponse.json({ count: orders?.length || 0 });
}
