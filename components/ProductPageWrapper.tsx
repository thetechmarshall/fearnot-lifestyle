"use client";

import { useState } from "react";
import AddToCartButton from "@/components/AddToCartButton";
import VariationModal from "@/components/VariationModal";
import ProductCharacteristics from "@/components/ProductCharacteristics";
import ProductReviewSection from "@/components/ProductReviewSection";
import ImageView from "@/components/ImageView";
import PriceView from "@/components/PriceView";
import Container from "@/components/Container";
import { CreditCard, Truck } from "lucide-react";
import { Product, Review } from "@/sanity.types";
import type { ProductVariation } from "@/types/ExtendedProduct";
import ProductVariationSelector from "./ProductVariationSelector";
import AddToWishlistButton from "./AddToWishlistButton";

interface WrapperProps {
  product: Product;
  reviews: Review[];
}

export default function ProductPageWrapper({ product, reviews }: WrapperProps) {
  const [showModal, setShowModal] = useState(false);
  const [selectedVariation, setSelectedVariation] =
    useState<ProductVariation | null>(null);
  const originalPrice =
    product.price + (product.price * product.discount) / 90;

  return (
    <Container className="py-10 flex flex-col md:flex-row gap-10">
      {product.images && <ImageView images={product.images} />}

      <div className="w-full md:w-1/2 flex flex-col gap-4">
        <h2 className="text-2xl md:text-4xl font-bold mb-1">{product.name}</h2>
        <p className="text-sm text-gray-600 tracking-wide">
          {product.description}
        </p>

        <div className="flex gap-2">
          <PriceView
          price={product.price}
          discount={product.discount}
          className="text-lg font-bold"
        />

        <span className="text-xs font-semibold px-1.5 py-1.5 bg-green-100 text-green-600 rounded">
          -{Math.round(((originalPrice - product.price) / originalPrice) * 100)}
          %
        </span>
        </div>
        

        {product.stock && (
          <div className="flex gap-2">
            <div className="bg-green-100 w-24 h-10 text-center text-green-600 text-sm py-2.5 font-semibold rounded-lg">
              In Stock
            </div>
            <div className="w-24 h-10 pb-1 flex items-end justify-start text-sm font-semibold text-gray-600">
              ({product?.stock})
            </div>
          </div>
        )}

        <ProductVariationSelector
          product={product}
          openModal={(variation) => {
            setSelectedVariation(variation);
            setShowModal(true);
          }}
        />

        <div className="flex items-center gap-2.5 lg:gap-5">
          <AddToCartButton
            product={product}
            openModal={() => setShowModal(true)}
          />
          <AddToWishlistButton
            product={product}
            className="ml-auto"
            size="lg"
          />
        </div>

        <div className="flex gap-2 flex-wrap">
          <div className="flex flex-col flex-1 border rounded-sm border-darkBlue/20 p-3 gap-2.5 hover:border-darkBlue hoverEffect">
            <div className="flex gap-1.5">
              <Truck size={20} className="text-darkColor" />
              <p className="text-base font-semibold text-darkColor">
                Free Shipping
              </p>
            </div>
            <p className="text-xs text-gray-500 underline underline-offset-2">
              Free shipping of orders above ₦200k
            </p>
          </div>

          <div className="flex flex-col flex-1 border border-darkBlue/20 p-3 gap-2.5 rounded-sm hover:border-darkBlue hoverEffect">
            <div className="flex gap-1.5">
              <CreditCard size={20} className="text-darkColor" />
              <p className="text-base font-semibold text-darkColor">
                Flexible Payment
              </p>
            </div>
            <p className="text-xs text-gray-500 underline underline-offset-2">
              Debit/Credit cards or bank transfer, the choice is yours.
            </p>
          </div>
        </div>

        <ProductCharacteristics product={product} />
        <ProductReviewSection productId={product._id} reviews={reviews} />
      </div>

      <VariationModal
        product={product}
        showModal={showModal}
        setShowModal={setShowModal}
        selectedVariation={selectedVariation}
        setSelectedVariation={setSelectedVariation}
      />
    </Container>
  );
}
