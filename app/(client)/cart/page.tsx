"use client";

import { useEffect, useState } from "react";
import { useAuth, useUser } from "@clerk/nextjs";
import { createCheckoutSession, Metadata } from "@/app/actions/checkout";

import Container from "@/components/Container";
import EmptyCart from "@/components/EmptyCart";
import Loading from "@/components/Loading";
import NoAccessToCart from "@/components/NoAccessToCart";
import PriceFormatter from "@/components/PriceFormatter";
import QuantityButtons from "@/components/QuantityButtons";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { urlFor } from "@/sanity/lib/image";
import useCartStore from "@/store";
import { ShoppingBag, Trash } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import AddToWishlistButton from "@/components/AddToWishlistButton";
import ConfirmModal from "@/components/ConfirmModal";

const CartPage = () => {
  const [isClient, setIsClient] = useState(false);
  const [loading, setLoading] = useState(false);
  const [savedAddress, setSavedAddress] = useState("");
  const [address, setAddress] = useState("");
  const [useSavedAddress, setUseSavedAddress] = useState(false);
  const [shippingFee, setShippingFee] = useState(0);
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  const { isSignedIn } = useAuth();
  const { user } = useUser();

  const {
    deleteCartProduct,
    getGroupedItems,
    getItemCount,
    getTotalPrice,
    getSubtotalPrice,
    resetCart,
  } = useCartStore();

  const subtotal = getSubtotalPrice(); // already applies discount
  useEffect(() => {
    const percentFee = subtotal * 0.05;
    const fee = Math.min(Math.max(percentFee, 2000), 10000);
    setShippingFee(fee);
  }, [subtotal]);

  const finalTotal = subtotal + shippingFee;

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Fetch saved address from Sanity on login
  useEffect(() => {
    const fetchAddress = async () => {
      if (!user?.id) return;
      const res = await fetch(`/api/get-user-address?clerkUserId=${user.id}`);
      const data = await res.json();
      if (data?.deliveryAddress) {
        setSavedAddress(data.deliveryAddress);
        if (useSavedAddress) {
          setAddress(data.deliveryAddress);
        }
      }
    };
    fetchAddress();
  }, [user?.id, useSavedAddress]);

  const handleResetCart = () => {
    setShowResetConfirm(true);
  };

  const confirmResetCart = () => {
    resetCart();
    setShowResetConfirm(false);
    toast.success("Cart cleared successfully!");
  };

  const saveAddress = async () => {
    await fetch("/api/update-user-address", {
      method: "POST",
      body: JSON.stringify({
        clerkUserId: user?.id,
        fullName: user?.fullName,
        email: user?.emailAddresses[0]?.emailAddress,
        address,
      }),
      headers: { "Content-Type": "application/json" },
    });
  };

  const handleCheckout = async () => {
    setLoading(true);
    try {
      await saveAddress();

      const metadata: Metadata = {
        orderNumber: crypto.randomUUID(),
        customerName: user?.fullName ?? "Unknown",
        customerEmail: user?.emailAddresses[0]?.emailAddress ?? "Unknown",
        clerkUserId: user!.id,
        deliveryAddress: address,
      };

      // Calculate shipping fee (5% of subtotal, min ₦2000, max ₦10000)
      let shippingFee = subtotal * 0.05;
      if (shippingFee < 2000) shippingFee = 2000;
      if (shippingFee > 10000) shippingFee = 10000;

      const checkoutUrl = await createCheckoutSession(
        getGroupedItems(),
        metadata,
        shippingFee,
        subtotal,
        finalTotal
      );

      if (checkoutUrl) {
        window.location.href = checkoutUrl;
      }
    } catch (error) {
      console.error("Error creating checkout session:", error);
    } finally {
      setLoading(false);
    }
  };

  const cartProducts = getGroupedItems();

  if (!isClient) return <Loading />;

  return (
    <div className="bg-gray-50 pb-52 md:pb-10">
      {isSignedIn ? (
        <Container>
          {cartProducts?.length ? (
            <>
              <div className="flex items-center gap-2 py-5">
                <ShoppingBag />
                <h1 className="text-2xl font-semibold">Cart</h1>
              </div>

              <div className="grid lg:grid-cols-3 md:gap-8 space-y-10 md:space-y-0">
                {/* Products */}
                <div className="lg:col-span-2 rounded-lg">
                  <div className="border bg-white rounded-md">
                    {cartProducts.map(({ product }) => {
                      const itemCount = getItemCount(product);
                      const originalPrice =
                        product.price + (product.price * product.discount) / 90;

                      const imageSrc = product.images?.[0]
                        ? urlFor(product.images[0]).url()
                        : null;

                      return (
                        <div
                          key={
                            product?._id +
                            (product.selectedVariation?.name ?? "")
                          }
                          className="border-b p-2.5 last:border-b-0 flex items-center justify-between gap-5"
                        >
                          <div className="flex flex-1 items-center gap-2 h-36 md:h-44">
                            <Link
                              href={`/product/${product?.slug?.current}`}
                              className="border p-0.5 md:p-1 mr-2 rounded-md overflow-hidden"
                            >
                              {imageSrc && (
                                <Image
                                  src={imageSrc}
                                  alt={product.name ?? "Product image"}
                                  width={500}
                                  height={500}
                                  loading="lazy"
                                  className="w-32 md:w-40 h-32 md:h-40 object-cover hoverEffect"
                                />
                              )}
                            </Link>

                            <div className="flex flex-col justify-between h-full flex-1 py-1">
                              <div className="space-y-1">
                                <h2 className="font-semibold line-clamp-1">
                                  {product.name}
                                </h2>
                                {product.intro && (
                                  <p className="text-sm text-lightColor font-medium">
                                    {product.intro}
                                  </p>
                                )}
                                {product.variant && (
                                  <p className="text-sm capitalize">
                                    Variant:{" "}
                                    <span className="font-semibold">
                                      {product.variant}
                                    </span>
                                  </p>
                                )}
                                {product?.selectedVariation && (
                                  <p className="text-sm">
                                    Size:{" "}
                                    <span className="font-semibold">
                                      {product.selectedVariation.name}
                                    </span>
                                  </p>
                                )}
                              </div>
                              <div className="text-gray-500 flex items-center gap-3">
                                <TooltipProvider>
                                  <AddToWishlistButton
                                    product={product}
                                    className="hoverEffect"
                                  />
                                  <Tooltip>
                                    <TooltipTrigger>
                                      <Button
                                        variant="ghost"
                                        size="icon"
                                        className="text-darkColor hover:text-red-600 bg-gray-100"
                                        onClick={() =>
                                          deleteCartProduct(product)
                                        }
                                      >
                                        <Trash className="w-4 h-4 hover:text-red-600 hoverEffect" />
                                      </Button>
                                      <TooltipContent>Remove</TooltipContent>
                                    </TooltipTrigger>
                                  </Tooltip>
                                </TooltipProvider>
                              </div>
                            </div>

                            <div className="flex flex-col items-start justify-between h-36 md:h-44 p-0.5 md:p-1">
                              <div className="flex flex-col space-y-0.5">
                                <PriceFormatter
                                  amount={(product.price as number) * itemCount}
                                  className="font-bold text-lg"
                                />
                                {product.price && product.discount && (
                                  <>
                                    <div className="flex gap-2">
                                      <PriceFormatter
                                        amount={originalPrice}
                                        className="line-through text-zinc-500"
                                      />
                                      <span className="text-xs px-2 py-1 bg-green-100 text-green-600 rounded font-medium">
                                        -
                                        {Math.round(
                                          ((originalPrice - product.price) /
                                            originalPrice) *
                                            100
                                        )}
                                        %
                                      </span>
                                    </div>
                                  </>
                                )}
                              </div>
                              <QuantityButtons product={product} />
                            </div>
                          </div>
                        </div>
                      );
                    })}

                    <Button
                      onClick={handleResetCart}
                      className="m-5 font-semibold text-red-600 border-red-500 hover:text-white hover:bg-red-600 hoverEffect"
                      variant="outline"
                    >
                      Clear Cart
                    </Button>
                  </div>
                </div>

                {/* Summary */}
                <div className="lg:col-span-1">
                  <div className="w-full bg-white p-6 rounded-lg border space-y-4">
                    <h2 className="text-xl font-semibold mb-2">
                      Order Summary
                    </h2>

                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>Subtotal:</span>
                        <PriceFormatter amount={subtotal} />
                      </div>
                      <div className="flex justify-between">
                        <span>Discount:</span>
                        <PriceFormatter amount={subtotal - getTotalPrice()} />
                      </div>
                      <div className="flex justify-between">
                        <span>Shipping Fee:</span>
                        <PriceFormatter amount={shippingFee} />
                      </div>
                      <Separator />
                      <div className="flex justify-between">
                        <span>Total Payable:</span>
                        <PriceFormatter
                          amount={finalTotal}
                          className="text-lg font-bold text-darkColor"
                        />
                      </div>
                    </div>

                    <div className="space-y-2 pt-4">
                      <label className="text-sm font-medium">
                        Delivery Address
                      </label>

                      <Input
                        value={address}
                        onChange={(e) => {
                          setUseSavedAddress(false);
                          setAddress(e.target.value);
                        }}
                        placeholder="Enter your delivery address"
                        disabled={useSavedAddress}
                      />

                      <div className="flex items-center gap-3 pt-2">
                        <span className="text-sm font-medium">
                          Use Saved Address:
                        </span>

                        <button
                          type="button"
                          onClick={() => {
                            const willUseSaved = !useSavedAddress;
                            setUseSavedAddress(willUseSaved);
                            if (willUseSaved && savedAddress) {
                              setAddress(savedAddress);
                            }
                            toast.success(
                              willUseSaved
                                ? "Using your saved address!"
                                : "Manual address entry enabled."
                            );
                          }}
                          className={cn(
                            "w-12 h-6 flex items-center rounded-full p-1 transition-colors duration-300",
                            useSavedAddress ? "bg-green-500" : "bg-gray-300"
                          )}
                        >
                          <div
                            className={cn(
                              "bg-white w-4 h-4 rounded-full shadow transform transition-transform duration-300",
                              useSavedAddress
                                ? "translate-x-6"
                                : "translate-x-0"
                            )}
                          />
                        </button>
                      </div>

                      <Button
                        type="button"
                        variant="outline"
                        onClick={async () => {
                          await saveAddress();
                          toast.success("Address saved successfully!");
                        }}
                        className="mt-2"
                      >
                        Save Address
                      </Button>
                    </div>

                    <Button
                      onClick={handleCheckout}
                      className="w-full rounded-full font-semibold tracking-wide"
                      disabled={loading}
                    >
                      {loading ? "Processing..." : "Proceed to Checkout"}
                    </Button>
                  </div>
                </div>
              </div>
              <ConfirmModal
                isOpen={showResetConfirm}
                title="Clear your cart?"
                message="You're about to remove all items from your cart. Are you sure?"
                onCancel={() => setShowResetConfirm(false)}
                onConfirm={confirmResetCart}
              />
            </>
          ) : (
            <EmptyCart />
          )}
        </Container>
      ) : (
        <NoAccessToCart />
      )}
    </div>
  );
};

export default CartPage;
