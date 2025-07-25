"use client";

import React, { useEffect, useState } from "react";
import HomeTabbar from "./HomeTabbar";
import { productType } from "@/Constants";
import { client } from "@/sanity/lib/client";
import { Product } from "@/sanity.types";
import ProductCard from "./ProductCard";
import NoProductsAvailable from "./NoProductsAvailable";
import { AnimatePresence, motion } from "motion/react";
import { Loader2 } from "lucide-react";

const ProductGrid = () => {
  const [selectedTab, setSelectedTab] = useState(productType[0]?.title || "");

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const query = `*[_type == 'product' && variant == $variant] | order(name asc)`;

  useEffect(() => {
    const params = { variant: selectedTab.toLocaleLowerCase() };
    const fetchData = async () => {
      setLoading(true);
      try {
        const respone = await client.fetch(query, params);
        setProducts(await respone);
      } catch (error) {
        console.log("Product fetching error", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [query, selectedTab]);

  return (
    <div className="mt-10 flex flex-col items-center">
      <HomeTabbar selectedTab={selectedTab} onTabSelect={setSelectedTab} />
      {loading ? (
        <div className="flex flex-col items-center justify-center py-10 min-h-80 space-y-4 bg-gray-100 rounded-lg w-full mt-10">
          <motion.div className="flex items-center space-x-2 text-green-600">
            <Loader2 className="animate-spin" />
            <span className="text-lg font-semibold">Product is loading...</span>
          </motion.div>
        </div>
      ) : (
        <>
          {products?.length ? (
            <div className="grid grid-cols-2 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 mt-10 gap-8 w-full">
              {products?.map((product: Product) => (
                <AnimatePresence key={product?._id}>
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
          ) : (
            <NoProductsAvailable selectedTab={selectedTab} />
          )}
        </>
      )}
    </div>
  );
};

export default ProductGrid;
