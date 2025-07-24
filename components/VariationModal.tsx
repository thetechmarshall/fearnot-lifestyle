"use client";

import { useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Product } from "@/sanity.types";
import { toast } from "sonner";
import QuantityButtons from "./QuantityButtons";
import useCartStore from "@/store";
import { useRouter } from "next/navigation";
import type { CartProduct, ProductVariation } from "@/types/ExtendedProduct";

interface Props {
  product: Product;
  showModal: boolean;
  setShowModal: (val: boolean) => void;
  selectedVariation: ProductVariation | null;
  setSelectedVariation: (variation: ProductVariation | null) => void;
}

export default function VariationModal({
  product,
  showModal,
  setShowModal,
  selectedVariation,
  setSelectedVariation,
}: Props) {
  const { addItem, getItemCount } = useCartStore();
  const router = useRouter();

  const variationId = selectedVariation
    ? `${product._id}-${selectedVariation.name}`
    : "";

  const itemCount = getItemCount({
    ...product,
    _id: variationId,
    selectedVariation: selectedVariation ?? undefined,
  });

  useEffect(() => {
    if (!showModal) setSelectedVariation(null);
  }, [showModal, setSelectedVariation]);

  return (
    <Dialog open={showModal} onOpenChange={setShowModal}>
      <DialogContent className="space-y-6 max-w-md">
        <DialogHeader>
          <DialogTitle>Select Product Variation</DialogTitle>
        </DialogHeader>

        {!selectedVariation ? (
          <div className="grid grid-cols-2 gap-3">
            {product?.variations?.map((variation, i) => (
              <Button
                key={i}
                variant="outline"
                className="py-2"
                onClick={() => setSelectedVariation(variation)}
              >
                {variation.name}
              </Button>
            ))}
          </div>
        ) : (
          <>
            <div className="space-y-2">
              <h3 className="font-semibold text-lg">
                {selectedVariation.name}
              </h3>
              <p className="text-gray-500 text-sm">
                {selectedVariation.details}
              </p>
            </div>

            <div className="flex items-center justify-between">
              <span className="font-medium">Quantity:</span>
              <QuantityButtons
                product={
                  {
                    ...product,
                    _id: variationId,
                    selectedVariation,
                  } as CartProduct
                }
              />
            </div>

            <div className="flex gap-3 justify-end pt-4">
              <Button
                variant="outline"
                onClick={() => setSelectedVariation(null)}
              >
                Back
              </Button>

              {itemCount > 0 ? (
                <Button
                  onClick={() => router.push("/cart")}
                  className="bg-darkColor text-white hover:bg-darkColor/90"
                >
                  Go to Cart
                </Button>
              ) : (
                <Button
                  onClick={() => {
                    addItem({
                      ...product,
                      _id: variationId,
                      selectedVariation,
                    } as CartProduct);
                    toast.success(
                      `${product.name} (${selectedVariation.name}) added to cart!`
                    );
                    setShowModal(false);
                  }}
                  className="bg-darkColor text-white hover:bg-darkColor/90"
                >
                  Add to Cart
                </Button>
              )}
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
