/* eslint-disable @next/next/no-img-element */
"use client";

import { useGetFeaturedProducts } from "@/api/useGetFeturedProducts";
import { ResponseType } from "@/types/response";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";
import SkeletonSchema from "./SkeletonSchema";
import { ProductType } from "../types/product";
import { Card, CardContent } from "./ui/card";
import { Expand, ShoppingCart } from "lucide-react";
import { useRouter } from "next/navigation";
import IconButton from "./ui/icon-button";

const FeaturedProducts = () => {
  const { result, loading }: ResponseType = useGetFeaturedProducts();
  const router = useRouter();

  return (
    <div className="max-w-6xl py-4 mx-auto sm:py-16 sm:px-24">
      <h3 className="px-6 text-3xl sm:pb-8 text-primary dark:text-white">Productos destacados</h3>
      <Carousel>
        <CarouselContent className="-ml-2 md:-ml-4">
          {loading && <SkeletonSchema grid={3} />}
          {result !== null &&
            result.map((product: ProductType) => {
              const { attributes, id } = product;
              const { slug, images, productName, type } = attributes;
              const urlBase = process.env.NEXT_PUBLIC_BACKEND_URL;

              return (
                <CarouselItem
                  key={id}
                  className="md:basis-1/2 lg:basis-1/3 group"
                >
                  <div className="p-1">
                    <Card className="h-full border border-gray-200 shadow-none flex flex-col">
                      <CardContent className="relative flex items-center justify-center px-6 py-2">
                        <img
                          src={`${urlBase}${images.data[0].attributes.url}`}
                          alt={productName}
                          className="h-64 w-full object-cover" // Fixed height for all images
                        />
                        <div className="absolute w-full px-6 transition duration-200 opacity-0 group-hover:opacity-100 bottom-5">
                          <div className="flex justify-center gap-x-6">
                            <IconButton
                              onClick={() => router.push(`product/${slug}`)}
                              icon={<Expand size={20} />}
                              className="text-gray-600"
                            />
                            <IconButton
                              onClick={() => console.log("Add to cart")}
                              icon={<ShoppingCart size={20} />}
                              className="text-gray-600"
                            />
                          </div>
                        </div>
                      </CardContent>
                      <div className="flex-grow flex flex-col justify-between gap-4 px-8 py-4">
                        <h3 className="text-lg font-bold">{productName}</h3>
                        <div className="flex items-center justify-between gap-3">
                          {type && (
                            <p className="px-2 py-1 text-white bg-primary rounded-full dark:bg-white dark:text-primary w-fit">
                              {type}
                            </p>
                          )}
                        </div>
                      </div>
                    </Card>
                  </div>
                </CarouselItem>
              );
            })}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext className="hidden sm:flex" />
      </Carousel>
    </div>
  );
};

export default FeaturedProducts;
