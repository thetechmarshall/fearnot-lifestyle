import { Product } from "@/sanity.types";
import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";

const ProductCharacteristics = ({ product }: { product: Product }) => {
  return (
    <Accordion type="single" collapsible className="border-t -mb-4 py-2">
      <AccordionItem value="item-1">
        <AccordionTrigger>{product?.name}: Characteristics</AccordionTrigger>
        <AccordionContent>
          <p className="flex items-center justify-between">
            Intro:{" "}
            <span className="font-semibold tracking-wide">
              {product?.intro}
            </span>
          </p>
          <p className="flex items-center justify-between">
            Type:{" "}
            <span className="font-semibold tracking-wide">
              {product?.variant}
            </span>
          </p>
          <p className="flex items-center justify-between">
            Brand: <span className="font-semibold tracking-wide">FNL</span>
          </p>
          <p className="flex items-center justify-between">
            Stock:{" "}
            <span className="font-semibold tracking-wide">
              {product?.stock ? "Available" : "Out of stock"}
            </span>
          </p>
          <p className="flex items-center justify-between">
            Collection:{" "}
            <span className="font-semibold tracking-wide">2025</span>
          </p>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default ProductCharacteristics;
