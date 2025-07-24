import { Product } from "@/sanity.types";

// Define variation type
export interface ProductVariation {
  name?: "S" | "M" | "L" | "XL" | "XXL" | "XXXL";
  details?: string;
}

// Extend Product with optional selectedVariation
export interface CartProduct extends Product {
  selectedVariation?: ProductVariation;
  image?: (NonNullable<Product["images"]>[number]) | null;
}
