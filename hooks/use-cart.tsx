import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { toast } from "@/hooks/use-toast"; // Correctly import the `toast` function
import { ProductType } from "@/types/product";

// Extend ProductType to include optional selectedSize
export type CartProductType = ProductType & {
  selectedSize?: string | null; // selectedSize is optional
};

interface CartStore {
  items: CartProductType[];
  addItem: (data: CartProductType) => void;
  removeItem: (id: number, size?: string | null) => void;
  removeAll: () => void;
}

export const useCart = create(
  persist<CartStore>(
    (set, get) => ({
      items: [],
      addItem: (data: CartProductType) => {
        const currentItems = get().items;

        // Check if selectedSize is required but missing
        if (
          !data.selectedSize &&
          data.attributes.category.data.attributes.categoryName !== "Accesorios"
        ) {
          toast({
            title: "Selecciona una talla",
            description:
              "Debes seleccionar una talla antes de agregar este producto al carrito.",
            variant: "destructive",
          });
          return;
        }

        // Check for the same product with the same selected size or no size
        const existingItem = currentItems.find(
          (item) =>
            item.id === data.id &&
            (!data.selectedSize || item.selectedSize === data.selectedSize)
        );

        if (existingItem) {
          toast({
            title: `El producto ya existe en el carrito ${
              data.selectedSize ? `(tamaño: ${data.selectedSize})` : ""
            }.`,
            description: "Por favor selecciona un producto diferente.",
            variant: "destructive",
          });
          return;
        }

        // Add the new product with the selected size or no size
        set({
          items: [...currentItems, data],
        });

        toast({
          title: `Producto ${
            data.selectedSize ? `(talla: ${data.selectedSize})` : ""
          } añadido al carrito 🛍️`,
          description: "¡Producto añadido exitosamente!",
        });
      },

      // Updated removeItem to handle both id and size if applicable
      removeItem: (id: number, size?: string | null) => {
        set({
          items: get().items.filter((item) => {
            // Check if the item ID matches and if the size (if provided) matches as well
            if (size) {
              return !(item.id === id && item.selectedSize === size);
            }
            return item.id !== id;
          }),
        });

        toast({
          title: `Producto ${
            size ? `(talla: ${size})` : ""
          } eliminado del carrito 🗑️`,
          description: "El producto fue eliminado correctamente.",
        });
      },

      removeAll: () => {
        set({ items: [] });

        toast({
          title: "Carrito vacío",
          description: "Todos los productos han sido eliminados del carrito.",
        });
      },
    }),
    {
      name: "cart-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

