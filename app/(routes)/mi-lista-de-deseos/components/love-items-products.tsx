/* eslint-disable @next/next/no-img-element */
import { useState } from "react";
import ProductImageMinuature from "@/components/shared/product-image-miniature";
import ProductTypeOfSleeve from "@/components/shared/product-type-sleeve";
import Sizes from "@/components/shared/sizes";
import { Button } from "@/components/ui/button";
import { useCart } from "@/hooks/use-cart";
import { useLovedProducts } from "@/hooks/use-loved-products";
import { formatPrice } from "@/lib/formatPrice";
import { cn } from "@/lib/utils";
import { ProductType } from "@/types/product";
import { X } from "lucide-react";
import { toast } from "@/components/ui/use-toast"; // Import the toast function

interface LovedItemProductProps {
  product: ProductType;
}

const LovedItemProduct = (props: LovedItemProductProps) => {
  const { product } = props;
  const { removeLovedItem } = useLovedProducts(); // Handles loved item removal with toast already
  const { addItem, items } = useCart(); // Cart actions

  // State for handling selected size
  const [selectedSize, setSelectedSize] = useState<string | null>(null);

  // Function to handle adding the product to the cart
  const addToCheckout = () => {
    // If the product has sizes but no size is selected
    if (
      !selectedSize &&
      product.attributes.category.data.attributes.categoryName !== "Accesorios"
    ) {
      toast({
        title: "Selecciona una talla",
        description:
          "Por favor selecciona una talla antes de añadir al carrito.",
        variant: "destructive",
      });
      return;
    }

    // Check if the product with the selected size is already in the cart
    const existingCartItem = items.find(
      (item) => item.id === product.id && item.selectedSize === selectedSize
    );

    if (existingCartItem) {
      toast({
        title: "Este producto ya está en el carrito",
        description: `El producto con la talla ${selectedSize} ya está en el carrito.`,
        variant: "destructive",
      });
      return; // Prevent adding the same item and size to the cart
    }

    // Add product to the cart with selected size
    addItem({
      ...product,
      selectedSize, // Include selected size
    });

    toast({
      title: "Producto añadido al carrito",
      description: `Has añadido el producto con talla ${selectedSize} al carrito.`,
      variant: "default",
    });

    // Remove from loved items
    removeLovedItem(product.id); // This already has a toast notification
  };

  return (
    <li className="flex p-6 border-b">
      <ProductImageMinuature
        slug={product.attributes.slug}
        url={product.attributes.images.data[0].attributes.url}
      />

      <div className="flex justify-between flex-1 px-6">
        <div>
          <h2 className="text-lg font-bold">
            {product.attributes.productName}
          </h2>
          <p className="font-bold">{formatPrice(product.attributes.price)}</p>

          <ProductTypeOfSleeve typeOfSleve={product.attributes.typeOfSleeve} />

          {/* Conditionally render size selection if product is not an accessory */}
          {product.attributes.category.data.attributes.categoryName !==
            "Accesorios" && (
            <Sizes
              productId={product.id}
              selectedSize={selectedSize}
              setSelectedSize={setSelectedSize}
            />
          )}

          <Button className="mt-5 rounded-full" onClick={addToCheckout}>
            Añadir al carrito
          </Button>
        </div>
        <div>
          <button
            className={cn(
              "rounded-full flex items-center justify-center bg-white border shadow-md p-1 hover:scale-110 transition"
            )}
            title="Remove from loved items"
            onClick={() => removeLovedItem(product.id)} // Already handles toast in the store
          >
            <X size={20} />
          </button>
        </div>
      </div>
    </li>
  );
};

export default LovedItemProduct;
