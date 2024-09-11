import ProductTasteOrigin from "@/components/shared/product-type-sleeve";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useCart } from "@/hooks/use-cart";
import { useLovedProducts } from "@/hooks/use-loved-products";
import { formatPrice } from "@/lib/formatPrice";
import { ProductType } from "@/types/product";
import { Heart } from "lucide-react";
import Sizes from "./sizes";
import { useState } from "react";

export type InfoProductProps = {
  product: ProductType;
};

const InfoProduct = (props: InfoProductProps) => {
  const { product } = props;
  const { addItem } = useCart();
  const { addLoveItem } = useLovedProducts();

  // Check if the product belongs to the "Accesorios" category
  const isAccessory =
    product?.attributes.category?.data?.attributes?.categoryName ===
    "Accesorios";

  const typeOfSleeve = product?.attributes.typeOfSleeve;

  // Define selectedSize state
  const [selectedSize, setSelectedSize] = useState<string | null>(null);

  const handleAddToCart = () => {

    addItem({
      ...product,
      ...(selectedSize && { selectedSize }),
    });
  };

  return (
    <div className="px-6">
      <div className="justify-between mb-3 sm:flex">
        <h1 className="text-2xl">{product?.attributes.productName}</h1>

        {typeOfSleeve && (
          <ProductTasteOrigin typeOfSleve={product?.attributes.typeOfSleeve} />
        )}
      </div>
      <Separator className="my-4" />
      <p>{product?.attributes.description}</p>
      <Separator className="my-4" />

      {/* Conditionally render Sizes component if the product is not an accessory */}
      {!isAccessory && (
        <Sizes
          productId={product.id}
          selectedSize={selectedSize}
          setSelectedSize={setSelectedSize}
        />
      )}

      <p className="my-4 text-2xl">{formatPrice(product?.attributes.price)}</p>
      <div className="flex items-center gap-5">
        <Button className="w-full" onClick={handleAddToCart}>
          Comprar
        </Button>
        <Heart
          width={30}
          strokeWidth={1}
          className="transition duration-300 cursor-pointer hover:fill-black"
          onClick={() => addLoveItem(product)}
        />
      </div>
    </div>
  );
};

export default InfoProduct;
