import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { CartProduct } from "@/types/ExtendedProduct";
import { toast } from "sonner";

export interface CartItem {
  product: CartProduct;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  addItem: (product: CartProduct) => void;
  removeItem: (product: CartProduct) => void;
  deleteCartProduct: (product: CartProduct) => void;
  resetCart: () => void;
  getTotalPrice: () => number;
  getSubtotalPrice: () => number;
  getItemCount: (product: CartProduct) => number;
  getGroupedItems: () => CartItem[];
}


const getProductKey = (product: CartProduct) => {
  return product.selectedVariation
    ? `${product._id}-${product.selectedVariation.name}`
    : product._id;
};

const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (product) =>
        set((state) => {
          const productKey = getProductKey(product);

          const existingItem = state.items.find(
            (item) => getProductKey(item.product) === productKey
          );

          if (existingItem) {
            return {
              items: state.items.map((item) =>
                getProductKey(item.product) === productKey
                  ? { ...item, quantity: item.quantity + 1 }
                  : item
              ),
            };
          } else {
            return {
              items: [...state.items, { product, quantity: 1 }],
            };
          }
        }),

      removeItem: (product) =>
        set((state) => {
          const productKey = getProductKey(product);

          return {
            items: state.items.reduce((acc, item) => {
              if (getProductKey(item.product) === productKey) {
                if (item.quantity > 1) {
                  acc.push({ ...item, quantity: item.quantity - 1 });
                }
              } else {
                acc.push(item);
              }
              return acc;
            }, [] as CartItem[]),
          };
        }),

      deleteCartProduct: (product) =>
        set((state) => {
          const productKey = getProductKey(product);

          const deletedProduct = state.items.find(
            (item) => getProductKey(item.product) === productKey
          );

          if (deletedProduct) {
            toast.success(
              `${deletedProduct.product.name?.substring(0, 20)}... removed from cart.`
            );
          }

          return {
            items: state.items.filter(
              (item) => getProductKey(item.product) !== productKey
            ),
          };
        }),

      resetCart: () => set({ items: [] }),

      getTotalPrice: () =>
        get().items.reduce(
          (total, item) => total + (item.product.price ?? 0) * item.quantity,
          0
        ),

      getSubtotalPrice: () =>
        get().items.reduce((total, item) => {
          const price = item.product.price ?? 0;
          const discount = ((item.product.discount ?? 0) * price) / 100;
          return total + (price - discount) * item.quantity;
        }, 0),

      getItemCount: (product) => {
        const productKey = getProductKey(product);

        const item = get().items.find(
          (item) => getProductKey(item.product) === productKey
        );

        return item ? item.quantity : 0;
      },

      getGroupedItems: () => get().items,
    }),
    { name: "cart-store" }
  )
);

export default useCartStore;
