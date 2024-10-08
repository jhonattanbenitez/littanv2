import { useGetProductInventory } from "@/api/getProductInventory";
import { InventoryItemType } from "@/types/inventory";

type SizesProps = {
  productId: number;
  selectedSize: string | null;
  setSelectedSize: (size: string) => void;
};

const Sizes = ({ productId, selectedSize, setSelectedSize }: SizesProps) => {
  const { result, loading, error } = useGetProductInventory(productId);

  if (loading) return <p>Cargando Tallas</p>;
  if (error) return <p>Error cargando tallas: {error}</p>;

  return (
    <div className="my-4">
      <h3 className="text-lg">Talla</h3>
      <div className="flex gap-3 mt-2">
        {result?.map((inventoryItem: InventoryItemType) => {
          const isOutOfStock = inventoryItem.attributes.quantity === 0;

          return (
            <button
              key={inventoryItem.id}
              onClick={() => setSelectedSize(inventoryItem.attributes.size)}
              disabled={isOutOfStock} 
              className={`px-4 py-2 border rounded-md text-xs ${
                selectedSize === inventoryItem.attributes.size
                  ? "border-black bg-primary dark:text-white dark:border-white text-white"
                  : "border-gray-300"
              } ${isOutOfStock ? "opacity-50 cursor-not-allowed" : ""}`}
            >
              {inventoryItem.attributes.size}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default Sizes;
