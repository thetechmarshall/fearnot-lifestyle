import { Product } from "@/sanity.types";
import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import PriceView from "./PriceView";

const ProductCard = ({ product }: { product: Product }) => {
  console.log(product);
  const originalPrice =
    product.price + (product.price * product.discount) / 90;

  return (
    <div className="group text-sm rounded-lg overflow-hidden">
      <div className="bg-gradient-to-r from-zinc-200 via-zinc-300 to-zinc-200 overflow-hidden">
        {product?.images && (
          <Link href={`/product/${product?.slug?.current}`}>
            <Image
              src={urlFor(product?.images[0]).url()}
              width={500}
              height={500}
              alt="product-image"
              priority
              className={`w-full h-72 object-cover overflow-hidden hoverEffect ${product?.stock !== 0 && "group-hover:scale-105"}`}
            />
          </Link>
        )}
        {product?.stock === 0 && (
          <div className="absolute top-0 left-0 w-full h-full bg-darkColor/60 flex items-center justify-center">
            <p className="text-lg text-white font-semibold text-center">
              Out of stock
            </p>
          </div>
        )}
      </div>
      <div className="flex flex-col py-3 px-2 gap-1.5 bg-zinc-50 border border-t-0 rounded-lg rounded-tl-none rounded-tr-none">
        <h2 className="font-semibold line-clamp-1">{product?.name}</h2>
        <p>{product?.intro}</p>
        {/* <PriceView
          className="text-lg"
          price={product?.price}
          discount={product?.discount}
        /> */}
        <div className="flex gap-2">
          <PriceView
            price={product.price}
            discount={product.discount}
            className="text-lg font-bold"
          />

          {product.discount && (
            <span className="text-xs font-semibold px-1.5 py-1.5 bg-green-100 text-green-600 rounded">
            -
            {Math.round(
              ((originalPrice - product.price) / originalPrice) * 100
            )}
            %
          </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
