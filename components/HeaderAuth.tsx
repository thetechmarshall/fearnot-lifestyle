"use client";

import { useAuth, useUser } from "@clerk/nextjs";
import { SignInButton, ClerkLoaded, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { ListOrdered } from "lucide-react";
import { useState, useEffect } from "react";

export default function HeaderAuth() {
  const { user, isLoaded } = useUser();

  const { userId } = useAuth();
  const [orderCount, setOrderCount] = useState<number>(0);

  useEffect(() => {
    const fetchOrders = async () => {
      if (!userId) return;
      const res = await fetch("/api/user-orders");
      const data = await res.json();
      setOrderCount(data.count);
    };

    fetchOrders();
  }, [userId]);
  

  if (!isLoaded) return null;

  return (
    <ClerkLoaded>
      {user ? (
        <>
          <Link href="/orders" className="group relative">
            <ListOrdered className="w-5 h-5 group-hover:text-darkColor hoverEffect" />
            <span className="absolute -top-1 -right-1 bg-darkColor text-white h-3.5 w-3.5 rounded-full text-xs font-semibold flex items-center justify-center">
              {orderCount}
            </span>
          </Link>
          <UserButton />
        </>
      ) : (
        <SignInButton mode="modal">
          <button className="text-sm font-semibold hover:text-darkColor hoverEffect">
            Login
          </button>
        </SignInButton>
      )}
    </ClerkLoaded>
  );
}
