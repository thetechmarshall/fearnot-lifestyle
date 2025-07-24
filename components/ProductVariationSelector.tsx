"use client";

import { Button } from "./ui/button";
import useCartStore from "@/store";
import type { ProductVariation } from "@/types/ExtendedProduct";
import type { Product } from "@/sanity.types";

interface Props {
  product: Product;
  openModal: (variation: ProductVariation) => void;
}

const ProductVariationSelector = ({ product, openModal }: Props) => {
  const { getItemCount } = useCartStore();

  if (!product?.variations?.length) return null;

  return (
    <div className="flex flex-wrap gap-2">
      {product.variations.map((variation, idx) => {
        const variationId = `${product._id}-${variation.name}`;

        const itemCount = getItemCount({
          ...product,
          _id: variationId,
          selectedVariation: variation ?? undefined,
        });

        return (
          <div key={idx} className="relative">
            <Button
              onClick={() => openModal(variation)}
              className="px-4 py-2 border border-darkColor bg-white text-darkColor font-semibold rounded-md hover:bg-darkColor hover:text-white text-sm hoverEffect"
            >
              {variation.name}
            </Button>

            {itemCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-darkColor text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                {itemCount}
              </span>
            )}
          </div>
        );
      })}
    </div>
  );
};


export default ProductVariationSelector;
