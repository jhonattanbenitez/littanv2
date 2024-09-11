import ProductTasteOrigin from "@/components/shared/product-taste-origin";
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

  // Define selectedSize state
  const [selectedSize, setSelectedSize] = useState<string | null>(null);

const handleAddToCart = () => {

  if (!selectedSize) {
    alert("Please select a size.");
    return;
  }
  addItem({ ...product, selectedSize });
};


  return (
    <div className="px-6">
      <div className="justify-between mb-3 sm:flex">
        <h1 className="text-2xl">{product?.attributes.productName}</h1>

        <ProductTasteOrigin typeOfSleve={product?.attributes.typeOfSleeve} />
      </div>
      <Separator className="my-4" />
      <p>{product?.attributes.description}</p>
      <Separator className="my-4" />

      {/* Pass productId, selectedSize, and setSelectedSize to the Sizes component */}
      <Sizes
        productId={product.id}
        selectedSize={selectedSize}
        setSelectedSize={setSelectedSize}
      />

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
