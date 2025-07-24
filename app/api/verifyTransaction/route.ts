import { NextResponse } from "next/server";
import { client } from "@/sanity/lib/client";
import { sendConfirmationEmail } from "@/lib/email/sendConfirmationEmail";

export async function POST(req: Request) {
  try {
    console.log("✅ Received POST /api/verifyTransaction");

    const body = await req.json();
    console.log("📦 Request body:", body);

    const { reference } = body;

    if (!reference) {
      console.error("❌ No reference provided.");
      return NextResponse.json(
        { success: false, message: "No reference provided." },
        { status: 400 }
      );
    }

    const res = await fetch(
      `https://api.paystack.co/transaction/verify/${reference}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    const data = await res.json();
    console.log("💳 Paystack response:", data);

    const payment = data.data;
    if (!payment || payment.status !== "success") {
      console.error("❌ Payment not successful.");
      return NextResponse.json({
        success: false,
        message: "Payment not successful",
      });
    }

    const orderDocId = payment.metadata?.orderId;
    console.log("📦 Order ID from metadata:", orderDocId);

    if (!orderDocId) {
      console.error("❌ No orderId found in metadata.");
      return NextResponse.json(
        { success: false, message: "No orderId in metadata" },
        { status: 400 }
      );
    }

    // 📝 Mark order as paid in Sanity
    try {
      const patchResult = await client
        .patch(orderDocId)
        .set({ paid: true })
        .set({status: "pending"})
        .commit();
      console.log("✅ Sanity patch result:", patchResult);
    } catch (err) {
      console.error("🔥 Error patching Sanity order:", err);
    }

    // 📧 Send confirmation email
    try {
      await sendConfirmationEmail({
        to: payment.customer.email,
        name: payment.metadata.customerName,
        orderId: orderDocId,
      });
      console.log("📨 Confirmation email sent to:", payment.customer.email);
    } catch (err) {
      console.error("❌ Failed to send confirmation email:", err);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("🔥 Error verifying transaction:", error);
    return NextResponse.json(
      { success: false, message: "Verification failed" },
      { status: 500 }
    );
  }
}
