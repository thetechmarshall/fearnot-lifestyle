"use client";

import { Product } from "@/sanity.types";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import QuantityButtons from "./QuantityButtons";
import useCartStore from "@/store";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { CartProduct, ProductVariation } from "@/types/ExtendedProduct";

interface Props {
  product: Product;
  selectedVariation?: ProductVariation | null;
  openModal: () => void;
  className?: string;
  showCartUI?: boolean; //
}

const AddToCartButton = ({
  product,
  selectedVariation,
  openModal,
  className,
  showCartUI = true,
}: Props) => {
  const { addItem, getItemCount } = useCartStore();
  const router = useRouter();

  const hasVariations =
    Array.isArray(product?.variations) && product.variations.length > 0;

  const variationId = selectedVariation
    ? `${product._id}-${selectedVariation.name}`
    : product._id;

  const itemCount =
    getItemCount(
      selectedVariation
        ? { ...product, _id: variationId, selectedVariation }
        : product
    ) || 0;

  const hasAnyVariationInCart = hasVariations
    ? (product.variations ?? []).some(
        (variation) =>
          getItemCount({
            ...product,
            _id: `${product._id}-${variation.name}`,
            selectedVariation: variation,
          }) > 0
      )
    : false;

  const shouldShowCheckout = hasVariations
    ? hasAnyVariationInCart
    : itemCount > 0;

  const isOutOfStock = product?.stock === 0;

  return (
    <div className="w-full space-y-3">
      {shouldShowCheckout ? (
        <div className="w-full space-y-2 rounded-md p-3">
          {/* Show quantity buttons only for simple products */}
          {!hasVariations && showCartUI && (
            <>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Quantity</span>
                <QuantityButtons
                  product={
                    selectedVariation
                      ? {
                          ...product,
                          _id: variationId,
                          selectedVariation,
                        }
                      : product
                  }
                />
              </div>

              <div className="flex items-center justify-between pt-2 border-t mt-2">
                <span className="text-sm font-semibold">Subtotal:</span>
                <span className="font-bold">
                  ₦{((product?.price ?? 0) * itemCount).toLocaleString()}
                </span>
              </div>
            </>
          )}

          <Button
            onClick={() => router.push("/cart")}
            className="w-full bg-darkColor text-white hover:bg-darkColor/80 hoverEffect"
          >
            Go to Cart
          </Button>
        </div>
      ) : (
        <Button
          onClick={() => {
            if (shouldShowCheckout) {
              router.push("/cart");
            } else {
              if (hasVariations) {
                openModal();
              } else {
                addItem({
                  ...product,
                  image: product.images?.[0] ?? null,
                } as CartProduct);

                toast.success(
                  `${product?.name?.substring(0, 12)}... added successfully!`
                );
              }
            }
          }}
          disabled={isOutOfStock}
          className={cn(
            "w-full bg-darkColor/90 text-white shadow-none font-semibold tracking-wide hover:bg-darkColor hoverEffect",
            className
          )}
        >
          {shouldShowCheckout
            ? "Go to Cart"
            : hasVariations
              ? "Select Variation"
              : "Add to Cart"}
        </Button>
      )}
    </div>
  );
};

export default AddToCartButton;
