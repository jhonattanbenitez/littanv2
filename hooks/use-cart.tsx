import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { toast } from "@/components/ui/use-toast";
import { ProductType } from "@/types/product";

// Extend ProductType to include selectedSize
export type CartProductType = ProductType & {
  selectedSize: string; // Add selectedSize for cart purposes
};

interface CartStore {
  items: CartProductType[];
  addItem: (data: CartProductType) => void;
  removeItem: (id: number, size: string) => void;
  removeAll: () => void;
}

export const useCart = create(
  persist<CartStore>(
    (set, get) => ({
      items: [],

      addItem: (data: CartProductType) => {
        const currentItems = get().items;

        // Check for the same product with the same selected size
        const existingItem = currentItems.find(
          (item) =>
            item.id === data.id && item.selectedSize === data.selectedSize
        );

        if (existingItem) {
          return toast({
            title: `El producto ya existe en el carrito (tamaño: ${data.selectedSize}).`,
            variant: "destructive",
          });
        }

        // Add the new product with the selected size
        set({
          items: [...currentItems, data],
        });

        toast({
          title: `Producto (tamaño: ${data.selectedSize}) añadido al carrito 🛍️`,
        });
      },

      // Updated removeItem to handle both id and size
      removeItem: (id: number, size: string) => {
        set({
          items: get().items.filter(
            (item) => item.id !== id || item.selectedSize !== size
          ),
        });

        toast({
          title: `Producto (tamaño: ${size}) eliminado del carrito 🗑️`,
        });
      },

      removeAll: () => set({ items: [] }),
    }),
    {
      name: "cart-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
