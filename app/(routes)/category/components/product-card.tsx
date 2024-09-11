/* eslint-disable @next/next/no-img-element */
import { Expand, ShoppingCart } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { formatPrice } from "@/lib/formatPrice";
import { ProductType } from "@/types/product";
import { useCart } from "@/hooks/use-cart";

import IconButton from "@/components/ui/icon-button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Sizes from "@/components/shared/sizes";

type ProductCardProps = {
  product: ProductType;
};

const ProductCard = (props: ProductCardProps) => {
  const { product } = props;
  const router = useRouter();
  const { addItem } = useCart();

  // State for handling selected size
  const [selectedSize, setSelectedSize] = useState<string | null>(null);

  // Function to handle adding the product to the cart
  const handleAddToCart = () => {
    // If the product has sizes and no size is selected, return early
    if (
      !selectedSize &&
      product.attributes.category.data.attributes.categoryName !== "Accesorios"
    ) {
      return; // Prevent adding the product without a size
    }

    // Add product to the cart
    addItem({
      ...product,
      selectedSize: selectedSize, // Include selected size
    });
  };

  return (
    <div className="relative p-2 transition-all duration-100 rounded-lg hover:shadow-md h-[60vh]">
      <div className="absolute flex items-center justify-between gap-3 px-2 z-[1] top-4">
        {product.attributes.typeOfSleeve && (
          <p
            className="px-2 py-1 text-xs text-white bg-primary rounded-full
                 w-fit"
          >
            {product.attributes.typeOfSleeve}
          </p>
        )}
      </div>
      <Carousel
        opts={{
          align: "start",
        }}
        className="w-full max-w-sm"
      >
        <CarouselContent>
          {product.attributes.images.data.map((image) => (
            <CarouselItem key={image.id} className="group">
              <img
                src={`${image.attributes.url}`}
                alt="Image"
                className="rounded-xl"
              />
              <div
                className="absolute w-full px-6 transition duration-200 
                            opacity-0 group-hover:opacity-100 bottom-5"
              >
                <div className="flex justify-center gap-x-6">
                  <IconButton
                    onClick={() =>
                      router.push(`/product/${product.attributes.slug}`)
                    }
                    icon={<Expand size={20} className="text-gray-600" />}
                  />
                  <IconButton
                    onClick={handleAddToCart}
                    icon={<ShoppingCart size={20} className="text-gray-600" />}
                  />
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      {/* Show size selection if the product is not an accessory */}
      {product.attributes.category.data.attributes.categoryName !==
        "Accesorios" && (
        <Sizes
          productId={product.id}
          selectedSize={selectedSize}
          setSelectedSize={setSelectedSize}
        />
      )}

      <p className="text-2xl text-center">{product.attributes.productName}</p>
      <p className="font-bold text-center">
        {formatPrice(product.attributes.price)}
      </p>
    </div>
  );
};

export default ProductCard;
