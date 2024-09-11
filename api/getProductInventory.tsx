import { useEffect, useState } from "react";
import { InventoryItemType } from "@/types/inventory";

export function useGetProductInventory(productId: number | string) {
  const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/product-inventories?filters[related_product][id][$eq]=${productId}&populate=*`;

  const [result, setResult] = useState<InventoryItemType[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(url);
        const json = await res.json();
        setResult(json.data); // Here, the result is an array of inventory items
        setLoading(false);
      } catch (error: any) {
        setError(error);
        setLoading(false);
      }
    })();
  }, [url]);

  return { loading, result, error };
}
