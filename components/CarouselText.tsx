"use client";
import { useRouter } from "next/navigation";
import { Carousel, CarouselContent, CarouselItem } from "./ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { Card, CardContent } from "./ui/card";

const dataCarouselTop = [
  {
    id: 1,
    title: "Littan",
    description: "Productos realizados con cianotipia",
    link: "/",
  },
  {
    id: 2,
    title: "Productos",
    description: "Productos realizados con cianotipia",
    link: "/productos",
  },
  {
    id: 3,
    title: "Tienda",
    description: "Productos realizados con cianotipia",
    link: "#",
  },
];

const CarouselText = () => {
  const router = useRouter();

  return (
    <div className="bg-gray-200 dark:bg-primary">
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        plugins={[
          Autoplay({
            delay: 3000,
          }),
        ]}
        className="w-full max-w-4xl mx-auto"
      >
        <CarouselContent>
          {dataCarouselTop.map(({ id, title, link, description }) => (
            <CarouselItem
              key={id}
              onClick={() => router.push(link)}
              className="cursor-pointer"
            >
              <div>
                <Card className="shadow-none border-none bg-transparent">
                  <CardContent className="flex flex-col justify-center p-2 items-center text-center">
                    <p className="sm:text-lg text-wrap dark:text-white">
                      {title}
                    </p>
                    <p className="text-xs sm:text-sm text-wrap dark:text-white">
                      {description}
                    </p>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
};

export default CarouselText;
