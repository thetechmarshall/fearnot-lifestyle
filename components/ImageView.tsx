"use client";
import {
  internalGroqTypeReferenceTo,
  SanityImageCrop,
  SanityImageHotspot,
} from "@/sanity.types";
import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";

interface Props {
  images?: Array<{
    asset?: {
      _ref: string;
      _type: "reference";
      _weak?: boolean;
      [internalGroqTypeReferenceTo]?: "sanity.imageAsset";
    };
    media?: unknown;
    hotspot?: SanityImageHotspot;
    crop?: SanityImageCrop;
    _type: "image";
    _key: string;
  }>;
}

const ImageView = ({ images = [] }: Props) => {
  const [active, setActive] = useState(images[0]);
  return (
    <div className="w-full md:w-1/2 space-y-2 md:space-y-4">
      <AnimatePresence mode="wait">
        <motion.div
          key={active?._key}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="w-full max-h-[550px] min-h-[450px] border border-darkColor/10 rounded-md group overflow-hidden"
        >
          <Image
            src={urlFor(active).url()}
            alt="product-image"
            width={700}
            height={700}
            priority
            className="w-full h-96 max-h-[550px} min-h-[500px] object-cover group-hover:scale-110 hoverEffect rounded-md "
          />
        </motion.div>
      </AnimatePresence>
      <div className="grid grid-cols-6 gap-2 h-20 md:h-28">
        {images?.map((image) => (
          <button
            onClick={() => setActive(image)}
            key={image?._key}
            className={`border-0 rounded-md overflow-hidden ${active?._key === image?._key ? "ring-1 border-darkColor" : ""}`}
          >
            <Image
              src={urlFor(image).url()}
              alt="product-image"
              width={100}
              height={100}
              className="w-full h-full object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  );
};

export default ImageView;
