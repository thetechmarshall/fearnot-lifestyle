"use client";

import { useState } from "react";
import useFavouriteStore from "@/store/favouriteStore";
import Container from "./Container";
import { Heart } from "lucide-react";
import { Button } from "./ui/button";
import Link from "next/link";
import Image from "next/image";
import AddToCartButton from "./AddToCartButton";
import VariationModal from "./VariationModal";
import { Product } from "@/sanity.types";
import { ProductVariation } from "@/types/ExtendedProduct";
import { urlFor } from "@/sanity/lib/image";
import PriceFormatter from "./PriceFormatter";

const WishlistProducts = () => {
  const [visibleProducts, setVisibleProducts] = useState(5);
  const { favouriteProducts, removeFavourite } = useFavouriteStore();

  const [modalProduct, setModalProduct] = useState<Product | null>(null);
  const [selectedVariations, setSelectedVariations] = useState<
    Record<string, ProductVariation | null>
  >({});

  const showModal = !!modalProduct;

  const openModal = (product: Product) => setModalProduct(product);
  const closeModal = () => setModalProduct(null);

  const setSelectedVariation = (variation: ProductVariation | null) => {
    if (modalProduct) {
      setSelectedVariations((prev) => ({
        ...prev,
        [modalProduct._id]: variation,
      }));
    }
  };

  const loadMore = () => {
    setVisibleProducts((prev) => Math.min(prev + 5, favouriteProducts.length));
  };

  return (
    <Container className="py-10">
      {favouriteProducts.length > 0 ? (
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold mb-4">
            Wishlist ({favouriteProducts.length})
          </h2>

          {favouriteProducts.slice(0, visibleProducts).map((product) => {
            const imageSrc = product.images?.[0]
              ? urlFor(product.images[0]).url()
              : null;
            const variation = selectedVariations[product._id] || null;
            const isOutOfStock = product.stock === 0;
            const originalPrice =
              product.price + (product.price * product.discount) / 90;

            return (
              <div
                key={product._id}
                className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-md border p-3 shadow-sm"
              >
                {/* Image + Details */}
                <div className="flex flex-1 items-start sm:items-center gap-4">
                  <Link
                    href={`/product/${product.slug?.current}`}
                    className="shrink-0"
                  >
                    {imageSrc && (
                      <Image
                        src={imageSrc}
                        alt={product.name ?? "Wishlist product image"}
                        width={120}
                        height={120}
                        className="rounded border object-cover w-[100px] h-[100px] sm:w-[120px] sm:h-[120px]"
                      />
                    )}
                  </Link>

                  <div className="flex flex-col">
                    <h3 className="text-sm font-semibold line-clamp-1">
                      {product.name}
                    </h3>
                    <p className="text-sm capitalize mb-2 text-muted-foreground">
                      {product.variant}
                    </p>

                    {/* Price */}
                    <div className="flex items-center flex-wrap gap-2 text-sm text-muted-foreground">
                      <span className="font-semibold text-black">
                        <PriceFormatter amount={product.price} />
                      </span>

                      {product.discount > 0 && (
                        <>
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
                        </>
                      )}
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-col items-center justify-center sm:flex-row sm:items-center sm:space-x-4 gap-2 sm:gap-0">
                  <Button
                    onClick={() => removeFavourite(product._id)}
                    variant="ghost"
                    className="text-red-500 hover:text-red-600"
                  >
                    Remove
                  </Button>

                  {isOutOfStock ? (
                    <Button disabled className="cursor-not-allowed bg-gray-400">
                      Out of Stock
                    </Button>
                  ) : (
                    <AddToCartButton
                      product={product}
                      selectedVariation={variation}
                      openModal={() => openModal(product)}
                      showCartUI={false}
                    />
                  )}
                </div>
              </div>
            );
          })}

          {/* Load More */}
          {visibleProducts < favouriteProducts.length && (
            <div className="text-center">
              <Button onClick={loadMore} variant="outline">
                Load More
              </Button>
            </div>
          )}
        </div>
      ) : (
        <div className="flex min-h-[400px] flex-col items-center justify-center text-center px-4 space-y-4">
          <div className="relative">
            <div className="absolute -top-1 -right-4 h-4 w-4 animate-ping rounded-full bg-muted-foreground/20" />
            <Heart
              className="h-12 w-12 text-muted-foreground"
              strokeWidth={1.5}
            />
          </div>
          <h2 className="text-2xl font-semibold">Your wishlist is empty</h2>
          <p className="text-sm text-muted-foreground">
            Items added to your wishlist will appear here.
          </p>
          <Button asChild>
            <Link href="/">Continue Shopping</Link>
          </Button>
        </div>
      )}

      {/* Variation Modal */}
      {modalProduct && (
        <VariationModal
          product={modalProduct}
          showModal={showModal}
          setShowModal={(val) => !val && closeModal()}
          selectedVariation={selectedVariations[modalProduct._id] ?? null}
          setSelectedVariation={(variation) => {
            setSelectedVariation(variation);
            if (variation) closeModal();
          }}
        />
      )}
    </Container>
  );
};

export default WishlistProducts;
