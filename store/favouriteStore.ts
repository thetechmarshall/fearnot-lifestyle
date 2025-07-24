import { create } from "zustand";
import { Product } from "@/sanity.types";

type FavouriteState = {
  favouriteProducts: Product[];
  addFavourite: (product: Product) => void;
  removeFavourite: (productId: string) => void;
  resetFavourite: () => void;
};

const useFavouriteStore = create<FavouriteState>((set) => ({
  favouriteProducts: [],
  addFavourite: (product) =>
    set((state) => {
      const alreadyAdded = state.favouriteProducts.find(
        (p) => p._id === product._id
      );
      if (alreadyAdded) return state;
      return {
        favouriteProducts: [...state.favouriteProducts, product],
      };
    }),
  removeFavourite: (productId) =>
    set((state) => ({
      favouriteProducts: state.favouriteProducts.filter(
        (p) => p._id !== productId
      ),
    })),
  resetFavourite: () => set({ favouriteProducts: [] }),
}));

export default useFavouriteStore;
