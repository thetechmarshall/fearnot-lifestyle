"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Loader2, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import useCartStore from "@/store";

const CheckoutSuccessPage = () => {
  const searchParams = useSearchParams();
  const reference = searchParams.get("reference") || searchParams.get("trxref");
  const [status, setStatus] = useState<"loading" | "success" | "failed">(
    "loading"
  );

  const { resetCart } = useCartStore();

  useEffect(() => {
    const verify = async () => {
      if (!reference) return setStatus("failed");

      const res = await fetch("/api/verifyTransaction", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ reference }),
      });

      const data = await res.json();
      console.log("Verification result:", data);

      if (data?.success) {
        console.log("Transaction verified. Resetting cart...");
        resetCart();
        setStatus("success");
      } else {
        setStatus("failed");
      }
    };

    verify();
  }, [reference, resetCart]);

  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center px-4 text-center">
      {status === "loading" && (
        <>
          <Loader2 className="animate-spin w-10 h-10 mb-4" />
          <p>Verifying your transaction...</p>
        </>
      )}

      {status === "success" && (
        <>
          <CheckCircle2 className="text-green-500 w-14 h-14 mb-4" />
          <h1 className="text-2xl font-bold mb-2">Payment Successful!</h1>
          <p className="mb-6">
            Your order has been confirmed and is being processed.
          </p>
          <Button asChild>
            <Link href="/orders">View your order</Link>
          </Button>
        </>
      )}

      {status === "failed" && (
        <>
          <p className="text-red-500 font-semibold">
            Verification failed or reference missing.
          </p>
          <Button asChild className="mt-4">
            <Link href="/">Return to Home</Link>
          </Button>
        </>
      )}
    </div>
  );
};

export default CheckoutSuccessPage;
