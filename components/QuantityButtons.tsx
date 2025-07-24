"use client";

import React from "react";
import { Button } from "./ui/button";
import { Minus, Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import useCartStore from "@/store";
import { toast } from "sonner";
import { CartProduct } from "@/types/ExtendedProduct";

interface Props {
  product: CartProduct;
  className?: string;
}

const QuantityButtons = ({ product, className }: Props) => {
  const { addItem, getItemCount, removeItem } = useCartStore();

  const itemCount = getItemCount(product);
  const isOutOfStock = product?.stock === 0;

  const handleRemoveProduct = () => {
    removeItem(product);
    if (itemCount > 1) {
      toast.success("Quantity decreased successfully!");
    } else {
      toast.success(
        `${product?.name?.substring(0, 12)}... removed successfully!`
      );
    }
  };

  return (
    <div className={cn("flex items-center gap-1 text-base pb-1", className)}>
      <Button
        onClick={handleRemoveProduct}
        disabled={itemCount === 0 || isOutOfStock}
        variant="outline"
        size="icon"
        className="w-6 h-6"
      >
        <Minus />
      </Button>

      <span className="font-semibold w-6 text-center text-darkColor">
        {itemCount}
      </span>

      <Button
        onClick={() => {
          addItem(product);
          toast.success(
            `${product?.name?.substring(0, 12)}... added successfully!`
          );
        }}
        variant="outline"
        size="icon"
        className="w-6 h-6"
        disabled={isOutOfStock}
      >
        <Plus />
      </Button>
    </div>
  );
};

export default QuantityButtons;
