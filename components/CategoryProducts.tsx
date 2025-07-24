"use client";

import { productType } from "@/Constants";
import { Product } from "@/sanity.types";
import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { client } from "@/sanity/lib/client";
import { AnimatePresence, motion } from "motion/react";
import { Loader2 } from "lucide-react";
import NoProductsAvailable from "./NoProductsAvailable";
import ProductCard from "./ProductCard";

interface Props {
  slug: string;
}

const ITEMS_PER_PAGE = 8;

const CategoryProducts = ({ slug }: Props) => {
  const [currentType, setCurrentType] = useState("");
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const fetchProducts = async (
    categorySlug: string,
    productTypeValue?: string
  ) => {
    try {
      setLoading(true);

      const query = `*[
        _type == "product" &&
        "${categorySlug}" in categories[]->slug.current
        ${productTypeValue ? "&& variant == $productType" : ""}
      ] | order(name asc)`;

      const params = productTypeValue ? { productType: productTypeValue } : {};
      const data = await client.fetch(query, params);

      setProducts(data);
      setCurrentPage(1); // Reset to first page after fetch
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  // Reset type filter and page when category changes
  useEffect(() => {
    setCurrentType("");
  }, [slug]);

  // Fetch products when slug or type changes
  useEffect(() => {
    fetchProducts(slug, currentType || undefined);
  }, [slug, currentType]);

  // Pagination logic
  const totalPages = Math.ceil(products.length / ITEMS_PER_PAGE);
  const startIdx = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedProducts = products.slice(startIdx, startIdx + ITEMS_PER_PAGE);

  return (
    <div className="flex flex-col md:flex-row py-5 gap-5 items-start">
      {/* Sidebar filter */}
      <div className="flex md:flex-col md:min-w-40 border">
        <Button
          onClick={() => setCurrentType("")}
          className={`bg-transparent border-0 rounded-none text-darkColor shadow-none hover:bg-darkColor/80 hover:text-white font-semibold hoverEffect md:border-b border-r md:border-r-0 last:border-r-0 last:border-b-0 ${
            currentType === "" && "bg-darkColor text-white border-darkColor"
          }`}
        >
          All
        </Button>
        {productType.map((item) => (
          <Button
            key={item.value}
            onClick={() => setCurrentType(item.value)}
            className={`bg-transparent border-0 rounded-none text-darkColor shadow-none hover:bg-darkColor/80 hover:text-white font-semibold hoverEffect md:border-b border-r md:border-r-0 last:border-r-0 last:border-b-0 ${
              item.value === currentType &&
              "bg-darkColor text-white border-darkColor"
            }`}
          >
            {item.title}
          </Button>
        ))}
      </div>

      {/* Product display */}
      <div className="w-full">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-10 min-h-80 space-y-4 bg-gray-100 rounded-lg w-full">
            <motion.div className="flex items-center space-x-2 text-green-600">
              <Loader2 className="animate-spin" />
              <span className="text-lg font-semibold">
                Product is loading...
              </span>
            </motion.div>
          </div>
        ) : products?.length ? (
          <>
            <div className="grid grid-cols-2 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8 w-full">
              {paginatedProducts.map((product: Product) => (
                <AnimatePresence key={product._id}>
                  <motion.div
                    layout
                    initial={{ opacity: 0.2 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <ProductCard product={product} />
                  </motion.div>
                </AnimatePresence>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-4 mt-10">
                <Button
                  variant="outline"
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage((prev) => prev - 1)}
                >
                  Previous
                </Button>
                <span className="text-sm font-semibold">
                  Page {currentPage} of {totalPages}
                </span>
                <Button
                  variant="outline"
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage((prev) => prev + 1)}
                >
                  Next
                </Button>
              </div>
            )}
          </>
        ) : (
          <NoProductsAvailable
            selectedTab={currentType}
            className="mt-0 w-full"
          />
        )}
      </div>
    </div>
  );
};

export default CategoryProducts;
