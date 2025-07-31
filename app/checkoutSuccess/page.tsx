import React, { Suspense } from "react";
import CheckoutSuccessClient from "@/components/CheckoutSuccessClient";
import { Loader2 } from "lucide-react";

// This is a simple fallback component
const LoadingFallback = () => (
  <div className="min-h-[60vh] flex flex-col items-center justify-center">
    <Loader2 className="animate-spin w-10 h-10" />
  </div>
);

export default function CheckoutSuccessPage() {
  return (
    // THE FIX: Wrap the client component in a Suspense boundary
    <Suspense fallback={<LoadingFallback />}>
      <CheckoutSuccessClient />
    </Suspense>
  );
}