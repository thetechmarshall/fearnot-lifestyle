"use client";

import { useEffect, useState } from "react";
import { Heart, HeartOff } from "lucide-react";
import { cn } from "@/lib/utils";
import { Product } from "@/sanity.types";
import useFavouriteStore from "@/store/favouriteStore";
import { Button } from "./ui/button";
import { toast } from "sonner";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface Props {
  product: Product;
  className?: string;
  size?: "sm" | "md" | "lg";
}

const AddToWishlistButton = ({ product, className }: Props) => {
  const { favouriteProducts, addFavourite, removeFavourite } =
    useFavouriteStore();

  const isInWishlist = favouriteProducts.some((p) => p._id === product._id);
  const [clicked, setClicked] = useState(false);

  const toggleWishlist = () => {
    setClicked(true);
    if (isInWishlist) {
      removeFavourite(product._id);
      toast.success("Removed from Wishlist");
    } else {
      addFavourite(product);
      toast.success("Added to Wishlist");
    }
  };

  useEffect(() => {
    if (clicked) {
      setTimeout(() => setClicked(false), 1000);
    }
  }, [clicked]);

  //   const iconSize = size === "sm" ? 16 : size === "lg" ? 35 : 30;

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          variant="default"
          size="icon"
          className={cn(
            "bg-gray-100 text-darkColor hover:bg-gray-100 hover:text-green-600",
            className
          )}
          onClick={toggleWishlist}
        >
          {isInWishlist ? (
            <HeartOff className="w-24" />
          ) : (
            <Heart className="" />
          )}
        </Button>
      </TooltipTrigger>
      <TooltipContent side="top">
        {isInWishlist ? "Remove from Wishlist" : "Add to Wishlist"}
      </TooltipContent>
    </Tooltip>
  );
};

export default AddToWishlistButton;
