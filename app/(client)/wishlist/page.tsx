import NoAccessToCart from "@/components/NoAccessToCart";
import WishlistProducts from "@/components/WishlistProducts";
import { currentUser } from "@clerk/nextjs/server";
import React from "react";

const WishlistPage = async() => {
  const user = await currentUser();
  return <>
  {user ? <WishlistProducts /> : <NoAccessToCart />}
  </>;
};

export default WishlistPage;
