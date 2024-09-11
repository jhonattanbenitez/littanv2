"use client";
import { useGetCategoryProduct } from "@/api/getCategoryProduct";
import { Separator } from "@/components/ui/separator";
import { ResponseType } from "@/types/response";
import { useParams, useRouter } from "next/navigation";
import FiltersControlsCategory from "../components/FiltersControlsCategory";
import SkeletonSchema from "@/components/SkeletonSchema";
import ProductCard from "../components/product-card";
import { ProductType } from "@/types/product";
import { useState } from "react";

const CategorySlug = () => {
 const params = useParams();
 const { categorySlug } = params;
 const { result, loading }: ResponseType = useGetCategoryProduct(categorySlug);
 const [filterTypeOfProduct, setFilterTypeOfProduct] = useState("");
 const router = useRouter();

 const filteredProducts =
   result !== null &&
   !loading &&
   (filterTypeOfProduct === ""
     ? result
     : result.filter(
         (product: ProductType) => product.attributes.typeOfSleeve === filterTypeOfProduct
       ));
  return (
    <div className="max-w-6xl py-4 mx-auto sm:py-16 sm:px-24">
      {result !== null && !loading && result.length !== 0 && (
        <h1 className="text-3xl font-medium text-primary dark:text-white ml-4">
          {result[0].attributes.category.data.attributes.categoryName}
        </h1>
      )}
      <Separator />
      <div className="sm:flex sm:justify-between">
        <FiltersControlsCategory setFilterTypeOfProduct={setFilterTypeOfProduct} />

        <div className="grid gap-5 mt-8 sm:grid-cols-2 md:grid-cols-3 md:gap-10">
          {loading && <SkeletonSchema grid={3} />}
          {filteredProducts !== null &&
            !loading &&
            filteredProducts.map((product: ProductType) => (
              <ProductCard key={product.id} product={product} />
            ))}
          {filteredProducts !== null &&
            !loading &&
            filteredProducts.length === 0 && (
              <p>No hay productos con este filtro.</p>
            )}
        </div>
      </div>
    </div>
  );
};

export default CategorySlug;
