"use client";

import { useGetProductBySlug } from "@/api/getProductBySlug";
import { ResponseType } from "@/types/response";
import { useParams } from "next/navigation";
import SkeletonProduct from "./components/skeleton-product";
import CarouselProduct from "./components/carousel-product";
import InfoProduct from "./components/info-product";

export default function Page() {
  const params = useParams();
  const { productSlug } = params;

  const { result, loading, error }: ResponseType =
    useGetProductBySlug(productSlug);

  // Handle loading state
  if (loading) {
    return <SkeletonProduct />;
  }

  // Handle error state or when no product is found
  if (error || !result || result.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-[80vh]">
        <h1 className="text-2xl font-bold text-center">
          Producto no encontrado. Por favor, verifica la URL o navega por otros productos.
        </h1>
      </div>
    );
  }

  return (
    <div className="max-w-6xl py-4 mx-auto sm:py-32 sm:px-24 lg:min-h-[80vh]">
      <div className="grid sm:grid-cols-2">
        <div>
          <CarouselProduct images={result[0]?.attributes.images} />
        </div>

        <div className="sm:px-12">
          <InfoProduct product={result[0]} />
        </div>
      </div>
    </div>
  );
}
